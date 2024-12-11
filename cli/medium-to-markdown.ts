import { parse } from "std/flags";
import { ensureDir } from "std/fs";
import { join } from "std/path";
import mediumToMarkdown from "medium-to-markdown";

const args = parse(Deno.args);
const mediumUrl = String(args._[0]);

if (!mediumUrl) {
  console.error("Please provide a Medium URL as an argument.");
  Deno.exit(1);
}

function extractSlug(url: string): string {
  const parsedUrl = new URL(url);
  const pathParts = parsedUrl.pathname.split("/");
  const lastPart = pathParts[pathParts.length - 1];
  return lastPart.split("-").slice(0, -1).join("-");
}

async function convertAndSave(url: string) {
  try {
    const markdown = await mediumToMarkdown.convertFromUrl(url);
    const slug = extractSlug(url);
    const outputDir = "./src/writings";
    const outputPath = join(outputDir, `${slug}.md`);

    await ensureDir(outputDir);
    await Deno.writeTextFile(outputPath, markdown);

    console.log(`Markdown file saved: ${outputPath}`);
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : String(error));
  }
}

convertAndSave(mediumUrl);