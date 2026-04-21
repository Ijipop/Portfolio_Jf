import { existsSync } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'
import { isValidBeigeBgDataImageUrl } from '@/lib/beige-presentation-bg-shared'

export const SITE_APPEARANCE_SINGLETON_ID = 1

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
