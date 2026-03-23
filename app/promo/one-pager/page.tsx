'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'
import './promo-one-pager.css'

const p = (key: string) => `promo.onePager.${key}`

export default function PromoOnePagerPage() {
  const { t, locale, setLocale } = useLanguage()

  return (
    <div className="promo-page">
      <div className="lang-bar">
        <button type="button" className={locale === 'fr' ? 'active' : ''} onClick={() => setLocale('fr')}>FR</button>
        <button type="button" className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')}>EN</button>
      </div>

      <div className="page">
        <header className="header">
          <div className="brand">
            <div className="logo-title">
              <Image src="/img/favicon.svg" alt="EvePics" width={18} height={18} />
              <span>EvePics.eu</span>
            </div>
            <p className="subtitle">{t(p('brandSubtitle'))}</p>
            <h1 className="hero-text">{t(p('heroTitle'))}</h1>
            <p className="hero-paragraph">{t(p('heroParagraph'))}</p>
            <div className="highlight-band">{t(p('highlightBand'))}</div>
          </div>
          <aside className="hero-qr">
            <div className="hero-qr-title">{t(p('howItWorks'))}</div>
            <div className="hero-qr-note">{t(p('heroQrNote'))}</div>
          </aside>
        </header>

        <section className="sections">
          <div className="block">
            <h2><span className="icon">?</span>{t(p('howEvepicsWorks'))}</h2>
            <div className="steps">
              <div className="step">
                <div className="step-num" />
                <div className="step-body"><strong>{t(p('step1Title'))}</strong> {t(p('step1Body'))}</div>
              </div>
              <div className="step">
                <div className="step-num" />
                <div className="step-body"><strong>{t(p('step2Title'))}</strong> {t(p('step2Body'))}</div>
              </div>
              <div className="step">
                <div className="step-num" />
                <div className="step-body"><strong>{t(p('step3Title'))}</strong> {t(p('step3Body'))}</div>
              </div>
            </div>
            <h2 style={{ marginTop: '8px' }}><span className="icon">⚙</span>{t(p('optionalPhotoBooth'))}</h2>
            <p>{t(p('autoUploadDesc'))} <span className="mini-tag">{t(p('included'))}</span></p>
            <ul className="list">
              <li>{t(p('autoUploadLi1'))}</li>
              <li>{t(p('autoUploadLi2'))}</li>
              <li>{t(p('autoUploadLi3'))}</li>
              <li>{t(p('autoUploadLi4'))}</li>
            </ul>
          </div>
          <aside className="side-block">
            <div className="block">
              <h2><span className="icon">★</span>{t(p('whyGuestsLove'))}</h2>
              <ul className="list">
                <li>{t(p('whyLi1'))}</li>
                <li>{t(p('whyLi2'))}</li>
                <li>{t(p('whyLi3'))}</li>
                <li>{t(p('whyLi4'))}</li>
              </ul>
              <div className="facts">
                <div><div className="fact-label">{t(p('access'))}</div><div className="fact-value">{t(p('accessValue'))}</div></div>
                <div><div className="fact-label">{t(p('formats'))}</div><div className="fact-value">{t(p('formatsValue'))}</div></div>
                <div><div className="fact-label">{t(p('privacy'))}</div><div className="fact-value">{t(p('privacyValue'))}</div></div>
                <div><div className="fact-label">{t(p('languages'))}</div><div className="fact-value">{t(p('languagesValue'))}</div></div>
              </div>
            </div>
            <div className="block">
              <h2><span className="icon">ℹ</span>{t(p('contactInfo'))}</h2>
              <p>{t(p('contactVisit'))}</p>
              <p style={{ marginTop: '4px' }}>{t(p('contactReach'))}</p>
              <ul className="list">
                <li><strong>{t(p('contactEmail'))}</strong></li>
                <li>{t(p('contactLocation'))}</li>
              </ul>
            </div>
          </aside>
        </section>
        <footer className="footer">
          <div><strong>EvePics.eu</strong> — {t(p('footerTagline'))}</div>
          <div>{t(p('footerContact'))}</div>
          <div style={{ marginTop: '8px' }}>
            <Link href="/portfolio/contact" style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}>
              {t('home.contactMe')}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
