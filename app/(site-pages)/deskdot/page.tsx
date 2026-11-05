import { PublicChromeShell } from '@/components/public-v2/chrome'
import { getDeskDotDownloads } from '@/lib/product-project-downloads'
import DeskDotLandingClient from './DeskDotLandingClient'

export const dynamic = 'force-dynamic'

/**
 * DeskDot — fiche produit sous chrome Pop Atelier (Phase 6B9).
 * URL, SEO layout, PhotoStack, pitch, vidéo et getDeskDotDownloads inchangés.
 */
export default async function DeskDotPage() {
  const downloads = await getDeskDotDownloads()
  return (
    <PublicChromeShell
      pathname="/deskdot"
      mainId="pv2-deskdot-main"
      mainTestId="pv2-deskdot-main"
    >
      <DeskDotLandingClient downloads={downloads} />
    </PublicChromeShell>
  )
}
