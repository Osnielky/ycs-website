# SEO & Bilingual (EN/ES) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the YCS website fully bilingual (EN/ES) with `/es/` subdirectory routing for local SEO, fix broken OG image and favicon infrastructure, and add missing structured data.

**Architecture:** `next-intl` v3 wraps all public pages in a `[locale]` dynamic segment. The `(site)` route group moves into `[locale]/(site)/`, giving Google two crawlable URL trees (`/…` and `/es/…`) with `hreflang` alternate links on every page. Root layout becomes a minimal passthrough; the locale layout renders `<html lang={locale}>` and hosts `NextIntlClientProvider`. Admin/API routes stay outside the locale system.

**Tech Stack:** `next-intl ^3.0.0`, Next.js 16 App Router, Tailwind CSS v4, `next/og` for OG image.

---

## File Map

### New files
| Path | Purpose |
|---|---|
| `src/middleware.ts` | next-intl edge middleware — locale detection + `/es/` routing |
| `src/i18n/routing.ts` | `defineRouting` config (locales, defaultLocale, prefix strategy) |
| `src/i18n/request.ts` | `getRequestConfig` — loads messages per request |
| `src/i18n/navigation.ts` | Locale-aware `Link`, `useRouter`, `usePathname` exports |
| `src/lib/seo.ts` | `hreflangAlternates(path)` helper used in all `generateMetadata` calls |
| `messages/en.json` | All English UI strings |
| `messages/es.json` | All Spanish UI strings |
| `src/app/[locale]/(site)/layout.tsx` | Main layout — html/body, fonts, provider, Navbar, Footer |
| `src/app/api/og/route.tsx` | Dynamic OG image (1200×630) via `ImageResponse` |
| `public/site.webmanifest` | PWA manifest (name, icons, theme color) |
| `src/components/layout/LanguageSwitcher.tsx` | EN\|ES toggle rendered inside Navbar |

### Files moved (copy then delete originals)
`src/app/(site)/` → `src/app/[locale]/(site)/`  
All 8 files: layout, page, about, procedures/page, procedures/[slug]/page, contact, testimonials, gallery.  
The old `(site)/layout.tsx` is deleted; all other files are migrated and updated in place.

### Files modified
| Path | Change |
|---|---|
| `next.config.ts` | Wrap with `withNextIntl` plugin |
| `src/app/layout.tsx` | Strip to passthrough — import globals.css, return children, update icons metadata |
| `src/app/admin/layout.tsx` | Add `<html>`/`<body>` (root no longer provides them) |
| `src/app/sitemap.ts` | Add `/es/*` URLs; fix contact `changeFrequency` |
| `src/data/procedures.ts` | Add `es?: { name, tagline, description, benefits }` to each procedure |
| `src/components/layout/Navbar.tsx` | Locale-aware links, `useTranslations`, add `LanguageSwitcher` |
| `src/components/layout/Footer.tsx` | Locale-aware links, `getTranslations` (async) |
| `src/components/layout/FooterContactForm.tsx` | `useTranslations` |
| `src/components/sections/Hero.tsx` | `useTranslations` + locale-aware links |
| `src/components/sections/StatsBar.tsx` | `useTranslations` |
| `src/components/sections/DoctorSection.tsx` | `getTranslations` (make async) + locale-aware links |
| `src/components/sections/CTABanner.tsx` | `getTranslations` (make async) |
| All 7 pages under `[locale]/(site)/` | `getTranslations` + `hreflangAlternates` in metadata + `setRequestLocale` |

---

## Task 1: Create `/api/og` OG Image Route

**Files:**
- Create: `src/app/api/og/route.tsx`
- Modify: `src/app/layout.tsx` (update OG image URL)

- [ ] **Step 1: Create the route file**

```tsx
// src/app/api/og/route.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Your Cosmetic Surgery & SPA';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d1b3e',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#c9a46e' }} />
        <div
          style={{
            color: '#c9a46e',
            fontSize: 20,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 32,
            fontFamily: 'serif',
          }}
        >
          Your Cosmetic Surgery &amp; SPA
        </div>
        <div
          style={{
            color: 'white',
            fontSize: title.length > 35 ? 50 : 64,
            fontWeight: 300,
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.15,
            fontFamily: 'serif',
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 20,
            marginTop: 40,
            letterSpacing: '0.15em',
          }}
        >
          Hialeah · Miami · South Florida
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: '#c9a46e' }} />
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 60,
            color: 'rgba(255,255,255,0.25)',
            fontSize: 16,
          }}
        >
          ycosmeticsurgery.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

- [ ] **Step 2: Update OG image references in `src/app/layout.tsx`**

In `src/app/layout.tsx`, change both OG image `url` fields and the twitter image from `/og-image.jpg` to `/api/og`:

```ts
// In the openGraph.images array:
{ url: '/api/og', width: 1200, height: 630, alt: 'Your Cosmetic Surgery & SPA Miami' }

// In the twitter.images array:
images: ['/api/og'],
```

- [ ] **Step 3: Update OG image in procedure detail page**

In `src/app/(site)/procedures/[slug]/page.tsx` (later `[locale]/(site)/…`), change the OG images in `generateMetadata` to use the dynamic route:

```ts
images: [
  {
    url: `/api/og?title=${encodeURIComponent(proc.name + ' Miami')}`,
    width: 1200,
    height: 630,
    alt: `${proc.name} results at Your Cosmetic Surgery & SPA, Miami`,
  },
],
```

- [ ] **Step 4: Verify route builds**

```bash
npm run build
```
Expected: build completes. Check for `api/og` in the output routes list.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/og/route.tsx src/app/layout.tsx
git commit -m "feat: add dynamic OG image route via ImageResponse"
```

---

## Task 2: Favicon Suite + logo.png

**Files:**
- Create: `public/site.webmanifest`
- Modify: `src/app/layout.tsx` (add `metadata.icons`)

- [ ] **Step 1: Copy Logo.jpg to logo.png**

```powershell
Copy-Item "public\Logo.jpg" "public\logo.png"
```

- [ ] **Step 2: Create `public/site.webmanifest`**

```json
{
  "name": "Your Cosmetic Surgery & SPA",
  "short_name": "YCS",
  "description": "Board-certified plastic surgeons in Miami & Hialeah, FL",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#0d1b3e",
  "background_color": "#faf9f7",
  "icons": [
    { "src": "/logo.svg", "sizes": "any", "type": "image/svg+xml" }
  ]
}
```

- [ ] **Step 3: Add favicon metadata to `src/app/layout.tsx`**

Inside the `export const metadata: Metadata = { … }` block, add an `icons` key and a manifest link:

```ts
icons: {
  icon: [
    { url: '/logo.svg', type: 'image/svg+xml' },
  ],
  apple: '/logo.svg',
},
manifest: '/site.webmanifest',
```

- [ ] **Step 4: Verify with build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add public/site.webmanifest public/logo.png src/app/layout.tsx
git commit -m "feat: add favicon suite, site.webmanifest, and logo.png"
```

---

## Task 3: ReviewSchema on Testimonials + Sitemap Fixes

**Files:**
- Modify: `src/app/(site)/testimonials/page.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add ReviewSchema to testimonials page**

Open `src/app/(site)/testimonials/page.tsx`. After the existing `metadata` export, add a `jsonLd` block and inject it into the page.

First check what fields `testimonials` from `@/data/procedures` has — the array items likely have `name`, `quote`/`text`, and `rating`. Add this before the `export default function`:

```tsx
import { testimonials } from "@/data/procedures";

const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Patient Reviews — Your Cosmetic Surgery & SPA",
  url: "https://ycosmeticsurgery.com/testimonials",
  numberOfItems: testimonials.length,
  itemListElement: testimonials.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      author: { "@type": "Person", name: (t as { name?: string }).name ?? "Verified Patient" },
      reviewBody: (t as { quote?: string; text?: string }).quote ?? (t as { text?: string }).text ?? "",
      reviewRating: {
        "@type": "Rating",
        ratingValue: (t as { rating?: number }).rating ?? 5,
        bestRating: 5,
      },
      itemReviewed: {
        "@type": "MedicalBusiness",
        name: "Your Cosmetic Surgery & SPA",
        url: "https://ycosmeticsurgery.com",
      },
    },
  })),
};
```

Then in the JSX, add the script tag as the first child (same pattern as other pages):

```tsx
export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      {/* existing JSX */}
    </>
  );
}
```

- [ ] **Step 2: Fix sitemap contact changeFrequency**

In `src/app/sitemap.ts`, change the contact entry:

```ts
// Before:
{ url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.9 },
// After:
{ url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
```

- [ ] **Step 3: Build and commit**

```bash
npm run build
git add src/app/(site)/testimonials/page.tsx src/app/sitemap.ts
git commit -m "feat: add ReviewSchema to testimonials page; fix sitemap contact entry"
```

---

## Task 4: Install next-intl + Scaffold i18n Config Files

**Files:**
- Modify: `package.json` (via npm install)
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/middleware.ts`

- [ ] **Step 1: Install next-intl**

```bash
npm install next-intl
```

Expected: `next-intl` added to `package.json` dependencies.

- [ ] **Step 2: Create `src/i18n/routing.ts`**

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
```

`localePrefix: 'as-needed'` means English stays at `/`, Spanish at `/es/`.

- [ ] **Step 3: Create `src/i18n/request.ts`**

