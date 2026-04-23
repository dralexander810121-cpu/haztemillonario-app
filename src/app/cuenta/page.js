// src/app/cuenta/page.js
// Panel "Mi cuenta" — muestra info del usuario y permite cerrar sesión

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';

export default function CuentaPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setUsuario(user);

      // Cargar perfil
      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setPerfil(prof);
      setCargando(false);
    };
    cargar();
  }, [router]);

  const cerrarSesion = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (cargando) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 text-center text-cream/60">
        Cargando...
      </div>
    );
  }

  const plan = perfil?.plan || 'free';
  const esPremium = perfil?.es_premium || false;
  const premiumHasta = perfil?.premium_hasta
    ? new Date(perfil.premium_hasta).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  return (
    <div className="fade-in max-w-2xl mx-auto px-4 md:px-8 py-10">
      <div className="text-center mb-8">
        <div className="ornament mb-2">◆ ◆ ◆</div>
        <h1 className="font-display text-3xl text-gold-light font-bold">
          Mi cuenta
        </h1>
      </div>

      <div className="card p-6 space-y-5">
        <div>
          <div className="text-cream/50 text-xs uppercase tracking-wider">Nombre</div>
          <div className="text-cream font-medium mt-0.5">
            {perfil?.nombre || 'Sin nombre'}
          </div>
        </div>

        <div>
          <div className="text-cream/50 text-xs uppercase tracking-wider">Correo</div>
          <div className="text-cream font-medium mt-0.5">{usuario?.email}</div>
        </div>

        <div>
          <div className="text-cream/50 text-xs uppercase tracking-wider">Plan actual</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
              plan === 'free'
                ? 'bg-cream/10 text-cream/70'
                : plan === 'premium'
                ? 'bg-gold/20 text-gold-light'
                : 'bg-wine/30 text-gold-light'
            }`}>
              {plan === 'free' ? 'Gratis' : plan === 'premium' ? 'Premium' : 'Premium Plus'}
            </span>
            {esPremium && premiumHasta && (
              <span className="text-cream/60 text-xs">
                hasta {premiumHasta}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-6">
        {plan === 'free' ? (
          <Link
            href="/premium"
            className="px-6 py-2.5 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition"
          >
            Hazte Premium
          </Link>
        ) : (
          <Link
            href="/premium"
            className="px-6 py-2.5 rounded-md border border-gold/40 text-gold-light font-medium hover:bg-gold/10 transition"
          >
            Cambiar plan
          </Link>
        )}
        <button
          onClick={cerrarSesion}
          className="px-6 py-2.5 rounded-md border border-cream/20 text-cream/70 hover:bg-cream/5 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
