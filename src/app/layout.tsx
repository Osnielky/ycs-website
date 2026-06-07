import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "600", "700"], // 400 & 500 are never used in the UI
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

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
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Your Cosmetic Surgery & SPA Miami",
      },
    ],
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
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo.svg',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/hero/1.webp" fetchPriority="high" />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