```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as ReadonlyArray<string>).includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Create `src/i18n/navigation.ts`**

```ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 5: Create `src/middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|admin|_next|_vercel|.*\\..*).*)',
  ],
};
```

The matcher excludes `/api`, `/admin`, Next.js internals, and static files (anything with a `.` extension).

- [ ] **Step 6: Commit**

```bash
git add src/i18n/ src/middleware.ts package.json package-lock.json
git commit -m "feat: install next-intl and scaffold i18n config"
```

---

## Task 5: Create `messages/en.json`

**Files:**
- Create: `messages/en.json`

- [ ] **Step 1: Create the file**

```bash
mkdir messages
```

- [ ] **Step 2: Write `messages/en.json`**

```json
{
  "nav": {
    "procedures": "Procedures",
    "gallery": "Gallery",
    "about": "About",
    "testimonials": "Testimonials",
    "contact": "Contact",
    "bookConsultation": "Free Consultation",
    "bookFreeConsultation": "Book Free Consultation",
    "viewAllProcedures": "View all procedures →",
    "beforeAfterGallery": "Before & After gallery →",
    "openMenu": "Open menu",
    "body": "Body",
    "breast": "Breast",
    "face": "Face",
    "medspa": "MedSpa",
    "langEn": "EN",
    "langEs": "ES"
  },
  "hero": {
    "badge": "4.9 · 500+ Verified Patient Reviews · Miami, FL",
    "headline1": "Trusted Plastic",
    "headline2": "Surgeons in",
    "headlineHighlight": "Miami",
    "subheadline": "Expert cosmetic surgery services for stunning transformations. Board-certified surgeons with 20+ years of experience, flexible financing, and free consultations. Serving Hialeah and all of South Florida.",
    "bookConsultation": "Book Free Consultation",
    "viewResults": "View Our Results",
    "callUs": "Or call us: (305) 218-3513",
    "chatWhatsapp": "Chat on WhatsApp",
    "formTitle": "Free Consultation",
    "formSubtitle": "No obligation · Private · Personalized",
    "formNamePlaceholder": "Your Full Name",
    "formPhonePlaceholder": "Phone Number",
    "formProcedurePlaceholder": "Procedure of Interest (optional)",
    "formSubmit": "Request My Free Consultation",
    "formSubmitting": "Sending…",
    "formDisclaimer": "By submitting, you agree to receive a call or text from our team. We never share your information.",
    "thankYouTitle": "Thank You!",
    "thankYouMessage": "We've received your request and will contact you within 24 hours to schedule your free consultation.",
    "formNameError": "Please enter your name",
    "formPhoneError": "Please enter a valid phone number",
    "procedureOptions": [
      "Breast Augmentation",
      "Tummy Tuck",
      "Rhinoplasty",
      "Liposuction",
      "Brazilian Butt Lift",
      "Facelift",
      "Mommy Makeover",
      "Botox & Fillers",
      "Other / Not sure"
    ]
  },
  "stats": {
    "yearsExperience": "Years of Experience",
    "patientsTransformed": "Patients Transformed",
    "patientSatisfaction": "Patient Satisfaction",
    "proceduresOffered": "Procedures Offered"
  },
  "doctor": {
    "eyebrow": "Your Cosmetic Surgery & SPA · Miami, Florida",
    "meetLabel": "Meet",
    "name": "Dr. Mario Reyes-Serrano",
    "subtitle": "Board-Certified Plastic Surgeon · 20+ Years of Excellence",
    "bio": "Dr. Mario Reyes-Serrano is a board-certified plastic surgeon with over 20 years of experience delivering natural-looking, transformative results in Miami and Hialeah, Florida. Specializing in body contouring, breast procedures, facial rejuvenation, and minimally invasive treatments, Dr. Reyes-Serrano combines surgical precision with an artistic eye to help each patient achieve their unique aesthetic goals — safely and confidently.",
    "asps": "American Society of Plastic Surgeons",
    "abps": "American Board of Plastic Surgery",
    "spec1": "BBL & Body Contouring",
    "spec2": "Breast Augmentation",
    "spec3": "Tummy Tuck",
    "spec4": "Rhinoplasty",
    "spec5": "Facial Rejuvenation",
    "learnMore": "Learn More About Dr. Reyes-Serrano",
    "bookConsultation": "Book Consultation"
  },
  "cta": {
    "sectionTitle": "Real Patients, Real Results",
    "sectionSubtitle": "Hear directly from the patients whose lives were transformed at Your Cosmetic Surgery & SPA."
  },
  "footer": {
    "contactUs": "Contact Us",
    "address": "1255 W 46th St, Suite #6 & 7A",
    "city": "Hialeah, FL 33012",
    "officeHours": "Office Hours",
    "hoursWeekday": "Mon – Fri: 9:00am – 6:00pm",
    "hoursSaturday": "Saturday: 10:00am – 3:00pm",
    "stars": "4.9 Stars from 500+ Reviews",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service",
    "accessibilityStatement": "Accessibility Statement",
    "mobileBook": "Book",
    "mobileCall": "Call",
    "mobileText": "Text",
    "navHome": "HOME",
    "navProcedures": "PROCEDURES",
    "navGallery": "GALLERY",
    "navAbout": "ABOUT",
    "navTestimonials": "TESTIMONIALS",
    "navContact": "CONTACT US"
  },
  "footerForm": {
    "intro": "Fill out the form below and we'll get in touch to book a call.",
    "namePlaceholder": "* Full Name",
    "phonePlaceholder": "* Phone",
    "emailPlaceholder": "* Email",
    "procedurePlaceholder": "What are you interested in?",
    "messagePlaceholder": "Additional Comments: Please feel free to add any additional comments you would like to share",
    "smsConsent": "By checking this box, you agree to receive SMS messages from Your Cosmetic Surgery & SPA. You may reply STOP to opt-out at any time. Message and data rates may apply.",
    "submit": "SUBMIT",
    "submitting": "SENDING…",
    "thankYouTitle": "Thank You!",
    "thankYouMessage": "We've received your request and will reach out within 24 hours to schedule your free consultation."
  },
  "proceduresPage": {
    "heroTitle": "Our Procedures",
    "heroSubtitle": "From surgical transformation to non-invasive enhancements — every procedure is designed around your unique goals and anatomy.",
    "learnMore": "Learn More",
    "recovery": "Recovery"
  },
  "procedureDetail": {
    "whatToExpect": "What to Expect",
    "faq": "Frequently Asked Questions",
    "readyToLearn": "Ready to Learn More?",
    "sidebarSubtitle": "Schedule a private, no-obligation consultation with one of our board-certified surgeons.",
    "bookConsultation": "Book Free Consultation",
    "relatedProcedures": "Related Procedures",
    "backToAll": "Back to all procedures",
    "recoveryLabel": "Recovery:",
    "faqQ1": "Am I a good candidate?",
    "faqA1": "The best way to determine candidacy is a private consultation with one of our surgeons. Generally, good candidates are in overall good health, have realistic expectations, and are non-smokers.",
    "faqQ2": "What anesthesia is used?",
    "faqA2": "Depending on the procedure, we use either general anesthesia or local anesthesia with IV sedation. Your surgeon will discuss the safest and most comfortable option for you.",
    "faqQ3": "When will I see results?",
    "faqA3": "Some improvement is visible immediately, though full results develop as swelling subsides — typically within a few weeks to months. Your surgeon will give you a personalized timeline.",
    "faqQ4": "Is financing available?",
    "faqA4": "Yes. We partner with several financing companies to offer flexible payment plans. Contact our office to learn about available options.",
    "trustBoardCertified": "Board-certified surgeons",
    "trustAccredited": "AAAHC-accredited facility",
    "trustNaturalResults": "Natural results philosophy",
    "trustSupport": "24/7 patient support"
  },
  "aboutPage": {
    "heroTitle": "About Us",
    "heroSubtitle": "Trusted plastic surgeons in Miami with over 20 years of experience. We are dedicated to helping patients across South Florida achieve natural, stunning results.",
    "storyHeading": "Miami's Trusted Cosmetic Surgery Center",
    "storyP1": "Your Cosmetic Surgery & SPA is a state-of-the-art clinic staffed by respected board-certified surgeons with over 20 years of experience each. We have become a trusted name in plastic surgery across South Florida, serving patients from Miami, Hialeah, and from all over the country.",
    "storyP2": "With flexible financing options, we make a wide variety of popular procedures accessible for everyone. Our team's philosophy is simple: we don't change who you are — we reveal the best version of you. Every treatment plan is crafted individually, never templated.",
    "storyP3": "Led by Dr. Mario Reyes-Serrano, our surgical team brings decades of combined expertise to every procedure — from BBL and Lipo 360 to rhinoplasty, facelifts, and everything in between.",
    "bookConsultation": "Book Free Consultation",
    "valuesTitle": "Our Values",
    "safetyTitle": "Safety First",
    "safetyDesc": "Every procedure is performed in our AAAHC-accredited surgical suite in Hialeah, with the highest standards of patient safety.",
    "artTitle": "Artistry & Precision",
    "artDesc": "We blend surgical expertise with an artist's eye — every result is designed to look natural and enhance your unique beauty.",
    "expTitle": "20+ Years Experience",
    "expDesc": "Our board-certified surgeons bring decades of combined experience across every facet of cosmetic and aesthetic medicine.",
    "careTitle": "Patient-Centered Care",
    "careDesc": "From your first call to your final follow-up, you are treated with discretion, compassion, and genuine care.",
    "meetSurgeon": "Meet Our Surgeon",
    "drTitle": "Board-Certified Plastic Surgeon",
    "drBio1": "Dr. Reyes-Serrano is one of Miami's most respected and trusted plastic surgeons with more than 20 years of experience in cosmetic and reconstructive surgery. His expertise spans body contouring, breast surgery, and facial procedures, with a reputation for results that look completely natural.",
    "drBio2": "Patients travel from across the country — and internationally — to be treated by Dr. Reyes-Serrano and the Your Cosmetic Surgery & SPA team in Hialeah, FL.",
    "ourJourney": "Our Journey",
    "milestone2004": "Your Cosmetic Surgery & SPA founded with a commitment to natural, patient-first results in South Florida.",
    "milestone2008": "Achieved AAAHC accreditation for our state-of-the-art surgical facility in Hialeah.",
    "milestone2012": "Surpassed 1,000 successful procedures with a 98% patient satisfaction rate.",
    "milestone2016": "Expanded services to include cutting-edge MedSpa treatments alongside surgical procedures.",
    "milestone2020": "Recognized among the Top Cosmetic Surgery Centers in South Florida.",
    "milestone2024": "Over 5,000 transformations and counting — each one a unique story of renewed confidence."
  },
  "contactPage": {
    "heroTitle": "Contact Us",
    "heroSubtitle": "Our team is ready to help you take the first step toward your transformation."
  },
  "testimonialsPage": {
    "heroTitle": "Patient Testimonials",
    "heroSubtitle": "Real stories from real patients who trusted us with their transformation."
  },
  "galleryPage": {
    "heroTitle": "Before & After Gallery",
    "heroSubtitle": "See real patient results from our board-certified surgeons in Miami."
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add messages/en.json
git commit -m "feat: add English translation strings (messages/en.json)"
```

