const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ijipop.com'
).replace(/\/$/, '')

const logoUrl = `${siteUrl}/icon.png`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Jean-François Lefebvre — Ijipop',
      description:
        'Sites web clairs et crédibles pour PME du Québec — orientés demandes clients. Basé à Montréal, mandats partout au Québec. Outils simples et IA utile au besoin.',
      inLanguage: 'fr-CA',
      publisher: { '@id': `${siteUrl}/#service` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'Ijipop',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: logoUrl },
      description:
        'Sites web clairs et crédibles pour PME du Québec — prêts à recevoir des demandes. Montréal et partout au Québec. Petits outils et IA utile au besoin.',
      areaServed: [
        { '@type': 'City', name: 'Montréal' },
        { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
      ],
      knowsAbout: [
        'création de site web',
        'création de site web Montréal',
        'refonte de site',
        'site vitrine',
        'portfolio professionnel',
        'développement web',
        'SEO local',
        'application sur mesure',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Jean-François Lefebvre',
      url: siteUrl,
      jobTitle: 'Développeur web et logiciels',
      worksFor: { '@id': `${siteUrl}/#service` },
    },
  ],
}

/**
 * Données structurées (schema.org) pour les moteurs sans effet visuel sur la page.
 */
export default function SeoJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  )
}
