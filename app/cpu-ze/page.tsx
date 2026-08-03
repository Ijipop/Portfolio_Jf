import { getCpuZeDownloads } from '@/lib/product-project-downloads'
import CpuZeLandingClient from './CpuZeLandingClient'

export const dynamic = 'force-dynamic'

export default async function CpuZePage() {
  const downloads = await getCpuZeDownloads()
  return <CpuZeLandingClient downloads={downloads} />
}
