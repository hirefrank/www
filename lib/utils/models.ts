export interface ModelConfig {
  readonly maxContextTokens: number;
  readonly maxOutputTokens: number;
  readonly costs: {
    readonly input: number;
    readonly output: number;
  };
  readonly temperature: number;
  readonly model: string;
  readonly systemTokenLimit: number;
  readonly userTokenLimit: number;
  readonly retryConfig: {
    readonly maxAttempts: number;
    readonly initialDelay: number;
    readonly maxDelay: number;
  };
}

export const MODEL_CONFIGS: Readonly<Record<string, ModelConfig>> = {
  gpt4oMini: {
    maxContextTokens: 16384,
    maxOutputTokens: 1024,
    costs: {
      input: 0.15,
      output: 0.60
    },
    temperature: 0.1,
    model: "gpt-4o-mini",
    systemTokenLimit: 1024,
    userTokenLimit: 14336,
    retryConfig: {
      maxAttempts: 3,
      initialDelay: 1000,
      maxDelay: 5000
    }
  },
  gpt4o: {
    maxContextTokens: 16384,
    maxOutputTokens: 1024,
    costs: {
      input: 2.50,
      output: 10.00
    },
    temperature: 0.2,
    model: "gpt-4o",
    systemTokenLimit: 2048,
    userTokenLimit: 13312,
    retryConfig: {
      maxAttempts: 3,
      initialDelay: 1000,
      maxDelay: 5000
    }
  }
} as const;