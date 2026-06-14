'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { PRESENTATION_DEV_MODE_ENABLED } from '@/utils/vantaFeatures'

export type PresentationMode = 'beige' | 'dev'

const STORAGE_KEY = 'presentationMode'

interface PresentationModeContextValue {
  mode: PresentationMode
  setMode: (mode: PresentationMode) => void
  hydrated: boolean
}

const PresentationModeContext = createContext<PresentationModeContextValue | undefined>(undefined)

export function PresentationModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<PresentationMode>('beige')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw === 'beige' || (PRESENTATION_DEV_MODE_ENABLED && raw === 'dev')) {
        setModeState(raw)
      } else if (raw === 'dev') {
        localStorage.setItem(STORAGE_KEY, 'beige')
      }
    } finally {
      setHydrated(true)
    }
  }, [])

  const setMode = useCallback((next: PresentationMode) => {
    const resolved = PRESENTATION_DEV_MODE_ENABLED || next === 'beige' ? next : 'beige'
    setModeState(resolved)
    try {
      localStorage.setItem(STORAGE_KEY, resolved)
    } catch {
      /* ignore quota */
    }
  }, [])

  const value = useMemo(
    () => ({
      mode,
      setMode,
      hydrated,
    }),
    [mode, setMode, hydrated]
  )

  return (
    <PresentationModeContext.Provider value={value}>{children}</PresentationModeContext.Provider>
  )
}

export function usePresentationMode() {
  const ctx = useContext(PresentationModeContext)
  if (ctx === undefined) {
    throw new Error('usePresentationMode must be used within a PresentationModeProvider')
  }
  return ctx
}
