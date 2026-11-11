import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { alternatesFor, openGraph, ogImage, canonicalUrl } from "@/lib/seo";
import { infoPages, getInfoPage } from "@/data/info-pages";

interface Props {
  params: Promise<{ locale: string; info: string }>;
}

// Only the slugs defined in src/data/info-pages.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "es"].flatMap((locale) => infoPages.map((p) => ({ locale, info: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, info } = await params;
  const page = getInfoPage(info);
  if (!page) return {};
  const c = locale === "es" ? page.es : page.en;
  const path = `/${page.slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: alternatesFor(path, locale),
    openGraph: openGraph({
      path,
      locale,
      title: `${c.metaTitle} | Your Cosmetic Surgery & SPA`,
      description: c.metaDescription,
      image: ogImage(c.title),
    }),
  };
}

const ui = {
  en: {
    home: "Home",
    ctaHeading: "Ready to Talk It Through?",
    ctaBody: "Consultations are free and private, in English or Spanish.",
    ctaButton: "Book Free Consultation",
    call: "Call (305) 218-3513",
  },
  es: {
    home: "Inicio",
    ctaHeading: "¿Listo para Conversarlo?",
    ctaBody: "Las consultas son gratuitas y privadas, en inglés o español.",
    ctaButton: "Reservar Consulta Gratis",
    call: "Llamar al (305) 218-3513",
  },
};

export default async function InfoPageRoute({ params }: Props) {
  const { locale, info } = await params;
  setRequestLocale(locale);

  const page = getInfoPage(info);
  if (!page) notFound();

  const c = locale === "es" ? page.es : page.en;
  const labels = locale === "es" ? ui.es : ui.en;
  const isLegal = page.kind === "legal";
  const url = canonicalUrl(`/${page.slug}`, locale);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: labels.home, item: canonicalUrl("", locale) },
        { "@type": "ListItem", position: 2, name: c.title, item: url },
      ],
    },
    ...(c.faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-16 md:pb-20 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-40" />
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/65 text-xs tracking-wider mb-6">
            <Link href="/" className="hover:text-gold transition-colors">{labels.home}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold">{c.title}</span>
          </nav>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{c.eyebrow}</p>
          <h1 className="font-heading text-5xl md:text-6xl text-white font-light">{c.title}</h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          {c.intro && (
            <p className={`text-navy/80 leading-relaxed mb-12 ${isLegal ? "text-base" : "text-lg"}`}>{c.intro}</p>
          )}

          <div className="space-y-12">
            {c.sections.map((s, i) => (
              <div key={s.heading ?? i}>
                {s.heading && (
                  <>
                    {!isLegal && <span className="gold-divider mb-4" />}
                    <h2 className={`font-heading text-navy font-light mb-4 ${isLegal ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>
                      {s.heading}
                    </h2>
                  </>
                )}
                {s.paragraphs?.map((p) => (
                  <p key={p} className="text-navy/75 leading-relaxed mb-4">{p}</p>
                ))}
                {s.list && (
                  <ul className="space-y-3 mb-4">
                    {s.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-navy/75 leading-relaxed">
                        <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.links && (
                  <div className="flex flex-wrap gap-2.5 mt-5">
                    {s.links.map((l) => (
                      <Link
                        key={l.href + l.label}
                        href={l.href}
                        className="inline-flex items-center gap-1.5 bg-white border border-cream-dark hover:border-gold text-navy text-sm px-4 py-2 rounded-full transition-colors"
                      >
                        {l.label} <ArrowRight size={13} className="text-gold-deep" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQs */}
          {c.faqs && c.faqs.length > 0 && (
            <div className="mt-16">
              <span className="gold-divider mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl text-navy font-light mb-6">{c.faqsHeading}</h2>
              <div className="space-y-3">
                {c.faqs.map((f) => (
                  <details key={f.q} className="group bg-white rounded-xl border border-cream-dark">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 text-navy font-medium">
                      {f.q}
                      <span aria-hidden="true" className="text-gold-deep text-xl leading-none transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-navy/75 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to action — marketing pages only */}
      {!isLegal && (
        <section className="py-16 bg-navy relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-30" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <span className="gold-divider mx-auto mb-5" />
            <h2 className="font-heading text-4xl md:text-5xl text-white font-light mb-3">{labels.ctaHeading}</h2>
            <p className="text-white/70 mb-8">{labels.ctaBody}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-navy-dark font-semibold text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-full transition-colors"
              >
                {labels.ctaButton}
              </Link>
              <a
                href="tel:+13052183513"
                className="inline-flex items-center gap-2 text-white hover:text-gold text-sm tracking-wider transition-colors"
              >
                <Phone size={15} /> {labels.call}
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
