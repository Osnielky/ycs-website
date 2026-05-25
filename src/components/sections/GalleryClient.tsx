"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface CaseItem {
  id: number;
  procedure: string;
  category: string;
  recovery: string;
  beforeBg: string;
  afterBg: string;
  featured: boolean;
  size: "large" | "medium" | "small";
}

const cases: CaseItem[] = [
  { id: 1,  procedure: "Tummy Tuck",          category: "Body",   recovery: "4–6 weeks",    beforeBg: "from-[#9e9890] to-[#7a7268]", afterBg: "from-[#e8d5c0] to-[#c9a46e]", featured: true,  size: "large"  },
  { id: 2,  procedure: "Breast Augmentation", category: "Breast", recovery: "2–4 weeks",    beforeBg: "from-[#9a9aa8] to-[#767488]", afterBg: "from-[#dce0e8] to-[#a4aec4]", featured: true,  size: "medium" },
  { id: 3,  procedure: "Rhinoplasty",         category: "Face",   recovery: "2–3 weeks",    beforeBg: "from-[#9aa09c] to-[#788078]", afterBg: "from-[#d4e8d8] to-[#98c4a0]", featured: true,  size: "medium" },
  { id: 4,  procedure: "Liposuction",         category: "Body",   recovery: "2–4 weeks",    beforeBg: "from-[#a09898] to-[#807070]", afterBg: "from-[#e0d8c8] to-[#c9a46e]", featured: false, size: "small"  },
  { id: 5,  procedure: "Facelift",            category: "Face",   recovery: "2–3 weeks",    beforeBg: "from-[#a0a09c] to-[#888884]", afterBg: "from-[#e8e0d8] to-[#d0c0a8]", featured: false, size: "small"  },
  { id: 6,  procedure: "Breast Lift",         category: "Breast", recovery: "2–4 weeks",    beforeBg: "from-[#9c98a8] to-[#7c7888]", afterBg: "from-[#dcd4e4] to-[#b8b0cc]", featured: false, size: "medium" },
  { id: 7,  procedure: "Brazilian Butt Lift", category: "Body",   recovery: "3–6 weeks",    beforeBg: "from-[#a09890] to-[#887870]", afterBg: "from-[#e8d4c0] to-[#c8a080]", featured: true,  size: "large"  },
  { id: 8,  procedure: "Eyelid Surgery",      category: "Face",   recovery: "1–2 weeks",    beforeBg: "from-[#9ca4a0] to-[#7c8880]", afterBg: "from-[#d8e8e0] to-[#acd0bc]", featured: false, size: "small"  },
  { id: 9,  procedure: "Botox & Fillers",     category: "MedSpa", recovery: "No downtime",  beforeBg: "from-[#a0a4a0] to-[#848884]", afterBg: "from-[#dce8e0] to-[#c0d0c8]", featured: false, size: "small"  },
  { id: 10, procedure: "Lipo 360",            category: "Body",   recovery: "2–4 weeks",    beforeBg: "from-[#a09898] to-[#807070]", afterBg: "from-[#e8d8cc] to-[#c8a888]", featured: false, size: "medium" },
  { id: 11, procedure: "Laser Resurfacing",   category: "MedSpa", recovery: "3–7 days",     beforeBg: "from-[#9c9898] to-[#7c7474]", afterBg: "from-[#f0e0d0] to-[#d8b898]", featured: false, size: "small"  },
  { id: 12, procedure: "Breast Reduction",    category: "Breast", recovery: "3–4 weeks",    beforeBg: "from-[#989ca0] to-[#787c84]", afterBg: "from-[#dce0e8] to-[#b8c0cc]", featured: false, size: "medium" },
];

const CATEGORIES = ["All", "Body", "Breast", "Face", "MedSpa"];

const DOT_COLOR: Record<string, string> = {
  Body:   "bg-[#4a7aff]",
  Breast: "bg-[#c060e8]",
  Face:   "bg-[#40b878]",
  MedSpa: "bg-[#e8903a]",
};

// ─── Drag slider (used in lightbox) ──────────────────────────────────────────

