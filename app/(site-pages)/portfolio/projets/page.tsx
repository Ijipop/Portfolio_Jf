import { Suspense } from 'react'
import { LocalizedBusy, PublicChromeShell } from '@/components/public-v2/chrome'
import { ProjectsCatalog } from '@/components/public-v2/projects'

/**
 * Catalogue Réalisations V2 — données via GET /api/projects (source Prisma).
 * Aucune fixture sur cette route publique.
 */
export default function ProjetsPage() {
  return (
    <PublicChromeShell pathname="/portfolio/projets" mainId="pv2-projets-main" mainTestId="pv2-projets-main">
      <Suspense fallback={<LocalizedBusy kind="projects" />}>
        <ProjectsCatalog />
      </Suspense>
    </PublicChromeShell>
  )
}
