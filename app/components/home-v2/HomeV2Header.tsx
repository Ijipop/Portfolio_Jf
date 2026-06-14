'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { HOME_V2 } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'

export default function HomeV2Header() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinkSx = {
    color: HOME_V2.textSecondary,
    textDecoration: 'none',
    fontSize: '0.9375rem',
    fontWeight: 500,
    transition: 'color 0.2s ease',
    '&:hover': { color: HOME_V2.text },
  }

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        px: { xs: 2, sm: 3 },
        py: { xs: 1.25, sm: 1.5 },
        background: scrolled ? 'rgba(8, 8, 12, 0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${HOME_V2.border}` : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Box
        sx={{
          maxWidth: HOME_V2.maxWidth,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Link href="/accueil-v2" style={{ textDecoration: 'none' }}>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: '1.35rem', sm: '1.5rem' },
              letterSpacing: '0.04em',
              backgroundImage: 'linear-gradient(165deg, #fdba74 14%, #ea580c 62%, #b91c1c 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            ijipop
          </Typography>
        </Link>

        <Stack direction="row" spacing={{ xs: 2, sm: 3 }} alignItems="center">
          <Typography component={Link} href="#forfaits" sx={navLinkSx}>
            {t('homeV2.navPricing')}
          </Typography>
          <Typography
            component={Link}
            href={CONTACT_PATH}
            sx={{
              ...navLinkSx,
              color: HOME_V2.brandOrange,
              fontWeight: 600,
              '&:hover': { color: '#fb923c' },
            }}
          >
            {t('homeV2.navContact')}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
