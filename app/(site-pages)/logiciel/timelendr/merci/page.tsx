import { PublicChromeShell } from '@/components/public-v2/chrome'
import TimelendrMerciClient from './TimelendrMerciClient'

/**
 * Merci Timelendr — chrome Pop Atelier ; contenu MUI isolé (Phase 6B10).
 * URL /logiciel/timelendr/merci conservée.
 */
export default function TimelendrMerciPage() {
  return (
    <PublicChromeShell
      pathname="/logiciel/timelendr/merci"
      mainId="pv2-timelendr-merci-main"
      mainTestId="pv2-timelendr-merci-main"
    >
      <TimelendrMerciClient />
    </PublicChromeShell>
  )
}
