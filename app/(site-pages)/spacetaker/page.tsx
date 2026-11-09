import { PublicChromeShell } from '@/components/public-v2/chrome'
import { getSpaceTakerDownloads } from '@/lib/product-project-downloads'
import SpaceTakerLandingClient from './SpaceTakerLandingClient'

export const dynamic = 'force-dynamic'

/**
 * Space Taker — fiche produit sous chrome Pop Atelier (Phase 6B7 pilote).
 * URL, SEO layout, téléchargements Prisma + fallbacks inchangés.
 */
export default async function SpaceTakerPage() {
  const downloads = await getSpaceTakerDownloads()
  return (
    <PublicChromeShell
      pathname="/spacetaker"
      mainId="pv2-spacetaker-main"
      mainTestId="pv2-spacetaker-main"
    >
      <SpaceTakerLandingClient downloads={downloads} />
    </PublicChromeShell>
  )
}
