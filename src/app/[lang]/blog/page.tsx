import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { getDictionary } from "@/content/get-dictionary";
import { formatDate, sortedPosts } from "@/content/posts";
import { isLocale, locales, type Locale } from "@/content/types";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  const title = `${t.blog.heading} — ${t.hero.name}`;
  return {
    title,
    description: t.blog.intro,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog/`])) },
    openGraph: { title, description: t.blog.intro, type: "website" },
  };
}

export default async function BlogIndex({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const langNames = Object.fromEntries(locales.map((l) => [l, getDictionary(l).langName])) as Record<Locale, string>;

  return (
    <>
      <Header lang={lang} labels={t.nav} name={t.hero.name} langNames={langNames} path="blog/" />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-bold tracking-tight">{t.blog.heading}</h1>
        <p className="mt-2 text-muted">{t.blog.intro}</p>
        {sortedPosts.length === 0 ? (
          <p className="mt-10 text-muted">{t.blog.empty}</p>
        ) : (
          <ul className="mt-10 space-y-6">
            {sortedPosts.map((p) => (
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
                <Link
                  href={`/${lang}/blog/${p.slug}/`}
                  className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                >
                  {t.blog.readMore}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {t.footer}
      </footer>
    </>
  );
}
