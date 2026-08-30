import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { alternatesFor, openGraph } from "@/lib/seo";
import GalleryClient from "@/components/sections/GalleryClient";
import CTABanner from "@/components/sections/CTABanner";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "galleryPage" });
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: alternatesFor("/gallery", locale),
    openGraph: openGraph({
      path: "/gallery",
      locale,
      title,
      description,
      image: "/api/og?title=Before+%26+After+Gallery",
      imageAlt:
        locale === "es"
          ? "Resultados de cirugía estética antes y después en Your Cosmetic Surgery & SPA, Miami"
          : "Before and after cosmetic surgery results at Your Cosmetic Surgery & SPA, Miami",
    }),
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Before & After Gallery — Your Cosmetic Surgery & SPA",
  description:
    "Before and after photographs of real cosmetic surgery patients at Your Cosmetic Surgery & SPA in Hialeah, FL. Procedures include BBL, tummy tuck, breast augmentation, rhinoplasty, facelift, and more.",
  url: "https://ycosmeticsurgery.com/gallery",
  about: {
    "@type": "MedicalBusiness",
    name: "Your Cosmetic Surgery & SPA",
    url: "https://ycosmeticsurgery.com",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ycosmeticsurgery.com" },
      { "@type": "ListItem", position: 2, name: "Gallery", item: "https://ycosmeticsurgery.com/gallery" },
    ],
  },
  image: [
    {
      "@type": "ImageObject",
      contentUrl: "https://ycosmeticsurgery.com/before-after/tummy-tuck-before-surgery-miami.webp",
      caption: "Before tummy tuck surgery — abdominal profile showing excess skin and fat before abdominoplasty at Your Cosmetic Surgery & SPA, Miami",
    },
    {
      "@type": "ImageObject",
      contentUrl: "https://ycosmeticsurgery.com/before-after/tummy-tuck-after-surgery-miami.webp",
      caption: "After tummy tuck surgery — flat, contoured abdomen result following abdominoplasty in Miami, FL",
    },
  ],
};

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryClient />
      <CTABanner />
    </>
  );
}
