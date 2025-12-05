// Script pour créer un admin avec un email spécifique
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminWithEmail() {
  try {
    // Email et mot de passe depuis les arguments ou .env
    const email = process.argv[2] || process.env.ADMIN_EMAIL || 'jfthebeanz@hotmail.com';
    const password = process.argv[3] || process.env.ADMIN_PASSWORD || 'admin123';
    
    console.log('🔍 Vérification si l\'utilisateur existe déjà...\n');
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });
    
    if (existingUser) {
      console.log(`⚠️  L'utilisateur ${email} existe déjà.`);
      console.log('💡 Réinitialisation du mot de passe...\n');
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { 
          password: hashedPassword,
          role: 'admin' // S'assurer qu'il est admin
        }
      });
      
      console.log('✅ Mot de passe réinitialisé avec succès!\n');
      console.log('📧 Email:', email);
      console.log('🔑 Mot de passe:', password);
      console.log('🆔 ID:', existingUser.id);
    } else {
      console.log('💡 Création d\'un nouvel admin...\n');
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminUser = await prisma.user.create({
        data: {
          email: email.toLowerCase().trim(),
          password: hashedPassword,
          name: 'Administrateur',
          role: 'admin',
        }
      });
      
      console.log('✅ Nouvel admin créé avec succès!\n');
      console.log('📧 Email:', adminUser.email);
      console.log('🔑 Mot de passe:', password);
      console.log('🆔 ID:', adminUser.id);
    }
    
    console.log('\n💡 Vous pouvez maintenant vous connecter avec ces identifiants.');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminWithEmail();

