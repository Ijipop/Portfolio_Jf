'use client'

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

export const WEB_BUILD_EASE: [number, number, number, number] = [0.22, 0.72, 0.2, 1]
export const WEB_BUILD_ATTR = 'data-web-build'
export const WEB_BUILD_RUN = 'run'

export function isWebBuildRun(): boolean {
  if (typeof document === 'undefined') return false
  return document.documentElement.getAttribute(WEB_BUILD_ATTR) === WEB_BUILD_RUN
}

function readDebugProgress(param: string): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get(param)
  if (raw == null || raw === '') return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  return Math.min(1, Math.max(0, n))
}

/** Sync avec le boot head — évite progress=1 au premier commit client. */
function readInitialProgress(debugParam?: string): number {
  if (typeof window === 'undefined') return 1
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 1
  const path = window.location.pathname || ''
  if (!path.includes('creation-site-web-montreal')) return 1
  if (document.documentElement.getAttribute(WEB_BUILD_ATTR) !== WEB_BUILD_RUN) {
    /* Boot pas encore / client nav : activer run si motion OK */
    document.documentElement.setAttribute(WEB_BUILD_ATTR, WEB_BUILD_RUN)
  }
  if (debugParam) {
    const d = readDebugProgress(debugParam)
    if (d != null) return d
  }
  return 0
}

type MountOptions = {
  mode: 'mount'
  duration: number
  debugParam?: string
}

type InViewOptions = {
  mode: 'inView'
  duration: number
  targetRef: RefObject<Element | null>
  amount?: number
}

export type UseBuildProgressOptions = MountOptions | InViewOptions

/**
 * Bind MotionValue → CSS var --build.
 * Avant mount : pas d’inline (SSR + 1er paint alignés) — CSS run porte PLAN via --build:0.
 */
export function useBuildVarStyle(slot: MotionValue<number>): CSSProperties {
  const template = useMotionTemplate`${slot}`
  const [mounted, setMounted] = useState(false)
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return {}
  return { ['--build' as string]: template } as CSSProperties
}

/**
 * Une seule MotionValue 0→1 par séquence.
 * Pas de setState par frame — dériver avec useTransform.
 */
export function useBuildProgress(options: UseBuildProgressOptions): MotionValue<number> {
  const reduced = useReducedMotion()
  const mode = options.mode
  const duration = options.duration
  const debugParam = mode === 'mount' ? options.debugParam : undefined
  const targetRef = mode === 'inView' ? options.targetRef : null
  const amount = mode === 'inView' ? (options.amount ?? 0.22) : 0.22

  const initial = useMemo(
    () => (reduced ? 1 : readInitialProgress(mode === 'mount' ? debugParam : undefined)),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once per mount
    [],
  )

  const progress = useMotionValue(initial)
  const startedRef = useRef(false)

  useLayoutEffect(() => {
    if (reduced) {
      progress.set(1)
      document.documentElement.removeAttribute(WEB_BUILD_ATTR)
      return
    }
    if (!isWebBuildRun()) {
      const path = window.location.pathname || ''
      if (path.includes('creation-site-web-montreal')) {
        document.documentElement.setAttribute(WEB_BUILD_ATTR, WEB_BUILD_RUN)
      }
    }
    if (!isWebBuildRun()) {
      progress.set(1)
      return
    }
    if (mode === 'mount') {
      const debug = debugParam ? readDebugProgress(debugParam) : null
      if (debug != null) {
        progress.set(debug)
        return
      }
    }
    if (progress.get() === 1 && mode === 'mount' && !debugParam) {
      progress.set(0)
    }
  }, [reduced, progress, mode, debugParam])

  useEffect(() => {
    if (reduced || !isWebBuildRun()) return

    if (mode === 'mount') {
      const debug = debugParam ? readDebugProgress(debugParam) : null
      if (debug != null) {
        progress.set(debug)
        return
      }
      // Like Support/Software: always restart 0→1 on mount (client nav included)
      progress.set(0)
      const controls = animate(progress, 1, { duration, ease: WEB_BUILD_EASE })
      return () => controls.stop()
    }

    const node = targetRef?.current
    if (!node || startedRef.current) return

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      animate(progress, 1, { duration, ease: WEB_BUILD_EASE })
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start()
          obs.disconnect()
        }
      },
      { threshold: amount, rootMargin: '0px 0px -6% 0px' },
    )
    obs.observe(node)

    const rect = node.getBoundingClientRect()
    const vh = window.innerHeight || 1
    if (rect.top < vh * 0.88 && rect.bottom > vh * 0.05) {
      start()
      obs.disconnect()
    }

    return () => obs.disconnect()
  }, [reduced, progress, mode, duration, debugParam, targetRef, amount])

  return progress
}
