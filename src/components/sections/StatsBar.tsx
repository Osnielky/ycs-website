"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function AnimatedNumber({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, value]);

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const t = useTranslations("stats");

  const stats = [
    { value: 20, suffix: "+", label: t("yearsExperience") },
    { value: 5000, suffix: "+", label: t("patientsTransformed") },
    { value: 98, suffix: "%", label: t("patientSatisfaction") },
    { value: 15, suffix: "+", label: t("proceduresOffered") },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-navy py-14 relative overflow-hidden"
    >
      {/* Subtle top/bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i < 3 ? "lg:border-r lg:border-white/10" : ""
              } px-4`}
            >
              <div className="font-heading text-4xl md:text-5xl text-gold font-light mb-2 leading-none">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  active={active}
                />
              </div>
              <span className="gold-divider mx-auto mb-3" />
              <p className="text-white/60 text-sm tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
