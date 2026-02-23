import { cookies } from 'next/headers'
import HomeClient from './HomeClient'

const INTRO_COOKIE_KEY = 'portfolio-intro-seen'

export default async function HomePage() {
  const cookieStore = await cookies()
  const introSeen = cookieStore.get(INTRO_COOKIE_KEY)
  const initialShowIntro = !introSeen

  return <HomeClient initialShowIntro={initialShowIntro} />
}
