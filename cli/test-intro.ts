import { parse } from "std/flags";
import { ensureDir } from "std/fs";
import { join } from "std/path";
import { generateIntroEmail } from "../lib/intro.ts";
import { MODEL_CONFIGS } from "../lib/utils/models.ts";
import { TEST_CASES } from "../test/fixtures/test-cases.ts";
import {
  TokenCosts,
  ModelUsage,
  calculateCosts
} from "../lib/utils/token-costs.ts";
import {
  EmailAnalysis,
  analyzeEmail
} from "../lib/utils/metrics.ts";
import {
  QualityMetrics,
  performQualityChecks
} from "../lib/utils/quality-check.ts";

// Types
interface TestCase {
  name: string;
  input: {
    jobUrl: string;
    additionalContext: string;
    resume: Uint8Array | number[];
    expected?: {
      contains: string[];
    };
  };
}

interface TestResult {
  status: number;
  output?: string;
  usage?: Record<string, { input: number; output: number }>;
  error?: string;
}

interface TestReport {
  caseName: string;
  status: number;
  tokenCosts: TokenCosts;
  emailAnalysis?: EmailAnalysis;
  qualityMetrics?: QualityMetrics;
  error?: string;
}

type Logger = (message: string) => Promise<void>;

// Test Runner
async function runTests(): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const logDir = "./test/logs";
  const logPath = join(logDir, `intro-test-${timestamp}.log`);

  await ensureDir(logDir);
  const logFile = await Deno.create(logPath);

  const logger: Logger = async (message: string) => {
    console.log(message);
    await logFile.write(new TextEncoder().encode(message + "\n"));
  };

  const phraseTracking = new Set<string>();
  const reports: TestReport[] = [];

  try {
    await logger("Starting intro email generation tests...");

    for (const testCase of TEST_CASES) {
      const report = await runTestCase(testCase, phraseTracking);
      reports.push(report);
      await logTestReport(logger, report);
    }

    await logTestSummary(logger, reports, phraseTracking);
    await logger(`\nTest results saved to: ${logPath}`);
  } catch (error) {
    await logger(`\nFatal error: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    try {
      await logFile.close();
    } catch (error) {
      console.error("Error closing log file:", error);
    }
  }
}

async function runTestCase(
  testCase: TestCase,
  phraseTracking: Set<string>
): Promise<TestReport> {
  try {
    console.log(`Resume buffer for ${testCase.name}:`, testCase.input.resume.length, 'bytes');

    const resumeBuffer = new Uint8Array(testCase.input.resume).buffer;
    console.log(`Converted buffer size:`, resumeBuffer.byteLength, 'bytes');

    const mockRequest = new Request("http://localhost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobUrl: testCase.input.jobUrl,
        additionalContext: testCase.input.additionalContext,
        resume: Array.from(new Uint8Array(resumeBuffer))
      }),
    });

    const response = await generateIntroEmail({ request: mockRequest });
    const result = await response.json() as TestResult;

    const tokenCosts = processTokenUsage(result.usage);

    if (result.error) {
      return {
        caseName: testCase.name,
        status: result.status,
        tokenCosts,
        error: result.error
      };
    }

    if (!result.output) {
      throw new Error("No output received from email generation");
    }

    const emailAnalysis = analyzeEmail(result.output);
    const qualityMetrics = performQualityChecks(
      emailAnalysis,
      testCase.input.additionalContext,
      phraseTracking
    );

    return {
      caseName: testCase.name,
      status: result.status,
      tokenCosts,
      emailAnalysis,
      qualityMetrics
    };
  } catch (error) {
    return {
      caseName: testCase.name,
      status: 500,
      tokenCosts: { inputTokens: 0, outputTokens: 0, totalCost: 0 },
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

function processTokenUsage(
  usage?: Record<string, { input: number; output: number }>
): TokenCosts {
  if (!usage) return { inputTokens: 0, outputTokens: 0, totalCost: 0 };
  return calculateCosts(usage as ModelUsage);
}

// In test-intro.ts, update the token processing and logging
async function logTestReport(
  logger: Logger,
  report: TestReport
): Promise<void> {
  await logger(`\nRunning test case: ${report.caseName}`);
  await logger("----------------------------------------");
  await logger(`\nStatus: ${report.status}`);

  if (report.error) {
    await logger(`Error: ${report.error}`);
    return;
  }

  // Log GPT-4o-mini token usage
  const gpt4oMiniConfig = MODEL_CONFIGS.gpt4oMini;
  const gpt4oMiniUsage = (report.usage?.gpt4oMini || { input: 0, output: 0 });

  await logger(`\nToken Analysis for gpt4oMini:`);
  await logger(`Input tokens: ${gpt4oMiniUsage.input}`);
  await logger(`Output tokens: ${gpt4oMiniUsage.output}`);

  const gpt4oMiniTotal = gpt4oMiniUsage.input + gpt4oMiniUsage.output;
  const gpt4oMiniContextUsage = (gpt4oMiniTotal / gpt4oMiniConfig.maxContextTokens) * 100;
  const gpt4oMiniOutputUsage = (gpt4oMiniUsage.output / gpt4oMiniConfig.maxOutputTokens) * 100;

  await logger(`Total tokens used: ${gpt4oMiniTotal} / ${gpt4oMiniConfig.maxContextTokens} (${gpt4oMiniContextUsage.toFixed(1)}%)`);
  await logger(`Remaining context window: ${gpt4oMiniConfig.maxContextTokens - gpt4oMiniTotal} tokens`);
  await logger(`Remaining output tokens: ${gpt4oMiniConfig.maxOutputTokens - gpt4oMiniUsage.output} / ${gpt4oMiniConfig.maxOutputTokens} (${(100 - gpt4oMiniOutputUsage).toFixed(1)}% available)`);

  // Log GPT-4o token usage
  const gpt4oConfig = MODEL_CONFIGS.gpt4o;
  const gpt4oUsage = (report.usage?.gpt4o || { input: 0, output: 0 });

  await logger(`\nToken Analysis for gpt4o:`);
  await logger(`Input tokens: ${gpt4oUsage.input}`);
  await logger(`Output tokens: ${gpt4oUsage.output}`);

  const gpt4oTotal = gpt4oUsage.input + gpt4oUsage.output;
  const gpt4oContextUsage = (gpt4oTotal / gpt4oConfig.maxContextTokens) * 100;
  const gpt4oOutputUsage = (gpt4oUsage.output / gpt4oConfig.maxOutputTokens) * 100;

  await logger(`Total tokens used: ${gpt4oTotal} / ${gpt4oConfig.maxContextTokens} (${gpt4oContextUsage.toFixed(1)}%)`);
  await logger(`Remaining context window: ${gpt4oConfig.maxContextTokens - gpt4oTotal} tokens`);
  await logger(`Remaining output tokens: ${gpt4oConfig.maxOutputTokens - gpt4oUsage.output} / ${gpt4oConfig.maxOutputTokens} (${(100 - gpt4oOutputUsage).toFixed(1)}% available)`);

  // Calculate and log total cost
  const totalCost = calculateCosts({
    gpt4oMini: gpt4oMiniUsage,
    gpt4o: gpt4oUsage
  }).totalCost;

  await logger(`Total cost: $${totalCost.toFixed(4)}`);

  // Log email analysis
  if (report.emailAnalysis) {
    const { structure } = report.emailAnalysis;

    await logger("\nEmail Output:");
    await logger(`Subject: ${structure.subject}`);
    await logger(structure.greeting);
    await logger(structure.opening);

    for (const bullet of structure.bullets) {
      await logger(`• ${bullet}`);
    }

    await logger(structure.closing);
    await logger(structure.signature);
  }

  // Log quality metrics
  if (report.qualityMetrics) {
    await logger("\nQuality Metrics:");
    for (const [key, result] of Object.entries(report.qualityMetrics)) {
      await logger(`• ${key.replace(/([A-Z])/g, ' $1').trim()}: ${result.passed ? '✓' : '✗'}`);
      if (!result.passed && result.evidence?.length) {
        await logger(`  Evidence: ${result.evidence.join(', ')}`);
      }
    }
  }

  await logger("\n----------------------------------------");
}

async function logTestSummary(
  logger: Logger,
  reports: TestReport[],
  phraseTracking: Set<string>
): Promise<void> {
  await logger("\nPhrase Variation Analysis:");
  await logger(`• Unique Openings: ${new Set(reports.filter(r => r.emailAnalysis).map(r => r.emailAnalysis!.structure.opening)).size} / ${reports.length}`);
  await logger(`• Unique Bullets: ${new Set(reports.filter(r => r.emailAnalysis).flatMap(r => r.emailAnalysis!.structure.bullets)).size} / ${reports.length * 3}`);
  await logger(`• Total Unique Phrases: ${phraseTracking.size}`);

  const totalTokens = reports.reduce(
    (acc, r) => acc + r.tokenCosts.inputTokens + r.tokenCosts.outputTokens,
    0
  );

  const totalCost = reports.reduce(
    (acc, r) => acc + r.tokenCosts.totalCost,
    0
  );

  await logger("\nTest Summary:");
  await logger("----------------------------------------");
  await logger(`Total tokens used across all tests: ${totalTokens}`);
  await logger(`Average tokens per test: ${Math.round(totalTokens / reports.length)}`);
  await logger(`Total cost: $${totalCost.toFixed(4)}`);

  const successfulTests = reports.filter(r => r.status === 200).length;
  await logger(`Success rate: ${successfulTests}/${reports.length} (${(successfulTests/reports.length*100).toFixed(1)}%)`);
}

// CLI entrypoint
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