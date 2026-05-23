import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const cases = [
  {
    procedure: "Tummy Tuck",
    category: "Body",
    description: "Dramatic improvement in abdominal profile with tightened core muscles and removed excess skin.",
    beforeImg: "/before-after/tummy-tuck-before.jpg",
    afterImg: "/before-after/tummy-tuck-after.jpg",
    beforeBg: "from-[#c4bfb8] to-[#a89f96]",
    afterBg: "from-[#e8d5c0] to-[#d4b896]",
  },
  {
    procedure: "Breast Augmentation",
    category: "Breast",
    description: "Natural-looking volume enhancement achieving beautiful, proportionate results.",
    beforeImg: "/before-after/breast-aug-before.jpg",
    afterImg: "/before-after/breast-aug-after.jpg",
    beforeBg: "from-[#c0bdc4] to-[#9a96a8]",
    afterBg: "from-[#dce0e8] to-[#b4bccc]",
  },
  {
    procedure: "Rhinoplasty",
    category: "Face",
    description: "Refined nasal bridge and tip creating perfect facial harmony without an operated appearance.",
    beforeImg: "/before-after/rhinoplasty-before.jpg",
    afterImg: "/before-after/rhinoplasty-after.jpg",
    beforeBg: "from-[#bdc4c0] to-[#96a89a]",
    afterBg: "from-[#d4e8d8] to-[#a8ccb0]",
  },
];

function BeforeAfterCard({ c }: { c: typeof cases[0] }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-cream-dark card-hover">
      {/* Image comparison */}
      <div className="relative grid grid-cols-2 h-72 overflow-hidden">
        {/* Before */}
        <div className={`relative bg-gradient-to-br ${c.beforeBg} overflow-hidden`}>
          <Image
            src={c.beforeImg}
            alt={`Before ${c.procedure}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
          <span className="absolute bottom-3 left-3 bg-navy/70 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full z-10">
            Before
          </span>
        </div>

        {/* After */}
        <div className={`relative bg-gradient-to-br ${c.afterBg} overflow-hidden`}>
          <Image
            src={c.afterImg}
            alt={`After ${c.procedure}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
          <span className="absolute bottom-3 right-3 bg-gold/90 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full z-10">
            After
          </span>
        </div>

        {/* Center divider + handle */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/80 z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center z-10">
          <span className="text-navy font-bold text-xs">↔</span>
        </div>
      </div>

      {/* Copy */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gold font-semibold tracking-widest uppercase">
            {c.category}
          </span>
          <span className="w-1 h-1 bg-navy/20 rounded-full" />
          <span className="text-xs text-navy/40 tracking-wider uppercase">
            {c.procedure}
          </span>
        </div>
        <p className="text-navy/60 text-sm leading-relaxed">{c.description}</p>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section className="py-24 bg-white" id="gallery-preview">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-5xl md:text-6xl text-navy font-light mb-4">
            Real Patients. Real Results.
          </h2>
          <p className="text-navy/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Every transformation is unique. Browse a selection of our
            patients&apos; journeys — shared with their full consent to inspire
            others.
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {cases.map((c) => (
            <BeforeAfterCard key={c.procedure} c={c} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white text-sm font-semibold tracking-[0.12em] uppercase px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-[0_4px_20px_rgba(13,27,62,0.25)]"
          >
            View Full Gallery <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
