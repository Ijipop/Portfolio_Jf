/**
 * Définitions centralisées de tous les thèmes
 * Source unique de vérité pour les palettes de couleurs
 */

export const THEMES = {
  default: {
    name: 'Default',
    primary: '#1e3a8a',
    secondary: '#059669',
    accent: '#ff6b35',
    bg: '#f8fafc',
    bg2: '#ffffff',
    isDefault: true,
  },
  neon: {
    name: 'Neon',
    primary: '#00ff88',
    secondary: '#ff0080',
    accent: '#00ffff',
    bg: '#0a0a0a',
    bg2: '#000000',
  },
  sunset: {
    name: 'Sunset',
    primary: '#ff6b35',
    secondary: '#ff1744',
    accent: '#ffd700',
    bg: '#2d1b1b',
    bg2: '#1a0f0f',
  },
  ocean: {
    name: 'Ocean',
    primary: '#00bcd4',
    secondary: '#2196f3',
    accent: '#4fc3f7',
    bg: '#0f172a',
    bg2: '#0a0f1a',
  },
  forest: {
    name: 'Forest',
    primary: '#4caf50',
    secondary: '#8bc34a',
    accent: '#cddc39',
    bg: '#0f1f0f',
    bg2: '#0a1a0a',
  },
  cyber: {
    name: 'Cyber',
    primary: '#9c27b0',
    secondary: '#e91e63',
    accent: '#ff9800',
    bg: '#1a0a1a',
    bg2: '#0f0a1a',
  },
} as const

export type ThemeName = keyof typeof THEMES

export type Theme = typeof THEMES[ThemeName]

/**
 * Obtenir un thème par son nom
 */
export function getTheme(themeName: ThemeName): Theme {
  return THEMES[themeName]
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


