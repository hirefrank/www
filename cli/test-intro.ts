import { parse } from "std/flags";
import { ensureDir } from "std/fs";
import { join } from "std/path";
import { generateIntroEmail } from "../lib/intro.ts";
import { TokenCosts, calculateCosts } from "../lib/utils/token-costs.ts";

const MODEL_MAX_TOKENS = 16384;  // GPT-4o-mini maximum context length
const MAX_OUTPUT_TOKENS = 1024;  // Our configured max_tokens setting

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

async function logTokenAnalysis(logger: (message: string) => Promise<void>, costs: TokenCosts) {
  const totalTokens = costs.inputTokens + costs.outputTokens;
  const remainingContextTokens = MODEL_MAX_TOKENS - totalTokens;
  const remainingOutputTokens = MAX_OUTPUT_TOKENS - costs.outputTokens;

  await logger("\nToken Analysis:");
  await logger(`Input tokens: ${costs.inputTokens}`);
  await logger(`Output tokens: ${costs.outputTokens}`);
  await logger(`Total tokens used: ${totalTokens} / ${MODEL_MAX_TOKENS} (${((totalTokens/MODEL_MAX_TOKENS)*100).toFixed(1)}%)`);
  await logger(`Remaining context window: ${remainingContextTokens} tokens`);
  await logger(`Remaining output tokens: ${remainingOutputTokens} / ${MAX_OUTPUT_TOKENS} (${((remainingOutputTokens/MAX_OUTPUT_TOKENS)*100).toFixed(1)}% available)`);
  await logger(`Cost: $${costs.totalCost.toFixed(4)}`);
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

  let totalCosts: TokenCosts = {
    inputTokens: 0,
    outputTokens: 0,
    totalCost: 0
  };

  const phraseTracking: PhraseTracking = {
    phrases: new Set<string>(),
    openings: new Set<string>(),
    bullets: new Set<string>(),
    connectionAsks: new Set<string>()
  };

  try {
    await logger("Starting intro email generation tests...");

    for (const testCase of TEST_CASES) {
      await logger(`\nRunning test case: ${testCase.name}`);
      await logger("----------------------------------------");

      try {
        const mockRequest = new Request("http://localhost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testCase.input),
        });

        const response = await generateIntroEmail({ request: mockRequest });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const result = await response.json();
        const costs = calculateCosts(result.completion);
        totalCosts = {
          inputTokens: totalCosts.inputTokens + costs.inputTokens,
          outputTokens: totalCosts.outputTokens + costs.outputTokens,
          totalCost: totalCosts.totalCost + costs.totalCost
        };

        await logger("\nTest Result:");
        await logger(`Status: ${response.status}`);

        // Log analysis if present
        if (result.analysis) {
          await logAnalysis(logger, result.analysis);
        }

        await logger("\nEmail Output:");
        await logger(`Subject: ${result.subject}`);
        await logger(`Body length: ${result.body.length} characters`);
        await logger("Body:");
        await logger(result.body);

        // Log quality metrics
        await analyzeQuality(logger, result.body, testCase.input.additionalContext, phraseTracking);

        // Log token analysis
        await logTokenAnalysis(logger, costs);
        await logger("\n----------------------------------------");
      } catch (error) {
        await logger(`\nError in test case ${testCase.name}:`);
        await logger(error instanceof Error ? error.message : String(error));
        await logger("----------------------------------------");
      }
    }

    await logger("\nPhrase Variation Analysis:");
    await logger(`• Unique Openings: ${phraseTracking.openings.size} / ${TEST_CASES.length}`);
    await logger(`• Unique Bullets: ${phraseTracking.bullets.size} / ${countTotalBullets(TEST_CASES)}`);
    await logger(`• Unique Connection Asks: ${phraseTracking.connectionAsks.size} / ${TEST_CASES.length}`);

    await logger("\nTest Summary:");
    await logger("----------------------------------------");
    const totalTokensUsed = totalCosts.inputTokens + totalCosts.outputTokens;
    const averageUsagePerTest = totalTokensUsed / TEST_CASES.length;
    const averageContextUsage = (averageUsagePerTest / MODEL_MAX_TOKENS) * 100;

    await logger(`Total tokens used across all tests: ${totalTokensUsed}`);
    await logger(`Average tokens per test: ${Math.round(averageUsagePerTest)}`);
    await logger(`Total input tokens: ${totalCosts.inputTokens}`);
    await logger(`Total output tokens: ${totalCosts.outputTokens}`);
    await logger(`Average context window usage: ${averageContextUsage.toFixed(1)}%`);
    await logger(`Total cost: $${totalCosts.totalCost.toFixed(4)}`);

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