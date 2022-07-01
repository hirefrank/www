import lume from "lume/mod.ts"
import postcss from 'lume/plugins/postcss.ts'
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";

const site = lume();

site.use(date());
site.use(metas());
site.use(postcss())

site.copy("static", ".")
site.copy("redirects", "_redirects");
site.ignore("example", "public")

//copy redirects to site folder.

export default site;
