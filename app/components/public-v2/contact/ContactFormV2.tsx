'use client'

import { Suspense, useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button, TextAreaField, TextField } from '@/components/public-v2/primitives'
import {
  DIAGNOSTIC_IA_HASH,
  useContactFormController,
  type ContactSubmitFn,
} from '@/components/contact/useContactFormController'
import type { ContactFormErrors } from '@/components/contact/contactFormValidation'
import ProjectWebBriefSection from '@/components/contact/ProjectWebBriefSection'
import TechnicalSupportBriefSection from '@/components/contact/TechnicalSupportBriefSection'
import AiLeadDiagnosis from '@/components/contact/AiLeadDiagnosis'
import {
  getContactPageContent,
  mockSubmitContactRequest,
  type ContactMockScenario,
} from '@/lib/public-v2/contactPageContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import { submitContactRequest } from '@/components/contact/submitContactRequest'
import { focusFirstInvalidContactField } from './focusFirstInvalidField'
import styles from './ContactFormV2.module.css'

const INK = '#17243a'

function ContactSubjectFromQuery({
  setFormData,
}: {
  setFormData: React.Dispatch<React.SetStateAction<import('@/components/contact/contactFormValidation').ContactFormData>>
}) {
  const searchParams = useSearchParams()
  const subjectPrefilled = useRef(false)

  useEffect(() => {
    if (subjectPrefilled.current) return
    const fromQuery = searchParams.get('subject')?.trim()
    if (!fromQuery) return
    subjectPrefilled.current = true
    setFormData((prev) => (prev.subject.trim() ? prev : { ...prev, subject: fromQuery }))
  }, [searchParams, setFormData])

  return null
}

export type ContactFormV2Props = {
  /** Hook optionnel après validation locale invalide (pas de toast générique côté page). */
  onValidationError?: (errors: ContactFormErrors) => void
  onSendError: (message: string) => void
  onNetworkError: () => void
  onSuccess: () => void
  /** `mock` = sandbox only — jamais sur la route publique. */
  submitMode?: 'live' | 'mock'
  mockScenario?: ContactMockScenario
  /** Désactive l’appel OpenAI dans AiLeadDiagnosis (sandbox). */
  disableAiFetch?: boolean
  className?: string
}

