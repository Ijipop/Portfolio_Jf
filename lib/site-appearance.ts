import { prisma } from '@/lib/prisma'

export const SITE_APPEARANCE_SINGLETON_ID = 1

export { parseBeigePresentationBgUrl } from '@/lib/stored-image-value'

const CACHE_TTL_MS = 60 * 60 * 1000
let beigePresentationBgUrlCache: { value: string | null; expiresAt: number } | null = null

export function clearSiteAppearanceMemoryCache() {
  beigePresentationBgUrlCache = null
}

async function readBeigePresentationBgUrlFromDb(): Promise<string | null> {
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

export async function getBeigePresentationBgUrlFromDb(): Promise<string | null> {
  const now = Date.now()
  if (beigePresentationBgUrlCache && beigePresentationBgUrlCache.expiresAt > now) {
    return beigePresentationBgUrlCache.value
  }

  const value = await readBeigePresentationBgUrlFromDb()
  beigePresentationBgUrlCache = {
    value,
    expiresAt: now + CACHE_TTL_MS,
  }
  return value
}
