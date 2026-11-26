/**
 * Copy provisoire — section À propos V2 (sandbox).
 * Facile à modifier ; pas la rédaction définitive du site.
 */

import type { PublicV2Locale } from './locale'

export const ABOUT_COPY = {
  eyebrow: 'À propos',
  title: 'Derrière IJIPOP',
  lead:
    'Je travaille à mon compte, à Montréal. J’aime autant construire quelque chose de neuf que comprendre pourquoi un outil ne fonctionne pas comme prévu.',
  identity: 'Jean-François Lefebvre, développeur indépendant.',
  ctaLabel: 'En savoir plus sur moi',
  ctaHref: '/portfolio/a-propos',
  photo: {
    src: '/img/Jf.jpg',
    alt: 'Portrait de Jean-François Lefebvre',
    width: 1440,
    height: 1920,
  },
} as const

export const ABOUT_COPY_EN = {
  eyebrow: 'About',
  title: 'Behind IJIPOP',
  lead:
    'I’m self-employed in Montreal. I like building things from scratch just as much as figuring out why a tool isn’t behaving the way it should.',
  identity: 'Jean-François Lefebvre, independent developer.',
  ctaLabel: 'More about me',
  ctaHref: '/portfolio/a-propos',
  photo: {
    src: '/img/Jf.jpg',
    alt: 'Portrait of Jean-François Lefebvre',
    width: 1440,
    height: 1920,
  },
}

export type AboutCopy = {
  eyebrow: string
  title: string
  lead: string
  identity: string
  ctaLabel: string
  ctaHref: string
  photo: { src: string; alt: string; width: number; height: number }
}

export function getAboutSectionCopy(locale: PublicV2Locale = 'fr'): AboutCopy {
  return locale === 'en' ? ABOUT_COPY_EN : ABOUT_COPY
}