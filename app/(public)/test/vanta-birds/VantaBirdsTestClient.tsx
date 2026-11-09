'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import VantaBirdsLab from '@/components/test/VantaBirdsLab'
import { ThemeSelector } from '@/components/ThemeSelector'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'

export default function VantaBirdsTestClient() {
  const { themeName } = useAdvancedTheme()
  const { mode: presentationMode, hydrated } = usePresentationMode()
  /** Évite hydration mismatch : le serveur ne lit pas localStorage (thème ≠ client). */
  const [themeLabelReady, setThemeLabelReady] = useState(false)
  useEffect(() => setThemeLabelReady(true), [])

  return (
    <Container maxWidth="md" sx={{ py: 4, px: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Lab Vanta BIRDS
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Effet isolé (pas le fond du site). Couleurs = palette active{' '}
        {themeLabelReady ? `(${themeName})` : '(…)'}. En mode présentation beige, seul le thème latte
        s’applique ; en mode dev, choisis un thème ci-dessous pour voir les oiseaux changer de couleur.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Comportement Vanta d’origine : le pointeur agit comme un <strong>prédateur</strong>, les oiseaux
        <strong> s’en éloignent</strong> — ce n’est pas un effet « suivre la souris ». Pour attirer les
        boids vers le curseur, il faudrait un autre moteur (custom Three.js / autre lib), pas une option
        exposée par ce script.
      </Typography>
      {hydrated && presentationMode === 'dev' && (
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ width: '100%' }}>
            Thème (mode dev)
          </Typography>
          <ThemeSelector />
        </Box>
      )}
      <VantaBirdsLab />
      <Box sx={{ mt: 3 }}>
        <Link component={NextLink} href="/" underline="hover">
          Retour à l’accueil
        </Link>
      </Box>
    </Container>
  )
}
