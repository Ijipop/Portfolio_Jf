'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Container, Heading } from '@/components/public-v2/primitives'
import ContactFormV2 from '@/components/public-v2/contact/ContactFormV2'
import { CONTACT_PAGE_COPY, type ContactMockScenario } from '@/lib/public-v2/contactPageContent'
import { trackContactMerciPageView } from '@/lib/gtag'
import { LanguageProvider } from '@/contexts/LanguageContext'
import styles from './ContactPage.module.css'

export type ContactPageClientProps = {
  /** Route /portfolio/contact/merci : dialogue ouvert + analytics (parcours réel uniquement). */
  showMerciDialog?: boolean
  /** Prévisualisation sandbox — jamais sur la route publique. */
  submitMode?: 'live' | 'mock'
  mockScenario?: ContactMockScenario
  disableAiFetch?: boolean
  /** Si true, succès mock ouvre le dialogue local sans redirect ni gtag. */
  mockLocalMerci?: boolean
}

export default function ContactPageClient({
  showMerciDialog = false,
  submitMode = 'live',
  mockScenario = 'success',
  disableAiFetch = false,
  mockLocalMerci = false,
}: ContactPageClientProps) {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)
  const [merciOpen, setMerciOpen] = useState(showMerciDialog)

  useEffect(() => {
    if (!showMerciDialog) return
    setMerciOpen(true)
    if (submitMode === 'live') {
      trackContactMerciPageView()
    }
  }, [showMerciDialog, submitMode])

  useEffect(() => {
    if (!toast) return undefined
    const id = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(id)
  }, [toast])

  const showError = useCallback((message: string) => setToast(message), [])

  const handleMerciClose = () => {
    setMerciOpen(false)
    if (showMerciDialog && submitMode === 'live') {
      router.replace('/portfolio/contact')
    }
  }

  const handleSuccess = useCallback(() => {
    if (mockLocalMerci || submitMode === 'mock') {
      setMerciOpen(true)
      return
    }
    router.push('/portfolio/contact/merci')
  }, [mockLocalMerci, router, submitMode])

  return (
    // LanguageProvider : briefs MUI partagés (ProjectWeb / Support / IA) exigent useLanguage.
    // Chrome Pop Atelier hors ThemeWrapper — enveloppe locale minimale, pas de nouvelle i18n.
    <LanguageProvider>
      <div className={styles.page}>
        <Container>
          <header className={styles.header}>
            <Heading as="h1" variant="section">
              {CONTACT_PAGE_COPY.title}
            </Heading>
            <p className={styles.lead}>{CONTACT_PAGE_COPY.subtitle}</p>
          </header>

          <div className={styles.phoneBar}>
            <a className={styles.phoneChip} href={CONTACT_PAGE_COPY.phoneHref}>
              {CONTACT_PAGE_COPY.phoneCta} {CONTACT_PAGE_COPY.phoneDisplay}
            </a>
            <a className={styles.phoneChip} href={CONTACT_PAGE_COPY.smsHref}>
              {CONTACT_PAGE_COPY.smsCta}
            </a>
          </div>

          <p className={styles.supportShortcut}>
            <a href={CONTACT_PAGE_COPY.supportShortcutHref}>{CONTACT_PAGE_COPY.supportShortcut}</a>
          </p>

          <ContactFormV2
            submitMode={submitMode}
            mockScenario={mockScenario}
            disableAiFetch={disableAiFetch || submitMode === 'mock'}
            onSendError={showError}
            onNetworkError={() => showError(CONTACT_PAGE_COPY.networkError)}
            onSuccess={handleSuccess}
          />

          <div className={styles.metaBlock}>
            <h2 className={styles.metaTitle}>{CONTACT_PAGE_COPY.location}</h2>
            <p className={styles.metaBody}>{CONTACT_PAGE_COPY.locationCity}</p>
          </div>
        </Container>

        {merciOpen ? (
          <div
            className={styles.dialogBackdrop}
            role="presentation"
            onClick={handleMerciClose}
            onKeyDown={(e) => {
              if (e.key === 'Escape') handleMerciClose()
            }}
          >
            <div
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-merci-title"
              aria-describedby="contact-merci-desc"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="contact-merci-title" className={styles.dialogTitle}>
                {CONTACT_PAGE_COPY.merciTitle}
              </h2>
              <p id="contact-merci-desc" className={styles.dialogBody}>
                {CONTACT_PAGE_COPY.merciBody}
              </p>
              <Button type="button" variant="primary" onClick={handleMerciClose}>
                {CONTACT_PAGE_COPY.merciClose}
              </Button>
            </div>
          </div>
        ) : null}

        {toast ? (
          <div className={styles.toast} role="status">
            {toast}
          </div>
        ) : null}
      </div>
    </LanguageProvider>
  )
}
