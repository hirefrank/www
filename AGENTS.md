# AGENTS.md

## Build & Dev Commands
- `pnpm dev` - Start dev server on port 3000
- `pnpm build` - Production build
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm build:check` - Typecheck + build (use before deploy)
- `pnpm deploy` - Build and deploy to Cloudflare Workers

## Code Style
- **TypeScript**: Strict mode enabled, no unused locals/parameters
- **Imports**: Use `~/` alias for `src/` (e.g., `import { cn } from '~/lib/utils'`)
- **Components**: Named exports, PascalCase, functional React components
- **Routes**: Use TanStack Router file-based routing in `src/routes/`
- **Styling**: Tailwind CSS v4, use `cn()` utility for conditional classes
- **Types**: Export interfaces separately (e.g., `export interface Section {}`)

## Project Structure
- `src/routes/` - TanStack Router pages (file-based routing)
- `src/components/` - React components (named exports)
- `src/data/` - Static data and type definitions
- `src/lib/` - Utilities (cn helper for Tailwind)
- `public/` - Static assets (images, fonts, PDFs)

## Tech Stack
TanStack Start + React 19 + Tailwind v4 + Cloudflare Workers + Radix UI
