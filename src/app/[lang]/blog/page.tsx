import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { getDictionary } from "@/content/get-dictionary";
import { PostList } from "@/components/PostList";
import { TagList } from "@/components/TagList";
import { allTags, sortedPosts } from "@/content/posts";
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
        <div className="mt-6">
          <TagList tags={allTags} lang={lang} />
        </div>
        <PostList posts={sortedPosts} lang={lang} t={t} />
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {t.footer}
      </footer>
    </>
  );
}
