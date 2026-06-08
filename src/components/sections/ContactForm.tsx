"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, MapPin, Clock, Mail, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contactPage");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("nameError")),
        email: z.string().email(t("emailError")),
        phone: z.string().min(7, t("phoneError")),
        procedure: z.string().optional(),
        message: z.string().optional(),
      }),
    [t]
  );
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

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="gold-divider mx-auto mb-6" />
          <h1 className="font-heading text-6xl md:text-7xl text-white font-light mb-5">
            {t("heroTitle")}
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="gold-divider mb-5" />
              <h2 className="font-heading text-4xl text-navy font-light mb-2">
                {t("getInTouchTitle")}
              </h2>
              <p className="text-navy/55 leading-relaxed">
                {t("getInTouchDesc")}
              </p>
            </div>

            <div className="space-y-5">
              <a href="tel:+13052183513" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-navy/40 text-xs tracking-widest uppercase mb-0.5">{t("phoneLabel")}</p>
                  <p className="text-navy font-medium group-hover:text-gold transition-colors">(305) 218-3513</p>
                </div>
              </a>

              <a href="mailto:info@ycosmeticsurgery.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-navy/40 text-xs tracking-widest uppercase mb-0.5">{t("emailLabel")}</p>
                  <p className="text-navy font-medium group-hover:text-gold transition-colors">info@ycosmeticsurgery.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-navy/40 text-xs tracking-widest uppercase mb-0.5">{t("locationLabel")}</p>
                  <p className="text-navy">1255 W 46th St, Suite #6 &amp; 7A</p>
                  <p className="text-navy/60">Hialeah, FL 33012</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-navy/40 text-xs tracking-widest uppercase mb-0.5">{t("hoursLabel")}</p>
                  <p className="text-navy text-sm">{t("hoursWeekday")}</p>
                  <p className="text-navy text-sm">{t("hoursSaturday")}</p>
                  <p className="text-navy/50 text-sm">{t("hoursSunday")}</p>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-cream-dark h-64">
              <iframe
                src="https://maps.google.com/maps?q=1255+W+46th+St+Suite+6,+Hialeah,+FL+33012&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Your Cosmetic Surgery & SPA Location — 1255 W 46th St, Hialeah FL"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 border border-cream-dark shadow-[0_8px_40px_rgba(13,27,62,0.08)]">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gold/10 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={28} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-navy text-3xl mb-3">{t("thankYouTitle")}</h3>
                  <p className="text-navy/55 leading-relaxed max-w-sm mx-auto">
                    {t("thankYouMessage")}
                  </p>
                </div>
              ) : (
                <>
                  <span className="gold-divider mb-5" />
                  <h2 className="font-heading text-3xl text-navy font-light mb-1">
                    {t("formTitle")}
                  </h2>
                  <p className="text-navy/45 text-sm mb-7">
                    {t("formSubtitle")}
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-navy/60 uppercase tracking-widest mb-1.5">
                          {t("nameLabel")}
                        </label>
                        <input
                          {...register("name")}
                          placeholder={t("namePlaceholder")}
                          className="w-full bg-cream border border-cream-dark focus:border-gold rounded-lg px-4 py-3 text-navy placeholder-navy/30 text-sm outline-none transition-colors"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-navy/60 uppercase tracking-widest mb-1.5">
                          {t("phoneFormLabel")}
                        </label>
                        <input
                          {...register("phone")}
                          placeholder="(555) 000-0000"
                          type="tel"
                          className="w-full bg-cream border border-cream-dark focus:border-gold rounded-lg px-4 py-3 text-navy placeholder-navy/30 text-sm outline-none transition-colors"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-navy/60 uppercase tracking-widest mb-1.5">
                        {t("emailFormLabel")}
                      </label>
                      <input
                        {...register("email")}
                        placeholder="jane@email.com"
                        type="email"
                        className="w-full bg-cream border border-cream-dark focus:border-gold rounded-lg px-4 py-3 text-navy placeholder-navy/30 text-sm outline-none transition-colors"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-navy/60 uppercase tracking-widest mb-1.5">
                        {t("procedureLabel")}
                      </label>
                      <select
                        {...register("procedure")}
                        className="w-full bg-cream border border-cream-dark focus:border-gold rounded-lg px-4 py-3 text-navy/70 text-sm outline-none transition-colors appearance-none"
                      >
                        <option value="">{t("procedureDefault")}</option>
                        {procedureOptions.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-navy/60 uppercase tracking-widest mb-1.5">
                        {t("messageLabel")}
                      </label>
                      <textarea
                        {...register("message")}
                        placeholder={t("messagePlaceholder")}
                        rows={4}
                        className="w-full bg-cream border border-cream-dark focus:border-gold rounded-lg px-4 py-3 text-navy placeholder-navy/30 text-sm outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-navy hover:bg-navy-light text-white font-semibold text-sm tracking-[0.12em] uppercase py-4 rounded-lg transition-all duration-200 hover:shadow-[0_4px_20px_rgba(13,27,62,0.3)] disabled:opacity-60"
                    >
                      {loading ? t("submittingButton") : t("submitButton")}
                    </button>

                    <p className="text-navy/30 text-[11px] text-center leading-relaxed">
                      {t("formDisclaimer")}
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
