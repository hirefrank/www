export const layout = "base.vto";

export default function* () {
  yield {
    url: "/success/",
    title: "Success",
    content: "Message sent! I'll be in touch shortly.",
  },
  yield {
    url: "/404.html",
    title: "Not found",
    content: "Whoops. Content not found.",
  },
  yield {
    url: "/projects/",
    title: "Projects",
    layout: "projects.vto",
  },
  yield {
    url: "/index.html",
    title: "Frank Harris",
    description: "Frank Harris's personal website.",
    layout: "home.vto",
    indexable: true,
  };
}