'use client'

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { memo } from 'react'
import HeaderSection from '@/components/shared/HeaderSection'
import ContactCoffeeVideo from '@/components/contact/ContactCoffeeVideo'
import { SITE_DARK } from '@/design-system/siteDark'

type ContactPageHeaderProps = {
  titleText: string
  subtitle: string
}

export const ContactPageHeader = memo(function ContactPageHeader({
  titleText,
  subtitle,
}: ContactPageHeaderProps) {
  return <HeaderSection title={titleText} subtitle={subtitle} />
})

type ContactLocationCardProps = {
  locationTitle: string
  locationCity: string
  primary: string
  textColor: string
  compact: boolean
}

export const ContactLocationCard = memo(function ContactLocationCard({
  locationTitle,
  locationCity,
  primary,
  textColor,
  compact,
}: ContactLocationCardProps) {
  return (
    <Box
      className="perf-cv-auto"
      sx={{
        maxWidth: 520,
        mx: 'auto',
        mb: compact ? 3 : 4,
        py: 2.5,
        px: 2,
        textAlign: 'center',
        borderTop: `1px solid ${SITE_DARK.border}`,
        borderBottom: `1px solid ${SITE_DARK.border}`,
      }}
    >
      <LocationOnIcon sx={{ fontSize: 22, color: primary, mb: 0.75, opacity: 0.9 }} />
      <Typography
        variant="subtitle2"
        sx={{
          color: SITE_DARK.textSecondary,
          fontWeight: 600,
          fontFamily: 'var(--font-display), Outfit, sans-serif',
          letterSpacing: '-0.01em',
          mb: 0.35,
        }}
      >
        {locationTitle}
      </Typography>
      <Typography variant="body2" sx={{ color: textColor, opacity: 0.78, lineHeight: 1.55 }}>
        {locationCity}
      </Typography>
    </Box>
  )
})

type ContactSocialSectionProps = {
  followMeTitle: string
  compact: boolean
}

const SOCIAL_LINKS = [
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/jean-fran%C3%A7ois-lefebvre-92380329a/',
    Icon: LinkedInIcon,
    label: 'LinkedIn',
  },
  {
    key: 'github',
    href: 'https://github.com/Ijipop',
    Icon: GitHubIcon,
    label: 'GitHub',
  },
  {
    key: 'facebook',
    href: 'https://www.facebook.com/profile.php?id=61590097455032',
    Icon: FacebookIcon,
    label: 'Facebook',
  },
] as const

export const ContactSocialSection = memo(function ContactSocialSection({
  followMeTitle,
  compact,
}: ContactSocialSectionProps) {
  return (
    <Box className="perf-cv-auto" sx={{ mt: compact ? 2 : 3, mb: compact ? 3 : 4 }}>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mb: 1.5,
          textAlign: 'center',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          fontSize: '0.7rem',
          color: SITE_DARK.textMuted,
          fontFamily: 'var(--font-body), "Plus Jakarta Sans", sans-serif',
        }}
      >
        {followMeTitle}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2.5,
          mx: 'auto',
        }}
      >
        {SOCIAL_LINKS.map(({ key, href, Icon, label }) => (
          <Link
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            aria-label={label}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              color: SITE_DARK.textSecondary,
              transition: 'color 0.2s ease, transform 0.2s ease, background 0.2s ease',
              '&:hover': {
                color: SITE_DARK.brandOrange,
                background: `${SITE_DARK.brandOrange}14`,
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Icon sx={{ fontSize: 22 }} />
          </Link>
        ))}
      </Box>
    </Box>
  )
})

type ContactCoffeeSectionProps = {
  compact: boolean
}

export const ContactCoffeeSection = memo(function ContactCoffeeSection({
  compact,
}: ContactCoffeeSectionProps) {
  return (
    <Box className="perf-cv-auto">
      <ContactCoffeeVideo compact={compact} />
    </Box>
  )
})
