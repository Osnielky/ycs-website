import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ycosmeticsurgery.com/#organization",
      name: "Your Cosmetic Surgery & SPA",
      alternateName: "YCS",
      url: "https://ycosmeticsurgery.com",
      logo: {
        "@type": "ImageObject",
        url: "https://ycosmeticsurgery.com/logo.png",
        width: 512,
        height: 512,
      },
      image: "https://ycosmeticsurgery.com/api/og",
      telephone: "+13052183513",
      email: "info@ycosmeticsurgery.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1255 W 46th St, Suite #6 & 7A",
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
    },
    {
      "@type": "WebSite",
      "@id": "https://ycosmeticsurgery.com/#website",
      url: "https://ycosmeticsurgery.com",
      name: "Your Cosmetic Surgery & SPA",
      inLanguage: ["en-US", "es"],
      publisher: { "@id": "https://ycosmeticsurgery.com/#organization" },
    },
  ],
};

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
