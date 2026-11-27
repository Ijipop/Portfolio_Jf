/**
 * Landing Création Web — copy FR/EN (Atelier Atlantique).
 * Contenu court, québécois, vouvoiement clients (FR).
 */

import type { PublicV2Locale } from './locale'

export const WEB_LANDING_PATH = '/creation-site-web-montreal'

export const WEB_EDITORIAL_FR = {
  hero: {
    eyebrow: 'Création web · Montréal',
    title: 'Un site web qui a de l’allure. Puis qui fait le travail.',
    lead:
      'Je crée des sites web modernes, rapides et faciles à utiliser. Que vous partiez de zéro ou que votre site ait besoin d’un bon coup de neuf, on va faire ça comme du monde.',
    ctaProjects: 'Voir mes projets Web',
    ctaContact: 'Parlons de votre projet',
    projectsHref: '/portfolio/projets?type=web',
    contactHref: '/portfolio/contact?subject=Demande%20%3A%20cr%C3%A9ation%20de%20site%20web',
    buildAria: 'La page se construit progressivement : texte, structure, puis contenu final.',
    browserTracing: 'Tracé du site',
    browserStructuring: 'Structure',
    browserRevealing: 'Contenu',
    browserLive: 'Site en ligne',
  },
  offers: {
    eyebrow: 'Services',
    title: 'Ce que je fais',
    items: [
      {
        id: 'creation',
        title: 'Création web',
        lead: 'Un site pensé pour vos besoins, avec un design qui vous ressemble.',
      },
      {
        id: 'refonte',
        title: 'Refonte',
        lead: 'Votre site commence à dater ? On lui donne un bon coup de neuf.',
      },
      {
        id: 'mobile',
        title: 'Mobile et performance',
        lead: 'Beau sur un grand écran. Tout aussi beau sur votre téléphone.',
      },
    ],
  },
  process: {
    eyebrow: 'Méthode',
    title: 'Comment ça se passe',
    steps: [
      {
        id: 'jase',
        num: '01',
        title: 'On discute',
        lead: 'Vous me racontez votre idée et ce dont vous avez besoin.',
      },
      {
        id: 'construis',
        num: '02',
        title: 'Je construis',
        lead: 'Je m’occupe du design et du développement.',
      },
      {
        id: 'enligne',
        num: '03',
        title: 'On met en ligne',
        lead: 'On vérifie que tout fonctionne, puis votre site est prêt.',
      },
    ],
  },
  projects: {
    eyebrow: 'Portfolio',
    title: 'Mes réalisations web',
    lead: 'Quelques sites déjà en ligne — le reste est dans le catalogue.',
    cta: 'Voir toutes mes réalisations Web',
    href: '/portfolio/projets?type=web',
    empty: 'Les projets web s’affichent ici dès qu’ils sont disponibles.',
    error: 'Impossible de charger les projets pour le moment.',
  },
  finalCta: {
    title: 'Vous avez un projet web en tête ?',
    lead: 'Racontez-moi ça. On va regarder ce qu’on peut faire ensemble.',
    button: 'On en parle ?',
    href: '/portfolio/contact?subject=Demande%20%3A%20cr%C3%A9ation%20de%20site%20web',
  },
} as const

export const WEB_EDITORIAL_EN = {
  hero: {
    eyebrow: 'Web design · Montreal',
    title: 'A website that looks sharp — and actually works.',
    lead:
      'I build modern, fast sites that are easy to use. Whether you’re starting from scratch or your site needs a solid refresh, we’ll do it properly.',
    ctaProjects: 'See my web projects',
    ctaContact: 'Let’s talk about your project',
    projectsHref: '/portfolio/projets?type=web',
    contactHref: '/portfolio/contact?subject=Request%3A%20website%20project',
    buildAria: 'The page builds progressively: copy, structure, then finished content.',
    browserTracing: 'Tracing the site',
    browserStructuring: 'Structure',
    browserRevealing: 'Content',
    browserLive: 'Site live',
  },
  offers: {
    eyebrow: 'Services',
    title: 'What I do',
    items: [
      {
        id: 'creation',
        title: 'Web design',
        lead: 'A site shaped around your needs, with a look that fits you.',
      },
      {
        id: 'refonte',
        title: 'Redesign',
        lead: 'Site starting to show its age? We’ll give it a proper refresh.',
      },
      {
        id: 'mobile',
        title: 'Mobile & performance',
        lead: 'Looks great on a big screen. Just as solid on your phone.',
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'How it works',
    steps: [
      {
        id: 'jase',
        num: '01',
        title: 'We talk',
        lead: 'You tell me your idea and what you need.',
      },
      {
        id: 'construis',
        num: '02',
        title: 'I build',
        lead: 'I handle the design and development.',
      },
      {
        id: 'enligne',
        num: '03',
        title: 'We launch',
        lead: 'We check everything works — then your site is live.',
      },
    ],
  },
  projects: {
    eyebrow: 'Portfolio',
    title: 'Web work',
    lead: 'A few live sites — the rest is in the catalogue.',
    cta: 'See all web projects',
    href: '/portfolio/projets?type=web',
    empty: 'Web projects will show up here when available.',
    error: 'Could not load projects right now.',
  },
  finalCta: {
    title: 'Got a web project in mind?',
    lead: 'Tell me about it. We’ll figure out what we can do together.',
    button: 'Shall we talk?',
    href: '/portfolio/contact?subject=Request%3A%20website%20project',
  },
} as const

export type WebEditorialContent = {
  hero: { [K in keyof typeof WEB_EDITORIAL_FR.hero]: string }
  offers: {
    eyebrow: string
    title: string
    items: readonly { id: string; title: string; lead: string }[]
  }
  process: {
    eyebrow: string
    title: string
    steps: readonly { id: string; num: string; title: string; lead: string }[]
  }
  projects: { [K in keyof typeof WEB_EDITORIAL_FR.projects]: string }
  finalCta: { [K in keyof typeof WEB_EDITORIAL_FR.finalCta]: string }
}

export function getWebEditorialContent(locale: PublicV2Locale = 'fr'): WebEditorialContent {
  return (locale === 'en' ? WEB_EDITORIAL_EN : WEB_EDITORIAL_FR) as WebEditorialContent
}
