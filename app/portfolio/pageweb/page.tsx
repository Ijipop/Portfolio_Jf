'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AppBarComponent from '../../components/appBar'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import CTAButton from '../../components/shared/CTAButton'
import SectionDisplayTitle from '../../components/shared/SectionDisplayTitle'
import ScrollReveal from '../../components/shared/ScrollReveal'
import Footer from '../../components/Footer'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTextColor } from '../../hooks/useTextColor'
import { useThemeColors } from '../../hooks/useThemeColors'

const PAGE_WEB_BULLET_KEYS = ['pageweb.bullet1', 'pageweb.bullet2', 'pageweb.bullet3'] as const

const PAGE_WEB_AMBIENT_VIDEO = '/img/acceuillooping.mp4'

export default function PagewebPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary, secondary } = useThemeColors()

  return (
    <PageWrapper backgroundVariant="default">
      <AppBarComponent />
      <InteractiveBackgroundSection>
        <Box
          component="main"
          sx={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            py: { xs: 4, sm: 6, md: 8 },
            px: { xs: 1.5, sm: 2, md: 3 },
          }}
        >
          <Container maxWidth="md">
            <SectionDisplayTitle component="h1" sx={{ mb: 2 }}>
              {t('pageweb.title')}
            </SectionDisplayTitle>
            <Typography
              sx={{
                textAlign: 'center',
                mb: 3,
                maxWidth: 640,
                mx: 'auto',
                lineHeight: 1.7,
                color: textColor,
                opacity: 0.92,
              }}
            >
              {t('pageweb.intro')}
            </Typography>

            <ScrollReveal direction="up" delay={0.06}>
              <Box
                sx={{
                  my: { xs: 3, sm: 4 },
                  mx: 'auto',
                  maxWidth: 720,
                  position: 'relative',
                  borderRadius: `${DESIGN_TOKENS.borderRadius.large}px`,
                  overflow: 'hidden',
                  border: `1px solid ${alpha(primary, 0.28)}`,
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? `0 20px 56px ${alpha(primary, 0.2)}, 0 0 0 1px ${alpha('#fff', 0.06)} inset`
                      : `0 22px 50px ${alpha(primary, 0.14)}, 0 0 0 1px ${alpha('#fff', 0.55)} inset`,
                  aspectRatio: '16 / 9',
                  background: (theme) =>
                    theme.palette.mode === 'dark' ? alpha('#020617', 0.75) : alpha('#ffffff', 0.5),
                }}
              >
                <Box
                  component="video"
                  src={PAGE_WEB_AMBIENT_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: 0.92,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: `linear-gradient(145deg, ${alpha(primary, 0.2)} 0%, transparent 42%, ${alpha(secondary, 0.18)} 100%)`,
                  }}
                />
                <Box
                  sx={(theme) => ({
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: `linear-gradient(to top, ${
                      theme.palette.mode === 'dark' ? alpha('#0f172a', 0.38) : alpha(primary, 0.1)
                    } 0%, transparent 42%)`,
                  })}
                />
              </Box>
            </ScrollReveal>

            <Box
              component="ul"
              sx={{
                maxWidth: 640,
                mx: 'auto',
                mb: 4,
                pl: { xs: 2.5, sm: 3 },
                color: textColor,
                opacity: 0.9,
                '& li': { mb: 1.25, lineHeight: 1.65 },
              }}
            >
              {PAGE_WEB_BULLET_KEYS.map((key) => (
                <Typography key={key} component="li" variant="body1">
                  {t(key)}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Link href="/portfolio/contact#diagnostic-ia" style={{ textDecoration: 'none' }}>
                <CTAButton variant="primary" size="large">
                  {t('home.aiImpactPrimaryCta')}
                </CTAButton>
              </Link>
              <CTAButton
                variant="outline"
                size="large"
                onClick={() => router.push('/portfolio/projets')}
              >
                {t('pageweb.ctaProjects')}
              </CTAButton>
            </Box>
          </Container>
        </Box>
      </InteractiveBackgroundSection>
      <Footer />
    </PageWrapper>
  )
}
