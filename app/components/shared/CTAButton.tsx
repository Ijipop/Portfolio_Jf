'use client'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { useThemeColors } from '../../hooks/useThemeColors'

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

// Fonction utilitaire pour convertir hex en rgba
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const StyledCTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'ctaVariant' && prop !== 'primaryColor' && prop !== 'secondaryColor',
})<{ ctaVariant: string; primaryColor?: string; secondaryColor?: string }>(({ theme, ctaVariant, primaryColor = '#1e3a8a', secondaryColor = '#059669' }) => {
  const baseStyles: any = {
    borderRadius: DESIGN_TOKENS.borderRadius.medium,
    fontWeight: 600,
    textTransform: 'none',
    transition: DESIGN_TOKENS.transitions.normal,
    position: 'relative' as const,
    overflow: 'hidden',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
      transition: 'left 0.6s ease',
    },
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      width: 0,
      height: 0,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.6s ease, height 0.6s ease',
    },
    '&:hover::before': {
      left: '100%',
    },
    '&:active': {
      transform: 'scale(0.98)',
      transition: 'transform 0.1s ease',
    },
    '&:active::after': {
      width: '300px',
      height: '300px',
      transition: 'width 0.4s ease, height 0.4s ease',
    },
  }

  if (ctaVariant === 'primary') {
    return {
      ...baseStyles,
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      color: 'white',
      padding: theme.spacing(1.5, 3),
      fontSize: '1rem',
      boxShadow: `0 4px 20px ${hexToRgba(primaryColor, 0.3)}`,
      '&:hover': {
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        transform: 'translateY(-3px) scale(1.02)',
        boxShadow: `0 12px 40px ${hexToRgba(primaryColor, 0.6)}, 0 0 20px ${hexToRgba(primaryColor, 0.2)}`,
      },
    }
  }

  if (ctaVariant === 'secondary') {
    return {
      ...baseStyles,
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      color: 'white',
      padding: theme.spacing(1.5, 3),
      fontSize: '1rem',
      boxShadow: `0 4px 20px ${hexToRgba(primaryColor, 0.3)}`,
      '&:hover': {
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        transform: 'translateY(-3px) scale(1.02)',
        boxShadow: `0 12px 40px ${hexToRgba(primaryColor, 0.6)}, 0 0 20px ${hexToRgba(primaryColor, 0.2)}`,
      },
    }
  }

  // outline variant
  return {
    ...baseStyles,
    background: 'transparent',
    border: `2px solid ${hexToRgba(primaryColor, 0.5)}`,
    color: primaryColor,
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    '&:hover': {
      background: hexToRgba(primaryColor, 0.15),
      border: `2px solid ${primaryColor}`,
      transform: 'translateY(-3px) scale(1.02)',
      boxShadow: `0 8px 25px ${hexToRgba(primaryColor, 0.2)}, 0 0 15px ${hexToRgba(primaryColor, 0.15)}`,
    },
  }
})

export default function CTAButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  type,
  disabled,
}: CTAButtonProps) {
  const { primary, secondary } = useThemeColors()
  
  const buttonProps: any = {
    variant: 'contained',
    onClick,
    href,
    fullWidth,
    size,
    type,
    disabled,
    startIcon: startIcon || (variant === 'primary' ? null : null),
    endIcon: endIcon || (variant === 'primary' ? <ArrowForwardIcon /> : null),
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <StyledCTAButton 
        ctaVariant={variant} 
        primaryColor={primary}
        secondaryColor={secondary}
        {...buttonProps}
      >
        {children}
      </StyledCTAButton>
    </motion.div>
  )
}

