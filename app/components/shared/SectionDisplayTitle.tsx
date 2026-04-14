'use client'

import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import { useTextColor } from '@/hooks/useTextColor'
import type { ReactNode } from 'react'

export interface SectionDisplayTitleProps {
  children: ReactNode
  component: 'h1' | 'h2' | 'h3'
  id?: string
  align?: 'left' | 'center' | 'right'
  sx?: SxProps<Theme>
}

/** Titres de section (même stack Inter que le thème). Pas pour hero Ijipop ni CTA. */
export default function SectionDisplayTitle({
  children,
  component,
  id,
  align = 'center',
  sx,
}: SectionDisplayTitleProps) {
  const textColor = useTextColor()

  return (
    <Typography
      id={id}
      component={component}
      variant="h2"
      sx={{
        fontFamily: (theme) => theme.typography.fontFamily,
        fontWeight: 600,
        fontSize: { xs: 'clamp(1.35rem, 4.8vw, 1.65rem)', sm: '1.95rem', md: '2.15rem' },
        lineHeight: { xs: 1.2, sm: 1.22 },
        letterSpacing: '-0.02em',
        color: textColor,
        textAlign: align,
        maxWidth: { xs: 'min(100%, 560px)', sm: 560 },
        px: { xs: 0.5, sm: 0 },
        mx: align === 'center' ? 'auto' : undefined,
        overflowWrap: 'anywhere',
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}
