import lume from "lume/mod.ts";
//import date from "lume/plugins/date.ts";
//import metas from "lume/plugins/metas.ts";
//import sass from "lume/plugins/sass.ts";

const site = lume();

//site.use(date());
//site.use(metas());
//site.use(sass());

site.copy("public", ".");
site.copy("assets", ".");
site.ignore("example")

//copy redirects to site folder.

export default site;
