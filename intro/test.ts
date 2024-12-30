import { parse } from "std/flags";
import { ensureDir } from "std/fs";
import { join } from "std/path";
import { generateIntroEmail } from "./mod.ts";
import { TokenCosts, calculateCosts } from "./token-costs.ts";

interface StyleTracking {
  declaredStyle: {
    dataDriven: number;
    actionDriven: number;
  };
}

interface PhraseTracking {
  bullets: Set<string>;
}

interface QualityMetrics {
  hasSpecificMetrics: boolean;
  hasValidBulletFormat: boolean;
  hasValidCompanyInterest: boolean;
  styleMatchesAnalysis: boolean;
}

interface IntroEmailResponse {
  subject: string;
  body: string;
  analysis: {
    company_context: {
      stage: string;
      product_maturity: string;
      team_structure: string;
      core_problems: string[];
      target_users: string;
      success_metrics: string[];
      key_stakeholders: string[];
    };
    candidate_fit: {
      strong_matches: string[];
      gaps: string[];
      unique_value: string;
    };
    style: "DATA_DRIVEN" | "ACTION_DRIVEN";
    requirements: string[];
    matches: Array<{
      requirement: string;
      evidence: string;
      confidence: "HIGH" | "MEDIUM" | "LOW";
    }>;
  };
}

interface TestResult {
  status: number;
  result?: IntroEmailResponse;
  error?: string;
  costs: TokenCosts;
}

const TEST_CASES = [
  {
    name: "Rebecca 1",
    input: {
      jobUrl: "https://careers.duolingo.com/jobs/6978517002",
      additionalContext: "",
      resume: Array.from(await Deno.readFile("./intro/fixtures/rebecca.pdf")),
    }
  },
  {
    name: "Akshay 1",
    input: {
      jobUrl: "https://www.shopify.com/careers/senior-staff-product-manager-technical_856c1898-01f0-4d01-a31f-3c766e5d5f0b",
      additionalContext: "Former engineer, experienced product manager",
      resume: Array.from(await Deno.readFile("./intro/fixtures/akshay.pdf")),
    }
  },
  {
    name: "Frank 1",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6289451-product-manager-research",
      additionalContext: "I build demos with LLMs.",
      resume: Array.from(await Deno.readFile("./intro/fixtures/frank.pdf")),
    }
  },
  {
    name: "Frank 2",
    input: {
      jobUrl: "https://job-boards.greenhouse.io/affirm/jobs/6252337003",
      additionalContext: "",
      resume: Array.from(await Deno.readFile("./intro/fixtures/frank.pdf")),
    }
  },
  {
    name: "Lauren Growth/Data 1",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6289451-product-manager-research",
      additionalContext: "Lauren is a data-driven, highly collaborative PM with proven success in driving growth (+250% WAU at InVision) and breaking down complex technical problems (delivering an iterative roadmap to overhaul permissions & sharing at InVision). ",
      resume: Array.from(await Deno.readFile("./intro/fixtures/lauren.pdf")),
    }
  },
  {
    name: "Lauren Growth/Data 2",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6289375-sr-product-manager",
      additionalContext: "Lauren is a data-driven, highly collaborative PM with proven success in driving growth (+250% WAU at InVision) and breaking down complex technical problems (delivering an iterative roadmap to overhaul permissions & sharing at InVision). ",
      resume: Array.from(await Deno.readFile("./intro/fixtures/lauren.pdf")),
    }
  },
  {
    name: "Lauren 0 to 1 1",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6332639-senior-product-manager-enterprise",
      additionalContext: "Lauren is an action-oriented PM with a strong track record of launching innovative products from the ground up in ambiguous environments (launching some of Freehand's first project planning tools, like Tables: https://www.freehandapp.com/blog/introducing-tables/)",
      resume: Array.from(await Deno.readFile("./intro/fixtures/lauren.pdf")),
    }
  },
  {
    name: "Lauren 0 to 1 2",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/5907621-senior-product-manager-cx-platform",
      additionalContext: "Lauren is an action-oriented PM with a strong track record of launching innovative products from the ground up in ambiguous environments (launching some of Freehand's first project planning tools, like Tables: https://www.freehandapp.com/blog/introducing-tables/)",
      resume: Array.from(await Deno.readFile("./intro/fixtures/lauren.pdf")),
    }
  },
];

