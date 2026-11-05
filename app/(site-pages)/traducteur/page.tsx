import { PublicChromeShell } from '@/components/public-v2/chrome'
import { getTraducteurDownloads } from '@/lib/product-project-downloads'
import TraducteurLandingClient from './TraducteurLandingClient'

export const dynamic = 'force-dynamic'

/**
 * Le Traducteur — fiche produit sous chrome Pop Atelier (Phase 6B8).
 * URL, SEO layout, téléchargements Prisma + fallbacks inchangés.
 */
export default async function TraducteurPage() {
  const downloads = await getTraducteurDownloads()
  return (
    <PublicChromeShell
      pathname="/traducteur"
      mainId="pv2-traducteur-main"
      mainTestId="pv2-traducteur-main"
    >
      <TraducteurLandingClient downloads={downloads} />
    </PublicChromeShell>
  )
}
