import type { MetadataRoute } from 'next'

const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ijipop.com').replace(
  /\/$/,
  ''
)

/** Routes utiles à l’indexation publique (hors admin, API, démos noindex). */
const paths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] =
  [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/portfolio', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/portfolio/projets', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/portfolio/contact', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/portfolio/a-propos', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/portfolio/pageweb', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/logiciel', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/logiciel/timelendr', priority: 0.7, changeFrequency: 'monthly' },
  ]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return paths.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
