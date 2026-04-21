/**
 * Constantes et validation du fond « mode Site » — importable côté client (pas de `fs` / Prisma).
 */

const MAX_HTTP_OR_PATH_LEN = 2048

/**
 * Taille max. du fichier image avant base64 (upload bureau → data URL).
 * ~2,5 Mo binaire → ~3,3 Mo en base64, tient en général sous la limite corps de requête Vercel (~4,5 Mo).
 * Un fond 4 Mo brut dépasse souvent cette limite une fois encodé ; utiliser une URL https pour les gros fichiers.
 */
export const MAX_BEIGE_BG_FILE_BYTES = Math.floor(2.5 * 1024 * 1024)

/** Longueur max. de la chaîne `data:image/…;base64,…` (validation côté API). */
export const MAX_BEIGE_BG_DATA_URL_CHARS = 3_600_000

const DATA_IMAGE_BG_RE =
  /^data:image\/(?:png|jpeg|jpg|gif|webp);base64,[a-z0-9+/=*]+$/i

export function isValidBeigeBgDataImageUrl(s: string): boolean {
  const t = s.trim()
  return t.length > 0 && t.length <= MAX_BEIGE_BG_DATA_URL_CHARS && DATA_IMAGE_BG_RE.test(t)
}

/** URL absolue http(s), chemin `/…`, ou data URL image (upload bureau sans Blob). */
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
  if (/[\s\r\n<>]/.test(trimmed)) {
    return { ok: false, error: 'URL invalide' }
  }
  const lower = trimmed.toLowerCase()
  if (lower.startsWith('javascript:')) {
    return { ok: false, error: 'Schéma d’URL non autorisé' }
  }
  if (lower.startsWith('data:')) {
    if (!isValidBeigeBgDataImageUrl(trimmed)) {
      return {
        ok: false,
        error: `Image autorisée : PNG, JPEG, GIF ou WebP en base64 (taille max. data URL). Pour un fichier > ~2,5 Mo, utilisez une URL https (un fond 4 Mo en base64 dépasse souvent la limite d’hébergement).`,
      }
    }
    return { ok: true, value: trimmed }
  }
  if (trimmed.length > MAX_HTTP_OR_PATH_LEN) {
    return { ok: false, error: `URL trop longue (max ${MAX_HTTP_OR_PATH_LEN} caractères)` }
  }
  if (trimmed.startsWith('/')) {
    return { ok: true, value: trimmed }
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return { ok: true, value: trimmed }
  }
  return { ok: false, error: 'Utilisez une URL http(s), un chemin /… ou une image intégrée (data URL).' }
}
