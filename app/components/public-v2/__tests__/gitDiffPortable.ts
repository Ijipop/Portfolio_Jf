import { execFileSync } from 'node:child_process'

const gitOpts = { encoding: 'utf8' as const, cwd: process.cwd() }

/**
 * Portable git helpers for CI (no shell → paths with parentheses are safe).
 * Errors from git propagate so Vitest fails on missing revisions.
 */
export function gitDiffNameOnly(revision: string, paths: string[]): string[] {
  const out = execFileSync('git', ['diff', '--name-only', revision, '--', ...paths], gitOpts)
  return out
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((f) => f.replace(/\\/g, '/'))
}

export function gitDiff(revision: string, paths: string[]): string {
  return execFileSync('git', ['diff', revision, '--', ...paths], gitOpts)
}
