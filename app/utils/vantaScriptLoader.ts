'use client'

import { VANTA_SCRIPT_TIMEOUT_MS } from '@/utils/vantaAssets'

const scriptPromises = new Map<string, Promise<void>>()

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`${label} timeout after ${ms}ms`)), ms)
  })
  return Promise.race([promise, timeout]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId)
  }) as Promise<T>
}

function ensureScriptLoaded(src: string): Promise<void> {
  const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
  if (!existing) {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    const promise = new Promise<void>((resolve, reject) => {
      script.onload = () => {
        script.setAttribute('data-loaded', 'true')
        resolve()
      }
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    })
    document.head.appendChild(script)
    return promise
  }

  if (existing.getAttribute('data-loaded') === 'true') {
    return Promise.resolve()
  }

  return new Promise<void>((resolve, reject) => {
    existing.addEventListener(
      'load',
      () => {
        existing.setAttribute('data-loaded', 'true')
        resolve()
      },
      { once: true }
    )
    existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)), {
      once: true,
    })
  })
}

export async function loadExternalScript(src: string, timeoutMs = VANTA_SCRIPT_TIMEOUT_MS): Promise<void> {
  if (typeof window === 'undefined') return
  if (!scriptPromises.has(src)) {
    const promise = withTimeout(ensureScriptLoaded(src), timeoutMs, src).catch((err) => {
      scriptPromises.delete(src)
      throw err
    })
    scriptPromises.set(src, promise)
  }
  await scriptPromises.get(src)
}

export async function preloadExternalScripts(sources: string[]): Promise<void> {
  if (typeof window === 'undefined') return
  await Promise.allSettled(sources.map((src) => loadExternalScript(src)))
}
