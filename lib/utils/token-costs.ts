export interface TokenCosts {
  inputTokens: number;
  outputTokens: number;
  totalCost: number;
}

export interface ModelUsage {
  gpt4oMini?: { input: number; output: number };
  gpt4o?: { input: number; output: number };
}

interface ModelCosts {
  input: number;
  output: number;
}

const COSTS: Record<string, ModelCosts> = {
  gpt4oMini: { input: 0.15, output: 0.60 }, // GPT-4o-mini
  gpt4o: { input: 2.50, output: 10.00 },     // GPT-4o
} as const;

export function calculateCosts(completion: ModelUsage): TokenCosts {
  return Object.entries(completion).reduce(
    (acc, [model, usage]) => {
      if (!usage || !(model in COSTS)) return acc;

      const modelCosts = COSTS[model];
      const inputCost = (usage.input * modelCosts.input) / 1_000_000;
      const outputCost = (usage.output * modelCosts.output) / 1_000_000;

      return {
        inputTokens: acc.inputTokens + usage.input,
        outputTokens: acc.outputTokens + usage.output,
        totalCost: acc.totalCost + inputCost + outputCost
      };
    },
    { inputTokens: 0, outputTokens: 0, totalCost: 0 }
  );
}