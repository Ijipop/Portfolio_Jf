'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Alert, Snackbar } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ContactSuccessDialog from '../../components/contact/ContactSuccessDialog'
import ContactForm from '../../components/contact/ContactForm'
import {
  ContactCoffeeSection,
  ContactLocationCard,
  ContactPageHeader,
  ContactPromisesBar,
  ContactSocialSection,
} from '../../components/contact/ContactPageSections'
import { trackContactMerciPageView } from '@/lib/gtag'
import AppBarComponent from '../../components/appBar'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import Footer from '../../components/Footer'
import CTAButton from '../../components/shared/CTAButton'
import { useTextColor } from '../../hooks/useTextColor'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useLanguage } from '../../contexts/LanguageContext'
import { CONTACT_SUBJECT_TECH_SUPPORT } from '@/i18n/contactSubjects'

const AiConversionTeaser = dynamic(() => import('@/components/home/AiConversionTeaser'), { ssr: false })

type ContactPageClientProps = {
  /** Route /portfolio/contact/merci : popup ouverte + page_view pour Analytics. */
  showMerciDialog?: boolean
}

export default function ContactPageClient({ showMerciDialog = false }: ContactPageClientProps) {
  const router = useRouter()
  const theme = useTheme()
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'))
  const isTallViewport = useMediaQuery('(min-height: 1000px)', { noSsr: true })
  const useCompactContact = !isXlUp || !isTallViewport
  const textColor = useTextColor()
  const { primary } = useThemeColors()
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

  const promiseLabels = useMemo(
    () =>
      [t('contact.promiseResponse'), t('contact.promiseCall'), t('contact.promiseEstimate')] as [
        string,
        string,
        string,
      ],
    [t],
  )

  return (
    <PageWrapper backgroundVariant="alternate">
      <AppBarComponent />
      
      <ContactPageHeader titleText={t('contact.title')} subtitle={t('contact.subtitle')} />

      <InteractiveBackgroundSection>
      <Container maxWidth="lg" sx={{ py: useCompactContact ? 4 : 8, position: 'relative', zIndex: 2 }}>
          <ContactPromisesBar
            labels={promiseLabels}
            primary={primary}
                    textColor={textColor}
            compact={useCompactContact}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: useCompactContact ? 2.2 : 3 }}>
            <CTAButton
              href={`/portfolio/contact?subject=${encodeURIComponent(CONTACT_SUBJECT_TECH_SUPPORT[locale])}#soutien-technique`}
              variant="outline"
              size="small"
            >
              {t('contact.supportShortcut')}
            </CTAButton>
          </Box>

          <AiConversionTeaser />

          <ContactForm
            compact={useCompactContact}
                  textColor={textColor}
            primary={primary}
            onValidationError={handleValidationError}
            onSendError={handleSendError}
            onNetworkError={handleNetworkError}
            onSuccess={handleFormSuccess}
          />

          <ContactLocationCard
            locationTitle={t('contact.location')}
            locationCity={t('contact.locationCity')}
            primary={primary}
                      textColor={textColor}
                      compact={useCompactContact}
                    />

          <ContactSocialSection
            followMeTitle={t('contact.followMe')}
            linkedInDesc={t('contact.linkedInDesc')}
            githubDesc={t('contact.githubDesc')}
            viewProfileLabel={t('contact.viewProfile')}
            viewReposLabel={t('contact.viewRepos')}
            primary={primary}
                        textColor={textColor}
                        compact={useCompactContact}
                      />

          <ContactCoffeeSection compact={useCompactContact} />
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
                : (th) =>
                    th.palette.mode === 'dark'
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
