export class EmailGenerationError extends Error {
  constructor(
    message: string,
    public stage: 'preprocess' | 'draft' | 'refine',
    public details?: unknown
  ) {
    super(message);
    this.name = 'EmailGenerationError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public rules: string[],
    public details?: unknown
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}