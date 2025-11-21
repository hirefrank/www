# AGENTS.md

## Build & Dev Commands
- `pnpm dev` - Start dev server (port 3000)
- `pnpm build` - Production build
- `pnpm typecheck` - TypeScript type checking
- `pnpm build:check` - Typecheck + build (run before deploy)
- `pnpm deploy` - Build and deploy to Cloudflare Workers
- No test framework configured

## Code Style
- **Imports**: Use `~/` alias for src/ (e.g., `import { cn } from '~/lib/utils'`); use `type` keyword for type-only imports
- **Components**: Named exports only, PascalCase, functional components (no classes)
- **Types**: Strict mode, no unused locals/parameters, export interfaces separately
- **Formatting**: Double quotes for strings, no semicolons optional (be consistent per file)
- **Styling**: Tailwind CSS v4, use `cn()` from `~/lib/utils` for conditional classes
- **Naming**: PascalCase for components/types, camelCase for functions/variables

## Project Structure
- `src/routes/` - TanStack Router file-based routing (exports `Route` const)
- `src/components/` - React components (named exports)
- `src/data/` - Static data and type definitions
- `src/lib/` - Utilities (cn helper)
- `public/` - Static assets

## Tech Stack
TanStack Start + React 19 + Tailwind v4 + Cloudflare Workers + Radix UI + Zod
