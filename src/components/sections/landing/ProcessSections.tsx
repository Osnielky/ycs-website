import type { LandingProcessSection } from "@/data/landings";

interface ProcessSectionsProps {
  heading?: string;
  sections: LandingProcessSection[];
}

export default function ProcessSections({ heading, sections }: ProcessSectionsProps) {
  if (sections.length === 0) return null;

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-6">
        {heading && (
          <div className="mb-12">
            <span className="gold-divider mb-5" />
            <h2 className="font-heading text-4xl md:text-5xl text-navy font-light">{heading}</h2>
          </div>
        )}
        <div className="space-y-12">
          {sections.map((s, i) => (
            <article key={s.heading} className="relative pl-8 border-l-2 border-gold/30">
              <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-gold flex items-center justify-center text-navy text-xs font-bold">
                {i + 1}
              </span>
              <h3 className="font-heading text-2xl md:text-3xl text-navy mb-4">{s.heading}</h3>
              {s.body.split("\n\n").map((p, j) => (
                <p key={j} className="text-navy/70 leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
