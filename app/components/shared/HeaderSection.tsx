'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { ReactNode } from 'react'
import { DESIGN_TOKENS, GRADIENTS } from '../../design-system/constants'

const HeaderSectionStyled = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? GRADIENTS.backgrounds.headerDark
    : GRADIENTS.backgrounds.headerLight,
  color: 'white',
  padding: theme.spacing(6.75, 0, 4.5),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 1, 3),
  },
  '& h1': {
    color: theme.palette.mode === 'dark' ? '#ff6b35' : 'inherit'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 23, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)'
      : 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.03) 50%, transparent 70%)'
      : 'linear-gradient(45deg, transparent 30%, rgba(30, 58, 138, 0.05) 50%, transparent 70%)',
    animation: 'shimmer 3s ease-in-out infinite',
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
}))

interface HeaderSectionProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  children?: ReactNode
}

export default function HeaderSection({ title, subtitle, children }: HeaderSectionProps) {
  return (
    <HeaderSectionStyled>
      <Container maxWidth="lg">
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 900,
            fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem' },
            textShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 0 20px rgba(255, 107, 53, 0.5), 0 4px 8px rgba(0,0,0,0.8)'
              : '0 4px 8px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.05em', sm: '0.1em' },
            textTransform: 'uppercase',
            color: (theme) => theme.palette.mode === 'dark' ? '#ff6b35' : 'inherit',
            filter: 'none',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            imageRendering: 'crisp-edges',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="h5" 
            sx={{ 
              opacity: 0.9,
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            {subtitle}
          </Typography>
        )}
        {children}
      </Container>
    </HeaderSectionStyled>
  )
}

