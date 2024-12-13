import * as pdfjs from 'pdfjs';
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
      nameHandlingTest: boolean;
    };
    metrics: {
      wordCount: number;
      uniquePhrases: boolean;
      toneMatch: boolean;
      specificEvidence: boolean;
    };
  };
}

interface DetailedResponse {
  detailed_analysis: {
    job_requirements: string[];
    resume_highlights: Array<{
      highlight: string;
      relevance: string;
    }>;
    candidate_perspective: Array<{
      reason: string;
      agreement: string;
    }>;
    ranked_reasons: Array<{
      rank: number;
      reason: string;
      explanation: string;
    }>;
  };
  intro_email: {
    subject: string;
    greeting: string;
    opening: string;
    experience_bullets: string[];
    company_interest: string;
    closing: string;
  };
  email_analysis: {
    requirements: string[];
    matches: Array<{
      requirement: string;
      evidence: string;
      confidence: number;
    }>;
    experienceLevel: 'DIRECT_MATCH' | 'RELATED' | 'CAREER_CHANGE' | 'NEW_DIRECTION';
    qualityChecks: {
      relevanceTest: boolean;
      authenticityTest: boolean;
      languageTest: boolean;
      formatTest: boolean;
      toneTest: boolean;
      nameHandlingTest: boolean;
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

function validateResponse(response: unknown): response is DetailedResponse {
  if (!response || typeof response !== 'object') return false;

  const requiredFields = [
    'detailed_analysis',
    'intro_email',
    'email_analysis'
  ];

  for (const field of requiredFields) {
    if (!(field in response)) return false;
  }

  // deno-lint-ignore no-explicit-any
  const introEmail = (response as any).intro_email;
  if (!introEmail.subject || !introEmail.greeting ||
      !introEmail.opening || !Array.isArray(introEmail.experience_bullets) ||
      !introEmail.company_interest || !introEmail.closing) {
    return false;
  }

  if (!introEmail.greeting.startsWith('Hey {firstName},')) {
    return false;
  }

  if (introEmail.experience_bullets.length < 3) {
    return false;
  }

  return true;
}

function sanitizeResponse(response: string): string {
  return response
    .replace(/[\u201C\u201D]/g, '"') // Replace smart quotes
    .replace(/[\u2018\u2019]/g, "'") // Replace smart apostrophes
    .replace(/\n\s*\n/g, '\n') // Remove extra newlines
    .replace(/\s+}/g, '}') // Remove whitespace before closing braces
    .replace(/{\s+/g, '{') // Remove whitespace after opening braces
    .trim();
}

function constructEmailBody(emailComponents: DetailedResponse['intro_email']): string {
  return `${emailComponents.greeting}

${emailComponents.opening}

Quick background:
${emailComponents.experience_bullets.map(bullet => `• ${bullet}`).join('\n')}

${emailComponents.company_interest}

${emailComponents.closing}

Thanks!`;
}

function transformToEmailResponse(detailedResponse: DetailedResponse): EmailResponse {
  return {
    subject: detailedResponse.intro_email.subject,
    body: constructEmailBody(detailedResponse.intro_email),
    analysis: detailedResponse.email_analysis
  };
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

    const prompt = generateEmailPrompt({
      jobDescription,
      resumeText: pdfText,
      additionalContext: formData.additionalContext,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: prompt
      }],
      temperature: 0.1,
      max_tokens: MAX_OUTPUT_TOKENS,
      top_p: 0.5,
      frequency_penalty: 0.2,
      presence_penalty: 0.1,
    });

    const response = completion.choices[0].message.content;
    console.log("[API] OpenAI response:", response);

    try {
      const cleanResponse = sanitizeResponse(response || '');
      console.log("[API] Cleaned response:", cleanResponse);

      let parsedResponse: DetailedResponse;
      try {
        parsedResponse = JSON.parse(cleanResponse);
      } catch (parseError: unknown) {
        console.error("[API] JSON parse error:", parseError);
        throw new Error(`Invalid JSON format: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
      }

      if (!validateResponse(parsedResponse)) {
        console.error("[API] Response validation failed:", parsedResponse);
        throw new Error("Response missing required fields or invalid format");
      }

      const transformedResponse = transformToEmailResponse(parsedResponse);

      // Validate the transformed response
      if (!transformedResponse.subject || !transformedResponse.body) {
        throw new Error("Transformed response missing required fields");
      }

      return Response.json({
        ...transformedResponse,
        detailed_analysis: parsedResponse.detailed_analysis,
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
      console.error("[API] Error processing response:", parseError);
      throw new Error(`Failed to process AI response: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
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