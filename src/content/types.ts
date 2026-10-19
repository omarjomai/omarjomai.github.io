export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type Employer = "tunisofts" | "iobird";

export type ProjectId =
  | "saudia-auctions"
  | "auctions-desktop"
  | "alber-web"
  | "alber-api"
  | "app-jr"
  | "istisharat"
  | "traccar"
  | "menutium"
  | "menutium-delivery"
  | "menutium-admin"
  | "bistro73"
  | "firepodos"
  | "iochange"
  | "bbmessage"
  | "iobird-site";

export type Project = {
  id: ProjectId;
  name: string;
  employer: Employer;
  stack: string[];
  url?: string;
  featured?: boolean;
};

export type ProjectText = {
  summary: string;
  /** Short "how it works" note, from the owner's own decisions (record §9). */
  how?: string;
};

export type TimelineStep = {
  period: string;
  title: string;
  org: string;
  text: string;
  current?: boolean;
};

export type Dictionary = {
  dir: "ltr" | "rtl";
  langName: string;
  meta: { title: string; description: string };
  nav: {
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
  hero: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    availability: string;
    ctaEmail: string;
    ctaLinkedIn: string;
    ctaProjects: string;
  };
  about: { heading: string; paragraphs: string[] };
  highlights: { heading: string; items: { title: string; text: string }[] };
  experience: { heading: string; intro: string; steps: TimelineStep[]; present: string };
  projects: {
    heading: string;
    intro: string;
    featuredHeading: string;
    allHeading: string;
    howItWorks: string;
    visit: string;
    filterEmployer: string;
    filterStack: string;
    all: string;
    anyStack: string;
    count: (n: number) => string;
    employers: Record<Employer, string>;
    items: Record<ProjectId, ProjectText>;
  };
  skills: { heading: string; groups: { name: string; items: string[] }[] };
  background: {
    heading: string;
    educationHeading: string;
    degree: string;
    school: string;
    year: string;
    languagesHeading: string;
    languages: { name: string; level: string }[];
  };
  contact: {
    heading: string;
    text: string;
    email: string;
    linkedin: string;
  };
  blog: {
    heading: string;
    intro: string;
    readMore: string;
    back: string;
    sources: string;
    /** Shown on posts written in another language than the page. */
    otherLanguage: string;
    empty: string;
  };
  footer: string;
};
