import Server from "lume/core/server.ts";
import notFound from "lume/middlewares/not_found.ts";
import redirects from "lume/middlewares/redirects.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`
});

server.use(notFound());
server.use(redirects({
  redirects: {
    "/14/08/why-is-it-so-hard/": "/videos/why-is-it-so-hard/",
    "/18/03/rainbows-rainier/": "/videos/rainbows-rainier/",
    "/17/03/bey-toe-ven/": "/videos/bey-toe-ven/",
    "/16/03/past-to-find-the-future/": "/videos/past-to-find-the-future/",
    "/15/06/cooke-blowin-in-the-wind/": "/videos/cooke-blowin-in-the-wind/",
    "/14/09/apple-in-your-mouth/": "/videos/apple-in-your-mouth/",
    "/14/09/long-shadows/": "/videos/long-shadows/",
    "/tag/summer": "/",
    "/tag/video": "/",
    "/tag/twitter": "/",
    "/tag/movies": "/",
    "/tag/music": "/",
    "/tag/nyc": "/",
    "/feeds/rss.xml": "/",
    "/tags": "/",
    "/archives": "/",
    "/sitemap.xml": "/",
    "/cal": {
      "to": "https://cal.com/hirefrank",
      "code": 302
    },
    "/calp": {
      "to": "https://cal.com/hirefrank",
      "code": 302
    }
  },
  strict: false,
}));

server.start();

console.log("Listening on http://localhost:8000");