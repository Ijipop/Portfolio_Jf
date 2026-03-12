'use client'

import { Card, CardContent, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { ReactNode, useState, forwardRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { DESIGN_TOKENS, GRADIENTS } from '../../design-system/constants'
import { useThemeColors } from '../../hooks/useThemeColors'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'

// BaseCardStyled comme composant fonctionnel pour utiliser le thème Material-UI
const BaseCardStyledComponent = forwardRef<HTMLDivElement, any>(({ 
  children, 
  onClick, 
  className, 
  sx
}, ref) => {
  const theme = useTheme()
  const { primary, secondary } = useThemeColors()
  const [cardBackground, setCardBackground] = useState<string>(GRADIENTS.cards.light)
  
  // Mettre à jour le background de la carte quand le thème change
  useEffect(() => {
    const updateCardBackground = () => {
      if (typeof window === 'undefined') return
      
      // Lire les CSS variables définies par ThemeSelector
      const cardBg = getComputedStyle(document.documentElement).getPropertyValue('--card-background')?.trim()
      
      if (cardBg && cardBg !== 'none') {
        setCardBackground(cardBg)
      } else {
        // Fallback : créer un gradient avec les couleurs du thème
        const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
        const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()
        
        if (bg && bg2) {
          setCardBackground(`linear-gradient(145deg, ${bg} 0%, ${bg2} 50%, ${bg} 100%)`)
        } else {
          setCardBackground(GRADIENTS.cards.light)
        }
      }
    }
    
    updateCardBackground()
    
    // Observer les changements de CSS variables
    const observer = new MutationObserver(updateCardBackground)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    
    const interval = setInterval(updateCardBackground, 200)
    
    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])
  
  const primaryLight = `${primary}80`
  const primaryLighter = `${primary}60`
  
  return (
    <Card
      ref={ref}
      onClick={onClick}
      className={className}
      sx={{
        background: cardBackground,
        border: `1px solid ${primary}20 !important`,
        borderRadius: 8,
        boxShadow: `${DESIGN_TOKENS.shadows.card.light}, 0 0 20px ${primary}08 !important`,
        transition: DESIGN_TOKENS.transitions.slow,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        zIndex: DESIGN_TOKENS.zIndex.base,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${primary}08 0%, ${primaryLight}05 50%, ${primary}05 100%)`,
          opacity: 0,
          transition: DESIGN_TOKENS.transitions.normal,
          zIndex: DESIGN_TOKENS.zIndex.base,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          background: `linear-gradient(45deg, ${primary}, ${primaryLight}, ${primaryLighter}, ${primaryLight})`,
          borderRadius: 10,
          zIndex: -1,
          opacity: 0,
          transition: DESIGN_TOKENS.transitions.normal,
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          border: `1px solid ${primary}40 !important`,
          boxShadow: `${DESIGN_TOKENS.shadows.cardHover.light}, 0 0 30px ${primary}15 !important`,
          background: `${cardBackground} !important`,
          '&::before': {
            opacity: 1,
          },
          '&::after': {
            opacity: 1,
          }
        },
        ...sx
      }}
    >
      {children}
    </Card>
  )
})

interface BaseCardProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'default' | '3d' | 'glass' | 'feature'
  height?: string | number | Record<string, number | string>
  reflectionColor?: string
}

export default function BaseCard({ 
  children, 
  onClick, 
  className, 
  variant = 'default',
  height,
  reflectionColor 
}: BaseCardProps) {
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { primary, secondary, accent } = useThemeColors()

  const getVariantStyles = () => {
    switch (variant) {
      case '3d':
        return {}
      case 'glass':
        return {
          background: 'rgba(26, 26, 26, 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }
      case 'feature':
        return {
          height: '100%',
        }
      default:
        return {}
    }
  }

  const surfaceSx = getCardSurfaceSx({
    isTopologyRoute,
    variant: 'flat',
    level: 'soft',
    interactive: true,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={isTopologyRoute ? undefined : { y: -6 }}
    >
      <BaseCardStyledComponent 
        onClick={onClick} 
        className={className}
        sx={{
          height: height || (variant === 'feature' ? '100%' : 'auto'),
          minHeight: variant === 'feature' ? '300px' : 'auto',
          ...getVariantStyles(),
          ...(reflectionColor && {
            '&:hover::after': {
              background: `linear-gradient(135deg, ${reflectionColor}15 0%, transparent 50%, ${reflectionColor}10 100%)`,
              opacity: 1,
            }
          }),
          ...surfaceSx,
        }}
      >
        <CardContent sx={{ 
          position: 'relative', 
          zIndex: DESIGN_TOKENS.zIndex.elevated, 
          height: '100%',
          overflow: 'visible',
          '&:last-child': {
            paddingBottom: 2
          }
        }}>
          {children}
        </CardContent>
      </BaseCardStyledComponent>
    </motion.div>
  )
}

