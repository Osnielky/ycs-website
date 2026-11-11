/**
 * Thin wrapper around Google Analytics 4 (gtag). Every call is a no-op until
 * NEXT_PUBLIC_GA_ID is set at build time, so the site works identically without it.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

/**
 * A completed lead form. `generate_lead` is a GA4 recommended event — mark it
 * as a key event (conversion) in GA4 so leads can be attributed to pages and channels.
 *
 * Deliberately sends only which form was used. The procedure a visitor asked about
 * is health information and must never be sent to a third-party analytics service.
 */
export function trackLead(form: "hero" | "contact" | "footer" | "consultation_modal") {
  trackEvent("generate_lead", { form });
}
