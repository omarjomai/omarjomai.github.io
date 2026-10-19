import Link from "next/link";
import type { Dictionary, Locale } from "@/content/types";
import { formatDate, type Post } from "@/content/posts";
import { TagList } from "./TagList";

/** The list of post cards used on the blog index and tag pages. */
export function PostList({ posts, lang, t }: { posts: Post[]; lang: Locale; t: Dictionary }) {
  if (posts.length === 0) return <p className="mt-10 text-muted">{t.blog.empty}</p>;
  return (
    <ul className="mt-10 space-y-6">
      {posts.map((p) => (
        <li key={p.slug} className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted">
            <time dateTime={p.date}>{formatDate(p.date, lang)}</time>
            {p.lang !== lang ? <span> · {t.blog.otherLanguage}</span> : null}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight" lang={p.lang} dir="ltr">
            <Link href={`/${lang}/blog/${p.slug}/`} className="hover:text-accent">
              {p.title}
            </Link>
          </h2>
          <p className="mt-2 text-muted" lang={p.lang} dir="ltr">
            {p.summary}
          </p>
          <div className="mt-3">
            <TagList tags={p.tags} lang={lang} />
          </div>
          <Link href={`/${lang}/blog/${p.slug}/`} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
            {t.blog.readMore}
          </Link>
        </li>
      ))}
    </ul>
  );
}
