"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/procedures";
import { googleReviews } from "@/data/reviews";
import type { GoogleReview, ReviewsResponse } from "@/app/api/google-reviews/route";

// Deterministic color per reviewer name
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#4285f4,#34a853)",
  "linear-gradient(135deg,#ea4335,#fbbc05)",
  "linear-gradient(135deg,#9c27b0,#4285f4)",
  "linear-gradient(135deg,#00bcd4,#4285f4)",
  "linear-gradient(135deg,#ff5722,#ff9800)",
];

function avatarGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

// Fallback shape matching GoogleReview so rendering is unified
const fallbackReviews: GoogleReview[] = testimonials.map((t) => ({
  author_name: t.name,
  profile_photo_url: "",
  rating: t.rating,
  relative_time_description: "",
  text: t.text,
}));

function ReviewCard({
  review,
  active,
  ratingLabel,
}: {
  review: GoogleReview;
  active: boolean;
  ratingLabel: string;
}) {
  const initial = review.author_name.charAt(0).toUpperCase();
  const [imgError, setImgError] = useState(false);
  const showPhoto = !!review.profile_photo_url && !imgError;

  return (
    <div
      className={`bg-white/6 border rounded-2xl p-5 flex flex-col transition-[background-color,border-color,opacity] duration-300 ${
        active ? "border-gold/35 bg-white/10" : "border-white/10 opacity-80"
      }`}
    >
      {/* Header: avatar + meta + Google badge */}
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center border-2 overflow-hidden"
          style={{
            background: showPhoto ? "transparent" : avatarGradient(review.author_name),
            borderColor: "rgba(201,164,110,0.4)",
          }}
        >
          {showPhoto ? (
            <img
              src={review.profile_photo_url.replace(/=s\d+(?=-|$)/, "=s88")}
              alt=""
              width={44}
              height={44}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span aria-hidden="true" className="text-white font-bold text-base font-sans">{initial}</span>
          )}
        </div>

        {/* Name + stars + date */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm font-sans truncate">
            {review.author_name}
          </p>
          <div role="img" aria-label={ratingLabel} className="flex gap-0.5 my-0.5">
            {[...Array(Math.max(0, Math.round(review.rating)))].map((_, i) => (
              <Star key={i} size={11} className="fill-gold text-gold" />
            ))}
          </div>
          {review.relative_time_description && (
            <p className="text-white/65 text-xs font-sans">{review.relative_time_description}</p>
          )}
        </div>

        {/* Google verified badge */}
        {review.profile_photo_url && (
          <div className="flex-shrink-0 text-xs font-sans text-white/65 flex items-center gap-1">
            <GoogleLogo size={14} />
          </div>
        )}
      </div>

      {/* Quote */}
      <p className="text-white/70 text-sm leading-relaxed flex-1 italic">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}

function GoogleLogo({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Google"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  // Explicit locale so server and client format numbers identically
  const ratingFormat = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const countFormat = new Intl.NumberFormat(locale);
  const [index, setIndex] = useState(0);
  const [reviews, setReviews] = useState<GoogleReview[]>(fallbackReviews);
  const [meta, setMeta] = useState<{ rating: number; totalReviews: number }>({ rating: googleReviews.rating, totalReviews: googleReviews.count });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((r) => r.ok ? r.json() : null)
      .then((data: ReviewsResponse | null) => {
        if (data?.reviews?.length) {
          setReviews(data.reviews);
          setMeta({ rating: data.rating, totalReviews: data.totalReviews });
          setIsLive(true);
        }
      })
      .catch(() => {});
  }, []);

  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  const visible = [
    reviews[index],
    reviews[(index + 1) % reviews.length],
    reviews[(index + 2) % reviews.length],
  ];

  return (
    <section className="py-24 bg-navy relative overflow-hidden" id="testimonials">
      <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-5xl md:text-6xl text-white font-light mb-4">
            {t("heading")}
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            {isLive ? t("subheadingLive") : t("subheadingFallback")}
          </p>

          {/* Google verified pill */}
          {isLive && (
            <div className="inline-flex items-center gap-2 mt-4 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-sans text-white/65">
              <GoogleLogo size={13} />
              {t("verifiedBadge")}
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map((r, i) => (
            <ReviewCard
              key={r.author_name + i}
              review={r}
              active={i === 0}
              ratingLabel={t("ratingLabel", { rating: r.rating })}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/65 hover:border-gold hover:text-gold transition-colors"
            aria-label={t("prevLabel")}
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className="group px-2 py-3"
                aria-label={t("goToReview", { n: i + 1 })}
                aria-current={i === index ? "true" : undefined}
              >
                <span
                  className={`block h-2 rounded-full transition-[width,background-color] duration-200 ${
                    i === index ? "w-6 bg-gold" : "w-2 bg-white/25 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/65 hover:border-gold hover:text-gold transition-colors"
            aria-label={t("nextLabel")}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Rating summary */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 flex-wrap justify-center">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-white font-semibold tabular-nums">{ratingFormat.format(meta.rating)}</span>
            <span className="text-white/65 text-sm">·</span>
            <span className="text-white/65 text-sm">
              {countFormat.format(meta.totalReviews)}+ {t("verifiedReviews")}
            </span>
            <span className="text-white/65 text-sm">·</span>
            {isLive ? (
              <a
                href={googleReviews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/80 text-sm hover:text-gold transition-colors underline underline-offset-2"
              >
                {t("viewAllGoogle")}
              </a>
            ) : (
              <span className="text-white/65 text-sm">{t("platforms")}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
