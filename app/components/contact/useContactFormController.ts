'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  EMPTY_CONTACT_FORM_DATA,
  EMPTY_CONTACT_FORM_ERRORS,
  type ContactFormData,
  type ContactFormErrors,
  type ValidatableContactField,
  contactFormErrorsEqual,
  validateAllContactFields,
  validateContactField,
} from '@/components/contact/contactFormValidation'
import { submitContactRequest, type SubmitContactResult } from '@/components/contact/submitContactRequest'
import {
  emptyProjectWebBrief,
  type ProjectWebBriefState,
} from '@/components/contact/ProjectWebBriefSection'
import {
  emptyTechnicalSupportBrief,
  type TechnicalSupportBriefState,
} from '@/components/contact/TechnicalSupportBriefSection'
import type { AiLeadDiagnosisResult } from '@/components/contact/AiLeadDiagnosis'

const VALIDATION_DEBOUNCE_MS = 300
export const DIAGNOSTIC_IA_HASH = 'diagnostic-ia'
export const SOUTIEN_TECHNIQUE_HASH = 'soutien-technique'

function readHash(): string {
  if (typeof window === 'undefined') return ''
  return window.location.hash.replace(/^#/, '')
}

function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function isValidatableField(name: string): name is ValidatableContactField {
  return name in EMPTY_CONTACT_FORM_ERRORS
}

export type ContactSubmitFn = (
  body: Record<string, unknown>,
  fallbackError?: string,
) => Promise<SubmitContactResult>

export type UseContactFormControllerOptions = {
  /** Soumission réelle ou injectée (mock sandbox). Défaut : submitContactRequest. */
  submitFn?: ContactSubmitFn
  sendErrorFallback?: string
  /** Appelé uniquement après une tentative de soumission invalide (erreurs déjà posées). */
  onValidationError: (errors: ContactFormErrors) => void
  onSendError: (message: string) => void
  onNetworkError: () => void
  onSuccess: () => void
}

export function useContactFormController({
  submitFn = submitContactRequest,
  sendErrorFallback = 'Erreur lors de l\'envoi du message',
  onValidationError,
  onSendError,
  onNetworkError,
  onSuccess,
}: UseContactFormControllerOptions) {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_CONTACT_FORM_DATA)
  const [includeProjectWeb, setIncludeProjectWeb] = useState(false)
  const [projectWeb, setProjectWeb] = useState<ProjectWebBriefState>(() => emptyProjectWebBrief())
  const [includeTechnicalSupport, setIncludeTechnicalSupport] = useState(false)
  const [technicalSupport, setTechnicalSupport] = useState<TechnicalSupportBriefState>(() =>
    emptyTechnicalSupportBrief(),
  )
  const [aiDiagnosis, setAiDiagnosis] = useState<AiLeadDiagnosisResult | null>(null)
  const [formErrors, setFormErrors] = useState<ContactFormErrors>(EMPTY_CONTACT_FORM_ERRORS)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOptionalSections, setShowOptionalSections] = useState(false)
  const [forceOptionalOpen, setForceOptionalOpen] = useState(false)

  useLayoutEffect(() => {
    const syncDeepLinks = () => {
      const hash = readHash()
      const diagnostic = hash === DIAGNOSTIC_IA_HASH
      const soutien = hash === SOUTIEN_TECHNIQUE_HASH
      if (!diagnostic && !soutien) {
        setForceOptionalOpen(false)
        return
      }
      setForceOptionalOpen(true)
      setShowOptionalSections(true)
      if (soutien) setIncludeTechnicalSupport(true)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollToId(diagnostic ? DIAGNOSTIC_IA_HASH : SOUTIEN_TECHNIQUE_HASH)
        })
      })
    }

    syncDeepLinks()
    window.addEventListener('hashchange', syncDeepLinks)
    return () => window.removeEventListener('hashchange', syncDeepLinks)
  }, [])

  const debounceTimers = useRef<Partial<Record<ValidatableContactField, ReturnType<typeof setTimeout>>>>(
    {},
  )

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach((timer) => {
        if (timer) clearTimeout(timer)
      })
    }
  }, [])

  const setFieldError = useCallback((name: ValidatableContactField, error: string) => {
    setFormErrors((prev) => {
      if (prev[name] === error) return prev
      return { ...prev, [name]: error }
    })
  }, [])

  const runFieldValidation = useCallback(
    (name: ValidatableContactField, value: string) => {
      setFieldError(name, validateContactField(name, value))
    },
    [setFieldError],
  )

  const scheduleFieldValidation = useCallback(
    (name: ValidatableContactField, value: string) => {
      const existing = debounceTimers.current[name]
      if (existing) clearTimeout(existing)
      debounceTimers.current[name] = setTimeout(() => {
        debounceTimers.current[name] = undefined
        runFieldValidation(name, value)
      }, VALIDATION_DEBOUNCE_MS)
    },
    [runFieldValidation],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name !== 'bm_verify') setAiDiagnosis(null)
    if (isValidatableField(name)) scheduleFieldValidation(name, value)
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (!isValidatableField(name)) return
    const pending = debounceTimers.current[name]
    if (pending) {
      clearTimeout(pending)
      debounceTimers.current[name] = undefined
    }
    runFieldValidation(name, value)
  }

  const setFormErrorsIfChanged = useCallback((next: ContactFormErrors) => {
    setFormErrors((prev) => (contactFormErrorsEqual(prev, next) ? prev : next))
  }, [])

  const handleIncludeProjectWebChange = (next: boolean) => {
    setIncludeProjectWeb(next)
    setAiDiagnosis(null)
  }

  const handleProjectWebChange = (next: ProjectWebBriefState) => {
    setProjectWeb(next)
    setAiDiagnosis(null)
  }

  const handleIncludeTechnicalSupportChange = (next: boolean) => {
    setIncludeTechnicalSupport(next)
    setAiDiagnosis(null)
  }

  const handleTechnicalSupportChange = (next: TechnicalSupportBriefState) => {
    setTechnicalSupport(next)
    setAiDiagnosis(null)
  }

  const resetAfterSuccess = useCallback(() => {
    setFormData(EMPTY_CONTACT_FORM_DATA)
    setFormErrors(EMPTY_CONTACT_FORM_ERRORS)
    setIncludeProjectWeb(false)
    setProjectWeb(emptyProjectWebBrief())
    setIncludeTechnicalSupport(false)
    setTechnicalSupport(emptyTechnicalSupportBrief())
    setAiDiagnosis(null)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    Object.values(debounceTimers.current).forEach((timer) => {
      if (timer) clearTimeout(timer)
    })
    debounceTimers.current = {}

    const errors = validateAllContactFields(formData)
    setFormErrorsIfChanged(errors)

    if (Object.values(errors).some((error) => error !== '')) {
      onValidationError(errors)
      return
    }

    setIsSubmitting(true)

    const result = await submitFn(
      {
        ...formData,
        ...(includeProjectWeb ? { projectWeb } : {}),
        ...(includeTechnicalSupport ? { technicalSupport } : {}),
        ...(aiDiagnosis ? { aiDiagnosis } : {}),
      },
      sendErrorFallback,
    )

    setIsSubmitting(false)

    if (result.ok) {
      resetAfterSuccess()
      onSuccess()
      return
    }

    if (result.kind === 'network') onNetworkError()
    else onSendError(result.error)
  }

  const optionalOpen = forceOptionalOpen || showOptionalSections

  return {
    formData,
    setFormData,
    formErrors,
    isSubmitting,
    includeProjectWeb,
    projectWeb,
    includeTechnicalSupport,
    technicalSupport,
    aiDiagnosis,
    setAiDiagnosis,
    showOptionalSections: optionalOpen,
    forceOptionalOpen,
    setShowOptionalSections,
    handleInputChange,
    handleInputBlur,
    handleIncludeProjectWebChange,
    handleProjectWebChange,
    handleIncludeTechnicalSupportChange,
    handleTechnicalSupportChange,
    handleSubmit,
  }
}