---

## Task 6: Create `messages/es.json`

**Files:**
- Create: `messages/es.json`

- [ ] **Step 1: Write `messages/es.json`**

```json
{
  "nav": {
    "procedures": "Procedimientos",
    "gallery": "Galería",
    "about": "Nosotros",
    "testimonials": "Testimonios",
    "contact": "Contacto",
    "bookConsultation": "Consulta Gratis",
    "bookFreeConsultation": "Reservar Consulta Gratis",
    "viewAllProcedures": "Ver todos los procedimientos →",
    "beforeAfterGallery": "Galería Antes y Después →",
    "openMenu": "Abrir menú",
    "body": "Cuerpo",
    "breast": "Senos",
    "face": "Rostro",
    "medspa": "MedSpa",
    "langEn": "EN",
    "langEs": "ES"
  },
  "hero": {
    "badge": "4.9 · Más de 500 Reseñas Verificadas · Miami, FL",
    "headline1": "Cirujanos Plásticos",
    "headline2": "de Confianza en",
    "headlineHighlight": "Miami",
    "subheadline": "Servicios expertos de cirugía cosmética para transformaciones increíbles. Cirujanos certificados con más de 20 años de experiencia, financiamiento flexible y consultas gratuitas. Sirviendo a Hialeah y todo el Sur de Florida.",
    "bookConsultation": "Reservar Consulta Gratis",
    "viewResults": "Ver Nuestros Resultados",
    "callUs": "O llámenos: (305) 218-3513",
    "chatWhatsapp": "Chatear por WhatsApp",
    "formTitle": "Consulta Gratis",
    "formSubtitle": "Sin compromiso · Privado · Personalizado",
    "formNamePlaceholder": "Su Nombre Completo",
    "formPhonePlaceholder": "Número de Teléfono",
    "formProcedurePlaceholder": "Procedimiento de Interés (opcional)",
    "formSubmit": "Solicitar Mi Consulta Gratis",
    "formSubmitting": "Enviando…",
    "formDisclaimer": "Al enviar, acepta recibir una llamada o mensaje de nuestro equipo. Nunca compartimos su información.",
    "thankYouTitle": "¡Gracias!",
    "thankYouMessage": "Hemos recibido su solicitud y nos comunicaremos en 24 horas para programar su consulta gratuita.",
    "formNameError": "Por favor ingrese su nombre",
    "formPhoneError": "Por favor ingrese un número de teléfono válido",
    "procedureOptions": [
      "Aumento de Senos",
      "Abdominoplastia",
      "Rinoplastia",
      "Liposucción",
      "Levantamiento Brasileño de Glúteos",
      "Lifting Facial",
      "Mommy Makeover",
      "Botox y Rellenos",
      "Otro / No estoy seguro/a"
    ]
  },
  "stats": {
    "yearsExperience": "Años de Experiencia",
    "patientsTransformed": "Pacientes Transformados",
    "patientSatisfaction": "Satisfacción del Paciente",
    "proceduresOffered": "Procedimientos Disponibles"
  },
  "doctor": {
    "eyebrow": "Your Cosmetic Surgery & SPA · Miami, Florida",
    "meetLabel": "Conozca al",
    "name": "Dr. Mario Reyes-Serrano",
    "subtitle": "Cirujano Plástico Certificado · Más de 20 Años de Excelencia",
    "bio": "El Dr. Mario Reyes-Serrano es un cirujano plástico certificado con más de 20 años de experiencia ofreciendo resultados naturales y transformadores en Miami e Hialeah, Florida. Especializado en contorno corporal, procedimientos de senos, rejuvenecimiento facial y tratamientos mínimamente invasivos, combina precisión quirúrgica con un ojo artístico para ayudar a cada paciente a alcanzar sus objetivos estéticos únicos de manera segura y confiada.",
    "asps": "American Society of Plastic Surgeons",
    "abps": "American Board of Plastic Surgery",
    "spec1": "BBL y Contorno Corporal",
    "spec2": "Aumento de Senos",
    "spec3": "Abdominoplastia",
    "spec4": "Rinoplastia",
    "spec5": "Rejuvenecimiento Facial",
    "learnMore": "Conocer Más Sobre el Dr. Reyes-Serrano",
    "bookConsultation": "Reservar Consulta"
  },
  "cta": {
    "sectionTitle": "Pacientes Reales, Resultados Reales",
    "sectionSubtitle": "Escuche directamente a los pacientes cuyas vidas fueron transformadas en Your Cosmetic Surgery & SPA."
  },
  "footer": {
    "contactUs": "Contáctenos",
    "address": "1255 W 46th St, Suite #6 & 7A",
    "city": "Hialeah, FL 33012",
    "officeHours": "Horario de Atención",
    "hoursWeekday": "Lun – Vie: 9:00am – 6:00pm",
    "hoursSaturday": "Sábado: 10:00am – 3:00pm",
    "stars": "4.9 Estrellas de más de 500 Reseñas",
    "privacyPolicy": "Política de Privacidad",
    "termsOfService": "Términos de Servicio",
    "accessibilityStatement": "Declaración de Accesibilidad",
    "mobileBook": "Reservar",
    "mobileCall": "Llamar",
    "mobileText": "Mensaje",
    "navHome": "INICIO",
    "navProcedures": "PROCEDIMIENTOS",
    "navGallery": "GALERÍA",
    "navAbout": "NOSOTROS",
    "navTestimonials": "TESTIMONIOS",
    "navContact": "CONTÁCTENOS"
  },
  "footerForm": {
    "intro": "Complete el formulario a continuación y nos comunicaremos para programar una llamada.",
    "namePlaceholder": "* Nombre Completo",
    "phonePlaceholder": "* Teléfono",
    "emailPlaceholder": "* Correo Electrónico",
    "procedurePlaceholder": "¿En qué está interesado/a?",
    "messagePlaceholder": "Comentarios Adicionales: Por favor comparta cualquier información adicional",
    "smsConsent": "Al marcar esta casilla, acepta recibir mensajes SMS de Your Cosmetic Surgery & SPA. Puede responder STOP para cancelar en cualquier momento. Pueden aplicar tarifas de mensajes y datos.",
    "submit": "ENVIAR",
    "submitting": "ENVIANDO…",
    "thankYouTitle": "¡Gracias!",
    "thankYouMessage": "Hemos recibido su solicitud y nos comunicaremos en 24 horas para programar su consulta gratuita."
  },
  "proceduresPage": {
    "heroTitle": "Nuestros Procedimientos",
    "heroSubtitle": "Desde transformaciones quirúrgicas hasta mejoras no invasivas — cada procedimiento está diseñado en torno a sus objetivos y anatomía únicos.",
    "learnMore": "Saber Más",
    "recovery": "Recuperación"
  },
  "procedureDetail": {
    "whatToExpect": "Qué Esperar",
    "faq": "Preguntas Frecuentes",
    "readyToLearn": "¿Listo para Saber Más?",
    "sidebarSubtitle": "Programe una consulta privada y sin compromiso con uno de nuestros cirujanos certificados.",
    "bookConsultation": "Reservar Consulta Gratis",
    "relatedProcedures": "Procedimientos Relacionados",
    "backToAll": "Volver a todos los procedimientos",
    "recoveryLabel": "Recuperación:",
    "faqQ1": "¿Soy un buen candidato?",
    "faqA1": "La mejor manera de determinar la candidatura es una consulta privada con uno de nuestros cirujanos. En general, los buenos candidatos gozan de buena salud, tienen expectativas realistas y no fuman.",
    "faqQ2": "¿Qué anestesia se utiliza?",
    "faqA2": "Dependiendo del procedimiento, utilizamos anestesia general o anestesia local con sedación IV. Su cirujano discutirá la opción más segura y cómoda para usted.",
    "faqQ3": "¿Cuándo veré los resultados?",
    "faqA3": "Algunas mejoras son visibles de inmediato, aunque los resultados completos se desarrollan a medida que disminuye la hinchazón, generalmente en unas pocas semanas o meses. Su cirujano le dará un cronograma personalizado.",
    "faqQ4": "¿Está disponible el financiamiento?",
    "faqA4": "Sí. Nos asociamos con varias empresas de financiamiento para ofrecer planes de pago flexibles. Contáctenos para conocer las opciones disponibles.",
    "trustBoardCertified": "Cirujanos certificados",
    "trustAccredited": "Instalación acreditada por AAAHC",
    "trustNaturalResults": "Filosofía de resultados naturales",
    "trustSupport": "Apoyo al paciente 24/7"
  },
  "aboutPage": {
    "heroTitle": "Nosotros",
    "heroSubtitle": "Cirujanos plásticos de confianza en Miami con más de 20 años de experiencia. Estamos dedicados a ayudar a los pacientes de todo el Sur de Florida a lograr resultados naturales y espectaculares.",
    "storyHeading": "El Centro de Cirugía Cosmética de Confianza de Miami",
    "storyP1": "Your Cosmetic Surgery & SPA es una clínica de vanguardia con cirujanos certificados con más de 20 años de experiencia cada uno. Nos hemos convertido en un nombre de confianza en cirugía plástica en todo el Sur de Florida, atendiendo a pacientes de Miami, Hialeah y de todo el país.",
    "storyP2": "Con opciones de financiamiento flexible, hacemos accesible una amplia variedad de procedimientos para todos. La filosofía de nuestro equipo es simple: no cambiamos quién eres — revelamos la mejor versión de ti. Cada plan de tratamiento se elabora individualmente, nunca con plantillas.",
    "storyP3": "Liderado por el Dr. Mario Reyes-Serrano, nuestro equipo quirúrgico aporta décadas de experiencia combinada a cada procedimiento — desde BBL y Lipo 360 hasta rinoplastia, liftings y todo lo demás.",
    "bookConsultation": "Reservar Consulta Gratis",
    "valuesTitle": "Nuestros Valores",
    "safetyTitle": "La Seguridad Primero",
    "safetyDesc": "Cada procedimiento se realiza en nuestra suite quirúrgica acreditada por AAAHC en Hialeah, con los más altos estándares de seguridad del paciente.",
    "artTitle": "Arte y Precisión",
    "artDesc": "Combinamos experiencia quirúrgica con un ojo artístico — cada resultado está diseñado para verse natural y realzar tu belleza única.",
    "expTitle": "Más de 20 Años de Experiencia",
    "expDesc": "Nuestros cirujanos certificados aportan décadas de experiencia combinada en todos los aspectos de la medicina cosmética y estética.",
    "careTitle": "Atención Centrada en el Paciente",
    "careDesc": "Desde su primera llamada hasta su último seguimiento, es tratado con discreción, compasión y atención genuina.",
    "meetSurgeon": "Conozca a Nuestro Cirujano",
    "drTitle": "Cirujano Plástico Certificado",
    "drBio1": "El Dr. Reyes-Serrano es uno de los cirujanos plásticos más respetados de Miami con más de 20 años de experiencia en cirugía cosmética y reconstructiva. Su experiencia abarca contorno corporal, cirugía de senos y procedimientos faciales, con una reputación por resultados que se ven completamente naturales.",
    "drBio2": "Los pacientes viajan de todo el país — e internacionalmente — para ser atendidos por el Dr. Reyes-Serrano y el equipo de Your Cosmetic Surgery & SPA en Hialeah, FL.",
    "ourJourney": "Nuestro Camino",
    "milestone2004": "Your Cosmetic Surgery & SPA fundada con el compromiso de resultados naturales centrados en el paciente en el Sur de Florida.",
    "milestone2008": "Obtuvo la acreditación AAAHC para nuestra instalación quirúrgica de vanguardia en Hialeah.",
    "milestone2012": "Superó 1,000 procedimientos exitosos con una tasa de satisfacción del paciente del 98%.",
    "milestone2016": "Amplió los servicios para incluir tratamientos MedSpa de vanguardia junto con procedimientos quirúrgicos.",
    "milestone2020": "Reconocida entre los Mejores Centros de Cirugía Cosmética del Sur de Florida.",
    "milestone2024": "Más de 5,000 transformaciones y contando — cada una una historia única de confianza renovada."
  },
  "contactPage": {
    "heroTitle": "Contáctenos",
    "heroSubtitle": "Nuestro equipo está listo para ayudarle a dar el primer paso hacia su transformación."
  },
  "testimonialsPage": {
    "heroTitle": "Testimonios de Pacientes",
    "heroSubtitle": "Historias reales de pacientes reales que confiaron en nosotros para su transformación."
  },
  "galleryPage": {
    "heroTitle": "Galería Antes y Después",
    "heroSubtitle": "Vea resultados reales de nuestros cirujanos certificados en Miami."
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add messages/es.json
git commit -m "feat: add Spanish translation strings (messages/es.json)"
```

