'use client'

import { Box, CssBaseline } from '@mui/material'
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material/styles'
import type { ThemeOptions } from '@mui/material/styles'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import {
  BEIGE_DARK_THEME,
  BEIGE_LIGHT_THEME,
  THEMES,
  ThemeName,
  getAvailableThemes,
} from '@/design-system/themes'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { syncPortfolioThemeToDocument } from '@/utils/syncPortfolioThemeToDocument'
import { BeigePresentationAmbientBg } from '@/components/BeigePresentationAmbientBg'
import { useBeigePresentationBg } from '@/contexts/BeigePresentationBgContext'
import { useGraphicsMode } from '@/contexts/GraphicsModeContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useBeigeDark } from '@/hooks/useBeigeDark'
import { registerBeigeDarkInstantSync } from '@/utils/beigeDarkModeStore'
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
  const [isMounted, setIsMounted] = useState(false)
  const hydrationSafePathname = isMounted ? pathname : null
  const isTopologyRoute = shouldShowTopology(hydrationSafePathname)
  const { mode: presentationMode, hydrated: presentationHydrated } = usePresentationMode()
  const { beigeDark } = useBeigeDark()
  const { beigePresentationBgUrl } = useBeigePresentationBg()
  const { graphicsMode } = useGraphicsMode()
  const [themeName, setThemeName] = useState<ThemeName>(SSR_THEME_NAME)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  /** Évite les divergences SSR/client : le mode beige visuel n'est actif qu'après hydratation du choix utilisateur. */
  const isBeigePresentation = presentationHydrated && presentationMode === 'beige'
  const activeThemeName = useMemo((): ThemeName => {
    if (presentationHydrated && isBeigePresentation) {
      return beigeDark ? BEIGE_DARK_THEME : BEIGE_LIGHT_THEME
    }
    return themeName
  }, [presentationHydrated, isBeigePresentation, beigeDark, themeName])

  const customTheme = THEMES[activeThemeName]

  const syncDocumentTheme = useCallback(
    (name: ThemeName, dark: boolean) => {
      syncPortfolioThemeToDocument(name, {
        beigePresentation: isBeigePresentation,
        beigeDark: isBeigePresentation && dark,
        beigePresentationBgUrl,
      })
    },
    [isBeigePresentation, beigePresentationBgUrl],
  )

  useLayoutEffect(() => {
    registerBeigeDarkInstantSync((enabled) => {
      if (!isBeigePresentation) return
      const target = enabled ? BEIGE_DARK_THEME : BEIGE_LIGHT_THEME
      setThemeName(target)
      localStorage.setItem('themeName', target)
      syncDocumentTheme(target, enabled)
    })
    return () => registerBeigeDarkInstantSync(null)
  }, [isBeigePresentation, syncDocumentTheme])

  useEffect(() => {
    if (!presentationHydrated) return
    if (isBeigePresentation) {
      const saved = localStorage.getItem('themeName') as ThemeName
      if (
        saved &&
        saved !== BEIGE_LIGHT_THEME &&
        saved !== BEIGE_DARK_THEME &&
        THEMES[saved]
      ) {
        localStorage.setItem(LAST_DEV_THEME_KEY, saved)
      }
      const target = beigeDark ? BEIGE_DARK_THEME : BEIGE_LIGHT_THEME
      setThemeName(target)
      localStorage.setItem('themeName', target)
      return
    }
    const last = localStorage.getItem(LAST_DEV_THEME_KEY) as ThemeName
    const fromLs = localStorage.getItem('themeName') as ThemeName
    const fromLast = last && THEMES[last] && last !== BEIGE_LIGHT_THEME ? last : null
    const fromThemeLs = fromLs && THEMES[fromLs] && fromLs !== BEIGE_LIGHT_THEME ? fromLs : null
    const pick = fromLast || fromThemeLs || 'default'
    setThemeName(pick)
    localStorage.setItem('themeName', pick)
  }, [presentationMode, presentationHydrated, beigeDark, isBeigePresentation])

  useLayoutEffect(() => {
    syncDocumentTheme(activeThemeName, beigeDark)
  }, [activeThemeName, beigeDark, syncDocumentTheme])

  const setTheme = useCallback(
    (newThemeName: ThemeName) => {
      if (!THEMES[newThemeName]) return
      if (presentationMode === 'beige') return
      setThemeName(newThemeName)
      localStorage.setItem('themeName', newThemeName)
    },
    [presentationMode],
  )

  const availableThemes = useMemo(() => getAvailableThemes(), [])

  const contextValue = useMemo(
    () => ({
      themeName: activeThemeName,
      customTheme,
      setTheme,
      availableThemes,
    }),
    [activeThemeName, customTheme, setTheme, availableThemes],
  )

  // Créer le thème MUI avec les couleurs personnalisées
  // Utiliser useMemo pour recréer le thème quand customTheme change
  const isBeigeLight = isBeigePresentation && !beigeDark
  const showBeigeAmbientBg =
    isBeigeLight && !isTopologyRoute && graphicsMode === 'full'

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
        default: isBeigeLight ? '#faf8f5' : isBeigePresentation ? customTheme.bg : '#f5f7fa',
        paper: isBeigeLight ? '#fffefb' : isBeigePresentation ? customTheme.bg2 : '#ffffff',
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
              transform: isBeigeLight ? 'translateY(-1px)' : 'translateY(-2px)',
              boxShadow: isBeigeLight
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
  }), [customTheme, mode, isTopologyRoute, isBeigePresentation, isBeigeLight])

  return (
    <AdvancedThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          data-theme-root
          sx={{
            position: 'relative',
            background: isTopologyRoute
              ? 'transparent'
              : `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 25%, ${customTheme.bg} 50%, ${customTheme.bg2} 75%, ${customTheme.bg} 100%)`,
            minHeight: '100vh',
            transition: isBeigePresentation ? 'none' : 'background 0.5s ease',
          }}
        >
          <BeigePresentationAmbientBg enabled={showBeigeAmbientBg} />
          <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>{children}</Box>
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
