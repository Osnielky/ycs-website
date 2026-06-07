import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function DoctorSection() {
  const t = await getTranslations("doctor");

  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden bg-navy-dark"
      aria-label="Meet Dr. Mario Reyes-Serrano"
    >
      {/* ── Operating room photo — left half background ── */}
      <div className="absolute inset-0 lg:w-[48%]">
        <Image
          src="/doctor-bg.png"
          alt="Dr. Mario Reyes-Serrano performing cosmetic surgery in Miami"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 48vw"
          quality={90}
        />
        {/* Gradient fade right → blends into dark panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-navy-dark/30 to-navy-dark" />
        {/* Top + bottom fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-navy-dark/20" />
      </div>

      {/* ── Content + portrait — right side ── */}
      <div className="relative z-10 w-full flex justify-end">
        <div className="w-full lg:w-[62%] xl:w-[58%]">

          {/* Bio text panel */}
          <div className="px-8 lg:px-12 xl:px-16 py-16">

            {/* Eyebrow */}
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4 font-sans">
              {t("eyebrow")}
            </p>

            {/* Heading */}
            <h2 className="font-heading text-white font-light leading-tight mb-4">
              <span className="block text-3xl md:text-4xl">{t("meetLabel")}</span>
              <span className="block text-5xl md:text-6xl xl:text-7xl italic text-gold">
                {t("name")}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-sans mb-6">
              {t("subtitle")}
            </p>

            {/* Gold divider */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold/30 mb-8" />

            {/* Bio */}
            <p className="text-white/70 text-base leading-relaxed mb-8 font-sans max-w-lg">
              {t("bio")}
            </p>

            {/* Credential logos */}
            <div className="flex flex-wrap items-center gap-10 mb-10">
              <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 60 60" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="30" cy="30" r="27" />
                  <circle cx="30" cy="30" r="20" />
                  <circle cx="30" cy="30" r="3" fill="currentColor" stroke="none" />
                </svg>
                <div className="text-center">
                  <p className="text-white text-[9px] tracking-[0.15em] uppercase leading-tight">American Society of</p>
                  <p className="text-white text-[9px] tracking-[0.15em] uppercase leading-tight">Plastic Surgeons</p>
                </div>
              </div>

              <div className="w-px h-14 bg-white/15" />

              <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 60 60" className="w-12 h-12 text-white" fill="currentColor">
                  <path d="M30 4 L33 22 L50 15 L37 28 L56 30 L37 32 L50 45 L33 38 L30 56 L27 38 L10 45 L23 32 L4 30 L23 28 L10 15 L27 22 Z" />
                </svg>
                <div className="text-center">
                  <p className="text-white text-[9px] tracking-[0.12em] uppercase leading-tight">American Board of</p>
                  <p className="text-white text-[9px] tracking-[0.12em] uppercase leading-tight">Plastic Surgery</p>
                </div>
              </div>
            </div>

            {/* Specialty badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              {([t("spec1"), t("spec2"), t("spec3"), t("spec4"), t("spec5")] as string[]).map((spec) => (
                <span
                  key={spec}
                  className="text-[11px] text-gold/80 border border-gold/25 rounded-full px-3 py-1 tracking-wide font-sans"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-white/40 hover:border-gold text-white hover:text-gold text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200"
              >
                {t("learnMore")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-white text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(201,164,110,0.4)]"
              >
                {t("bookConsultation")}
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