---

## Task 7: Update `next.config.ts` + Create SEO Helper

**Files:**
- Modify: `next.config.ts`
- Create: `src/lib/seo.ts`

- [ ] **Step 1: Wrap next.config.ts with next-intl plugin**

Replace the entire content of `next.config.ts`:

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  compress: true,
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 2: Create `src/lib/seo.ts`**

```ts
const BASE_URL = 'https://ycosmeticsurgery.com';

export function hreflangAlternates(path: string) {
  const enUrl = `${BASE_URL}${path}`;
  const esUrl = `${BASE_URL}/es${path}`;
  return {
    canonical: enUrl,
    languages: {
      'en': enUrl,
      'es': esUrl,
      'x-default': enUrl,
    } as Record<string, string>,
  };
}

export function hreflangAlternatesForLocale(path: string, locale: string) {
  const enUrl = `${BASE_URL}${path}`;
  const esUrl = `${BASE_URL}/es${path}`;
  return {
    canonical: locale === 'en' ? enUrl : esUrl,
    languages: {
      'en': enUrl,
      'es': esUrl,
      'x-default': enUrl,
    } as Record<string, string>,
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add next.config.ts src/lib/seo.ts
git commit -m "feat: configure next-intl plugin and add hreflang helper"
```

---

## Task 8: Migrate Route Structure + Update Layouts

**Files:**
- Create: `src/app/[locale]/(site)/` directory tree with all 7 pages
- Modify: `src/app/layout.tsx` (strip to passthrough)
- Modify: `src/app/admin/layout.tsx` (add html/body)
- Delete: `src/app/(site)/layout.tsx`

- [ ] **Step 1: Create the `[locale]/(site)` directory tree**

```powershell
New-Item -ItemType Directory -Force "src/app/[locale]/(site)"
New-Item -ItemType Directory -Force "src/app/[locale]/(site)/about"
New-Item -ItemType Directory -Force "src/app/[locale]/(site)/procedures/[slug]"
New-Item -ItemType Directory -Force "src/app/[locale]/(site)/contact"
New-Item -ItemType Directory -Force "src/app/[locale]/(site)/testimonials"
New-Item -ItemType Directory -Force "src/app/[locale]/(site)/gallery"
```

- [ ] **Step 2: Copy all page files**

```powershell
Copy-Item "src/app/(site)/page.tsx" "src/app/[locale]/(site)/page.tsx"
Copy-Item "src/app/(site)/about/page.tsx" "src/app/[locale]/(site)/about/page.tsx"
Copy-Item "src/app/(site)/procedures/page.tsx" "src/app/[locale]/(site)/procedures/page.tsx"
Copy-Item "src/app/(site)/procedures/[slug]/page.tsx" "src/app/[locale]/(site)/procedures/[slug]/page.tsx"
Copy-Item "src/app/(site)/contact/page.tsx" "src/app/[locale]/(site)/contact/page.tsx"
Copy-Item "src/app/(site)/testimonials/page.tsx" "src/app/[locale]/(site)/testimonials/page.tsx"
Copy-Item "src/app/(site)/gallery/page.tsx" "src/app/[locale]/(site)/gallery/page.tsx"
```

- [ ] **Step 3: Strip `src/app/layout.tsx` to a minimal passthrough**

Replace the entire content of `src/app/layout.tsx`:

