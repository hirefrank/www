import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      // Static prerendering - renders full HTML for each page
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: false,
        filter: ({ path }) => {
          const visibleSections = ['/', '/about']
          return visibleSections.includes(path)
        },
      },
      sitemap: {
        host: 'https://hirefrank.com',
      },
    }),
    viteReact(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core libraries - shared across all routes
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor'
          }

          // TanStack ecosystem - router and query
          if (id.includes('@tanstack/react-router') && !id.includes('devtools')) {
            return 'router'
          }
          if (id.includes('@tanstack/react-query') && !id.includes('devtools')) {
            return 'query'
          }

          // Radix UI primitives - heavy component library
          if (id.includes('@radix-ui/')) {
            return 'radix-ui'
          }

          // Form libraries - used in specific routes
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers')) {
            return 'form-libs'
          }

          // Validation - Zod used across many features
          if (id.includes('node_modules/zod/')) {
            return 'validation'
          }

          // Date utilities
          if (id.includes('date-fns')) {
            return 'date-lib'
          }

          // Icons - lucide-react is large
          if (id.includes('lucide-react')) {
            return 'icons'
          }

          // UI components - our custom components
          if (id.includes('/src/components/ui/')) {
            return 'ui-components'
          }

          // Devtools should never be in production, but extra safety
          if (id.includes('devtools')) {
            return 'devtools'
          }
        },
      },
    },
    // Increase chunk size warning threshold since we're splitting intentionally
    chunkSizeWarningLimit: 600,
  },
})
