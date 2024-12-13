import { EmailGenerationContext } from './shared-types.ts';
import { SYSTEM_INSTRUCTIONS } from './system-instructions.ts';

export const generatePreprocessPrompt = ({
  jobDescription,
  resumeText
}: Partial<EmailGenerationContext>) => [{
  role: "system",
  content: `${SYSTEM_INSTRUCTIONS.PREPROCESSING}

  Format as structured JSON:
  {
    "requirements": string[],
    "experience": {
      "role": string,
      "achievements": Array<{
        "metric": string,
        "date": string,
        "scope": string
      }>
    }
  }`
}, {
  role: "user",
  content: `Job Description:\n${jobDescription}\n\nResume:\n${resumeText}`
}];