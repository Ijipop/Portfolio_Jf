'use client'

import Box from '@mui/material/Box'
import { ReactNode, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { useGraphicsMode } from '@/contexts/GraphicsModeContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { getBeigePresentationTopologyBackground } from '@/utils/syncPortfolioThemeToDocument'
import { VANTA_PRELOAD_SOURCES } from '@/utils/vantaAssets'
import { preloadExternalScripts } from '@/utils/vantaScriptLoader'
import VantaDotsBackground from './VantaDotsBackground'

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
  const show = shouldShowTopology(pathname)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { customTheme } = useAdvancedTheme()
  const { graphicsMode, downgradeReason } = useGraphicsMode()
  const { mode: presentationMode } = usePresentationMode()
  const useLightFallback = show && graphicsMode === 'light'
  const useStaticProBackground = presentationMode === 'beige'
  const useGradientOnly = useLightFallback || useStaticProBackground

  // Remettre le scroll en haut au montage pour éviter titre coupé / contenu décalé
  useEffect(() => {
    if (show && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [show, pathname])

  useEffect(() => {
    if (!show || useGradientOnly) return

    const preload = () => preloadExternalScripts([...VANTA_PRELOAD_SOURCES])

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
        preload
      )
      return () => {
        ;(window as unknown as { cancelIdleCallback?: (idleId: number) => void }).cancelIdleCallback?.(id)
      }
    }

    const timer = globalThis.setTimeout(preload, 0)
    return () => globalThis.clearTimeout(timer)
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
          useStaticProBackground ? 'beige' : useLightFallback ? 'light' : 'full'
        }
        data-graphics-reason={useStaticProBackground ? 'presentation-beige' : downgradeReason ?? 'none'}
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
              background: useStaticProBackground
                ? getBeigePresentationTopologyBackground(customTheme)
                : `radial-gradient(circle at 20% 20%, ${customTheme.primary}22 0%, transparent 35%), radial-gradient(circle at 80% 30%, ${customTheme.secondary}18 0%, transparent 30%), linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 100%)`,
            }}
          />
        ) : (
          <VantaDotsBackground key="vanta-dots" fillContainer />
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
          background: useStaticProBackground
            ? 'rgba(247, 243, 235, 0.1)'
            : useLightFallback
              ? 'rgba(0, 0, 0, 0.08)'
              : 'rgba(0, 0, 0, 0.18)',
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
