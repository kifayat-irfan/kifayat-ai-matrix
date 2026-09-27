# ◆ Kifayat AI Matrix

**Autonomous 3D interactive AI news magazine & automated blogging engine** — owned by Kifayat Irfan.

A Next.js 14 + TypeScript site with a real-time 3D Three.js hero, an MDX-based
local-first content engine, full SEO/AdSense compliance, and a daily cron that
publishes 20 SEO-optimized AI news posts every 24 hours.

## Stack

- **Framework:** Next.js 14 (App Router, ISR, `generateStaticParams`)
- **3D:** Three.js + React Three Fiber + Drei, Framer Motion (3D-tilt cards)
- **Content:** Local MDX (`src/app/posts/*.mdx`) + `gray-matter` — zero database
- **Styling:** Tailwind CSS (dark `#0A0D14` / cyan `#00F0FF` / purple `#7000FF`)
- **SEO:** Dynamic JSON-LD (NewsArticle, FAQPage, Organization, BreadcrumbList),
  `sitemap.ts`, `robots.ts`, dynamic OpenGraph, canonical tags
- **Monetization:** Non-intrusive AdSense slots (header, in-article ×2, sidebar, mobile anchor)
- **Compliance:** `/about`, `/privacy-policy`, `/terms-of-service`, `/cookie-policy`, `/contact`

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run gen:posts    # generate 20 AI posts for today
```

## Environment

Copy `.env.example` to `.env` and fill in:

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (default `https://kifayat-ai-matrix.vercel.app`) |
| `NEXT_PUBLIC_ADSENSE_ID` | AdSense publisher ID `ca-pub-...` (blank = dev placeholders) |
| `SENSENOVA_API_KEY` | AI generation provider key |
| `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` | Vercel deployment |
| `GITHUB_TOKEN` | GitHub push in the cron |

## Daily pipeline

`.github/workflows/daily-posts.yml` runs at 06:00 UTC daily:

1. `npm run gen:posts` — writes 20 MDX posts + SVG covers to the repo.
2. Commits and pushes them (with a bot identity).
3. Triggers a Vercel production build.

> The generator ships with a deterministic template engine. Wire `synthesize()`
> in `scripts/generate-posts.mjs` to your `SENSENOVA_API_KEY` for live news
> ingestion, and `renderCover()` to an image API for HD 3D posters.

## Project layout

```
src/
  app/            routes: home, posts/[slug], 5 legal pages, sitemap, robots
    posts/        MDX content files (local-first)
  components/     Header, Footer, Hero3D, ArticleCard, AdSlot, PostBody
  lib/            site.ts, posts.ts, types.ts, schema.ts, mdx-components.tsx
public/covers/    generated 16:9 covers
scripts/          generate-posts.mjs (daily pipeline)
.github/workflows/daily-posts.yml  cron
```

## Deployment

1. Push to GitHub.
2. Connect to Vercel (framework preset: Next.js).
3. Add env vars from `.env.example`.
4. Go live at `https://kifayat-ai-matrix.vercel.app`.

---

© 2026 Kifayat Irfan · Kifayat AI Matrix
