'use client'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { SvgIconComponent } from '@mui/icons-material'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Cta from './HomeV2Cta'
import HomeV2Section from './HomeV2Section'
import { useHomeV2Tokens } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'

type PackOffer = {
  id: string
  icon: SvgIconComponent
  titleKey: string
  priceKey: string
  pricePrefixKey?: string
  priceNoteKey?: string
  forKey: string
  bulletKeys: readonly string[]
  ctaKey: string
  subjectKey: string
  featured?: boolean
  badgeKey?: string
}

const PACK_OFFERS: PackOffer[] = [
  {
    id: 'audit',
    icon: ManageSearchOutlinedIcon,
    titleKey: 'home.servicesPackAuditTitle',
    priceKey: 'home.servicesPackAuditPrice',
    forKey: 'home.servicesPackAuditFor',
    bulletKeys: ['home.servicesPackAuditB1', 'home.servicesPackAuditB2', 'home.servicesPackAuditB3'],
    ctaKey: 'home.servicesPackAuditCta',
    subjectKey: 'home.servicesPackAuditSubject',
  },
  {
    id: 'minisite',
    icon: WebAssetOutlinedIcon,
    titleKey: 'home.servicesPackMinisiteTitle',
    priceKey: 'home.servicesPackMinisitePrice',
    forKey: 'home.servicesPackMinisiteFor',
    bulletKeys: ['home.servicesPackMinisiteB1', 'home.servicesPackMinisiteB2', 'home.servicesPackMinisiteB3'],
    ctaKey: 'home.servicesPackMinisiteCta',
    subjectKey: 'home.servicesPackMinisiteSubject',
  },
  {
    id: 'page',
    icon: LanguageOutlinedIcon,
    titleKey: 'home.servicesPackPageTitle',
    pricePrefixKey: 'home.servicesPackPriceFrom',
    priceKey: 'home.servicesPackPagePrice',
    forKey: 'home.servicesPackPageFor',
    bulletKeys: ['home.servicesPackPageB1', 'home.servicesPackPageB2', 'home.servicesPackPageB3'],
    ctaKey: 'home.servicesPackPageCta',
    subjectKey: 'home.servicesPackPageSubject',
    featured: true,
    badgeKey: 'home.servicesPackPageBadge',
  },
  {
    id: 'software',
    icon: CodeOutlinedIcon,
    titleKey: 'home.servicesPackSoftwareTitle',
    pricePrefixKey: 'home.servicesPackPriceFromDes',
    priceKey: 'home.servicesPackSoftwarePrice',
    forKey: 'home.servicesPackSoftwareFor',
    bulletKeys: ['home.servicesPackSoftwareB1', 'home.servicesPackSoftwareB2', 'home.servicesPackSoftwareB3'],
    ctaKey: 'home.servicesPackSoftwareCta',
    subjectKey: 'home.servicesPackSoftwareSubject',
  },
  {
    id: 'support',
    icon: ComputerOutlinedIcon,
    titleKey: 'home.servicesPackSupportTitle',
    priceKey: 'home.servicesPackSupportPrice',
    forKey: 'home.servicesPackSupportFor',
    bulletKeys: ['home.servicesPackSupportB1', 'home.servicesPackSupportB2', 'home.servicesPackSupportB3'],
    ctaKey: 'home.servicesPackSupportCta',
    subjectKey: 'home.servicesPackSupportSubject',
  },
]

function contactHref(subject: string) {
  return `${CONTACT_PATH}?subject=${encodeURIComponent(subject)}`
}

function PricingCard({ offer, index }: { offer: PackOffer; index: number }) {
  const { t } = useLanguage()
  const { tokens: v2, cardSx, featuredCardSx } = useHomeV2Tokens()
  const Icon = offer.icon
  const featured = offer.featured === true
  const href = contactHref(t(offer.subjectKey))

  return (
    <ScrollReveal delay={index * 0.1} distance={28} uncappedDelay>
      <Box
        sx={{
          ...(featured ? featuredCardSx : cardSx),
          p: { xs: 2.5, md: 3 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gridColumn: featured ? { md: 'span 2' } : undefined,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: featured ? BRAND_GLITCH_GRADIENT : v2.brandGlow,
            }}
          >
            <Icon sx={{ color: featured ? '#fff' : v2.brandOrange, fontSize: 22 }} />
          </Box>
          {offer.badgeKey ? (
            <Typography
              sx={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                px: 1.25,
                py: 0.5,
                borderRadius: '6px',
                background: v2.brandGlow,
                color: v2.brandOrange,
                border: `1px solid ${v2.borderHover}`,
              }}
            >
              {t(offer.badgeKey)}
            </Typography>
          ) : null}
        </Stack>

        <Typography component="h3" sx={{ fontWeight: 700, fontSize: featured ? '1.25rem' : '1.0625rem', color: v2.text, mb: 0.75 }}>
          {t(offer.titleKey)}
        </Typography>

        <Typography sx={{ fontSize: featured ? '1.75rem' : '1.5rem', fontWeight: 800, color: v2.text, mb: 0.5, letterSpacing: '-0.02em' }}>
          {offer.pricePrefixKey ? `${t(offer.pricePrefixKey)} ` : ''}
          {t(offer.priceKey)}
        </Typography>

        <Typography sx={{ fontSize: '0.875rem', color: v2.textMuted, lineHeight: 1.45, mb: 2 }}>
          {t(offer.forKey)}
        </Typography>

        <Stack spacing={0.75} sx={{ mb: 3, flex: 1 }}>
          {offer.bulletKeys.map((key) => (
            <Stack key={key} direction="row" spacing={1} alignItems="flex-start">
              <CheckRoundedIcon sx={{ fontSize: 17, color: v2.brandOrange, mt: 0.15, flexShrink: 0 }} />
              <Typography sx={{ fontSize: '0.8125rem', color: v2.textSecondary, lineHeight: 1.45 }}>
                {t(key)}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <HomeV2Cta href={href} variant={featured ? 'primary' : 'secondary'} fullWidth>
          {t(offer.ctaKey)}
        </HomeV2Cta>
      </Box>
    </ScrollReveal>
  )
}

export default function HomeV2Pricing() {
  const { t } = useLanguage()
  const { tokens: v2 } = useHomeV2Tokens()

  const featured = PACK_OFFERS.find((o) => o.featured)!
  const others = PACK_OFFERS.filter((o) => !o.featured)

  return (
    <HomeV2Section
      id="forfaits"
      kicker={t('homeV2.pricingKicker')}
      title={t('homeV2.pricingTitle')}
      lead={t('homeV2.pricingLead')}
    >
      <Box sx={{ mb: 3 }}>
        <PricingCard offer={featured} index={0} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          alignItems: 'stretch',
        }}
      >
        {others.map((offer, index) => (
          <PricingCard key={offer.id} offer={offer} index={index + 1} />
        ))}
      </Box>

      <Typography
        sx={{
          mt: 3,
          fontSize: '0.875rem',
          color: v2.textMuted,
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        {t('homeV2.pricingFootnote')}
      </Typography>
    </HomeV2Section>
  )
}
