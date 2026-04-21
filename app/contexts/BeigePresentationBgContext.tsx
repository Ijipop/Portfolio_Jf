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
    const synced = initialBeigePresentationBgUrl?.trim() || null
    setState(synced)

    if (typeof window === 'undefined') return undefined
    if (!synced || !synced.startsWith('/') || synced.startsWith('//')) return undefined

    const ac = new AbortController()
    const abs = new URL(synced, window.location.origin).toString()
    fetch(abs, { method: 'HEAD', signal: ac.signal, cache: 'no-store' })
      .then((res) => {
        if (res.status === 404 || res.status === 410) {
          setState(null)
        }
      })
      .catch(() => {})

    return () => ac.abort()
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
