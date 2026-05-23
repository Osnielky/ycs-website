import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { procedures, categoryLabels } from "@/data/procedures";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "All Procedures | Cosmetic Surgery Miami, Hialeah FL",
  description:
    "Explore all cosmetic surgery procedures at Your Cosmetic Surgery & SPA in Miami — BBL, Lipo 360, tummy tuck, breast augmentation, rhinoplasty, facelift, bichectomy & more. Board-certified surgeons. Flexible financing.",
};

const categories = ["body", "breast", "face", "medspa"] as const;

const gradientMap: Record<string, string> = {
  body: "from-[#1a2d5a] to-[#0d1b3e]",
  breast: "from-[#2d1a4a] to-[#1a0d35]",
  face: "from-[#1a3d3a] to-[#0d2e2c]",
  medspa: "from-[#3d2a1a] to-[#2e1a0d]",
};

export default function ProceduresPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="gold-divider mx-auto mb-6" />
          <h1 className="font-heading text-6xl md:text-7xl text-white font-light mb-5">
            Our Procedures
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
            From surgical transformation to non-invasive enhancements — every
            procedure is designed around your unique goals and anatomy.
          </p>
        </div>
      </section>

      {/* Procedures by category */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {categories.map((cat) => {
            const procs = procedures.filter((p) => p.category === cat);
            return (
              <div key={cat}>
                {/* Category header */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="gold-divider" />
                  <h2 className="font-heading text-4xl text-navy font-light">
                    {categoryLabels[cat]}
                  </h2>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {procs.map((proc) => (
                    <Link
                      key={proc.id}
                      href={`/procedures/${proc.slug}`}
                      className="group relative overflow-hidden rounded-xl card-hover block"
                    >
                      <div
                        className={`bg-gradient-to-br ${gradientMap[cat]} h-full p-7 flex flex-col justify-between min-h-[220px]`}
                      >
                        <div>
                          <span className="text-gold/50 text-2xl mb-4 block">{proc.icon}</span>
                          <h3 className="font-heading text-white text-2xl font-light mb-1">{proc.name}</h3>
                          <p className="text-gold text-xs tracking-widest uppercase">{proc.tagline}</p>
                        </div>
                        <div>
                          <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{proc.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-white/40 text-xs">
                              <Clock size={11} />
                              <span>{proc.recovery}</span>
                            </div>
                            <span className="flex items-center gap-1 text-gold text-xs font-medium group-hover:gap-2 transition-all">
                              Learn More <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30 rounded-xl transition-all duration-300" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
