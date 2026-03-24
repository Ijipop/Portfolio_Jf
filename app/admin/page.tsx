'use client'

import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import ThreeDCardComponent from '@/components/ThreeDCard'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const router = useRouter()
  const { primary, secondary } = useThemeColors()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          router.replace('/admin/dashboard')
        }
      } catch {
        // L'utilisateur n'est pas authentifié, on reste sur la page de login.
      }
    }
    void verifySession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        setError(data?.message ?? 'Email ou mot de passe incorrect')
        return
      }

      router.replace('/admin/dashboard')
    } catch {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const adminFieldSx = {
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.55)' },
      '&.Mui-focused fieldset': { borderColor: 'rgba(255,255,255,0.85)' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.88)' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
    '& .MuiInputLabel-asterisk': { color: 'rgba(255,200,200,0.95)' },
    '& .MuiOutlinedInput-input::placeholder': {
      color: 'rgba(255,255,255,0.45)',
      opacity: 1,
    },
  } as const

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 3,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 480 }}>
        <ThreeDCardComponent
          floatingElements={2}
          sx={{
            minHeight: 'auto',
            borderRadius: DESIGN_TOKENS.borderRadius.large,
            cursor: 'default',
            '&:hover': { transform: 'none' },
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 700, color: '#fff' }}>
            Connexion Admin
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.88)' }}>
            Connectez-vous pour accéder au tableau de bord.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            {error ? (
              <Alert severity="error" sx={{ bgcolor: 'rgba(211, 47, 47, 0.15)', color: '#ffcdd2' }}>
                {error}
              </Alert>
            ) : null}
            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={adminFieldSx}
            />
            <TextField
              label="Mot de passe"
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={adminFieldSx}
            />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 1,
              borderRadius: DESIGN_TOKENS.borderRadius.medium,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
              boxShadow: `0 8px 24px ${primary}40`,
              '&:hover': {
                background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
                filter: 'brightness(1.05)',
              },
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </Box>
        </ThreeDCardComponent>
      </Box>
    </Box>
  )
}
