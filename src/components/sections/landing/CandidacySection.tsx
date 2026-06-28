import { CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { LandingCandidacy } from "@/data/landings";

interface CandidacySectionProps {
  candidacy: LandingCandidacy;
  ctaLabel: string;
  phone: string;
}

export default function CandidacySection({ candidacy, ctaLabel, phone }: CandidacySectionProps) {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-30" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="gold-divider mx-auto mb-5" />
        <h2 className="font-heading text-4xl md:text-5xl text-white font-light mb-5">{candidacy.heading}</h2>
        <p className="text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">{candidacy.intro}</p>

        <ul className="text-left max-w-xl mx-auto space-y-3 mb-10">
          {candidacy.qualifies.map((q) => (
            <li key={q} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <CheckCircle size={18} className="text-gold mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm leading-relaxed">{q}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold text-sm tracking-[0.1em] uppercase px-8 py-4 rounded-lg transition-colors"
        >
          {ctaLabel}
        </Link>
        <p className="mt-4 text-white/40 text-sm">
          <a href="tel:+13052183513" className="text-gold hover:underline">
            {phone}
          </a>
        </p>
      </div>
    </section>
  );
}
