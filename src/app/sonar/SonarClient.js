'use client';

import { useState } from 'react';
import { Moon, Sparkles } from 'lucide-react';
import Ball from '@/components/Ball';

export default function SonarClient({ charada }) {
  const [dream, setDream] = useState('');
  const [result, setResult] = useState(null);

  const interpretar = () => {
    const s = dream.toLowerCase();
    if (!s.trim()) return;
    const hits = [];
    const seen = new Set();
    for (const c of charada) {
      for (const k of c.palabras_clave || []) {
        if (s.includes(k) && !seen.has(c.numero)) {
          hits.push(c);
          seen.add(c.numero);
          break;
        }
      }
    }
    setResult(hits.length ? hits : []);
  };

  const limpiar = () => {
    setDream('');
    setResult(null);
  };

  return (
    <div className="fade-in max-w-4xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <Moon className="text-gold-light" size={28} />
        <h1 className="font-display text-4xl text-gold-light font-bold">
          Interpretador de sueños
        </h1>
      </div>
      <p className="text-cream/70 max-w-2xl">
        Cuenta tu sueño con tus propias palabras. Vamos a rastrear los símbolos y devolverte
        los números de la charada asociados según la tradición.
      </p>

      <textarea
        value={dream}
        onChange={(e) => setDream(e.target.value)}
        placeholder="Soñé que un caballo blanco entraba a mi casa, y detrás venía mi abuelo con una moneda de oro..."
        rows={5}
        className="w-full mt-6 bg-ink-lighter/60 border border-cream/10 focus:border-gold-light rounded-lg px-4 py-3 text-cream outline-none transition resize-none"
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={interpretar}
          disabled={!dream.trim()}
          className="px-5 py-2.5 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Interpretar
        </button>
        <button
          onClick={limpiar}
          className="px-5 py-2.5 rounded-md border border-cream/10 text-cream/70 hover:bg-cream/5 transition"
        >
          Limpiar
        </button>
      </div>

      {result !== null && result.length > 0 && (
        <div className="mt-10 card p-6 fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-gold-light" size={18} />
            <h2 className="font-display text-xl text-cream font-bold">Tu lectura</h2>
          </div>
          <p className="text-cream/60 text-sm mb-5">
            Los símbolos de tu sueño se cruzan con estos números de la charada:
          </p>
          <div className="space-y-4">
            {result.map((r) => (
              <div key={r.numero} className="flex items-start gap-4 py-2">
                <Ball n={r.numero} />
                <div className="flex-1">
                  <div className="font-display text-lg text-cream">{r.titulo}</div>
                  {r.significado_sueno && (
                    <div className="text-sm text-cream/60 mt-1 leading-relaxed">
                      {r.significado_sueno}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-cream/10 flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-widest text-cream/50">
              Combinación sugerida
            </span>
            <div className="flex gap-1 ml-2">
              {result.slice(0, 5).map((r) => (
                <Ball key={r.numero} n={r.numero} size="sm" />
              ))}
            </div>
          </div>
          <p className="text-xs text-cream/40 mt-4 italic">
            Esta es una interpretación tradicional. Los números de la lotería son aleatorios e independientes.
          </p>
        </div>
      )}

      {result !== null && result.length === 0 && (
        <div className="mt-8 text-cream/50 italic">
          No encontré símbolos claros en tu sueño. Prueba describir imágenes concretas:
          animales, objetos, personas.
        </div>
      )}
    </div>
  );
}
