import type { Dictionary } from "../types";

const fr: Dictionary = {
  dir: "ltr",
  langName: "Français",
  meta: {
    title: "Omar Jemai — Ingénieur Full-Stack Senior & Tech Lead",
    description:
      "Ingénieur full-stack senior et tech lead à Riyad. Systèmes temps réel et hors ligne avec React, Node.js, TypeScript et NestJS. Arabe, français et anglais.",
  },
  nav: {
    about: "À propos",
    experience: "Parcours",
    projects: "Projets",
    skills: "Compétences",
    contact: "Contact",
    language: "Langue",
    theme: "Basculer le mode sombre",
    skip: "Aller au contenu",
  },
  hero: {
    name: "Omar Jemai",
    title: "Ingénieur Full-Stack Senior & Tech Lead",
    tagline:
      "Je conçois des produits web, desktop et mobiles temps réel, capables de fonctionner hors ligne, en JavaScript et TypeScript — et je dirige les équipes qui les livrent.",
    location: "Riyad, Arabie saoudite · basé à Sousse, Tunisie",
    availability: "Ouvert aux postes à Riyad et aux missions freelance",
    ctaEmail: "M'écrire",
    ctaLinkedIn: "LinkedIn",
    ctaProjects: "Voir les projets",
  },
  about: {
    heading: "À propos",
    paragraphs: [
      "Je développe des produits web, mobiles et desktop en JavaScript et TypeScript depuis neuf ans.",
      "Depuis décembre 2022, je travaille à Riyad sur Saudia Auctions, une plateforme d'enchères publiques où entreprises et particuliers enchérissent en temps réel. J'ai rejoint le projet comme ingénieur senior et j'en suis devenu le tech lead en janvier 2023. Les enchères en direct ne tolèrent aucun décalage : chaque participant connecté doit voir le même état au même instant. Cette contrainte a façonné l'architecture — React côté front, des services Node.js et Python derrière, Socket.io pour les enchères et Redis pour l'état des ventes. J'ai aussi construit le client desktop en Electron, qui a remplacé une ancienne application Visual Basic et peut mener une vente en ligne ou hors ligne.",
      "En 2026, j'ai aussi pris en charge Alber, une plateforme pour les associations en Arabie saoudite, comme ingénieur full-stack et tech lead : un front Next.js et TypeScript en monorepo avec des packages partagés d'UI, d'API et de langues (droite-à-gauche), et un back-end NestJS et PostgreSQL avec contrôle d'accès par rôles.",
      "Chez Tunisofts, j'assure la direction technique de l'équipe : standards de code, choix technologiques, revue de code, et échanges avec les clients pour transformer les besoins en backlog et en sprints. J'ai encadré des équipes de jusqu'à huit développeurs, et j'accompagne les développeurs juniors et les stagiaires.",
    ],
  },
  highlights: {
    heading: "Ce que j'apporte",
    items: [
      {
        title: "Temps réel & hors ligne",
        text: "Enchères en direct avec Socket.io et Redis, et un client desktop qui poursuit la vente quand internet coupe.",
      },
      {
        title: "Leadership technique",
        text: "Standards de code, revue de code, planification des sprints et mentorat. Équipes de jusqu'à 8 développeurs.",
      },
      {
        title: "Plus de trois ans à Riyad",
        text: "Intégré chez des clients saoudiens depuis décembre 2022 : Saudia Auctions et Alber.",
      },
      {
        title: "Arabe · Français · Anglais",
        text: "Je travaille avec clients et équipes dans les trois langues.",
      },
    ],
  },
  experience: {
    heading: "Parcours",
    intro: "Neuf ans de progression, de développeur à tech lead sur deux plateformes saoudiennes.",
    present: "Aujourd'hui",
    steps: [
      {
        period: "2026 – aujourd'hui",
        title: "Ingénieur Full-Stack & Tech Lead — Alber",
        org: "Tunisofts · projet client, Arabie saoudite",
        text: "Plateforme pour les associations. Migration de l'application web vers un monorepo Turborepo avec packages partagés d'UI, d'API et d'i18n (RTL) ; contrôle d'accès par rôles dans un back-end NestJS + PostgreSQL.",
        current: true,
      },
      {
        period: "janv. 2023 – aujourd'hui",
        title: "Tech Lead — Saudia Auctions",
        org: "Tunisofts · mission client, Riyad",
        text: "Responsable technique de la plateforme d'enchères en temps réel et de son client desktop Electron. Standards, revue de code, planification des sprints, mentorat.",
        current: true,
      },
      {
        period: "déc. 2022",
        title: "Ingénieur senior — Saudia Auctions",
        org: "Tunisofts · mission client, Riyad",
        text: "Arrivée sur la mission Saudia Auctions à Riyad comme ingénieur senior.",
      },
      {
        period: "nov. 2019 – aujourd'hui",
        title: "Ingénieur JavaScript Senior",
        org: "Tunisofts · Sousse, Tunisie",
        text: "Société de développement web et mobile. Produits RH et recrutement, gestion de conseil et suivi de flotte avant la mission à Riyad.",
        current: true,
      },
      {
        period: "janv. 2017 – nov. 2019",
        title: "Développeur JavaScript Full-Stack",
        org: "iobird · Sousse, Tunisie",
        text: "Commande et livraison de restaurants, détection d'incendie, bureau de change et chat audio/vidéo en temps réel.",
      },
    ],
  },
  projects: {
    heading: "Projets",
    intro: "Quinze produits : enchères, associations, RH, suivi de flotte, restauration, sécurité et finance.",
    featuredHeading: "À la une",
    allHeading: "Tous les projets",
    howItWorks: "Comment ça marche",
    visit: "Voir le site",
    filterEmployer: "Entreprise",
    filterStack: "Technologie",
    all: "Toutes",
    anyStack: "Toutes",
    count: (n) => `${n} projet${n > 1 ? "s" : ""}`,
    employers: { tunisofts: "Tunisofts", iobird: "iobird" },
    items: {
      "saudia-auctions": {
        summary: "Plateforme d'enchères publiques où entreprises et particuliers enchérissent en temps réel.",
        how: "Chaque enchère est une transaction, traitée dans l'ordre. Deux enchères du même montant : la première validée l'emporte. Montants différents : les deux passent dans l'ordre et la plus haute prend la tête.",
      },
      "auctions-desktop": {
        summary:
          "Client desktop multiplateforme qui apporte toute la plateforme d'enchères en salle de vente et mène une vente en ligne ou hors ligne. A remplacé une ancienne application Visual Basic.",
        how: "La salle de vente ne peut pas s'arrêter quand internet coupe : l'application mène l'enchère sur une base de données locale et se synchronise avec le serveur au retour de la connexion. Elle a été reconstruite comme une nouvelle application — d'abord un MVP avec les fonctions clés de l'ancienne, puis de nouvelles fonctions par étapes.",
      },
      "alber-web": {
        summary:
          "Plateforme web pour les associations en Arabie saoudite. Migrée vers un monorepo Turborepo avec packages partagés d'UI, de client API et d'i18n, dont le support droite-à-gauche ; tableau de bord des bénévoles.",
      },
      "alber-api": {
        summary:
          "Back-end de la plateforme Alber : gestion des accès (groupes, niveaux, règles par enregistrement), permissions, utilisateurs et recherche, et un contrat commun de codes d'erreur.",
        how: "Les permissions sont de la configuration, pas du code : chaque rôle et niveau a une configuration par module, donc les accès changent sans nouvelle mise en production.",
      },
      "app-jr": { summary: "Gestion RH et recrutement." },
      istisharat: { summary: "Gestion du conseil entre consultants et clients." },
      traccar: { summary: "Suivi de flotte de véhicules." },
      menutium: { summary: "Commande en ligne pour restaurants." },
      "menutium-delivery": {
        summary: "Gestion des livraisons : affectation des commandes et suivi des livreurs en temps réel.",
      },
      "menutium-admin": { summary: "Abonnements des restaurants, tableau de bord et statistiques." },
      bistro73: { summary: "Back-office restaurateur : commandes et programme de fidélité." },
      firepodos: { summary: "Détection, alarme et protection incendie." },
      iochange: { summary: "Gestion de bureau de change." },
      bbmessage: { summary: "Chat audio et vidéo." },
      "iobird-site": { summary: "Site vitrine de l'entreprise." },
    },
  },
  skills: {
    heading: "Compétences",
    groups: [
      { name: "Front-end", items: ["React", "Next.js", "TypeScript", "Redux", "redux-saga", "Tailwind", "HTML5 / CSS"] },
      { name: "Back-end", items: ["Node.js", "NestJS", "Express", "Python", "Laravel / PHP", "Java", "API REST"] },
      { name: "Temps réel & desktop", items: ["Socket.io", "WebSocket", "WebRTC", "Electron"] },
      { name: "Données", items: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "MySQL", "Elasticsearch", "Firebase"] },
      { name: "Outils", items: ["Git", "Turborepo", "Docker", "Jenkins", "Webpack"] },
      { name: "Leadership", items: ["Leadership technique", "Revue de code", "Mentorat", "Agile / Scrum"] },
    ],
  },
  background: {
    heading: "Formation & langues",
    educationHeading: "Formation",
    degree: "Diplôme d'ingénieur, génie logiciel",
    school: "ISSAT Sousse, Tunisie",
    year: "2016",
    languagesHeading: "Langues",
    languages: [
      { name: "Arabe", level: "Langue maternelle" },
      { name: "Français", level: "Courant" },
      { name: "Anglais", level: "Professionnel" },
    ],
  },
  contact: {
    heading: "Travaillons ensemble",
    text: "Vous recrutez à Riyad, ou cherchez un ingénieur senior pour un projet ? Écrivez-moi.",
    email: "E-mail",
    linkedin: "LinkedIn",
  },
  footer: "Omar Jemai",
};

export default fr;
