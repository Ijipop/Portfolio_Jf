/** URL http(s) optionnelle pour champs admin (téléchargements, sites). */
export function parseOptionalHttpUrl(
  input: unknown,
  fieldLabel: string,
): { ok: true; value: string | null } | { ok: false; error: string } {
  if (typeof input !== 'string' || input.trim().length === 0) {
    return { ok: true, value: null }
  }
  const value = input.trim()
  if (!/^https?:\/\//i.test(value)) {
    return {
      ok: false,
      error: `L’URL ${fieldLabel} doit commencer par http:// ou https://`,
    }
  }
  return { ok: true, value }
}
