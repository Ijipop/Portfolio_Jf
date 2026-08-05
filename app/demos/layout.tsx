import type { Metadata } from 'next'
import { outfit, plusJakarta } from '@/fonts'

export const metadata: Metadata = {
  title: 'Démos vitrines',
  description:
    'Exemples de mises en page et d’ambiances pour sites vitrine — styles variés.',
  robots: { index: false, follow: false },
}

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${outfit.variable} ${plusJakarta.variable}`}>{children}</div>
}
