"use client";

import { useMemo, useState } from "react";
import type { Employer, Project, ProjectId, ProjectText } from "@/content/types";

type Labels = {
  filterEmployer: string;
  filterStack: string;
  all: string;
  anyStack: string;
  visit: string;
  howItWorks: string;
  employers: Record<Employer, string>;
  countText: Record<number, string>;
};

type Props = {
  projects: Project[];
  stacks: string[];
  texts: Record<ProjectId, ProjectText>;
  labels: Labels;
};

export function ProjectCard({
  project,
  text,
  labels,
  large = false,
}: {
  project: Project;
  text: ProjectText;
  labels: Pick<Labels, "visit" | "howItWorks" | "employers">;
  large?: boolean;
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className={`font-semibold ${large ? "text-lg" : ""}`}>{project.name}</h4>
        <span className="shrink-0 text-xs text-muted">{labels.employers[project.employer]}</span>
      </div>
      <p className="mt-2 text-sm text-muted">{text.summary}</p>
      {large && text.how ? (
        <div className="mt-4 rounded-lg bg-accent-soft/60 p-3 text-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">{labels.howItWorks}</p>
          <p>{text.how}</p>
        </div>
      ) : null}
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
        {project.stack.map((s) => (
          <li key={s} className="rounded-full border border-border px-2 py-0.5 text-xs" dir="ltr">
            {s}
          </li>
        ))}
      </ul>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-4 text-sm font-medium text-accent hover:underline"
        >
          {labels.visit} <span dir="ltr">{project.url.replace(/^https?:\/\//, "")}</span>
        </a>
      ) : null}
    </article>
  );
}

export function ProjectsExplorer({ projects, stacks, texts, labels }: Props) {
  const [employer, setEmployer] = useState<Employer | "all">("all");
  const [stack, setStack] = useState<string>("");

  const shown = useMemo(
    () =>
      projects.filter(
        (p) => (employer === "all" || p.employer === employer) && (!stack || p.stack.includes(stack)),
      ),
    [projects, employer, stack],
  );

  const employers: (Employer | "all")[] = ["all", "tunisofts", "iobird"];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end gap-4">
        <fieldset>
          <legend className="mb-1 text-xs font-medium text-muted">{labels.filterEmployer}</legend>
          <div className="flex overflow-hidden rounded-md border border-border text-sm">
            {employers.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmployer(e)}
                aria-pressed={employer === e}
                className={`px-3 py-1.5 ${
                  employer === e ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                }`}
              >
                {e === "all" ? labels.all : labels.employers[e]}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="text-sm">
          <span className="mb-1 block text-xs font-medium text-muted">{labels.filterStack}</span>
          <select
            value={stack}
            onChange={(ev) => setStack(ev.target.value)}
            className="rounded-md border border-border bg-card px-2 py-1.5"
          >
            <option value="">{labels.anyStack}</option>
            {stacks.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <p className="ms-auto text-sm text-muted" aria-live="polite">
          {labels.countText[shown.length]}
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.id}>
            <ProjectCard project={p} text={texts[p.id]} labels={labels} />
          </li>
        ))}
      </ul>
    </div>
  );
}
