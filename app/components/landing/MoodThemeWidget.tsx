'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'
import type { ThemeName } from '@/design-system/themes'

interface MoodThemeWidgetProps {
  /** Thème pour les couleurs d’affichage (ex. retardé pour synchroniser avec le fond). Si non fourni, utilise le thème du contexte. */
  displayTheme?: { primary: string; secondary?: string }
}

export default function MoodThemeWidget({ displayTheme: displayThemeProp }: MoodThemeWidgetProps = {}) {
  const { t, locale } = useLanguage()
  const { setTheme, customTheme } = useAdvancedTheme()
  const themeForColors = displayThemeProp ?? customTheme
  const primary = themeForColors.primary
  const primaryRgba = primary + '20'
  const primaryRgbaHover = primary + 'CC'
  const [mood, setMood] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async () => {
    const trimmed = mood.trim()
    if (!trimmed || loading) return
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      const res = await fetch('/api/ai/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: trimmed, locale }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || t('landing.moodError'))
        return
      }
      if (json.success && json.data) {
        const { message: msg, themeName } = json.data
        if (themeName && msg) {
          setTheme(themeName as ThemeName)
          setMessage(msg)
        } else {
          setError(t('landing.moodError'))
        }
      } else {
        setError(t('landing.moodError'))
      }
    } catch {
      setError(t('landing.moodError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 420,
        minWidth: 280,
        mx: 'auto',
        mt: 3,
        p: 2,
        backgroundColor: primaryRgba,
        border: `1px solid ${primary}`,
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder={t('landing.moodPlaceholder')}
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        disabled={loading}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        sx={{
          mb: 1.5,
          '& .MuiOutlinedInput-root': {
            color: 'rgba(255,255,255,0.95)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderRadius: '8px',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
            '&:hover fieldset': { borderColor: primary },
            '&.Mui-focused fieldset': { borderColor: primary },
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'rgba(255,255,255,0.7)',
            opacity: 1,
          },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        disabled={!mood.trim() || loading}
        sx={{
          bgcolor: primaryRgbaHover,
          color: 'white',
          border: `1px solid ${primary}`,
          fontWeight: 600,
          '&:hover': {
            bgcolor: primary,
            borderColor: primary,
            color: 'white',
          },
          '&:disabled': {
            color: 'rgba(255,255,255,0.5)',
            borderColor: 'rgba(255,255,255,0.2)',
          },
        }}
      >
        {loading ? '...' : t('landing.moodCta')}
      </Button>
      {error && (
        <Typography sx={{ mt: 1.5, fontSize: '0.875rem', color: 'rgba(255,200,200,0.95)' }}>
          {error}
        </Typography>
      )}
      {message && (
        <Typography sx={{ mt: 1.5, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.95)', fontStyle: 'italic' }}>
          {message}
        </Typography>
      )}
    </Box>
  )
}
