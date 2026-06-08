"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const procedureMenu = [
  {
    category: "Body",
    items: [
      { name: "Brazilian Butt Lift", slug: "brazilian-butt-lift" },
      { name: "Lipo 360", slug: "lipo-360" },
      { name: "Tummy Tuck", slug: "tummy-tuck" },
      { name: "Liposuction", slug: "liposuction" },
      { name: "Mommy Makeover", slug: "mommy-makeover" },
      { name: "Abdominal Etching", slug: "abdominal-etching" },
      { name: "Arm & Thigh Lift", slug: "arm-thigh-lift" },
    ],
  },
  {
    category: "Breast",
    items: [
      { name: "Breast Augmentation", slug: "breast-augmentation" },
      { name: "Breast Lift", slug: "breast-lift" },
      { name: "Breast Reduction", slug: "breast-reduction" },
      { name: "Gynecomastia", slug: "gynecomastia" },
    ],
  },
  {
    category: "Face",
    items: [
      { name: "Rhinoplasty", slug: "rhinoplasty" },
      { name: "Facelift", slug: "facelift" },
      { name: "Eyelid Surgery", slug: "eyelid-surgery" },
      { name: "Bichectomy", slug: "bichectomy" },
      { name: "Otoplasty", slug: "otoplasty" },
      { name: "Neck Lift", slug: "neck-lift" },
    ],
  },
  {
    category: "MedSpa",
    items: [
      { name: "Botox & Fillers", slug: "botox-fillers" },
      { name: "Laser Resurfacing", slug: "laser-resurfacing" },
      { name: "Microneedling", slug: "microneedling" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProc, setMobileProc] = useState(false);
  const t = useTranslations("nav");
  const catLabel: Record<string, string> = {
    Body: t("body"),
    Breast: t("breast"),
    Face: t("face"),
    MedSpa: t("medspa"),
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "navbar-scrolled" : "navbar-top"}`}
      >
        {/* Subtle radial spotlight from top-center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_50%_-20%,rgba(59,130,246,0.35),transparent)]" />
        {/* Gold shimmer line at bottom — only visible when scrolled */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent transition-opacity duration-500 ${scrolled ? "opacity-60" : "opacity-0"}`} />

        {/* Main navbar */}
        <nav className="relative max-w-7xl mx-auto px-8 py-7 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative shrink-0">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-20 h-20 rounded-full ring-2 ring-gold/40 overflow-hidden shadow-[0_0_24px_rgba(21,101,216,0.6),0_0_8px_rgba(201,164,110,0.3)] group-hover:ring-gold/70 transition-all duration-300">
                <Image
                  src="/Logo.jpg"
                  alt="Your Cosmetic Surgery & SPA"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full scale-110"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-[26px] text-white font-light tracking-[0.25em] leading-none group-hover:text-gold-light transition-colors duration-300">
                YCS
              </span>
              <span className="text-[9px] text-gold/75 tracking-[0.5em] uppercase leading-none mt-[6px]">
                Aesthetic Center
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden xl:flex items-center gap-7">
            {/* Procedures mega-menu */}
            <li
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-white/85 hover:text-gold text-[13px] font-medium tracking-widest uppercase transition-colors py-2">
                {t("procedures")}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Mega dropdown */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white border-t-2 border-gold shadow-[0_20px_60px_rgba(13,27,62,0.15)] rounded-b-xl transition-all duration-200 origin-top ${
                  dropdownOpen
                    ? "opacity-100 scale-y-100 pointer-events-auto"
                    : "opacity-0 scale-y-95 pointer-events-none"
                }`}
              >
                <div className="grid grid-cols-4 gap-0 p-6">
                  {procedureMenu.map((col, i) => (
                    <div
                      key={col.category}
                      className={`pr-5 ${i < 3 ? "border-r border-cream-dark" : ""}`}
                    >
                      <h4 className="font-heading text-navy text-[18px] font-semibold mb-3 pb-2 border-b border-gold/40">
                        {catLabel[col.category] ?? col.category}
                      </h4>
                      <ul className="space-y-1">
                        {col.items.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`/procedures/${item.slug}`}
                              className="text-[13px] text-navy/65 hover:text-gold transition-colors block py-0.5"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-3 bg-cream rounded-b-xl flex justify-between text-[12px]">
                  <Link
                    href="/procedures"
                    className="text-navy/55 hover:text-navy transition-colors"
                  >
                    {t("viewAllProcedures")}
                  </Link>
                  <Link
                    href="/gallery"
                    className="text-navy/55 hover:text-navy transition-colors"
                  >
                    {t("beforeAfterGallery")}
                  </Link>
                </div>
              </div>
            </li>

            {[
              { label: t("gallery"), href: "/gallery" },
              { label: t("about"), href: "/about" },
              { label: t("testimonials"), href: "/testimonials" },
              { label: t("contact"), href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/85 hover:text-gold text-[13px] font-medium tracking-widest uppercase transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <LanguageSwitcher />
            <a
              href="tel:+13052183513"
              className="hidden md:flex xl:hidden 2xl:flex items-center gap-1.5 text-gold hover:text-gold-light text-[13px] font-medium transition-colors"
            >
              <Phone size={13} />
              (305) 218-3513
            </a>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center whitespace-nowrap bg-gold hover:bg-gold-dark text-white text-[12px] font-semibold tracking-[0.15em] uppercase px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_20px_rgba(201,164,110,0.4)]"
            >
              {t("bookConsultation")}
            </Link>
            <button
              className="xl:hidden text-white/90 hover:text-gold transition-colors p-1"
              onClick={() => setMobileOpen(true)}
              aria-label={t("openMenu")}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-navy-dark/60 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-navy flex flex-col transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex flex-col leading-none">
              <span className="font-heading text-2xl text-white font-light tracking-[0.25em]">
                YCS
              </span>
              <span className="text-[9px] text-gold tracking-[0.4em] uppercase mt-1">
                Aesthetic Center
              </span>
            </div>
            <button
              className="text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          {/* Scrollable nav */}
          <nav className="flex-1 overflow-y-auto px-6 py-5 space-y-0">
            {/* Procedures accordion */}
            <button
              className="w-full flex items-center justify-between py-3.5 text-white text-lg font-heading border-b border-white/10"
              onClick={() => setMobileProc(!mobileProc)}
            >
              {t("procedures")}
              <ChevronDown
                size={16}
                className={`text-gold transition-transform duration-200 ${mobileProc ? "rotate-180" : ""}`}
              />
            </button>
            {mobileProc && (
              <div className="pl-2 pb-3">
                {procedureMenu.map((col) => (
                  <div key={col.category} className="mt-4">
                    <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold mb-2">
                      {catLabel[col.category] ?? col.category}
                    </p>
                    {col.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/procedures/${item.slug}`}
                        className="block py-1.5 text-white/70 hover:text-gold text-sm border-l-2 border-white/10 hover:border-gold pl-3 transition-all"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {[
              { label: t("gallery"), href: "/gallery" },
              { label: t("about"), href: "/about" },
              { label: t("testimonials"), href: "/testimonials" },
              { label: t("contact"), href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3.5 text-white text-lg font-heading border-b border-white/10 hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Panel footer */}
          <div className="px-6 py-6 border-t border-white/10 space-y-3">
            <div className="flex justify-center mb-2">
              <LanguageSwitcher />
            </div>
            <Link
              href="/contact"
              className="block w-full text-center bg-gold hover:bg-gold-dark text-white py-3.5 rounded-full text-sm font-semibold tracking-[0.15em] uppercase transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t("bookFreeConsultation")}
            </Link>
            <a
              href="tel:+13052183513"
              className="flex items-center justify-center gap-2 text-gold/80 hover:text-gold text-sm transition-colors"
            >
              <Phone size={14} />
              (305) 218-3513
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
