/** Garde-fou aligné sur le plan « sans bucket » (champ texte en base). */
export const MAX_STORED_IMAGE_VALUE_BYTES = 4 * 1024 * 1024

const MAX_CHARS_SOFT = 6_000_000

export function utf8ByteLength(s: string): number {
  return new TextEncoder().encode(s).length
}

/**
 * Référence image autorisée en base : vide, chemin `/…`, http(s), ou data:image/* (taille plafonnée).
 */
export function validateStoredImageReference(trimmed: string): { ok: true } | { ok: false; error: string } {
  if (trimmed === '') return { ok: true }

  if (trimmed.length > MAX_CHARS_SOFT) {
    return { ok: false, error: 'Valeur trop longue pour être enregistrée' }
  }

  if (/[\r\n]/.test(trimmed)) {
    return { ok: false, error: 'Caractères non autorisés' }
  }

  const lower = trimmed.toLowerCase()
  if (lower.startsWith('javascript:') || lower.startsWith('vbscript:')) {
    return { ok: false, error: 'Schéma d’URL non autorisé' }
  }

  if (lower.startsWith('data:')) {
    if (!lower.startsWith('data:image/')) {
      return { ok: false, error: 'Seules les data URL d’image (data:image/…) sont acceptées' }
    }
    if (utf8ByteLength(trimmed) > MAX_STORED_IMAGE_VALUE_BYTES) {
      return {
        ok: false,
        error: `Image encodée trop volumineuse (max ${Math.round(MAX_STORED_IMAGE_VALUE_BYTES / (1024 * 1024))} Mo)`,
      }
    }
    return { ok: true }
  }

  if (trimmed.startsWith('/')) {
    if (/[<>"']/.test(trimmed)) {
      return { ok: false, error: 'Chemin d’image invalide' }
    }
    return { ok: true }
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return { ok: true }
  }

  return { ok: false, error: 'Utilisez une URL http(s), un chemin commençant par /, ou une data URL data:image/…' }
}

/** Fond mode présentation « Site » : null, http(s), chemin `/…`, ou data URL `data:image/…`. */
export function parseBeigePresentationBgUrl(
  input: unknown
): { ok: true; value: string | null } | { ok: false; error: string } {
  if (input === null || input === undefined) {
    return { ok: true, value: null }
  }
  if (typeof input !== 'string') {
    return { ok: false, error: 'beigePresentationBgUrl doit être une chaîne ou null' }
  }
  const trimmed = input.trim()
  if (trimmed === '') {
    return { ok: true, value: null }
  }
  const v = validateStoredImageReference(trimmed)
  if (!v.ok) {
    return v
  }
  return { ok: true, value: trimmed }
}

export function normalizeProjectImageUrlInput(raw: unknown): { ok: true; value: string } | { ok: false; error: string } {
  if (raw === undefined || raw === null) {
    return { ok: true, value: '' }
  }
  if (typeof raw !== 'string') {
    return { ok: false, error: 'imageUrl doit être une chaîne' }
  }
  const trimmed = raw.trim()
  if (trimmed === '') {
    return { ok: true, value: '' }
  }
  const v = validateStoredImageReference(trimmed)
  if (!v.ok) return v
  return { ok: true, value: trimmed }
}
