"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowDown, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  procedure: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const procedures = [
  "Breast Augmentation",
  "Tummy Tuck",
  "Rhinoplasty",
  "Liposuction",
  "Brazilian Butt Lift",
  "Facelift",
  "Mommy Makeover",
  "Botox & Fillers",
  "Other / Not sure",
];

/* ── Add more images to public/hero/ as 2.jpg, 3.jpg … to extend the slideshow ── */
const slides = [
  { src: "/hero/1.jpg", position: "center center" },
  { src: "/hero/2.jpg", position: "center 25%" },
  { src: "/hero/3.jpg", position: "center 15%" },
  { src: "/hero/4.webp", position: "center 20%" },
  { src: "/hero/5.jpg", position: "center 18%" },
  { src: "/hero/6.jpg", position: "center 20%" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const timer = setInterval(() => {
      // Functional update: `c` is always the latest value, no stale closure
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % slides.length;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []); // Empty deps: interval is created once, never re-created

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Slideshow background — only render current + prev + next ── */}
      {slides.map((slide, i) => {
        const next = (current + 1) % slides.length;
        const isVisible = i === current || i === prev;
        const isPreload = i === next;
        if (!isVisible && !isPreload) return null;
        return (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 1 : 0,
              "--hero-pos": slide.position,
            } as React.CSSProperties}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              className="object-cover hero-slide-img"
              sizes="100vw"
              quality={75}
            />
          </div>
        );
      })}

      {/* ── Overlays ── */}
      {/* Mobile: top-to-bottom dark overlay so text is always legible */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-navy-dark/80 via-navy-dark/60 to-navy-dark/80 md:hidden" />
      {/* Desktop: left-to-right gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-dark/90 via-navy-dark/60 to-navy-dark/20 hidden md:block" />
      {/* Bottom fade — both */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-dark/80 via-transparent to-navy-dark/30" />

      {/* Slide indicator dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i); }}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-gold" : "w-3 bg-white/35"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 pt-28 pb-16 md:pt-36 md:pb-24 grid lg:grid-cols-2 gap-10 md:gap-12 items-center w-full">

        {/* Left: copy */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/8 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-white/80 text-xs tracking-wider">
              4.9 · 500+ Verified Patient Reviews · Miami, FL
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-white leading-[1.05] mb-6">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light">
              Trusted Plastic
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light">
              Surgeons in{" "}
              <em className="not-italic text-gold">Miami</em>
            </span>
          </h1>

          {/* Divider */}
          <span className="gold-divider mb-6" />

          {/* Sub */}
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg font-sans">
            Expert cosmetic surgery services for stunning transformations.
            Board-certified surgeons with 20+ years of experience, flexible
            financing, and free consultations. Serving Hialeah and all of South Florida.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-white font-semibold text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_30px_rgba(201,164,110,0.5)]"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center border border-white/30 hover:border-gold text-white hover:text-gold text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-full transition-all duration-200"
            >
              View Our Results
            </Link>
          </div>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="tel:+13052183513"
              className="inline-flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-sm"
            >
              <Phone size={14} />
              <span>Or call us: (305) 218-3513</span>
            </a>
            <span className="hidden sm:block text-white/20">|</span>
            <a
              href="https://wa.me/13052183513"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#25D366] transition-colors text-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right: Lead form card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-3xl" />
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-[0_20px_60px_rgba(6,14,31,0.6)]">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gold/20 border border-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-2xl">✓</span>
                </div>
                <h3 className="font-heading text-white text-2xl mb-2">Thank You!</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We&apos;ve received your request and will contact you within 24 hours to schedule your free consultation.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="gold-divider mb-3" />
                  <h2 className="font-heading text-white text-2xl font-light">Free Consultation</h2>
                  <p className="text-white/50 text-sm mt-1">No obligation · Private · Personalized</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Your Full Name"
                      className="w-full bg-white/10 border border-white/25 focus:border-gold rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none transition-colors"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <input
                      {...register("phone")}
                      placeholder="Phone Number"
                      type="tel"
                      className="w-full bg-white/10 border border-white/25 focus:border-gold rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm outline-none transition-colors"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <select
                      {...register("procedure")}
                      className="w-full bg-white/10 border border-white/25 focus:border-gold rounded-lg px-4 py-3 text-white/70 text-sm outline-none transition-colors appearance-none"
                    >
                      <option value="" className="bg-navy text-white">Procedure of Interest (optional)</option>
                      {procedures.map((p) => (
                        <option key={p} value={p} className="bg-navy text-white">{p}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold hover:bg-gold-dark text-white font-semibold text-sm tracking-[0.1em] uppercase py-3.5 rounded-lg transition-all duration-200 hover:shadow-[0_4px_20px_rgba(201,164,110,0.5)] disabled:opacity-60"
                  >
                    {loading ? "Sending…" : "Request My Free Consultation"}
                  </button>

                  <p className="text-white/30 text-[11px] text-center leading-relaxed">
                    By submitting, you agree to receive a call or text from our team. We never share your information.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-8 z-20 flex flex-col items-center gap-1 animate-bounce">
        <ArrowDown size={16} className="text-white/30" />
      </div>
    </section>
  );
}
