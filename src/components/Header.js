// src/components/Header.js
// Header de la app con navegación principal y menú de usuario.
// Muestra "Iniciar sesión" si no está logueado, o "Mi cuenta" si lo está.

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { User, LogIn } from 'lucide-react';

const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/resultados', label: 'Resultados' },
  { href: '/charada', label: 'Charada' },
  { href: '/sonar', label: 'Soñar' },
  { href: '/adivinanzas', label: 'Adivinanzas' },
  { href: '/analisis', label: 'Análisis' },
  { href: '/generador', label: 'Generador' },
  { href: '/premium', label: 'Premium' },
];

export default function Header() {
  const pathname = usePathname();
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUsuario(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUsuario(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="border-b border-cream/10 bg-ink/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-wine flex items-center justify-center font-display font-black text-ink text-sm">
            HM
          </div>
          <div className="leading-tight">
            <div className="font-display text-cream font-bold text-lg">Hazte Millonario</div>
            <div className="text-[10px] text-cream/50 uppercase tracking-widest">
              Lotería · Tradición · Análisis
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-1.5 text-sm rounded-md transition ${
                pathname === n.href
                  ? 'text-gold-light bg-gold/10'
                  : 'text-cream/70 hover:text-cream hover:bg-cream/5'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {usuario ? (
            <Link
              href="/cuenta"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gold/40 text-gold-light text-sm hover:bg-gold/10 transition"
            >
              <User size={14} />
              <span className="hidden sm:inline">Mi cuenta</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-cream/20 text-cream text-sm hover:bg-cream/5 transition"
            >
              <LogIn size={14} />
              <span className="hidden sm:inline">Iniciar sesión</span>
            </Link>
          )}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="lg:hidden p-2 text-cream"
            aria-label="Menú"
          >
            ☰
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="lg:hidden border-t border-cream/10 bg-ink-lighter/90">
          <nav className="flex flex-col p-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenuAbierto(false)}
                className={`px-3 py-2 text-sm rounded-md ${
                  pathname === n.href ? 'text-gold-light bg-gold/10' : 'text-cream/70'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
