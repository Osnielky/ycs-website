"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FooterContactForm() {
  const t = useTranslations("footerForm");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = useMemo(() => z.object({
    name: z.string().min(2, t("errorRequired")),
    email: z.string().email(t("errorEmail")),
    phone: z.string().min(7, t("errorRequired")),
    procedure: z.string().optional(),
    message: z.string().optional(),
    smsConsent: z.boolean().optional(),
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center mb-5">
          <CheckCircle size={34} className="text-gold" />
        </div>
        <h3 className="font-heading text-white text-4xl mb-3">{t("thankYouTitle")}</h3>
        <p className="text-white/50 text-base max-w-xs leading-relaxed">
          {t("thankYouMessage")}
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-white/55 text-base mb-8">
        {t("intro")}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register("name")}
              placeholder={t("namePlaceholder")}
              className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white placeholder-white/60 text-base outline-none transition-colors"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("phone")}
              placeholder={t("phonePlaceholder")}
              type="tel"
              className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white placeholder-white/60 text-base outline-none transition-colors"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              type="email"
              className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white placeholder-white/60 text-base outline-none transition-colors"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <select
              {...register("procedure")}
              className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white/75 text-base outline-none transition-colors appearance-none"
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
          rows={4}
          className="w-full bg-white/20 border border-white/40 focus:border-gold rounded px-4 py-3 text-white placeholder-white/60 text-base outline-none transition-colors resize-none"
        />

        {/* SMS consent */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            {...register("smsConsent")}
            className="mt-1 w-4 h-4 accent-gold shrink-0"
          />
          <span className="text-white/45 text-sm leading-relaxed">
            {t("smsConsent")}
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-transparent border border-white/40 hover:border-gold text-white hover:text-gold text-sm font-bold tracking-[0.2em] uppercase px-10 py-3.5 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? t("submitting") : t("submit")}
        </button>
      </form>
    </>
  );
}
