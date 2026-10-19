import { Header } from "@/components/Header";
import { ProjectCard, ProjectsExplorer } from "@/components/Projects";
import { allStacks, contact, projects } from "@/content/projects";
import { getDictionary } from "@/content/get-dictionary";
import { isLocale, locales, type Locale } from "@/content/types";
import { notFound } from "next/navigation";

function Section({
  id,
  heading,
  intro,
  children,
}: {
  id: string;
  heading: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="border-t border-border py-16">
      <h2 id={`${id}-h`} className="text-2xl font-semibold tracking-tight">
        {heading}
      </h2>
      {intro ? <p className="mt-2 max-w-2xl text-muted">{intro}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  const langNames = Object.fromEntries(locales.map((l) => [l, getDictionary(l).langName])) as Record<
    Locale,
    string
  >;
  const featured = projects.filter((p) => p.featured);
  const countText = Object.fromEntries(
    Array.from({ length: projects.length + 1 }, (_, n) => [n, t.projects.count(n)]),
  ) as Record<number, string>;

  return (
    <>
      <Header lang={lang} labels={t.nav} name={t.hero.name} langNames={langNames} />
      <main id="main" className="mx-auto max-w-5xl px-5">
        {/* Hero */}
        <section id="top" className="py-20 sm:py-28">
          <p className="text-sm font-medium text-accent">{t.hero.availability}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t.hero.name}</h1>
          <p className="mt-3 text-xl text-muted sm:text-2xl">{t.hero.title}</p>
          <p className="mt-6 max-w-2xl text-lg">{t.hero.tagline}</p>
          <p className="mt-4 text-sm text-muted">{t.hero.location}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              {t.hero.ctaEmail}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-card"
            >
              {t.hero.ctaLinkedIn}
            </a>
            <a href="#projects" className="rounded-md px-4 py-2 text-sm font-medium text-accent hover:underline">
              {t.hero.ctaProjects}
            </a>
          </div>
        </section>

        {/* Highlights */}
        <section aria-labelledby="highlights-h" className="pb-16">
          <h2 id="highlights-h" className="sr-only">
            {t.highlights.heading}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.highlights.items.map((h) => (
              <li key={h.title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm text-muted">{h.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <Section id="about" heading={t.about.heading}>
          <div className="max-w-3xl space-y-4 text-[1.05rem]">
            {t.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" heading={t.experience.heading} intro={t.experience.intro}>
          <ol className="relative space-y-8 border-s-2 border-border ps-6">
            {t.experience.steps.map((s) => (
              <li key={s.title} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -start-[1.95rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background ${
                    s.current ? "bg-accent" : "bg-muted"
                  }`}
                />
                <p className="text-sm font-medium text-accent">{s.period}</p>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted">{s.org}</p>
                <p className="mt-2 max-w-3xl">{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" heading={t.projects.heading} intro={t.projects.intro}>
          <h3 className="mb-4 text-lg font-semibold">{t.projects.featuredHeading}</h3>
          <ul className="grid gap-4 md:grid-cols-2">
            {featured.map((p) => (
              <li key={p.id}>
                <ProjectCard
                  project={p}
                  text={t.projects.items[p.id]}
                  labels={{ visit: t.projects.visit, howItWorks: t.projects.howItWorks, employers: t.projects.employers }}
                  large
                />
              </li>
            ))}
          </ul>
          <h3 className="mb-4 mt-12 text-lg font-semibold">{t.projects.allHeading}</h3>
          <ProjectsExplorer
            projects={projects}
            stacks={allStacks}
            texts={t.projects.items}
            labels={{
              filterEmployer: t.projects.filterEmployer,
              filterStack: t.projects.filterStack,
              all: t.projects.all,
              anyStack: t.projects.anyStack,
              visit: t.projects.visit,
              howItWorks: t.projects.howItWorks,
              employers: t.projects.employers,
              countText,
            }}
          />
        </Section>

        <Section id="skills" heading={t.skills.heading}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.skills.groups.map((g) => (
              <div key={g.name}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{g.name}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full border border-border bg-card px-2.5 py-1 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="background" heading={t.background.heading}>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {t.background.educationHeading}
              </h3>
              <p className="mt-3 font-medium">{t.background.degree}</p>
              <p className="text-muted">
                {t.background.school} · {t.background.year}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {t.background.languagesHeading}
              </h3>
              <ul className="mt-3 space-y-1">
                {t.background.languages.map((l) => (
                  <li key={l.name}>
                    <span className="font-medium">{l.name}</span> <span className="text-muted">— {l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="contact" heading={t.contact.heading}>
          <p className="max-w-2xl text-lg">{t.contact.text}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-block rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
              >
                {t.contact.email}: <span dir="ltr">{contact.email}</span>
              </a>
            </li>
            <li>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-card"
              >
                {t.contact.linkedin}
              </a>
            </li>
          </ul>
        </Section>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {t.footer}
      </footer>
    </>
  );
}
