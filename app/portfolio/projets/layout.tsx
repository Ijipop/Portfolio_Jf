import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projets',
  description:
    'Mes réalisations — sites web et petits outils sur mesure pour indépendants et PME. Filtrez par technologie et consultez les détails de chaque projet.',
  openGraph: {
    title: 'Projets | Jean-François Lefebvre',
    description:
      'Réalisations web et projets personnels : expérimentations, mandats clients et applications.',
    url: '/portfolio/projets',
  },
}

export default function ProjetsLayout({ children }: { children: React.ReactNode }) {
  return children
}
