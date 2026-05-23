import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import DoctorSection from "@/components/sections/DoctorSection";
import StatsBar from "@/components/sections/StatsBar";
import ProceduresSection from "@/components/sections/ProceduresSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title:
    "Your Cosmetic Surgery & SPA | Trusted Plastic Surgeons in Miami, FL",
  description:
    "Your Cosmetic Surgery & SPA in Hialeah, Miami — board-certified surgeons with 20+ years of experience. BBL, Lipo 360, tummy tuck, breast augmentation, rhinoplasty & more. Free consultation. Flexible financing.",
  alternates: {
    canonical: "https://ycosmeticsurgery.com",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Your Cosmetic Surgery & SPA",
            alternateName: "YCS",
            url: "https://ycosmeticsurgery.com",
            telephone: "+13052183513",
            email: "info@ycosmeticsurgery.com",
            logo: "https://ycosmeticsurgery.com/og-image.jpg",
            image: "https://ycosmeticsurgery.com/og-image.jpg",
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
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
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
              reviewCount: "500",
            },
            employee: {
              "@type": "Physician",
              name: "Dr. Mario Reyes-Serrano",
              jobTitle: "Board-Certified Plastic Surgeon",
            },
          }),
        }}
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
