'use client'

import { useEffect } from 'react'
import { useGraphicsMode } from '@/contexts/GraphicsModeContext'

const REPORT_ENDPOINT = '/api/analytics/web-vitals'

interface WebVitalsMetric {
  name: string
  value: number
  rating?: string
  delta?: number
  id?: string
}

function sendMetric(metric: WebVitalsMetric) {
  if (typeof window === 'undefined') return

  const payload = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    path: window.location.pathname,
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(REPORT_ENDPOINT, payload)
    return
  }

  void fetch(REPORT_ENDPOINT, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
    keepalive: true,
  })
}

export default function WebVitalsReporter() {
  const { reportMetric } = useGraphicsMode()

  useEffect(() => {
    let disposed = false

    const registerMetrics = async () => {
      const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals')
      if (disposed) return

      const handleMetric = (metric: WebVitalsMetric) => {
        reportMetric(metric)

        if (process.env.NODE_ENV !== 'production') {
          console.info('[web-vitals]', metric.name, Math.round(metric.value), metric.rating)
        }

        sendMetric(metric)
      }

      onCLS(handleMetric)
      onFCP(handleMetric)
      onINP(handleMetric)
      onLCP(handleMetric)
      onTTFB(handleMetric)
    }

    void registerMetrics()

    return () => {
      disposed = true
    }
  }, [reportMetric])

  return null
}
