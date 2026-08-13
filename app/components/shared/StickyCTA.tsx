'use client'

import Box from '@mui/material/Box'
import HomeV2Cta from '@/components/home-v2/HomeV2Cta'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { SITE_DARK } from '@/design-system/siteDark'

interface StickyCTAProps {
  text?: string
  onClick?: () => void
  href?: string
  /** When true, parent handles fixed positioning (mobile sticky bar wrapper). */
  embedded?: boolean
}

export default function StickyCTA({
  text = 'Travaillons ensemble',
  href = '/portfolio/contact',
  embedded = false,
}: StickyCTAProps) {
  const siteDarkChrome = useSiteDarkChrome()
  return (
    <Box
      sx={{
        position: embedded ? { xs: 'relative', md: 'fixed' } : 'fixed',
        bottom: embedded ? { xs: 'auto', md: 24 } : { xs: 0, md: 24 },
        left: embedded ? { xs: 'auto', md: 'auto' } : { xs: 0, md: 'auto' },
        right: embedded ? { xs: 'auto', md: 24 } : { xs: 0, md: 24 },
        zIndex: DESIGN_TOKENS.zIndex.stickyBar,
        background: siteDarkChrome
          ? `linear-gradient(to top, ${SITE_DARK.appBarGlass} 0%, ${SITE_DARK.bg} 100%)`
          : 'linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: siteDarkChrome ? `1px solid ${SITE_DARK.border}` : '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: { xs: 0, md: DESIGN_TOKENS.borderRadius.large },
        border: {
          xs: 'none',
          md: siteDarkChrome ? `1px solid ${SITE_DARK.border}` : '1px solid rgba(0, 0, 0, 0.1)',
        },
        padding: {
          xs: `${DESIGN_TOKENS.spacing.sm}px ${DESIGN_TOKENS.spacing.md}px`,
          md: DESIGN_TOKENS.spacing.md,
        },
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        display: 'block',
        width: { xs: '100%', md: 320 },
        maxWidth: { xs: '100%', md: 320 },
        boxSizing: 'border-box',
        pointerEvents: 'auto',
      }}
    >
      <HomeV2Cta href={href} variant="primary" fullWidth size="large">
        {text}
      </HomeV2Cta>
    </Box>
  )
}
