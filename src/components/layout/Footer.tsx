import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { MapPin, Clock, Mail, Star } from "lucide-react";
import FooterContactForm from "./FooterContactForm";

export default async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();

  const quickNav = [
    { label: t("navHome"), href: "/" },
    { label: t("navProcedures"), href: "/procedures" },
    { label: t("navGallery"), href: "/gallery" },
    { label: t("navAbout"), href: "/about" },
    { label: t("navTestimonials"), href: "/testimonials" },
    { label: t("navContact"), href: "/contact" },
  ];

  void locale;

  return (
    <footer>
      {/* ══════════════════════════════════════════════
          Full-viewport contact-footer  (Rosemont style)
      ══════════════════════════════════════════════ */}
      <div
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{
          backgroundImage: "url('/clinic-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundAttachment: "fixed",
        }}
      >
        {/* ── Overlay stack: dark at top, fades toward bottom ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/70 to-navy-dark/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/55 via-transparent to-navy-dark/55" />

        {/* ── Content wrapper ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">

          {/* ── Full-bleed top rule with centered clinic name ── */}
          <div className="flex items-center w-full mb-40 px-6 xl:px-12">
            <div className="flex-1 h-px bg-white/30" />
            <div className="flex items-center gap-4 mx-6 px-8 py-3 border border-white/25 bg-navy-dark/50">
              <div className="w-10 h-10 rounded-full ring-1 ring-gold/50 overflow-hidden shrink-0">
                <Image
                  src="/Logo.jpg"
                  alt="Your Cosmetic Surgery & SPA"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full scale-110"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-xl text-white tracking-[0.2em] font-light leading-none">YCS</span>
                <span className="text-[9px] text-gold/70 tracking-[0.35em] uppercase mt-[5px]">Your Cosmetic Surgery &amp; SPA</span>
              </div>
            </div>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          {/* ── Main grid inside max-w ── */}
          <div className="w-full max-w-screen-2xl mx-auto px-10 xl:px-20">

          {/* Three-column: info (with heading) | divider | FORM (center) | divider | nav */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,340px)_1px_1fr_1px_minmax(120px,160px)] gap-0">

            {/* ── COL 1: Heading + Contact info ── */}
            <div className="pr-0 lg:pr-14 pb-10 lg:pb-0 border-b border-white/10 lg:border-b-0 flex flex-col gap-5">

              {/* Heading */}
              <h2 className="font-heading text-4xl md:text-5xl xl:text-6xl text-white font-light leading-none mb-2 whitespace-nowrap">
                {t("contactUs").split(" ")[0]} <em className="text-gold">{t("contactUs").split(" ").slice(1).join(" ")}</em>
              </h2>

              {/* Big phone */}
              <div className="flex items-center gap-3">
                <div className="flex gap-2 text-white/35">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0-1.105.9-2 2.01-1.994l3.47.048a2 2 0 011.98 1.716l.43 3.225a2 2 0 01-1.222 2.104l-.837.355c-.132.056-.2.198-.15.332a12.087 12.087 0 006.193 6.193c.134.05.276-.018.332-.15l.355-.837a2 2 0 012.104-1.222l3.225.43A2 2 0 0121.75 18.27l-.048 3.47A2 2 0 0119.7 23.75C10.024 23.75.25 13.976.25 4.3a2 2 0 012.007-1.96z" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <a
                  href="tel:+13052183513"
                  className="font-heading text-4xl xl:text-5xl text-white hover:text-gold transition-colors tracking-wide"
                >
                  305.218.3513
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-base">Your Cosmetic Surgery &amp; SPA</p>
                  <p className="text-white/55 text-base">{t("address")}</p>
                  <p className="text-white/55 text-base">{t("city")}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-base">{t("officeHours")}</p>
                  <p className="text-white/55 text-base">{t("hoursWeekday")}</p>
                  <p className="text-white/55 text-base">{t("hoursSaturday")}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gold shrink-0" />
                <a href="mailto:info@ycosmeticsurgery.com"
                  className="text-white/55 text-base hover:text-gold transition-colors">
                  info@ycosmeticsurgery.com
                </a>
              </div>

              {/* Social row */}
              <div className="flex items-center gap-5 pt-1">
                <a href="https://www.instagram.com/yourcosmetic_surgery_spa" target="_blank" rel="noopener noreferrer"
                  className="text-white/45 hover:text-gold transition-colors" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@your.cosmetic_surgery" target="_blank" rel="noopener noreferrer"
                  className="text-white/45 hover:text-gold transition-colors" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.83a8.18 8.18 0 004.78 1.52V6.9a4.85 4.85 0 01-1.01-.21z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/yourcosmeticsurgeryspa/" target="_blank" rel="noopener noreferrer"
                  className="text-white/45 hover:text-gold transition-colors" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="text-white/45 hover:text-gold transition-colors" aria-label="X / Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="text-white/45 hover:text-gold transition-colors" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              {/* Star rating pill */}
              <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 w-fit">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-white/65 text-sm">{t("stars")}</span>
              </div>
            </div>

            {/* ── Divider 1 ── */}
            <div className="hidden lg:block self-stretch bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

            {/* ── COL 2: Form (CENTER) ── */}
            <div className="px-0 lg:px-16 py-12 lg:py-0 border-t border-white/10 lg:border-t-0 flex flex-col">
              <FooterContactForm />
            </div>

            {/* ── Divider 2 ── */}
            <div className="hidden lg:block self-stretch bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

            {/* ── COL 3: Quick nav ── */}
            <div className="hidden lg:flex flex-col pl-12 gap-6">
              {quickNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/45 hover:text-gold text-xs font-bold tracking-[0.22em] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          </div>{/* end max-w inner */}
        </div>{/* end content wrapper */}
      </div>{/* end bg */}

      {/* ── Gold bottom bar ── */}
      <div className="bg-gold">
        <div className="w-full px-10 xl:px-20 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-white/90">
          <p>© {new Date().getFullYear()} Your Cosmetic Surgery &amp; SPA. {t("copyright")}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">{t("privacyPolicy")}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t("termsOfService")}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t("accessibilityStatement")}</Link>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden bg-navy-dark border-t border-white/10">
        <Link href="/contact"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-white/65 hover:text-gold text-[10px] tracking-widest uppercase transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path strokeLinecap="round" d="M8 2v4M16 2v4M3 10h18" />
          </svg>
          {t("mobileBook")}
        </Link>
        <a href="tel:+13052183513"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-white/65 hover:text-gold text-[10px] tracking-widest uppercase transition-colors border-l border-r border-white/10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M2.25 6.338c0-1.105.9-2 2.01-1.994l3.47.048a2 2 0 011.98 1.716l.43 3.225a2 2 0 01-1.222 2.104l-.837.355c-.132.056-.2.198-.15.332a12.087 12.087 0 006.193 6.193c.134.05.276-.018.332-.15l.355-.837a2 2 0 012.104-1.222l3.225.43A2 2 0 0121.75 18.27l-.048 3.47A2 2 0 0119.7 23.75C10.024 23.75.25 13.976.25 4.3a2 2 0 012.007-1.96z" />
          </svg>
          {t("mobileCall")}
        </a>
        <a href="sms:+13052183513"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-white/65 hover:text-gold text-[10px] tracking-widest uppercase transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          {t("mobileText")}
        </a>
      </div>
    </footer>
  );
}