```tsx
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

**Note:** The `<html>` and `<body>` elements, font loading, `metadata`, and hero preload link all move to the locale layout in Task 9. The `metadata` export in root layout (title, description, OG, etc.) stays here — Next.js merges metadata from the closest layout to the page, so root metadata still applies as defaults.

Keep the existing `export const metadata` in `src/app/layout.tsx` — only strip the JSX render function.

So the final `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://ycosmeticsurgery.com"),
  title: {
    default: "Your Cosmetic Surgery & SPA | Trusted Plastic Surgeons in Miami",
    template: "%s | Your Cosmetic Surgery & SPA Miami",
  },
  description:
    "Your Cosmetic Surgery & SPA in Hialeah, Miami — board-certified plastic surgeons with 20+ years of experience. BBL, tummy tuck, breast augmentation, Lipo 360, rhinoplasty & more. Free consultation. Serving all of South Florida.",
  keywords: [
    "cosmetic surgery Miami",
    "plastic surgery Miami",
    "plastic surgeon Hialeah",
    "BBL Miami",
    "Brazilian butt lift Miami",
    "tummy tuck Miami",
    "breast augmentation Miami",
    "Lipo 360 Miami",
    "liposuction Miami",
    "rhinoplasty Miami",
    "mommy makeover Miami",
    "cosmetic surgery Hialeah",
    "plastic surgery South Florida",
    "abdominal etching Miami",
    "facelift Miami",
    "bichectomy Miami",
    "Your Cosmetic Surgery",
  ],
  authors: [{ name: "Your Cosmetic Surgery & SPA" }],
  creator: "Your Cosmetic Surgery & SPA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ycosmeticsurgery.com",
    siteName: "Your Cosmetic Surgery & SPA",
    title: "Your Cosmetic Surgery & SPA | Trusted Plastic Surgeons in Miami",
    description:
      "Board-certified plastic surgeons with 20+ years of experience in Miami. Natural results, flexible financing, free consultations. Serving Hialeah, Miami, and all of South Florida.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Your Cosmetic Surgery & SPA Miami" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Cosmetic Surgery & SPA | Trusted Plastic Surgeons in Miami",
    description:
      "Board-certified plastic surgeons with 20+ years of experience in Miami. Free consultations. Serving Hialeah & South Florida.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: "/logo.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

- [ ] **Step 4: Update `src/app/admin/layout.tsx` to add html/body**

```tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Delete old (site) directory**

```powershell
Remove-Item -Recurse -Force "src/app/(site)"
```

- [ ] **Step 6: Commit**

```bash
git add src/app/ 
git commit -m "refactor: migrate (site) routes into [locale]/(site) structure"
```

---

## Task 9: Create `[locale]/(site)/layout.tsx`

**Files:**
- Create: `src/app/[locale]/(site)/layout.tsx`

- [ ] **Step 1: Create the locale layout**

```tsx
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" as="image" href="/hero/1.webp" fetchPriority="high" />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Run build to verify layout wiring**

```bash
npm run build
```

Expected: build completes. Both `/` and `/es/` URLs appear in the output.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(site)/layout.tsx"
git commit -m "feat: add locale layout with NextIntlClientProvider and static params"
```

---

## Task 10: Create `LanguageSwitcher` Component

**Files:**
- Create: `src/components/layout/LanguageSwitcher.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <div className="flex items-center gap-1 text-[12px] font-medium tracking-widest">
      <Link
        href={pathname}
        locale="en"
        className={`transition-colors ${
          locale === "en" ? "text-gold" : "text-white/50 hover:text-white"
        }`}
      >
        {t("langEn")}
      </Link>
      <span className="text-white/20">|</span>
      <Link
        href={pathname}
        locale="es"
        className={`transition-colors ${
          locale === "es" ? "text-gold" : "text-white/50 hover:text-white"
        }`}
      >
        {t("langEs")}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/LanguageSwitcher.tsx
git commit -m "feat: add EN|ES language switcher component"
```

---

## Task 11: Update Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

This is the most involved component change. The key changes are:
1. Replace `import Link from 'next/link'` with `import { Link } from '@/i18n/navigation'`
2. Add `useTranslations` for all hardcoded strings
3. Add `LanguageSwitcher` to the desktop nav and mobile panel

- [ ] **Step 1: Replace the imports at the top of `Navbar.tsx`**

Replace:
```tsx
import Link from "next/link";
```
With:
```tsx
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
```

- [ ] **Step 2: Add `useTranslations` inside the component body**

At the top of the `Navbar()` function body, after the state declarations, add:

```tsx
const t = useTranslations("nav");
```

- [ ] **Step 3: Replace hardcoded nav labels with translation calls**

In the desktop links array:
```tsx
// Replace:
{ label: "Gallery", href: "/gallery" },
{ label: "About", href: "/about" },
{ label: "Testimonials", href: "/testimonials" },
{ label: "Contact", href: "/contact" },

// With:
{ label: t("gallery"), href: "/gallery" },
{ label: t("about"), href: "/about" },
{ label: t("testimonials"), href: "/testimonials" },
{ label: t("contact"), href: "/contact" },
```

Replace the "Procedures" button text:
```tsx
// Replace: Procedures
// With: {t("procedures")}
```

Replace category headers in the mega dropdown:
```tsx
// In procedureMenu, change category display:
// col.category already matches nav keys: "Body", "Breast", "Face", "MedSpa"
// Use: t(col.category.toLowerCase()) for body/breast/face, and t("medspa") for MedSpa
// Simplest: add a helper map inside the component:
const catLabel: Record<string, string> = {
  Body: t("body"),
  Breast: t("breast"),
  Face: t("face"),
  MedSpa: t("medspa"),
};
// Then use: {catLabel[col.category]} instead of {col.category} in the dropdown h4
```

Replace dropdown footer links:
```tsx
// Replace: "View all procedures →"
// With: {t("viewAllProcedures")}

// Replace: "Before & After gallery →"
// With: {t("beforeAfterGallery")}
```

Replace CTA buttons:
```tsx
// Desktop CTA button: replace "Free Consultation" with {t("bookConsultation")}
// Mobile panel CTA: replace "Book Free Consultation" with {t("bookFreeConsultation")}
```

Replace "Procedures" in mobile accordion button:
```tsx
// Replace: Procedures
// With: {t("procedures")}
```

Replace mobile nav links:
```tsx
// Same pattern as desktop:
{ label: t("gallery"), href: "/gallery" },
{ label: t("about"), href: "/about" },
{ label: t("testimonials"), href: "/testimonials" },
{ label: t("contact"), href: "/contact" },
```

Replace aria-label on hamburger button:
```tsx
// Replace: aria-label="Open menu"
// With: aria-label={t("openMenu")}
```

- [ ] **Step 4: Add `LanguageSwitcher` to desktop nav**

In the "Right CTA" section, add `<LanguageSwitcher />` before the phone link:

```tsx
<div className="flex items-center gap-4">
  <LanguageSwitcher />
  <a href="tel:+13052183513" ...>
```

Also add it to the mobile panel footer, above the CTA button:

```tsx
<div className="px-6 py-6 border-t border-white/10 space-y-3">
  <div className="flex justify-center mb-2">
    <LanguageSwitcher />
  </div>
  <Link href="/contact" ...>Book Free Consultation</Link>
  ...
</div>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: build completes without TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add translations and language switcher to Navbar"
```

---

## Task 12: Update Footer + FooterContactForm

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/FooterContactForm.tsx`

- [ ] **Step 1: Make `Footer` async and add translations**

Footer is a server component. Replace its import line and make it async:

```tsx
// Add to imports:
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Make the component async:
export default async function Footer() {
  const t = await getTranslations("footer");
  // ...
}
```

Update the `quickNav` array to use translation keys:
```tsx
const quickNav = [
  { label: t("navHome"), href: "/" },
  { label: t("navProcedures"), href: "/procedures" },
  { label: t("navGallery"), href: "/gallery" },
  { label: t("navAbout"), href: "/about" },
  { label: t("navTestimonials"), href: "/testimonials" },
  { label: t("navContact"), href: "/contact" },
];
```

Replace hardcoded strings throughout Footer with translation calls:
- `"Contact Us"` → `{t("contactUs")}`
- `"1255 W 46th St, Suite #6 & 7A"` → `{t("address")}`
- `"Hialeah, FL 33012"` → `{t("city")}`
- `"Office Hours"` → `{t("officeHours")}`
- `"Mon – Fri: 9:00am – 6:00pm"` → `{t("hoursWeekday")}`
- `"Saturday: 10:00am – 3:00pm"` → `{t("hoursSaturday")}`
- `"4.9 Stars from 500+ Reviews"` → `{t("stars")}`
- `"Privacy Policy"`, `"Terms of Service"`, `"Accessibility Statement"` → use `t("privacyPolicy")`, `t("termsOfService")`, `t("accessibilityStatement")`
- Mobile bottom bar: `"Book"` → `{t("mobileBook")}`, `"Call"` → `{t("mobileCall")}`, `"Text"` → `{t("mobileText")}`
- Copyright: `© {new Date().getFullYear()} Your Cosmetic Surgery & SPA. All rights reserved.` — keep the year dynamic, translate the surrounding text:

```tsx
<p>© {new Date().getFullYear()} Your Cosmetic Surgery &amp; SPA. {locale === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
```

Actually for copyright, since Footer can now access locale via `getLocale()` from next-intl/server, use:
```tsx
import { getTranslations, getLocale } from "next-intl/server";
const locale = await getLocale();
```

Then in the copyright JSX: keep it simple with a copyright translation key. Add to messages:
- `en.footer.copyright` = `"All rights reserved."`
- `es.footer.copyright` = `"Todos los derechos reservados."`

And update both `messages/en.json` and `messages/es.json` to add the `copyright` key.

- [ ] **Step 2: Update `FooterContactForm` with translations**

FooterContactForm is `"use client"`. Add:

```tsx
import { useTranslations } from "next-intl";

export default function FooterContactForm() {
  const t = useTranslations("footerForm");
  // ...
}
```

