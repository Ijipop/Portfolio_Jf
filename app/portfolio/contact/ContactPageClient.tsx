'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Alert, Snackbar } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'
import { useSiteDarkChrome } from '../../hooks/useSiteDarkChrome'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import ContactSuccessDialog from '../../components/contact/ContactSuccessDialog'
import ContactForm from '../../components/contact/ContactForm'
import {
  ContactLocationCard,
  ContactPageHeader,
  ContactSocialSection,
} from '../../components/contact/ContactPageSections'
import ContactPhoneBar from '../../components/contact/ContactPhoneBar'
import { trackContactMerciPageView } from '@/lib/gtag'
import AppBarComponent from '../../components/appBar'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import Footer from '../../components/Footer'
import { useTextColor } from '../../hooks/useTextColor'
import { useLanguage } from '../../contexts/LanguageContext'
import { CONTACT_SUBJECT_TECH_SUPPORT } from '@/i18n/contactSubjects'
import { SITE_DARK } from '@/design-system/siteDark'

type ContactPageClientProps = {
  /** Route /portfolio/contact/merci : popup ouverte + page_view pour Analytics. */
  showMerciDialog?: boolean
}

export default function ContactPageClient({ showMerciDialog = false }: ContactPageClientProps) {
  const router = useRouter()
  const theme = useTheme()
  const siteDarkChrome = useSiteDarkChrome()
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'))
  const isTallViewport = useMediaQuery('(min-height: 1000px)', { noSsr: true })
  const useCompactContact = !isXlUp || !isTallViewport
  const textColor = useTextColor()
  const brand = SITE_DARK.brandOrange
  const { t, locale } = useLanguage()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [merciDialogOpen, setMerciDialogOpen] = useState(showMerciDialog)

  useEffect(() => {
    if (!showMerciDialog) return
    setMerciDialogOpen(true)
    trackContactMerciPageView()
  }, [showMerciDialog])

  const handleMerciDialogClose = () => {
    setMerciDialogOpen(false)
    if (showMerciDialog) {
      router.replace('/portfolio/contact')
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const showErrorSnackbar = useCallback((message: string) => {
    setSnackbarMessage(message)
    setSnackbarSeverity('error')
    setSnackbarOpen(true)
  }, [])

  const handleValidationError = useCallback(() => {
    showErrorSnackbar(t('contact.formErrors'))
  }, [showErrorSnackbar, t])

  const handleSendError = useCallback(
    (message: string) => {
      showErrorSnackbar(message)
    },
    [showErrorSnackbar],
  )

  const handleNetworkError = useCallback(() => {
    showErrorSnackbar(t('contact.networkError'))
  }, [showErrorSnackbar, t])

  const handleFormSuccess = useCallback(() => {
    router.push('/portfolio/contact/merci')
  }, [router])

  return (
    <PageWrapper backgroundVariant="alternate">
      <AppBarComponent />

      <ContactPageHeader titleText={t('contact.title')} subtitle={t('contact.subtitle')} />

      <InteractiveBackgroundSection>
        <Container maxWidth="lg" sx={{ py: useCompactContact ? 4 : 8, position: 'relative', zIndex: 2 }}>
          <ContactPhoneBar primary={brand} textColor={textColor} compact={useCompactContact} />

          <Box sx={{ textAlign: 'center', mb: useCompactContact ? 2.5 : 3.5 }}>
            <Link
              href={`/portfolio/contact?subject=${encodeURIComponent(CONTACT_SUBJECT_TECH_SUPPORT[locale])}#soutien-technique`}
              underline="hover"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: SITE_DARK.textMuted,
                '&:hover': { color: brand },
              }}
            >
              {t('contact.supportShortcut')}
            </Link>
          </Box>

          <ContactForm
            compact={useCompactContact}
            textColor={textColor}
            primary={brand}
            onValidationError={handleValidationError}
            onSendError={handleSendError}
            onNetworkError={handleNetworkError}
            onSuccess={handleFormSuccess}
          />

          <ContactLocationCard
            locationTitle={t('contact.location')}
            locationCity={t('contact.locationCity')}
            primary={brand}
            textColor={textColor}
            compact={useCompactContact}
          />

          <ContactSocialSection followMeTitle={t('contact.followMe')} compact={useCompactContact} />
        </Container>
      </InteractiveBackgroundSection>

      <ContactSuccessDialog open={merciDialogOpen} onClose={handleMerciDialogClose} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          icon={snackbarSeverity === 'success' ? <CheckCircleIcon /> : undefined}
          sx={{
            width: '100%',
            background:
              snackbarSeverity === 'success'
                ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                : siteDarkChrome
                  ? 'linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)'
                  : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </PageWrapper>
  )
}
