import Server from "https:/deno.land/x/lume/core/server.ts";
import redirects from "https:/deno.land/x/lume/middlewares/redirects.ts";


const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.use(redirects({
  redirects: {
    "/cal": {
      to: "https://zcal.co/hirefrank",
      code: 302,
    },
    "/calp": {
      to: "https://zcal.co/hirefrank/catchup",
      code: 302,
    },
  },
}));

server.start();

console.log("Listening on http://localhost:8000");