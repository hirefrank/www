import Router from "experimental-router";
import { checkMediumAndTriggerRebuild } from "../medium.ts";
import { generateIntroEmail } from "../intro.ts";

const router = new Router({
  location: "http://localhost:3000",
});

router.get("/bl", () => {
  return new Response(
    `
    <html>
      <head>
        <title>Router demo</title>
      </head>
      <body>
        <form method="post" action="/say">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name">
          <button type="submit">Say hello</button>
        </form>
      </body>
    `,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
});

router.post("/say", async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const name = formData.get("name");
  return new Response(`Hello, ${name}!`);
});

router.get("/hello/:name", ({ name }) =>
  Response.json({
    message: `Hello, ${name}!`,
  }));

router.post("/api/generate-intro", generateIntroEmail);

// Add the Medium check endpoint
router.post("/check-medium", async () => {
  await checkMediumAndTriggerRebuild();
  return new Response("Medium check completed", { status: 200 });
});


export default router.middleware();