# hirefrank.com

Personal website for Frank Harris, built with [Tanstack Start](https://tanstack.com/start) and deployed on [Cloudflare Workers](https://workers.cloudflare.com/).

## Tech Stack

- **Framework**: Tanstack Start (React 19 + TanStack Router + Vite)
- **Styling**: Tailwind CSS v4
- **Runtime**: Cloudflare Workers
- **Package Manager**: pnpm

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

The dev server runs at http://localhost:3000

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── data/           # Static data (sections, projects, coaching)
│   ├── routes/         # File-based routing (TanStack Router)
│   ├── styles/         # Global CSS with Tailwind
│   ├── redirects.ts    # URL redirect configuration
│   ├── router.tsx      # Router configuration
│   └── server.ts       # Cloudflare Workers entry point
├── public/             # Static assets (images, fonts, PDFs)
├── app.config.ts       # Tanstack Start configuration
├── vite.config.ts      # Vite configuration
└── wrangler.jsonc      # Cloudflare Workers configuration
```

## Deployment

### Automatic (GitHub Actions)

Push to `main` branch triggers automatic deployment via GitHub Actions.

Required secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Manual

```bash
# Deploy to Cloudflare Workers
pnpm run deploy
```

## Redirects

URL redirects are configured in `src/redirects.ts` and handled at the edge before reaching the app. This includes:
- Legacy blog URL redirects
- Short URLs for calendar booking links
- Static file redirects

## License

MIT
