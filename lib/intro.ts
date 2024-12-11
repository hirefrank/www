import * as pdfjs from 'pdfjs';
import "dotenv";
import OpenAI from "openai";
import { generateIntroEmailPrompt } from "./prompts/intro-email.ts";

interface EmailRequest {
  jobUrl: string;
  additionalContext: string;
  resume: number[];
  token: string;
}

interface EmailResponse {
  subject: string;
  body: string;
}

const apiKey = Deno.env.get("OPENAI_API_KEY");
if (!apiKey) throw new Error("OPENAI_API_KEY environment variable is not set");

const openai = new OpenAI({ apiKey });

const isTestMode = Deno.env.get("NODE_ENV") === "test";

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
    const response = await fetch(url);
    const html = await response.text();
    // Basic HTML cleanup - remove tags and normalize whitespace
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  } catch (error) {
    console.error('Error fetching job description:', error);
    return 'Unable to fetch job description';
  }
}

export async function generateIntroEmail({ request }: { request: Request }): Promise<Response> {
  try {
    const formData = await request.json() as EmailRequest;

    // Skip Turnstile verification in test mode
    if (!isTestMode) {
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: Deno.env.get("TURNSTILE_SECRET_KEY"),
          response: formData.token,
        }),
      });

      const turnstileResult = await turnstileResponse.json();
      if (!turnstileResult.success) {
        return new Response('Invalid CAPTCHA', { status: 400 });
      }
    }

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
      temperature: 0.2,
      max_tokens: 2048,
      top_p: 0.8,
    });

    const response = completion.choices[0].message.content;
    console.log("[API] OpenAI response:", response);

    try {
      // More robust cleaning of the response
      const cleanResponse = response
        ?.replace(/<response>\n?/g, '')  // Remove opening tag and optional newline
        .replace(/\n?<\/response>/g, '')  // Remove closing tag and optional newline
        .trim();

      console.log("[API] Cleaned response:", cleanResponse); // Add debug logging

      // Only parse if cleanResponse is defined
      const parsedResponse = JSON.parse(cleanResponse || '') as EmailResponse;

      // Validate the parsed response
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