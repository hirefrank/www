import lume from "lume/mod.ts";
import plugins from "./plugins.ts";

const site = lume({
  src: "./src",
  location: new URL("https://hirefrank.com"),

});

const pageConfigs: Array<{ path: string; layout: string; tags?: string[] }> = [
  { path: "/pages", layout: "simple.vto" },
  { path: "/writings", layout: "simple.vto", tags: ["writing"] },
  { path: "/videos", layout: "simple.vto", tags: ["video"] },
];

pageConfigs.forEach(({ path, layout, tags }) => {
  site.data("layout", layout, path);
  if (tags) site.data("tags", tags, path);
});

site.use(plugins());

export default site;