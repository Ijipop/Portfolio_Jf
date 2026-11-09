import { Suspense } from 'react'
import { PublicChromeShell } from '@/components/public-v2/chrome'
import { ProjectsCatalog } from '@/components/public-v2/projects'
import { PROJECTS_COPY } from '@/lib/public-v2/projectsContent'

/**
 * Catalogue Réalisations V2 — données via GET /api/projects (source Prisma).
 * Aucune fixture sur cette route publique.
 */
export default function ProjetsPage() {
  return (
    <PublicChromeShell pathname="/portfolio/projets" mainId="pv2-projets-main" mainTestId="pv2-projets-main">
      <Suspense fallback={<p aria-busy="true">{PROJECTS_COPY.loading}</p>}>
        <ProjectsCatalog />
      </Suspense>
    </PublicChromeShell>
  )
}
