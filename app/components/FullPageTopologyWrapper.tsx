'use client'

import Box from '@mui/material/Box'
import { ReactNode } from 'react'
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
        sx={{
          position: 'relative',
          zIndex: 2,
          ...contentWrapperSx,
        }}
      >
        {children}
      </Box>
    </>
  )
}
