'use client'

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CTAButton from '@/components/shared/CTAButton'
import { useLanguage } from '@/contexts/LanguageContext'
import type { ProjectWebBriefState } from './ProjectWebBriefSection'
import { useEffect, useMemo, useState } from 'react'

export type AiLeadPriority = 'high' | 'medium' | 'low'

export interface AiLeadDiagnosisResult {
  priority: AiLeadPriority
  summary: string
  recommendedSolution: string
  conversionOpportunities: string[]
  nextQuestions: string[]
}

interface ContactFormSnapshot {
  name: string
  email: string
  subject: string
  message: string
  bm_verify: string
}

interface AiLeadDiagnosisProps {
  formData: ContactFormSnapshot
  projectWeb: ProjectWebBriefState
  includeProjectWeb: boolean
  value: AiLeadDiagnosisResult | null
  onChange: (diagnosis: AiLeadDiagnosisResult | null) => void
  textColor: string
  compact?: boolean
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function hasUsefulProjectBrief(projectWeb: ProjectWebBriefState): boolean {
  if (
    projectWeb.siteType ||
    projectWeb.mainGoal.trim().length >= 3 ||
    projectWeb.features.trim().length >= 3 ||
    projectWeb.deadline.trim().length >= 3 ||
    projectWeb.budget
  ) {
    return true
  }

  return [
    projectWeb.pageHome,
    projectWeb.pageServices,
    projectWeb.pageProducts,
    projectWeb.pageAbout,
    projectWeb.pageContact,
    projectWeb.pageFaq,
    projectWeb.pageBlog,
    projectWeb.pageOther,
  ].some(Boolean)
}

function isDiagnosisResult(input: unknown): input is AiLeadDiagnosisResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return false
  const value = input as Record<string, unknown>
  return (
    (value.priority === 'high' || value.priority === 'medium' || value.priority === 'low') &&
    typeof value.summary === 'string' &&
    typeof value.recommendedSolution === 'string' &&
    Array.isArray(value.conversionOpportunities) &&
    value.conversionOpportunities.every((item) => typeof item === 'string') &&
    Array.isArray(value.nextQuestions) &&
    value.nextQuestions.every((item) => typeof item === 'string')
  )
}

export default function AiLeadDiagnosis({
  formData,
  projectWeb,
  includeProjectWeb,
  value,
  onChange,
  textColor,
  compact = false,
}: AiLeadDiagnosisProps) {
  const { t, locale } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [cooldownUntil, setCooldownUntil] = useState(0)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!cooldownUntil) return undefined
    const id = window.setInterval(() => {
      const current = Date.now()
      setNow(current)
      if (current >= cooldownUntil) {
        setCooldownUntil(0)
      }
    }, 1000)
    return () => window.clearInterval(id)
  }, [cooldownUntil])

  const cooldownSeconds = Math.max(0, Math.ceil((cooldownUntil - now) / 1000))
  const hasUsefulMessage = formData.subject.trim().length >= 3 && formData.message.trim().length >= 20
  const hasUsefulBrief = includeProjectWeb && hasUsefulProjectBrief(projectWeb)

  const disabledReason = useMemo(() => {
    if (formData.name.trim().length < 2 || !isValidEmail(formData.email)) {
      return t('contact.ai.needIdentity')
    }
    if (!hasUsefulMessage && !hasUsefulBrief) {
      return t('contact.ai.needDetails')
    }
    if (cooldownSeconds > 0) {
      return t('contact.ai.cooldown').replace('{seconds}', String(cooldownSeconds))
    }
    return ''
  }, [cooldownSeconds, formData.email, formData.name, hasUsefulBrief, hasUsefulMessage, t])

  const canAnalyze = !isLoading && !disabledReason

  const handleAnalyze = async () => {
    if (!canAnalyze) return

    setIsLoading(true)
    setError('')
    onChange(null)

    try {
      const response = await fetch('/api/ai/lead-diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          locale,
          projectWeb: includeProjectWeb ? projectWeb : null,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.success) {
        const retryAfterSec =
          typeof data.retryAfterSec === 'number'
            ? data.retryAfterSec
            : Number(response.headers.get('Retry-After') ?? 0)
        if (retryAfterSec > 0) {
          setCooldownUntil(Date.now() + retryAfterSec * 1000)
        }
        setError(typeof data.error === 'string' ? data.error : t('contact.ai.error'))
        return
      }

      if (!isDiagnosisResult(data.data)) {
        setError(t('contact.ai.error'))
        return
      }

      onChange(data.data)
      setCooldownUntil(Date.now() + 20_000)
    } catch {
      setError(t('contact.ai.networkError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        border: `1px solid ${textColor}24`,
        borderRadius: 2,
        p: compact ? 1.75 : 2.25,
        background: `${textColor}08`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.5 }}>
        <AutoAwesomeIcon sx={{ color: textColor, opacity: 0.9, mt: 0.2 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ color: textColor, fontWeight: 800 }}>
            {t('contact.ai.title')}
          </Typography>
          <Typography variant="body2" sx={{ color: textColor, opacity: 0.78, lineHeight: 1.55 }}>
            {t('contact.ai.description')}
          </Typography>
        </Box>
      </Box>

      <CTAButton
        type="button"
        variant="outline"
        size="small"
        fullWidth
        onClick={handleAnalyze}
        disabled={!canAnalyze}
        startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <AutoAwesomeIcon />}
      >
        {isLoading ? t('contact.ai.loading') : t('contact.ai.button')}
      </CTAButton>

      {disabledReason && !isLoading && (
        <Typography variant="caption" sx={{ display: 'block', color: textColor, opacity: 0.68, mt: 1 }}>
          {disabledReason}
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 1.5 }}>
          {error}
        </Alert>
      )}

      {value && (
        <Box sx={{ mt: 2, color: textColor }}>
          <Divider sx={{ borderColor: `${textColor}22`, mb: 1.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              {t('contact.ai.resultTitle')}
            </Typography>
            <Chip
              size="small"
              label={t(`contact.ai.priority.${value.priority}`)}
              sx={{ fontWeight: 700 }}
            />
          </Box>

          <Typography variant="body2" sx={{ lineHeight: 1.65, opacity: 0.92, mb: 1.25 }}>
            {value.summary}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.5 }}>
            {t('contact.ai.recommendedSolution')}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.65, opacity: 0.92, mb: 1.25 }}>
            {value.recommendedSolution}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.5 }}>
            {t('contact.ai.conversionOpportunities')}
          </Typography>
          <Box component="ul" sx={{ pl: 2.25, mt: 0, mb: 1.25 }}>
            {value.conversionOpportunities.map((item) => (
              <Typography component="li" variant="body2" key={item} sx={{ lineHeight: 1.6, opacity: 0.92 }}>
                {item}
              </Typography>
            ))}
          </Box>

          <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.5 }}>
            {t('contact.ai.nextQuestions')}
          </Typography>
          <Box component="ul" sx={{ pl: 2.25, mt: 0, mb: 0 }}>
            {value.nextQuestions.map((item) => (
              <Typography component="li" variant="body2" key={item} sx={{ lineHeight: 1.6, opacity: 0.92 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
