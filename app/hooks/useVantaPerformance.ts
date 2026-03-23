'use client'

import { RefObject, useEffect, useMemo, useState } from 'react'

type VantaMode = 'normal' | 'degraded'

interface VantaPerformanceState {
  isActive: boolean
  mode: VantaMode
  targetFps: number
}

/**
 * Runtime perf state for heavy canvas effects:
 * - pauses when hidden/unfocused/out-of-view
 * - degrades cadence to ~30fps on slower devices
 */
export function useVantaPerformance(elRef: RefObject<HTMLElement>): VantaPerformanceState {
  const [isVisibleTab, setIsVisibleTab] = useState(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  )
  const [isFocused, setIsFocused] = useState(
    typeof document !== 'undefined' ? document.hasFocus() : true
  )
  const [isInViewport, setIsInViewport] = useState(true)
  const [mode, setMode] = useState<VantaMode>('normal')

  const isActive = isVisibleTab && isFocused && isInViewport

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onVisibility = () => setIsVisibleTab(document.visibilityState === 'visible')
    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  useEffect(() => {
    const el = elRef.current
    if (!el || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      { threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [elRef])

  useEffect(() => {
    if (!isActive || typeof window === 'undefined') return

    let raf = 0
    let running = true
    let last = performance.now()
    let frameCount = 0
    let slowFrames = 0

    const sample = () => {
      if (!running) return
      const now = performance.now()
      const delta = now - last
      last = now

      frameCount += 1
      if (delta > 28) slowFrames += 1

      if (frameCount >= 45) {
        const slowRatio = slowFrames / frameCount
        setMode(slowRatio > 0.45 ? 'degraded' : 'normal')
        frameCount = 0
        slowFrames = 0
      }

      raf = requestAnimationFrame(sample)
    }

    raf = requestAnimationFrame(sample)
    return () => {
      running = false
      cancelAnimationFrame(raf)
    }
  }, [isActive])

  const targetFps = useMemo(() => (mode === 'degraded' ? 30 : 60), [mode])

  return { isActive, mode, targetFps }
}
