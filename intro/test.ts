import { parse } from "std/flags";
import { ensureDir } from "std/fs";
import { join } from "std/path";
import { generateIntroEmail } from "./mod.ts";

interface ModelConfig {
  name: string;
  maxTokens: number;
  maxOutputTokens: number;
  costPerInputToken: number;
  costPerOutputToken: number;
}

interface TokenCosts {
  inputTokens: number;
  outputTokens: number;
  totalCost: number;
}

interface CompletionUsage {
  draft?: {
    total_tokens?: number;
    prompt_tokens?: number;
    completion_tokens?: number;
  };
  verification?: {
    total_tokens?: number;
    prompt_tokens?: number;
    completion_tokens?: number;
  };
}

const MODEL_CONFIGS: ModelConfig[] = [
  {
    name: "gpt-4o-mini",
    maxTokens: 16384,
    maxOutputTokens: 2048,
    costPerInputToken: 0.15 / 1_000_000,  // $0.150 per 1M tokens
    costPerOutputToken: 0.60 / 1_000_000   // $0.600 per 1M tokens
  },
  {
    name: "gpt-4o",
    maxTokens: 32768,
    maxOutputTokens: 2048,
    costPerInputToken: 2.50 / 1_000_000,  // $2.50 per 1M tokens
    costPerOutputToken: 10.00 / 1_000_000   // $10.00 per 1M tokens
  },
];

interface PhraseTracking {
  phrases: Set<string>;
  openings: Set<string>;
  bullets: Set<string>;
  connectionAsks: Set<string>;
}

interface QualityMetrics {
  hasSpecificMetrics: boolean;
  hasDateReferences: boolean;
  matchesSenderStyle: boolean;
  hasUniqueOpening: boolean;
  hasValidNameHandling: boolean;
  hasTeamSizeOrScope: boolean;
  hasForbiddenPhrases: boolean;
}

interface TestResult {
  modelConfig: ModelConfig;
  success: boolean;
  // deno-lint-ignore no-explicit-any
  response?: any;
  error?: string;
  costs: TokenCosts;
  qualityMetrics?: QualityMetrics;
}

const FORBIDDEN_PHRASES = [
  "resonates",
  "innovative approach",
  "would you know anyone",
  "excited",
  "passionate",
  "aligns",
  "mission"
];

const TEST_CASES = [
  {
    name: "Lauren Growth/Data 1",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6289451-product-manager-research",
      additionalContext: "Lauren is a data-driven, highly collaborative PM with proven success in driving growth (+250% WAU at InVision) and breaking down complex technical problems (delivering an iterative roadmap to overhaul permissions & sharing at InVision). ",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
    }
  },
  {
    name: "Lauren Growth/Data 2",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6289375-sr-product-manager",
      additionalContext: "Lauren is a data-driven, highly collaborative PM with proven success in driving growth (+250% WAU at InVision) and breaking down complex technical problems (delivering an iterative roadmap to overhaul permissions & sharing at InVision). ",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
    }
  },
  {
    name: "Lauren 0 to 1 1",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6332639-senior-product-manager-enterprise",
      additionalContext: "Lauren is an action-oriented PM with a strong track record of launching innovative products from the ground up in ambiguous environments (launching some of Freehand's first project planning tools, like Tables: https://www.freehandapp.com/blog/introducing-tables/)",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
    }
  },
  {
    name: "Lauren 0 to 1 2",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/5907621-senior-product-manager-cx-platform",
      additionalContext: "Lauren is an action-oriented PM with a strong track record of launching innovative products from the ground up in ambiguous environments (launching some of Freehand's first project planning tools, like Tables: https://www.freehandapp.com/blog/introducing-tables/)",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
    }
  },
];

