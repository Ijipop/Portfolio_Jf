'use client'

import Box from '@mui/material/Box'
import { useRouter } from 'next/navigation'
import CTAButton from './CTAButton'
import { DESIGN_TOKENS } from '../../design-system/constants'

interface StickyCTAProps {
  text?: string
  onClick?: () => void
  href?: string
}

export default function StickyCTA({ 
  text = "Travaillons ensemble", 
  onClick,
  href = '/portfolio/contact'
}: StickyCTAProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(href)
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: DESIGN_TOKENS.zIndex.modal - 1,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(to top, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%)'
          : 'linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: (theme) => theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)',
        padding: DESIGN_TOKENS.spacing.md,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        display: { xs: 'block', md: 'none' }, // Visible seulement sur mobile
      }}
    >
      <CTAButton
        variant="primary"
        fullWidth
        onClick={handleClick}
        size="large"
      >
        {text}
      </CTAButton>
    </Box>
  )
}

