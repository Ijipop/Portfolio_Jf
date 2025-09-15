const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (existingAdmin) {
      console.log('Un utilisateur admin existe déjà.');
      return;
    }

    // Identifiants Vercel
    const adminEmail = 'ijipop82@gmail.com';
    const adminPassword = 'DKQ2xnt5mxb7bwc_yje';

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
    console.log('Mot de passe: DKQ2xnt5mxb7bwc_yje');
    console.log('ID:', adminUser.id);
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
