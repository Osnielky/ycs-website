"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <div className="flex items-center text-[12px] font-medium tracking-widest">
      <Link
        href={pathname}
        locale="en"
        className={`px-2 py-2 transition-colors ${
          locale === "en" ? "text-gold" : "text-white/65 hover:text-white"
        }`}
      >
        {t("langEn")}
      </Link>
      <span aria-hidden="true" className="text-white/20">|</span>
      <Link
        href={pathname}
        locale="es"
        className={`px-2 py-2 transition-colors ${
          locale === "es" ? "text-gold" : "text-white/65 hover:text-white"
        }`}
      >
        {t("langEs")}
      </Link>
    </div>
  );
}
