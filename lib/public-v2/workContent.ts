/**
 * Sélection éditoriale temporaire pour la sandbox V2 (pas un second catalogue).
 * Prête à brancher les données canoniques `Project` plus tard — sans accès base ici.
 * Médias clients : chemins locaux gitignorés ; publication non autorisée.
 */

export type WorkFeatureRole = 'primary' | 'secondary' | 'soft'

export type WorkBadge = {
  label: string
  variant: 'neutral' | 'accent' | 'success' | 'personal'
}

export type WorkCta = {
  label: string
  href: string
  variant: 'primary' | 'ghost'
  external?: boolean
}

export type WorkFeature = {
  /** Identifiant éditorial local (sandbox). */
  id: string
  /** Slug / clé future pour brancher le catalogue canonique. */
  catalogKey: string
  role: WorkFeatureRole
  title: string
  tags: string
  description: string
  badges: readonly WorkBadge[]
  media: {
    desktopSrc: string
    desktopAlt: string
    phoneSrc?: string
    phoneAlt?: string
    /** Habillage produit (logiciel) vs capture site. */
    kind: 'site' | 'product'
  }
  ctas: readonly WorkCta[]
  legalNote?: string
  /** false = média client temporaire, hors publication. */
  publishable: boolean
}

export const WORK_COPY = {
  eyebrow: 'Réalisations',
  title: 'Quelques réalisations',
  lead: 'Des projets réalisés pour des clients, mais aussi des logiciels que je développe de mon côté.',
  catalogLinkLabel: 'Voir toutes les réalisations →',
  catalogHref: '/portfolio/projets',
  selectionNote:
    'Sélection éditoriale temporaire pour la preview V2 — pas un second catalogue permanent.',
} as const

/**
 * DeskDot — descriptions alignées sur la page produit / i18n existants.
 * Pas d’affirmation de téléchargement stable (statut « bientôt » côté produit).
 */
const DESKDOT_LEAD =
  'Lanceur radial pour Windows. Survole, clique, c’est lancé. Instantané, personnalisable, local sur ta machine.'

export const WORK_FEATURES: readonly WorkFeature[] = [
  {
    id: 'expression-lasalle',
    catalogKey: 'expression-lasalle',
    role: 'primary',
    title: 'Expression LaSalle',
    tags: 'Développement web · Microsoft 365 · Modernisation informatique',
    description:
      'Refonte du site web bilingue et modernisation de l’environnement numérique de l’organisme, incluant la migration vers Microsoft 365 et des services de messagerie. Le site web est encore en finalisation.',
    badges: [
      { label: 'Projet client', variant: 'accent' },
      { label: 'En finalisation', variant: 'neutral' },
    ],
    media: {
      kind: 'site',
      desktopSrc: '/img/v2-sandbox/expression-lasalle-desktop.png',
      desktopAlt: 'Aperçu desktop Expression LaSalle — preview interne, publication non autorisée',
      phoneSrc: '/img/v2-sandbox/expression-lasalle-phone.png',
      phoneAlt: 'Aperçu mobile Expression LaSalle — preview interne, publication non autorisée',
    },
    ctas: [],
    legalNote:
      'Présentation limitée au travail en cours — validation client requise avant usage public. Aucun lien public n’est proposé tant que le site n’est pas disponible.',
    publishable: false,
  },
  {
    id: 'thermo-trappeur',
    catalogKey: 'thermo-trappeur',
    role: 'secondary',
    title: 'Thermo-Trappeur',
    tags: 'Site web commercial · Développement web',
    description:
      'Réalisation d’un site web commercial présentant les produits et services de Thermo-Trappeur, avec une navigation adaptée aux besoins des visiteurs.',
    badges: [
      { label: 'Projet client', variant: 'accent' },
      { label: 'Mandat terminé', variant: 'success' },
    ],
    media: {
      kind: 'site',
      desktopSrc: '/img/v2-sandbox/thermo-trappeur-desktop.png',
      desktopAlt: 'Aperçu desktop Thermo-Trappeur — preview interne, publication non autorisée',
      phoneSrc: '/img/v2-sandbox/thermo-trappeur-phone.png',
      phoneAlt: 'Aperçu mobile Thermo-Trappeur — preview interne, publication non autorisée',
    },
    ctas: [
      {
        label: 'Voir le site',
        href: 'https://www.thermo-trappeur.ca/fr',
        variant: 'primary',
        external: true,
      },
    ],
    legalNote:
      'Marque et captures sujettes aux autorisations du client pour une diffusion publique.',
    publishable: false,
  },
  {
    id: 'deskdot',
    catalogKey: 'deskdot',
    role: 'soft',
    title: 'DeskDot',
    tags: 'Logiciel Windows · Lanceur radial',
    description: DESKDOT_LEAD,
    badges: [
      { label: 'Création personnelle', variant: 'personal' },
      { label: 'Logiciel Windows', variant: 'neutral' },
    ],
    media: {
      kind: 'product',
      desktopSrc: '/img/deskdot/deskdot2.png',
      desktopAlt: 'Capture d’écran de DeskDot, anneau de raccourcis pour Windows',
    },
    ctas: [
      {
        label: 'Voir la page produit',
        href: '/deskdot',
        variant: 'primary',
      },
    ],
    publishable: true,
  },
] as const
