import { PublicChromeShell } from '@/components/public-v2/chrome'
import { getCpuZeDownloads } from '@/lib/product-project-downloads'
import CpuZeLandingClient from './CpuZeLandingClient'

export const dynamic = 'force-dynamic'

/**
 * CPU-ZE — fiche produit sous chrome Pop Atelier (Phase 6B8).
 * URL, SEO layout, téléchargements Prisma + fallbacks inchangés.
 */
export default async function CpuZePage() {
  const downloads = await getCpuZeDownloads()
  return (
    <PublicChromeShell
      pathname="/cpu-ze"
      mainId="pv2-cpu-ze-main"
      mainTestId="pv2-cpu-ze-main"
    >
      <CpuZeLandingClient downloads={downloads} />
    </PublicChromeShell>
  )
}
