import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternatesFor, openGraph, ogImage, canonicalUrl, BASE_URL } from "@/lib/seo";
import { blogPosts } from "@/data/blog";
import { blogUi } from "@/lib/blog";
import BlogCard from "@/components/sections/BlogCard";
import CTABanner from "@/components/sections/CTABanner";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ui = locale === "es" ? blogUi.es : blogUi.en;
  return {
    title: ui.metaTitle,
    description: ui.metaDescription,
    alternates: alternatesFor("/blog", locale),
    openGraph: openGraph({
      path: "/blog",
      locale,
      title: `${ui.metaTitle} | Your Cosmetic Surgery & SPA`,
      description: ui.metaDescription,
      image: ogImage(ui.indexTitle),
    }),
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "es" ? "es" : "en";
  const ui = blogUi[lang];
  const url = canonicalUrl("/blog", locale);

  const posts = [...blogPosts].sort((a, b) =>
    (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt),
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${url}#blog`,
      url,
      name: ui.indexTitle,
      description: ui.metaDescription,
      inLanguage: lang,
      publisher: { "@id": `${BASE_URL}/#organization` },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p[lang].title,
        url: canonicalUrl(`/blog/${p.slug}`, locale),
        datePublished: p.publishedAt,
        dateModified: p.updatedAt ?? p.publishedAt,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: ui.home, item: canonicalUrl("", locale) },
        { "@type": "ListItem", position: 2, name: ui.blog, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative bg-navy pt-36 pb-16 md:pb-20 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-40" />
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/65 text-xs tracking-wider mb-6">
            <Link href="/" className="hover:text-gold transition-colors">{ui.home}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold">{ui.blog}</span>
          </nav>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{ui.eyebrow}</p>
          <h1 className="font-heading text-5xl md:text-6xl text-white font-light mb-5 text-balance">{ui.indexTitle}</h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{ui.indexIntro}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
