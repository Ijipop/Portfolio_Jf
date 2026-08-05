'use client'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { SvgIconComponent } from '@mui/icons-material'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Cta from './HomeV2Cta'
import HomeV2Section from './HomeV2Section'
import { useHomeV2Tokens } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'
const SUPPORT_PATH = '/soutien-informatique-montreal'
const SOFTWARE_PATH = '/portfolio/projets?type=logiciel'

type ServiceCard = {
  id: string
  icon: SvgIconComponent
  titleKey: string
  leadKey: string
  bulletKeys: [string, string, string]
  ctaKey: string
  href: string
}

/** Trois piliers : sites web · soutien tech · logiciels. */
const SERVICE_CARDS: ServiceCard[] = [
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
    id: 'support',
    icon: SupportAgentOutlinedIcon,
    titleKey: 'homeV2.serviceSupportTitle',
    leadKey: 'homeV2.serviceSupportLead',
    bulletKeys: ['homeV2.serviceSupportB1', 'homeV2.serviceSupportB2', 'homeV2.serviceSupportB3'],
    ctaKey: 'homeV2.serviceSupportCta',
    href: SUPPORT_PATH,
  },
  {
    id: 'software',
    icon: DevicesOutlinedIcon,
    titleKey: 'homeV2.serviceSoftwareTitle',
    leadKey: 'homeV2.serviceSoftwareLead',
    bulletKeys: ['homeV2.serviceSoftwareB1', 'homeV2.serviceSoftwareB2', 'homeV2.serviceSoftwareB3'],
    ctaKey: 'homeV2.serviceSoftwareCta',
    href: SOFTWARE_PATH,
  },
]

function ServiceCardItem({ card, index }: { card: ServiceCard; index: number }) {
  const { t } = useLanguage()
  const { tokens: v2, cardSx } = useHomeV2Tokens()
  const Icon = card.icon

  return (
    <ScrollReveal delay={index * 0.08} distance={24}>
      <Box
        sx={{
          ...cardSx,
          p: { xs: 2.5, md: 3 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: v2.brandGlow,
            border: `1px solid ${v2.border}`,
            mb: 2,
          }}
        >
          <Icon sx={{ color: v2.brandOrange, fontSize: 24 }} />
        </Box>

        <Typography
          component="h3"
          sx={{
            fontFamily: v2.fontDisplay,
            fontWeight: 700,
            fontSize: '1.15rem',
            color: v2.text,
            mb: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {t(card.titleKey)}
        </Typography>

        <Typography
          sx={{
            fontFamily: v2.fontBody,
            fontSize: '0.9375rem',
            color: v2.textSecondary,
            lineHeight: 1.55,
            mb: 2,
          }}
        >
          {t(card.leadKey)}
        </Typography>

        <Stack spacing={0.75} sx={{ mb: 3, flex: 1 }}>
          {card.bulletKeys.map((key) => (
            <Stack key={key} direction="row" spacing={1} alignItems="flex-start">
              <CheckRoundedIcon sx={{ fontSize: 18, color: v2.brandOrange, mt: 0.15, flexShrink: 0 }} />
              <Typography
                sx={{
                  fontFamily: v2.fontBody,
                  fontSize: '0.875rem',
                  color: v2.textSecondary,
                  lineHeight: 1.45,
                }}
              >
                {t(key)}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <HomeV2Cta href={card.href} variant="outline" fullWidth>
          {t(card.ctaKey)}
        </HomeV2Cta>
      </Box>
    </ScrollReveal>
  )
}

export default function HomeV2Services() {
  const { t } = useLanguage()

  return (
    <HomeV2Section
      kicker={t('homeV2.servicesKicker')}
      title={t('homeV2.servicesTitle')}
      lead={t('homeV2.servicesLead')}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          alignItems: 'stretch',
        }}
      >
        {SERVICE_CARDS.map((card, index) => (
          <ServiceCardItem key={card.id} card={card} index={index} />
        ))}
      </Box>
    </HomeV2Section>
  )
}
