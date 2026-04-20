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
        'Création et refonte de sites web pour PME et indépendants au Québec, applications et outils sur mesure — Montréal et mandats à distance.',
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
        'Sites web vitrine, refonte et mise à jour, développement logiciel et petits outils pour travailleurs autonomes et petites entreprises.',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Québec, Canada',
      },
      knowsAbout: [
        'création de site web',
        'refonte de site',
        'site vitrine',
        'développement web',
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
