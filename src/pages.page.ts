export const layout = "base.vto";

export default function* () {
  yield {
    url: "/404.html",
    title: "Not found",
    content: "Whoops. Content not found.",
  },
  yield {
    url: "/projects/",
    layout: "simple.vto",
    title: "Side Projects",
    description: "",
    indexable: true
  }
}