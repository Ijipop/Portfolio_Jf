import { DEMOS_HUB_LINK_LABEL } from '../demoLabels'

export const BRAND = 'VOLT'
export const CITY = 'Mile-End · Montréal'

export const NAV_LINKS = [
  { href: '#drops', label: 'Drops' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#manifeste', label: 'Manifeste' },
  { href: '#visite', label: 'Visite' },
] as const

export const HERO = {
  kicker: 'Streetwear · édition limitée',
  title: 'Trop loud\npour le silence.',
  lead: 'Boutique Mile-End. Pièces rares, drops brutaux, énergie qui claque. Pas de demi-mesure — juste du voltage.',
  ctaPrimary: 'Voir le drop',
  ctaSecondary: DEMOS_HUB_LINK_LABEL,
} as const

export const MARQUEE = [
  'DROP 09',
  'ACID LIME',
  'MILE-END',
  'SOLD OUT?',
  'VOLT',
  'NO SLEEP',
  'MONTRÉAL',
  'OVERSIZE',
] as const

export const UNDER_STRIPS = [
  {
    id: 'strip-a',
    label: '01 — Runway ruelle',
    caption: 'Le bitume est notre podium.',
    tone: 'a',
    src: '/demos/volt/volt-look-01.jpg',
  },
  {
    id: 'strip-b',
    label: '02 — Voltage textile',
    caption: 'Coupe oversized. Attitude max.',
    tone: 'b',
    src: '/demos/volt/volt-look-02.jpg',
  },
  {
    id: 'strip-c',
    label: '03 — Nuit électrique',
    caption: 'Néon, grain, zéro filtre soft.',
    tone: 'c',
    src: '/demos/volt/volt-look-03.jpg',
  },
] as const

export const LOOKBOOK = [
  {
    id: 'look-01',
    src: '/demos/volt/volt-look-01.jpg',
    title: 'Bomber Ruelle',
    meta: 'FW26 · édition 40',
  },
  {
    id: 'look-02',
    src: '/demos/volt/volt-look-02.jpg',
    title: 'Sneaker Charge',
    meta: 'Acid lime · magenta lace',
  },
  {
    id: 'look-03',
    src: '/demos/volt/volt-look-03.jpg',
    title: 'Still Volt',
    meta: 'Moodboard atelier',
  },
] as const

export const DROPS = [
  {
    id: 'd1',
    tag: 'Live',
    name: 'Hoodie Static',
    price: '180 $',
    note: 'Fleece 480g · print sérigraphié',
  },
  {
    id: 'd2',
    tag: 'Hot',
    name: 'Cargo Arc',
    price: '220 $',
    note: 'Nylon ripstop · zip latéral',
  },
  {
    id: 'd3',
    tag: 'New',
    name: 'Tee Pulse',
    price: '65 $',
    note: 'Coton lourd · coupe boxy',
  },
  {
    id: 'd4',
    tag: 'Soon',
    name: 'Cap Neon',
    price: '55 $',
    note: '6 panels · logo brodé',
  },
] as const

export const MANIFESTO = {
  eyebrow: 'Manifeste',
  lines: [
    'On ne fait pas joli.',
    'On fait du bruit.',
    'Du vrai. Du dense.',
    'Du Montréal qui pulse.',
  ],
  body: 'VOLT, c’est une boutique qui assume : pièces limitées, lookbook cinéma, et une scène pour les gens qui s’habillent comme ils vivent — fort.',
} as const

export const VISIT = {
  title: 'Passe à l’atelier.',
  address: '5243 boul. Saint-Laurent · Mile-End',
  hours: 'Jeu–Sam 12h–20h · Dim 13h–18h',
  cta: 'Réserver un fitting',
  email: 'hello@volt.demo',
} as const

export const FOOTER = {
  copyright: '© VOLT — démo vitrine Ijipop',
  backLabel: DEMOS_HUB_LINK_LABEL,
} as const
