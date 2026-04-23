'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';

function FormularioRegistro() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planDestino = searchParams.get('plan');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres');
      return;
    }
    setCargando(true);
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nombre },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (signUpError) {
        setError(signUpError.message);
        setCargando(false);
        return;
      }
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: email,
          nombre,
          plan: 'free',
          es_premium: false,
          trial_started_at: new Date().toISOString(),
        });
      }
      router.push(planDestino ? `/premium?plan=${planDestino}` : '/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta');
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <div>
        <label className="block text-cream/80 text-sm mb-1.5">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-md bg-ink-lighter/60 border border-cream/20 text-cream focus:outline-none focus:border-gold"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label className="block text-cream/80 text-sm mb-1.5">Correo electronico</label>
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
        <label className="block text-cream/80 text-sm mb-1.5">Contrasena</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full px-4 py-2.5 rounded-md bg-ink-lighter/60 border border-cream/20 text-cream focus:outline-none focus:border-gold"
          placeholder="Minimo 6 caracteres"
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
        {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
      <div className="text-center text-sm text-cream/60 pt-2">
        Ya tienes cuenta?{' '}
        <Link href="/login" className="text-gold-light hover:underline">Inicia sesion</Link>
      </div>
    </form>
  );
}

export default function RegistroPage() {
  return (
    <div className="fade-in max-w-md mx-auto px-4 md:px-8 py-12">
      <div className="text-center mb-8">
        <div className="ornament mb-2">◆ ◆ ◆</div>
        <h1 className="font-display text-3xl text-gold-light font-bold">Crear cuenta</h1>
        <p className="text-cream/70 text-sm mt-2">Unete a la comunidad de Hazte Millonario</p>
      </div>
      <Suspense fallback={<div className="text-cream/60 text-center">Cargando...</div>}>
        <FormularioRegistro />
      </Suspense>
      <p className="text-xs text-cream/40 text-center mt-6">
        Al registrarte aceptas nuestros{' '}
        <Link href="/terminos" className="underline">terminos</Link>{' '}y{' '}
        <Link href="/privacidad" className="underline">politica de privacidad</Link>.
      </p>
    </div>
  );
}
