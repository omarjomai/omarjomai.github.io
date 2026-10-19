import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Noto_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { isLocale, locales } from "@/content/types";
import { getDictionary } from "@/content/get-dictionary";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const arabic = Noto_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/`])),
    },
    openGraph: { title: t.meta.title, description: t.meta.description, type: "profile" },
  };
}

// Applies the saved or system colour theme before first paint (no flash).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={t.dir}
      suppressHydrationWarning
      className={`${geist.variable} ${arabic.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
