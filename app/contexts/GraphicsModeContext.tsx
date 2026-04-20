'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  type GraphicsMetric,
  type GraphicsMode,
  GRAPHICS_MODE_KEY,
  GRAPHICS_OVERRIDE_KEY,
  GRAPHICS_REASON_KEY,
  METRIC_BREACH_KEY,
  evaluateGraphicsMetricBreach,
  resolveGraphicsModeOverride,
  resolveInitialGraphicsDecision,
  shouldPersistGraphicsDowngrade,
} from '@/utils/graphicsModeRules'

interface GraphicsModeContextValue {
  graphicsMode: GraphicsMode
  downgradeReason: string | null
  isLightMode: boolean
  requestLightMode: (reason: string) => void
  reportMetric: (metric: GraphicsMetric) => void
}

const GraphicsModeContext = createContext<GraphicsModeContextValue | undefined>(undefined)

export function GraphicsModeProvider({ children }: { children: React.ReactNode }) {
  const [graphicsMode, setGraphicsMode] = useState<GraphicsMode>('full')
  const [downgradeReason, setDowngradeReason] = useState<string | null>(null)

  const isProduction = process.env.NODE_ENV === 'production'
  const shouldPersistLightMode = useCallback(
    () => shouldPersistGraphicsDowngrade(isProduction),
    [isProduction]
  )

  const requestLightMode = useCallback((reason: string) => {
    setGraphicsMode('light')
    setDowngradeReason((prev) => prev ?? reason)

    if (typeof window !== 'undefined' && shouldPersistLightMode()) {
      sessionStorage.setItem(GRAPHICS_MODE_KEY, 'light')
      sessionStorage.setItem(GRAPHICS_REASON_KEY, reason)
    }
  }, [shouldPersistLightMode])

  const reportMetric = useCallback((metric: GraphicsMetric) => {
    if (typeof window === 'undefined') {
      return
    }

    const previousCount = Number(sessionStorage.getItem(METRIC_BREACH_KEY) ?? '0')
    const evaluation = evaluateGraphicsMetricBreach(metric, previousCount, isProduction)

    if (evaluation.shouldDowngrade && evaluation.reason) {
      requestLightMode(evaluation.reason)
      sessionStorage.removeItem(METRIC_BREACH_KEY)
      return
    }

    if (evaluation.nextCount === 0) {
      sessionStorage.removeItem(METRIC_BREACH_KEY)
      return
    }

    sessionStorage.setItem(METRIC_BREACH_KEY, String(evaluation.nextCount))
  }, [isProduction, requestLightMode])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean }
      deviceMemory?: number
    }

    const forcedMode = resolveGraphicsModeOverride(
      process.env.NEXT_PUBLIC_FORCE_GRAPHICS_MODE ??
        localStorage.getItem(GRAPHICS_OVERRIDE_KEY)
    )

    if (!forcedMode) {
      sessionStorage.removeItem(GRAPHICS_MODE_KEY)
      sessionStorage.removeItem(GRAPHICS_REASON_KEY)
      sessionStorage.removeItem(METRIC_BREACH_KEY)
    }

    if (!isProduction && !forcedMode) {
      setGraphicsMode('full')
      setDowngradeReason(null)
      return
    }

    const initialDecision = resolveInitialGraphicsDecision({
      forcedMode,
      persistedMode: resolveGraphicsModeOverride(sessionStorage.getItem(GRAPHICS_MODE_KEY)),
      persistedReason: sessionStorage.getItem(GRAPHICS_REASON_KEY),
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      saveData: nav.connection?.saveData ?? false,
      deviceMemory: nav.deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency,
      isProduction,
    })

    setGraphicsMode(initialDecision.mode)
    setDowngradeReason(initialDecision.reason)
  }, [isProduction])

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
