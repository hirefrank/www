import lume from "lume/mod.ts"
import postcss from 'lume/plugins/postcss.ts'
import date from "lume/plugins/date.ts";
//import metas from "lume/plugins/metas.ts";

const site = lume()

site
  .data("year", new Date().getFullYear())

site
  .use(postcss())
  .use(date())

  
site
  .copy("static", ".")
  .copy("redirects", "_redirects")
  .copy("assets/fonts")

site
  .ignore("solved-by-flexbox-master")

export default site;
