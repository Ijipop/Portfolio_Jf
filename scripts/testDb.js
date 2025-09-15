const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('🔍 Test de connexion à la base de données...');
    
    // Test 1: Connexion
    await prisma.$connect();
    console.log('✅ Connexion réussie');
    
    // Test 2: Compter les projets existants
    const projectCount = await prisma.project.count();
    console.log(`📊 Nombre de projets existants: ${projectCount}`);
    
    // Test 3: Lister les projets
    const projects = await prisma.project.findMany();
    console.log('📋 Projets existants:');
    projects.forEach(project => {
      console.log(`  - ${project.name} (${project.status})`);
    });
    
    // Test 4: Compter les utilisateurs
    const userCount = await prisma.user.count();
    console.log(`�� Nombre d'utilisateurs: ${userCount}`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error('Détails:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
