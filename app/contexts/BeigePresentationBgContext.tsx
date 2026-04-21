'use client'

import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'

type BeigePresentationBgContextValue = {
  beigePresentationBgUrl: string | null
  setBeigePresentationBgUrl: (url: string | null) => void
}

const BeigePresentationBgContext = createContext<BeigePresentationBgContextValue | undefined>(
  undefined
)

export function BeigePresentationBgProvider({
  children,
  initialBeigePresentationBgUrl = null,
}: {
  children: React.ReactNode
  initialBeigePresentationBgUrl?: string | null
}) {
  const [beigePresentationBgUrl, setState] = useState<string | null>(() =>
    initialBeigePresentationBgUrl?.trim() || null
  )

  useEffect(() => {
    setState(initialBeigePresentationBgUrl?.trim() || null)
  }, [initialBeigePresentationBgUrl])

  const setBeigePresentationBgUrl = useCallback((url: string | null) => {
    setState(url?.trim() || null)
  }, [])

  const value = useMemo(
    () => ({ beigePresentationBgUrl, setBeigePresentationBgUrl }),
    [beigePresentationBgUrl, setBeigePresentationBgUrl]
  )

  return (
    <BeigePresentationBgContext.Provider value={value}>{children}</BeigePresentationBgContext.Provider>
  )
}

export function useBeigePresentationBg() {
  const ctx = useContext(BeigePresentationBgContext)
  if (!ctx) {
    throw new Error('useBeigePresentationBg must be used within BeigePresentationBgProvider')
  }
  return ctx
}
