/**
 * Blog content model and registry.
 *
 * Each article lives in its own file under src/data/blog/<slug>.ts and is
 * registered in `blogPosts` below. The index (/blog), the article pages
 * (/blog/[slug]) and the sitemap all derive from this array.
 *
 * Articles are medical information: only published prices (procedures.ts),
 * no guarantees, and no claims about the clinic or its surgeon that are not
 * already supported elsewhere on the site.
 */
import { BBL_VS_LIPO_360 } from "./blog/bbl-vs-lipo-360";
import { TUMMY_TUCK_RECOVERY_WEEK_BY_WEEK } from "./blog/tummy-tuck-recovery-week-by-week";
import { COSMETIC_SURGERY_COST_MIAMI } from "./blog/cosmetic-surgery-cost-miami";
import { BREAST_LIFT_VS_BREAST_AUGMENTATION } from "./blog/breast-lift-vs-breast-augmentation";
import { HOW_TO_PREPARE_FOR_COSMETIC_SURGERY } from "./blog/how-to-prepare-for-cosmetic-surgery";
import { BOTOX_VS_FILLERS } from "./blog/botox-vs-fillers";

export type BlogCategory = "body" | "breast" | "face" | "medspa" | "planning";

export interface BlogTable {
  /** Short caption read by screen readers and shown above the table. */
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface BlogSection {
  heading: string;
  /** Plain-text paragraphs. No markdown or HTML. */
  paragraphs?: string[];
  /** Bullet list shown after the paragraphs. */
  list?: string[];
  /** Comparison table shown after the paragraphs and list. */
  table?: BlogTable;
}

export interface BlogLocaleContent {
  /** H1 and card title. */
  title: string;
  /** <title> tag, at most about 60 characters, without the site name. */
  metaTitle: string;
  /** Meta description, 140-160 characters. */
  metaDescription: string;
  /** One or two sentences for the blog index card. */
  excerpt: string;
  /** Opening paragraphs before the first heading. */
  intro: string[];
  /** 3-5 short bullet points summarising the article. */
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: { q: string; a: string }[];
}

export interface BlogPost {
  slug: string;
  /** ISO date, e.g. "2026-11-13". */
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  /** Procedure slugs from procedures.ts, most relevant first. The first one supplies the cover image. */
  relatedProcedures: string[];
  /**
   * Procedure slug whose card photo is the cover, when the first related
   * procedure is not the right picture. `null` means no photo (pattern only).
   */
  coverProcedure?: string | null;
  en: BlogLocaleContent;
  es: BlogLocaleContent;
}

export const blogPosts: BlogPost[] = [
  BBL_VS_LIPO_360,
  TUMMY_TUCK_RECOVERY_WEEK_BY_WEEK,
  COSMETIC_SURGERY_COST_MIAMI,
  BREAST_LIFT_VS_BREAST_AUGMENTATION,
  HOW_TO_PREPARE_FOR_COSMETIC_SURGERY,
  BOTOX_VS_FILLERS,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogCategoryLabels: Record<"en" | "es", Record<BlogCategory, string>> = {
  en: { body: "Body", breast: "Breast", face: "Face", medspa: "Med Spa", planning: "Planning" },
  es: { body: "Cuerpo", breast: "Senos", face: "Rostro", medspa: "Med Spa", planning: "Planificación" },
};

/** Approximate reading time in minutes, from the article's word count. */
export function readingMinutes(c: BlogLocaleContent): number {
  const text = [
    ...c.intro,
    ...c.keyTakeaways,
    ...c.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.list ?? []),
      ...(s.table ? s.table.rows.flat() : []),
    ]),
    ...c.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}
