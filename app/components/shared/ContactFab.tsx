'use client'

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useThemeColors } from '@/hooks/useThemeColors'

const HIDDEN_PATHS = ['/portfolio/contact']

export default function ContactFab() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { primary, secondary } = useThemeColors()

  if (!pathname || HIDDEN_PATHS.includes(pathname)) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { md: 24, lg: 32 },
        bottom: { md: 24, lg: 32 },
        zIndex: DESIGN_TOKENS.zIndex.modal - 2,
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
            fontWeight: 800,
            letterSpacing: '0.01em',
            color: '#fff',
            background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
            boxShadow: `0 14px 34px ${primary}40`,
            border: `1px solid ${primary}55`,
            backdropFilter: 'blur(10px)',
            '& .MuiButton-startIcon': {
              marginRight: 1,
              marginLeft: 0,
            },
            '&:hover': {
              background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
              transform: 'translateY(-2px)',
              boxShadow: `0 18px 42px ${primary}55`,
            },
          }}
        >
          <Box component="span" sx={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1 }}>
            {t('nav.contact')}
          </Box>
        </Button>
      </Tooltip>
    </Box>
  )
}