Replace all hardcoded strings:
- `"Fill out the form below and we'll get in touch to book a call."` → `{t("intro")}`
- Placeholders: `"* Full Name"` → `{t("namePlaceholder")}`, `"* Phone"` → `{t("phonePlaceholder")}`, `"* Email"` → `{t("emailPlaceholder")}`, `"What are you interested in?"` → `{t("procedurePlaceholder")}`, textarea → `{t("messagePlaceholder")}`
- SMS consent text → `{t("smsConsent")}`
- Submit button: `"SUBMIT"` / `"SENDING…"` → `{loading ? t("submitting") : t("submit")}`
- Thank you: `"Thank You!"` → `{t("thankYouTitle")}`, body text → `{t("thankYouMessage")}`

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/layout/FooterContactForm.tsx messages/en.json messages/es.json
git commit -m "feat: add translations to Footer and FooterContactForm"
```

---

## Task 13: Update Hero Component

**Files:**
- Modify: `src/components/sections/Hero.tsx`

Hero is `"use client"`. The form validation errors and procedure list also need translation.

- [ ] **Step 1: Add translations import and hook**

```tsx
// Replace: import Link from "next/link";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Inside Hero():
const t = useTranslations("hero");
```

- [ ] **Step 2: Update zod schema error messages**

```tsx
const schema = z.object({
  name: z.string().min(2, t("formNameError")),
  phone: z.string().min(7, t("formPhoneError")),
  procedure: z.string().optional(),
});
```

Note: `t` from `useTranslations` must be called inside the component function. The schema must be defined inside `Hero()` after the `t` call.

- [ ] **Step 3: Replace the hardcoded `procedures` array with the translation array**

```tsx
// Replace:
const procedures = ["Breast Augmentation", "Tummy Tuck", ...];
// With:
const procedures = t.raw("procedureOptions") as string[];
```

- [ ] **Step 4: Replace all hardcoded JSX strings**

Map each string to its translation key:
- Star badge: `"4.9 · 500+ Verified Patient Reviews · Miami, FL"` → `{t("badge")}`
- Headline spans: `"Trusted Plastic"` → `{t("headline1")}`, `"Surgeons in"` → `{t("headline2")}`, `"Miami"` → `{t("headlineHighlight")}`
- Subheadline paragraph → `{t("subheadline")}`
- `"Book Free Consultation"` button (href="/contact") → `{t("bookConsultation")}`
- `"View Our Results"` button (href="/gallery") → `{t("viewResults")}`
- `"Or call us: (305) 218-3513"` → `{t("callUs")}`
- `"Chat on WhatsApp"` → `{t("chatWhatsapp")}`
- Form card title `"Free Consultation"` → `{t("formTitle")}`
- Form subtitle `"No obligation · Private · Personalized"` → `{t("formSubtitle")}`
- Input placeholders → `{t("formNamePlaceholder")}`, `{t("formPhonePlaceholder")}`
- Select placeholder option → `{t("formProcedurePlaceholder")}`
- Submit button → `{loading ? t("formSubmitting") : t("formSubmit")}`
- Disclaimer text → `{t("formDisclaimer")}`
- Thank you title → `{t("thankYouTitle")}`
- Thank you message → `{t("thankYouMessage")}`

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add translations to Hero component"
```

---

## Task 14: Update StatsBar, DoctorSection, CTABanner

**Files:**
- Modify: `src/components/sections/StatsBar.tsx`
- Modify: `src/components/sections/DoctorSection.tsx`
- Modify: `src/components/sections/CTABanner.tsx`

- [ ] **Step 1: Update StatsBar (client component)**

Add `useTranslations` import and hook:

```tsx
import { useTranslations } from "next-intl";
// Inside StatsBar():
const t = useTranslations("stats");
```

Replace the `stats` array with translated labels. Since values are numeric, only labels change:

```tsx
const stats = [
  { value: 20, suffix: "+", label: t("yearsExperience") },
  { value: 5000, suffix: "+", label: t("patientsTransformed") },
  { value: 98, suffix: "%", label: t("patientSatisfaction") },
  { value: 15, suffix: "+", label: t("proceduresOffered") },
];
```

Move `stats` array inside `StatsBar()` (after the `t` call) since it now uses `t`.

- [ ] **Step 2: Update DoctorSection (make async server component)**

```tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function DoctorSection() {
  const t = await getTranslations("doctor");

  return (
    <section ...>
      {/* Eyebrow */}
      <p ...>{t("eyebrow")}</p>

      {/* Heading */}
      <h2 ...>
        <span ...>{t("meetLabel")}</span>
        <span ...>{t("name")}</span>
      </h2>

      {/* Subtitle */}
      <p ...>{t("subtitle")}</p>

      {/* Bio */}
      <p ...>{t("bio")}</p>

      {/* Credential labels */}
      {/* ASPS label: replace "American Society of\nPlastic Surgeons" with t("asps") split */}
      {/* ABPS label: replace "American Board of\nPlastic Surgery" with t("abps") split */}

      {/* Specialty badges */}
      {[t("spec1"), t("spec2"), t("spec3"), t("spec4"), t("spec5")].map((spec) => (
        <span key={spec} ...>{spec}</span>
      ))}

      {/* CTAs */}
      <Link href="/about" ...>{t("learnMore")}</Link>
      <Link href="/contact" ...>{t("bookConsultation")}</Link>
    </section>
  );
}
```

- [ ] **Step 3: Update CTABanner (make async server component)**

```tsx
import { getTranslations } from "next-intl/server";

export default async function CTABanner() {
  const t = await getTranslations("cta");

  return (
    <section ...>
      <h2 ...>{t("sectionTitle")}</h2>
      <p ...>{t("sectionSubtitle")}</p>
      {/* video grid stays the same — video content is not translated */}
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/StatsBar.tsx src/components/sections/DoctorSection.tsx src/components/sections/CTABanner.tsx
git commit -m "feat: add translations to StatsBar, DoctorSection, CTABanner"
```

---

## Task 15: Update Home Page + Remaining Section Components

**Files:**
- Modify: `src/app/[locale]/(site)/page.tsx`
- Modify: `src/components/sections/ProceduresSection.tsx` (check for translatable text)
- Modify: `src/components/sections/BeforeAfterSection.tsx` (check for translatable text)
- Modify: `src/components/sections/TestimonialsSection.tsx` (check for translatable text)

- [ ] **Step 1: Update home page metadata and setRequestLocale**

In `src/app/[locale]/(site)/page.tsx`, update the page to accept locale params and set request locale:

```tsx
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hreflangAlternatesForLocale } from "@/lib/seo";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";

const ProceduresSection  = dynamic(() => import("@/components/sections/ProceduresSection"));
const BeforeAfterSection = dynamic(() => import("@/components/sections/BeforeAfterSection"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const DoctorSection      = dynamic(() => import("@/components/sections/DoctorSection"));
const CTABanner          = dynamic(() => import("@/components/sections/CTABanner"));

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = hreflangAlternatesForLocale("/", locale);
  return {
    title: "Your Cosmetic Surgery & SPA | Trusted Plastic Surgeons in Miami, FL",
    description:
      "Your Cosmetic Surgery & SPA in Hialeah, Miami — board-certified surgeons with 20+ years of experience. BBL, Lipo 360, tummy tuck, breast augmentation, rhinoplasty & more. Free consultation. Flexible financing.",
    alternates,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = { /* same as before — keep existing jsonLd object */ };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <StatsBar />
      <ProceduresSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <DoctorSection />
      <CTABanner />
    </>
  );
}
```

- [ ] **Step 2: Check and update ProceduresSection, BeforeAfterSection, TestimonialsSection**

Open each file. For any hardcoded heading or body text:
- If the component is `"use client"`: add `useTranslations` with an appropriate namespace
- If server component: add `getTranslations` and make async

Add translation keys to `messages/en.json` and `messages/es.json` as needed for any text found.

For example, if `ProceduresSection` has a heading "Our Procedures", add to `proceduresPage` namespace in messages. If `BeforeAfterSection` has a "Before & After" heading, add a `beforeAfterPage` namespace. If `TestimonialsSection` has a heading, add to `testimonialsPage` namespace.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(site)/page.tsx" src/components/sections/ messages/
git commit -m "feat: add locale params and hreflang to home page; translate section components"
```

---

## Task 16: Update About Page

**Files:**
- Modify: `src/app/[locale]/(site)/about/page.tsx`

- [ ] **Step 1: Update imports and add locale params**

```tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangAlternatesForLocale } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
// keep Image, ShieldCheck, Award, GraduationCap, Heart, CTABanner imports
```

- [ ] **Step 2: Update `generateMetadata` to accept locale and add hreflang**

```tsx
interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "About Us | Board-Certified Plastic Surgeons in Miami",
    description: "Meet the Your Cosmetic Surgery & SPA team — Dr. Mario Reyes-Serrano and our board-certified plastic surgeons with 20+ years of experience in Miami and Hialeah, FL.",
    alternates: hreflangAlternatesForLocale("/about", locale),
    openGraph: {
      title: "About Your Cosmetic Surgery & SPA | Miami, FL",
      description: "Board-certified plastic surgeons with 20+ years of experience. AAAHC-accredited facility in Hialeah. Over 5,000 transformations and counting.",
      url: locale === "en" ? "https://ycosmeticsurgery.com/about" : "https://ycosmeticsurgery.com/es/about",
      images: [{ url: "/api/og?title=About+Us", width: 1200, height: 630, alt: "Your Cosmetic Surgery & SPA Miami team" }],
    },
  };
}
```

- [ ] **Step 3: Make page async, add setRequestLocale and translations**

```tsx
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  // Move milestones and values arrays inside the function, using translation keys:
  const milestones = [
    { year: "2004", event: t("milestone2004") },
    { year: "2008", event: t("milestone2008") },
    { year: "2012", event: t("milestone2012") },
    { year: "2016", event: t("milestone2016") },
    { year: "2020", event: t("milestone2020") },
    { year: "2024", event: t("milestone2024") },
  ];

  const values = [
    { icon: ShieldCheck, title: t("safetyTitle"), desc: t("safetyDesc") },
    { icon: Award,       title: t("artTitle"),    desc: t("artDesc") },
    { icon: GraduationCap, title: t("expTitle"), desc: t("expDesc") },
    { icon: Heart,       title: t("careTitle"),   desc: t("careDesc") },
  ];

  return (
    <>
      {/* jsonLd stays unchanged */}
      {/* Hero section: replace "About Us" with {t("heroTitle")}, subtitle with {t("heroSubtitle")} */}
      {/* Story section heading: {t("storyHeading")} */}
      {/* Story paragraphs: {t("storyP1")}, {t("storyP2")}, {t("storyP3")} */}
      {/* Book button: {t("bookConsultation")} */}
      {/* Values: {t("valuesTitle")} */}
      {/* Meet Surgeon: {t("meetSurgeon")} */}
      {/* Dr title: {t("drTitle")} */}
      {/* Dr bio: {t("drBio1")}, {t("drBio2")} */}
      {/* Journey: {t("ourJourney")} */}
    </>
  );
}
```

Replace all `Link` from `next/link` with `Link` from `@/i18n/navigation`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/(site)/about/page.tsx"
git commit -m "feat: add locale, hreflang, and translations to About page"
```

