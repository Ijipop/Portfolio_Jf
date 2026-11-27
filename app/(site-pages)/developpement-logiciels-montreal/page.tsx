import { PublicChromeShell } from '@/components/public-v2/chrome'
import { SoftwarePageClient } from '@/components/public-v2/services/software'

/**
 * Développement logiciels — landing Pop Atelier.
 * L’application se construit, puis travaille (import → traitement → résultat).
 */
export default function DeveloppementLogicielsMontrealPage() {
  return (
    <PublicChromeShell
      pathname="/developpement-logiciels-montreal"
      mainId="pv2-software-main"
      mainTestId="pv2-software-main"
    >
      <SoftwarePageClient />
    </PublicChromeShell>
  )
}
