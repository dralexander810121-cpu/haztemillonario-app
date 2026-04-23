'use client';

import { BarChart3, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

export default function AnalisisClient({ totalSorteos, frecuencias, sorteosAnalizados }) {
  const max = Math.max(...frecuencias.map((f) => f.veces), 1);

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="text-gold-light" size={28} />
        <h1 className="font-display text-4xl text-gold-light font-bold">Panel analítico</h1>
      </div>
      <p className="text-cream/70 max-w-2xl">
        Visualiza el comportamiento histórico de los sorteos.{' '}
        <span className="text-gold-light/80">Los sorteos son eventos independientes</span>
        {' '}— este panel es para entretenimiento y análisis de tendencias, no tiene valor predictivo.
      </p>

      <div className="grid lg:grid-cols-3 gap-5 mt-8">
        {[
          { t: 'Sorteos en base de datos', v: totalSorteos.toLocaleString('es-US'), s: 'todos los juegos' },
          { t: 'Sorteos analizados', v: sorteosAnalizados.toLocaleString('es-US'), s: 'últimos Lotto Texas' },
          { t: 'Última actualización', v: 'Hoy', s: 'datos oficiales' },
        ].map((k) => (
          <div key={k.t} className="card p-5">
            <div className="text-xs uppercase tracking-widest text-cream/50">{k.t}</div>
            <div className="font-display text-3xl text-gold-light font-bold mt-2">{k.v}</div>
            <div className="text-cream/50 text-xs mt-1">{k.s}</div>
          </div>
        ))}
      </div>

      <div className="card p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-gold-light" size={18} />
          <h2 className="font-display text-xl text-cream font-bold">
            Frecuencia por número — Lotto Texas (últimos 500 sorteos)
          </h2>
        </div>
        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={frecuencias}>
              <CartesianGrid stroke="#333" strokeDasharray="3 3" />
              <XAxis dataKey="num" stroke="#888" style={{ fontSize: 11 }} />
              <YAxis stroke="#888" style={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#1a1511', border: '1px solid #d4a449' }}
                labelStyle={{ color: '#f4e8d0' }}
              />
              <Bar dataKey="veces" radius={[4, 4, 0, 0]}>
                {frecuencias.map((d, i) => {
                  const ratio = d.veces / max;
                  const color =
                    ratio > 0.85 ? '#c73e3a' : ratio > 0.6 ? '#d4a449' : '#2d8a5f';
                  return <Cell key={i} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-cream/60">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: '#c73e3a' }} /> Calientes
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: '#d4a449' }} /> Medios
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ background: '#2d8a5f' }} /> Fríos
          </span>
        </div>
        <p className="text-xs text-cream/40 italic mt-4">
          Recuerda: la frecuencia histórica no predice el próximo sorteo. Cada extracción es un
          evento independiente.
        </p>
      </div>
    </div>
  );
}
