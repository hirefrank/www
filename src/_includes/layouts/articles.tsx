import {PageData, PageHelpers} from "#types";
import {formatDate} from "#utils";

export const layout = "layouts/root.tsx";

export default (
  params: PageData,
  {urlFilter}: PageHelpers,
) => {
  const {comp, header, articles, icons} = params

  return (
    <comp.layout.container header={header}>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark-border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {
            articles.map(article => {
                return <article className="md:grid md:grid-cols-4 md:items-baseline">
                  <div className="md:col-span-3 group relative flex flex-col items-start">
                    <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark-text-zinc-100">
                      <div
                        className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark-bg-zinc-800/50"></div>
                      <a href={article.url}>
                          <span
                            className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl">
                          </span>
                        <span
                          className="relative z-10">{article.title}
                        </span>
                      </a>
                    </h2>
                    <time
                      className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark-text-zinc-500 pl-3.5">
                        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark-bg-zinc-500"></span>
                        </span>
                      {formatDate(article.date.toString())}
                    </time>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark-text-zinc-400">
                      {article.description}
                    </p>
                    <div aria-hidden="true"
                         className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                      Read article

                      <comp.shared.icon
                        path={icons.arrowLeft}
                        className="ml-1 stroke-current"
                      />
                    </div>
                  </div>
                  <time
                    className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark-text-zinc-500"
                  >September 5, 2022
                  </time>
                </article>
              }
            )
          }
        </div>
      </div>
    </comp.layout.container>
  )
};
