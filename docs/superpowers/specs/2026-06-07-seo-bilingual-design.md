# SEO & Bilingual (EN/ES) — Design Spec
Date: 2026-06-07

## Goal

Improve local SEO for a Miami cosmetic surgery practice by:
1. Making the site fully bilingual (English + Spanish) with proper `hreflang` signals so Google indexes both language versions as separate crawlable URLs.
2. Fixing broken SEO infrastructure (missing OG image, logo, favicon) that silently undermines social sharing and JSON-LD validity.
3. Minor structured data and sitemap improvements.

## Stack Addition

- **`next-intl`** — industry-standard Next.js App Router i18n library. Handles `/[locale]/` routing, middleware, translation hooks, and static generation for all locale/page combinations.

## Architecture

### Route Structure

The current `src/app/(site)/` route group is wrapped in a `[locale]` dynamic segment:

```
src/app/
  [locale]/
    (site)/
      layout.tsx          ← sets <html lang="en|es">, injects hreflang alternates
      page.tsx            → / and /es/
      about/page.tsx      → /about and /es/about
      procedures/
        page.tsx          → /procedures and /es/procedures
        [slug]/page.tsx   → /procedures/[slug] and /es/procedures/[slug]
      contact/page.tsx    → /contact and /es/contact
      testimonials/page.tsx
      gallery/page.tsx
  layout.tsx              ← root layout unchanged (fonts, globals)
  middleware.ts           ← next-intl edge middleware
```

- Supported locales: `['en', 'es']`. Default locale: `en`.
- `generateStaticParams` at the `[locale]` level pre-renders every page in both languages at build time — no server cost.
- Any unrecognized locale segment hits a 404.

### Middleware (`src/middleware.ts`)

Uses `next-intl`'s `createMiddleware`:
- Detects `Accept-Language` on first visit; redirects to `/es/` if Spanish is preferred.
- Sets `NEXT_LOCALE` cookie on explicit switcher click — overrides browser detection on future visits.
- Passes through `/api/*`, `/admin/*`, and all static asset paths untouched (matcher configured to exclude these).

## Translation System

### Files

```
messages/
  en.json   ← all English UI strings
  es.json   ← all Spanish UI strings
```

### What is translated

| Area | Scope |
|---|---|
| Navbar | All links, mobile menu labels, language switcher |
| Hero | Headline, subheadline, form labels, CTA buttons |
| StatsBar | All stat labels |
| ProceduresSection | Section headings, tab labels, card CTAs |
| BeforeAfterSection | Headings, labels |
| TestimonialsSection | Headings, review source labels |
| DoctorSection | All copy |
| CTABanner | Headline, body, buttons |
| Footer | Nav links, address, legal text |
| Procedures list page | Headings, filter labels |
| Procedure detail page | Benefits list, FAQ questions/answers, sidebar copy |
| About page | Story copy, values, milestones, timeline |
| Contact page | Form labels, placeholders, confirmation messages |
| Testimonials page | Headings, filter labels |
| Gallery page | Headings, labels |

### Procedure-level content

`src/data/procedures.ts` gains an `es` field on each procedure:

```ts
export interface Procedure {
  // ... existing fields
  es?: {
    name: string;
    description: string;
    benefits: string[];
  };
}
```

Pages read `proc.es.name ?? proc.name` when locale is `es`, falling back to English gracefully if a translation is missing.

## Language Switcher

- Lives in the Navbar, renders as `EN | ES` plain `<a>` links (not `<button>`) so both locale URLs are directly crawlable.
- Client component (`"use client"`) using `next-intl`'s `useLocale()` and `usePathname()` hooks.
- Clicking resolves the current page's equivalent URL in the other locale (e.g. `/about` ↔ `/es/about`, `/procedures/bbl` ↔ `/es/procedures/bbl`).
- Sets `NEXT_LOCALE` cookie so middleware remembers the choice on future visits.

**URL slugs for procedures stay in English** on Spanish pages (e.g. `/es/procedures/brazilian-butt-lift`). Changing slugs would require redirect mapping and adds fragility. Google resolves this correctly when `hreflang` is properly set.

## hreflang & Metadata

Every page's `generateMetadata` returns `alternates.languages`:

```ts
alternates: {
  canonical: `https://ycosmeticsurgery.com/${locale === 'en' ? path : `es/${path}`}`,
  languages: {
    'en': `https://ycosmeticsurgery.com/${path}`,
    'es': `https://ycosmeticsurgery.com/es/${path}`,
    'x-default': `https://ycosmeticsurgery.com/${path}`,
  },
}
```

JSON-LD structured data on Spanish pages uses translated `name` and `description` fields. The `url` and `@id` fields point to the Spanish URL variant.

## Critical Infrastructure Fixes

These ship in the same PR:

### OG Image (`/api/og`)

- New API route using Next.js `ImageResponse` (from `next/og`).
- Renders a 1200×630px branded image: navy `#0d1b3e` background, gold `#c9a46e` accent, clinic name + tagline + address in Cormorant Garamond / Inter.
- Accepts optional `title` query param for procedure-specific OG images on detail pages.
- Root layout metadata updated to reference `/api/og` instead of the non-existent `/og-image.jpg`.
- All page-level OG image overrides updated to use `/api/og?title=[encoded title]`.

### `logo.png`

- Copy `public/Logo.jpg` → `public/logo.png` (or re-export as PNG).
- Update all JSON-LD references from `logo.png` to the correct path.

### Favicon Suite

Add to `/public/`:
- `favicon.ico` (32×32)
- `apple-touch-icon.png` (180×180)
- `site.webmanifest` with name, short_name, icons, theme_color (`#0d1b3e`), background_color (`#faf9f7`)

Root layout `<head>` gets the standard favicon link tags via Next.js `metadata.icons`.

### ReviewSchema on Testimonials Page

Add `ItemList` + `Review` JSON-LD to `src/app/[locale]/(site)/testimonials/page.tsx` using the existing `testimonials` array from `procedures.ts`.

### Sitemap Fix

`src/app/sitemap.ts`:
- Add all `/es/*` URL variants for every existing entry.
- Fix contact page: change `changeFrequency` from `"yearly"` to `"monthly"`.

## Out of Scope

- Location-specific landing pages (`/miami-bbl`, `/hialeah-plastic-surgery`, etc.)
- Admin page translation
- Procedure URL slug translation (slugs stay in English on `/es/` pages)
- Automated translation pipeline (translations written by hand / provided by client)

## Implementation Order

1. Install `next-intl`, scaffold `messages/en.json` + `messages/es.json` with all strings
2. Add `middleware.ts` and `next-intl.config.ts`
3. Migrate `src/app/(site)/` → `src/app/[locale]/(site)/`
4. Update all pages to use `useTranslations()` / `getTranslations()`
5. Add Spanish fields to `procedures.ts`
6. Add language switcher to Navbar
7. Add `hreflang` alternates to all `generateMetadata` calls
8. Create `/api/og` route (ImageResponse)
9. Add favicon suite + `site.webmanifest`
10. Add `logo.png`
11. Add ReviewSchema to testimonials page
12. Update sitemap
