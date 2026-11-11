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

/** Rating formatted with one decimal, e.g. "4.6" */
export const googleRatingLabel = googleReviews.rating.toFixed(1);
