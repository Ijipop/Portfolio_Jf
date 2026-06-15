/** Tokens visuels V2 sombre — source partagée thème + composants chrome. */
export const SITE_DARK = {
  bg: '#08080c',
  bgElevated: '#0f0f14',
  surface: 'rgba(255, 255, 255, 0.04)',
  surfaceHover: 'rgba(255, 255, 255, 0.06)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(234, 88, 12, 0.35)',
  text: '#f4f4f5',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  brandOrange: '#ea580c',
  brandOrangeLight: '#fb923c',
  brandOrangeDeep: '#c2410c',
  brandGlow: 'rgba(234, 88, 12, 0.12)',
  brandGlowStrong: 'rgba(234, 88, 12, 0.22)',
  appBarGlass: 'rgba(8, 8, 12, 0.82)',
  maxWidth: 1200,
  cardRadius: '16px',
} as const

/** Tokens mode Site clair (beige latte). */
export const SITE_LIGHT = {
  bg: '#f7f3eb',
  bgElevated: '#efe8dc',
  surface: 'rgba(255, 254, 251, 0.82)',
  surfaceHover: 'rgba(255, 254, 251, 0.95)',
  border: 'rgba(92, 77, 60, 0.16)',
  borderHover: 'rgba(234, 88, 12, 0.32)',
  text: '#1c1917',
  textSecondary: '#44403c',
  textMuted: '#78716c',
  brandOrange: '#ea580c',
  brandOrangeLight: '#fb923c',
  brandOrangeDeep: '#c2410c',
  brandGlow: 'rgba(234, 88, 12, 0.1)',
  brandGlowStrong: 'rgba(234, 88, 12, 0.18)',
  appBarGlass: 'rgba(247, 243, 235, 0.88)',
  maxWidth: 1200,
  cardRadius: '16px',
} as const

export type SiteThemeTokens = typeof SITE_DARK | typeof SITE_LIGHT

export function siteDarkPageGradient(): string {
  return `linear-gradient(180deg, ${SITE_DARK.bg} 0%, ${SITE_DARK.bgElevated} 100%)`
}

export function siteDarkTopologyBackground(): string {
  const glow = `radial-gradient(ellipse at 50% -10%, ${SITE_DARK.brandGlowStrong} 0%, transparent 55%)`
  const base = siteDarkPageGradient()
  return `${glow}, ${base}`
}
