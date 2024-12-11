export const generateIntroEmailPrompt = ({
  jobDescription,
  resumeText,
  additionalContext,
  jobUrl,
}: {
  jobDescription: string;
  resumeText: string;
  additionalContext: string;
  jobUrl: string;
}) => [{
  role: "system" as const,
  content: "You are a professional email writer helping to craft introduction request emails. You must NEVER fabricate experience or qualifications. Only reference experience that is explicitly stated in the resume or additional context. For career changes or new directions, focus on transferable skills that are actually present in these materials. You must NEVER use the phrases 'resonates with me', 'aligns with my passion', or 'piqued my interest' in your outputs."
}, {
  role: "user" as const,
  content: `
You're helping write a quick intro request note to a professional connection. The goal is a natural, forwardable email that makes the sender's qualifications clear and shows genuine interest in the company.

Context provided:
<jobDescription>${jobDescription}</jobDescription>
<resumeSummary>${resumeText}</resumeSummary>
<additionalContext>${additionalContext}</additionalContext>
Job URL: ${jobUrl}

EXPERIENCE ASSESSMENT (MANDATORY FIRST STEP):
1. Review resume and job requirements carefully
2. Do NOT fabricate any experience or qualifications
3. Only reference skills and experience explicitly mentioned in the resume or additional context
4. For roles requiring specific qualifications (like SEC reporting, medical licenses, etc.):
   - NEVER imply you have those qualifications if not explicitly stated
   - Be very clear about coming from a different background
   - Focus on concrete transferable skills, not domain knowledge

5. Identify experience level and adjust language accordingly:
   - DIRECT MATCH: "I've been doing X for Y years..."
   - RELATED: "While my background is adjacent..."
   - CAREER CHANGE: "I'm looking to transition from X to Y..."
   - NEW DIRECTION: "While I'm coming from a different background in X..."

For CAREER CHANGE or NEW DIRECTION situations:
- Be explicit about the transition in the first two sentences
- Only mention transferable skills that are explicitly in your materials
- Use clear transition phrases like:
  • "I'm looking to transition from X to Y..."
  • "While I'm coming from a background in X..."
  • "I'm excited to move from X into Y..."
- Never use phrases that imply domain expertise like:
  • "explore opportunities in [new field]"
  • "leverage my experience in [new field]"
  • "apply my skills to [new field]"

Key requirements:
1. Sound like a real person writing to someone they know professionally
2. Make it easily forwardable
3. Show genuine interest in THIS company/role
4. Keep it under 200 words
5. Include the job link naturally

Crafting the message:
1. Start with the company/role and a natural ask for connections
2. Build a compelling case for fit by combining:
   - Relevant resume experiences (2-3 key points)
   - Additional context provided by the sender
   - Specific alignment with the company's needs
3. Show genuine interest in the company/role (use additional context)
4. Make it easy for the connection to "sell" the candidate when forwarding

Email structure:
1. Subject: "Quick intro request - [Company] [Role]"

2. Opening (vary these naturally):
GOOD:
- "[Company] is hiring a [Role] - their work in [area] is exactly what I want to focus on next"
- "I've been following [Company]'s work in [area], and they're hiring a [Role]"
- "[Company] has an interesting [Role] role open"

AVOID:
- "I came across"
- "I noticed"
- "I'm reaching out"
- "This role caught my eye"
- Anything with "align" or "resonate"

3. Company Interest (keep it brief and specific):
GOOD:
- "their work in safe AI is exactly what I want to focus on next"
- "I've been using their products for years and would love to help shape what's next"
- "their approach to [specific area] matches exactly what I've been doing"

AVOID:
- "aligns perfectly with my passion"
- "resonates with me"
- "piqued my interest"
- Generic statements about company mission

4. Ask (vary these naturally):
- "Do you know anyone there you could connect me with?"
- "Any chance you could introduce me to someone on the team?"
- "Would you be able to connect me with anyone there?"
- "Know anyone at [Company] you could introduce me to?"

5. Experience Section:
Choose the most effective format based on the context:

BULLET FORMAT (use when highlighting multiple distinct qualifications):
Start with: "Quick background:" or "Why I'd be a good fit:"

Bullets should be:
- Short (one line each)
- Specific and factual with no implied expertise
- Achievement-focused
- Actually from the resume/context
- Never reframe past experience to imply domain knowledge

GOOD BULLETS:
• "Led AI product strategy at InVision, driving 250% user growth"
• "Built and launched ML-powered features, increasing retention by 40%"
• "Managed $2M research budget and team of 8 engineers"

BAD BULLETS:
• "My experience in driving data-driven growth strategies would be valuable..."
• "I have a strong track record of managing cross-functional teams..."
• "My background has equipped me with the skills to leverage data effectively..."
• "Managed compliance and reporting initiatives" (implies domain expertise)
• "Led teams with a focus on financial accuracy" (stretches the truth)

PROSE FORMAT (use when experience tells a more cohesive story):
- One or two sentences connecting key experiences to role requirements
- Focus on specific achievements and their relevance
- Keep it conversational and direct

Choose format based on:
- Number of distinct qualifications to highlight
- Coherence of experience narrative
- Additional context provided
- What's easier for connection to forward

6. Close:
- Keep it simple: "Thanks!" or "Thanks, [FirstName]"
- Include the job link naturally: "Here's the role: [url]"

7. Signature:
FirstName
Email
Phone (if provided)
LinkedIn (if provided)

Voice and tone:
- Write like you're messaging a professional acquaintance
- Be direct but friendly
- Sound genuinely interested, not desperate
- Vary your language across emails
- Keep it natural and conversational

Avoid:
- Generic phrases about "alignment"
- Formal business language
- Repetitive structures
- Corporate jargon
- Formulaic openings/closings
- "I hope this finds you well"
- "I'm reaching out because"
- "I would greatly appreciate"
- "As we discussed"
- "Thank you for your consideration"
- Any mention of "hiring manager" or "hiring team"

EXAMPLE OUTPUTS:

Example 1 - Direct Match:
Subject: Quick intro request - Anthropic Product Manager

Hey {firstName},

Anthropic is hiring a Product Manager for their research team - their work in safe AI is exactly what I want to focus on next. Do you know anyone there you could connect me with?

Quick background:
• Led AI product strategy at InVision, driving 250% user growth
• Built and shipped ML features with engineering teams
• Managed $2M research budget and team of 8 engineers

Here's the role: [url]

Thanks!

Lauren
lauren.bacall@gmail.com
www.linkedin.com/in/lauren-bacall

Example 2 - Career Change to Regulated Field:
Subject: Quick intro request - Acme SEC Reporting Role

Hey {firstName},

Acme is hiring for their SEC Reporting team. I'm looking to transition from my product management background into financial reporting. While I don't have direct SEC experience, my work managing budgets and analytics at InVision has given me strong foundations in financial data and detailed reporting. Would you know anyone there who might be open to chatting?

Quick background:
• Managed $2M product budget with detailed financial tracking
• Built analytics systems for business metrics and reporting
• Led complex projects requiring high attention to detail

Here's the role: [url]

Thanks!

Lauren
lauren.bacall@gmail.com
www.linkedin.com/in/lauren-bacall

Response format:
{
  "subject": "Subject line here",
  "body": "Email body here including signature"
}
`}];

