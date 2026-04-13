import { Prisma } from '@prisma/client'

/** Message exploitable quand create/update Project échoue (souvent colonne webAudience absente). */
export function messageForProjectSaveError(error: unknown, fallback: string): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2022') {
      return 'Base de données désynchronisée : exécutez « npx prisma db push » (colonne manquante, ex. webAudience).'
    }
  }
  if (error instanceof Error) {
    const m = error.message
    if (/webAudience|Unknown column|does not exist|Unknown arg/i.test(m)) {
      return 'Base de données ou client Prisma désynchronisé : exécutez « npx prisma db push » puis « npx prisma generate ».'
    }
  }
  return fallback
}