function calculateCosts(
  completion: { usage?: CompletionUsage },
  modelConfig: ModelConfig
): TokenCosts {
  if (!completion?.usage) {
    console.warn(`Warning: No usage data available for ${modelConfig.name}`);
    return {
      inputTokens: 0,
      outputTokens: 0,
      totalCost: 0
    };
  }

  const inputTokens = (completion.usage.draft?.prompt_tokens || 0) +
                     (completion.usage.verification?.prompt_tokens || 0);

  const outputTokens = (completion.usage.draft?.completion_tokens || 0) +
                      (completion.usage.verification?.completion_tokens || 0);

  const inputCost = inputTokens * modelConfig.costPerInputToken;
  const outputCost = outputTokens * modelConfig.costPerOutputToken;

  return {
    inputTokens,
    outputTokens,
    totalCost: inputCost + outputCost
  };
}

function validateNameHandling(body: string): boolean {
  const firstLine = body.split('\n')[0].trim();
  return firstLine === 'Hey {firstName},';
}

function checkForForbiddenPhrases(text: string): string[] {
  return FORBIDDEN_PHRASES.filter(phrase =>
    text.toLowerCase().includes(phrase.toLowerCase())
  );
}

function countTotalBullets(testCases: typeof TEST_CASES): number {
  return testCases.length * 3; // Assuming 3 bullets per email
}

// deno-lint-ignore no-explicit-any
async function logAnalysis(logger: (message: string) => Promise<void>, analysis: any) {
  await logger("\nAnalysis Details:");
  await logger("Requirements:");
  for (const req of analysis.requirements) {
    await logger(`• ${req}`);
  }

  await logger("\nRequirement Matches:");
  for (const match of analysis.matches) {
    await logger(`\nRequirement: ${match.requirement}`);
    await logger(`Evidence: ${match.evidence}`);
    await logger(`Confidence: ${match.confidence}%`);
  }

  await logger(`\nExperience Level: ${analysis.experienceLevel}`);

  await logger("\nQuality Checks:");
  for (const [check, passed] of Object.entries(analysis.qualityChecks)) {
    await logger(`• ${check}: ${passed ? '✓' : '✗'}`);
  }
}

async function analyzeQuality(
  logger: (message: string) => Promise<void>,
  email: string,
  additionalContext: string,
  phraseTracking: PhraseTracking
): Promise<QualityMetrics> {
  const bullets = email.match(/•[^\n]+/g) || [];
  const opening = email.split('\n\n')[1];

  // Track phrases
  phraseTracking.openings.add(opening);
  bullets.forEach(bullet => phraseTracking.bullets.add(bullet));

  const connectionAsk = email.match(/\?[^\n]+/)?.[0] || '';
  phraseTracking.connectionAsks.add(connectionAsk);

  const metrics: QualityMetrics = {
    hasSpecificMetrics: bullets.some(b => /\d+%|\$\d+|\d+ team|\d+x/.test(b)),
    hasDateReferences: /202[2-4]|last year|this year|recently/.test(email),
    matchesSenderStyle: additionalContext.toLowerCase().includes('data-driven') ?
      /\d+%|\$\d+|growth|metrics/.test(opening) :
      /launching|building|driving|initiative/.test(opening),
    hasUniqueOpening: phraseTracking.openings.size === phraseTracking.phrases.size,
    hasValidNameHandling: validateNameHandling(email),
    hasTeamSizeOrScope: /\d+ team|\d+ person|\d+ member/.test(email),
    hasForbiddenPhrases: checkForForbiddenPhrases(email).length === 0
  };

  await logger("\nQuality Metrics:");
  await logger(`• Specific Metrics: ${metrics.hasSpecificMetrics ? '✓' : '✗'}`);
  await logger(`• Date References: ${metrics.hasDateReferences ? '✓' : '✗'}`);
  await logger(`• Style Match: ${metrics.matchesSenderStyle ? '✓' : '✗'}`);
  await logger(`• Unique Opening: ${metrics.hasUniqueOpening ? '✓' : '✗'}`);
  await logger(`• Valid Name Handling: ${metrics.hasValidNameHandling ? '✓' : '✗'}`);
  await logger(`• Team Size/Scope: ${metrics.hasTeamSizeOrScope ? '✓' : '✗'}`);
  await logger(`• No Forbidden Phrases: ${metrics.hasForbiddenPhrases ? '✓' : '✗'}`);

  const foundForbidden = checkForForbiddenPhrases(email);
  if (foundForbidden.length > 0) {
    await logger("\nWarning - Forbidden phrases found:");
    foundForbidden.forEach(async phrase => await logger(`• "${phrase}"`));
  }

  return metrics;
}

