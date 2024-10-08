import Server from "lume/core/server.ts";
import notFound from "lume/middlewares/not_found.ts";
import redirects from "lume/middlewares/redirects.ts";
import { parseFeed } from "rss";

export const MEDIUM_RSS_URL = "https://medium.com/feed/@hirefrank"; // Replace with your Medium RSS feed URL
export const GITHUB_REPO = "hirefrank/www"; // Replace with your GitHub username and repo name
const GITHUB_PAT = Deno.env.get("GITHUB_PAT");
const KV = await Deno.openKv();

async function checkMediumAndTriggerRebuild() {
  try {
    const response = await fetch(MEDIUM_RSS_URL);
    const xml = await response.text();
    const feed = await parseFeed(xml);

    if (feed.entries.length === 0) {
      console.log("No posts found in the RSS feed");
      return;
    }

    const latestPostUrl = feed.entries[0].links[0].href;
    const lastCheckedUrl = await KV.get(["lastCheckedUrl"]);

    if (lastCheckedUrl.value !== latestPostUrl) {
      console.log("New post detected. Triggering rebuild...");

      await fetch(`https://api.github.com/repos/${GITHUB_REPO}/dispatches`, {
        method: "POST",
        headers: {
          "Authorization": `token ${GITHUB_PAT}`,
          "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify({
          event_type: "medium_post_published",
          client_payload: { post_url: latestPostUrl }
        })
      });

      await KV.set(["lastCheckedUrl"], latestPostUrl);
      console.log("Rebuild triggered and KV updated");
    } else {
      console.log("No new posts detected");
    }
  } catch (error) {
    console.error("Error checking Medium RSS:", error);
  }
}

// Set up the cron job
function setupCron() {
  const THIRTY_MINUTES = 30 * 60 * 1000;
  setInterval(checkMediumAndTriggerRebuild, THIRTY_MINUTES);
}

// Server setup
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
    "/vip": {
      "to": "https://cal.com/hirefrank/vip-catch-up",
      "code": 302
    },
    "/calp": {
      "to": "/vip",
      "code": 302
    },
    "/cal": {
      "to": "/vip",
      "code": 302
    },
    "/mailto": {
      "to": "mailto:frank@hirefrank.com?subject=Hi!",
      "code": 302
    }
  },
  strict: false,
}));

// Add a route for manual checking
server.use(async (request, next) => {
  if (request.method === "POST" && new URL(request.url).pathname === "/check-medium") {
    await checkMediumAndTriggerRebuild();
    return new Response("Medium check completed", { status: 200 });
  }
  return await next(request);
});

// Start the server and set up the cron job
server.start();
setupCron();

console.log("Listening on http://localhost:8000");