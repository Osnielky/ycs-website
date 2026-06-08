import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Award, GraduationCap, Heart } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hreflangAlternatesForLocale } from "@/lib/seo";
import CTABanner from "@/components/sections/CTABanner";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "About Us | Board-Certified Plastic Surgeons in Miami",
    description:
      "Meet the Your Cosmetic Surgery & SPA team — Dr. Mario Reyes-Serrano and our board-certified plastic surgeons with 20+ years of experience in Miami and Hialeah, FL. Natural results, compassionate care.",
    alternates: {
      canonical:
        locale === "en"
          ? "https://ycosmeticsurgery.com/about"
          : "https://ycosmeticsurgery.com/es/about",
      languages: hreflangAlternatesForLocale("about", locale),
    },
    openGraph: {
      title: "About Your Cosmetic Surgery & SPA | Miami, FL",
      description:
        "Board-certified plastic surgeons with 20+ years of experience. AAAHC-accredited facility in Hialeah. Over 5,000 transformations and counting.",
      url:
        locale === "en"
          ? "https://ycosmeticsurgery.com/about"
          : "https://ycosmeticsurgery.com/es/about",
      images: [{ url: "/api/og?title=About+Us", width: 1200, height: 630, alt: "Your Cosmetic Surgery & SPA Miami team" }],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://ycosmeticsurgery.com/#organization",
  name: "Your Cosmetic Surgery & SPA",
  alternateName: "YCS Aesthetic Center",
  url: "https://ycosmeticsurgery.com",
  logo: "https://ycosmeticsurgery.com/Logo.jpg",
  telephone: "+13052183513",
  email: "info@ycosmeticsurgery.com",
  foundingDate: "2004",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1255 W 46th St Suite #6 & 7A",
    addressLocality: "Hialeah",
    addressRegion: "FL",
    postalCode: "33012",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.instagram.com/yourcosmetic_surgery_spa",
    "https://www.facebook.com/yourcosmeticsurgeryspa/",
    "https://www.tiktok.com/@your.cosmetic_surgery",
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "AAAHC Accreditation" },
  ],
  slogan: "Natural Results. Exceptional Care.",
  areaServed: [
    { "@type": "City", name: "Miami", sameAs: "https://www.wikidata.org/wiki/Q8652" },
    { "@type": "City", name: "Hialeah", sameAs: "https://www.wikidata.org/wiki/Q501291" },
    { "@type": "AdministrativeArea", name: "South Florida" },
  ],
};

const valueIcons = [ShieldCheck, Award, GraduationCap, Heart];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  const milestones = [
    { year: "2004", event: t("milestone2004") },
    { year: "2008", event: t("milestone2008") },
    { year: "2012", event: t("milestone2012") },
    { year: "2016", event: t("milestone2016") },
    { year: "2020", event: t("milestone2020") },
    { year: "2024", event: t("milestone2024") },
  ];

  const values = [
    { icon: valueIcons[0], title: t("safetyTitle"), desc: t("safetyDesc") },
    { icon: valueIcons[1], title: t("artTitle"), desc: t("artDesc") },
    { icon: valueIcons[2], title: t("expTitle"), desc: t("expDesc") },
    { icon: valueIcons[3], title: t("careTitle"), desc: t("careDesc") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="gold-divider mx-auto mb-6" />
          <h1 className="font-heading text-6xl md:text-7xl text-white font-light mb-5">
            {t("heroTitle")}
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
              <Image
                src="/Dr-Mario-Reyes-Cosmetic Surgeon-miami.webp"
                alt="Dr. Mario Reyes-Serrano — Board-Certified Plastic Surgeon Miami"
                fill
                className="object-cover object-top"
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-gold text-xs tracking-widest uppercase mb-1">Dr. Mario Reyes-Serrano</p>
                <p className="text-white/70 text-sm">{t("drTitle")}</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white border border-cream-dark rounded-2xl p-5 shadow-xl">
              <p className="font-heading text-4xl text-navy mb-0.5">20+</p>
              <p className="text-navy/50 text-xs tracking-widest uppercase">{t("expTitle")}</p>
            </div>
          </div>

          <div>
            <span className="gold-divider mb-6" />
            <h2 className="font-heading text-5xl text-navy font-light mb-5">
              {t("storyHeading")}
            </h2>
            <div className="space-y-4 text-navy/65 leading-relaxed">
              <p>{t("storyP1")}</p>
              <p>{t("storyP2")}</p>
              <p>{t("storyP3")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-navy hover:bg-navy-light text-white text-sm font-semibold tracking-[0.12em] uppercase px-7 py-3.5 rounded-full transition-all duration-200"
              >
                {t("bookConsultation")}
              </Link>
              <a
                href="tel:+13052183513"
                className="inline-flex items-center justify-center border-2 border-navy text-navy hover:bg-navy hover:text-white text-sm font-semibold tracking-[0.12em] uppercase px-7 py-3.5 rounded-full transition-all duration-200"
              >
                (305) 218-3513
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="gold-divider mx-auto mb-5" />
            <h2 className="font-heading text-5xl text-navy font-light mb-4">{t("valuesTitle")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-8 rounded-2xl border border-cream-dark card-hover">
                <div className="w-14 h-14 bg-navy/8 rounded-full flex items-center justify-center mx-auto mb-5">
                  <v.icon size={24} className="text-gold" />
                </div>
                <h3 className="font-heading text-xl text-navy mb-3">{v.title}</h3>
                <p className="text-navy/55 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dr. Mario spotlight */}
      <section className="py-24 bg-cream-dark">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="gold-divider mx-auto mb-5" />
            <h2 className="font-heading text-5xl text-navy font-light">
              {t("meetSurgeon")}
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-10 border border-cream-dark flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-navy to-navy-light border-2 border-gold flex items-center justify-center shrink-0 font-heading text-gold text-4xl">
              MR
            </div>
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-1">{t("drTitle")}</p>
              <h3 className="font-heading text-4xl text-navy mb-3">Dr. Mario Reyes-Serrano</h3>
              <p className="text-navy/60 leading-relaxed mb-4">{t("drBio1")}</p>
              <p className="text-navy/60 leading-relaxed">{t("drBio2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="gold-divider mx-auto mb-5" />
            <h2 className="font-heading text-5xl text-navy font-light">{t("ourJourney")}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent" />
            <div className="space-y-10">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-8 items-start">
                  <div className="w-14 h-14 rounded-full bg-navy border-2 border-gold flex items-center justify-center shrink-0">
                    <span className="text-gold text-xs font-bold">{m.year}</span>
                  </div>
                  <div className="pt-3">
                    <p className="text-navy/70 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
