'use client'

import { Box, CssBaseline } from '@mui/material'
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material/styles'
import type { ThemeOptions } from '@mui/material/styles'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { THEMES, ThemeName, getAvailableThemes } from '@/design-system/themes'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { syncPortfolioThemeToDocument } from '@/utils/syncPortfolioThemeToDocument'
import { useBeigePresentationBg } from '@/contexts/BeigePresentationBgContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { DESIGN_TOKENS } from '@/design-system/constants'

const LAST_DEV_THEME_KEY = 'lastDevThemeName'

/** Même valeur SSR et premier rendu client — localStorage appliqué après hydratation (voir effet presentationHydrated). */
const SSR_THEME_NAME: ThemeName = 'latte'

const FONT_STACK = 'var(--font-inter), system-ui, -apple-system, "Segoe UI", sans-serif'
const TYPO = DESIGN_TOKENS.typography

interface AdvancedThemeContextType {
  themeName: ThemeName
  customTheme: any
  setTheme: (themeName: ThemeName) => void
  availableThemes: string[]
}

const AdvancedThemeContext = createContext<AdvancedThemeContextType | undefined>(undefined)

export function AdvancedThemeProvider({ children }: { children: React.ReactNode }) {
  const mode: PaletteMode = 'light' // Mode fixe à light
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { mode: presentationMode, hydrated: presentationHydrated } = usePresentationMode()
  const { beigePresentationBgUrl } = useBeigePresentationBg()
  const [themeName, setThemeName] = useState<ThemeName>(SSR_THEME_NAME)
  const customTheme = THEMES[themeName] // Source unique de vérité

  useEffect(() => {
    if (!presentationHydrated) return
    if (presentationMode === 'beige') {
      const saved = localStorage.getItem('themeName') as ThemeName
      if (saved && saved !== 'latte' && THEMES[saved]) {
        localStorage.setItem(LAST_DEV_THEME_KEY, saved)
      }
      setThemeName('latte')
      localStorage.setItem('themeName', 'latte')
      return
    }
    const last = localStorage.getItem(LAST_DEV_THEME_KEY) as ThemeName
    const fromLs = localStorage.getItem('themeName') as ThemeName
    const fromLast = last && THEMES[last] && last !== 'latte' ? last : null
    const fromThemeLs = fromLs && THEMES[fromLs] && fromLs !== 'latte' ? fromLs : null
    const pick = fromLast || fromThemeLs || 'default'
    setThemeName(pick)
    localStorage.setItem('themeName', pick)
  }, [presentationMode, presentationHydrated])

  useEffect(() => {
    syncPortfolioThemeToDocument(themeName, {
      beigePresentation: presentationMode === 'beige',
      beigePresentationBgUrl,
    })
  }, [themeName, presentationMode, beigePresentationBgUrl])

  const setTheme = (newThemeName: ThemeName) => {
    if (!THEMES[newThemeName]) return
    if (presentationMode === 'beige' && newThemeName !== 'latte') return
    setThemeName(newThemeName)
    localStorage.setItem('themeName', newThemeName)
  }

  // Créer le thème MUI avec les couleurs personnalisées
  // Utiliser useMemo pour recréer le thème quand customTheme change
  const isBeigePresentation = presentationMode === 'beige'

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: customTheme.primary,
        light: customTheme.primary + '80',
        dark: customTheme.primary + 'CC'
      },
      secondary: {
        main: customTheme.secondary,
        light: customTheme.secondary + '80',
        dark: customTheme.secondary + 'CC'
      },
      background: {
        default: isBeigePresentation ? '#faf8f5' : '#f5f7fa',
        paper: isBeigePresentation ? '#fffefb' : '#ffffff'
      }
    },
    typography: {
      fontFamily: FONT_STACK,
      /* DESIGN_TOKENS utilise des fontSize responsive — cast pour compatibilité ThemeOptions MUI */
      h1: { ...TYPO.h1, fontFamily: FONT_STACK } as ThemeOptions['typography'] extends { h1?: infer H }
        ? H
        : never,
      h2: { ...TYPO.h2, fontFamily: FONT_STACK } as ThemeOptions['typography'] extends { h2?: infer H }
        ? H
        : never,
      h3: { ...TYPO.h3, fontFamily: FONT_STACK } as ThemeOptions['typography'] extends { h3?: infer H }
        ? H
        : never,
      h4: { ...TYPO.h4, fontFamily: FONT_STACK } as ThemeOptions['typography'] extends { h4?: infer H }
        ? H
        : never,
      h5: { ...TYPO.h5, fontFamily: FONT_STACK },
      h6: { ...TYPO.h6, fontFamily: FONT_STACK },
      body1: { ...TYPO.body1, fontFamily: FONT_STACK },
      body2: { ...TYPO.body2, fontFamily: FONT_STACK },
      subtitle1: {
        fontFamily: FONT_STACK,
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      subtitle2: {
        fontFamily: FONT_STACK,
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.57,
      },
      caption: {
        fontFamily: FONT_STACK,
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
      },
      overline: {
        fontFamily: FONT_STACK,
        fontWeight: 600,
        fontSize: '0.75rem',
        lineHeight: 2.66,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
      button: {
        fontFamily: FONT_STACK,
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    components: {
      ...(isTopologyRoute && {
        MuiCssBaseline: {
          styleOverrides: {
            html: {
              background: 'transparent',
              backgroundColor: 'transparent',
            },
            body: {
              background: 'transparent',
              backgroundColor: 'transparent',
            },
          },
        },
      }),
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '12px 24px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: isBeigePresentation ? 'translateY(-1px)' : 'translateY(-2px)',
              boxShadow: isBeigePresentation
                ? '0 6px 18px rgba(92, 77, 60, 0.12)'
                : `0 8px 25px ${customTheme.primary}40`
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            background: 'transparent',
            border: '1px solid transparent',
            transition: 'all 0.3s ease',
          }
        }
      }
    }
  }), [customTheme, mode, isTopologyRoute, isBeigePresentation])

  return (
    <AdvancedThemeContext.Provider
      value={{
        themeName,
        customTheme,
        setTheme,
        availableThemes: getAvailableThemes()
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            background: isTopologyRoute
              ? 'transparent'
              : `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 25%, ${customTheme.bg} 50%, ${customTheme.bg2} 75%, ${customTheme.bg} 100%)`,
            minHeight: '100vh',
            transition: 'background 0.5s ease'
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </AdvancedThemeContext.Provider>
  )
}

export function useAdvancedTheme() {
  const context = useContext(AdvancedThemeContext)
  if (context === undefined) {
    throw new Error('useAdvancedTheme must be used within an AdvancedThemeProvider')
  }
  return context
}
