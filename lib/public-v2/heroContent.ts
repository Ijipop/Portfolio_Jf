/**
 * Textes provisoires du Hero V2 — source unique, facile à modifier.
 * Pas la rédaction définitive du site. Ne pas remplacer par des slogans.
 */

export const HERO_COPY = {
  kicker: 'Développeur indépendant · Montréal',
  /**
   * Titre affiché ; `titleLines` sert à l’animation d’entrée (deux lignes).
   * Doit rester équivalent au texte provisoire approuvé.
   */
  title: 'Des sites web, des logiciels et du soutien informatique.',
  titleLines: ['Des sites web, des logiciels ', 'et du soutien informatique.'] as const,
  description:
    'Je suis Jean-François Lefebvre. Je conçois des sites web, je développe des logiciels et j’offre du soutien informatique. Je travaille à mon compte, à Montréal.',
  primaryCta: {
    label: 'Voir mes réalisations',
    href: '/portfolio/projets',
  },
  secondaryCta: {
    label: 'Me contacter',
    href: '/portfolio/contact',
  },
} as const

export type HeroFloatSlot = 'a' | 'b' | 'c'

export type HeroFloatMedia = {
  id: string
  slot: HeroFloatSlot
  src: string
  alt: string
  /** false = capture client temporaire, non autorisée à la publication. */
  publishable: boolean
}

/**
 * Collage Hero — hiérarchie visuelle :
 * Expression (dominant) → Thermo (secondaire) → DeskDot (tertiaire).
 * SpaceTaker volontairement absent.
 * DeskDot : deskdot2.png retenu pour lisibilité des Dots à petite taille.
 */
export const HERO_FLOATS: readonly HeroFloatMedia[] = [
  {
    id: 'expression-lasalle',
    slot: 'a',
    src: '/img/v2-sandbox/expression-lasalle-desktop.png',
    alt: 'Aperçu Expression LaSalle — preview interne, publication non autorisée',
    publishable: false,
  },
  {
    id: 'thermo-trappeur',
    slot: 'b',
    src: '/img/v2-sandbox/thermo-trappeur-desktop.png',
    alt: 'Aperçu Thermo-Trappeur — preview interne, publication non autorisée',
    publishable: false,
  },
  {
    id: 'deskdot',
    slot: 'c',
    src: '/img/deskdot/deskdot2.png',
    alt: 'Capture d’écran de DeskDot, anneau de raccourcis pour Windows',
    publishable: true,
  },
] as const
