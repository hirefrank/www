import tailwindcss from "lume/plugins/tailwindcss.ts";
import tailwindColors from "tailwind/colors";
import postcss from "lume/plugins/postcss.ts";
import metas from "lume/plugins/metas.ts";
import sitemap from "lume/plugins/sitemap.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import robots from "lume/plugins/robots.ts";

import "lume/types.ts";


/** Configure the site */
export default function () {

  return (site: Lume.Site) => {
    site.use(tailwindcss({
        options: {
          theme: {
            colors: tailwindColors,
            fontFamily: {
              sans: ["Jost"],
              mark: ["DM Sans"],
            },
          },
          plugins: [],
        }
      }))
      .use(postcss())
      .use(metas())
      .use(minifyHTML())
      .use(robots())
      .use(sitemap({
        query: "indexable=true", // Select only pages with the indexable attribute as true
        sort: "date=desc", // To sort by data in ascendent order
      }))
      .copy("static", "./");
  }
}