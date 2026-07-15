export const SUPPORT_LANDING_PATH = '/soutien-informatique-montreal'

export const supportLandingContent = {
  h1: 'Soutien informatique à Montréal et à distance',
  heroEyebrow: 'Aide technique · humaine',
  intro:
    'Un service humain et direct pour régler vos problèmes informatiques rapidement, à domicile, à distance, ou en déplacement sur l’île de Montréal selon le besoin.',
  contactSubject: 'Demande : soutien informatique (Montréal / à distance)',
  ctaPrimary: 'Demander une aide technique',
  ctaSecondary: 'Me contacter rapidement',
  serviceTitle: 'Services de soutien technique',
  serviceLead: 'Trois façons concrètes de vous dépanner — clairement et sans pression.',
  reassuranceTitle: 'Honnêteté d’abord',
  reassurance:
    'Je privilégie les solutions simples, claires et abordables. Si un problème dépasse mon champ d’intervention, je vous le dirai honnêtement avant de vous faire perdre du temps ou de l’argent.',
  travelTitle: 'Montréal & à distance',
  travelNote:
    'Je peux me déplacer sur l’île de Montréal au besoin, et offrir le support à distance partout au Québec.',
  finalTitle: 'Besoin d’un coup de main maintenant ?',
  finalBody:
    'Décrivez votre situation en quelques lignes et je vous propose une approche claire, avec un niveau d’urgence adapté.',
  /** Liste plate conservée pour SEO / références éventuelles. */
  services: [
    'Dépannage Windows et ordinateur lent',
    'Installation ou réinstallation de Windows',
    'Migration vers SSD et clonage de disque',
    'Récupération de données simple',
    'Configuration ordinateur neuf',
    'Courriels, Outlook, Gmail, téléphone',
    'Sécurité de comptes, mots de passe et double authentification',
    'Sauvegardes et protection des fichiers',
    'Support informatique pour travailleurs autonomes et petites entreprises',
  ],
  pillars: [
    {
      id: 'depannage',
      title: 'Dépannage & performance',
      lead: 'Quand l’ordinateur ralentit, plante, ou ne démarre plus correctement.',
      items: [
        'Dépannage Windows et ordinateur lent',
        'Installation ou réinstallation de Windows',
        'Migration vers SSD et clonage de disque',
      ],
    },
    {
      id: 'securite',
      title: 'Comptes, sécurité & sauvegardes',
      lead: 'Protéger ce qui compte : accès, fichiers et tranquillité d’esprit.',
      items: [
        'Sécurité de comptes, mots de passe et double authentification',
        'Sauvegardes et protection des fichiers',
        'Récupération de données simple',
      ],
    },
    {
      id: 'mise-en-place',
      title: 'Mise en place & accompagnement',
      lead: 'Démarrer du bon pied — ou garder votre outil de travail fiable au quotidien.',
      items: [
        'Configuration ordinateur neuf',
        'Courriels, Outlook, Gmail, téléphone',
        'Support informatique pour travailleurs autonomes et petites entreprises',
      ],
    },
  ],
} as const
