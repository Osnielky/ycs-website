# Procedure Landing Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an opt-in, reusable landing-page layer to procedure detail pages — a transformation gallery, section-by-section SEO copy, a recovery timeline, an optional promo banner, and a "see if you qualify" funnel — with facelift as the first promo.

**Architecture:** A new `src/data/landings.ts` holds typed landing content keyed by procedure slug (EN + ES). The existing shared detail page `src/app/[locale]/(site)/procedures/[slug]/page.tsx` looks up the entry; if present it renders new presentational components from `src/components/sections/landing/`, otherwise it renders exactly as today.

**Tech Stack:** Next.js 16 App Router (server components by default), TypeScript, Tailwind CSS v4 (CSS-token theme), next-intl (`@/i18n/navigation` `Link`, `getTranslations`), lucide-react.

## Global Constraints

- Next.js 16 App Router; detail page is a **server component** and statically generated via `generateStaticParams`. Keep it server-rendered; only interactive pieces use `"use client"`.
- Tailwind v4 — **do not** create `tailwind.config.ts`. Use existing brand tokens/utilities only: `navy` / `navy-light` / `navy-dark`, `gold` / `gold-light` / `gold-dark`, `cream` / `cream-dark`, and utilities `gold-divider`, `hero-pattern`, `card-hover`.
- **lucide-react `^1.16.0` does NOT export `Instagram`, `Facebook`, or `X`.** For a close/dismiss control use a plain `×` text glyph, not a lucide icon. `Clock`, `CheckCircle`, `ArrowLeft`, `ArrowRight` are confirmed available.
- Bilingual: every text field has an `es` counterpart. The page selects content by `locale === "es"`.
- Internal links use `Link` from `@/i18n/navigation` (locale-aware). Phone link is a plain `<a href="tel:+13052183513">`.
- No test framework exists in this repo. Verification per task = `npx tsc --noEmit`; final integration = `npm run build` + `npm run lint` + manual browser check.
- Image paths are language-neutral and shared across locales.

---

## File Structure

**Create:**
- `src/data/landings.ts` — types, `landings` record (facelift EN+ES), `getLanding()` helper, `landingLabels` chrome map.
- `src/components/sections/landing/TransformImage.tsx` — client; image with branded placeholder fallback.
- `src/components/sections/landing/OfferBanner.tsx` — client; dismissible promo banner.
- `src/components/sections/landing/TransformationGallery.tsx` — server; before/during/after rows.
- `src/components/sections/landing/ProcessSections.tsx` — server; numbered SEO copy blocks.
- `src/components/sections/landing/CandidacySection.tsx` — server; "do you qualify?" funnel + CTA.
- `src/components/sections/landing/RecoveryTimeline.tsx` — server; vertical timeline.

**Modify:**
- `src/app/[locale]/(site)/procedures/[slug]/page.tsx` — look up landing, render sections, add promo eyebrow, extend JSON-LD `followup`.

---

## Task 1: Landing data model and facelift content

**Files:**
- Create: `src/data/landings.ts`

**Interfaces:**
- Produces:
  - `interface LandingOffer { headline: string; subtext?: string; ctaLabel?: string }`
  - `interface LandingTransformation { label: string; before: string; during?: string; after: string; note?: string }`
  - `interface LandingProcessSection { heading: string; body: string; image?: string }`
  - `interface LandingCandidacy { heading: string; intro: string; qualifies: string[] }`
  - `interface LandingTimelineStage { stage: string; detail: string }`
  - `interface LandingLocaleContent { intro: string; offer?: LandingOffer; transformationsHeading: string; transformationsIntro?: string; transformations: LandingTransformation[]; processHeading?: string; process: LandingProcessSection[]; candidacy: LandingCandidacy; timelineHeading: string; timeline: LandingTimelineStage[] }`
  - `interface LandingContent extends LandingLocaleContent { es: LandingLocaleContent }`
  - `function getLanding(slug: string, locale: string): LandingLocaleContent | null`
  - `const landingLabels: Record<string, { before: string; during: string; after: string; placeholder: string; defaultCta: string; phone: string }>`

- [ ] **Step 1: Create `src/data/landings.ts` with types, helper, and labels**