function validateBulletFormat(bullet: string): boolean {
  return /^• .{5,}$/.test(bullet) &&
         /\d+/.test(bullet) && // Has numbers
         bullet.length <= 100;  // Max length check
}

async function logAnalysis(logger: (message: string) => Promise<void>, analysis: IntroEmailResponse['analysis']) {
  await logger("\nAnalysis Details:");
  await logger(`Style: ${analysis.style}`);

  // Log company context
  await logger("\nCompany Context:");
  await logger(`• Stage: ${analysis.company_context.stage}`);
  await logger(`• Product Maturity: ${analysis.company_context.product_maturity}`);
  await logger(`• Team Structure: ${analysis.company_context.team_structure}`);
  await logger(`• Core Problems: ${analysis.company_context.core_problems.join(", ")}`);
  await logger(`• Target Users: ${analysis.company_context.target_users}`);
  await logger(`• Success Metrics: ${analysis.company_context.success_metrics.join(", ")}`);
  await logger(`• Key Stakeholders: ${analysis.company_context.key_stakeholders.join(", ")}`);

  // Log candidate fit
  await logger("\nCandidate Fit:");
  await logger(`• Strong Matches: ${analysis.candidate_fit.strong_matches.join(", ")}`);
  await logger(`• Gaps: ${analysis.candidate_fit.gaps.join(", ")}`);
  await logger(`• Unique Value: ${analysis.candidate_fit.unique_value}`);

  await logger("\nRequirements:");
  for (const req of analysis.requirements) {
    await logger(`• ${req}`);
  }

  await logger("\nRequirement Matches:");
  for (const match of analysis.matches) {
    await logger(`\nRequirement: ${match.requirement}`);
    await logger(`Evidence: ${match.evidence}`);
    await logger(`Confidence: ${match.confidence}`);
  }
}

async function logTokenCosts(logger: (message: string) => Promise<void>, costs: TokenCosts) {
  await logger("\nToken Usage and Costs:");
  await logger(`• Input tokens: ${costs.inputTokens}`);
  await logger(`• Output tokens: ${costs.outputTokens}`);
  await logger(`• Total tokens: ${costs.inputTokens + costs.outputTokens}`);
  await logger(`• Cost: $${costs.totalCost.toFixed(4)}`);
}

async function analyzeQuality(
  logger: (message: string) => Promise<void>,
  email: string,
  additionalContext: string,
  analysis: IntroEmailResponse['analysis'],
  phraseTracking: PhraseTracking,
  styleTracking: StyleTracking
): Promise<QualityMetrics> {
  const bullets = email.match(/•[^\n]+/g) || [];

  // Track bullets for variety
  bullets.forEach(bullet => phraseTracking.bullets.add(bullet));

  // Track declared style
  if (analysis.style === "DATA_DRIVEN") {
    styleTracking.declaredStyle.dataDriven++;
  } else {
    styleTracking.declaredStyle.actionDriven++;
  }

  const qualityMetrics: QualityMetrics = {
    hasSpecificMetrics: bullets.some(b => /\d+/.test(b)),
    hasValidBulletFormat: bullets.every(validateBulletFormat),
    hasValidCompanyInterest: email.includes("could help") && email.includes("specific"),
    styleMatchesAnalysis: (
      (analysis.style === "DATA_DRIVEN" && additionalContext.toLowerCase().includes('data-driven')) ||
      (analysis.style === "ACTION_DRIVEN" && additionalContext.toLowerCase().includes('action-oriented'))
    )
  };

  await logger("\nQuality Metrics:");
  for (const [key, value] of Object.entries(qualityMetrics)) {
    await logger(`• ${key}: ${value ? '✓' : '✗'}`);
  }

  return qualityMetrics;
}

async function runSingleTest(
  testCase: typeof TEST_CASES[0],
  _logger: (message: string) => Promise<void>
): Promise<TestResult> {
  try {
    const mockRequest = new Request("http://localhost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testCase.input),
    });

    const response = await generateIntroEmail({ request: mockRequest });
    const responseText = await response.text();

    const costs = calculateCosts({
      usage: {
        prompt_tokens: Math.ceil(testCase.input.additionalContext.length / 4) +
                      Math.ceil((testCase.input.resume?.length || 0) / 4),
        completion_tokens: Math.ceil(responseText.length / 4)
      }
    });

    if (!response.ok) {
      return { status: response.status, error: responseText, costs };
    }

    const result = JSON.parse(responseText) as IntroEmailResponse;
    return { status: response.status, result, costs };
  } catch (error) {
    return {
      status: 500,
      error: error instanceof Error ? error.message : String(error),
      costs: { inputTokens: 0, outputTokens: 0, totalCost: 0 }
    };
  }
}

