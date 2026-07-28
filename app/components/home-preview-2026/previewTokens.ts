/** Tokens locaux — preview 2026 uniquement (ne touche pas le thème site). */
export const PREVIEW = {
  bg: '#0a0a0c',
  bgElevated: '#121216',
  surface: 'rgba(255, 255, 255, 0.035)',
  surfaceHover: 'rgba(255, 255, 255, 0.06)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(234, 88, 12, 0.35)',
  text: '#f4f0e8',
  textSecondary: 'rgba(244, 240, 232, 0.72)',
  textMuted: 'rgba(244, 240, 232, 0.48)',
  orange: '#ea580c',
  orangeLight: '#fb923c',
  orangeGlow: 'rgba(234, 88, 12, 0.22)',
  orangeGlowStrong: 'rgba(234, 88, 12, 0.4)',
  ivory: '#f4f0e8',
  maxWidth: 1120,
  radius: 20,
  radiusLg: 28,
  fontDisplay: 'var(--font-preview-display), Syne, sans-serif',
  fontBody: 'var(--font-preview-body), Manrope, sans-serif',
  sectionPy: { xs: 7, md: 11 },
} as const

export const PREVIEW_ORANGE_GRADIENT =
  'linear-gradient(135deg, #ea580c 0%, #c2410c 48%, #fb923c 100%)'
