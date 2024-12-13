import * as pdfjs from 'pdfjs';
import "dotenv";
import OpenAI from "openai";
import { generateIntroEmailPrompt } from "./prompt.ts";

// Constants
export const MAX_OUTPUT_TOKENS = 1024;
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 10;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

// Custom Error Classes
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class AIResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AIResponseError';
  }
}

// Interfaces
interface EmailRequest {
  jobUrl: string;
  additionalContext: string;
  resume: number[];
}

interface ValidatedEmailRequest extends EmailRequest {
  validatedJobUrl: URL;
  validatedResume: ArrayBuffer;
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

interface Metrics {
  requestId: string;
  requestTime: number;
  pdfSize: number;
  tokenCount: number;
  modelUsed: string;
  success: boolean;
  errorType?: string;
}

// Cache and Rate Limiting
const responseCache = new Map<string, { response: EmailResponse; timestamp: number }>();
const rateLimit = new Map<string, number>();
const CACHE_TTL = 3600000; // 1 hour

// Initialize OpenAI
const apiKey = Deno.env.get("OPENAI_API_KEY");
if (!apiKey) {
  console.error("Warning: OPENAI_API_KEY environment variable is not set. Some features may be limited.");
}

const openai = new OpenAI({
  apiKey: apiKey || ''
});

// Utility Functions
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const collectMetrics = (metrics: Metrics): void => {
  console.log('[METRICS]', {
    timestamp: new Date().toISOString(),
    ...metrics,
  });
};

const getCacheKey = (jobUrl: string, resumeHash: string): string => {
  return `${jobUrl}:${resumeHash}`;
};

const checkRateLimit = (clientId: string): boolean => {
  const requestCount = rateLimit.get(clientId) || 0;

  if (requestCount >= MAX_REQUESTS) {
    throw new ValidationError('Rate limit exceeded');
  }

  rateLimit.set(clientId, requestCount + 1);
  setTimeout(() => rateLimit.delete(clientId), RATE_LIMIT_WINDOW);

  return true;
};

const validateRequest = async (request: Request): Promise<ValidatedEmailRequest> => {
  const formData = await request.json() as EmailRequest;

  if (!formData.jobUrl || !formData.resume) {
    throw new ValidationError('Missing required fields: jobUrl or resume');
  }

  const validatedJobUrl = new URL(formData.jobUrl);
  if (!validatedJobUrl.protocol.startsWith('http')) {
    throw new ValidationError('Invalid URL protocol. Must be http or https.');
  }

  return {
    ...formData,
    validatedJobUrl,
    validatedResume: new Uint8Array(formData.resume).buffer
  };
};

const retryOpenAICall = async (
  fn: () => Promise<OpenAI.Chat.Completions.ChatCompletion>,
  requestId: string
): Promise<OpenAI.Chat.Completions.ChatCompletion> => {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await fn();
    } catch (error) {
      console.error(`[${requestId}] OpenAI call attempt ${i + 1} failed:`, error);
      if (i === MAX_RETRIES - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, INITIAL_RETRY_DELAY * Math.pow(2, i)));
    }
  }
  throw new AIResponseError('All retry attempts failed');
};

const extractTextFromPDF = async (pdfBuffer: ArrayBuffer, requestId: string): Promise<string> => {
  try {
    console.log(`[${requestId}] PDF buffer size:`, pdfBuffer.byteLength);
    const pdf = await pdfjs.getDocument(pdfBuffer).promise;
    console.log(`[${requestId}] PDF loaded, pages:`, pdf.numPages);
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
    console.error(`[${requestId}] PDF extraction error:`, error);
    throw error;
  }
};

