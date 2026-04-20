import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logiciel et application sur mesure',
  description:
    'Développement d’applications web et de petits logiciels sur mesure pour PME et indépendants — automatisation, productivité, intégrations.',
  openGraph: {
    title: 'Logiciel sur mesure | Jean-François Lefebvre',
    description:
      'Applications et outils logiciels web adaptés à votre activité : besoins précis, code clair, évolutif.',
    url: '/logiciel',
  },
}

export default function LogicielLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
