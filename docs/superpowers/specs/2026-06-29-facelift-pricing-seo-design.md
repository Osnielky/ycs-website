# Facelift Pricing & SEO Enhancement — Design

**Date:** 2026-06-29
**Scope:** Add transparent price-range information to the facelift landing page and maximize facelift-related SEO. Facelift is currently the only entry in `landings.ts`; this work is scoped to it but uses generic, reusable data shapes.

## Goals

1. Show "starting at" facelift pricing per technique on the facelift landing page.
2. Add cost-focused, high-intent SEO content (copy + structured data) so the page can rank for queries like "facelift cost Miami", "deep plane facelift price", "facelift financing".

## Prices (provided by client)

| Type | Starting price | Numeric (schema) |
|---|---|---|
| Mini Facelift | $3,000 | 3000 |
| Lower Facelift | $3,500 | 3500 |
| Mid-Facelift | $4,000 | 4000 |
| Deep Plane Facelift | $5,000 | 5000 |

Framed as "Starting at $X" — together they advertise a $3,000–$5,000 range. Exact quote confirmed at the free consultation (disclaimer required).

## Data changes — `src/data/landings.ts`

New interfaces:

```ts
export interface LandingPricingTier {
  name: string;       // reuses the education type names
  price: string;      // display, e.g. "Starting at $3,000"
  priceValue: number; // numeric minimum for schema, e.g. 3000
  bestFor: string;    // one-line "ideal for…"
}

export interface LandingPricing {
  heading: string;
  intro: string;
  tiers: LandingPricingTier[];
  factorsTitle: string;
  factors: string[];        // what affects final cost
  financingNote?: string;   // generic, no invented monthly figures
  disclaimer: string;
}

export interface LandingFaq { q: string; a: string; }
```

Add to `LandingLocaleContent`:
- `pricing?: LandingPricing`
- `faqs?: LandingFaq[]`  (landing-specific FAQs, EN + ES)

Populate both EN and ES for the facelift entry.

## Component — `src/components/sections/landing/PricingSection.tsx`

Server component matching existing landing components (cream/navy/gold, `font-heading`, `gold-divider`). Layout:
- Heading + intro.
- Tier cards (4) — name, price, "best for". Ascending price order.
- "What affects your price" factors list (CheckCircle bullets).
- Financing note + disclaimer (muted).
- CTA to `/contact` reusing `defaultCta` label.

## Render wiring — `procedures/[slug]/page.tsx`

- Render `<PricingSection>` after `<ProcessSections>` (cost follows "how it works"), before `CandidacySection`.
- FAQ: merge `landing.faqs` into the existing `faqs` array (translation FAQs + landing FAQs) so they appear in both the visible accordion and the `FAQPage` JSON-LD.
- JSON-LD: when `landing.pricing` exists, emit an additional `Service` node:
  ```
  { "@type": "Service", serviceType: "Facelift surgery", provider: {MedicalBusiness},
    areaServed: "Miami, FL",
    offers: { "@type": "AggregateOffer", priceCurrency: "USD",
              lowPrice: 3000, highPrice: 5000, offerCount: 4,
              offers: [ {Offer price/priceCurrency per tier} ] } }
  ```

New facelift FAQs (EN + ES, in landing data):
1. How much does a facelift cost in Miami?
2. Does the price include anesthesia and facility fees?
3. Do you offer facelift financing?

## Out of scope

- No changes to other procedures or translation message files.
- No invented monthly financing figures.
- No `tailwind.config.ts` (v4 CSS theme only).

## Single source of truth

All numbers/copy live in `landings.ts`; client can edit without touching components or schema code.
