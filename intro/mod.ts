import * as pdfjs from 'pdfjs';
import "dotenv";
import OpenAI from "openai";
import { generateIntroEmailPrompt } from "./prompt.ts";

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
    requirements: string[];
    matches: {
      requirement: string;
      evidence: string;
      confidence: number;
    }[];
    experienceLevel: 'DIRECT_MATCH' | 'RELATED' | 'CAREER_CHANGE' | 'NEW_DIRECTION';
    qualityChecks: {
      relevanceTest: boolean;
      authenticityTest: boolean;
      languageTest: boolean;
      formatTest: boolean;
      toneTest: boolean;
      nameHandlingTest: boolean;  // Added for name template validation
    };
    metrics: {
      wordCount: number;
      uniquePhrases: boolean;
      toneMatch: boolean;
      specificEvidence: boolean;
    };
  };
}

const apiKey = Deno.env.get("OPENAI_API_KEY");
if (!apiKey) {
  console.error("Warning: OPENAI_API_KEY environment variable is not set. Some features may be limited.");
}

const openai = new OpenAI({
  apiKey: apiKey || ''
});

const extractTextFromPDF = async (pdfBuffer: ArrayBuffer): Promise<string> => {
  try {
    console.log("[DEBUG] PDF buffer size:", pdfBuffer.byteLength);
    const pdf = await pdfjs.getDocument(pdfBuffer).promise;
    console.log("[DEBUG] PDF loaded, pages:", pdf.numPages);
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => {
        if ('str' in item) return item.str;
        return '';
      }).join(' ');
    }

    return text;
  } catch (error) {
    console.error("[DEBUG] PDF extraction error:", error);
    throw error;
  }
};

async function fetchJobDescription(url: string): Promise<string> {
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.protocol.startsWith('http')) {
      throw new Error('Invalid URL protocol. Must be http or https.');
    }

    const response = await fetch(parsedUrl.href);
    if (!response.ok) {
      throw new Error(`Failed to fetch job description: ${response.status}`);
    }

    const html = await response.text();
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  } catch (error: unknown) {
    console.error('Error fetching job description:', error);
    if (error instanceof Error) {
      throw new Error(`Invalid job posting URL: ${error.message}`);
    }
    throw new Error('Invalid job posting URL: Unknown error occurred');
  }
}

function validateNameHandling(body: string): boolean {
  const firstLine = body.split('\n')[0].trim();
  if (!firstLine.startsWith('Hey {firstName},')) {
    throw new Error('Email must start with "Hey {firstName},"');
  }
  if (firstLine.match(/Hey [A-Z][a-z]+,/)) {
    throw new Error('Email contains hardcoded name instead of {firstName}');
  }
  return true;
}

export async function generateIntroEmail({ request }: { request: Request }): Promise<Response> {
  try {
    const formData = await request.json() as EmailRequest;

    console.log("[API] Request body parsed:", {
      ...formData,
      resume: formData.resume ? `[${formData.resume.length} bytes]` : undefined
    });

    const resumeBuffer = new Uint8Array(formData.resume).buffer;
    const [pdfText, jobDescription] = await Promise.all([
      extractTextFromPDF(resumeBuffer),
      fetchJobDescription(formData.jobUrl)
    ]);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        ...generateIntroEmailPrompt({
          jobDescription,
          resumeText: pdfText,
          additionalContext: formData.additionalContext,
          jobUrl: formData.jobUrl,
        })
      ],
      temperature: 0.1,
      max_tokens: MAX_OUTPUT_TOKENS,
      top_p: 0.5,
      frequency_penalty: 0.2,
      presence_penalty: 0.1,
    });

    const response = completion.choices[0].message.content;
    console.log("[API] OpenAI response:", response);

    try {
      const cleanResponse = response
        ?.replace(/<response>\n?/g, '')
        .replace(/\n?<\/response>/g, '')
        .trim();

      console.log("[API] Cleaned response:", cleanResponse);

      const parsedResponse = JSON.parse(cleanResponse || '') as EmailResponse;

      if (!parsedResponse?.subject || !parsedResponse?.body || !parsedResponse?.analysis) {
        console.error("[API] Invalid response structure:", parsedResponse);
        throw new Error("Invalid response structure from OpenAI");
      }

      // Validate name handling
      validateNameHandling(parsedResponse.body);

      // Verify quality checks
      const failedChecks = Object.entries(parsedResponse.analysis.qualityChecks)
        .filter(([_, passed]) => !passed)
        .map(([test]) => test);

      if (failedChecks.length > 0) {
        throw new Error(`Quality checks failed: ${failedChecks.join(', ')}`);
      }

      // Additional verification for metrics
      if (!parsedResponse.analysis.metrics) {
        throw new Error("Missing metrics in analysis");
      }

      return Response.json({
        ...parsedResponse,
        completion: {
          usage: completion.usage
        }
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    } catch (parseError: unknown) {
      console.error("[API] Parse error:", parseError);
      throw new Error(`Failed to parse AI response: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }
  } catch (error: unknown) {
    return new Response(
      error instanceof Error ? error.message : String(error),
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}