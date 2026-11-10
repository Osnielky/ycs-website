"use client";

import { useState, useEffect, useMemo, useRef, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod/mini"; // tree-shakable build: the full "zod" entry adds ~300 KB to the client bundle
import { X, Phone, Calendar, CheckCircle, Clock, ChevronLeft } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type Step = "choose" | "form" | "success";
type ApptType = "asap" | "scheduled";

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM",  "2:00 PM",  "3:00 PM",  "4:00 PM", "5:00 PM",
];

// YYYY-MM-DD in the visitor's own timezone (toISOString() would give the UTC date,
// which is already "tomorrow" during the Miami evening).
function localISODate(daysFromToday: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function formatDate(iso: string, locale: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat(locale, {
    weekday: "long", month: "long", day: "numeric",
  }).format(new Date(iso + "T12:00:00"));
}

type FormData = { name: string; phone: string };

const INPUT_CLASS =
  "w-full bg-[#faf9f7] border border-[#f0ece6] focus:border-[#c9a46e] rounded-lg px-4 py-3 text-[#0d1b3e] placeholder-[#0d1b3e]/30 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#c9a46e]/60 transition-colors";
const LABEL_CLASS =
  "block text-[10px] font-bold text-[#0d1b3e]/70 uppercase tracking-widest mb-1.5";

interface Props {
  procedure: string;
  onClose: () => void;
}

export default function ConsultationModal({ procedure, onClose }: Props) {
  const t = useTranslations("consultationModal");
  const locale = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef);

  const schema = useMemo(
    () =>
      z.object({
        name:  z.string().check(z.minLength(2, t("nameError"))),
        phone: z.string().check(z.minLength(7, t("phoneError"))),
      }),
    [t]
  );
  const [step,          setStep]          = useState<Step>("choose");
  const [apptType,      setApptType]      = useState<ApptType>("asap");
  const [selectedDate,  setSelectedDate]  = useState("");
  const [selectedTime,  setSelectedTime]  = useState("");
  const [loading,       setLoading]       = useState(false);
  const [serverError,   setServerError]   = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const bold = (chunks: ReactNode) => <strong className="text-[#0d1b3e]">{chunks}</strong>;

  function choose(type: ApptType) {
    setApptType(type);
    setStep("form");
  }

  async function onSubmit(data: FormData) {
    if (apptType === "scheduled" && !selectedDate) {
      setServerError(t("dateError"));
      return;
    }
    if (apptType === "scheduled" && !selectedTime) {
      setServerError(t("timeError"));
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:           data.name,
          phone:          data.phone,
          procedure,
          type:           apptType,
          scheduled_date: apptType === "scheduled" ? selectedDate : undefined,
          scheduled_time: apptType === "scheduled" ? selectedTime : undefined,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(typeof json.error === "string" ? json.error : t("genericError"));
      }

      setStep("success");
    } catch (err: unknown) {
      setServerError(err instanceof Error && err.message ? err.message : t("genericError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop — click to dismiss (Escape and the Close button cover keyboard) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#060e1f]/92 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        tabIndex={-1}
        className="relative z-10 w-full max-w-[440px] max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.45)] focus:outline-none"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#0d1b3e]/8 hover:bg-[#0d1b3e]/15 text-[#0d1b3e] transition-colors"
        >
          <X size={14} />
        </button>

        {/* ─── Step 1: Choose ─────────────────────────────────────── */}
        {step === "choose" && (
          <div className="p-8">
            <span className="gold-divider mb-5" />
            <p className="text-gold-deep text-[11px] tracking-[0.22em] uppercase font-semibold mb-1">
              {t("interestedIn")}
            </p>
            <h3 id="consult-title" className="font-heading text-[#0d1b3e] text-[1.75rem] font-light leading-tight mb-2">
              {procedure}
            </h3>
            <p className="text-[#0d1b3e]/70 text-sm mb-8 leading-relaxed">
              {t("chooseQuestion")}
            </p>

            {/* Option A — ASAP */}
            <button
              type="button"
              onClick={() => choose("asap")}
              className="w-full text-left rounded-xl border-2 border-[#0d1b3e]/10 hover:border-[#c9a46e] p-5 mb-4 transition duration-200 group hover:shadow-[0_4px_20px_rgba(201,164,110,0.15)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#0d1b3e] group-hover:bg-[#c9a46e] flex items-center justify-center shrink-0 transition-colors duration-200">
                  <Phone size={17} className="text-white" />
                </div>
                <div>
                  <p className="text-[#0d1b3e] font-semibold text-[15px] mb-1">
                    {t("asapTitle")}
                  </p>
                  <p className="text-[#0d1b3e]/70 text-sm leading-relaxed">
                    {t("asapDesc")}
                  </p>
                </div>
              </div>
            </button>

            {/* Option B — Scheduled */}
            <button
              type="button"
              onClick={() => choose("scheduled")}
              className="w-full text-left rounded-xl border-2 border-[#0d1b3e]/10 hover:border-[#c9a46e] p-5 transition duration-200 group hover:shadow-[0_4px_20px_rgba(201,164,110,0.15)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#0d1b3e] group-hover:bg-[#c9a46e] flex items-center justify-center shrink-0 transition-colors duration-200">
                  <Calendar size={17} className="text-white" />
                </div>
                <div>
                  <p className="text-[#0d1b3e] font-semibold text-[15px] mb-1">
                    {t("scheduledTitle")}
                  </p>
                  <p className="text-[#0d1b3e]/70 text-sm leading-relaxed">
                    {t("scheduledDesc")}
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* ─── Step 2: Form ──────────────────────────────────────── */}
        {step === "form" && (
          <>
            {/* Navy header */}
            <div className="bg-[#0d1b3e] px-7 py-6">
              <button
                type="button"
                onClick={() => setStep("choose")}
                className="flex items-center gap-1 text-white/65 hover:text-[#c9a46e] text-[11px] tracking-wider uppercase transition-colors mb-4"
              >
                <ChevronLeft size={12} /> {t("back")}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#c9a46e]/20 border border-[#c9a46e]/30 flex items-center justify-center shrink-0">
                  {apptType === "asap"
                    ? <Phone size={15} className="text-[#c9a46e]" />
                    : <Calendar size={15} className="text-[#c9a46e]" />
                  }
                </div>
                <div>
                  <p className="text-[#c9a46e] text-[10px] tracking-[0.2em] uppercase font-semibold">
                    {procedure}
                  </p>
                  <h3 id="consult-title" className="text-white font-heading text-xl font-light">
                    {apptType === "asap" ? t("asapHeading") : t("scheduledHeading")}
                  </h3>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-4" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="consult-name" className={LABEL_CLASS}>
                  {t("nameLabel")}
                </label>
                <input
                  {...register("name")}
                  id="consult-name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "consult-name-error" : undefined}
                  placeholder={t("namePlaceholder")}
                  className={INPUT_CLASS}
                />
                {errors.name && (
                  <p id="consult-name-error" role="alert" className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="consult-phone" className={LABEL_CLASS}>
                  {t("phoneLabel")}
                </label>
                <input
                  {...register("phone")}
                  id="consult-phone"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "consult-phone-error" : undefined}
                  placeholder={t("phonePlaceholder")}
                  type="tel"
                  className={INPUT_CLASS}
                />
                {errors.phone && (
                  <p id="consult-phone-error" role="alert" className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Date + Time — only for scheduled */}
              {apptType === "scheduled" && (
                <>
                  <div>
                    <label htmlFor="consult-date" className={LABEL_CLASS}>
                      {t("dateLabel")}
                    </label>
                    <input
                      id="consult-date"
                      name="scheduled_date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={localISODate(1)}
                      max={localISODate(30)}
                      className={INPUT_CLASS}
                    />
                  </div>

                  <div role="group" aria-labelledby="consult-time-label">
                    <p id="consult-time-label" className={`${LABEL_CLASS} mb-2`}>
                      {t("timeLabel")}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={selectedTime === slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`text-[11px] font-medium tabular-nums py-2.5 rounded-lg border transition-colors duration-150 ${
                            selectedTime === slot
                              ? "bg-[#0d1b3e] text-white border-[#0d1b3e]"
                              : "bg-[#faf9f7] border-[#f0ece6] text-[#0d1b3e]/70 hover:border-[#0d1b3e]/40 hover:text-[#0d1b3e]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {serverError && (
                <p role="alert" className="text-red-700 text-sm text-center bg-red-50 rounded-lg py-2 px-3">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a46e] hover:bg-[#a87d45] text-navy-dark font-bold text-[11px] tracking-[0.18em] uppercase py-4 rounded-lg transition duration-200 hover:shadow-[0_4px_20px_rgba(201,164,110,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? t("submitting")
                  : apptType === "asap"
                    ? t("submitAsap")
                    : t("submitScheduled")
                }
              </button>

              <p className="text-[#0d1b3e]/70 text-[10px] text-center leading-relaxed">
                {t("privacy")}
              </p>
            </form>
          </>
        )}

        {/* ─── Step 3: Success ─────────────────────────────────────── */}
        {step === "success" && (
          <div className="p-8 text-center" role="status">
            <div className="w-16 h-16 bg-[#c9a46e]/12 border-2 border-[#c9a46e] rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={28} className="text-[#c9a46e]" />
            </div>

            <h3 id="consult-title" className="font-heading text-[#0d1b3e] text-[1.75rem] font-light mb-3">
              {t("successTitle")}
            </h3>

            {apptType === "asap" ? (
              <p className="text-[#0d1b3e]/70 leading-relaxed mb-6 text-sm">
                {t.rich("successAsap", { procedure, b: bold })}
              </p>
            ) : (
              <p className="text-[#0d1b3e]/70 leading-relaxed mb-6 text-sm">
                {t.rich("successScheduled", {
                  procedure,
                  date: formatDate(selectedDate, locale),
                  time: selectedTime,
                  b: bold,
                })}
              </p>
            )}

            {/* Summary card */}
            <div className="bg-[#faf9f7] rounded-xl p-4 mb-6 text-left space-y-2.5 border border-[#f0ece6]">
              <div className="flex items-center gap-2.5 text-[#0d1b3e]/70 text-sm">
                {apptType === "asap"
                  ? <Phone size={13} className="text-[#c9a46e] shrink-0" />
                  : <Calendar size={13} className="text-[#c9a46e] shrink-0" />
                }
                <span>
                  {apptType === "asap"
                    ? t("callingShortly")
                    : `${formatDate(selectedDate, locale)} · ${selectedTime}`
                  }
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[#0d1b3e]/70 text-sm">
                <Clock size={13} className="text-[#c9a46e] shrink-0" />
                <span>{procedure}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#0d1b3e] hover:bg-[#060e1f] text-white font-bold text-[11px] tracking-[0.18em] uppercase py-4 rounded-lg transition-colors"
            >
              {t("close")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
