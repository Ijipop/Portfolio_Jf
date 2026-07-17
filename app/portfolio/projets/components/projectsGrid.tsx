'use client'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

type ProjectsGridProps = {
  /** @deprecated prefer `showcase` — alias conservé */
  variant?: 'editorial' | 'software' | 'showcase'
}

/** editorial: rows compactes 1→2 cols. showcase/software: vitrine 1→2→3 cols. */
export const ProjectsGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<ProjectsGridProps>(({ theme, variant = 'editorial' }) =>
  variant === 'software' || variant === 'showcase'
    ? {
        display: 'grid',
        gridTemplateColumns: '1fr',
        alignItems: 'stretch',
        gap: theme.spacing(2.5),
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: theme.spacing(3),
        },
        [theme.breakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: theme.spacing(3.5),
        },
      }
    : {
        display: 'grid',
        gridTemplateColumns: '1fr',
        alignItems: 'stretch',
        gap: theme.spacing(1.5),
        [theme.breakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: theme.spacing(2),
        },
      },
)
