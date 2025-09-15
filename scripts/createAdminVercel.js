const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('🔍 Vérification de la connexion...');
    
    // Test de connexion
    await prisma.$connect();
    console.log('✅ Connexion réussie');
    
    // Vérifier si l'admin existe
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (existingAdmin) {
      console.log('✅ Utilisateur admin existe déjà:', existingAdmin.email);
      return;
    }

    // Créer l'admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrateur',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    console.log('✅ Utilisateur admin créé avec succès:');
    console.log('Email:', adminUser.email);
    console.log('Mot de passe: [configuré via ADMIN_PASSWORD]');
    console.log('ID:', adminUser.id);
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
