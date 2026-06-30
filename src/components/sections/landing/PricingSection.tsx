import { CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LandingPricing } from "@/data/landings";

interface PricingSectionProps {
  pricing: LandingPricing;
  ctaLabel: string;
}

export default function PricingSection({ pricing, ctaLabel }: PricingSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <span className="gold-divider mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-light mb-5">
            {pricing.heading}
          </h2>
          <p className="text-navy/70 leading-relaxed max-w-3xl">{pricing.intro}</p>
        </div>

        {/* Tier cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col bg-cream border border-cream-dark rounded-2xl p-6 card-hover"
            >
              <h3 className="font-heading text-2xl text-navy mb-2">{tier.name}</h3>
              <p className="text-gold font-semibold text-lg mb-4">{tier.price}</p>
              <p className="text-navy/60 text-sm leading-relaxed mt-auto">{tier.bestFor}</p>
            </div>
          ))}
        </div>

        {/* What affects your price */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-heading text-2xl md:text-3xl text-navy mb-6">
              {pricing.factorsTitle}
            </h3>
            <ul className="space-y-3">
              {pricing.factors.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-navy/70 text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Financing + CTA */}
          <div className="bg-navy rounded-2xl p-8">
            <span className="gold-divider mb-5" />
            {pricing.financingNote && (
              <p className="text-white/80 leading-relaxed mb-6">{pricing.financingNote}</p>
            )}
            <Link
              href="/contact"
              className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold text-sm tracking-[0.1em] uppercase px-8 py-4 rounded-lg transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-navy/45 text-xs leading-relaxed mt-10 max-w-3xl">
          {pricing.disclaimer}
        </p>
      </div>
    </section>
  );
}
