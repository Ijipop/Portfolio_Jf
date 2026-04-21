import { existsSync } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'

export const SITE_APPEARANCE_SINGLETON_ID = 1

const MAX_HTTP_OR_PATH_LEN = 2048
/** Image intégrée base64 (upload navigateur, sans stockage fichier). ~900 Ko fichier ≈ 1,2 Mio caractères. */
export const MAX_BEIGE_BG_DATA_URL_CHARS = 1_400_000

const DATA_IMAGE_BG_RE =
  /^data:image\/(?:png|jpeg|jpg|gif|webp);base64,[a-z0-9+/=*]+$/i

export function isValidBeigeBgDataImageUrl(s: string): boolean {
  const t = s.trim()
  return t.length > 0 && t.length <= MAX_BEIGE_BG_DATA_URL_CHARS && DATA_IMAGE_BG_RE.test(t)
}

/** URL absolue http(s), chemin `/…`, ou data URL image (upload bureau sans Blob). */
export function parseBeigePresentationBgUrl(input: unknown): { ok: true; value: string | null } | { ok: false; error: string } {
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
        error:
          'Image autorisée : PNG, JPEG, GIF ou WebP en base64 (max ~900 Ko fichier avant encodage).',
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

/**
 * Pour les chemins servis depuis `public/` : si le fichier n’existe pas (ex. upload local jamais déployé),
 * retourne null afin d’éviter un `background-image` en 404. Les URL http(s) sont laissées telles quelles.
 */
export function resolveBeigePresentationBgUrlForRender(url: string | null | undefined): string | null {
  const u = url?.trim()
  if (!u) return null
  if (u.startsWith('data:image/') && isValidBeigeBgDataImageUrl(u)) return u
  if (/^https?:\/\//i.test(u)) return u
  if (!u.startsWith('/')) return null
  try {
    const decoded = decodeURIComponent(u)
    const parts = decoded.split('/').filter(Boolean)
    if (parts.length === 0 || parts.some((p) => p === '..' || p.includes('\0'))) return null
    const full = path.resolve(path.join(process.cwd(), 'public', ...parts))
    const root = path.resolve(path.join(process.cwd(), 'public'))
    const rel = path.relative(root, full)
    if (rel.startsWith('..') || path.isAbsolute(rel)) return null
    return existsSync(full) ? u : null
  } catch {
    return null
  }
}

export async function getBeigePresentationBgUrlFromDb(): Promise<string | null> {
  try {
    const row = await prisma.siteAppearance.findUnique({
      where: { id: SITE_APPEARANCE_SINGLETON_ID },
      select: { beigePresentationBgUrl: true },
    })
    const v = row?.beigePresentationBgUrl?.trim()
    return v || null
  } catch {
    return null
  }
}

/** Valeur SSR pour le site public : ignore les chemins locaux dont le fichier est absent. */
export async function getBeigePresentationBgUrlForSsr(): Promise<string | null> {
  const raw = await getBeigePresentationBgUrlFromDb()
  return resolveBeigePresentationBgUrlForRender(raw)
}
