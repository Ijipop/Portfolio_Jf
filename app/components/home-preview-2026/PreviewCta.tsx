'use client'

import Button from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'
import Link from 'next/link'
import { PREVIEW, PREVIEW_ORANGE_GRADIENT } from './previewTokens'

type PreviewCtaProps = {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'medium' | 'large'
  fullWidth?: boolean
  sx?: SxProps<Theme>
}

export default function PreviewCta({
  children,
  href,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  sx,
}: PreviewCtaProps) {
  const large = size === 'large'
  const base: SxProps<Theme> = {
    minHeight: large ? 54 : 46,
    px: large ? 3.25 : 2.5,
    fontSize: large ? '1.02rem' : '0.95rem',
            fontWeight: 600,
    fontFamily: PREVIEW.fontBody,
    textTransform: 'none',
    borderRadius: '999px',
    letterSpacing: '-0.01em',
    width: fullWidth ? '100%' : 'auto',
    transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.25s ease, background 0.25s ease',
    ...(variant === 'primary'
      ? {
          background: PREVIEW_ORANGE_GRADIENT,
          color: '#fff',
          border: 'none',
          boxShadow: `0 10px 40px ${PREVIEW.orangeGlowStrong}`,
          '&:hover': {
            background: PREVIEW_ORANGE_GRADIENT,
            transform: 'translateY(-2px) scale(1.01)',
            boxShadow: `0 16px 48px ${PREVIEW.orangeGlowStrong}`,
          },
        }
      : variant === 'secondary'
        ? {
            background: PREVIEW.surface,
            color: PREVIEW.text,
            border: `1px solid ${PREVIEW.border}`,
            backdropFilter: 'blur(12px)',
            '&:hover': {
              background: PREVIEW.surfaceHover,
              borderColor: PREVIEW.borderHover,
              transform: 'translateY(-2px)',
            },
          }
        : {
            background: 'transparent',
            color: PREVIEW.textSecondary,
            border: `1px solid ${PREVIEW.border}`,
            '&:hover': {
              color: PREVIEW.text,
              borderColor: PREVIEW.borderHover,
              background: PREVIEW.surface,
            },
          }),
    ...sx,
  }

  if (href) {
    return (
      <Button component={Link} href={href} sx={base}>
        {children}
      </Button>
    )
  }

  return <Button sx={base}>{children}</Button>
}