---

## Task 17: Update Procedures List Page

**Files:**
- Modify: `src/app/[locale]/(site)/procedures/page.tsx`

- [ ] **Step 1: Update imports, params, metadata**

```tsx
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangAlternatesForLocale } from "@/lib/seo";
import { Link } from "@/i18n/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "All Procedures | Cosmetic Surgery Miami, Hialeah FL",
    description: "Explore all cosmetic surgery procedures at Your Cosmetic Surgery & SPA in Miami — BBL, Lipo 360, tummy tuck, breast augmentation, rhinoplasty, facelift & more.",
    alternates: hreflangAlternatesForLocale("/procedures", locale),
    openGraph: {
      title: "All Procedures | Your Cosmetic Surgery & SPA Miami",
      description: "Browse our full menu of surgical and non-surgical cosmetic procedures.",
      url: locale === "en" ? "https://ycosmeticsurgery.com/procedures" : "https://ycosmeticsurgery.com/es/procedures",
    },
  };
}

export default async function ProceduresPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("proceduresPage");

  // ...
  return (
    <>
      {/* Hero: {t("heroTitle")}, {t("heroSubtitle")} */}
      {/* Category grids: procedure cards */}
      {/* "Learn More" in cards: {t("learnMore")} */}
      {/* Recovery label: {t("recovery")} */}
    </>
  );
}
```

For procedure names and taglines in the cards: use `proc.es?.name ?? proc.name` when `locale === "es"`, and same for tagline. Since `es` fields are added in Task 19, use the fallback pattern throughout.

- [ ] **Step 2: Update procedure card display for locale**

In the procedure card loop:
```tsx
const procName = locale === "es" ? (proc.es?.name ?? proc.name) : proc.name;
const procTagline = locale === "es" ? (proc.es?.tagline ?? proc.tagline) : proc.tagline;
const procDesc = locale === "es" ? (proc.es?.description ?? proc.description) : proc.description;
```

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(site)/procedures/page.tsx"
git commit -m "feat: add locale, hreflang, and translations to Procedures list page"
```

---

## Task 18: Update Procedure Detail Page

**Files:**
- Modify: `src/app/[locale]/(site)/procedures/[slug]/page.tsx`

This page has both `[locale]` and `[slug]` dynamic params — the most complex migration.

- [ ] **Step 1: Update `generateStaticParams` to include locale**

```tsx
export async function generateStaticParams() {
  const locales = ['en', 'es'];
  return locales.flatMap((locale) =>
    procedures.map((p) => ({ locale, slug: p.slug }))
  );
}
```

- [ ] **Step 2: Update imports**

```tsx
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangAlternatesForLocale } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
```

- [ ] **Step 3: Update Props type**

```tsx
interface Props {
  params: Promise<{ locale: string; slug: string }>;
}
```

- [ ] **Step 4: Update `generateMetadata`**

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const proc = procedures.find((p) => p.slug === slug);
  if (!proc) return {};
  const procName = locale === "es" ? (proc.es?.name ?? proc.name) : proc.name;
  return {
    title: `${procName} Miami | Your Cosmetic Surgery & SPA`,
    description: `${locale === "es" ? (proc.es?.description ?? proc.description) : proc.description} ${procName} in Miami by board-certified surgeons. Free consultation — (305) 218-3513.`,
    alternates: hreflangAlternatesForLocale(`/procedures/${proc.slug}`, locale),
    openGraph: {
      title: `${procName} in Miami | Your Cosmetic Surgery & SPA`,
      description: `${locale === "es" ? (proc.es?.description ?? proc.description) : proc.description}`,
      url: locale === "en"
        ? `https://ycosmeticsurgery.com/procedures/${proc.slug}`
        : `https://ycosmeticsurgery.com/es/procedures/${proc.slug}`,
      images: [{ url: `/api/og?title=${encodeURIComponent(procName + ' Miami')}`, width: 1200, height: 630, alt: `${procName} Miami` }],
    },
  };
}
```

- [ ] **Step 5: Update page component**

```tsx
export default async function ProcedureDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("procedureDetail");

  const proc = procedures.find((p) => p.slug === slug);
  if (!proc) notFound();

  const procName = locale === "es" ? (proc.es?.name ?? proc.name) : proc.name;
  const procDesc = locale === "es" ? (proc.es?.description ?? proc.description) : proc.description;
  const procBenefits = locale === "es" ? (proc.es?.benefits ?? proc.benefits) : proc.benefits;

  const faqs = [
    { q: t("faqQ1"), a: t("faqA1") },
    { q: t("faqQ2"), a: t("faqA2") },
    { q: t("faqQ3"), a: t("faqA3") },
    { q: t("faqQ4"), a: t("faqA4") },
  ];

  const trustPoints = [
    t("trustBoardCertified"),
    t("trustAccredited"),
    t("trustNaturalResults"),
    t("trustSupport"),
  ];

  // In JSX:
  // Breadcrumb: Home / {locale === "es" ? "Procedimientos" : "Procedures"} / {procName}
  // h1: {procName}
  // description: {procDesc}
  // Recovery: {t("recoveryLabel")} {proc.recovery}
  // "What to Expect": {t("whatToExpect")}
  // Benefits: map procBenefits
  // FAQs: {t("faq")} + map faqs
  // Sidebar: {t("readyToLearn")}, {t("sidebarSubtitle")}, {t("bookConsultation")}
  // Trust points: map trustPoints
  // Related: {t("relatedProcedures")}, {t("backToAll")}

  // Update all Link hrefs to use locale-aware Link from @/i18n/navigation
  // Update related procedures display names: use proc.es?.name ?? proc.name when locale === "es"

  // ...existing JSX with above substitutions...
}
```

- [ ] **Step 6: Commit**

```bash
git add "src/app/[locale]/(site)/procedures/[slug]/page.tsx"
git commit -m "feat: add locale, hreflang, and translations to procedure detail page"
```

---

## Task 19: Update Contact, Testimonials, Gallery Pages

**Files:**
- Modify: `src/app/[locale]/(site)/contact/page.tsx`
- Modify: `src/app/[locale]/(site)/testimonials/page.tsx`
- Modify: `src/app/[locale]/(site)/gallery/page.tsx`

Apply the same pattern as previous page tasks to each file:

- [ ] **Step 1: Update Contact page**

```tsx
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangAlternatesForLocale } from "@/lib/seo";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Contact Us | Book a Free Consultation in Miami, FL",
    description: "Contact Your Cosmetic Surgery & SPA in Hialeah, FL. Call (305) 218-3513 or fill out our form to schedule a free consultation.",
    alternates: hreflangAlternatesForLocale("/contact", locale),
    openGraph: {
      title: "Contact Us | Your Cosmetic Surgery & SPA Miami",
      description: "Book your free consultation with our board-certified plastic surgeons.",
      url: locale === "en" ? "https://ycosmeticsurgery.com/contact" : "https://ycosmeticsurgery.com/es/contact",
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  return (
    <>
      {/* Hero section heading: {t("heroTitle")}, subtitle: {t("heroSubtitle")} */}
      {/* ContactForm component — also update it to use useTranslations if it has hardcoded text */}
      <ContactForm />
      {/* jsonLd stays the same */}
    </>
  );
}
```

- [ ] **Step 2: Update Testimonials page**

Same pattern with `hreflangAlternatesForLocale("/testimonials", locale)` and `getTranslations("testimonialsPage")`. Replace hero heading/subtitle with `t("heroTitle")` and `t("heroSubtitle")`.

- [ ] **Step 3: Update Gallery page**

Open `src/app/[locale]/(site)/gallery/page.tsx`. Apply the same pattern with `hreflangAlternatesForLocale("/gallery", locale)` and `getTranslations("galleryPage")`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/(site)/contact/page.tsx" "src/app/[locale]/(site)/testimonials/page.tsx" "src/app/[locale]/(site)/gallery/page.tsx"
git commit -m "feat: add locale, hreflang, and translations to Contact, Testimonials, Gallery pages"
```

---

