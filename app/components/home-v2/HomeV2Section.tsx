'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'
import { useHomeV2Tokens } from './homeV2Tokens'

type HomeV2SectionProps = {
  id?: string
  kicker: string
  title: string
  lead?: string
  children: ReactNode
}

export default function HomeV2Section({ id, kicker, title, lead, children }: HomeV2SectionProps) {
  const { tokens: v2 } = useHomeV2Tokens()

  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: v2.sectionPy,
        px: 0,
      }}
    >
      <Box sx={{ maxWidth: v2.maxWidth, mx: 'auto' }}>
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: v2.brandOrange,
            mb: 1,
          }}
        >
          {kicker}
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: v2.text,
            mb: lead ? 1.5 : 4,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {lead ? (
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.0625rem' },
              color: v2.textSecondary,
              maxWidth: 640,
              lineHeight: 1.55,
              mb: 4,
            }}
          >
            {lead}
          </Typography>
        ) : null}
        {children}
      </Box>
    </Box>
  )
}
