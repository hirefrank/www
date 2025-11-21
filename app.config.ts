import { defineConfig } from '@tanstack/start/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  vite: {
    plugins: () => [
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
  server: {
    preset: 'cloudflare-module',
    cloudflare: {
      module: {
        main: './src/server.ts',
      },
    },
  },
})
