import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hreflangAlternatesForLocale } from "@/lib/seo";
import { procedures } from "@/data/procedures";
import CTABanner from "@/components/sections/CTABanner";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["en", "es"];
  return locales.flatMap((locale) =>
    procedures.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const proc = procedures.find((p) => p.slug === slug);
  if (!proc) return {};
  const name = locale === "es" && proc.es?.name ? proc.es.name : proc.name;
  const description = locale === "es" && proc.es?.description ? proc.es.description : proc.description;
  return {
    title: `${name} Miami | Your Cosmetic Surgery & SPA`,
    description: `${description} ${name} in Miami by board-certified surgeons with 20+ years of experience. Free consultation — serving Hialeah and all of South Florida. Call (305) 218-3513.`,
    alternates: {
      canonical:
        locale === "en"
          ? `https://ycosmeticsurgery.com/procedures/${proc.slug}`
          : `https://ycosmeticsurgery.com/es/procedures/${proc.slug}`,
      languages: hreflangAlternatesForLocale(`procedures/${proc.slug}`, locale),
    },
    openGraph: {
      title: `${name} in Miami | Your Cosmetic Surgery & SPA`,
      description: `${description} Board-certified surgeons, free consultation, flexible financing. Hialeah, FL.`,
      url:
        locale === "en"
          ? `https://ycosmeticsurgery.com/procedures/${proc.slug}`
          : `https://ycosmeticsurgery.com/es/procedures/${proc.slug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(name + " Miami")}`,
          width: 1200,
          height: 630,
          alt: `${name} results at Your Cosmetic Surgery & SPA, Miami`,
        },
      ],
    },
  };
}

const gradientMap: Record<string, string> = {
  body: "from-[#1a2d5a] to-[#0d1b3e]",
  breast: "from-[#2d1a4a] to-[#1a0d35]",
  face: "from-[#1a3d3a] to-[#0d2e2c]",
  medspa: "from-[#3d2a1a] to-[#2e1a0d]",
};

