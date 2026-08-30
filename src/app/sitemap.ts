import { MetadataRoute } from "next";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { procedures } from "@/data/procedures";
import { BASE_URL, languageAlternates } from "@/lib/seo";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

const PUBLIC_DIR = join(process.cwd(), "public");

/** Absolute URLs for any of `paths` that actually exist in /public. */
function existing(paths: string[]): string[] {
  return paths
    .filter((p) => existsSync(join(PUBLIC_DIR, p)))
    .map((p) => `${BASE_URL}${p}`);
}

/** Card photo + before/after pair for a procedure, when the files are present. */
function procedureImages(slug: string): string[] {
  return existing([
    `/procedures/${slug}.webp`,
    `/before-after/${slug}-before-surgery-miami.webp`,
    `/before-after/${slug}-after-surgery-miami.webp`,
  ]);
}

/** Every before/after photo, for the gallery entry. */
function galleryImages(): string[] {
  try {
    return readdirSync(join(PUBLIC_DIR, "before-after"))
      .filter((f) => /surgery-miami\.webp$/.test(f))
      .sort()
      .map((f) => `${BASE_URL}/before-after/${f}`);
  } catch {
    return [];
  }
}

/**
 * One sitemap entry per page, with hreflang alternates (en / es / x-default).
 * `path` is the locale-agnostic path ("" for home, "/about", …).
 */
function entry(
  path: string,
  opts: { changeFrequency: ChangeFreq; priority: number; images?: string[] },
): MetadataRoute.Sitemap {
  const langs = languageAlternates(path);
  const common = {
    lastModified: new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages: { en: langs.en, es: langs.es } },
    ...(opts.images && opts.images.length ? { images: opts.images } : {}),
  };
  return [
    { url: langs.en, ...common },
    { url: langs.es, ...common },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry("", { changeFrequency: "weekly", priority: 1.0 }),
    ...entry("/procedures", { changeFrequency: "monthly", priority: 0.9 }),
    ...entry("/contact", { changeFrequency: "monthly", priority: 0.9 }),
    ...entry("/gallery", { changeFrequency: "monthly", priority: 0.8, images: galleryImages() }),
    ...entry("/about", { changeFrequency: "monthly", priority: 0.7 }),
    ...entry("/testimonials", { changeFrequency: "monthly", priority: 0.7 }),
    ...procedures.flatMap((p) =>
      entry(`/procedures/${p.slug}`, {
        changeFrequency: "monthly",
        priority: 0.8,
        images: procedureImages(p.slug),
      }),
    ),
  ];
}
