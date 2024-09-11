import Server from "lume/core/server.ts";
import not_found from "lume/middlewares/not_found.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`
});

server.use(not_found())
server.start();

console.log("Listening on http://localhost:8000");