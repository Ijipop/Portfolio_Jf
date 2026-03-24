'use client'

import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material'
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

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <ThreeDCardComponent
        floatingElements={2}
        sx={{
          minHeight: 'auto',
          borderRadius: DESIGN_TOKENS.borderRadius.large,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 700 }}>
          Connexion Admin
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Connectez-vous pour acceder au tableau de bord.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Mot de passe"
            type="password"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </Container>
  )
}
