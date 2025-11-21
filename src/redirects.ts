/**
 * URL Redirects Configuration
 *
 * Migrated from Lume middleware. These redirects are handled
 * at the edge in Cloudflare Workers before reaching the app.
 */

type RedirectConfig =
  | string
  | { to: string; code: 301 | 302 | 303 | 307 | 308 }

export const redirects: Record<string, RedirectConfig> = {
  // Static file redirects
  '/w9': '/extras/w9.pdf',
  '/resume': '/extras/resume.pdf',

  // Old blog post URL redirects to videos
  '/14/08/why-is-it-so-hard/': '/videos/why-is-it-so-hard/',
  '/18/03/rainbows-rainier/': '/videos/rainbows-rainier/',
  '/17/03/bey-toe-ven/': '/videos/bey-toe-ven/',
  '/16/03/past-to-find-the-future/': '/videos/past-to-find-the-future/',
  '/15/06/cooke-blowin-in-the-wind/': '/videos/cooke-blowin-in-the-wind/',
  '/14/09/apple-in-your-mouth/': '/videos/apple-in-your-mouth/',
  '/14/09/long-shadows/': '/videos/long-shadows/',

  // Tag pages redirect to writings
  '/tag/summer': '/writings',
  '/tag/video': '/writings',
  '/tag/twitter': '/writings',
  '/tag/movies': '/writings',
  '/tag/music': '/writings',
  '/tag/nyc': '/writings',
  '/feeds/rss.xml': '/writings',
  '/tags': '/writings',
  '/archives': '/writings',

  // External redirects (coaching calendar links)
  '/discovery': {
    to: 'https://coaching.hirefrank.com/book/complimentary-coaching-consultation',
    code: 302,
  },
  '/vip': {
    to: 'https://coaching.hirefrank.com/book/vip-catch-up',
    code: 302,
  },
  '/calp': {
    to: 'https://coaching.hirefrank.com/book/vip-catch-up',
    code: 302,
  },
  '/cal': {
    to: 'https://coaching.hirefrank.com/book/vip-catch-up',
    code: 302,
  },

  // Mailto redirect
  '/mailto': {
    to: 'mailto:frank@hirefrank.com?subject=Hi!',
    code: 302,
  },
}

/**
 * Check if a URL path should be redirected
 * Returns a Response if redirect is needed, null otherwise
 */
export function handleRedirect(pathname: string, baseUrl: string): Response | null {
  // Normalize path (handle trailing slashes)
  const normalizedPath = pathname.endsWith('/') && pathname !== '/'
    ? pathname
    : pathname

  // Check exact match first
  let config = redirects[normalizedPath]

  // Try with/without trailing slash
  if (!config) {
    const altPath = normalizedPath.endsWith('/')
      ? normalizedPath.slice(0, -1)
      : normalizedPath + '/'
    config = redirects[altPath]
  }

  if (!config) {
    return null
  }

  const target = typeof config === 'string' ? config : config.to
  const code = typeof config === 'string' ? 301 : config.code

  // Build full URL for redirect
  const redirectUrl = target.startsWith('http') || target.startsWith('mailto:')
    ? target
    : new URL(target, baseUrl).toString()

  return Response.redirect(redirectUrl, code)
}
