export function generateEmailPrompt({
  jobDescription,
  resumeText,
  additionalContext,
}: {
  jobDescription: string;
  resumeText: string;
  additionalContext: string;
}): string {
  return `You are a professional email writer. Follow these steps EXACTLY to analyze fit and create an introduction email.

STEP 0: Validate Input Style
Input: Read additional context carefully
Output: Choose exactly ONE style:
- DATA_DRIVEN if context mentions: metrics, growth numbers, analytics
- ACTION_DRIVEN if context mentions: launching, building, leading

STEP 1: Parse Requirements (Choose Exactly 3)
Input: Read job description
Output: List requirements focusing on:
- Years of experience
- Technical skills
- Leadership/scope
- Domain expertise

STEP 2: Match Evidence (One Per Requirement)
Input: Search resume for each requirement
Output for each match:
- Specific achievement with number
- Timeframe or date
- Team size or scope when relevant
Score each:
- 100%: Direct match + metrics + recent
- 50%: Related skill + metrics
- 25%: Minimal match

STEP 3: Select Opening Template
If DATA_DRIVEN, use one:
1. "After driving [X]% [metric] at [Company], [Company's specific data initiative] caught my attention."
2. "Building [product] to [X]% [metric] showed me why [Company's specific data challenge] matters."
3. "Having scaled [product] to [X] [metric], I see valuable applications in [Company's specific data focus]."

If ACTION_DRIVEN, use one:
1. "After launching [X] new products at [Company], [Company's specific product] stood out."
2. "Leading [initiative] from 0-to-1 highlighted why [Company's specific challenge] matters."
3. "Having built [product] in [timeframe], I recognized the impact of [Company's specific focus]."

STEP 4: Create Experience Bullets
Rules for each bullet:
- Start with strong action verb
- Include one specific metric
- Maximum 12 words
- Show scope (team size/budget/impact)
- Include timeframe

STEP 5: Select Company Interest Statement
Template: "[Company's specific product/initiative] matches my experience [specific relevant achievement]"
Never use:
- "drawn to"
- "resonates"
- "excited"
- "passionate"
- "aligns"
- "mission"
- "culture"

STEP 6: Choose Closing Ask
Use exactly one:
1. "Would you be open to discussing how my [specific experience] could contribute to [Company's specific initiative]?"
2. "Given my background in [specific area], I'd welcome your thoughts on contributing to [Company's specific goal]."
3. "I'd appreciate your perspective on how my experience with [specific achievement] could benefit [Company's specific team]."
4. "Could you suggest the best way to explore how my [specific skill] might help with [Company's specific challenge]?"

STEP 7: Generate JSON Output
{
    "detailed_analysis": {
        "job_requirements": ["req1", "req2", "req3"],
        "resume_highlights": [
            {"highlight": "experience", "relevance": "explanation"}
        ],
        "candidate_perspective": [
            {"reason": "fit reason", "agreement": "agreement"}
        ],
        "ranked_reasons": [
            {"rank": 1, "reason": "reason", "explanation": "explanation"}
        ]
    },
    "intro_email": {
        "subject": "Quick intro request - [Company] [Role]",
        "greeting": "Hey {firstName},",
        "opening": "opening paragraph",
        "experience_bullets": [
            "bullet 1",
            "bullet 2",
            "bullet 3"
        ],
        "company_interest": "specific interest statement",
        "closing": "brief closing"
    },
    "email_analysis": {
        "requirements": ["requirement1", "requirement2", "requirement3"],
        "matches": [
            {
                "requirement": "specific requirement",
                "evidence": "specific evidence",
                "confidence": 100
            }
        ],
        "experienceLevel": "DIRECT_MATCH | RELATED | CAREER_CHANGE | NEW_DIRECTION",
        "qualityChecks": {
            "relevanceTest": true,
            "authenticityTest": true,
            "languageTest": true,
            "formatTest": true,
            "toneTest": true,
            "nameHandlingTest": true
        },
        "metrics": {
            "wordCount": 0,
            "uniquePhrases": true,
            "toneMatch": true,
            "specificEvidence": true
        }
    }
}

STEP 8: Final Verification
1. Check JSON structure is valid
2. Verify no forbidden phrases used
3. Confirm opening matches selected style
4. Verify all metrics include numbers
5. Check all dates/timeframes included
6. Validate proper greeting format
7. Ensure connection ask matches templates

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

Return ONLY the JSON object, with no additional text or explanation.`;
}