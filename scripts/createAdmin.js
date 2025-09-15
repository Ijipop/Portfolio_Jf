const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Vérifier si un utilisateur admin existe déjà
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (existingAdmin) {
      console.log('Un utilisateur admin existe déjà.');
      return;
    }

    // Vérifier les variables d'environnement
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error('ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans les variables d\'environnement');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Créer l'utilisateur admin
    const adminUser = await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Administrateur',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    console.log('Utilisateur admin créé avec succès:');
    console.log('Email:', adminUser.email);
    console.log('Nom:', adminUser.name);
    console.log('ID:', adminUser.id);
    console.log('⚠️  Mot de passe configuré via variable d\'environnement');
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
