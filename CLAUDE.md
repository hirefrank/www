# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Production build
pnpm typecheck    # Run TypeScript type checking
pnpm build:check  # Typecheck + build (recommended before deploy)
pnpm preview      # Preview production build locally
pnpm deploy       # Build and deploy to Cloudflare Workers
pnpm cf-typegen   # Regenerate Cloudflare Worker types
```

## Architecture

**Stack**: Tanstack Start (React 19 + TanStack Router + Vite) deployed on Cloudflare Workers with Tailwind CSS v4.

### Key Entry Points

- `src/server.ts` - Custom Cloudflare Workers entry point. Handles redirects at the edge before delegating to TanStack Start. Contains commented examples for Queue consumers, Cron handlers, and Durable Objects.
- `src/router.tsx` - TanStack Router configuration with route tree from auto-generated `routeTree.gen.ts`
- `app.config.ts` - Tanstack Start configuration with Cloudflare preset
- `wrangler.jsonc` - Cloudflare Workers configuration

### Routing

File-based routing in `src/routes/`:
- Route files export a `Route` using `createFileRoute()`
- `__root.tsx` provides the root layout with Navigation and Footer
- Route tree is auto-generated in `src/routeTree.gen.ts`

### Data Layer

Static data files in `src/data/`:
- `sections.ts` - Homepage sections
- `projects.ts` - Project entries
- `coaching.ts` - Coaching page content (testimonials, pricing, FAQ)

### Redirects

URL redirects configured in `src/redirects.ts` are processed at the edge in the Workers fetch handler before the app routes.

### Path Aliases

Use `~/*` alias for imports from `src/` (configured in tsconfig.json).
