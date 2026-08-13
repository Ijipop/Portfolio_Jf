import { useMemo } from 'react'
import { SITE_DARK, SITE_LIGHT } from '@/design-system/siteDark'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'

/** Tokens V2 sombre (défaut). */
export const HOME_V2_DARK = {
  ...SITE_DARK,
  sectionPy: { xs: 5, md: 8 },
  cardRadiusLg: '20px',
  fontDisplay: 'var(--font-display), Outfit, var(--font-instrument), sans-serif',
  fontBody: 'var(--font-body), "Plus Jakarta Sans", sans-serif',
} as const

/** Tokens V2 mode Site clair — alias SITE_LIGHT + layout accueil. */
export const HOME_V2_LIGHT = {
  ...SITE_LIGHT,
  sectionPy: { xs: 5, md: 8 },
  cardRadiusLg: '20px',
  fontDisplay: 'var(--font-display), Outfit, var(--font-instrument), sans-serif',
  fontBody: 'var(--font-body), "Plus Jakarta Sans", sans-serif',
} as const

export type HomeV2Tokens = typeof HOME_V2_DARK | typeof HOME_V2_LIGHT

/** @deprecated Préférer useHomeV2Tokens() — conservé pour la preview /accueil-v2. */
export const HOME_V2 = HOME_V2_DARK

export function buildHomeV2CardSx(tokens: HomeV2Tokens) {
  return {
    background: tokens.surface,
    border: `1px solid ${tokens.border}`,
    borderRadius: tokens.cardRadius,
    transition: 'border-color 0.25s ease, background-color 0.25s ease',
    '&:hover': {
      borderColor: tokens.borderHover,
      background: tokens.surfaceHover,
    },
  } as const
}

export function buildHomeV2FeaturedCardSx(tokens: HomeV2Tokens) {
  const base = buildHomeV2CardSx(tokens)
  return {
    ...base,
    position: 'relative' as const,
    overflow: 'hidden' as const,
    border: `1px solid ${tokens.borderHover}`,
    '&:hover': {
      borderColor: tokens.brandOrange,
      background: tokens.surfaceHover,
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
