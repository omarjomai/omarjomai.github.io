import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PostList } from "@/components/PostList";
import { TagList } from "@/components/TagList";
import { getDictionary } from "@/content/get-dictionary";
import { allTags, sortedPosts, tagLabel } from "@/content/posts";
import { isLocale, locales, type Locale } from "@/content/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return allTags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/tag/[tag]">): Promise<Metadata> {
  const { lang, tag } = await params;
  if (!isLocale(lang) || !allTags.includes(tag)) return {};
  const t = getDictionary(lang);
  const title = `#${tagLabel(tag)} — ${t.blog.heading} — ${t.hero.name}`;
  return {
    title,
    description: t.blog.intro,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog/tag/${tag}/`])) },
  };
}

export default async function TagPage({ params }: PageProps<"/[lang]/blog/tag/[tag]">) {
  const { lang, tag } = await params;
  if (!isLocale(lang) || !allTags.includes(tag)) notFound();
  const t = getDictionary(lang);
  const langNames = Object.fromEntries(locales.map((l) => [l, getDictionary(l).langName])) as Record<Locale, string>;
  const tagged = sortedPosts.filter((p) => p.tags.includes(tag));

  return (
    <>
      <Header lang={lang} labels={t.nav} name={t.hero.name} langNames={langNames} path={`blog/tag/${tag}/`} />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-bold tracking-tight">
          {t.blog.heading}: <span dir="ltr">#{tagLabel(tag)}</span>
        </h1>
        <p className="mt-2 text-muted">
          {tagged.length} · {t.blog.intro}
        </p>
        <div className="mt-6">
          <TagList tags={allTags} lang={lang} active={tag} />
        </div>
        <PostList posts={tagged} lang={lang} t={t} />
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {t.footer}
      </footer>
    </>
  );
}
