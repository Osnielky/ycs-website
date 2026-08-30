import type { Metadata } from 'next';

export const BASE_URL = 'https://ycosmeticsurgery.com';

export const SITE_NAME = 'Your Cosmetic Surgery & SPA';
export const DEFAULT_OG_IMAGE = '/og-image.png';
const DEFAULT_OG_ALT = 'Your Cosmetic Surgery & SPA — Trusted Plastic Surgeons in Miami';

/** Normalize a locale-agnostic path to a leading-slash form ('' stays ''). */
function normalizePath(path: string): string {
  if (!path || path === '/') return '';
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Build the canonical URL for a given path + locale.
 * English (default locale) has no prefix; Spanish is served under /es.
 */
export function canonicalUrl(path: string, locale: string): string {
  const p = normalizePath(path);
  return locale === 'es' ? `${BASE_URL}/es${p}` : `${BASE_URL}${p || '/'}`;
}

/** hreflang language map for a path (same for every locale on the page). */
export function languageAlternates(path: string): Record<string, string> {
  const p = normalizePath(path);
  const enUrl = `${BASE_URL}${p || '/'}`;
  const esUrl = `${BASE_URL}/es${p}`;
  return {
    en: enUrl,
    es: esUrl,
    'x-default': enUrl,
  };
}

/**
 * Full `alternates` block for a page's Metadata.
 * Pass the locale-agnostic path ('' for home, '/about', '/procedures/bbl', …).
 */
export function alternatesFor(path: string, locale: string): {
  canonical: string;
  languages: Record<string, string>;
} {
  return {
    canonical: canonicalUrl(path, locale),
    languages: languageAlternates(path),
  };
}

/**
 * Complete OpenGraph block for a page.
 *
 * Next.js does NOT merge a nested `openGraph` with the root one — a page that
 * sets `openGraph` replaces it wholesale — so every page must emit the full set
 * (siteName, locale, type, url, images) or those tags silently disappear.
 */
export function openGraph(opts: {
  path: string;
  locale: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
}): NonNullable<Metadata['openGraph']> {
  return {
    type: opts.type ?? 'website',
    siteName: SITE_NAME,
    locale: opts.locale === 'es' ? 'es_ES' : 'en_US',
    url: canonicalUrl(opts.path, opts.locale),
    title: opts.title,
    description: opts.description,
    images: [
      {
        url: opts.image ?? DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: opts.imageAlt ?? DEFAULT_OG_ALT,
      },
    ],
  };
}

/** URL for the dynamic OG image, encoding a headline into the branded template. */
export function ogImage(title: string): string {
  return `/api/og?title=${encodeURIComponent(title)}`;
}

/** @deprecated use `alternatesFor` — kept for backwards compatibility. */
export function hreflangAlternates(path: string) {
  return {
    canonical: `${BASE_URL}${normalizePath(path)}`,
    languages: languageAlternates(path),
  };
}

/** @deprecated use `alternatesFor` — kept for backwards compatibility. */
export function hreflangAlternatesForLocale(path: string, locale: string) {
  return alternatesFor(path, locale);
}
