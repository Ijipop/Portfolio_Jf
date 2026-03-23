'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'
import './promo-business-card.css'

const p = (key: string) => `promo.businessCard.${key}`

export default function PromoBusinessCardPage() {
  const { t, locale, setLocale } = useLanguage()

  return (
    <div className="promo-card-page">
      <div className="card">
        <div className="lang-row">
          <button type="button" className={locale === 'fr' ? 'active' : ''} onClick={() => setLocale('fr')}>FR</button>
          <button type="button" className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')}>EN</button>
        </div>
        <div>
          <div className="logo-line">
            <Image src="/img/favicon.svg" alt="EvePics" width={14} height={14} />
            <span>EvePics.eu</span>
          </div>
          <p className="tagline">{t(p('tagline'))}</p>
          <p className="qr-hint">{t(p('qrHint'))}</p>
        </div>
        <div className="bottom-row">
          <div className="url-block">
            <span className="url-main">evepics.eu</span>
            <span className="url-sub">{t(p('urlSub'))}</span>
          </div>
          <div className="right-info">
            support@evepics.eu<br />
            Luxembourg · EU
            <div className="pill">
              <span className="dot" />
              {t(p('noApp'))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <Link href="/portfolio/contact" style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}>
            {t('home.contactMe')}
          </Link>
        </div>
      </div>
    </div>
  )
}
