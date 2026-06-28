import TransformImage from "./TransformImage";
import type { LandingTransformation } from "@/data/landings";

interface TransformationGalleryProps {
  heading: string;
  intro?: string;
  transformations: LandingTransformation[];
  labels: { before: string; during: string; after: string; placeholder: string };
}

export default function TransformationGallery({
  heading,
  intro,
  transformations,
  labels,
}: TransformationGalleryProps) {
  if (transformations.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-light mb-4">{heading}</h2>
          {intro && <p className="text-navy/60 leading-relaxed">{intro}</p>}
        </div>

        <div className="space-y-12">
          {transformations.map((t) => {
            const stages = [
              { src: t.before, badge: labels.before },
              ...(t.during ? [{ src: t.during, badge: labels.during }] : []),
              { src: t.after, badge: labels.after },
            ];
            return (
              <div
                key={t.label}
                className="rounded-2xl bg-cream border border-cream-dark p-6 md:p-8 card-hover"
              >
                <p className="font-heading text-xl text-navy mb-5">{t.label}</p>
                <div className={`grid gap-4 ${stages.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                  {stages.map((s, i) => (
                    <TransformImage
                      key={i}
                      src={s.src}
                      alt={`${t.label} — ${s.badge}`}
                      badge={s.badge}
                      placeholder={labels.placeholder}
                    />
                  ))}
                </div>
                {t.note && <p className="text-navy/45 text-sm mt-5 italic">{t.note}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
