import type { ReactNode } from "react";

// Renders inline `code` and [text](url) links; everything else is plain text.
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(
        <code key={`${keyBase}-${i++}`} className="rounded bg-card px-1 py-0.5 font-mono text-[0.9em]">
          {m[1]}
        </code>,
      );
    } else {
      out.push(
        <a key={`${keyBase}-${i++}`} href={m[3]} target="_blank" rel="noopener noreferrer" className="text-accent underline">
          {m[2]}
        </a>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** A small Markdown subset: "## " headings, paragraphs and "- " lists. */
export function PostBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-5 text-[1.05rem] leading-relaxed">
      {blocks.map((block, b) => {
        const lines = block.split("\n");
        if (lines[0].startsWith("## ")) {
          return (
            <h2 key={b} className="pt-4 text-xl font-semibold tracking-tight">
              {inline(lines[0].slice(3), `h${b}`)}
            </h2>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={b} className="list-disc space-y-2 ps-6">
              {lines.map((l, i) => (
                <li key={i}>{inline(l.slice(2), `l${b}-${i}`)}</li>
              ))}
            </ul>
          );
        }
        return <p key={b}>{inline(lines.join(" "), `p${b}`)}</p>;
      })}
    </div>
  );
}
