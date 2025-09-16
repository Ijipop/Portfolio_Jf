'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers le dashboard
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Redirection vers le dashboard...</h2>
        <p>Si vous n'êtes pas redirigé automatiquement, <a href="/admin/dashboard">cliquez ici</a></p>
      </div>
    </div>
  );
}
