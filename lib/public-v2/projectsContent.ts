/**
 * Copy provisoire — catalogue Réalisations V2.
 * Données projets = GET /api/projects (pas un second catalogue).
 *
 * LIMITATION EN (Phase D) : `Project.name` / `Project.description` (Neon) n’ont pas
 * de twin bilingue. En mode EN, l’UI catalogue est traduite mais les titres et
 * descriptions dynamiques restent en FR (fallback explicite). Ce n’est **pas**
 * une expérience EN Production-ready tant qu’une stratégie éditoriale Neon n’est
 * pas décidée. Pas de migration ni de traduction automatique dans ce chantier.
 */

import type { PublicV2Locale } from './locale'

export const PROJECTS_COPY = {
  eyebrow: 'Réalisations',
  title: 'Projets',
  lead: 'Mes sites web, mes logiciels et mes autres réalisations.',
  typeWeb: 'Sites web',
  typeSoftware: 'Logiciels',
  audienceProfessional: 'Mandats clients',
  audiencePersonal: 'Projets personnels',
  audienceProfessionalLead:
    'Sites livrés pour des entreprises et professionnels — vitrines claires, orientées demandes.',
  audiencePersonalLead:
    'Expériences et outils personnels — utiles pour voir mon approche hors mandat client.',
  audienceEmpty: 'Aucun projet dans cette catégorie pour le moment.',
  emptyWeb: 'Aucun site web à afficher pour le moment.',
  emptySoftware: 'Aucun logiciel à afficher pour le moment.',
  comingSoon: 'D’autres réalisations s’ajouteront ici au fil des mandats.',
  /** Compteur discret barre de filtres — `{count}` remplacé à l’affichage. */
  resultsCountOne: '1 réalisation',
  resultsCountMany: '{count} réalisations',
  loading: 'Chargement des réalisations…',
  errorLoad: 'Erreur lors du chargement des projets.',
  errorNetwork: 'Erreur de connexion.',
  viewProject: 'Voir le projet',
  viewSite: 'Voir le site',
  openApp: 'Ouvrir',
  downloadProject: 'Télécharger',
  downloadWindows: 'Télécharger pour Windows',
  downloadMacos: 'Télécharger pour macOS',
  downloadTimelendrPc: 'Télécharger Timelendr PC',
  downloadTimelendrMacos: 'Télécharger Timelendr macOS',
  metaRoleWeb: 'Site web',
  metaRoleSoftware: 'Logiciel',
  metaRoleBrowserApp: 'Application web',
  statusTermine: 'Terminé',
  statusWip: 'En cours',
  statusPlanifie: 'Planifié',
  demosCtaTitle: 'Voir aussi les démonstrations',
  demosCtaBody: 'Ambiances et mises en page d’exemple — distinctes des mandats clients.',
  demosCtaLabel: 'Explorer les démos',
  demosHref: '/demos',
  softwareCtaTitle: 'Un outil sur mesure?',
  softwareCtaBody:
    'Si vous avez besoin d’un outil adapté à votre façon de travailler, écrivez-moi.',
  softwareCtaLabel: 'Me contacter',
  softwareCtaHref: '/portfolio/contact?subject=Logiciel',
  readMore: 'Lire la suite',
  readLess: 'Réduire',
} as const

export const PROJECTS_COPY_EN = {
  eyebrow: 'Work',
  title: 'Projects',
  lead: 'Websites, software, and other work I have shipped.',
  typeWeb: 'Websites',
  typeSoftware: 'Software',
  audienceProfessional: 'Client work',
  audiencePersonal: 'Personal projects',
  audienceProfessionalLead:
    'Sites built for businesses and professionals — clear, enquiry-focused showcases.',
  audiencePersonalLead:
    'Personal experiments and tools — a glimpse at how I work outside client mandates.',
  audienceEmpty: 'No projects in this category right now.',
  emptyWeb: 'No websites to show right now.',
  emptySoftware: 'No software to show right now.',
  comingSoon: 'More work will be added here as new projects land.',
  resultsCountOne: '1 project',
  resultsCountMany: '{count} projects',
  loading: 'Loading projects…',
  errorLoad: 'Could not load projects.',
  errorNetwork: 'Connection error.',
  viewProject: 'View project',
  viewSite: 'View site',
  openApp: 'Open',
  downloadProject: 'Download',
  downloadWindows: 'Download for Windows',
  downloadMacos: 'Download for macOS',
  downloadTimelendrPc: 'Download Timelendr PC',
  downloadTimelendrMacos: 'Download Timelendr for macOS',
  metaRoleWeb: 'Website',
  metaRoleSoftware: 'Software',
  metaRoleBrowserApp: 'Web app',
  statusTermine: 'Completed',
  statusWip: 'In progress',
  statusPlanifie: 'Planned',
  demosCtaTitle: 'See the demos too',
  demosCtaBody: 'Sample layouts and vibes — separate from client work.',
  demosCtaLabel: 'Browse demos',
  demosHref: '/demos',
  softwareCtaTitle: 'Need a custom tool?',
  softwareCtaBody:
    'If you need something tailored to how you work, drop me a line.',
  softwareCtaLabel: 'Contact me',
  softwareCtaHref: '/portfolio/contact?subject=Logiciel',
  readMore: 'Read more',
  readLess: 'Show less',
} as const

export type ProjectsCopy = { [K in keyof typeof PROJECTS_COPY]: string }

export function getProjectsCopy(locale: PublicV2Locale = 'fr'): ProjectsCopy {
  return locale === 'en' ? PROJECTS_COPY_EN : PROJECTS_COPY
}

/** Seuil approximatif pour proposer « Lire la suite » (clamp CSS ~4 lignes). */
export const PROJECT_DESCRIPTION_EXPAND_CHARS = 160

export function sameDestination(a: string | null | undefined, b: string | null | undefined): boolean {
  const left = a?.trim()
  const right = b?.trim()
  if (!left || !right) return false
  return left === right
}

export function isPlannedStatus(status: string): boolean {
  const s = status.toLowerCase()
  return ['planifiee', 'planifié', 'planifiée', 'planifie'].includes(s)
}

export type ProjectTypeFilter = 'web' | 'logiciel'
export type WebAudienceTab = 'professional' | 'personal'

export type CatalogProject = {
  id: number
  name: string
  description: string
  technologies: string
  status: string
  projectType?: 'logiciel' | 'web' | null
  webAudience?: 'personal' | 'professional' | null
  displayOrder?: number | null
  url: string
  siteUrl?: string | null
  downloadUrl?: string | null
  windowsUrl?: string | null
  macosUrl?: string | null
  imageUrl?: string | null
  createdAt?: string
  updatedAt?: string
}

export type TimelendrLatestLinks = {
  windowsUrl: string | null
  macosUrl: string | null
}

export function normalizeStatusLabel(status: string, locale: PublicV2Locale = 'fr'): string {
  const copy = getProjectsCopy(locale)
  const s = status.toLowerCase()
  if (['terminee', 'fini', 'terminé', 'termine'].includes(s)) return copy.statusTermine
  if (['wip', 'en cours', 'en cours de développement'].includes(s)) return copy.statusWip
  if (['planifiee', 'planifié', 'planifiée', 'planifie'].includes(s)) return copy.statusPlanifie
  return status
}

export function sortCatalogProjects(projects: CatalogProject[]): CatalogProject[] {
  return [...projects].sort((a, b) => {
    const orderA = a.displayOrder ?? 0
    const orderB = b.displayOrder ?? 0
    if (orderA !== orderB) return orderA - orderB
    return a.id - b.id
  })
}