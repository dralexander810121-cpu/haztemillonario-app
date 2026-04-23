'use client';

import { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import Ball from '@/components/Ball';

export default function GeneradorClient({ juegos, charada }) {
  const [modo, setModo] = useState('aleatorio');
  const [fecha, setFecha] = useState('');
  const [sueno, setSueno] = useState('');
  const [juegoId, setJuegoId] = useState(juegos[0]?.id || 'powerball');
  const [combo, setCombo] = useState(null);

  const juego = juegos.find((j) => j.id === juegoId);

  const generar = () => {
    if (!juego) return;
    const rango = juego.rango_principal;
    const cant = juego.numeros_principales;

    const nums = new Set();

    if (modo === 'sueno' && sueno.trim()) {
      const s = sueno.toLowerCase();
      charada.forEach((c) => {
        if ((c.palabras_clave || []).some((k) => s.includes(k))) {
          nums.add(c.numero > rango ? (c.numero % rango) + 1 : c.numero);
        }
      });
    } else if (modo === 'fecha' && fecha) {
      const d = new Date(fecha);
      if (!isNaN(d)) {
        const dia = d.getDate();
        const mes = d.getMonth() + 1;
        const year = d.getFullYear();
        if (dia <= rango) nums.add(dia);
        if (mes <= rango) nums.add(mes);
        const y1 = parseInt(String(year).slice(0, 2));
        const y2 = parseInt(String(year).slice(2, 4));
        if (y1 <= rango && y1 > 0) nums.add(y1);
        if (y2 <= rango && y2 > 0) nums.add(y2);
      }
    }

    while (nums.size < cant) {
      nums.add(Math.floor(Math.random() * rango) + 1);
    }

    const arr = [...nums].slice(0, cant).sort((a, b) => a - b);
    const extra =
      juego.numeros_extra > 0
        ? Math.floor(Math.random() * juego.rango_extra) + 1
        : null;
    setCombo({ nums: arr, extra });
  };

  return (
    <div className="fade-in max-w-4xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <Sparkles className="text-gold-light" size={28} />
        <h1 className="font-display text-4xl text-gold-light font-bold">
          Generador de combinaciones
        </h1>
      </div>
      <p className="text-cream/70 max-w-2xl">
        Elige cómo quieres construir tu jugada. Recuerda: los números no aumentan tu probabilidad
        de ganar, pero el modo "poco jugados" mejora tu premio esperado si llegas a ganar.
      </p>

      <div className="mt-8 card p-6">
        <div>
          <label className="text-xs uppercase tracking-widest text-cream/50">Juego</label>
          <select
            value={juegoId}
            onChange={(e) => setJuegoId(e.target.value)}
            className="mt-2 w-full bg-ink-lighter border border-cream/10 rounded-md px-3 py-2 text-cream"
          >
            {juegos.map((j) => (
              <option key={j.id} value={j.id}>
                {j.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 'aleatorio', t: 'Aleatorio' },
            { id: 'sueno', t: 'Según tu sueño' },
            { id: 'fecha', t: 'Según fecha' },
            { id: 'poco', t: 'Poco jugados' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setModo(m.id)}
              className={`py-3 px-3 rounded-md text-sm font-medium border transition ${
                modo === m.id
                  ? 'bg-gold text-ink border-gold'
                  : 'border-cream/10 text-cream/70 hover:border-gold/40'
              }`}
            >
              {m.t}
            </button>
          ))}
        </div>

        {modo === 'sueno' && (
          <div className="mt-5">
            <label className="text-xs uppercase tracking-widest text-cream/50">
              Cuéntame tu sueño
            </label>
            <input
              value={sueno}
              onChange={(e) => setSueno(e.target.value)}
              placeholder="Soñé con un caballo y una luna…"
              className="mt-2 w-full bg-ink-lighter border border-cream/10 rounded-md px-3 py-2 text-cream"
            />
          </div>
        )}

        {modo === 'fecha' && (
          <div className="mt-5">
            <label className="text-xs uppercase tracking-widest text-cream/50">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-2 w-full bg-ink-lighter border border-cream/10 rounded-md px-3 py-2 text-cream"
            />
          </div>
        )}

        {modo === 'poco' && (
          <div className="mt-5 text-xs text-cream/70 bg-ink-lighter/50 rounded-md p-3 border border-cream/10">
            <strong className="text-gold-light">Por qué tiene sentido:</strong> la gente juega
            mucho cumpleaños, fechas y patrones. Si juegas números que casi nadie juega y ganas,
            compartes el premio con menos gente. Probabilidad de ganar igual, valor esperado mayor.
          </div>
        )}

        <button
          onClick={generar}
          className="mt-6 w-full py-3 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition flex items-center justify-center gap-2"
        >
          <Zap size={16} /> Generar combinación
        </button>
      </div>

      {combo && (
        <div className="mt-8 card p-8 text-center fade-in">
          <div className="text-xs uppercase tracking-widest text-cream/50">Tu combinación</div>
          <div className="flex flex-wrap gap-3 justify-center mt-5">
            {combo.nums.map((n) => (
              <Ball key={n} n={n} />
            ))}
            {combo.extra != null && (
              <>
                <span className="text-cream/40 self-center">+</span>
                <Ball n={combo.extra} variant="red" />
              </>
            )}
          </div>
          <div className="text-xs text-cream/40 mt-5 italic max-w-md mx-auto">
            Juega con responsabilidad. La lotería es entretenimiento, no un plan financiero.
          </div>
        </div>
      )}
    </div>
  );
}
