import { createRootRoute, Outlet } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Navigation } from '~/components/Navigation'
import { Footer } from '~/components/Footer'
import '~/styles/globals.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Frank Harris's personal website." />
        <meta name="robots" content="index,follow" />
        <meta name="referrer" content="origin" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `!function(e,r){try{if(e.vector)return void console.log("Vector snippet included more than once.");var t={};t.q=t.q||[];for(var o=["load","identify","on"],n=function(e){return function(){var r=Array.prototype.slice.call(arguments);t.q.push([e,r])}},c=0;c<o.length;c++){var a=o[c];t[a]=n(a)}if(e.vector=t,!t.loaded){var i=r.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdn.vector.co/pixel.js";var l=r.getElementsByTagName("script")[0];l.parentNode.insertBefore(i,l),t.loaded=!0}}catch(e){console.error("Error loading Vector:",e)}}(window,document);vector.load("7037091c-ed0c-410d-a92d-7202a27ab1ca");`
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
