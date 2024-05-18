import {formatDate} from "#utils";
import type { PageData } from "#types";

export const layout = "layouts/root.tsx";

export default (
  params: PageData,
) => {
  const {
    content,
    date,
    icons: { unicons },
    title,
  } = params;

  return (
    <div className="sm:px-8 mt-16 lg:mt-32">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="xl:relative">

              <div className="mx-auto max-w-2xl">
                <button type="button" aria-label="Go back to articles"
                        className="article-back group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark-border dark-border-zinc-700/50 dark-bg-zinc-800 dark-ring-0 dark-ring-white/10 dark-hover:border-zinc-700 dark-hover:ring-white/20">
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"
                       className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark-stroke-zinc-500 dark-group-hover:stroke-zinc-400">
                    <path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </button>
                <article>
                  <header className="flex flex-col">
                    <h1
                      className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark-text-zinc-100">{title}</h1>
                    <time className="order-first flex items-center text-base text-zinc-400 dark-text-zinc-500">
                      <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark-bg-zinc-500"></span>
                      <span className="ml-3">{formatDate(date.toString())}</span>
                    </time>
                  </header>

                  <div className="mt-8 prose dark-prose-invert" data-mdx-content="true">
                    <div
                      itemProp="articleBody"
                      className="blog-post-body"
                      dangerouslySetInnerHTML={{__html: content as string}}
                    />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
