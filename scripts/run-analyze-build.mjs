/**
 * Build Next avec ANALYZE=true (ouvre les rapports @next/bundle-analyzer dans le navigateur).
 */
import { spawnSync } from 'child_process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const r = spawnSync('npx', ['next', 'build', '--webpack'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, ANALYZE: 'true' },
})

process.exit(r.status ?? 1)
