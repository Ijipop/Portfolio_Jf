import {
  SEO_LANDING_PATH,
  seoLandingContent,
} from '@/content/creation-site-web-montreal.fr'

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ijipop.com'
).replace(/\/$/, '')

const landingUrl = `${siteUrl}${SEO_LANDING_PATH}`

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
          name: seoLandingContent.h1,
          item: landingUrl,
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${landingUrl}#service`,
      name: seoLandingContent.h1,
      url: landingUrl,
      description: seoLandingContent.intro,
      provider: { '@id': `${siteUrl}/#service` },
      areaServed: [
        { '@type': 'City', name: 'Montréal' },
        { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
      ],
      serviceType: 'Création de site web',
    },
    {
      '@type': 'FAQPage',
      '@id': `${landingUrl}#faq`,
      mainEntity: seoLandingContent.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
}

export default function CreationSiteWebMontrealJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