async function logTokenAnalysis(
  logger: (message: string) => Promise<void>,
  costs: TokenCosts,
  modelConfig: ModelConfig
) {
  const totalTokens = costs.inputTokens + costs.outputTokens;
  const remainingContextTokens = modelConfig.maxTokens - totalTokens;
  const remainingOutputTokens = modelConfig.maxOutputTokens - costs.outputTokens;

  await logger("\nToken Analysis:");
  await logger(`Model: ${modelConfig.name}`);
  await logger(`Input tokens: ${costs.inputTokens} @ $${modelConfig.costPerInputToken}/token`);
  await logger(`Output tokens: ${costs.outputTokens} @ $${modelConfig.costPerOutputToken}/token`);
  await logger(`Total tokens used: ${totalTokens} / ${modelConfig.maxTokens} (${((totalTokens/modelConfig.maxTokens)*100).toFixed(1)}%)`);
  await logger(`Remaining context window: ${remainingContextTokens} tokens`);
  await logger(`Remaining output tokens: ${remainingOutputTokens} / ${modelConfig.maxOutputTokens} (${((remainingOutputTokens/modelConfig.maxOutputTokens)*100).toFixed(1)}% available)`);
  await logger(`Cost: $${costs.totalCost.toFixed(4)}`);
}

async function runSingleTest(
  testCase: typeof TEST_CASES[0],
  modelConfig: ModelConfig,
  logger: (message: string) => Promise<void>,
  phraseTracking: PhraseTracking
): Promise<TestResult> {
  try {
    const mockRequest = new Request("http://localhost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Model-Config": JSON.stringify(modelConfig)
      },
      body: JSON.stringify(testCase.input),
    });

    const response = await generateIntroEmail({ request: mockRequest });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        modelConfig,
        success: false,
        error: errorText,
        costs: { inputTokens: 0, outputTokens: 0, totalCost: 0 }
      };
    }

    const result = await response.json();
    const costs = calculateCosts(result.completion, modelConfig);

    await logger("\nTest Result:");
    await logger(`Status: ${response.status}`);

    if (result.analysis) {
      await logAnalysis(logger, result.analysis);
    }

    await logger("\nEmail Output:");
    await logger(`Subject: ${result.subject}`);
    await logger(`Body length: ${result.body.length} characters`);
    await logger("Body:");
    await logger(result.body);

    const qualityMetrics = await analyzeQuality(
      logger,
      result.body,
      testCase.input.additionalContext,
      phraseTracking
    );

    await logTokenAnalysis(logger, costs, modelConfig);

    return {
      modelConfig,
      success: true,
      response: result,
      costs,
      qualityMetrics
    };
  } catch (error) {
    return {
      modelConfig,
      success: false,
      error: error instanceof Error ? error.message : String(error),
      costs: { inputTokens: 0, outputTokens: 0, totalCost: 0 }
    };
  }
}

