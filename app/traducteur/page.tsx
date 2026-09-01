import { PRODUCT_DOWNLOADS } from '@/components/product-landings/productDownloads'
import TraducteurLandingClient from './TraducteurLandingClient'

export default function TraducteurPage() {
  return <TraducteurLandingClient downloads={PRODUCT_DOWNLOADS.traducteur} />
}
