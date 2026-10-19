import type { Dictionary } from "../types";

const en: Dictionary = {
  dir: "ltr",
  langName: "English",
  meta: {
    title: "Omar Jemai — Senior Full-Stack Engineer & Tech Lead",
    description:
      "Senior Full-Stack Engineer and Tech Lead in Riyadh. Real-time and offline systems with React, Node.js, TypeScript and NestJS. Arabic, French and English.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    language: "Language",
    theme: "Toggle dark mode",
    skip: "Skip to content",
  },
  hero: {
    name: "Omar Jemai",
    title: "Senior Full-Stack Engineer & Tech Lead",
    tagline:
      "I build real-time and offline-capable web, desktop and mobile products in JavaScript and TypeScript — and lead the teams that ship them.",
    location: "Riyadh, Saudi Arabia · based in Sousse, Tunisia",
    availability: "Open to roles in Riyadh and to freelance projects",
    ctaEmail: "Email me",
    ctaLinkedIn: "LinkedIn",
    ctaProjects: "See projects",
  },
  about: {
    heading: "About",
    paragraphs: [
      "I build web, mobile and desktop products in JavaScript and TypeScript, and I have been doing it for nine years.",
      "Since December 2022 I have worked in Riyadh on Saudia Auctions, a public auction platform where companies and individuals bid in real time. I joined as a senior engineer and became the project's tech lead in January 2023. Live bidding leaves no room for drift: every connected participant has to see the same state at the same moment. That constraint shaped the architecture — React on the front end, Node.js and Python services behind it, Socket.io carrying the bidding, and Redis holding auction state. I also built the desktop client in Electron, which replaced an earlier Visual Basic application and can run a sale online or offline.",
      "In 2026 I also took on Alber, a platform for associations in Saudi Arabia, as full-stack engineer and tech lead: a Next.js and TypeScript front end in a monorepo with shared UI, API and right-to-left language packages, and a NestJS and PostgreSQL back end with role-based access control.",
      "At Tunisofts I hold technical direction for the team: coding standards, technology choices, code review, and the requirements conversations with clients that become backlog and sprints. I have led teams of up to eight developers, and I mentor the junior developers and interns who join us.",
    ],
  },
  highlights: {
    heading: "What I bring",
    items: [
      {
        title: "Real-time & offline systems",
        text: "Live bidding over Socket.io and Redis, and a desktop client that keeps a sale running when the internet drops.",
      },
      {
        title: "Technical leadership",
        text: "Coding standards, code review, sprint planning and mentoring. Teams of up to 8 developers.",
      },
      {
        title: "Three-plus years in Riyadh",
        text: "Embedded with Saudi clients since December 2022: Saudia Auctions and Alber.",
      },
      {
        title: "Arabic · French · English",
        text: "I work with clients and teams in all three languages.",
      },
    ],
  },
  experience: {
    heading: "Experience",
    intro: "Nine years of growth, from developer to tech lead on two Saudi platforms.",
    present: "Present",
    steps: [
      {
        period: "2026 – Present",
        title: "Full-Stack Engineer & Tech Lead — Alber",
        org: "Tunisofts · client project, Saudi Arabia",
        text: "Platform for associations. Moved the web app to a Turborepo monorepo with shared UI, API and i18n (RTL) packages; built role-based access control in a NestJS + PostgreSQL backend.",
        current: true,
      },
      {
        period: "Jan 2023 – Present",
        title: "Tech Lead — Saudia Auctions",
        org: "Tunisofts · client mission, Riyadh",
        text: "Technical lead of the real-time public auction platform and its Electron desktop client. Standards, code review, sprint planning, mentoring.",
        current: true,
      },
      {
        period: "Dec 2022",
        title: "Senior Engineer — Saudia Auctions",
        org: "Tunisofts · client mission, Riyadh",
        text: "Joined the Saudia Auctions mission in Riyadh as a senior engineer.",
      },
      {
        period: "Nov 2019 – Present",
        title: "Senior JavaScript Engineer",
        org: "Tunisofts · Sousse, Tunisia",
        text: "Web and mobile software house. HR and recruitment, consulting management and fleet-tracking products before the Riyadh mission.",
        current: true,
      },
      {
        period: "Jan 2017 – Nov 2019",
        title: "Full-stack JavaScript Developer",
        org: "iobird · Sousse, Tunisia",
        text: "Restaurant ordering and delivery, fire detection, currency exchange, and real-time audio and video chat.",
      },
    ],
  },
  projects: {
    heading: "Projects",
    intro: "Fifteen products across auctions, associations, HR, fleet tracking, restaurants, safety and finance.",
    featuredHeading: "Featured",
    allHeading: "All projects",
    howItWorks: "How it works",
    visit: "Visit site",
    filterEmployer: "Company",
    filterStack: "Technology",
    all: "All",
    anyStack: "Any",
    count: (n) => `${n} project${n === 1 ? "" : "s"}`,
    employers: { tunisofts: "Tunisofts", iobird: "iobird" },
    items: {
      "saudia-auctions": {
        summary: "Public auction platform where companies and individuals bid in real time.",
        how: "Each bid is a transaction, processed in order. Two bids with the same amount: the first one committed wins. Different amounts: both go through in order and the higher one leads.",
      },
      "auctions-desktop": {
        summary:
          "Cross-platform desktop client that brings the full auction platform to the saleroom and runs a sale online or offline. Replaced an earlier Visual Basic application.",
        how: "The saleroom can't stop because the internet does: the app runs the auction on a local database and syncs to the server when the connection returns. It was rebuilt as a new app — an MVP with the old app's core features first, then new features in steps.",
      },
      "alber-web": {
        summary:
          "Web platform for associations in Saudi Arabia. Migrated to a Turborepo monorepo with shared UI, API-client and i18n packages, including right-to-left support; volunteers dashboard.",
      },
      "alber-api": {
        summary:
          "Backend for the Alber platform: access management (groups, levels, record rules), permissions, users and search, and a shared error-code contract.",
        how: "Permissions are configuration, not code: each role and level has a configuration for every module, so access can change without a new release.",
      },
      "app-jr": { summary: "HR and recruitment management." },
      istisharat: { summary: "Consultant-to-client advisory management." },
      traccar: { summary: "Vehicle fleet tracking." },
      menutium: { summary: "Online restaurant ordering." },
      "menutium-delivery": {
        summary: "Delivery management: order assignment and real-time driver tracking.",
      },
      "menutium-admin": { summary: "Restaurant subscriptions, dashboard and statistics." },
      bistro73: { summary: "Restaurateur back office: orders and loyalty programme." },
      firepodos: { summary: "Fire detection, alarm and protection." },
      iochange: { summary: "Currency exchange office management." },
      bbmessage: { summary: "Audio and video chat." },
      "iobird-site": { summary: "Company marketing website." },
    },
  },
  skills: {
    heading: "Skills",
    groups: [
      { name: "Front end", items: ["React", "Next.js", "TypeScript", "Redux", "redux-saga", "Tailwind", "HTML5 / CSS"] },
      { name: "Back end", items: ["Node.js", "NestJS", "Express", "Python", "Laravel / PHP", "Java", "REST APIs"] },
      { name: "Real-time & desktop", items: ["Socket.io", "WebSocket", "WebRTC", "Electron"] },
      { name: "Data", items: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "MySQL", "Elasticsearch", "Firebase"] },
      { name: "Tooling", items: ["Git", "Turborepo", "Docker", "Jenkins", "Webpack"] },
      { name: "Leadership", items: ["Technical leadership", "Code review", "Mentoring", "Agile / Scrum"] },
    ],
  },
  background: {
    heading: "Education & languages",
    educationHeading: "Education",
    degree: "Engineering degree (Diplôme d'ingénieur), software engineering",
    school: "ISSAT Sousse, Tunisia",
    year: "2016",
    languagesHeading: "Languages",
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "French", level: "Fluent" },
      { name: "English", level: "Professional working" },
    ],
  },
  contact: {
    heading: "Let's work together",
    text: "Hiring for a role in Riyadh, or need a senior engineer for a project? Send me a message.",
    email: "Email",
    linkedin: "LinkedIn",
  },
  footer: "Omar Jemai",
};

export default en;
