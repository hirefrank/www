import { EmailGenerationContext } from './shared-types.ts';
import { SYSTEM_INSTRUCTIONS } from './system-instructions.ts';
import { VALIDATION_RULES } from './validation.ts';

export const generateIntroEmailPrompt = ({
  jobDescription,
  resumeText,
  additionalContext,
  jobUrl,
  isPreProcessed = false,
}: EmailGenerationContext) => [{
  role: "system",
  content: `${SYSTEM_INSTRUCTIONS.EMAIL_GENERATION}

You are a professional email writer. Output raw JSON only, no markdown or code blocks.
Your response must exactly match this structure and pass all validations:

{
  "subject": string,
  "body": string,
  "analysis": {
    "requirements": string[],
    "matches": [{
      "requirement": string,
      "evidence": string,
      "confidence": number
    }],
    "experienceLevel": "DIRECT_MATCH" | "RELATED" | "CAREER_CHANGE" | "NEW_DIRECTION",
    "qualityChecks": {
      "relevanceTest": boolean,
      "authenticityTest": boolean,
      "languageTest": boolean,
      "formatTest": boolean,
      "toneTest": boolean,
      "nameHandlingTest": boolean
    },
    "metrics": {
      "wordCount": number,
      "uniquePhrases": boolean,
      "toneMatch": boolean,
      "specificEvidence": boolean
    }
  }
}

VALIDATION REQUIREMENTS:
1. FORMAT
   - Greeting must match: ${VALIDATION_RULES.FORMAT.GREETING}
   - Each achievement needs:
     • Metric matching: ${VALIDATION_RULES.FORMAT.METRICS}
     • Date matching: ${VALIDATION_RULES.FORMAT.DATES}
     • Scope matching: ${VALIDATION_RULES.FORMAT.SCOPE}

2. CONTENT
   - Required sections: ${VALIDATION_RULES.STRUCTURE.REQUIRED_SECTIONS.join(', ')}
   - Forbidden phrases: ${VALIDATION_RULES.FORBIDDEN_PHRASES.join(', ')}

3. STRUCTURE
   Subject: "Quick intro request - [Company] [Role]"

   Body:
   [OPENING VARIATIONS - Use one]:
   • "[Company] is hiring a [Role] - I [specific achievement] in [year]"
   • "I saw [Company]'s [Role] opening - I've [specific achievement] at [Company]"
   • "[Company] has a [Role] role open - In my work [specific achievement]"

   [CONNECTION ASK VARIATIONS - Use one]:
   • "Do you know anyone there you could connect me with?"
   • "Any chance you could introduce me to someone on the team?"
   • "Would you be able to connect me with anyone there?"
   • "Know anyone at [Company] you could introduce me to?"

   Quick background:
   • [Achievement with metric AND date]
   • [Achievement with metric AND date]
   • [Achievement with metric AND date]

   Learn more: [url]

   Thanks!

   [Name]
   [Email]
   [Social]`
}, {
  role: "user",
  content: `Generate an introduction email using:
${isPreProcessed ? "Pre-processed job and resume information:" : "Job Description:"}
${jobDescription}

${isPreProcessed ? "" : "\nResume:"}
${isPreProcessed ? "" : resumeText}

Additional Context:
${additionalContext}

Job URL: ${jobUrl}`
}];

// Example output validator
export function validateEmailOutput(output: unknown): boolean {
  try {
    const parsedOutput = JSON.parse(typeof output === 'string' ? output : JSON.stringify(output));

    // Basic structure validation
    if (!parsedOutput.subject || !parsedOutput.body || !parsedOutput.analysis) {
      return false;
    }

    // Format validation
    if (!VALIDATION_RULES.FORMAT.GREETING.test(parsedOutput.body)) {
      return false;
    }

    // Content validation
    const containsForbiddenPhrase = VALIDATION_RULES.FORBIDDEN_PHRASES.some(
      phrase => parsedOutput.body.toLowerCase().includes(phrase.toLowerCase())
    );
    if (containsForbiddenPhrase) {
      return false;
    }

    // Structure validation
    const hasAllSections = VALIDATION_RULES.STRUCTURE.REQUIRED_SECTIONS.every(
      section => parsedOutput.body.toLowerCase().includes(section.toLowerCase())
    );
    if (!hasAllSections) {
      return false;
    }

    return true;
  } catch (_error) {
    return false;
  }
}