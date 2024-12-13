// prompts/system-instructions.ts
export const SYSTEM_INSTRUCTIONS = {
  PREPROCESSING: `Extract and synthesize key information from the job description and resume. Focus on:
  1. Key requirements with exact quotes
  2. Matching experience with dates and metrics
  3. Team sizes and scope of work
  4. Growth and impact metrics
  5. Technical skills and achievements`,

  EMAIL_GENERATION: `Generate a professional introduction email that demonstrates specific achievements and impact. Ensure:
  1. Clear connection between experience and job requirements
  2. Specific metrics, dates, and scope for each achievement
  3. Professional but conversational tone
  4. Proper formatting and structure`,

  REFINEMENT: `Refine the email while maintaining:
  1. Professional but personable tone
  2. Specific achievements with metrics
  3. Clear value proposition
  4. Proper formatting and structure
  5. Connection request appropriate for the context`
} as const;

// prompts/validation.ts
export const VALIDATION_RULES = {
  FORMAT: {
    GREETING: /^Hey\s+\{firstName\},/,
    METRICS: /\d+%|\$\d+|\d+x/,
    DATES: /\b(19|20)\d{2}\b|Q[1-4]\s+\d{4}/,
    SCOPE: /team of \d+|\d+ person|\d+ member/
  },
  FORBIDDEN_PHRASES: [
    'resonate',
    'align',
    'passion',
    'innovative',
    'background in',
    'transition to',
    'exploring',
    'leveraging'
  ],
  STRUCTURE: {
    REQUIRED_SECTIONS: [
      'greeting',
      'opening',
      'achievements',
      'request',
      'closing'
    ]
  }
} as const;