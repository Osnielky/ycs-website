import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { alternatesFor, openGraph, ogImage, canonicalUrl, BASE_URL } from "@/lib/seo";
import { procedures } from "@/data/procedures";
import { surgeon, SURGEON_FOCUS, SURGEON_IMAGE, SURGEON_NAME, SURGEON_SLUG } from "@/data/surgeon";
import CTABanner from "@/components/sections/CTABanner";

interface Props {
  params: Promise<{ locale: string }>;
}

const PATH = `/${SURGEON_SLUG}`;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "es" ? surgeon.es : surgeon.en;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: alternatesFor(PATH, locale),
    openGraph: openGraph({
      path: PATH,
      locale,
      title: `${c.metaTitle} | Your Cosmetic Surgery & SPA`,
      description: c.metaDescription,
      image: ogImage(SURGEON_NAME),
      imageAlt: c.imageAlt,
    }),
  };
}

function FactList({ heading, items }: { heading: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="font-heading text-2xl text-navy mb-4">{heading}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-navy/75 leading-relaxed">
            <Check size={18} aria-hidden="true" className="text-gold-deep mt-1 shrink-0" />
            <span className="min-w-0 break-words">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function SurgeonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const es = locale === "es";
  const c = es ? surgeon.es : surgeon.en;
  const url = canonicalUrl(PATH, locale);

  const focus = SURGEON_FOCUS.map((group) => ({
    label: c.focusCategories[group.category],
    items: group.slugs.flatMap((slug) => {
      const p = procedures.find((x) => x.slug === slug);
      return p ? [{ slug, name: (es && p.es?.name) || p.name }] : [];
    }),
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${url}#profile`,
      url,
      inLanguage: es ? "es" : "en",
      mainEntity: {
        "@type": "Person",
        "@id": `${BASE_URL}${PATH}#person`,
        name: SURGEON_NAME,
        honorificPrefix: "Dr.",
        jobTitle: c.role,
        url: `${BASE_URL}${PATH}`,
        image: `${BASE_URL}${encodeURI(SURGEON_IMAGE)}`,
        worksFor: { "@id": `${BASE_URL}/#organization` },
        workLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1255 W 46th St Suite #6 & 7A",
            addressLocality: "Hialeah",
            addressRegion: "FL",
            postalCode: "33012",
            addressCountry: "US",
          },
        },
        knowsAbout: focus.flatMap((g) => g.items.map((i) => i.name)),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.home, item: canonicalUrl("", locale) },
        { "@type": "ListItem", position: 2, name: SURGEON_NAME, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-16 md:pb-20 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-40" />
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/65 text-xs tracking-wider mb-6">
            <Link href="/" className="hover:text-gold transition-colors">{c.home}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold">{SURGEON_NAME}</span>
          </nav>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{c.eyebrow}</p>
          <h1 className="font-heading text-5xl md:text-7xl text-white font-light mb-4 text-balance">{SURGEON_NAME}</h1>
          <p className="text-white/70 text-sm tracking-[0.25em] uppercase">{c.role}</p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden">
            <Image
              src={SURGEON_IMAGE}
              alt={c.imageAlt}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 384px, 40vw"
            />
          </div>

          <div className="min-w-0">
            <span className="gold-divider mb-5" />
            <h2 className="font-heading text-4xl md:text-5xl text-navy font-light mb-6">{c.aboutHeading}</h2>
            <div className="space-y-4 text-navy/75 leading-relaxed text-lg">
              {c.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white text-sm font-semibold tracking-[0.12em] uppercase whitespace-nowrap px-7 py-3.5 rounded-full transition duration-200"
              >
                {c.bookConsultation}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="tel:+13052183513"
                className="inline-flex items-center justify-center gap-2 border-2 border-navy text-navy hover:bg-navy hover:text-white text-sm font-semibold tracking-[0.12em] uppercase whitespace-nowrap px-7 py-3.5 rounded-full transition duration-200"
              >
                <Phone size={16} aria-hidden="true" />
                {c.call}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <span className="gold-divider mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-light mb-10">{c.credentialsHeading}</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            <FactList heading={c.role} items={c.credentials} />
            <FactList heading={c.membershipsHeading} items={c.memberships} />
            <FactList heading={c.educationHeading} items={c.education} />
            <FactList heading={c.licensesHeading} items={c.licenses} />
            <FactList heading={c.languagesHeading} items={c.languages} />
          </div>
        </div>
      </section>

      {/* Areas of focus */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-6">
          <span className="gold-divider mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-light mb-4">{c.focusHeading}</h2>
          <p className="text-navy/75 leading-relaxed max-w-2xl mb-10">{c.focusIntro}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {focus.map((group) => (
              <div key={group.label} className="bg-white rounded-2xl border border-cream-dark p-7">
                <h3 className="text-gold-deep text-xs tracking-[0.3em] uppercase mb-4">{group.label}</h3>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/procedures/${item.slug}`}
                        className="group flex items-center justify-between gap-3 py-2 font-heading text-xl text-navy hover:text-gold-deep transition-colors"
                      >
                        <span className="min-w-0 break-words">{item.name}</span>
                        <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-gold-deep transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link
            href="/procedures"
            className="inline-flex items-center gap-2 mt-8 text-navy font-semibold text-sm tracking-[0.12em] uppercase hover:text-gold-deep transition-colors"
          >
            {c.allProcedures}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Consultation */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <span className="gold-divider mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-light mb-4">{c.consultHeading}</h2>
          <p className="text-navy/75 leading-relaxed max-w-2xl mb-10">{c.consultIntro}</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.consultSteps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-cream-dark p-7">
                <p aria-hidden="true" className="font-heading text-4xl text-gold-deep mb-3 tabular-nums">{i + 1}</p>
                <h3 className="font-heading text-2xl text-navy mb-2">{step.title}</h3>
                <p className="text-navy/75 text-sm leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="text-navy/70 text-sm leading-relaxed max-w-3xl mt-8">{c.consultNote}</p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
