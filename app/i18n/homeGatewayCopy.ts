/** Copy de la page gateway `/` — source unique FR/EN (évite les misses i18n HMR). */
export const homeGatewayCopy = {
  fr: {
    /** Phrase complète — metadata / SEO éventuel */
    welcome: 'Bienvenue sur ijipop solutions',
    welcomeEyebrow: 'Bienvenue chez',
    brand: 'ijipop',
    brandSuffix: 'solutions',
    prompt: 'Que puis-je faire pour vous ?',
    webTitle: 'Création de site web',
    webDesc: 'Sites vitrine, refonte et mise en ligne pour PME et indépendants.',
    webCta: 'Découvrir',
    supportTitle: 'Soutien technique',
    supportDesc: 'Dépannage, entretien et accompagnement informatique au quotidien.',
    supportCta: 'En savoir plus',
  },
  en: {
    welcome: 'Welcome to ijipop solutions',
    welcomeEyebrow: 'Welcome to',
    brand: 'ijipop',
    brandSuffix: 'solutions',
    prompt: 'How can I help you?',
    webTitle: 'Website creation',
    webDesc: 'Showcase sites, redesigns and launch for SMBs and freelancers.',
    webCta: 'Explore',
    supportTitle: 'Tech support',
    supportDesc: 'Troubleshooting, upkeep and day-to-day IT help.',
    supportCta: 'Learn more',
  },
} as const

export type HomeGatewayCopy = (typeof homeGatewayCopy)['fr']
