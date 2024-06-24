import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  // Add the redirects function here
  async redirects() {
    return [
      { source: '/14/08/why-is-it-so-hard/', destination: '/videos/why-is-it-so-hard/', permanent: true },
      { source: '/18/03/rainbows-rainier/', destination: '/videos/rainbows-rainier/', permanent: true },
      { source: '/17/03/bey-toe-ven/', destination: '/videos/bey-toe-ven/', permanent: true },
      { source: '/16/03/past-to-find-the-future/', destination: '/videos/past-to-find-the-future/', permanent: true },
      { source: '/15/06/cooke-blowin-in-the-wind/', destination: '/videos/cooke-blowin-in-the-wind/', permanent: true },
      { source: '/14/09/apple-in-your-mouth/', destination: '/videos/apple-in-your-mouth/', permanent: true },
      { source: '/14/09/long-shadows/', destination: '/videos/long-shadows/', permanent: true },
      { source: '/tag/summer', destination: '/', permanent: true },
      { source: '/tag/video', destination: '/', permanent: true },
      { source: '/tag/twitter', destination: '/', permanent: true },
      { source: '/tag/movies', destination: '/', permanent: true },
      { source: '/tag/music', destination: '/', permanent: true },
      { source: '/tag/nyc', destination: '/', permanent: true },
      { source: '/feeds/rss.xml', destination: '/', permanent: true },
      { source: '/tags', destination: '/', permanent: true },
      { source: '/archives', destination: '/', permanent: true },
      { source: '/sitemap.xml', destination: '/', permanent: true },
      { source: '/cal', destination: 'https://cal.com/hirefrank', permanent: false },
      { source: '/calp', destination: 'https://cal.com/hirefrank', permanent: false },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
