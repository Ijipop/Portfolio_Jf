import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import HomeClient from '../HomeClient'

const INTRO_COOKIE_KEY = 'portfolio-intro-seen'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Je crée des sites web et des outils sur mesure pour des particuliers et des PME. Découvrez mes projets et contactez-moi pour votre prochain mandat.',
  openGraph: {
    title: 'Portfolio | Jean-François Lefebvre',
    description:
      'Sites web et applications sur mesure pour travailleurs autonomes et petites entreprises — Montréal.',
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
