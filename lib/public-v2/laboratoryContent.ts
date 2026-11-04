/**
 * Copy provisoire — section Laboratoire V2 (sandbox).
 * Les démos mises en vedette viennent du catalogue partagé (`lib/content/demos-catalog`).
 */

import {
  getHomeLabFeaturedDemos,
  type DemoCatalogEntry,
} from '@/lib/content/demos-catalog'

export const LABORATORY_COPY = {
  eyebrow: 'Laboratoire interactif',
  title: 'Assez parlé. Essayez!',
  lead:
    'Explorez quelques expériences interactives et découvrez concrètement ce que je peux concevoir. Ce sont des démonstrations de style — pas des sites clients.',
  badge: 'Démonstration',
  ctaLabel: 'Explorer la démo',
  catalogLinkLabel: 'Voir toutes les démos',
  catalogHref: '/demos',
  hint: 'Aperçus légers — les boutons ouvrent les vraies pages /demos du site.',
} as const

export type LaboratoryFeature = {
  id: DemoCatalogEntry['id']
  href: DemoCatalogEntry['href']
  title: string
  description: string
  previewSrc: string
  previewAlt: string
}

/** Descriptions courtes Concept D pour l’accueil — titres/routes restent ceux du catalogue. */
const LAB_BLURBS: Record<string, string> = {
  restaurant: 'Ambiance chaude, menu et réservation — une vitrine « carte postale ».',
  construction: 'Ton industriel, preuves terrain et devis clair pour les chantiers.',
  wellness: 'Composition douce et aérée — spa, yoga ou coaching.',
}

export function getLaboratoryFeatures(): LaboratoryFeature[] {
  return getHomeLabFeaturedDemos().map((demo) => ({
    id: demo.id,
    href: demo.href,
    title: demo.title,
    description: LAB_BLURBS[demo.id] ?? demo.description,
    previewSrc: demo.previewSrc!,
    previewAlt: demo.previewAlt ?? `Aperçu ${demo.title}`,
  }))
}
