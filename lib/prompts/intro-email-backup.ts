export const generateIntroEmailPrompt = ({
  jobDescription, resumeText, additionalContext, jobUrl, isPreProcessed = false,
}: {
  jobDescription: string;
  resumeText: string;
  additionalContext: string;
  jobUrl: string;
  isPreProcessed?: boolean;
}) => [{
  role: "system" as const,
  content: `You are a professional email writer. Output raw JSON only, no markdown or code blocks. Your response must exactly match this structure and pass all validations:
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
}`
}, {
  role: "user" as const,
  content: `
Analyze materials then write an email. Follow these requirements exactly.

${isPreProcessed ? "Inputs have been pre-processed for summarization." : ""}
Context provided:
<jobDescription>${jobDescription}</jobDescription>
<resumeSummary>${resumeText}</resumeSummary>
<additionalContext>${additionalContext}</additionalContext>
Job URL: ${jobUrl}

MANDATORY VALIDATION REQUIREMENTS:
1. Email MUST start with exactly "Hey {firstName},"
2. Each achievement MUST include:
   - Specific metric
   - Exact date or date range
   - Team size or scope when available
3. Never use these phrases:
   - resonate(s)
   - align(s)
   - passion/passionate
   - innovative/innovation
   - background in
   - transition to (unless evidenced)
   - exploring
   - leveraging

ANALYSIS STEPS:
1. Requirements:
   - Extract 3-5 key requirements from job description
   - Use exact quotes from job description
   - Order by importance

2. Evidence Matching:
   For each requirement:
   - Find exact quote from materials
   - Include dates and metrics exactly as written
   - Score confidence:
     100%: Direct match with metrics and dates
     50%: Related experience or partial match
     25%: Tangential experience
     0%: No evidence

3. Calculate Experience Level:
   Average confidence across all matches:
   - DIRECT_MATCH: >75%
   - RELATED: 50-75%
   - CAREER_CHANGE: 25-50%
   - NEW_DIRECTION: <25%

EMAIL STRUCTURE:
Subject: Quick intro request - [Company] [Role]

Hey {firstName},

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
[Social]

QUALITY METRICS MUST PASS:
• Every bullet point needs specific metric
• Every bullet point needs date reference
• Every achievement needs scope or scale
• Opening must be unique
• Must start with "Hey {firstName},"
• No forbidden phrases

Example Output:
{
  "subject": "Quick intro request - Anthropic Product Manager",
  "body": "Hey {firstName},

Anthropic is hiring a Product Manager - I led a team of 8 engineers, achieving $2M pipeline within 90 days at Slack. Do you know anyone there you could connect me with?

Quick background:
• Led Slack's Developer Platform team of 8 engineers (2021-Present)
• Launched 3 major API features increasing developer adoption 40% (2022)
• Managed $2M technical infrastructure budget, reducing costs 15% (2023)

Learn more: [url]

Thanks!

Frank
frank@hirefrank.com
@hirefrank",
  "analysis": {
    "requirements": [
      "5+ years product management",
      "Experience with LLMs",
      "Technical background"
    ],
    "matches": [
      {
        "requirement": "5+ years product management",
        "evidence": "Led and managed PM team at Slack (2021-Present)",
        "confidence": 100
      },
      {
        "requirement": "Experience with LLMs",
        "evidence": "Built demos with LLMs",
        "confidence": 50
      },
      {
        "requirement": "Technical background",
        "evidence": "Led PM team for technical architecture and APIs",
        "confidence": 100
      }
    ],
    "experienceLevel": "RELATED",
    "qualityChecks": {
      "relevanceTest": true,
      "authenticityTest": true,
      "languageTest": true,
      "formatTest": true,
      "toneTest": true,
      "nameHandlingTest": true
    },
    "metrics": {
      "wordCount": 112,
      "uniquePhrases": true,
      "toneMatch": true,
      "specificEvidence": true
    }
  }
}`
}];