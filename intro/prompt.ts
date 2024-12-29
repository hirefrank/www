export function generateEmailPrompt({
  jobDescription,
  resumeText,
  additionalContext,
  jobUrl,
}: {
  jobDescription: string;
  resumeText: string;
  additionalContext: string;
  jobUrl: string;
}): string {
  if (!jobDescription || !resumeText || !jobUrl) {
    throw new Error("Job description, resume text, and job URL are required inputs.");
  }

  return `You are an expert email writer. Follow these steps to analyze fit and create a professional introduction email. Return a JSON object summarizing your analysis and email.

STEP 0: Additional Context Analysis
A. Extract key elements from context:
- Metrics and growth numbers
- Specific initiatives/projects
- Areas of expertise claimed
- Leadership/collaboration examples

B. For each element:
1. Find evidence in resume:
   VERIFIED: Found with specific metrics/details
   PARTIAL: Similar evidence but less specific
   UNSUPPORTED: Not found in resume

2. Map to job requirements:
   HIGH PRIORITY: Directly addresses job needs
   MEDIUM PRIORITY: Related but indirect match
   LOW PRIORITY: Limited relevance

3. Determine usage:
   HIGH PRIORITY: Lead with this in opening/first bullet
   MEDIUM PRIORITY: Support in second/third bullets
   LOW PRIORITY: Only if specifically relevant

STEP 1: Deep Context Analysis

A. Company Analysis (from job description):
Extract and list:
- Company stage (startup/growth/enterprise)
- Product maturity (early/developing/mature)
- Team size and structure
- Reporting relationships
- Recent company momentum/news
- Core problems they're solving
- Target users/customers
- Success metrics for the role
- Technology stack/tools
- Key stakeholders
- Team composition

B. Candidate Analysis (from resume):
Extract and list:
- Industry verticals experience
- Types of users/customers served
- Scale of past impact (team size, user base, revenue)
- Technical expertise areas
- Product types built/managed
- Company stages worked in
- Cross-functional collaboration examples
- Leadership scope and style
- Most relevant achievements with full context
- Technologies/tools expertise

C. Pattern Matching:
- Identify overlaps between company needs and candidate experience
- Note gaps or areas of lower confidence
- Find unique angles that make the candidate valuable
- Map achievements to company's specific challenges

STEP 2: Style Selection
Based on:
- Additional context emphasis (data/metrics vs. building/launching)
- Job requirements emphasis (technical/analytical/leadership)
- Company stage and needs
- Candidate's VERIFIED achievements

Select:
- DATA_DRIVEN: For contexts emphasizing metrics, growth, analytics
- ACTION_DRIVEN: For contexts emphasizing building, launching, leadership

STEP 3: Email Components

1. Subject: "Quick intro request - [Company] [Role]"

2. Opening (2-3 sentences):
- First sentence: Reference specific company initiative/challenge
- Second sentence: Connect HIGH PRIORITY achievement from context that directly addresses this challenge

Examples:
GOOD: "Anthropic's work on making AI systems more reliable is critical for enterprises making high-stakes decisions. My experience launching privacy-first analytics tools that grew enterprise adoption 40% showed me how to make complex technology accessible while maintaining compliance requirements."

BAD: "Anthropic's AI work is exciting. I have product experience."

3. Experience bullets:
Each bullet must include ALL of:
- Action verb
- VERIFIED metric from context or resume
- Explicit scope (team size, user base, etc.)
- Timeframe (quarter/year)
- Business impact
- Max 12 words

Map bullets by priority:
- First bullet: HIGH PRIORITY achievement from context
- Second bullet: MEDIUM PRIORITY achievement from context
- Third bullet: Strong supporting evidence from resume

Examples:
GOOD: "Led 5-person team to launch ML feature, driving 30% efficiency gain for 100 enterprise users in Q4 2022"
BAD: "Improved platform performance through various initiatives"

4. Company interest statement:
Connect strongest context achievement to company's specific need:
"My experience [HIGH PRIORITY achievement] highlighted how to [solve specific company challenge], which could help [Company] [achieve specific goal from job posting]."

5. Closing with link:
"I'm interested in this role (jobUrl). Would you be open to connecting me with someone on the [specific team name from job description] team?"

STEP 4: Return JSON Output
{
    "analysis": {
        "company_context": {
            "stage": "startup/growth/enterprise",
            "product_maturity": "early/developing/mature",
            "team_structure": "description",
            "core_problems": ["problem1", "problem2"],
            "target_users": "description",
            "success_metrics": ["metric1", "metric2"],
            "key_stakeholders": ["role1", "role2"]
        },
        "candidate_fit": {
            "strong_matches": ["match1", "match2"],
            "gaps": ["gap1", "gap2"],
            "unique_value": "description"
        },
        "style": "DATA_DRIVEN | ACTION_DRIVEN",
        "requirements": ["requirement1", "requirement2", "requirement3"],
        "matches": [
            {
                "requirement": "requirement1",
                "evidence": "specific achievement",
                "confidence": "HIGH | MEDIUM | LOW"
            }
        ]
    },
    "email": {
        "subject": "Generated subject",
        "opening": "Generated opening paragraph",
        "experience_bullets": ["bullet1", "bullet2", "bullet3"],
        "company_interest": "Generated interest statement",
        "closing": "Generated closing with job URL",
    }
}

STEP 5: Quality Requirements
1. Every metric must be VERIFIED
2. Context claims must be supported by resume
3. Each bullet must include required components
4. HIGH PRIORITY achievements must be used first
5. Opening must connect to company's specific needs
6. Include timeframes for all achievements
7. Greeting must be exactly "Hey {firstName},"

Input Information:
1. Job Description:
<job_description>
${jobDescription}
</job_description>

2. Resume:
<resume>
${resumeText}
</resume>

3. Additional Context:
<additional_context>
${additionalContext}
</additional_context>

4. Job URL:
<job_url>
${jobUrl}
</job_url>

Return ONLY the JSON object with no additional text or explanation.`;
}