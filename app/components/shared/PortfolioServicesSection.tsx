'use client'

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import CTAButton from '@/components/shared/CTAButton'
import {
  BRAND_GLITCH_GRADIENT,
  buildPaletteGlitchGradient,
} from './IjipopGlitchTitle'
import ScrollReveal from './ScrollReveal'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import type { SvgIconComponent } from '@mui/icons-material'

const CONTACT_PATH = '/portfolio/contact'
const TIMELENDR_PATH = '/logiciel/timelendr'
/** Nombre de lignes « puce » — identique sur les 4 cartes pour l’alignement visuel. */
const PACK_BULLET_SLOTS = 4
const PACK_BULLET_ROW_MIN = 48
/** Bandeau orange : hauteur identique sur les 4 cartes (notes longues incluses). */
const PACK_HEADER_HEIGHT = { xs: 236, md: 248 }
const PACK_HEADER_TITLE_ROW_MIN = 52
const PACK_HEADER_PREFIX_ROW_MIN = 22
const PACK_HEADER_NOTE_MIN = { xs: 92, md: 96 }

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
  secondaryCtaKey?: string
  secondaryHref?: string
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
    id: 'page',
    icon: LanguageOutlinedIcon,
    titleKey: 'home.servicesPackPageTitle',
    pricePrefixKey: 'home.servicesPackPriceFrom',
    priceKey: 'home.servicesPackPagePrice',
    priceNoteKey: 'home.servicesPackPagePriceNote',
    forKey: 'home.servicesPackPageFor',
    bulletKeys: [
      'home.servicesPackPageB1',
      'home.servicesPackPageB2',
      'home.servicesPackPageB3',
      'home.servicesPackPageB4',
    ],
    ctaKey: 'home.servicesPackPageCta',
    subjectKey: 'home.servicesPackPageSubject',
    featured: true,
    badgeKey: 'home.servicesPackPageBadge',
  },
  {
    id: 'maintain',
    icon: BuildOutlinedIcon,
    titleKey: 'home.servicesPackMaintainTitle',
    priceKey: 'home.servicesPackMaintainPrice',
    forKey: 'home.servicesPackMaintainFor',
    bulletKeys: [
      'home.servicesPackMaintainB1',
      'home.servicesPackMaintainB2',
      'home.servicesPackMaintainB3',
    ],
    ctaKey: 'home.servicesPackMaintainCta',
    subjectKey: 'home.servicesPackMaintainSubject',
  },
  {
    id: 'software',
    icon: CodeOutlinedIcon,
    titleKey: 'home.servicesPackSoftwareTitle',
    pricePrefixKey: 'home.servicesPackPriceFrom',
    priceKey: 'home.servicesPackSoftwarePrice',
    priceNoteKey: 'home.servicesPackSoftwarePriceNote',
    forKey: 'home.servicesPackSoftwareFor',
    bulletKeys: [
      'home.servicesPackSoftwareB1',
      'home.servicesPackSoftwareB2',
      'home.servicesPackSoftwareB3',
      'home.servicesPackSoftwareB4',
    ],
    ctaKey: 'home.servicesPackSoftwareCta',
    subjectKey: 'home.servicesPackSoftwareSubject',
    secondaryCtaKey: 'home.servicesPackSoftwareDemoCta',
    secondaryHref: TIMELENDR_PATH,
  },
]

function contactHref(subject: string) {
  return `${CONTACT_PATH}?subject=${encodeURIComponent(subject)}`
}

type OfferPackCardProps = {
  offer: PackOffer
  href: string
  serviceGradient: string
  textColor: string
  primary: string
  secondary: string
  isTopologyRoute: boolean
}