export default function ContactFormV2({
  onValidationError,
  onSendError,
  onNetworkError,
  onSuccess,
  submitMode = 'live',
  mockScenario = 'success',
  disableAiFetch = false,
  className,
}: ContactFormV2Props) {
  const locale = usePublicV2Locale()
  const copy = getContactPageContent(locale)
  const submitFn: ContactSubmitFn =
    submitMode === 'mock'
      ? (body, fallback) => mockSubmitContactRequest(body, mockScenario, fallback, locale)
      : submitContactRequest

  const formRootRef = useRef<HTMLFormElement | null>(null)
  const openAdvancedRef = useRef<() => void>(() => {})

  const handleValidationError = useCallback(
    (errors: ContactFormErrors) => {
      onValidationError?.(errors)
      focusFirstInvalidContactField(errors, {
        formRoot: formRootRef.current,
        openAdvancedPanel: () => openAdvancedRef.current(),
      })
    },
    [onValidationError],
  )

  const ctrl = useContactFormController({
    submitFn,
    sendErrorFallback: copy.sendError,
    validationLocale: locale,
    onValidationError: handleValidationError,
    onSendError,
    onNetworkError,
    onSuccess,
  })

  openAdvancedRef.current = () => {
    if (!ctrl.showOptionalSections) ctrl.setShowOptionalSections(true)
  }

  return (
    <div id="contact-form" className={[styles.wrap, className].filter(Boolean).join(' ')}>
      {submitMode === 'mock' ? <p className={styles.mockBanner}>{copy.mockBanner}</p> : null}

      <div className={styles.card}>
        <div className={styles.intro}>
          <h2 className={styles.introTitle}>{copy.sendMessage}</h2>
          <p className={styles.introDesc}>{copy.sendMessageDesc}</p>
        </div>

        <Suspense fallback={null}>
          <ContactSubjectFromQuery setFormData={ctrl.setFormData} />
        </Suspense>

        <form
          ref={formRootRef}
          data-testid="contact-form"
          className={styles.form}
          onSubmit={ctrl.handleSubmit}
          noValidate
        >
          <input
            type="text"
            name="bm_verify"
            value={ctrl.formData.bm_verify}
            onChange={ctrl.handleInputChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className={styles.honeypot}
          />

          <div className={styles.row2}>
            <TextField
              id="pv2-contact-name"
              name="name"
              label={copy.formName}
              value={ctrl.formData.name}
              onChange={ctrl.handleInputChange}
              onBlur={ctrl.handleInputBlur}
              error={ctrl.formErrors.name}
              required
              autoComplete="name"
            />
            <TextField
              id="pv2-contact-email"
              name="email"
              type="email"
              label={copy.formEmail}
              value={ctrl.formData.email}
              onChange={ctrl.handleInputChange}
              onBlur={ctrl.handleInputBlur}
              error={ctrl.formErrors.email}
              required
              autoComplete="email"
            />
          </div>

          <TextField
            id="pv2-contact-phone"
            name="phone"
            type="tel"
            label={copy.formPhoneOptional}
            value={ctrl.formData.phone}
            onChange={ctrl.handleInputChange}
            onBlur={ctrl.handleInputBlur}
            error={ctrl.formErrors.phone}
            autoComplete="tel"
            maxLength={50}
          />

          <TextField
            id="pv2-contact-subject"
            name="subject"
            label={copy.formSubject}
            value={ctrl.formData.subject}
            onChange={ctrl.handleInputChange}
            onBlur={ctrl.handleInputBlur}
            error={ctrl.formErrors.subject}
            required
          />

          <TextAreaField
            id="pv2-contact-message"
            name="message"
            label={copy.formMessage}
            value={ctrl.formData.message}
            onChange={ctrl.handleInputChange}
            onBlur={ctrl.handleInputBlur}
            error={ctrl.formErrors.message}
            required
            rows={6}
          />

          <div>
            {!ctrl.forceOptionalOpen ? (
              <button
                type="button"
                className={styles.optionalToggle}
                aria-expanded={ctrl.showOptionalSections}
                onClick={() => ctrl.setShowOptionalSections((open) => !open)}
              >
                {copy.optionalSectionsToggle}
              </button>
            ) : null}

            {ctrl.showOptionalSections ? (
              <div className={[styles.optionalPanel, styles.briefScope].join(' ')}>
                <ProjectWebBriefSection
                  include={ctrl.includeProjectWeb}
                  onIncludeChange={ctrl.handleIncludeProjectWebChange}
                  value={ctrl.projectWeb}
                  onChange={ctrl.handleProjectWebChange}
                  textColor={INK}
                  compact
                />

                <TechnicalSupportBriefSection
                  include={ctrl.includeTechnicalSupport}
                  onIncludeChange={ctrl.handleIncludeTechnicalSupportChange}
                  value={ctrl.technicalSupport}
                  onChange={ctrl.handleTechnicalSupportChange}
                  textColor={INK}
                  compact
                />

                <div id={DIAGNOSTIC_IA_HASH} style={{ scrollMarginTop: '5.5rem' }}>
                  {disableAiFetch ? (
                    <p className={styles.mockBanner}>{copy.aiDisabledSandbox}</p>
                  ) : (
                    <AiLeadDiagnosis
                      formData={ctrl.formData}
                      projectWeb={ctrl.projectWeb}
                      includeProjectWeb={ctrl.includeProjectWeb}
                      value={ctrl.aiDiagnosis}
                      onChange={ctrl.setAiDiagnosis}
                      textColor={INK}
                      compact
                    />
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className={styles.submitRow}>
            <Button type="submit" variant="primary" disabled={ctrl.isSubmitting} style={{ width: '100%' }}>
              {ctrl.isSubmitting ? copy.sending : copy.sendButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
