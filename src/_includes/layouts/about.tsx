import type {PageData, PageHelpers} from "#types";

export const layout = "layouts/root.tsx";

export default (
  params: PageData,
  {urlFilter}: PageHelpers
) => {
  const {icons, comp, header} = params
  return (
    <div className="sm:px-8 mt-16 sm:mt-32">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
              <div className="lg:pl-20">
                <div className="max-w-xs px-2.5 lg:max-w-none">
                  <img alt="" loading="lazy" width="800" height="800"
                       decoding="async" data-nimg="1"
                       className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark-bg-zinc-800"
                       sizes="(min-width: 1024px) 32rem, 20rem"
                       style="color: transparent;"
                       src={urlFilter!("/images/portrait.jpg")}
                  />

                </div>
              </div>
              <div className="lg:order-first lg:row-span-2">
                <h1
                  className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark-text-zinc-100">
                  {header.title}
                </h1>
                <div className="mt-6 space-y-7 text-base text-zinc-600 dark-text-zinc-400">
                  <p>
                    I’ve loved making things for
                    as long as I can remember, and wrote my first program when I was 6 years old, just two weeks after
                    my
                    mom brought home the brand new Macintosh LC 550 that I taught myself to type on.</p><p>The only
                  thing
                  I loved more than computers as a kid was space. When I was 8, I climbed the 40-foot oak tree at the
                  back of our yard while wearing my older sister’s motorcycle helmet, counted down from three, and
                  jumped — hoping the tree was tall enough that with just a bit of momentum I’d be able to get to
                  orbit.
                </p>
                  <p>
                    I spent the next few summers indoors working on a rocket design, while I recovered from
                    the multiple surgeries it took to fix my badly broken legs. It took nine iterations, but when I was
                    15
                    I sent my dad’s Blackberry into orbit and was able to transmit a photo back down to our family
                    computer from space.
                  </p>
                  <p>
                    Today, I’m the founder of Planetaria, where we’re working on civilian space
                    suits and manned shuttle kits you can assemble at home so that the next generation of kids
                    really <em>can</em> make it to orbit — from the comfort of their own backyards.
                  </p>
                </div>
              </div>
              <div className="lg:pl-20">
                <ul role="list">
                  <li className="flex"><a
                    className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark-text-zinc-200 dark-hover:text-teal-500"
                    href="#">
                    <comp.shared.icon
                      path={icons.twitter}
                      size={24}
                      className="fill-zinc-500 transition group-hover:fill-zinc-600 dark-fill-zinc-400 dark-group-hover:fill-zinc-300"
                      viewBox="0 0 24 24"
                    />
                    <span className="ml-4">Follow on X</span></a>
                  </li>
                  <li className="mt-4 flex"><a
                    className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark-text-zinc-200 dark-hover:text-teal-500"
                    href="#">

                    <comp.shared.icon
                      path={icons.instagram.path1}
                      path2={icons.instagram.path2}
                      size={24}
                      className="fill-zinc-500 transition group-hover:fill-zinc-600 dark-fill-zinc-400 dark-group-hover:fill-zinc-300"
                      viewBox="0 0 24 24"
                    />
                    <span className="ml-4">Follow on Instagram</span></a></li>
                  <li className="mt-4 flex"><a
                    className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark-text-zinc-200 dark-hover:text-teal-500"
                    href="#">
                    <comp.shared.icon
                      path={icons.github}
                      size={24}
                      className="fill-zinc-500 transition group-hover:fill-zinc-600 dark-fill-zinc-400 dark-group-hover:fill-zinc-300"
                      viewBox="0 0 24 24"
                    />
                    <span className="ml-4">Follow on GitHub</span></a></li>
                  <li className="mt-4 flex"><a
                    className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark-text-zinc-200 dark-hover:text-teal-500"
                    href="#">
                    <comp.shared.icon
                      path={icons.linkedin}
                      className="fill-zinc-500 transition group-hover:fill-zinc-600 dark-fill-zinc-400 dark-group-hover:fill-zinc-300"
                      size={24}
                      viewBox="0 0 24 24"
                    />
                    <span className="ml-4">Follow on LinkedIn</span></a></li>
                  <li className="mt-8 border-t border-zinc-100 pt-8 dark-border-zinc-700/40 flex"><a
                    className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark-text-zinc-200 dark-hover:text-teal-500"
                    href="mailto:spencer@planetaria.tech">

                    <comp.shared.icon
                      path={icons.mailFull}
                      size={24}
                      className="flex-none fill-zinc-500 transition group-hover:fill-teal-500"
                      viewBox="0 0 24 24"
                    />
                    <span className="ml-4">spencer@planetaria.tech</span>
                  </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
