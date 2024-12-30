import * as pdfjs from "pdfjs";
import "dotenv";
import OpenAI from "openai";
import { generateEmailPrompt } from "./prompt.ts";

export const MAX_OUTPUT_TOKENS = 1024;

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

const apiKey = Deno.env.get("OPENAI_API_KEY");
if (!apiKey) {
  console.log("Missing OpenAI API key. Set OPENAI_API_KEY in your environment.");
}

const openai = new OpenAI({ apiKey });

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

async function fetchJobDescription(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch job description: ${response.status}`);
  }
  const html = await response.text();
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateIntroEmail({
  request,
}: {
  request: Request;
}): Promise<Response> {
  try {
    const formData = await request.json() as EmailRequest;
    const resumeBuffer = new Uint8Array(formData.resume).buffer;
    const [pdfText, jobDescription] = await Promise.all([
      extractTextFromPDF(resumeBuffer),
      fetchJobDescription(formData.jobUrl),
    ]);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: generateEmailPrompt({
          jobDescription,
          resumeText: pdfText,
          additionalContext: formData.additionalContext,
          jobUrl: formData.jobUrl
        })
      }],
      temperature: 0.1,
      max_tokens: MAX_OUTPUT_TOKENS,
      top_p: 0.5,
      frequency_penalty: 0.2,
      presence_penalty: 0.1,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      console.log("No response received from OpenAI");
      return Response.json({
        error: "No response received from OpenAI",
      }, {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });
    }

    console.log("Raw OpenAI response:", responseText);
    const parsedResponse = JSON.parse(responseText.replace(/`/g, '"'));
    console.log("Parsed response:", JSON.stringify(parsedResponse, null, 2));

    if (!parsedResponse.email || !parsedResponse.analysis) {
      throw new Error("Invalid response format from OpenAI - missing required fields");
    }

    const DEFAULT_GREETING = "Hey {firstName},\n\n[Hope all is well with you. I'm reaching out with a small request.]";
    const DEFAULT_SIGNATURE = "\n\nBest,\n{yourName}";

    const email: EmailResponse = {
      subject: parsedResponse.email.subject,
      body: `${DEFAULT_GREETING}\n\n${parsedResponse.email.opening}\n\nQuick background:\n${parsedResponse.email.experience_bullets
        .join("\n")}\n\n${parsedResponse.email.company_interest}\n\n${parsedResponse.email.closing}${DEFAULT_SIGNATURE}`,
      analysis: {
        style: parsedResponse.analysis.style,
        requirements: parsedResponse.analysis.requirements,
        matches: parsedResponse.analysis.matches,
        company_context: parsedResponse.analysis.company_context,
        candidate_fit: parsedResponse.analysis.candidate_fit
      }
    };

    return Response.json(email, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating intro email:", error);
    return Response.json({
      error: error instanceof Error ? error.message : String(error),
      details: error instanceof Error ? error.stack : undefined
    }, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    });
  }
}