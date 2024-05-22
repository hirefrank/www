import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import sass from "lume/plugins/sass.ts";
import terser from "lume/plugins/terser.ts";
import inline from "lume/plugins/inline.ts";
import sitemap from "lume/plugins/sitemap.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import mdx from "lume/plugins/mdx.ts";
import unified from "lume/plugins/remark.ts";

import remarkPlugins from "#plugins/unified/remark/mod.ts";
import rehypePlugins from "#plugins/unified/rehype/mod.ts";

const site = lume({
  src: "./src",
  server: {
    page404: "/404/",
    port: 3005
  },
}, {
  url: {
    names: {
      url: "urlFilter",
      htmlUrl: "htmlUrlFilter",
    },
  },
});

site
  .copy("assets", ".")
  .use(date())
  .use(slugify_urls({
    replace: {
      "&": "and",
      "@": "",
    },
  }))
  .use(jsx())
  .use(sass())
  .use(unified({
    remarkPlugins,
    rehypePlugins,
  }))
  .loadAssets([".js"])
  .use(terser())
  .use(inline())
  .use(tailwindcss({
    extensions: [".html", ".jsx"]
  }))
  .use(postcss())
  .use(sitemap({
    query: "indexable=true",
  }))
  .use(mdx(/* Options */));

export default site;
