"use client";

import { useState } from "react";
import type { LandingOffer } from "@/data/landings";
import ConsultationModal from "@/components/sections/ConsultationModal";

interface OfferBannerProps {
  offer: LandingOffer;
  defaultCtaLabel: string;
  procedureName: string;
}

export default function OfferBanner({ offer, defaultCtaLabel, procedureName }: OfferBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  if (dismissed) return null;

  return (
    <div className="offer-banner relative overflow-hidden text-navy">
      {/* Close button — pinned to the corner so it never crowds the content */}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss offer"
        className="absolute top-3 right-3 z-10 grid h-7 w-7 place-items-center rounded-full text-navy/50 transition-colors hover:bg-navy/10 hover:text-navy"
      >
        <span className="text-xl leading-none">&times;</span>
      </button>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-center md:flex-row md:gap-6 md:py-4 md:text-left">
        {/* Decorative gift badge */}
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-gold shadow-lg ring-4 ring-white/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
          </svg>
        </span>

        <div className="flex-1">
          {/* Urgency pill */}
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-navy/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
            <span className="offer-pulse inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            This Month Only
          </span>

          <p
            className="text-balance text-xl font-semibold leading-snug text-navy md:text-2xl"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {offer.headline}
          </p>

          {offer.subtext && (
            <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-navy-dark/80 md:mx-0 md:text-[0.95rem]">
              {offer.subtext}
            </p>
          )}
        </div>

        {/* CTA — full-width on mobile, compact on desktop */}
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-navy-dark hover:shadow-xl md:w-auto md:py-3"
        >
          {offer.ctaLabel ?? defaultCtaLabel}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {formOpen && (
        <ConsultationModal
          procedure={`${procedureName} — ${offer.ctaLabel ?? defaultCtaLabel}`}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}
