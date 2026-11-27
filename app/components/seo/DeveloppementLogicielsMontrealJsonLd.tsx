import { SOFTWARE_LANDING_PATH } from '@/lib/public-v2/softwareEditorialContent'

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ijipop.com'
).replace(/\/$/, '')

const landingUrl = `${siteUrl}${SOFTWARE_LANDING_PATH}`

const h1 = 'Développement de logiciels à Montréal'
const intro =
  'Applications sur mesure, automatisation et outils de travail — développement logiciel à Montréal et partout au Québec.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${landingUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: h1,
          item: landingUrl,
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${landingUrl}#service`,
      name: h1,
      url: landingUrl,
      description: intro,
      provider: { '@id': `${siteUrl}/#service` },
      areaServed: [
        { '@type': 'City', name: 'Montréal' },
        { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
      ],
      serviceType: 'Développement de logiciels',
    },
  ],
}

export default function DeveloppementLogicielsMontrealJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
