import Router from "experimental-router";
import { generateIntroEmail } from "../../intro/mod.ts";

const router = new Router({
  location: Deno.env.get("DENO_DEPLOYMENT_ID")
    ? "https://hirefrank.com"
    : "http://localhost:3000",
});

router.post("/api/generate-intro", generateIntroEmail);

export default router.middleware();