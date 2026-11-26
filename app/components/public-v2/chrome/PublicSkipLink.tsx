'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getPublicV2ChromeCopy, type PublicV2Locale } from '@/lib/public-v2/nav'

export type PublicSkipLinkProps = {
  mainId: string
}

export default function PublicSkipLink({ mainId }: PublicSkipLinkProps) {
  const { locale } = useLanguage()
  const copy = getPublicV2ChromeCopy(locale as PublicV2Locale)

  return (
    <a className="pv2-skip" href={`#${mainId}`}>
      {copy.skipToContent}
    </a>
  )
}
