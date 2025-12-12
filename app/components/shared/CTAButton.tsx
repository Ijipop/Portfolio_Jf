'use client'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { DESIGN_TOKENS } from '../../design-system/constants'

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

const StyledCTAButton = styled(Button)<{ ctaVariant: string }>(({ theme, ctaVariant }) => {
  const baseStyles = {
    borderRadius: DESIGN_TOKENS.borderRadius.medium,
    fontWeight: 600,
    textTransform: 'none',
    transition: DESIGN_TOKENS.transitions.normal,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover::before': {
      left: '100%',
    },
  }

  if (ctaVariant === 'primary') {
    return {
      ...baseStyles,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #3b82f6 0%, #059669 100%)'
        : 'linear-gradient(135deg, #1e3a8a 0%, #059669 100%)',
      color: 'white',
      padding: theme.spacing(1.5, 3),
      fontSize: '1rem',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 4px 20px rgba(59, 130, 246, 0.4)'
        : '0 4px 20px rgba(30, 58, 138, 0.3)',
      '&:hover': {
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #2563eb 0%, #047857 100%)'
          : 'linear-gradient(135deg, #1e40af 0%, #047857 100%)',
        transform: 'translateY(-2px)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 30px rgba(59, 130, 246, 0.6)'
          : '0 8px 30px rgba(30, 58, 138, 0.5)',
      },
    }
  }

  if (ctaVariant === 'secondary') {
    return {
      ...baseStyles,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)'
        : 'linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)',
      color: 'white',
      padding: theme.spacing(1.5, 3),
      fontSize: '1rem',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 4px 20px rgba(255, 107, 53, 0.4)'
        : '0 4px 20px rgba(255, 107, 53, 0.3)',
      '&:hover': {
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #ff5722 0%, #d50000 100%)'
          : 'linear-gradient(135deg, #ff5722 0%, #d50000 100%)',
        transform: 'translateY(-2px)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 30px rgba(255, 107, 53, 0.6)'
          : '0 8px 30px rgba(255, 107, 53, 0.5)',
      },
    }
  }

  // outline variant
  return {
    ...baseStyles,
    background: 'transparent',
    border: theme.palette.mode === 'dark'
      ? '2px solid rgba(59, 130, 246, 0.5)'
      : '2px solid rgba(30, 58, 138, 0.5)',
    color: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    '&:hover': {
      background: theme.palette.mode === 'dark'
        ? 'rgba(59, 130, 246, 0.1)'
        : 'rgba(30, 58, 138, 0.1)',
      border: theme.palette.mode === 'dark'
        ? '2px solid #60a5fa'
        : '2px solid #1e3a8a',
      transform: 'translateY(-2px)',
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
    <StyledCTAButton ctaVariant={variant} {...buttonProps}>
      {children}
    </StyledCTAButton>
  )
}

