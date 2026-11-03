import Link from 'next/link'
import { PUBLIC_V2_BRAND, getPublicV2BrandHomeHref } from '@/lib/public-v2/nav'
import styles from './BrandLockup.module.css'

export type BrandLockupProps = {
  pathname: string
  className?: string
}

export default function BrandLockup({ pathname, className }: BrandLockupProps) {
  const href = getPublicV2BrandHomeHref(pathname)
  const cls = [styles.root, className].filter(Boolean).join(' ')

  return (
    <Link className={cls} href={href}>
      <span className={styles.name}>{PUBLIC_V2_BRAND.name}</span>
      <span className={styles.mark}>{PUBLIC_V2_BRAND.mark}</span>
    </Link>
  )
}
