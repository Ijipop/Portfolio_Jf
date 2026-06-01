'use client'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
/** 1 colonne sur xs ; 2 colonnes dès sm (cf. plan refonte Projets). */
export const ProjectsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'stretch',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2.5),
  },
  [theme.breakpoints.up('xl')]: {
    gap: theme.spacing(3),
  },
}))
