/**
 * Tokens visuels site vendeur — confiance PME Montréal.
 * Accent ambre aligné sur le glitch Ijipop (ne pas casser la marque).
 * Encre chaude, surfaces papier — pas de glass « neon portfolio ».
 */
export const SITE_DARK = {
  bg: '#181410',
  bgMid: '#1e1914',
  bgElevated: '#241e18',
  surface: '#1c1814',
  surfaceHover: '#241f1a',
  border: 'rgba(232, 220, 200, 0.14)',
  borderHover: 'rgba(232, 93, 4, 0.45)',
  text: '#f7f3ee',
  textSecondary: '#c4b8aa',
  textMuted: '#9a8f84',
  brandOrange: '#e85d04',
  brandOrangeLight: '#f48c06',
  brandOrangeDeep: '#c2410c',
  brandGlow: 'rgba(232, 93, 4, 0.16)',
  brandGlowStrong: 'rgba(232, 93, 4, 0.22)',
  appBarGlass: 'rgba(18, 16, 14, 0.9)',
  maxWidth: 1200,
  cardRadius: '16px',
} as const

/**
 * Mode Site clair — papier frais (pas crème terracotta « IA »).
 */
export const SITE_LIGHT = {
  bg: '#f3f5f7',
  bgMid: '#eef1f4',
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
  return `linear-gradient(168deg, ${SITE_DARK.bg} 0%, ${SITE_DARK.bgMid} 45%, ${SITE_DARK.bgElevated} 100%)`
}

export function siteDarkTopologyBackground(): string {
  const glow = `radial-gradient(ellipse at 50% -10%, ${SITE_DARK.brandGlow} 0%, transparent 55%)`
  const base = siteDarkPageGradient()
  return `${glow}, ${base}`
}
