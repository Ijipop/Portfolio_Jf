'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

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
      if (raw === 'dev' || raw === 'beige') {
        setModeState(raw)
      }
    } finally {
      setHydrated(true)
    }
  }, [])

  const setMode = useCallback((next: PresentationMode) => {
    setModeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
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
