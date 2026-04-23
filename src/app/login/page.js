// src/app/login/page.js
// Formulario de inicio de sesión

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const supabase = createClient();

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Correo o contraseña incorrectos');
        setCargando(false);
        return;
      }

      router.push('/cuenta');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setCargando(false);
    }
  };

  return (
    <div className="fade-in max-w-md mx-auto px-4 md:px-8 py-12">
      <div className="text-center mb-8">
        <div className="ornament mb-2">◆ ◆ ◆</div>
        <h1 className="font-display text-3xl text-gold-light font-bold">
          Iniciar sesión
        </h1>
        <p className="text-cream/70 text-sm mt-2">
          Bienvenido de vuelta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className="block text-cream/80 text-sm mb-1.5">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full px-4 py-2.5 rounded-md bg-ink-lighter/60 border border-cream/20 text-cream focus:outline-none focus:border-gold"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-cream/80 text-sm mb-1.5">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-4 py-2.5 rounded-md bg-ink-lighter/60 border border-cream/20 text-cream focus:outline-none focus:border-gold"
            placeholder="Tu contraseña"
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-md p-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="w-full py-2.5 bg-gold text-ink rounded-md font-bold hover:bg-gold-light transition disabled:opacity-50"
        >
          {cargando ? 'Iniciando...' : 'Iniciar sesión'}
        </button>

        <div className="text-center text-sm text-cream/60 pt-2">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-gold-light hover:underline">
            Crear cuenta
          </Link>
        </div>
      </form>
    </div>
  );
}
