import { cookies } from 'next/headers'
import HomeClient from '../HomeClient'

const INTRO_COOKIE_KEY = 'portfolio-intro-seen'

export default async function PortfolioHomePage() {
  const cookieStore = await cookies()
  const introSeen = cookieStore.get(INTRO_COOKIE_KEY)
  // Intro (rideau avec le nom) désactivée pour l'instant — remettre `!introSeen` pour réactiver
  const initialShowIntro = false

  return <HomeClient initialShowIntro={initialShowIntro} />
}
