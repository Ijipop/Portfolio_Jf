'use client'

import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import CTAButton from '@/components/shared/CTAButton'
import {
  EMPTY_CONTACT_FORM_ERRORS,
  type ContactFormErrors,
  validateContactField,
} from '@/components/contact/contactFormValidation'
import { submitContactRequest } from '@/components/contact/submitContactRequest'
import {
  emptyTechnicalSupportBrief,
  type SupportModeKey,
  type SupportNeedKey,
} from '@/components/contact/TechnicalSupportBriefSection'
import {
  SUPPORT_FORM_ANCHOR,
  getSupportLandingContent,
} from '@/content/soutien-informatique-montreal.fr'
import { useLanguage } from '@/contexts/LanguageContext'
import { CONTACT_SUBJECT_TECH_SUPPORT } from '@/i18n/contactSubjects'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { SITE_DARK, SITE_LIGHT } from '@/design-system/siteDark'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'

type SupportFormNeed = Extract<SupportNeedKey, 'troubleshooting' | 'computerBasics'> | ''

type FieldErrors = ContactFormErrors & { mode: string; need: string }

const EMPTY_FIELD_ERRORS: FieldErrors = { ...EMPTY_CONTACT_FORM_ERRORS, mode: '', need: '' }

export default function SupportContactForm() {
  const { locale, t } = useLanguage()
  const siteDarkChrome = useSiteDarkChrome()
  const copy = getSupportLandingContent(locale)
  const subject = CONTACT_SUBJECT_TECH_SUPPORT[locale] ?? copy.contactSubject

  const panel = siteDarkChrome
    ? {
        bg: 'rgba(255, 250, 245, 0.96)',
        text: SITE_LIGHT.text,
        muted: SITE_LIGHT.textSecondary,
        border: 'rgba(92, 77, 60, 0.18)',
        fieldBg: '#fff',
      }
    : {
        bg: SITE_LIGHT.surface,
        text: SITE_LIGHT.text,
        muted: SITE_LIGHT.textSecondary,
        border: SITE_LIGHT.border,
        fieldBg: '#fff',
      }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [deviceOs, setDeviceOs] = useState('')
  const [needType, setNeedType] = useState<SupportFormNeed>('')
  const [supportMode, setSupportMode] = useState<SupportModeKey>('')
  const [message, setMessage] = useState('')
  const [bmVerify, setBmVerify] = useState('')
  const [errors, setErrors] = useState<FieldErrors>(EMPTY_FIELD_ERRORS)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const messagePlaceholder =
    needType === 'computerBasics' ? copy.formMessagePlaceholderLearn : copy.formMessagePlaceholder

  const resetForm = () => {
    setName('')
    setEmail('')
    setPhone('')
    setDeviceOs('')
    setNeedType('')
    setSupportMode('')
    setMessage('')
    setBmVerify('')
    setErrors(EMPTY_FIELD_ERRORS)
    setSubmitError('')
    setSubmitted(false)
  }

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: DESIGN_TOKENS.borderRadius.small,
      bgcolor: panel.fieldBg,
      color: panel.text,
    },
    '& .MuiInputLabel-root': { color: panel.muted },
    '& .MuiFormHelperText-root': { color: panel.muted },
  }

  const validate = (): FieldErrors => {
    const phoneTrim = phone.trim()
    return {
      name: validateContactField('name', name),
      email: validateContactField('email', email),
      phone: !phoneTrim ? copy.formPhoneRequired : validateContactField('phone', phone),
      subject: '',
      message: validateContactField('message', message),
      mode: supportMode ? '' : copy.formModeRequired,
      need: needType ? '' : copy.formNeedRequired,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.values(nextErrors).some((v) => v !== '')) return

    setIsSubmitting(true)
    const technicalSupport = {
      ...emptyTechnicalSupportBrief(),
      needType,
      deviceOs: deviceOs.trim(),
      supportMode,
      notes: '',
    }

    const result = await submitContactRequest(
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject,
        message: message.trim(),
        bm_verify: bmVerify,
        technicalSupport,
      },
      t('contact.sendError'),
    )
    setIsSubmitting(false)

    if (result.ok) {
      setName('')
      setEmail('')
      setPhone('')
      setDeviceOs('')
      setNeedType('')
      setSupportMode('')
      setMessage('')
      setBmVerify('')
      setErrors(EMPTY_FIELD_ERRORS)
      setSubmitted(true)
      return
    }
    setSubmitError(result.kind === 'network' ? t('contact.networkError') : result.error)
  }

  return (
    <Box
      id={SUPPORT_FORM_ANCHOR}
      component="section"
      sx={{
        scrollMarginTop: 'calc(var(--app-bar-height, 64px) + 16px)',
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: SITE_DARK.cardRadius,
        border: `1px solid ${panel.border}`,
        background: panel.bg,
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
      }}
    >
      {submitted ? (
        <Box sx={{ textAlign: 'center', py: { xs: 2, sm: 3 } }}>
          <Alert
            severity="success"
            sx={{
              mb: 2.5,
              borderRadius: 2,
              justifyContent: 'center',
              '& .MuiAlert-message': { textAlign: 'center', width: '100%' },
            }}
          >
            <Box component="strong" sx={{ display: 'block', mb: 0.5, fontSize: '1.05rem' }}>
              {copy.formSuccessTitle}
            </Box>
            {copy.formSuccessBody}
          </Alert>
          <CTAButton type="button" variant="primary" size="large" onClick={resetForm}>
            {copy.formSuccessAgain}
          </CTAButton>
        </Box>
      ) : null}

      {!submitted ? (
        <>
          <Box sx={{ mb: 2.5, textAlign: 'center' }}>
            <Box
              component="h2"
              sx={{
                m: 0,
                mb: 0.75,
                fontWeight: 800,
                fontSize: { xs: '1.35rem', sm: '1.55rem' },
                letterSpacing: '-0.03em',
                color: panel.text,
              }}
            >
              {copy.formTitle}
            </Box>
            <Box sx={{ m: 0, fontSize: '0.95rem', color: panel.muted, lineHeight: 1.5 }}>
              {copy.formLead}
            </Box>
          </Box>

          <Box
            component="form"
            data-testid="support-contact-form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 1.75 }}
          >
            <TextField
              label={copy.formName}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name || ' '}
              required
              fullWidth
              autoComplete="name"
              sx={fieldSx}
            />
            <TextField
              label={copy.formEmail}
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email || ' '}
              required
              fullWidth
              autoComplete="email"
              sx={fieldSx}
            />
            <TextField
              label={copy.formPhone}
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone || ' '}
              required
              fullWidth
              autoComplete="tel"
              sx={fieldSx}
            />
            <TextField
              label={copy.formDevice}
              name="device"
              value={deviceOs}
              onChange={(e) => setDeviceOs(e.target.value)}
              placeholder={copy.formDevicePlaceholder}
              fullWidth
              sx={fieldSx}
              helperText=" "
            />

            <FormControl error={!!errors.need} sx={{ px: 0.5 }}>
              <FormLabel sx={{ color: `${panel.muted} !important`, mb: 0.5, fontWeight: 600 }}>
                {copy.formNeed}
              </FormLabel>
              <RadioGroup
                name="needType"
                value={needType}
                onChange={(e) => setNeedType(e.target.value as SupportFormNeed)}
              >
                <FormControlLabel
                  value="troubleshooting"
                  control={<Radio size="small" sx={{ color: SITE_DARK.brandOrange }} />}
                  label={copy.formNeedFix}
                  sx={{ color: panel.text }}
                />
                <FormControlLabel
                  value="computerBasics"
                  control={<Radio size="small" sx={{ color: SITE_DARK.brandOrange }} />}
                  label={copy.formNeedLearn}
                  sx={{ color: panel.text }}
                />
              </RadioGroup>
              <FormHelperText>{errors.need || ' '}</FormHelperText>
            </FormControl>

            <FormControl error={!!errors.mode} sx={{ px: 0.5 }}>
              <FormLabel sx={{ color: `${panel.muted} !important`, mb: 0.5, fontWeight: 600 }}>
                {copy.formMode}
              </FormLabel>
              <RadioGroup
                name="supportMode"
                value={supportMode}
                onChange={(e) => setSupportMode(e.target.value as SupportModeKey)}
              >
                <FormControlLabel
                  value="remote"
                  control={<Radio size="small" sx={{ color: SITE_DARK.brandOrange }} />}
                  label={copy.formModeRemote}
                  sx={{ color: panel.text }}
                />
                <FormControlLabel
                  value="onsiteMontreal"
                  control={<Radio size="small" sx={{ color: SITE_DARK.brandOrange }} />}
                  label={copy.formModeHome}
                  sx={{ color: panel.text }}
                />
                <FormControlLabel
                  value="either"
                  control={<Radio size="small" sx={{ color: SITE_DARK.brandOrange }} />}
                  label={copy.formModeEither}
                  sx={{ color: panel.text }}
                />
              </RadioGroup>
              <FormHelperText>{errors.mode || ' '}</FormHelperText>
            </FormControl>

            <TextField
              label={copy.formMessage}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={messagePlaceholder}
              error={!!errors.message}
              helperText={errors.message || ' '}
              required
              fullWidth
              multiline
              minRows={4}
              sx={fieldSx}
            />

            <Box
              aria-hidden
              sx={{ position: 'absolute', left: -9999, opacity: 0, height: 0, overflow: 'hidden' }}
            >
              <label htmlFor="bm_verify_support">Leave empty</label>
              <input
                id="bm_verify_support"
                name="bm_verify"
                tabIndex={-1}
                autoComplete="off"
                value={bmVerify}
                onChange={(e) => setBmVerify(e.target.value)}
              />
            </Box>

            {submitError ? (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {submitError}
              </Alert>
            ) : null}

            <CTAButton type="submit" variant="primary" size="large" disabled={isSubmitting} fullWidth>
              {isSubmitting ? copy.formSending : copy.formSubmit}
            </CTAButton>
          </Box>
        </>
      ) : null}
    </Box>
  )
}
