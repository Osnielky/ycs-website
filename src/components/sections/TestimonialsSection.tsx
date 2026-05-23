"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/procedures";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const visible = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  return (
    <section className="py-24 bg-navy relative overflow-hidden" id="testimonials">
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-5xl md:text-6xl text-white font-light mb-4">
            What Our Patients Say
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Our greatest achievement is the confidence we help restore. Here are
            a few of the stories our patients have shared.
          </p>
        </div>

        {/* Cards — desktop: 3 visible, mobile: 1 */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <div
              key={t.id + "-" + i}
              className={`bg-white/6 border border-white/10 rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                i === 0
                  ? "border-gold/30 bg-white/10"
                  : "opacity-80"
              }`}
            >
              <Quote size={28} className="text-gold/40 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} size={13} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gold text-xs tracking-wider mt-0.5">{t.procedure}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === index ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Rating summary */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-white font-semibold">4.9</span>
            <span className="text-white/40 text-sm">·</span>
            <span className="text-white/55 text-sm">500+ verified reviews</span>
            <span className="text-white/40 text-sm">·</span>
            <span className="text-white/55 text-sm">Google · RealSelf · Healthgrades</span>
          </div>
        </div>
      </div>
    </section>
  );
}
