import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { alternatesFor, openGraph, ogImage, canonicalUrl, BASE_URL } from "@/lib/seo";
import { blogPosts, blogCategoryLabels, getBlogPost, readingMinutes } from "@/data/blog";
import { blogUi, coverImage, formatDate, relatedProcedureLinks } from "@/lib/blog";
import { SURGEON_NAME, SURGEON_SLUG } from "@/data/surgeon";
import BlogCard from "@/components/sections/BlogCard";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// Only the articles registered in src/data/blog.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "es"].flatMap((locale) => blogPosts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const c = locale === "es" ? post.es : post.en;
  const path = `/blog/${post.slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: alternatesFor(path, locale),
    openGraph: {
      ...openGraph({
        path,
        locale,
        title: c.title,
        description: c.metaDescription,
        image: ogImage(c.title),
      }),
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(slug);
  if (!post) notFound();

  const lang = locale === "es" ? "es" : "en";
  const c = post[lang];
  const ui = blogUi[lang];
  const url = canonicalUrl(`/blog/${post.slug}`, locale);
  const cover = coverImage(post);
  const related = relatedProcedureLinks(post, locale);
  const modified = post.updatedAt ?? post.publishedAt;

  // Other guides: same category first, then the rest, newest first.
  const more = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) - Number(a.category === post.category) ||
        b.publishedAt.localeCompare(a.publishedAt),
    )
    .slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      headline: c.title,
      description: c.metaDescription,
      inLanguage: lang,
      datePublished: post.publishedAt,
      dateModified: modified,
      image: `${BASE_URL}${cover ?? "/og-image.png"}`,
      author: { "@id": `${BASE_URL}/#organization` },
      // Shown on the page as "Medically reviewed by".
      editor: { "@type": "Person", "@id": `${BASE_URL}/${SURGEON_SLUG}#person`, name: SURGEON_NAME, url: `${BASE_URL}/${SURGEON_SLUG}` },
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: ui.home, item: canonicalUrl("", locale) },
        { "@type": "ListItem", position: 2, name: ui.blog, item: canonicalUrl("/blog", locale) },
        { "@type": "ListItem", position: 3, name: c.title, item: url },
      ],
    },
    ...(c.faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="relative bg-navy pt-36 pb-14 md:pb-16 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-40" />
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-white/65 text-xs tracking-wider mb-6">
            <Link href="/" className="hover:text-gold transition-colors">{ui.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-gold transition-colors">{ui.blog}</Link>
          </nav>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">{blogCategoryLabels[lang][post.category]}</p>
          <h1 className="font-heading text-4xl md:text-6xl text-white font-light leading-tight mb-6 text-balance">{c.title}</h1>
          <p className="text-white/85 text-sm mb-2">
            {ui.reviewedBy}{" "}
            <Link href={`/${SURGEON_SLUG}`} className="text-gold-light underline underline-offset-4 hover:text-gold transition-colors">
              {SURGEON_NAME}
            </Link>
          </p>
          <p className="text-white/65 text-sm">
            {ui.by}
            <span aria-hidden="true"> · </span>
            {post.updatedAt ? ui.updated : ui.published}{" "}
            <time dateTime={modified}>{formatDate(modified, locale)}</time>
            <span aria-hidden="true"> · </span>
            {readingMinutes(c)} {ui.minRead}
          </p>
        </div>
      </section>

      {/* Article */}
      <article className="py-14 md:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-5 text-navy/85 text-lg leading-relaxed mb-10">
            {c.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <aside className="bg-white border border-cream-dark border-l-4 border-l-gold rounded-xl p-6 md:p-7 mb-12">
            <h2 className="text-gold-deep text-xs tracking-[0.3em] uppercase font-semibold mb-4">{ui.takeaways}</h2>
            <ul className="space-y-3">
              {c.keyTakeaways.map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy/80 leading-relaxed">
                  <Check size={18} aria-hidden="true" className="text-gold-deep mt-1 shrink-0" />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="space-y-12">
            {c.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-heading text-3xl md:text-4xl text-navy font-light mb-4 text-balance">{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="text-navy/75 leading-relaxed mb-4">{p}</p>
                ))}
                {s.list && (
                  <ul className="space-y-3 mb-4">
                    {s.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-navy/75 leading-relaxed">
                        <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div
                    className="overflow-x-auto rounded-xl border border-cream-dark bg-white mt-6"
                    role="region"
                    aria-label={s.table.caption}
                    tabIndex={0}
                  >
                    <table className="w-full min-w-[34rem] text-left text-sm">
                      <caption className="sr-only">{s.table.caption}</caption>
                      <thead>
                        <tr className="bg-navy text-white">
                          {s.table.headers.map((h, i) => (
                            <th key={i} scope="col" className="px-4 py-3 font-semibold align-bottom">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, r) => (
                          <tr key={r} className="border-t border-cream-dark align-top">
                            {row.map((cell, i) =>
                              i === 0 ? (
                                <th key={i} scope="row" className="px-4 py-3 font-semibold text-navy bg-cream/60">{cell}</th>
                              ) : (
                                <td key={i} className="px-4 py-3 text-navy/75 leading-relaxed tabular-nums">{cell}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {c.faqs.length > 0 && (
            <section className="mt-16">
              <span className="gold-divider mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl text-navy font-light mb-6">{ui.faqs}</h2>
              <div className="space-y-3">
                {c.faqs.map((f) => (
                  <details key={f.q} className="group bg-white rounded-xl border border-cream-dark">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 text-navy font-medium">
                      {f.q}
                      <span aria-hidden="true" className="text-gold-deep text-xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-navy/75 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="text-gold-deep text-xs tracking-[0.3em] uppercase font-semibold mb-4">{ui.relatedProcedures}</h2>
              <div className="flex flex-wrap gap-2.5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/procedures/${p.slug}`}
                    className="inline-flex items-center gap-1.5 bg-white border border-cream-dark hover:border-gold text-navy text-sm px-4 py-2 rounded-full transition-colors"
                  >
                    {p.name} <ArrowRight size={13} aria-hidden="true" className="text-gold-deep" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <p className="mt-12 pt-6 border-t border-cream-dark text-navy/65 text-sm leading-relaxed">{ui.disclaimer}</p>
        </div>
      </article>

      {/* Call to action */}
      <section className="py-16 bg-navy relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="gold-divider mx-auto mb-5" />
          <h2 className="font-heading text-4xl md:text-5xl text-white font-light mb-3 text-balance">{ui.ctaHeading}</h2>
          <p className="text-white/70 mb-8">{ui.ctaBody}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-navy-dark font-semibold text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-full transition-colors"
            >
              {ui.ctaButton}
            </Link>
            <a
              href="tel:+13052183513"
              className="inline-flex items-center gap-2 text-white hover:text-gold text-sm tracking-wider transition-colors"
            >
              <Phone size={15} aria-hidden="true" /> {ui.call}
            </a>
          </div>
        </div>
      </section>

      {/* More guides */}
      {more.length > 0 && (
        <section className="py-16 md:py-20 bg-cream-dark">
          <div className="max-w-6xl mx-auto px-6">
            <span className="gold-divider mb-5" />
            <h2 className="font-heading text-4xl text-navy font-light mb-8">{ui.moreArticles}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {more.map((p) => (
                <BlogCard key={p.slug} post={p} locale={locale} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
