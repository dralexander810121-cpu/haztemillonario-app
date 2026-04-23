// src/app/premium/page.js
// Página de planes Premium con botones conectados a Stripe Checkout

'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

const PLANES = [
  {
    t: 'Gratis',
    p: '$0',
    sub: 'siempre',
    cta: 'Estás en este plan',
    alt: true,
    f: [
      'Resultados del día',
      '1 adivinanza diaria',
      '5 consultas de charada al día',
      'Generador aleatorio',
      'Anuncios',
    ],
  },
  {
    t: 'Premium',
    p: '$4.99',
    sub: '/mes',
    cta: 'Probar 7 días gratis',
    destacado: true,
    planId: 'premium_mensual',
    planIdAnual: 'premium_anual',
    precioAnual: '$39.99/año (ahorras ~33%)',
    f: [
      'Todo lo Gratis, sin anuncios',
      'Charada completa sin límite',
      'Interpretador de sueños ilimitado',
      'Adivinanzas ilimitadas',
      'Panel analítico completo',
      'Todos los generadores',
      'Alertas de jackpots',
      'Histórico completo descargable',
    ],
  },
  {
    t: 'Premium Plus',
    p: '$9.99',
    sub: '/mes',
    cta: 'Empezar',
    planId: 'premium_plus_mensual',
    planIdAnual: 'premium_plus_anual',
    precioAnual: '$79.99/año (ahorras ~33%)',
    f: [
      'Todo lo Premium',
      'Reporte semanal personalizado',
      'Contenido exclusivo del Dr. Figueredo',
      'Audio y columnas',
      'Atención prioritaria',
      'Acceso anticipado a nuevas funciones',
    ],
  },
];

export default function PremiumPage() {
  const [cargando, setCargando] = useState(null);
  const [facturacion, setFacturacion] = useState('mensual');

  const comprar = async (plan) => {
    try {
      setCargando(plan.t);

      // Verificamos si el usuario está logueado
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Si no tiene sesión, lo llevamos a registrarse
        alert('Necesitas crear una cuenta primero.');
        window.location.href = '/registro?plan=' + plan.t.toLowerCase().replace(' ', '_');
        return;
      }

      const planId = facturacion === 'anual' ? plan.planIdAnual : plan.planId;

      const resp = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        alert(data.error || 'Error al procesar. Intenta de nuevo.');
        setCargando(null);
        return;
      }

      // Redirige al Checkout de Stripe
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert('Error al procesar la suscripción. Intenta de nuevo.');
      setCargando(null);
    }
  };

  return (
    <div className="fade-in max-w-6xl mx-auto px-4 md:px-8 py-10">
      <div className="text-center">
        <div className="ornament mb-4">◆ ◆ ◆</div>
        <h1 className="font-display text-4xl md:text-5xl text-gold-light font-bold">
          Hazte Premium
        </h1>
        <p className="text-cream/70 max-w-2xl mx-auto mt-3">
          Sin anuncios, acceso total, herramientas sin límite y una comunidad que comparte la
          pasión por la tradición y los números.
        </p>

        {/* Toggle Mensual/Anual */}
        <div className="inline-flex bg-ink-lighter/60 rounded-full p-1 mt-6 border border-cream/10">
          <button
            onClick={() => setFacturacion('mensual')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              facturacion === 'mensual' ? 'bg-gold text-ink' : 'text-cream/70'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setFacturacion('anual')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              facturacion === 'anual' ? 'bg-gold text-ink' : 'text-cream/70'
            }`}
          >
            Anual <span className="text-xs opacity-70">(-33%)</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {PLANES.map((pl) => (
          <div
            key={pl.t}
            className={`rounded-xl p-8 relative ${
              pl.destacado
                ? 'bg-gradient-to-b from-gold/10 to-wine/10 border-2 border-gold glow'
                : 'card'
            }`}
          >
            {pl.destacado && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Más popular
              </div>
            )}
            <div className="font-display text-2xl text-cream font-bold">{pl.t}</div>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="font-display text-5xl text-gold-light font-black">
                {facturacion === 'anual' && pl.precioAnual
                  ? pl.precioAnual.split('/')[0]
                  : pl.p}
              </span>
              <span className="text-cream/60 text-sm">
                {facturacion === 'anual' && pl.precioAnual ? '/año' : pl.sub}
              </span>
            </div>
            {pl.precioAnual && facturacion === 'mensual' && (
              <div className="text-xs text-gold-light/70 mt-1">
                O {pl.precioAnual}
              </div>
            )}
            <button
              disabled={pl.alt || cargando === pl.t}
              onClick={() => !pl.alt && comprar(pl)}
              className={`w-full mt-5 py-2.5 rounded-md font-bold transition text-sm ${
                pl.alt
                  ? 'bg-cream/10 text-cream/40 cursor-default'
                  : pl.destacado
                  ? 'bg-gold text-ink hover:bg-gold-light disabled:opacity-50'
                  : 'bg-cream text-ink hover:bg-white disabled:opacity-50'
              }`}
            >
              {cargando === pl.t ? 'Procesando...' : pl.cta}
            </button>
            <ul className="mt-6 space-y-2.5">
              {pl.f.map((li, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-cream/80">
                  <Check size={15} className="text-gold-light mt-0.5 flex-shrink-0" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 text-xs text-cream/50">
        Cancela cuando quieras. Sin compromisos. Acepta tarjetas de crédito/débito principales.
      </div>

      <div className="text-center mt-6 text-xs text-cream/40 italic max-w-lg mx-auto">
        Plataforma cultural y de entretenimiento. Los sorteos son eventos independientes;
        ningún análisis puede predecir resultados.
      </div>
    </div>
  );
}
