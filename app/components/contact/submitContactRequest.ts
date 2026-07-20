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
    const data = (await response.json()) as { success?: boolean; error?: string }
    if (data.success) return { ok: true }
    return {
      ok: false,
      error: typeof data.error === 'string' ? data.error : fallbackError,
      kind: 'api',
    }
  } catch (error) {
    console.error('Erreur envoi contact:', error)
    return { ok: false, error: fallbackError, kind: 'network' }
  }
}
