"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { procedures, type Procedure } from "@/data/procedures";

const tabs = [
  { key: "body", label: "Body" },
  { key: "breast", label: "Breast" },
  { key: "face", label: "Face" },
  { key: "medspa", label: "MedSpa" },
] as const;

const gradientMap: Record<string, string> = {
  body: "from-[#1a2d5a] to-[#0d1b3e]",
  breast: "from-[#2d1a4a] to-[#1a0d35]",
  face: "from-[#1a3d3a] to-[#0d2e2c]",
  medspa: "from-[#3d2a1a] to-[#2e1a0d]",
};

function ProcedureCard({ proc }: { proc: Procedure }) {
  return (
    <Link
      href={`/procedures/${proc.slug}`}
      className="group relative overflow-hidden rounded-xl card-hover block"
    >
      {/* Gradient background */}
      <div
        className={`bg-gradient-to-br ${gradientMap[proc.category]} h-full p-7 flex flex-col justify-between min-h-[240px]`}
      >
        {/* Top */}
        <div>
          <span className="text-gold/60 text-2xl leading-none mb-4 block">
            {proc.icon}
          </span>
          <h3 className="font-heading text-white text-2xl font-light mb-1">
            {proc.name}
          </h3>
          <p className="text-gold text-xs tracking-widest uppercase">
            {proc.tagline}
          </p>
        </div>

        {/* Bottom */}
        <div>
          <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
            {proc.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Clock size={11} />
              <span>Recovery: {proc.recovery}</span>
            </div>
            <span className="flex items-center gap-1 text-gold text-xs font-medium group-hover:gap-2 transition-all">
              Learn More <ArrowRight size={12} />
            </span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Gold border on hover */}
        <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30 rounded-xl transition-all duration-300" />
      </div>
    </Link>
  );
}

export default function ProceduresSection() {
  const [active, setActive] = useState<string>("body");

  const filtered = procedures.filter((p) => p.category === active);

  return (
    <section className="py-24 bg-cream" id="procedures">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-5xl md:text-6xl text-navy font-light mb-4">
            Our Procedures
          </h2>
          <p className="text-navy/55 text-lg max-w-2xl mx-auto leading-relaxed">
            From surgical transformation to non-invasive enhancements, every
            procedure is tailored to your unique anatomy and aesthetic goals.
          </p>
        </div>

        {/* Tab filters */}
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

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((proc) => (
            <ProcedureCard key={proc.id} proc={proc} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/procedures"
            className="inline-flex items-center gap-2 border-2 border-navy text-navy hover:bg-navy hover:text-white text-sm font-semibold tracking-[0.12em] uppercase px-8 py-3.5 rounded-full transition-all duration-200"
          >
            View All Procedures <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
