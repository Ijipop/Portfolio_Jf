import { getDeskDotDownloads } from '@/lib/product-project-downloads'
import DeskDotLandingClient from './DeskDotLandingClient'

export const dynamic = 'force-dynamic'

export default async function DeskDotPage() {
  const downloads = await getDeskDotDownloads()
  return <DeskDotLandingClient downloads={downloads} />
}
