import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import { alternatesFor, openGraph } from "@/lib/seo";

// Below-fold sections: defer JS parsing until needed
const ProceduresSection  = dynamic(() => import("@/components/sections/ProceduresSection"));
const BeforeAfterSection = dynamic(() => import("@/components/sections/BeforeAfterSection"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const DoctorSection      = dynamic(() => import("@/components/sections/DoctorSection"));
const CTABanner          = dynamic(() => import("@/components/sections/CTABanner"));

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homePage" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    // Home title already leads with the brand — skip the "%s | …" template.
    title: { absolute: title },
    description,
    alternates: alternatesFor("", locale),
    openGraph: openGraph({ path: "", locale, title, description }),
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Your Cosmetic Surgery & SPA",
  alternateName: "YCS",
  url: "https://ycosmeticsurgery.com",
  telephone: "+13052183513",
  email: "info@ycosmeticsurgery.com",
  logo: "https://ycosmeticsurgery.com/logo.png",
  image: "https://ycosmeticsurgery.com/api/og",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1255 W 46th St, Suite #6 & 7A",
    addressLocality: "Hialeah",
    addressRegion: "FL",
    postalCode: "33012",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.8576",
    longitude: "-80.2975",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Financing",
  areaServed: ["Miami", "Hialeah", "South Florida"],
  medicalSpecialty: "PlasticSurgery",
  hasMap: "https://maps.google.com/?q=1255+W+46th+St+Hialeah+FL+33012",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "653",
  },
  employee: {
    "@type": "Physician",
    name: "Dr. Mario Reyes-Serrano",
    jobTitle: "Board-Certified Plastic Surgeon",
  },
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
