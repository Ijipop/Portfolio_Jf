/**
 * Mappe une erreur POST /api/contact vers un message UI localisé
 * sans changer le contrat serveur ni Resend.
 * Préférence : status HTTP (429) puis motif rate-limit, sinon :
 * - FR : message serveur diagnostic (comportement historique)
 * - EN : message générique localisé (évite le FR brut dans l’UI EN)
 */
export type ContactApiErrorCopy = {
  sendError: string
  networkError: string
  rateLimitError: string
}

export type ContactApiErrorInput = {
  error: string
  kind: 'api' | 'network'
  status?: number
}

export function localizeContactApiError(
  result: ContactApiErrorInput,
  copy: ContactApiErrorCopy,
  locale: 'fr' | 'en' = 'fr',
): string {
  if (result.kind === 'network') return copy.networkError
  if (result.status === 429) return copy.rateLimitError
  const raw = result.error.trim()
  if (/trop de messages/i.test(raw) || /too many/i.test(raw)) return copy.rateLimitError
  if (locale === 'fr' && raw) return raw
  return copy.sendError
}
