/**
 * Catalogue unique des démonstrations web du portfolio.
 * Source partagée : page /demos + sélection Laboratoire V2.
 * Pas de Prisma / API. Ne pas dupliquer cette liste ailleurs.
 */

export const DEMO_THUMB_TOKENS = [
  'construction',
  'restaurant',
  'tech',
  'wellness',
  'studio',
  'spectacle',
  'portfolio',
  'galerie',
  'volt',
] as const

export type DemoThumbToken = (typeof DEMO_THUMB_TOKENS)[number]

export type DemoCatalogEntry = {
  id: DemoThumbToken
  href: `/demos/${DemoThumbToken}`
  title: string
  description: string
  thumbToken: DemoThumbToken
  /** Aperçu pour sections éditoriales (Laboratoire). Optionnel pour les non-featured. */
  previewSrc?: string
  previewAlt?: string
}

/**
 * Ordre du hub /demos — ne pas réordonner sans intention éditoriale.
 */
export const DEMOS_CATALOG: readonly DemoCatalogEntry[] = [
  {
    id: 'construction',
    href: '/demos/construction',
    title: 'Construction & rénovation',
    description: 'Ton industriel, preuves terrain, devis clair — chantiers mis en avant.',
    thumbToken: 'construction',
    previewSrc: '/demos/construction/hero.jpg',
    previewAlt: 'Aperçu de la démonstration Construction & rénovation',
  },
  {
    id: 'restaurant',
    href: '/demos/restaurant',
    title: 'Restaurant & chef',
    description: 'Chaleur, menu, réservation — ambiance « carte postale ».',
    thumbToken: 'restaurant',
    previewSrc: '/demos/restaurant/gallery-01.jpg',
    previewAlt: 'Aperçu de la démonstration Restaurant & chef',
  },
  {
    id: 'tech',
    href: '/demos/tech',
    title: 'Produit SaaS tech',
    description: 'Sombre, contraste fort, sections produit et confiance.',
    thumbToken: 'tech',
  },
  {
    id: 'wellness',
    href: '/demos/wellness',
    title: 'Bien-être & spa',
    description: 'Ambiance douce et aérée — spa, yoga ou coaching.',
    thumbToken: 'wellness',
    previewSrc: '/demos/wellness/ritual-01.jpg',
    previewAlt: 'Aperçu de la démonstration Bien-être & spa',
  },
  {
    id: 'studio',
    href: '/demos/studio',
    title: 'Studio créatif',
    description: 'Éditorial fort, serif & contrastes — direction artistique et édition.',
    thumbToken: 'studio',
  },
  {
    id: 'spectacle',
    href: '/demos/spectacle',
    title: 'Saison & spectacle',
    description: 'Salle culturelle, affiche et or — programmation et billetterie.',
    thumbToken: 'spectacle',
  },
  {
    id: 'portfolio',
    href: '/demos/portfolio',
    title: 'Portfolio créateur',
    description: 'Sobre, premium, bento — vitrine développeur web à Montréal.',
    thumbToken: 'portfolio',
  },
  {
    id: 'galerie',
    href: '/demos/galerie',
    title: 'Galerie minimaliste',
    description: 'Créatif punchy — grille serrée, overlay sombre, projets cliquables.',
    thumbToken: 'galerie',
  },
  {
    id: 'volt',
    href: '/demos/volt',
    title: 'Streetwear VOLT',
    description:
      'Over-the-top — hero sticky, photos qui glissent, marquee et lookbook cinéma.',
    thumbToken: 'volt',
  },
] as const

/** Sélection éditoriale Laboratoire (Concept D) — ordre d’affichage. */
export const HOME_LAB_FEATURED_IDS = ['restaurant', 'construction', 'wellness'] as const

export type HomeLabFeaturedId = (typeof HOME_LAB_FEATURED_IDS)[number]

export function getDemoById(id: string): DemoCatalogEntry | undefined {
  return DEMOS_CATALOG.find((demo) => demo.id === id)
}

export function getHomeLabFeaturedDemos(): DemoCatalogEntry[] {
  return HOME_LAB_FEATURED_IDS.map((id) => {
    const demo = getDemoById(id)
    if (!demo || !demo.previewSrc) {
      throw new Error(`Demo featured manquante ou sans preview: ${id}`)
    }
    return demo
  })
}
