import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation des champs
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Vérification de la présence du JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET non configuré');
      return NextResponse.json(
        { message: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // Recherche de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérification du mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Génération du token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Retour des informations utilisateur (sans le mot de passe)
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    return NextResponse.json({
      message: 'Connexion réussie',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
