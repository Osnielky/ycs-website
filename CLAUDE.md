# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build (TypeScript check + static generation)
npm run start     # Serve the production build
npm run lint      # Run ESLint
```

There are no tests configured. TypeScript type checking runs as part of `npm run build`.

## Architecture

**Next.js 16 App Router** with Turbopack. All pages are statically generated at build time except `/api/leads` (dynamic).

### Key directories

- `src/app/` — Routes. Each folder is a page. `layout.tsx` wraps every page with `<Navbar>` and `<Footer>`.
- `src/components/sections/` — Full-width page sections used on the home page and reused across pages (Hero, StatsBar, ProceduresSection, BeforeAfterSection, TestimonialsSection, TrustSignals, CTABanner).
- `src/components/layout/` — Navbar and Footer, included once in `layout.tsx`.
- `src/data/procedures.ts` — **Single source of truth** for all procedure content, testimonials, and category metadata. Procedure detail pages are statically pre-rendered from this file via `generateStaticParams`.
- `src/app/api/leads/route.ts` — Lead capture POST endpoint. Supabase and Resend integrations are stubbed with comments; activate by adding env vars and uncommenting.

### Styling

**Tailwind CSS v4** — config is entirely CSS-based. Brand tokens live in the `@theme {}` block in `src/app/globals.css`:

| Token | Value |
|---|---|
| `navy` / `navy-light` / `navy-dark` | #0d1b3e / #1a2d5a / #060e1f |
| `gold` / `gold-light` / `gold-dark` | #c9a46e / #e8cfa0 / #a87d45 |
| `cream` / `cream-dark` | #faf9f7 / #f0ece6 |

Do **not** create a `tailwind.config.ts` — in v4, adding colors/fonts belongs in `globals.css` under `@theme`. Utility classes (`bg-navy`, `text-gold`, etc.) are auto-generated from those tokens.

Global CSS utilities defined in `globals.css`: `.gold-divider`, `.hero-pattern`, `.card-hover`, `.proc-{body|breast|face|medspa}`.

### Fonts

Cormorant Garamond (`--font-cormorant`) for headings, Inter (`--font-inter`) for body — loaded via `next/font/google` in `layout.tsx` and injected as CSS variables. Applied globally via `h1–h5` rule and `body` rule in `globals.css`.

### Lead capture flow

Forms in `Hero.tsx` and `contact/page.tsx` POST to `/api/leads`. Validation uses **zod** schemas with **react-hook-form** + `@hookform/resolvers`. The API currently logs to console; activate persistence by uncommenting the Supabase/Resend blocks and adding to `.env.local`:

```
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
RESEND_API_KEY=
CLINIC_EMAIL=
```

### Adding a new procedure

Add an entry to the `procedures` array in `src/data/procedures.ts`. The procedures page, home page tabs, and individual procedure detail page (`/procedures/[slug]`) all derive from that array automatically — no other files need changing.

### lucide-react version note

The installed version (`^1.16.0`) does **not** export `Instagram` or `Facebook`. Use inline SVG for social icons.
