import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Hacete Premium — Hazte Millonario',
  description:
    'Planes Premium y Premium Plus: acceso total a charada, adivinanzas, interpretador de sueños, análisis histórico y más.',
};

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
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-12">
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
              <span className="font-display text-5xl text-gold-light font-black">{pl.p}</span>
              <span className="text-cream/60 text-sm">{pl.sub}</span>
            </div>
            <button
              disabled={pl.alt}
              className={`w-full mt-5 py-2.5 rounded-md font-bold transition text-sm ${
                pl.alt
                  ? 'bg-cream/10 text-cream/40 cursor-default'
                  : pl.destacado
                  ? 'bg-gold text-ink hover:bg-gold-light'
                  : 'bg-cream text-ink hover:bg-white'
              }`}
            >
              {pl.cta}
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
        Plan anual: Premium $39.99/año (ahorras ~33%) · Premium Plus $79.99/año. Cancela cuando
        quieras.
      </div>

      <div className="text-center mt-6 text-xs text-cream/40 italic max-w-lg mx-auto">
        Plataforma cultural y de entretenimiento. Los sorteos son eventos independientes;
        ningún análisis puede predecir resultados.
      </div>
    </div>
  );
}
