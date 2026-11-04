/**
 * Textes provisoires — section Services (sandbox V2).
 * Facile à éditer. Pas la rédaction définitive du site.
 * Destinations = routes SEO existantes (ne pas inventer).
 */

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
  lead: 'Des offres claires — du site web à l’outil sur mesure, en passant par le soutien du quotidien.',
} as const

export const SERVICE_OFFERS: readonly ServiceOffer[] = [
  {
    id: 'web',
    index: '01',
    variant: 'web',
    title: 'Création de sites web',
    description:
      'Sites vitrines, refontes et projets web plus complexes. Je m’occupe autant de l’apparence que du fonctionnement, avec le souci de créer des sites agréables à utiliser et faciles à faire évoluer.',
    href: '/creation-site-web-montreal',
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
    href: '/logiciel',
    ctaLabel: 'En savoir plus →',
  },
] as const