export default async function ProcedureDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("procedureDetail");
  const tSection = await getTranslations("proceduresSection");

  const proc = procedures.find((p) => p.slug === slug);
  if (!proc) notFound();

  const name = locale === "es" && proc.es?.name ? proc.es.name : proc.name;
  const description = locale === "es" && proc.es?.description ? proc.es.description : proc.description;
  const benefits = locale === "es" && proc.es?.benefits ? proc.es.benefits : proc.benefits;

  const categoryLabel: Record<string, string> = {
    body: tSection("tabBody"),
    breast: tSection("tabBreast"),
    face: tSection("tabFace"),
    medspa: tSection("tabMedspa"),
  };

  const related = procedures
    .filter((p) => p.category === proc.category && p.slug !== proc.slug)
    .slice(0, 3);

  const pageUrl =
    locale === "en"
      ? `https://ycosmeticsurgery.com/procedures/${proc.slug}`
      : `https://ycosmeticsurgery.com/es/procedures/${proc.slug}`;

  const faqs = [
    { q: t("faqQ1"), a: t("faqA1") },
    { q: t("faqQ2"), a: t("faqA2") },
    { q: t("faqQ3"), a: t("faqA3") },
    { q: t("faqQ4"), a: t("faqA4") },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name,
      description,
      url: pageUrl,
      procedureType: "https://health-lifesci.schema.org/SurgicalProcedure",
      followup: `Recovery time: ${proc.recovery}`,
      preparation: "A private consultation with a board-certified surgeon to assess candidacy, review goals, and create a personalized surgical plan.",
      howPerformed: description,
      recognizingAuthority: {
        "@type": "MedicalOrganization",
        name: "American Board of Plastic Surgery",
      },
      relevantSpecialty: {
        "@type": "MedicalSpecialty",
        name: "Plastic Surgery",
      },
      performer: {
        "@type": "Physician",
        name: "Dr. Mario Reyes-Serrano",
        medicalSpecialty: "Plastic Surgery",
        worksFor: {
          "@type": "MedicalBusiness",
          name: "Your Cosmetic Surgery & SPA",
          url: "https://ycosmeticsurgery.com",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://ycosmeticsurgery.com" },
        { "@type": "ListItem", position: 2, name: "Procedures", item: "https://ycosmeticsurgery.com/procedures" },
        { "@type": "ListItem", position: 3, name, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${gradientMap[proc.category]} pt-36 pb-24 overflow-hidden`}>
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/procedures" className="hover:text-white transition-colors">Procedures</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold" aria-current="page">{name}</span>
          </nav>

          <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            {categoryLabel[proc.category]}
          </p>
          <h1 className="font-heading text-6xl md:text-7xl text-white font-light mt-2 mb-5">
            {name}
          </h1>
          <p className="text-white/65 text-xl leading-relaxed max-w-2xl mb-6">
            {description}
          </p>
          <div className="flex items-center gap-3 text-white/50 text-sm">
            <Clock size={14} className="text-gold" />
            <span>{t("recoveryLabel")} {proc.recovery}</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          {/* Left: benefits + FAQs */}
          <div className="lg:col-span-2 space-y-12">
            {/* Benefits */}
            <div>
              <span className="gold-divider mb-5" />
              <h2 className="font-heading text-4xl text-navy font-light mb-6">
                {t("whatToExpect")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 bg-white p-5 rounded-xl border border-cream-dark">
                    <CheckCircle size={18} className="text-gold mt-0.5 shrink-0" />
                    <span className="text-navy/70 text-sm leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <span className="gold-divider mb-5" />
              <h2 className="font-heading text-4xl text-navy font-light mb-6">
                {t("faq")}
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group bg-white border border-cream-dark rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer text-navy font-medium list-none">
                      <span>{faq.q}</span>
                      <span className="text-gold transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-navy/60 text-sm leading-relaxed border-t border-cream-dark pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right: CTA sidebar */}
          <div className="space-y-5">
            <div className="bg-navy rounded-2xl p-7 sticky top-28">
              <span className="gold-divider mb-4" />
              <h3 className="font-heading text-white text-2xl mb-2">
                {t("readyToLearn")}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                {t("sidebarSubtitle")}
              </p>
              <Link
                href="/contact"
                className="block w-full text-center bg-gold hover:bg-gold-dark text-white font-semibold text-sm tracking-[0.1em] uppercase py-3.5 rounded-lg transition-colors mb-3"
              >
                {t("bookConsultation")}
              </Link>
              <a
                href="tel:+13052183513"
                className="block w-full text-center border border-white/20 hover:border-gold text-white hover:text-gold text-sm py-3 rounded-lg transition-colors"
              >
                (305) 218-3513
              </a>

              <ul className="mt-6 space-y-2">
                {[t("trustBoardCertified"), t("trustAccredited"), t("trustNaturalResults"), t("trustSupport")].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/40 text-xs">
                    <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related procedures */}
      {related.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-4xl text-navy font-light mb-8">
              {t("relatedProcedures")}
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r) => {
                const relName = locale === "es" && r.es?.name ? r.es.name : r.name;
                return (
                  <Link
                    key={r.id}
                    href={`/procedures/${r.slug}`}
                    className="group flex items-center justify-between p-5 bg-cream rounded-xl border border-cream-dark hover:border-gold transition-colors card-hover"
                  >
                    <div>
                      <p className="font-heading text-navy text-xl mb-1">{relName}</p>
                      <p className="text-navy/45 text-xs tracking-wider">{r.tagline}</p>
                    </div>
                    <ArrowRight size={16} className="text-navy/30 group-hover:text-gold transition-colors" />
                  </Link>
                );
              })}
            </div>
            <div className="mt-6">
              <Link
                href="/procedures"
                className="inline-flex items-center gap-2 text-navy/50 hover:text-navy text-sm transition-colors"
              >
                <ArrowLeft size={14} />
                {t("backToAll")}
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
