import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PostBody } from "@/components/PostBody";
import { getDictionary } from "@/content/get-dictionary";
import { formatDate, getPost, posts } from "@/content/posts";
import { isLocale, locales, type Locale } from "@/content/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(lang) || !post) return {};
  return {
    title: `${post.title} — ${getDictionary(lang).hero.name}`,
    description: post.summary,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog/${post.slug}/`])) },
    openGraph: { title: post.title, description: post.summary, type: "article", publishedTime: post.date },
  };
}

export default async function BlogPost({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(lang) || !post) notFound();
  const t = getDictionary(lang);
  const langNames = Object.fromEntries(locales.map((l) => [l, getDictionary(l).langName])) as Record<Locale, string>;

  return (
    <>
      <Header lang={lang} labels={t.nav} name={t.hero.name} langNames={langNames} path={`blog/${post.slug}/`} />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <Link href={`/${lang}/blog/`} className="text-sm font-medium text-accent hover:underline">
          {t.blog.back}
        </Link>
        {post.lang !== lang ? <p className="mt-6 rounded-md border border-border bg-card px-4 py-2 text-sm">{t.blog.otherLanguage}</p> : null}
        <article lang={post.lang} dir="ltr" className="mt-6">
          <p className="text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time> · {t.hero.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-lg text-muted">{post.summary}</p>
          <div className="mt-10">
            <PostBody body={post.body} />
          </div>
          <section aria-labelledby="sources-h" className="mt-12 border-t border-border pt-6">
            <h2 id="sources-h" className="text-sm font-semibold uppercase tracking-wide text-muted">
              {getDictionary(post.lang).blog.sources}
            </h2>
            <ul className="mt-3 space-y-1 text-sm">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {t.footer}
      </footer>
    </>
  );
}
