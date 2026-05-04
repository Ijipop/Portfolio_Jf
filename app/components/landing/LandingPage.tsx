'use client'

import { useEffect, useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'
import MoodThemeWidget from './MoodThemeWidget'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

const ACCORDION_THEME_DELAY_MS = 500

export default function LandingPage() {
  const { locale, setLocale, t } = useLanguage()
  const { customTheme } = useAdvancedTheme()
  const [accordionTheme, setAccordionTheme] = useState(customTheme)

  useEffect(() => {
    const id = setTimeout(() => setAccordionTheme(customTheme), ACCORDION_THEME_DELAY_MS)
    return () => clearTimeout(id)
  }, [customTheme.primary, customTheme.secondary])

  const primary = accordionTheme.primary
  const secondary = accordionTheme.secondary
  const primaryBg = primary + '80'
  const primaryBgHover = primary + 'CC'
  const primaryBgLight = primary + '40'

  const accordionButtonPrimary = {
    bgcolor: primaryBg,
    color: 'white',
    border: `2px solid ${primary}`,
    fontWeight: 600,
    '&:hover': {
      bgcolor: primaryBgHover,
      borderColor: primary,
      color: 'white',
    },
  }
  const accordionButtonSecondary = {
    bgcolor: 'transparent',
    color: 'rgba(255,255,255,0.95)',
    border: `1px solid ${primary}`,
    '&:hover': {
      bgcolor: primaryBgLight,
      borderColor: secondary,
      color: 'white',
    },
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 2,
        }}
      >
        <Button
          size="small"
          onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
          sx={{
            color: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(255,255,255,0.5)',
            '&:hover': {
              color: 'white',
              borderColor: 'rgba(255,255,255,0.9)',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {locale === 'fr' ? 'EN' : 'FR'}
        </Button>
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 6, sm: 8, md: 10 },
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h1"
            className={playfair.className}
            sx={{
              fontFamily: playfair.style.fontFamily,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
              lineHeight: 1.2,
              letterSpacing: '0.02em',
              color: 'white',
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
              mb: 1.5,
            }}
          >
            {t('landing.heroTitle')}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.92)',
              fontSize: { xs: '0.95rem', sm: '1.0625rem' },
              maxWidth: 420,
              mx: 'auto',
              mb: 4,
              lineHeight: 1.5,
            }}
          >
            {t('landing.heroSubtitle')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Accordion
              defaultExpanded={false}
              sx={{
                width: '100%',
                maxWidth: 420,
                minWidth: 280,
                backgroundColor: primaryBgLight,
                border: `1px solid ${primary}`,
                borderRadius: '12px !important',
                overflow: 'hidden',
                '&:before': { display: 'none' },
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'rgba(255,255,255,0.95)' }} />}
                sx={{
                  color: 'rgba(255,255,255,0.95)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  '& .MuiAccordionSummary-content': { my: 1.5 },
                }}
              >
                {t('landing.discoverMe')}
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0, pb: 2, px: 2, flexDirection: 'column', display: 'flex', gap: 1.5 }}>
                <Link href="/portfolio" style={{ textDecoration: 'none' }}>
                  <Button fullWidth size="large" sx={accordionButtonPrimary}>
                    {t('landing.ctaPortfolio')}
                  </Button>
                </Link>
                <Link href="/logiciel" style={{ textDecoration: 'none' }}>
                  <Button fullWidth size="medium" sx={accordionButtonSecondary}>
                    {t('nav.software')}
                  </Button>
                </Link>
                <Link href="/portfolio/pageweb" style={{ textDecoration: 'none' }}>
                  <Button fullWidth size="medium" sx={accordionButtonSecondary}>
                    {t('nav.webSites')}
                  </Button>
                </Link>
                <Link href="/portfolio/contact" style={{ textDecoration: 'none' }}>
                  <Button fullWidth size="large" sx={accordionButtonSecondary}>
                    {t('landing.ctaContact')}
                  </Button>
                </Link>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <MoodThemeWidget displayTheme={accordionTheme} />
          </Box>
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: 2,
          px: 2,
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Typography
          component="span"
          sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}
        >
          Jean-François Lefebvre
        </Typography>
        <Typography component="span" sx={{ mx: 1, color: 'rgba(255,255,255,0.35)' }}>·</Typography>
        <Link href="/portfolio" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }} className="landing-footer-link">
          {t('landing.footerPortfolio')}
        </Link>
        <Typography component="span" sx={{ mx: 1, color: 'rgba(255,255,255,0.35)' }}>·</Typography>
        <Link href="/logiciel" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }} className="landing-footer-link">
          {t('nav.software')}
        </Link>
        <Typography component="span" sx={{ mx: 1, color: 'rgba(255,255,255,0.35)' }}>·</Typography>
        <Link href="/portfolio/pageweb" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }} className="landing-footer-link">
          {t('nav.webSites')}
        </Link>
        <Typography component="span" sx={{ mx: 1, color: 'rgba(255,255,255,0.35)' }}>·</Typography>
        <Link href="/portfolio/contact" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }} className="landing-footer-link">
          {t('landing.footerContact')}
        </Link>
      </Box>
    </Box>
  )
}
