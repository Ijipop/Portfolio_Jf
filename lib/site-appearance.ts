import { prisma } from '@/lib/prisma'

export const SITE_APPEARANCE_SINGLETON_ID = 1

export { parseBeigePresentationBgUrl } from '@/lib/stored-image-value'

const CACHE_TTL_MS = 60 * 60 * 1000
const DB_READ_TIMEOUT_MS = 800
const FAILURE_COOLDOWN_MS = 5 * 60 * 1000
let beigePresentationBgUrlCache: { value: string | null; expiresAt: number } | null = null
let dbReadFailureCooldownUntil = 0

export function clearSiteAppearanceMemoryCache() {
  beigePresentationBgUrlCache = null
  dbReadFailureCooldownUntil = 0
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), timeoutMs)
    promise
      .then((value) => resolve(value))
      .catch(() => resolve(null))
      .finally(() => clearTimeout(timer))
  })
}

async function readBeigePresentationBgUrlFromDb(): Promise<string | null> {
  if (dbReadFailureCooldownUntil > Date.now()) {
    return null
  }

  try {
    const row = await withTimeout(
      prisma.siteAppearance.findUnique({
        where: { id: SITE_APPEARANCE_SINGLETON_ID },
        select: { beigePresentationBgUrl: true },
      }),
      DB_READ_TIMEOUT_MS
    )
    if (!row) {
      dbReadFailureCooldownUntil = Date.now() + FAILURE_COOLDOWN_MS
      return null
    }

    const v = row?.beigePresentationBgUrl?.trim()
    return v || null
  } catch {
    dbReadFailureCooldownUntil = Date.now() + FAILURE_COOLDOWN_MS
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