export async function runTests() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const logDir = "./intro/logs";
  const logPath = join(logDir, `intro-test-${timestamp}.log`);

  await ensureDir(logDir);
  const logFile = await Deno.create(logPath);

  const logger = async (message: string) => {
    console.log(message);
    await logFile.write(new TextEncoder().encode(message + "\n"));
  };

  const phraseTracking: PhraseTracking = {
    bullets: new Set<string>()
  };

  const styleTracking: StyleTracking = {
    declaredStyle: {
      dataDriven: 0,
      actionDriven: 0
    }
  };

  let totalCosts: TokenCosts = {
    inputTokens: 0,
    outputTokens: 0,
    totalCost: 0
  };

  try {
    await logger("Starting intro email generation tests...");
    await logger(`Using model: gpt-4o-mini`);
    await logger("Model parameters:");
    await logger("• temperature: 0.1");
    await logger("• top_p: 0.5");
    await logger("• frequency_penalty: 0.2");
    await logger("• presence_penalty: 0.1");

    for (const testCase of TEST_CASES) {
      await logger(`\nRunning test case: ${testCase.name}`);
      await logger("----------------------------------------");

      const testResult = await runSingleTest(testCase, logger);

      totalCosts = {
        inputTokens: totalCosts.inputTokens + testResult.costs.inputTokens,
        outputTokens: totalCosts.outputTokens + testResult.costs.outputTokens,
        totalCost: totalCosts.totalCost + testResult.costs.totalCost
      };

      await logger("\nTest Result:");
      await logger(`Status: ${testResult.status}`);

      if (testResult.error) {
        await logger(`Error: ${testResult.error}`);
        continue;
      }

      if (testResult.result?.analysis) {
        await logAnalysis(logger, testResult.result.analysis);
      }

      await logger("\nEmail Output:");
      await logger(`Subject: ${testResult.result?.subject}`);
      await logger(`Body length: ${testResult.result?.body.length} characters`);
      await logger("Body:");
      await logger(testResult.result?.body || "");

      if (testResult.result) {
        await analyzeQuality(
          logger,
          testResult.result.body,
          testCase.input.additionalContext,
          testResult.result.analysis,
          phraseTracking,
          styleTracking
        );
      }

      await logTokenCosts(logger, testResult.costs);
      await logger("\n----------------------------------------");
    }

    await logger("\nTest Summary:");
    await logger("----------------------------------------");
    await logger(`Unique Bullets: ${phraseTracking.bullets.size} / ${TEST_CASES.length * 3}`);
    await logger(`Data-Driven Styles: ${styleTracking.declaredStyle.dataDriven}`);
    await logger(`Action-Driven Styles: ${styleTracking.declaredStyle.actionDriven}`);

    await logger("\nTotal Cost Summary:");
    await logger(`Total Input Tokens: ${totalCosts.inputTokens}`);
    await logger(`Total Output Tokens: ${totalCosts.outputTokens}`);
    await logger(`Total Tokens: ${totalCosts.inputTokens + totalCosts.outputTokens}`);
    await logger(`Average Tokens per Test: ${Math.round((totalCosts.inputTokens + totalCosts.outputTokens) / TEST_CASES.length)}`);
    await logger(`Total Cost: $${totalCosts.totalCost.toFixed(4)}`);

  } catch (error) {
    await logger(`\nFatal error: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await logger(`\nTest results saved to: ${logPath}`);
    try {
      await logFile.close();
    } catch {
      // Ignore close errors
    }
  }
}

if (import.meta.main) {
  const args = parse(Deno.args);

  if (args.help) {
    console.log(`
Usage: deno run --allow-read --allow-write --allow-net cli/test-intro.ts [options]

Options:
  --help    Show this help message
`);
    Deno.exit(0);
  }

  runTests();
}