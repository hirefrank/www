import {PageData, PageHelpers} from "#types";

export const layout = "layouts/root.tsx";

export default (
  params: PageData,
  {urlFilter}: PageHelpers,
) => {
  const {comp, header, icons} = params

  const list = [
    {
      title: 'Planetaria',
      description: 'Creating technology to empower civilians to explore space on their own terms.',
      href: 'http://planetaria.tech',
      link: 'planetaria.tech',
      img: urlFilter('/images/logos/planetaria.svg'),
    },
    {
      title: 'Animaginary',
      description: 'High performance web animation library, hand-written in optimized WASM.',
      href: '#',
      link: 'github.com',
      img: urlFilter('/images/logos/animaginary.svg'),
    },
    {
      title: 'HelioStream',
      description: 'Real-time video streaming library, optimized for interstellar transmission.',
      href: '#',
      link: 'github.com',
      img: urlFilter('/images/logos/helio-stream.svg'),
    },
    {
      title: 'cosmOS',
      description: 'The operating system that powers our Planetaria space shuttles.',
      href: '#',
      link: 'github.com',
      img: urlFilter('/images/logos/cosmos.svg'),
    },
    {
      title: 'OpenShuttle',
      description: 'The schematics for the first rocket I designed that successfully made it to orbit.',
      href: '#',
      link: 'github.com',
      img: urlFilter('/images/logos/open-shuttle.svg'),
    }
  ]

  return (
    <comp.layout.container header={header}>
      <ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {
          list.map(item => {
            return <li className="group relative flex flex-col items-start">
              <div
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark-border dark-border-zinc-700/50 dark-bg-zinc-800 dark-ring-0">
                <img alt={item.title} loading="lazy" width="32" height="32" decoding="async" data-nimg="1" className="h-8 w-8"
                     src={item.img} style="color: transparent;"/>
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark-text-zinc-100">
                <div
                  className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark-bg-zinc-800/50"></div>
                <a href={item.href}><span
                  className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span><span
                  className="relative z-10">{item.title}</span></a></h2>
              <p className="relative z-10 mt-2 text-sm text-zinc-600 dark-text-zinc-400">
                {item.description}
              </p>
              <p
                className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark-text-zinc-200">

                <comp.shared.icon
                  path={icons.link}
                  size={20}
                  fill='currentColor'
                  className='flex-none'
                  viewBox="0 0 24 24"
                />
                <span className="ml-2">{item.link}</span></p>
            </li>
          })
        }

      </ul>
    </comp.layout.container>
  )
};
