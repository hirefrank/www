import { VALIDATION_RULES } from './validation.ts';
import { SYSTEM_INSTRUCTIONS } from './system-instructions.ts';
export const generateRefinementPrompt = ({
  draftOutput,
  additionalContext
}: {
  draftOutput: string;
  additionalContext: string;
}) => [{
  role: "system",
  content: `${SYSTEM_INSTRUCTIONS.REFINEMENT}

Validation Requirements:
1. Format:
   - Must match pattern: ${VALIDATION_RULES.FORMAT.GREETING}
   - Each achievement needs metric matching: ${VALIDATION_RULES.FORMAT.METRICS}
   - Each achievement needs date matching: ${VALIDATION_RULES.FORMAT.DATES}
   - Each achievement needs scope matching: ${VALIDATION_RULES.FORMAT.SCOPE}

2. Content:
   - Avoid forbidden phrases: ${VALIDATION_RULES.FORBIDDEN_PHRASES.join(', ')}
   - Include all required sections: ${VALIDATION_RULES.STRUCTURE.REQUIRED_SECTIONS.join(', ')}

3. Context:
   ${additionalContext}`
}, {
  role: "user",
  content: draftOutput
}];