import { SITE_DARK } from '@/design-system/siteDark'

/** Alias partagé — aligné sur le thème sombre global du site. */
export const HOME_V2 = {
  ...SITE_DARK,
  sectionPy: { xs: 5, md: 8 },
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
