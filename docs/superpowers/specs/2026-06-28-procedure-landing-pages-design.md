# Procedure Landing Pages — Design

**Date:** 2026-06-28
**Status:** Approved (pending spec review)
**First consumer:** `/procedures/facelift`

## Goal

Turn procedure detail pages into high-converting, SEO-rich landing pages for promos —
starting with **facelift**. A landing page adds: a before/during/after transformation
gallery, substantial section-by-section SEO copy describing the process, a recovery
timeline, an optional promotional offer banner, and a "see if you qualify" funnel that
drives free-consultation bookings.

The system is **opt-in and reusable**: any procedure can become a landing page by adding
one data entry. Procedures without an entry render exactly as they do today.

## Non-goals

- No redesign of the existing shared procedure template for non-landing procedures.
- No real patient photos in this change — placeholders only (see Imagery).
- No booking/qualification form logic beyond the existing `/contact` CTA flow.
- No discount/pricing engine — the offer banner is free-text content only.

## Architecture

### Opt-in via a separate data file

New file **`src/data/landings.ts`** exports a `Record<string, LandingContent>` keyed by
procedure `slug`. This keeps the already-large `procedures.ts` (~700 lines) clean and
isolates rich landing content.

The shared detail page (`src/app/[locale]/(site)/procedures/[slug]/page.tsx`) looks up
`landings[slug]`:

- **Entry present** → render the rich landing sections (in addition to the existing
  hero, benefits, FAQ, related, CTABanner).
- **Entry absent** → page renders exactly as today. Zero behavior change for the other
  ~25 procedures.

### Data model

```ts
export interface LandingOffer {
  headline: string;        // e.g. "Limited-time: $1,000 off facelift this month"
  subtext?: string;        // supporting line
  ctaLabel?: string;       // defaults to "Book Free Consultation"
}

export interface LandingTransformation {
  label: string;           // "Case 1 — Female, 58"
  before: string;          // image path, e.g. /before-after/facelift-1-before.webp
  during?: string;         // optional middle-stage image
  after: string;           // image path
  note?: string;           // short caption
}

export interface LandingProcessSection {
  heading: string;
  body: string;            // one or more paragraphs (\n\n separated)
  image?: string;          // optional supporting image path
}

export interface LandingCandidacy {
  heading: string;
  intro: string;
  qualifies: string[];     // checklist points framing the qualify funnel
}

export interface LandingTimelineStage {
  stage: string;           // "Days 1–3"
  detail: string;
}

export interface LandingLocaleContent {
  intro: string;
  transformations: LandingTransformation[];
  process: LandingProcessSection[];
  candidacy: LandingCandidacy;
  timeline: LandingTimelineStage[];
  offer?: LandingOffer;
}

export interface LandingContent extends LandingLocaleContent {
  es: LandingLocaleContent;
}

export const landings: Record<string, LandingContent> = { /* facelift */ };
```

Image paths are shared across locales (images are language-neutral); all text fields are
duplicated under `es`. The page selects `locale === "es" ? content.es : content`.

## Page layout (landing flow, top to bottom)

1. **Hero** — existing hero, plus a small gold "promo" eyebrow when an offer is set.
2. **Offer banner** — sticky, dismissible client component. Renders only if `offer` is set.
3. **Transformation gallery** — one row per case; before / during / after columns with
   stage labels and the case label/note.
4. **Process sections** — the SEO body. Alternating text / optional-image blocks.
5. **"Do you qualify?" funnel** — candidacy checklist + prominent Book button → `/contact`.
6. **Recovery timeline** — vertical week-by-week stages.
7. **Benefits grid + FAQ + CTA sidebar** — existing template sections, kept.
8. **Related procedures + CTABanner** — existing, kept.

## Components

New folder **`src/components/sections/landing/`**. All take `{ content, locale }`-style
props and are purely presentational.

| Component | Type | Responsibility |
|---|---|---|
| `OfferBanner.tsx` | client | Dismissible promo banner; hidden when no offer |
| `TransformImage.tsx` | client | Renders image at path; shows branded placeholder via `onError` until a real file exists |
| `TransformationGallery.tsx` | server | Lays out cases × {before, during, after} using `TransformImage` |
| `ProcessSections.tsx` | server | Renders the SEO process copy blocks |
| `CandidacySection.tsx` | server | "Do you qualify?" checklist + CTA |
| `RecoveryTimeline.tsx` | server | Vertical timeline of recovery stages |

The page file stays thin: it resolves locale content and composes these components.

## Imagery (placeholders)

No facelift photos exist yet. `TransformImage` references predictable paths (e.g.
`/before-after/facelift-1-before.webp`) and renders a **branded gradient placeholder with
the stage label** when the file is missing or fails to load. When the user later drops real
`.webp` files at those paths, they appear automatically — **no code change required**.

Path convention: `/before-after/facelift-<caseNumber>-<stage>.webp`
where `stage ∈ {before, during, after}`.

## Content (written in this change, EN + ES)

Facelift copy authored for: `intro`, 3 transformation cases (placeholder images, real
labels/notes), 4–5 `process` sections, candidacy checklist, recovery timeline, and an
example offer. Tone: warm, authoritative, conversion-focused, emphasizing the free
*qualifying* consultation. Reuses existing FAQ translation keys already in the template.

## SEO

- Substantial new indexable body copy across process sections.
- Existing JSON-LD (`MedicalProcedure`, `FAQPage`, `BreadcrumbList`) retained; extend
  `MedicalProcedure.followup` to incorporate the recovery timeline summary.
- Headings use semantic `h2`/`h3`; images carry descriptive `alt` text.

## Styling

Reuses existing brand tokens and utilities from `globals.css` (`navy`/`gold`/`cream`,
`gold-divider`, `card-hover`, `hero-pattern`). No `tailwind.config.ts` (Tailwind v4). No new
design language introduced.

## Graceful degradation

Each landing sub-section renders only when its data is present (e.g. no `offer` → no
banner; empty `transformations` → no gallery). A procedure with no `landings` entry is
completely unaffected.

## Out of scope / future

- Real patient photos and consent handling.
- Per-promo A/B testing or analytics events.
- Interactive before/after slider (current design uses a static, SEO-friendly grid).
