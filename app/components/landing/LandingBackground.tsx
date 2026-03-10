'use client'

import { useEffect, useRef, useState } from 'react'

const P5_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js'
const VANTA_TOPOLOGY_CDN = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.topology.min.js'

export default function LandingBackground() {
  const elRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<{ destroy: () => void } | null>(null)
  const [vantaReady, setVantaReady] = useState(false)

  useEffect(() => {
    const el = elRef.current
    if (!el || typeof window === 'undefined') return

    let mounted = true

    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = reject
        document.head.appendChild(script)
      })

    const init = async () => {
      try {
        await loadScript(P5_CDN)
        if (!mounted) return
        await loadScript(VANTA_TOPOLOGY_CDN)
        if (!mounted || !elRef.current) return

        const VANTA = (window as unknown as { VANTA: { TOPOLOGY: (opts: Record<string, unknown>) => { destroy: () => void } } }).VANTA
        if (!VANTA?.TOPOLOGY) return

        effectRef.current = VANTA.TOPOLOGY({
          el: elRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundColor: 0x222222,
          color: 0x89964e,
        })
        requestAnimationFrame(() => {
          if (mounted) setVantaReady(true)
        })
      } catch (err) {
        console.warn('[LandingBackground] Vanta failed to load', err)
      }
    }

    init()
    return () => {
      mounted = false
      if (effectRef.current) {
        effectRef.current.destroy()
        effectRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        minHeight: '100vh',
        minWidth: '100%',
        backgroundColor: '#222222',
        opacity: vantaReady ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
      aria-hidden
    />
  )
}
