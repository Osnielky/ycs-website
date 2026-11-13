import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { blogCategoryLabels, readingMinutes, type BlogPost } from "@/data/blog";
import { blogUi, coverImage, formatDate } from "@/lib/blog";

/** Article card used on the blog index, on articles and on procedure pages. */
export default function BlogCard({
  post,
  locale,
  headingLevel = "h2",
}: {
  post: BlogPost;
  locale: string;
  headingLevel?: "h2" | "h3";
}) {
  const lang = locale === "es" ? "es" : "en";
  const c = post[lang];
  const ui = blogUi[lang];
  const cover = coverImage(post);
  const Heading = headingLevel;

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl border border-cream-dark overflow-hidden card-hover">
      <div className="relative aspect-[16/10] bg-gradient-to-br from-navy to-navy-light overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 hero-pattern opacity-40" />
        )}
        <span className="absolute top-4 left-4 bg-navy/85 text-gold-light text-[11px] tracking-[0.2em] uppercase px-3 py-1 rounded-full">
          {blogCategoryLabels[lang][post.category]}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <p className="text-navy/60 text-xs tracking-wider mb-3">
          <time dateTime={post.updatedAt ?? post.publishedAt}>{formatDate(post.updatedAt ?? post.publishedAt, locale)}</time>
          <span aria-hidden="true"> · </span>
          {readingMinutes(c)} {ui.minRead}
        </p>
        <Heading className="font-heading text-2xl text-navy leading-snug mb-3 text-balance">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 hover:text-gold-deep transition-colors">
            {c.title}
          </Link>
        </Heading>
        <p className="text-navy/70 text-sm leading-relaxed mb-5">{c.excerpt}</p>
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 text-gold-deep text-xs font-semibold tracking-[0.15em] uppercase">
          {ui.readArticle}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </span>
      </div>
    </article>
  );
}
