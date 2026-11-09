import { Container } from '@/components/public-v2/primitives'
import {
  PUBLIC_V2_BRAND,
  getPublicV2Cta,
  getPublicV2NavItems,
} from '@/lib/public-v2/nav'
import BrandLockup from './BrandLockup'
import styles from './PublicFooter.module.css'

export type PublicFooterProps = {
  pathname: string
}

export default function PublicFooter({ pathname }: PublicFooterProps) {
  const items = getPublicV2NavItems(pathname)
  const cta = getPublicV2Cta(pathname)

  return (
    <footer className={styles.footer}>
      <Container className={styles.grid}>
        <div className={styles.brandBlock}>
          <BrandLockup pathname={pathname} />
          <p className={styles.meta}>
            {PUBLIC_V2_BRAND.name} — {PUBLIC_V2_BRAND.mark}
          </p>
        </div>
        <nav aria-label="Pied de page">
          <ul className={styles.nav}>
            {items.map((item) => (
              <li key={item.id}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={cta.href}>{cta.label}</a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  )
}
