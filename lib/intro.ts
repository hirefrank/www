import { OpenAI } from "openai";
import * as pdfjs from "pdfjs";
import { EmailGenerationError, ValidationError } from "./utils/error.ts";
import { MODEL_CONFIGS } from "./utils/models.ts";
import { generateIntroEmailPrompt } from "./prompts/intro-email.ts";
import { generateRefinementPrompt } from "./prompts/refinement.ts";
import { ProcessedData, EmailGenerationContext } from "./prompts/shared-types.ts";
import { TokenUsage, calculateTokenUsage, validateTokenUsage } from "./utils/token-tracking.ts";
import { combinedProcessingSchema, emailSchema } from "./utils/schema.ts";
import "dotenv";

// Validate environment
const API_KEY = Deno.env.get("OPENAI_API_KEY");
if (!API_KEY) {
  throw new Error("Missing OpenAI API key");
}

const openai = new OpenAI({ apiKey: API_KEY });

async function extractTextFromPDF(pdfBuffer: ArrayBuffer): Promise<string> {
  try {
    const pdf = await pdfjs.getDocument(pdfBuffer).promise;
    const textPromises = Array.from(
      { length: pdf.numPages },
      (_, i) => pdf.getPage(i + 1).then(page => page.getTextContent())
    );

    const contents = await Promise.all(textPromises);
    return contents
      .flatMap(content => content.items)
      .map(item => ('str' in item ? item.str : ""))
      .join(" ")
      .trim();
  } catch (error) {
    throw new EmailGenerationError(
      "Failed to extract text from PDF",
      "preprocess",
      error
    );
  }
}

async function fetchJobDescription(url: string | URL | Request): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  } catch (error) {
    throw new EmailGenerationError(
      "Failed to fetch job description",
      "preprocess",
      error
    );
  }
}

async function processAndGenerateEmail(
  context: EmailGenerationContext
): Promise<{ processedData: ProcessedData; emailContent: string; usage: TokenUsage }> {
  try {
    const config = MODEL_CONFIGS.gpt4oMini;
    const response = await openai.chat.completions.create({
      model: config.model,
      messages: generateIntroEmailPrompt(context),
      tools: [{ type: "function", function: combinedProcessingSchema }],
      tool_choice: { type: "function", function: { name: "process_and_generate_email" } },
      temperature: config.temperature
    });

    const usage = calculateTokenUsage("gpt4oMini", {
      input: response.usage?.prompt_tokens || 0,
      output: response.usage?.completion_tokens || 0
    });

    if (!validateTokenUsage(usage, config)) {
      throw new Error(`Token usage exceeds limits: ${usage.inputTokens + usage.outputTokens} tokens used`);
    }

    const toolCall = response.choices[0].message.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== "process_and_generate_email") {
      throw new Error("Invalid tool response");
    }

    const result = JSON.parse(toolCall.function.arguments);
    return {
      processedData: result.processedData,
      emailContent: JSON.stringify(result.email),
      usage
    };
  } catch (error) {
    throw new EmailGenerationError(
      "Processing and email generation failed",
      "draft",
      error
    );
  }
}

async function refineWithGPT4o(
  emailContent: string,
  additionalContext: string
): Promise<{ content: string; usage: TokenUsage }> {
  try {
    const config = MODEL_CONFIGS.gpt4o;
    const response = await openai.chat.completions.create({
      model: config.model,
      messages: generateRefinementPrompt({ draftOutput: emailContent, additionalContext }),
      tools: [{ type: "function", function: emailSchema }],
      tool_choice: { type: "function", function: { name: "generate_intro_email" } },
      temperature: config.temperature
    });

    const usage = calculateTokenUsage("gpt4o", {
      input: response.usage?.prompt_tokens || 0,
      output: response.usage?.completion_tokens || 0
    });

    if (!validateTokenUsage(usage, config)) {
      throw new Error(`Token usage exceeds limits: ${usage.inputTokens + usage.outputTokens} tokens used`);
    }

    const toolCall = response.choices[0].message.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== "generate_intro_email") {
      throw new Error("Invalid tool response");
    }

    return {
      content: toolCall.function.arguments,
      usage
    };
  } catch (error) {
    throw new EmailGenerationError(
      "Refinement failed",
      "refine",
      error
    );
  }
}

export async function generateIntroEmail({
  request
}: {
  request: Request;
}): Promise<Response> {
  try {
    const { jobUrl, additionalContext, resume } = await request.json();
    const resumeBuffer = new Uint8Array(resume).buffer;

    // Parallel processing
    const [jobDescription, resumeText] = await Promise.all([
      fetchJobDescription(jobUrl),
      extractTextFromPDF(resumeBuffer),
    ]);

    // Combined processing and draft generation
    const { emailContent, usage: initialUsage } =
      await processAndGenerateEmail({
        jobDescription,
        resumeText,
        additionalContext,
        jobUrl
      });

    // Final refinement
    const { content: finalContent, usage: finalUsage } =
      await refineWithGPT4o(emailContent, additionalContext);

    return new Response(
      JSON.stringify({
        status: 200,
        output: finalContent,
        usage: {
          gpt4oMini: {
            input: initialUsage.inputTokens,
            output: initialUsage.outputTokens
          },
          gpt4o: {
            input: finalUsage.inputTokens,
            output: finalUsage.outputTokens
          }
        }
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Email generation error:", error);
    const status = error instanceof ValidationError ? 422 : 500;
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    return new Response(
      JSON.stringify({
        status,
        error: errorMessage,
        details: error instanceof EmailGenerationError ? error.details : undefined
      }),
      {
        status,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}