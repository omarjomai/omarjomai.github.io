"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { locales, type Locale } from "@/content/types";

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const isDarkNow = () => document.documentElement.classList.contains("dark");
const isDarkOnServer = () => false;

type Props = {
  lang: Locale;
  labels: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
    blog: string;
    language: string;
    theme: string;
    skip: string;
  };
  name: string;
  langNames: Record<Locale, string>;
  /** Page path after the locale ("" for home, "blog/" for the blog); keeps the page when switching language. */
  path?: string;
};

export function Header({ lang, labels, name, langNames, path = "" }: Props) {
  const home = `/${lang}/`;
  // On the home page section links are plain anchors; elsewhere they point back to the home page.
  const sectionHref = (id: string) => (path ? `${home}#${id}` : `#${id}`);
  const dark = useSyncExternalStore(subscribeTheme, isDarkNow, isDarkOnServer);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  const links: [string, string][] = [
    ["about", labels.about],
    ["experience", labels.experience],
    ["projects", labels.projects],
    ["skills", labels.skills],
    ["contact", labels.contact],
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-background"
      >
        {labels.skip}
      </a>
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3">
        <a href={path ? home : "#top"} className="font-semibold tracking-tight">
          {name}
        </a>
        <nav aria-label="Main" className="ms-auto hidden md:block">
          <ul className="flex gap-5 text-sm text-muted">
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={sectionHref(id)} className="hover:text-foreground">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={`/${lang}/blog/`}
                aria-current={path.startsWith("blog/") ? "page" : undefined}
                className={path.startsWith("blog/") ? "text-foreground" : "hover:text-foreground"}
              >
                {labels.blog}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="ms-auto flex items-center gap-2 md:ms-4">
          <Link href={`/${lang}/blog/`} className="px-1 text-sm text-muted hover:text-foreground md:hidden">
            {labels.blog}
          </Link>
          <nav aria-label={labels.language}>
            <ul className="flex overflow-hidden rounded-md border border-border text-xs">
              {locales.map((l) => (
                <li key={l}>
                  <Link
                    href={`/${l}/${path}`}
                    hrefLang={l}
                    lang={l}
                    aria-current={l === lang ? "page" : undefined}
                    title={langNames[l]}
                    className={`block px-2.5 py-1.5 uppercase ${
                      l === lang ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={labels.theme}
            aria-pressed={dark}
            className="rounded-md border border-border p-1.5 text-muted hover:text-foreground"
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
