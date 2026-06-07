import type { Metadata } from "next";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/procedures";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Patient Testimonials | Real Results in Miami, FL",
  description:
    "Read what real patients say about Your Cosmetic Surgery & SPA in Miami. 500+ verified reviews with a 4.9 average rating. BBL, tummy tuck, breast augmentation, rhinoplasty & more — see why South Florida trusts us.",
  alternates: {
    canonical: "https://ycosmeticsurgery.com/testimonials",
  },
  openGraph: {
    title: "Patient Testimonials | Your Cosmetic Surgery & SPA Miami",
    description:
      "500+ verified reviews, 4.9 average rating across Google, RealSelf, Healthgrades, and Vitals. Read real patient stories from our cosmetic surgery patients in Miami.",
    url: "https://ycosmeticsurgery.com/testimonials",
  },
};

const platforms = [
  { name: "Google",      rating: "4.9", count: "312" },
  { name: "RealSelf",    rating: "4.8", count: "180" },
  { name: "Healthgrades",rating: "5.0", count: "94"  },
  { name: "Vitals",      rating: "4.9", count: "67"  },
];

const totalReviews = platforms.reduce((sum, p) => sum + parseInt(p.count), 0);

const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Patient Reviews — Your Cosmetic Surgery & SPA",
  url: "https://ycosmeticsurgery.com/testimonials",
  numberOfItems: testimonials.length,
  itemListElement: testimonials.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      itemReviewed: {
        "@type": "MedicalBusiness",
        name: "Your Cosmetic Surgery & SPA",
        url: "https://ycosmeticsurgery.com",
      },
    },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://ycosmeticsurgery.com/#business",
  name: "Your Cosmetic Surgery & SPA",
  url: "https://ycosmeticsurgery.com",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: String(totalReviews),
    reviewCount: String(totalReviews),
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    name: t.procedure,
    author: { "@type": "Person", name: t.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(t.rating),
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: t.text,
    publisher: { "@type": "Organization", name: "Your Cosmetic Surgery & SPA" },
  })),
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ycosmeticsurgery.com" },
      { "@type": "ListItem", position: 2, name: "Testimonials", item: "https://ycosmeticsurgery.com/testimonials" },
    ],
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="gold-divider mx-auto mb-6" />
          <h1 className="font-heading text-6xl md:text-7xl text-white font-light mb-5">
            Patient Stories
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
            The most meaningful validation we receive comes from our patients.
            Here are the words they&apos;ve shared after their transformations.
          </p>
        </div>
      </section>

      {/* Rating summary */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl p-6 text-center border border-cream-dark card-hover">
                <div className="font-heading text-4xl text-navy mb-1">
                  {p.rating}
                  <span className="text-gold text-2xl">/5</span>
                </div>
                <div className="flex justify-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-navy font-semibold text-sm">{p.name}</p>
                <p className="text-navy/40 text-xs">{p.count} reviews</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <article
                key={t.id}
                itemScope
                itemType="https://schema.org/Review"
                className="bg-white rounded-2xl p-7 border border-cream-dark card-hover flex flex-col"
              >
                <Quote size={28} className="text-gold/30 mb-4" />
                <div className="flex gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={13} className="fill-gold text-gold" />
                  ))}
                  <meta itemProp="ratingValue" content={String(t.rating)} />
                  <meta itemProp="bestRating" content="5" />
                </div>
                <p
                  itemProp="reviewBody"
                  className="text-navy/65 text-sm leading-relaxed flex-1 mb-6 italic"
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-cream-dark pt-4">
                  <p itemProp="author" itemScope itemType="https://schema.org/Person" className="text-navy font-semibold text-sm">
                    <span itemProp="name">{t.name}</span>
                  </p>
                  <p itemProp="name" className="text-gold text-xs tracking-wider mt-0.5">{t.procedure}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
