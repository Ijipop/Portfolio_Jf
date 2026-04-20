import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Démos vitrines',
  description:
    'Exemples de mises en page et d’ambiances pour sites vitrine — styles variés.',
  robots: { index: false, follow: false },
}

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return children
}
