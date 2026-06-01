'use client'

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import CTAButton from '@/components/shared/CTAButton'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'

type ContactSuccessDialogProps = {
  open: boolean
  onClose: () => void
}

export default function ContactSuccessDialog({ open, onClose }: ContactSuccessDialogProps) {
  const theme = useTheme()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="contact-merci-title"
      aria-describedby="contact-merci-desc"
      PaperProps={{
        sx: {
          borderRadius: DESIGN_TOKENS.borderRadius.medium,
          maxWidth: 420,
          width: 'calc(100% - 2rem)',
          mx: 1,
          overflow: 'hidden',
          background: isDark
            ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(145deg, #fffefb 0%, #f8fafc 100%)',
          border: `1px solid ${primary}40`,
          boxShadow: `0 24px 56px ${primary}28`,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          },
        },
      }}
    >
      <DialogContent sx={{ textAlign: 'center', pt: 3.5, pb: 1, px: { xs: 2.5, sm: 3.5 } }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            mx: 'auto',
            mb: 2,
            display: 'grid',
            placeItems: 'center',
            background: `linear-gradient(145deg, ${primary}28, ${primary}12)`,
            border: `1px solid ${primary}45`,
          }}
        >
          <CheckCircleRoundedIcon sx={{ fontSize: 38, color: primary }} />
        </Box>
        <Typography
          id="contact-merci-title"
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.03em',
            mb: 1.5,
            color: primary,
          }}
        >
          {t('contact.merciTitle')}
        </Typography>
        <Typography
          id="contact-merci-desc"
          variant="body1"
          sx={{
            color: textColor,
            opacity: 0.92,
            lineHeight: 1.65,
            whiteSpace: 'pre-line',
            fontSize: { xs: '0.9375rem', sm: '1rem' },
          }}
        >
          {t('contact.merciBody')}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
        <CTAButton variant="primary" onClick={onClose} sx={{ minWidth: 200 }}>
          {t('contact.merciClose')}
        </CTAButton>
      </DialogActions>
    </Dialog>
  )
}
