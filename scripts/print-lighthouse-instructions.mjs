/**
 * Rappel des commandes Lighthouse (à lancer avec le site déjà servi, ex. npm run dev).
 * Sortie console uniquement — pas de dépendance lighthouse dans le repo.
 */
const base = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000'
const pages = ['/', '/portfolio', '/portfolio/contact']

console.log('\n--- Lighthouse (manuel) ---')
console.log('1. Démarrez le site : npm run dev')
console.log('2. Dans un autre terminal, installez lighthouse à la volée si besoin : npx lighthouse@12 --help')
console.log('')
for (const path of pages) {
  const url = `${base.replace(/\/$/, '')}${path === '/' ? '' : path}`
  const slug = path === '/' ? 'home' : path.replace(/\//g, '_').replace(/^_/, '') || 'home'
  console.log(`Desktop  ${url}`)
  console.log(
    `  npx --yes lighthouse@12 "${url}" --only-categories=performance --preset=desktop --output=html --output-path=lighthouse-${slug}-desktop.html`
  )
  console.log(`Mobile   ${url}`)
  console.log(
    `  npx --yes lighthouse@12 "${url}" --only-categories=performance --preset=mobile --output=html --output-path=lighthouse-${slug}-mobile.html`
  )
  console.log('')
}
console.log('Ou : Chrome → onglet Lighthouse sur chaque URL (souvent le plus simple).\n')
