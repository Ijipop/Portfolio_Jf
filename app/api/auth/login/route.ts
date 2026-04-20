import { getClientIp } from '@/lib/rate-limit-ip'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
const WINDOW_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 8
const attemptsByIp = new Map<string, { count: number; firstAttemptAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attemptsByIp.get(ip);
  if (!entry) return true;
  if (now - entry.firstAttemptAt > WINDOW_MS) {
    attemptsByIp.delete(ip);
    return true;
  }
  return entry.count < MAX_ATTEMPTS;
}

function bumpRateLimit(ip: string) {
  const now = Date.now();
  const entry = attemptsByIp.get(ip);
  if (!entry || now - entry.firstAttemptAt > WINDOW_MS) {
    attemptsByIp.set(ip, { count: 1, firstAttemptAt: now });
    return;
  }
  attemptsByIp.set(ip, { ...entry, count: entry.count + 1 });
}

function resetRateLimit(ip: string) {
  attemptsByIp.delete(ip);
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { message: 'Trop de tentatives. Réessayez dans quelques minutes.' },
        { status: 429 }
      );
    }

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
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      console.log(`Tentative de connexion avec email non trouvé: ${email.toLowerCase().trim()}`);
      bumpRateLimit(clientIp);
      return NextResponse.json(
        { message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérification du mot de passe (trim pour éviter les espaces invisibles de l'auto-fill)
    const isValidPassword = await bcrypt.compare(password.trim(), user.password);
    
    if (!isValidPassword) {
      console.log(`Mot de passe incorrect pour l'utilisateur: ${user.email}`);
      bumpRateLimit(clientIp);
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

    resetRateLimit(clientIp);
    const response = NextResponse.json({
      message: 'Connexion réussie',
      token: token,
      user: userResponse
    });
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 60 * 60 * 24,
      path: '/'
    });
    return response;

  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
