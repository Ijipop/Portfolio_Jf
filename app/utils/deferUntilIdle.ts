export function deferUntilIdle(callback: () => void, timeoutMs = 1200): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: timeoutMs })
    return () => window.cancelIdleCallback(id)
  }

  const timer = setTimeout(callback, Math.min(timeoutMs, 480))
  return () => clearTimeout(timer)
}
