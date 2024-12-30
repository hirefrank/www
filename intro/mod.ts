import * as pdfjs from "pdfjs";
import "dotenv";
import OpenAI from "openai";
import { generateEmailPrompt } from "./prompt.ts";

export const MAX_OUTPUT_TOKENS = 1024;

// Define the expected request and response structure
interface EmailRequest {
  jobUrl: string;
  additionalContext: string;
  resume: number[];
}

interface EmailResponse {
  subject: string;
  body: string;
  analysis?: {
    style: "DATA_DRIVEN" | "ACTION_DRIVEN";
    requirements: string[];
    matches: Array<{
      requirement: string;
      evidence: string;
      confidence: "HIGH" | "MEDIUM" | "LOW";
    }>;
    company_context: {
      stage: string;
      product_maturity: string;
      team_structure: string;
      core_problems: string[];
      target_users: string;
      success_metrics: string[];
      key_stakeholders: string[];
    };
    candidate_fit: {
      strong_matches: string[];
      gaps: string[];
      unique_value: string;
    };
  };
}

// Add new interface to match the full response structure
interface OpenAIResponse {
  analysis: {
    company_context: {
      stage: string;
      product_maturity: string;
      team_structure: string;
      core_problems: string[];
      target_users: string;
      success_metrics: string[];
      key_stakeholders: string[];
    };
    candidate_fit: {
      strong_matches: string[];
      gaps: string[];
      unique_value: string;
    };
    style: "DATA_DRIVEN" | "ACTION_DRIVEN";
    requirements: string[];
    matches: Array<{
      requirement: string;
      evidence: string;
      confidence: "HIGH" | "MEDIUM" | "LOW";
    }>;
  };
  email: {
    subject: string;
    opening: string;
    experience_bullets: string[];
    company_interest: string;
    closing: string;
  };
}

// Initialize OpenAI with API key from environment
const apiKey = Deno.env.get("OPENAI_API_KEY");
if (!apiKey) {
  throw new Error("Missing OpenAI API key. Set OPENAI_API_KEY in your environment.");
}

const openai = new OpenAI({
  apiKey,
});

// Function to extract text from a PDF buffer
const extractTextFromPDF = async (pdfBuffer: ArrayBuffer): Promise<string> => {
  const pdf = await pdfjs.getDocument(pdfBuffer).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => ("str" in item ? item.str : "")).join(" ");
  }
  return text;
};

// Fetch job description from a URL
async function fetchJobDescription(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch job description: ${response.status}`);
  }
  const html = await response.text();
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// Main function to generate the introduction email
export async function generateIntroEmail({
  request,
}: {
  request: Request;
}): Promise<Response> {
  let rawResponse: string | undefined;
  try {
    const formData = await request.json() as EmailRequest;

    const resumeBuffer = new Uint8Array(formData.resume).buffer;
    const [pdfText, jobDescription] = await Promise.all([
      extractTextFromPDF(resumeBuffer),
      fetchJobDescription(formData.jobUrl),
    ]);

    const prompt = generateEmailPrompt({
      jobDescription,
      resumeText: pdfText,
      additionalContext: formData.additionalContext,
      jobUrl: formData.jobUrl
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.1,
      max_tokens: MAX_OUTPUT_TOKENS,
      top_p: 0.5,
      frequency_penalty: 0.2,
      presence_penalty: 0.1,
    });

    rawResponse = completion.choices[0]?.message?.content ?? undefined;
    if (!rawResponse) {
      throw new Error("No response received from OpenAI");
    }

    console.log("Raw OpenAI response:", rawResponse);

    let parsedResponse: OpenAIResponse;
    try {
      parsedResponse = JSON.parse(rawResponse);
      console.log("Parsed response:", JSON.stringify(parsedResponse, null, 2));
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      console.error("Raw response that failed parsing:", rawResponse);
      throw new Error("Invalid JSON response from OpenAI");
    }

    if (!parsedResponse.email || !parsedResponse.analysis) {
      console.error("Missing required fields in response:", parsedResponse);
      throw new Error("Invalid response format from OpenAI - missing required fields");
    }

    const DEFAULT_GREETING = "Hi {firstName},\n\n[Hope all is well with you. I'm reaching out with a small request.]";
    const DEFAULT_SIGNATURE = "Best,\n{yourName}";

    const email: EmailResponse = {
      subject: parsedResponse.email.subject,
      body: `${DEFAULT_GREETING}\n\n${parsedResponse.email.opening}\n\nQuick background:\n${parsedResponse.email.experience_bullets
        .map((bullet: string) => `${bullet}`)
        .join("\n")}\n\n${parsedResponse.email.company_interest}\n\n${parsedResponse.email.closing}\n\n${DEFAULT_SIGNATURE}`,
      analysis: {
        style: parsedResponse.analysis.style,
        requirements: parsedResponse.analysis.requirements,
        matches: parsedResponse.analysis.matches,
        company_context: parsedResponse.analysis.company_context,
        candidate_fit: parsedResponse.analysis.candidate_fit
      }
    };

    return new Response(JSON.stringify(email), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating intro email:", error);
    console.error("Full error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined,
      raw_response: rawResponse
    });

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
        details: error instanceof Error ? error.stack : undefined,
        raw_response: rawResponse
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}