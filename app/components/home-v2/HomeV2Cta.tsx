'use client'

import Button from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'
import Link from 'next/link'
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { HOME_V2 } from './homeV2Tokens'

type HomeV2CtaProps = {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'medium' | 'large'
  fullWidth?: boolean
  sx?: SxProps<Theme>
}

export default function HomeV2Cta({
  children,
  href,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  sx,
}: HomeV2CtaProps) {
  const minHeight = size === 'large' ? 52 : 44
  const fontSize = size === 'large' ? '1rem' : '0.9375rem'
  const px = size === 'large' ? 3 : 2.5

  const variantSx: SxProps<Theme> =
    variant === 'primary'
      ? {
          background: BRAND_GLITCH_GRADIENT,
          color: '#fff',
          border: 'none',
          boxShadow: `0 4px 24px ${HOME_V2.brandGlowStrong}`,
          '&:hover': {
            boxShadow: `0 8px 32px ${HOME_V2.brandGlowStrong}`,
            transform: 'translateY(-1px)',
            background: BRAND_GLITCH_GRADIENT,
          },
        }
      : variant === 'secondary'
        ? {
            background: HOME_V2.surface,
            color: HOME_V2.text,
            border: `1px solid ${HOME_V2.border}`,
            backdropFilter: 'blur(8px)',
            '&:hover': {
              background: HOME_V2.surfaceHover,
              borderColor: HOME_V2.borderHover,
            },
          }
        : {
            background: 'transparent',
            color: HOME_V2.textSecondary,
            border: `1px solid ${HOME_V2.border}`,
            '&:hover': {
              color: HOME_V2.text,
              borderColor: HOME_V2.borderHover,
              background: HOME_V2.surface,
            },
          }

  const buttonSx: SxProps<Theme> = {
    minHeight,
    fontSize,
    px,
    py: 1.25,
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: '12px',
    transition: 'all 0.25s ease',
    width: fullWidth ? '100%' : 'auto',
    ...variantSx,
    ...sx,
  }

  if (href) {
    return (
      <Button component={Link} href={href} sx={buttonSx}>
        {children}
      </Button>
    )
  }

  return <Button sx={buttonSx}>{children}</Button>
}