const fetchJobDescription = async (url: URL, requestId: string): Promise<string> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url.href, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'EmailGeneratorBot/1.0'
      }
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch job description: ${response.status}`);
    }

    const html = await response.text();
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  } catch (error: unknown) {
    console.error(`[${requestId}] Error fetching job description:`, error);
    if (error instanceof Error) {
      throw new ValidationError(`Invalid job posting URL: ${error.message}`);
    }
    throw new ValidationError('Invalid job posting URL: Unknown error occurred');
  }
};

const validateNameHandling = (body: string): boolean => {
  const firstLine = body.split('\n')[0].trim();
  if (!firstLine.startsWith('Hey {firstName},')) {
    throw new ValidationError('Email must start with "Hey {firstName},"');
  }
  if (firstLine.match(/Hey [A-Z][a-z]+,/)) {
    throw new ValidationError('Email contains hardcoded name instead of {firstName}');
  }
  return true;
};

export async function generateIntroEmail({ request }: { request: Request }): Promise<Response> {
  const requestId = generateRequestId();
  const startTime = Date.now();
  const metrics: Partial<Metrics> = {
    requestId,
    requestTime: startTime,
    success: false
  };

  try {
    // Rate limiting
    const clientId = request.headers.get('X-Client-ID') || 'anonymous';
    checkRateLimit(clientId);

    // Request validation
    const validatedRequest = await validateRequest(request);
    console.log(`[${requestId}] Request validated:`, {
      url: validatedRequest.validatedJobUrl.href,
      resumeSize: validatedRequest.validatedResume.byteLength
    });

    // Check cache
    const cacheKey = getCacheKey(
      validatedRequest.validatedJobUrl.href,
      Array.from(new Uint8Array(validatedRequest.validatedResume))
        .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')
    );

    const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse && (Date.now() - cachedResponse.timestamp) < CACHE_TTL) {
      console.log(`[${requestId}] Cache hit`);
      metrics.success = true;
      collectMetrics({ ...metrics as Metrics, modelUsed: 'cache' });
      return Response.json(cachedResponse.response, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "X-Cache": "HIT"
        },
      });
    }

    // Process PDF and job description
    const [pdfText, jobDescription] = await Promise.all([
      extractTextFromPDF(validatedRequest.validatedResume, requestId),
      fetchJobDescription(validatedRequest.validatedJobUrl, requestId)
    ]);

    metrics.pdfSize = validatedRequest.validatedResume.byteLength;

    // Generate draft with smaller model
    const draftCompletion = await retryOpenAICall(
      () => openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an email assistant. Respond with a JSON object containing the following fields: 'subject' (string), 'body' (string), and 'analysis' (object). The analysis should include quality metrics and requirement matching."
          },
          ...generateIntroEmailPrompt({
            jobDescription,
            resumeText: pdfText,
            additionalContext: validatedRequest.additionalContext,
            jobUrl: validatedRequest.validatedJobUrl.href,
          })
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
        max_tokens: MAX_OUTPUT_TOKENS,
        top_p: 0.5,
        frequency_penalty: 0.2,
        presence_penalty: 0.1,
      }),
      requestId
    );

    // Verify with GPT-4o
    const verificationCompletion = await retryOpenAICall(
      () => openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a quality assurance expert. Verify if the following JSON email draft meets all requirements. If it does, return the original JSON unchanged. If it doesn't, fix the issues and return the corrected JSON. Always respond with a valid JSON object."
          },
          {
            role: "user",
            content: draftCompletion.choices[0].message.content || ''
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
        max_tokens: MAX_OUTPUT_TOKENS,
      }),
      requestId
    );

    const response = verificationCompletion.choices[0].message.content;
    console.log(`[${requestId}] OpenAI response:`, response);

    try {
      const cleanResponse = response
        ?.replace(/<response>\n?/g, '')
        .replace(/\n?<\/response>/g, '')
        .trim();

      console.log(`[${requestId}] Cleaned response:`, cleanResponse);

      const parsedResponse = JSON.parse(cleanResponse || '') as EmailResponse;

      if (!parsedResponse?.subject || !parsedResponse?.body || !parsedResponse?.analysis) {
        throw new AIResponseError("Invalid response structure from OpenAI");
      }

      // Validate response
      validateNameHandling(parsedResponse.body);

      const failedChecks = Object.entries(parsedResponse.analysis.qualityChecks)
        .filter(([_, passed]) => !passed)
        .map(([test]) => test);

      if (failedChecks.length > 0) {
        throw new ValidationError(`Quality checks failed: ${failedChecks.join(', ')}`);
      }

      if (!parsedResponse.analysis.metrics) {
        throw new ValidationError("Missing metrics in analysis");
      }

      // Cache the response
      responseCache.set(cacheKey, {
        response: parsedResponse,
        timestamp: Date.now()
      });

      // Update metrics
      metrics.success = true;
      metrics.tokenCount = (draftCompletion.usage?.total_tokens || 0) +
                          (verificationCompletion.usage?.total_tokens || 0);
      metrics.modelUsed = 'gpt-4o';

      return Response.json({
        subject: parsedResponse.subject,
        body: parsedResponse.body,
        analysis: parsedResponse.analysis,
        completion: {
          usage: {
            draft: {
              prompt_tokens: draftCompletion.usage?.prompt_tokens || 0,
              completion_tokens: draftCompletion.usage?.completion_tokens || 0,
              total_tokens: draftCompletion.usage?.total_tokens || 0
            },
            verification: {
              prompt_tokens: verificationCompletion.usage?.prompt_tokens || 0,
              completion_tokens: verificationCompletion.usage?.completion_tokens || 0,
              total_tokens: verificationCompletion.usage?.total_tokens || 0
            }
          }
        }
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    } catch (parseError: unknown) {
      console.error(`[${requestId}] Parse error:`, parseError);
      throw new AIResponseError(`Failed to parse AI response: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }
  } catch (error: unknown) {
    metrics.errorType = error instanceof Error ? error.name : 'UnknownError';
    collectMetrics(metrics as Metrics);

    return new Response(
      error instanceof Error ? error.message : String(error),
      {
        status: error instanceof ValidationError ? 400 : 500,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "X-Request-ID": requestId
        }
      }
    );
  } finally {
    metrics.requestTime = Date.now() - startTime;
    collectMetrics(metrics as Metrics);
  }
}