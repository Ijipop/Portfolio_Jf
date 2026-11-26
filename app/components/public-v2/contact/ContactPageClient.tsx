'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Container, Heading } from '@/components/public-v2/primitives'
import ContactFormV2 from '@/components/public-v2/contact/ContactFormV2'
import { getContactPageContent, type ContactMockScenario } from '@/lib/public-v2/contactPageContent'
import { SMS_CONTACT_ENABLED } from '@/lib/publicContactFlags'
import { trackContactMerciPageView } from '@/lib/gtag'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
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
  const locale = usePublicV2Locale()
  const copy = getContactPageContent(locale)
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
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Heading as="h1" variant="section">
            {copy.title}
          </Heading>
          <p className={styles.lead}>{copy.subtitle}</p>
        </header>

        <div className={styles.phoneBar}>
          <a className={styles.phoneChip} href={copy.phoneHref}>
            {copy.phoneCta} {copy.phoneDisplay}
          </a>
          {SMS_CONTACT_ENABLED ? (
            <a className={styles.phoneChip} href={copy.smsHref}>
              {copy.smsCta}
            </a>
          ) : (
            <a className={styles.phoneChip} href={copy.writeCtaHref}>
              {copy.writeCta}
            </a>
          )}
        </div>

        <p className={styles.supportShortcut}>
          <a href={copy.supportShortcutHref}>{copy.supportShortcut}</a>
        </p>

        <ContactFormV2
          submitMode={submitMode}
          mockScenario={mockScenario}
          disableAiFetch={disableAiFetch || submitMode === 'mock'}
          onSendError={showError}
          onNetworkError={() => showError(copy.networkError)}
          onSuccess={handleSuccess}
        />

        <div className={styles.metaBlock}>
          <h2 className={styles.metaTitle}>{copy.location}</h2>
          <p className={styles.metaBody}>{copy.locationCity}</p>
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
              {copy.merciTitle}
            </h2>
            <p id="contact-merci-desc" className={styles.dialogBody}>
              {copy.merciBody}
            </p>
            <Button type="button" variant="primary" onClick={handleMerciClose}>
              {copy.merciClose}
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
  )
}
