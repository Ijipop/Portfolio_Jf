'use client'

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import ThreeDCardComponent from '@/components/ThreeDCard'
import { BRAND_GLITCH_GRADIENT } from './IjipopGlitchTitle'
import ScrollReveal from './ScrollReveal'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'

const SERVICES = [
  {
    icon: LanguageOutlinedIcon,
    titleKey: 'home.servicesWebTitle',
    leadKey: 'home.servicesWebLead',
    bullets: ['home.servicesWebBullet1', 'home.servicesWebBullet2', 'home.servicesWebBullet3'],
  },
  {
    icon: TerminalOutlinedIcon,
    titleKey: 'home.servicesToolsTitle',
    leadKey: 'home.servicesToolsLead',
    bullets: ['home.servicesToolsBullet1', 'home.servicesToolsBullet2', 'home.servicesToolsBullet3'],
  },
  {
    icon: AutoAwesomeOutlinedIcon,
    titleKey: 'home.servicesDirectionTitle',
    leadKey: 'home.servicesDirectionLead',
    bullets: ['home.servicesDirectionBullet1', 'home.servicesDirectionBullet2', 'home.servicesDirectionBullet3'],
  },
]

export default function PortfolioServicesSection() {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary } = useThemeColors()

  return (
    <Box sx={{ mb: { xs: 5, md: 8 } }}>
      <ScrollReveal direction="up" delay={0.05}>
        <Box sx={{ textAlign: 'center', maxWidth: 820, mx: 'auto', mb: { xs: 3, md: 4 } }}>
          <Typography
            component="p"
            sx={{
              color: primary,
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontSize: '0.78rem',
              mb: 1,
            }}
          >
            {t('home.servicesKicker')}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: textColor,
              fontWeight: 900,
              letterSpacing: '-0.05em',
              fontSize: { xs: '2rem', md: '3.1rem' },
              lineHeight: 1.05,
            }}
          >
            {t('home.servicesTitle')}
          </Typography>
        </Box>
      </ScrollReveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          alignItems: 'stretch',
        }}
      >
        {SERVICES.map((service, index) => {
          const Icon = service.icon
          return (
            <ScrollReveal key={service.titleKey} direction="up" delay={0.06 * index} fillHeight>
              <ThreeDCardComponent
                fullHeight
                borderBeam={{ duration: 52, size: 180, delay: index * 4 }}
                floatingElements={1}
                sx={{
                  minHeight: 330,
                  p: { xs: 2.25, md: 2.75 },
                  '& .MuiCardContent-root': {
                    pb: '24px !important',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: DESIGN_TOKENS.borderRadius.medium,
                      display: 'grid',
                      placeItems: 'center',
                      mb: 2,
                      background: BRAND_GLITCH_GRADIENT,
                      boxShadow: `0 18px 38px ${primary}2f`,
                    }}
                  >
                    <Icon sx={{ color: 'white', fontSize: 30 }} />
                  </Box>
                  <Typography variant="h5" sx={{ color: textColor, fontWeight: 900, mb: 1, lineHeight: 1.15 }}>
                    {t(service.titleKey)}
                  </Typography>
                  <Typography sx={{ color: textColor, opacity: 0.84, lineHeight: 1.6, mb: 2 }}>
                    {t(service.leadKey)}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'grid', gap: 0.85 }}>
                    {service.bullets.map((bullet) => (
                      <Typography
                        key={bullet}
                        component="li"
                        sx={{
                          color: textColor,
                          opacity: 0.86,
                          fontSize: '0.92rem',
                          display: 'flex',
                          gap: 1,
                          '&::before': {
                            content: '""',
                            width: 6,
                            height: 6,
                            mt: '0.55em',
                            flexShrink: 0,
                            borderRadius: '50%',
                            background: primary,
                          },
                        }}
                      >
                        {t(bullet)}
                      </Typography>
                    ))}
                  </Box>
                  <Box sx={{ mt: 'auto', pt: 2.5 }}>
                    <Link href="/portfolio/projets" style={{ textDecoration: 'none' }}>
                      <Typography
                        component="span"
                        sx={{
                          color: primary,
                          fontWeight: 900,
                          letterSpacing: '0.02em',
                          backgroundImage: `linear-gradient(${primary}, ${primary})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: '0 100%',
                          backgroundSize: '0% 2px',
                          transition: DESIGN_TOKENS.transitions.normal,
                          '&:hover': { backgroundSize: '100% 2px' },
                        }}
                      >
                        {t('home.servicesLink')}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </ThreeDCardComponent>
            </ScrollReveal>
          )
        })}
      </Box>
    </Box>
  )
}
