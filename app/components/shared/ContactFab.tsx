'use client'

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { SITE_DARK } from '@/design-system/siteDark'

/** Masqué sur tout le funnel public (sticky estimation) + gateway. */
function isFunnelOrHiddenPath(pathname: string): boolean {
  if (pathname === '/') return true
  if (pathname === '/portfolio' || pathname.startsWith('/portfolio/')) return true
  return false
}

export default function ContactFab() {
  const pathname = usePathname()
  const { t } = useLanguage()

  if (!pathname || isFunnelOrHiddenPath(pathname)) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { md: 24, lg: 32 },
        bottom: { md: 24, lg: 32 },
        zIndex: DESIGN_TOKENS.zIndex.floatingAction,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Tooltip title={t('home.contactMe')} placement="left">
        <Button
          component={Link}
          href="/portfolio/contact"
          aria-label={t('nav.contact')}
          startIcon={<ChatOutlinedIcon sx={{ fontSize: 20 }} />}
          sx={{
            minWidth: 'auto',
            px: 2.25,
            py: 1.35,
            borderRadius: '999px',
            textTransform: 'none',
            fontWeight: 700,
            letterSpacing: '0.01em',
            color: '#fff',
            background: BRAND_GLITCH_GRADIENT,
            boxShadow: `0 8px 22px ${SITE_DARK.brandGlow}`,
            border: 'none',
            '& .MuiButton-startIcon': {
              marginRight: 1,
              marginLeft: 0,
            },
            '&:hover': {
              background: BRAND_GLITCH_GRADIENT,
              transform: 'translateY(-2px)',
              boxShadow: `0 12px 28px ${SITE_DARK.brandGlowStrong}`,
            },
          }}
        >
          <Box component="span" sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1 }}>
            {t('nav.contact')}
          </Box>
        </Button>
      </Tooltip>
    </Box>
  )
}
