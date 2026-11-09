import type { ReactNode } from 'react'
import AdminProviders from '@/admin/components/AdminProviders'
import { getCachedBeigePresentationBgUrl } from '@/lib/cached-site-appearance'

/**
 * Shell administratif isolé du chrome marketing public (topology, FAB, thème vitrine).
 * L’auth JWT reste dans dashboard/layout.tsx.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const initialBeigePresentationBgUrl = await getCachedBeigePresentationBgUrl()

  return (
    <AdminProviders initialBeigePresentationBgUrl={initialBeigePresentationBgUrl}>
      {children}
    </AdminProviders>
  )
}
