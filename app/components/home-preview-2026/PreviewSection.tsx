'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import PreviewReveal from './PreviewReveal'
import { PREVIEW } from './previewTokens'

type PreviewSectionProps = {
  id?: string
  kicker: string
  title: string
  lead?: string
  children: ReactNode
}

export default function PreviewSection({ id, kicker, title, lead, children }: PreviewSectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: 'relative',
        zIndex: 1,
        py: PREVIEW.sectionPy,
        scrollMarginTop: 88,
      }}
    >
      <PreviewReveal>
        <Box sx={{ mb: { xs: 4, md: 5.5 }, maxWidth: 720 }}>
          <Typography
            sx={{
              fontFamily: PREVIEW.fontBody,
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: PREVIEW.orangeLight,
              mb: 1.5,
            }}
          >
            {kicker}
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: PREVIEW.fontDisplay,
              fontWeight: 700,
              fontSize: { xs: 'clamp(1.75rem, 5vw, 2.75rem)', md: 'clamp(2.25rem, 3.5vw, 3.15rem)' },
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              color: PREVIEW.text,
              mb: lead ? 1.75 : 0,
            }}
          >
            {title}
          </Typography>
          {lead ? (
            <Typography
              sx={{
                fontFamily: PREVIEW.fontBody,
                fontSize: { xs: '1.02rem', md: '1.125rem' },
                color: PREVIEW.textSecondary,
                lineHeight: 1.6,
                maxWidth: 540,
              }}
            >
              {lead}
            </Typography>
          ) : null}
        </Box>
      </PreviewReveal>
      {children}
    </Box>
  )
}
