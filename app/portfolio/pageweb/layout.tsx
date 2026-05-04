import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sites web vitrine et refonte',
  description:
    'Création de site vitrine, refonte de site existant et amélioration continue : SEO technique, performance, accessibilité — Québec et télétravail.',
  openGraph: {
    title: 'Création et refonte de sites web | Jean-François Lefebvre',
    description:
      'Sites web pour PME et travailleurs autonomes : présence en ligne claire, rapide et entretenable.',
    url: '/portfolio/pageweb',
  },
}

export default function PortfolioPagewebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
