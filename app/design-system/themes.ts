/**
 * Définitions centralisées de tous les thèmes
 * Source unique de vérité pour les palettes de couleurs
 */

import { dimHex } from '../utils/colorUtils'

const DIM_AMOUNT = 0.45

export const THEMES = {
  default: {
    name: 'Default',
    primary: '#2563eb',
    secondary: '#475569',
    accent: '#38bdf8',
    bg: '#0f172a',
    bg2: '#1e293b',
    isDefault: true,
    moodHint: 'sobre, professionnel, bleu',
  },
  neon: {
    name: 'Neon',
    primary: '#00ff88',
    secondary: '#ff0080',
    accent: '#00ffff',
    bg: dimHex('#0a0a0a', DIM_AMOUNT),
    bg2: dimHex('#000000', DIM_AMOUNT),
    moodHint: 'énergique, moderne, vif, vert/rose',
  },
  sunset: {
    name: 'Sunset',
    primary: '#ff6b35',
    secondary: '#ff1744',
    accent: '#ffd700',
    bg: dimHex('#2d1b1b', DIM_AMOUNT),
    bg2: dimHex('#1a0f0f', DIM_AMOUNT),
    moodHint: 'chaleureux, doux, orange/rouge',
  },
  ocean: {
    name: 'Ocean',
    primary: '#00bcd4',
    secondary: '#2196f3',
    accent: '#4fc3f7',
    bg: dimHex('#0f172a', DIM_AMOUNT),
    bg2: dimHex('#0a0f1a', DIM_AMOUNT),
    moodHint: 'calme, serein, bleu/cyan',
  },
  forest: {
    name: 'Forest',
    primary: '#4caf50',
    secondary: '#8bc34a',
    accent: '#cddc39',
    bg: dimHex('#0f1f0f', DIM_AMOUNT),
    bg2: dimHex('#0a1a0a', DIM_AMOUNT),
    moodHint: 'apaisant, nature, vert',
  },
  cyber: {
    name: 'Cyber',
    primary: '#9c27b0',
    secondary: '#e91e63',
    accent: '#ff9800',
    bg: dimHex('#1a0a1a', DIM_AMOUNT),
    bg2: dimHex('#0f0a1a', DIM_AMOUNT),
    moodHint: 'tech, intense, violet/rose',
  },
  calm: {
    name: 'Calm',
    primary: '#a5b4fc',
    secondary: '#818cf8',
    accent: '#c4b5fd',
    bg: dimHex('#1e1b4b', DIM_AMOUNT),
    bg2: dimHex('#312e81', DIM_AMOUNT),
    moodHint: 'sérénité, repos, décompresser, lavande',
  },
  midnight: {
    name: 'Midnight',
    primary: '#6366f1',
    secondary: '#4f46e5',
    accent: '#818cf8',
    bg: dimHex('#0f0a1f', DIM_AMOUNT),
    bg2: dimHex('#1e1b4b', DIM_AMOUNT),
    moodHint: 'nuit, concentré, mystérieux, violet',
  },
  aurora: {
    name: 'Aurora',
    primary: '#14b8a6',
    secondary: '#8b5cf6',
    accent: '#22d3ee',
    bg: dimHex('#042f2e', DIM_AMOUNT),
    bg2: dimHex('#1e1b4b', DIM_AMOUNT),
    moodHint: 'rêveur, inspiré, magique, aurore boréale',
  },
  coral: {
    name: 'Coral',
    primary: '#fb7185',
    secondary: '#f97316',
    accent: '#fda4af',
    bg: dimHex('#431407', DIM_AMOUNT),
    bg2: dimHex('#7f1d1d', DIM_AMOUNT),
    moodHint: 'douceur, bienveillance, tendre, corail',
  },
  gold: {
    name: 'Gold',
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#fcd34d',
    bg: dimHex('#292524', DIM_AMOUNT),
    bg2: dimHex('#44403c', DIM_AMOUNT),
    moodHint: 'luxe, chaleur, confiance, or/ambre',
  },
  mint: {
    name: 'Mint',
    primary: '#34d399',
    secondary: '#6ee7b7',
    accent: '#a7f3d0',
    bg: dimHex('#052e16', DIM_AMOUNT),
    bg2: dimHex('#14532d', DIM_AMOUNT),
    moodHint: 'fraîcheur, légèreté, renouveau, menthe',
  },
  wine: {
    name: 'Wine',
    primary: '#b91c1c',
    secondary: '#991b1b',
    accent: '#f87171',
    bg: dimHex('#1c1917', DIM_AMOUNT),
    bg2: dimHex('#450a0a', DIM_AMOUNT),
    moodHint: 'élégant, profond, raffiné, bordeaux',
  },
  ice: {
    name: 'Ice',
    primary: '#22d3ee',
    secondary: '#67e8f9',
    accent: '#a5f3fc',
    bg: dimHex('#0c4a6e', DIM_AMOUNT),
    bg2: dimHex('#0e7490', DIM_AMOUNT),
    moodHint: 'froid, pur, minimal, glace',
  },
  ember: {
    name: 'Ember',
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#fdba74',
    bg: dimHex('#1c1917', DIM_AMOUNT),
    bg2: dimHex('#431407', DIM_AMOUNT),
    moodHint: 'intense, passion, braise, feu',
  },
  /** Palette sobre (mode « Site » / beige) — crème + accents bleu ardoise (moins saturé que le bleu « web ») */
  latte: {
    name: 'Latte',
    primary: '#3d5266',
    secondary: '#6f655c',
    accent: '#5f7d8e',
    bg: '#f7f3eb',
    bg2: '#efe8dc',
    moodHint: 'portfolio client, crème latte, bleu ardoise et taupe pour lier au beige',
  },
} as const

export type ThemeName = keyof typeof THEMES

export type Theme = typeof THEMES[ThemeName]

export interface PaletteTokens {
  primary: string
  secondary: string
  accent: string
  hover: {
    background: string
    shadow: string
    glow: string
  }
}

/**
 * Obtenir un thème par son nom
 */
export function getTheme(themeName: ThemeName): Theme {
  return THEMES[themeName]
}

/**
 * Obtenir les tokens de palette (couleurs + hover) d'un thème
 */
export function getPaletteTokens(themeName: ThemeName): PaletteTokens {
  const theme = THEMES[themeName] || THEMES.default
  const primary = theme.primary
  const secondary = theme.secondary
  const accent = theme.accent

  return {
    primary,
    secondary,
    accent,
    hover: {
      background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 25%, ${accent} 50%, ${primary} 75%, ${primary} 100%)`,
      shadow: primary,
      glow: secondary,
    },
  }
}

/**
 * Obtenir tous les noms de thèmes disponibles
 */
export function getAvailableThemes(): ThemeName[] {
  return Object.keys(THEMES) as ThemeName[]
}

/** Thèmes affichés en mode Créa (exclut latte, réservé au mode Site) */
export function getDevThemeChoices(): ThemeName[] {
  return (Object.keys(THEMES) as ThemeName[]).filter((name) => name !== 'latte')
}

/**
 * Obtenir le thème par défaut
 */
export function getDefaultTheme(): Theme {
  return THEMES.default
}


