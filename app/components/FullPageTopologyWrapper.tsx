'use client'

import Box from '@mui/material/Box'
import { ReactNode, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { preloadExternalScripts } from '@/utils/vantaScriptLoader'

const VantaDotsBackground = dynamic(() => import('./VantaDotsBackground'), { ssr: false })
const VantaTopologyBackground = dynamic(() => import('./VantaTopologyBackground'), { ssr: false })

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
  const isLanding = pathname === '/'
  const scrollRef = useRef<HTMLDivElement>(null)

  // Remettre le scroll en haut au montage pour éviter titre coupé / contenu décalé
  useEffect(() => {
    if (show && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [show, pathname])

  useEffect(() => {
    if (!show) return

    const preload = () =>
      preloadExternalScripts([
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js',
        'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.dots.min.js',
        'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.topology.min.js',
      ])

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
  }, [show])

  if (!show) {
    return <Box component="div" sx={contentWrapperSx}>{children}</Box>
  }

  return (
    <>
      <Box
        component="div"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {isLanding ? (
          <VantaTopologyBackground key="vanta-topology" fillContainer />
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
          background: 'rgba(0, 0, 0, 0.18)',
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
