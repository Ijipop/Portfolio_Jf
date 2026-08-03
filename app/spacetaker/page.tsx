import { getSpaceTakerDownloads } from '@/lib/product-project-downloads'
import SpaceTakerLandingClient from './SpaceTakerLandingClient'

export const dynamic = 'force-dynamic'

export default async function SpaceTakerPage() {
  const downloads = await getSpaceTakerDownloads()
  return <SpaceTakerLandingClient downloads={downloads} />
}
