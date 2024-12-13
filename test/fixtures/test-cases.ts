export const TEST_CASES = [
  {
    name: "Frank Harris 1",
    input: {
      jobUrl: "https://boards.greenhouse.io/anthropic/jobs/4416929008",
      additionalContext: "I have experience building demos with LLMs",
      resume: Array.from(await Deno.readFile("./test/fixtures/frank.pdf")),
      expected: {
        contains: ["Hey {firstName},", "demos", "LLMs"],
      },
    }
  },
  {
    name: "Lauren Growth/Data 1",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6289451-product-manager-research",
      additionalContext: "Lauren is a data-driven, highly collaborative PM with proven success in driving growth (+250% WAU at InVision) and breaking down complex technical problems (delivering an iterative roadmap to overhaul permissions & sharing at InVision). ",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
      expected: {
        contains: ["Hey {firstName},", "growth", "data"],
      },
    }
  },
  {
    name: "Lauren Growth/Data 2",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6289375-sr-product-manager",
      additionalContext: "Lauren is a data-driven, highly collaborative PM with proven success in driving growth (+250% WAU at InVision) and breaking down complex technical problems (delivering an iterative roadmap to overhaul permissions & sharing at InVision). ",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
      expected: {
        contains: ["Hey {firstName},", "growth", "data"],
      },
    }
  },
  {
    name: "Lauren 0 to 1 1",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/6332639-senior-product-manager-enterprise",
      additionalContext: "Lauren is an action-oriented PM with a strong track record of launching innovative products from the ground up in ambiguous environments (launching some of Freehand's first project planning tools, like Tables: https://www.freehandapp.com/blog/introducing-tables/)",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
      expected: {
        contains: ["Hey {firstName},", "ambitious", "innovative"],
      },
    }
  },
  {
    name: "Lauren 0 to 1 2",
    input: {
      jobUrl: "https://jobasaurus--new-ui-p2.deno.dev/job/5907621-senior-product-manager-cx-platform",
      additionalContext: "Lauren is an action-oriented PM with a strong track record of launching innovative products from the ground up in ambiguous environments (launching some of Freehand's first project planning tools, like Tables: https://www.freehandapp.com/blog/introducing-tables/)",
      resume: Array.from(await Deno.readFile("./test/fixtures/lauren.pdf")),
      expected: {
        contains: ["Hey {firstName},", "ambitious", "innovative"],
      },
    }
  },
];
