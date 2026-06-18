'use client'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

/** Row compacte : 1 colonne xs–md ; 2 colonnes dès lg. */
export const ProjectsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'stretch',
  gap: theme.spacing(1.5),
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
  },
}))
