'use client'

import dynamic from 'next/dynamic'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { useBeigeDark } from '@/hooks/useBeigeDark'
import { useBeigePresentationBg } from '@/contexts/BeigePresentationBgContext'
import { useGraphicsMode } from '@/contexts/GraphicsModeContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { siteDarkTopologyBackground } from '@/design-system/siteDark'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { isProductLandingRoute } from '@/components/product-landings/productLandingRoutes'
import { getBeigePresentationTopologyBackground } from '@/utils/syncPortfolioThemeToDocument'
import { VANTA_PRELOAD_SOURCES } from '@/utils/vantaAssets'
import { VANTA_NET_ENABLED } from '@/utils/vantaFeatures'
import { preloadExternalScripts } from '@/utils/vantaScriptLoader'
import { deferUntilIdle } from '@/utils/deferUntilIdle'

const VantaNetBackground = dynamic(() => import('./VantaNetBackground'), { ssr: false })

const contentWrapperSx = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column' as const,
  width: '100%',
  overflowX: 'hidden' as const,
}

interface FullPageTopologyWrapperProps {
  children: ReactNode
}

export default function FullPageTopologyWrapper({ children }: FullPageTopologyWrapperProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const hydrationSafePathname = isMounted ? pathname : null
  const show = shouldShowTopology(hydrationSafePathname)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { customTheme } = useAdvancedTheme()
  const { beigePresentationBgUrl } = useBeigePresentationBg()
  const { graphicsMode, downgradeReason } = useGraphicsMode()
  const { mode: presentationMode } = usePresentationMode()
  const { beigeDark } = useBeigeDark()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  /** En « light » on coupe Vanta ; en mode présentation Créa (dev) on garde Vanta NET sauf si reduced-motion. */
  const creaWantsVanta =
    VANTA_NET_ENABLED && presentationMode === 'dev' && !prefersReducedMotion
  const useLightFallback = show && graphicsMode === 'light' && !creaWantsVanta
  const useBeigeImageBackground = (presentationMode === 'beige' && !beigeDark) || isProductLandingRoute(hydrationSafePathname)
  const useBeigeSunsetBackground = presentationMode === 'beige' && beigeDark && !isProductLandingRoute(hydrationSafePathname)
  const useGradientOnly =
    !VANTA_NET_ENABLED || useLightFallback || useBeigeImageBackground || useBeigeSunsetBackground

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Remettre le scroll en haut au montage pour éviter titre coupé / contenu décalé
  useEffect(() => {
    if (show && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [show, pathname])

  useEffect(() => {
    if (!show || useGradientOnly) return

    const preload = () => preloadExternalScripts([...VANTA_PRELOAD_SOURCES])

    return deferUntilIdle(preload, 2000)
  }, [show, useGradientOnly])

  if (!show) {
    return <Box component="div" sx={contentWrapperSx}>{children}</Box>
  }

  return (
    <>
      <Box
        component="div"
        data-testid="graphics-background-layer"
        data-graphics-mode={
          useBeigeImageBackground
            ? 'beige'
            : useBeigeSunsetBackground
              ? 'beige-dark'
              : useLightFallback || !VANTA_NET_ENABLED
                ? 'light'
                : 'full'
        }
        data-graphics-reason={
          useBeigeImageBackground
            ? 'presentation-beige'
            : useBeigeSunsetBackground
              ? 'presentation-beige-dark'
              : downgradeReason ?? 'none'
        }
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {useGradientOnly ? (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: useBeigeImageBackground
                ? getBeigePresentationTopologyBackground(customTheme, beigePresentationBgUrl)
                : useBeigeSunsetBackground
                  ? siteDarkTopologyBackground()
                  : `radial-gradient(circle at 20% 20%, ${customTheme.primary}22 0%, transparent 35%), radial-gradient(circle at 80% 30%, ${customTheme.secondary}18 0%, transparent 30%), linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 100%)`,
            }}
          />
        ) : (
          <VantaNetBackground key="vanta-net" fillContainer />
        )}
      </Box>
      <Box
        component="div"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background: useBeigeImageBackground
            ? 'rgba(247, 243, 235, 0.1)'
            : useBeigeSunsetBackground
              ? 'rgba(0, 0, 0, 0.06)'
              : useLightFallback
                ? 'rgba(0, 0, 0, 0.08)'
                : 'rgba(0, 0, 0, 0.10)',
          pointerEvents: 'none',
        }}
        aria-hidden
      />
      <Box
        component="div"
        ref={scrollRef}
        className="topology-scroll-container"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100vh',
          '@supports (height: 100dvh)': {
            height: '100dvh',
          },
          overflowY: 'auto',
          overflowX: 'hidden',
          overflowAnchor: 'none',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box
          component="div"
          sx={{
            flex: '0 0 auto',
            minHeight: 'min-content',
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  )
}
