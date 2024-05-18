import type { PageData, PageHelpers } from "#types";

export default (
  { children, search, comp, excerpt, importJs, site, title, type, url }: PageData,
  { urlFilter }: PageHelpers,
) => {
  const postSlug = title?.replace(/\s+/g, "-").toLowerCase();

  return (
    <html
      lang={site.lang}
      className="h-full antialiased"
    >


    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>{`${title} - ${site.title}`}</title>

      <link rel="stylesheet" nonce="CSP_NONCE" href={urlFilter!(`/styles.css`)}/>
      <script type="module" nonce="CSP_NONCE" src={urlFilter!(`/scripts/main.js`)} inline/>

      <meta name="supported-color-schemes" content="light dark"/>
      <meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)"/>
        <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)"/>

      <meta name="title" content={`${title} - ${site.title}`}/>
      <meta name="description" content={excerpt || site.description}/>
      <meta name="author" content={site.title}/>
      <meta name="copyright" content={site.title}/>

      <meta name="robots" content="index,follow"/>
      <meta name="google" content="nositelinkssearchbox"/>

      <meta property="og:type" content="website"/>
      <meta property="og:site_name" content={site.title}/>
      <meta property="og:locale" content={site.lang}/>
      <meta property="og:title" content={`${title} - ${site.title}`}/>
      <meta
        property="og:description"
        content={excerpt || site.description}
      />
      <meta property="og:url" content={urlFilter!("/", true)}/>
      {type && type === "post" && (
        <meta
          property="og:image"
          content={`${
            urlFilter!(
              `/images/og/${
                postSlug?.replaceAll(/(\@|\%)/gm, "").replaceAll("/", "-")
              }.jpg`,
              true,
            )
          }`}
        />
      )}

      <meta name="twitter:title" content={`${title} - ${site.title}`}/>
      <meta
        name="twitter:description"
        content={excerpt || site.description}
      />
      <meta name="twitter:card" content="summary_large_image"/>
      {type && type === "post" && (
        <meta
          name="twitter:image"
          content={`${
            urlFilter!(
              `/images/og/${
                postSlug?.replaceAll(/(\@|\%)/gm, "").replaceAll("/", "-")
              }.jpg`,
              true,
            )
          }`}
        />
      )}

      <meta name="twitter:creator" content={site.twitter.user}/>
      <meta name="twitter:site" content={site.twitter.user}/>

      <meta itemProp="name" content={site.title}/>
      <meta itemProp="url" content={urlFilter!("/", true)}/>
      <meta itemProp="creator" content={site.author.name}/>

      <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href={urlFilter!("/sitemap.xml")}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title="Atom feed"
        href={urlFilter!("/feed.xml")}
      />

      <link rel="manifest" href={urlFilter!("/manifest.json")}/>
    </head>
    <body className="flex h-full bg-zinc-50 dark-bg-black">
    <div className="flex w-full">
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
        <div className="w-full bg-white ring-1 ring-zinc-100 dark-bg-zinc-900 dark-ring-zinc-300/20"></div>
        </div>
      </div>

      <div className="relative flex w-full flex-col">
        <comp.layout.navbar activeUrl={url}/>

        <div className="flex-none"></div>

        <main
          className="flex-auto"
          itemScope
          itemProp="mainContentOfPage"
        >
          {children}
        </main>

        <comp.layout.footer/>
      </div>
    </div>
    </body>


    </html>
  );
};
