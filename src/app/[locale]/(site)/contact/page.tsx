import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { alternatesFor, openGraph } from "@/lib/seo";
import ContactForm from "@/components/sections/ContactForm";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: alternatesFor("/contact", locale),
    openGraph: openGraph({
      path: "/contact",
      locale,
      title,
      description,
      image: "/api/og?title=Contact+Us",
      imageAlt:
        locale === "es"
          ? "Contacte a Your Cosmetic Surgery & SPA, Hialeah, Miami"
          : "Contact Your Cosmetic Surgery & SPA, Hialeah, Miami",
    }),
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://ycosmeticsurgery.com/#business",
  name: "Your Cosmetic Surgery & SPA",
  alternateName: "YCS Aesthetic Center",
  url: "https://ycosmeticsurgery.com",
  telephone: "+13052183513",
  email: "info@ycosmeticsurgery.com",
  priceRange: "$$",
  image: "https://ycosmeticsurgery.com/api/og",
  logo: "https://ycosmeticsurgery.com/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1255 W 46th St Suite #6 & 7A",
    addressLocality: "Hialeah",
    addressRegion: "FL",
    postalCode: "33012",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.8404",
    longitude: "-80.2894",
  },
  hasMap: "https://maps.google.com/?q=1255+W+46th+St,+Hialeah,+FL+33012",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "15:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+13052183513",
    contactType: "customer service",
    areaServed: ["Miami", "Hialeah", "South Florida"],
    availableLanguage: ["English", "Spanish"],
  },
  medicalSpecialty: "PlasticSurgery",
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: "25.8404", longitude: "-80.2894" },
    geoRadius: "80000",
  },
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactForm />
    </>
  );
}
