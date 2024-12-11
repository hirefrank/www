import * as pdfjs from 'pdfjs';
import "dotenv";
import OpenAI from "openai";
import { generateIntroEmailPrompt } from "./prompts/intro-email.ts";

interface EmailRequest {
  jobUrl: string;
  additionalContext: string;
  resume: number[];
}

interface EmailResponse {
  subject: string;
  body: string;
}

const apiKey = Deno.env.get("OPENAI_API_KEY");
if (!apiKey) {
  console.error("Warning: OPENAI_API_KEY environment variable is not set. Some features may be limited.");
}

const openai = new OpenAI({
  apiKey: apiKey || '' // Fallback to empty string if not set
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
    // Validate URL format
    const parsedUrl = new URL(url);
    if (!parsedUrl.protocol.startsWith('http')) {
      throw new Error('Invalid URL protocol. Must be http or https.');
    }

    const response = await fetch(parsedUrl.href);
    if (!response.ok) {
      throw new Error(`Failed to fetch job description: ${response.status}`);
    }

    const html = await response.text();
    // Basic HTML cleanup - remove tags and normalize whitespace
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
      max_tokens: 2048,
      top_p: 0.7,
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

      if (!parsedResponse?.subject || !parsedResponse?.body) {
        console.error("[API] Invalid response structure:", parsedResponse);
        throw new Error("Invalid response structure from OpenAI");
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