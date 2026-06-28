import TransformImage from "./TransformImage";
import type { LandingTransformation, LandingEducation } from "@/data/landings";

interface TransformationGalleryProps {
  heading: string;
  intro?: string;
  education?: LandingEducation;
  transformations: LandingTransformation[];
  labels: { before: string; during: string; after: string; placeholder: string };
  procedureName: string;
}

export default function TransformationGallery({
  heading,
  intro,
  education,
  transformations,
  labels,
  procedureName,
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

        {education && (
          <div className="max-w-5xl mx-auto mb-20">
            {/* What is / combined with — paired columns */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-16">
              <div>
                <span className="gold-divider mb-4" />
                <h3 className="font-heading text-2xl md:text-3xl text-navy font-light mb-3">
                  {education.title}
                </h3>
                <p className="text-navy/65 leading-relaxed">{education.body}</p>
              </div>
              <div>
                <span className="gold-divider mb-4" />
                <h3 className="font-heading text-2xl md:text-3xl text-navy font-light mb-3">
                  {education.combinedTitle}
                </h3>
                <p className="text-navy/65 leading-relaxed">{education.combinedBody}</p>
              </div>
            </div>

            {/* Three types */}
            <div className="text-center mb-10">
              <h3 className="font-heading text-3xl md:text-4xl text-navy font-light">
                {education.typesTitle}
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {education.types.map((type, i) => (
                <div
                  key={type.name}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-light to-navy-dark p-8 card-hover"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 right-4 font-heading text-7xl leading-none text-gold/15 select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="gold-divider mb-5" />
                  <h4 className="font-heading text-xl md:text-2xl text-gold mb-3">{type.name}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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
                      alt={`${s.badge} — real patient ${procedureName.toLowerCase()} result, ${t.label}, at Your Cosmetic Surgery & SPA in Miami`}
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
