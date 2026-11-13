import { existsSync } from "node:fs";
import { join } from "node:path";
import type { BlogPost } from "@/data/blog";
import { procedures } from "@/data/procedures";

/** Server-only helpers for the blog pages (they read /public at build time). */

/** Card photo of the first related procedure that has one, or null. */
export function coverImage(post: BlogPost): string | null {
  if (post.coverProcedure === null) return null;
  const candidates = post.coverProcedure
    ? [post.coverProcedure, ...post.relatedProcedures]
    : post.relatedProcedures;
  for (const slug of candidates) {
    const path = `/procedures/${slug}.webp`;
    if (existsSync(join(process.cwd(), "public", path))) return path;
  }
  return null;
}

/** Related procedures that exist, with their name in the page language. */
export function relatedProcedureLinks(post: BlogPost, locale: string): { slug: string; name: string }[] {
  return post.relatedProcedures.flatMap((slug) => {
    const p = procedures.find((x) => x.slug === slug);
    return p ? [{ slug, name: (locale === "es" && p.es?.name) || p.name }] : [];
  });
}

export function formatDate(iso: string, locale: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export const blogUi = {
  en: {
    home: "Home",
    blog: "Blog",
    eyebrow: "Patient Guides",
    indexTitle: "Cosmetic Surgery Blog",
    indexIntro:
      "Plain answers to the questions patients ask us most: how procedures compare, what recovery is really like and what things cost in Miami.",
    metaTitle: "Cosmetic Surgery Blog: Guides for Miami Patients",
    metaDescription:
      "Patient guides from Your Cosmetic Surgery & SPA in Hialeah: procedure comparisons, recovery timelines, costs in Miami and how to prepare for surgery.",
    readArticle: "Read article",
    minRead: "min read",
    published: "Published",
    updated: "Updated",
    by: "By the Your Cosmetic Surgery & SPA team",
    reviewedBy: "Medically reviewed by",
    takeaways: "Key Takeaways",
    faqs: "Common Questions",
    relatedProcedures: "Related Procedures",
    moreArticles: "More Guides",
    disclaimer:
      "This article is general information, not medical advice. Every procedure carries risks and results vary from person to person. Whether a procedure is right for you is confirmed at an in-person consultation.",
    ctaHeading: "Have Questions About Your Own Case?",
    ctaBody: "Consultations are free and private, in English or Spanish.",
    ctaButton: "Book Free Consultation",
    call: "Call (305) 218-3513",
  },
  es: {
    home: "Inicio",
    blog: "Blog",
    eyebrow: "Guías para Pacientes",
    indexTitle: "Blog de Cirugía Cosmética",
    indexIntro:
      "Respuestas claras a las preguntas que más nos hacen los pacientes: cómo se comparan los procedimientos, cómo es realmente la recuperación y cuánto cuestan en Miami.",
    metaTitle: "Blog de Cirugía Cosmética: Guías para Pacientes en Miami",
    metaDescription:
      "Guías para pacientes de Your Cosmetic Surgery & SPA en Hialeah: comparaciones de procedimientos, recuperación, costos en Miami y cómo prepararse para la cirugía.",
    readArticle: "Leer artículo",
    minRead: "min de lectura",
    published: "Publicado",
    updated: "Actualizado",
    by: "Por el equipo de Your Cosmetic Surgery & SPA",
    reviewedBy: "Revisado médicamente por el",
    takeaways: "Puntos Clave",
    faqs: "Preguntas Frecuentes",
    relatedProcedures: "Procedimientos Relacionados",
    moreArticles: "Más Guías",
    disclaimer:
      "Este artículo es información general, no un consejo médico. Todo procedimiento conlleva riesgos y los resultados varían de una persona a otra. La idoneidad de un procedimiento para usted se confirma en una consulta en persona.",
    ctaHeading: "¿Tiene Preguntas Sobre Su Caso?",
    ctaBody: "Las consultas son gratuitas y privadas, en inglés o español.",
    ctaButton: "Reservar Consulta Gratis",
    call: "Llamar al (305) 218-3513",
  },
} as const;
