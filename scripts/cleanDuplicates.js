const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanDuplicates() {
  try {
    console.log('🧹 Nettoyage des doublons...');
    
    // Récupérer tous les projets
    const allProjects = await prisma.project.findMany();
    console.log(`�� Total des projets: ${allProjects.length}`);
    
    // Grouper par nom
    const projectsByName = {};
    allProjects.forEach(project => {
      if (!projectsByName[project.name]) {
        projectsByName[project.name] = [];
      }
      projectsByName[project.name].push(project);
    });
    
    // Supprimer les doublons (garder le premier, supprimer les autres)
    for (const [name, projects] of Object.entries(projectsByName)) {
      if (projects.length > 1) {
        console.log(`🔄 ${name}: ${projects.length} doublons trouvés`);
        
        // Garder le premier, supprimer les autres
        const toDelete = projects.slice(1);
        for (const project of toDelete) {
          await prisma.project.delete({
            where: { id: project.id }
          });
          console.log(`🗑️  Supprimé: ${project.name} (ID: ${project.id})`);
        }
      }
    }
    
    console.log('✅ Nettoyage terminé!');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanDuplicates();