```ts
export interface LandingOffer {
  headline: string;
  subtext?: string;
  ctaLabel?: string;
}

export interface LandingTransformation {
  label: string;
  before: string;
  during?: string;
  after: string;
  note?: string;
}

export interface LandingProcessSection {
  heading: string;
  body: string;
  image?: string; // reserved for future supporting imagery
}

export interface LandingCandidacy {
  heading: string;
  intro: string;
  qualifies: string[];
}

export interface LandingTimelineStage {
  stage: string;
  detail: string;
}

export interface LandingLocaleContent {
  intro: string;
  offer?: LandingOffer;
  transformationsHeading: string;
  transformationsIntro?: string;
  transformations: LandingTransformation[];
  processHeading?: string;
  process: LandingProcessSection[];
  candidacy: LandingCandidacy;
  timelineHeading: string;
  timeline: LandingTimelineStage[];
}

export interface LandingContent extends LandingLocaleContent {
  es: LandingLocaleContent;
}

// Fixed UI chrome (not editorial body copy), localized.
export const landingLabels: Record<
  string,
  { before: string; during: string; after: string; placeholder: string; defaultCta: string; phone: string }
> = {
  en: {
    before: "Before",
    during: "During",
    after: "After",
    placeholder: "Photo coming soon",
    defaultCta: "Book Free Consultation",
    phone: "(305) 218-3513",
  },
  es: {
    before: "Antes",
    during: "Durante",
    after: "Después",
    placeholder: "Foto próximamente",
    defaultCta: "Reserva tu Consulta Gratis",
    phone: "(305) 218-3513",
  },
};

export const landings: Record<string, LandingContent> = {
  facelift: FACELIFT_LANDING,
};

export function getLanding(slug: string, locale: string): LandingLocaleContent | null {
  const entry = landings[slug];
  if (!entry) return null;
  return locale === "es" ? entry.es : entry;
}
```

- [ ] **Step 2: Add the facelift English + Spanish content above the `landings` constant**

Place this `const FACELIFT_LANDING` declaration ABOVE `export const landings` (it is referenced there). Image files do not exist yet — the placeholder fallback handles that.

