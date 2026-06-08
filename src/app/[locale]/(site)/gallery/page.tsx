import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hreflangAlternatesForLocale } from "@/lib/seo";
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
  return {
    title: "Before & After Gallery | Cosmetic Surgery Results Miami",
    description:
      "Browse real patient before and after photos from Your Cosmetic Surgery & SPA in Miami — BBL, Lipo 360, tummy tuck, breast augmentation, rhinoplasty, facelift & more. All images used with patient consent.",
    alternates: {
      canonical:
        locale === "en"
          ? "https://ycosmeticsurgery.com/gallery"
          : "https://ycosmeticsurgery.com/es/gallery",
      languages: hreflangAlternatesForLocale("gallery", locale),
    },
    openGraph: {
      title: "Before & After Gallery | Your Cosmetic Surgery & SPA Miami",
      description:
        "See real patient transformations from our board-certified surgeons. Before and after photos for BBL, liposuction, breast augmentation, rhinoplasty, facelift, and more.",
      url:
        locale === "en"
          ? "https://ycosmeticsurgery.com/gallery"
          : "https://ycosmeticsurgery.com/es/gallery",
    },
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
