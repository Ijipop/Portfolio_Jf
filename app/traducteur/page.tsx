import { getTraducteurDownloads } from '@/lib/product-project-downloads'
import TraducteurLandingClient from './TraducteurLandingClient'

export const dynamic = 'force-dynamic'

export default async function TraducteurPage() {
  const downloads = await getTraducteurDownloads()
  return <TraducteurLandingClient downloads={downloads} />
}
