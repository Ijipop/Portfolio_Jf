import { useCallback, useEffect, useRef, useState } from 'react'

type Mode = 'forward' | 'backward' | 'off'

type Options = {
  source: string
  charMs: number
  mode: Mode
  onForwardComplete?: () => void
  onBackwardComplete?: () => void
}

/**
 * Frappé ou effacement caractère par caractère (snippet dans le panneau code).
 */
export function useCodeTypewriter({
  source,
  charMs,
  mode,
  onForwardComplete,
  onBackwardComplete,
}: Options) {
  const [typedLen, setTypedLen] = useState(0)
  const forwardDoneRef = useRef(false)
  const backwardDoneRef = useRef(false)
  const onFwd = useRef(onForwardComplete)
  const onBwd = useRef(onBackwardComplete)
  onFwd.current = onForwardComplete
  onBwd.current = onBackwardComplete

  useEffect(() => {
    forwardDoneRef.current = false
    backwardDoneRef.current = false
  }, [source])

  useEffect(() => {
    if (mode === 'off') return

    if (mode === 'forward') {
      const full = source.length
      if (typedLen >= full) {
        if (!forwardDoneRef.current) {
          forwardDoneRef.current = true
          onFwd.current?.()
        }
        return
      }
      const id = window.setTimeout(() => {
        setTypedLen((n) => Math.min(n + 1, full))
      }, charMs)
      return () => clearTimeout(id)
    }

    if (mode === 'backward') {
      if (typedLen <= 0) {
        if (!backwardDoneRef.current) {
          backwardDoneRef.current = true
          onBwd.current?.()
        }
        return
      }
      const id = window.setTimeout(() => {
        setTypedLen((n) => Math.max(0, n - 1))
      }, charMs)
      return () => clearTimeout(id)
    }
  }, [mode, source, typedLen, charMs])

  const resetLength = useCallback(() => {
    setTypedLen(0)
    forwardDoneRef.current = false
    backwardDoneRef.current = false
  }, [])

  const setLength = useCallback((n: number) => {
    setTypedLen(n)
    forwardDoneRef.current = false
    backwardDoneRef.current = false
  }, [])

  return { typedLen, resetLength, setLength }
}
