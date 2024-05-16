import type {PageData, PageHelpers} from "#types";
import {formatDate} from "#utils";

export const renderOrder = 1;
export const indexable = true;
export const title = "Home";
export const layout = "layouts/root.tsx";

const header = {
  title: 'Software designer, founder, and amateur astronaut.',
  description: 'I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.'
}

export default (
  params: PageData,
  { urlFilter }: PageHelpers,
) => {
  const {comp, icons, search } = params
  const articles = search?.pages("type=article", "date=desc", 3)

  const images = [
    {
      id: 1,
      src: urlFilter!("/images/photos/image-1.jpg"),
      className: 'rotate-2'
    },
    {
      id: 2,
      src: urlFilter!("/images/photos/image-2.jpg"),
      className: '-rotate-2'
    },
    {
      id: 3,
      src: urlFilter!("/images/photos/image-3.jpg"),
      className: 'rotate-2'
    }
  ]
  const workList = [
    {
      icon: urlFilter('/images/logos/planetaria.svg'),
      company: 'Planetaria',
      role: 'CEO',
      start: '2019',
      end: 'Present'
    },
    {
      icon: urlFilter('/images/logos/airbnb.svg'),
      company: 'Airbnb',
      role: 'Product Designer',
      start: '2014',
      end: '2019'
    },
    {
      icon: urlFilter('/images/logos/facebook.svg'),
      company: 'Facebook',
      role: 'iOS Software Engineer',
      start: '2011',
      end: '2014'
    },
    {
      icon: urlFilter('/images/logos/starbucks.svg'),
      company: 'Starbucks',
      role: 'Shift Supervisor',
      start: '2008',
      end: '2011'
    }
  ]

  const socialMedias = () => {
    return <div className="mt-6 flex gap-6">
      <a className="group -m-1 p-1" aria-label="Follow on X" href="#">
        <comp.shared.icon
          path={icons.twitter}
          size={24}
          className="fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
          viewBox="0 0 24 24"
        />
      </a>
      <a className="group -m-1 p-1" aria-label="Follow on Instagram" href="#">
        <comp.shared.icon
          path={icons.instagram.path1}
          path2={icons.instagram.path2}
          size={24}
          className="fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
          viewBox="0 0 24 24"
        />
      </a>
      <a className="group -m-1 p-1" aria-label="Follow on GitHub" href="#">
        <comp.shared.icon
          path={icons.github}
          size={24}
          className="fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
          viewBox="0 0 24 24"
        />
      </a>
      <a className="group -m-1 p-1" aria-label="Follow on LinkedIn" href="#">
        <comp.shared.icon
          path={icons.linkedin}
          className="fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
          size={24}
          viewBox="0 0 24 24"
        />
      </a>
    </div>
  }

  return (
    <comp.layout.container header={header} headerChild={socialMedias()}>

      <div className="-my-4 flex justify-center overflow-hidden gap-5 py-4 sm:gap-8">
        {
          images.map(image =>
            <div
              key={image.id}
              className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800 ${image.className}`}>

              <img
                src={image.src}
                alt=""
                loading="lazy"
                decoding="async"
                data-nimg="1"
                className="absolute inset-0 h-full w-full object-cover"
                style="color:transparent"
                sizes="(min-width: 640px) 18rem, 11rem"
              />
            </div>
          )
        }
      </div>

      <div className="sm:px-8 mt-24 md:mt-28">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                <div className="flex flex-col gap-16">
                  {
                    articles.map(({data}) => {
                      return <article className="group relative flex flex-col items-start">
                        <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                          <div
                            className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>
                          <a href={data.url}>
                            <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                            <span className="relative z-10">{data.title}</span>
                          </a>
                        </h2>
                        <time
                          className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                          dateTime={data.date}>
                          <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                          </span>
                          {formatDate(data.date.toString())}
                        </time>
                        <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                          {data.description}
                        </p>
                        <div aria-hidden="true"
                             className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                          Read article
                          <comp.shared.icon
                            path={icons.arrowLeft}
                            className="ml-1 stroke-current"
                          />
                        </div>
                      </article>
                    })
                  }
                </div>
                <div className="space-y-10 lg:pl-16 xl:pl-24">
                  <form className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40" action="/thank-you">
                    <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      <comp.shared.icon
                        path={icons.mail.path1}
                        path2={icons.mail.path2}
                        size={24}
                        p1ClassName="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                        p2ClassName="stroke-zinc-400 dark:stroke-zinc-500"
                        viewBox="0 0 24 24"
                      />

                      <span className="ml-3">Stay up to date</span>
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      Get notified when I publish something
                      new, and unsubscribe at any time.
                    </p>
                    <div className="mt-6 flex"><input type="email" placeholder="Email address"
                                                      aria-label="Email address" required=""
                                                      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"/>
                      <button
                        className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none"
                        type="submit">Join
                      </button>
                    </div>
                  </form>
                  <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                    <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      <comp.shared.icon
                        path={icons.work.path1}
                        path2={icons.work.path2}
                        size={24}
                        p1ClassName="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                        p2ClassName="stroke-zinc-400 dark:stroke-zinc-500"
                        viewBox="0 0 24 24"
                      />

                      <span className="ml-3">Work</span></h2>
                    <ol className="mt-6 space-y-4">
                      {
                        workList.map(item =>
                          <li className="flex gap-4">
                            <div
                              className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                              <img alt="" loading="lazy" width="32" height="32" decoding="async" data-nimg="1"
                                   className="h-7 w-7" style="color:transparent"
                                   src={item.icon}/></div>
                            <dl className="flex flex-auto flex-wrap gap-x-2">
                              <dt className="sr-only">Company</dt>
                              <dd
                                className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.company}
                              </dd>
                              <dt className="sr-only">Role</dt>
                              <dd className="text-xs text-zinc-500 dark:text-zinc-400">{item.company}</dd>
                              <dt className="sr-only">Date</dt>
                              <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                                <time>{item.start}</time>
                                <span aria-hidden="true">—</span>
                                <time>{item.end}</time>
                              </dd>
                            </dl>
                          </li>)
                      }
                    </ol>
                    <a
                      className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-6 w-full"
                      href="#">
                      Download CV

                      <comp.shared.icon
                        path={icons.arrowDown}
                        size={26}
                        className="stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
                        viewBox="0 0 24 24"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </comp.layout.container>
  )
};

