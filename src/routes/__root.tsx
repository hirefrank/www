import { createRootRoute, Outlet, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Navigation } from "~/components/Navigation";
import { Footer } from "~/components/Footer";
import { useCalEmbed } from "~/hooks/useCalEmbed";
import globalsCss from "~/styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: "stylesheet", href: globalsCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: "Frank Harris - Coach and former product executive helping leaders grow with intention." },
      { name: "robots", content: "index,follow" },
      { name: "referrer", content: "origin" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Frank Harris" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    title: "Frank Harris",
  }),
  component: RootComponent,
});

function RootComponent() {
  useCalEmbed();

  return (
    <RootDocument>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          async
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(e,r){try{if(e.vector)return void console.log("Vector snippet included more than once.");var t={};t.q=t.q||[];for(var o=["load","identify","on"],n=function(e){return function(){var r=Array.prototype.slice.call(arguments);t.q.push([e,r])}},c=0;c<o.length;c++){var a=o[c];t[a]=n(a)}if(e.vector=t,!t.loaded){var i=r.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdn.vector.co/pixel.js";var l=r.getElementsByTagName("script")[0];l.parentNode.insertBefore(i,l),t.loaded=!0}}catch(e){console.error("Error loading Vector:",e)}}(window,document);vector.load("7037091c-ed0c-410d-a92d-7202a27ab1ca");`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
