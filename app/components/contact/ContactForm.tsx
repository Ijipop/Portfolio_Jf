'use client'

import EmailIcon from '@mui/icons-material/Email'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SendIcon from '@mui/icons-material/Send'
import {
  Button,
  CircularProgress,
  Collapse,
  TextField,
} from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { useSearchParams } from 'next/navigation'
import { Suspense, memo, useCallback, useEffect, useRef, useState } from 'react'
import ThreeDCardComponent from '@/components/ThreeDCard'
import CTAButton from '@/components/shared/CTAButton'
import ProjectWebBriefSection, {
  emptyProjectWebBrief,
  type ProjectWebBriefState,
} from '@/components/contact/ProjectWebBriefSection'
import AiLeadDiagnosis, { type AiLeadDiagnosisResult } from '@/components/contact/AiLeadDiagnosis'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
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

const VALIDATION_DEBOUNCE_MS = 300

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'textColor' && prop !== 'helperTextColor',
})<{ textColor?: string; helperTextColor?: string }>(({ theme, textColor, helperTextColor }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: DESIGN_TOKENS.borderRadius.small,
    transition: DESIGN_TOKENS.transitions.normal,
    color: textColor || '#ffffff',
    '& .MuiOutlinedInput-input': {
      color: textColor || '#ffffff',
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: textColor || '#ffffff',
    '&.Mui-focused': {
      color: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
    },
  },
  '& .MuiFormHelperText-root': {
    color: helperTextColor || 'rgba(255, 255, 255, 0.7)',
  },
}))

