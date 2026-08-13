import { DEMOS_HUB_LINK_LABEL } from '../demoLabels'

export const SITE = {
  brand: 'Ligne claire',
  navProjects: 'Travaux',
  navInfo: 'À propos',
  viewProject: 'Voir',
} as const

export type GalerieProject = {
  id: string
  title: string
  category: string
  href: string
  tone: 'sage' | 'clay' | 'ink' | 'mist' | 'sand' | 'slate' | 'dusk' | 'fern' | 'rose' | 'ocean' | 'amber'
  src: string
}

/** Mandats fictifs — liens .demo, vitrine illustrative uniquement. */
export const PROJECTS: GalerieProject[] = [
  {
    id: 'maison-nord',
    title: 'Maison Nord',
    category: 'Identité · éditorial',
    href: 'https://maison-nord.demo',
    tone: 'sage',
    src: '/demos/galerie/tile-01.jpg',
  },
  {
    id: 'atelier-lumiere',
    title: 'Atelier Lumière',
    category: 'Site vitrine',
    href: 'https://atelier-lumiere.demo',
    tone: 'clay',
    src: '/demos/galerie/tile-02.jpg',
  },
  {
    id: 'collectif-rivage',
    title: 'Collectif Rivage',
    category: 'Campagne print',
    href: 'https://collectif-rivage.demo',
    tone: 'ink',
    src: '/demos/galerie/tile-03.jpg',
  },
  {
    id: 'studio-forme',
    title: 'Studio Forme',
    category: 'Direction artistique',
    href: 'https://studio-forme.demo',
    tone: 'mist',
    src: '/demos/galerie/tile-04.jpg',
  },
  {
    id: 'cabinet-ora',
    title: 'Cabinet Ora',
    category: 'Refonte web',
    href: 'https://cabinet-ora.demo',
    tone: 'sand',
    src: '/demos/galerie/tile-05.jpg',
  },
  {
    id: 'festival-allee',
    title: 'Festival Allée',
    category: 'Affichage · signalétique',
    href: 'https://festival-allee.demo',
    tone: 'slate',
    src: '/demos/galerie/tile-06.jpg',
  },
  {
    id: 'boulangerie-mur',
    title: 'Boulangerie Mur',
    category: 'Packaging',
    href: 'https://boulangerie-mur.demo',
    tone: 'dusk',
    src: '/demos/galerie/tile-07.jpg',
  },
  {
    id: 'terre-vive',
    title: 'Terre Vive',
    category: 'Branding',
    href: 'https://terre-vive.demo',
    tone: 'fern',
    src: '/demos/galerie/tile-08.jpg',
  },
  {
    id: 'galerie-sable',
    title: 'Galerie Sable',
    category: 'Exposition',
    href: 'https://galerie-sable.demo',
    tone: 'rose',
    src: '/demos/galerie/tile-09.jpg',
  },
  {
    id: 'accord-type',
    title: 'Accord Type',
    category: 'Typographie',
    href: 'https://accord-type.demo',
    tone: 'ocean',
    src: '/demos/galerie/tile-10.jpg',
  },
  {
    id: 'hauteur-studio',
    title: 'Hauteur Studio',
    category: 'Identité locale',
    href: 'https://hauteur-studio.demo',
    tone: 'amber',
    src: '/demos/galerie/tile-11.jpg',
  },
]

export const INFO = {
  title: 'À propos',
  body: 'Designer graphique indépendante à Montréal. Identités, sites vitrine et supports print pour marques qui privilégient la clarté.',
  contactLabel: 'Écrire',
  contactMailto: 'mailto:hello@ligneclaire.demo?subject=Projet%20cr%C3%A9atif',
  note: 'Projets fictifs — exemple de mise en page.',
} as const

export const FOOTER = {
  copyright: '© 2026 Ligne claire',
  backLabel: DEMOS_HUB_LINK_LABEL,
} as const
