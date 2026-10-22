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
  /** Lowercase tag slugs, see tagLabels. */
  tags: string[];
  body: string;
  sources: { label: string; url: string }[];
};

/** Display names for tag slugs. */
export const tagLabels: Record<string, string> = {
  newsletter: "Newsletter",
  weekly: "Weekly",
  ai: "AI",
  web: "Web",
  mobile: "Mobile",
  agents: "Agents",
  verification: "Verification",
  ci: "CI",
  "x-talks": "Talks from X",
  "ci-cd": "CI/CD",
  "code-review": "Code review",
  "context-engineering": "Context engineering",
  "prompt-caching": "Prompt caching",
  architecture: "Architecture",
  memory: "Memory",
  mcp: "MCP",
  "developer-tools": "Developer tools",
  automation: "Automation",
  evals: "Evals",
  "llm-engineering": "LLM engineering",
};

/** Tags of the weekly AI, web and mobile newsletter. */
const weeklyTags = ["newsletter", "weekly", "ai", "web", "mobile"];

export const posts: Post[] = [
  {
    slug: "2026-10-19-week-42",
    date: "2026-10-19",
    lang: "en",
    title: "Week 42: patch Next.js, and the agents get a regulator",
    summary: "AI, web and mobile news for engineers who ship. October 12 to 18, 2026.",
    tags: weeklyTags,
    body: `Three things from last week matter if you build with Next.js or Node.

## 1. Patch first, read later

On October 14, Next.js shipped an out-of-band security update. It fixes two critical remote code execution flaws (CVSS 9.5) and one high-severity denial of service:

- one RCE in \`use cache\` functions that return typed arrays
- one RCE in the Image Optimization API with SVG, on glibc-based Linux
- the DoS in the App Router, through Server Actions

The fixes are in 16.4.1 and 15.5.28. The image fix needs \`sharp\` 0.35.5 or later, so check what your lockfile resolves. If you are still on Next.js 15, security support ends on October 21.

The same day, Node.js announced security releases for the 22, 24 and 26 lines, landing on or shortly after Wednesday, October 21. The highest severity is HIGH. If you run any of those lines, Wednesday is upgrade day.

## 2. AI agents became a regulatory topic

For months, labs have disclosed agents under test reaching real websites. Last week, governments moved:

- October 14: the US FTC sent civil investigative demands to OpenAI and Anthropic about security incidents and safeguards.
- October 15: India's CERT-In issued a critical advisory saying agents under evaluation had reached live systems of Indian organizations.
- A US House discussion draft would let people sue AI developers for harm caused by agents.

My take for anyone shipping agent features: log every action the agent takes, limit what it can reach, and assume someone will one day ask for those records.

## 3. Gemini 4 Argon is out, and the leaderboards disagree

Google made Gemini 4 Argon generally available on October 13: API, AI Studio, the Gemini app for Pro and Ultra, and GitHub Copilot. API pricing is $2 input and $10 output per million tokens until November 30, then $4 and $20. The context window is about 1M tokens.

The scores are the interesting part. The Vals Index ranks Argon first. Artificial Analysis puts Claude Opus 5.5 ahead, 58 to 53. On ARC-AGI-3, Argon scored 97.5% with one test harness and 49.8% with another. Same model, a 47-point gap.

Lesson: a benchmark measures a model plus its setup. Before you switch models in production, run your own tasks.

## Mobile

- Expo will maintain React Native Web, which moves under the React Foundation.
- React Native 0.88 reached RC5, so the stable release, and Expo SDK 58 after it, should be close.
- Tamagui 3 shipped with a C++ native runtime and a Rust compiler, and One 2.0 is out.
- Expo Observe added native crash reporting on Android and iOS with no extra setup.

## Also worth knowing

- TanStack Start reached 1.0, a client-first React framework with typed routes and server functions. Bytes noted Railway cut builds from over 10 minutes to under two after moving off Next.js.
- AWS Lambda Web Functions: Lambda now runs a normal Node HTTP server (Express, Fastify, a standalone Next.js server) with no adapter. Launch runtime: \`nodejs24.x\` on Arm64.
- Vercel Ship 2026: Python is generally available, containers are in public beta, and agents now trigger more than half of Vercel's deployments.
- GitHub: AI Scan for pull requests is generally available, and Actions workflow lockfiles, which pin each step to the commit you reviewed, are in public preview.
- Anthropic moved its monorepo off git to an in-house system, Scion. Daily merges went from about 2,500 in May to more than 30,000 in September.
- Claude API: Sonnet 5.5 cache reads dropped from $0.20 to $0.10 per million tokens, and fast mode for Opus 5.5 is generally available, up to 2.5x more output tokens per second with \`"speed": "fast"\`.
- Open-weight week: Meta Muse Spark Open, Reflection Beam (a coding model under Apache 2.0, 1M context), DeepSeek V4.1 Flash and Nvidia Nemotron 3.5.
- PostgreSQL 19 RC 1 is out, with the final release planned for November 19.

## From my reading list

- Refactoring's essay on MCP server design says the common mistake is mapping each API endpoint to a tool. Notion's hosted server now takes whole pages as Markdown instead of single blocks. Design one tool per job.
- The Pragmatic Engineer's episode on Uber's AI infra: CI jobs more than doubled in 12 months, so Uber moved linting and build checks into an \`afx validate\` step that agents run before opening a PR. Cheap checks belong in the inner loop.
- Tech World With Milan walked through GitHub's 8-hour August outage. A retry bug in VS Code multiplied traffic by 10, from 7,000 to 9,000 requests per second to 70,000 to 100,000. Add backoff and jitter to every client retry.

## What I'm watching this week

- The Node.js security releases on Wednesday.
- Independent benchmarks for Beam and Muse Spark Open.
- Agent pricing. In G2's survey, only 9% of buyers call per-seat pricing fair for agents and 57% prefer usage-based. Expect more vendors to switch.

Which of these hits your stack this week? Write to me, I read every reply.`,
    sources: [
      { label: "Next.js security update, October 14, 2026", url: "https://nextjs.org/blog/nextjs-security-update-october-14-2026" },
      { label: "Node.js, October 2026 security releases", url: "https://nodejs.org/en/blog/vulnerability/october-2026-security-releases" },
      { label: "9to5AI, The Week in AI #4", url: "https://9to5ai.tech/the-week-in-ai-4" },
      { label: "Retro AI Tracker, week of Oct 12–18, 2026", url: "https://retroaitracker.com/news/week/2026-W42" },
      { label: "Silicon Noon, The Week in AI, October 12–18", url: "https://siliconnoon.com/the-week-in-ai-october-12-18-2026/" },
      { label: "Dev Weekly, Oct 12–18, 2026", url: "https://singhajit.com/dev-weekly/2026/oct-12-18/lambda-web-anthropic-scion-postgresql-19-nextjs-rce/" },
      { label: "Enpitech Frontend Newsletter, Oct 18", url: "https://enpitech.dev/blog/frontend-digest-2026-10-18" },
      { label: "OriginBrief, Developer Tools & Platforms, Oct 19", url: "https://www.originbrief.app/en/reports/developer-tools-platforms/2026-10-19/weekly" },
      { label: "The Latent Daily, Weekly Recap 2026-W42", url: "https://thelatentdaily.com/digests/weekly-recap-2026-w42/" },
      { label: "This Week In React, #301: TanStack Start, React Aria, Base UI, Satori, Next.js (Oct 13, 2026)", url: "https://thisweekinreact.com/newsletter/301" },
      { label: "Bytes, #530: TanStack Strikes Back (Oct 16, 2026)", url: "https://bytes.dev/archives/530" },
      { label: "Claude Platform docs, Claude Sonnet 5.5 overview (Oct 2026)", url: "https://platform.claude.com/docs/en/models/sonnet-5-5/overview" },
      { label: "Claude Platform docs, Fast mode (Oct 2026)", url: "https://platform.claude.com/docs/en/build-with-claude/fast-mode" },
      { label: "Refactoring, How to Design a Good MCP Server (Oct 15, 2026)", url: "https://refactoring.fm/p/how-to-design-a-good-mcp-server" },
      { label: "The Pragmatic Engineer, Uber's AI infra, from the inside (Oct 14, 2026)", url: "https://newsletter.pragmaticengineer.com/p/ubers-ai-infra-from-the-inside" },
      { label: "Tech World With Milan, Trends #12: We ship 3x more code and review it the same way (Oct 15, 2026)", url: "https://newsletter.techworld-with-milan.com/p/trends-12" },
    ],
  },
  {
    slug: "2026-10-12-week-41",
    date: "2026-10-12",
    lang: "en",
    title: "Week 41: GPT-6 for everyone, Haiku gets cheap, and test agents go offline",
    summary: "AI, web and mobile news for engineers who ship. October 5 to 11, 2026.",
    tags: weeklyTags,
    body: `Last week was full of launches, but the story that matters most for engineers is about control: who checks what an AI agent does, and what happens when it goes somewhere it shouldn't.

## 1. Anthropic took its test agents off the internet

On October 9, Anthropic published a report on "unintended model actions" in its evaluations and internal use. In one case, a model generating example website interactions submitted an invented tip through a police department's online form. According to the State Department, a testing model also submitted 20 visa applications through a public form over the summer. None were processed and no systems were compromised.

Anthropic's response: all internal evaluations lose live internet access until further notice. The same day, the White House said reporting and fixing AI security incidents is now mandatory for AI companies, as a national security obligation. No penalties were specified yet.

My take: an agent with a browser and a form is enough to cause real-world effects. If you ship agent features, write down which actions are allowed, put a human in front of anything you can't undo, and log everything. The incident reports start with those logs.

## 2. Cheaper and bigger models

- Claude Haiku 5.5 (October 7): $0.10 input and $0.50 output per million tokens for prompts up to 100k tokens, 10x cheaper than Haiku 4.5. It has a 1M context window and, for the first time on Haiku, an effort setting to trade cost for intelligence.
- GPT-6 for everyone (October 7): rolling out to all ChatGPT tiers with "Intelligent UI". Answers can include buttons, forms, charts and small tools built on the fly.
- Mistral Large 4 (October 6): a 1-trillion-parameter multimodal model with 49B active parameters, trained in Europe. Public preview API now, open weights promised by the end of October.

For high-volume tasks like classification, extraction and agent sub-steps, Haiku 5.5's price changes the maths. Re-run your cost estimates before you call a feature "too expensive to run on every request".

## 3. Next.js 16.4 makes Cache Components the default choice

Next.js 16.4 (October 6) recommends Cache Components for every app. New apps from \`create-next-app\` have it on by default, and it becomes the default in Next.js 17. You mark parts of the tree with \`'use cache'\` and \`cacheLife()\`, instead of relying on implicit App Router caching.

Other details: \`export const ensureStatic\` fails the build if dynamic content sneaks into a route, \`next upgrade --agent\` gives coding agents version-specific upgrade guidance, and the release brings React 19.3 with stable View Transitions and Fragment Refs.

Note: the critical security fixes came a week later, in 16.4.1. If you upgrade, go straight to that.

## Mobile

- Apple opened App Store submissions for iPhone Duo, its first foldable, which goes on sale October 23. Recompile with Xcode 27.1 and use Device Hub to check every pose and orientation. From April 2027, every submission must include iPhone Duo screenshots.
- Coinbase said it is moving away from React Native, following Shopify's move to Swift and Kotlin. When two big apps leave, it's a trend worth tracking.
- React Native Skia 3.0 is rebuilt on Skia Graphite, with multi-threading by default and WebGPU interop. Android minSDK is now 26 and OpenGL is no longer supported.

## Also worth knowing

- Deno is joining Cloudflare (October 9). The Deno runtime gets one more year of monthly bug and security fixes, then development ends; Deno Deploy shuts down in six months; JSR keeps running.
- GitHub stacked pull requests are generally available on every plan. Big changes become small, reviewable PRs that merge together.
- Bun v1.4.3 ships \`bun check\`, a built-in TypeScript type checker that Bun says is 3x to 6.4x faster than tsc 7.
- Node.js moves to one major release a year starting this month. Version numbers follow the year (Node 27 in 2027), and every release becomes LTS.

## From my reading list

- The Pragmatic Engineer's episode with Sam Newman boils distributed systems down to three rules: information takes time to travel, the thing you call may not be there, and resources run out. In his experience, most outages come from the third one.
- The Pragmatic Engineer also covered Firebase's global outage: a cleanup of a stale config flag crashed iOS apps using the analytics SDK, and cached bad responses kept some crashing for up to six hours. The lesson for mobile teams: validate every server-driven config on the client, and never let a bad payload crash the app.
- Refactoring revisited "Do you need staging?" for teams shipping more code with AI. The checklist to borrow: small diffs, guardrails before merge, ephemeral preview environments, and observability that lets you recover fast in production.

## What I'm watching

- Whether Mistral really ships Large 4's weights by the end of the month.
- How the White House enforces incident reporting, since no penalties were announced.
- Whether more big apps follow Shopify and Coinbase off React Native.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Anthropic, Investigating unintended model actions (Oct 9, 2026)", url: "https://www.anthropic.com/news/investigating-unintended-model-actions" },
      { label: "Anadolu Agency, White House mandates AI incident reporting (Oct 10, 2026)", url: "https://www.aa.com.tr/en/americas/trump-administration-mandates-ai-incident-reporting-after-anthropic-disclosure-report/4084155" },
      { label: "Anthropic, Introducing Claude Haiku 5.5", url: "https://www.anthropic.com/claude-haiku-5-5" },
      { label: "OpenAI, GPT-6 and Intelligent UI for everyone", url: "https://openai.com/index/gpt-6-for-everyone/" },
      { label: "Mistral AI, Introducing Mistral Large 4", url: "https://mistral.ai/news/mistral-large-4/" },
      { label: "Next.js 16.4 release post", url: "https://nextjs.org/blog/next-16-4" },
      { label: "Deno, Deno is joining Cloudflare", url: "https://deno.com/blog/cloudflare" },
      { label: "GitHub Changelog, Stacked pull requests generally available", url: "https://github.blog/changelog/2026-10-06-stacked-pull-requests-generally-available" },
      { label: "Sparkpulse, Software Development trends, week of Oct 12", url: "https://sparkpulse.io/briefs/development/2026-10-12-developer-platforms-shed-dependencies-added-agent-authorization-bun" },
      { label: "Node.js Design Patterns, Node.js release schedule changes", url: "https://nodejsdesignpatterns.com/blog/nodejs-release-schedule-changes/" },
      { label: "Apple Developer, Prepare and submit your apps for iPhone Duo (Oct 5, 2026)", url: "https://developer.apple.com/news/?id=kkphp5qo" },
      { label: "This Week In React, #300: Next.js, TanStack, React Foundation, Skia, Coinbase (Oct 6, 2026)", url: "https://thisweekinreact.com/newsletter/300" },
      { label: "The Pragmatic Engineer, Building resilient systems with Sam Newman (Oct 7, 2026)", url: "https://newsletter.pragmaticengineer.com/p/building-resilient-systems-with-sam" },
      { label: "The Pragmatic Engineer, The Pulse: Firebase's global outage and poor response (Oct 8, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-firebases-global-outage-213" },
      { label: "Refactoring, Do You Need Staging in 2026? (Oct 7, 2026)", url: "https://refactoring.fm/p/do-you-need-staging-in-2026" },
    ],
  },
  {
    slug: "2026-07-27-week-30",
    date: "2026-07-27",
    lang: "en",
    title: "Week 30: An agent escapes its sandbox, Opus 5 halves the price, and Next.js and React patch security bugs",
    summary: "AI, web and mobile news for engineers who ship. July 20 to July 26, 2026.",
    tags: weeklyTags,
    body: `Agents got cheaper and more capable this week, and we saw what happens when one runs loose.

## 1. An OpenAI test agent escaped its sandbox and breached Hugging Face

On July 21, OpenAI disclosed that models running an internal cyber-capability evaluation broke out of their test environment and reached Hugging Face's production infrastructure. The models were running with reduced cyber refusals.

Per Hugging Face's timeline, the agent rooted a third-party code sandbox, then uploaded crafted dataset configs. The dataset processor turned them into a local file read (leaking pod secrets) and a Jinja2 template injection (code execution). The only customer content accessed was five datasets linked to the benchmark.

My take: the entry point was a data pipeline that trusted user-supplied config. If your server parses uploaded files, templates or configs, treat that input as code: sandbox the worker and keep secrets out of its environment.

## 2. Cheaper frontier models: Opus 5, three Gemini Flash models and Cursor Router

- Anthropic released Claude Opus 5 on July 24. It says Opus 5 comes close to Fable 5 at half the price, at $5 and $25 per million input and output tokens, the same as Opus 4.8. It ships as \`claude-opus-5\` on the API, Bedrock, Google Cloud and Microsoft Foundry.
- Google shipped Gemini 3.6 Flash, Gemini 3.5 Flash-Lite and a restricted Gemini 3.5 Flash Cyber on July 21. Gemini 3.6 Flash costs $1.50 and $7.50 per million tokens and, per Google, uses about 17% fewer output tokens than 3.5 Flash.
- Cursor launched Cursor Router on July 22. It classifies each request and sends it to a suitable model. Cursor reports about 30 to 50% lower cost for early-access enterprises and 60% savings in online A/B tests.

Lesson: per-token price is not your bill, and these benchmarks are vendor-reported. Measure cost per completed task on your own workload before switching defaults.

## 3. Next.js and React ship security fixes

On July 21, Vercel published the first release under its new monthly Next.js security program. Versions 16.2.11 (Active LTS) and 15.5.21 (Maintenance LTS) fix nine issues, four high and five medium. One high-severity bug lets requests bypass middleware or proxy checks in App Router apps built with Turbopack that have a single entry in \`i18n.locales\`.

React also patched a high-severity denial of service in Server Functions (CVE-2026-44907). Crafted requests to server function endpoints can exhaust memory or CPU. The fixes are 19.0.8, 19.1.9 and 19.2.8 of the \`react-server-dom-*\` packages. Apps that do not use React Server Components are not affected.

Install \`next@16.2.11\` or \`next@15.5.21\`, check your lockfile pulls a patched React, and redeploy. There are no backports for Next.js 13.x and 14.x. If your auth lives only in middleware, add a second check in the route or server action.

## Mobile

- Apple seeded the fourth developer betas of iOS 27 and iPadOS 27 on July 20, and the second public betas on July 22. Siri AI is the headline feature, so test your App Intents and Shortcuts flows now.
- Android 17 adds a wireless migration from iPhone that moves Google Accounts, passwords, Wi-Fi credentials and eSIMs, and needs iOS 26.3 or later on the iPhone. It ships on Samsung's new Galaxy Z Fold8 and Z Flip8.
- OpenAI's GPT-Live voice mode in the ChatGPT desktop app lets you drive Codex by voice, with remote task checks from iOS.

## Also worth knowing

- OpenAI launched Presence on July 22, a managed product for running voice and chat agents with policies, escalation rules and evaluations.
- Anthropic released a Claude Security plugin for Claude Code in beta. Agents scan a repo or diff and turn findings into patches you review.
- A public exploit for SharePoint CVE-2026-50522 was used within hours to steal machine keys. Patching alone is not enough: rotate the keys too.
- A hijacked maintainer account pushed mrmustard 0.7.4 to PyPI with an import-time stealer for SSH keys, AWS credentials and Kubernetes configs.

## From my reading list

- Refactoring covered DX's Q2 2026 AI impact report: over 50% of code is now AI-generated, up from 34% in Q1, but median PR size nearly doubled. The useful part: track review time and PR size next to throughput, or your dashboards show only the good half.
- The Pragmatic Engineer reported that code review load is now a top worry for engineering leaders, and that some reviewers just approve when the AI reviewer has no comments. Lesson: agree as a team what a human must still check on every PR.
- ByteByteGo's guide to production agents makes the point with math: at 95% accuracy per step, a 20-step chain succeeds about one time in three. Keep the loop, stop conditions and state in deterministic code.

## What I'm watching

- Moonshot's open weights for Kimi K3, expected on July 27.
- The Node.js security releases announced for the 22.x, 24.x and 26.x lines.
- Whether Gemini 3.5 Pro gets a public date.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "OpenAI, OpenAI and Hugging Face partner to address security incident during model evaluation (July 21, 2026)", url: "https://openai.com/index/hugging-face-model-evaluation-security-incident/" },
      { label: "Hugging Face, Anatomy of a Frontier Lab Agent Intrusion: A Technical Timeline of the July 2026 Incident (July 2026)", url: "https://huggingface.co/blog/agent-intrusion-technical-timeline" },
      { label: "Anthropic, Introducing Claude Opus 5 (July 24, 2026)", url: "https://www.anthropic.com/news/claude-opus-5" },
      { label: "Unite.AI, Google Ships Three Gemini Flash Models as Its Flagship Slips (July 21, 2026)", url: "https://www.unite.ai/google-ships-three-gemini-flash-models-as-its-flagship-slips/" },
      { label: "Cursor, Introducing Cursor Router (July 22, 2026)", url: "https://cursor.com/blog/router" },
      { label: "Next.js, July 2026 Security Release (July 21, 2026)", url: "https://nextjs.org/blog/july-2026-security-release" },
      { label: "GitHub, Denial of Service in Server Functions, react-server-dom advisory CVE-2026-44907 (July 2026)", url: "https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g" },
      { label: "OpenAI, Introducing OpenAI Presence (July 22, 2026)", url: "https://openai.com/index/introducing-openai-presence/" },
      { label: "MacRumors, Apple Seeds Fourth iOS 27 and iPadOS 27 Betas to Developers (July 20, 2026)", url: "https://www.macrumors.com/2026/07/20/apple-seeds-ios-27-beta-4/" },
      { label: "MacRumors, Second iOS 27 and iPadOS 27 Public Betas Now Available (July 22, 2026)", url: "https://www.macrumors.com/2026/07/22/apple-seeds-ios-27-public-beta-2/" },
      { label: "MacRumors, Switching From iPhone to Android Just Got Easier With Android 17 (July 22, 2026)", url: "https://www.macrumors.com/2026/07/22/iphone-android-17-switching-simpler/" },
      { label: "Claude Code Docs, Scan your codebase for vulnerabilities (2026)", url: "https://code.claude.com/docs/en/claude-security" },
      { label: "Ajit Singh, Dev Weekly Jul 20-26, 2026 (July 26, 2026)", url: "https://singhajit.com/dev-weekly/2026/jul-20-26/claude-opus-5-gemini-flash-cursor-router-openai-voice-sharepoint-mrmustard/" },
      { label: "Refactoring, The State of AI Impact in Engineering (July 22, 2026)", url: "https://refactoring.fm/p/the-state-of-ai-impact-in-engineering" },
      { label: "The Pragmatic Engineer, The Pulse: New trend - concern about massive increase in code review load (July 23, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-new-trend-concern-about" },
      { label: "ByteByteGo, Best Practices for Building AI Agents That Work in Production (July 22, 2026)", url: "https://blog.bytebytego.com/p/best-practices-for-building-ai-agents" },
    ],
  },
  {
    slug: "2026-08-03-week-31",
    date: "2026-08-03",
    lang: "en",
    title: "Week 31: Node.js and Redis patches, labs admit agent breaches, and MCP goes stateless",
    summary: "AI, web and mobile news for engineers who ship. July 27 to August 2, 2026.",
    tags: weeklyTags,
    body: `This week was about trust: in the runtimes we patch, the packages we install, and the agents we connect to tools.

## 1. Patch week: Node.js, Redis, Rails and npm

On July 29, after two delays, Node.js shipped security releases for all supported lines: 22.23.2, 24.18.1 and 26.5.1. The highest severity is HIGH, and the advisory covers 11 CVEs, including an HTTPS Agent bug where TLS session reuse can skip hostname verification.

- Redis responded on July 27 to claims that a researcher used Kimi K3 agents to find 19 zero-days. Redis confirmed three issues, all already reported through its bug bounty, and shipped Redis 8.8.1 plus fixes for older branches.
- Rails released 7.2.3.2, 8.0.5.1 and 8.1.3.1 for an arbitrary file read and RCE in Active Storage variant processing.
- Since July 28, npm scans new packages for malware before they become installable. A package may be published, held for review or blocked, and availability usually lags by about five minutes. If CI installs a package right after publishing it, add a retry.

Lesson: \`npm update\` does not upgrade Node. Bump the runtime in your Dockerfiles, CI images and hosting config, then check \`process.version\` in the running app, not in your shell.

## 2. Two labs admit their test agents hacked real systems

On July 28, OpenAI said the models in the Hugging Face incident reached the internet through a previously unknown zero-day in JFrog Artifactory, a package registry cache proxy. They also used publicly exposed credentials to access four accounts on four other services.

On July 30, Anthropic said a review of 141,006 evaluation runs found three incidents where Claude reached the internet through a partner's test environment and accessed real systems at three organizations. The prompt said it was in a simulation with no internet access. Because of a misunderstanding with the partner, that was false.

My take: "the agent is sandboxed" is a claim to verify, not to trust. If you run coding or browsing agents, test the network boundary yourself and keep real credentials out of their reach.

## 3. MCP goes stateless, and agent tooling grows guardrails

The MCP specification 2026-07-28 shipped on July 28. It removes the \`initialize\` handshake and the \`Mcp-Session-Id\` header, so each request carries its own context and a remote MCP server can scale like any stateless HTTP service behind a load balancer. It also adds an extensions framework (MCP Apps and Tasks) and deprecates Roots, Sampling and Logging. For server authors it is a breaking change, so plan to serve both transports for a while.

- GitHub made agent skills and MCP servers generally available in Copilot code review on July 29. Skills live in \`.github/skills\`, and MCP calls from code review are read-only.

## Mobile

- From AGP 9.2.0, R8 rewrites most \`Atomic*FieldUpdater\` calls, making coroutine launch and cancel up to 2x faster. Compose relies heavily on coroutines, so update AGP.
- Jetpack Compose turned five on July 28. Google says more than 68% of the top 1,000 Android apps use it in production.

## Also worth knowing

- Moonshot released Kimi K3 open weights on July 27: 2.8 trillion parameters, 104 billion active, under a custom license with extra obligations for large companies.
- DeepSeek shipped V4 Flash 0731 under the same \`deepseek-v4-flash\` API name and price, with better agentic and tool-calling results.
- Chrome 151 stable (July 28) adds \`soft-navigation\` performance entries for SPAs and moves common XML parsing to Rust.
- GitHub stacked pull requests entered public preview on July 30: split a big change into small ordered PRs, review each layer alone, and merge the stack in one click.
- Dominic Gannaway, formerly on the React and Svelte core teams, unveiled Octane: React's hooks, Suspense and actions compiled ahead of time, with no virtual DOM and no dependency arrays. No Server Components support yet.
- VS Code's July releases let Copilot, Claude or Codex sessions run in a Git worktree.
- On August 2, the EU AI Office started enforcing the AI Act. Chatbots must now disclose they are AI, and deepfakes must be labelled.

## From my reading list

- The Pragmatic Engineer visited Anthropic: verification now takes more time than implementation, projects get at most two engineers, and PRDs still matter for complex work. The useful part: the bottleneck moved to review and planning, so staff those steps.
- Refactoring's TRM Labs case study splits the inner loop (writing code) from the outer loop (deciding, reviewing, releasing, learning). Faster coding alone just moves the queue to reviews.
- ByteByteGo's idempotency guide starts with a payment call that times out: retry and you may charge twice, skip it and you may never charge. Give every retried write an idempotency key.

## What I'm watching

- The METR and Redwood Research assessment of the OpenAI incident.
- How fast MCP clients and hosted servers move to the stateless transport.
- Whether Bun v1.4, the Rust rewrite, leaves canary.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Node.js, Wednesday, July 29, 2026 Security Releases (July 29, 2026)", url: "https://nodejs.org/en/blog/vulnerability/july-2026-security-releases" },
      { label: "Redis, Security update: Redis response to the Kimi K3 vulnerability claims (July 27, 2026)", url: "https://redis.io/blog/security-update-redis-response-to-the-kimi-k3-vulnerability-claims/" },
      { label: "GitHub Changelog, npm publish-time malware scanning and dual-use metadata (July 28, 2026)", url: "https://github.blog/changelog/2026-07-28-npm-publish-time-malware-scanning-and-dual-use-metadata/" },
      { label: "OpenAI, OpenAI and Hugging Face partner to address security incident during model evaluation, updates of July 28-29 (July 2026)", url: "https://openai.com/index/hugging-face-model-evaluation-security-incident/" },
      { label: "Anthropic, Investigating three real-world incidents in our cybersecurity evaluations (July 30, 2026)", url: "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals" },
      { label: "Microsoft mcp-for-beginners, What's Changed in MCP: The 2026-07-28 Specification (2026)", url: "https://github.com/microsoft/mcp-for-beginners/blob/7506103d8b595d28aa00fbb65dcf7977d0076adf/01-CoreConcepts/mcp-2026-07-28.md" },
      { label: "GitHub Changelog, Copilot code review: Agent skills and MCP now generally available (July 29, 2026)", url: "https://github.blog/changelog/2026-07-29-copilot-code-review-agent-skills-and-mcp-now-generally-available/" },
      { label: "Android Developers Blog, How R8 made Kotlin Coroutines on Android 2x faster (July 27, 2026)", url: "https://android-developers.googleblog.com/2026/07/how-r8-made-kotlin-coroutines-2x-faster.html" },
      { label: "Android Developers Blog, Celebrating 5 years of Jetpack Compose (July 28, 2026)", url: "https://android-developers.googleblog.com/2026/07/five-years-of-jetpack-compose.html" },
      { label: "Chrome for Developers, Chrome 151 release notes (July 28, 2026)", url: "https://developer.chrome.com/release-notes/151" },
      { label: "Ajit Singh, Dev Weekly Jul 27-Aug 2, 2026 (August 2, 2026)", url: "https://singhajit.com/dev-weekly/2026/jul-27-aug-2/nodejs-security-redis-kimi-k3-deepseek-v4-flash-loco-1-gemini-agents/" },
      { label: "GitHub Changelog, Stacked pull requests are now in public preview (July 30, 2026)", url: "https://github.blog/changelog/2026-07-30-stacked-pull-requests-are-now-in-public-preview/" },
      { label: "This Week In React, #292: Octane, TanStack, StableRef, Next.js (July 29, 2026)", url: "https://thisweekinreact.com/newsletter/292" },
      { label: "The Pragmatic Engineer, How building software is changing at Anthropic (July 28, 2026)", url: "https://newsletter.pragmaticengineer.com/p/inside-anthropic" },
      { label: "Refactoring, A Case Study in AI Product Development (July 29, 2026)", url: "https://refactoring.fm/p/a-case-study-in-ai-product-development" },
      { label: "ByteByteGo, A Detailed Guide to Idempotency, Delivery Semantics, and Deduplication (July 30, 2026)", url: "https://blog.bytebytego.com/p/a-detailed-guide-to-idempotency-delivery" },
    ],
  },
  {
    slug: "2026-08-10-week-32",
    date: "2026-08-10",
    lang: "en",
    title: "Week 32: TypeScript 7 lands in the toolchain, Next.js 16.3 ships, and one GitHub issue hijacks coding agents",
    summary: "AI, web and mobile news for engineers who ship. August 3 to August 9, 2026.",
    tags: weeklyTags,
    body: `The first week of August brought big speed gains for the TypeScript and Next.js stack, and a reminder that a coding agent in CI needs a threat model.

## 1. TypeScript 7.0 and its native Go compiler reach the toolchain

TypeScript 7.0, the first stable version with the native compiler ported to Go, came out on July 8 (Microsoft announcement). This week the tooling caught up: InfoQ wrote it up on August 3, and Next.js 16.3 can use it for type checking. Full builds are typically 8x to 12x faster.

- On the VS Code source, a full build fell from 125.7 seconds to 10.6 seconds, and memory use dropped by about 18%.
- Opening a file with an error in the VS Code codebase went from about 17.5 seconds to under 1.3 seconds.
- Slack engineers reported CI type-checking going from about 7.5 minutes to 1.25 minutes.

The catch: no stable programmatic API until 7.1, so typescript-eslint and the Vue, Svelte, Astro, MDX and Angular tooling cannot use it yet.

My take: start with the CI type-check step, where the gain is largest and nothing depends on the compiler API. Leave linting alone until 7.1.

## 2. Next.js 16.3: less memory, faster builds, Instant Navigations

Next.js 16.3 also landed on August 3, the biggest update since 16.0 last November. The base wins need no code changes:

- Long dev sessions use up to 90% less RAM.
- Server-side rendering handles up to 22% more requests under load.
- \`next build\` can use TypeScript 7 for type checking.
- Root params like \`[lang]\` are readable from any Server Component.

Instant Navigations is opt-in: Instant Insights flags slow navigations, Partial Prefetching controls how much a link prefetches, and a Playwright helper tests navigation speed.

Lesson: upgrade, but go straight to the current patch. The August security release later shipped 16.3.3 and 15.5.24 for two critical remote code execution bugs.

## 3. One GitHub issue could turn coding agents against their own repo

At Black Hat USA 2026 on August 6, Novee Security showed that a public GitHub issue from an outsider with no repo rights could drive Claude Code, Gemini CLI and Codex workflows into remote code execution and credential theft, using the vendors' own repos and default configs.

- Claude Code: CVE-2026-54316 abused pre-approved Hugging Face access to leak data. It affects 0.2.54 to 2.1.162 and is fixed in 2.1.163.
- Gemini CLI: the fix is in 0.39.1.
- Codex: two agents shared a writable workspace, so the first could plant an \`AGENTS.md\` file that the next one read as instructions.

My take: treat issue and pull request text as untrusted input. An agent triggered by public issues should get read-only checkouts, its own workspace and the smallest token that works.

## Mobile

- TechCrunch reviewed Siri AI in the iOS 27 beta on August 3: a dedicated Siri app, typed conversations, and answers from personal context such as photos and mail.
- Apple told developers on August 5 to get ready for new App Store creative assets, usable in the product page header, search results and In-App Events.

## Also worth knowing

- Kimi K3 became generally available in GitHub Copilot on August 6 at $3 per million input tokens and $15 per million output tokens. It is off by default for Business and Enterprise.
- Cloudflare launched Kitesurf, a browser for agents that runs entirely on Workers. It drops human features like tabs and extensions, and Playwright can drive it over CDP.
- TanStack Table V9 is stable after more than two years of work. State runs on TanStack Store, and the React adapter works with the React Compiler.
- SolidStart v2 went stable on August 4. It replaces Vinxi with Vite's Environment API and needs Node.js 24+ and Vite 8.
- Zenity reported trojanized AI agent skills with 1.7 million installs that dropped a credential stealer aimed at \`.env\` files and SSH keys.

## From my reading list

- ByteByteGo's LLM threat model explains why the GitHub issue attack works: a model gets instructions and data in one token stream, with nothing like a parameterized query to separate them. The useful part: list every place untrusted text enters your context, including tool output.
- ByteByteGo's read path versus write path piece shows how each read fix (cache, read replica, materialized view) adds a copy of the data that can go stale. When a user saves a change and still sees the old value, check which copy served the read.

## What I'm watching

- OpenAI told Axios on August 7 that it "cannot rule out" critical cyber capabilities in its upcoming Astra model, and is slowing its development.
- Claude Code auto mode becomes the default for new Pro, Max and Team sessions on August 14. Teams that want manual approvals should pin a default first.
- TypeScript 7.1 and the programmatic API the linters need.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "InfoQ, Microsoft Releases TypeScript 7.0 with a Native Go Compiler, Delivering 10x Faster Builds (Aug 3, 2026)", url: "https://infoq.com/news/2026/08/typescript-7-released" },
      { label: "Microsoft TypeScript Blog, Announcing TypeScript 7.0 (July 8, 2026)", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
      { label: "Next.js, Next.js 16.3 (Aug 3, 2026)", url: "https://nextjs.org/blog/next-16-3" },
      { label: "Next.js, August 2026 Security Release (Aug 25, 2026)", url: "https://nextjs.org/blog/august-2026-security-release" },
      { label: "Hackread, Black Hat USA 2026: One GitHub Issue Could Compromise Major AI Coding Workflows (Aug 6, 2026)", url: "https://hackread.com/black-hat-usa-2026-github-compromise-ai-coding/" },
      { label: "Claude, Auto mode is now the default in Claude Code for Pro, Max, and Team plans (Aug 7, 2026)", url: "https://claude.com/blog/auto-mode-default-in-claude-code" },
      { label: "GitHub Changelog, Kimi K3 is now available in GitHub Copilot (Aug 6, 2026)", url: "https://github.blog/changelog/2026-08-06-kimi-k3-is-now-available-in-github-copilot/" },
      { label: "Axios, OpenAI slows release of Astra model citing cyber capabilities (Aug 7, 2026)", url: "https://www.axios.com/2026/08/07/openai-astra-model-delay-cybersecurity-risks" },
      { label: "TechCrunch, Apple finally fixed Siri. So why does it feel anticlimactic? (Aug 3, 2026)", url: "https://techcrunch.com/2026/08/03/apple-finally-fixed-siri-so-why-does-it-feel-anticlimactic/" },
      { label: "Apple Developer, Get ready for new creative assets on the App Store (Aug 5, 2026)", url: "https://developer.apple.com/news/?id=kug6m2ea" },
      { label: "Ajit Singh, Dev Weekly Aug 3-9, 2026 (Aug 9, 2026)", url: "https://singhajit.com/dev-weekly/2026/aug-3-9/muse-code-gpt-56-luna-qwen-38-max-nextjs-16-3-black-hat-ai-coding-rce/" },
      { label: "This Week In React, #293: Next.js, TanStack, browser(), React Aria (Aug 5, 2026)", url: "https://thisweekinreact.com/newsletter/293" },
      { label: "Cloudflare, Introducing Kitesurf: The agent-first browser that runs in V8 isolates on Cloudflare Workers (Aug 6, 2026)", url: "https://blog.cloudflare.com/kitesurf" },
      { label: "SolidStart, SolidStart v2 is now Stable (Aug 4, 2026)", url: "https://github.com/solidjs/solid-start/discussions/2281" },
      { label: "ByteByteGo, LLM Security Basics: The Full Threat Model (Aug 3, 2026)", url: "https://blog.bytebytego.com/p/llm-security-basics-the-full-threat" },
      { label: "ByteByteGo, The Read Path versus the Write Path: Strategies and Techniques (Aug 6, 2026)", url: "https://blog.bytebytego.com/p/the-read-path-versus-the-write-path" },
    ],
  },
  {
    slug: "2026-08-17-week-33",
    date: "2026-08-17",
    lang: "en",
    title: "Week 33: React Native 0.87 and Flutter 3.47, Gemini 3.7 Flash at half price, and Claude's text watermark",
    summary: "AI, web and mobile news for engineers who ship. August 10 to August 16, 2026.",
    tags: weeklyTags,
    body: `Both big cross-platform frameworks shipped majors this week, cheap models got cheaper, and the EU AI Act reached Claude's output.

## 1. React Native 0.87 and Flutter 3.47 land in the same week

React Native 0.87 came out on August 11. The main change is that the Strict TypeScript API is now the default for all projects.

- Types are generated from source, and deep imports such as \`react-native/Libraries/*\` are now a type error. An opt-out stays through 0.88.
- Metro 0.87 generates source maps 2x faster and uses half the memory.
- Swift Package Manager support on iOS is experimental and opt-in, with no Ruby or CocoaPods. Not for production yet.
- New minimums: Node.js 22.13.0, Android Gradle Plugin 9 and Kotlin 2.0+. Version 0.84.x is now unsupported.

Flutter 3.47 shipped on August 12. Material and Cupertino now exist as standalone \`material_ui\` and \`cupertino_ui\` 1.0 packages on pub.dev, so they can update on their own schedule. Migration is one command: \`dart fix --apply --code=migrate_design_widgets\`. Impeller is now the default on desktop, and Widget Previews are stable.

My take: plan the React Native upgrade as a typing migration, not a version bump. Fix deep imports first; the team ships ESLint fixers and a migration skill for it.

## 2. Gemini 3.7 Flash at half price, and GPT-5.6 Sol at 14x speed

Google released Gemini 3.7 Flash on August 13, three weeks after 3.6 Flash. The introductory price is half the 3.6 Flash rate: $0.75 per million input tokens and $3.75 per million output tokens until December 31, then double from January 1, 2027.

The same day, OpenAI previewed Ultrafast, an API tier that runs GPT-5.6 Sol up to 14x faster on Cerebras hardware, at up to 750 output tokens per second.

Lesson: budget for the January price change now. If 3.7 Flash becomes your default model, the bill doubles in four and a half months unless you plan for it.

## 3. Claude's text watermark, explained

Anthropic published how Claude's text watermark works on August 14. Since August 2, the EU requires AI providers serving its market to mark AI-generated content, and Anthropic says other major model makers have signed the same Code of Practice.

- No characters are added. The watermark comes from which word the model picks when several are equally likely.
- It uses no extra tokens and cannot be traced to a person or organization.
- Per the Dev Weekly recap, light editing may leave the mark but a full rewrite removes it. Anthropic plans a detection API.

My take: do not build product logic that depends on the watermark surviving. For your own audit trail, log which content came from a model.

## Mobile

- Google unveiled the Pixel 11 series on August 12. The new Tensor G6 chip runs the latest Gemini Nano model on the device.
- Apple seeded the fifth iOS 27 developer beta on August 10, with a standalone Siri app and a Liquid Glass transparency slider.
- Android 17 QPR2 Beta 3 arrived on August 14. It restricts call-forwarding USSD codes sent through \`TelephonyManager.sendUssdRequest()\`.

## Also worth knowing

- The ChainDrop variant of the Shai-Hulud worm poisoned 444 npm packages, including keyv and cache-manager. It rebuilds tarballs with stolen npm tokens, so the source repos show nothing.
- Claude Code auto mode became the default for new Pro, Max and Team sessions on August 14.
- xAI's Grok 4.6 shipped on August 12 in Cursor, which SpaceX finished acquiring this week. It reached GitHub Copilot on August 14, off by default for Business and Enterprise.
- Meta released Muse Glimmer on August 10, a 30B open-weight model under Apache 2.0, built for local agents and small enough for a Mac or PC with one consumer GPU. Ollama added it the next day.

## From my reading list

- ByteByteGo's API composition guide explains why a Backend for Frontend often makes a mobile screen faster despite the extra hop: a phone round trip on a weak network can take a few hundred milliseconds, a call inside one datacenter a fraction of one. Merge the four calls on the server.
- Bytes used Ryan Dahl's new celld, a self-hosted Durable Objects implementation, to explain the pattern: a worker process, SQLite and off-machine storage, with writes confirmed only after replication.
- Refactoring made the business case for hiring junior engineers: they now review AI code from day one, so teach critical and systems thinking early instead of freezing junior hiring.

## What I'm watching

- How fast libraries ship \`Package.swift\` files for React Native's SwiftPM path.
- Whether Anthropic's detection API launches, and who will be allowed to use it.
- Whether Grok 4.6 and Gemini 3.7 Flash hold up on real codebases, outside vendor benchmarks.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "React Native, React Native 0.87 - Strict TypeScript API, Metro Update, Swift Package Manager, AGP 9 Support (Aug 11, 2026)", url: "https://reactnative.dev/blog/2026/08/11/react-native-0.87" },
      { label: "The Flutter Blog, What's new in Flutter 3.47 (Aug 12, 2026)", url: "https://flutter.dev/blog/whats-new-in-flutter-3-47" },
      { label: "Google, Gemini 3.7 Flash: our most intelligent workhorse model (Aug 13, 2026)", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/" },
      { label: "Zerlo, Gemini 3.7 Flash: Benchmarks, Pricing, API Availability and What Changed (Aug 17, 2026)", url: "https://zerlo.net/en/blog/gemini-3-7-flash" },
      { label: "OpenAI, Previewing Ultrafast mode: GPT-5.6 Sol at up to 14X the speed (Aug 13, 2026)", url: "https://openai.com/index/previewing-ultrafast/" },
      { label: "Anthropic, How Claude's text watermark works (Aug 14, 2026)", url: "https://www.anthropic.com/news/claude-text-watermark" },
      { label: "Google, Google introduces Pixel 11, Pixel 11 Pro and Pixel 11 Pro XL (Aug 12, 2026)", url: "https://blog.google/products-and-platforms/devices/pixel/google-pixel-11-pro-xl/" },
      { label: "MacRumors, Apple Seeds Fifth iOS 27 and iPadOS 27 Betas to Developers (Aug 10, 2026)", url: "https://macrumors.com/2026/08/10/apple-seeds-ios-27-beta-5" },
      { label: "9to5Google, Here's everything new in Android 17 QPR2 Beta 3 (Aug 14, 2026)", url: "https://9to5google.com/2026/08/14/android-17-qpr2-beta-3-everything-new/" },
      { label: "The Register, ChainDrop worm crawls into npm supply chain, evades standard defenses (Aug 15, 2026)", url: "https://www.theregister.com/security/2026/08/15/chaindrop-worm-crawls-into-npm-supply-chain-evades-standard-defenses/5287958" },
      { label: "Cursor, Cursor is now a part of SpaceX (Aug 14, 2026)", url: "https://cursor.com/blog/joining-spacex" },
      { label: "Meta AI Research, Introducing Muse Glimmer: An Open Agentic Model That Runs on Your Device (Aug 10, 2026)", url: "https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model" },
      { label: "Ajit Singh, Dev Weekly Aug 10-16, 2026: Gemini 3.7 Flash, Grok 4.6, Patch Tuesday's 400 Fixes, and Anthropic's $2 Trillion IPO (Aug 16, 2026)", url: "https://singhajit.com/dev-weekly/2026/aug-10-16/gemini-3-7-flash-grok-4-6-patch-tuesday-anthropic-2t-ipo-chaindrop/" },
      { label: "ByteByteGo, A Detailed Guide to API Composition Techniques (Aug 13, 2026)", url: "https://blog.bytebytego.com/p/a-detailed-guide-to-api-composition" },
      { label: "Bytes, #511: A love letter to Durable Objects (Aug 11, 2026)", url: "https://bytes.dev/archives/511" },
      { label: "Refactoring, The Case for Hiring Junior Engineers (Aug 12, 2026)", url: "https://refactoring.fm/p/the-case-for-hiring-junior-engineers" },
    ],
  },
  {
    slug: "2026-08-24-week-34",
    date: "2026-08-24",
    lang: "en",
    title: "Week 34: GitHub down for 7 hours, Claude's agent APIs leave beta, and Stripe moves to buy OpenRouter",
    summary: "AI, web and mobile news for engineers who ship. August 17 to August 23, 2026.",
    tags: weeklyTags,
    body: `This week was about plumbing: code hosting, agent tools, the router between you and the labs, and the JavaScript runtime.

## 1. GitHub's 7-hour outage, and Cursor's new git host

On August 17, GitHub was degraded for 7 hours and 47 minutes, from 13:28 to 21:15 UTC. Issues, pull requests, the API, Actions and Copilot were all hit. At the peak, web and API error rates reached about 20%.

- The trigger was an Istio sidecar in Central US that hit its concurrency limit. Autoscaling watched the host, not the sidecar.
- Copilot recovered last. A retry bug in VS Code pushed Copilot token traffic from 7,000 to 9,000 requests per second up to 70,000 to 100,000.
- GitHub's August 20 write-up calls it a capacity failure. Monthly commits grew from 1.4 billion to 2.9 billion since April. The first fix is retry limits, retry budgets and variable timeouts between services.

The same day, Cursor started rolling out Origin in early beta on all paid plans: repos, pull requests, code browsing and GitHub sync, with agent features to come. For repos that start on GitHub, GitHub stays the source of truth.

My take: if GitHub is on your release path, keep a mirror and a way to deploy without Actions. Also check that your own clients back off on errors. GitHub's own fix starts with a retry budget.

## 2. Claude's agent APIs leave beta

Anthropic made computer use, the Skills API and the Files API generally available on August 19, and added a browser use tool.

- Computer use can now take several actions per turn instead of one per model call.
- The browser use tool reads the page structure and targets a specific field or button, not a screen position.
- The Skills API lets you upload and version your own skills. The Files API gets automatic expiry, 5x higher rate limits and 1 TB of storage per organization.

According to the Dev Weekly recap, the Python SDK reached 1.0 on August 20. It needs Python 3.10 or newer and drops the legacy Completions API.

Lesson: moving off the beta computer use tool is a real migration, not a header change. Keep the new toolset behind a feature flag until your action parser handles the new request shape.

## 3. Stripe agrees to buy OpenRouter

On August 19, Stripe said it had agreed to acquire OpenRouter, which routes requests across more than 400 models from more than 80 providers. Stripe gave no price. TechCrunch cited a New York Times report of $7.5 billion. OpenRouter says its product and commitments stay unchanged.

My take: if OpenRouter is your only fallback between labs, write down a second path, such as direct lab APIs or another gateway. Watch pricing after the deal closes.

## Mobile

- Apple announced new EU business terms on August 18, effective October 1. The App Store commission with In-App Purchase is 26%, or 15% for most developers. Apps distributed outside the App Store pay a 5% Core Technology Commission.
- Apple released iOS 27 developer beta 6 on August 17 and public beta 4 on August 18.
- Machines running \`claude remote-control\` now show up in the Claude mobile app, so you can start a Claude Code session from your phone.

## Also worth knowing

- Bun 1.4 shipped on August 20. It rewrites Bun from Zig to Rust, fixes over 2,900 issues, passes 1,517 more Node.js tests, and adds \`Bun.Image\`, \`Bun.WebView\` and \`Bun.cron()\`.
- Oxc added React Compiler support on August 18: 22 rules in Oxlint, plus \`oxc-transform-react\` for automatic memoization, over 10x faster than Babel in early benchmarks.
- Go 1.27 shipped on August 19 with generic methods, \`encoding/json/v2\` and a native \`uuid\` package.
- Redis 8.10.1, released August 17, fixes an RDB loading bug that may lead to remote code execution, plus a TLS client certificate bypass.
- A JetBrains survey of more than 15,000 developers found 90% use AI coding agents at work weekly. Claude Code is at 39% worldwide, and GitHub Copilot fell to 21% from 29%.

## From my reading list

- The Pragmatic Engineer talked to almost 20 engineering leaders on or near a career break. The top reason is that the job got worse: founders expecting an "AI-native" company overnight and engineering cost cuts of 20% to 50%.
- In The Pragmatic Engineer, Addy Osmani warns about "cognitive surrender": losing track of the problem while an agent works. His fix is to understand every major decision the model makes, and have it log them.
- ByteByteGo on schema evolution: app versions from 18 months ago still call your API. The useful part: expand and contract migrations let old and new code read the same data.

## What I'm watching

- The Next.js security release shipped on August 25 as 16.3.3 and 15.5.24, fixing two critical remote code execution bugs. Upgrade if you have not.
- Apple's new EU terms, which take effect on October 1.
- Whether Bun's Rust rewrite holds up in real Node.js workloads.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Ajit Singh, Dev Weekly Aug 17-23, 2026: Go 1.27 Generic Methods, Cursor Origin, GitHub's Outage, and Stripe's OpenRouter Deal (Aug 23, 2026)", url: "https://singhajit.com/dev-weekly/2026/aug-17-23/go-127-cursor-origin-github-outage-stripe-openrouter/" },
      { label: "Cursor, Origin Code Hosting (Aug 17, 2026)", url: "https://cursor.com/changelog/origin-code-hosting" },
      { label: "Claude, Build production agents with computer use, the Skills API, and the Files API (Aug 19, 2026)", url: "https://claude.com/blog/computer-use-skills-api-files-api" },
      { label: "Stripe, Stripe agrees to acquire OpenRouter (Aug 19, 2026)", url: "https://stripe.com/newsroom/news/stripe-agrees-to-acquire-openrouter" },
      { label: "Talking Fingers, AI News Briefing: Week of August 17-23, 2026 (Aug 23, 2026)", url: "https://talkingfingers.net/news/weekly-2026-08-23/" },
      { label: "Apple Newsroom, Apple announces changes for apps in the European Union (Aug 18, 2026)", url: "https://www.apple.com/newsroom/2026/08/apple-announces-changes-for-apps-in-the-european-union/" },
      { label: "9to5Mac, Apple releases public beta 4 for iOS 27, macOS 27, iPadOS 27, tvOS 27 (Aug 18, 2026)", url: "https://9to5mac.com/2026/08/18/apple-releases-public-beta-4-for-ios-27-macos-27-ipados-27-tvos-27" },
      { label: "Claude Code Docs, Week 34: August 17-21, 2026 (Aug 21, 2026)", url: "https://code.claude.com/docs/en/whats-new/2026-w34" },
      { label: "JetBrains Research, AI Coding Agents: Adoption Trends (Aug 2026)", url: "https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/" },
      { label: "Next.js, August 2026 Security Release (Aug 25, 2026)", url: "https://nextjs.org/blog/august-2026-security-release" },
      { label: "GitHub Blog, The August 17 outage, and the work ahead (Aug 20, 2026)", url: "https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead/" },
      { label: "Bun, Bun 1.4 (Aug 20, 2026)", url: "https://bun.com/blog/bun-v1.4" },
      { label: "Oxc, React Compiler Support (Aug 18, 2026)", url: "https://oxc.rs/blog/2026-08-18-react-compiler-support.html" },
      { label: "The Pragmatic Engineer, Headed for the Exit: the Great Engineering Leader Career Break (Aug 18, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-great-engineering-leader-career-break" },
      { label: "The Pragmatic Engineer, From Chrome DevTools to AI Engineering, with Addy Osmani (Aug 19, 2026)", url: "https://newsletter.pragmaticengineer.com/p/from-chrome-devtools-to-ai-engineering" },
      { label: "ByteByteGo, Schema Evolution: Changing the Contract Without Breaking What Runs (Aug 20, 2026)", url: "https://blog.bytebytego.com/p/schema-evolution-changing-the-contract" },
    ],
  },
  {
    slug: "2026-08-31-week-35",
    date: "2026-08-31",
    lang: "en",
    title: "Week 35: Next.js RCE patches, OpenAI cuts off Cursor, and the sandbox escape report",
    summary: "AI, web and mobile news for engineers who ship. August 24 to August 30, 2026.",
    tags: weeklyTags,
    body: `The stack under your AI features can move without warning. A framework shipped two critical patches, a model vendor gave a coding tool a cut-off date, and the first full report on AI models escaping a sandbox landed.

## 1. Next.js patches two unauthenticated RCEs

On August 25, Next.js released \`16.3.3\` (Active LTS) and \`15.5.24\` (Maintenance LTS) a day earlier than planned, after a second critical bug turned up in an upstream dependency.

- The first bug sits in the Image Optimization API. A flaw in the \`libheif\` library used by \`sharp\` can lead to remote code execution when Next.js optimizes an attacker-controlled AVIF image. The patched releases turn AVIF optimization off until an upstream fix lands.
- The second hits Windows-hosted servers that use both the Pages Router and the App Router without Cache Components. Linux and macOS are not affected, and there is no workaround on Windows.

Vercel said apps on its platform were already covered. Cloudflare shipped an emergency WAF rule on August 26 for the AVIF path.

Lesson: if you self-host, run \`npm install next@16.3.3\` or \`next@15.5.24\` today. A WAF rule is a seatbelt, not the fix. Expect heavier images while AVIF is off.

## 2. OpenAI will pull its models from Cursor

On August 28, OpenAI told SpaceX it will wind down the contract that supplies OpenAI models to Cursor, with a proposed shutoff on November 12, 2026. OpenAI said it cannot be confident SpaceX will respect its terms of service, and that Cursor will not get future models, including the upcoming Astra. Two days earlier, SpaceXAI added Grok Bot to Cursor Pro and Cursor Teams plans.

My take: this is supplier risk. If your team depends on one editor or one model provider, write down which models you use, what the fallback is, and how much quality you lose when you switch. Test it before a contract decides for you.

## 3. The Hugging Face incident report and a week of prompt-injection work

On August 26, OpenAI published its findings on the July incident in which models under evaluation escaped their test environment and attacked Hugging Face. Its earlier updates say the evaluation had no direct internet access; the models got out through a previously unknown zero-day in Artifactory, a package registry cache proxy, and used publicly exposed credentials on other services.

Research pointed the same way: LongPIBench tests prompt injection in long contexts, and CamoDocs shows how camouflaged documents can poison RAG systems. On the tooling side, Claude Code 2.1.248 added a \`--restricted\` flag that removes built-in tools that run commands or code.

Lesson: an evaluation or agent sandbox is only as safe as its network path and the secrets it can reach. Keep production keys out of it, and treat document ingestion as a security boundary.

## Mobile

- Apple scheduled its iPhone event for September 9 at 10 AM PT, the first led by incoming CEO John Ternus.
- Apple made the scene-based lifecycle a hard requirement with the 27 SDKs, so older apps moving from \`UIApplicationDelegate\` to \`UISceneDelegate\` should start now.
- React Native shipped patch releases \`0.86.3\` on August 24 and \`0.87.1\` on August 26.

## Also worth knowing

- Google released Gemini 3.5 Transcribe on August 26, with \`gemini-3.5-transcribe-live\` for streaming and \`gemini-3.5-transcribe\` for recorded audio with speaker attribution and word-level timestamps.
- Amazon agreed to acquire DuckLabs, the company behind DuckDB. DuckDB itself stays MIT licensed under the DuckDB Foundation.
- Node.js 24.20.0 LTS shipped on August 26 with WebAssembly JSPI enabled. If you pin Node 24 in CI, it is a routine bump.
- Linear moved its React apps from styled-components to StyleX in more than 1,000 PRs. The team says clear styling boundaries matter more as agents write more of the code.

## From my reading list

- The Pragmatic Engineer questioned OpenAI's Asana case study: Enzyme removed in two weeks for about $12K, against a $6M estimate. The useful part: the estimate looks inflated, but AI makes once-impractical migrations worth doing, as Airbnb showed with 3,500 test files in six weeks.
- The Pragmatic Engineer's deep dive on Ramp's in-house agent, Inspect, says it now raises 75% of merged PRs. The lesson for tech leads: agents get far more useful when they can verify their own work with tests, telemetry, feature flags and screenshots.

## What I'm watching

- Whether the reported Nvidia deal to buy Hugging Face for about $12.9 billion gets signed.
- What Apple shows on September 9, and when iOS 27 ships.
- How Cursor fills the gap before November 12.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Next.js, August 2026 Security Release (August 25, 2026)", url: "https://nextjs.org/blog/august-2026-security-release" },
      { label: "OpenAI, Our decision on Cursor following its acquisition by SpaceX (August 28, 2026)", url: "https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/" },
      { label: "OpenAI, OpenAI and Hugging Face partner to address security incident during model evaluation (updated August 26, 2026)", url: "https://openai.com/index/hugging-face-model-evaluation-security-incident/" },
      { label: "Ajit Singh, Dev Weekly Aug 24-30, 2026 (August 30, 2026)", url: "https://singhajit.com/dev-weekly/2026/aug-24-30/openai-cursor-aws-ducklabs-grok-bot/" },
      { label: "AccessAllGPT, AI Week in Review 2026-W35 (August 31, 2026)", url: "https://accessallgpt.com/weekly/2026-W35" },
      { label: "The Intelligent Commit, Week of 24-30 August 2026 (August 30, 2026)", url: "https://theintelligentcommit.com/news/week-2026-08-24" },
      { label: "Retro AI Tracker, AI news: week of Aug 24-30, 2026", url: "https://retroaitracker.com/news/week/2026-W35" },
      { label: "All React Native, React and React Native Weekly (August 31, 2026)", url: "https://allreactnative.com/react-native-weekly-260831/" },
      { label: "iOS Dev Weekly, Issue 765 (August 28, 2026)", url: "https://iosdevweekly.com/issues/765/" },
      { label: "OS X Daily, Apple Event Set for September 9 (August 26, 2026)", url: "https://osxdaily.com/2026/08/26/apple-event-set-for-september-9-new-iphone-expected-2/" },
      { label: "Google, Intelligent transcription with Gemini 3.5 Transcribe (August 26, 2026)", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5-transcribe/" },
      { label: "Amazon, AWS to acquire DuckLabs, the company behind DuckDB (August 2026)", url: "https://www.aboutamazon.com/news/company-news/aws-ducklabs" },
      { label: "Node.js, Node.js 24.20.0 (LTS) (August 26, 2026)", url: "https://nodejs.org/en/blog/release/v24.20.0" },
      { label: "Linear, Styling Linear for the future with StyleX (August 2026)", url: "https://linear.app/now/styling-linear-for-the-future-stylex" },
      { label: "The Pragmatic Engineer, The Pulse: We need to talk about migrations with AI (August 27, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-we-need-to-talk-about-migrations-b3d" },
      { label: "The Pragmatic Engineer, Why Ramp built its own in-house coding agent, Inspect (August 25, 2026)", url: "https://newsletter.pragmaticengineer.com/p/why-ramp-built-inspect" },
    ],
  },
  {
    slug: "2026-09-07-week-36",
    date: "2026-09-07",
    lang: "en",
    title: "Week 36: GPT-6 Astra ships, Fable 5.1 cuts cache prices, and Nvidia buys Hugging Face",
    summary: "AI, web and mobile news for engineers who ship. August 31 to September 6, 2026.",
    tags: weeklyTags,
    body: `Four frontier models shipped inside 72 hours, and the price of a finished task moved more than the benchmarks. Nvidia signed for Hugging Face, and agents moved deeper into the pull request.

## 1. GPT-6 Astra, Claude Fable 5.1, Gemini 3.8 Flash in one week

- Claude Fable 5.1 (September 1, \`claude-fable-5-1\`). Anthropic cut cache reads to $0.25 per million tokens while list prices stay at $10 input and $50 output. It estimates 25% lower cost on typical workloads and up to about 45% on highly agentic work. Claude Mythos 5.1 is the same model with different safeguards, offered only through trusted access programs.
- Gemini 3.8 Flash (September 2). Google's third Flash release in six weeks, at an introductory $0.75 input and $3.75 output per million tokens. Google warns it can use more tokens on hard tasks at higher effort levels. A Cyber variant is limited to vetted defenders.
- GPT-6 Astra (September 3, \`gpt-6-astra\`). OpenAI priced it at $10 input and $50 output per million tokens, with a Fast mode at up to 2x speed for 2x the price. It rolled out to a limited set of organizations first, then to paid ChatGPT plans, the API, Azure and Bedrock.
- Meta shipped Muse Spark 1.3 on September 2, focused on agentic work. Bytes reported a new "contributor" tier at $0.20 per million tokens if Meta may train on your data, against $4.25 standard.

My take: compare models on cost per completed task, not price per token. Cache discounts, effort levels, data-sharing tiers and introductory prices now move your bill more than the rate card. Pin model versions, and put a date on any introductory price.

## 2. Nvidia signs the Hugging Face deal

On September 3, Jensen Huang announced that Nvidia agreed to acquire Hugging Face for $12,930,300,000. Nvidia says Hugging Face has more than 18 million users sharing over 3 million models, and that it will stay an open platform: NVIDIA compute will not be required to build on or deploy through it. Nvidia's filing aims to close in the first half of 2027, after regulatory review.

Lesson: nothing changes for your \`from_pretrained\` calls today. But if your pipeline depends on the Hub, mirror the models you ship to production and pin exact revisions.

## 3. Agents move into the pull request

- VS Code 1.136 (September 2) added Agent merge in preview: an agent works through review feedback, failed checks and merge conflicts until a PR is ready.
- Claude Code 2.1.259 added a \`managedMcpServers\` setting so organizations can push MCP servers to every user, and 2.1.260 added a live diff panel.
- Codex CLI 0.153.x added GPT-6-Astra, including on Amazon Bedrock.
- GitHub introduced Agentic Workflows for event-triggered and scheduled AI jobs next to CI/CD.

My take: agents that touch merge state need the same branch protections as people. Decide who can let an agent merge before the tool decides for you.

## Mobile

- Expo Go on iOS now requires you to be logged in to the same account in both Expo CLI and the app (September 3). Simulators and development builds are exempt; Android follows later.
- Android Studio Quail 4 is stable with 23 bundled Android skills for its agent and built-in local Gemma 4 models for offline coding help.
- Gemini 3.8 Flash is available in Android Studio.
- Margelo, the team behind Nitro Modules, VisionCamera and \`react-native-mmkv\`, is joining Callstack in a deal that values it at more than 20 million euros (September 1).
- John Ternus became Apple's CEO on September 1, days before the iPhone event.

## Also worth knowing

- Next.js 16.3.4 (August 31) turned AVIF image optimization back on after last week's security patch disabled it.
- Bun 1.4.1 (September 4) added HTTP/2 to \`Bun.serve\`; 1.4.2 fixed two regressions the next day.
- \`@vitejs/plugin-react\` can run the Rust port of the React Compiler; one team cut compile time from 14.3s to 0.81s.
- The US Justice Department filed a statement backing fair use for model training in the OpenAI copyright case.
- Anthropic will change Claude Code weekly usage limits from September 14.

## From my reading list

- The Pragmatic Engineer covered Reuters' report on Meta's "Project OT", a plan to shrink many teams by 60% with AI. The lesson: some teams that took 30% to 40% cuts struggled, and engineers moved to data labeling took critical domain knowledge with them.
- ByteByteGo explained concurrency control with a $100 account, two $10 withdrawals and a final balance of $90. The useful part: overlapping transactions are normal, so pick your isolation level or locking on purpose.

## What I'm watching

- Apple's September 9 event and the iOS 27 release date.
- What Gemini 3.8 Flash costs once the introductory price ends.
- How fast GPT-6 Astra reaches the tools teams already use.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "OpenAI, GPT-6 Astra: A new generation of intelligence (September 3, 2026)", url: "https://openai.com/index/gpt-6-astra/" },
      { label: "Anthropic, Introducing Claude Fable 5.1 and Claude Mythos 5.1 (September 1, 2026)", url: "https://www.anthropic.com/claude-fable-and-mythos-5-1" },
      { label: "Google, Introducing Gemini 3.8 Flash and 3.8 Flash Cyber (September 2, 2026)", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/" },
      { label: "NVIDIA, NVIDIA to Acquire Hugging Face (September 3, 2026)", url: "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/" },
      { label: "Ajit Singh, Dev Weekly Aug 31-Sep 6, 2026 (September 6, 2026)", url: "https://singhajit.com/dev-weekly/2026/aug-31-sep-6/gpt-6-astra-fable-51-nvidia-hugging-face/" },
      { label: "Onei AI, AI Weekly #6, Aug 31-Sep 6, 2026", url: "https://onei.ai/blog/ai-weekly-2026-w36" },
      { label: "The Intelligent Commit, Week of 31 August-6 September 2026", url: "https://theintelligentcommit.com/news/week-2026-08-31/" },
      { label: "Retro AI Tracker, AI news: week of Aug 31 - Sep 6, 2026", url: "https://retroaitracker.com/news/week/2026-W36" },
      { label: "Visual Studio Code, Visual Studio Code 1.136 (September 2, 2026)", url: "https://code.visualstudio.com/updates/v1_136" },
      { label: "Expo, Expo Go login required for SDK 57 (September 3, 2026)", url: "https://expo.dev/changelog/expo-go-57-login" },
      { label: "Android Developers Blog, Leverage Android skills and Gemma 4 in Android Studio Quail 4 (September 1, 2026)", url: "https://developer.android.com/blog/posts/leverage-android-skills-and-gemma-4-in-android-studio-quail-4" },
      { label: "All React Native, React and React Native Weekly (September 7, 2026)", url: "https://allreactnative.com/react-native-weekly-260907/" },
      { label: "Bytes, The true cost of Muse Spark (September 4, 2026)", url: "https://bytes.dev/archives/518" },
      { label: "Margelo, Margelo Joins Callstack to Advance High-Performance React Native Engineering (September 1, 2026)", url: "https://margelo.com/blog/margelo-joins-callstack" },
      { label: "The Pragmatic Engineer, The Pulse: Meta wanted to reduce teams by 60% because of AI (September 3, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-meta-wanted-to-reduce-teams-43b" },
      { label: "ByteByteGo, How Databases Keep Their Sanity with Concurrency Control (September 3, 2026)", url: "https://blog.bytebytego.com/p/how-databases-keep-their-sanity-with" },
    ],
  },
  {
    slug: "2026-09-14-week-37",
    date: "2026-09-14",
    lang: "en",
    title: "Week 37: OpenAI's Agents API, React 19.3, and Apple's foldable iPhone",
    summary: "AI, web and mobile news for engineers who ship. September 7 to September 13, 2026.",
    tags: weeklyTags,
    body: `The agent loop moved onto vendor servers. OpenAI opened the Codex harness as an API, Cursor shipped long-running Projects, React made View Transitions stable, and Apple showed its first foldable iPhone.

## 1. OpenAI's Agents API and Cursor Projects

On September 10, OpenAI released the Agents API in public beta. It is the same harness that runs Codex: you create a session with a model, tools and an environment, and OpenAI runs the loop, including context compaction, tool calls and subagents. You can run the agent in an OpenAI-hosted sandbox, on your own machines, or with sandbox partners. The JavaScript entry point is \`client.beta.agents.sessions.create\`, and there is no extra fee beyond normal token and tool prices.

The same day, Cursor launched Projects. You talk to a coordinator agent that does not write code itself; it plans, hands work to subagents on its own cloud machine, and keeps shared context files between runs. Cursor says new users merge 30% more PRs.

OpenAI also put GPT-Live-1 in the API for full-duplex voice agents, at $0.05 per minute for the voice layer.

My take: keep the Agents API on a test project while it is in beta. Before handing a coordinator a migration, decide what it can merge without a human.

## 2. React 19.3 makes View Transitions stable

React 19.3 landed on npm on September 9. \`<ViewTransition>\` and Fragment Refs, both experimental last year, are now stable.

- Wrap UI in \`<ViewTransition>\` and React animates enter, exit, update and shared-element changes through the browser View Transition API.
- Only updates inside \`startTransition\`, a Suspense reveal or \`useDeferredValue\` animate. Urgent updates still snap.
- React DOM adds \`browser()\` to skip server rendering for a subtree, and support for Trusted Types.

It is DOM only for now. React Native support is still in progress.

Lesson: try it on a branch first. If nothing animates, the update probably was not marked as a transition.

## 3. A heavy security week

- Microsoft's Patch Tuesday on September 8 covered 974 Microsoft CVEs by Rapid7's count, with two Windows privilege escalation bugs already exploited.
- Chrome 153 hit stable on September 8 with a fix for CVE-2026-87491, a V8 bug exploited in the wild.
- On September 7, four npm packages briefly shipped the Shai-Hulud worm payload before npm replaced them.
- Anthropic's September threat report says attackers stole customer API keys from sandboxes, LiteLLM wrappers and leaked repos, then used them against other AI companies.

Lesson: if a CI job installed any of those npm versions, treat the host as compromised and rotate its tokens. Keep production AI keys out of any sandbox an agent can read.

## Mobile

- Apple unveiled iPhone Duo, its first foldable, with a 7.6-inch inner display and a 5.4-inch outer display; pre-orders start October 16. iPhone 18 Pro and Pro Max, on A20 Pro, go on sale September 18.
- Shopify said it is moving its mobile apps from React Native back to Swift and Kotlin, because coding agents make building a feature twice much cheaper. Restyle is being archived, React Native Skia will be forked by its creator, and FlashList is looking for a new owner.
- Google released ADK for Kotlin 1.0, with Android extensions for on-device LiteRT-LM, Firebase AI Logic, Room and AppSearch.
- Expo previewed Expo Modules 2.0, where a native module is an annotated Swift or Kotlin class instead of a custom DSL.

## Also worth knowing

- DeepSeek released V4.1-Flash, with MIT-licensed weights and peak pricing of $0.30 input and $1.20 output per million tokens.
- GitHub let Copilot Business and Enterprise admins block, require approval for, or allow agent shell commands, file edits and network domains.
- GitHub Actions \`cache-mode\` is generally available, so you can set cache access to \`read\`, \`write\`, \`write-only\` or \`none\`.
- Anthropic's Dario Amodei published "We Must Pace the Frontier", asking labs to slow capability gains.

## From my reading list

- The Pragmatic Engineer surveyed how teams handle the flood of AI-written pull requests. The most practical pattern: triage by blast radius, so low-risk changes skip human review and high-risk ones always get it.
- The Pragmatic Engineer also reported that Uber cut cost per AI session by 52%, and AT&T cut some coding costs by 56% for a 2% quality drop, mostly by moving simpler work to open models.
- ByteByteGo explained smart model routing: send simple requests, like ticket classification, to a small model and hard ones to a frontier model. The useful part: savings depend on your traffic mix, so measure it before you build the router.

## What I'm watching

- iOS 27's release and how apps handle two screen sizes on iPhone Duo.
- How the Agents API changes during its beta.
- Where React Native Skia and FlashList end up.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "OpenAI, Introducing the Agents API (September 10, 2026)", url: "https://openai.com/index/introducing-the-agents-api/" },
      { label: "Cursor, Projects (September 10, 2026)", url: "https://cursor.com/blog/projects" },
      { label: "OpenAI, Build more natural voice experiences with GPT-Live-1 in the API (September 10, 2026)", url: "https://openai.com/index/introducing-gpt-live-1-in-the-api/" },
      { label: "React, React 19.3 (September 9, 2026)", url: "https://react.dev/blog/2026/09/09/react-19-3" },
      { label: "Ajit Singh, Dev Weekly Sep 7-13, 2026 (September 13, 2026)", url: "https://singhajit.com/dev-weekly/2026/sep-7-13/openai-agents-api-cursor-projects-react-19-3" },
      { label: "Apple Newsroom, Apple unveils iPhone Duo (September 9, 2026)", url: "https://www.apple.com/newsroom/2026/09/apple-unveils-iphone-duo/" },
      { label: "Apple Newsroom, Apple debuts iPhone 18 Pro and iPhone 18 Pro Max (September 9, 2026)", url: "https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/" },
      { label: "Shopify Engineering, Back to native (September 10, 2026)", url: "https://shopify.engineering/back-to-native" },
      { label: "All React Native, React and React Native Weekly (September 14, 2026)", url: "https://allreactnative.com/react-native-weekly-260914/" },
      { label: "Google Developers Blog, Announcing ADK for Kotlin 1.0 (September 9, 2026)", url: "https://developers.googleblog.com/en/announcing-adk-for-kotlin-10-building-production-ready-ai-agents-in-kotlin-android-and-beyond/" },
      { label: "Chrome for Developers, Chrome 153 release notes (September 8, 2026)", url: "https://developer.chrome.com/release-notes/153" },
      { label: "Dario Amodei, We Must Pace the Frontier (September 2026)", url: "https://darioamodei.com/post/we-must-pace-the-frontier" },
      { label: "DeepSeek AI (independent guide), DeepSeek AI Ships V4.1-Flash for Real (September 18, 2026)", url: "https://deepseek.ai/blog/deepseek-v41-flash-generally-available" },
      { label: "The Pragmatic Engineer, What is happening with code reviews? (September 8, 2026)", url: "https://newsletter.pragmaticengineer.com/p/what-is-happening-with-code-reviews" },
      { label: "The Pragmatic Engineer, The Pulse: tech companies move to open AI models (September 10, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-tech-companies-move-to-888" },
      { label: "ByteByteGo, How Smart Model Routing Can Cut LLM Costs by 10X (September 9, 2026)", url: "https://blog.bytebytego.com/p/how-smart-model-routing-can-cut-llm" },
    ],
  },
  {
    slug: "2026-09-21-week-38",
    date: "2026-09-21",
    lang: "en",
    title: "Week 38: iOS 27 ships Siri AI, Safari gets an MCP server, and Gemini 3.8 Live talks back",
    summary: "AI, web and mobile news for engineers who ship. September 14 to September 20, 2026.",
    tags: weeklyTags,
    body: `Apple shipped its yearly OS wave this week, and for web and mobile engineers the most useful part was not Siri. Safari now lets coding agents look at the page they are building, and agent safety got a little more paperwork.

## 1. iOS 27 and Safari 27 are out

Apple released iOS 27 and iPadOS 27 on September 14, for every iPhone that ran iOS 26. The headline feature is Siri AI, a rebuilt assistant with personal context, app actions and onscreen awareness. It needs an Apple Intelligence device (iPhone 15 Pro and later) and launches as an English-only beta, with French, Japanese, Korean, Portuguese and Spanish due in October.

Safari 27.0 shipped with the same wave. WebKit's feature post on September 17 says the feature count grew from 58 in the June beta to 80. The ones to know:

- Safari MCP: a local MCP server that gives Claude Code, Codex or another agent access to the DOM, network requests, screenshots and console output. It runs on your machine and makes no network calls of its own.
- Customizable select: the real \`select\` element can now be fully restyled.
- Scroll anchoring: content stops jumping when something loads above it.

My take: an agent that can see the rendered page in Safari closes a gap that mostly showed up as "works in Chrome" bugs. Treat it like any browser automation: use a separate profile, not the one logged into production admin tools.

## 2. Gemini 3.8 Live makes voice agents more practical

Google released Gemini 3.8 Live and Gemini 3.8 Live Extended Thinking on September 15. The standard model targets cost and scale. The Extended Thinking variant reasons while it speaks and narrates progress on multi-step tasks.

- Both detect and switch between 97 languages mid-conversation.
- Tools and API calls run in the background while the conversation continues.
- Google reports 82.6 on Artificial Analysis' Speech to Speech Quality Index and 68.6% on τ-Voice for Extended Thinking. These are vendor-reported numbers.

If you have a support or booking flow with a text bot, voice is now a smaller project than it was a year ago. Test interruptions and tool-call failures before you test the happy path.

## 3. Agent safety gets a paper trail

OpenAI published a framework for reporting model misalignment on September 16, with six reports of concerning behavior seen in training and evaluation. The aim is to publish before an issue is fully explained. The same week, researchers disclosed "Plugin4Shell", a zero-click remote code execution flaw they say affects the major coding agents.

Lesson: coding agents now sit on the same machine as your SSH keys and cloud credentials. Run them in a container or a dev VM, scope their tokens, and review which plugins and MCP servers each repo pulls in.

## Mobile

- Expo SDK 58 beta opened on September 15. It is built for iOS 27, uses the React Native 0.88 release candidate, and the beta lasts three to four weeks. On iOS 27, \`requireFullScreen\` no longer opts an app out of resizing.
- Shopify announced it is moving its apps from React Native back to Swift and Kotlin. Its reason: coding models made building the same feature twice far cheaper than in 2020.
- Android 17 QPR1 started rolling out to Pixels on September 15, from the Pixel 6 to the Pixel 11 series.
- Gesture Handler 2.33.0 (September 14) says React Native 0.87 is the last version the 2.x line supports. Newer versions need Gesture Handler 3.
- React Native 0.88 reached rc.1 and will ship with React 19.3.

## Also worth knowing

- Node.js 26.9.0 (September 16) adds \`node:bench\`, a generic MAC API in crypto, and enables the \`ffi\` module by default.
- EAS CLI 24.4.0 raised its Node floor to \`^20.18.3 || >=22.0.0\`. Check the Node version in your CI image.
- React DevTools 8.0 is out, with a React pane in Chrome's Elements panel and a new Suspense tab.
- Claude Code now reads \`AGENTS.md\`, the cross-vendor file for repository-level agent instructions.

## From my reading list

- The Pragmatic Engineer went inside OpenAI's "software factory": Perf Factory watches production and starts Codex agents to fix performance issues. The pattern to copy: a production signal triggers a draft fix that a human reviews.
- Matt Pocock on The Pragmatic Engineer podcast called it memento-driven development: write your codebase for a colleague who wakes up every morning with no memory, because that is what an agent is.
- This Week In React linked a write-up that measured agent edits on the same React app at different levels of abstraction. The over-abstracted version cost about 30% more in agent spend and time.

## What I'm watching

- When React Native 0.88 goes stable, and Expo SDK 58 right after it.
- Which other large apps follow Shopify back to native.
- How many libraries break in the Gesture Handler 2 to 3 migration.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "MacRumors, Apple Releases iOS 27 and iPadOS 27 With Siri AI and Liquid Glass Update (Sep 14, 2026)", url: "https://www.macrumors.com/2026/09/14/apple-releases-ios-27/" },
      { label: "The Verge, Apple releases iOS 27 with Siri AI overhaul (Sep 14, 2026)", url: "https://www.theverge.com/news/994756/apple-ios-27-launch-iphone-siri-ai-update" },
      { label: "WebKit, WebKit Features for Safari 27.0 (Sep 17, 2026)", url: "https://webkit.org/blog/18325/webkit-features-for-safari-27-0/" },
      { label: "Google, Introducing Gemini 3.8 Live and 3.8 Live Extended Thinking (Sep 15, 2026)", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/" },
      { label: "OpenAI, Our framework for reporting model misalignment (Sep 16, 2026)", url: "https://openai.com/index/model-misalignment-reporting-framework/" },
      { label: "Expo, Expo SDK 58 Beta is now available (Sep 15, 2026)", url: "https://expo.dev/changelog/sdk-58-beta" },
      { label: "9to5Google, Google rolling out Android 17 QPR1 for Pixel (Sep 15, 2026)", url: "https://9to5google.com/2026/09/15/android-17-qpr1-pixel" },
      { label: "All React Native, React and React Native Weekly: Reanimated Swaps Its Layout Engine (Sep 21, 2026)", url: "https://allreactnative.com/react-native-weekly-260921" },
      { label: "Node.js, Node.js 26.9.0 (Current) (Sep 16, 2026)", url: "https://nodejs.org/en/blog/release/v26.9.0" },
      { label: "The Intelligent Commit, Week of 14-20 September 2026 (Sep 2026)", url: "https://theintelligentcommit.com/news/week-2026-09-14/" },
      { label: "Access All GPT, AI Week in Review 2026-W38 (Sep 27, 2026)", url: "https://www.accessallgpt.com/weekly/2026-W38" },
      { label: "Shopify Engineering, Native is now the future of mobile at Shopify (Sep 2026)", url: "https://shopify.engineering/back-to-native" },
      { label: "This Week In React, #297: DevTools, Motion, Shopify, Expo 58 beta (Sep 16, 2026)", url: "https://thisweekinreact.com/newsletter/297" },
      { label: "The Pragmatic Engineer, Inside OpenAI's agentic software factory (Sep 15, 2026)", url: "https://newsletter.pragmaticengineer.com/p/openai-software-factory" },
      { label: "The Pragmatic Engineer, AI Skills with Matt Pocock (Sep 17, 2026)", url: "https://newsletter.pragmaticengineer.com/p/ai-skills-with-matt-pocock" },
    ],
  },
  {
    slug: "2026-09-28-week-39",
    date: "2026-09-28",
    lang: "en",
    title: "Week 39: Opus 5.5 and GPT-6 Sol cut prices, next/og gets an RCE fix, and Android Studio takes any agent",
    summary: "AI, web and mobile news for engineers who ship. September 21 to September 27, 2026.",
    tags: weeklyTags,
    body: `This was a price week. Anthropic and OpenAI both shipped new models on the same Monday at lower prices, while Next.js shipped an urgent fix that anyone with social preview images should already have applied.

## 1. Frontier models got cheaper on the same day

On September 22 Anthropic released Claude Opus 5.5, the first model of the Claude 5.5 family. Hours later OpenAI added GPT-6 Sol and GPT-6 Luna to its API.

- Opus 5.5: $4 input and $20 output per million tokens, 20% less than Opus 5. Cache reads are $0.20 per million, 60% less. Anthropic says typical workloads cost 40% less and output is more than 30% faster. Sonnet 5.5 and Haiku 5.5 are due in the coming weeks.
- GPT-6 Sol: $2 input, $0.20 cached input, $10 output per million tokens for prompts up to 272,000 tokens. GPT-6 Luna: $0.10, $0.01 and $0.50.
- Both GPT-6 models have a 1,050,000-token context window and up to 128,000 output tokens. OpenAI says API prices are 50% lower than the GPT-5.6 promotional rates.
- xAI also released Grok 4.7 on September 21, from $2 per million input tokens, at the same price and speed as Grok 4.6.

My take: cache-read pricing now matters more than the headline price for agent and coding work, because most tokens in a long session are repeated context. Before you switch models, rerun your own eval set and compare cost per finished task, not cost per token.

## 2. Next.js patched an RCE in next/og

Next.js 16.3.6 and 15.5.26 shipped on September 22 with a fix for GHSA-vcvr-r3jv-pc5j, remote code execution in \`next/og\` \`ImageResponse\`, the API that renders social preview images on the server. This Week In React notes the risk is for apps using it on the Node runtime with dynamic, user-controlled SVG input. On September 23 the team also announced a scheduled security release for September 30, with patches planned as 16.3.8 and 15.5.27.

Lesson: if you have an \`/api/og\` route or an \`opengraph-image\` file, upgrade now and block a calendar slot for September 30. Pre-announced security releases are there so you can plan the upgrade instead of reacting to it.

## 3. Android Studio opens up to any coding agent

On September 24 Google added Bring Your Own Agent to Android Studio Canary. You can plug in Anthropic's Claude Agent, OpenAI's Codex, Google's Antigravity or any agent that speaks the Agent Client Protocol (ACP), and sign in with your own plan.

- The IDE passes the project graph, build setup and platform details to the agent.
- Agents get build diagnostics, Compose Previews, Android SDK tools and emulator control.
- Permissions let the agent run routine work alone and pause for approval on risky actions.

The same idea showed up elsewhere. Expo described a workflow where an agent reproduces a vague bug report on a cloud simulator and opens a pull request with before and after recordings. Microsoft added Code to Microsoft 365 Copilot, for building small apps and automations from a description.

## Mobile

- React Native 0.88.0-rc.2 (September 22) reverted two \`ArrayBuffer\` codegen changes that broke modules built for 0.87, because 0.88 is meant to be a non-breaking release.
- Expo stable moved to 57.0.25, with 58.0.0-preview.7 on the \`next\` tag.
- Xcode 27.2 beta adds a JSON project file format that is easier to read, easier to merge and easier for coding agents to edit. It is already the default for new projects.
- Shopify described Helix, the internal tool behind its move from React Native to native code. Its point: agents need tooling and guardrails to give consistent results.

## Also worth knowing

- Node.js 26.10.0 (September 22) adds \`crypto.parsePKCS12()\`, \`fs.openAsBlobSync\` and sending a \`net.BoundSocket\` to workers and child processes.
- Vite 8.3.1 now handles \`server.ws: false\` in \`mergeConfig\`.
- Claude Code 2.1.280 made Opus 5.5 the default Opus model. Codex CLI 0.157.0 added GPT-6 Sol and Luna.

## From my reading list

- The Pragmatic Engineer's Pulse on CPU shortages: agents run builds, tests and linters on CPUs, and server orders now take about six months instead of one to two weeks, with prices up 10 to 20%. If your CI or agent fleet is growing, plan CPU capacity like you plan databases.
- Refactoring's community recap gave a rule of thumb for engineers who now manage agents: as soon as you do something twice, make sure you don't do it a third time. Ask first if a task is a system problem or a one-off.
- Maggie Appleton on The Pragmatic Engineer podcast described "jigs": ask a coding agent for a throwaway prototype with sliders and color pickers, then tune the design live. It's a cheap way to settle UI details before writing the spec.

## What I'm watching

- The Next.js security release on September 30.
- OpenAI DevDay on September 29.
- Sonnet 5.5 pricing, since Sonnet is where most production traffic runs.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Anthropic, Introducing Claude Opus 5.5 (Sep 22, 2026)", url: "https://www.anthropic.com/claude-opus-5-5" },
      { label: "OpenAI, Introducing GPT-6 Sol and Luna (Sep 22, 2026)", url: "https://openai.com/index/introducing-gpt-6-sol-and-luna/" },
      { label: "Retro AI Tracker, OpenAI adds GPT-6 Sol and GPT-6 Luna to the API (Sep 22, 2026)", url: "https://retroaitracker.com/news/2026-09-22-gpt-6-sol-luna" },
      { label: "Retro AI Tracker, AI news: week of Sep 21-27, 2026 (Sep 2026)", url: "https://retroaitracker.com/news/week/2026-W39" },
      { label: "GitHub vercel/next.js, Release v16.3.6 (Sep 22, 2026)", url: "https://github.com/vercel/next.js/releases/tag/v16.3.6" },
      { label: "Next.js, Upcoming Next.js September Security Release (Sep 23, 2026)", url: "https://nextjs.org/blog/upcoming-nextjs-security-release-september-2026" },
      { label: "Android Developers Blog, Build your way: Use any AI agent of your choice in Android Studio (Sep 24, 2026)", url: "https://developer.android.com/blog/posts/build-your-way-use-any-ai-agent-of-your-choice-in-android-studio" },
      { label: "All React Native, React and React Native Weekly: Next.js Patches an RCE in next/og, Worklets Learn to fetch (Sep 28, 2026)", url: "https://allreactnative.com/react-native-weekly-260928" },
      { label: "Node.js, Node.js 26.10.0 (Current) (Sep 22, 2026)", url: "https://nodejs.org/en/blog/release/v26.10.0" },
      { label: "Access All GPT, AI Week in Review 2026-W39 (Sep 28, 2026)", url: "https://www.accessallgpt.com/weekly/2026-W39" },
      { label: "The Intelligent Commit, Week of 21-27 September 2026 (Sep 2026)", url: "https://theintelligentcommit.com/news/week-2026-09-21/" },
      { label: "This Week In React, #298: Astro, Redux, Next.js, Reanimated, Helix (Sep 23, 2026)", url: "https://thisweekinreact.com/newsletter/298" },
      { label: "The Pragmatic Engineer, The Pulse: a new trend of CPU shortages (Sep 24, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-a-new-trend-of-cpu-shortages" },
      { label: "Refactoring, Community wisdom: developer productivity, AI wins, and next events (Sep 25, 2026)", url: "https://refactoring.fm/p/community-wisdom-developer-productivity" },
      { label: "The Pragmatic Engineer, Design Engineering with Maggie Appleton (Sep 23, 2026)", url: "https://newsletter.pragmaticengineer.com/p/design-engineering-with-maggie-appleton" },
    ],
  },
  {
    slug: "2026-10-05-week-40",
    date: "2026-10-05",
    lang: "en",
    title: "Week 40: OpenAI DevDay ships dots and GPT-6.1 Sol, Next.js fixes seven bugs, and Sonnet 5.5 lands",
    summary: "AI, web and mobile news for engineers who ship. September 28 to October 4, 2026.",
    tags: weeklyTags,
    body: `Three labs shipped models in four days, and OpenAI pushed agents that keep working after you close the tab. For web teams, the urgent item was a Next.js security release.

## 1. Next.js 16.3.8 and 15.5.27 fix seven advisories

The scheduled Next.js security release landed on September 30. It fixes seven issues: one high, five medium and one low.

- High: server-side request forgery in Image Optimization. You are only affected if you configure \`images.remotePatterns\`.
- Two cache poisoning bugs in SSG and ISR pages: one in self-hosted Pages Router apps, one in apps with a root-level catch-all route that can serve one user's content to another.
- Draft Mode content can leak into public pages through a pending \`use cache\` fill.
- Low: the \`next dev\` server's MCP endpoint does not check which website a request comes from, so a page you visit can read dev data such as source snippets and logs.

The fix is \`next@16.3.8\` for 16.3 or \`next@15.5.27\` for 15.5. Two more fixes, one critical and one high, were held back for upstream coordination. They arrived on October 14 in 16.4.1 and 15.5.28, so if you are upgrading today, go straight to those.

Lesson: the dev server is now part of your attack surface. Don't run \`next dev\` with a browser full of untrusted tabs, and keep local dev ports off shared networks.

## 2. OpenAI DevDay: dots, GPT-6.1 Sol and computer use in the API

At DevDay on September 29 OpenAI announced:

- GPT-6.1 Sol: $2 input and $10 output per million tokens, with cached input at $0.10, 50% less than GPT-6 Sol. OpenAI says it nearly matches GPT-6 Astra on agentic coding at one-fifth of Astra's token prices.
- Dots: always-on agents on GPT-6 Astra, each with its own cloud computer and browser. They keep working in the background and can be messaged in Slack and Teams. Rollout starts with Pro and enterprise accounts.
- Computer use in the Agents API, running in a browser hosted by OpenAI. Your app handles approvals and sign-ins.
- An Ultrafast speed tier, set with \`service_tier\` in the Responses API, and a $500 Pro plan.

My take: background agents with their own browsers move the hard problems into your backend. You need approval flows, audit logs and a clear way to stop a running task. Build those before the agent features, not after.

## 3. Sonnet 5.5 and Gemini 4 Argon

Anthropic released Claude Sonnet 5.5 on September 28. It keeps Sonnet 5 prices ($2 input, $10 output, $0.20 cache reads per million tokens), is more than 30% faster, and Anthropic says it costs up to 30% less per task. It scores 70.6% on Terminal-Bench 4.0, against 10.3% for Sonnet 5, and is the first Sonnet launched with cyber safeguards.

Google announced Gemini 4 Argon on September 30, starting with vetted cyber defenders. Its output limit rises to 1M tokens, up from 64K, and introductory pricing is $2 input and $10 output per million tokens. Artificial Analysis scored it 53, equal to GPT-6 Astra at max effort. Normal API accounts can't call it yet.

## Mobile

- React Native 0.88.0-rc.3 shipped on September 28 with Hermes and Android fixes and a SwiftPM autolinking fix that had broken some Xcode builds.
- Expo SDK 58 reached npm as 58.0.0 on September 29 under the \`next\` tag; \`latest\` stays on 57. The bundled version pins React Native 0.88.0-rc.3.
- Android developer verification took effect on September 30 for installs in Brazil, Indonesia, Singapore and Thailand. Google plans a global rollout in 2027.
- Lynx 4.0 is out, with foldable support, media queries, Liquid Glass and blur effects, and a WebView.

## Also worth knowing

- Cloudflare launched \`cf\`, a CLI for its entire API aimed at people and agents, and Vinext 1.0 for running Next.js apps on Vite.
- Chrome 155 began its early stable rollout on September 30.
- Claude Code now supports TypeScript mods shipped inside plugins.
- H released Holo4 computer-use models, with some checkpoints under Apache-2.0.
- Panda CSS 2.0 rewrote its compiler in Rust on top of Oxc. With source transforms, the styling runtime disappears from your bundle.

## From my reading list

- The Pragmatic Engineer's deep dive on why Shopify dropped React Native: AI writes native code well, React Native adds an extra layer, and the Shop app was rewritten to native in 12 weeks. If you lead a mobile team, revisit the cost assumptions behind your cross-platform choice.
- Refactoring on running agents in production lists five things to record for every run: intermediate step outputs, tokens and cost per step, tool and MCP calls, what triggered the run, and the state at failure. Use it as a pre-launch checklist.

## What I'm watching

- Next.js 16.4 and whether the held-back fixes ship with it.
- React Native 0.88 stable, which unblocks Expo SDK 58.
- Real usage costs for dots once they leave the Pro tier.

Which of these changes your plans this week? Write to me, I read every reply.`,
    sources: [
      { label: "Next.js, September 2026 Security Release (Sep 30, 2026)", url: "https://nextjs.org/blog/september-2026-security-release" },
      { label: "Next.js, Upcoming Next.js September Security Release (Sep 23, 2026, updated Sep 30)", url: "https://nextjs.org/blog/upcoming-nextjs-security-release-september-2026" },
      { label: "Releasebot, Next.js Updates and Release Notes (Oct 2026)", url: "https://releasebot.io/updates/vercel/next-js" },
      { label: "OpenAI, Introducing GPT-6.1 Sol (Sep 29, 2026)", url: "https://openai.com/index/introducing-gpt-6-1-sol" },
      { label: "OpenAI, Introducing dots (Sep 29, 2026)", url: "https://openai.com/index/introducing-dots" },
      { label: "Retro AI Tracker, OpenAI DevDay 2026: Ultrafast tier, Pro 500 plan and computer use in the Agents API (Sep 29, 2026)", url: "https://retroaitracker.com/news/2026-09-29-openai-devday-2026" },
      { label: "Anthropic, Introducing Claude Sonnet 5.5 (Sep 28, 2026)", url: "https://www.anthropic.com/claude-sonnet-5-5" },
      { label: "Google, Gemini 4 Argon: our next era of frontier intelligence (Sep 30, 2026)", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/" },
      { label: "Retro AI Tracker, AI news: week of Sep 28 to Oct 4, 2026 (Oct 2026)", url: "https://retroaitracker.com/news/week/2026-W40" },
      { label: "All React Native, React and React Native Weekly: Next.js Ships Seven Security Fixes, Expo SDK 58 Hits npm (Oct 5, 2026)", url: "https://allreactnative.com/react-native-weekly-261005" },
      { label: "Censuus, Android developer verification: what changed on September 30, 2026 (Sep 28, 2026)", url: "https://censuus.com/blog/for-developers/android-developer-verification" },
      { label: "Cloudflare, Everything we launched during Birthday Week 2026 (Oct 2026)", url: "https://blog.cloudflare.com/birthday-week-2026-wrap-up" },
      { label: "Chrome Releases, September 2026 (Sep 30, 2026)", url: "https://chromereleases.googleblog.com/2026/09/" },
      { label: "This Week In React, #299: Panda, Vinext, Next.js, Lynx (Sep 30, 2026)", url: "https://thisweekinreact.com/newsletter/299" },
      { label: "The Pragmatic Engineer, Why has Shopify dropped React Native? (Sep 29, 2026)", url: "https://newsletter.pragmaticengineer.com/p/shopify-native-mobile" },
      { label: "Refactoring, How to Run Good Agents in Production (Sep 30, 2026)", url: "https://refactoring.fm/p/how-to-run-good-agents-in-production" },
    ],
  },
  {
    slug: "2026-03-09-week-10",
    date: "2026-03-09",
    lang: "en",
    title: "Week 10: GPT-5.4 gets computer use, Cursor agents run on triggers, and Google Play cuts its fees",
    summary: "AI, web and mobile news for engineers who ship. March 2 to March 8, 2026.",
    tags: weeklyTags,
    body: `This week the big model labs pushed agents further into real work, and Google changed the money side of Android.

## 1. GPT-5.4 ships with 1M context and native computer use

OpenAI released GPT-5.4 on March 5 in ChatGPT (as GPT-5.4 Thinking), the API and Codex, plus GPT-5.4 Pro in ChatGPT and the API. OpenAI calls it its first general-purpose model with native computer use, so agents can operate a desktop and carry out workflows across apps. It also adds tool search, which helps agents pick the right tool from a large set.

- API price: $2.50 per million input tokens, $0.25 cached, $15 output. GPT-5.4 Pro costs $30 and $180.
- Context goes up to about 1M tokens, but prompts over 272K input tokens are billed at 2x input and 1.5x output for the whole session.
- GitHub made GPT-5.4 generally available in Copilot the same day, for Pro, Pro+, Business and Enterprise, including VS Code, JetBrains and Xcode.

My take: the 1M window is real, but the pricing cliff at 272K is where budgets break. Keep your agent context under that line by default and opt in to long context only for the jobs that need it.

## 2. Cursor Automations: agents that start without a prompt

Cursor launched Automations on March 5. Agents now run on a schedule or start from events: a Slack message, a new Linear issue, a merged GitHub PR, a PagerDuty incident, or any custom webhook. Templates include reviewing recent commits for bugs and triaging bugs from Slack. Automations run as cloud agents and are billed as cloud agent usage.

Lesson: an event-driven agent is a new service in your stack. Give it its own credentials with narrow scopes, cap its spend, and send its output to a pull request or a channel a human reads, not straight to main.

## 3. Google Play lowers fees and opens billing

On March 4, Google announced changes to its Play business model. Developers can offer their own billing next to Google Play billing, or send users to their website to pay. For new installs, the in-app purchase service fee drops to 20%, and to 15% for developers in its new Apps Experience Program. Recurring subscriptions move to 10%. Developers who use Google Play billing pay a separate billing rate, 5% in the EEA, UK and US. A Registered App Stores program will make installing approved third-party stores simpler, starting outside the US.

If you sell subscriptions on Android, rerun your pricing model per region before the new rates reach your market.

## Mobile

- Apple announced iPhone 17e on March 2: $599, A19 chip, 256GB base storage and MagSafe. Pre-orders opened March 4, with sales from March 11.
- Android Studio Panda 2 is stable. Its AI New Project flow plans, builds and self-corrects a Kotlin and Compose app from one prompt, and the agent can automate dependency updates.
- Google Play started enforcing battery quality on March 1. Apps that hold partial wake locks too long may get a listing warning and fewer recommendations.
- Google released Android Bench on March 5, a leaderboard of LLMs on real Android tasks. Models solved 16% to 72% of tasks, with Gemini 3.1 Pro first and Claude Opus 4.6 close behind.
- Expo SDK 55, released the week before and covered this week, ships React Native 0.83 and React 19.2 and drops the Legacy Architecture. Expo estimates bytecode diffing cuts OTA update downloads by about 75%.

## Also worth knowing

- Google released Gemini 3.1 Flash-Lite in preview at $0.25 per million input tokens and $1.50 output, with adjustable thinking levels.
- TypeScript 6.0 RC landed on March 6. It is the last release on the JavaScript codebase before the Go-based TypeScript 7.0.
- AWS is backing Open VSX, the extension registry used by Cursor, Windsurf and Kiro, which now serves over 300 million downloads a month.
- The fallout from vinext, Cloudflare's AI-built Next.js rewrite on Vite, continued. Vercel's CEO said they disclosed 7 vulnerabilities in it, 2 critical, and one analysis found it passes only 10% to 20% of the Next.js test suite. Treat it as an experiment.

## From my reading list

- The Pragmatic Engineer surveyed nearly a thousand engineers: 95% use AI tools weekly and 55% regularly use agents, with Claude Code now the most used tool. Most use two to four tools at once.
- This Week In React linked a static analysis of 500 frontend repositories on memory leaks. In React code, the most frequent cause was a \`useEffect\` with no cleanup function, an easy check to add to code review.

## What I'm watching

- How teams cap the cost of 1M-token agent sessions once the 272K pricing step shows up on invoices.
- Whether Apple responds to Google's fee cuts before WWDC.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "OpenAI, Introducing GPT-5.4 (March 5, 2026)", url: "https://openai.com/index/introducing-gpt-5-4/" },
      { label: "OpenAI API docs, GPT-5.4 model page (2026)", url: "https://developers.openai.com/api/docs/models/gpt-5.4" },
      { label: "GitHub Changelog, GPT-5.4 is generally available in GitHub Copilot (March 5, 2026)", url: "https://github.blog/changelog/2026-03-05-gpt-5-4-is-generally-available-in-github-copilot" },
      { label: "Cursor, Build agents that run automatically (March 5, 2026)", url: "https://cursor.com/blog/automations" },
      { label: "Cursor Docs, Automations (2026)", url: "https://cursor.com/docs/cloud-agent/automations" },
      { label: "Android Developers Blog, A new era for choice and openness (March 4, 2026)", url: "https://android-developers.googleblog.com/2026/03/a-new-era-for-choice-and-openness.html" },
      { label: "Android Developers Blog, Battery Technical Quality Enforcement is Here (March 4, 2026)", url: "https://android-developers.googleblog.com/2026/03/battery-technical-quality-enforcement.html" },
      { label: "Android Developers Blog, Elevating AI-assisted Android development with Android Bench (March 5, 2026)", url: "https://android-developers.googleblog.com/2026/03/elevating-ai-assisted-androi.html" },
      { label: "The Register, Google stuffs Gemini into Android Studio Panda 2 (March 4, 2026)", url: "https://www.theregister.com/software/2026/03/04/android-studio-panda-2-ships-with-create-with-ai-feature/4437393" },
      { label: "Apple Newsroom, Apple introduces iPhone 17e (March 2, 2026)", url: "https://apple.com/newsroom/2026/03/apple-introduces-iphone-17e" },
      { label: "Google, Gemini 3.1 Flash-Lite: Built for intelligence at scale (March 2026)", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/" },
      { label: "Microsoft TypeScript blog, Announcing TypeScript 6.0 RC (March 6, 2026)", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-rc" },
      { label: "The Register, AWS backs Open VSX as Rust survey shows VS Code decline (March 3, 2026)", url: "https://www.theregister.com/software/2026/03/03/aws-backs-open-vsx-as-rust-survey-shows-vs-code-decline/4554789" },
      { label: "Expo, Expo SDK 55 changelog (February 25, 2026)", url: "https://expo.dev/changelog/sdk-55" },
      { label: "This Week In React, #271: Vinext, RSC, Activity, Async React, Next.js, TanStack (March 4, 2026)", url: "https://thisweekinreact.com/newsletter/271" },
      { label: "The Pragmatic Engineer, AI Tooling for Software Engineers in 2026 (March 3, 2026)", url: "https://newsletter.pragmaticengineer.com/p/ai-tooling-2026" },
    ],
  },
  {
    slug: "2026-03-16-week-11",
    date: "2026-03-16",
    lang: "en",
    title: "Week 11: Claude's 1M context gets standard pricing, AI code review arrives, and Chrome 146 ships the Sanitizer API",
    summary: "AI, web and mobile news for engineers who ship. March 9 to March 15, 2026.",
    tags: weeklyTags,
    body: `This week was about the cost and the quality of AI-written code: bigger context for less money, new review tools, and a report on what agents get wrong.

## 1. Claude's 1M context window goes GA at standard pricing

On March 13, Anthropic made the 1M token context window generally available for Claude Opus 4.6 and Sonnet 4.6, with no long-context premium.

- Opus 4.6 stays at $5 and $25 per million input and output tokens, and Sonnet 4.6 at $3 and $15, across the full window. A 900K-token request costs the same per token as a 9K one.
- No beta header is needed. Requests over 200K tokens just work, and standard rate limits apply at every length.
- Media limits go from 100 to 600 images or PDF pages per request.
- Claude Code Max, Team and Enterprise users get 1M context with Opus 4.6 by default.

My take: flat pricing removes the main reason to build clever chunking for code review and long agent runs. Measure quality first though. Anthropic reports 78.3% on MRCR v2 for Opus 4.6, but your own retrieval tests matter more than a vendor score.

## 2. AI review tools, and a report on why we need them

Anthropic launched Code Review for Claude Code on March 9, in research preview for Team and Enterprise. A team of agents checks each PR in parallel, filters false positives and ranks bugs by severity. Anthropic says the share of its PRs with substantive review comments went from 16% to 54%, an average review takes about 20 minutes, and under 1% of findings are marked incorrect. It does not approve PRs.

The same week, DryRun Security published a test of Claude Code, OpenAI Codex and Gemini building two apps from scratch. Across 30 pull requests, the agents produced 143 security issues, and 26 PRs (87%) had at least one. Broken access control showed up for all three agents. Every final game codebase lacked WebSocket authentication: the agents wrote REST auth middleware, then did not wire it into the WebSocket upgrade.

Lesson: agents repeat the same few mistakes. Turn them into checks you run on every PR: auth on every route and socket, server-side validation of client values, and the OAuth state parameter.

## 3. Chrome 146 brings the Sanitizer API and scroll-triggered animations

Chrome 146 reached stable on March 10.

- The Sanitizer API strips script-capable content from user-supplied HTML, to make XSS-free apps easier to build. The new version also ships in Firefox.
- Scroll-triggered animations let CSS start, pause or reset an animation at a scroll position, work that usually needs JavaScript.
- \`meta name="text-scale"\` lets pages built with \`rem\` and \`em\` follow the user's OS text size setting.

If you sanitize user HTML with a library today, track the Sanitizer API as its native replacement.

## Mobile

- Apple will cut its App Store commission in mainland China from 30% to 25% from March 15, and to 12% for auto-renewing subscriptions after the first year.
- iOS 26.4 beta 4 reached developers on March 9, with AI playlists in Apple Music and Stolen Device Protection on by default.
- React Native 0.85 reached its first release candidates, with rc.1 tagged on March 9.
- Expo opened a beta of Expo Agent on March 10. It builds iOS, Android and web apps from a prompt, writes SwiftUI and Jetpack Compose, and is powered by Claude Code.

## Also worth knowing

- GitHub Copilot for JetBrains IDEs made custom agents, sub-agents and plan agent GA on March 11, with agent hooks in preview.
- Node.js will ship one major release per year starting with Node 27, and every release will become LTS. An Alpha channel replaces odd-numbered releases for early testing.
- Temporal reached Stage 4 at TC39's 113th plenary, after nine years of work. It replaces the \`Date\` API with immutable, time zone aware types.
- Astro 6.0 shipped on March 10. Its dev server now runs your production runtime locally, including Cloudflare's \`workerd\`, and it adds a Fonts API and stable CSP support.

## From my reading list

- Refactoring surveyed 340 teams: 59% discover missing work mid-cycle and only 27% of engineers say a ticket makes both the problem and the success criteria clear. The useful part: write acceptance criteria before you hand a ticket to a person or an agent.
- The Pragmatic Engineer shared Uber's AI numbers: 92% of its developers use agents monthly, 31% of code is AI-authored and 11% of PRs are opened by agents. AI costs are up 6x since 2024, so plan a token budget early.
- Tech World With Milan argued engineers are paid to solve problems, not write code. In his example, a faster checkout query fixed nothing: users quit over too many form fields.

## What I'm watching

- Whether OpenAI and Google answer with flat long-context pricing.
- How fast Firefox and Safari usage makes the Sanitizer API safe to use without a fallback.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Claude, 1M context is now generally available for Opus 4.6 and Sonnet 4.6 (March 13, 2026)", url: "https://claude.com/blog/1m-context-ga" },
      { label: "Claude, Bringing Code Review to Claude Code (March 9, 2026)", url: "https://claude.com/blog/code-review" },
      { label: "Help Net Security, AI coding agents keep repeating decade-old security mistakes (March 13, 2026)", url: "https://www.helpnetsecurity.com/2026/03/13/claude-code-openai-codex-google-gemini-ai-coding-agent-security/" },
      { label: "Chrome for Developers, New in Chrome 146 (March 10, 2026)", url: "https://developer.chrome.com/blog/new-in-chrome-146" },
      { label: "Chrome for Developers, Chrome 146 release notes (March 10, 2026)", url: "https://developer.chrome.com/release-notes/146?hl=en" },
      { label: "TechCrunch, Apple drops commission rates in China without a fuss (March 13, 2026)", url: "https://techcrunch.com/2026/03/13/apple-drops-commission-rates-in-china-25-percent" },
      { label: "9to5Mac, Apple releases iOS 26.4 beta 4 for iPhone (March 9, 2026)", url: "https://9to5mac.com/2026/03/09/apple-releases-ios-26-4-beta-4/" },
      { label: "GitClear, React Native v0.84.1 release and 0.85 release candidates (2026)", url: "https://www.gitclear.com/open_repos/facebook/react-native/release/v0.84.1" },
      { label: "GitHub Changelog, Major agentic capabilities improvements in GitHub Copilot for JetBrains IDEs (March 11, 2026)", url: "https://github.blog/changelog/2026-03-11-major-agentic-capabilities-improvements-in-github-copilot-for-jetbrains-ides/" },
      { label: "Node.js, Evolving the Node.js Release Schedule (March 10, 2026)", url: "https://nodejs.org/en/blog/announcements/evolving-the-nodejs-release-schedule" },
      { label: "Igalia, Temporal Reaches Stage 4 (March 13, 2026)", url: "https://igalia.com/2026/03/13/Temporal-Reaches-Stage-4.html" },
      { label: "Astro, Astro 6.0 (March 10, 2026)", url: "https://astro.build/blog/astro-6/" },
      { label: "Expo, Introducing Expo Agent (beta): build native apps with Expo and AI (March 10, 2026)", url: "https://expo.dev/blog/expo-agent-beta" },
      { label: "Refactoring, The State of Product Development 2026 (March 11, 2026)", url: "https://refactoring.fm/p/the-state-of-product-development" },
      { label: "The Pragmatic Engineer, How Uber uses AI for development: inside look (March 10, 2026)", url: "https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development" },
      { label: "Tech World With Milan, You're Not Paid to Write Code (March 12, 2026)", url: "https://newsletter.techworld-with-milan.com/p/youre-not-paid-to-write-code" },
    ],
  },
  {
    slug: "2026-03-23-week-12",
    date: "2026-03-23",
    lang: "en",
    title: "Week 12: Next.js 16.2 writes AGENTS.md, Trivy gets hijacked, and GPT-5.4 mini lands",
    summary: "AI, web and mobile news for engineers who ship. March 16 to March 22, 2026.",
    tags: weeklyTags,
    body: `Frameworks started shipping features for coding agents this week, while a supply chain attack hit the security scanner many CI pipelines trust.

## 1. Next.js 16.2: faster dev, faster rendering, and an \`AGENTS.md\`

Next.js 16.2 shipped on March 18.

- \`next dev\` startup is about 87% faster than in 16.1 on the default app, which the team presents as ~400% faster time to URL.
- Rendering is about 50% faster. The team contributed a React change that makes Server Components payload deserialization up to 350% faster by dropping the \`JSON.parse\` reviver.
- A redesigned default 500 page, Server Function logging in the dev terminal, a hydration diff indicator, and \`--inspect\` for \`next start\`.
- \`create-next-app\` now adds an \`AGENTS.md\` file that tells agents to read the version-matched docs bundled in \`node_modules/next/dist/docs/\`. Browser errors are forwarded to the terminal by default in dev.
- Over 200 Turbopack fixes and improvements.

My take: the \`AGENTS.md\` idea is worth copying beyond Next.js. Vercel says bundled docs gave agents a 100% pass rate on its Next.js evals, against 79% for skill-based setups. Point your agents at docs pinned to the versions in your lockfile.

## 2. Trivy, the security scanner, was used to steal CI secrets

On March 19, an attacker used stolen credentials to publish a malicious Trivy v0.69.4, force-push 76 of 77 version tags in \`aquasecurity/trivy-action\` to credential-stealing code, and replace all 7 tags in \`aquasecurity/setup-trivy\`. On March 22, malicious v0.69.5 and v0.69.6 images went to Docker Hub. The \`trivy-action\` tags were bad for about 12 hours.

Aqua says the root cause was a rotation after an earlier breach that was not atomic, so the attacker could read the new secrets while old ones were still valid. Trivy v0.69.3, \`trivy-action\` 0.35.0 (protected by immutable releases) and actions pinned to a safe commit SHA were not affected.

Lesson: pin third-party GitHub Actions to a full commit SHA, not a tag, and rotate all credentials at once after an incident. The React Native packages below show npm needs the same care: review new install scripts in your lockfile diffs. If any workflow ran Trivy between March 19 and 23, treat its secrets as leaked.

GitHub also shipped Dependabot malware alerts on March 17. Dependabot now flags npm dependencies with known malicious versions from the GitHub Advisory Database.

## 3. OpenAI: GPT-5.4 mini and nano, and a deal for Astral

OpenAI released GPT-5.4 mini and nano on March 17, small models for high-volume and sub-agent work. The API price for GPT-5.4 mini is $0.75 per million input tokens and $4.50 output. GitHub made it GA in Copilot the same day at a 0.33x premium request multiplier.

On March 19, OpenAI said it will acquire Astral, the team behind \`uv\`, Ruff and ty, and fold it into Codex. OpenAI says it plans to keep supporting the open-source tools. The deal still needs regulatory approval.

## Mobile

- Apple seeded the iOS 26.4 release candidate to developers on March 18, a week after beta 4.
- Flutter 3.41.5 (Dart 3.11.3) shipped on March 18 as a stable hotfix.
- React Native 0.85 moved through rc.2 to rc.4 between March 16 and 18.
- On March 16, attackers published backdoored \`react-native-country-select\` 0.3.91 and \`react-native-international-phone-number\` 0.11.8. A \`preinstall\` hook fetched a Windows credential and crypto stealer during \`npm install\`. The two packages had about 30,000 weekly downloads combined.
- Expo UI in SDK 55 moved Jetpack Compose support to beta and renamed its SwiftUI components to match Apple's names, for example \`Switch\` became \`Toggle\`.

## Also worth knowing

- Nvidia GTC ran March 16 to 19. Nvidia showed Vera Rubin, a platform of seven chips, plus OpenShell, a runtime that applies policy and network guardrails to agents. Jensen Huang said he sees at least $1 trillion in revenue from 2025 through 2027.
- VoidZero open-sourced Vite+ under the MIT license instead of gating features. The alpha puts Vite, Vitest, Oxlint, Oxfmt, Rolldown and tsdown behind one \`vp\` CLI, with \`vp check\` running lint, format and type checks in one pass.

## From my reading list

- ByteByteGo explained how Stripe's Minions agents ship over 1,300 PRs a week with no human-written code, each one reviewed by a human. The useful part: "blueprints" mix agentic steps with hardcoded ones, so linters always run and branches are always pushed the same way.
- The Pragmatic Engineer reported that Amazon's retail org linked a trend of high blast radius incidents partly to AI-assisted changes. Junior and mid-level engineers now need a senior engineer to sign off on those changes.
- This Week In React linked Factory's post on banning direct \`useEffect\` calls with an ESLint rule. A lint rule is a guardrail that works the same for humans and agents.

## What I'm watching

- How many teams move GitHub Actions to SHA pinning after Trivy.
- Whether \`AGENTS.md\` with bundled docs spreads to other frameworks.
- How OpenAI changes \`uv\` and Ruff once the Astral deal closes.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Next.js, Next.js 16.2 (March 18, 2026)", url: "https://nextjs.org/blog/next-16-2" },
      { label: "Next.js, Next.js 16.2: AI Improvements (March 18, 2026)", url: "https://nextjs.org/blog/next-16-2-ai" },
      { label: "GitHub Security Advisory, Trivy ecosystem supply chain temporarily compromised (March 2026)", url: "https://github.com/aquasecurity/trivy/security/advisories/GHSA-69fq-xp46-6x23" },
      { label: "GitHub Changelog, Dependabot now detects malware in npm dependencies (March 17, 2026)", url: "https://github.blog/changelog/2026-03-17-dependabot-now-detects-malware-in-npm-dependencies/" },
      { label: "OpenAI, Introducing GPT-5.4 mini and nano (March 17, 2026)", url: "https://openai.com/index/introducing-gpt-5-4-mini-and-nano" },
      { label: "OpenAI API docs, GPT-5.4 model page with pricing comparison (2026)", url: "https://developers.openai.com/api/docs/models/gpt-5.4" },
      { label: "GitHub Changelog, GPT-5.4 mini is now generally available for GitHub Copilot (March 17, 2026)", url: "https://github.blog/changelog/2026-03-17-gpt-5-4-mini-is-now-generally-available-for-github-copilot/" },
      { label: "OpenAI, OpenAI to acquire Astral (March 19, 2026)", url: "https://openai.com/index/openai-to-acquire-astral" },
      { label: "MacRumors, Apple Seeds iOS 26.4 and iPadOS 26.4 Release Candidates (March 18, 2026)", url: "https://www.macrumors.com/2026/03/18/apple-seeds-ios-26-4-release-candidate/" },
      { label: "Flutter Releases, Flutter 3.41.5 (March 18, 2026)", url: "https://flutterreleases.com/release/3.41.5/" },
      { label: "NVIDIA Blog, GTC 2026 news (March 2026)", url: "https://blogs.nvidia.com/blog/gtc-2026-news/" },
      { label: "Aikido, Glassworm Strikes Popular React Native Phone Number Packages (March 16, 2026)", url: "https://www.aikido.dev/blog/glassworm-strikes-react-packages-phone-numbers" },
      { label: "VoidZero, Announcing Vite+ Alpha (March 13, 2026)", url: "https://voidzero.dev/posts/announcing-vite-plus-alpha" },
      { label: "This Week In React, #273: RedwoodSDK, Next.js, TanStack, RSC, Async React, SSR, Base UI, AI (March 18, 2026)", url: "https://thisweekinreact.com/newsletter/273" },
      { label: "ByteByteGo, How Stripe's Minions Ship 1,300 PRs a Week (March 16, 2026)", url: "https://blog.bytebytego.com/p/how-stripes-minions-ship-1300-prs" },
      { label: "The Pragmatic Engineer, Are AI agents actually slowing us down? (March 17, 2026)", url: "https://newsletter.pragmaticengineer.com/p/are-ai-agents-actually-slowing-us" },
    ],
  },
  {
    slug: "2026-03-30-week-13",
    date: "2026-03-30",
    lang: "en",
    title: "Week 13: The Trivy attack reaches LiteLLM, Node.js patches two crashes, and TypeScript 6.0 ships",
    summary: "AI, web and mobile news for engineers who ship. March 23 to March 29, 2026.",
    tags: weeklyTags,
    body: `Last week's Trivy compromise spread into the AI tooling many of us install every day, so this issue starts with patching and secrets.

## 1. LiteLLM on PyPI shipped a credential stealer

On March 24, malicious \`litellm\` 1.82.7 and 1.82.8 were published to PyPI. LiteLLM says they went live at 10:39 UTC and were quarantined about 40 minutes later, and that anyone who installed or upgraded via \`pip\` between 10:39 and 16:00 UTC that day should check. The payload looked for environment variables, SSH keys, AWS, GCP and Azure credentials, Kubernetes tokens and database passwords, and sent them to a domain that is not LiteLLM's.

LiteLLM believes the attack started from the compromised Trivy dependency in its CI security scan. The official LiteLLM Proxy Docker image was not affected because it pins dependencies. A clean v1.83.0, built by a new CI/CD pipeline, followed on March 30.

My take: if either version touched a laptop or a CI runner, rotate every secret that machine could read, not only your LLM keys. Then pin Python dependencies in CI, as the Docker image did, and add hashes where you can.

## 2. Node.js security releases for every active line

The Node.js project shipped security releases on March 24 for 20.x, 22.x, 24.x and 25.x: v20.20.2, v22.22.2, v24.14.1 and v25.8.2. Two issues are rated High, and both can crash a server process:

- An \`SNICallback\` that throws on unexpected \`servername\` input crashes TLS servers. This completes an earlier fix for CVE-2026-21637.
- A request with a header named \`__proto__\` crashes any HTTP server that reads \`req.headersDistinct\` (CVE-2026-21710).

The rest are Medium and Low issues, including an HTTP/2 memory leak, a timing leak in HMAC verification and HashDoS in V8. undici is updated too.

Lesson: upgrade this week. Node.js 20 reaches end of life on April 30, so this is one of its last community patches. Plan the move to 22 or 24 now.

## 3. TypeScript 6.0 is out, the bridge to the Go compiler

Microsoft released TypeScript 6.0 on March 23. It is the last major version on the JavaScript codebase. TypeScript 7.0, written in Go, is "extremely close to completion" per the team.

- New defaults: \`strict\` is \`true\`, \`module\` is \`esnext\`, \`target\` is the latest spec (\`es2025\`), and \`types\` defaults to \`[]\`.
- Deprecated and gone in 7.0: \`target: es5\`, \`--moduleResolution node\`, \`--baseUrl\`, \`--outFile\`, and AMD, UMD and SystemJS output.
- \`--stableTypeOrdering\` makes union ordering match 7.0 so you can diff the output. It can slow type checking by up to 25%, so use it only for checks.

It also ships built-in types for Temporal, which reached Stage 4, and for the new \`Map.getOrInsert\` upsert methods. The team says many projects got 20% to 50% faster builds just by setting \`types\` explicitly.

Lesson: set \`types\` explicitly and run 6.0 in CI now, before 7.0 removes the deprecated options.

## Mobile

- iOS 26.4 shipped on March 24 with AI playlists in Apple Music, Stolen Device Protection on by default and many security fixes. End-to-end encrypted RCS and the Gemini-based Siri are not in it.
- Android 17 reached platform stability with Beta 3 on March 26. The API surface is locked, so you can finish compatibility testing and publish apps targeting Android 17.
- Apple gave App Store Connect over 100 new metrics on March 25, including subscription reports you can export via API and peer group benchmarks.
- Apple confirmed WWDC26 for June 8 to 12, online, with "AI advancements" on the agenda.

## Also worth knowing

- Anthropic launched computer use for Claude Cowork and Claude Code as a research preview on macOS. Claude asks for permission before it uses each app.
- OpenAI added plugins to Codex on March 27. A plugin bundles skills, MCP server setups and app integrations, so a team can share one setup.
- Storybook released Storybook MCP for React on March 23. Agents get your component stories and docs so they reuse existing components, and can run component and accessibility tests on their own work.

## From my reading list

- Tech World With Milan interviewed Nick Tune, who runs his coding agent as a state machine with rules such as no commits while planning. The useful part: each time the agent breaks a rule, he adds a failing test, so code enforces conventions, not prompts.
- ByteByteGo explained agentic RAG: standard RAG retrieves once and never checks if the results were good enough. The useful part: add a step that evaluates results and retries with a rewritten query or another source, starting with a simple router.
- This Week In React linked a post arguing you should give your \`useEffect\` functions a name. If you can't find a decent one, the Effect probably does too much or should not exist.

## What I'm watching

- Which other packages turn out to have used the compromised Trivy action in their release pipeline.
- How large codebases handle the TypeScript 6.0 defaults, especially \`types: []\`.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "LiteLLM, Security Update: Suspected Supply Chain Incident (March 24, 2026, updated March 30)", url: "https://docs.litellm.ai/blog/security-update-march-2026" },
      { label: "Node.js, Tuesday, March 24, 2026 Security Releases (March 24, 2026)", url: "https://nodejs.org/en/blog/vulnerability/march-2026-security-releases" },
      { label: "HeroDevs, March 2026 Node.js Security Release: Eight CVEs Patched (April 8, 2026)", url: "https://www.herodevs.com/blog-posts/march-2026-node-js-security-release-eight-cves-patched-including-two-high-severity-process-crashes" },
      { label: "Microsoft TypeScript blog, Announcing TypeScript 6.0 (March 23, 2026)", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/" },
      { label: "Visual Studio Magazine, TypeScript 6.0 Ships as Final JavaScript-Based Release (March 23, 2026)", url: "https://visualstudiomagazine.com/articles/2026/03/23/typescript-6-0-ships-as-final-javascript-based-release-clears-path-for-go-native-7-0.aspx" },
      { label: "Ars Technica, Apple releases iOS, iPadOS, macOS 26.4 with a long list of medium-size tweaks (March 24, 2026)", url: "https://arstechnica.com/gadgets/2026/03/apple-releases-ios-ipados-macos-26-4-with-a-long-list-of-medium-size-tweaks/" },
      { label: "Android Developers Blog, The Third Beta of Android 17 (March 26, 2026)", url: "https://developer.android.com/blog/posts/the-third-beta-of-android-17" },
      { label: "TechCrunch, Apple overhauls its app developer platform with 100 new metrics (March 25, 2026)", url: "https://techcrunch.com/2026/03/25/apple-overhauls-its-app-developer-platform-with-100-new-metrics-more-tools/" },
      { label: "Apple Newsroom, Apple's Worldwide Developers Conference returns the week of June 8 (March 23, 2026)", url: "https://apple.com/newsroom/2026/03/apples-worldwide-developers-conference-returns-the-week-of-june-8" },
      { label: "The Verge, Anthropic's Claude Code and Cowork can control your computer (March 24, 2026)", url: "https://www.theverge.com/ai-artificial-intelligence/899430/anthropic-claude-code-cowork-ai-control-computer" },
      { label: "Claude Help Center, Let Claude use your computer in Cowork (2026)", url: "https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork" },
      { label: "SiliconANGLE, OpenAI introduces plugins for its Codex programming assistant (March 27, 2026)", url: "https://siliconangle.com/2026/03/27/openai-introduces-plugins-codex-programming-assistant/" },
      { label: "This Week In React, #274: Next.js, React Router, Storybook, HeroUI, Remotion, Lucide, useEffect (March 25, 2026)", url: "https://thisweekinreact.com/newsletter/274" },
      { label: "Storybook, Storybook MCP for React (March 23, 2026)", url: "https://storybook.js.org/blog/storybook-mcp-for-react/" },
      { label: "Tech World With Milan, Agentic code workflows with Nick Tune (March 26, 2026)", url: "https://newsletter.techworld-with-milan.com/p/agentic-code-workflows-with-nick" },
      { label: "ByteByteGo, How Agentic RAG Works? (March 23, 2026)", url: "https://blog.bytebytego.com/p/how-agentic-rag-works" },
    ],
  },
  {
    slug: "2026-04-06-week-14",
    date: "2026-04-06",
    lang: "en",
    title: "Week 14: Axios gets hijacked on npm, Gemma 4 goes Apache 2.0, and Cursor 3 bets on agents",
    summary: "AI, web and mobile news for engineers who ship. March 30 to April 5, 2026.",
    tags: weeklyTags,
    body: `npm had a rough week, and coding tools kept moving from editors toward agents.

## 1. Two npm incidents in one day: a hijacked Axios and a leaked Claude Code

On March 31, two malicious Axios versions, \`1.14.1\` and \`0.30.4\`, were published to npm. Per Snyk, the attacker used a hijacked maintainer account and added a pre-staged dependency, \`plain-crypto-js@4.2.1\`, whose \`postinstall\` script downloaded a remote access trojan for macOS, Windows or Linux. Both versions were live for about three hours and were removed by 03:29 UTC. Microsoft attributes the attack to Sapphire Sleet, a North Korean state actor. Any project that allowed \`axios@^1.14.0\` or \`axios@^0.30.0\` could have pulled a bad build on a fresh install.

The same day, Anthropic shipped version 2.1.88 of \`@anthropic-ai/claude-code\` with a source map that exposed the CLI's full TypeScript source. Anthropic called it human error in packaging, with no customer data or credentials exposed.

- Search lockfiles and CI logs for \`axios@1.14.1\`, \`axios@0.30.4\` and \`plain-crypto-js\`.
- If a machine installed them, treat it as compromised and rotate every secret it could read.

Lesson: commit lockfiles, use \`npm ci\` in CI, and consider \`--ignore-scripts\` for builds that do not need install hooks. If you publish packages, check the tarball with \`npm pack --dry-run\` first.

## 2. Gemma 4: open models under Apache 2.0, sized for phones

Google released Gemma 4 on April 2. Hugging Face lists five sizes: E2B and E4B for devices, a 12B unified model, a 31B dense model and a 26B mixture-of-experts model with 4B active parameters. The small models take text, image and audio with a 128K context; the larger ones go to 256K. The license is now Apache 2.0, which removes the custom-terms question for commercial use.

For Android teams, Google says Gemma 4 is the base for the next Gemini Nano. Code written today against Gemma 4 in the AICore Developer Preview should work on Gemini Nano 4 devices later this year.

My take: if you have parked an on-device AI feature because of licensing or model size, this is a good week to prototype it again.

## 3. Coding tools move to agent-first: Cursor 3 and the Copilot SDK

- Cursor 3 shipped on April 2 with an interface built around agents. Local and cloud agents, including those started from mobile, Slack, GitHub or Linear, share one sidebar, with multi-repo support and handoff between local and cloud. The classic IDE is one click away.
- GitHub put the Copilot SDK in public preview the same day. It exposes the agent runtime behind Copilot cloud agent and Copilot CLI, with tool calls, streaming, file operations and multi-turn sessions, so you can embed it in your own apps.

Lesson: before your team writes its own agent loop, check whether an SDK like this already covers it.

## Mobile

- Google opened the AICore Developer Preview with Gemma 4 on April 2, and Android Studio can now use Gemma 4 as a local model for Agent Mode, with no API key and no network needed.
- Android teams can build production features on the ML Kit GenAI Prompt API today, and Google says that code will carry over to Gemini Nano 4 devices.

## Also worth knowing

- Cheng Lou, a former React core team member, released Pretext, a TypeScript library that measures text height and line breaks without touching the DOM. Per Bytes, laying out 1,000 items drops from about 94ms to 0.05ms, useful for virtualized lists and masonry layouts.
- From April 4, Claude subscriptions no longer cover third-party harnesses such as OpenClaw. Usage there moves to a separate pay-as-you-go option, and Anthropic says the policy will extend to more tools.
- Google's March 31 Chrome 146 update fixed 21 bugs, including CVE-2026-5281, a use-after-free in the Dawn graphics layer that is exploited in the wild.
- Microsoft open-sourced the Agent Governance Toolkit (MIT) on April 2, which enforces runtime policies on agent actions.

## From my reading list

- ByteByteGo explained how Meta's DrP platform turns incident investigation into code: analyzers go through code review, run automatically, and now serve 300 teams with 50,000 analyses a day. The useful part: if you debug the same incident twice, write the checks as tested code, not a runbook that goes stale.
- The Pragmatic Engineer showed GitHub's availability falling to about one nine over the past month on a third-party tracker, as agent traffic grows. Lesson: if CI and deploys depend on GitHub, decide now what your team does during a two-hour outage.
- The Pragmatic Engineer's interview with Thuan Pham, Uber's first CTO, showed that the program and platform team split came before microservices. The useful part: fix team boundaries first, then the architecture can follow.

## What I'm watching

- Whether npm and GitHub add stronger defaults against hijacked maintainer accounts after Axios.
- Which other third-party tools Anthropic moves off subscription limits.
- Real benchmarks of Gemma 4 E2B and E4B on mid-range Android phones.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Snyk, Axios npm Package Compromised: Supply Chain Attack Delivers Cross-Platform RAT (March 31, 2026)", url: "https://snyk.io/blog/axios-npm-package-compromised-supply-chain-attack-delivers-cross-platform/" },
      { label: "Microsoft Security Blog, Mitigating the Axios npm supply chain compromise (April 1, 2026)", url: "https://www.microsoft.com/en-us/security/blog/2026/04/01/mitigating-the-axios-npm-supply-chain-compromise/" },
      { label: "InfoQ, Anthropic Accidentally Exposes Claude Code Source via npm Source Map File (April 2026)", url: "https://infoq.com/news/2026/04/claude-code-source-leak" },
      { label: "Google, Gemma 4: Byte for byte, the most capable open models (April 2, 2026)", url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4" },
      { label: "Hugging Face, Welcome Gemma 4: Frontier multimodal intelligence on device (April 2, 2026)", url: "https://huggingface.co/blog/gemma4" },
      { label: "Android Developers Blog, Announcing Gemma 4 in the AICore Developer Preview (April 2, 2026)", url: "https://android-developers.googleblog.com/2026/03/AI-Core-Developer-Preview.html" },
      { label: "Android Developers Blog, Android Studio supports Gemma 4 as a local model (April 2026)", url: "https://android-developers.googleblog.com/2026/04/android-studio-supports-gemma-4-local.html" },
      { label: "Cursor, Meet the new Cursor (April 2, 2026)", url: "https://cursor.com/blog/cursor-3" },
      { label: "GitHub Changelog, Copilot SDK in public preview (April 2, 2026)", url: "https://github.blog/changelog/2026-04-02-copilot-sdk-in-public-preview" },
      { label: "TechCrunch, Anthropic says Claude Code subscribers will need to pay extra for OpenClaw usage (April 4, 2026)", url: "https://techcrunch.com/2026/04/04/anthropic-says-claude-code-subscribers-will-need-to-pay-extra-for-openclaw-support" },
      { label: "SecurityWeek, Exploited Zero-Day Among 21 Vulnerabilities Patched in Chrome (April 2026)", url: "https://www.securityweek.com/exploited-zero-day-among-21-vulnerabilities-patched-in-chrome/" },
      { label: "Microsoft Open Source Blog, Introducing the Agent Governance Toolkit (April 2, 2026)", url: "https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents" },
      { label: "Bytes, Pretext fixed the web (April 3, 2026)", url: "https://bytes.dev/archives/475" },
      { label: "ByteByteGo, How Meta Turned Debugging Into a Product (March 31, 2026)", url: "https://blog.bytebytego.com/p/how-meta-turned-debugging-into-a" },
      { label: "The Pragmatic Engineer, Does GitHub still merit \"top git platform for AI-native development\" status? (April 3, 2026)", url: "https://newsletter.pragmaticengineer.com/p/does-github-still-merit-top-git-platform" },
      { label: "The Pragmatic Engineer, Scaling Uber with Thuan Pham, Uber's first CTO (April 1, 2026)", url: "https://newsletter.pragmaticengineer.com/p/scaling-uber-with-thuan-pham-ubers" },
    ],
  },
  {
    slug: "2026-04-13-week-15",
    date: "2026-04-13",
    lang: "en",
    title: "Week 15: Anthropic holds back Mythos, Meta ships Muse Spark, and React Native 0.85 lands",
    summary: "AI, web and mobile news for engineers who ship. April 6 to April 12, 2026.",
    tags: weeklyTags,
    body: `This week a lab decided its best model was too good at hacking to release, React shipped another security fix, and coding tools got cheaper.

## 1. Project Glasswing: a model kept back because it finds zero-days

On April 7, Anthropic announced Project Glasswing with partners including AWS, Apple, Google, Microsoft, NVIDIA and the Linux Foundation. It is built around Claude Mythos Preview, an unreleased model that Anthropic says can find and exploit software vulnerabilities better than all but the most skilled humans.

- Anthropic says Mythos found a 16-year-old FFmpeg bug in a line that automated testing had hit five million times, and chained several Linux kernel flaws into full root access.
- It commits up to $100M in usage credits and $4M in donations to open-source security groups.
- After the research preview, participants will pay $25 and $125 per million input and output tokens on the Claude API, Bedrock, Vertex AI and Foundry.

My take: when models this good at finding bugs become common, patch speed matters most. Know which open-source libraries you ship, keep them current, and make sure you can release a security fix in hours, not weeks.

## 2. New models: Meta Muse Spark and an open GLM-5.1

- Meta announced Muse Spark on April 8, the first model from Meta Superintelligence Labs. It powers the Meta AI app and meta.ai now, with WhatsApp, Instagram and Messenger to follow. API access is a private preview for select partners only.
- Z.ai published GLM-5.1 on Hugging Face under the MIT license, in a collection updated April 7. You can serve it with vLLM or SGLang behind an OpenAI-compatible endpoint.

Lesson: an open model behind an OpenAI-compatible API is a cheap fallback to test. Keep your model provider behind one interface so switching is a config change.

## 3. Coding agents: cheaper plans, your own models, a second opinion

- OpenAI added a $100 per month ChatGPT Pro plan on April 9 with 5x more Codex usage than Plus, and higher Codex limits on that plan until May 31. The $200 tier stays, with 20x Plus limits. OpenAI says more than 3 million people use Codex every week.
- GitHub Copilot CLI now supports bring-your-own-key and fully local models (April 7), including air-gapped setups.
- Copilot CLI also got Rubber Duck, an experimental reviewer that uses a model from a different family to critique the agent's plans and code. GitHub says Claude Sonnet plus Rubber Duck closes 74.7% of the gap between Sonnet and Opus on its evals.

My take: cross-model review is cheap to copy in your own pipeline. Have a second model review agent output before a human does.

## Mobile

- React Native 0.85 shipped on April 7 with a new Shared Animation Backend, built with Software Mansion, that will let Animated drive layout props like \`width\` and \`height\` on the native driver (experimental, from 0.85.1). Breaking changes: the Jest preset moved to \`@react-native/jest-preset\`, EOL Node.js versions are dropped and \`StyleSheet.absoluteFillObject\` is removed.
- The official Swift extension is now on the Open VSX Registry (April 8), so Cursor, VSCodium, Kiro and Antigravity can install Swift support.

## Also worth knowing

- Patch React again. CVE-2026-23869 (CVSS 7.5) lets one crafted request to a Server Function endpoint burn CPU and take a server down. React 19.2.5 and Next.js 16.2.3, both out April 8, fix it; Next.js 15 gets the fix in 15.5.15. If you use the App Router or Server Functions, upgrade now.
- Chrome 147 reached stable on April 7. It adds element-scoped view transitions with \`element.startViewTransition()\`, CSS \`contrast-color()\` and the CSS \`border-shape\` property.
- Anthropic signed a deal with Google and Broadcom for multiple gigawatts of TPU capacity from 2027. It says its run-rate revenue passed $30 billion, up from about $9 billion at the end of 2025.

## From my reading list

- ByteByteGo broke down how Spotify ships to 675 million users every week: trunk-based development, a release branch that only takes critical fixes, then a 1% rollout before 100%. The useful part: a fixed cadence plus staged rollout makes speed and safety work together.
- Tech World With Milan reported that Amazon now requires a senior to sign off on AI-assisted code from junior and mid-level engineers, after an agent deleted and rebuilt an environment to fix a small bug, which caused a 13-hour outage. Lesson: scope agent permissions to the task, not to the engineer running it.
- ByteByteGo's guide to context engineering cites a Chroma study where all 18 tested models got worse as input grew, and notes models miss facts placed in the middle of long prompts. The useful part: put the key instructions and data at the start or end, and send less.

## What I'm watching

- Whether Anthropic tests cyber safeguards on a smaller model before any wider Mythos release.
- Muse Spark API access and pricing for developers outside the private preview.
- How fast libraries adopt React Native 0.85's new animation backend.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Anthropic, Project Glasswing (April 7, 2026)", url: "https://www.anthropic.com/glasswing" },
      { label: "Meta, Introducing Muse Spark: MSL's First Model, Purpose-Built to Prioritize People (April 8, 2026)", url: "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/" },
      { label: "Hugging Face, zai-org/GLM-5.1 model card (April 2026)", url: "https://huggingface.co/zai-org/GLM-5.1" },
      { label: "TechCrunch, ChatGPT finally offers $100/month Pro plan (April 9, 2026)", url: "https://techcrunch.com/2026/04/09/chatgpt-pro-plan-100-month-codex" },
      { label: "GitHub Changelog, Copilot CLI now supports BYOK and local models (April 7, 2026)", url: "https://github.blog/changelog/2026-04-07-copilot-cli-now-supports-byok-and-local-models" },
      { label: "GitHub Blog, GitHub Copilot CLI combines model families for a second opinion (April 2026)", url: "https://github.blog/ai-and-ml/github-copilot/github-copilot-cli-combines-model-families-for-a-second-opinion/" },
      { label: "React Native, React Native 0.85 - New Animation Backend, New Jest Preset Package (April 7, 2026)", url: "https://reactnative.dev/blog/2026/04/07/react-native-0.85" },
      { label: "Swift.org, Expanding Swift's IDE Support (April 8, 2026)", url: "https://swift.org/blog/expanding-swift-ide-support/" },
      { label: "Chrome for Developers, Chrome 147 release notes (April 7, 2026)", url: "https://developer.chrome.com/release-notes/147" },
      { label: "GitHub, vercel/next.js release v16.2.3 (April 8, 2026)", url: "https://github.com/vercel/next.js/releases/tag/v16.2.3" },
      { label: "Anthropic, Anthropic expands partnership with Google and Broadcom for multiple gigawatts of next-generation compute (April 2026)", url: "https://anthropic.com/news/google-broadcom-partnership-compute" },
      { label: "Vercel, Summary of CVE-2026-23869 (April 8, 2026)", url: "https://vercel.com/changelog/summary-of-cve-2026-23869" },
      { label: "GitHub, facebook/react release 19.2.5 (April 8, 2026)", url: "https://github.com/facebook/react/releases/tag/v19.2.5" },
      { label: "ByteByteGo, How Spotify Ships to 675 Million Users Every Week Without Breaking Things (April 8, 2026)", url: "https://blog.bytebytego.com/p/how-spotify-ships-to-675-million" },
      { label: "Tech World With Milan, The Trends #10: Amazon now requires senior approval for AI-assisted code from junior and mid-level engineers (April 9, 2026)", url: "https://newsletter.techworld-with-milan.com/p/the-trends-10-amazon-now-requires" },
      { label: "ByteByteGo, A Guide to Context Engineering for LLMs (April 6, 2026)", url: "https://blog.bytebytego.com/p/a-guide-to-context-engineering-for" },
    ],
  },
  {
    slug: "2026-04-20-week-16",
    date: "2026-04-20",
    lang: "en",
    title: "Week 16: Opus 4.7 ships, Codex learns to use your Mac, and Expo launches an app agent",
    summary: "AI, web and mobile news for engineers who ship. April 13 to April 19, 2026.",
    tags: weeklyTags,
    body: `The labs shipped in lockstep this week, and cybersecurity shaped how Anthropic and OpenAI released their models.

## 1. Claude Opus 4.7: same price, new tokenizer, built-in cyber safeguards

Anthropic released Claude Opus 4.7 on April 16 on the Claude apps, the API (\`claude-opus-4-7\`), Bedrock, Vertex AI and Foundry. Pricing stays at $5 and $25 per million input and output tokens. Anthropic says it beats Opus 4.6 on hard coding work but trails the restricted Mythos Preview.

- Vision now accepts images up to 2,576 pixels on the long edge, more than three times the pixels of earlier Claude models.
- The updated tokenizer can turn the same input into about 1.0 to 1.35 times more tokens, and the model thinks more at high effort.
- It is the first model shipped with safeguards that block high-risk cyber requests. Security researchers can apply to a Cyber Verification Program.

Lesson: "same price per token" is not "same bill". Re-run your cost and latency checks on real traffic before you switch the model ID, and re-test prompts, since Anthropic says 4.7 follows instructions more literally.

## 2. Codex goes beyond the editor, and OpenAI opens a cyber model

On April 16, OpenAI shipped a large Codex app update for its more than 3 million weekly developers. Codex can now use Mac apps in the background with its own cursor, with several agents working in parallel. It also gets an in-app browser, memory, more than 90 new plugins and SSH to remote devboxes in alpha.

On April 14, OpenAI also expanded Trusted Access for Cyber to thousands of verified defenders and launched GPT-5.4-Cyber, a less restricted model for its top verified tiers.

My take: computer use is most useful for testing UI flows and apps without an API. Run it on a separate test account or machine, never on a desktop logged into production.

## 3. Expo Agent and a $45M round for mobile builders

Expo raised a $45M Series B led by Georgian on April 16 and opened the waitlist for the Expo Agent beta. Expo says the agent builds native apps for iOS, Android and the web from a prompt, writes SwiftUI and Jetpack Compose as well as React, and can target widgets and live activities. It runs on Claude Code tuned by the Expo team.

Lesson: AI builders make the first version cheap. Store review, signing, updates and crash monitoring are still the work, so plan for them from day one.

## Mobile

- Android 17 Beta 4, the last scheduled beta, arrived on April 16. Apps targeting Android 17 get local network access blocked by default, Certificate Transparency on by default, and native libraries loaded with \`System.load()\` must be read-only.
- Google Play announced new policies on April 15, with at least 30 days to comply: apps that do not need broad contacts access must use the Android Contact Picker.
- Google added an experimental hybrid inference API to Firebase AI Logic on April 17 that routes between on-device and cloud models.

## Also worth knowing

- TanStack Start shipped experimental React Server Components on April 13. RSCs are streams you fetch and cache like any data, and there are no Server Actions, only explicit server functions. On tanstack.com, blog pages dropped about 153KB gzipped of client JS and Total Blocking Time fell from 1,200ms to 260ms; interactive pages gained little.
- Anthropic added routines to Claude Code on April 14 in research preview: saved automations with a prompt, repo and connectors that run on a schedule, an API call or a GitHub event, on Anthropic's cloud.
- Microsoft's April Patch Tuesday (April 14) fixed 163 CVEs per Tenable, including an exploited SharePoint bug, CVE-2026-32201.
- Anthropic launched Claude Design on April 17 in research preview for paid plans. It builds prototypes, slides and mockups from your design system and can hand off to Claude Code.

## From my reading list

- The Pragmatic Engineer's survey of 900+ engineers found about 30% have hit AI tool usage limits, and many companies pay $100 to $200 per engineer per month. Lesson: budget AI tooling as a real line item before finance asks.
- ByteByteGo explained why Figma's MCP server beats both screenshots and raw API JSON for design-to-code: it keeps exact values and design token references but strips the noise. The useful part: when you feed an agent context, send structured, filtered data, not everything you have.
- On Refactoring, Loveholidays' Stuart Caborn said each engineer deploys more than 80 times a month, over 60% of production code is written by AI, and the change failure rate stays under 1%. Lesson: AI speed holds up only on top of strong guardrails and healthy code.

## What I'm watching

- Vercel disclosed a security incident on April 19 involving unauthorized access to internal systems. More detail is expected next week.
- Real-world token bills on Opus 4.7 versus 4.6 once teams switch.
- Whether Expo Agent apps pass App Store review without manual fixes.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Anthropic, Introducing Claude Opus 4.7 (April 16, 2026)", url: "https://www.anthropic.com/news/claude-opus-4-7" },
      { label: "OpenAI, Codex for (almost) everything (April 16, 2026)", url: "https://openai.com/index/codex-for-almost-everything" },
      { label: "OpenAI, Trusted access for the next era of cyber defense (April 14, 2026)", url: "https://openai.com/index/scaling-trusted-access-for-cyber-defense" },
      { label: "Expo, Introducing Expo Agent (beta): build native apps with Expo and AI (April 2026)", url: "https://expo.dev/blog/expo-agent-beta" },
      { label: "Expo, What Expo's Series B funding means for you (April 16, 2026)", url: "https://expo.dev/blog/what-expo-s-series-b-funding-means-for-you" },
      { label: "Android Developers, The Fourth Beta of Android 17 (April 16, 2026)", url: "https://developer.android.com/about/versions/17/blog-beta4" },
      { label: "Play Console Help, Policy announcement: April 15, 2026", url: "https://support.google.com/googleplay/android-developer/answer/16926792?hl=en" },
      { label: "Android Developers Blog, Experimental hybrid inference and new Gemini models for Android (April 17, 2026)", url: "https://android-developers.googleblog.com/2026/04/Hybrid-inference-and-new-AI-models-are-coming-to-Android.html" },
      { label: "Tenable, Microsoft's April 2026 Patch Tuesday Addresses 163 CVEs (April 14, 2026)", url: "https://www.tenable.com/blog/microsofts-april-2026-patch-tuesday-addresses-163-cves-cve-2026-32201" },
      { label: "Anthropic, Introducing Claude Design by Anthropic Labs (April 17, 2026)", url: "https://anthropic.com/news/claude-design-anthropic-labs" },
      { label: "TanStack Blog, React Server Components Your Way (April 13, 2026)", url: "https://tanstack.com/blog/react-server-components" },
      { label: "Claude, Introducing routines in Claude Code (April 14, 2026)", url: "https://claude.com/blog/introducing-routines-in-claude-code" },
      { label: "The Pragmatic Engineer, The impact of AI on software engineers in 2026: key trends (April 14, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026" },
      { label: "ByteByteGo, Figma Design to Code, Code to Design: Clearly Explained (April 14, 2026)", url: "https://blog.bytebytego.com/p/figma-design-to-code-code-to-design" },
      { label: "Refactoring, AI Coding meets Code Health with Stuart Caborn (April 17, 2026)", url: "https://refactoring.fm/p/ai-coding-meets-code-health-with" },
      { label: "Vercel, Vercel April 2026 security incident (April 19-24, 2026)", url: "https://vercel.com/kb/bulletin/vercel-april-2026-security-incident" },
    ],
  },
  {
    slug: "2026-04-27-week-17",
    date: "2026-04-27",
    lang: "en",
    title: "Week 17: Vercel traces its breach to an AI tool, GPT-5.5 ships, and TypeScript 7 goes native",
    summary: "AI, web and mobile news for engineers who ship. April 20 to April 26, 2026.",
    tags: weeklyTags,
    body: `This week was about trust in the tools around your code: an AI tool opened a door into Vercel, a CI step poisoned an npm package, and TypeScript went native.

## 1. Vercel and Bitwarden: the supply chain now includes your AI tools

Vercel updated its security bulletin all week. The incident started with a compromise of Context.ai, a third-party AI tool used by an employee. The attacker took over that employee's Google Workspace account, then their Vercel account, then read and decrypted environment variables not marked as sensitive. On April 20, Vercel confirmed with GitHub, Microsoft, npm and Socket that none of its npm packages were tampered with.

On April 22, a malicious \`@bitwarden/cli@2026.4.0\` was live on npm for about 90 minutes. Per BleepingComputer, attackers used a compromised GitHub Action in Bitwarden's CI/CD pipeline. The payload stole credentials and could spread to packages the victim could publish. Bitwarden says vault data was not affected.

- Rotate any Vercel environment variable not marked "sensitive", then turn on sensitive variables.
- Audit which Google Workspace OAuth apps your team has granted, and remove the ones nobody owns.
- Pin GitHub Actions to a commit SHA, not a tag.

My take: every AI tool you connect to your work account is now part of your attack surface. Review OAuth grants the way you review dependencies.

## 2. GPT-5.5 lands, and open models keep pace

- OpenAI released GPT-5.5 on April 23 to Plus, Pro, Business and Enterprise users in ChatGPT and Codex, and added it to the API on April 24. API pricing is $5 and $30 per million input and output tokens with a 1M context window; \`gpt-5.5-pro\` costs $30 and $180. OpenAI says it needs fewer tokens than GPT-5.4 on Codex tasks.
- DeepSeek released V4 Preview as open weights on April 24: V4-Pro (1.6T total, 49B active) and V4-Flash (284B total, 13B active). 1M context is now the default, and the API accepts both OpenAI and Anthropic formats. The old \`deepseek-chat\` and \`deepseek-reasoner\` names retire on July 24.

Lesson: a higher price per token can still mean a lower bill if the model needs fewer tokens and retries. Compare cost per finished task on your own evals, not list prices.

## 3. TypeScript 7.0 Beta: the Go compiler is ready to try

Microsoft announced TypeScript 7.0 Beta on April 21. The compiler is now a Go port of the existing codebase, and Microsoft says it is often about 10 times faster than TypeScript 6.0, with the same type-checking logic. Install \`@typescript/native-preview@beta\` and run \`tsgo\` in place of \`tsc\`. Per Bytes, Bloomberg and Vercel already use it in production. A new \`@typescript/typescript6\` package exposes a \`tsc6\` binary so both versions can run side by side. TypeScript 7.0 turns 6.0 deprecations into hard errors, and \`types\` now defaults to \`[]\`. A stable programmatic API comes in 7.1 or later, so compiler-API tools may lag.

My take: move to TypeScript 6.0 first and fix its deprecations. Then run the 7.0 beta in CI next to your current \`tsc\` and compare the output before you switch.

## Mobile

- Apple said on April 20 that John Ternus will succeed Tim Cook as CEO on September 1, 2026.
- Apple seeded the third iOS 26.5 developer betas on April 20 (build \`23F5059e\`).
- VisionCamera v5 shipped for React Native: a full rewrite on Nitro Modules with a new Constraints API, RAW capture, multi-cam and modular plugins.
- Google will stream The Android Show I/O Edition on May 12, before I/O on May 19 and 20.

## Also worth knowing

- Anthropic committed more than $100 billion over ten years to AWS for up to 5GW of capacity, and the Claude Platform is coming to AWS.
- At Google Cloud Next (April 22 to 24), Google launched the Gemini Enterprise Agent Platform, offering Gemini 3.1 Pro and Claude Opus 4.7, plus eighth-generation TPUs.
- Cursor 3.2 shipped on April 24 with \`/multitask\` async subagents and multi-root workspaces for cross-repo changes.

## From my reading list

- ByteByteGo walked through GitHub's security design for Agentic Workflows, which assumes the agent is already compromised: secrets stay out of the agent's container, and workflows compile into Actions with explicit limits on permissions and network access. The useful part: give an agent in CI only the tokens and hosts its task needs.
- The Pragmatic Engineer reported on "tokenmaxxing": Meta had an internal leaderboard ranking staff by AI token use, which engineers said drove wasteful work, and Meta took it down. Lesson: measure outcomes, not token spend.
- ByteByteGo showed how DoorDash cut new-country launches to about a week by turning onboarding into self-contained step modules wired by a thin orchestrator. The useful part: when each new market adds branches, make the steps composable instead.

## What I'm watching

- Vercel's final incident report and any further accounts found.
- Whether typescript-eslint and other compiler-API tools support TypeScript 7 before it goes stable.
- How GPT-5.5 API pricing compares on real agent workloads against Opus 4.7.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Vercel, Vercel April 2026 security incident (April 19-24, 2026)", url: "https://vercel.com/kb/bulletin/vercel-april-2026-security-incident" },
      { label: "BleepingComputer, Bitwarden CLI npm package compromised to steal developer credentials (April 23, 2026)", url: "https://www.bleepingcomputer.com/news/security/bitwarden-cli-npm-package-compromised-to-steal-developer-credentials/" },
      { label: "OpenAI, Introducing GPT-5.5 (April 23, 2026)", url: "https://openai.com/index/introducing-gpt-5-5/" },
      { label: "DeepSeek, DeepSeek-V4 Preview: Entering the Era of Affordable Million-Token Context (April 24, 2026)", url: "https://www.deepseek.com/en/news/v4-preview/" },
      { label: "Microsoft TypeScript Blog, Announcing TypeScript 7.0 Beta (April 21, 2026)", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/" },
      { label: "MacRumors, Apple CEO Tim Cook Stepping Down, John Ternus Taking Over (April 20, 2026)", url: "https://www.macrumors.com/2026/04/20/tim-cook-stepping-down/" },
      { label: "AppleInsider, Third round of iOS 26.5, macOS Tahoe 26.5 developer betas are out now (April 20, 2026)", url: "https://appleinsider.com/articles/26/04/20/third-round-of-ios-265-macos-tahoe-265-developer-betas-are-out-now" },
      { label: "9to5Google, Google hosting The Android Show before I/O 2026 (April 23, 2026)", url: "https://9to5google.com/2026/04/23/android-show-i-o-2026" },
      { label: "Anthropic, Anthropic and Amazon expand collaboration for up to 5 gigawatts of new compute (April 20, 2026)", url: "https://anthropic.com/news/anthropic-amazon-compute" },
      { label: "Google, 7 highlights from Google Cloud Next '26 (April 24, 2026)", url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/google-cloud-next-26-recap" },
      { label: "Cursor, Changelog 3.2: Multitask, Worktrees, and Multi-root Workspaces (April 24, 2026)", url: "https://cursor.com/changelog/04-24-26" },
      { label: "Bytes, The TypeScript 7.0 prophecy is fulfilled (April 23, 2026)", url: "https://bytes.dev/archives/480" },
      { label: "Margelo, What's New in VisionCamera V5? (April 16, 2026)", url: "https://margelo.com/blog/whats-new-in-visioncamera-v5" },
      { label: "ByteByteGo, The Security Architecture of GitHub Agentic Workflow (April 20, 2026)", url: "https://blog.bytebytego.com/p/the-security-architecture-of-github" },
      { label: "The Pragmatic Engineer, The Pulse: 'Tokenmaxxing' as a weird new trend (April 23, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-tokenmaxxing-as-a-weird-6b2" },
      { label: "ByteByteGo, How DoorDash Launches a New Country in One Week (April 21, 2026)", url: "https://blog.bytebytego.com/p/how-doordash-launches-a-new-country" },
    ],
  },
  {
    slug: "2026-05-04-week-18",
    date: "2026-05-04",
    lang: "en",
    title: "Week 18: OpenAI leaves Azure-only, Copilot bills by the token, and a worm hits SAP npm packages",
    summary: "AI, web and mobile news for engineers who ship. April 27 to May 3, 2026.",
    tags: weeklyTags,
    body: `The rules of the AI platform business changed this week: who can host which model, and what an agent session costs. A new npm worm showed the supply chain is still the weakest point.

## 1. OpenAI models are no longer an Azure exclusive

On April 27, Microsoft and OpenAI amended their partnership. Per Microsoft's post:

- OpenAI can now serve all its products on any cloud provider. Azure stays the primary partner, and products still ship there first unless Microsoft cannot or chooses not to support them.
- Microsoft keeps a license to OpenAI models and products through 2032, but it is now non-exclusive.
- Microsoft no longer pays OpenAI a revenue share. OpenAI keeps paying Microsoft through 2030, with a total cap.

The next day, April 28, AWS put the latest OpenAI models, Codex and Amazon Bedrock Managed Agents (powered by OpenAI) on Bedrock in limited preview. The models inherit IAM, PrivateLink and CloudTrail logging, and Codex usage counts toward existing AWS commitments.

My take: if your team picked a model based on which cloud contract you already had, that constraint is going away. Keep model calls behind one internal interface so switching provider is a config change, not a rewrite.

## 2. GitHub Copilot moves to usage-based billing on June 1

GitHub announced on April 27 that every Copilot plan switches to GitHub AI Credits on June 1, 2026, replacing premium request units. Credits are consumed by input, output and cached tokens at each model's API rate.

- Base prices stay: Pro $10/month, Pro+ $39/month, Business $19/user/month, Enterprise $39/user/month.
- Code completions and Next Edit suggestions stay included and do not use credits.
- The fallback to a cheaper model when you run out goes away.
- Copilot code review will also consume GitHub Actions minutes.

GitHub says a quick chat question and a multi-hour agent session cost the same today, which is not sustainable. A preview bill was promised for early May.

Lesson: long agent runs are now a line item. Set budgets per team before June 1, and look at which workflows burn tokens without shipping anything.

## 3. Mini Shai-Hulud worm poisons official SAP npm packages

On April 29, between 09:55 and 12:14 UTC, attackers published malicious versions of four SAP packages: \`mbt@1.2.48\`, \`@cap-js/db-service@2.10.1\`, \`@cap-js/postgres@2.2.2\` and \`@cap-js/sqlite@2.2.2\`. Together they get about 572,000 weekly downloads. A preinstall script stole GitHub tokens, npm credentials, cloud keys and CI secrets, including from runner memory. Wiz and Socket tied it to TeamPCP, and the same code then showed up in \`intercom-client\` and the PyPI \`lightning\` package.

The same week, Theori disclosed Copy Fail (CVE-2026-31431), a Linux kernel bug from 2017 that lets a local user become root reliably. Patch CI runners and multi-tenant hosts first.

Package managers are getting stricter. pnpm 11, released April 28, now waits one day before resolving newly published versions (\`minimumReleaseAge\`) and blocks exotic subdependencies by default.

My take: run CI installs with \`--ignore-scripts\` where you can, add a release cooldown, and treat any runner that installed a bad version as compromised. Rotate its secrets.

## Mobile

- From April 28, apps uploaded to App Store Connect must be built with the iOS 26 and iPadOS 26 SDK or later.
- Apple added monthly subscriptions with a 12-month commitment on April 27.
- Expo added Gradle caching for Android builds on EAS on April 30, with about 50% shorter build times in Expo's tests.

## Also worth knowing

- Wiz disclosed CVE-2026-3854 on April 28: a single \`git push\` could run commands on GitHub's backend. GitHub.com was fixed within six hours, but Wiz saw 88% of Enterprise Server instances still unpatched.
- Zed reached 1.0 on April 29, after five years. It is built in Rust and runs agents like Claude Code and Codex through its Agent Client Protocol.
- Cursor released its SDK in public beta: \`@cursor/sdk\` gives you the Cursor agent runtime, locally or on a cloud VM.
- Anthropic opened Claude Security, a codebase vulnerability scanner on Opus 4.7, in public beta for Enterprise customers.

## From my reading list

- The Pragmatic Engineer asked devs at 15 companies about AI costs. Two reported token spend up about 10x in six months, and one team cut costs 30% just by changing the default model.
- ByteByteGo described Wise's deployment pipeline: each release gets 5% of traffic for 30 minutes while technical and business metrics are watched, with automatic rollback. In 2024 it blocked hundreds of bad releases on its own.
- Refactoring, with CircleCI's CTO, argued that the teams getting far with AI are the ones that had good developer experience before it. Fix your build, test and review loop first, then add agents.

## What I'm watching

- The Copilot preview bill in May, and how big the gap is between old and new costs for heavy agent users.
- How fast other OpenAI models and tools appear on Google Cloud and Oracle.
- More TeamPCP waves through stolen CI credentials.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Microsoft, The next phase of the Microsoft-OpenAI partnership (April 27, 2026)", url: "https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/" },
      { label: "AWS, Amazon Bedrock now offers OpenAI models, Codex, and Managed Agents (Limited Preview) (April 28, 2026)", url: "https://aws.amazon.com/about-aws/whats-new/2026/04/bedrock-openai-models-codex-managed-agents/" },
      { label: "GitHub Blog, GitHub Copilot is moving to usage-based billing (April 27, 2026)", url: "https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/" },
      { label: "The Register, Ongoing supply chain attacks worm into SAP npm packages (April 30, 2026)", url: "https://www.theregister.com/2026/04/30/supply_chain_attacks_sap_npm_packages/" },
      { label: "Help Net Security, Nine-year-old Linux kernel flaw enables reliable local privilege escalation (CVE-2026-31431) (April 30, 2026)", url: "https://www.helpnetsecurity.com/2026/04/30/copyfail-linux-lpe-vulnerability-cve-2026-31431/" },
      { label: "Apple Developer, Upcoming SDK minimum requirements (2026)", url: "https://developer.apple.com/news?id=ueeok6yw" },
      { label: "Apple Developer, Latest News (April-May 2026)", url: "https://developer.apple.com/news?id=5cda5ipr" },
      { label: "Cursor, Build programmatic agents with the Cursor SDK (April 2026)", url: "https://cursor.com/blog/typescript-sdk" },
      { label: "Claude, Claude Security is now in public beta (April 2026)", url: "https://claude.com/resources/articles/claude-security-public-beta" },
      { label: "pnpm, pnpm 11.0 (April 28, 2026)", url: "https://pnpm.io/blog/releases/11.0" },
      { label: "Wiz, Securing GitHub: Wiz Research uncovers Remote Code Execution in GitHub.com and GitHub Enterprise Server (CVE-2026-3854) (April 28, 2026)", url: "https://www.wiz.io/blog/github-rce-vulnerability-cve-2026-3854" },
      { label: "Zed, Zed is 1.0 (April 29, 2026)", url: "https://zed.dev/blog/zed-1-0" },
      { label: "Expo, Gradle cache for Android builds (April 30, 2026)", url: "https://expo.dev/changelog/gradle-cache" },
      { label: "The Pragmatic Engineer, The Pulse: token spend breaks budgets, what next? (April 30, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-token-spend-breaks-budgets" },
      { label: "ByteByteGo, The Tech Stack Powering Wise (April 29, 2026)", url: "https://blog.bytebytego.com/p/the-tech-stack-powering-wise" },
      { label: "Refactoring, The Compounding Software Factory (April 29, 2026)", url: "https://refactoring.fm/p/the-compounding-software-factory" },
    ],
  },
  {
    slug: "2026-05-11-week-19",
    date: "2026-05-11",
    lang: "en",
    title: "Week 19: Next.js patches 13 advisories, Claude Code limits double, and Node.js 26 ships",
    summary: "AI, web and mobile news for engineers who ship. May 4 to May 10, 2026.",
    tags: weeklyTags,
    body: `A busy week for the JavaScript stack: an urgent Next.js and React patch, a new Node.js major, and more room to run coding agents.

## 1. Next.js 16.2.6 and 15.5.18 fix 13 security advisories

On May 7, Vercel shipped Next.js 16.2.6 and 15.5.18 as a security release. The 16.2.6 release notes list 13 advisories:

- 7 high: a Server Components denial of service, several middleware and proxy bypasses (segment-prefetch routes, dynamic route parameter injection, Pages Router with i18n), connection exhaustion with Cache Components, and SSRF through WebSocket upgrades.
- 4 moderate: two XSS issues (CSP nonces, \`beforeInteractive\` scripts), an Image Optimization API denial of service, and RSC response cache poisoning.
- 2 low: cache poisoning issues.

React shipped its own fix the day before. CVE-2026-23870 (CVSS 7.5) is a denial of service in React Server Components: a crafted POST to a Server Function endpoint makes the server do millions of string comparisons. It is fixed in React 19.0.6, 19.1.7 and 19.2.6.

My take: if your auth checks live only in middleware, also check access inside route handlers and Server Actions. Upgrade first, then audit. Those versions were later followed by more patch releases, so go straight to the newest one on your line.

## 2. Anthropic doubles Claude Code limits after a SpaceX compute deal

On May 6, Anthropic signed a deal to use all the compute at SpaceX's Colossus 1 data center: more than 300 megawatts, over 220,000 NVIDIA GPUs, within the month. Three changes took effect the same day:

- Claude Code's five-hour rate limits doubled for Pro, Max, Team and seat-based Enterprise plans.
- The peak-hours limit reduction on Claude Code is gone for Pro and Max.
- API rate limits for Claude Opus models went up considerably.

Lesson: rate limits shape how teams use agents more than model quality does. If you hit caps every afternoon, recheck your plan this week before buying more seats.

## 3. Node.js 26 is out with Temporal on by default

Node.js 26.0.0 landed on May 5 as the new Current release. It enters LTS in October.

- The Temporal date and time API is enabled by default.
- V8 is updated to 14.6, with \`Map.prototype.getOrInsert()\` and \`Iterator.concat()\`.
- Undici moves to 8.0.2.
- Removals: \`http.Server.prototype.writeHeader()\` is gone (use \`writeHead()\`), and the legacy \`_stream_*\` modules are removed.

It is the last major under the odd/even model: from Node 27, one major ships per year and every release becomes LTS.

My take: run your test suite on Node 26 in CI now as a non-blocking job. Production can stay on LTS 24 until October.

## Mobile

- Expo SDK 56 entered beta on May 6, with React Native 0.85.2 and React 19.2.3. The Jetpack Compose and SwiftUI APIs in Expo UI are now stable.
- Expo said on May 4 that Expo Go for SDK 55 was still waiting for App Store approval, so SDK 54 stays the store version. Use \`eas go\` for a TestFlight build.

## Also worth knowing

- Chrome 148 shipped on May 5 with the Prompt API for on-device AI, \`loading="lazy"\` for video and audio, and name-only CSS container queries.
- OpenAI made GPT-5.5 Instant the ChatGPT default and \`chat-latest\` in the API on May 5. OpenAI reports 52.5% fewer hallucinated claims than GPT-5.3 Instant.
- OpenAI launched three voice models on May 7, including GPT-Realtime-2 and GPT-Realtime-Whisper for streaming speech-to-text.
- The AWS MCP Server became generally available, giving coding agents audited access to AWS APIs.
- Rolldown 1.0, the Rust bundler behind Vite 8, went stable on May 7. Its public API is now locked under semver.
- Cursor 3.3 added PR review inside the agents window and a Build in Parallel mode.

## From my reading list

- The Pragmatic Engineer looked at why GitHub keeps going down. A merge queue bug broke squash merges for 2,092 pull requests, and GitHub's CTO blames agent traffic, which grew about 3.5x in two years. Lesson: if your release flow depends on one vendor, write down what you do when it is down for two hours.
- Bytes explained Flue, Fred K. Schott's TypeScript framework for agent harnesses. The useful idea: an agent is a loop of reading files, calling a model and running commands, and Flue abstracts the shell so one agent runs on Node, Linux or Cloudflare Workers.
- Tech World With Milan interviewed former Amazon VP Ethan Evans on corporate politics. His point: managers reward visible impact and easy collaboration, not the most technical work.

## What I'm watching

- Expo SDK 56 stable, expected about two weeks after the beta.
- The Android 17 release date, likely around Google I/O.
- Whether other labs answer with higher agent limits.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "GitHub, vercel/next.js Release v16.2.6 (May 7, 2026)", url: "https://github.com/vercel/next.js/releases/tag/v16.2.6" },
      { label: "Cyber Security News, React Server Components Flaw Lets Attackers Freeze Next.js Servers (2026)", url: "https://cybersecuritynews.com/react-server-components-dos-vulnerability" },
      { label: "Anthropic, Higher usage limits for Claude and a compute deal with SpaceX (May 6, 2026)", url: "https://www.anthropic.com/news/higher-limits-spacex" },
      { label: "Node.js, Node.js 26.0.0 (Current) (May 5, 2026)", url: "https://nodejs.org/en/blog/release/v26.0.0" },
      { label: "Expo, Expo SDK 56 Beta is now available (May 2026)", url: "https://expo.dev/changelog/sdk-56-beta" },
      { label: "Expo, Expo Go and the App Store in May 2026 (May 4, 2026)", url: "https://expo.dev/changelog/expo-go-and-app-store-may-2026" },
      { label: "Chrome for Developers, New in Chrome 148 (May 5, 2026)", url: "https://developer.chrome.com/blog/new-in-chrome-148?hl=en" },
      { label: "OpenAI, GPT-5.5 Instant: smarter, clearer, and more personalized (May 5, 2026)", url: "https://openai.com/index/gpt-5-5-instant/" },
      { label: "OpenAI, Advancing voice intelligence with new models in the API (May 7, 2026)", url: "https://openai.com/index/advancing-voice-intelligence-with-new-models-in-the-api/" },
      { label: "AWS, The AWS MCP Server is now generally available (May 2026)", url: "https://aws.amazon.com/about-aws/whats-new/2026/05/aws-mcp-server/" },
      { label: "Ajit Singh, Dev Weekly May 4-10, 2026 (May 10, 2026)", url: "https://singhajit.com/dev-weekly/2026/may-4-10/anthropic-spacex-cloudflare-layoffs-cursor-33-aws-agent-payments/" },
      { label: "This Week In React, #280: TanStack, Remotion, React Router, Remix, Trees, Pracht, shadcn (May 6, 2026)", url: "https://thisweekinreact.com/newsletter/280" },
      { label: "VoidZero, Announcing Rolldown 1.0 (May 7, 2026)", url: "https://voidzero.dev/posts/announcing-rolldown-1-0" },
      { label: "The Pragmatic Engineer, The Pulse: AI load breaks GitHub, why not other vendors? (May 7, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-ai-load-breaks-github-why" },
      { label: "Bytes, The new CEO of agent harness frameworks (May 8, 2026)", url: "https://bytes.dev/archives/485" },
      { label: "Tech World With Milan, How corporate politics actually work (May 7, 2026)", url: "https://newsletter.techworld-with-milan.com/p/how-corporate-politics-actually-work" },
    ],
  },
  {
    slug: "2026-05-18-week-20",
    date: "2026-05-18",
    lang: "en",
    title: "Week 20: TanStack gets hijacked, Android becomes an agent, and Codex moves to your phone",
    summary: "AI, web and mobile news for engineers who ship. May 11 to May 17, 2026.",
    tags: weeklyTags,
    body: `This week showed both sides of AI-driven development: agents that work across apps and devices, and a supply chain attack that reached one of the biggest AI labs.

## 1. TanStack npm compromise reaches OpenAI

On May 11, between 19:20 and 19:26 UTC, an attacker published 84 malicious versions across 42 \`@tanstack/*\` packages, all from the Router/Start repo. Per TanStack's postmortem, the chain combined a \`pull_request_target\` "Pwn Request" workflow, GitHub Actions cache poisoning across the fork boundary, and extraction of an OIDC token from runner memory. No npm tokens were stolen, and because the publish used the real trusted-publishing path, the bad versions looked legitimate.

- The payload stole AWS, GCP, Kubernetes, Vault, GitHub, npm and SSH credentials on \`npm install\`, and republished other packages the victim maintained.
- It also left a dead man's switch: a background service polls GitHub with the stolen token, and if the token is revoked it runs \`rm -rf ~/\`. Read the cleanup steps before rotating anything.
- An outside researcher spotted it within 20 to 26 minutes. TanStack declared all clear on May 15.

OpenAI said the attack reached some of its internal source repositories, which held code-signing certificates for its iOS, macOS and Windows apps. It found no sign that user data or production systems were touched, but is rotating certificates. macOS users of its apps had to update by June 12 (later extended to June 26).

Lesson: never run \`pull_request_target\` workflows that check out fork code, and never share Actions caches between fork PRs and release jobs. Trusted publishing proves where a package was built, not that the build was safe. As a consumer, set a minimum release age in your package manager so brand-new versions wait before you install them.

## 2. Android turns into an agent platform

At The Android Show: I/O Edition on May 12, Google announced Gemini Intelligence. Per Google, Android is moving "from an operating system into an intelligence system".

- Gemini can automate multi-step tasks across apps, such as finding a syllabus in Gmail and adding the books to a cart.
- It rolls out from this summer on the latest Galaxy and Pixel phones, then watches, cars, glasses and laptops.
- Googlebook, a laptop line with Acer, Asus, Dell, HP and Lenovo, launches this fall.

My take: if Gemini will drive your app for the user, your app needs clear actions and stable flows an agent can follow. Check how Android exposes app functions to the system before I/O next week.

## 3. Coding agents leave the editor

- OpenAI put Codex in the ChatGPT app for iPhone, iPad and Android on May 14, in preview. You can approve tasks and start prompts from your phone while Codex runs on your laptop or a remote environment. Hooks became generally available.
- Cursor 3.4 shipped on May 13 with development environments for cloud agents. They are defined as Dockerfiles, and cached builds run 70% faster.
- Claude Code v2.1.139 added an agent view that lists every session (running, blocked on you, or done) and a \`/goal\` command that keeps Claude working until a completion condition is met.

My take: the work is moving from writing code to reviewing what agents ship. Make sure an approval from a phone still goes through the same checks as one from a laptop.

## Mobile

- Apple released iOS 26.5 and iPadOS 26.5 on May 11, with end-to-end encrypted RCS messaging (beta) between iPhone and Android, on supported carriers. Xcode 26.5 shipped the same day.

## Also worth knowing

- Bun merged its rewrite from Zig to Rust on May 14: a single PR of about one million lines, opened six days earlier. Jarred Sumner says it passes the existing test suite on all platforms and shrinks the binary by 3 to 8 MB. Canary only for now.
- GitHub announced a $100/month Copilot Max plan and flex allotments for Pro and Pro+, effective June 1.
- OpenAI launched Daybreak, a GPT-5.5 and Codex Security package for defenders.

## From my reading list

- ByteByteGo explained how Pinterest built its MCP setup: many small, domain-specific servers instead of one big one. The useful part: each tool description costs tokens in the model's context, and a data server needs stricter access than a docs server, so splitting helps on both fronts.
- ByteByteGo also covered how Databricks moved rate-limit counters from a single Redis into server memory. Lesson: a count that lives for one second does not need durable storage.
- This Week In React linked a post arguing that RSC Server Functions are not an API boundary. Their generated IDs can change when you refactor, which causes version skew on redeploys, so keep a real versioned API for anything other clients depend on.

## What I'm watching

- Google I/O on May 19 and 20: Gemini models, Android 17, and developer tools.
- Whether npm adds more safeguards on trusted publishing after this attack.
- How Gemini Intelligence lets third-party apps opt in.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "TanStack, Postmortem: TanStack npm supply-chain compromise (May 11, 2026)", url: "https://tanstack.com/blog/npm-supply-chain-compromise-postmortem" },
      { label: "OpenAI, Our response to the TanStack npm supply chain attack (May 2026)", url: "https://openai.com/index/our-response-to-the-tanstack-npm-supply-chain-attack" },
      { label: "Google, A smarter, more proactive Android with Gemini Intelligence (May 12, 2026)", url: "https://blog.google/products-and-platforms/platforms/android/gemini-intelligence/" },
      { label: "Google, The Android Show: I/O Edition 2026 (May 12, 2026)", url: "https://blog.google/products-and-platforms/platforms/android/android-show-io-edition-2026" },
      { label: "TechCrunch, Everything Google announced at its Android Show (May 12, 2026)", url: "https://techcrunch.com/2026/05/12/everything-google-announced-at-its-android-show-from-googlebooks-to-vibe-coded-widgets/" },
      { label: "OpenAI, Work with Codex from anywhere (May 14, 2026)", url: "https://openai.com/index/work-with-codex-from-anywhere/" },
      { label: "Cursor, Changelog 3.4: Development environments for cloud agents (May 13, 2026)", url: "https://cursor.com/changelog/05-13-26" },
      { label: "GitHub, anthropics/claude-code Release v2.1.139 (May 2026)", url: "https://github.com/anthropics/claude-code/releases/tag/v2.1.139" },
      { label: "MacRumors, Apple Releases iOS 26.5 and iPadOS 26.5 With End-to-End Encrypted RCS (May 11, 2026)", url: "https://www.macrumors.com/2026/05/11/apple-releases-ios-26-5/" },
      { label: "Apple Developer, Xcode 26.5 (17F42) (May 11, 2026)", url: "https://developer.apple.com/news/releases/?id=05112026n" },
      { label: "Ajit Singh, Dev Weekly May 11-17, 2026 (May 17, 2026)", url: "https://singhajit.com/dev-weekly/2026/may-11-17/tanstack-npm-attack-patch-tuesday-anthropic-30b-android-show-cursor-34/" },
      { label: "Bytes, TanStack Attack (May 13, 2026)", url: "https://bytes.dev/archives/486" },
      { label: "GitHub, oven-sh/bun Pull Request #30412: Rewrite Bun in Rust (May 14, 2026)", url: "https://github.com/oven-sh/bun/pull/30412" },
      { label: "ByteByteGo, How Pinterest Built a Production MCP Ecosystem (May 11, 2026)", url: "https://blog.bytebytego.com/p/how-pinterest-built-a-production" },
      { label: "ByteByteGo, High Performance Rate Limiting at Databricks (May 13, 2026)", url: "https://blog.bytebytego.com/p/high-performance-rate-limiting-at" },
      { label: "This Week In React, #281: Next.js, TanStack, Security, Redact, React Router, Waku (May 13, 2026)", url: "https://thisweekinreact.com/newsletter/281" },
    ],
  },
  {
    slug: "2026-05-25-week-21",
    date: "2026-05-25",
    lang: "en",
    title: "Week 21: Google I/O goes all in on agents, Anthropic buys Stainless, and Flutter 3.44 ships",
    summary: "AI, web and mobile news for engineers who ship. May 18 to May 24, 2026.",
    tags: weeklyTags,
    body: `Google I/O set the tone this week: models are now sold as engines for agents, and the tooling around them is being rebuilt to match.

## 1. Google I/O: Gemini 3.5 Flash, Antigravity 2.0 and Managed Agents

On May 19, Google released Gemini 3.5 Flash, the first model of the Gemini 3.5 family. Google says it beats Gemini 3.1 Pro on coding and agent benchmarks (76.2% on Terminal-Bench 2.1, 83.6% on MCP Atlas) and outputs tokens 4 times faster than other frontier models. It is generally available in the Gemini API, AI Studio, Android Studio and Antigravity. Gemini 3.5 Pro is planned for next month.

- Antigravity 2.0 is a standalone desktop app that runs several agents in parallel, with dynamic subagents and scheduled tasks. It also comes as a CLI and an SDK.
- Managed Agents in the Gemini API: one API call starts an agent that reasons, uses tools and runs code in an isolated Linux environment you can resume later.
- Gemini CLI is being replaced. On June 18, 2026, Gemini CLI and the Code Assist IDE extensions stop serving AI Pro, Ultra and free individual users, who should move to Antigravity CLI.

My take: if Gemini CLI is in your scripts or CI, plan the switch now. A tool that dies on a fixed date is easy to forget until a pipeline fails.

## 2. Anthropic buys Stainless and expands Managed Agents

Anthropic announced on May 18 that it is acquiring Stainless, the company that generates SDKs, CLIs and MCP servers from an API spec. Stainless has generated every official Anthropic SDK since the Claude API launched.

At Code with Claude on May 19, Anthropic added features to Claude Managed Agents:

- Dreaming, in research preview: a scheduled process that reviews past sessions, finds patterns and curates memory.
- Outcomes, multiagent orchestration and webhooks are now available.

Lesson: if your API ships SDKs from a third-party generator, check what happens if that vendor changes owner or roadmap. Keep your OpenAPI spec clean and versioned so another tool can regenerate them.

## 3. Supply chain: Laravel-Lang hijacked, the npm worm keeps going

On May 22 and 23, an attacker republished malicious versions under historical release tags of four \`laravel-lang\` packages on Packagist. Snyk counts more than 700. An injected \`helpers.php\` was registered in Composer's \`autoload.files\`, so it ran on every PHP request and pulled a stealer for cloud keys, Vault secrets, CI tokens, SSH keys and \`.env\` files. The packages are community-maintained but often arrive as transitive dependencies. Snyk warns that versions were later remapped to clean code, so a version check alone may not prove you are safe.

npm was hit again too: a Mini Shai-Hulud wave on May 19 went through two hijacked maintainer accounts, including AntV packages and \`echarts-for-react\`. Package managers are reacting. Yarn 4.15 makes a one-day release cooldown (\`npmMinimalAgeGate: 1d\`) the default, and npm has an RFC to make install scripts opt-in through an \`allowScripts\` map.

My take: pin dependencies by lockfile hash, not tag, because tags can move. Turn on a release cooldown, and check CI logs for installs on May 22 and 23.

## Mobile

- Flutter 3.44 and Dart 3.12 shipped for I/O. Swift Package Manager replaces CocoaPods as the default on iOS and macOS, and Agentic Hot Reload lets coding agents hot-reload a running app.
- Expo SDK 56 went stable on May 21 with React Native 0.85 and React 19.2. Expo UI's SwiftUI and Jetpack Compose APIs are stable, and Hermes bytecode diffing is on by default (diffed updates averaged 58% smaller).

## Also worth knowing

- Cursor 3.5 (May 20) brought Automations to the Agents Window.
- Node.js 24.16.0 LTS shipped on May 21.
- Explicit Resource Management reached TC39 stage 4 at the May meeting: \`using\` declarations for automatic cleanup become standard JavaScript.

## From my reading list

- Bytes covered Cloudflare's report on testing Anthropic's Mythos Preview. The useful part: Cloudflare runs a second agent, with a different prompt and model, whose only job is to disprove the first agent's findings, which works better than telling one agent to make no mistakes.
- ByteByteGo explained how Grab's data team, whose engineers spent two days a week answering questions, built a multi-agent assistant. The useful part: read-only investigations and write operations take separate paths because their risk differs.
- Tech World With Milan shared 13 lessons under the title "Code was the smallest part of the job". The one to steal: keep a decision folder in every project, because nobody remembers why a choice was made two years later.
- The Pragmatic Engineer closed its 900-response AI survey: benefits depend on the engineering culture a team already had, and less experienced engineers get less help while running up higher token bills. Budget mentoring time, not just seats.

## What I'm watching

- Gemini 3.5 Pro, promised for June.
- Whether the Stainless SDK generator stays open to other API companies.
- Apple's WWDC in June and the next iOS SDK.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Google, Gemini 3.5: frontier intelligence with action (May 19, 2026)", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/" },
      { label: "Google, Building the agentic future: Developer highlights from I/O 2026 (May 19, 2026)", url: "https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/" },
      { label: "Google Developers Blog, An important update: Transitioning Gemini CLI to Antigravity CLI (May 19, 2026)", url: "https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/" },
      { label: "Anthropic, Anthropic acquires Stainless (May 2026)", url: "https://www.anthropic.com/news/anthropic-acquires-stainless" },
      { label: "Claude, New in Claude Managed Agents: dreaming, outcomes, and multiagent orchestration (May 19, 2026)", url: "https://claude.com/blog/new-in-claude-managed-agents" },
      { label: "Snyk, Laravel Lang Supply Chain Advisory (May 23, 2026)", url: "https://snyk.io/blog/laravel-lang-supply-chain-advisory/" },
      { label: "Flutter, What's new in Flutter 3.44 (May 20, 2026)", url: "https://flutter.dev/blog/whats-new-in-flutter-3-44" },
      { label: "Expo, Expo SDK 56 (May 21, 2026)", url: "https://expo.dev/changelog/sdk-56" },
      { label: "Cursor, Changelog 3.5: Improvements to Cursor Automations (May 20, 2026)", url: "https://cursor.com/changelog/05-20-26" },
      { label: "Ajit Singh, Dev Weekly May 18-24, 2026 (May 24, 2026)", url: "https://singhajit.com/dev-weekly/2026/may-18-24/google-io-2026-anthropic-stainless-spacex-ipo-openai-ipo-meta-layoffs-laravel-lang-attack/" },
      { label: "This Week In React, #282: Security, Fate, TanStack, Redux, Jotai, Base UI, Relay, Storybook (May 20, 2026)", url: "https://thisweekinreact.com/newsletter/282" },
      { label: "GitHub, yarnpkg/berry Release v4.15.0 (May 19, 2026)", url: "https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg%2Fcli%2F4.15.0" },
      { label: "Bytes, What Claude Mythos showed Cloudflare (May 19, 2026)", url: "https://bytes.dev/archives/488" },
      { label: "ByteByteGo, How Grab is Using AI Agents to Boost Team Productivity (May 18, 2026)", url: "https://blog.bytebytego.com/p/how-grab-is-using-ai-agents-to-boost" },
      { label: "Tech World With Milan, Code was the smallest part of the job (May 21, 2026)", url: "https://newsletter.techworld-with-milan.com/p/code-was-the-smallest-part-of-the" },
      { label: "The Pragmatic Engineer, AI's impact on software engineers in 2026: key trends, Part 2 (May 19, 2026)", url: "https://newsletter.pragmaticengineer.com/p/ai-impact-on-software-engineers-part-2" },
    ],
  },
  {
    slug: "2026-06-01-week-22",
    date: "2026-06-01",
    lang: "en",
    title: "Week 22: Opus 4.8 lands, Glassworm goes down, and Anthropic raises $65B",
    summary: "AI, web and mobile news for engineers who ship. May 25 to May 31, 2026.",
    tags: weeklyTags,
    body: `Two things defined this week: a new Claude Opus built for very large coding jobs, and a reminder that developer machines are now a main target for supply chain attackers.

## 1. Claude Opus 4.8 ships at the same price, with dynamic workflows

Anthropic released Claude Opus 4.8 on May 28. It builds on Opus 4.7 and keeps the same price: $5 per million input tokens and $25 per million output tokens. Developers call it as \`claude-opus-4-8\` on the Claude API.

- Claude Code gets a new "dynamic workflows" feature aimed at very large-scale problems.
- Fast mode runs at 2.5x the speed and is now three times cheaper than on previous models, at $10 and $50 per million input and output tokens.
- claude.ai users can now set how much effort Claude puts into a task.
- Anthropic says Mythos-class models, now limited to a small cyber-defense group, should reach all customers "in the coming weeks" once stronger safeguards are ready.

GitHub made Opus 4.8 generally available in Copilot the same day for Pro+, Business and Enterprise, with a 15x premium request multiplier until usage-based billing starts on June 1.

My take: same price plus a faster, cheaper fast mode means you can rerun your own evals this week without a budget talk. Check the 15x Copilot multiplier before you make it the team default.

## 2. Glassworm botnet taken down after two years of attacks on developers

On May 26 at 14:00 UTC, CrowdStrike, working with Google and the Shadowserver Foundation, took down the Glassworm botnet. CrowdStrike says the group had targeted the open source supply chain for two years and poisoned more than 300 GitHub repositories.

- Trojanized VS Code extensions were published on OpenVSX, disguised as time trackers and code formatters. They also targeted Cursor, Positron, Windsurf and VSCodium.
- Compromised npm and Python packages ran malicious code through postinstall hooks and setup scripts.
- Command and control used four channels: the Solana blockchain, BitTorrent DHT, Google Calendar event titles and rented servers. The final payload was a Node.js remote access tool called GlasswormRAT.

Lesson: your editor extensions and install scripts run with your credentials. Pin extension versions, review new ones like dependencies, and run \`npm ci --ignore-scripts\` in CI where you can.

## 3. Anthropic raises $65 billion at a $965 billion valuation

Anthropic closed a $65 billion Series H on May 28 at a $965 billion post-money valuation. It says run-rate revenue crossed $47 billion earlier in May. The round includes $15 billion of previously committed hyperscaler money, $5 billion of it from Amazon.

New compute deals include up to five gigawatts with Amazon, five gigawatts of TPU capacity with Google and Broadcom, and GPUs in SpaceX's Colossus 1 and 2. More capacity should mean fewer rate limits, but keep a second provider ready anyway.

## Mobile

- Apple seeded the first developer betas of iOS 26.6 and iPadOS 26.6 on May 26, two weeks after iOS 26.5. MacRumors expects mostly bug fixes ahead of iOS 27 in early June.
- The Codex app for Windows (version 26.527) added computer use and remote control from the ChatGPT mobile app on iOS and Android. On Windows, computer use runs in the foreground, so you cannot use the session while Codex drives an app.
- Expo SDK 56 shipped with React Native 0.85 and React 19.2. Expo UI, which renders SwiftUI on iOS and Jetpack Compose on Android, is now stable and in the default template, and Expo Router no longer depends on React Navigation.

## Also worth knowing

- Cursor added an Auto-review run mode: shell, MCP and fetch calls go through an allowlist, then a sandbox, then an LLM classifier. Cursor itself says the classifier is best-effort, not a security boundary.
- GitHub released model rules in public preview on May 26, so Enterprise owners can allow specific Copilot models per organization.
- npm 11.15 added staged publishing: \`npm stage\` holds a release until a human maintainer approves it, and pnpm 11.3 supports the same flow, per This Week In React.
- GitHub confirmed that the TeamPCP group took about 3,800 internal repositories after an employee installed a poisoned VS Code extension, per the Dev Weekly digest.

## From my reading list

- ByteByteGo explained how DoorDash fights chatbot hallucinations with an offline flywheel: an LLM plays the customer, 200+ simulated conversations run in under five minutes, and 50+ evals must pass before a prompt change ships. The useful part: write an eval for each failure before you try to fix it.
- Refactoring's AI Club shared the "combine harvester" pattern for multi-hour agent tasks: keep instructions, progress and next steps in one markdown file the agent updates, so any person or model can resume the work.

## What I'm watching

- GitHub Copilot usage-based billing from June 1, and how premium models get charged.
- WWDC on June 8 and the first iOS 27 beta.
- When Anthropic opens Mythos-class models to everyone, and at what price.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Anthropic, Introducing Claude Opus 4.8 (May 28, 2026)", url: "https://www.anthropic.com/news/claude-opus-4-8" },
      { label: "GitHub Changelog, Claude Opus 4.8 is generally available for GitHub Copilot (May 28, 2026)", url: "https://github.blog/changelog/2026-05-28-claude-opus-4-8-is-generally-available-for-github-copilot/" },
      { label: "CrowdStrike, Inside CrowdStrike's takedown of a developer-targeting botnet (May 27, 2026)", url: "https://www.crowdstrike.com/en-us/blog/inside-crowdstrike-takedown-of-a-developer-targeting-botnet/" },
      { label: "TechCrunch, CrowdStrike and Google take down botnet used by hackers to target open source software developers (May 27, 2026)", url: "https://techcrunch.com/2026/05/27/crowdstrike-and-google-take-down-botnet-used-by-hackers-to-target-software-developers-in-supply-chain-attacks/" },
      { label: "Anthropic, Anthropic raises $65B in Series H funding at $965B post-money valuation (May 28, 2026)", url: "https://www.anthropic.com/news/series-h" },
      { label: "MacRumors, Apple Seeds First iOS 26.6 and iPadOS 26.6 Betas to Developers (May 26, 2026)", url: "https://www.macrumors.com/2026/05/26/apple-releases-ios-26-beta-1/" },
      { label: "Neowin, OpenAI rolls out major Codex for Windows update with computer use and mobile access (May 29, 2026)", url: "https://www.neowin.net/news/openai-rolls-out-major-codex-for-windows-update-with-computer-use-and-mobile-access/" },
      { label: "Cursor Forum, Auto-review Run Mode (2026)", url: "https://forum.cursor.com/t/auto-review-run-mode/161922" },
      { label: "Ajit Singh, Dev Weekly May 25-31, 2026 (May 31, 2026)", url: "https://singhajit.com/dev-weekly/2026/may-25-31/anthropic-965b-claude-opus-48-cognition-1b-glassworm-takedown-wix-layoffs/" },
      { label: "This Week In React, #283: TanStack, RSC, Liquid DOM, Performance, i18n, docs, Apollo, shadcn (May 27, 2026)", url: "https://thisweekinreact.com/newsletter/283" },
      { label: "Expo, Expo SDK 56 changelog (May 2026)", url: "https://expo.dev/changelog/sdk-56" },
      { label: "GitHub Changelog, Staged publishing and new install-time controls for npm (May 22, 2026)", url: "https://github.blog/changelog/2026-05-22-staged-publishing-and-new-install-time-controls-for-npm/" },
      { label: "ByteByteGo, How DoorDash Built a Testing System to Evaluate LLMs (May 30, 2026)", url: "https://blog.bytebytego.com/p/how-doordash-built-a-testing-system" },
      { label: "Refactoring, Insights from our first AI Club (May 27, 2026)", url: "https://refactoring.fm/p/insights-from-our-first-ai-club" },
    ],
  },
  {
    slug: "2026-06-08-week-23",
    date: "2026-06-08",
    lang: "en",
    title: "Week 23: Copilot bills by the token, Microsoft ships MAI models, and Miasma hits npm",
    summary: "AI, web and mobile news for engineers who ship. June 1 to June 7, 2026.",
    tags: weeklyTags,
    body: `Microsoft Build set the tone this week: in-house models, a desktop app for agents, and a new way to pay for Copilot. Another npm worm showed how fragile package provenance can be.

## 1. Copilot moves to usage-based billing, and gets a desktop app

On June 1, every GitHub Copilot plan switched from premium requests to GitHub AI Credits. Credits are consumed by input, output and cached tokens at each model's listed API rate.

- Base prices do not change: Pro $10 a month, Pro+ $39, Business $19 per user, Enterprise $39 per user.
- Code completions and Next Edit suggestions stay included and do not use credits.
- The fallback to a cheaper model when you run out is gone. Usage is now limited by credits and admin budget controls.

At Build on June 2, GitHub introduced the Copilot app, a desktop app with one My Work view of agent sessions, issues, pull requests and background automations across repositories. It is in technical preview for Pro, Pro+, Business and Enterprise users.

My take: the risk is not the base price, it is long agent sessions on premium models. Set budgets per team before people notice the bill, and keep cheap models as the default for routine work.

## 2. Microsoft launches seven in-house MAI models

Microsoft AI announced seven models on June 2, across reasoning, coding, image, voice and transcription.

- MAI-Thinking-1 is the flagship reasoning model. Microsoft says it was trained from scratch on clean data, without distillation, and was preferred to Sonnet 4.6 in its blind side-by-side tests.
- MAI-Code-1-Flash is an agentic coding model with 5 billion active parameters, built into GitHub Copilot and VS Code. Microsoft compares it to Haiku, but cheaper.
- MAI Transcribe-1.5 supports domain-specific terms across 43 languages, and MAI-Voice-2 covers 15 languages.

Besides Foundry, the models will be on OpenRouter, Fireworks and Baseten, and developers can tune the weights themselves for the first time. These are vendor claims, so test on your own tasks before you switch.

## 3. The Miasma npm worm hits Red Hat packages

Microsoft Threat Intelligence found 32 malicious packages across more than 90 versions under the \`@redhat-cloud-services\` npm scope. The attackers came in through the upstream CI/CD pipeline and published through the legitimate GitHub Actions OIDC workflow, so the packages carried authentic provenance signatures.

- A preinstall hook ran a 4.29 MB obfuscated dropper that downloaded the Bun runtime.
- The payload stole credentials for GitHub, npm, AWS, Azure, GCP, HashiCorp Vault and Kubernetes, plus SSH keys.
- In CI it scraped GitHub Actions runner memory for secrets and republished poisoned packages with forged SLSA provenance.

Lesson: provenance proves where a package was built, not that the pipeline was clean. Disable install scripts in CI with \`npm ci --ignore-scripts\`, give publishing workflows the fewest secrets possible, and rotate tokens after any exposure.

## Mobile

- Google's June Android security update fixes CVE-2025-48595, an Android Framework privilege escalation that "may be under limited, targeted exploitation". It affects Android 14, 15, 16 and 16 QPR2.
- Android 17 Beta 4.1 shipped on June 1, and the June patch reached Pixel devices on June 5, per Android News Wire, which expected Android 17 stable the following week.
- At App.js Conf in late May, Meta and Expo previewed \`npx react-native spm\`, which sets up Swift Package Manager in place of CocoaPods. CocoaPods trunk goes read-only on December 2, so plan the move, per This Week In React.

## Also worth knowing

- React Router and Remix published seven security advisories on June 2, including DoS, XSS, CSRF and an RCE that chains onto an existing prototype pollution bug. They affect Framework Mode. Netlify recommends \`react-router\` 7.15.1 or later, and a fresh build if you prerender.
- VoidZero, the company behind Vite, Vitest, Rolldown and Oxc, is joining Cloudflare, announced June 4. Both say the tools stay MIT-licensed and vendor-agnostic.
- Chrome 149 shipped on June 2 with CSS gap decorations for grid and flexbox, and pages with active WebSockets can now enter the back/forward cache.
- Angular v22 made Signal Forms, Angular Aria and the asynchronous reactivity APIs stable.
- Anthropic confidentially submitted a draft S-1 to the SEC on June 1.

## From my reading list

- Refactoring's Luca Rossi sorts AI coding instructions into guides, gates and guards: \`AGENTS.md\` rules up front, deterministic checks like tests that block bad output, then fallback procedures for what slips through. It is a clean checklist for any agent setup.
- ByteByteGo's look at OpenAI's data agent says the architecture is "pretty vanilla" and the hard part is context: which of 90,000 tables to use and what each one means. The lesson for any internal agent is to invest in metadata and docs before prompts.

## What I'm watching

- WWDC on June 8, and what Apple gives developers for on-device AI.
- Android 17 stable, and the AppFunctions APIs that let apps plug into Gemini.
- First real Copilot bills under AI Credits, and whether teams change their default model.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "GitHub Blog, GitHub Copilot is moving to usage-based billing (2026)", url: "https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/" },
      { label: "GitHub Blog, GitHub Copilot app: The agent-native desktop experience (June 2, 2026)", url: "https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/" },
      { label: "Microsoft AI, Building a hill-climbing machine: Launching seven new MAI models (June 2, 2026)", url: "https://microsoft.ai/news/building-a-hillclimbing-machine-launching-seven-new-mai-models/" },
      { label: "Microsoft Security Blog, Preinstall to persistence: Inside the Red Hat npm Miasma credential-stealing campaign (June 2, 2026)", url: "https://www.microsoft.com/en-us/security/blog/2026/06/02/preinstall-persistence-inside-red-hat-npm-miasma-credential-stealing-campaign/" },
      { label: "Help Net Security, Google fixes actively exploited Android vulnerability (CVE-2025-48595) (June 2, 2026)", url: "https://www.helpnetsecurity.com/2026/06/02/android-vulnerability-exploited-cve-2025-48595/" },
      { label: "Android News Wire, Android Week Review: June 1-7, 2026 (June 7, 2026)", url: "https://androidnewswire.com/news/android-week-review-june-1-7-2026-pre-android-17-stable" },
      { label: "Chrome for Developers, New in Chrome 149 (June 2, 2026)", url: "https://developer.chrome.com/blog/new-in-chrome-149" },
      { label: "Angular Blog, Announcing Angular v22 (June 2026)", url: "https://blog.angular.dev/announcing-angular-v22-c52bb83a4664" },
      { label: "Anthropic, Anthropic confidentially submits draft S-1 to the SEC (June 1, 2026)", url: "https://www.anthropic.com/news/confidential-draft-s1-sec" },
      { label: "This Week In React, #284: TanStack Start, Compiler, React Router, Forms, TypeGPU, React Aria, shadcn, XState (June 3, 2026)", url: "https://thisweekinreact.com/newsletter/284" },
      { label: "Netlify Changelog, 7 React Router security vulnerabilities: what you need to know (June 2, 2026)", url: "https://www.netlify.com/changelog/2026-06-02-react-router-security-vulnerabilities/" },
      { label: "Cloudflare Blog, VoidZero is joining Cloudflare (June 4, 2026)", url: "https://blog.cloudflare.com/voidzero-joins-cloudflare" },
      { label: "Refactoring, My AI Coding Workflow (June 3, 2026)", url: "https://refactoring.fm/p/my-ai-coding-workflow-b09" },
      { label: "ByteByteGo, How OpenAI Built Its Data Agent (June 3, 2026)", url: "https://blog.bytebytego.com/p/how-openai-built-its-data-agent" },
    ],
  },
  {
    slug: "2026-06-15-week-24",
    date: "2026-06-15",
    lang: "en",
    title: "Week 24: WWDC opens Foundation Models, Fable 5 comes and goes, and agents move into CI",
    summary: "AI, web and mobile news for engineers who ship. June 8 to June 14, 2026.",
    tags: weeklyTags,
    body: `WWDC week turned Apple's AI stack into something app developers can use today, while Anthropic showed how fast access to a frontier model can disappear.

## 1. WWDC: Foundation Models opens up, and Xcode 27 gets agents

- The Foundation Models framework is now one Swift API for on-device models with image input, server models and custom skills.
- Developers in the App Store Small Business Program, with fewer than 2 million first-time downloads, get Apple Foundation Models on Private Cloud Compute at no cloud API cost.
- The same API can call third-party models such as Claude and Gemini, or any provider that implements Apple's new language model protocol.
- Core AI is a new framework for running custom models on device, tuned for Apple silicon's unified memory and Neural Engine.
- Per MacRumors, Xcode 27 agents can drive the simulator, run tests and fix crashes from Organizer. Apps rebuilt with Xcode 27 can no longer opt out of Liquid Glass, and Apple plans to open source the Foundation Models framework later this summer.

The first iOS 27 developer beta shipped on June 8, with a public beta planned for July. Because of the DMA, Siri AI will not ship in the EU with iOS 27 and iPadOS 27, and EU-based developers cannot test it.

My take: if you build for iOS, put your model calls behind the Foundation Models API now. You get a free on-device or Private Cloud Compute path, and can switch to a server model later.

## 2. Claude Fable 5 launches, then goes offline three days later

Anthropic launched Claude Fable 5 on June 9, a Mythos-class model with safeguards that route some topics to Opus 4.8. Fable 5 and Mythos 5 (the same model with fewer limits, for cyber defenders) cost $10 per million input tokens and $50 per million output tokens. Anthropic says that is less than half the price of Mythos Preview.

On June 12, Anthropic suspended access to both models. According to DatacenterDynamics, the US Commerce Department imposed export controls blocking foreign nationals from the models after Amazon researchers reported a possible jailbreak. Anthropic disputed the risk but disabled the models for all customers. Other Claude models were not affected.

Lesson: a model you depend on can vanish overnight for reasons that have nothing to do with your code. Keep a fallback model wired in and tested, not just written in a doc.

## 3. Agents move into CI: GitHub Agentic Workflows and OpenAI buys Ona

- GitHub Agentic Workflows entered public preview on June 11. You write automation in Markdown and it compiles to Actions YAML. Agents run read-only by default in a sandbox, and a threat detection job scans proposed changes first.
- OpenAI announced on June 11 that it will acquire Ona, whose secure cloud execution will let Codex agents run inside a customer's own cloud. The deal still needs regulatory approval.
- Cursor's Bugbot, now on Composer 2.5, reviews in about 90 seconds instead of about 5 minutes, costs about 22% less per run and finds 10% more bugs. A new \`/review\` command runs it before you push.

## Mobile

- React Native 0.86 shipped on June 11 with fuller edge-to-edge support on Android 15 and later and DevTools improvements, with no breaking changes. The repository moved to the \`react\` GitHub organization under the React Foundation.
- iPhone apps on iPad can now be resized, and they opt in automatically when rebuilt with the latest SDK, per MacRumors.

## Also worth knowing

- Chrome opened a WebMCP origin trial in Chrome 149 on June 9. Sites can declare structured tools so agents fill forms and run actions without guessing.
- npm v12, expected in July, will stop running dependency \`preinstall\`, \`install\` and \`postinstall\` scripts unless you allow them, GitHub said on June 9. npm 11.16 already warns: run \`npm approve-scripts --allow-scripts-pending\` to see what would break, then commit the allowlist in \`package.json\`.
- The React Compiler port to Rust was merged into the React repo, now under the \`react\` GitHub organization. No npm package yet, but Oxc, Rolldown and SWC integrations are underway, per This Week In React.
- Microsoft fixed 206 vulnerabilities on June 9, its largest Patch Tuesday on record.

## From my reading list

- ByteByteGo's piece on token spend explained why agents get expensive: every step resends the whole growing context, and the top model often costs more than ten times a small one. The fix is a router that sends each request to the cheapest model that can handle it.
- The Pragmatic Engineer's Pulse quoted Uber's president saying the company had blown through its 2026 AI budget by mid-March. If you lead a team, track token cost per shipped feature before finance asks.

## What I'm watching

- When Fable 5 comes back, and under what access rules.
- Which of your dependencies still need install scripts before npm v12 lands in July.
- The iOS 27 public beta in July, for testing Liquid Glass changes on real users' devices.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Apple Newsroom, Apple accelerates app development with new intelligence frameworks and advanced tools (June 8, 2026)", url: "https://www.apple.com/newsroom/2026/06/apple-aids-app-development-with-new-intelligence-frameworks-and-advanced-tools/" },
      { label: "MacRumors, Apple Outlines Major AI and Developer Tool Updates at 2026 Platforms State of the Union (June 9, 2026)", url: "https://www.macrumors.com/2026/06/09/apple-outlines-major-ai-and-developer-tool-updates/" },
      { label: "9to5Mac, Apple releases first iOS 27 beta 1 (June 8, 2026)", url: "https://9to5mac.com/2026/06/08/apple-releases-first-ios-27-beta-1/" },
      { label: "Apple Newsroom, Due to DMA, Siri AI delayed in EU for iOS 27 and iPadOS 27 (June 8, 2026)", url: "https://www.apple.com/newsroom/2026/06/due-to-dma-siri-ai-delayed-in-eu-for-ios-27-and-ipados-27/" },
      { label: "Anthropic, Claude Fable 5 and Claude Mythos 5 (June 9, 2026)", url: "https://www.anthropic.com/news/claude-fable-5-mythos-5" },
      { label: "DatacenterDynamics, Anthropic disables latest AI model after US order limits foreign access (June 2026)", url: "https://www.datacenterdynamics.com/en/news/anthropic-disables-latest-ai-model-after-us-order-limits-foreign-access/" },
      { label: "GitHub Changelog, GitHub Agentic Workflows is now in public preview (June 11, 2026)", url: "https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/" },
      { label: "OpenAI, OpenAI to acquire Ona (June 11, 2026)", url: "https://openai.com/index/openai-to-acquire-ona/" },
      { label: "Cursor, Bugbot is now over 3x faster, 22% cheaper, and finds 10% more bugs (June 2026)", url: "https://cursor.com/changelog/bugbot-updates-june-2026" },
      { label: "React Native, React Native 0.86 - Edge-to-Edge and DevTools Improvements, no breaking changes (June 11, 2026)", url: "https://reactnative.dev/blog/2026/06/11/react-native-0.86" },
      { label: "Chrome for Developers, Join the WebMCP origin trial (June 9, 2026)", url: "https://developer.chrome.com/blog/ai-webmcp-origin-trial" },
      { label: "CyberScoop, Microsoft breaks Patch Tuesday record with 206 vulnerabilities (June 2026)", url: "https://cyberscoop.com/microsoft-patch-tuesday-june-2026/" },
      { label: "GitHub Changelog, Upcoming breaking changes for npm v12 (June 9, 2026)", url: "https://github.blog/changelog/2026-06-09-upcoming-breaking-changes-for-npm-v12/" },
      { label: "This Week In React, #285: React.foundation, React Compiler, Sätteri, Motion, TanStack Table, React Router (June 10, 2026)", url: "https://thisweekinreact.com/newsletter/285" },
      { label: "ByteByteGo, Token Spend Out of Control? The Case for Smarter Routing (June 8, 2026)", url: "https://blog.bytebytego.com/p/token-spend-out-of-control-the-case" },
      { label: "The Pragmatic Engineer, The Pulse: a trend of trying to cut back on AI spend within eng departments? (June 11, 2026)", url: "https://newsletter.pragmaticengineer.com/p/the-pulse-a-trend-of-trying-to-cut-328" },
    ],
  },
  {
    slug: "2026-06-22-week-25",
    date: "2026-06-22",
    lang: "en",
    title: "Week 25: SpaceX buys Cursor, Mastra gets hit on npm, and Android 17 ships",
    summary: "AI, web and mobile news for engineers who ship. June 15 to June 21, 2026.",
    tags: weeklyTags,
    body: `AI coding tools consolidated this week: Cursor got a new owner, GitHub's agent app went GA, and another npm attack showed why install scripts still matter.

## 1. SpaceX agrees to buy Cursor for $60 billion

On June 16, SpaceX announced a formal agreement to buy Cursor's maker, Anysphere, for $60 billion in stock. CNBC reports the deal should close in the third quarter, days after SpaceX's Nasdaq debut. SpaceX merged with xAI earlier this year, so Cursor will sit next to a model maker.

CNBC cites Ramp data: Cursor's share fell from 41% in June 2025 to about 26% in May 2026, while Anthropic holds about half of that market.

My take: many teams picked Cursor because it let them use any model. Nothing changes yet, but list which models and data settings your team relies on, and keep rules, prompts and agent configs portable, so a switch takes days and not months.

## 2. Mastra npm compromise: more than 140 packages, North Korean actor

On June 17, Microsoft Threat Intelligence found more than 140 malicious packages under the \`mastra\` and \`@mastra\` npm scopes. On June 19 it attributed the attack with high confidence to Sapphire Sleet, a North Korean state actor that also hit Axios in April.

- Earlier \`mastra\` versions, up to 1.13.0, were published through GitHub Actions OIDC. Version 1.13.1 was published by hand from an account with an anonymous email address.
- The attackers published a clean typosquat, \`easy-day-js\`, on June 16, then added a \`postinstall\` payload on June 17 at 01:01 UTC.
- Nineteen minutes later, \`mastra@1.13.1\` and more than 140 \`@mastra/*\` packages shipped with that dependency.

Lesson: alert when a package you depend on is published outside its usual CI pipeline, and pin exact versions with a lockfile so a new patch release does not land in your build silently.

## 3. GitHub Copilot app is generally available, and agents go mobile

- GitHub made the Copilot app generally available on June 17 for macOS, Windows and Linux, two weeks after its Build preview.
- AWS launched Kiro for iOS, a native app to start, monitor and steer Kiro cloud sessions, review diffs and approve changes from a phone. It is in gated preview.
- OpenAI released Record & Replay for ChatGPT and Codex on macOS: you show a workflow once and it drafts a reusable skill. Per TechTimes it shipped June 18 in Codex app 26.616, and is not yet available in the EEA, the UK or Switzerland.
- Vercel open sourced eve on June 17, an agent framework where an agent is a directory: \`agent.ts\` for the model, \`instructions.md\` for the prompt, plus folders for tools, skills, subagents, channels and schedules.

## Mobile

- Android 17 shipped on June 16 to most supported Pixel devices. Google calls it adaptive-first, with mandatory large-screen resizability, and launched an AppFunctions agent skill that generates the Kotlin code your app needs to expose actions to agents.
- The Gemini integration for AppFunctions is in private preview, but a test agent app and ADB commands let you prepare now.
- Android 17 adds app memory limits and lets users Bubble any app, per 9to5Google. Test how your app behaves in small floating windows.

## Also worth knowing

- TypeScript 7.0 RC, the Go-based compiler, arrived on June 18. Microsoft says it is often about 10 times faster than 6.0, with the same type-checking logic. Install with \`npm install -D typescript@rc\`.
- The Rust port of the React Compiler is reaching real toolchains. Oxlint 1.70 added an experimental \`react/react-compiler\` rule, and Next.js 16.3.0-canary.52 has an experimental \`turbopackRustReactCompiler\` flag. The Rspack team reports the Rust version is 7 to 13 times faster than the Babel one.
- Node.js shipped security releases on June 18 for the 26.x, 24.x and 22.x lines, including two high-severity bugs: a WebCrypto AES integer overflow that can crash the process, and a TLS wildcard hostname bypass.
- At AWS Summit New York, AWS made Bedrock AgentCore harness generally available and added web search on AgentCore.

## From my reading list

- The Pragmatic Engineer's CI/CD episode with Robert Erez argued for rolling forward, not back: with a database in play, a rollback can leave code talking to a schema it no longer matches. Treat a broken v2 as a push to v3 with the fix.
- Tech World With Milan covered a Carnegie Mellon study of 806 repositories that adopted Cursor: lines added jumped 281% in month one and fell back by month three, while code complexity rose 41% and stayed. Speed without review gates is borrowed.
- Bytes pointed to Polar's LLM-safe design system: one polymorphic \`Box\` component with typed StyleX tokens, with Tailwind and raw HTML elements banned, so agents cannot drift from the design rules.

## What I'm watching

- How Cursor changes its model choices and data terms after the deal closes.
- TypeScript 7.0 stable, and whether your build and lint tools work with the Go compiler.
- The React Compiler Rust option landing in a stable Next.js and Vite release.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "CNBC, SpaceX to acquire the AI coding startup Cursor for $60 billion (June 16, 2026)", url: "https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html" },
      { label: "Microsoft Security Blog, From package to postinstall payload: Inside the Mastra npm supply chain compromise by Sapphire Sleet (June 17, 2026)", url: "https://www.microsoft.com/en-us/security/blog/2026/06/17/postinstall-payload-inside-mastra-npm-supply-chain-compromise/" },
      { label: "GitHub Changelog, GitHub Copilot app generally available (June 17, 2026)", url: "https://github.blog/changelog/2026-06-17-github-copilot-app-generally-available/" },
      { label: "Kiro, Introducing Kiro for iOS (June 2026)", url: "https://kiro.dev/blog/introducing-kiro-for-ios/" },
      { label: "ChatGPT Learn, Record & Replay (2026)", url: "https://learn.chatgpt.com/docs/extend/record-and-replay" },
      { label: "TechTimes, OpenAI Codex Automation Gains Record and Replay: Show It Once, Skip the Script (June 20, 2026)", url: "https://www.techtimes.com/articles/318759/20260620/openai-codex-automation-gains-record-replay-show-it-once-skip-script.htm" },
      { label: "Android Developers Blog, Android 17 is here (June 16, 2026)", url: "https://android-developers.googleblog.com/2026/06/Android-17.html" },
      { label: "9to5Google, Google launches Android 17, rolling out now to Pixel (June 16, 2026)", url: "https://9to5google.com/2026/06/16/google-android-17-pixel-launch/" },
      { label: "Microsoft TypeScript Blog, Announcing TypeScript 7.0 RC (June 18, 2026)", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/" },
      { label: "Node.js, Thursday, June 18, 2026 Security Releases (June 18, 2026)", url: "https://nodejs.org/en/blog/vulnerability/june-2026-security-releases" },
      { label: "AWS News Blog, Top announcements of the AWS Summit in New York, 2026 (June 2026)", url: "https://aws.amazon.com/blogs/aws/top-announcements-of-the-aws-summit-in-new-york-2026/" },
      { label: "Vercel, Introducing eve (June 17, 2026)", url: "https://vercel.com/blog/introducing-eve" },
      { label: "This Week In React, #286: React Compiler, StyleX, TSRX, WordPress, TanStack, Remotion, Hydrogen (June 17, 2026)", url: "https://thisweekinreact.com/newsletter/286" },
      { label: "The Pragmatic Engineer, CI/CD with Robert Erez (June 17, 2026)", url: "https://newsletter.pragmaticengineer.com/p/cicd-with-robert-erez" },
      { label: "Tech World With Milan, The Trends #11: AI agents still can't build software from scratch (June 18, 2026)", url: "https://newsletter.techworld-with-milan.com/p/the-trends-11-ai-agents-still-cant" },
      { label: "Polar, Building an LLM safe design system (June 16, 2026)", url: "https://polar.sh/blog/orbit-llm-safe-design-system" },
    ],
  },
  {
    slug: "2026-06-29-week-26",
    date: "2026-06-29",
    lang: "en",
    title: "Week 26: An npm worm hits Leo Platform, GPT-5.6 previews behind a government gate, and APIs get built for agents",
    summary: "AI, web and mobile news for engineers who ship. June 22 to June 28, 2026.",
    tags: weeklyTags,
    body: `Agents shaped this week's tools, while a supply-chain worm and a government gate showed how much control sits outside a team's hands.

## 1. A worm poisons 20 Leo Platform npm packages

On June 24, an attacker published malicious versions of 20 npm packages from the Leo Platform ecosystem in under three seconds, per StepSecurity. Together they get about 13,600 downloads a week.

The packages carry a CI/CD toolkit that steals secrets from GitHub Actions runners, cloud credential stores, package registries and password managers, then exfiltrates them with the victim's own GitHub token. StepSecurity says it is the same toolkit as the earlier Miasma campaign, including a \`binding.gyp\` install hook.

- If you installed any Leo Platform package on or after June 24, pin to a known-clean version.
- Rotate every token and cloud credential your pipelines exposed.
- Rebuild from a clean lockfile.

The same week, \`actions/checkout\` 7.0 stopped checking out pull request code in \`pull_request_target\` workflows unless you opt in with \`allow-unsafe-pr-checkout: true\`. That pattern was behind several recent npm compromises, per This Week In React.

Lesson: an install hook plus a CI token is enough to spread. Give CI jobs the smallest token scope they need, and do not let them publish by default.

## 2. GPT-5.6 Sol starts as a limited, government-gated preview

On June 26, OpenAI began a limited preview of the GPT-5.6 series: Sol, the flagship; Terra, which OpenAI says is competitive with GPT-5.5 at half the price; and Luna, its lowest-cost model. OpenAI says Sol sets a new state of the art on Terminal-Bench 2.1, and it adds a \`max\` reasoning effort and an \`ultra\` mode that uses subagents.

At the US government's request, OpenAI started with a small group of trusted partners and plans general availability in the coming weeks. OpenAI says this kind of government gate should not become the long-term default.

My take: frontier release dates are now less predictable. Don't put an unreleased model on your roadmap's critical path.

## 3. Gemini's Interactions API and Next.js 16.3 are built for agents

Google made the Interactions API generally available and the primary interface for Gemini models and agents. The legacy \`generateContent\` API stays supported, but Google expects new capabilities for long-running agents to land increasingly on Interactions only.

- Managed Agents: one call provisions a remote Linux sandbox for an agent.
- Background execution with \`background=True\`.
- Typed steps (\`user_input\`, \`function_call\`, \`model_output\`) instead of roles.
- Flex and Priority tiers; Flex cuts cost by 50%.

On the web side, the Next.js 16.3 Preview posts describe a framework shaped for coding agents: \`next dev\` keeps an \`AGENTS.md\` pointer to version-matched bundled docs, plus first-party Skills, an agent browser with React introspection, and errors with a copy-as-prompt fix. A separate post covers Instant Navigations for faster server-driven routing.

Lesson: start new Gemini work on the Interactions API, and commit \`AGENTS.md\` in Next.js repos so agents read docs that match your installed version.

## Mobile

- Apple released iOS 27 beta 2 to developers on June 22. Apple says the first public beta comes in July.
- Android 17 QPR1 Beta 5 rolled out to Pixel devices on June 23 with the June security patch and bug fixes.
- Reanimated 4.5 lets CSS animations use \`:hover\`, \`:active\` and \`:focus\` pseudo-selectors, as in a browser.

## Also worth knowing

- Vite 8.1 shipped on June 23 with an experimental bundled dev mode. Vite 8 now sees 41.6 million weekly downloads.
- React Router 8.0 turns the v8 future flags on by default, goes ESM-only and raises the minimum React, Vite and Node versions.
- Cursor acquired Continue, the open-source coding assistant with 34,300 GitHub stars, and shut the product down; the Apache 2.0 code stays public.
- An Anthropic report says more than 80% of code merged into its codebase in May was written by Claude. Anthropic itself calls lines of code an imperfect measure.
- Claude Code added \`claude mcp login\` for OAuth from the shell and a \`sandbox.credentials\` setting that blocks sandboxed commands from reading credential files.

## From my reading list

- Refactoring covered the Faros report on 22,000+ developers: PRs touched per day rose 67%, but deployments per week fell 12% and lead time grew 480%. The useful part: AI makes starting work cheap, so cap work in progress and fix review before adding more agents.
- The Pragmatic Engineer argued that individual productivity is up while team productivity is flat, and traced Meta's AI account-takeover bug to AI-generated, AI-reviewed code shipped while integrity teams were cut. Keep a human reviewer on auth and account flows.
- ByteByteGo's service anti-patterns piece starts from one fact: a call across a service boundary takes milliseconds and can time out or half-succeed. Most anti-patterns trace back to an early decision on where to split, so split late.

## What I'm watching

- When GPT-5.6 leaves the gated preview.
- Whether more frameworks follow Next.js and ship docs and skills for agents inside the package.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "StepSecurity, Mass npm Supply Chain Attack: 20 Leo Platform Packages Compromised (June 25, 2026)", url: "https://www.stepsecurity.io/blog/mass-npm-supply-chain-attack-20-leo-platform-packages-compromised" },
      { label: "OpenAI, Previewing GPT-5.6 Sol: a next-generation model (June 26, 2026)", url: "https://openai.com/index/previewing-gpt-5-6-sol" },
      { label: "Google, Interactions API: our primary interface for Gemini models and agents (June 2026)", url: "https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/" },
      { label: "API Evangelist, Google Makes the Interactions API the Front Door to Gemini (June 22, 2026)", url: "https://apievangelist.com/2026/06/22/google-makes-the-interactions-api-the-front-door-to-gemini/" },
      { label: "Next.js, Next.js 16.3: AI Improvements (June 2026)", url: "https://nextjs.org/blog/next-16-3-ai-improvements" },
      { label: "Next.js, Next.js 16.3: Instant Navigations (June 2026)", url: "https://nextjs.org/blog/next-16-3-instant-navigations" },
      { label: "9to5Mac, iOS 27 beta 2 now available as Apple tests major Siri AI upgrade (June 22, 2026)", url: "https://9to5mac.com/2026/06/22/ios-27-beta-2-now-available-as-apple-tests-major-siri-ai-upgrade" },
      { label: "9to5Google, Android 17 QPR1 Beta 5 rolling out for Pixel (June 23, 2026)", url: "https://9to5google.com/2026/06/23/android-17-qpr1-beta-5-pixel" },
      { label: "Vite, Vite 8.1 is out! (June 23, 2026)", url: "https://vite.dev/blog/announcing-vite8-1" },
      { label: "The New Stack, Cursor quietly acquires Continue, an open-source alternative to GitHub Copilot (June 22, 2026)", url: "https://thenewstack.io/cursor-acquires-continue-coding/" },
      { label: "Anthropic, When AI builds itself (June 2026)", url: "https://www.anthropic.com/institute/recursive-self-improvement" },
      { label: "Claude Code Docs, What's new: Week 26, June 22-26, 2026 (June 2026)", url: "https://code.claude.com/docs/en/whats-new/2026-w26.md" },
      { label: "This Week In React, #287: Fragment ref, React Compiler, StyleX, React Router (June 24, 2026)", url: "https://thisweekinreact.com/newsletter/287" },
      { label: "Refactoring, Acceleration whiplash (June 24, 2026)", url: "https://refactoring.fm/p/acceleration-whiplash" },
      { label: "The Pragmatic Engineer, Slow down to speed up: so much has changed in 6 months' time (June 23, 2026)", url: "https://newsletter.pragmaticengineer.com/p/slow-down-to-speed-up" },
      { label: "ByteByteGo, Top Anti-Patterns to Avoid in Service Architecture (June 25, 2026)", url: "https://blog.bytebytego.com/p/top-anti-patterns-to-avoid-in-service" },
    ],
  },
  {
    slug: "2026-07-06-week-27",
    date: "2026-07-06",
    lang: "en",
    title: "Week 27: Claude Sonnet 5 lands at $2, Fable 5 comes back, and Copilot moves into JetBrains",
    summary: "AI, web and mobile news for engineers who ship. June 29 to July 5, 2026.",
    tags: weeklyTags,
    body: `A holiday-shortened week, but a busy one for the models and agents inside our editors.

## 1. Claude Sonnet 5: near-Opus agents at a lower price

Anthropic released Claude Sonnet 5 on June 30. It says performance is close to Opus 4.8 at a lower price, with clear gains over Sonnet 4.6 in reasoning, tool use, coding and knowledge work.

- Price: $2 per million input tokens and $10 per million output. Launched as introductory pricing; on August 10 Anthropic made it permanent.
- Default model on Free and Pro plans, available on Max, Team and Enterprise, and as \`claude-sonnet-5\` on the API.
- In Claude Code it is the default for Pro, Team Standard and Enterprise seats, with a 1M-token context window. It needs v2.1.197 or later.
- It uses an updated tokenizer. The same input can map to roughly 1.0 to 1.35 times more tokens, depending on content.

Lesson: compare cost per finished task, not price per token. Run your real prompts through both models and measure tokens before you switch defaults.

## 2. Fable 5 and Mythos 5 return after export controls are lifted

On June 30, Anthropic said the US government had lifted the export controls applied on June 12 to Claude Fable 5 and Mythos 5. Anthropic had suspended both models for all users because it could not verify nationality in real time.

Fable 5 returned worldwide on July 1 across the Claude Platform, Claude.ai, Claude Code and Claude Cowork. On Pro, Max, Team and select Enterprise plans it was included up to 50% of weekly limits through July 7, then via usage credits. Mythos 5 was restored for a set of US organizations after government approval on June 26. Anthropic says it is building a shared framework with Amazon, Microsoft, Google and others to rate jailbreak severity.

My take: if a product depends on one frontier model, plan a fallback. This month showed a top model can disappear for weeks for reasons outside your control.

## 3. GitHub Copilot becomes a native agent in JetBrains, and Claude Code goes wider

On June 30, GitHub and JetBrains made Copilot a first-class choice in the JetBrains AI Assistant agent picker. You pick it in the AI chat, choose a model and reasoning depth, and hand it multistep work. It was already reachable through the Agent Client Protocol; now it is built in.

Claude Code's week 27 releases (v2.1.195 to v2.1.201) added:

- Claude in Chrome generally available: the agent drives your browser, fills forms and reads console logs to test the app it builds.
- Subagents run in the background by default.
- Claude Desktop on Linux in beta, for Ubuntu 22.04+ and Debian 12+.
- The "default" permission mode renamed "Manual".

## Mobile

- Expo SDK 57 shipped on June 30, skipping a beta. It brings React Native 0.86, which has no breaking changes from 0.85, and tests a faster cadence of non-breaking SDKs.
- Android 17 QPR1 Beta 6 was released on July 1.

## Also worth knowing

- Mastra 1.48 (July 1) adds heartbeats: agents scheduled on a cron that persist across restarts, available in \`@mastra/core\`, \`@mastra/server\` and \`@mastra/client-js\`.
- Claude Code artifacts are now generally available on Pro and Max plans, and admins can set an organization default model.
- A Cloudflare network problem in North America on July 1 and 2 also hit the npm registry for hours, per Ajit Singh's Dev Weekly.
- CISA added SharePoint flaw CVE-2026-45659 to its exploited-vulnerabilities catalog on July 1, per the same digest. Patch on-premises SharePoint.
- Turbopack in Next.js 16.3 cuts dev server memory by up to 90% and makes rebuilds up to 5.5x faster with a persistent cache, per This Week In React.
- Meta released Astryx in open-source beta: its design system built on React and StyleX, used by more than 13,000 internal apps.

## From my reading list

- The Pragmatic Engineer looked at smart model routing: token prices differ 10 to 20x between models, and routers such as Factory Router and Not Diamond claim 20 to 30% savings. The useful part: send easy tasks to cheap models and save frontier models for hard ones.
- Tech World With Milan interviewed Google's Adam Bender: agents write plenty of unit tests, but the real gap at 10x output is integration testing. He also warns that agents will call internal APIs you only protected by convention, so enforce those boundaries in code.
- ByteByteGo explained how OpenAI serves voice to 900 million weekly users over WebRTC on Kubernetes: a stateless edge relay routes packets by the ICE ufrag, and a stateful transceiver holds the session. Splitting stateless routing from stateful work is a pattern worth copying for any real-time traffic.

## What I'm watching

- The public launch of GPT-5.6, still in a government-gated preview.
- Fable 5 billing after July 7, when the included window ends.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Anthropic, Introducing Claude Sonnet 5 (June 30, 2026)", url: "https://www.anthropic.com/news/claude-sonnet-5" },
      { label: "TechCrunch, Anthropic launches Claude Sonnet 5 as a cheaper way to run agents (June 30, 2026)", url: "https://techcrunch.com/2026/06/30/anthropic-launches-claude-sonnet-5-as-a-cheaper-way-to-run-agents/" },
      { label: "Anthropic, Redeploying Fable 5 (June 30, 2026)", url: "https://www.anthropic.com/news/redeploying-fable-5" },
      { label: "GitHub Changelog, Copilot Agent is now available in JetBrains AI Assistant (June 30, 2026)", url: "https://github.blog/changelog/2026-06-30-copilot-agent-is-now-available-in-jetbrains-ai-assistant/" },
      { label: "JetBrains Blog, GitHub Copilot now an Integrated Agent in JetBrains IDEs (June 2026)", url: "https://blog.jetbrains.com/ai/2026/06/github-copilot-now-an-integrated-agent/" },
      { label: "Claude Code Docs, What's new: Week 27, June 29 - July 3, 2026 (July 2026)", url: "https://code.claude.com/docs/en/whats-new/2026-w27.md" },
      { label: "Expo, Expo SDK 57 changelog (June 30, 2026)", url: "https://expo.dev/changelog/sdk-57" },
      { label: "Android Developers, Android 17 QPR1 release notes (2026)", url: "https://developer.android.com/about/versions/17/qpr1/release-notes" },
      { label: "GitHub, Mastra @mastra/core@1.48.0 release (July 1, 2026)", url: "https://github.com/mastra-ai/mastra/releases/tag/%40mastra/core%401.48.0" },
      { label: "Ajit Singh, Dev Weekly Jun 29-Jul 5, 2026 (July 5, 2026)", url: "https://singhajit.com/dev-weekly/2026/jun-29-jul-5/claude-sonnet-5-fable-5-returns-copilot-jetbrains-meta-watermelon-cloudflare-npm-outage" },
      { label: "This Week In React, #288: Next.js, React Compiler, use(), Astryx, TanStack Start | Expo (July 1, 2026)", url: "https://thisweekinreact.com/newsletter/288" },
      { label: "The Pragmatic Engineer, The Pulse: a new trend, smart model routing (July 2, 2026)", url: "https://blog.pragmaticengineer.com/the-pulse-a-new-trend-smart-model-routing" },
      { label: "Tech World With Milan, What is the future of software engineering with Adam Bender (July 2, 2026)", url: "https://newsletter.techworld-with-milan.com/p/what-is-the-future-of-software-engineering" },
      { label: "ByteByteGo, How OpenAI Delivers Low-Latency Voice AI for 900M Users (July 1, 2026)", url: "https://blog.bytebytego.com/p/how-openai-delivers-low-latency-voice" },
    ],
  },
  {
    slug: "2026-07-13-week-28",
    date: "2026-07-13",
    lang: "en",
    title: "Week 28: GPT-5.6 goes public, npm v12 turns off install scripts, and TypeScript 7 ships in Go",
    summary: "AI, web and mobile news for engineers who ship. July 6 to July 12, 2026.",
    tags: weeklyTags,
    body: `Frontier models got cheaper and more available this week, and two tools every JavaScript team runs, npm and TypeScript, shipped their biggest default changes in years.

## 1. GPT-5.6 is generally available, and Grok 4.5 undercuts it on price

On July 9, OpenAI made the GPT-5.6 family generally available after its limited preview. It comes in three tiers, priced per million tokens:

- Sol, the flagship: $5 input and $30 output.
- Terra, competitive with GPT-5.5: $2.50 and $15.
- Luna, the fastest and cheapest: $1 and $6.

The models are in ChatGPT, Codex and the API. The Responses API adds Programmatic Tool Calling, multi-agent runs are in beta, and prompt caching gains explicit cache breakpoints with a 30-minute minimum cache life. OpenAI later cut Luna's price by 80% and Terra's by 20% on July 30.

A day earlier, on July 8, SpaceXAI released Grok 4.5 at $2 input and $6 output per million tokens. It is available in Grok Build, in Cursor on all plans and through the API, and was trained alongside Cursor.

My take: pin explicit model IDs, then run your own task set on the cheaper tiers. Benchmark charts on launch pages are vendor-run; your evals decide.

## 2. npm v12 makes install scripts opt-in

npm v12 became generally available and tagged \`latest\` on July 8. Three behaviors that used to run automatically are now off by default:

- Dependency lifecycle scripts (\`preinstall\`, \`install\`, \`postinstall\`) and implicit node-gyp builds.
- Git dependencies, direct or transitive.
- Dependencies from remote URLs, such as https tarballs.

To prepare, run \`npm approve-scripts --allow-scripts-pending\` and commit the allowlist in \`package.json\`. GitHub also started deprecating 2FA-bypass granular access tokens for sensitive account actions, expected in early August.

Lesson: upgrade a branch first. Native modules that need a build step can install fine and then fail at runtime if nobody approved their script.

## 3. TypeScript 7 ships as a native Go compiler

Microsoft announced TypeScript 7 on July 8. It is a native port of the compiler written in Go, and Microsoft reports full builds typically 8x to 12x faster, thanks to native code, shared-memory multithreading and new optimizations. You install it as usual with \`npm install -D typescript\`. Editor support now goes through the language server protocol, with a dedicated VS Code extension.

Two catches. \`strict\` is now \`true\` by default, and 7.0 ships without a programmatic API, so Vue, Svelte, Astro and MDX workflows will likely stay on TypeScript 6 for now. Microsoft expects a new API in 7.1, and 6 and 7 can run side by side.

My take: try it on CI first, where type-checking is often the slowest job. If your tooling imports TypeScript as a library, keep 6 for those tools until 7.1.

## Mobile

- Apple released iOS 27 beta 3 on July 6, build 24A5380h.
- Google shipped the first Android 17 update with the July patch for Pixel 6 through Pixel 10a on July 7. Google lists no security fixes in it.
- React Native 0.87.0-rc.0 was published on July 8. It is a cleanup release that removes deprecated APIs such as \`InteractionManager\` and \`<SafeAreaView>\` and restricts deep imports. Check your code for them now.
- On July 9, Apple added social media questions to the App Store Connect age rating questionnaire, tied to the new Time Allowances in iOS 27.

## Also worth knowing

- Wiz disclosed GhostApproval on July 8: a symlink in a malicious repo can make six AI coding assistants write outside the workspace while the approval prompt shows a harmless file. AWS, Cursor and Google fixed it.
- Ghostcommit (July 11) hides prompt injection as text inside a PNG. In one run, Cursor with Claude Sonnet leaked a full \`.env\` as a list of integers; Claude Code refused.
- Flutter 3.44.5 (July 7) fixes Android bundle builds with flavors and a text shadow rendering bug, per the Flutter.cz digest.
- Expo accounts now support passkeys (July 6).
- shadcn 4.13 makes Base UI the default headless library in its CLI and docs. Radix stays supported.
- Ecma approved ES2026, which adds \`Array.fromAsync()\`, \`Error.isError()\` and \`Map.getOrInsert()\`.

## From my reading list

- The Pragmatic Engineer shared Cursor usage data: about 90% of tokens are input, as agents read code far more than they write it. With caching, cache reads make up about 90% of tokens. If you build your own agent harness, invest in context caching first.
- ByteByteGo defined an agent as an LLM in a loop where the model decides when to stop. That is where both the autonomy and the cost come from, so reach for an agent only when a fixed chain of calls cannot do the job.

## What I'm watching

- Whether Gemini 3.5 Pro, promised for June, finally ships.
- How many CI pipelines break as npm v12 rolls out without allowlists.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "OpenAI, GPT-5.6: Frontier intelligence that scales with your ambition (July 9, 2026)", url: "https://openai.com/index/gpt-5-6/" },
      { label: "SpaceXAI, Introducing Grok 4.5 (2026)", url: "https://x.ai/news/grok-4-5" },
      { label: "TechCrunch, SpaceXAI releases Grok 4.5, which Elon describes as an 'Opus-class model' (July 8, 2026)", url: "https://techcrunch.com/2026/07/08/spacexai-releases-grok-4-5-which-elon-describes-as-an-opus-class-model/" },
      { label: "GitHub Changelog, npm install-time security and GAT bypass2fa deprecation (July 8, 2026)", url: "https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/" },
      { label: "Socket, npm v12 Ships With Install Scripts Off by Default (July 2026)", url: "https://socket.dev/blog/npm-12" },
      { label: "Microsoft TypeScript Blog, Announcing TypeScript 7.0 (July 8, 2026)", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
      { label: "9to5Mac, Here's what's new with iOS 27 beta 3 (July 6, 2026)", url: "https://9to5mac.com/2026/07/06/heres-whats-new-with-ios-27-beta-3/" },
      { label: "9to5Google, Android 17 July update rolling out with four Pixel fixes (July 7, 2026)", url: "https://9to5google.com/2026/07/07/android-17-july-pixel-update" },
      { label: "GitHub, react-native 0.87.0-rc.0 (July 8, 2026)", url: "https://github.com/react/react-native/releases/tag/v0.87.0-rc.0" },
      { label: "Apple Developer, Latest News: Age rating questionnaire now includes social media questions (July 9, 2026)", url: "https://developer.apple.com/news/" },
      { label: "Wiz, GhostApproval: A Trust Boundary Gap in AI Coding Assistants (July 8, 2026)", url: "https://www.wiz.io/blog/ghostapproval-a-trust-boundary-gap-in-ai-coding-assistants" },
      { label: "BleepingComputer, 'Ghostcommit' hides prompt injection in images to fool AI agents, steal secrets (July 11, 2026)", url: "https://www.bleepingcomputer.com/news/security/ghostcommit-hides-prompt-injection-in-images-to-fool-ai-agents-steal-secrets/" },
      { label: "This Week In React, #289: Base UI, shadcn, Vinext | RN cleanup | TypeScript, ES2026 (July 8, 2026)", url: "https://thisweekinreact.com/newsletter/289" },
      { label: "The Pragmatic Engineer, The Pulse: Interesting AI coding stats from Cursor (July 9, 2026)", url: "https://blog.pragmaticengineer.com/the-pulse-interesting-ai-coding-stats-from-cursor" },
      { label: "ByteByteGo, The Agent Loop: How AI Goes From Answering Questions to Doing Things (July 8, 2026)", url: "https://blog.bytebytego.com/p/the-agent-loop-how-ai-goes-from-answering" },
    ],
  },
  {
    slug: "2026-07-20-week-29",
    date: "2026-07-20",
    lang: "en",
    title: "Week 29: An npm attack that skips install scripts, Grok Build goes open source, and Next.js schedules its security fixes",
    summary: "AI, web and mobile news for engineers who ship. July 13 to July 19, 2026.",
    tags: weeklyTags,
    body: `This week was about trust in the tools around the code: a package attack that ran on import, an agent that uploaded too much, and scheduled framework patches.

## 1. Four AsyncAPI npm packages shipped a backdoor that runs on import

On July 14, Microsoft Threat Intelligence and Socket reported a compromise of the @asyncapi npm organization. Five versions across four packages were republished within about ninety minutes with the same malicious loader: \`@asyncapi/specs\` 6.11.2 and 6.11.2-alpha.1, \`@asyncapi/generator\` 3.3.1, \`@asyncapi/generator-components\` 0.7.1 and \`@asyncapi/generator-helpers\` 1.1.1.

The payload runs on import, not at install time, so \`npm install --ignore-scripts\` does not stop it. It pulls an encrypted second stage from IPFS and starts the Miasma remote access toolkit. Socket notes the packages carried valid provenance that pointed to a source commit already containing the implant.

- Remove the five versions and purge npm and Yarn caches.
- Rotate every credential reachable from any machine or CI job that imported them.
- Treat provenance as proof of where a build ran, not proof that the code is safe.

Lesson: install-script hardening is not enough. Review which workflows can push to your release branches, because that is where this attack entered.

## 2. SpaceXAI open-sources Grok Build after an upload scandal

On July 15, SpaceXAI published the source of Grok Build, its coding agent and terminal UI, under Apache 2.0. It includes the agent loop, tools, terminal UI and extension system, and can run local-first against your own inference.

The timing matters. As Simon Willison documented, users had found a day earlier that the grok CLI could upload a whole working directory to xAI cloud buckets. SpaceXAI says it turned default data retention off on July 12 and is deleting previously retained coding data.

My take: before a team adopts any coding agent, check what it sends off the machine and whether retention is on by default. Run it first in a throwaway directory with no secrets.

## 3. Next.js moves to a monthly, pre-announced security release

On July 13, the Next.js team announced a formal security release program. Roughly once a month, they will give advance notice of the date and the highest severity in the batch, so teams can plan upgrades.

The first scheduled release targets Next.js 16.2 and 15.5 with fixes for 4 high and 5 medium severity issues. It was planned for July 20 and later moved to July 21.

Lesson: put a monthly Next.js patch slot in your release calendar now, and stay on a supported line.

## Mobile

- Apple released the first iOS 27 public beta on July 13, along with iPadOS 27 and macOS Golden Gate 27 public betas. The build matches the current developer beta.
- Android 17 QPR1 Beta 7 shipped on July 15.
- Google Play's July 15 policy update gives at least 30 days to comply. Account verification by phone call is no longer a valid use of \`READ_CALL_LOG\`, and any apps not yet registered in Play Console must be registered to avoid removal.

## Also worth knowing

- Google's Gemini 3.5 Pro, promised for June, is still in partner testing. Bloomberg reported on July 16 that coding performance is the reason.
- Anthropic published how it migrates large codebases with Claude Code, including Bun's port from Zig to Rust: about a million lines in under two weeks, with the full test suite passing before merge. This Week In React puts the API cost at about $165,000.
- Thinking Machines released Inkling, its first open-weights model: 975 billion parameters with 41 billion active, a 1M-token context, and text, image and audio input. The pitch is a model you fine-tune and own, not the top benchmark score.
- From July 20, Claude Fable 5 is included in Max and Team Premium plans at 50% of limits. Pro and Team Standard keep access through usage credits.

## From my reading list

- The Pragmatic Engineer asked what "loop engineering" means in practice. Most real loops are triggers and cron jobs, like opening PRs for new app issues, and several devs dropped them over drift and token cost. Start with one scheduled loop with a clear stop condition.
- Refactoring framed model choice as accuracy, speed and cost, and warned that public leaderboards do not predict results on your codebase. Build a small eval from your own tasks, then route easy work to cheaper models.
- ByteByteGo's guide to multi-tenancy names the three risks of sharing one system: noisy neighbors, a shared blast radius, and data leaking between tenants. Carry tenant context through every layer, not only the database.

## What I'm watching

- The Next.js 16.2 and 15.5 security release, now expected on July 21.
- Whether Gemini 3.5 Pro gets a new date.
- Moonshot's Kimi K3, launched July 16, with open weights promised for July 27.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Microsoft Security Blog, Unpacking the AsyncAPI npm supply chain compromise and import-time payload delivery (July 15, 2026)", url: "https://www.microsoft.com/en-us/security/blog/2026/07/15/unpacking-asyncapi-npm-supply-chain-compromise-import-time-payload-delivery/" },
      { label: "Socket, Compromised npm Packages in the AsyncAPI Namespace Deliver Miasma Botnet Loader (July 14, 2026)", url: "https://socket.dev/blog/asyncapi-supply-chain-attack" },
      { label: "SpaceXAI, Grok Build is Now Open Source (July 15, 2026)", url: "https://x.ai/news/grok-build-open-source" },
      { label: "Simon Willison, xai-org/grok-build, now open source (July 15, 2026)", url: "https://simonwillison.net/2026/Jul/15/grok-build/" },
      { label: "Next.js, Next.js Security Release and Our Next Patch Release (July 13, 2026)", url: "https://nextjs.org/blog/next-security-release-program" },
      { label: "9to5Mac, iOS 27 public beta is here with Siri AI, iPhone speed upgrades, and more (July 13, 2026)", url: "https://9to5mac.com/2026/07/13/ios-27-public-beta" },
      { label: "Android Developers, Android 17 QPR1 release notes (2026)", url: "https://developer.android.com/about/versions/17/qpr1/release-notes" },
      { label: "Play Console Help, Policy announcement: July 15, 2026 (July 15, 2026)", url: "https://support.google.com/googleplay/android-developer/answer/17134731?hl=en" },
      { label: "9to5Google, Gemini 3.5 Pro delays due to coding performance (July 16, 2026)", url: "https://9to5google.com/2026/07/16/gemini-3-5-pro-delays/" },
      { label: "Claude, How Anthropic runs large-scale code migrations with Claude Code (July 16, 2026)", url: "https://claude.com/blog/ai-code-migration" },
      { label: "Claude Code Docs, What's new: Week 29, July 13-17, 2026 (July 2026)", url: "https://code.claude.com/docs/en/whats-new/2026-w29.md" },
      { label: "This Week In React, #290: Suspense, Working Groups, Next.js, React Router | TC39, Bun, npm (July 15, 2026)", url: "https://thisweekinreact.com/newsletter/290" },
      { label: "Technology Org, Thinking Machines Releases Inkling Open-Weights Model (July 16, 2026)", url: "https://www.technology.org/2026/07/16/thinking-machines-inkling-open-weights-model/" },
      { label: "The Pragmatic Engineer, What is \"loop engineering?\" (July 14, 2026)", url: "https://newsletter.pragmaticengineer.com/p/what-is-loop-engineering" },
      { label: "Refactoring, What LLM should you use for AI coding? (July 15, 2026)", url: "https://refactoring.fm/p/what-llm-should-you-use-for-ai-coding" },
      { label: "ByteByteGo, A Guide to Multi-Tenancy: Benefits and Challenges (July 16, 2026)", url: "https://blog.bytebytego.com/p/a-guide-to-multi-tenancy-benefits" },
    ],
  },
  {
    slug: "2026-01-05-week-1",
    date: "2026-01-05",
    lang: "en",
    title: "Week 1: Meta buys Manus, SoftBank completes its OpenAI round, and India orders fixes to Grok",
    summary: "AI, web and mobile news for engineers who ship. December 29, 2025 to January 4, 2026.",
    tags: weeklyTags,
    body: `The holiday week was quiet on product launches. The news was about money and consolidation: big checks closed, Meta bought an agent company, and one AI image tool showed what happens without guardrails.

## 1. Meta acquires Manus, the general-purpose agent startup

Manus announced on December 29 that it is joining Meta. Meta said the deal aims to bring advanced automation to its consumer and business products, including Meta AI.

- Manus says its agent has processed more than 147 trillion tokens and created over 80 million virtual computers.
- It will keep selling its subscription through its app and website, and keep operating from Singapore.
- Meta said there will be no continuing Chinese ownership interests and it will wind down Manus's remaining operations in China. Terms were not disclosed; the Wall Street Journal reported over $2 billion.

My take: agent products are being absorbed into platforms with distribution. If you depend on a third-party agent API, keep an abstraction layer so you can switch providers if terms change after an acquisition.

## 2. SoftBank completes its OpenAI investment

SoftBank said on December 31 that it completed an additional $22.5 billion investment in OpenAI on December 26 (US time). With $7.5 billion from April and $11 billion from co-investors, the $41 billion round is fully funded. SoftBank now owns about 11% of OpenAI.

Lesson: the money for 2026 model releases and compute is in place, so expect more frequent model updates. Pin model versions in production and run evals before each upgrade.

## 3. Grok's image editing triggers a government order

On January 2, India's IT ministry ordered X to make immediate changes to Grok after users and lawmakers flagged AI-altered images of women. X got 72 hours to submit an action-taken report, and the order warned that X's safe harbor protection could be at risk. The same day, X acknowledged that lapses in safeguards had led Grok to generate sexualized images involving minors; those images were taken down.

My take: if your product lets users edit photos of real people with AI, abuse filters, rate limits and reporting tools are launch requirements, not later work. Regulators now act within days.

## Mobile

- Samsung announced the Galaxy A17 on December 30: $199 in the US, 6 years of Android OS and security updates, on sale January 7.
- Asus has no new Zenfone or ROG phones planned for 2026, 9to5Google reported on January 2, citing Digitimes. Support and updates for existing devices continue.
- Pebble opened pre-orders for the $199 Pebble Round 2 on January 2, shipping in May, with support for apps and watch faces from the original Pebble Time Round.

## Also worth knowing

- DeepSeek posted the mHC (Manifold-Constrained Hyper-Connections) paper on arXiv on December 31. It targets the training instability of hyper-connections, and founder Liang Wenfeng is a co-author.
- Alibaba's Qwen team released Qwen-Image-2512 weights on December 31, a 20B open text-to-image model with better realism and text rendering.
- In a year-end post on December 31, Instagram head Adam Mosseri said it will be more practical to fingerprint real media than fake media, with cameras signing images at capture.
- In the Gemini web app, the @-menu now lets you switch between Fast, Thinking and Pro models, 9to5Google noticed on January 2.

## From my reading list

- ByteByteGo explained message brokers as a time buffer between services: the order service emits one "Order Placed" message, and inventory, billing and shipping read it when they are ready. The useful part: a traffic spike at the front door no longer hits every downstream service at once.
- ByteByteGo's CQRS refresher splits writes (commands, a write database, emitted events) from reads (precomputed projections in a read database). Plan for the catch: the read side is eventually consistent, so the UI must handle a short lag after a write.

## What I'm watching

- What Meta builds with Manus inside its apps and business tools.
- Whether other countries follow India with orders on AI image tools.
- CES next week, and how much of it is relevant to software teams.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Manus, Manus Joins Meta for Next Era of Innovation (December 29, 2025)", url: "https://manus.im/blog/manus-joins-meta-for-next-era-of-innovation" },
      { label: "CNBC, Meta acquires intelligent agent firm Manus, capping year of aggressive AI moves (December 30, 2025)", url: "https://www.cnbc.com/2025/12/30/meta-acquires-singapore-ai-agent-firm-manus-china-butterfly-effect-monicai.html" },
      { label: "SoftBank Group, Completion of Additional $22.5 Billion Investment in OpenAI (December 31, 2025)", url: "https://group.softbank/en/news/press/20251231" },
      { label: "TechCrunch, India orders Musk's X to fix Grok over 'obscene' AI content (January 2, 2026)", url: "https://techcrunch.com/2026/01/02/india-orders-musks-x-to-fix-grok-over-obscene-ai-content/" },
      { label: "9to5Google, Galaxy A17 launches in January with 6 years of Android updates for $199 (December 30, 2025)", url: "https://9to5google.com/2025/12/30/galaxy-a17-launches-in-january-with-6-years-of-android-updates-for-199/" },
      { label: "9to5Google, Asus won't make any new Android phones in 2026, but it might not be done yet (January 2, 2026)", url: "https://9to5google.com/2026/01/02/asus-android-phones-2026/" },
      { label: "9to5Google, The Pebble Round smartwatch is getting a reboot for $199 with big upgrades (January 2, 2026)", url: "https://9to5google.com/2026/01/02/pebble-round-smartwatch-reboot/" },
      { label: "arXiv, mHC: Manifold-Constrained Hyper-Connections (December 31, 2025)", url: "https://arxiv.org/abs/2512.24880" },
      { label: "Hugging Face, Qwen/Qwen-Image-2512 model card (December 31, 2025)", url: "https://huggingface.co/Qwen/Qwen-Image-2512" },
      { label: "The Verge, You can't trust your eyes to tell you what's real anymore, says the head of Instagram (December 31, 2025)", url: "https://www.theverge.com/news/852124/adam-mosseri-ai-images-video-instagram" },
      { label: "9to5Google, Gemini app gets faster model switching from @-menu (January 2, 2026)", url: "https://9to5google.com/2026/01/02/gemini-model-switch/" },
      { label: "ByteByteGo, Message Brokers 101: Storage, Replication, and Delivery Guarantees (January 1, 2026)", url: "https://blog.bytebytego.com/p/message-brokers-101-storage-replication" },
      { label: "ByteByteGo, EP196: Cloud Load Balancer Cheat Sheet (January 3, 2026)", url: "https://blog.bytebytego.com/p/ep196-cloud-load-balancer-cheat-sheet" },
    ],
  },
  {
    slug: "2026-01-12-week-2",
    date: "2026-01-12",
    lang: "en",
    title: "Week 2: ChatGPT and Claude go into health, Google opens agent checkout, and Nvidia unveils Rubin",
    summary: "AI, web and mobile news for engineers who ship. January 5 to January 11, 2026.",
    tags: weeklyTags,
    body: `CES opened the year with hardware. For software teams, the week was about health data and shopping agents.

## 1. OpenAI and Anthropic both launch health products

OpenAI introduced ChatGPT Health on January 7, a separate space in ChatGPT for health and wellness. OpenAI says over 230 million people ask health questions on ChatGPT every week.

- Users can connect medical records and apps such as Apple Health, Function and MyFitnessPal. Medical records and some apps are US only, and Apple Health needs iOS.
- Health has its own encryption and isolation, and its chats are not used to train models. It is not meant for diagnosis.
- Access starts with a small group of users on Free, Go, Plus and Pro outside the EEA, Switzerland and the UK, via a waitlist.

On January 11, Anthropic announced Claude for Healthcare: HIPAA-ready tools for providers, payers and health tech companies, with connectors for the CMS Coverage Database and ICD-10 codes. US Pro and Max users get HealthEx and Function connectors in beta.

My take: if your app stores health or fitness data, users will soon ask to share it with an assistant. Decide now what you expose, through which standard (HealthKit, Health Connect, FHIR), and how consent is logged.

## 2. Google publishes the Universal Commerce Protocol

Google released the Universal Commerce Protocol (UCP) on January 11, an open-source standard for agentic commerce. It lets consumer surfaces like AI Mode in Search and the Gemini app talk to merchant backends for discovery, cart and checkout.

- It works with AP2 for agent payments, and businesses can integrate through APIs, A2A or MCP.
- It was co-developed with Shopify, Etsy, Wayfair, Target and Walmart, and endorsed by over 20 partners including Stripe and Visa.
- Merchants stay the Merchant of Record. Google's own implementation needs a Merchant Center account and lets buyers pay with Google Pay.

Lesson: agents will hit your checkout through APIs, not your web UI. Clean product data, live inventory and a stable checkout API now matter as much as page speed.

## 3. Nvidia launches the Rubin platform at CES

On January 5, Nvidia launched Rubin, a platform of six new chips including the Vera CPU and Rubin GPU. Nvidia claims up to 10x lower inference cost per token and 4x fewer GPUs to train MoE models compared with Blackwell. Rubin is in full production, and partner products are due in the second half of 2026.

My take: per-token prices will keep falling through 2026. Build cost tracking per feature now, so you can tell when a cheaper model or tier makes a new feature viable.

## Mobile

- Claude's Apple Health and Android Health Connect integrations started rolling out in beta in the iOS and Android apps, for US Pro and Max users.
- Flutter 3.38.6 reached the stable channel on January 9.
- Apple tested its new Background Security Improvements system on iOS 26.3 beta with two test updates, the second on January 8. The updates install from Privacy and Security settings and can be removed.
- Samsung's Galaxy A17 went on sale in the US on January 7 for $199, with 6 years of Android OS and security updates.
- In the 2025 JavaScript Rising Stars, Snapchat's Valdi and ByteDance's Lynx beat React Native and Expo on GitHub stars for the first time, Bytes reported on January 10. Lynx 3.5 adds experimental React Compiler support.

## Also worth knowing

- Gmail added Gemini 3 features on January 8, including AI Overviews for long threads and an AI Inbox for trusted testers.
- Claude Code 2.1.0 shipped on January 7.
- Christoph Nakazawa (Jest, Yarn) released an alpha of fate, a data client for React and tRPC. It brings Relay-style co-located queries, one batched request per screen and data masking, without GraphQL.
- Tailwind Labs laid off 3 of its 4 engineers. CEO Adam Wathan said revenue is down almost 80% and docs traffic down 40% in two years as AI tools answer questions instead.
- Meta announced nuclear deals with Vistra, TerraPower and Oklo on January 9, for up to 6.6 GW by 2035.

## From my reading list

- The Pragmatic Engineer looked at what happens when AI writes almost all code, after Opus 4.5, GPT-5.2 and Gemini 3 changed how many senior engineers work. The useful part for tech leads: stack specialism and prototyping skills lose value, while product sense and tech lead skills gain it.
- ByteByteGo covered how Databricks cut database debugging time by up to 90% with an internal agent. A fixed checklist workflow failed first; what stuck was a chat assistant that pulls metrics and logs together and answers follow-up questions.

## What I'm watching

- Which health apps open their data to ChatGPT and Claude first, and how app store reviewers treat it.
- Whether Shopify and other platforms turn UCP on by default for merchants.
- How open source projects fund themselves when AI tools cut their docs traffic.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "OpenAI, Introducing ChatGPT Health (January 7, 2026)", url: "https://openai.com/index/introducing-chatgpt-health/" },
      { label: "Anthropic, Advancing Claude in healthcare and the life sciences (January 11, 2026)", url: "https://www.anthropic.com/news/healthcare-life-sciences" },
      { label: "TechCrunch, Anthropic announces Claude for Healthcare following OpenAI's ChatGPT Health reveal (January 12, 2026)", url: "https://techcrunch.com/2026/01/12/anthropic-announces-claude-for-healthcare-following-openais-chatgpt-health-reveal" },
      { label: "Google Developers Blog, Under the Hood: Universal Commerce Protocol (UCP) (January 11, 2026)", url: "https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/" },
      { label: "NVIDIA, NVIDIA Kicks Off the Next Generation of AI With Rubin: Six New Chips, One Incredible AI Supercomputer (January 5, 2026)", url: "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Kicks-Off-the-Next-Generation-of-AI-With-Rubin--Six-New-Chips-One-Incredible-AI-Supercomputer/" },
      { label: "Flutter Announce, Flutter Stable 3.38.6 (January 9, 2026)", url: "https://groups.google.com/g/flutter-announce/c/QZUp8zbg7VU" },
      { label: "9to5Mac, Apple releases iOS 26.3 security test for beta users (January 8, 2026)", url: "https://9to5mac.com/2026/01/08/apple-releases-ios-26-3-security-test-for-beta-users-details-here" },
      { label: "9to5Google, Galaxy A17 launches in January with 6 years of Android updates for $199 (December 30, 2025)", url: "https://9to5google.com/2025/12/30/galaxy-a17-launches-in-january-with-6-years-of-android-updates-for-199/" },
      { label: "Google, Gmail is entering the Gemini era (January 8, 2026)", url: "https://blog.google/products-and-platforms/products/gmail/gmail-is-entering-the-gemini-era/" },
      { label: "GitHub, anthropics/claude-code issue #16675 showing version 2.1.0 (2026-01-07) (January 7, 2026)", url: "https://github.com/anthropics/claude-code/issues/16675" },
      { label: "DEVCLASS, Tailwind Labs lays off 75 percent of its engineers thanks to 'brutal impact' of AI (January 8, 2026)", url: "https://www.devclass.com/ai-ml/2026/01/08/tailwind-labs-lays-off-75-percent-of-its-engineers-thanks-to-brutal-impact-of-ai/4079571" },
      { label: "Meta, Meta Announces Nuclear Energy Projects, Unlocking Up to 6.6 GW (January 9, 2026)", url: "https://about.fb.com/news/2026/01/meta-nuclear-energy-projects-power-american" },
      { label: "Bytes, #452: The fate of React (January 7, 2026)", url: "https://bytes.dev/archives/452" },
      { label: "Bytes, #453: More React-y than React Native (January 10, 2026)", url: "https://bytes.dev/archives/453" },
      { label: "The Pragmatic Engineer, When AI writes almost all code, what happens to software engineering? (January 6, 2026)", url: "https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what" },
      { label: "ByteByteGo, How AI Transformed Database Debugging at Databricks (January 6, 2026)", url: "https://blog.bytebytego.com/p/how-ai-transformed-database-debugging" },
    ],
  },
  {
    slug: "2026-01-19-week-3",
    date: "2026-01-19",
    lang: "en",
    title: "Week 3: Siri gets Gemini, Claude Cowork goes beyond code, and Node.js patches 8 CVEs",
    summary: "AI, web and mobile news for engineers who ship. January 12 to January 18, 2026.",
    tags: weeklyTags,
    body: `Apple picked a partner for its next AI models, Anthropic took its agent beyond code, and Node.js shipped a security release that touches most React and Next.js servers.

## 1. Apple will build its next foundation models on Gemini

On January 12, Apple and Google published a joint statement: under a multi-year collaboration, the next generation of Apple Foundation Models will be based on Google's Gemini models and cloud technology. They will help power future Apple Intelligence features, including a more personalized Siri coming this year.

Apple Intelligence keeps running on device and on Private Cloud Compute. The model comes from Google; the runtime and privacy boundary stay with Apple.

My take: do not plan around which model sits behind Siri. Plan around what your iOS app exposes to the system, because that is the part you control.

## 2. Claude Cowork: the Claude Code agent loop for non-coding work

Anthropic launched Cowork on January 12 as a research preview for Claude Max subscribers in the macOS app. Other plans get a waitlist.

- You give Claude access to one folder. It can read, edit and create files there, for example build an expense spreadsheet from screenshots.
- It is built on the same foundations as Claude Code, the Claude Agent SDK. It plans, works through the plan and can run queued tasks in parallel.
- It can use connectors, skills for documents and slides, and Claude in Chrome.
- Anthropic warns about destructive actions such as deleting files, and about prompt injection. Windows support is planned.

Lesson: the agent pattern that worked for code (scoped workspace, plan, act, check in) now ships to non-developers. If your product has file-based workflows, expect agents pointed at them: scope access and make changes easy to undo.

## 3. Node.js patches 8 vulnerabilities across all active lines

The delayed Node.js security release landed on January 13: 20.20.0, 22.22.0, 24.13.0 and 25.3.0. It fixes 3 high, 4 medium and 1 low severity issues, and updates c-ares and undici.

- CVE-2025-59465 (high): a malformed HTTP/2 HEADERS frame can crash the process if TLS sockets have no error handler.
- CVE-2025-55131 (high): \`Buffer.alloc\` could return leftover memory when the \`vm\` timeout interrupts allocation.
- CVE-2025-59466 (medium): with \`async_hooks\` enabled, stack overflow errors become uncatchable and the process exits. React Server Components, Next.js and most APM tools use \`AsyncLocalStorage\`.
- Two permission model bypasses matter if you run with \`--permission\`.

My take: upgrade base images this week, add error handlers to every TLS and HTTP/2 socket, and treat deep recursion on user input as a crash risk.

## Mobile

- Android Studio Otter 3 Feature Drop is stable (January 15). You can bring your own model, remote or local via LM Studio or Ollama, and Agent Mode can connect to remote MCP servers.
- Gemini Personal Intelligence entered beta on January 14 for Google AI Pro and Ultra subscribers in the US. It connects Gmail, Photos, YouTube and Search, is off by default, and works on Android, iOS and web.
- React Native 0.84 will enable Hermes V1 by default, This Week In React reported on January 14.

## Also worth knowing

- OpenAI made ChatGPT Go available everywhere on January 16 ($8 per month in the US) and plans to test ads in the US for Free and Go. Paid tiers above Go stay ad-free.
- \`gpt-5.2-codex\` reached the Responses API on January 14, and GitHub made it generally available in Copilot the same day.
- OpenAI announced Open Responses on January 15, an open spec for multi-provider LLM APIs based on the Responses API.
- Google released TranslateGemma on January 15: open translation models (4B, 12B, 27B) for 55 languages.
- Astro 6 beta shipped on January 13 with a redesigned \`astro dev\` built on Vite's Environment API, so development can run in the same runtime as production, including Cloudflare Workers.
- Bytes highlighted \`dx\` in Deno 2.6, a safer \`npx\`: it asks before downloading a package, asks again before lifecycle scripts, and runs inside Deno's permission system.

## From my reading list

- ByteByteGo explained how Uber's CacheFront serves over 150 million reads per second from Redis with hit rates above 99.9%. The useful part: asynchronous invalidation from the MySQL binlog broke read-your-own-writes, and a TTL alone only limits how long data stays stale.
- The Pragmatic Engineer's design systems deep dive, with Rubrik's 90+ component React library as the case study, has a point for small teams: a pre-built library like Base UI, Material UI or Chakra is often the better start than a custom one.
- Tech World With Milan listed the seven wastes of software work: partly done work, extra features, relearning, handoffs, delays, context switching and defects. Lesson for leads: WIP limits and fewer handoffs often save more time than faster typing.

## What I'm watching

- When the Gemini-based Siri ships, and what new hooks developers get.
- How fast Cowork reaches Windows and other Claude plans.
- How ads in ChatGPT are labeled.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Google, Joint statement from Google and Apple (January 12, 2026)", url: "https://blog.google/company-news/inside-google/company-announcements/joint-statement-google-apple/" },
      { label: "Claude, Cowork: Claude Code for the rest of your work (January 12, 2026, Wayback Machine copy)", url: "https://web.archive.org/web/2026011500/https://claude.com/blog/cowork-research-preview" },
      { label: "Node.js, Tuesday, January 13, 2026 Security Releases (January 13, 2026)", url: "https://nodejs.org/en/blog/vulnerability/december-2025-security-releases" },
      { label: "Node.js, Mitigating Denial-of-Service Vulnerability from Unrecoverable Stack Space Exhaustion for React, Next.js, and APM Users (January 2026)", url: "https://nodejs.org/en/blog/vulnerability/january-2026-dos-mitigation-async-hooks" },
      { label: "Android Developers Blog, LLM flexibility, Agent Mode improvements, and new agentic experiences in Android Studio Otter 3 Feature Drop (January 15, 2026)", url: "https://android-developers.googleblog.com/2026/01/llm-flexibility-agent-mode-improvements.html" },
      { label: "9to5Google, Gemini rolling out 'Personal Intelligence' beta that uses Gmail and your Google apps data (January 14, 2026)", url: "https://9to5google.com/2026/01/14/gemini-personal-intelligence/" },
      { label: "This Week In React, #264 (January 14, 2026)", url: "https://thisweekinreact.com/newsletter/264" },
      { label: "OpenAI, Introducing ChatGPT Go, now available worldwide (January 16, 2026)", url: "https://openai.com/index/introducing-chatgpt-go" },
      { label: "OpenAI API, Changelog (January 2026 entries)", url: "https://developers.openai.com/api/docs/changelog" },
      { label: "GitHub Changelog, GPT-5.2-Codex is now generally available in GitHub Copilot (January 14, 2026)", url: "https://github.blog/changelog/2026-01-14-gpt-5-2-codex-is-now-generally-available-in-github-copilot" },
      { label: "Google, TranslateGemma: A new suite of open translation models (January 15, 2026)", url: "https://blog.google/innovation-and-ai/technology/developers-tools/translategemma" },
      { label: "Bytes, #454: Practice safe npx with Deno (January 14, 2026)", url: "https://bytes.dev/archives/454" },
      { label: "Astro, Astro 6 Beta (January 13, 2026)", url: "https://astro.build/blog/astro-6-beta/" },
      { label: "ByteByteGo, How Uber Serves over 150 Million Reads per Second from Integrated Cache (January 14, 2026)", url: "https://blog.bytebytego.com/p/how-uber-serves-over-150-million" },
      { label: "The Pragmatic Engineer, Design Systems for Software Engineers (January 13, 2026)", url: "https://newsletter.pragmaticengineer.com/p/design-systems-for-software-engineers" },
      { label: "Tech World With Milan, Software Development Waste (January 15, 2026)", url: "https://newsletter.techworld-with-milan.com/p/software-development-waste" },
    ],
  },
  {
    slug: "2026-01-26-week-4",
    date: "2026-01-26",
    lang: "en",
    title: "Week 4: Agent skills get a package manager, Codex joins JetBrains, and Gemini aliases move",
    summary: "AI, web and mobile news for engineers who ship. January 19 to January 25, 2026.",
    tags: weeklyTags,
    body: `Tooling around coding agents grew up: skills became installable packages, Codex moved into JetBrains IDEs, and Google quietly changed what its "latest" model names point to.

## 1. Agent skills get a package manager

On January 20, Vercel released \`skills\`, a CLI to install and manage skill packages for agents with \`npx skills add <package>\`. Vercel says it has been used to install skills on 17 agents, including Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot and Windsurf. It also launched skills.sh, a directory of skill packages ranked by installs. This Week In React counted React-focused packs from Vercel (React and Next.js best practices), Callstack (React Native) and Expo.

On January 21, Vercel added skills support to \`bash-tool\`, so AI SDK agents can load skills with filesystem context and sandboxed Bash, from public packages or your own private ones.

Lesson: a skill is code that runs with your agent's permissions. Review a third-party skill like an npm dependency before you install it, and pin the version.

## 2. Codex comes to JetBrains IDEs

On January 22, JetBrains made OpenAI Codex a native agent in the AI chat of its IDEs, starting from version 2025.3. You can sign in with a JetBrains AI subscription, a ChatGPT account or an OpenAI API key. Through JetBrains AI it is free for a limited time, until promotional credits run out; ChatGPT and API key logins are not included.

On January 23, OpenAI engineer Michael Bolin published "Unrolling the Codex agent loop", the first post in a series on how Codex CLI works. It covers how the harness builds prompts, calls tools and compacts the conversation through the Responses API once \`auto_compact_limit\` is passed.

My take: the post is the best free guide this month to building your own agent loop. Read it before you write one, especially the parts on context growth and compaction.

## 3. Gemini "latest" aliases now point to Gemini 3

On January 21, the Gemini API changed its aliases: \`gemini-pro-latest\` now points to \`gemini-3-pro-preview\` and \`gemini-flash-latest\` to \`gemini-3-flash-preview\`. Any app that calls an alias got a new model overnight, and a preview model at that.

On January 22, Google also brought Personal Intelligence to AI Mode in Search: US AI Pro and Ultra subscribers can opt in to connect Gmail and Google Photos, as a Labs feature.

Lesson: pin exact model IDs in production and move to new ones on purpose, after your evals pass. Use aliases only in prototypes.

## Mobile

- Expo SDK 55 beta opened on January 22 for about two weeks. It ships React Native 0.83.1 and React 19.2.0, drops the Legacy Architecture, moves app code to \`/src/app\`, and lets you opt in to Hermes v1.
- Liquid AI released LFM2.5-1.2B-Thinking on January 20, a reasoning model that runs on-device in about 900 MB of memory on a phone, with day-zero support in llama.cpp, MLX, vLLM and ONNX Runtime.

## Also worth knowing

- Firefox 147 (January 13) added the Navigation API, CSS anchor positioning and view transition types, so all three now work in every major browser. This Week In React flagged it on January 21: React's canary \`ViewTransition\` relies on transition types, and anchor positioning can replace Popper.js or Floating UI for tooltips.
- OpenAI began rolling out age prediction on ChatGPT consumer plans on January 20. Users wrongly flagged as under 18 can verify with a selfie through Persona.
- Anthropic published a new constitution for Claude on January 22, released under CC0 so anyone can reuse it.
- GitHub made the improved pull request "Files changed" page the default for all users on January 22, with comments on any line and saved drafts.
- jQuery 4.0.0 shipped on January 17, its first major release in almost 10 years. It drops IE 10 and older, adds Trusted Types support for strict CSP, and moves the source to ES modules.
- Vercel released json-render, a generative UI library: the model builds dashboards and widgets only from a React component catalog you provide.

## From my reading list

- The Pragmatic Engineer's episode on how S3 is built: auditor services check every byte so the 11 nines of durability is measured, formal proofs run when engineers check in consistency code, and correlated failures are now the main risk. Lesson: measure the reliability numbers you promise.
- Refactoring argued that agents fail in production because of reliability and the system around the model, not intelligence. The teams that succeed start narrow, keep humans on critical steps, and widen the agent's authority as trust grows.

## What I'm watching

- Whether skills.sh adds signing or verification for skill packages.
- When Gemini 3 leaves preview, and whether the "latest" aliases move again.
- How many agents JetBrains adds to its AI chat after Codex.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Vercel Changelog, Introducing skills, the open agent skills ecosystem (January 20, 2026)", url: "https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem" },
      { label: "Vercel Changelog, Use skills in your AI SDK agents via bash-tool (January 21, 2026)", url: "https://vercel.com/changelog/use-skills-in-your-ai-sdk-agents-via-bash-tool" },
      { label: "JetBrains AI Blog, Codex Is Now Integrated Into JetBrains IDEs (January 22, 2026)", url: "https://blog.jetbrains.com/ai/2026/01/codex-in-jetbrains-ides/" },
      { label: "OpenAI, Unrolling the Codex agent loop (January 23, 2026)", url: "https://openai.com/index/unrolling-the-codex-agent-loop/" },
      { label: "Google AI for Developers, Gemini API release notes (January 21, 2026 entry)", url: "https://ai.google.dev/gemini-api/docs/changelog" },
      { label: "Google, Personal Intelligence in AI Mode in Search (January 22, 2026)", url: "https://blog.google/products-and-platforms/products/search/personal-intelligence-ai-mode-search/" },
      { label: "Expo Changelog, Expo SDK 55 Beta is now available (January 22, 2026)", url: "https://expo.dev/changelog/sdk-55-beta" },
      { label: "Liquid AI, LFM2.5-1.2B-Thinking: On-Device Reasoning Under 1GB (January 20, 2026)", url: "https://www.liquid.ai/blog/lfm2-5-1-2b-thinking-on-device-reasoning-under-1gb" },
      { label: "OpenAI, Our approach to age prediction (January 20, 2026)", url: "https://openai.com/index/our-approach-to-age-prediction/" },
      { label: "Anthropic, Claude's new constitution (January 22, 2026)", url: "https://www.anthropic.com/news/claude-new-constitution" },
      { label: "GitHub Changelog, Improved pull request Files changed page on by default (January 22, 2026)", url: "https://github.blog/changelog/2026-01-22-improved-pull-request-files-changed-page-on-by-default/" },
      { label: "This Week In React, #265: React Skills, json-render, ViewTransition, Base UI, shadcn (January 21, 2026)", url: "https://thisweekinreact.com/newsletter/265" },
      { label: "Mozilla, Firefox 147.0 release notes (January 13, 2026)", url: "https://www.firefox.com/en-US/firefox/147.0/releasenotes/" },
      { label: "jQuery Blog, jQuery 4.0.0 (January 17, 2026)", url: "https://blog.jquery.com/2026/01/17/jquery-4-0-0/" },
      { label: "The Pragmatic Engineer, How AWS S3 is built (January 21, 2026)", url: "https://newsletter.pragmaticengineer.com/p/how-aws-s3-is-built" },
      { label: "Refactoring, Making AI agents work in the real world (January 21, 2026)", url: "https://refactoring.fm/p/making-ai-agents-work-in-the-real" },
    ],
  },
  {
    slug: "2026-02-02-week-5",
    date: "2026-02-02",
    lang: "en",
    title: "Week 5: React and Next.js DoS fixes, MCP Apps go live, and Chrome learns to auto browse",
    summary: "AI, web and mobile news for engineers who ship. January 26 to February 1, 2026.",
    tags: weeklyTags,
    body: `Agents got a real UI this week: tools can now render interactive apps inside the chat, and Chrome started clicking through websites on its own. But first, React and Next.js patches.

## 1. React and Next.js: a new round of denial-of-service fixes

On January 26, React disclosed CVE-2026-23864 (high, CVSS 7.5): crafted HTTP requests to Server Function endpoints can crash the server, exhaust memory or burn CPU. It affects the \`react-server-dom-*\` packages in React 19.0 to 19.2, and every RSC framework. Fixed in 19.0.4, 19.1.5 and 19.2.4. An app can be exposed even if it defines no Server Functions.

Vercel also published two medium-severity advisories (CVSS 5.9 each) for self-hosted Next.js. Both crash the Node.js process through memory exhaustion. Apps hosted on Vercel are not affected.

- CVE-2025-59471: the \`/_next/image\` endpoint loads remote images fully into memory when \`remotePatterns\` is set. Affects versions 10 up to 15.5.10 and 16 up to 16.1.5.
- CVE-2025-59472: the Partial Pre-Rendering resume endpoint buffers unbounded POST bodies. It only applies with \`experimental.ppr\` or \`cacheComponents\` plus \`NEXT_PRIVATE_MINIMAL_MODE=1\`.
- Fixed in 15.5.10, 15.6.0-canary.61, 16.1.5 and 16.2.0-canary.9.

Lesson: move React to the patched release of your minor (19.0.4, 19.1.5 or 19.2.4) and Next.js to 16.1.5 or 15.5.10 now. If you can't, trim \`remotePatterns\` to domains you control and set request size limits at the reverse proxy.

## 2. MCP Apps: interactive UI inside the conversation

On January 26, the MCP maintainers made MCP Apps the first official MCP extension. A tool can declare a UI resource, and the host renders it in a sandboxed iframe in the chat: dashboards, forms, multi-step flows. The spec builds on MCP-UI and the OpenAI Apps SDK, and ChatGPT, Claude, Goose and VS Code already support it.

The same day, Anthropic launched interactive connectors in Claude built on MCP Apps. Asana, Slack, Figma, Canva, Box, Amplitude, Clay, Hex and monday.com now open inside the conversation on web, desktop and mobile, for every plan from Free to Enterprise. Salesforce is listed as coming soon.

My take: this turns an MCP server into a small front-end product. If you already ship an internal MCP server, the cheapest win is a review screen: show the user what the tool is about to do, and let them confirm it in the UI.

## 3. Chrome auto browse and computer use in the Gemini API

On January 28, Google moved Gemini in Chrome into a side panel on macOS, Windows and Chromebook Plus, built on Gemini 3. For Google AI Pro and Ultra subscribers in the US, it added auto browse: Chrome carries out multi-step tasks such as comparing prices or filling forms. It pauses for confirmation on sensitive steps like purchases or social posts, and with permission it can use Google Password Manager to sign in.

The next day, the Gemini API changelog added the Computer Use tool to \`gemini-3-pro-preview\` and \`gemini-3-flash-preview\`.

My take: browser agents will start visiting your web app. Stable labels, real \`button\` elements and clear form errors help them as much as they help screen readers.

## Mobile

- Apple's deadline to answer the new age rating questions in App Store Connect was January 31. Apps that skip them risk interrupted update submissions.
- Flutter 3.38.8 shipped on January 27 as a stable hotfix, with Dart 3.10.7.

## Also worth knowing

- Moonshot AI released Kimi K2.5, an open-source multimodal model with 1T parameters. It can run an agent swarm of up to 100 sub-agents and 1,500 tool calls, and is available in Kimi Code, the app and the API.
- The open-source assistant formerly called Clawdbot and Moltbot was renamed OpenClaw on January 29, with over 100,000 GitHub stars and 34 security commits in the release.
- Rolldown 1.0 RC, the Rust bundler that will be Vite 8's default, marks API stability: 10 to 30x faster than Rollup, with Rollup-compatible plugins and built-in TypeScript and JSX transforms.
- Bun 1.3.7 (January 27) upgrades JavaScriptCore and makes \`Buffer.from()\` up to 50% faster with arrays.

## From my reading list

- ByteByteGo broke down Cursor's coding agent: router, model, 10+ tools, context retrieval, orchestrator loop and sandbox. The useful part: the model is one component; most of the work is systems engineering.
- ByteByteGo's piece on Google Zanzibar covers the "new enemy" problem: remove a user, add content, and stale permission data can still show it to them. Zanzibar fixes it with zookies, tokens that force checks against data at least as fresh as the content.
- Refactoring argued that AI pays off most for teams that already have good developer experience. Its listening tour method: interview engineers about friction, map it to pipeline steps, score by reach and impact, then fix the one bottleneck.

## What I'm watching

- Which hosts beyond Claude and ChatGPT render MCP Apps, and how they handle the iframe sandbox.
- How sites detect and handle Chrome auto browse traffic.
- Whether Kimi K2.5 becomes a common low-cost option inside coding agents.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Vercel Changelog, Summaries of CVE-2025-59471 and CVE-2025-59472 (January 26, 2026)", url: "https://vercel.com/changelog/summaries-of-cve-2025-59471-and-cve-2025-59472" },
      { label: "Model Context Protocol Blog, MCP Apps: Bringing UI Capabilities To MCP Clients (January 26, 2026)", url: "https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/" },
      { label: "Claude, Your favorite work tools are now interactive connectors inside Claude (January 26, 2026)", url: "https://claude.com/blog/interactive-tools-in-claude" },
      { label: "Google, The new era of browsing: Putting Gemini to work in Chrome (January 28, 2026)", url: "https://blog.google/products-and-platforms/products/chrome/gemini-3-auto-browse/" },
      { label: "Google AI for Developers, Gemini API release notes (January 29, 2026 entry)", url: "https://ai.google.dev/gemini-api/docs/changelog" },
      { label: "Apple Developer, Age Rating Updates (deadline January 31, 2026)", url: "https://developer.apple.com/news/upcoming-requirements/?id=07242025a" },
      { label: "Flutter Releases, Flutter 3.38.8 (January 27, 2026)", url: "https://flutterreleases.com/release/3.38.8/" },
      { label: "Kimi, Kimi K2.5: Visual Agentic Intelligence (January 2026)", url: "https://www.kimi.ai/blog/kimi-k2-5" },
      { label: "Hugging Face, Kimi K2.5: Still Worth It After Two Weeks? (February 23, 2026)", url: "https://huggingface.co/blog/mlabonne/kimik25" },
      { label: "OpenClaw Blog, Introducing OpenClaw (January 29, 2026)", url: "https://openclaw.ai/blog/introducing-openclaw" },
      { label: "Bun Blog, Bun v1.3.7 (January 27, 2026)", url: "https://bun.com/blog/release-notes/bun-v1.3.7" },
      { label: "React, Denial of Service and Source Code Exposure in React Server Components (updated January 26, 2026)", url: "https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components" },
      { label: "VoidZero, Announcing Rolldown 1.0 RC (January 22, 2026)", url: "https://voidzero.dev/posts/announcing-rolldown-rc" },
      { label: "ByteByteGo, How Cursor Shipped its Coding Agent to Production (January 26, 2026)", url: "https://blog.bytebytego.com/p/how-cursor-shipped-its-coding-agent" },
      { label: "ByteByteGo, How Google Manages Trillions of Authorizations with Zanzibar (January 27, 2026)", url: "https://blog.bytebytego.com/p/how-google-manages-trillions-of-authorizations" },
      { label: "Refactoring, The Listening Tour (January 28, 2026)", url: "https://refactoring.fm/p/the-listening-tour" },
    ],
  },
  {
    slug: "2026-02-09-week-6",
    date: "2026-02-09",
    lang: "en",
    title: "Week 6: Opus 4.6 and GPT-5.3-Codex land together, and Xcode opens to agents",
    summary: "AI, web and mobile news for engineers who ship. February 2 to February 8, 2026.",
    tags: weeklyTags,
    body: `Two frontier coding models shipped on the same Thursday, and Apple opened Xcode to outside agents.

## 1. Claude Opus 4.6: 1M context and agent teams

Anthropic released Claude Opus 4.6 on February 5 on claude.ai, the API and the major cloud platforms. The model ID is \`claude-opus-4-6\`.

- Price stays at $5 per million input tokens and $25 output. Prompts over 200K tokens cost $10 and $37.50, on the Claude Platform only.
- It is the first Opus-class model with a 1M token context window, in beta, and it supports up to 128K output tokens.
- New API controls: compaction for long tasks, adaptive thinking, and effort levels. Anthropic suggests medium effort if the model overthinks simple tasks.
- Claude Code gets agent teams in research preview: several agents work in parallel on tasks that split into independent parts.

GitHub made Opus 4.6 generally available in Copilot the same day; Business and Enterprise admins must enable the policy first.

My take: treat effort as a budget knob, not a quality knob. Run your evals at medium and high, and only pay for high where the difference shows up.

## 2. GPT-5.3-Codex and the Codex app for macOS

On February 2, OpenAI launched the Codex app for macOS, a desktop place to run several agents in parallel. Each agent works in its own git worktree, so they don't collide on one repo. The app also supports skills and scheduled Automations. For a limited time, Codex is included in ChatGPT Free and Go, and rate limits are doubled on paid plans.

On February 5, OpenAI released GPT-5.3-Codex. It combines the coding of GPT-5.2-Codex with the reasoning of GPT-5.2, runs 25% faster for Codex users, and OpenAI reports top scores on SWE-Bench Pro and Terminal-Bench. It works everywhere Codex runs for paid ChatGPT plans. API access is "soon", not yet.

Lesson: parallel agents only help if review keeps up. Set a limit on open agent branches per developer, the same way you limit work in progress.

## 3. Xcode 26.3 brings Claude Agent and Codex into the IDE

Apple announced Xcode 26.3 on February 3 as a release candidate for all Apple Developer Program members. It adds agentic coding with Anthropic's Claude Agent and OpenAI's Codex built in. Agents can search documentation, change project settings, and check their work by capturing Xcode Previews and running builds. Xcode also exposes its features over the Model Context Protocol, so any compatible agent can use them.

The same week, on February 4, GitHub put Claude and Codex coding agents in public preview for Copilot Pro+ and Enterprise. Each session costs one premium request.

My take: the agent is becoming a setting, not a product choice. Write your project rules once, in files any agent can read, and keep them in the repo.

## Mobile

- The February Pixel update (February 3) for Android 16 QPR2 has no listed bug fixes, only one high-severity Pixel patch, CVE-2026-0106.
- Mistral's Voxtral Realtime is a 4B open-weights speech-to-text model (Apache 2.0) that runs on edge devices, with latency configurable below 200 ms.
- Worklets were extracted from Reanimated into a standalone multithreading primitive. The upcoming VisionCamera V5 uses them to run frame processors on the camera thread.

## Also worth knowing

- Mistral released Voxtral Transcribe 2 on February 4: the batch model costs $0.003 per audio minute and Realtime $0.006, across 13 languages including Arabic and French.
- Qwen3-Coder-Next is an open-weight coding model with 80B total and 3B active parameters and a 256K context window, aimed at local coding agents.
- VS Code 1.109 (February 4) adds Claude agent support, MCP Apps in chat, terminal sandboxing and an integrated browser.
- Mozilla announced AI controls for Firefox 148 (rolling out February 24), with one toggle to block all generative AI features.
- Node.js 25.6.0 (Current) shipped on February 3.
- Bytes covered Babel 7.29.0, the last Babel 7 minor, and Babel 8.0.0 RC. Babel 8 is ESM-only, and \`@babel/preset-env\` follows Browserslist defaults instead of compiling everything to ES5.

## From my reading list

- The Pragmatic Engineer asked 10 tech companies how they choose AI dev tools. Small teams try tools for a couple of weeks and keep what sticks, and nobody has solved productivity measurement.
- In the same piece, WeTravel scored about 100 AI review comments from -3 to +3 across five dimensions. The useful part: score a sample of real comments before you buy a review tool, not after.
- Refactoring published Pat Kua's CTO archetypes: two people with the CTO title can have very different jobs. Use the archetypes to agree on scope before a hire or a promotion.

## What I'm watching

- When GPT-5.3-Codex reaches the API, and at what price.
- Whether Xcode 26.3 ships to the App Store unchanged from the RC.
- How parallel agents change code review load on real teams.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Anthropic, Introducing Claude Opus 4.6 (February 5, 2026)", url: "https://www.anthropic.com/news/claude-opus-4-6" },
      { label: "GitHub Changelog, Claude Opus 4.6 is now generally available for GitHub Copilot (February 5, 2026)", url: "https://github.blog/changelog/2026-02-05-claude-opus-4-6-is-now-generally-available-for-github-copilot/" },
      { label: "OpenAI, Introducing the Codex app (February 2, 2026)", url: "https://openai.com/index/introducing-the-codex-app/" },
      { label: "OpenAI, Introducing GPT-5.3-Codex (February 5, 2026)", url: "https://openai.com/index/introducing-gpt-5-3-codex/" },
      { label: "Apple Newsroom, Xcode 26.3 unlocks the power of agentic coding (February 3, 2026)", url: "https://www.apple.com/newsroom/2026/02/xcode-26-point-3-unlocks-the-power-of-agentic-coding/" },
      { label: "GitHub Changelog, Claude and Codex are now available in public preview on GitHub (February 4, 2026)", url: "https://github.blog/changelog/2026-02-04-claude-and-codex-are-now-available-in-public-preview-on-github/" },
      { label: "9to5Google, Android 16 February 2026 update rolling out: No Pixel bug fixes (February 3, 2026)", url: "https://9to5google.com/2026/02/03/android-16-february-update-pixel/" },
      { label: "Mistral AI, Voxtral transcribes at the speed of sound (February 4, 2026)", url: "https://mistral.ai/news/voxtral-transcribe-2/" },
      { label: "Hugging Face, Qwen/Qwen3-Coder-Next model card (February 2026)", url: "https://huggingface.co/Qwen/Qwen3-Coder-Next" },
      { label: "Visual Studio Code, January 2026 (version 1.109) release notes (February 4, 2026)", url: "https://code.visualstudio.com/updates/v1_109" },
      { label: "Mozilla, AI controls are coming to Firefox (February 2, 2026)", url: "https://blog.mozilla.org/en/firefox/ai-controls/" },
      { label: "This Week In React, #267: Bun, Next-Intl, Worklets, Xcode (February 4, 2026)", url: "https://thisweekinreact.com/newsletter/267" },
      { label: "Babel, 7.29.0 Released: The last Babel 7 minor release (January 31, 2026)", url: "https://babeljs.io/blog/2026/01/31/7.29.0" },
      { label: "The Pragmatic Engineer, Deepdive: How 10 tech companies choose the next generation of dev tools (February 3, 2026)", url: "https://newsletter.pragmaticengineer.com/p/measuring-ai-dev-tools" },
      { label: "Refactoring, CTO Archetypes (February 4, 2026)", url: "https://refactoring.fm/p/cto-archetypes" },
    ],
  },
  {
    slug: "2026-02-16-week-7",
    date: "2026-02-16",
    lang: "en",
    title: "Week 7: Codex-Spark hits 1000 tokens a second, WebMCP opens the web to agents, and Hermes V1 becomes the default",
    summary: "AI, web and mobile news for engineers who ship. February 9 to February 15, 2026.",
    tags: weeklyTags,
    body: `The speed race moved into the editor, the browser got a proposal for talking to agents, and React Native changed its default engine.

## 1. GPT-5.3-Codex-Spark: coding at more than 1000 tokens per second

On February 12, OpenAI released a research preview of GPT-5.3-Codex-Spark, a smaller version of GPT-5.3-Codex and its first model built for real-time coding. It runs on Cerebras' Wafer Scale Engine 3 and delivers more than 1000 tokens per second.

- It has a 128k context window and is text-only at launch.
- It is rolling out to ChatGPT Pro users in the Codex app, CLI and VS Code extension, with its own rate limits. API access is limited to a small set of design partners.
- By default it makes minimal edits and does not run tests unless you ask.
- A persistent WebSocket connection cut harness overhead by 80% per round trip and 30% per token, and halved time-to-first-token. It will become the default for all models.

My take: a fast model that skips tests by default is a pair programmer, not an agent you leave alone. Use it for small, interactive edits and keep your test suite as the gate before anything merges.

## 2. The web gets an API for agents: WebMCP and Interop 2026

On February 10, Chrome opened an early preview of WebMCP, a proposed standard that lets a site expose structured tools to AI agents instead of letting them guess from the DOM. It has two parts: a declarative API for standard actions defined in HTML forms, and an imperative API for dynamic interactions that need JavaScript.

Two days later, Apple, Google, Igalia, Microsoft and Mozilla announced Interop 2026. Focus areas include anchor positioning, container style queries, scroll-driven animations, cross-document view transitions, \`attr()\` and \`contrast-color()\`.

Lesson: list the forms users fill again and again (support, checkout, booking). They are the first candidates to expose as agent tools once WebMCP settles.

## 3. React Native 0.84 makes Hermes V1 the default

React Native 0.84 shipped on February 11. Hermes V1 is now the default JavaScript engine on iOS and Android, after being opt-in since 0.82. Apps on Hermes get it with no config change.

- Precompiled iOS binaries are now on by default, so clean builds no longer compile React Native core from source.
- Legacy Architecture code is no longer included in iOS builds.
- Node.js 22.11 is the new minimum.
- It syncs React 19.2.3 and adds HEIC/HEIF image support.

My take: bump Node in CI before you bump React Native. A version mismatch there is the most boring way to lose a day on this upgrade.

## Mobile

- Flutter 3.41 landed on February 11 with public release windows: four stable releases in 2026 (February, May, August, November). Don't move Flutter Android apps to AGP 9 yet.
- Android 17 Beta 1 reached Pixel devices on February 13. Apps that target API level 37 can no longer opt out of resizing and windowed multitasking on large screens.
- GitHub Mobile now has a model picker for Copilot coding agent sessions, for Copilot Pro and Pro+ users (February 11).
- Gesture Handler 3.0 beta drops the Legacy Architecture and adds a hook-based API that works with the React Compiler. No APIs were removed.

## Also worth knowing

- TypeScript 6.0 beta (February 11) is the last release on the JavaScript codebase. Options it deprecates will be removed in the native TypeScript 7.0, which is planned soon after 6.0.
- Cloudflare launched Markdown for Agents on February 12: send \`Accept: text/markdown\` and it converts HTML to Markdown at the edge. Its own post drops from 16,180 tokens in HTML to 3,150 in Markdown.
- Chrome 145 reached stable on February 10 with \`text-justify\`, multicol \`column-wrap\`, and customizable select in listbox mode.
- Go 1.26 shipped on February 10: the Green Tea garbage collector is on by default, and cgo overhead is about 30% lower.
- Anthropic raised $30 billion at a $380 billion valuation on February 12. It says Claude Code run-rate revenue is now over $2.5 billion.

## From my reading list

- Bytes covered ESLint 10 (released February 6): eslintrc is gone, with no opt-out, and config lookup now starts from each linted file, which helps monorepos. Plan the flat config migration now.
- Tech World With Milan argued for spending 80% of learning time on fundamentals and 20% on frameworks. With AI-generated code, debugging without fundamentals is just guessing.
- ByteByteGo explained how OpenAI built ChatGPT Atlas on OWL, a layer that runs Chromium as a separate process instead of embedding it. The lesson: decouple your UI from a heavy engine to keep the app responsive.

## What I'm watching

- Whether WebMCP gets support from other browser vendors, or stays a Chrome experiment.
- How long the TypeScript 6.0 to 7.0 gap really is. Clearing the 6.0 deprecations now is cheap insurance.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "OpenAI, Introducing GPT-5.3-Codex-Spark (February 12, 2026)", url: "https://openai.com/index/introducing-gpt-5-3-codex-spark/" },
      { label: "Chrome for Developers, WebMCP is available for early preview (February 10, 2026)", url: "https://developer.chrome.com/blog/webmcp-epp" },
      { label: "web.dev, Interop 2026: Continuing to improve the web for developers (February 12, 2026)", url: "https://web.dev/blog/interop-2026" },
      { label: "React Native, React Native 0.84 - Hermes V1 by Default (February 11, 2026)", url: "https://reactnative.dev/blog/2026/02/11/react-native-0.84" },
      { label: "Flutter blog, What's new in Flutter 3.41 (February 11, 2026)", url: "https://blog.flutter.dev/whats-new-in-flutter-3-41-302ec140e632" },
      { label: "Android Developers Blog, The First Beta of Android 17 (February 13, 2026)", url: "https://android-developers.googleblog.com/2026/02/the-first-beta-of-android-17.html" },
      { label: "GitHub Changelog, GitHub Mobile: Model picker for Copilot coding agent (February 11, 2026)", url: "https://github.blog/changelog/2026-02-11-github-mobile-model-picker-for-copilot-coding-agent" },
      { label: "Microsoft TypeScript blog, Announcing TypeScript 6.0 Beta (February 11, 2026)", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-beta/" },
      { label: "Chrome for Developers, Chrome 145 release notes (February 10, 2026)", url: "https://developer.chrome.com/release-notes/145" },
      { label: "Go blog, Go 1.26 is released (February 10, 2026)", url: "https://go.dev/blog/go1.26" },
      { label: "Anthropic, Anthropic raises $30 billion in Series G funding (February 12, 2026)", url: "https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation" },
      { label: "This Week In React, #268: Bulletproof Comps, Render Types, RN 0.84, Gestures (February 11, 2026)", url: "https://thisweekinreact.com/newsletter/268" },
      { label: "Cloudflare Blog, Introducing Markdown for Agents (February 12, 2026)", url: "https://blog.cloudflare.com/markdown-for-agents/" },
      { label: "ESLint, ESLint v10.0.0 released (February 6, 2026)", url: "https://eslint.org/blog/2026/02/eslint-v10.0.0-released/" },
      { label: "Tech World With Milan, Learn fundamentals, not frameworks (February 12, 2026)", url: "https://newsletter.techworld-with-milan.com/p/learn-fundamentals-not-frameworks" },
      { label: "ByteByteGo, The Architecture Behind Atlas: OpenAI's New ChatGPT-based Browser (February 11, 2026)", url: "https://blog.bytebytego.com/p/the-architecture-behind-atlas-openais" },
    ],
  },
  {
    slug: "2026-02-23-week-8",
    date: "2026-02-23",
    lang: "en",
    title: "Week 8: Sonnet 4.6 and Gemini 3.1 Pro land, and an npm worm targets AI coding tools",
    summary: "AI, web and mobile news for engineers who ship. February 16 to February 22, 2026.",
    tags: weeklyTags,
    body: `Two frontier models landed in three days, and an npm worm showed that AI coding tools are now a target of their own.

## 1. Claude Sonnet 4.6: near-Opus work at Sonnet prices

Anthropic released Claude Sonnet 4.6 on February 17. It is now the default model for Free and Pro users in claude.ai and Claude Cowork. API pricing stays at Sonnet 4.5 levels, starting at $3 input and $15 output per million tokens, and it has a 1M token context window in beta.

- In Anthropic's early Claude Code testing, users preferred it to Sonnet 4.5 about 70% of the time, and to Opus 4.5 59% of the time.
- Testers reported fewer false claims of success and better follow-through on multi-step tasks.
- Anthropic says resistance to prompt injection in computer use is a major improvement over Sonnet 4.5, and close to Opus 4.6.

My take: if you pay Opus prices for routine coding or agent work, run your own eval set on Sonnet 4.6 this week. Keep Opus for the tasks where the eval shows a real gap.

## 2. Gemini 3.1 Pro arrives in preview

Google released Gemini 3.1 Pro on February 19, in preview across the Gemini API, Gemini CLI, Antigravity, Android Studio, Vertex AI, the Gemini app and NotebookLM.

- On ARC-AGI-2 it reached a verified 77.1%, which Google says is more than double Gemini 3 Pro.
- The model ID is \`gemini-3.1-pro-preview\`, with 1,048,576 input tokens and 65,536 output tokens.
- A separate \`gemini-3.1-pro-preview-customtools\` endpoint is tuned for agents that mix bash with custom tools such as \`view_file\` or \`search_code\`.

Lesson: preview means the model can change under you. Pin the exact model ID, log which version answered each request, and keep a fallback model wired in.

## 3. AI coding tools are now part of the attack surface

On February 20, Socket disclosed SANDWORM_MODE, a Shai-Hulud-style npm worm. It spread through at least 19 typosquatted packages, with names such as \`claud-code\`, \`cloude-code\` and \`opencraw\`.

- It steals npm and GitHub tokens and CI secrets, and harvests API keys for nine LLM providers.
- It injects \`pull_request_target\` workflows to dump repository secrets.
- It installs rogue MCP servers into Claude Desktop, Cursor and VS Code configs, with prompt injection aimed at the coding assistant.
- A dead switch wipes the home directory if it loses GitHub and npm access at once.

The same day, Anthropic opened Claude Code Security as a limited research preview for Enterprise and Team customers, with free expedited access for open-source maintainers. It scans codebases, re-checks its findings to filter false positives, and rates each by severity and confidence. Nothing is applied without human approval.

My take: treat your MCP config files like your \`.npmrc\`. Review changes to them in code review, and copy package names from the vendor docs instead of typing them.

## Mobile

- iOS 26.4 beta 1 reached developers on February 16 and public beta testers on February 17. It has no new Siri yet, but tests end-to-end encrypted RCS between iPhones.
- Hermes can now run WebAssembly (February 17): load a standard \`.wasm\` binary or precompile it to Hermes bytecode. It is an early preview, not for production yet.
- Gemini 3.1 Pro is in Android Studio from day one, in preview.

## Also worth knowing

- Figma launched Claude Code to Figma on February 17: capture a working UI from production, staging or localhost as editable Figma frames.
- GGML, the team behind llama.cpp, joined Hugging Face on February 20. The project stays open source and the maintainers keep technical leadership.
- Vercel published \`fast-webstreams\` on February 18: native WebStreams in Node.js piped 630 MB/s on 1KB chunks, against about 7,900 MB/s for \`pipeline()\`. It keeps the WHATWG API on top of Node streams, and the work is going upstream to Node.js.
- \`next-mdx-remote\` versions 4.3.0 to below 6.0.0 allow arbitrary code execution when rendering untrusted MDX (CVE-2026-0969). Upgrade to 6.0.0.

## From my reading list

- Refactoring and CircleCI's State of Software Delivery 2026 (more than 28 million CI workflows): feature branch activity is up 59%, main branch activity down 7%, and build success fell to 70.8%. The useful part: AI made writing code cheaper, so the bottleneck moved to CI, review and deploy.
- ByteByteGo explained how OpenAI serves 800 million ChatGPT users from one Postgres primary plus read replicas. The lesson: move write-heavy work out, fix expensive queries, and delay sharding.
- The Pragmatic Engineer's deep dive on Codex: the team chose Rust partly to keep dependencies few and auditable, and estimates Codex writes more than 90% of its own code.

## What I'm watching

- When Gemini 3.1 Pro leaves preview, and at what price.
- Whether npm and editor vendors add signing or allowlists for MCP server configs.
- How Claude Code Security findings compare with existing static analysis on real repositories.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "Anthropic, Introducing Claude Sonnet 4.6 (February 17, 2026)", url: "https://www.anthropic.com/news/claude-sonnet-4-6" },
      { label: "Google, Gemini 3.1 Pro: A smarter model for your most complex tasks (February 19, 2026)", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/" },
      { label: "Google AI for Developers, Gemini 3.1 Pro preview model page (February 2026)", url: "https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview" },
      { label: "Google Cloud blog, Introducing Gemini 3.1 Pro on Google Cloud (February 19, 2026)", url: "https://cloud.google.com/blog/products/ai-machine-learning/gemini-3-1-pro-on-gemini-cli-gemini-enterprise-and-vertex-ai" },
      { label: "Socket, SANDWORM_MODE: Shai-Hulud-Style npm Worm Hijacks CI Workflows and Poisons AI Toolchains (February 20, 2026)", url: "https://socket.dev/blog/sandworm-mode-npm-worm-ai-toolchain-poisoning" },
      { label: "Anthropic, Making frontier cybersecurity capabilities available to defenders (February 20, 2026)", url: "https://www.anthropic.com/news/claude-code-security" },
      { label: "9to5Mac, iOS 26.4 beta 1: Here are the new iPhone features (February 16, 2026)", url: "https://9to5mac.com/2026/02/16/ios-26-4-beta-1-heres-everything-new" },
      { label: "MacRumors, iOS 26.4 and iPadOS 26.4 Public Beta Now Available (February 17, 2026)", url: "https://www.macrumors.com/2026/02/17/ios-26-4-public-beta-1/" },
      { label: "Figma blog, From Claude Code to Figma (February 17, 2026)", url: "https://www.figma.com/blog/introducing-claude-code-to-figma/" },
      { label: "Hugging Face, GGML and llama.cpp join HF (February 20, 2026)", url: "https://huggingface.co/blog/ggml-joins-hf" },
      { label: "Tim Mikov's blog, WebAssembly Comes to Hermes (February 17, 2026)", url: "https://tmikov.blogspot.com/2026/02/webassembly-comes-to-hermes_01829874520.html" },
      { label: "Vercel, We Ralph Wiggumed WebStreams to make them 10x faster (February 18, 2026)", url: "https://vercel.com/blog/we-ralph-wiggumed-webstreams-to-make-them-10x-faster" },
      { label: "GitHub Advisory Database, next-mdx-remote arbitrary code execution, CVE-2026-0969 (February 12, 2026)", url: "https://github.com/advisories/GHSA-g4xw-jxrg-5f6m" },
      { label: "Refactoring, The Era of the Software Factory (February 18, 2026)", url: "https://refactoring.fm/p/the-era-of-the-software-factory" },
      { label: "ByteByteGo, How OpenAI Scaled to 800 Million Users With Postgres (February 16, 2026)", url: "https://blog.bytebytego.com/p/how-openai-scaled-to-800-million" },
      { label: "The Pragmatic Engineer, How Codex is built (February 17, 2026)", url: "https://newsletter.pragmaticengineer.com/p/how-codex-is-built" },
    ],
  },
  {
    slug: "2026-03-02-week-9",
    date: "2026-03-02",
    lang: "en",
    title: "Week 9: Copilot CLI goes GA, React moves to its own foundation, and Anthropic stands firm with the Pentagon",
    summary: "AI, web and mobile news for engineers who ship. February 23 to March 1, 2026.",
    tags: weeklyTags,
    body: `Coding agents reached more GitHub plans and tools this week, React got a new owner, and Anthropic's dispute with the Pentagon became a question for every team that builds on Claude.

## 1. Coding agents spread across GitHub, Figma and the terminal

GitHub made Copilot CLI generally available for all Copilot subscribers on February 25.

- Plan mode plans before writing code. Autopilot mode runs commands without asking each step.
- Prefix a prompt with \`&\` to hand the work to the cloud coding agent.

On February 26, Claude and Codex became available as coding agents for Copilot Business and Pro, after Enterprise and Pro+. No extra subscription is needed, and each session uses one premium request during the preview. You can assign one issue to several agents, and output lands as draft pull requests.

The same day, OpenAI and Figma launched a Codex to Figma integration through the Figma MCP Server: implement designs in code, or turn code UI into editable Figma designs.

My take: assigning one issue to three agents is a cheap benchmark. Pick five real backlog issues and compare the pull requests before you choose a default.

## 2. React and React Native now belong to the React Foundation

On February 24, the React Foundation officially launched under the Linux Foundation. React, React Native and JSX are no longer owned by Meta.

- Eight Platinum founding members: Amazon, Callstack, Expo, Huawei, Meta, Microsoft, Software Mansion and Vercel.
- Seth Webster is executive director. Technical direction stays independent from the board, set by a provisional leadership council.

Lesson: nothing changes in your \`package.json\` today. Watch the governance update, because it will decide how RFCs and releases get approved.

## 3. Anthropic and the Department of War: what it means for Claude users

On February 26, Dario Amodei said Anthropic would not accept two uses in its Department of War contracts: mass domestic surveillance and fully autonomous weapons. On February 27, Secretary Pete Hegseth said he was directing the department to designate Anthropic a supply chain risk. Anthropic said it will challenge any such designation in court.

- Anthropic says individual and commercial customers keep full access through the API, claude.ai and its products.
- For contractors, a formal designation would only affect Claude on Department of War contract work.

My take: if you sell to defense or government buyers, ask legal now which model providers your contracts allow. Everyone else: keep a second provider tested and ready.

## Mobile

- Expo SDK 55 shipped on February 25 with React Native 0.83 and React 19.2. The Legacy Architecture is gone, Hermes v1 is opt-in, and the new template puts code in \`/src/app\`. Expo Go in the stores stays on SDK 54 for a short transition period.
- Android 17 Beta 2 arrived on February 26 with a system EyeDropper API, a privacy-preserving contacts picker and app Bubbles.
- Google introduced Android AppFunctions on February 25: apps expose functions that Gemini and other agents can discover and call on device, with an early preview on the Galaxy S26.
- From February 24, Apple blocks users in Australia, Brazil and Singapore from downloading 18+ apps unless they are confirmed adults.

## Also worth knowing

- Cloudflare released vinext on February 24: one engineer and an AI model rebuilt the Next.js API surface on Vite in about a week, for about $1,100 in tokens. It is experimental. Cloudflare claims builds up to 4x faster and client bundles up to 57% smaller.
- Upcoming Next.js releases will ship version-matched docs so agents get current API context. This Week In React reports about 20% better Next.js Evals success.
- OpenAI and Amazon announced a partnership on February 27: a Stateful Runtime Environment for agents on Amazon Bedrock, expected in the next few months, and a $50 billion Amazon investment.
- Claude Code got Remote Control on February 24: drive a local session from the web or the Claude mobile app while code runs on your machine.

## From my reading list

- This Week In React noted that vinext was only possible because Next.js has a documented API surface and a large test suite. The useful part: specs and tests are now what agents build from, so invest there first.
- Tech World With Milan summarized Software Engineering at Google, including Hyrum's Law: with enough users, every observable behavior becomes a dependency. The fix is the Beyoncé Rule: if you rely on a behavior, put a test on it.
- The Pragmatic Engineer talked to Mitchell Hashimoto, who keeps an agent always busy: "If I'm coding, I want an agent planning. If they're coding, I want to be reviewing." For skeptics, he suggests starting by delegating research, not code.

## What I'm watching

- When Expo Go for SDK 55 reaches the App Store.
- How quickly AppFunctions and WebMCP converge on a shared tool model for agents.
- Whether the supply chain risk designation is formally adopted, and what the courts say.

Which of these changes your plans? Write to me, I read every reply.`,
    sources: [
      { label: "GitHub Changelog, GitHub Copilot CLI is now generally available (February 25, 2026)", url: "https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available" },
      { label: "GitHub Changelog, Claude and Codex now available for Copilot Business & Pro users (February 26, 2026)", url: "https://github.blog/changelog/2026-02-26-claude-and-codex-now-available-for-copilot-business-pro-users" },
      { label: "OpenAI, OpenAI Codex and Figma launch seamless code-to-design experience (February 26, 2026)", url: "https://openai.com/index/figma-partnership/" },
      { label: "React blog, The React Foundation: A New Home for React Hosted by the Linux Foundation (February 24, 2026)", url: "https://react.dev/blog/2026/02/24/the-react-foundation" },
      { label: "Anthropic, Statement from Dario Amodei on our discussions with the Department of War (February 26, 2026)", url: "https://www.anthropic.com/news/statement-department-of-war" },
      { label: "Anthropic, Statement on the comments from Secretary of War Pete Hegseth (February 27, 2026)", url: "https://www.anthropic.com/news/statement-comments-secretary-war" },
      { label: "Expo, Expo SDK 55 changelog (February 25, 2026)", url: "https://expo.dev/changelog/sdk-55" },
      { label: "Android Developers Blog, The Second Beta of Android 17 (February 26, 2026)", url: "https://android-developers.googleblog.com/2026/02/the-second-beta-of-android-17.html" },
      { label: "Android Developers Blog, The Intelligent OS: Making AI agents more helpful for Android apps (February 25, 2026)", url: "https://android-developers.googleblog.com/2026/02/the-intelligent-os-making-ai-agents.html" },
      { label: "Apple Developer News, Age requirements for apps distributed in Brazil, Australia, Singapore, Utah, and Louisiana (February 24, 2026)", url: "https://developer.apple.com/news/?id=f5zj08ey" },
      { label: "OpenAI, OpenAI and Amazon announce strategic partnership (February 27, 2026)", url: "https://openai.com/index/amazon-partnership/" },
      { label: "Simon Willison, Claude Code Remote Control (February 25, 2026)", url: "https://simonwillison.net/2026/Feb/25/claude-code-remote-control/" },
      { label: "Cloudflare Blog, How we rebuilt Next.js with AI in one week (February 24, 2026)", url: "https://blog.cloudflare.com/vinext/" },
      { label: "This Week In React, #270: Next.js, React Router, TanStack, Ink, Async, AI (February 25, 2026)", url: "https://thisweekinreact.com/newsletter/270" },
      { label: "Tech World With Milan, What I learned from the book Software Engineering at Google (February 26, 2026)", url: "https://newsletter.techworld-with-milan.com/p/what-i-learned-at-swe-at-google-book" },
      { label: "The Pragmatic Engineer, Mitchell Hashimoto's new way of writing code (February 25, 2026)", url: "https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto" },
    ],
  },
  {
    slug: "2026-10-22-how-coding-agents-earn-trust",
    date: "2026-10-22",
    lang: "en",
    title: "How coding agents earn trust: verification, feature maps, strict CI",
    summary: "Six talks shared on X agree on one thing: you trust agents once they can check their own work and the codebase makes the wrong path hard.",
    tags: ["ai","agents","verification","ci","x-talks"],
    body: `Most teams using coding agents hit the same wall. The agent writes code fast, but a human still has to read every line, run the app and check that it works. The human is the bottleneck. Several talks shared on X deal with that problem, and they share a common answer. You don't trust an agent because the model got smarter. You trust it because you built an environment where it can prove its work, and where the wrong path is hard to take.

This post pulls together six of those talks. Most of the detail comes from Lauren Tan, a Cursor engineer who describes going from watching a few agents closely to letting agents auto-merge pull requests that she reviews after they land.

## Verification comes first

In a talk shared on X, [Lauren Tan](https://x.com/0xCodez/status/2091980766372639135) is blunt about priorities: "the most important skill that you should have in your toolbox when you work with agents is verification". By verification she means the agent can actually run the code, take CPU traces or heap snapshots, and drive the app. For Cursor's Electron agent window, her skill does this through the Chrome DevTools Protocol.

She frames this as a trust curve. At the start you babysit one to five agents. She says she shipped about a thousand PRs in the month before the talk, and she ties that to the time spent setting up verification. She warns against jumping straight to hundreds of agents, which just burns tokens.

An Anthropic session makes the same point from the Claude Code side. In a workshop shared on X, [a Claude Code founding engineer](https://x.com/0xCodez/status/2089456515975426297) frames his talk around how to stop babysitting agents. His verification loop has clear steps. Let the agent drive the browser, through a browser-control MCP or Playwright. Then make it prove the fix works with before and after screenshots. Then remove the blockers, usually auth and state. The agent needs an identity it can log in with, and some pre-configured data so the app is in a useful state. His main takeaway is that the goal is to get the agent into a loop by giving it the tools and instructions it needs.

He adds a useful trick. Put the verification loop in a skill, and tell the skill to update itself every time the agent hits a blocker. The skill then documents itself over time, and the whole team can add to it.

## Give the agent a map of the app

Running the app is not enough if the agent can't find anything in it. Tan describes her first version of the control skill. The agent could start a dev build and take traces, but it had no idea how to reach a given feature in the UI. It just kept churning.

Her fix was a file she calls a feature map. In a later talk shared on X, [Tan](https://x.com/0xCodez/status/2102060423067341244) says it was inspired by a sitemap and calls it a form of stored memory of how the app works. It records which features exist, how a user reaches each one, the keyboard shortcuts and the DOM elements to click. With that, an agent can act on a vague bug report instead of guessing.

The same talk describes the second half of the verification skill: a CLI bundled with it. The goal is that agents run the app and collect traces the same way every time, so the evidence is reproducible. In an interview shared on X, [Tan](https://x.com/0xCodez/status/2107155830093078557) explains the reasoning. Some work needs judgment and some is mechanical. Put the deterministic parts into a script or CLI, and leave only the judgment to the agent.

## Test your skills like code

Skills drift, so Tan tests them. Her eval playbook works like this. A coordinator agent writes a rubric for what the skill should do. It spawns sub-agents in directories named so they can't tell they are being evaluated, because agents can tell when they are being tested and change their behavior. A judge agent on a different model cross-checks the scores so one model's bias doesn't decide the result. Then she uses \`/loop\` in Cursor to keep iterating until everything scores 10 out of 10.

An Anthropic engineer explains why the judge should be separate. In a talk shared on X on async agents, [the speaker](https://x.com/0xMovez/status/2079985963862786352) says that when the same context both does the work and grades it, you get confabulation and odd behavior. Their fix is to move verification into its own context window. A verifier holds a goal or rubric, checks the build agent's output, and the loop continues until verification passes. The speaker names the primitives: goal in Claude Code and outcomes in Managed Agents. Both set a measurable end state and use an independent context to grade it.

## Make the wrong path impossible

Verification checks one change. Constraints protect the whole codebase. Tan ranks enforcement in layers. At the top, the architecture makes a mistake impossible. Next come static analysis, lint rules and CI checks that turn the build red. Below that are softer tools: rules, BugBot reviews, skills and style guides. She uses all of them but won't rely on the soft ones alone, because agents can forget them or apply them unevenly.

For the Grokbot Electron app she built a framework called Dune, which she describes as a kind of Next.js for Electron apps, designed for agents to write. CI is strict:

- \`useEffect\` is banned, since she calls it one of React's biggest footguns.
- Code comments are banned. She says agents mostly write comments about irrelevant history, and that a single workaround comment gets copied by agents until it spreads across the codebase.
- There are \`electron main\` and \`electron renderer\` directories, and a CI step checks the dependency graph so code doesn't leak across. A frame has to render in 16 milliseconds for 60 FPS, and heavy work pulled into the renderer causes jank.
- Each feature lives in one directory, so an agent working on onboarding only has to look in one place.

The principle behind all of it: "the shortest path is the best path". Agents take shortcuts, so make the shortcut correct. She treats every repeated human review comment as a code smell. Instead of commenting on the PR again, ask how to turn it into a lint rule, a CI failure or a structural change. When you find tech debt, her advice is to write a lint rule first to stop the bleeding, then clean up.

## Rules should come from failures

In a talk shared on X, [Eric, a Cursor engineer](https://x.com/0xCodez/status/2093356075672064297), lands in the same place from a different direction. He splits factory work into codebase patterns, guardrails such as hooks, rules and tests, and enablers such as skills, MCPs and runnable environments. He argues against installing rules in bulk from shared directories: "if you're finding agents going off the rails you should probably create a rule for that". He also shows agents writing Playwright end-to-end tests to check their own work, and cloud agents returning videos of themselves testing the UI.

## Review moves to sampling

Once the environment holds, review changes shape. Tan says she now reviews pull requests after they land. Her full autopilot mode spawns verifier agents for each PR that click around the running app looking for regressions. She compares the human role to a quality supervisor who samples output rather than inspecting every item. When a mistake repeats, the fix goes into the environment, not into the single PR. In her words, the new job of the engineer is to spend time on the environment.

## What to try this week

- Write a short verification skill for one app: how to start it, log in, seed state and capture proof such as screenshots or traces.
- Add a feature map for your main UI flows, with routes, shortcuts and stable selectors.
- Move the mechanical steps of that skill into a script so runs are repeatable.
- Have a separate agent or model grade the result against a written rubric.
- Pick the review comment you leave most often and turn it into a lint rule or CI check.
- Add one import-boundary check between layers that must not depend on each other.
- Delete or rewrite one workaround in the codebase before agents copy it further.`,
    sources: [
      { label: "Lauren Tan, climbing the agent-trust curve to auto-merged PRs", url: "https://x.com/0xCodez/status/2091980766372639135" },
      { label: "Lauren Tan, trust ladder and verification skills (interview)", url: "https://x.com/0xCodez/status/2107155830093078557" },
      { label: "Lauren Tan, building a \"Michelin kitchen\" of trusted agents", url: "https://x.com/0xCodez/status/2102060423067341244" },
      { label: "Anthropic sessions, verification loops and how to stop babysitting agents", url: "https://x.com/0xCodez/status/2089456515975426297" },
      { label: "Anthropic engineer on async agents and verifier loops", url: "https://x.com/0xMovez/status/2079985963862786352" },
      { label: "Eric (Cursor), building a software factory with autonomous agents", url: "https://x.com/0xCodez/status/2093356075672064297" },
    ],
  },
  {
    slug: "2026-10-22-software-factory-harness-gates",
    date: "2026-10-22",
    lang: "en",
    title: "The software factory: harnesses, gates and agent PR pipelines",
    summary: "Seven talks shared on X on building systems that drive coding agents: hard gates at the end, rules from failures, and evidence-backed PRs.",
    tags: ["ai","agents","ci-cd","code-review","x-talks"],
    body: `Most teams using coding agents still pair-program with them. One human, one agent, one chat. Several recent talks shared on X describe a different setup: you write the system that drives the agents, and the agents write the code. The speakers call it a software factory. The work that goes into it is harness engineering.

This post covers seven of them, focused on gates, rules and what an agent PR should carry.

## From the line to the factory

In a talk shared on X, [Chris, an engineering leader now building Cosmos at Augment](https://x.com/0xMovez/status/2092686594268643575), puts the shift in one line: "I'm building the factory system I'm not working on the factory line". He adds that you still need a mental model of the outcome.

[Tariq from the Claude Code team at Anthropic](https://x.com/0xMovez/status/2097364630897086631) calls the same idea loop engineering: "instead of prompting Claude directly you're setting up a system that prompts Claude". His example is around ten loops that triage feedback and implement changes.

On a panel with [Steve, creator of Gastown and Beads, and a host from Tessl](https://x.com/0xMovez/status/2091973661381054875), Steve describes the factory as the point where work becomes a first-class thing. You spend tokens to generate work, swarm agents to fix it, swarm them to review it, then start again.

## Put deterministic checks at the end, not in the middle

The most useful lesson from the Tessl side of that panel is about orchestration. They started very deterministic. The agent built something, the harness opened the PR, and review comments were ferried back to the agent. They pulled most of that out.

The reason: every piece of deterministic orchestration became a source of brittleness. They would assume a flow held for every feature, then find that about 15% of features did not follow it. Stacked PRs were one case their orchestrator had made impossible.

What they kept is a set of hard checks at the end. The agent gets the GitHub CLI and instructions. Hooks and CI do the gating:

- When the agent tries to \`git commit\` or \`git push\`, run the unit tests and linter. If they fail, block the tool call and tell the agent to fix them.
- When the agent tries to end its session, check that all work is committed and a PR is up. If not, it cannot stop.
- In CI, check that certain skills were loaded before the agent finishes.

[Eric from Cursor](https://x.com/0xCodez/status/2093356075672064297) groups factory ingredients into three buckets. Primitives and patterns: a modular, co-located codebase with start scripts and test boilerplate the agent can copy. Guardrails: rules, checks and hooks. His hook example is blocking changes to the most sensitive areas, like encryption or authentication. Enablers: skills, MCP servers and an environment the agent can run without a human.

[Chris at Augment](https://x.com/0xMovez/status/2092686594268643575) gives the reason for checkpoints. Agents are non-deterministic. Chain enough steps without verification and you can end up making a U-turn. He designs his systems so each task ends with verification before hand-off to the next agent.

## Grow rules from failures

Eric's advice on rules is direct: "if you're finding agents going off the rails you should probably create a rule for that". He argues rules should emerge from observed failures, not be installed in bulk from shared rule lists. His example: Cursor avoids foreign keys in database migrations for performance reasons, but models keep adding them. So their review bot flags foreign keys on the PR.

The Tessl speaker goes further on linting. Since agents write the code, it is fine to spend 50 lines on a lint rule that a team would never have bothered with before. His case was a side project where the agent inverted the architecture between the harness and the Anthropic client module. The fix was a lint rule saying one module must never import from the other. Tessl also uses what they call verifiers: narrow, LLM-powered checks on a specific file, such as requiring ARIA attributes on every JSX element.

Rules also need pruning. The same speaker warns that piles of prohibitions will accumulate forever unless you keep evals that tell you whether each rule is still needed when the next model ships. He suggests a regular sweep to re-evaluate every rule.

## Fix the harness before you comment on the PR

Tessl has a review rule worth copying. Before leaving any comment on an agent's PR, a reviewer must rewind at least once and change the system: update skills in the codebase, add unit tests or change the architecture. Then re-run. Only if the agent still does not get it right on the second try do you start commenting.

Eric describes a related loop at Cursor. An automation learns from review comments on merged PRs, on the basis that a human comment carries high signal. Cursor also built an agentic code owner. Their code owners were right about 80% of the time, but the other 20% blocked merges, sometimes across time zones. The agent checks a PR's risk. Renaming a variable is low risk and can be approved. Changing something like trial length is high risk, so it pulls in people who changed that code before.

## Tests that prove behavior

The Tessl speaker says coverage alone can be theater. His setup: require near 100% coverage within the PR diff, and run mutation testing on every PR. An agent reads the mutation report and comments on anything the tests missed. You can run it on the diff or across the whole codebase. He says it almost always leads to better tests.

The panel also runs daily or weekly sweeps outside any diff: architecture duplication, test quality, docs. Something always slips through review.

Tariq argues for roughly a hundred times more testing code than before: fixtures pulled from production, mock databases, storybooks for front end. When a PR is submitted to Claude Code, he says, a recording of the feature being used and tested comes back.

## What an agent PR should carry

Several speakers converge on the idea that the PR is evidence, not just a diff.

- [Katia Gil-Guzman from OpenAI's developer experience team](https://x.com/0xMovez/status/2087563129437790518) suggests encoding judgment in the repo with \`AGENTS.md\` plus repo-level skills, and asking Codex to add screenshots to the PR for every UI change. She also mentions Symphony, an open spec OpenAI published where agents pick up tickets from a tracker like Linear and open PRs.
- Eric shows Cursor cloud agents, each in its own VM, returning a video of themselves testing the UI. At Cursor, every new Linear ticket spawns a cloud agent.
- Tariq attaches an artifact of every prompt he sent, including failed approaches, so the reviewer can see what was considered.

In a talk shared on X, a speaker the post describes as [Head of Google Cloud AI](https://x.com/0xMovez/status/2072687996151734680) explains why this matters. Citing Sonar research, the speaker says 96% of developers do not fully trust AI code, yet only about half always verify it before committing. The answer is to make verification cheaper and harder to skip. Agents return evidence. Humans own the verdict, with an operating rule that if you cannot explain it, you do not ship it.

## Earn autonomy before you grant it

[Cat Wu, product lead for Claude Code and Cowork](https://x.com/0xMovez/status/2078899537641644438), sets the bar for unattended runs. A new automation might fail 30% of the time at first. You read the errors and fix the prompt or harness. Only when it reaches 100% do you let it run on its own.

Chris describes where this leads: a production exception opens a ticket, an agent fixes it, another reviews it, it goes to a canary, and it rolls out fully if monitors stay green.

## What to try this week

- Add a pre-commit or pre-push hook for your agent that runs tests and lint and blocks the action on failure.
- Add a stop check: no session ends without committed work and an open PR.
- Write one pedantic lint rule for an architectural boundary agents keep crossing.
- Next time you want to comment on an agent PR, first change a skill, rule or test and re-run once.
- Try mutation testing on one PR diff and have an agent summarize what survived.
- Require screenshots or a recording on agent PRs that touch UI.
- List your current agent rules and mark which ones you could test with an eval.`,
    sources: [
      { label: "Steve (Gastown, Beads) and Tessl on software factories and harness engineering", url: "https://x.com/0xMovez/status/2091973661381054875" },
      { label: "Eric (Cursor) on building a software factory with autonomous agents", url: "https://x.com/0xCodez/status/2093356075672064297" },
      { label: "Chris (Augment) on building the software factory", url: "https://x.com/0xMovez/status/2092686594268643575" },
      { label: "Katia Gil-Guzman (OpenAI DevEx) on Codex and harness engineering", url: "https://x.com/0xMovez/status/2087563129437790518" },
      { label: "Tariq (Anthropic, Claude Code) on loop engineering and verification", url: "https://x.com/0xMovez/status/2097364630897086631" },
      { label: "Cat Wu (Anthropic) on automation and auto mode", url: "https://x.com/0xMovez/status/2078899537641644438" },
      { label: "Engineers own the verdict (Google Cloud AI speaker)", url: "https://x.com/0xMovez/status/2072687996151734680" },
    ],
  },
  {
    slug: "2026-10-22-where-coding-agent-tokens-go",
    date: "2026-10-22",
    lang: "en",
    title: "Where your coding-agent tokens go: context and prompt caching",
    summary: "Five talks shared on X explain how coding agents spend tokens, why the prompt cache matters most, and which habits keep context small.",
    tags: ["ai","agents","context-engineering","prompt-caching","x-talks"],
    body: `Most engineers treat a coding agent's bill as a black box. Several talks shared on X this year open that box. They come from Anthropic, Cursor, OpenAI and the agent-framework world, and they agree on the mechanics. This article pulls the practical parts together.

## Every turn resends everything

In a talk shared on X, Santi from Cursor put the core fact plainly: "models have amnesia what I mean by that is that they don't remember what you just said in the previous turn". The harness feeds the whole context back in on every turn.

In an [Anthropic webinar on Claude Code](https://x.com/0xCodez/status/2098782845183410287) shared on X, an Anthropic team member walks through what that context contains. A one-line request to fix a failing test carries the system prompt, the built-in tool definitions, your environment and git state, your CLAUDE.md, and a name and description for each skill and MCP server. Your message sits at the end. The model asks to read a file, the harness runs the tool, the result is appended. Each round trip makes the context longer, and every later request carries all of it.

Santi added in the [Cursor workshop](https://x.com/0xMovez/status/2093063618149433655) that agent actions such as grep do not cost tokens. You pay for what goes into and out of the model.

## Three prices, one lever

The webinar splits tokens into input, output and cached input. Input is processed in one parallel pass, so it is relatively cheap. Output is the most expensive, because the model generates one token at a time with a full pass over the context for each. Cached input is the cheapest.

Caching works on the prefix. Each request repeats everything before it and adds a bit at the end. The server keeps the state it built for the identical front part and only computes from where the new request differs. In a healthy session most input should be cache reads. You can check that share with \`/usage\`.

In another talk shared on X, [Brad Abrams](https://x.com/0xMovez/status/2085403190648819737), a product manager on Anthropic's API team, called prompt caching the most important cost knob: a 90% discount on cached input, with the best customers reaching hit rates in the 90s. For your own API calls, his advice is to first remove what you do not need, then put stable content at the top and dynamic content at the bottom. He also said the 50% batch discount stacks with caching.

## What breaks the cache

The prefix must match from the very first token. Change one token near the front and everything after it is processed at full price. The webinar lists the common causes in Claude Code:

- \`/compact\` and \`/clear\` replace the prefix. That is expected, and after a compact the new prefix is a short summary.
- Switching model mid-session. The cache is that model's internal state, so a new model rereads the whole conversation.
- Changing effort level, on most models. The webinar names Fable 5.1 as the exception.
- Waiting too long. The cache lasts about an hour on subscription plans and about five minutes on API billing, cloud providers and sub-agents. A one-hour TTL can be configured, but those writes cost more.

Editing files or changing permission mode does not touch the request. CLAUDE.md is read once at session start, so edits apply in the next session or after a clear. Santi described the same behaviour in Cursor: changing a rule mid-session busts the cache, and switching model provider means a new cache on the other provider's side.

The advice follows. Pick model and effort at the start of a session or right after a clear. If you must switch models mid-task, compact first so the new model reads a summary. Compact before you step away, while the cache is warm, because compacting rereads the full conversation. Resuming an old session after the cache expired means one full-price read of everything.

## Keep the context small

Cached tokens are cheap, not free. The webinar showed three tasks run two ways. With a clear between tasks, each started small. In one long session, each task carried the previous ones, and that session used twice the tokens.

In a [talk on context engineering](https://x.com/0xMovez/status/2081737537412809077), Lance offered a definition: "Context engineering is just the art and science of filling the context window with just right information at each step of the agent trajectory." He groups harness techniques into offload, reduce and isolate.

Offload what does not apply to every task. The webinar's rule is that CLAUDE.md should hold only what serves every task, because it is sent on every prompt. Instructions for something like database migrations belong in a skill, where only the name and description load by default. Lance described the same progressive disclosure: the skill header sits in the system prompt, and the agent reads the full file with bash when needed. Santi gave the Cursor version: always-on rules load in full every turn, so keep them short. Both suggest turning off MCP servers you are not using. Lance also cited research showing tool selection degrading after around 30 tools and failing at around 100.

Reduce tool output. Claude Code already writes very large command output to a file, but smaller output stays in the conversation. A test runner printing a line for each of 400 passing tests puts all 400 lines into every later request. The webinar's fix is to write the exact quiet commands you run all day into CLAUDE.md, such as a single-file vitest run with the dot reporter. Lance described Manus doing this inside the harness: old tool results are saved to files and replaced with a reference, which is reversible. Summarisation comes later and loses information.

Santi said Cursor compacts at around 90% of the window. It keeps the prefix and your latest ask and summarises the middle. He warned that compacting over and over leaves a blurry conversation. An [OpenAI Codex engineer](https://x.com/0xMovez/status/2086481283404710047) said Codex's compaction can compress context by up to 100 times.

Isolate noisy work. The webinar recommends sub-agents for reading a long log or a whole repo when you only need the conclusion. A sub-agent has its own tokens and its own five-minute cache, so that job can cost a bit more. The gain is that the main conversation stays small, so every later turn is cheaper.

## Say what you want

The webinar notes that @-mentioning a file puts its contents in before the first request, so the first read round trip never happens. Santi compared a vague prompt asking the agent to fix error handling in production with a specific one that @-mentioned the file and named the error. The vague one cost 10 to 12 times more on the same model. He also suggests pasting only the log lines that matter and moving from ask mode to plan mode to build for unfamiliar work. Failed attempts and corrections stay in context and ride along on every turn.

## Model and effort multiply everything

The webinar's summary: "And the model is a multiplier of all of this." A larger model costs more per token, in and out, so it scales every other number here. Higher effort means more output tokens, which become input on later turns. The webinar's test when a result misses: if the model did not know enough, try a stronger model; if it skipped a file or stopped halfway, raise the effort. Brad Abrams likewise suggests adjusting effort before switching models.

## What to try this week

- Start a fresh session, run \`/context\`, and see what loads before you type.
- Check the cache share in \`/usage\` after a normal working session.
- Cut CLAUDE.md or always-on rules to what applies to every task. Move the rest into skills.
- Add your most common test commands to CLAUDE.md, with quiet reporters.
- Disable MCP servers you did not use today.
- Choose model and effort at session start and leave them alone.
- Clear between unrelated tasks, and compact before a break, not after.
- Send log digging and repo-wide searches to a sub-agent.
- In your own API calls, put stable content first and dynamic content last, then measure the hit rate.`,
    sources: [
      { label: "Anthropic webinar on how Claude Code spends tokens", url: "https://x.com/0xCodez/status/2098782845183410287" },
      { label: "Santi (Cursor) workshop on token optimisation and model selection", url: "https://x.com/0xMovez/status/2093063618149433655" },
      { label: "Lance on context engineering for agents", url: "https://x.com/0xMovez/status/2081737537412809077" },
      { label: "Brad Abrams (Anthropic) on using Claude Fable 5 cost-effectively", url: "https://x.com/0xMovez/status/2085403190648819737" },
      { label: "OpenAI Codex engineer on how Codex works", url: "https://x.com/0xMovez/status/2086481283404710047" },
    ],
  },
  {
    slug: "2026-10-22-long-running-agents-memory",
    date: "2026-10-22",
    lang: "en",
    title: "Long-running agents: session logs, memory and the environment",
    summary: "Seven talks on keeping agents useful across hours and sessions: append-only logs, files as memory, memory hygiene and codebases agents copy.",
    tags: ["ai","agents","architecture","memory","x-talks"],
    body: `An agent that works for ten minutes can keep everything in its context window. An agent that works for hours, or across dozens of sessions, cannot. Something has to hold state outside the model. Several talks shared on X ask where that state should live and who may change it.

The short version: keep a durable log, put working memory in plain files, use the repo and its tests as the handoff between sessions, and clean memory up in a separate process.

## Forgetting can be a feature

In a talk shared on X, Anthropic's [Alex and Nadine](https://x.com/0xCodez/status/2084648444195459258) describe a coding agent that builds an app across many sessions, each starting with no memory. Their framing: "If we solve for this memory externally rather than through the model then forgetting becomes a feature not a bug." A fresh session does not carry bad habits or wrong assumptions forward.

The memory lives in the environment instead:

- A feature list the agent derives from the spec, stored as JSON rather than markdown. They say the agent is more likely to edit a markdown file, and they do not want it rewriting the spec. It should only mark tests as passing.
- A standards file that is read-only to the agent. The human owns style and architecture decisions.
- A progress file, read at the start of every session, together with git commits, so a new session knows where the last one stopped.
- An \`init.sh\` script for the deterministic parts, such as starting the dev server.

Each session follows one loop. Read the environment and history. Run the test suite to check nothing from earlier sessions has regressed. Pick the next feature. Build it. Test it end to end with browser automation. Commit and write a progress note.

The loop came from failures. Their first agent tried to build everything at once. Context ran out mid-feature, and the model sometimes declared victory too early and gamed its own success criteria. They had to tell it explicitly that removing or editing tests to make them pass was unacceptable. Working on one feature at a time fixed the context problem. They also cap sessions at one hour and have the agent commit before the session ends, even if the work is unfinished, and leave the environment in a clean state with no errors in the browser logs.

Limits they name: the model can miss visual bugs, Puppeteer or Playwright often can't see native alerts, and human review is still needed.

## The session log as the source of truth

Two Anthropic talks describe the same architecture from the infrastructure side. In a talk shared on X, an [Anthropic engineer](https://x.com/0xMovez/status/2079985963862786352) explains that the harness becomes a stateless process, the session is an append-only event log, and the "hands" are just containers. If the harness or the sandbox dies, nothing is lost, because the session is always backed up in the log. Credentials are never added to the sandbox. They live in a separate vault.

The point for memory is that compaction stops being destructive. A typical compaction step picks what to keep and discards the rest. With an append-only log, the model can always go back.

In a workshop shared on X, Anthropic's [Priyanka and Gabe](https://x.com/0xCodez/status/2109653301021069686) explain why they got there. Their first version put the session log, harness and sandbox in one container. It became a "pet" in the old pets-versus-cattle sense: hard to debug and costly to lose. Splitting it into an append-only session log, an interchangeable harness and on-demand sandboxes made each piece replaceable. Because every event is kept, they can change their compaction strategy without changing the event stream. They have seen ten-hour sessions in production.

Their summary line: "harnesses encode assumptions And assumptions can go stale". Their example is a context-reset workaround needed for Sonnet 4.5 that Opus 4.5 no longer needed. The durable log is the part that should outlast those changes.

## Files as working memory

In a talk shared on X, [Lance from LangChain](https://x.com/0xMovez/status/2081737537412809077) groups context techniques into offload, reduce and isolate. Offloading means moving context to something external, usually a file system, so the agent can save and recall information during long tasks and pull it back only when needed. He notes that Claude Code summarizes when the session reaches around 95% of the context window. He also points out a useful distinction: if raw tool results are already written to files, compacting them is reversible, while summarization always loses information.

## Memory needs hygiene

In a talk shared on X, [Lamis from Anthropic's applied AI team](https://x.com/0xMovez/status/2083911405976076311) describes memory as markdown files that agents search with ordinary tools like bash and grep. Her guiding principle is to do the simple thing that works. Running this across many agents needs a few production rules:

- Versioning, so you can track which agent and context produced an update and roll back a bad one.
- Concurrency control. The agent takes a hash before drafting an edit and again before writing. If they differ, someone else wrote in the meantime, so it re-pulls the memory and drafts again.
- Permissions. Organization-wide memory should probably be read-only for agents, while each agent's scratch pad is writable. One bad write to shared context would reach every agent.
- Portability, through a clean API, so more than one system can use the memory.

She also names the limits of agents writing memory during a task. Memory work competes with the task itself, a single session can't see patterns across sessions, and memories go stale. Anthropic's answer is "dreaming": a batch process with its own resources that reviews past transcripts and the memory store, then proposes changes. In their design it attaches example transcripts and stats on how common the pattern is, so a person can decide whether to accept each change.

The async-agents talk gives a concrete case. Claude wrote an incorrect memory while playing Pokemon, mislocalized itself and fell through a trap door. The engineer saw this in five replicates with the raw memory store. After dreaming, the error was corrected.

## The codebase is memory too

In a talk shared on X, [Lauren Tan](https://x.com/0xCodez/status/2102060423067341244) pushes the idea further: "The code base is really like the best form of memory because agents love to extend existing patterns that they see." That cuts both ways. One workaround, or a comment explaining a workaround, can be copied by agents until it spreads across the codebase within days or weeks. Her framework bans code comments for that reason.

Her order of fixes when an agent keeps making a mistake: make the mistake impossible in the codebase, then enforce it with static analysis and CI, then add guidance through rules, review bots and skills, and only then rely on a style guide. When she spots tech debt, she writes a lint rule first to stop it spreading, and cleans up later. She also keeps a "feature map" inside a verification skill: a stored description of what the app does and how a user reaches each feature, so agents don't guess from a vague bug report.

## Shared memory between runs

The [Cursor Automations webinar](https://x.com/0xCodez/status/2099523119161528649) shows a small, practical use. Automations have a memory tool that writes to a file system later runs can read. A Cursor engineer describes using it as a lock: when CI breaks and 20 agents start, prompt each one to write a memory file while it works on the problem and to abort early if the file already exists.

## What to try this week

- Log every agent event to an append-only store before you compact anything. Build summaries on top of it, not in place of it.
- Write a progress file and commit at the end of every agent session, even unfinished ones, and have each new session read them first.
- Put the spec's feature list in JSON and let the agent change only a status field. Keep your standards file read-only.
- Start each session by running the full test suite, and forbid edits to tests in the instructions.
- Store agent memory as markdown files. Add a content hash check before writes and keep shared files read-only.
- Schedule a separate job that reviews recent transcripts against memory and proposes edits for a human to approve.
- When an agent repeats a mistake, try a lint rule before another prompt line.`,
    sources: [
      { label: "Alex and Nadine (Anthropic) - long-horizon coding agents with the environment as memory", url: "https://x.com/0xCodez/status/2084648444195459258" },
      { label: "Anthropic engineer - async agents, Managed Agents architecture and dreaming", url: "https://x.com/0xMovez/status/2079985963862786352" },
      { label: "Priyanka and Gabe (Anthropic) - Claude Managed Agents architecture workshop", url: "https://x.com/0xCodez/status/2109653301021069686" },
      { label: "Lamis (Anthropic) - agent memory in production", url: "https://x.com/0xMovez/status/2083911405976076311" },
      { label: "Lauren Tan - building a kitchen of trusted agents", url: "https://x.com/0xCodez/status/2102060423067341244" },
      { label: "Lance (LangChain) - context engineering for agents", url: "https://x.com/0xMovez/status/2081737537412809077" },
      { label: "Cursor team - Automations webinar", url: "https://x.com/0xCodez/status/2099523119161528649" },
    ],
  },
  {
    slug: "2026-10-22-mcp-beyond-tools",
    date: "2026-10-22",
    lang: "en",
    title: "MCP beyond tools: prompts, resources, sampling, roots and transports",
    summary: "Most MCP servers only expose tools. Talks shared on X walk through the other primitives, the transports, and how teams plug MCP into coding agents.",
    tags: ["ai","agents","mcp","developer-tools","x-talks"],
    body: `Ask a team what their MCP server does and the answer is almost always a list of tools. That is the part of the protocol everyone uses. Two talks from people who co-created MCP argue that it is also the part that leaves the most value on the table. This post collects what they said about the other primitives and the transports, then looks at how teams actually wire MCP servers into coding agents.

One caveat: the protocol talks describe plans as they stood at the time. Check the current spec before you build on them.

## What MCP is, and what it is not

In a talk shared on X, [David, a co-creator of the Model Context Protocol](https://x.com/0xCodez/status/2088263101158146337), starts with a correction. MCP is a protocol between AI applications and context providers. It is not a protocol between models.

He describes the design as borrowed from LSP. Before language servers, every editor built its own integration for every language. MCP aims at the same M×N problem: build one good integration and use it in many clients. The protocol is released under the MIT license.

## Three primitives, three owners

The spec defines three basic primitives. Almost everyone ships only one. In a talk shared on X, a [member of technical staff at Anthropic and MCP co-creator](https://x.com/0xCodez/status/2088713006095994930) explains the rule that separates them. He calls it the interaction model and says it is buried deep in the specification:

- Prompts are user-driven. They usually show up as slash commands or @ commands.
- Resources are application-driven. The client decides what to do with them.
- Tools are model-driven. The model decides when to call them.

Prompts are more than saved text. Under the hood they are code. His example is a prompt that pulls the review comments from a GitHub pull request, so he can drop them into context and ask the model to fix the code. Prompt arguments can be autocompleted. In his demo the autocomplete lists his own open pull requests.

Resources are raw data that the server exposes and the client is free to use however it wants. The demo exposes Postgres database schemas as resources, which Claude Desktop can attach like files. He says resources were also intended as an input primitive for retrieval augmented generation. David makes the same point: he wants people to use resources as a way to abstract RAG pipeline inputs.

If your server has a "how to use this well" workflow, ship it as a prompt. Ship reference data as a resource.

## Sampling: borrow the client's model

Sampling is the feature both speakers push hardest. David says it plainly: "I Wish People Would Experiment More With Something Called Sampling".

The problem it solves is simple. Say your server summarizes a discussion from an issue tracker. Summarizing needs a model. Without sampling, the server bundles its own SDK and asks the user for an API key, possibly for a vendor the user does not use. With sampling, the server asks the client for a completion, and the client runs it with whatever model the user already has. The MCP 201 speaker stresses that the client keeps full control over security and privacy. He also admits the name is confusing: "Naming was certainly not my strength in the protocol".

David goes further. A program can be an MCP server upward and an MCP client downward. Chain several of these, and because sampling requests are passed up the chain, the user at the top still controls the whole inference stack. The graph stays model-agnostic, so you can swap the model and run evals against different ones.

Both speakers note that client support for sampling was limited when they spoke. Check your client before you depend on it.

## Roots: tell the server where to work

Roots let the client tell the server which workspaces or URIs it should care about. The 201 speaker's example is a git server: the editor knows which repository is open, so it passes that path as a root and the server operates there. A root can be any URI, not just a local folder, so it can also restrict a server to part of a remote system. David says VS Code was one of the first clients to support roots, besides Claude Code.

The 201 talk ends with a chat server that combines all of this: a "summarize this discussion" prompt, threads as resources, search tools, and sampling for the summary. The same data can be exposed in more than one way.

## Transports: stdio, remote, and streamable HTTP

David describes two ways to run a server. Local servers work like language servers: the client starts a process and talks to it over standard in and standard out. His example is a server for a local Postgres database in Docker, which any MCP client can then query. Remote servers run over HTTP and are hosted by the SaaS provider, so you connect to a URL and authorize with your account instead of running a third-party process.

The 201 speaker explains why remote matters. You may not want to download a random third-party payments server and hand it your card details. A hosted server from the provider, plus OAuth, fixes that. For enterprises he describes a pattern where users sign in once with SSO through a central identity provider such as Okta or Azure AD. The MCP server then uses token exchange to get a token for the backend.

Streamable HTTP addresses the scaling complaint about the original transport. A server can just take a request and return a result, which looks close to REST and can run in something like a Lambda function. When it needs more, such as notifications or a sampling request, it can open an SSE stream.

Stated roadmap items at the time: async tasks for long-running work, elicitation (asking the user for confirmation or input), an official registry API, streaming of large tool results, and namespacing so tools with the same name do not collide.

## Wiring MCP into coding agents

The other talks show where MCP sits in day-to-day agent work.

In a workshop shared on X, [two Claude Code presenters](https://x.com/0xMovez/status/2087943913319375142) describe MCP as an adapter pattern for external systems. Each tool on a server can be set to run without asking, ask for confirmation, or be blocked. They flag two costs. A large MCP tool catalog is often the second biggest consumer of context after CLAUDE.md, while skills load only their frontmatter until triggered. And third-party MCP servers deserve the same scrutiny as npm modules: check where they come from and what runs inside them.

In a demo shared on X, a [Cursor team member](https://x.com/0xCodez/status/2098097766505341360) shows cloud agents using MCP servers. Asked only to implement a ticket by its key, the agent recognized it as a Jira ticket, pulled the details through an Atlassian MCP server, made a plan, and explored the code with sub-agents. The presenter also mentions Datadog for performance issues, Linear, tldraw and Excalidraw for diagrams, and a meeting-notes server for turning notes into action items. On setup: "any MCP server that you have locally you should be able to add".

In a talk shared on X, Anthropic engineers [Gagan and Isabella](https://x.com/0xCodez/status/2087225499387142559) build an SRE investigator on Claude Managed Agents. An MCP toolset connects to a dashboard to pull deploys and metrics. The environment limits network access so the only allowed host is that MCP server. Credentials sit in vaults and are decrypted only at tool execution time, so the model never sees the tokens. For servers inside a private network, they describe MCP tunnels, built for teams that wanted to expose MCP servers to their agent without opening them up.

## What to try this week

- List the tools on one MCP server you own. Move any "how to use this" workflow into a prompt with autocompleted arguments.
- Expose reference data such as schemas as resources instead of tools.
- Check whether your client supports sampling and roots. If it does, try one server that uses each.
- Audit third-party servers like dependencies: source, maintainer, and per-tool permissions.
- Turn off servers an agent does not need and restrict network access to the ones it does.
- Keep credentials out of the agent's sandbox and inject them at call time.`,
    sources: [
      { label: "MCP co-creator (Anthropic), MCP 201 on prompts, resources, sampling, roots and streamable HTTP", url: "https://x.com/0xCodez/status/2088713006095994930" },
      { label: "David, MCP co-creator, on what MCP is, underused primitives and the roadmap", url: "https://x.com/0xCodez/status/2088263101158146337" },
      { label: "Claude Code fundamentals workshop (CLAUDE.md, skills, hooks, MCP, subagents)", url: "https://x.com/0xMovez/status/2087943913319375142" },
      { label: "Cursor cloud agents demo (remote VMs, sub-agents, MCP servers)", url: "https://x.com/0xCodez/status/2098097766505341360" },
      { label: "Gagan and Isabella (Anthropic), from Messages API to Claude Managed Agents", url: "https://x.com/0xCodez/status/2087225499387142559" },
    ],
  },
  {
    slug: "2026-10-22-agents-that-run-on-their-own",
    date: "2026-10-22",
    lang: "en",
    title: "Agents that run on their own: goals, loops, routines and triggers",
    summary: "Five talks shared on X on agents that start without you: /goal, /loop, scheduled routines and event-triggered automations, and how to keep them bounded.",
    tags: ["ai","agents","automation","developer-tools","x-talks"],
    body: `Most agent work still starts with you typing a prompt and pressing enter. The tools have moved past that. Claude Code has \`/goal\`, \`/loop\`, \`/schedule\` and routines. Codex has scheduled automations and \`/goal\`. Cursor has Automations that fire on events. This article sorts talks shared on X on these features by one question: what starts the agent, and what stops it.

## Every loop needs three decisions

In a talk shared on X, [Mark from Anthropic](https://x.com/0xMovez/status/2082097290177626563), who works with customers, gives a simple frame. Every loop has a trigger, a limit for when it stalls, and a definition of done. Even a normal prompt is a loop. If you set no finish criteria, you let Claude decide when it is done.

He sorts loops into four kinds:

- Turn-based: an ordinary prompt. You make it shorter with skills that encode what you learned last time.
- Goal-based: \`/goal\` runs until a check passes or a turn cap is hit.
- Time-based: \`/loop\` re-runs a prompt on an interval.
- Proactive: an event or schedule starts the agent, and you do not need to be there.

## Goals need a yes or no check

\`/goal\` works best when done is verifiable. Mark's examples: tests pass, or a tweet is under 250 characters. A goal to build a beautiful design deck runs until Claude thinks it is done. A deck of at least 10 slides that covers five named design principles gives criteria that are each yes or no, so outputs get more consistent.

For work that is hard to measure, he suggests listing what must be true. A report is not checkable, but a rule that every citation links to a real page that supports it is.

His firm advice is to always set an upper bound. In his demo, a goal to get auth tests green had a cap of five turns. Without a cap, a vague goal can run away with your token budget.

In a talk shared on X, [Katia Gil-Guzman from OpenAI's developer experience team](https://x.com/0xMovez/status/2087563129437790518) describes the same pattern in Codex. You give the outcome, the evaluation criteria and the constraints. She says colleagues have run goals for days on complex migrations. She asked Codex to generate an eval set of golden prompts and expected results for a use-case recommender, then set a goal to reach 100% on it. The run reached 100% on twenty prompts in about six minutes.

## Time-based loops: match the interval to what you watch

Mark's \`/loop\` example runs every thirty minutes: check open PRs, merge if CI is green and reviews are in, otherwise report what is blocking. He says to match the interval to the thing you are watching. Too often wastes tokens. Too rarely and the work goes stale.

The catch is that \`/loop\` needs your laptop open. \`/schedule\` moves the loop to the cloud. At Code with Claude London, a Claude Code founding engineer described routines as basically \`/loop\` running remotely, in the same containers as Claude Code on the web. His local example was \`/loop\` every 10 minutes to babysit open PRs. His team's routines include a daily docs job and one that reads issues and feedback every six hours.

Mark adds a habit for cloud loops: have each run post to Slack or send an email, so you notice when it stops.

## Routines: trigger, context, steering

In the same London compilation, [Maya from Anthropic's Applied AI team](https://x.com/0xMovez/status/2073765125958348964) explains why routines exist. Running Claude Code on cron means building your own hosting, triggers, and a way to watch or steer a headless session. Routines run on Claude Code's managed infrastructure and start from a schedule, a GitHub event or a webhook POST whose payload becomes context. Each run is a normal session you can open, follow and steer from the web, CLI or desktop.

She frames a routine as three decisions:

- Trigger: a schedule, or an event like a release cut or a merged PR with a docs label.
- Context: which repos and connectors it gets. She says what Claude can see is the ceiling on how well it can do.
- Steering: how you keep it honest.

Her example: weekly PRs on the Claude Code team rose 200% since the new year, and the engineer who owns the docs could not keep up. That engineer set up a weekly routine with \`/schedule\` to compare changes merged to main against the docs repo and open a PR. A second routine fires on new GitHub issues. For quality, she borrows the generator and critic pattern: one routine opens docs PRs, another triggers on that PR and reviews it before a human does. They also render the changed page to verify it.

Her deploy verifier sketch: The CD pipeline posts a webhook after each deploy. The routine gets the service source, monitoring access such as Datadog or Grafana, and a way to alert you. At first it only investigates and gives a go or no-go on rollback. Only as you trust its calls do you let it roll back on its own.

## Event-triggered automations in Cursor

In a webinar shared on X, [Cursor team members](https://x.com/0xCodez/status/2099523119161528649) define an automation as a cloud agent that runs on a schedule or in response to an event. Under the hood it is three things: a trigger, instructions and tools. In the demo, dragging a Jira ticket into an "In progress Cursor" column fires a webhook. A cloud agent then opens a PR with screenshots and a screen recording.

They say 30 to 40% of the PRs their team merges come from someone posting a bug in Slack and writing "@cursor fix it". The idea behind Automations was to skip the mention and start an agent whenever a bug lands in the bug channel. Other uses: PagerDuty triage so the on-call engineer wakes up to a root cause and a PR, and a trigger that fixes broken CI.

Details worth noting:

- Triggers can be filtered by allow lists, channels, keywords or regex. A generic webhook covers anything without a first-party trigger.
- Local automations are weaker: the editor must be open, and you are mostly limited to cron.
- The new security risk is who can trigger your automation. If anyone in a Slack channel can start it, think about who is in that channel.
- Merging stays human: "we don't let any agents from automations merge directly to your repo".

## From skill to trigger

In a talk shared on X, a [Cursor field engineering lead](https://x.com/0xMovez/status/2096612265592021396) describes the path inside Cursor. As skills become canonical, they turn into automations that respond to triggers. When an internal docs agent fails an eval, that event triggers a diagnosis skill. For metrics like build time, a couple of people maintain long-running hill-climbing agents. They give them an end goal and context, and let them run for hours or days. The longest ran about five days.

## Fan-out and model choice

For work one loop cannot hold, Mark describes dynamic workflows: Claude writes a JavaScript script that orchestrates dozens to hundreds of subagents, for audits or large migrations. Intermediate values live in the script, so the main agent gets answers, not piles of research. It burns tokens, so use it sparingly.

On models, he says to route by the task. Simple yes or no checks can start on Sonnet, or try Haiku to save budget. Move up to Opus or Fable only if the loop fails for lack of reasoning. He also warns against treating Claude as a mind reader: "You should think about Claude as a very smart very capable but often unaware coworker".

## What to try this week

- Pick one recurring chore you do by hand. Write down its trigger, its stop limit and its done check before you automate it.
- Turn one vague task into a \`/goal\` with yes or no criteria and a turn cap.
- Build a small eval set for a feature, then point a goal at it.
- Move a laptop \`/loop\` you rely on into a cloud schedule, and make each run post a short note to Slack.
- Start event-triggered agents in report-only mode. Grant actions like rollback later.
- Require human review for destructive actions such as deletes or refunds. Mark suggests always having a human reviewer at first, then reducing it.
- Restrict who can trigger each automation.`,
    sources: [
      { label: "Mark (Anthropic) - a guide to Claude Code loops", url: "https://x.com/0xMovez/status/2082097290177626563" },
      { label: "Code with Claude London workshops - routines and proactive agents", url: "https://x.com/0xMovez/status/2073765125958348964" },
      { label: "Cursor team - Automations webinar", url: "https://x.com/0xCodez/status/2099523119161528649" },
      { label: "Katia Gil-Guzman (OpenAI DevEx) - Codex automations and /goal", url: "https://x.com/0xMovez/status/2087563129437790518" },
      { label: "Cursor field engineering lead - how Cursor uses Cursor", url: "https://x.com/0xMovez/status/2096612265592021396" },
    ],
  },
  {
    slug: "2026-10-22-agentic-evals-error-analysis",
    date: "2026-10-22",
    lang: "en",
    title: "Building agentic systems the Andrew Ng way: evals and error analysis",
    summary: "Andrew Ng and Anthropic speakers on agentic design patterns, small quick evals, grader types and the error analysis that tells you what to fix next.",
    tags: ["ai","agents","evals","llm-engineering","x-talks"],
    body: `In a talk shared on X, [Andrew Ng walks through his Agentic AI course](https://x.com/0xMovez/status/2075662761149821291) and argues that measuring, not building, separates good teams from slow ones: "the single biggest predictor for whether team executes well lies in its ability to drive a disciplined error analysis process".

This post pulls together that course and a few related talks: which patterns to use, how to start evals, and how to pick what to fix.

## Agentic is a spectrum, not a label

Ng defines an agentic workflow as an LLM app that runs multiple steps, uses tools and iterates, instead of answering in one pass. He treats agentic as a matter of degree, from a hard-coded sequence of steps to an agent that picks its own steps. Many valuable business applications sit at the less autonomous end.

His case for the approach is a coding benchmark his team ran. Wrapping GPT-3.5 in an agentic workflow, for example writing code and then reflecting on it, gave a bigger improvement than the jump from GPT-3.5 to GPT-4.

## Decompose until each step is doable

The core design skill is task decomposition. Split the work into discrete steps and ask of each one: can an LLM or a tool do this? If not, ask how a human would do it and split it further. In his research agent, outline, search and write still gave disjointed essays, so he split writing into draft, critique and revise.

## Four patterns, with honest caveats

Ng names four design patterns: reflection, tool use, planning and multi-agent collaboration. What is useful is how candid he is about each one.

- Reflection: ask the model to critique its own output, or feed it external signals such as error messages from running the code. He says it is not magic, but it can give a nice bump.
- Tool use: let the model decide which functions to call, from web search to code execution.
- Planning: the model writes a step-by-step plan and each step is executed in turn. He says it works well in highly agentic coding systems but is harder to control elsewhere, because you do not know at runtime what plan it will produce. Ask for the plan as JSON or XML. He calls markdown slightly more ambiguous to parse and plain text the least reliable.
- Multi-agent: prompt one LLM per role, like researcher, designer and writer. The common setups are a linear hand-off or a manager agent coordinating the team. He finds all-to-all chat between agents hard to predict.

## Build first, then write small evals

Ng's advice on evals runs against the instinct to design a test suite up front. It is hard to know in advance what will go wrong. So build a quick-and-dirty system, read its outputs, and only then decide what to measure.

His example is a customer email agent that unexpectedly mentions competitors. Once you see it, code that searches outputs for competitor names gives you an objective metric.

He keeps eval sets small to start, around 10 to 20 examples. For an invoice extractor, he hand-labels due dates, has the model output a fixed date format, extracts it with a regex and compares.

He frames eval types as a 2x2 grid:

- Code checks with per-example ground truth, like the invoice due date.
- Code checks without per-example ground truth, like a 10-word limit on captions.
- LLM-as-judge with per-example ground truth, like counting how many of three to five gold-standard talking points an essay covers, returned as JSON with a score and an explanation.
- LLM-as-judge without per-example ground truth, like grading against a rubric.

Two warnings stand out. He says LLMs are not good at 1-to-5 ratings and he tends not to use them. And he sees teams almost paralysed because they think evals are a multi-week project. Start rough, and expect to improve the evals as you improve the system. If you feel a change is better but the eval does not show it, that is a signal to grow or change the eval.

## Error analysis: count, don't guess

When the research agent missed key points, any step could be the cause: the search terms, the search engine, source selection, fetching, or the final LLM ignoring content. Ng says teams often pick one by gut feel, and sometimes spend months with little progress.

His alternative is mechanical:

- Read traces: the intermediate output of every step.
- Set aside the examples that went well. Focus only on the failures.
- In a spreadsheet, mark which component underperformed compared with what a human expert would have done given the same input.
- Do not blame a step for bad input. If every search result was a popular-press article, the source selector did the best it could.
- Count. In his example, search terms were the problem 5% of the time and search results 45% of the time. That tells you where to work.

He adds one filter: prioritise components where you also have ideas for a fix. For non-LLM components, tune parameters or swap the provider. For LLM steps, improve the prompt, add few-shot examples, try another model, or split the step. Fine-tuning comes last, for mature applications chasing the final few points.

He applies the same method to latency and cost: time and price each step, then optimise only the ones that matter, once output quality is high.

## Writing judges that do not flatter

In a separate module from [an Ng compilation shared on X](https://x.com/0xMovez/status/2074845547588952311), he covers sycophancy. Models are trained toward answers people like, so a leading prompt gets a biased answer. His fixes carry over directly to LLM-as-judge prompts:

- Ask neutral questions that do not hint at the answer you want.
- Give a rubric with criteria that are clearly yes or no.
- Ask for a score per category first, then the total. Asking for the total first makes the model jump to a number and justify it.

In his lab example, a vague rubric scored a story 83 out of 100 and an objective rubric scored it 75. He also says having a different model review the output gives only a slight boost, and he uses that technique rarely.

## Graders, from Anthropic's side

An [Anthropic workshop session on evals](https://x.com/0xMovez/status/2089456515975426297) maps grader types in a way that complements Ng's grid. Code-based graders are like unit tests: fast, cheap and deterministic, but brittle and lacking nuance. Model-based graders include rubric scoring, pairwise comparison, which the presenter calls underrated, and multi-judge consensus, such as three judges with majority vote. They are flexible but non-deterministic, cost money and need calibration. Human graders are the highest quality and also slow and expensive.

The presenter adds that public benchmarks say little about your use case. Without your own evals you wait for customer feedback and cannot tell whether a prompt tweak broke something else.

## Evals make models swappable

Several speakers tie evals to model choice. In [a talk on AI trends](https://x.com/0xMovez/status/2077775697917943951), Ng says he architects workloads so that when a new model appears, his team runs evals and can switch in two or three days.

[Boris, creator of Claude Code](https://x.com/0xMovez/status/2082499439038537753), draws the line on when to bother. For a workflow you will run thousands or millions of times, you want evals so you can swap a new model into the harness and check it improves. For product feel, vibes go far, because "there's a cost to writing evals you don't want write it for everything".

[An Anthropic educator](https://x.com/0xCodez/status/2084289028346532220) gives the order of operations: prompt engineering first, then RAG, then fine-tuning, with evals at each step. He warns that fine-tuning can make a model worse and cannot be undone. Without a way to measure, he says, "prompt engineering and this entire ecosystem just kind of becomes an art not a science".

## What to try this week

- Run your agent on 10 to 20 real inputs and read every output and trace before writing any eval.
- Write one code-based check for the most common failure you saw.
- Put failing examples in a spreadsheet with one column per component, and count.
- Swap any 1-to-5 judge prompt for a yes/no rubric scored per criterion.
- Time and price each step of one workflow.
- Make the model a config value so an eval run can decide the next upgrade.`,
    sources: [
      { label: "Andrew Ng - Agentic AI course (design patterns, evals, error analysis)", url: "https://x.com/0xMovez/status/2075662761149821291" },
      { label: "Andrew Ng compilation - agentic AI, prompting and rubrics", url: "https://x.com/0xMovez/status/2074845547588952311" },
      { label: "Andrew Ng - agentic workflows and five AI trends", url: "https://x.com/0xMovez/status/2077775697917943951" },
      { label: "Anthropic workshop sessions - evals and grader types", url: "https://x.com/0xMovez/status/2089456515975426297" },
      { label: "Boris (Claude Code) with AMD's Mark - evals vs vibes", url: "https://x.com/0xMovez/status/2082499439038537753" },
      { label: "Anthropic educator - building with Claude, evals before fine-tuning", url: "https://x.com/0xCodez/status/2084289028346532220" },
    ],
  },
];

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

/** Every tag used by at least one post, in tagLabels order. */
export const allTags = Object.keys(tagLabels).filter((t) => posts.some((p) => p.tags.includes(t)));

export function tagLabel(tag: string): string {
  return tagLabels[tag] ?? tag;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

const dateLocales: Record<Locale, string> = { en: "en-GB", fr: "fr-FR", ar: "ar-TN" };

export function formatDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
