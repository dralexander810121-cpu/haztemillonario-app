'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home, Ticket, BookOpen, Moon, HelpCircle,
  BarChart3, Sparkles, Crown, Menu, X
} from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/resultados', label: 'Resultados', icon: Ticket },
  { href: '/charada', label: 'Charada', icon: BookOpen },
  { href: '/sonar', label: 'Soñar', icon: Moon },
  { href: '/adivinanzas', label: 'Adivinanzas', icon: HelpCircle },
  { href: '/analisis', label: 'Análisis', icon: BarChart3 },
  { href: '/generador', label: 'Generador', icon: Sparkles },
  { href: '/premium', label: 'Premium', icon: Crown },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-gold/20 bg-ink/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center font-display font-black text-ink text-lg shadow-lg">
            HM
          </div>
          <div className="text-left">
            <div className="font-display font-bold text-cream text-lg leading-none">
              Hazte Millonario
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-gold/70">
              Lotería · Tradición · Análisis
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition ${
                  active
                    ? 'bg-gradient-to-br from-gold/20 to-wine/10 text-gold-light'
                    : 'text-cream/70 hover:text-gold-light hover:bg-gold/5'
                }`}
              >
                <Icon size={15} /> {label}
              </Link>
            );
          })}
        </nav>

        <button
          className="md:hidden text-gold-light"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-ink border-t border-gold/20 z-50">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 flex items-center gap-3 ${
                pathname === href ? 'bg-gold/10 text-gold-light' : 'text-cream/70'
              }`}
            >
              <Icon size={17} /> {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
