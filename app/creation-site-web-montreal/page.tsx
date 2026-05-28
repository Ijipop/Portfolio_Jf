'use client'

import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AppBarComponent from '@/components/appBar'
import Footer from '@/components/Footer'
import PortfolioProcessSection from '@/components/shared/PortfolioProcessSection'
import PortfolioServicesSection from '@/components/shared/PortfolioServicesSection'
import CTAButton from '@/components/shared/CTAButton'
import InteractiveBackgroundSection from '@/components/shared/InteractiveBackgroundSection'
import PageWrapper from '@/components/shared/PageWrapper'
import ScrollReveal from '@/components/shared/ScrollReveal'
import SectionDisplayTitle from '@/components/shared/SectionDisplayTitle'
import ServiceFaqSection from '@/components/seo/ServiceFaqSection'
import { seoLandingContent } from '@/content/creation-site-web-montreal.fr'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'

const PAGE_WEB_AMBIENT_VIDEO = '/img/acceuillooping.mp4'

export default function CreationSiteWebMontrealPage() {
  const router = useRouter()
  const textColor = useTextColor()
  const { primary, secondary } = useThemeColors()
  const contactHref = `/portfolio/contact?subject=${encodeURIComponent(seoLandingContent.contactSubject)}`

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
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 720, mx: 'auto', mb: { xs: 5, md: 8 } }}>
              <SectionDisplayTitle component="h1" sx={{ mb: 2 }}>
                {seoLandingContent.h1}
              </SectionDisplayTitle>
              <Typography
                component="p"
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
                {seoLandingContent.intro}
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
                  listStyle: 'none',
                  '& li': { mb: 2, lineHeight: 1.65 },
                }}
              >
                {seoLandingContent.offers.map((offer) => (
                  <Box key={offer.title} component="li">
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{ fontWeight: 800, color: textColor, mb: 0.5, fontSize: '1.05rem' }}
                    >
                      {offer.title}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      {offer.description}
                    </Typography>
                  </Box>
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
                <Link href={contactHref} style={{ textDecoration: 'none' }}>
                  <CTAButton variant="primary" size="large">
                    {seoLandingContent.ctaPrimary}
                  </CTAButton>
                </Link>
                <CTAButton
                  variant="outline"
                  size="large"
                  onClick={() => router.push('/portfolio/projets')}
                >
                  {seoLandingContent.ctaSecondary}
                </CTAButton>
              </Box>
            </Box>

            <PortfolioServicesSection />
            <PortfolioProcessSection />
            <ServiceFaqSection
              kicker={seoLandingContent.faqKicker}
              title={seoLandingContent.faqTitle}
              items={seoLandingContent.faq}
            />

            <Box sx={{ textAlign: 'center', mt: { xs: 2, md: 4 }, mb: { xs: 2, md: 4 } }}>
              <LanguageOutlinedIcon sx={{ fontSize: 56, color: primary, mb: 2 }} aria-hidden />
              <Typography
                component="h2"
                variant="h3"
                sx={{
                  ...DESIGN_TOKENS.typography.h3,
                  mb: DESIGN_TOKENS.spacing.md,
                  color: textColor,
                  fontWeight: 900,
                }}
              >
                {seoLandingContent.ctaFinalTitle}
              </Typography>
              <Typography
                sx={{
                  maxWidth: 700,
                  mx: 'auto',
                  mb: DESIGN_TOKENS.spacing.xl,
                  color: textColor,
                  opacity: 0.9,
                  lineHeight: 1.7,
                  fontSize: '1.05rem',
                }}
              >
                {seoLandingContent.ctaFinalBody}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={contactHref} style={{ textDecoration: 'none' }}>
                  <CTAButton variant="primary" size="large">
                    {seoLandingContent.ctaFinalContact}
                  </CTAButton>
                </Link>
                <CTAButton
                  variant="outline"
                  size="large"
                  onClick={() => router.push('/portfolio/projets')}
                >
                  {seoLandingContent.ctaFinalProjects}
                </CTAButton>
              </Box>
            </Box>
          </Container>
        </Box>
      </InteractiveBackgroundSection>
      <Footer />
    </PageWrapper>
  )
}
