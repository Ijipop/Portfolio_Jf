/**
 * Textes provisoires — section Services (sandbox V2).
 * Facile à éditer. Pas la rédaction définitive du site.
 * Destinations = routes SEO existantes (ne pas inventer).
 */

import type { PublicV2Locale } from './locale'

export type ServiceVariant = 'web' | 'support' | 'soft'

export type ServiceOffer = {
  id: string
  index: string
  variant: ServiceVariant
  title: string
  description: string
  href: string
  ctaLabel: string
}

export const SERVICES_COPY = {
  eyebrow: 'Services',
  title: 'Ce que je fais',
} as const

export const SERVICES_COPY_EN = {
  eyebrow: 'Services',
  title: 'What I do',
}

export type ServicesCopy = { [K in keyof typeof SERVICES_COPY]: string }

export function getServicesCopy(locale: PublicV2Locale = 'fr'): ServicesCopy {
  return locale === 'en' ? SERVICES_COPY_EN : SERVICES_COPY
}

export const SERVICE_OFFERS: readonly ServiceOffer[] = [
  {
    id: 'web',
    index: '01',
    variant: 'web',
    title: 'Création de sites web',
    description:
      'Sites vitrines, refontes et projets web plus complexes. Je m’occupe autant de l’apparence que du fonctionnement, avec le souci de créer des sites agréables à utiliser et faciles à faire évoluer.',
    href: '/portfolio/projets?type=web',
    ctaLabel: 'En savoir plus →',
  },
  {
    id: 'support',
    index: '02',
    variant: 'support',
    title: 'Soutien informatique',
    description:
      'Dépannage, configuration, installations et accompagnement informatique. Un problème précis à régler ou un environnement de travail à remettre en ordre? Je peux vous aider à y voir plus clair et à trouver une solution.',
    href: '/soutien-informatique-montreal',
    ctaLabel: 'En savoir plus →',
  },
  {
    id: 'software',
    index: '03',
    variant: 'soft',
    title: 'Développement de logiciels',
    description:
      'Des outils et des applications conçus pour des besoins particuliers. Quand les logiciels existants ne conviennent pas, je peux développer quelque chose de plus adapté à votre façon de travailler.',
    href: '/portfolio/projets?type=logiciel',
    ctaLabel: 'En savoir plus →',
  },
] as const

const SERVICE_OFFERS_EN: readonly ServiceOffer[] = [
  {
    id: 'web',
    index: '01',
    variant: 'web',
    title: 'Website design & development',
    description:
      'Brochure sites, redesigns, and more involved web projects. I care as much about how it looks as how it works — sites that are pleasant to use and straightforward to grow.',
    href: '/portfolio/projets?type=web',
    ctaLabel: 'Learn more →',
  },
  {
    id: 'support',
    index: '02',
    variant: 'support',
    title: 'IT support',
    description:
      'Troubleshooting, setup, installs, and hands-on tech help. Whether you’re stuck on one issue or need your workspace back in shape, I can help you see what’s going on and find a fix.',
    href: '/soutien-informatique-montreal',
    ctaLabel: 'Learn more →',
  },
  {
    id: 'software',
    index: '03',
    variant: 'soft',
    title: 'Custom software',
    description:
      'Tools and apps built for specific needs. When off-the-shelf software doesn’t fit, I can build something that matches how you actually work.',
    href: '/portfolio/projets?type=logiciel',
    ctaLabel: 'Learn more →',
  },
]

export function getServiceOffers(locale: PublicV2Locale = 'fr'): readonly ServiceOffer[] {
  return locale === 'en' ? SERVICE_OFFERS_EN : SERVICE_OFFERS
}