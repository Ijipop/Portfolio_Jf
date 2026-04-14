import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import HomeClient from '../HomeClient'

const INTRO_COOKIE_KEY = 'portfolio-intro-seen'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Ijipop — création de sites web, refonte et mises à jour pour PME et indépendants. Découvrez les réalisations et contactez pour un mandat à Montréal ou en télétravail.',
  openGraph: {
    title: 'Portfolio | Jean-François Lefebvre',
    description:
      'Sites vitrine, refonte de site et maintenance pour petites entreprises — portfolio et prise de contact.',
    url: '/portfolio',
  },
}

export default async function PortfolioHomePage() {
  const cookieStore = await cookies()
  const introSeen = cookieStore.get(INTRO_COOKIE_KEY)
  // Intro (rideau avec le nom) désactivée pour l'instant — remettre `!introSeen` pour réactiver
  const initialShowIntro = false

  return <HomeClient initialShowIntro={initialShowIntro} />
}
