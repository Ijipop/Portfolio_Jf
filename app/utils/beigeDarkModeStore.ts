/** Persistance du mode sombre V2 (refonte siteDark). */

export const BEIGE_DARK_STORAGE_KEY = 'beigeDarkMode'
/** Présent si l'utilisateur a basculé manuellement clair/sombre au moins une fois. */
export const BEIGE_DARK_USER_CHOICE_KEY = 'beigeDarkUserChoice'
export const BEIGE_DARK_MODE_EVENT = 'portfolio:beige-dark-change'
export const BEIGE_DARK_INSTANT_ATTR = 'data-beige-dark-instant'

type Listener = (enabled: boolean) => void
type InstantSyncFn = (enabled: boolean) => void

const listeners = new Set<Listener>()
let instantSync: InstantSyncFn | null = null

let cached: boolean | null = null

/** Enregistré par AdvancedThemeProvider pour appliquer latte/sunset avant le prochain paint. */
export function registerBeigeDarkInstantSync(fn: InstantSyncFn | null): void {
  instantSync = fn
}

export function readBeigeDarkFromStorage(): boolean {
  if (typeof window === 'undefined') return true
  const raw = localStorage.getItem(BEIGE_DARK_STORAGE_KEY)
  if (raw === null) return true

  const explicitChoice = localStorage.getItem(BEIGE_DARK_USER_CHOICE_KEY)
  const themeName = localStorage.getItem('themeName')
  const wantsLight = raw === '0' || raw === 'false'

  // État incohérent post-refonte V2 : thème siteDark mais flag clair sans choix explicite.
  if (wantsLight && themeName === 'siteDark' && explicitChoice !== '1') {
    try {
      localStorage.setItem(BEIGE_DARK_STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    cached = true
    return true
  }

  if (wantsLight) return false
  return true
}

export function getBeigeDark(): boolean {
  if (cached === null) {
    cached = readBeigeDarkFromStorage()
  }
  return cached
}

function markInstantToggle(): void {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute(BEIGE_DARK_INSTANT_ATTR, '1')
  window.requestAnimationFrame(() => {
    document.documentElement.removeAttribute(BEIGE_DARK_INSTANT_ATTR)
  })
}

export function setBeigeDark(enabled: boolean): void {
  cached = enabled
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(BEIGE_DARK_STORAGE_KEY, enabled ? '1' : '0')
      localStorage.setItem(BEIGE_DARK_USER_CHOICE_KEY, '1')
    }
  } catch {
    /* ignore quota */
  }
  markInstantToggle()
  instantSync?.(enabled)
  listeners.forEach((listener) => listener(enabled))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(BEIGE_DARK_MODE_EVENT, { detail: { enabled } }))
  }
}

export function subscribeBeigeDark(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
