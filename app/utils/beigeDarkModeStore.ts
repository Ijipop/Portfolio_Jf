/** Persistance du mode sombre « sunset » en présentation Site (beige). */

export const BEIGE_DARK_STORAGE_KEY = 'beigeDarkMode'
export const BEIGE_DARK_MODE_EVENT = 'portfolio:beige-dark-change'

type Listener = (enabled: boolean) => void

const listeners = new Set<Listener>()

let cached: boolean | null = null

export function readBeigeDarkFromStorage(): boolean {
  if (typeof window === 'undefined') return false
  const raw = localStorage.getItem(BEIGE_DARK_STORAGE_KEY)
  return raw === '1' || raw === 'true'
}

export function getBeigeDark(): boolean {
  if (cached === null) {
    cached = readBeigeDarkFromStorage()
  }
  return cached
}

export function setBeigeDark(enabled: boolean): void {
  cached = enabled
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(BEIGE_DARK_STORAGE_KEY, enabled ? '1' : '0')
    }
  } catch {
    /* ignore quota */
  }
  listeners.forEach((listener) => listener(enabled))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(BEIGE_DARK_MODE_EVENT, { detail: { enabled } }))
  }
}

export function subscribeBeigeDark(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
