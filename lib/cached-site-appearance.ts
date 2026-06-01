import { unstable_cache } from 'next/cache'
import { getBeigePresentationBgUrlFromDb } from '@/lib/site-appearance'

/**
 * Cache Next.js (5 min) en plus du cache mémoire process — même URL beige, moins de hits DB au layout.
 */
export const getCachedBeigePresentationBgUrl = unstable_cache(
  async () => getBeigePresentationBgUrlFromDb(),
  ['site-appearance-beige-presentation-bg'],
  { revalidate: 300 },
)
