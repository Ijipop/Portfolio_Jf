/**
 * Copy FR québécois — page /portfolio/a-propos V2 (Phase 6B4).
 * Ne pas confondre avec aboutContent.ts (section À propos de l’accueil).
 * Récit personnel : trois paragraphes issus de fr.ts (about.personalStoryP1–P3),
 * publiés avec l’accord explicite de l’utilisateur.
 * Formations reprises de la V1 — à confirmer avant publication.
 */

import type { PublicV2Locale } from './locale'

export const ABOUT_PAGE_SKILLS = [
  'Python',
  'Java',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'SQL',
  'CSS3',
  'HTML5',
  'Git',
] as const

export const ABOUT_PAGE_COPY = {
  title: 'À propos',
  portraitEyebrow: 'Portrait',
  identityName: 'Jean-François Lefebvre',
  identityRole: 'Développeur indépendant à Montréal',
  lead:
    'Je conçois des sites web, je développe des logiciels et j’offre du soutien informatique.',
  portrait: {
    src: '/img/Jf.jpg',
    alt: 'Portrait de Jean-François Lefebvre',
    width: 640,
    height: 800,
  },
  storyTitle: 'Mon parcours',
  /** Textes originaux V1 — about.personalStoryP1–P3 (fr.ts). */
  storyParagraphs: [
    "Survivant d'un AVC à l'âge de 38 ans et père de deux enfants, j'ai dû réinventer ma trajectoire professionnelle pour bâtir un avenir qui me permet de travailler de la maison, près de ceux qui comptent le plus pour moi.",
    "Ce qui a d'abord commencé comme une réorientation de carrière est rapidement devenu une véritable passion. Aujourd'hui, je mets cette passion au service des autres en créant des sites web et des logiciels sur mesure, pensés avec soin, humanité et souci du détail.",
    "Chaque projet que je réalise est pour moi bien plus qu'un simple mandat : c'est l'occasion de créer quelque chose d'utile, de beau et de durable, qui reflète réellement les besoins et la vision de mes clients.",
  ] as const,
  workingTitle: 'Ma façon de travailler',
  workingParagraphs: [
    'Je commence par comprendre ce dont vous avez besoin. Ensuite, on regarde ensemble ce qui vaut la peine d’être développé et comment rendre le résultat simple à utiliser et à faire évoluer.',
    'Je porte attention aux détails et je préfère les solutions pratiques aux complications inutiles. Je reste aussi disponible après la livraison pour les ajustements, les mises à jour et le soutien.',
  ] as const,
  formationTitle: 'Formation',
  formationItems: [
    "DEP en soutien informatique à l'ÉMICA (2023-2024)",
    "AEC Développement de logiciels, sécurité d'applications de bureau, mobiles et Web au Cégep De Maisonneuve (2024-2026)",
  ] as const,
  toolsTitle: 'Outils et technologies',
  ctaTitle: 'Un projet ou une question?',
  ctaBody:
    'Vous avez besoin d’un site web, d’un logiciel ou d’un coup de main en informatique? Écrivez-moi pour m’expliquer ce que vous cherchez.',
  ctaContact: 'Me contacter',
  ctaContactHref: '/portfolio/contact',
  ctaProjects: 'Voir mes réalisations',
  ctaProjectsHref: '/portfolio/projets',
} as const

const ABOUT_PAGE_COPY_EN = {
  title: 'About',
  portraitEyebrow: 'Portrait',
  identityName: 'Jean-François Lefebvre',
  identityRole: 'Independent developer in Montreal',
  lead: 'I build websites, develop software, and offer IT support.',
  portrait: {
    src: '/img/Jf.jpg',
    alt: 'Portrait of Jean-François Lefebvre',
    width: 640,
    height: 800,
  },
  storyTitle: 'My path',
  storyParagraphs: [
    'A stroke survivor at age 38 and father of two, I had to reinvent my career path to build a future that lets me work from home, close to the people who matter most.',
    'What began as a career change quickly became a real passion. Today I put that passion to work for others by building custom websites and software—crafted with care, humanity, and attention to detail.',
    "Every project I take on is far more than a job to me: it's a chance to create something useful, beautiful, and lasting that truly reflects my clients' needs and vision.",
  ] as const,
  workingTitle: 'How I work',
  workingParagraphs: [
    'I start by understanding what you need. Then we look together at what is worth building and how to keep the result simple to use and easy to evolve.',
    'I pay attention to detail and favour practical solutions over unnecessary complexity. I also stay available after delivery for tweaks, updates, and support.',
  ] as const,
  formationTitle: 'Education',
  formationItems: ABOUT_PAGE_COPY.formationItems,
  toolsTitle: 'Tools and technologies',
  ctaTitle: 'A project or a question?',
  ctaBody:
    'Need a website, a piece of software, or hands-on IT help? Write and tell me what you are looking for.',
  ctaContact: 'Contact me',
  ctaContactHref: '/portfolio/contact',
  ctaProjects: 'See my work',
  ctaProjectsHref: '/portfolio/projets',
} as const

export type AboutPageCopy = {
  title: string
  portraitEyebrow: string
  identityName: string
  identityRole: string
  lead: string
  portrait: { src: string; alt: string; width: number; height: number }
  storyTitle: string
  storyParagraphs: readonly string[]
  workingTitle: string
  workingParagraphs: readonly string[]
  formationTitle: string
  formationItems: readonly string[]
  toolsTitle: string
  ctaTitle: string
  ctaBody: string
  ctaContact: string
  ctaContactHref: string
  ctaProjects: string
  ctaProjectsHref: string
}

export function getAboutPageContent(locale: PublicV2Locale = 'fr'): AboutPageCopy {
  return locale === 'en' ? ABOUT_PAGE_COPY_EN : ABOUT_PAGE_COPY
}