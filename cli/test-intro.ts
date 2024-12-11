import { parse } from "std/flags";
import { ensureDir } from "std/fs";
import { join } from "std/path";
import { generateIntroEmail } from "../lib/intro.ts";
import { TokenCosts, calculateCosts } from "../lib/utils/token-costs.ts";

const TEST_CASES = [
  {
    name: "Lauren Growth/Data 1",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6289451-product-manager-research",
      additionalContext: "Lauren is a data-driven, highly collaborative PM with proven success in driving growth (+250% WAU at InVision) and breaking down complex technical problems (delivering an iterative roadmap to overhaul permissions & sharing at InVision). ",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
      token: "1x0000000000000000000000000000000AA",
    }
  },
  {
    name: "Lauren Growth/Data 2",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6289375-sr-product-manager",
      additionalContext: "Lauren is a data-driven, highly collaborative PM with proven success in driving growth (+250% WAU at InVision) and breaking down complex technical problems (delivering an iterative roadmap to overhaul permissions & sharing at InVision). ",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
      token: "1x0000000000000000000000000000000AA",
    }
  },
  {
    name: "Lauren 0 to 1 1",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6332639-senior-product-manager-enterprise",
      additionalContext: "Lauren is an action-oriented PM with a strong track record of launching innovative products from the ground up in ambiguous environments (launching some of Freehand's first project planning tools, like Tables: https://www.freehandapp.com/blog/introducing-tables/)",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
      token: "1x0000000000000000000000000000000AA",
    }
  },
  {
    name: "Lauren 0 to 1 2",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/5907621-senior-product-manager-cx-platform",
      additionalContext: "Lauren is an action-oriented PM with a strong track record of launching innovative products from the ground up in ambiguous environments (launching some of Freehand's first project planning tools, like Tables: https://www.freehandapp.com/blog/introducing-tables/)",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
      token: "1x0000000000000000000000000000000AA",
    }
  },
  // Add more test cases as needed
];

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

  try {
    await logger("Starting intro email generation tests...");

    for (const testCase of TEST_CASES) {
      await logger(`\nRunning test case: ${testCase.name}`);

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

        await logger("Test result:");
        await logger(`Status: ${response.status}`);
        await logger(`Subject: ${result.subject}`);
        await logger(`Body length: ${result.body.length} characters`);
        await logger("Body:");
        await logger(result.body);
        await logger("\nToken Usage:");
        await logger(`Input tokens: ${costs.inputTokens}`);
        await logger(`Output tokens: ${costs.outputTokens}`);
        await logger(`Cost: $${costs.totalCost.toFixed(4)}`);
        await logger("---");
      } catch (error) {
        await logger(`Error in test case ${testCase.name}:`);
        await logger(error instanceof Error ? error.message : String(error));
      }
    }

    await logger("\nTotal Token Usage:");
    await logger(`Total input tokens: ${totalCosts.inputTokens}`);
    await logger(`Total output tokens: ${totalCosts.outputTokens}`);
    await logger(`Total cost: $${totalCosts.totalCost.toFixed(4)}`);

  } catch (error) {
    await logger(`Fatal error: ${error instanceof Error ? error.message : String(error)}`);
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