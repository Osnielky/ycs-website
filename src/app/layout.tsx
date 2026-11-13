import type { Metadata, Viewport } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const viewport: Viewport = {
  themeColor: "#0d1b3e",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ycosmeticsurgery.com"),
  // Set GOOGLE_SITE_VERIFICATION in the environment to emit the GSC verification tag.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  title: {
    default: "Plastic Surgery in Miami & Hialeah | Your Cosmetic Surgery & SPA",
    template: "%s | Your Cosmetic Surgery & SPA",
  },
  description:
    "Your Cosmetic Surgery & SPA in Hialeah, Miami — cosmetic surgery with 20+ years of experience. BBL, tummy tuck, breast augmentation, Lipo 360, rhinoplasty & more. Free consultation. Serving all of South Florida.",
  keywords: [
    "cosmetic surgery Miami",
    "plastic surgery Miami",
    "cosmetic surgeon Hialeah",
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
  publisher: "Your Cosmetic Surgery & SPA",
  applicationName: "Your Cosmetic Surgery & SPA",
  category: "Health",
  formatDetection: { telephone: true, address: true, email: true },
  appleWebApp: { capable: true, title: "YCS", statusBarStyle: "default" },
  alternates: {
    canonical: "https://ycosmeticsurgery.com",
    languages: {
      en: "https://ycosmeticsurgery.com",
      es: "https://ycosmeticsurgery.com/es",
      "x-default": "https://ycosmeticsurgery.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ycosmeticsurgery.com",
    siteName: "Your Cosmetic Surgery & SPA",
    title: "Your Cosmetic Surgery & SPA | Trusted Cosmetic Surgeons in Miami",
    description:
      "Cosmetic surgery in Miami with 20+ years of experience. Natural results, flexible financing, free consultations. Serving Hialeah, Miami, and all of South Florida.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your Cosmetic Surgery & SPA — Trusted Cosmetic Surgeons in Miami",
      },
    ],
  },
  twitter: {
    // title / description / images intentionally omitted — Next falls back to
    // each page's (localized) openGraph values.
    card: "summary_large_image",
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
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
