const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    console.log('🔍 Recherche de l\'utilisateur admin...\n');
    
    // Récupérer tous les admins
    const admins = await prisma.user.findMany({
      where: { role: 'admin' }
    });

    if (admins.length === 0) {
      console.log('❌ Aucun utilisateur admin trouvé.');
      console.log('💡 Création d\'un nouvel admin...\n');
      
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      const adminUser = await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Administrateur',
          role: 'admin',
        }
      });

      console.log('✅ Nouvel admin créé avec succès!\n');
      console.log('📧 Email:', adminUser.email);
      console.log('🔑 Mot de passe:', adminPassword);
      console.log('🆔 ID:', adminUser.id);
      return;
    }

    // Si admin existe, proposer de réinitialiser le mot de passe
    const admin = admins[0];
    console.log(`✅ Admin trouvé: ${admin.email}\n`);
    
    // Nouveau mot de passe
    const newPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: admin.id },
      data: { password: hashedPassword }
    });

    console.log('✅ Mot de passe réinitialisé avec succès!\n');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Nouveau mot de passe:', newPassword);
    console.log('\n💡 Vous pouvez maintenant vous connecter avec ces identifiants.');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Assurez-vous que:');
    console.log('   1. Votre fichier .env contient DATABASE_URL');
    console.log('   2. La base de données est accessible');
    console.log('   3. Vous avez exécuté: npx prisma generate');
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();

