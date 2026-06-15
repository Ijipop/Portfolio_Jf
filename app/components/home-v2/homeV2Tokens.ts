import { useMemo } from 'react'
import { SITE_DARK } from '@/design-system/siteDark'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'

/** Tokens V2 sombre (défaut). */
export const HOME_V2_DARK = {
  ...SITE_DARK,
  sectionPy: { xs: 5, md: 8 },
  cardRadiusLg: '20px',
} as const

/** Tokens V2 mode Site clair (beige latte). */
export const HOME_V2_LIGHT = {
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
  sectionPy: { xs: 5, md: 8 },
  cardRadiusLg: '20px',
} as const

export type HomeV2Tokens = typeof HOME_V2_DARK | typeof HOME_V2_LIGHT

/** @deprecated Préférer useHomeV2Tokens() — conservé pour la preview /accueil-v2. */
export const HOME_V2 = HOME_V2_DARK

export function buildHomeV2CardSx(tokens: HomeV2Tokens) {
  return {
    background: tokens.surface,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${tokens.border}`,
    borderRadius: tokens.cardRadius,
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
    '&:hover': {
      borderColor: tokens.borderHover,
      boxShadow: `0 8px 32px ${tokens.brandGlow}`,
    },
  } as const
}

export function buildHomeV2FeaturedCardSx(tokens: HomeV2Tokens) {
  const base = buildHomeV2CardSx(tokens)
  return {
    ...base,
    border: `1px solid ${tokens.borderHover}`,
    boxShadow: `0 12px 40px ${tokens.brandGlowStrong}, 0 0 0 1px ${tokens.brandGlow}`,
    '&:hover': {
      borderColor: 'rgba(234, 88, 12, 0.5)',
      boxShadow: `0 16px 48px ${tokens.brandGlowStrong}`,
      transform: 'translateY(-2px)',
    },
  } as const
}

/** @deprecated Préférer useHomeV2Tokens(). */
export const homeV2CardSx = buildHomeV2CardSx(HOME_V2_DARK)
/** @deprecated Préférer useHomeV2Tokens(). */
export const homeV2FeaturedCardSx = buildHomeV2FeaturedCardSx(HOME_V2_DARK)

export function useHomeV2Tokens() {
  const siteDark = useSiteDarkChrome()

  return useMemo(() => {
    const tokens = siteDark ? HOME_V2_DARK : HOME_V2_LIGHT
    return {
      tokens,
      cardSx: buildHomeV2CardSx(tokens),
      featuredCardSx: buildHomeV2FeaturedCardSx(tokens),
      isSiteDark: siteDark,
    }
  }, [siteDark])
}
