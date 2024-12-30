export interface TokenCosts {
  inputTokens: number;
  outputTokens: number;
  totalCost: number;
}

export function calculateCosts(completion: { usage: { prompt_tokens: number; completion_tokens: number; } }): TokenCosts {
  const INPUT_COST_PER_TOKEN = 0.15 / 1_000_000;  // $0.150 per 1M tokens
  const OUTPUT_COST_PER_TOKEN = 0.60 / 1_000_000;  // $0.600 per 1M tokens

  const inputCost = completion.usage.prompt_tokens * INPUT_COST_PER_TOKEN;
  const outputCost = completion.usage.completion_tokens * OUTPUT_COST_PER_TOKEN;

  return {
    inputTokens: completion.usage.prompt_tokens,
    outputTokens: completion.usage.completion_tokens,
    totalCost: inputCost + outputCost
  };
}