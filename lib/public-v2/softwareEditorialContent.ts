/**
 * Landing Développement logiciels — copy FR/EN (Atelier Atlantique).
 * Contenu court, québécois, vouvoiement clients (FR).
 */

import type { PublicV2Locale } from './locale'

export const SOFTWARE_LANDING_PATH = '/developpement-logiciels-montreal'

export const SOFTWARE_EDITORIAL_FR = {
  hero: {
    eyebrow: 'Développement logiciel · Montréal',
    title: 'Des logiciels qui vous simplifient la vie.',
    lead:
      'Vous avez une idée de logiciel ? Une tâche répétitive qui vous fait perdre du temps ? Je développe des applications sur mesure pour vous simplifier le travail. Pas besoin de faire compliqué quand on peut faire simple.',
    ctaProjects: 'Voir mes logiciels',
    ctaContact: 'Parlons de votre idée',
    projectsHref: '/portfolio/projets?type=logiciel',
    contactHref: '/portfolio/contact?subject=Demande%20%3A%20logiciel',
    buildAria:
      'Une application se construit, importe un document, traite les données, puis affiche le résultat.',
    taskComplete: 'Tâche terminée',
  },
  offers: {
    eyebrow: 'Services',
    title: 'Ce que je développe',
    items: [
      {
        id: 'custom',
        title: 'Applications sur mesure',
        lead: 'Un outil fait pour vos besoins, pas l’inverse.',
      },
      {
        id: 'auto',
        title: 'Automatisation',
        lead: 'Les tâches répétitives ? On peut laisser le logiciel s’en occuper.',
      },
      {
        id: 'tools',
        title: 'Outils de travail',
        lead: 'Des applications pratiques qui vous aident à mieux vous organiser.',
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
        lead: 'Vous m’expliquez ce que vous aimeriez faire.',
      },
      {
        id: 'dev',
        num: '02',
        title: 'Je développe',
        lead: 'Je transforme votre idée en application.',
      },
      {
        id: 'essai',
        num: '03',
        title: 'On essaie',
        lead: 'On teste, on ajuste, puis on s’assure que tout fonctionne.',
      },
    ],
  },
  projects: {
    eyebrow: 'Portfolio',
    title: 'Mes logiciels',
    lead: 'Quelques outils déjà en ligne — le reste est dans le catalogue.',
    cta: 'Découvrir tous mes logiciels',
    href: '/portfolio/projets?type=logiciel',
    empty: 'Les logiciels s’affichent ici dès qu’ils sont disponibles.',
    error: 'Impossible de charger les projets pour le moment.',
  },
  finalCta: {
    title: 'Vous avez une idée en tête ?',
    lead: 'Racontez-moi ça. On va voir comment lui donner vie.',
    button: 'On en parle ?',
    href: '/portfolio/contact?subject=Demande%20%3A%20logiciel',
  },
} as const

export const SOFTWARE_EDITORIAL_EN = {
  hero: {
    eyebrow: 'Software development · Montreal',
    title: 'Software that makes your day easier.',
    lead:
      'Got a software idea? A repetitive task eating your time? I build custom apps to simplify the work. No need to make it complicated when simple will do.',
    ctaProjects: 'See my software',
    ctaContact: 'Let’s talk about your idea',
    projectsHref: '/portfolio/projets?type=logiciel',
    contactHref: '/portfolio/contact?subject=Request%3A%20software',
    buildAria:
      'An application builds itself, imports a document, processes the data, then shows the result.',
    taskComplete: 'Task complete',
  },
  offers: {
    eyebrow: 'Services',
    title: 'What I build',
    items: [
      {
        id: 'custom',
        title: 'Custom applications',
        lead: 'A tool shaped around your needs — not the other way around.',
      },
      {
        id: 'auto',
        title: 'Automation',
        lead: 'Repetitive tasks? Let the software handle them.',
      },
      {
        id: 'tools',
        title: 'Work tools',
        lead: 'Practical apps that help you stay organized.',
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
        lead: 'You tell me what you’d like to build.',
      },
      {
        id: 'dev',
        num: '02',
        title: 'I develop',
        lead: 'I turn your idea into a working application.',
      },
      {
        id: 'essai',
        num: '03',
        title: 'We try it',
        lead: 'We test, we tweak, and we make sure it does the job.',
      },
    ],
  },
  projects: {
    eyebrow: 'Portfolio',
    title: 'My software',
    lead: 'A few tools already live — the rest is in the catalogue.',
    cta: 'See all software projects',
    href: '/portfolio/projets?type=logiciel',
    empty: 'Software projects will show up here when available.',
    error: 'Could not load projects right now.',
  },
  finalCta: {
    title: 'Got an idea in mind?',
    lead: 'Tell me about it. We’ll figure out how to bring it to life.',
    button: 'Shall we talk?',
    href: '/portfolio/contact?subject=Request%3A%20software',
  },
} as const

export type SoftwareEditorialContent = {
  hero: { [K in keyof typeof SOFTWARE_EDITORIAL_FR.hero]: string }
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
  projects: { [K in keyof typeof SOFTWARE_EDITORIAL_FR.projects]: string }
  finalCta: { [K in keyof typeof SOFTWARE_EDITORIAL_FR.finalCta]: string }
}

export function getSoftwareEditorialContent(
  locale: PublicV2Locale = 'fr',
): SoftwareEditorialContent {
  return (
    locale === 'en' ? SOFTWARE_EDITORIAL_EN : SOFTWARE_EDITORIAL_FR
  ) as SoftwareEditorialContent
}
