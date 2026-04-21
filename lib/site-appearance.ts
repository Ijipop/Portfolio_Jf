import { existsSync } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'

export const SITE_APPEARANCE_SINGLETON_ID = 1

const MAX_URL_LEN = 2048

/** URL absolue http(s) ou chemin relatif `/…` pour le fond mode présentation « Site ». */
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
  if (trimmed.length > MAX_URL_LEN) {
    return { ok: false, error: `URL trop longue (max ${MAX_URL_LEN} caractères)` }
  }
  if (/[\s\r\n<>]/.test(trimmed)) {
    return { ok: false, error: 'URL invalide' }
  }
  const lower = trimmed.toLowerCase()
  if (lower.startsWith('javascript:') || lower.startsWith('data:')) {
    return { ok: false, error: 'Schéma d’URL non autorisé' }
  }
  if (trimmed.startsWith('/')) {
    return { ok: true, value: trimmed }
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return { ok: true, value: trimmed }
  }
  return { ok: false, error: 'Utilisez une URL http(s) ou un chemin commençant par /' }
}

/**
 * Pour les chemins servis depuis `public/` : si le fichier n’existe pas (ex. upload local jamais déployé),
 * retourne null afin d’éviter un `background-image` en 404. Les URL http(s) sont laissées telles quelles.
 */
export function resolveBeigePresentationBgUrlForRender(url: string | null | undefined): string | null {
  const u = url?.trim()
  if (!u) return null
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
