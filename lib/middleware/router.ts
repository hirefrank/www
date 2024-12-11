import Router from "experimental-router";
import { checkMediumAndTriggerRebuild } from "../medium.ts";
import { generateIntroEmail } from "../intro.ts";

const router = new Router({
  location: Deno.env.get("DENO_DEPLOYMENT_ID")
    ? "https://hirefrank.com"
    : "http://localhost:3000",
});

router.post("/api/generate-intro", generateIntroEmail);

// Add the Medium check endpoint
router.post("/check-medium", async () => {
  await checkMediumAndTriggerRebuild();
  return new Response("Medium check completed", { status: 200 });
});


export default router.middleware();