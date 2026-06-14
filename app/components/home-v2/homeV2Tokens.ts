/** Palette sombre dédiée à /accueil-v2 — indépendante du thème global. */
export const HOME_V2 = {
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
  brandGlow: 'rgba(234, 88, 12, 0.12)',
  brandGlowStrong: 'rgba(234, 88, 12, 0.22)',
  maxWidth: 1200,
  sectionPy: { xs: 6, md: 10 },
  cardRadius: '16px',
  cardRadiusLg: '20px',
} as const

export const homeV2CardSx = {
  background: HOME_V2.surface,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: `1px solid ${HOME_V2.border}`,
  borderRadius: HOME_V2.cardRadius,
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
  '&:hover': {
    borderColor: HOME_V2.borderHover,
    boxShadow: `0 8px 32px ${HOME_V2.brandGlow}`,
  },
} as const

export const homeV2FeaturedCardSx = {
  ...homeV2CardSx,
  border: `1px solid ${HOME_V2.borderHover}`,
  boxShadow: `0 12px 40px ${HOME_V2.brandGlowStrong}, 0 0 0 1px ${HOME_V2.brandGlow}`,
  '&:hover': {
    borderColor: 'rgba(234, 88, 12, 0.5)',
    boxShadow: `0 16px 48px ${HOME_V2.brandGlowStrong}`,
    transform: 'translateY(-2px)',
  },
} as const
