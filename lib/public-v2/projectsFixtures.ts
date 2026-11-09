/**
 * Fixtures synthétiques — tests et aperçu sandbox uniquement.
 * Alignées sur le contrat public GET /api/projects (champs Prisma Project).
 * Ne jamais servir comme repli silencieux sur la route publique.
 */

import type { CatalogProject, TimelendrLatestLinks } from './projectsContent'

/** Jeu principal — couvre web/logiciel, audiences, image/absence, liens, plateformes, planifié. */
export const PROJECTS_FIXTURES: CatalogProject[] = [
  {
    id: 101,
    name: 'Atelier Nordique',
    description:
      'Site vitrine pour un studio artisanal — présentation claire, parcours de prise de contact et mise en avant des pièces. Texte long volontaire pour valider le clamp et « Lire la suite », sans inventer de résultats commerciaux.',
    technologies: 'Next.js, TypeScript, CSS',
    status: 'terminé',
    projectType: 'web',
    webAudience: 'professional',
    displayOrder: 1,
    url: '/demos/studio',
    siteUrl: '/demos/studio',
  },
  {
    id: 103,
    name: 'Cabinet Claire',
    description: 'Refonte courte : navigation et formulaire de demande.',
    technologies: 'WordPress',
    status: 'terminé',
    projectType: 'web',
    webAudience: 'professional',
    displayOrder: 2,
    url: 'https://example.com/cabinet-claire',
    siteUrl: 'https://example.com/cabinet-claire',
  },
  {
    id: 104,
    name: 'Maison Boréale',
    description:
      'Présentation d’une offre de rénovation résidentielle, avec sections services et prise de rendez-vous. Description allongée pour une deuxième carte longue dans la même grille.',
    technologies: 'Astro, CSS',
    status: 'en cours',
    projectType: 'web',
    webAudience: 'professional',
    displayOrder: 3,
    url: '/demos/construction',
    siteUrl: '/demos/construction',
  },
  {
    id: 105,
    name: 'Studio Lumen',
    description: 'Landing page sobre pour un photographe indépendant.',
    technologies: 'HTML, CSS',
    status: 'terminé',
    projectType: 'web',
    webAudience: 'professional',
    displayOrder: 4,
    url: 'https://example.com/studio-lumen',
    siteUrl: 'https://example.com/studio-lumen',
  },
  {
    id: 106,
    name: 'Marché du coin',
    description: 'Petit site de présence pour un commerce de proximité — sans image jointe.',
    technologies: 'Shopify',
    status: 'terminé',
    projectType: 'web',
    webAudience: 'professional',
    displayOrder: 5,
    url: 'https://example.com/marche',
    siteUrl: 'https://example.com/marche',
  },
  {
    id: 107,
    name: 'Clinique Horizon',
    description: 'Site informatif avec formulaires de contact et horaires.',
    technologies: 'Next.js, Tailwind',
    status: 'terminé',
    projectType: 'web',
    webAudience: 'professional',
    displayOrder: 6,
    url: 'https://example.com/clinique',
    siteUrl: 'https://example.com/clinique',
  },
  {
    id: 108,
    name: 'Agence Rive',
    description: 'Prototype de vitrine pour une agence de communication — statut planifié, pas encore en ligne.',
    technologies: 'Figma, Next.js',
    status: 'planifié',
    projectType: 'web',
    webAudience: 'professional',
    displayOrder: 7,
    url: '',
    siteUrl: null,
  },
  {
    id: 102,
    name: 'Carnet personnel',
    description: 'Petit projet web personnel pour expérimenter une composition éditoriale.',
    technologies: 'React, CSS',
    status: 'en cours',
    projectType: 'web',
    webAudience: 'personal',
    displayOrder: 10,
    url: '/demos/portfolio',
    siteUrl: '/demos/portfolio',
  },
  {
    id: 201,
    name: 'DeskDot',
    description: 'Lanceur radial pour Windows — vitrine produit IJIPOP.',
    technologies: 'Rust, Windows',
    status: 'terminé',
    projectType: 'logiciel',
    displayOrder: 1,
    url: '/deskdot',
    siteUrl: '/deskdot',
    windowsUrl: '/deskdot',
    imageUrl: '/img/deskdot/deskdot2.png',
  },
  {
    id: 202,
    name: 'Timelendr',
    description: 'Outil de suivi du temps — téléchargements Windows et macOS distincts.',
    technologies: 'TypeScript',
    status: 'terminé',
    projectType: 'logiciel',
    displayOrder: 2,
    url: '/logiciel/timelendr',
    siteUrl: '/logiciel/timelendr',
  },
  {
    id: 203,
    name: 'Boîte à outils',
    description: 'Utilitaire prêt à télécharger — un seul lien générique, sans image.',
    technologies: 'C#',
    status: 'terminé',
    projectType: 'logiciel',
    displayOrder: 3,
    url: '',
    downloadUrl: 'https://example.com/boite-outils-fixture.zip',
  },
  {
    id: 204,
    name: 'Aide-mémoire',
    description: 'Logiciel planifié — aucun téléchargement disponible pour l’instant.',
    technologies: 'Rust',
    status: 'planifié',
    projectType: 'logiciel',
    displayOrder: 4,
    url: '',
  },
  {
    id: 205,
    name: 'Dual Pack',
    description: 'Exemple générique avec installateurs Windows et macOS différents (sans produit nommé en dur).',
    technologies: 'Electron',
    status: 'terminé',
    projectType: 'logiciel',
    displayOrder: 5,
    url: 'https://example.com/dual-pack',
    siteUrl: 'https://example.com/dual-pack',
    windowsUrl: 'https://example.com/dual-pack-win.exe',
    macosUrl: 'https://example.com/dual-pack-mac.dmg',
  },
]

/** Jeux réduits pour tests de grille 1 / 2 / 3 / 4+ cartes. */
export function fixturesWebProfessional(count: number): CatalogProject[] {
  return PROJECTS_FIXTURES.filter((p) => p.projectType === 'web' && p.webAudience !== 'personal').slice(
    0,
    count,
  )
}

export function fixturesSoftware(count: number): CatalogProject[] {
  return PROJECTS_FIXTURES.filter((p) => p.projectType === 'logiciel').slice(0, count)
}

export const TIMELENDR_FIXTURES: TimelendrLatestLinks = {
  windowsUrl: 'https://example.com/timelendr-win-fixture.exe',
  macosUrl: 'https://example.com/timelendr-mac-fixture.dmg',
}
