/**
 * Tokens visuels site vendeur — confiance PME Montréal.
 * Accent ambre aligné sur le glitch Ijipop (ne pas casser la marque).
 * Surfaces sobres, peu de glow « neon portfolio ».
 */
export const SITE_DARK = {
  bg: '#0c1118',
  bgElevated: '#141b24',
  surface: 'rgba(232, 240, 248, 0.04)',
  surfaceHover: 'rgba(232, 240, 248, 0.07)',
  border: 'rgba(200, 214, 230, 0.12)',
  borderHover: 'rgba(232, 93, 4, 0.38)',
  text: '#f4f6f8',
  textSecondary: '#a8b2bf',
  textMuted: '#8b95a3',
  brandOrange: '#e85d04',
  brandOrangeLight: '#f48c06',
  brandOrangeDeep: '#c2410c',
  brandGlow: 'rgba(232, 93, 4, 0.07)',
  brandGlowStrong: 'rgba(232, 93, 4, 0.12)',
  appBarGlass: 'rgba(12, 17, 24, 0.88)',
  maxWidth: 1200,
  cardRadius: '16px',
} as const

/**
 * Mode Site clair — papier frais (pas crème terracotta « IA »).
 */
export const SITE_LIGHT = {
  bg: '#f3f5f7',
  bgElevated: '#ffffff',
  surface: 'rgba(255, 255, 255, 0.92)',
  surfaceHover: 'rgba(255, 255, 255, 1)',
  border: 'rgba(28, 36, 48, 0.1)',
  borderHover: 'rgba(232, 93, 4, 0.34)',
  text: '#121820',
  textSecondary: '#4a5563',
  textMuted: '#64748b',
  brandOrange: '#e85d04',
  brandOrangeLight: '#ea580c',
  brandOrangeDeep: '#c2410c',
  brandGlow: 'rgba(232, 93, 4, 0.08)',
  brandGlowStrong: 'rgba(232, 93, 4, 0.14)',
  appBarGlass: 'rgba(243, 245, 247, 0.92)',
  maxWidth: 1200,
  cardRadius: '16px',
} as const

export type SiteThemeTokens = typeof SITE_DARK | typeof SITE_LIGHT

export function siteDarkPageGradient(): string {
  return `linear-gradient(168deg, ${SITE_DARK.bg} 0%, #101722 45%, ${SITE_DARK.bgElevated} 100%)`
}

export function siteDarkTopologyBackground(): string {
  const glow = `radial-gradient(ellipse at 50% -10%, ${SITE_DARK.brandGlow} 0%, transparent 55%)`
  const base = siteDarkPageGradient()
  return `${glow}, ${base}`
}
