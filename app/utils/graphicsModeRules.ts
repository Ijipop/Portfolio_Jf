'use client'

export type GraphicsMode = 'full' | 'light'

export interface GraphicsMetric {
  name: string
  value: number
  rating?: string
}

export interface InitialGraphicsDecision {
  mode: GraphicsMode
  reason: string | null
}

export interface InitialGraphicsDecisionInput {
  forcedMode?: GraphicsMode | null
  persistedMode?: GraphicsMode | null
  persistedReason?: string | null
  prefersReducedMotion?: boolean
  saveData?: boolean
  deviceMemory?: number
  hardwareConcurrency?: number
  isProduction: boolean
}

export interface MetricBreachEvaluation {
  nextCount: number
  shouldDowngrade: boolean
  reason: string | null
}

const FULL_MODE = 'full'
const LIGHT_MODE = 'light'

/** Nombre de métriques « poor » consécutives (prod) avant passage en mode light. */
const WEB_VITAL_POOR_BREACH_TO_DOWNGRADE = 6

/** Au-dessus de ce ratio de frames lentes, demander le mode light (prod uniquement). */
const SLOW_FRAME_DOWNGRADE_RATIO = 0.52

const LIGHT_OVERRIDE_VALUES = new Set(['light', 'lite'])
const FULL_OVERRIDE_VALUES = new Set(['full'])

export const GRAPHICS_MODE_KEY = 'portfolio-graphics-mode'
export const GRAPHICS_REASON_KEY = 'portfolio-graphics-reason'
export const METRIC_BREACH_KEY = 'portfolio-graphics-breach-count'
export const GRAPHICS_OVERRIDE_KEY = 'portfolio-force-graphics-mode'

export function resolveGraphicsModeOverride(value: string | null | undefined): GraphicsMode | null {
  if (!value) return null

  const normalized = value.trim().toLowerCase()
  if (LIGHT_OVERRIDE_VALUES.has(normalized)) return LIGHT_MODE
  if (FULL_OVERRIDE_VALUES.has(normalized)) return FULL_MODE

  return null
}

/** En prod, conserver le mode light choisi automatiquement pour la durée de l’onglet. */
export function shouldPersistGraphicsDowngrade(isProduction: boolean): boolean {
  return isProduction
}

function isMetricPoor(metric: GraphicsMetric): boolean {
  if (metric.rating === 'poor') return true
  if (metric.rating === 'good' || metric.rating === 'needs-improvement') return false
  switch (metric.name) {
    case 'LCP':
      return metric.value > 4000
    case 'INP':
      return metric.value > 500
    case 'CLS':
      return metric.value > 0.25
    default:
      return false
  }
}

export function resolveInitialGraphicsDecision(input: InitialGraphicsDecisionInput): InitialGraphicsDecision {
  if (input.forcedMode) {
    return {
      mode: input.forcedMode,
      reason: input.forcedMode === LIGHT_MODE ? 'forced-light-mode' : 'forced-full-mode',
    }
  }

  // Développement : toujours full sauf override forcé (confort dev).
  if (!input.isProduction) {
    return { mode: FULL_MODE, reason: null }
  }

  if (input.persistedMode === LIGHT_MODE) {
    return {
      mode: LIGHT_MODE,
      reason: input.persistedReason ?? 'session-persisted-light',
    }
  }

  if (input.prefersReducedMotion) {
    return { mode: LIGHT_MODE, reason: 'prefers-reduced-motion' }
  }

  if (input.saveData) {
    return { mode: LIGHT_MODE, reason: 'save-data' }
  }

  const mem = input.deviceMemory
  if (typeof mem === 'number' && Number.isFinite(mem) && mem > 0 && mem <= 4) {
    return { mode: LIGHT_MODE, reason: 'device-memory-low' }
  }

  const cores = input.hardwareConcurrency
  if (typeof cores === 'number' && Number.isFinite(cores) && cores > 0 && cores <= 2) {
    return { mode: LIGHT_MODE, reason: 'hardware-concurrency-low' }
  }

  return { mode: FULL_MODE, reason: null }
}

export function evaluateGraphicsMetricBreach(
  metric: GraphicsMetric,
  currentCount: number,
  isProduction: boolean
): MetricBreachEvaluation {
  if (!isProduction || !isMetricPoor(metric)) {
    return { nextCount: 0, shouldDowngrade: false, reason: null }
  }

  const nextCount = currentCount + 1
  const shouldDowngrade = nextCount >= WEB_VITAL_POOR_BREACH_TO_DOWNGRADE
  if (shouldDowngrade) {
    return {
      nextCount: 0,
      shouldDowngrade: true,
      reason: `web-vitals-${String(metric.name).toLowerCase()}-poor`,
    }
  }

  return {
    nextCount,
    shouldDowngrade: false,
    reason: null,
  }
}

export function shouldDowngradeFromSlowFrames(slowRatio: number, isProduction: boolean): boolean {
  if (!isProduction) return false
  return slowRatio >= SLOW_FRAME_DOWNGRADE_RATIO
}
