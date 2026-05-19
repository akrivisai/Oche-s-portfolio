# Ameh Matthew Oche — Portfolio

Production Next.js 14 (App Router) port of the design-locked single-file prototype.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (theme tokens wired through CSS variables)
- `next/font` for Fraunces (variable) + Inter
- `next/image` for every image
- Framer Motion for the hero stagger, scroll reveals, and animated counters
- `lucide-react` for icons

No UI kit, no shadcn, no analytics.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. From the Vercel dashboard: **Add New → Project → Import** the repo.
3. Framework is auto-detected (Next.js). Click **Deploy**.

Or from the CLI, from this directory:

```bash
npm install -g vercel   # once
vercel login            # once
vercel deploy --prod
```

Optionally set `NEXT_PUBLIC_SITE_URL` in your Vercel project settings so the
canonical and Open Graph URLs point at your production domain.

## Where to change things

| Want to change… | Edit |
| --- | --- |
| The CV | Replace `public/assets/Ameh_Matthew_Oche_CV.pdf` (keep the filename) |
| Copy (hero, projects, recognitions, about, contact, footer) | `lib/content.ts` |
| Theme colors / design tokens | `app/globals.css` (`:root` and `:root[data-theme="light"]`) |
| Section layout / which components show | `app/page.tsx` |
| Page metadata / OG | `app/layout.tsx` |

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — Next.js ESLint
- `npm run typecheck` — `tsc --noEmit`
