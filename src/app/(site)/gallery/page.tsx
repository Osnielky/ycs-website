import type { Metadata } from "next";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Before & After Gallery | Cosmetic Surgery Results Miami",
  description:
    "Browse real patient before and after photos from Your Cosmetic Surgery & SPA in Miami — BBL, Lipo 360, tummy tuck, breast augmentation, rhinoplasty, facelift & more. All images used with patient consent.",
};

const categories = ["All", "Body", "Breast", "Face", "MedSpa"];

const placeholderCases = [
  { id: 1, procedure: "Tummy Tuck", category: "Body", beforeBg: "from-[#c4bfb8] to-[#a89f96]", afterBg: "from-[#e8d5c0] to-[#d4b896]" },
  { id: 2, procedure: "Breast Augmentation", category: "Breast", beforeBg: "from-[#c0bdc4] to-[#9a96a8]", afterBg: "from-[#dce0e8] to-[#b4bccc]" },
  { id: 3, procedure: "Rhinoplasty", category: "Face", beforeBg: "from-[#bdc4c0] to-[#96a89a]", afterBg: "from-[#d4e8d8] to-[#a8ccb0]" },
  { id: 4, procedure: "Liposuction", category: "Body", beforeBg: "from-[#c8c4bc] to-[#aca89e]", afterBg: "from-[#e0d8c8] to-[#ccc0a8]" },
  { id: 5, procedure: "Facelift", category: "Face", beforeBg: "from-[#c4c0bc] to-[#a8a49e]", afterBg: "from-[#e8e0d8] to-[#d0c8bc]" },
  { id: 6, procedure: "Breast Lift", category: "Breast", beforeBg: "from-[#c4bcc8] to-[#a89cac]", afterBg: "from-[#dcd4e4] to-[#c4bcd0]" },
  { id: 7, procedure: "BBL", category: "Body", beforeBg: "from-[#c8c0bc] to-[#aca49e]", afterBg: "from-[#e4d8cc] to-[#d0c0b0]" },
  { id: 8, procedure: "Eyelid Surgery", category: "Face", beforeBg: "from-[#c0c4bc] to-[#a0a89c]", afterBg: "from-[#d8e0d4] to-[#b8ccb4]" },
  { id: 9, procedure: "Botox & Fillers", category: "MedSpa", beforeBg: "from-[#c4c8c0] to-[#a8aca4]", afterBg: "from-[#dce0d8] to-[#c4c8c0]" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="gold-divider mx-auto mb-6" />
          <h1 className="font-heading text-6xl md:text-7xl text-white font-light mb-5">
            Before &amp; After Gallery
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
            Every transformation shown here represents a real patient who
            trusted us with their goals. All photos are shared with full
            informed consent.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-5 py-2 rounded-full text-sm font-medium tracking-wider border border-navy/20 text-navy/60 hover:border-navy hover:text-navy transition-colors first:bg-navy first:text-white first:border-navy"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderCases.map((c) => (
              <div key={c.id} className="group overflow-hidden rounded-2xl border border-cream-dark card-hover bg-white">
                {/* Image comparison */}
                <div className="relative grid grid-cols-2 h-72 overflow-hidden">
                  <div className={`bg-gradient-to-br ${c.beforeBg} relative flex items-end justify-start p-3`}>
                    <span className="bg-navy/70 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full">
                      Before
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 text-[10px] tracking-widest">Photo placeholder</span>
                    </div>
                  </div>
                  <div className={`bg-gradient-to-br ${c.afterBg} relative flex items-end justify-end p-3`}>
                    <span className="bg-gold/90 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full">
                      After
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 text-[10px] tracking-widest">Photo placeholder</span>
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/80 z-10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center z-10">
                    <span className="text-navy font-bold text-xs">↔</span>
                  </div>
                </div>

                {/* Card info */}
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-navy font-medium text-sm">{c.procedure}</p>
                    <p className="text-navy/40 text-xs tracking-wider">{c.category}</p>
                  </div>
                  <span className="text-gold text-xs font-medium">View →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-navy/35 text-xs mt-10 italic max-w-lg mx-auto">
            * Actual patient photos are available above as placeholders. Replace
            the gradient backgrounds with real before/after patient images using
            Next.js Image component. All photos require signed patient consent
            forms.
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
