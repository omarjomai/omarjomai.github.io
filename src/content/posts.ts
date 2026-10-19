import type { Locale } from "./types";

/**
 * Blog posts. The body is a small Markdown subset rendered by
 * src/components/PostBody.tsx: "## " headings, paragraphs, "- " lists,
 * `code` and [text](url) links. No HTML.
 */
export type Post = {
  slug: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  lang: Locale;
  title: string;
  summary: string;
  body: string;
  sources: { label: string; url: string }[];
};

export const posts: Post[] = [
  {
    slug: "2026-10-19-week-42",
    date: "2026-10-19",
    lang: "en",
    title: "Week 42: patch Next.js, and the agents get a regulator",
    summary: "AI and web news for engineers who ship. October 12 to 18, 2026.",
    body: `Three things from last week matter if you build with Next.js or Node. The rest is good to know.

## 1. Patch first, read later

On October 14, Next.js shipped an out-of-band security update. It fixes two critical remote code execution flaws (CVSS 9.5) and one high-severity denial of service:

- one RCE in \`use cache\` functions that return typed arrays
- one RCE in the Image Optimization API with SVG, on glibc-based Linux
- the DoS in the App Router, through Server Actions

The fixes are in 16.4.1 and 15.5.28. The image fix needs \`sharp\` 0.35.5 or later, so check what your lockfile actually resolves, not just your \`package.json\`. If you are still on Next.js 15, security support ends on October 21.

The same day, Node.js announced security releases for the 22, 24 and 26 lines, landing on or shortly after Wednesday, October 21. The highest severity is HIGH. Most of what I run is on Node 24, so Wednesday is upgrade day.

## 2. AI agents became a regulatory topic

For months, the big labs have disclosed incidents where agents under test reached real websites they were not meant to touch. Last week, governments moved:

- October 14: the US FTC sent civil investigative demands to OpenAI and Anthropic about security incidents and safeguards.
- October 15: India's CERT-In issued a critical advisory saying agents under evaluation had reached live systems of Indian organizations.
- A US House discussion draft would give people a right to sue AI developers for harm caused by agents.

My take for anyone shipping agent features: log every action the agent takes, limit what it can reach, and assume someone will one day ask you for those records. That is cheap to build now and expensive to add after an incident.

## 3. Gemini 4 Argon is out, and the leaderboards disagree

Google made Gemini 4 Argon generally available on October 13: API, AI Studio, the Gemini app for Pro and Ultra, and GitHub Copilot. API pricing is $2 input and $10 output per million tokens until November 30, then $4 and $20. The context window is about 1M tokens.

The scores are the interesting part. The Vals Index ranks Argon first. Artificial Analysis puts Claude Opus 5.5 ahead, 58 to 53. On ARC-AGI-3, Argon scored 97.5% with one test harness and 49.8% with another. The same model, a 47-point gap.

Lesson: a benchmark measures a model plus its setup. Before you switch models in production, run your own tasks.

## Also worth knowing

- Open-weight week: Meta Muse Spark Open, Reflection Beam (a coding model under Apache 2.0, 1M context), DeepSeek V4.1 Flash and Nvidia Nemotron 3.5.
- AWS Lambda Web Functions: Lambda now runs a normal Node HTTP server (Express, Fastify, a standalone Next.js server) with no adapter. Launch runtime: \`nodejs24.x\` on Arm64.
- Vercel Ship 2026: Python is generally available and containers are in public beta. Agent-triggered deployments are now more than half of Vercel's deployments.
- GitHub: AI Scan for pull requests and agentic autofix for code scanning are generally available. Actions workflow lockfiles, which pin each step to the commit you reviewed, are in public preview.
- Anthropic moved its monorepo off git to an in-house system, Scion. Daily merges went from about 2,500 in May to more than 30,000 in September, as Claude writes more of the code.
- PostgreSQL 19 RC 1 is out, with the final release planned for November 19. TanStack Start reached 1.0. Playwright 1.64 can test the tools a web app exposes to agents through WebMCP.

## What I'm watching this week

- The Node.js security releases on Wednesday.
- Independent benchmarks for Beam, Muse Spark Open and the new DeepSeek Flash, run on someone else's harness.
- Agent pricing. In G2's survey, only 9% of buyers call per-seat pricing fair for agents and 57% prefer usage-based. Expect more vendors to switch.

Which of these hits your stack this week? Write to me, I read every reply.`,
    sources: [
      { label: "Next.js security update, October 14, 2026", url: "https://nextjs.org/blog/nextjs-security-update-october-14-2026" },
      { label: "Node.js, October 2026 security releases", url: "https://nodejs.org/en/blog/vulnerability/october-2026-security-releases" },
      { label: "9to5AI, The Week in AI #4", url: "https://9to5ai.tech/the-week-in-ai-4" },
      { label: "Retro AI Tracker, week of Oct 12–18, 2026", url: "https://retroaitracker.com/news/week/2026-W42" },
      { label: "Silicon Noon, The Week in AI, October 12–18", url: "https://siliconnoon.com/the-week-in-ai-october-12-18-2026/" },
      {
        label: "Dev Weekly, Oct 12–18, 2026",
        url: "https://singhajit.com/dev-weekly/2026/oct-12-18/lambda-web-anthropic-scion-postgresql-19-nextjs-rce/",
      },
      { label: "Enpitech Frontend Newsletter, Oct 18", url: "https://enpitech.dev/blog/frontend-digest-2026-10-18" },
      {
        label: "OriginBrief, Developer Tools & Platforms, Oct 19",
        url: "https://www.originbrief.app/en/reports/developer-tools-platforms/2026-10-19/weekly",
      },
      { label: "The Latent Daily, Weekly Recap 2026-W42", url: "https://thelatentdaily.com/digests/weekly-recap-2026-w42/" },
    ],
  },
  {
    slug: "2026-10-12-week-41",
    date: "2026-10-12",
    lang: "en",
    title: "Week 41: GPT-6 for everyone, Haiku gets cheap, and test agents go offline",
    summary: "AI and web news for engineers who ship. October 5 to 11, 2026.",
    body: `Last week was full of launches, but the story that matters most for engineers is about control: who checks what an AI agent does, and what happens when it goes somewhere it shouldn't.

## 1. Anthropic took its test agents off the internet

On October 9, Anthropic published a report on "unintended model actions" in its evaluations and internal use. In one case, a model generating example website interactions submitted an invented tip through a police department's online form. According to the State Department, a testing model also submitted 20 visa applications through a public form over the summer. None were processed and no systems were compromised.

Anthropic's response: all internal evaluations lose live internet access until further notice. The same day, the White House said reporting and fixing AI security incidents is now mandatory for AI companies, as a national security obligation. No penalties were specified yet.

My take: an agent with a browser and a form is enough to cause real-world effects. If you ship agent features, write down which actions are allowed, put a human in front of anything you can't undo, and log everything. The incident reports start with those logs.

## 2. Cheaper and bigger models

- Claude Haiku 5.5 (October 7): $0.10 input and $0.50 output per million tokens for prompts up to 100k tokens. That's 10x cheaper than Haiku 4.5. It has a 1M context window and, for the first time on Haiku, an effort setting to trade cost for intelligence.
- GPT-6 for everyone (October 7): rolling out to all ChatGPT tiers with "Intelligent UI". Answers can now include buttons, forms, charts and small tools built on the fly. ChatGPT can also start answering while it is still thinking.
- Mistral Large 4 (October 6): a 1-trillion-parameter multimodal model with 49B active parameters, trained in Europe. Public preview API now, open weights promised by the end of October.
- Google's Gemini agent (October 8): one agent for work that runs across Workspace, Microsoft 365, Slack and Salesforce, and remembers project context.

For high-volume tasks like classification, extraction and agent sub-steps, Haiku 5.5's price changes the maths. Re-run your cost estimates before you rule a feature "too expensive to run on every request".

## 3. Next.js 16.4 makes Cache Components the default choice

Next.js 16.4 (October 6) recommends Cache Components for every app. New apps from \`create-next-app\` have it on by default, and it becomes the default in Next.js 17. You mark parts of the tree with \`'use cache'\` and \`cacheLife()\`, instead of relying on implicit App Router caching.

Two other details: a new \`next upgrade --agent\` command gives coding agents version-specific upgrade guidance, and every app gets lower dev memory, faster compiles, smaller bundles and React 19.3.

Note: the critical security fixes came a week later, in 16.4.1. If you upgrade, go straight to that.

## Also worth knowing

- Deno is joining Cloudflare (October 9). The Deno runtime gets one more year of monthly bug and security fixes, then development ends; Deno Deploy shuts down in six months; JSR keeps running.
- GitHub stacked pull requests are generally available on every plan. Big changes become small, reviewable PRs that merge together.
- Bun v1.4.3 ships \`bun check\`, a built-in TypeScript type checker that Bun says is 3x to 6.4x faster than tsc 7.
- Python 3.15 is out with a faster JIT, lazy imports and UTF-8 by default.
- Node.js moves to one major release a year starting this month. Version numbers follow the year (Node 27 in 2027), and every release becomes LTS.
- Code review is the new bottleneck: Bain says review time rose 91% while task completion rose only 21% with AI coding tools.

## What I'm watching

- Whether Mistral really ships Large 4's weights by the end of the month.
- How the White House enforces incident reporting, since no penalties were announced.
- Teams moving off Deno Deploy before its six-month shutdown.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Anthropic, Investigating unintended model actions (Oct 9, 2026)", url: "https://www.anthropic.com/news/investigating-unintended-model-actions" },
      { label: "Anadolu Agency, White House mandates AI incident reporting (Oct 10, 2026)", url: "https://www.aa.com.tr/en/americas/trump-administration-mandates-ai-incident-reporting-after-anthropic-disclosure-report/4084155" },
      { label: "Anthropic, Introducing Claude Haiku 5.5", url: "https://www.anthropic.com/claude-haiku-5-5" },
      { label: "OpenAI, GPT-6 and Intelligent UI for everyone", url: "https://openai.com/index/gpt-6-for-everyone/" },
      { label: "Mistral AI, Introducing Mistral Large 4", url: "https://mistral.ai/news/mistral-large-4/" },
      { label: "GIGAZINE, Google announces Gemini Agent (Oct 9, 2026)", url: "https://gigazine.net/gsc_news/en/20261009-gemini-agent" },
      { label: "Next.js 16.4 release post", url: "https://nextjs.org/blog/next-16-4" },
      { label: "Deno, Deno is joining Cloudflare", url: "https://deno.com/blog/cloudflare" },
      { label: "GitHub Changelog, Stacked pull requests generally available", url: "https://github.blog/changelog/2026-10-06-stacked-pull-requests-generally-available" },
      { label: "Sparkpulse, Software Development trends, week of Oct 12", url: "https://sparkpulse.io/briefs/development/2026-10-12-developer-platforms-shed-dependencies-added-agent-authorization-bun" },
      { label: "Linuxiac Weekly Wrap-Up, Week 41", url: "https://linuxiac.com/linuxiac-weekly-wrap-up-week-41-2026-october-5-11" },
      { label: "Node.js Design Patterns, Node.js release schedule changes", url: "https://nodejsdesignpatterns.com/blog/nodejs-release-schedule-changes/" },
      { label: "OriginBrief, Developer Tools & Platforms, Oct 12", url: "https://www.originbrief.app/en/reports/developer-tools-platforms/2026-10-12/weekly" },
      { label: "AccessAllGPT, AI Week in Review 2026-W41", url: "https://www.accessallgpt.com/weekly/2026-W41" },
    ],
  },
];

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

const dateLocales: Record<Locale, string> = { en: "en-GB", fr: "fr-FR", ar: "ar-TN" };

export function formatDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
