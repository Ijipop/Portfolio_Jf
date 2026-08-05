'use client'

import Button from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'
import Link from 'next/link'
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { useHomeV2Tokens } from './homeV2Tokens'

type HomeV2CtaProps = {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
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
  const { tokens: v2 } = useHomeV2Tokens()
  const minHeight = size === 'large' ? 52 : size === 'small' ? 36 : 44
  const fontSize = size === 'large' ? '1rem' : size === 'small' ? '0.8125rem' : '0.9375rem'
  const px = size === 'large' ? 3 : size === 'small' ? 2 : 2.5
  const py = size === 'small' ? 0.75 : 1.25

  const variantSx: SxProps<Theme> =
    variant === 'primary'
      ? {
          background: BRAND_GLITCH_GRADIENT,
          color: '#fff',
          border: 'none',
          boxShadow: `0 2px 12px ${v2.brandGlow}`,
          '&:hover': {
            boxShadow: `0 6px 20px ${v2.brandGlowStrong}`,
            transform: 'translateY(-2px)',
            background: BRAND_GLITCH_GRADIENT,
          },
        }
      : variant === 'secondary'
        ? {
            background: v2.surface,
            color: v2.text,
            border: `1px solid ${v2.border}`,
            backdropFilter: 'blur(8px)',
            '&:hover': {
              background: v2.surfaceHover,
              borderColor: v2.borderHover,
              transform: 'translateY(-2px)',
            },
          }
        : {
            background: 'transparent',
            color: v2.textSecondary,
            border: `1px solid ${v2.border}`,
            '&:hover': {
              color: v2.text,
              borderColor: v2.borderHover,
              background: v2.surface,
              transform: 'translateY(-1px)',
            },
          }

  const buttonSx: SxProps<Theme> = {
    minHeight,
    fontSize,
    px,
    py,
    fontWeight: 600,
    fontFamily: v2.fontBody,
    textTransform: 'none',
    borderRadius: '999px',
    transition:
      'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.25s ease, background 0.25s ease',
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
