import Link from "next/link";
import { tagLabel } from "@/content/posts";
import type { Locale } from "@/content/types";

/** Tag chips linking to /[lang]/blog/tag/[tag]/. */
export function TagList({ tags, lang, active }: { tags: string[]; lang: Locale; active?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" dir="ltr">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/${lang}/blog/tag/${tag}/`}
            aria-current={tag === active ? "page" : undefined}
            className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${
              tag === active
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            #{tagLabel(tag)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
