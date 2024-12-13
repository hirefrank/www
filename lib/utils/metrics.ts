// metrics.ts
export interface EmailMetrics {
  readonly numericValues: number[];  // Store all numeric values found
  readonly dateReferences: string[]; // Store all date references found
  readonly teamSizes: number[];      // Store all team sizes found
  readonly metrics: {               // Detailed metric information
    readonly values: string[];      // Raw metric strings found
    readonly percentages: number[]; // Percentage values
    readonly currency: string[];    // Currency values
  };
}

export interface EmailStructure {
  readonly subject: string;
  readonly greeting: string;
  readonly opening: string;
  readonly bullets: string[];
  readonly closing: string;
  readonly signature: string;
}

export interface EmailAnalysis {
  readonly structure: EmailStructure;
  readonly metrics: EmailMetrics;
  readonly forbiddenPhrases: string[];
  readonly styleMetrics: {
    readonly tone: "formal" | "casual" | "balanced";
    readonly clarity: number;        // 0-1 score
    readonly personalization: number; // 0-1 score
  };
}

// Constants for analysis
export const FORBIDDEN_PHRASES = [
  "resonates",
  "innovative approach",
  "would you know anyone",
  "excited",
  "passionate",
  "aligns",
  "mission"
] as const;

export const STYLE_ANALYSIS = {
  FORMALITY_MARKERS: {
    FORMAL: /certainly|furthermore|therefore|thus|consequently|hence|regarding/gi,
    CASUAL: /hey|thanks|great|awesome|cool|looking forward|chat|touch base/gi
  },
  CLARITY_MARKERS: {
    CLEAR: /specific|clear|precise|defined|concrete/gi,
    UNCLEAR: /possibly|maybe|might|could|somewhat|relatively/gi
  },
  PERSONALIZATION: {
    HIGH: /your|you|your team|your company|your role/gi,
    LOW: /one|they|them|those|these/gi
  }
} as const;

export const METRIC_PATTERNS = {
  NUMBERS: /(?:^|\s)(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:%|percent|users|people|team|member|x|\$)?/gi,
  DATES: /(?:^|\s)(202[2-4]|last\s+year|this\s+year|recently|Q[1-4]\s+202[2-4])/gi,
  TEAM_SIZE: /(?:team|group)\s+of\s+(\d+)|(\d+)[\s-](?:person|member|developer|engineer)/gi,
  PERCENTAGES: /(\d+(?:\.\d+)?)\s*%/g,
  CURRENCY: /\$\s*(\d+(?:,\d{3})*(?:\.\d+)?)[kKmMbB]?/g
} as const;

export const NAME_PATTERNS = {
  VALID_GREETING: /^Hey\s+\{firstName\},|^Hi\s+\{firstName\},/i,
  PLACEHOLDER_CHECK: /\{firstName\}|\[First\s*Name\]/gi
} as const;

export const STYLE_PATTERNS = {
  FORMAL_MARKERS: /certainly|furthermore|therefore|thus|consequently|hence|regarding/gi,
  CASUAL_MARKERS: /hey|thanks|great|awesome|cool|looking forward|chat|touch base/gi,
  CLARITY_MARKERS: {
    POSITIVE: /clear|specific|direct|straightforward/gi,
    NEGATIVE: /vague|unclear|ambiguous|confusing/gi
  }
} as const;

// Add these function implementations
function findForbiddenPhrases(text: string): string[] {
  return FORBIDDEN_PHRASES.filter(phrase =>
    text.toLowerCase().includes(phrase.toLowerCase())
  );
}

function analyzeStyle(email: string): {
  tone: "formal" | "casual" | "balanced";
  clarity: number;
  personalization: number;
} {
  const text = email.toLowerCase();

  // Analyze formality
  const formalCount = (text.match(STYLE_ANALYSIS.FORMALITY_MARKERS.FORMAL) || []).length;
  const casualCount = (text.match(STYLE_ANALYSIS.FORMALITY_MARKERS.CASUAL) || []).length;

  let tone: "formal" | "casual" | "balanced";
  if (formalCount > casualCount * 1.5) tone = "formal";
  else if (casualCount > formalCount * 1.5) tone = "casual";
  else tone = "balanced";

  // Analyze clarity (0-1 score)
  const clearMarkers = (text.match(STYLE_ANALYSIS.CLARITY_MARKERS.CLEAR) || []).length;
  const unclearMarkers = (text.match(STYLE_ANALYSIS.CLARITY_MARKERS.UNCLEAR) || []).length;
  const clarity = clearMarkers / (clearMarkers + unclearMarkers + 1); // Add 1 to avoid division by zero

  // Analyze personalization (0-1 score)
  const personalMarkers = (text.match(STYLE_ANALYSIS.PERSONALIZATION.HIGH) || []).length;
  const impersonalMarkers = (text.match(STYLE_ANALYSIS.PERSONALIZATION.LOW) || []).length;
  const personalization = personalMarkers / (personalMarkers + impersonalMarkers + 1);

  return {
    tone,
    clarity,
    personalization
  };
}

