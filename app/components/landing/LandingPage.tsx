'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../contexts/LanguageContext'

const LANDING_GREEN = '#89964e'
const LANDING_GREEN_RGBA = 'rgba(137, 150, 78,'

const accordionButtonPrimary = {
  bgcolor: `${LANDING_GREEN_RGBA} 0.5)`,
  color: 'white',
  border: `2px solid ${LANDING_GREEN}`,
  fontWeight: 600,
  '&:hover': {
    bgcolor: `${LANDING_GREEN_RGBA} 0.7)`,
    borderColor: '#a3b35a',
    color: 'white',
  },
}
const accordionButtonSecondary = {
  bgcolor: 'transparent',
  color: 'rgba(255,255,255,0.95)',
  border: `1px solid ${LANDING_GREEN}`,
  '&:hover': {
    bgcolor: `${LANDING_GREEN_RGBA} 0.25)`,
    borderColor: '#a3b35a',
    color: 'white',
  },
}

export default function LandingPage() {
  const router = useRouter()
  const { locale, setLocale, t } = useLanguage()

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
            sx={{
              textAlign: 'center',
              fontWeight: 800,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'white',
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
              mb: 2,
            }}
          >
            {t('landing.heroTitle')}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.9)',
              fontSize: { xs: '1rem', sm: '1.125rem' },
              maxWidth: 480,
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6,
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
                backgroundColor: `${LANDING_GREEN_RGBA} 0.2)`,
                border: `1px solid ${LANDING_GREEN}`,
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
                <Button
                  fullWidth
                  size="large"
                  onClick={() => router.push('/portfolio')}
                  sx={accordionButtonPrimary}
                >
                  {t('landing.ctaPortfolio')}
                </Button>
                <Button
                  fullWidth
                  size="medium"
                  onClick={() => router.push('/logiciel')}
                  sx={accordionButtonSecondary}
                >
                  {t('nav.software')}
                </Button>
                <Button
                  fullWidth
                  size="medium"
                  onClick={() => router.push('/pageweb')}
                  sx={accordionButtonSecondary}
                >
                  {t('nav.webSites')}
                </Button>
                <Button
                  fullWidth
                  size="large"
                  onClick={() => router.push('/portfolio/contact')}
                  sx={accordionButtonSecondary}
                >
                  {t('landing.ctaContact')}
                </Button>
              </AccordionDetails>
            </Accordion>
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
        <Typography
          component="a"
          href="/portfolio"
          onClick={(e) => { e.preventDefault(); router.push('/portfolio') }}
          sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          {t('landing.footerPortfolio')}
        </Typography>
        <Typography component="span" sx={{ mx: 1, color: 'rgba(255,255,255,0.35)' }}>·</Typography>
        <Typography
          component="a"
          href="/logiciel"
          onClick={(e) => { e.preventDefault(); router.push('/logiciel') }}
          sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          {t('nav.software')}
        </Typography>
        <Typography component="span" sx={{ mx: 1, color: 'rgba(255,255,255,0.35)' }}>·</Typography>
        <Typography
          component="a"
          href="/pageweb"
          onClick={(e) => { e.preventDefault(); router.push('/pageweb') }}
          sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          {t('nav.webSites')}
        </Typography>
        <Typography component="span" sx={{ mx: 1, color: 'rgba(255,255,255,0.35)' }}>·</Typography>
        <Typography
          component="a"
          href="/portfolio/contact"
          onClick={(e) => { e.preventDefault(); router.push('/portfolio/contact') }}
          sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          {t('landing.footerContact')}
        </Typography>
      </Box>
    </Box>
  )
}
