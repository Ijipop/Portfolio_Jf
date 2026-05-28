export const SEO_LANDING_PATH = '/creation-site-web-montreal'

export const seoLandingContent = {
  h1: 'Création de sites web à Montréal et partout au Québec',
  intro:
    'Basé à Montréal, ijipop accompagne les travailleurs autonomes, petites entreprises et professionnels partout au Québec pour créer des sites web modernes, clairs et adaptés à leurs besoins.',
  contactSubject: 'Demande : création de site web (Montréal / Québec)',
  ctaPrimary: 'Demander un devis pour mon site web',
  ctaSecondary: 'Voir mes réalisations au Québec',
  ctaFinalTitle: 'Prêt à lancer votre site web ?',
  ctaFinalBody:
    'Que vous soyez à Montréal, en région ou en télétravail au Québec, discutons de votre projet — premier appel offert, devis sous 48 h.',
  ctaFinalContact: 'Demander un devis site web',
  ctaFinalProjects: 'Voir le portfolio',
  faqKicker: 'Questions fréquentes',
  faqTitle: 'Création de site web à Montréal et au Québec',
  offers: [
    {
      title: 'Création de sites vitrines',
      description:
        'Sites clairs pour présenter votre activité, vos services et un moyen simple de vous contacter — pensés pour les visiteurs et les moteurs de recherche.',
    },
    {
      title: 'Refonte de site existant',
      description:
        'Modernisation du design, amélioration de la vitesse, mise à jour du contenu et correction des points qui freinent vos conversions.',
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
        'Accompagnement direct avec un interlocuteur unique — basé à Montréal, mandats partout au Québec et à distance.',
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
        'Un site vitrine professionnel démarre à partir de 1 200 $ selon le nombre de pages, le contenu à produire et les fonctionnalités (formulaire, galerie, blog léger). Un audit express est disponible à 450 $ si vous hésitez entre refonte et création. Je fournis un devis clair après un premier échange — sans engagement.',
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
