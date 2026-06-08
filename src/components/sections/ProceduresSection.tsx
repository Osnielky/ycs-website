"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { procedures, type Procedure } from "@/data/procedures";
import ConsultationModal from "@/components/sections/ConsultationModal";

// Hero images cycled as procedure card visuals
const heroImages = [
  "/hero/1.webp", "/hero/2.webp", "/hero/3.webp",
  "/hero/4.webp", "/hero/5.webp", "/hero/6.webp",
];

const bgMap: Record<string, string> = {
  body:   "bg-[#0d1b3e]",
  breast: "bg-[#1a0d35]",
  face:   "bg-[#0d2e2c]",
  medspa: "bg-[#2e1a0d]",
};

function ProcedureCard({
  proc,
  fallbackSrc,
  onInterested,
  learnMore,
  interested,
  recovery,
  categoryLabel,
  locale,
}: {
  proc: Procedure;
  fallbackSrc: string;
  onInterested: () => void;
  learnMore: string;
  interested: string;
  recovery: string;
  categoryLabel: Record<string, string>;
  locale: string;
}) {
  const displayName = (locale === "es" && proc.es?.name) ? proc.es.name : proc.name;
  const displayTagline = (locale === "es" && proc.es?.tagline) ? proc.es.tagline : proc.tagline;
  const displayDescription = (locale === "es" && proc.es?.description) ? proc.es.description : proc.description;
  const displayRecovery = (locale === "es" && proc.es?.recovery) ? proc.es.recovery : proc.recovery;
  // Try /procedures/{slug}.webp first; if missing fall back to hero image
  const webpSrc = `/procedures/${proc.slug}.webp`;
  const [src, setSrc] = useState(webpSrc);
  const [imgErr, setImgErr] = useState(false);

  function handleError() {
    if (src !== fallbackSrc) {
      setSrc(fallbackSrc);
    } else {
      setImgErr(true);
    }
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-cream-dark card-hover flex flex-col bg-white shadow-[0_2px_12px_rgba(13,27,62,0.06)]">
      {/* ── Image panel ── */}
      <div className={`relative h-96 overflow-hidden shrink-0 ${bgMap[proc.category]}`}>
        {!imgErr && (
          <Image
            src={src}
            alt={proc.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ objectPosition: proc.imagePosition ?? "center center" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={handleError}
          />
        )}

        {/* Category pill */}
        <span className="absolute top-4 left-4 z-10 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
          {categoryLabel[proc.category] ?? proc.category}
        </span>

        {/* Procedure icon — bottom of image */}
        <div className="absolute bottom-4 left-5 z-10">
          <span className="text-[#c9a46e] text-3xl leading-none opacity-80">
            {proc.icon}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[#c9a46e] text-[10px] tracking-[0.22em] uppercase font-semibold mb-1">
          {displayTagline}
        </p>
        <h3 className="font-heading text-[#0d1b3e] text-[1.45rem] font-light leading-snug mb-3">
          {displayName}
        </h3>
        <p className="text-[#0d1b3e]/55 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {displayDescription}
        </p>

        <div className="flex items-center gap-1.5 text-[#0d1b3e]/35 text-xs mb-5">
          <Clock size={11} />
          <span>{recovery}: {displayRecovery}</span>
        </div>

        {/* Dual CTA */}
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href={`/procedures/${proc.slug}`}
            className="text-center text-[10px] font-bold tracking-[0.14em] uppercase py-3 rounded-lg border border-[#0d1b3e]/18 text-[#0d1b3e] hover:bg-[#0d1b3e] hover:text-white hover:border-[#0d1b3e] transition-all duration-200"
          >
            {learnMore}
          </Link>
          <button
            onClick={onInterested}
            className="text-center text-[10px] font-bold tracking-[0.14em] uppercase py-3 rounded-lg bg-[#c9a46e] text-white hover:bg-[#a87d45] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(201,164,110,0.4)]"
          >
            {interested}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProceduresSection() {
  const t = useTranslations("proceduresSection");
  const locale = useLocale();
  const [active, setActive] = useState<string>("body");
  const [activeProcedure, setActiveProcedure] = useState<string | null>(null);

  const tabs = [
    { key: "body",   label: t("tabBody") },
    { key: "breast", label: t("tabBreast") },
    { key: "face",   label: t("tabFace") },
    { key: "medspa", label: t("tabMedspa") },
  ] as const;

  const categoryLabel: Record<string, string> = {
    body:   t("tabBody"),
    breast: t("tabBreast"),
    face:   t("tabFace"),
    medspa: t("tabMedspa"),
  };

  const filtered = procedures.filter((p) => p.category === active);

  return (
    <>
      <section className="py-24 bg-cream" id="procedures">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="gold-divider mx-auto mb-5" />
            <h2 className="font-heading text-5xl md:text-6xl text-navy font-light mb-4">
              {t("heading")}
            </h2>
            <p className="text-navy/55 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("subheading")}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-cream-dark rounded-full p-1.5 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`px-6 py-2 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-200 ${
                    active === tab.key
                      ? "bg-navy text-white shadow-sm"
                      : "text-navy/55 hover:text-navy"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid — fills evenly across 2 or 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((proc, idx) => (
              <ProcedureCard
                key={proc.id}
                proc={proc}
                fallbackSrc={heroImages[idx % heroImages.length]}
                onInterested={() => setActiveProcedure(proc.name)}
                learnMore={t("learnMore")}
                interested={t("interested")}
                recovery={t("recovery")}
                categoryLabel={categoryLabel}
                locale={locale}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-14">
            <Link
              href="/procedures"
              className="inline-flex items-center gap-2 border-2 border-navy text-navy hover:bg-navy hover:text-white text-sm font-semibold tracking-[0.12em] uppercase px-8 py-3.5 rounded-full transition-all duration-200"
            >
              {t("viewAll")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {activeProcedure && (
        <ConsultationModal
          procedure={activeProcedure}
          onClose={() => setActiveProcedure(null)}
        />
      )}
    </>
  );
}
