export const SEO_LANDING_PATH = '/creation-site-web-montreal'

export const seoLandingContent = {
  h1: 'Création de sites web à Montréal et partout au Québec',
  intro:
    'Basé à Montréal, j’accompagne les PME, travailleurs autonomes et professionnels du Québec pour des sites clairs, crédibles et orientés demandes clients — création ou refonte, avec outils simples ou IA utile au besoin.',
  contactSubject: 'Demande : création de site web (Montréal / Québec)',
  ctaPrimary: 'Obtenir une estimation',
  ctaSecondary: 'Voir mes réalisations au Québec',
  ctaFinalTitle: 'Prêt à lancer votre site web ?',
  ctaFinalBody:
    'À Montréal, en région ou à distance au Québec : parlons de votre site actuel ou de votre prochaine présence en ligne — devis clair, sans tunnel de surprises.',
  ctaFinalContact: 'Obtenir une estimation',
  ctaFinalProjects: 'Voir le portfolio',
  faqKicker: 'Questions fréquentes',
  faqTitle: 'Création de site web à Montréal et au Québec',
  offers: [
    {
      title: 'Création de sites vitrines',
      description:
        'Sites clairs et crédibles pour présenter votre activité et recevoir des demandes sérieuses — pensés pour vos clients et pour Google local.',
    },
    {
      title: 'Refonte de site existant',
      description:
        'Pas besoin de tout refaire : on améliore ce qui fonctionne, on clarifie le message et on corrige ce qui bloque vos demandes clients.',
    },
    {
      title: 'Portfolio professionnel',
      description:
        'Mise en valeur de vos réalisations, études de cas ou projets créatifs avec une navigation simple et une image crédible.',
    },
    {
      title: 'Site pour travailleurs autonomes',
      description:
        'Présence en ligne adaptée aux indépendants : offre lisible, formulaire de contact, prise de rendez-vous ou demande de soumission.',
    },
    {
      title: 'Développeur web à Montréal',
      description:
        'Suivi personnalisé — basé à Montréal, mandats partout au Québec et à distance.',
    },
    {
      title: 'SEO de base',
      description:
        'Titres, descriptions, structure des pages, performance et bonnes pratiques pour aider Google à comprendre votre activité locale.',
    },
    {
      title: 'Maintenance et mises à jour',
      description:
        'Petites corrections, ajouts de contenu, mises à jour techniques — pour garder un site fiable après la mise en ligne.',
    },
  ],
  faq: [
    {
      question: 'Combien coûte la création d’un site web à Montréal ?',
      answer:
        'Un site vitrine professionnel démarre à partir de 1 200 $ selon le nombre de pages, le contenu à produire et les fonctionnalités (formulaire, galerie, blog léger). Un audit express est disponible à 299 $ si vous hésitez entre refonte et création. Je fournis un devis clair après un premier échange — sans engagement.',
    },
    {
      question: 'Est-ce que vous créez des sites pour travailleurs autonomes ?',
      answer:
        'Oui. C’est un cas fréquent : une page d’accueil convaincante, une présentation de l’offre, un portfolio ou des témoignages, et un formulaire de contact simple. L’objectif est une présence crédible sans complexité inutile.',
    },
    {
      question: 'Faites-vous des refontes de sites existants ?',
      answer:
        'Oui. Refonte visuelle, restructuration du contenu, amélioration mobile, performance et SEO technique. On peut aussi reprendre un site WordPress ou migrer vers une stack moderne (React / Next.js) selon vos besoins.',
    },
    {
      question: 'Est-ce que le site sera responsive ?',
      answer:
        'Oui, tous les sites sont conçus mobile-first : lisibles sur téléphone, tablette et ordinateur. C’est essentiel pour vos visiteurs et pour le référencement.',
    },
    {
      question: 'Travaillez-vous avec WordPress, React ou Next.js ?',
      answer:
        'Les trois selon le projet. WordPress convient bien quand vous voulez éditer le contenu vous-même. React et Next.js offrent performance, flexibilité et un site sur mesure — c’est ma stack principale pour les vitrines et portfolios professionnels.',
    },
  ],
} as const

export type SeoLandingFaqItem = (typeof seoLandingContent.faq)[number]