function OfferPackCard({
  offer,
  href,
  serviceGradient,
  textColor,
  primary,
  secondary,
  isTopologyRoute,
}: OfferPackCardProps) {
  const { t } = useLanguage()
  const theme = useTheme()
  const Icon = offer.icon
  const isDark = theme.palette.mode === 'dark'
  const featured = offer.featured === true

  const surfaceSx = getCardSurfaceSx({
    isTopologyRoute,
    variant: featured ? 'elevated' : 'glass',
    level: featured ? 'balanced' : 'soft',
    interactive: false,
  })

  const cardBg = featured
    ? isDark
      ? `linear-gradient(165deg, ${alpha(primary, 0.22)} 0%, ${alpha('#0f172a', 0.92)} 38%, ${alpha(secondary, 0.12)} 100%)`
      : `linear-gradient(165deg, ${alpha(primary, 0.12)} 0%, ${alpha('#fff', 0.98)} 42%, ${alpha(secondary, 0.08)} 100%)`
    : isDark
      ? `linear-gradient(160deg, ${alpha('#1e293b', 0.85)} 0%, ${alpha('#0f172a', 0.75)} 100%)`
      : `linear-gradient(160deg, ${alpha('#fff', 0.96)} 0%, ${alpha(primary, 0.04)} 100%)`

  const cardRadius = DESIGN_TOKENS.borderRadius.banner
  const innerRadius = DESIGN_TOKENS.borderRadius.bannerInner

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: cardRadius,
        overflow: 'hidden',
        background: cardBg,
        border: `1px solid ${alpha(primary, featured ? 0.4 : isDark ? 0.28 : 0.18)}`,
        boxShadow: featured
          ? `0 20px 44px ${alpha(primary, 0.18)}, 0 0 0 1px ${alpha(primary, 0.1)}`
          : `0 12px 32px ${alpha(isDark ? '#000' : primary, isDark ? 0.3 : 0.08)}`,
        transition: DESIGN_TOKENS.transitions.slow,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: featured
            ? `0 24px 48px ${alpha(primary, 0.22)}`
            : `0 16px 36px ${alpha(primary, 0.12)}`,
        },
        ...surfaceSx,
      }}
    >
      {/* Bandeau dégradé — hauteur fixe identique sur les 4 cartes */}
      <Box
        sx={{
          position: 'relative',
          flexShrink: 0,
          height: PACK_HEADER_HEIGHT,
          px: { xs: 2, md: 2.25 },
          pt: { xs: 2, md: 2.25 },
          pb: 1.75,
          background: serviceGradient,
          display: 'flex',
          flexDirection: 'column',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 55%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 1,
            flexShrink: 0,
            minHeight: PACK_HEADER_TITLE_ROW_MIN,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                flexShrink: 0,
                borderRadius: innerRadius,
                display: 'grid',
                placeItems: 'center',
                bgcolor: alpha('#fff', 0.2),
                border: `1px solid ${alpha('#fff', 0.32)}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <Icon sx={{ color: '#fff', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                color: '#fff',
                fontWeight: 900,
                fontSize: { xs: '1.35rem', md: '1.5rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                textShadow: `0 2px 10px ${alpha('#000', 0.18)}`,
                flex: 1,
                minWidth: 0,
              }}
            >
              {t(offer.titleKey)}
            </Typography>
          </Box>
          {offer.badgeKey ? (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 0.45,
                flexShrink: 0,
                px: 1.1,
                py: 0.5,
                borderRadius: 999,
                maxWidth: '42%',
                background: `linear-gradient(135deg, #fffef7 0%, #fde68a 42%, #fbbf24 100%)`,
                color: '#78350f',
                fontWeight: 800,
                fontSize: '0.62rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1.15,
                textAlign: 'right',
                boxShadow: `0 4px 16px ${alpha('#000', 0.22)}, inset 0 1px 0 ${alpha('#fff', 0.75)}`,
                border: `1px solid ${alpha('#fff', 0.65)}`,
                '@keyframes offerBadgeSparkle': {
                  '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
                  '50%': { transform: 'scale(1.12) rotate(-8deg)', opacity: 0.92 },
                },
              }}
            >
              <AutoAwesomeOutlinedIcon
                sx={{
                  fontSize: 13,
                  color: '#b45309',
                  flexShrink: 0,
                  '@media (prefers-reduced-motion: no-preference)': {
                    animation: 'offerBadgeSparkle 2.6s ease-in-out infinite',
                  },
                }}
                aria-hidden
              />
              <Box component="span">{t(offer.badgeKey)}</Box>
            </Box>
          ) : null}
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              minHeight: PACK_HEADER_PREFIX_ROW_MIN,
              display: 'flex',
              alignItems: 'flex-end',
              mb: 0.35,
            }}
          >
            {offer.pricePrefixKey ? (
              <Typography
                component="p"
                sx={{
                  color: alpha('#fff', 0.88),
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  m: 0,
                }}
              >
                {t(offer.pricePrefixKey)}
              </Typography>
            ) : null}
          </Box>
          <Typography
            component="p"
            sx={{
              flexShrink: 0,
              color: '#fff',
              fontWeight: 900,
              fontSize: { xs: '1.5rem', md: '1.65rem' },
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textShadow: `0 2px 10px ${alpha('#000', 0.18)}`,
              m: 0,
            }}
          >
            {t(offer.priceKey)}
          </Typography>
          <Box
            sx={{
              flexShrink: 0,
              minHeight: PACK_HEADER_NOTE_MIN,
              mt: 0.5,
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            {offer.priceNoteKey ? (
              <Typography
                sx={{
                  color: alpha('#fff', 0.88),
                  fontSize: '0.72rem',
                  lineHeight: 1.4,
                  fontWeight: 500,
                  m: 0,
                }}
              >
                {t(offer.priceNoteKey)}
              </Typography>
            ) : null}
          </Box>
        </Box>
      </Box>

      {/* Corps */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 2.25, md: 2.5 },
          py: { xs: 2, md: 2.25 },
          gap: 1.5,
        }}
      >
        <Box sx={{ minHeight: { xs: 72, md: 76 } }}>
          <Typography
            sx={{
              color: textColor,
              opacity: 0.78,
              fontSize: '0.875rem',
              lineHeight: 1.5,
              fontStyle: 'italic',
              minHeight: '3em',
            }}
          >
            {t(offer.forKey)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: `repeat(${PACK_BULLET_SLOTS}, minmax(${PACK_BULLET_ROW_MIN}px, auto))`,
            gap: 0.75,
            flex: 1,
          }}
        >
          {Array.from({ length: PACK_BULLET_SLOTS }, (_, i) => {
            const key = offer.bulletKeys[i]
            if (!key) {
              return <Box key={`bullet-pad-${offer.id}-${i}`} aria-hidden />
            }
            return (
            <Box
              key={key}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                py: 0.75,
                px: 1,
                minHeight: PACK_BULLET_ROW_MIN,
                borderRadius: innerRadius,
                bgcolor: alpha(primary, isDark ? 0.12 : 0.06),
                border: `1px solid ${alpha(primary, isDark ? 0.2 : 0.1)}`,
              }}
            >
              <CheckRoundedIcon
                sx={{ fontSize: 18, color: primary, mt: '1px', flexShrink: 0 }}
                aria-hidden
              />
              <Typography
                sx={{
                  color: textColor,
                  opacity: 0.92,
                  fontSize: '0.84rem',
                  lineHeight: 1.45,
                  fontWeight: 500,
                }}
              >
                {t(key)}
              </Typography>
            </Box>
            )
          })}
        </Box>

        <Box sx={{ mt: 'auto', pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <CTAButton
            fullWidth
            size="medium"
            variant={featured ? 'primary' : 'outline'}
            href={href}
          >
            {t(offer.ctaKey)}
          </CTAButton>
          {offer.secondaryCtaKey && offer.secondaryHref ? (
            <CTAButton fullWidth size="small" variant="outline" href={offer.secondaryHref}>
              {t(offer.secondaryCtaKey)}
            </CTAButton>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}

export default function PortfolioServicesSection() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { mode: presentationMode } = usePresentationMode()
  const textColor = useTextColor()
  const { primary, secondary, accent } = useThemeColors()
  const subtitle = t('home.servicesHomeSubtitle')

  const serviceGradient = useMemo(
    () =>
      presentationMode === 'beige'
        ? BRAND_GLITCH_GRADIENT
        : buildPaletteGlitchGradient(primary, secondary, accent),
    [presentationMode, primary, secondary, accent],
  )

  return (
    <Box id="services" sx={{ mb: { xs: 5, md: 8 }, scrollMarginTop: 96 }}>
      <ScrollReveal direction="up" delay={0.05}>
        <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: { xs: 3, md: 4 } }}>
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
            {t('home.servicesHomeKicker')}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: textColor,
              fontWeight: 900,
              letterSpacing: '-0.05em',
              fontSize: { xs: '1.85rem', md: '2.75rem' },
              lineHeight: 1.08,
              mb: subtitle ? 1.25 : 0,
            }}
          >
            {t('home.servicesHomeTitle')}
          </Typography>
          {subtitle ? (
            <Typography
              component="p"
              sx={{
                color: textColor,
                opacity: 0.8,
                fontSize: { xs: '0.95rem', sm: '1rem' },
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      </ScrollReveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          alignItems: 'stretch',
        }}
      >
        {PACK_OFFERS.map((offer, index) => {
          const subject = t(offer.subjectKey)
          const href = contactHref(subject)

          return (
            <ScrollReveal key={offer.id} direction="up" delay={0.06 * index} fillHeight>
              <OfferPackCard
                offer={offer}
                href={href}
                serviceGradient={serviceGradient}
                textColor={textColor}
                primary={primary}
                secondary={secondary}
                isTopologyRoute={isTopologyRoute}
              />
            </ScrollReveal>
          )
        })}
      </Box>

      <ScrollReveal direction="up" delay={0.1}>
        <Typography
          component="p"
          sx={{
            textAlign: 'center',
            maxWidth: 520,
            mx: 'auto',
            mt: { xs: 3, md: 3.5 },
            color: textColor,
            opacity: 0.78,
            fontSize: { xs: '0.9rem', sm: '0.95rem' },
            lineHeight: 1.6,
            px: { xs: 0.5, sm: 0 },
          }}
        >
          {t('home.servicesHomeFootnote')}
        </Typography>
      </ScrollReveal>
    </Box>
  )
}
