"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod/mini"; // tree-shakable build: the full "zod" entry adds ~300 KB to the client bundle
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FooterContactForm() {
  const t = useTranslations("footerForm");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const schema = useMemo(() => z.object({
    name: z.string().check(z.minLength(2, t("errorRequired"))),
    email: z.email(t("errorEmail")),
    phone: z.string().check(z.minLength(7, t("errorRequired"))),
    procedure: z.optional(z.string()),
    message: z.optional(z.string()),
    smsConsent: z.optional(z.boolean()),
  }), [t]);

  type FormData = z.infer<typeof schema>;

  const procedureOptions = t.raw("procedureOptions") as string[];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setSubmitError(false);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Lead request failed: ${res.status}`);
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
        <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center mb-5">
          <CheckCircle size={34} className="text-gold" />
        </div>
        <h3 className="font-heading text-white text-4xl mb-3">{t("thankYouTitle")}</h3>
        <p className="text-white/65 text-base max-w-xs leading-relaxed">
          {t("thankYouMessage")}
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-white/65 text-base mb-8">
        {t("intro")}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register("name")}
              placeholder={t("namePlaceholder")}
              aria-label={t("namePlaceholder")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "footer-name-error" : undefined}
              autoComplete="name"
              className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white placeholder-white/60 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold/60 transition-colors"
            />
            {errors.name && (
              <p id="footer-name-error" role="alert" className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("phone")}
              placeholder={t("phonePlaceholder")}
              aria-label={t("phonePlaceholder")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "footer-phone-error" : undefined}
              autoComplete="tel"
              type="tel"
              className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white placeholder-white/60 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold/60 transition-colors"
            />
            {errors.phone && (
              <p id="footer-phone-error" role="alert" className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              aria-label={t("emailPlaceholder")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "footer-email-error" : undefined}
              autoComplete="email"
              spellCheck={false}
              type="email"
              className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white placeholder-white/60 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold/60 transition-colors"
            />
            {errors.email && (
              <p id="footer-email-error" role="alert" className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <select
              {...register("procedure")}
              aria-label={t("procedurePlaceholder")}
              className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white/75 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold/60 transition-colors appearance-none"
            >
              <option value="" className="bg-navy">{t("procedurePlaceholder")}</option>
              {procedureOptions.map((p) => (
                <option key={p} value={p} className="bg-navy text-white">{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          aria-label={t("messagePlaceholder")}
          rows={4}
          className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white placeholder-white/60 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold/60 transition-colors resize-none"
        />

        {/* SMS consent */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            {...register("smsConsent")}
            className="mt-1 w-4 h-4 accent-gold shrink-0"
          />
          <span className="text-white/65 text-sm leading-relaxed">
            {t("smsConsent")}
          </span>
        </label>

        {submitError && (
          <p role="alert" className="text-red-300 text-sm bg-red-500/15 border border-red-400/30 rounded py-2 px-3">
            {t("submitError")}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-transparent border border-white/40 hover:border-gold text-white hover:text-gold text-sm font-bold tracking-[0.2em] uppercase px-10 py-3.5 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? t("submitting") : t("submit")}
        </button>
      </form>
    </>
  );
}
