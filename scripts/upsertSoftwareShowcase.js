/**
 * Upsert showcase logiciels: Timelendr, Overstamp, Space Taker.
 * Usage: node scripts/upsertSoftwareShowcase.js
 */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const SHOWCASE = [
  {
    matchNames: ['timelendr', 'timelendar'],
    data: {
      name: 'Timelendr',
      description:
        'Timeline collaborative en temps réel et calendrier classique — planifier, synchroniser et livrer plus clairement.',
      technologies: 'React, TypeScript, Tauri, Vite, Supabase',
      status: 'Terminé',
      projectType: 'logiciel',
      webAudience: null,
      displayOrder: 1,
      url: '/logiciel/timelendr',
      siteUrl: null,
      imageUrl: '/imgs/images/timelendrpro.svg',
    },
  },
  {
    matchNames: ['overstamp', 'overtstamp', 'fanmark', 'fan mark'],
    data: {
      name: 'Overstamp',
      description:
        'Filigrane en lot confidentiel pour créateurs indépendants, browser based, rapide.',
      technologies: 'Browser, Web',
      status: 'Terminé',
      projectType: 'logiciel',
      webAudience: null,
      displayOrder: 2,
      url: 'https://www.overstamp.studio/',
      siteUrl: 'https://www.overstamp.studio/',
      downloadUrl: null,
      imageUrl: '/imgs/images/Overstamp_icon.svg',
    },
  },
  {
    matchNames: ['space taker', 'spacetaker', 'space-taker'],
    data: {
      name: 'Space Taker',
      description:
        'Outil simple et rapide pour voir d’un coup d’œil ce qui prend de la place sur votre disque dur.',
      technologies: 'Desktop, Windows',
      status: 'Terminé',
      projectType: 'logiciel',
      webAudience: null,
      displayOrder: 3,
      url: '',
      siteUrl: null,
      downloadUrl: null,
      imageUrl: '/imgs/images/SpaceTaker_icon.png',
    },
  },
]

function matchesName(name, matchNames) {
  const n = (name || '').toLowerCase()
  return matchNames.some((m) => n.includes(m))
}

async function upsertOne({ matchNames, data }) {
  const existing = await prisma.project.findMany({
    where: { projectType: 'logiciel' },
  })
  const hit = existing.find((p) => matchesName(p.name, matchNames))

  if (hit) {
    const updated = await prisma.project.update({
      where: { id: hit.id },
      data: {
        name: data.name,
        description: data.description,
        technologies: data.technologies,
        status: data.status,
        projectType: data.projectType,
        webAudience: data.webAudience,
        displayOrder: data.displayOrder,
        url: data.url ?? hit.url,
        siteUrl: data.siteUrl ?? hit.siteUrl,
        imageUrl: data.imageUrl,
        ...(Object.prototype.hasOwnProperty.call(data, 'downloadUrl')
          ? { downloadUrl: data.downloadUrl }
          : {}),
      },
    })
    console.log(`Updated: ${updated.name} (#${updated.id})`)
    return updated
  }

  const created = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      technologies: data.technologies,
      status: data.status,
      projectType: data.projectType,
      webAudience: data.webAudience,
      displayOrder: data.displayOrder,
      url: data.url || '',
      siteUrl: data.siteUrl,
      downloadUrl: data.downloadUrl ?? null,
      imageUrl: data.imageUrl,
    },
  })
  console.log(`Created: ${created.name} (#${created.id})`)
  return created
}

async function main() {
  for (const entry of SHOWCASE) {
    await upsertOne(entry)
  }
  console.log('Done.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