```ts
const FACELIFT_LANDING: LandingContent = {
  intro:
    "A facelift — medically known as a rhytidectomy — is the gold standard for restoring a naturally youthful, rested look to the face and neck. At Your Cosmetic Surgery & SPA in Miami, our board-certified surgeons use advanced deep-plane techniques that reposition the deeper facial tissues, not just tighten skin, for results that look like you — only years younger. Below you can see real transformations, understand exactly how the procedure works step by step, and find out whether you qualify for a free consultation.",
  offer: {
    headline: "Limited-Time: $1,000 Off Your Facelift This Month",
    subtext: "Plus a complimentary skin-rejuvenation treatment with every facelift booked this month.",
    ctaLabel: "Claim This Offer",
  },
  transformationsHeading: "Real Patient Transformations",
  transformationsIntro:
    "Every face ages differently. These before, during, and after results show the natural, balanced rejuvenation our deep-plane technique delivers — never a pulled or windswept look.",
  transformations: [
    {
      label: "Case 1 — Female, 58",
      before: "/before-after/facelift-1-before.webp",
      during: "/before-after/facelift-1-during.webp",
      after: "/before-after/facelift-1-after.webp",
      note: "Deep-plane facelift with neck lift. Result shown at 3 months.",
    },
    {
      label: "Case 2 — Female, 64",
      before: "/before-after/facelift-2-before.webp",
      during: "/before-after/facelift-2-during.webp",
      after: "/before-after/facelift-2-after.webp",
      note: "Facelift combined with upper and lower eyelid rejuvenation. Result at 6 months.",
    },
    {
      label: "Case 3 — Male, 52",
      before: "/before-after/facelift-3-before.webp",
      during: "/before-after/facelift-3-during.webp",
      after: "/before-after/facelift-3-after.webp",
      note: "Male facelift and neck contouring. Result at 4 months.",
    },
  ],
  processHeading: "How Your Facelift Works, Step by Step",
  process: [
    {
      heading: "Is a Facelift Right for You?",
      body:
        "The best facelift candidates are in good overall health, non-smokers (or willing to quit), and bothered by sagging skin, deep folds around the mouth, jowls, or a loose neckline. A facelift does not stop the aging process — it resets the clock, and your results are easy to maintain with good skincare and sun protection.\n\nDuring your free consultation, your surgeon evaluates your skin elasticity, bone structure, and personal goals, then tells you honestly whether a facelift, a less invasive option, or a combination will serve you best.",
    },
    {
      heading: "Your Personalized Surgical Plan",
      body:
        "No two faces age the same way, so we never use a one-size-fits-all approach. Your surgeon designs a plan around your unique anatomy — often pairing the facelift with a neck lift, eyelid surgery, or fat transfer for a fully balanced result. You will know exactly what to expect, including incisions discreetly hidden along the hairline and the natural creases of the ear, before you ever schedule surgery.",
    },
    {
      heading: "The Deep-Plane Difference",
      body:
        "Older facelift techniques simply pulled the skin tight, which is what created the unnatural windblown look people fear. Our surgeons use the modern deep-plane technique, repositioning the deeper muscle and connective-tissue layer (the SMAS) and releasing the ligaments that cause sagging. This lifts the face as a unit — restoring youthful volume in the cheeks and a clean jawline while the skin is simply re-draped, never over-tightened.",
    },
    {
      heading: "Comfort, Safety, and Anesthesia",
      body:
        "Your facelift is performed in our fully accredited surgical facility under the care of a board-certified anesthesia provider. Most facelifts take three to five hours depending on the areas treated. You go home the same day with a dedicated nurse coordinator who walks you through every step of aftercare and stays reachable throughout your recovery.",
    },
    {
      heading: "Results That Last",
      body:
        "A facelift turns back the clock roughly ten years, and because the deeper tissues are repositioned, the results are long-lasting — typically a decade or more. You will continue to age naturally, but you will always look younger than you would have without the procedure. Pairing your facelift with our medical-grade skincare and non-surgical treatments keeps your results looking fresh for years to come.",
    },
  ],
  candidacy: {
    heading: "See If You Qualify — Free Consultation",
    intro:
      "The only way to know if a facelift is right for you is a one-on-one evaluation with a board-certified surgeon. Your consultation is completely free, with no pressure and no obligation. You likely qualify if you:",
    qualifies: [
      "Are bothered by sagging skin, jowls, or deep folds around the mouth and jaw",
      "Have a loose or banded neckline you would like tightened",
      "Are in good general health and a non-smoker (or willing to quit before surgery)",
      "Have realistic goals and want natural, not overdone, results",
      "Want long-lasting rejuvenation rather than a temporary fix",
    ],
  },
  timelineHeading: "Your Recovery, Week by Week",
  timeline: [
    {
      stage: "Days 1–3",
      detail:
        "Rest at home with your head elevated. Mild swelling and bruising are normal. Your nurse coordinator checks in daily, and most patients stay comfortable with mild prescribed or over-the-counter medication.",
    },
    {
      stage: "Week 1",
      detail:
        "Sutures and any drains are removed at your first follow-up. Swelling begins to subside and many patients feel ready to be up and about at home.",
    },
    {
      stage: "Weeks 2–3",
      detail:
        "Most visible bruising fades and patients return to work and light social activities. You can typically resume light exercise such as walking.",
    },
    {
      stage: "Weeks 4–6",
      detail:
        "Residual swelling continues to resolve and incision lines begin to fade. You can gradually return to your full exercise routine.",
    },
    {
      stage: "3–6 Months",
      detail:
        "Final results settle in: a refreshed, naturally youthful face and neck. Incisions continue to mature until they are virtually undetectable.",
    },
  ],
  es: {
    intro:
      "Un lifting facial — conocido médicamente como ritidectomía — es el estándar de oro para restaurar un aspecto naturalmente joven y descansado en el rostro y el cuello. En Your Cosmetic Surgery & SPA en Miami, nuestros cirujanos certificados utilizan técnicas avanzadas de plano profundo que reposicionan los tejidos faciales más profundos, no solo tensan la piel, para lograr resultados que se ven como usted — solo que años más joven. A continuación puede ver transformaciones reales, comprender exactamente cómo funciona el procedimiento paso a paso y descubrir si califica para una consulta gratuita.",
    offer: {
      headline: "Por Tiempo Limitado: $1,000 de Descuento en tu Lifting Facial este Mes",
      subtext: "Además, un tratamiento de rejuvenecimiento de la piel de cortesía con cada lifting reservado este mes.",
      ctaLabel: "Aprovecha la Oferta",
    },
    transformationsHeading: "Transformaciones Reales de Pacientes",
    transformationsIntro:
      "Cada rostro envejece de forma diferente. Estos resultados de antes, durante y después muestran el rejuvenecimiento natural y equilibrado que ofrece nuestra técnica de plano profundo — nunca un aspecto estirado o artificial.",
    transformations: [
      {
        label: "Caso 1 — Mujer, 58",
        before: "/before-after/facelift-1-before.webp",
        during: "/before-after/facelift-1-during.webp",
        after: "/before-after/facelift-1-after.webp",
        note: "Lifting facial de plano profundo con lifting de cuello. Resultado a los 3 meses.",
      },
      {
        label: "Caso 2 — Mujer, 64",
        before: "/before-after/facelift-2-before.webp",
        during: "/before-after/facelift-2-during.webp",
        after: "/before-after/facelift-2-after.webp",
        note: "Lifting facial combinado con rejuvenecimiento de párpados superiores e inferiores. Resultado a los 6 meses.",
      },
      {
        label: "Caso 3 — Hombre, 52",
        before: "/before-after/facelift-3-before.webp",
        during: "/before-after/facelift-3-during.webp",
        after: "/before-after/facelift-3-after.webp",
        note: "Lifting facial masculino y contorneado de cuello. Resultado a los 4 meses.",
      },
    ],
    processHeading: "Cómo Funciona tu Lifting Facial, Paso a Paso",
    process: [
      {
        heading: "¿Es un Lifting Facial Adecuado para Usted?",
        body:
          "Los mejores candidatos para un lifting facial gozan de buena salud general, no fuman (o están dispuestos a dejarlo) y les molesta la piel flácida, los pliegues profundos alrededor de la boca, las papadas o un cuello suelto. Un lifting facial no detiene el envejecimiento — reinicia el reloj, y sus resultados son fáciles de mantener con un buen cuidado de la piel y protección solar.\n\nDurante su consulta gratuita, su cirujano evalúa la elasticidad de su piel, su estructura ósea y sus objetivos personales, y luego le dice con honestidad si un lifting facial, una opción menos invasiva o una combinación le conviene más.",
      },
      {
        heading: "Su Plan Quirúrgico Personalizado",
        body:
          "No hay dos rostros que envejezcan igual, por eso nunca usamos un enfoque único. Su cirujano diseña un plan en torno a su anatomía — a menudo combinando el lifting facial con un lifting de cuello, cirugía de párpados o transferencia de grasa para un resultado totalmente equilibrado. Sabrá exactamente qué esperar, incluida la ubicación de las incisiones ocultas discretamente a lo largo del cabello y los pliegues naturales de la oreja, antes de programar la cirugía.",
      },
      {
        heading: "La Diferencia del Plano Profundo",
        body:
          "Las técnicas antiguas de lifting simplemente estiraban la piel, que es lo que creaba el aspecto artificial que la gente teme. Nuestros cirujanos usan la técnica moderna de plano profundo, reposicionando la capa más profunda de músculo y tejido conectivo (el SMAS) y liberando los ligamentos que causan la flacidez. Esto eleva el rostro como una unidad — restaurando el volumen juvenil de las mejillas y una línea de mandíbula limpia, mientras la piel solo se reacomoda, nunca se tensa en exceso.",
      },
      {
        heading: "Comodidad, Seguridad y Anestesia",
        body:
          "Su lifting facial se realiza en nuestra instalación quirúrgica totalmente acreditada bajo el cuidado de un proveedor de anestesia certificado. La mayoría de los liftings toman de tres a cinco horas según las áreas tratadas. Regresa a casa el mismo día con una enfermera coordinadora dedicada que le guía en cada paso del cuidado posoperatorio y permanece disponible durante toda su recuperación.",
      },
      {
        heading: "Resultados que Perduran",
        body:
          "Un lifting facial retrasa el reloj unos diez años y, como los tejidos profundos se reposicionan, los resultados son duraderos — normalmente una década o más. Seguirá envejeciendo de forma natural, pero siempre se verá más joven de lo que se vería sin el procedimiento. Combinar su lifting con nuestro cuidado de la piel de grado médico y tratamientos no quirúrgicos mantiene sus resultados frescos durante años.",
      },
    ],
    candidacy: {
      heading: "Descubra si Califica — Consulta Gratuita",
      intro:
        "La única forma de saber si un lifting facial es adecuado para usted es una evaluación personalizada con un cirujano certificado. Su consulta es completamente gratuita, sin presión y sin compromiso. Probablemente califique si usted:",
      qualifies: [
        "Le molesta la piel flácida, las papadas o los pliegues profundos alrededor de la boca y la mandíbula",
        "Tiene un cuello suelto o con bandas que le gustaría tensar",
        "Goza de buena salud general y no fuma (o está dispuesto a dejarlo antes de la cirugía)",
        "Tiene objetivos realistas y desea resultados naturales, no exagerados",
        "Quiere un rejuvenecimiento duradero en lugar de una solución temporal",
      ],
    },
    timelineHeading: "Su Recuperación, Semana a Semana",
    timeline: [
      {
        stage: "Días 1–3",
        detail:
          "Descanse en casa con la cabeza elevada. La hinchazón y los moretones leves son normales. Su enfermera coordinadora le contacta a diario y la mayoría de los pacientes se mantienen cómodos con medicación leve recetada o de venta libre.",
      },
      {
        stage: "Semana 1",
        detail:
          "Los puntos y cualquier drenaje se retiran en su primera revisión. La hinchazón comienza a disminuir y muchos pacientes se sienten listos para moverse por la casa.",
      },
      {
        stage: "Semanas 2–3",
        detail:
          "La mayoría de los moretones visibles desaparecen y los pacientes vuelven al trabajo y a actividades sociales ligeras. Por lo general puede reanudar ejercicio ligero como caminar.",
      },
      {
        stage: "Semanas 4–6",
        detail:
          "La hinchazón residual sigue resolviéndose y las líneas de incisión comienzan a desvanecerse. Puede volver gradualmente a su rutina completa de ejercicio.",
      },
      {
        stage: "3–6 Meses",
        detail:
          "Los resultados finales se asientan: un rostro y cuello renovados y naturalmente jóvenes. Las incisiones siguen madurando hasta volverse prácticamente indetectables.",
      },
    ],
  },
};
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS (no errors). If `FACELIFT_LANDING` ordering causes a "used before declaration" error, confirm the `const FACELIFT_LANDING` block is physically above `export const landings`.

- [ ] **Step 4: Commit**

```bash
git add src/data/landings.ts
git commit -m "feat: add landing content data model and facelift copy (EN/ES)"
```

---

## Task 2: Client components — TransformImage and OfferBanner

**Files:**
- Create: `src/components/sections/landing/TransformImage.tsx`
- Create: `src/components/sections/landing/OfferBanner.tsx`

**Interfaces:**
- Consumes: `LandingOffer` from `@/data/landings`.
- Produces:
  - `TransformImage` default export, props `{ src: string; alt: string; badge: string; placeholder: string }`
  - `OfferBanner` default export, props `{ offer: LandingOffer; defaultCtaLabel: string }`

- [ ] **Step 1: Create `src/components/sections/landing/TransformImage.tsx`**

```tsx
"use client";

