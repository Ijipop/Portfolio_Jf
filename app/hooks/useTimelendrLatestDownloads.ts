'use client'

import { useEffect, useState } from 'react'

type LatestDownloads = {
  windowsUrl: string | null
  macosUrl: string | null
}

export function useTimelendrLatestDownloads() {
  const [urls, setUrls] = useState<LatestDownloads>({ windowsUrl: null, macosUrl: null })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch('/api/timelendr/releases?mode=latest')
      .then((res) => res.json())
      .then((data: { success?: boolean; data?: LatestDownloads }) => {
        if (cancelled || !data.success || !data.data) return
        setUrls({
          windowsUrl: data.data.windowsUrl ?? null,
          macosUrl: data.data.macosUrl ?? null,
        })
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { ...urls, ready }
}
