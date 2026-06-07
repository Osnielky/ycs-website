"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ConsultationModal from "@/components/sections/ConsultationModal";

const caseImages = [
  {
    id: 1,
    beforeImg: "/before-after/tummy-tuck-before.webp",
    afterImg:  "/before-after/tummy-tuck-after.webp",
    beforeBg:  "from-[#c4bfb8] to-[#a89f96]",
    afterBg:   "from-[#e8d5c0] to-[#d4b896]",
  },
  {
    id: 2,
    beforeImg: "/before-after/breast-aug-before.jpg",
    afterImg:  "/before-after/breast-aug-after.jpg",
    beforeBg:  "from-[#c0bdc4] to-[#9a96a8]",
    afterBg:   "from-[#dce0e8] to-[#b4bccc]",
  },
  {
    id: 3,
    beforeImg: "/before-after/rhinoplasty-before.jpg",
    afterImg:  "/before-after/rhinoplasty-after.jpg",
    beforeBg:  "from-[#bdc4c0] to-[#96a89a]",
    afterBg:   "from-[#d4e8d8] to-[#a8ccb0]",
  },
];

type CaseData = typeof caseImages[0] & {
  category: string;
  procedure: string;
  description: string;
};

function BeforeAfterCard({
  c,
  onInterested,
  beforeLabel,
  afterLabel,
  interestedLabel,
}: {
  c: CaseData;
  onInterested: () => void;
  beforeLabel: string;
  afterLabel: string;
  interestedLabel: string;
}) {
  const [beforeErr, setBeforeErr] = useState(false);
  const [afterErr,  setAfterErr]  = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl border border-cream-dark card-hover flex flex-col">
      {/* Image comparison */}
      <div className="relative grid grid-cols-2 h-72 overflow-hidden">
        {/* Before */}
        <div className={`relative bg-gradient-to-br ${c.beforeBg} overflow-hidden`}>
          {!beforeErr && (
            <Image
              src={c.beforeImg}
              alt={`Before ${c.procedure} at YCS Aesthetic Center, Miami`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 50vw, 17vw"
              onError={() => setBeforeErr(true)}
            />
          )}
          <span className="absolute bottom-3 left-3 bg-[#0d1b3e]/70 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full z-10">
            {beforeLabel}
          </span>
        </div>

        {/* After */}
        <div className={`relative bg-gradient-to-br ${c.afterBg} overflow-hidden`}>
          {!afterErr && (
            <Image
              src={c.afterImg}
              alt={`After ${c.procedure} results — YCS Aesthetic Center Hialeah`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 50vw, 17vw"
              onError={() => setAfterErr(true)}
            />
          )}
          <span className="absolute bottom-3 right-3 bg-[#c9a46e]/90 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full z-10">
            {afterLabel}
          </span>
        </div>

        {/* Center divider + handle */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/80 z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center z-10">
          <span className="text-[#0d1b3e] font-bold text-xs">↔</span>
        </div>
      </div>

      {/* Copy + CTA */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-[#c9a46e] font-semibold tracking-widest uppercase">
            {c.category}
          </span>
          <span className="w-1 h-1 bg-[#0d1b3e]/20 rounded-full" />
          <span className="text-xs text-[#0d1b3e]/40 tracking-wider uppercase">
            {c.procedure}
          </span>
        </div>
        <p className="text-[#0d1b3e]/60 text-sm leading-relaxed mb-5 flex-1">
          {c.description}
        </p>

        {/* CTA button */}
        <button
          onClick={onInterested}
          className="w-full text-center border border-[#0d1b3e]/15 hover:border-[#c9a46e] hover:bg-[#c9a46e] text-[#0d1b3e] hover:text-white text-[11px] font-bold tracking-[0.14em] uppercase py-3 rounded-lg transition-all duration-200"
        >
          {interestedLabel}
        </button>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  const t = useTranslations("beforeAfter");
  const [activeProcedure, setActiveProcedure] = useState<string | null>(null);

  const caseTranslations = [
    { category: t("case1Category"), procedure: t("case1Procedure"), description: t("case1Description") },
    { category: t("case2Category"), procedure: t("case2Procedure"), description: t("case2Description") },
    { category: t("case3Category"), procedure: t("case3Procedure"), description: t("case3Description") },
  ];

  const cases: CaseData[] = caseImages.map((img, i) => ({
    ...img,
    ...caseTranslations[i],
  }));

  return (
    <>
      <section className="py-24 bg-white" id="gallery-preview">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="gold-divider mx-auto mb-5" />
            <h2 className="font-heading text-5xl md:text-6xl text-[#0d1b3e] font-light mb-4">
              {t("heading")}
            </h2>
            <p className="text-[#0d1b3e]/55 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("subheading")}
            </p>
          </div>

          {/* Cases grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {cases.map((c) => (
              <BeforeAfterCard
                key={c.id}
                c={c}
                onInterested={() => setActiveProcedure(c.procedure)}
                beforeLabel={t("before")}
                afterLabel={t("after")}
                interestedLabel={t("interested")}
              />
            ))}
          </div>

          {/* Gallery link */}
          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-[#0d1b3e] hover:bg-[#1a2d5a] text-white text-sm font-semibold tracking-[0.12em] uppercase px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-[0_4px_20px_rgba(13,27,62,0.25)]"
            >
              {t("viewGallery")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation modal */}
      {activeProcedure && (
        <ConsultationModal
          procedure={activeProcedure}
          onClose={() => setActiveProcedure(null)}
        />
      )}
    </>
  );
}
