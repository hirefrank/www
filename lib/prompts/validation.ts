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
