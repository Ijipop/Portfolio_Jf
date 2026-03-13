'use client'

import Box from '@mui/material/Box'
import { ReactNode, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { THEMES } from '@/design-system/themes'

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: 'easeOut' as const },
}

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
  const isLandingRoute = pathname === '/'
  const scrollRef = useRef<HTMLDivElement>(null)
  const isFirstRenderRef = useRef(true)

  useEffect(() => {
    isFirstRenderRef.current = false
  }, [])

  // Remettre le scroll en haut au montage pour éviter titre coupé / contenu décalé
  useEffect(() => {
    if (show && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [show, pathname])

  const transitionProps = {
    ...pageTransition,
    initial: isFirstRenderRef.current ? false : pageTransition.initial,
  }

  const content = (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        {...transitionProps}
        style={{ width: '100%', minHeight: 'min-content' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )

  if (!show) {
    return <Box component="div" sx={contentWrapperSx}>{content}</Box>
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
        <VantaTopologyBackground
          key={isLandingRoute ? 'landing' : 'app'}
          fillContainer
          colorHex={isLandingRoute ? THEMES.default.primary : undefined}
          backgroundHex={isLandingRoute ? THEMES.default.bg : undefined}
        />
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
          {content}
        </Box>
      </Box>
    </>
  )
}
