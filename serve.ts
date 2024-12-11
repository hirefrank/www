import Server from "lume/core/server.ts";
import onDemand from "lume/middlewares/on_demand.ts";
import site from "./_config.ts";
import { redirects, router, notFound } from "./lib/middleware.ts";
import { checkMediumAndTriggerRebuild } from "./lib/medium.ts";


const server = new Server({
  root: `${Deno.cwd()}/_site`,
  port: 8000,
});

// domain routing middleware
server.use(async (request, next) => {
  const host = request.headers.get('host');
  if (host && /^(www\.)?workingtitles\.xyz$/.test(host)) {
    return new Response(null, {
      status: 302,
      headers: { Location: "https://hirefrank.com/coaching/?ref=workingtitles.xyz" }
    });
  }
  return await next(request);
});

server.use(redirects);
server.use(router);
server.use(onDemand({ site }));
server.use(notFound());

Deno.cron("medium trigger", "0 6 * * *", async () => {
  await checkMediumAndTriggerRebuild();
  console.log("check medium and trigger rebuild executed at 6 am");
});

console.log("Listening on http://localhost:8000");