import { useState } from "react";

interface TransformImageProps {
  src: string;
  alt: string;
  badge: string;
  placeholder: string;
}

export default function TransformImage({ src, alt, badge, placeholder }: TransformImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-cream-dark bg-gradient-to-br from-navy-light to-navy">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 hero-pattern text-center px-3">
          <span className="font-heading text-3xl text-gold/70">{badge}</span>
          <span className="text-white/30 text-[11px] tracking-[0.2em] uppercase">{placeholder}</span>
        </div>
      )}
      <span className="absolute top-3 left-3 rounded-full bg-navy/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-gold">
        {badge}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/landing/OfferBanner.tsx`**

Note: dismiss control is a plain `×` glyph (lucide `X` is NOT exported in this lucide version). Banner sits statically at the top of the landing flow (directly below the hero).

```tsx
"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { LandingOffer } from "@/data/landings";

interface OfferBannerProps {
  offer: LandingOffer;
  defaultCtaLabel: string;
}

export default function OfferBanner({ offer, defaultCtaLabel }: OfferBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-gold text-navy">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
        <div className="flex-1 md:flex md:items-center md:justify-center md:gap-3 text-center md:text-left">
          <p className="font-semibold text-sm md:text-base">{offer.headline}</p>
          {offer.subtext && <p className="text-navy/70 text-xs md:text-sm">{offer.subtext}</p>}
        </div>
        <Link
          href="/contact"
          className="shrink-0 bg-navy text-white text-xs font-semibold uppercase tracking-[0.1em] px-4 py-2 rounded-lg hover:bg-navy-dark transition-colors"
        >
          {offer.ctaLabel ?? defaultCtaLabel}
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss offer"
          className="shrink-0 text-navy/50 hover:text-navy transition-colors text-2xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/landing/TransformImage.tsx src/components/sections/landing/OfferBanner.tsx
git commit -m "feat: add TransformImage and OfferBanner landing components"
```

---

## Task 3: Server components — gallery, process, candidacy, timeline

**Files:**
- Create: `src/components/sections/landing/TransformationGallery.tsx`
- Create: `src/components/sections/landing/ProcessSections.tsx`
- Create: `src/components/sections/landing/CandidacySection.tsx`
- Create: `src/components/sections/landing/RecoveryTimeline.tsx`

**Interfaces:**
- Consumes: `TransformImage` (Task 2); `LandingTransformation`, `LandingProcessSection`, `LandingCandidacy`, `LandingTimelineStage` from `@/data/landings`; `CheckCircle` from `lucide-react`; `Link` from `@/i18n/navigation`.
- Produces:
  - `TransformationGallery` props `{ heading: string; intro?: string; transformations: LandingTransformation[]; labels: { before: string; during: string; after: string; placeholder: string } }`
  - `ProcessSections` props `{ heading?: string; sections: LandingProcessSection[] }`
  - `CandidacySection` props `{ candidacy: LandingCandidacy; ctaLabel: string; phone: string }`
  - `RecoveryTimeline` props `{ heading: string; timeline: LandingTimelineStage[] }`

- [ ] **Step 1: Create `src/components/sections/landing/TransformationGallery.tsx`**

```tsx
import TransformImage from "./TransformImage";
import type { LandingTransformation } from "@/data/landings";

interface TransformationGalleryProps {
  heading: string;
  intro?: string;
  transformations: LandingTransformation[];
  labels: { before: string; during: string; after: string; placeholder: string };
}

export default function TransformationGallery({
  heading,
  intro,
  transformations,
  labels,
}: TransformationGalleryProps) {
  if (transformations.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-light mb-4">{heading}</h2>
          {intro && <p className="text-navy/60 leading-relaxed">{intro}</p>}
        </div>

        <div className="space-y-12">
          {transformations.map((t) => {
            const stages = [
              { src: t.before, badge: labels.before },
              ...(t.during ? [{ src: t.during, badge: labels.during }] : []),
              { src: t.after, badge: labels.after },
            ];
            return (
              <div
                key={t.label}
                className="rounded-2xl bg-cream border border-cream-dark p-6 md:p-8 card-hover"
              >
                <p className="font-heading text-xl text-navy mb-5">{t.label}</p>
                <div className={`grid gap-4 ${stages.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                  {stages.map((s, i) => (
                    <TransformImage
                      key={i}
                      src={s.src}
                      alt={`${t.label} — ${s.badge}`}
                      badge={s.badge}
                      placeholder={labels.placeholder}
                    />
                  ))}
                </div>
                {t.note && <p className="text-navy/45 text-sm mt-5 italic">{t.note}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/landing/ProcessSections.tsx`**

```tsx
import type { LandingProcessSection } from "@/data/landings";

interface ProcessSectionsProps {
  heading?: string;
  sections: LandingProcessSection[];
}

export default function ProcessSections({ heading, sections }: ProcessSectionsProps) {
  if (sections.length === 0) return null;

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-6">
        {heading && (
          <div className="mb-12">
            <span className="gold-divider mb-5" />
            <h2 className="font-heading text-4xl md:text-5xl text-navy font-light">{heading}</h2>
          </div>
        )}
        <div className="space-y-12">
          {sections.map((s, i) => (
            <article key={s.heading} className="relative pl-8 border-l-2 border-gold/30">
              <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-gold flex items-center justify-center text-navy text-xs font-bold">
                {i + 1}
              </span>
              <h3 className="font-heading text-2xl md:text-3xl text-navy mb-4">{s.heading}</h3>
              {s.body.split("\n\n").map((p, j) => (
                <p key={j} className="text-navy/70 leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/landing/CandidacySection.tsx`**

```tsx
import { CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LandingCandidacy } from "@/data/landings";

interface CandidacySectionProps {
  candidacy: LandingCandidacy;
  ctaLabel: string;
  phone: string;
}

export default function CandidacySection({ candidacy, ctaLabel, phone }: CandidacySectionProps) {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-30" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="gold-divider mx-auto mb-5" />
        <h2 className="font-heading text-4xl md:text-5xl text-white font-light mb-5">{candidacy.heading}</h2>
        <p className="text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">{candidacy.intro}</p>

        <ul className="text-left max-w-xl mx-auto space-y-3 mb-10">
          {candidacy.qualifies.map((q) => (
            <li key={q} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <CheckCircle size={18} className="text-gold mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm leading-relaxed">{q}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold text-sm tracking-[0.1em] uppercase px-8 py-4 rounded-lg transition-colors"
        >
          {ctaLabel}
        </Link>
        <p className="mt-4 text-white/40 text-sm">
          <a href="tel:+13052183513" className="text-gold hover:underline">
            {phone}
          </a>
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/components/sections/landing/RecoveryTimeline.tsx`**

```tsx
import type { LandingTimelineStage } from "@/data/landings";

interface RecoveryTimelineProps {
  heading: string;
  timeline: LandingTimelineStage[];
}

export default function RecoveryTimeline({ heading, timeline }: RecoveryTimelineProps) {
  if (timeline.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-light">{heading}</h2>
        </div>
        <ol className="relative border-l-2 border-gold/30 ml-3 space-y-10">
          {timeline.map((stage) => (
            <li key={stage.stage} className="relative pl-8">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gold ring-4 ring-white" />
              <p className="font-heading text-xl text-navy mb-1">{stage.stage}</p>
              <p className="text-navy/65 text-sm leading-relaxed">{stage.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/landing/
git commit -m "feat: add gallery, process, candidacy, and timeline landing components"
```

---

## Task 4: Wire landing sections into the procedure detail page

**Files:**
- Modify: `src/app/[locale]/(site)/procedures/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getLanding`, `landingLabels` from `@/data/landings`; all five landing components from Tasks 2–3.

- [ ] **Step 1: Add imports** at the top of `page.tsx`, after the existing `CTABanner` import (line 8):

```tsx
import { getLanding, landingLabels } from "@/data/landings";
import OfferBanner from "@/components/sections/landing/OfferBanner";
import TransformationGallery from "@/components/sections/landing/TransformationGallery";
import ProcessSections from "@/components/sections/landing/ProcessSections";
import CandidacySection from "@/components/sections/landing/CandidacySection";
import RecoveryTimeline from "@/components/sections/landing/RecoveryTimeline";
```

- [ ] **Step 2: Resolve the landing content** inside `ProcedureDetailPage`, immediately after the `benefits` line (currently line 74):

```tsx
  const landing = getLanding(slug, locale);
  const labels = landingLabels[locale] ?? landingLabels.en;
```

- [ ] **Step 3: Extend the JSON-LD `followup`.** In the `MedicalProcedure` object, replace the existing line:

```tsx
      followup: `Recovery time: ${proc.recovery}`,
```

with:

```tsx
      followup: landing
        ? `Recovery timeline: ${landing.timeline.map((s) => `${s.stage} — ${s.detail}`).join(" ")}`
        : `Recovery time: ${proc.recovery}`,
```

- [ ] **Step 4: Add a promo eyebrow in the hero.** In the hero `<section>`, directly BELOW the category eyebrow paragraph (the `<p>` that renders `categoryLabel[proc.category]`, currently lines 172-174), insert:

```tsx
          {landing?.offer && (
            <span className="inline-block mt-3 mb-1 bg-gold/15 border border-gold/30 text-gold text-[11px] tracking-[0.2em] uppercase font-medium px-3 py-1 rounded-full">
              {landing.offer.headline}
            </span>
          )}
```

- [ ] **Step 5: Render the offer banner and landing sections.** Immediately AFTER the closing `</section>` of the hero (currently line 186) and BEFORE the `{/* Main content */}` comment, insert:

```tsx
      {landing?.offer && <OfferBanner offer={landing.offer} defaultCtaLabel={labels.defaultCta} />}

      {landing && (
        <>
          <TransformationGallery
            heading={landing.transformationsHeading}
            intro={landing.transformationsIntro}
            transformations={landing.transformations}
            labels={labels}
          />
          <ProcessSections heading={landing.processHeading} sections={landing.process} />
          <CandidacySection candidacy={landing.candidacy} ctaLabel={labels.defaultCta} phone={labels.phone} />
          <RecoveryTimeline heading={landing.timelineHeading} timeline={landing.timeline} />
        </>
      )}
```

- [ ] **Step 6: Type-check, lint, and build**

Run: `npx tsc --noEmit`
Expected: PASS.

Run: `npm run lint`
Expected: PASS (no new errors). The `eslint-disable-next-line @next/next/no-img-element` comment in `TransformImage.tsx` suppresses the expected `<img>` warning.

Run: `npm run build`
Expected: Build succeeds; `/en/procedures/facelift` and `/es/procedures/facelift` are statically generated without errors.

- [ ] **Step 7: Manual browser verification**

Run: `npm run dev`, then open `http://localhost:3000/procedures/facelift` and `http://localhost:3000/es/procedures/facelift`.
Verify:
- Gold promo eyebrow appears in hero; dismissible offer banner shows below hero and disappears on clicking `×`.
- Transformation gallery shows 3 cases, each with Before/During/After columns rendering branded "Photo coming soon" placeholders (no broken-image icons).
- Process sections (numbered 1–5), candidacy checklist with Book CTA, and recovery timeline all render.
- Spanish page shows translated copy and "Antes/Durante/Después" badges.
- A non-landing procedure (e.g. `http://localhost:3000/procedures/rhinoplasty`) renders unchanged — no gallery, no banner.

- [ ] **Step 8: Commit**

```bash
git add "src/app/[locale]/(site)/procedures/[slug]/page.tsx"
git commit -m "feat: render landing sections on opted-in procedure pages"
```

---

## Self-Review

**Spec coverage:**
- Separate `landings.ts` opt-in data model → Task 1. ✅
- Optional dismissible offer banner → Task 2 (`OfferBanner`) + Task 4 wiring. ✅
- Before/during/after transformation gallery with placeholder fallback → Task 2 (`TransformImage`) + Task 3 (`TransformationGallery`). ✅
- Section-by-section SEO copy → Task 1 content + Task 3 (`ProcessSections`). ✅
- "See if you qualify" funnel → Task 3 (`CandidacySection`). ✅
- Recovery timeline → Task 3 (`RecoveryTimeline`). ✅
- Bilingual EN/ES → Task 1 content + `landingLabels`. ✅
- JSON-LD `followup` extended with timeline → Task 4 Step 3. ✅
- Graceful degradation (no entry → unchanged page; missing sub-data → section not rendered) → `getLanding` returns null + each component early-returns on empty arrays + Task 4 conditional rendering. ✅
- Reuse brand tokens, no `tailwind.config.ts` → all components use existing utilities. ✅

**Placeholder scan:** No "TBD"/"TODO"/"implement later". All component code and content are complete and literal. ✅

**Type consistency:** `getLanding` returns `LandingLocaleContent | null`; page guards with `landing &&`. `landingLabels[locale]` shape `{ before, during, after, placeholder, defaultCta, phone }` matches what `TransformationGallery` (`labels` subset) and `CandidacySection` (`phone`) consume. Image path strings consistent (`/before-after/facelift-N-stage.webp`). Component prop names match call sites in Task 4. ✅

**Imagery note:** Path convention `/before-after/facelift-<n>-<before|during|after>.webp`. Dropping real files there makes them appear automatically (TransformImage `onError` fallback). No code change needed.
