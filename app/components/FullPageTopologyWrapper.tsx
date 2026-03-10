'use client'

import Box from '@mui/material/Box'
import { ReactNode, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const VantaTopologyBackground = dynamic(() => import('./VantaTopologyBackground'), { ssr: false })

const TOPOLOGY_PATH_PREFIXES = ['/portfolio', '/logiciel', '/pageweb']

export function shouldShowTopology(pathname: string | null): boolean {
  if (!pathname) return false
  return TOPOLOGY_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  )
}

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

  // Remettre le scroll en haut au montage pour éviter titre coupé / contenu décalé
  useEffect(() => {
    if (show && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [show, pathname])

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
        <VantaTopologyBackground fillContainer />
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
          background: 'rgba(0, 0, 0, 0.35)',
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
