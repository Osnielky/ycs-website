"use client";

import { useState } from "react";

interface TransformImageProps {
  src: string;
  alt: string;
  badge: string;
  placeholder: string;
}

export default function TransformImage({ src, alt, badge, placeholder }: TransformImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-cream-dark bg-gradient-to-br from-navy-light to-navy">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 hero-pattern text-center px-3">
          <span className="font-heading text-3xl text-gold/70">{badge}</span>
          <span className="text-white/30 text-[11px] tracking-[0.2em] uppercase">{placeholder}</span>
        </div>
      )}
      <span className="absolute top-3 left-3 rounded-full bg-navy/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-gold">
        {badge}
      </span>
    </div>
  );
}
