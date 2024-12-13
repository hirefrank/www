import type { ChatCompletionMessage } from "openai/resources/chat";

export interface EmailGenerationContext {
  jobDescription: string;
  resumeText: string;
  additionalContext: string;
  jobUrl: string;
  isPreProcessed?: boolean;
}

export interface ProcessedData {
  requirements: string[];
  experience: {
    role: string;
    achievements: Array<{
      metric: string;
      date: string;
      scope: string;
    }>;
  };
}

export type SystemPrompt = Omit<ChatCompletionMessage, "role"> & { role: "system" };
export type UserPrompt = Omit<ChatCompletionMessage, "role"> & { role: "user" };
export type PromptMessages = Array<SystemPrompt | UserPrompt>;