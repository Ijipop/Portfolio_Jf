'use client'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { ReactNode, useState } from 'react'
import { DESIGN_TOKENS, GRADIENTS } from '../../design-system/constants'

const FlipCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  height: 400,
  minHeight: 280,
  [theme.breakpoints.down('md')]: { height: 320 },
  [theme.breakpoints.down('sm')]: { height: 280 },
  perspective: '1000px',
  cursor: 'pointer',
  WebkitPerspective: '1000px',
  MozPerspective: '1000px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    animation: 'shake 0.5s ease-in-out',
  },
  '@keyframes shake': {
    '0%, 100%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-2px)' },
    '75%': { transform: 'translateX(2px)' },
  }
}))

const FlipCardInner = styled(Box)<{ flipped: boolean }>(({ theme, flipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  WebkitTransformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  WebkitTransform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}))

const FlipCardSide = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  MozBackfaceVisibility: 'hidden',
  background: theme.palette.mode === 'dark'
    ? GRADIENTS.cards.dark
    : GRADIENTS.cards.light,
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(74, 85, 104, 0.2)' 
    : '1px solid rgba(148, 163, 184, 0.1)',
  borderRadius: DESIGN_TOKENS.borderRadius.large,
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? DESIGN_TOKENS.shadows.card.dark
    : DESIGN_TOKENS.shadows.card.light,
  transition: DESIGN_TOKENS.transitions.slow,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}))

const FlipCardFront = styled(FlipCardSide)({
  // Styles spécifiques au front si nécessaire
})

const FlipCardBack = styled(FlipCardSide)(({ theme }) => ({
  transform: 'rotateY(180deg)',
  WebkitTransform: 'rotateY(180deg)',
  background: 'var(--card-card-gradient, linear-gradient(145deg, rgba(5,150,105,0.12) 0%, rgba(30,58,138,0.12) 50%, rgba(5,150,105,0.12) 100%))',
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(74, 85, 104, 0.3)' 
    : '1px solid rgba(148, 163, 184, 0.2)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 15px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(74, 85, 104, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 4px 20px rgba(148, 163, 184, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.08)',
}))

interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  flipped?: boolean
  onFlip?: () => void
  controlled?: boolean // Si true, utilise flipped comme état contrôlé
}

export default function FlipCard({ front, back, flipped = false, onFlip, controlled = false }: FlipCardProps) {
  const [internalFlipped, setInternalFlipped] = useState(flipped)
  
  // Utiliser l'état contrôlé si spécifié, sinon utiliser l'état interne
  const isFlipped = controlled ? flipped : internalFlipped

  const handleClick = () => {
    if (controlled) {
      onFlip?.()
    } else {
      setInternalFlipped(!internalFlipped)
      onFlip?.()
    }
  }

  return (
    <FlipCardContainer onClick={handleClick}>
      <FlipCardInner flipped={isFlipped}>
        <FlipCardFront
          sx={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            MozBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </FlipCardFront>
        <FlipCardBack
          sx={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            MozBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            WebkitTransform: 'rotateY(180deg)',
          }}
        >
          {back}
        </FlipCardBack>
      </FlipCardInner>
    </FlipCardContainer>
  )
}