function DragSlider({ beforeBg, afterBg }: { beforeBg: string; afterBg: string }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none touch-none cursor-col-resize overflow-hidden"
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
      onPointerMove={(e) => { if (dragging.current) move(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
    >
      {/* Before */}
      <div className={`absolute inset-0 bg-gradient-to-br ${beforeBg}`}>
        <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
          Before
        </span>
      </div>

      {/* After — clipped */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${afterBg}`}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <span className="absolute bottom-3 right-3 bg-[#c9a46e]/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
          After
        </span>
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 w-px bg-white/90 pointer-events-none z-10"
        style={{ left: `${pos}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-10 pointer-events-none -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex items-center justify-center"
        style={{ left: `${pos}%` }}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-4 h-4 text-[#0d1b3e]">
          <polyline points="6,4 2,10 6,16" />
          <polyline points="14,4 18,10 14,16" />
        </svg>
      </div>

      {/* Drag hint — fades out after first drag */}
      {pos === 50 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="flex items-center gap-2 bg-black/35 backdrop-blur-sm rounded-full px-3 py-1.5 animate-pulse">
            <span className="text-white/80 text-[11px] tracking-wide">Drag to reveal</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Card (hover reveals after) ──────────────────────────────────────────────

function GalleryCard({ item, onClick }: { item: CaseItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const imgH = item.size === "large" ? "h-80" : item.size === "medium" ? "h-64" : "h-52";

  return (
    <div
      className="break-inside-avoid mb-5 group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-xl border border-cream-dark shadow-sm bg-white transition-shadow duration-300 group-hover:shadow-[0_16px_48px_rgba(13,27,62,0.13)]">
        {/* Image area */}
        <div className={`relative ${imgH} overflow-hidden`}>
          {/* Before */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.beforeBg}`} />

          {/* After — expands on hover */}
          <div
            className={`absolute top-0 right-0 bottom-0 bg-gradient-to-bl ${item.afterBg} transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
            style={{ width: hovered ? "65%" : "50%" }}
          />

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/85 z-10 transition-[left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ left: hovered ? "35%" : "50%" }}
          />
          <div
            className="absolute top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center transition-[left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ left: hovered ? "35%" : "50%" }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-3 h-3 text-[#0d1b3e]">
              <polyline points="5,3 2,8 5,13" />
              <polyline points="11,3 14,8 11,13" />
            </svg>
          </div>

          {/* Labels */}
          <span className="absolute bottom-3 left-3 z-10 bg-black/45 backdrop-blur-sm text-white text-[9px] font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm pointer-events-none">
            Before
          </span>
          <span className="absolute bottom-3 right-3 z-10 bg-[#c9a46e]/75 backdrop-blur-sm text-white text-[9px] font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm pointer-events-none">
            After
          </span>

          {/* Category dot */}
          <div className={`absolute top-3 left-3 z-10 w-2 h-2 rounded-full ${DOT_COLOR[item.category]}`} />

          {/* Featured badge */}
          {item.featured && (
            <div className="absolute top-3 right-3 z-10 bg-[#c9a46e]/85 backdrop-blur-sm text-white text-[9px] font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm">
              Featured
            </div>
          )}

          {/* Expand overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5">
              <span className="text-white text-[11px] tracking-wider font-medium">View Full Size</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div>
            <p className="text-[#0d1b3e] text-sm font-semibold leading-tight">{item.procedure}</p>
            <p className="text-[#0d1b3e]/40 text-[11px] tracking-wider uppercase mt-0.5">{item.category}</p>
          </div>
          <div className="text-right">
            <p className="text-[#0d1b3e]/30 text-[10px] tracking-wider uppercase">Recovery</p>
            <p className="text-[#c9a46e] text-xs font-semibold mt-0.5">{item.recovery}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: CaseItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#060e1f]/96 backdrop-blur-lg" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-xl rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)] border border-white/8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close"
        >
          <X size={14} />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 z-30 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white/60 text-[11px] tracking-wider">{index + 1} / {items.length}</span>
        </div>

        {/* Slider */}
        <div className="h-[400px] md:h-[440px]">
          <DragSlider beforeBg={item.beforeBg} afterBg={item.afterBg} />
        </div>

        {/* Info panel */}
        <div className="bg-[#0d1b3e]/80 p-6 backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[#c9a46e] text-[11px] tracking-[0.2em] uppercase font-semibold mb-1">{item.category}</p>
              <h3 className="font-[var(--font-heading)] text-white text-2xl font-light">{item.procedure}</h3>
            </div>
            <div className="text-right shrink-0 ml-4">
              <p className="text-white/35 text-[10px] tracking-wider uppercase">Recovery</p>
              <p className="text-white/70 text-sm mt-0.5 font-medium">{item.recovery}</p>
            </div>
          </div>

          <p className="text-white/40 text-xs leading-relaxed mb-5">
            Results are representative of outcomes at YCS Aesthetic Center. Individual results may vary. All images displayed with full written patient consent.
          </p>

          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center w-full bg-[#c9a46e] hover:bg-[#a87d45] text-white font-semibold text-xs tracking-[0.15em] uppercase py-3.5 rounded-lg transition-all duration-200 hover:shadow-[0_4px_20px_rgba(201,164,110,0.4)]"
          >
            Book a Free Consultation
          </Link>
        </div>

        {/* Prev / Next */}
        <button
          onClick={onPrev}
          className="absolute left-3 top-[200px] -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/65 text-white backdrop-blur-sm transition-colors z-20"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onNext}
          className="absolute right-3 top-[200px] -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/65 text-white backdrop-blur-sm transition-colors z-20"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? cases
    : cases.filter((c) => c.category === activeCategory);

  const countFor = (cat: string) =>
    cat === "All" ? cases.length : cases.filter((c) => c.category === cat).length;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#0d1b3e] pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-25" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a46e]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a46e]/20 to-transparent" />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] bg-[#c9a46e]/6 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#c9a46e]/12 border border-[#c9a46e]/25 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a46e] animate-pulse" />
            <span className="text-[#c9a46e]/80 text-[11px] tracking-[0.22em] uppercase font-semibold">Real Patient Results</span>
          </div>

          <span className="gold-divider mx-auto mb-6" />

          <h1 className="font-[var(--font-heading)] text-white font-light leading-[1.06] mb-5">
            <span className="block text-5xl md:text-7xl">Before &amp; After</span>
            <em className="not-italic block text-5xl md:text-7xl text-[#c9a46e]">Gallery</em>
          </h1>

          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
            Every transformation represents a patient who trusted us. Drag the slider in each photo to see their result.
          </p>
        </div>
      </section>

      {/* ── Consent bar ── */}
      <div className="bg-[#1a2d5a]/40 border-y border-[#c9a46e]/12 py-2.5">
        <p className="text-center text-white/30 text-[11px] tracking-[0.15em] uppercase">
          All photographs displayed with full informed written patient consent · Individual results may vary
        </p>
      </div>

      {/* ── Gallery section ── */}
      <section className="py-20 bg-[#faf9f7] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-250 ${
                    active
                      ? "bg-[#0d1b3e] text-white shadow-[0_4px_18px_rgba(13,27,62,0.22)]"
                      : "bg-white border border-[#0d1b3e]/12 text-[#0d1b3e]/45 hover:border-[#0d1b3e]/35 hover:text-[#0d1b3e] hover:shadow-sm"
                  }`}
                >
                  {cat}
                  <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold leading-none ${
                    active ? "bg-[#c9a46e] text-white" : "bg-[#0d1b3e]/8 text-[#0d1b3e]/40"
                  }`}>
                    {countFor(cat)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Count line */}
          <p className="text-center text-[#0d1b3e]/30 text-[11px] tracking-[0.18em] uppercase mb-12">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` · ${activeCategory}`}
          </p>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {filtered.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setLightboxIndex(idx)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#0d1b3e]/30 text-sm tracking-wider">No results in this category yet.</p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-20 pt-16 border-t border-[#0d1b3e]/8 text-center">
            <span className="gold-divider mx-auto mb-6" />
            <p className="font-[var(--font-heading)] text-[#0d1b3e] text-3xl md:text-4xl font-light mb-2">
              Ready for your transformation?
            </p>
            <p className="text-[#0d1b3e]/45 text-sm mb-8">
              Free consultations · No obligation · Personalized plan
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0d1b3e] hover:bg-[#060e1f] text-white font-semibold text-[11px] tracking-[0.18em] uppercase px-10 py-4 rounded-full transition-all duration-200 hover:shadow-[0_8px_30px_rgba(13,27,62,0.28)]"
            >
              Book Your Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length))}
          onNext={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length))}
        />
      )}
    </>
  );
}