// Improved analysis functions
export function analyzeEmail(email: string): EmailAnalysis {
  const structure = extractEmailStructure(email);
  const metrics = extractMetrics(email);
  const forbiddenPhrases = findForbiddenPhrases(email);
  const styleMetrics = analyzeStyle(email);

  return {
    structure,
    metrics,
    forbiddenPhrases,
    styleMetrics
  };
}

function extractEmailStructure(email: string): EmailStructure {
  const lines = email.split('\n').map(line => line.trim());
  const subjectLine = lines.find(line => line.toLowerCase().includes('subject:')) || '';
  const bullets = lines.filter(line => line.startsWith('- '));

  return {
    subject: subjectLine.replace(/^subject:\s*/i, ''),
    greeting: lines.find(line => /^(hi|hey|dear)\b/i.test(line)) || '',
    opening: extractOpeningParagraph(lines),
    bullets: bullets.map(b => b.substring(2).trim()),
    closing: extractClosingParagraph(lines),
    signature: extractSignature(lines)
  };
}

// In metrics.ts, update the extractMetrics function to use METRIC_PATTERNS

function extractMetrics(email: string): EmailMetrics {
  // Initialize empty metrics object
  const metrics: EmailMetrics = {
    numericValues: [],
    dateReferences: [],
    teamSizes: [],
    metrics: {
      values: [],
      percentages: [],
      currency: []
    }
  };

  // Use METRIC_PATTERNS for extraction
  email = email.toLowerCase();  // Normalize text for consistent matching

  // Extract numeric values and their context
  Array.from(email.matchAll(METRIC_PATTERNS.NUMBERS))
    .forEach(match => {
      if (match[1]) {
        const value = Number(match[1].replace(/,/g, ''));
        metrics.numericValues.push(value);
        metrics.metrics.values.push(match[0].trim());
      }
    });

  // Extract date references
  Array.from(email.matchAll(METRIC_PATTERNS.DATES))
    .forEach(match => {
      if (match[1]) {
        metrics.dateReferences.push(match[1].trim());
      }
    });

  // Extract team sizes
  Array.from(email.matchAll(METRIC_PATTERNS.TEAM_SIZE))
    .forEach(match => {
      const size = Number(match[1] || match[2]);
      if (!isNaN(size)) {
        metrics.teamSizes.push(size);
      }
    });

  // Extract percentages
  Array.from(email.matchAll(METRIC_PATTERNS.PERCENTAGES))
    .forEach(match => {
      if (match[1]) {
        metrics.metrics.percentages.push(Number(match[1]));
      }
    });

  // Extract currency values
  Array.from(email.matchAll(METRIC_PATTERNS.CURRENCY))
    .forEach(match => {
      metrics.metrics.currency.push(match[0]);
    });

  return metrics;
}

// Helper functions for extracting email parts
function extractOpeningParagraph(lines: string[]): string {
  const greetingIndex = lines.findIndex(line => /^(hi|hey|dear)\b/i.test(line));
  if (greetingIndex === -1) return '';

  const opening = [];
  for (let i = greetingIndex + 1; i < lines.length; i++) {
    if (!lines[i] || lines[i].startsWith('- ')) break;
    opening.push(lines[i]);
  }
  return opening.join(' ').trim();
}

function extractClosingParagraph(lines: string[]): string {
  const closingIndex = lines.findIndex(line =>
    /^(thank|best|regards|sincerely)/i.test(line)
  );
  if (closingIndex === -1) return '';

  const closing = [];
  for (let i = closingIndex - 1; i >= 0; i--) {
    if (!lines[i] || lines[i].startsWith('- ')) break;
    closing.unshift(lines[i]);
  }
  return closing.join(' ').trim();
}

function extractSignature(lines: string[]): string {
  const signatureStart = lines.findIndex(line =>
    /^(best|regards|sincerely)/i.test(line)
  );
  if (signatureStart === -1) return '';

  return lines.slice(signatureStart)
    .filter(line => line)
    .join('\n');
}