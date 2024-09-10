import lume from "lume/mod.ts";
import plugins from "./plugins.ts";

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

site.data("site", {
  title: "Frank Harris",
  name: "hirefrank",
  description: "Frank Harris's personal website.",
});
site.use(plugins());

export default site;