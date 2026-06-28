"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { LandingOffer } from "@/data/landings";

interface OfferBannerProps {
  offer: LandingOffer;
  defaultCtaLabel: string;
}

export default function OfferBanner({ offer, defaultCtaLabel }: OfferBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-gold text-navy">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
        <div className="flex-1 md:flex md:items-center md:justify-center md:gap-3 text-center md:text-left">
          <p className="font-semibold text-sm md:text-base">{offer.headline}</p>
          {offer.subtext && <p className="text-navy/70 text-xs md:text-sm">{offer.subtext}</p>}
        </div>
        <Link
          href="/contact"
          className="shrink-0 bg-navy text-white text-xs font-semibold uppercase tracking-[0.1em] px-4 py-2 rounded-lg hover:bg-navy-dark transition-colors"
        >
          {offer.ctaLabel ?? defaultCtaLabel}
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss offer"
          className="shrink-0 text-navy/50 hover:text-navy transition-colors text-2xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
