import { PublicChromeShell } from '@/components/public-v2/chrome'
import TimelendrLandingClient from './TimelendrLandingClient'

/**
 * Timelendr — fiche produit sous chrome Pop Atelier (Phase 6B10).
 * URL /logiciel/timelendr, releases API et carrousel inchangés.
 * La redirection 308 /logiciel (exact) n’intercepte pas cette route.
 */
export default function TimelendrPage() {
  return (
    <PublicChromeShell
      pathname="/logiciel/timelendr"
      mainId="pv2-timelendr-main"
      mainTestId="pv2-timelendr-main"
    >
      <TimelendrLandingClient />
    </PublicChromeShell>
  )
}
