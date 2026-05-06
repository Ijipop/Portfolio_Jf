'use client'

import PersonIcon from '@mui/icons-material/Person'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

type TFn = (key: string) => string

type AboutProfileAccordionMobileProps = {
  t: TFn
  primary: string
  textColor: string
}

export default function AboutProfileAccordionMobile({
  t,
  primary,
  textColor,
}: AboutProfileAccordionMobileProps) {
  const theme = useTheme()
  const divider = alpha(primary, theme.palette.mode === 'dark' ? 0.2 : 0.12)

  const accordionSx = {
    background: 'transparent',
    boxShadow: 'none',
    '&:before': { display: 'none' },
    '&.Mui-expanded': { m: 0 },
    borderBottom: `1px solid ${divider}`,
    '&:last-of-type': { borderBottom: 'none' },
  } as const

  const summarySx = {
    px: 0,
    minHeight: 56,
    '& .MuiAccordionSummary-content': { my: 1.25, alignItems: 'center', gap: 2 },
  } as const

  return (
    <Stack spacing={0} sx={{ mb: 6 }}>
      <Accordion disableGutters elevation={0} sx={accordionSx}>
        <AccordionSummary
          data-testid="about-flip-card-who"
          expandIcon={<ExpandMoreIcon sx={{ color: primary }} />}
          sx={summarySx}
        >
          <PersonIcon sx={{ fontSize: 40, color: primary, flexShrink: 0 }} />
          <Box sx={{ textAlign: 'left', minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: primary, lineHeight: 1.25 }}>
              {t('about.subtitle')}
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.85, mt: 0.25 }}>
              {t('home.role')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
          <Typography component="h2" variant="h5" sx={{ fontWeight: 700, color: textColor, mb: 1.5 }}>
            Jean-François Lefebvre
          </Typography>
          <Typography variant="body1" sx={{ color: textColor, opacity: 0.9, lineHeight: 1.65, mb: 2 }}>
            {t('about.whoCardP1')}
          </Typography>
          <Typography variant="body1" sx={{ color: textColor, opacity: 0.9, lineHeight: 1.65 }}>
            {t('about.whoCardP2')}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters elevation={0} sx={accordionSx}>
        <AccordionSummary
          data-testid="about-flip-card-formation"
          expandIcon={<ExpandMoreIcon sx={{ color: primary }} />}
          sx={summarySx}
        >
          <SchoolIcon sx={{ fontSize: 40, color: primary, flexShrink: 0 }} />
          <Box sx={{ textAlign: 'left', minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: primary, lineHeight: 1.25 }}>
              {t('about.formation')}
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.85, mt: 0.25 }}>
              {t('about.formationDesc')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: textColor, mb: 1.5 }}>
            Formation
          </Typography>
          <Typography variant="body1" sx={{ color: textColor, opacity: 0.9, lineHeight: 1.65, mb: 1 }}>
            {"• DEP en soutien informatique à l'ÉMICA (2023-2024)"}
          </Typography>
          <Typography variant="body1" sx={{ color: textColor, opacity: 0.9, lineHeight: 1.65 }}>
            {
              "• AEC Développement de logiciels, sécurité d'applications de bureau, mobiles et Web au Cégep De Maisonneuve (2024-2026)"
            }
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters elevation={0} sx={accordionSx}>
        <AccordionSummary
          data-testid="about-flip-card-experience"
          expandIcon={<ExpandMoreIcon sx={{ color: primary }} />}
          sx={summarySx}
        >
          <WorkIcon sx={{ fontSize: 40, color: primary, flexShrink: 0 }} />
          <Box sx={{ textAlign: 'left', minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: primary, lineHeight: 1.25 }}>
              {t('about.experience')}
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.85, mt: 0.25 }}>
              {t('about.experienceText')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: textColor, mb: 1.5 }}>
            Expérience
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'left',
              lineHeight: 1.65,
              fontWeight: 600,
              color: textColor,
              opacity: 0.92,
            }}
          >
            {t('about.thanksMessage')}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}
