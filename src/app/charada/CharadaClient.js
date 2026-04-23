'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Ball from '@/components/Ball';

export default function CharadaClient({ items }) {
  const [q, setQ] = useState('');
  const [categoria, setCategoria] = useState('todas');
  const [seleccionado, setSeleccionado] = useState(null);

  const categorias = useMemo(() => {
    const set = new Set();
    items.forEach((c) => c.categoria && set.add(c.categoria));
    return ['todas', ...Array.from(set).sort()];
  }, [items]);

  const filtrados = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((c) => {
      if (categoria !== 'todas' && c.categoria !== categoria) return false;
      if (!s) return true;
      return (
        c.titulo.toLowerCase().includes(s) ||
        String(c.numero) === s ||
        (c.palabras_clave || []).some((k) => k.includes(s))
      );
    });
  }, [items, q, categoria]);

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display text-4xl text-gold-light font-bold">La Charada Cubana</h1>
      <p className="text-cream/70 mt-2 max-w-2xl">
        Los {items.length} números con su significado tradicional. Busca por nombre, sinónimo o número.
      </p>

      <div className="flex flex-col md:flex-row gap-3 mt-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Busca: caballo, muerto, dinero, 38..."
            className="w-full bg-ink-lighter/60 border border-cream/10 focus:border-gold-light rounded-lg pl-12 pr-4 py-3 text-cream outline-none transition"
          />
        </div>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="bg-ink-lighter/60 border border-cream/10 rounded-lg px-4 py-3 text-cream capitalize"
        >
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 text-sm text-cream/50">
        Mostrando {filtrados.length} {filtrados.length === 1 ? 'resultado' : 'resultados'}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
        {filtrados.map((c) => (
          <button
            key={c.numero}
            onClick={() => setSeleccionado(c)}
            className="card p-4 text-left hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <Ball n={c.numero} size="sm" />
              <div className="font-display text-cream font-bold leading-tight text-sm">
                {c.titulo}
              </div>
            </div>
            {c.significado_corto && (
              <div className="text-xs text-cream/50 line-clamp-2 mt-1">
                {c.significado_corto}
              </div>
            )}
          </button>
        ))}
        {filtrados.length === 0 && (
          <div className="col-span-full text-center text-cream/40 py-12">
            Sin resultados. Pruebe otra palabra.
          </div>
        )}
      </div>

      {/* Modal detalle */}
      {seleccionado && (
        <div
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setSeleccionado(null)}
        >
          <div
            className="card max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSeleccionado(null)}
              className="absolute top-4 right-4 text-cream/50 hover:text-cream text-2xl"
            >
              ×
            </button>
            <div className="flex items-center gap-4 mb-5">
              <Ball n={seleccionado.numero} size="lg" />
              <div>
                <div className="font-display text-3xl font-bold text-cream">
                  {seleccionado.titulo}
                </div>
                {seleccionado.categoria && (
                  <div className="text-xs uppercase tracking-widest text-gold-light/70 mt-1">
                    {seleccionado.categoria}
                  </div>
                )}
              </div>
            </div>

            {seleccionado.significado_corto && (
              <p className="text-cream/80 mt-4 italic">
                "{seleccionado.significado_corto}"
              </p>
            )}

            {seleccionado.significado_sueno && (
              <div className="mt-6 pt-5 border-t border-cream/10">
                <div className="text-xs uppercase tracking-widest text-gold-light mb-2">
                  Si lo sueñas
                </div>
                <p className="text-cream/70 leading-relaxed">
                  {seleccionado.significado_sueno}
                </p>
              </div>
            )}

            {seleccionado.palabras_clave?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {seleccionado.palabras_clave.slice(0, 6).map((k) => (
                  <span
                    key={k}
                    className="text-xs bg-cream/5 text-cream/60 px-2 py-0.5 rounded"
                  >
                    {k}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