function ContactSubjectFromQuery({
  setFormData,
}: {
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>
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

function isValidatableField(name: string): name is ValidatableContactField {
  return name in EMPTY_CONTACT_FORM_ERRORS
}

export type ContactFormProps = {
  compact: boolean
  textColor: string
  primary: string
  onValidationError: () => void
  onSendError: (message: string) => void
  onNetworkError: () => void
  onSuccess: () => void
}

function ContactForm({
  compact,
  textColor,
  primary,
  onValidationError,
  onSendError,
  onNetworkError,
  onSuccess,
}: ContactFormProps) {
  const theme = useTheme()
  const { t } = useLanguage()
  const helperTextColor = `${textColor}B3`

  const [formData, setFormData] = useState<ContactFormData>(EMPTY_CONTACT_FORM_DATA)
  const [includeProjectWeb, setIncludeProjectWeb] = useState(false)
  const [projectWeb, setProjectWeb] = useState<ProjectWebBriefState>(() => emptyProjectWebBrief())
  const [aiDiagnosis, setAiDiagnosis] = useState<AiLeadDiagnosisResult | null>(null)
  const [formErrors, setFormErrors] = useState<ContactFormErrors>(EMPTY_CONTACT_FORM_ERRORS)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOptionalSections, setShowOptionalSections] = useState(true)

  const debounceTimers = useRef<Partial<Record<ValidatableContactField, ReturnType<typeof setTimeout>>>>({})

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
    if (name !== 'bm_verify') {
      setAiDiagnosis(null)
    }
    if (isValidatableField(name)) {
      scheduleFieldValidation(name, value)
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    Object.values(debounceTimers.current).forEach((timer) => {
      if (timer) clearTimeout(timer)
    })
    debounceTimers.current = {}

    const errors = validateAllContactFields(formData)
    setFormErrorsIfChanged(errors)

    if (Object.values(errors).some((error) => error !== '')) {
      onValidationError()
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...(includeProjectWeb ? { projectWeb } : {}),
          ...(aiDiagnosis ? { aiDiagnosis } : {}),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setFormData(EMPTY_CONTACT_FORM_DATA)
        setFormErrors(EMPTY_CONTACT_FORM_ERRORS)
        setIncludeProjectWeb(false)
        setProjectWeb(emptyProjectWebBrief())
        setAiDiagnosis(null)
        setIsSubmitting(false)
        onSuccess()
        return
      }

      onSendError(typeof data.error === 'string' ? data.error : t('contact.sendError'))
    } catch (error) {
      console.error('Erreur:', error)
      onNetworkError()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
        mb: compact ? 4 : 6,
      }}
    >
      <Suspense fallback={null}>
        <ContactSubjectFromQuery setFormData={setFormData} />
      </Suspense>
      <ThreeDCardComponent
        floatingElements={2}
        sx={{ padding: { xs: 2, sm: 3 } }}
        borderBeam={{
          duration: 45,
          size: 220,
          ...(theme.palette.mode === 'dark'
            ? { colorFrom: '#ff6b35', colorTo: '#6b6b6f' }
            : { colorFrom: '#ea580c', colorTo: '#948c82' }),
        }}
      >
        <Box sx={{ textAlign: 'center', mb: compact ? 2 : 3 }}>
          <EmailIcon sx={{ fontSize: 48, color: primary, mb: 1.5 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: primary }}>
            {t('contact.sendMessage')}
          </Typography>
          <Typography variant="body1" sx={{ color: textColor, opacity: 0.9, mb: 1.5 }}>
            {t('contact.sendMessageDesc')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: textColor,
              opacity: 0.85,
              lineHeight: 1.6,
              fontWeight: 600,
              maxWidth: 520,
              mx: 'auto',
            }}
          >
            {t('contact.pricingAnchor')}
          </Typography>
        </Box>

        <Box
          data-testid="contact-form"
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: compact ? 2 : 3, position: 'relative' }}
        >
          <input
            type="text"
            name="bm_verify"
            value={formData.bm_verify}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
            }}
          />
          <Box sx={{ display: 'grid', gap: compact ? 2 : 2.5, mb: compact ? 2 : 2.5 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
              <StyledTextField
                name="name"
                label={t('contact.formName')}
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={!!formErrors.name}
                helperText={formErrors.name}
                required
                fullWidth
                textColor={textColor}
                helperTextColor={helperTextColor}
              />
              <StyledTextField
                name="email"
                label={t('contact.formEmail')}
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={!!formErrors.email}
                helperText={formErrors.email}
                required
                fullWidth
                textColor={textColor}
                helperTextColor={helperTextColor}
              />
            </Box>

            <StyledTextField
              name="phone"
              label={t('contact.formPhoneOptional')}
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              fullWidth
              textColor={textColor}
              helperTextColor={helperTextColor}
              inputProps={{ autoComplete: 'tel', maxLength: 50 }}
            />

            <StyledTextField
              name="subject"
              label={t('contact.formSubject')}
              value={formData.subject}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={!!formErrors.subject}
              helperText={formErrors.subject}
              required
              fullWidth
              textColor={textColor}
              helperTextColor={helperTextColor}
            />

            <StyledTextField
              name="message"
              label={t('contact.formMessage')}
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={!!formErrors.message}
              helperText={formErrors.message}
              required
              fullWidth
              multiline
              rows={compact ? 4 : 6}
              textColor={textColor}
              helperTextColor={helperTextColor}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              type="button"
              onClick={() => setShowOptionalSections((open) => !open)}
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transform: showOptionalSections ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              }
              sx={{
                color: textColor,
                opacity: 0.85,
                textTransform: 'none',
                fontWeight: 700,
                px: 0,
                '&:hover': { bgcolor: 'transparent', opacity: 1 },
              }}
            >
              {t('contact.optionalSectionsToggle')}
            </Button>
            <Collapse in={showOptionalSections}>
              <Box sx={{ display: 'grid', gap: compact ? 2 : 2.5, mt: 1.5 }}>
                <ProjectWebBriefSection
                  include={includeProjectWeb}
                  onIncludeChange={handleIncludeProjectWebChange}
                  value={projectWeb}
                  onChange={handleProjectWebChange}
                  textColor={textColor}
                  compact={compact}
                />

                <Box id="diagnostic-ia" sx={{ scrollMarginTop: 96 }}>
                  <AiLeadDiagnosis
                    formData={formData}
                    projectWeb={projectWeb}
                    includeProjectWeb={includeProjectWeb}
                    value={aiDiagnosis}
                    onChange={setAiDiagnosis}
                    textColor={textColor}
                    compact={compact}
                  />
                </Box>
              </Box>
            </Collapse>
          </Box>

          <Box sx={{ mt: compact ? 2.5 : 3 }}>
            <CTAButton
              variant="primary"
              type="submit"
              fullWidth
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            >
              {isSubmitting ? t('contact.sending') : t('contact.sendButton')}
            </CTAButton>
          </Box>
        </Box>
      </ThreeDCardComponent>
    </Box>
  )
}

export default memo(ContactForm)
