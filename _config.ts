import lume from "lume/mod.ts";
import plugins from "./lib/plugins.ts";
import { getMediumPosts } from "./lib/medium.ts";
import { redirects, router, cacheBusting, notFound } from "./lib/middleware.ts";

const site = lume({
  src: "./content",
  location: new URL("https://hirefrank.com"),
  server: {
    middlewares: [
        redirects,
        router,
        notFound(),
        cacheBusting(),
    ],
  },
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

// Fetch Medium posts before site generation
site.addEventListener("beforeBuild", async () => {
  const mediumPosts = await getMediumPosts();
  site.data("mediumPosts", mediumPosts);
});

site.data('cacheBusterVersion', `v${Date.now()}`);

site.data("site", {
  title: "Frank Harris",
  name: "hirefrank",
  description: "Frank Harris's personal website.",
});

site.use(plugins());

export default site;