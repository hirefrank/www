import type { Page } from "#types";

export const indexable = true;
export const type = "article";
export const layout = "layouts/article.tsx";

export function url(page: Page): string {
  return `/article/${page.data.title}/`;
}

