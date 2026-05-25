"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Phone, Calendar, CheckCircle, Clock, ChevronLeft } from "lucide-react";

type Step = "choose" | "form" | "success";
type ApptType = "asap" | "scheduled";

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM",  "2:00 PM",  "3:00 PM",  "4:00 PM", "5:00 PM",
];

function getTomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getMaxDateISO() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
}

const schema = z.object({
  name:  z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
});
type FormData = z.infer<typeof schema>;

interface Props {
  procedure: string;
  onClose: () => void;
}

export default function ConsultationModal({ procedure, onClose }: Props) {
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

  function choose(type: ApptType) {
    setApptType(type);
    setStep("form");
  }

  async function onSubmit(data: FormData) {
    if (apptType === "scheduled" && !selectedDate) {
      setServerError("Please select a date.");
      return;
    }
    if (apptType === "scheduled" && !selectedTime) {
      setServerError("Please select a time slot.");
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
        throw new Error(json.error ?? "Something went wrong");
      }

      setStep("success");
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#060e1f]/92 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-[440px] bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.45)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#0d1b3e]/8 hover:bg-[#0d1b3e]/15 text-[#0d1b3e] transition-colors"
        >
          <X size={14} />
        </button>

        {/* ─── Step 1: Choose ─────────────────────────────────────── */}
        {step === "choose" && (
          <div className="p-8">
            <span className="gold-divider mb-5" />
            <p className="text-[#c9a46e] text-[11px] tracking-[0.22em] uppercase font-semibold mb-1">
              Interested in
            </p>
            <h3 className="font-heading text-[#0d1b3e] text-[1.75rem] font-light leading-tight mb-2">
              {procedure}
            </h3>
            <p className="text-[#0d1b3e]/50 text-sm mb-8 leading-relaxed">
              How would you like to connect with our patient care team?
            </p>

            {/* Option A — ASAP */}
            <button
              onClick={() => choose("asap")}
              className="w-full text-left rounded-xl border-2 border-[#0d1b3e]/10 hover:border-[#c9a46e] p-5 mb-4 transition-all duration-200 group hover:shadow-[0_4px_20px_rgba(201,164,110,0.15)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#0d1b3e] group-hover:bg-[#c9a46e] flex items-center justify-center shrink-0 transition-colors duration-200">
                  <Phone size={17} className="text-white" />
                </div>
                <div>
                  <p className="text-[#0d1b3e] font-semibold text-[15px] mb-1">
                    Talk to a Coordinator Now
                  </p>
                  <p className="text-[#0d1b3e]/50 text-sm leading-relaxed">
                    A patient coordinator will call you within minutes to answer your questions.
                  </p>
                </div>
              </div>
            </button>

            {/* Option B — Scheduled */}
            <button
              onClick={() => choose("scheduled")}
              className="w-full text-left rounded-xl border-2 border-[#0d1b3e]/10 hover:border-[#c9a46e] p-5 transition-all duration-200 group hover:shadow-[0_4px_20px_rgba(201,164,110,0.15)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#0d1b3e] group-hover:bg-[#c9a46e] flex items-center justify-center shrink-0 transition-colors duration-200">
                  <Calendar size={17} className="text-white" />
                </div>
                <div>
                  <p className="text-[#0d1b3e] font-semibold text-[15px] mb-1">
                    Schedule a Virtual Appointment
                  </p>
                  <p className="text-[#0d1b3e]/50 text-sm leading-relaxed">
                    Pick a date and time — we&apos;ll call you for a personalized consultation.
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
                onClick={() => setStep("choose")}
                className="flex items-center gap-1 text-white/40 hover:text-[#c9a46e] text-[11px] tracking-wider uppercase transition-colors mb-4"
              >
                <ChevronLeft size={12} /> Back
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
                  <p className="text-white font-heading text-xl font-light">
                    {apptType === "asap" ? "Call Me Now" : "Schedule My Appointment"}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold text-[#0d1b3e]/55 uppercase tracking-widest mb-1.5">
                  Full Name *
                </label>
                <input
                  {...register("name")}
                  placeholder="Jane Doe"
                  className="w-full bg-[#faf9f7] border border-[#f0ece6] focus:border-[#c9a46e] rounded-lg px-4 py-3 text-[#0d1b3e] placeholder-[#0d1b3e]/30 text-sm outline-none transition-colors"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] font-bold text-[#0d1b3e]/55 uppercase tracking-widest mb-1.5">
                  Phone Number *
                </label>
                <input
                  {...register("phone")}
                  placeholder="(305) 000-0000"
                  type="tel"
                  className="w-full bg-[#faf9f7] border border-[#f0ece6] focus:border-[#c9a46e] rounded-lg px-4 py-3 text-[#0d1b3e] placeholder-[#0d1b3e]/30 text-sm outline-none transition-colors"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Date + Time — only for scheduled */}
              {apptType === "scheduled" && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-[#0d1b3e]/55 uppercase tracking-widest mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={getTomorrowISO()}
                      max={getMaxDateISO()}
                      className="w-full bg-[#faf9f7] border border-[#f0ece6] focus:border-[#c9a46e] rounded-lg px-4 py-3 text-[#0d1b3e] text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#0d1b3e]/55 uppercase tracking-widest mb-2">
                      Preferred Time *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`text-[11px] font-medium py-2.5 rounded-lg border transition-all duration-150 ${
                            selectedTime === slot
                              ? "bg-[#0d1b3e] text-white border-[#0d1b3e]"
                              : "bg-[#faf9f7] border-[#f0ece6] text-[#0d1b3e]/60 hover:border-[#0d1b3e]/40 hover:text-[#0d1b3e]"
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
                <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-2 px-3">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a46e] hover:bg-[#a87d45] text-white font-bold text-[11px] tracking-[0.18em] uppercase py-4 rounded-lg transition-all duration-200 hover:shadow-[0_4px_20px_rgba(201,164,110,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Submitting…"
                  : apptType === "asap"
                    ? "Request My Call"
                    : "Confirm My Appointment"
                }
              </button>

              <p className="text-[#0d1b3e]/30 text-[10px] text-center leading-relaxed">
                Your information is private and never shared. By submitting you consent to being contacted by our team.
              </p>
            </form>
          </>
        )}

        {/* ─── Step 3: Success ─────────────────────────────────────── */}
        {step === "success" && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#c9a46e]/12 border-2 border-[#c9a46e] rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={28} className="text-[#c9a46e]" />
            </div>

            <h3 className="font-heading text-[#0d1b3e] text-[1.75rem] font-light mb-3">
              You&apos;re all set!
            </h3>

            {apptType === "asap" ? (
              <p className="text-[#0d1b3e]/55 leading-relaxed mb-6 text-sm">
                A patient coordinator will call you <strong className="text-[#0d1b3e]">within minutes</strong> to discuss your {procedure} options and answer any questions you have.
              </p>
            ) : (
              <p className="text-[#0d1b3e]/55 leading-relaxed mb-6 text-sm">
                Your virtual appointment is confirmed. We&apos;ll call you on{" "}
                <strong className="text-[#0d1b3e]">{formatDate(selectedDate)}</strong> at{" "}
                <strong className="text-[#0d1b3e]">{selectedTime}</strong> to discuss your {procedure} goals.
              </p>
            )}

            {/* Summary card */}
            <div className="bg-[#faf9f7] rounded-xl p-4 mb-6 text-left space-y-2.5 border border-[#f0ece6]">
              <div className="flex items-center gap-2.5 text-[#0d1b3e]/60 text-sm">
                {apptType === "asap"
                  ? <Phone size={13} className="text-[#c9a46e] shrink-0" />
                  : <Calendar size={13} className="text-[#c9a46e] shrink-0" />
                }
                <span>
                  {apptType === "asap"
                    ? "Calling you shortly"
                    : `${formatDate(selectedDate)} · ${selectedTime}`
                  }
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[#0d1b3e]/60 text-sm">
                <Clock size={13} className="text-[#c9a46e] shrink-0" />
                <span>{procedure}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#0d1b3e] hover:bg-[#060e1f] text-white font-bold text-[11px] tracking-[0.18em] uppercase py-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
