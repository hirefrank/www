import lume from "lume/mod.ts";
import plugins from "./plugins.ts";
import { parseFeed } from "rss";
import { MEDIUM_RSS_URL } from "./serve.ts";

const site = lume({
  src: "./src",
  location: new URL("https://hirefrank.com"),
});

const pageConfigs: Array<{ path: string; layout: string; tags?: string[]; indexable?: boolean }> = [
  { path: "/pages", layout: "simple.vto" },
  { path: "/writings", layout: "simple.vto", tags: ["writing"] },
  { path: "/videos", layout: "simple.vto", tags: ["video"], indexable: true },
];

pageConfigs.forEach(({ path, layout, tags, indexable }) => {
  site.data("layout", layout, path);
  if (tags) site.data("tags", tags, path);
  if (indexable) site.data("indexable", indexable, path);
});

async function getMediumPosts() {
  const response = await fetch(MEDIUM_RSS_URL);
  const xml = await response.text();
  const feed = await parseFeed(xml);

  return feed.entries.map((entry) => ({
    title: entry.title?.value,
    link: entry.links[0]?.href,
    pubDate: new Date(entry.published || ""),
    content: entry.content?.value,
  }));
}

// Use an IIFE to allow top-level await
(async () => {
  const mediumPosts = await getMediumPosts();
  site.data("mediumPosts", mediumPosts);
})();

site.data("site", {
  title: "Frank Harris",
  name: "hirefrank",
  description: "Frank Harris's personal website.",
});
site.use(plugins());

export default site;