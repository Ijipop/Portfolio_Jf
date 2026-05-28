'use client'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { usePathname } from 'next/navigation'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { shouldShowTopology } from '@/utils/topologyRoutes'

export type FaqItem = {
  question: string
  answer: string
}

type ServiceFaqSectionProps = {
  kicker: string
  title: string
  items: readonly FaqItem[]
  id?: string
}

export default function ServiceFaqSection({
  kicker,
  title,
  items,
  id = 'faq',
}: ServiceFaqSectionProps) {
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const textColor = useTextColor()
  const { primary } = useThemeColors()

  return (
    <Box id={id} component="section" sx={{ mb: { xs: 5, md: 8 }, scrollMarginTop: 96 }}>
      <ScrollReveal direction="up" delay={0.05}>
        <Box sx={{ textAlign: 'center', maxWidth: 780, mx: 'auto', mb: { xs: 3, md: 4.5 } }}>
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
            {kicker}
          </Typography>
          <Typography
            component="h2"
            variant="h3"
            sx={{
              color: textColor,
              fontWeight: 900,
              letterSpacing: '-0.05em',
              fontSize: { xs: '1.85rem', md: '2.75rem' },
              lineHeight: 1.08,
            }}
          >
            {title}
          </Typography>
        </Box>
      </ScrollReveal>

      <Box sx={{ maxWidth: 760, mx: 'auto' }}>
        {items.map((item, index) => (
          <ScrollReveal key={item.question} direction="up" delay={0.04 * index}>
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                mb: 1.5,
                borderRadius: '12px !important',
                overflow: 'hidden',
                border: `1px solid ${alpha(primary, 0.22)}`,
                bgcolor: 'transparent',
                '&:before': { display: 'none' },
                ...getCardSurfaceSx({
                  isTopologyRoute,
                  variant: 'glass',
                  level: 'soft',
                  interactive: false,
                }),
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: primary }} />}
                aria-controls={`faq-panel-${index}`}
                id={`faq-header-${index}`}
                sx={{
                  px: { xs: 2, sm: 2.5 },
                  py: 0.5,
                  '& .MuiAccordionSummary-content': { my: 1.25 },
                }}
              >
                <Typography
                  component="h3"
                  sx={{
                    color: textColor,
                    fontWeight: 700,
                    fontSize: { xs: '0.95rem', sm: '1.05rem' },
                    lineHeight: 1.45,
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 2, sm: 2.5 }, pt: 0, pb: 2 }}>
                <Typography
                  sx={{
                    color: textColor,
                    opacity: 0.88,
                    lineHeight: 1.7,
                    fontSize: { xs: '0.92rem', sm: '0.98rem' },
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </ScrollReveal>
        ))}
      </Box>
    </Box>
  )
}
