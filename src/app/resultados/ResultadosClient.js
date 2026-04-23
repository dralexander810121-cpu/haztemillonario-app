'use client';

import { useState } from 'react';
import { Calendar, Lock } from 'lucide-react';
import Ball from '@/components/Ball';

export default function ResultadosClient({ juegos, sorteos }) {
  const [sel, setSel] = useState(juegos[0]?.id || 'powerball');
  const juego = juegos.find((g) => g.id === sel);
  const lista = sorteos[sel] || [];

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display text-4xl text-gold-light font-bold">
        Resultados de la Texas Lottery
      </h1>
      <p className="text-cream/70 mt-2">
        Datos oficiales de texaslottery.com, actualizados cada día.
      </p>

      <div className="flex flex-wrap gap-2 mt-8">
        {juegos.map((g) => (
          <button
            key={g.id}
            onClick={() => setSel(g.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
              sel === g.id
                ? 'bg-gold text-ink border-gold'
                : 'border-cream/10 text-cream/70 hover:border-gold/40'
            }`}
          >
            {g.nombre}
          </button>
        ))}
      </div>

      {juego && (
        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: juego.color_hex }} />
              <span className="text-xs uppercase tracking-wider text-cream/60">
                Próximo sorteo
              </span>
            </div>
            <div className="font-display text-3xl text-cream font-bold">{juego.nombre}</div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-cream/50">
                Cómo se juega
              </div>
              <div className="text-cream/80 mt-2 text-sm leading-relaxed">
                {juego.descripcion}
              </div>
            </div>
            <div className="mt-4 text-sm text-cream/60">Días: {juego.dias_sorteo}</div>
            <div className="mt-1 text-sm text-cream/60">
              Probabilidad: {juego.probabilidad_jackpot}
            </div>
            <div className="mt-1 text-sm text-cream/60">
              Boleto: ${Number(juego.precio_boleto).toFixed(2)}
            </div>
          </div>

          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-gold-light" />
              <h2 className="font-display text-xl text-cream font-bold">Sorteos recientes</h2>
            </div>

            {lista.length === 0 ? (
              <div className="text-cream/50 text-sm py-4">
                Aún no hay sorteos cargados para este juego. Corre la ingesta de datos primero.
              </div>
            ) : (
              <div className="space-y-4">
                {lista.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-cream/5 last:border-0 flex-wrap gap-2"
                  >
                    <span className="text-cream/60 text-sm font-medium w-24">
                      {new Date(r.fecha).toLocaleDateString('es-US', {
                        day: '2-digit',
                        month: 'short',
                        year: '2-digit',
                      })}
                      {['morning', 'day', 'evening'].includes(r.hora_sorteo) && (
                        <span className="block text-[10px] uppercase text-cream/40">
                          {r.hora_sorteo}
                        </span>
                      )}
                    </span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {(r.numeros || []).map((n, j) => (
                        <Ball key={j} n={n} size="sm" />
                      ))}
                      {r.numero_extra != null && (
                        <>
                          <span className="text-cream/30 self-center">+</span>
                          <Ball n={r.numero_extra} variant="red" size="sm" />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-cream/5 flex items-center gap-2 text-xs text-cream/50">
              <Lock size={12} /> Con Premium accedes al histórico completo desde el primer sorteo.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
