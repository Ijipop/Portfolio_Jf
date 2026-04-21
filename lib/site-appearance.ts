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
