/** Copy de la page gateway `/` — source unique FR/EN (évite les misses i18n HMR). */
export const homeGatewayCopy = {
  fr: {
    /** Phrase complète — metadata / SEO éventuel */
    welcome: 'Bienvenue sur ijipop solutions',
    welcomeEyebrow: 'Bienvenue chez',
    brand: 'ijipop',
    brandSuffix: 'solutions',
    prompt: 'Que puis-je faire pour vous ?',
    benefit:
      'Sites web, soutien technique et logiciels — basé à Montréal.',
    webTitle: 'Sites web',
    webDesc: 'Vitrine claire, mobile et prête à recevoir des demandes — pour PME et indépendants.',
    webCta: 'Voir l’offre web',
    supportTitle: 'Soutien technique',
    supportDesc: 'PC lent, courriels, sécurité — un technicien diplômé, pas un centre d’appel.',
    supportCta: 'Obtenir de l’aide',
    supportCallCta: 'Appeler',
    softwareTitle: 'Logiciels',
    softwareDesc: 'Applications et outils sur mesure — Timelendr, Space Taker, CPU-ZE et plus.',
    softwareCta: 'Voir les logiciels',
    demosHint: 'Voir des exemples de sites',
    proofCaption: 'Site livré — Thermo-Trappeur',
    proofAlt: 'Maquette du site Thermo-Trappeur',
    webBadge: 'Sur mesure',
    alsoSoftware: 'Aussi disponible :',
  },
  en: {
    welcome: 'Welcome to ijipop solutions',
    welcomeEyebrow: 'Welcome to',
    brand: 'ijipop',
    brandSuffix: 'solutions',
    prompt: 'How can I help you?',
    benefit:
      'Websites, tech support and software — based in Montreal.',
    webTitle: 'Websites',
    webDesc: 'A clear, mobile showcase ready for inquiries — for SMBs and freelancers.',
    webCta: 'See the web offer',
    supportTitle: 'Tech support',
    supportDesc: 'Slow PC, email, security — a certified tech, not a call center.',
    supportCta: 'Get help',
    supportCallCta: 'Call',
    softwareTitle: 'Software',
    softwareDesc: 'Custom apps and tools — Timelendr, Space Taker, CPU-ZE and more.',
    softwareCta: 'See the software',
    demosHint: 'Browse sample websites',
    proofCaption: 'Delivered site — Thermo-Trappeur',
    proofAlt: 'Thermo-Trappeur website mockup',
    webBadge: 'Custom',
    alsoSoftware: 'Also available:',
  },
} as const

export type HomeGatewayCopy = (typeof homeGatewayCopy)['fr']
