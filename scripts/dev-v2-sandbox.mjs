/**
 * Démarre `next dev` avec une DATABASE_URL forcée vers localhost injoignable.
 * Les variables déjà présentes dans le shell priment sur .env* (comportement Next.js) :
 * même si .env.local pointe vers un hôte cloud, ce process n’utilise pas cette URL.
 *
 * Aucune lecture/écriture des fichiers .env existants.
 * Usage : node scripts/dev-v2-sandbox.mjs
 *
 * Sécurité :
 * - DATABASE_URL est toujours l’URL inerte 127.0.0.1:59999.
 * - IJIPOP_V2_SANDBOX_DATABASE_URL, si défini, doit être exactement cette URL inerte ;
 *   toute autre valeur (hôte distant, autre port) fait échouer le démarrage.
 * - Les autres variables de connexion éventuelles sont retirées du process enfant.
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Port TCP volontairement fermé — toute tentative Prisma échoue localement. */
const INERT_DATABASE_URL =
  'postgresql://ijipop_sandbox:ijipop_sandbox@127.0.0.1:59999/ijipop_sandbox_no_connect'

const DB_ENV_KEYS_TO_STRIP = [
  'DATABASE_URL',
  'DIRECT_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'POSTGRES_URL_NON_POOLING',
  'PRISMA_DATABASE_URL',
  'SHADOW_DATABASE_URL',
]

function assertSandboxDatabaseOverride() {
  const override = process.env.IJIPOP_V2_SANDBOX_DATABASE_URL
  if (override == null || override === '') {
    return
  }
  if (override !== INERT_DATABASE_URL) {
    console.error(
      '[dev-v2-sandbox] REFUS : IJIPOP_V2_SANDBOX_DATABASE_URL ne correspond pas à l’URL inerte autorisée (127.0.0.1:59999).',
    )
    console.error(
      '[dev-v2-sandbox] Aucune connexion distante n’est autorisée dans cette session sandbox.',
    )
    process.exit(1)
  }
}

assertSandboxDatabaseOverride()

const env = { ...process.env }
for (const key of DB_ENV_KEYS_TO_STRIP) {
  delete env[key]
}
env.DATABASE_URL = INERT_DATABASE_URL
env.IJIPOP_V2_SANDBOX_DEV = '1'

console.log('[dev-v2-sandbox] DATABASE_URL forcée vers 127.0.0.1:59999 (inerte)')
console.log('[dev-v2-sandbox] Variables de connexion alternatives retirées du process Next.js')
console.log('[dev-v2-sandbox] URL sandbox : http://127.0.0.1:3000/v2-design-preview')
console.log('[dev-v2-sandbox] Ne pas ouvrir /, /admin ni les API métier dans cette session.')

const child = spawn('npx', ['next', 'dev', '--port', '3000'], {
  cwd: root,
  env,
  stdio: 'inherit',
  shell: true,
})

child.on('exit', (code) => {
  process.exit(code ?? 0)
})
