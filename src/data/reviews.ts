/**
 * Single source of truth for the public review figures shown on the site and in
 * structured data. These MUST match the live Google Business Profile — inflated
 * or stale numbers can cost the review rich result and are an advertising risk.
 *
 * Verified against the Google Places API (/api/google-reviews) on 2026-11-11.
 * Update both numbers together whenever you refresh them.
 */
export const googleReviews = {
  rating: 4.6,
  count: 235,
  asOf: "2026-11-11",
  url: "https://maps.app.goo.gl/ttj7tm52qumTJfjm6",
} as const;

/**
 * Opens the "write a review" form for the clinic's Google Business Profile.
 * ycosmeticsurgery.com/review redirects here (see next.config.ts), and the QR
 * code on the front-desk card in docs/review-card encodes this same address.
 */
export const googleWriteReviewUrl =
  "https://search.google.com/local/writereview?placeid=ChIJyUDR1PC62YgRMoDzH4ajK4M";

/** Rating formatted with one decimal, e.g. "4.6" */
export const googleRatingLabel = googleReviews.rating.toFixed(1);
