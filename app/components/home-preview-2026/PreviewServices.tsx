'use client'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DynamicFormOutlinedIcon from '@mui/icons-material/DynamicFormOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { SvgIconComponent } from '@mui/icons-material'
import { CONTACT_SUBJECT_IMPROVE_SITE } from '@/i18n/contactSubjects'
import { useLanguage } from '@/contexts/LanguageContext'
import PreviewCta from './PreviewCta'
import PreviewReveal from './PreviewReveal'
import PreviewSection from './PreviewSection'
import { PREVIEW } from './previewTokens'

const CONTACT_PATH = '/portfolio/contact'

type ServiceDef = {
  id: string
  icon: SvgIconComponent
  titleKey: string
  leadKey: string
  bulletKeys: [string, string, string]
  ctaKey: string
  href?: string
  improveSubject?: boolean
}

const SERVICES: ServiceDef[] = [
  {
    id: 'web',
    icon: LanguageOutlinedIcon,
    titleKey: 'homeV2.serviceWebTitle',
    leadKey: 'homeV2.serviceWebLead',
    bulletKeys: ['homeV2.serviceWebB1', 'homeV2.serviceWebB2', 'homeV2.serviceWebB3'],
    ctaKey: 'homeV2.serviceWebCta',
    href: CONTACT_PATH,
  },
  {
    id: 'refonte',
    icon: RefreshOutlinedIcon,
    titleKey: 'homeV2.serviceRefonteTitle',
    leadKey: 'homeV2.serviceRefonteLead',
    bulletKeys: ['homeV2.serviceRefonteB1', 'homeV2.serviceRefonteB2', 'homeV2.serviceRefonteB3'],
    ctaKey: 'homeV2.serviceRefonteCta',
    improveSubject: true,
  },
  {
    id: 'forms',
    icon: DynamicFormOutlinedIcon,
    titleKey: 'home.servicesFormsTitle',
    leadKey: 'home.servicesFormsLead',
    bulletKeys: ['home.servicesFormsBullet1', 'home.servicesFormsBullet2', 'home.servicesFormsBullet3'],
    ctaKey: 'homeV2.serviceWebCta',
    href: CONTACT_PATH,
  },
]

export default function PreviewServices() {
  const { t, locale } = useLanguage()

  return (
    <PreviewSection
      kicker={t('homeV2.servicesKicker')}
      title={t('homeV2.servicesTitle')}
      lead={t('homeV2.servicesLead')}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {SERVICES.map((service, index) => {
          const Icon = service.icon
          const href = service.improveSubject
            ? `${CONTACT_PATH}?subject=${encodeURIComponent(CONTACT_SUBJECT_IMPROVE_SITE[locale])}`
            : (service.href ?? CONTACT_PATH)

          return (
            <PreviewReveal key={service.id} delay={index * 0.08}>
              <Box
                sx={{
                  height: '100%',
                  p: { xs: 2.75, md: 3.25 },
                  borderRadius: `${PREVIEW.radius}px`,
                  border: `1px solid ${PREVIEW.border}`,
                  background: PREVIEW.surface,
                  backdropFilter: 'blur(16px)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: PREVIEW.borderHover,
                    boxShadow: `0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px ${PREVIEW.orangeGlow}`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '14px',
                    display: 'grid',
                    placeItems: 'center',
                    mb: 2.25,
                    background: PREVIEW.orangeGlow,
                    border: `1px solid ${PREVIEW.borderHover}`,
                  }}
                >
                  <Icon sx={{ color: PREVIEW.orangeLight, fontSize: 24 }} />
                </Box>
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: PREVIEW.fontDisplay,
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    letterSpacing: '-0.02em',
                    color: PREVIEW.text,
                    mb: 1,
                  }}
                >
                  {t(service.titleKey)}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: PREVIEW.fontBody,
                    fontSize: '0.95rem',
                    color: PREVIEW.textSecondary,
                    lineHeight: 1.55,
                    mb: 2,
                  }}
                >
                  {t(service.leadKey)}
                </Typography>
                <Stack spacing={0.9} sx={{ mb: 3, flex: 1 }}>
                  {service.bulletKeys.map((key) => (
                    <Stack key={key} direction="row" spacing={1} alignItems="flex-start">
                      <CheckRoundedIcon sx={{ fontSize: 18, color: PREVIEW.orange, mt: 0.2, flexShrink: 0 }} />
                      <Typography
                        sx={{
                          fontFamily: PREVIEW.fontBody,
                          fontSize: '0.875rem',
                          color: PREVIEW.textSecondary,
                          lineHeight: 1.45,
                        }}
                      >
                        {t(key)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                <PreviewCta href={href} variant="ghost" fullWidth>
                  {t(service.ctaKey)}
                </PreviewCta>
              </Box>
            </PreviewReveal>
          )
        })}
      </Box>
    </PreviewSection>
  )
}
