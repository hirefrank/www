import Server from "https:/deno.land/x/lume/core/server.ts";
import redirects from "https:/deno.land/x/lume/middlewares/redirects.ts";


const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.use(redirects({
  redirects: {
    "/from/": "/to/",
    "/from2/": "/to2/",

    // Use an object to configure the status code. (301 by default)
    "/from3/": {
      to: "/to2/",
      code: 302,
    },
  },
}));

server.start();

console.log("Listening on http://localhost:8000");