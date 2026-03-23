'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type GraphicsMode = 'full' | 'light'

interface GraphicsMetric {
  name: string
  value: number
  rating?: string
}

interface GraphicsModeContextValue {
  graphicsMode: GraphicsMode
  downgradeReason: string | null
  isLightMode: boolean
  requestLightMode: (reason: string) => void
  reportMetric: (metric: GraphicsMetric) => void
}

const GRAPHICS_MODE_KEY = 'portfolio-graphics-mode'
const GRAPHICS_REASON_KEY = 'portfolio-graphics-reason'
const METRIC_BREACH_KEY = 'portfolio-graphics-breach-count'

const GraphicsModeContext = createContext<GraphicsModeContextValue | undefined>(undefined)

function getInitialReason(): string | null {
  if (typeof window === 'undefined') return null

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean }
    deviceMemory?: number
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'prefers-reduced-motion'
  }

  if (nav.connection?.saveData) {
    return 'save-data'
  }

  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) {
    return 'low-device-memory'
  }

  if (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 2) {
    return 'low-hardware-concurrency'
  }

  return null
}

export function GraphicsModeProvider({ children }: { children: React.ReactNode }) {
  const [graphicsMode, setGraphicsMode] = useState<GraphicsMode>('full')
  const [downgradeReason, setDowngradeReason] = useState<string | null>(null)

  const shouldPersistLightMode = useCallback(() => process.env.NODE_ENV === 'production', [])

  const requestLightMode = useCallback((reason: string) => {
    setGraphicsMode('light')
    setDowngradeReason((prev) => prev ?? reason)

    if (typeof window !== 'undefined' && shouldPersistLightMode()) {
      sessionStorage.setItem(GRAPHICS_MODE_KEY, 'light')
      sessionStorage.setItem(GRAPHICS_REASON_KEY, reason)
    }
  }, [shouldPersistLightMode])

  const reportMetric = useCallback((metric: GraphicsMetric) => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    const isBadLcp = metric.name === 'LCP' && metric.value > 4000
    const isBadInp = metric.name === 'INP' && metric.value > 350

    if (!isBadLcp && !isBadInp) {
      sessionStorage.removeItem(METRIC_BREACH_KEY)
      return
    }

    const previousCount = Number(sessionStorage.getItem(METRIC_BREACH_KEY) ?? '0')
    const nextCount = previousCount + 1
    sessionStorage.setItem(METRIC_BREACH_KEY, String(nextCount))

    // Evite de couper Vanta sur un pic isolé ; il faut au moins 2 signaux mauvais dans la session.
    if (nextCount < 2) return

    if (isBadLcp) {
      requestLightMode(`lcp-${Math.round(metric.value)}`)
    }

    if (isBadInp) {
      requestLightMode(`inp-${Math.round(metric.value)}`)
    }
  }, [requestLightMode])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (process.env.NODE_ENV !== 'production') {
      sessionStorage.removeItem(GRAPHICS_MODE_KEY)
      sessionStorage.removeItem(GRAPHICS_REASON_KEY)
      sessionStorage.removeItem(METRIC_BREACH_KEY)
      return
    }

    const storedMode = sessionStorage.getItem(GRAPHICS_MODE_KEY)
    const storedReason = sessionStorage.getItem(GRAPHICS_REASON_KEY)

    if (storedMode === 'light') {
      setGraphicsMode('light')
      setDowngradeReason(storedReason)
      return
    }

    const initialReason = getInitialReason()
    if (initialReason) {
      requestLightMode(initialReason)
    }
  }, [requestLightMode])

  const value = useMemo<GraphicsModeContextValue>(() => ({
    graphicsMode,
    downgradeReason,
    isLightMode: graphicsMode === 'light',
    requestLightMode,
    reportMetric,
  }), [graphicsMode, downgradeReason, reportMetric, requestLightMode])

  return (
    <GraphicsModeContext.Provider value={value}>
      {children}
    </GraphicsModeContext.Provider>
  )
}

export function useGraphicsMode() {
  const context = useContext(GraphicsModeContext)

  if (!context) {
    throw new Error('useGraphicsMode must be used within a GraphicsModeProvider')
  }

  return context
}
