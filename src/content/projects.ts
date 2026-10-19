import type { Project } from "./types";

// Source: Omar-Jemai-Professional-Record.md §6. Stacks and links only as recorded.
export const projects: Project[] = [
  {
    id: "saudia-auctions",
    name: "Saudia Auctions",
    employer: "tunisofts",
    stack: ["React", "Socket.io", "Node.js", "Python", "Redis"],
    url: "https://auctions.com.sa",
    featured: true,
  },
  {
    id: "auctions-desktop",
    name: "Auctions Desktop",
    employer: "tunisofts",
    stack: ["Electron", "React", "Socket.io", "redux-saga"],
    featured: true,
  },
  {
    id: "alber-web",
    name: "Alber — web platform",
    employer: "tunisofts",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "TanStack Query", "Turborepo"],
    url: "https://alber.org.sa",
    featured: true,
  },
  {
    id: "alber-api",
    name: "Alber — backend API",
    employer: "tunisofts",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Supabase"],
    url: "https://alber.org.sa",
    featured: true,
  },
  { id: "app-jr", name: "App.jr.sa", employer: "tunisofts", stack: ["React", "Laravel"] },
  { id: "istisharat", name: "Istisharat", employer: "tunisofts", stack: ["Laravel", "Flutter"] },
  { id: "traccar", name: "Traccar", employer: "tunisofts", stack: ["React", "WebSocket", "Java"] },
  { id: "menutium", name: "Menutium", employer: "iobird", stack: ["React", "Firebase", "Node.js"] },
  {
    id: "menutium-delivery",
    name: "Menutium Delivery",
    employer: "iobird",
    stack: ["React", "Firebase", "Node.js"],
  },
  {
    id: "menutium-admin",
    name: "Menutium Admin",
    employer: "iobird",
    stack: ["React", "Firebase", "Node.js"],
  },
  { id: "bistro73", name: "Bistro73", employer: "iobird", stack: ["React", "Firebase", "Node.js"] },
  {
    id: "firepodos",
    name: "FirepodOS",
    employer: "iobird",
    stack: ["React", "Node.js", "Python", "Elasticsearch"],
  },
  { id: "iochange", name: "IOCHANGE", employer: "iobird", stack: ["Node.js", "React", "MongoDB"] },
  { id: "bbmessage", name: "Bbmessage", employer: "iobird", stack: ["WebRTC", "React", "Firebase"] },
  { id: "iobird-site", name: "IoBird.com", employer: "iobird", stack: ["Laravel"] },
];

export const allStacks = Array.from(new Set(projects.flatMap((p) => p.stack))).sort((a, b) =>
  a.localeCompare(b),
);

export const contact = {
  email: "mrjomaiomar@gmail.com",
  linkedin: "https://www.linkedin.com/in/omar-jemai/",
};
