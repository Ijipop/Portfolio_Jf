/**
 * Projet dont le nom contient « quiz » (insensible à la casse) :
 * - image    → /imgs/projets/quiz.png
 * - zip      → /downloads/projets/quiz.zip (bouton Télécharger sur la page Projets / onglet Logiciel)
 * - type     → logiciel
 *
 * Usage : node scripts/setQuizProjectAssets.js
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const IMAGE_URL = '/imgs/projets/quiz.png';
const DOWNLOAD_URL = '/downloads/projets/quiz.zip';

async function main() {
  const all = await prisma.project.findMany();
  const targets = all.filter((p) => p.name.toLowerCase().includes('quiz'));

  if (targets.length === 0) {
    console.error(
      'Aucun projet trouvé avec « quiz » dans le nom. Ajoutez le projet dans l’admin puis relancez ce script.'
    );
    process.exitCode = 1;
    return;
  }

  for (const p of targets) {
    await prisma.project.update({
      where: { id: p.id },
      data: {
        imageUrl: IMAGE_URL,
        downloadUrl: DOWNLOAD_URL,
        projectType: 'logiciel',
      },
    });
    console.log(
      `OK — id ${p.id} « ${p.name} » → image ${IMAGE_URL}, téléchargement ${DOWNLOAD_URL}, type logiciel`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
