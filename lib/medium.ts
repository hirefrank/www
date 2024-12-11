import { parseFeed } from "rss";

export const MEDIUM_RSS_URL = "https://medium.com/feed/@hirefrank";
export const GITHUB_REPO = "hirefrank/www";
const GITHUB_PAT = Deno.env.get("GITHUB_PAT");
const KV = await Deno.openKv();

export async function getMediumPosts() {
  const response = await fetch(MEDIUM_RSS_URL);
  const xml = await response.text();
  const feed = await parseFeed(xml);

  return feed.entries.map((entry) => ({
    title: entry.title?.value,
    link: entry.links[0]?.href,
    pubDate: new Date(entry.published || ""),
    content: entry.content?.value,
  }));
}

export async function checkMediumAndTriggerRebuild() {
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