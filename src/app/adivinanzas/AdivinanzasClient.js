'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import Ball from '@/components/Ball';

export default function AdivinanzasClient({ items }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);

  if (!items.length) {
    return <div className="p-10 text-center">Sin adivinanzas aún.</div>;
  }

  const a = items[i];
  const next = () => {
    setI((i + 1) % items.length);
    setShow(false);
  };
  const prev = () => {
    setI((i - 1 + items.length) % items.length);
    setShow(false);
  };

  return (
    <div className="fade-in max-w-3xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <HelpCircle className="text-gold-light" size={28} />
        <h1 className="font-display text-4xl text-gold-light font-bold">Adivinanzas</h1>
      </div>
      <p className="text-cream/70 mb-8">
        Tradición oral cubana con su respuesta y número asociado en la charada.
      </p>

      <div className="card p-8 md:p-12 text-center grain relative">
        <div className="ornament mb-6">◆  ◆  ◆</div>
        <p className="font-display italic text-2xl md:text-3xl text-cream leading-relaxed">
          "{a.pregunta}"
        </p>

        <div className="mt-8">
          {!show ? (
            <button
              onClick={() => setShow(true)}
              className="px-5 py-2.5 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition"
            >
              Revelar respuesta
            </button>
          ) : (
            <div className="fade-in">
              <div className="text-xs uppercase tracking-widest text-cream/50">Respuesta</div>
              <div className="font-display text-3xl text-gold-light font-bold mt-2">
                {a.respuesta}
              </div>
              <div className="flex justify-center gap-2 mt-5 flex-wrap">
                {(a.numeros || []).map((n) => (
                  <Ball key={n} n={n} size="sm" />
                ))}
              </div>
              {a.categoria && (
                <div className="text-xs text-cream/40 mt-4 capitalize">
                  Categoría: {a.categoria}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="ornament mt-6">◆  ◆  ◆</div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prev}
          className="px-4 py-2 rounded-md border border-cream/10 text-cream/70 hover:bg-cream/5 transition"
        >
          ← Anterior
        </button>
        <span className="text-cream/50 text-sm">
          {i + 1} / {items.length}
        </span>
        <button
          onClick={next}
          className="px-4 py-2 rounded-md border border-cream/10 text-cream/70 hover:bg-cream/5 transition"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