/*
FUTURE REFINEMENTS

Tone & Language:
- Consider removing "genuinely excited" and similar enthusiasm markers that can feel forced
- Further reduce alignment language ("aligns perfectly with")
- Maintain successful phrasing like "exactly what I want to focus on next"

Format Consistency:
- Could standardize on bullet format for clarity and scannability
- If keeping both formats, provide clearer guidance on when to use each
- Consider standardizing bullet count to always be 3

Bullets:
- Could be even more concise (e.g., "Led InVision product strategy, driving 250% user growth")
- Remove adjectives like "innovative," "successful," "proven" unless absolutely necessary
- Focus more on concrete achievements vs. soft skills

Interest Statement:
- Current approach of tying to specific company focus works well
- Could provide more examples of how to express interest without using "excited" or "passionate"
- Consider adding more varied templates for expressing specific interest

Opening Variations:
- Current templates work well but could add more casual variations
- Could provide more examples that don't follow "[Company] is hiring..." pattern
- Consider adding context-specific openings (e.g., when sender knows company well)

Ask Variations:
- Current asks are natural and effective
- Could add more casual variations
- Consider company-size specific variations (startup vs. large corp)

URL Handling:
- Consider standardizing URL presentation
- Could explore more natural ways to incorporate the link
- Maybe test shorter URL formats if possible

These refinements are optional improvements to an already effective format.
The current outputs successfully achieve the core objectives:
- Forwardable
- Show clear qualifications
- Professional but personal
- Company-specific interest
- Clear ask
- Appropriate length
*/