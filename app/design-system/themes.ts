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
  },
  neon: {
    name: 'Neon',
    primary: '#00ff88',
    secondary: '#ff0080',
    accent: '#00ffff',
    bg: dimHex('#0a0a0a', DIM_AMOUNT),
    bg2: dimHex('#000000', DIM_AMOUNT),
  },
  sunset: {
    name: 'Sunset',
    primary: '#ff6b35',
    secondary: '#ff1744',
    accent: '#ffd700',
    bg: dimHex('#2d1b1b', DIM_AMOUNT),
    bg2: dimHex('#1a0f0f', DIM_AMOUNT),
  },
  ocean: {
    name: 'Ocean',
    primary: '#00bcd4',
    secondary: '#2196f3',
    accent: '#4fc3f7',
    bg: dimHex('#0f172a', DIM_AMOUNT),
    bg2: dimHex('#0a0f1a', DIM_AMOUNT),
  },
  forest: {
    name: 'Forest',
    primary: '#4caf50',
    secondary: '#8bc34a',
    accent: '#cddc39',
    bg: dimHex('#0f1f0f', DIM_AMOUNT),
    bg2: dimHex('#0a1a0a', DIM_AMOUNT),
  },
  cyber: {
    name: 'Cyber',
    primary: '#9c27b0',
    secondary: '#e91e63',
    accent: '#ff9800',
    bg: dimHex('#1a0a1a', DIM_AMOUNT),
    bg2: dimHex('#0f0a1a', DIM_AMOUNT),
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

/**
 * Obtenir le thème par défaut
 */
export function getDefaultTheme(): Theme {
  return THEMES.default
}


