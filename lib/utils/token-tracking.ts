// token-tracking.ts
import { ModelConfig, MODEL_CONFIGS } from './models.ts';

export interface TokenUsage {
  readonly model: keyof typeof MODEL_CONFIGS;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly cost: number;
}

export interface ModelUsageResponse {
  readonly [key: string]: {
    readonly input: number;
    readonly output: number;
  };
}

export function calculateTokenUsage(
  modelName: keyof typeof MODEL_CONFIGS,
  usage: { input: number; output: number }
): TokenUsage {
  const config = MODEL_CONFIGS[modelName];
  const inputCost = (usage.input * config.costs.input) / 1_000_000;
  const outputCost = (usage.output * config.costs.output) / 1_000_000;

  return {
    model: modelName,
    inputTokens: usage.input,
    outputTokens: usage.output,
    cost: inputCost + outputCost
  };
}

export function validateTokenUsage(
  usage: TokenUsage,
  config: ModelConfig
): boolean {
  const totalTokens = usage.inputTokens + usage.outputTokens;
  return totalTokens <= config.maxContextTokens &&
         usage.outputTokens <= config.maxOutputTokens;
}