async function runTests() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const logDir = "./test/logs";
  const logPath = join(logDir, `intro-test-${timestamp}.log`);

  await ensureDir(logDir);
  const logFile = await Deno.create(logPath);

  const logger = async (message: string) => {
    console.log(message);
    await logFile.write(new TextEncoder().encode(message + "\n"));
  };

  const results: Map<string, TestResult[]> = new Map();
  const phraseTracking: PhraseTracking = {
    phrases: new Set<string>(),
    openings: new Set<string>(),
    bullets: new Set<string>(),
    connectionAsks: new Set<string>()
  };

  try {
    await logger("Starting intro email generation tests...");

    for (const modelConfig of MODEL_CONFIGS) {
      await logger(`\nTesting with model: ${modelConfig.name}`);
      await logger("========================================");

      const modelResults: TestResult[] = [];

      for (const testCase of TEST_CASES) {
        await logger(`\nRunning test case: ${testCase.name}`);
        await logger("----------------------------------------");

        const result = await runSingleTest(testCase, modelConfig, logger, phraseTracking);
        modelResults.push(result);

        if (!result.success) {
          await logger(`Error in test case: ${result.error}`);
        }
      }

      results.set(modelConfig.name, modelResults);
    }

    // Comparative Analysis
    await logger("\n\nComparative Analysis");
    await logger("========================================");

    for (const modelConfig of MODEL_CONFIGS) {
      const modelResults = results.get(modelConfig.name) || [];
      const successfulTests = modelResults.filter(r => r.success);
      const totalCosts = modelResults.reduce((sum, r) => sum + r.costs.totalCost, 0);
      const avgTokens = modelResults.reduce((sum, r) => sum + r.costs.inputTokens + r.costs.outputTokens, 0) / modelResults.length;

      await logger(`\nModel: ${modelConfig.name}`);
      await logger(`Success Rate: ${(successfulTests.length/modelResults.length*100).toFixed(1)}%`);
      await logger(`Average Tokens per Test: ${Math.round(avgTokens)}`);
      await logger(`Total Cost: $${totalCosts.toFixed(4)}`);

      const qualityMetrics = successfulTests
        .filter(r => r.qualityMetrics)
        .map(r => r.qualityMetrics!);

      if (qualityMetrics.length > 0) {
        await logger("\nAverage Quality Metrics:");
        for (const metric of Object.keys(qualityMetrics[0])) {
          const passRate = qualityMetrics.filter(m => m[metric as keyof QualityMetrics]).length / qualityMetrics.length * 100;
          await logger(`• ${metric}: ${passRate.toFixed(1)}% pass rate`);
        }
      }
    }

    // Phrase Variation Analysis
    await logger("\nPhrase Variation Analysis:");
    await logger(`• Unique Openings: ${phraseTracking.openings.size} / ${TEST_CASES.length * MODEL_CONFIGS.length}`);
    await logger(`• Unique Bullets: ${phraseTracking.bullets.size} / ${countTotalBullets(TEST_CASES) * MODEL_CONFIGS.length}`);
    await logger(`• Unique Connection Asks: ${phraseTracking.connectionAsks.size} / ${TEST_CASES.length * MODEL_CONFIGS.length}`);

    // Final Summary
    await logger("\nTest Summary");
    await logger("========================================");

    const allResults = Array.from(results.values()).flat();
    const totalSuccessful = allResults.filter(r => r.success).length;
    const overallSuccessRate = (totalSuccessful / allResults.length * 100).toFixed(1);
    const totalCost = allResults.reduce((sum, r) => sum + r.costs.totalCost, 0);
    const totalTokens = allResults.reduce((sum, r) => sum + r.costs.inputTokens + r.costs.outputTokens, 0);
    const avgTokensPerTest = Math.round(totalTokens / allResults.length);

    await logger(`Total Tests Run: ${allResults.length}`);
    await logger(`Overall Success Rate: ${overallSuccessRate}%`);
    await logger(`Average Tokens per Test: ${avgTokensPerTest}`);
    await logger(`Total Cost Across All Models: $${totalCost.toFixed(4)}`);

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
  --model   Specify a single model to test (e.g., "gpt-4o-mini")
`);
    Deno.exit(0);
  }

  // Filter models if specified
  if (args.model) {
    const requestedModel = MODEL_CONFIGS.find(m => m.name === args.model);
    if (!requestedModel) {
      console.error(`Error: Unknown model "${args.model}". Available models: ${MODEL_CONFIGS.map(m => m.name).join(', ')}`);
      Deno.exit(1);
    }
    MODEL_CONFIGS.splice(0, MODEL_CONFIGS.length, requestedModel);
  }

  runTests();
}