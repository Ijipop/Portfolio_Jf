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

export function shouldPersistGraphicsDowngrade(isProduction: boolean): boolean {
  void isProduction
  return false
}

export function resolveInitialGraphicsDecision(input: InitialGraphicsDecisionInput): InitialGraphicsDecision {
  if (input.forcedMode) {
    return {
      mode: input.forcedMode,
      reason: input.forcedMode === LIGHT_MODE ? 'forced-light-mode' : 'forced-full-mode',
    }
  }

  void input.persistedMode
  void input.persistedReason
  void input.prefersReducedMotion
  void input.saveData
  void input.deviceMemory
  void input.hardwareConcurrency
  void input.isProduction

  return {
    mode: FULL_MODE,
    reason: null,
  }
}

export function evaluateGraphicsMetricBreach(
  metric: GraphicsMetric,
  currentCount: number,
  isProduction: boolean
): MetricBreachEvaluation {
  void metric
  void currentCount
  void isProduction
  return {
    nextCount: 0,
    shouldDowngrade: false,
    reason: null,
  }
}

export function shouldDowngradeFromSlowFrames(slowRatio: number, isProduction: boolean): boolean {
  void slowRatio
  void isProduction
  return false
}
