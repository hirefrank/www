import Server from "lume/core/server.ts";
import notFound from "lume/middlewares/not_found.ts";
import redirects from "lume/middlewares/redirects.ts";
// import onDemand from "lume/middlewares/on_demand.ts";
// import "./_preload.ts";
// import site from "./_config.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`
});

// New middleware for domain routing
server.use(async (request, next) => {
  const host = request.headers.get('host');
  if (host && /^(www\.)?workingtitles\.xyz$/.test(host)) {
    return new Response(null, {
      status: 302,
      headers: { Location: "https://hirefrank.com/coaching/?ref=workingtitles.xyz" }
    });
  }

  // If not redirecting, pass the request to the next middleware
  return await next(request);
});

server.use(notFound());
server.use(redirects({
  redirects: {
    "w9": "/extras/w9.pdf",
    "/14/08/why-is-it-so-hard/": "/videos/why-is-it-so-hard/",
    "/18/03/rainbows-rainier/": "/videos/rainbows-rainier/",
    "/17/03/bey-toe-ven/": "/videos/bey-toe-ven/",
    "/16/03/past-to-find-the-future/": "/videos/past-to-find-the-future/",
    "/15/06/cooke-blowin-in-the-wind/": "/videos/cooke-blowin-in-the-wind/",
    "/14/09/apple-in-your-mouth/": "/videos/apple-in-your-mouth/",
    "/14/09/long-shadows/": "/videos/long-shadows/",
    "/tag/summer": "/writings",
    "/tag/video": "/writings",
    "/tag/twitter": "/writings",
    "/tag/movies": "/writings",
    "/tag/music": "/writings",
    "/tag/nyc": "/writings",
    "/feeds/rss.xml": "/writings",
    "/tags": "/writings",
    "/archives": "/writings",
    "/cal": {
      "to": "https://cal.com/hirefrank/catchup",
      "code": 302
    },
    "/calp": {
      "to": "/cal",
      "code": 302
    },
    "/mailto": {
      "to": "mailto:frank@hirefrank.com?subject=Hi!",
      "code": 302
    }
  },
  strict: false,
}));

// server.use(onDemand({ site }));
server.start();

console.log("Listening on http://localhost:8000");