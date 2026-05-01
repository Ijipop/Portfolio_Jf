'use client'

import Box from '@mui/material/Box'
import Link from 'next/link'
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
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 0, md: 24 },
        left: { xs: 0, md: 'auto' },
        right: { xs: 0, md: 24 },
        zIndex: DESIGN_TOKENS.zIndex.stickyBar,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(to top, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%)'
          : 'linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: (theme) => theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: { xs: 0, md: DESIGN_TOKENS.borderRadius.large },
        border: { xs: 'none', md: (theme) => theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.12)'
          : '1px solid rgba(0, 0, 0, 0.1)' },
        padding: DESIGN_TOKENS.spacing.md,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        display: 'block',
        width: { xs: 'auto', md: 320 },
      }}
    >
      {onClick ? (
        <CTAButton variant="primary" fullWidth size="large" onClick={onClick}>
          {text}
        </CTAButton>
      ) : (
        <Link href={href} style={{ textDecoration: 'none' }}>
          <CTAButton variant="primary" fullWidth size="large">
            {text}
          </CTAButton>
        </Link>
      )}
    </Box>
  )
}

