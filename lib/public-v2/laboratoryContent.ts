/**
 * Copy provisoire — section Laboratoire V2 (sandbox).
 * Les démos mises en vedette viennent du catalogue partagé (`lib/content/demos-catalog`).
 */

import {
  getHomeLabFeaturedDemos,
  type DemoCatalogEntry,
} from '@/lib/content/demos-catalog'
import type { PublicV2Locale } from './locale'

export const LABORATORY_COPY = {
  eyebrow: 'Laboratoire interactif',
  title: 'Assez parlé. Essayez!',
  lead:
    'Explorez quelques expériences interactives et découvrez concrètement ce que je peux concevoir. Ce sont des démonstrations de style — pas des sites clients.',
  badge: 'Démonstration',
  ctaLabel: 'Explorer la démo',
  catalogLinkLabel: 'Voir toutes les démos',
  catalogHref: '/demos',
} as const

export const LABORATORY_COPY_EN = {
  eyebrow: 'Interactive lab',
  title: 'Enough talk. Try it!',
  lead:
    'Explore a few interactive experiences and see what I can build. These are style demos — not client sites.',
  badge: 'Demo',
  ctaLabel: 'Explore the demo',
  catalogLinkLabel: 'View all demos',
  catalogHref: '/demos',
}

export type LaboratoryCopy = { [K in keyof typeof LABORATORY_COPY]: string }

export function getLaboratoryCopy(locale: PublicV2Locale = 'fr'): LaboratoryCopy {
  return locale === 'en' ? LABORATORY_COPY_EN : LABORATORY_COPY
}

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

const LAB_BLURBS_EN: Record<string, string> = {
  restaurant: 'Warm atmosphere, menu, and reservations — a postcard-style showcase.',
  construction: 'Industrial tone, field proof, and clear quotes for job sites.',
  wellness: 'Soft, airy layout — spa, yoga, or coaching.',
}

function getLabBlurbs(locale: PublicV2Locale): Record<string, string> {
  return locale === 'en' ? LAB_BLURBS_EN : LAB_BLURBS
}

export function getLaboratoryFeatures(locale: PublicV2Locale = 'fr'): LaboratoryFeature[] {
  const blurbs = getLabBlurbs(locale)
  const previewAltPrefix = locale === 'en' ? 'Preview of' : 'Aperçu'
  return getHomeLabFeaturedDemos().map((demo) => ({
    id: demo.id,
    href: demo.href,
    title: demo.title,
    description: blurbs[demo.id] ?? demo.description,
    previewSrc: demo.previewSrc!,
    previewAlt: demo.previewAlt ?? `${previewAltPrefix} ${demo.title}`,
  }))
}