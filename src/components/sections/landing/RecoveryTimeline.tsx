import type { LandingTimelineStage } from "@/data/landings";

interface RecoveryTimelineProps {
  heading: string;
  timeline: LandingTimelineStage[];
}

export default function RecoveryTimeline({ heading, timeline }: RecoveryTimelineProps) {
  if (timeline.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-light">{heading}</h2>
        </div>
        <ol className="relative border-l-2 border-gold/30 ml-3 space-y-10">
          {timeline.map((stage) => (
            <li key={stage.stage} className="relative pl-8">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gold ring-4 ring-white" />
              <p className="font-heading text-xl text-navy mb-1">{stage.stage}</p>
              <p className="text-navy/65 text-sm leading-relaxed">{stage.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
