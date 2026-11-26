/**
 * Envoi partagé contact / soutien → POST /api/contact
 */
export type SubmitContactResult =
  | { ok: true }
  | { ok: false; error: string; kind: 'api' | 'network' }

export async function submitContactRequest(
  body: Record<string, unknown>,
  fallbackError = 'Une erreur est survenue. Réessayez.',
): Promise<SubmitContactResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const raw = await response.text()
    let data: { success?: boolean; error?: string } = {}
    if (raw) {
      try {
        data = JSON.parse(raw) as { success?: boolean; error?: string }
      } catch {
        if (!response.ok) {
          return { ok: false, error: fallbackError, kind: 'api' }
        }
      }
    }
    if (data.success) return { ok: true }
    if (!response.ok || data.success === false) {
      return {
        ok: false,
        error: typeof data.error === 'string' ? data.error : fallbackError,
        kind: 'api',
      }
    }
    if (response.ok) return { ok: true }
    return { ok: false, error: fallbackError, kind: 'api' }
  } catch (error) {
    console.error('Erreur envoi contact:', error)
    return { ok: false, error: fallbackError, kind: 'network' }
  }
}