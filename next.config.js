/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/email',
      destination: 'mailto:frank@workingtitles.xyz',
      permanent: false,
    },
  ],
  output: 'standalone',
}

module.exports = nextConfig