## Task 20: Add Spanish Fields to `procedures.ts`

**Files:**
- Modify: `src/data/procedures.ts`

- [ ] **Step 1: Update the `Procedure` interface**

Add the optional `es` field:

```ts
export interface Procedure {
  id: string;
  slug: string;
  name: string;
  category: "body" | "breast" | "face" | "medspa";
  tagline: string;
  description: string;
  benefits: string[];
  recovery: string;
  icon: string;
  featured: boolean;
  imagePosition?: string;
  es?: {
    name: string;
    tagline: string;
    description: string;
    benefits: string[];
  };
}
```

- [ ] **Step 2: Add `es` fields to each procedure**

Add Spanish translations to each procedure entry. Below are all procedures based on the Navbar's `procedureMenu` plus the procedures seen in the data file:

```ts
// Tummy Tuck
es: {
  name: "Abdominoplastia",
  tagline: "Recupera tu figura",
  description: "La abdominoplastia elimina el exceso de piel y grasa del abdomen mientras tensa los músculos subyacentes, creando un perfil más firme y suave.",
  benefits: ["Abdomen plano y tonificado", "Músculos del core tensados", "Eliminación de estrías bajo el ombligo", "Resultados duraderos con estilo de vida saludable"],
},

// Liposuction
es: {
  name: "Liposucción",
  tagline: "Esculpe tu silueta",
  description: "Las técnicas avanzadas de liposucción eliminan depósitos de grasa resistentes a la dieta y el ejercicio, remodelando y refinando tus contornos naturales.",
  benefits: ["Reducción localizada de grasa", "Contornos corporales refinados", "Proporciones corporales mejoradas", "Técnicas mínimamente invasivas disponibles"],
},

// Brazilian Butt Lift
es: {
  name: "Levantamiento Brasileño de Glúteos",
  tagline: "Curvas elevadas",
  description: "El BBL combina liposucción estratégica con transferencia de grasa para mejorar el volumen y la forma, creando curvas naturales y hermosas.",
  benefits: ["Mejora de volumen de aspecto natural", "Usa tu propio tejido graso", "Mejor proporción cintura-cadera", "Doble beneficio: liposucción + aumento"],
},

// Mommy Makeover
es: {
  name: "Mommy Makeover",
  tagline: "Redescúbrete a ti misma",
  description: "Una combinación personalizada de procedimientos — típicamente senos, abdomen y contorno — diseñada para restaurar tu cuerpo previo al embarazo y confianza.",
  benefits: ["Restauración corporal completa", "Personalizado según tus objetivos", "Un solo período de recuperación", "Resultados dramáticos y transformadores"],
},

// Body Contouring
es: {
  name: "Contorno Corporal",
  tagline: "Define tu forma",
  description: "Después de una pérdida de peso significativa o como procedimiento independiente, el contorno corporal elimina el exceso de piel y tensa el tejido restante.",
  benefits: ["Eliminación del exceso de piel", "Textura de piel mejorada", "Proporciones corporales realzadas", "Mayor confianza después de la pérdida de peso"],
},

// Breast Augmentation
es: {
  name: "Aumento de Senos",
  tagline: "Belleza natural, amplificada",
  description: "Usando implantes de silicona o solución salina, o transferencia de grasa, mejoramos el volumen y la forma de los senos para lograr resultados naturales y proporcionados.",
  benefits: ["Mayor volumen y plenitud de los senos", "Simetría mejorada", "Apariencia y sensación natural con silicona", "Resultados duraderos"],
},

// Breast Lift
es: {
  name: "Levantamiento de Senos",
  tagline: "Elevada, rejuvenecida",
  description: "Una mastopexia levanta y reposiciona los senos caídos para restaurar una forma juvenil y proyección.",
  benefits: ["Senos elevados y firmes", "Posición del pezón mejorada", "Contorno del seno rejuvenecido", "Resultados de larga duración"],
},

// Breast Reduction
es: {
  name: "Reducción de Senos",
  tagline: "Alivio y confianza",
  description: "La reducción de senos alivia el malestar físico y mejora la proporción corporal reduciendo el tamaño y el peso de los senos.",
  benefits: ["Alivio del dolor de espalda y cuello", "Proporciones corporales mejoradas", "Mayor comodidad en actividades físicas", "Confianza en sí misma mejorada"],
},

// Rhinoplasty
es: {
  name: "Rinoplastia",
  tagline: "Armonía facial",
  description: "La rinoplastia da forma y refina la nariz para lograr armonía facial y mejorar la respiración si es necesario.",
  benefits: ["Armonía facial equilibrada", "Forma y tamaño de nariz mejorados", "Puede corregir problemas respiratorios", "Resultados naturales y sutiles"],
},

// Facelift
es: {
  name: "Lifting Facial",
  tagline: "Renueva tu apariencia",
  description: "Un lifting facial aborda los signos del envejecimiento al tensar la piel subyacente y eliminar el exceso para un aspecto rejuvenecido y natural.",
  benefits: ["Aspecto rejuvenecido", "Tensión de la piel flácida", "Resultados de larga duración", "Apariencia natural y fresca"],
},

// Abdominal Etching
es: {
  name: "Marcación Abdominal",
  tagline: "Define tu núcleo",
  description: "La marcación abdominal es una técnica avanzada de liposucción que crea la apariencia de abdominales bien definidos al esculpir con precisión los contornos musculares.",
  benefits: ["Definición muscular visible", "Contouring de precisión", "Mejora la forma atlética", "Resultados de larga duración"],
},
```

Continue adding `es` fields for all remaining procedures found in `procedures.ts` following the same pattern. Read the full file to see all procedures, then add `es` entries accordingly.

- [ ] **Step 3: Commit**

```bash
git add src/data/procedures.ts
git commit -m "feat: add Spanish (es) translations to procedures data"
```

---

## Task 21: Update Sitemap with `/es/*` URLs

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Replace sitemap content**

```ts
import { MetadataRoute } from "next";
import { procedures } from "@/data/procedures";

const baseUrl = "https://ycosmeticsurgery.com";

const staticPages = [
  { path: "/",            changeFrequency: "weekly"  as const, priority: 1.0 },
  { path: "/procedures",  changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/contact",     changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/gallery",     changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/about",       changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/testimonials",changeFrequency: "monthly" as const, priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const enStatic = staticPages.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const esStatic = staticPages.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}/es${path}`,
    lastModified: now,
    changeFrequency,
    priority: priority * 0.95,
  }));

  const enProcedures = procedures.map((p) => ({
    url: `${baseUrl}/procedures/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const esProcedures = procedures.map((p) => ({
    url: `${baseUrl}/es/procedures/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.76,
  }));

  return [...enStatic, ...esStatic, ...enProcedures, ...esProcedures];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: update sitemap to include /es/* URLs for all pages and procedures"
```

---

## Task 22: Build Verification

- [ ] **Step 1: Run full production build**

```bash
npm run build
```

Expected output:
- No TypeScript errors
- No missing translation key warnings from next-intl
- Both `/` and `/es/` route trees appear in the build output
- `api/og` edge route listed
- `sitemap.xml` generated

- [ ] **Step 2: Spot-check the sitemap**

```bash
npm run start
```

Open `http://localhost:3000/sitemap.xml` in browser.
Expected: XML with both English and Spanish URLs for all pages.

- [ ] **Step 3: Spot-check OG image**

Open `http://localhost:3000/api/og` in browser.
Expected: 1200×630 navy image with clinic name and tagline.

Open `http://localhost:3000/api/og?title=Brazilian+Butt+Lift+Miami` in browser.
Expected: same image with "Brazilian Butt Lift Miami" as the title.

- [ ] **Step 4: Spot-check Spanish routing**

Open `http://localhost:3000/es/` — should show Spanish content.
Open `http://localhost:3000/es/procedimientos` — should 404 (slugs stay in English).
Open `http://localhost:3000/es/procedures` — should show Spanish procedures page.
Check `<html lang="es">` in page source.
Check `<link rel="alternate" hreflang="en" …>` and `<link rel="alternate" hreflang="es" …>` in `<head>`.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete bilingual EN/ES SEO implementation"
```

---

## Self-Review Checklist

- [x] OG image route created and all `/og-image.jpg` references updated → Task 1
- [x] Favicon + site.webmanifest + logo.png → Task 2
- [x] ReviewSchema on testimonials → Task 3
- [x] Sitemap contact changeFrequency fixed → Task 3
- [x] next-intl installed and configured → Task 4
- [x] Complete EN and ES message files with no TBDs → Tasks 5–6
- [x] next.config.ts wrapped with plugin → Task 7
- [x] SEO hreflang helper created → Task 7
- [x] (site) routes migrated to [locale]/(site) → Task 8
- [x] Root layout stripped to passthrough → Task 8
- [x] Admin layout gets html/body → Task 8
- [x] Locale layout with generateStaticParams, html lang, provider → Task 9
- [x] LanguageSwitcher component → Task 10
- [x] Navbar: translations + locale links + switcher → Task 11
- [x] Footer + FooterContactForm: translations + locale links → Task 12
- [x] Hero, StatsBar, DoctorSection, CTABanner: translations → Tasks 13–14
- [x] All 7 pages: locale params + setRequestLocale + hreflang metadata → Tasks 15–19
- [x] Procedure data: es fields added → Task 20
- [x] Sitemap: /es/* URLs added → Task 21
- [x] Build verified, sitemap and OG image spot-checked → Task 22
