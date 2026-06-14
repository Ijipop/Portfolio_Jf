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

export function siteDarkPageGradient(): string {
  return `linear-gradient(180deg, ${SITE_DARK.bg} 0%, ${SITE_DARK.bgElevated} 100%)`
}

export function siteDarkTopologyBackground(): string {
  const glow = `radial-gradient(ellipse at 50% -10%, ${SITE_DARK.brandGlowStrong} 0%, transparent 55%)`
  const base = siteDarkPageGradient()
  return `${glow}, ${base}`
}
