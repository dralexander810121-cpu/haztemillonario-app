'use client';

import { useState } from 'react';
import Link from 'next/link';

const RASPADITOS = [
  {
    precio: '$1',
    color: 'from-blue-900/60 to-blue-950',
    borde: 'border-blue-500/30',
    emoji: '🎟️',
    nombre: 'Lucky Lines',
    premio: 'Hasta $500',
    probabilidad: '1 en 4.50',
    descripcion: 'Raspa y encuentra 3 simbolos iguales para ganar. El ticket mas popular para comenzar.',
    comoJugar: 'Raspa las 9 casillas. Si 3 simbolos en linea coinciden, ganas el premio indicado.',
    premios: [
      { premio: '$500', probabilidad: '1 en 150,000' },
      { premio: '$100', probabilidad: '1 en 25,000' },
      { premio: '$50',  probabilidad: '1 en 5,000' },
      { premio: '$20',  probabilidad: '1 en 500' },
      { premio: '$5',   probabilidad: '1 en 50' },
      { premio: '$2',   probabilidad: '1 en 10' },
      { premio: '$1',   probabilidad: '1 en 5' },
    ],
    href: 'https://www.txlottery.org/export/sites/lottery/Games/Scratch_Offs/',
  },
  {
    precio: '$2',
    color: 'from-green-900/60 to-green-950',
    borde: 'border-green-500/30',
    emoji: '🍀',
    nombre: 'Gold Rush',
    premio: 'Hasta $2,500',
    probabilidad: '1 en 4.20',
    descripcion: 'Clasico ticket de $2 con multiples formas de ganar y buen retorno por dolar.',
    comoJugar: 'Raspa el area de juego. Encuentra tu numero de la suerte entre los numeros ganadores.',
    premios: [
      { premio: '$2,500', probabilidad: '1 en 300,000' },
      { premio: '$500',   probabilidad: '1 en 50,000' },
      { premio: '$100',   probabilidad: '1 en 8,000' },
      { premio: '$50',    probabilidad: '1 en 1,000' },
      { premio: '$20',    probabilidad: '1 en 100' },
      { premio: '$5',     probabilidad: '1 en 20' },
      { premio: '$2',     probabilidad: '1 en 8' },
    ],
    href: 'https://www.txlottery.org/export/sites/lottery/Games/Scratch_Offs/',
  },
  {
    precio: '$5',
    color: 'from-yellow-900/60 to-yellow-950',
    borde: 'border-yellow-500/30',
    emoji: '⭐',
    nombre: 'Texas Riches',
    premio: 'Hasta $50,000',
    probabilidad: '1 en 3.99',
    descripcion: 'El favorito de Texas. Multiples juegos en un solo ticket con premios que cambian la vida.',
    comoJugar: 'Tres juegos en uno. Raspa cada seccion por separado. Cualquier seccion puede hacerte ganar.',
    premios: [
      { premio: '$50,000', probabilidad: '1 en 500,000' },
      { premio: '$5,000',  probabilidad: '1 en 75,000' },
      { premio: '$500',    probabilidad: '1 en 10,000' },
      { premio: '$100',    probabilidad: '1 en 2,000' },
      { premio: '$50',     probabilidad: '1 en 300' },
      { premio: '$20',     probabilidad: '1 en 50' },
      { premio: '$5',      probabilidad: '1 en 10' },
    ],
    href: 'https://www.txlottery.org/export/sites/lottery/Games/Scratch_Offs/',
  },
  {
    precio: '$10',
    color: 'from-orange-900/60 to-orange-950',
    borde: 'border-orange-500/30',
    emoji: '🔥',
    nombre: 'Mega Cash',
    premio: 'Hasta $100,000',
    probabilidad: '1 en 3.75',
    descripcion: 'Para los jugadores serios. Mayor inversion, mayores premios y mas formas de ganar.',
    comoJugar: 'Raspa todos los numeros. Si alguno coincide con los numeros ganadores, ganas el premio.',
    premios: [
      { premio: '$100,000', probabilidad: '1 en 750,000' },
      { premio: '$10,000',  probabilidad: '1 en 100,000' },
      { premio: '$1,000',   probabilidad: '1 en 15,000' },
      { premio: '$500',     probabilidad: '1 en 3,000' },
      { premio: '$100',     probabilidad: '1 en 500' },
      { premio: '$50',      probabilidad: '1 en 100' },
      { premio: '$10',      probabilidad: '1 en 15' },
    ],
    href: 'https://www.txlottery.org/export/sites/lottery/Games/Scratch_Offs/',
  },
  {
    precio: '$20',
    color: 'from-red-900/60 to-red-950',
    borde: 'border-red-500/30',
    emoji: '💎',
    nombre: 'Diamond 7s',
    premio: 'Hasta $500,000',
    probabilidad: '1 en 3.50',
    descripcion: 'El lujo en raspaditos. Medio millon de dolares esperando al ganador afortunado.',
    comoJugar: 'Raspa los 7s dorados. Encuentra tres 7s iguales para el premio maximo.',
    premios: [
      { premio: '$500,000', probabilidad: '1 en 1,500,000' },
      { premio: '$50,000',  probabilidad: '1 en 200,000' },
      { premio: '$5,000',   probabilidad: '1 en 25,000' },
      { premio: '$1,000',   probabilidad: '1 en 5,000' },
      { premio: '$500',     probabilidad: '1 en 1,000' },
      { premio: '$100',     probabilidad: '1 en 200' },
      { premio: '$20',      probabilidad: '1 en 20' },
    ],
    href: 'https://www.txlottery.org/export/sites/lottery/Games/Scratch_Offs/',
  },
  {
    precio: '$50',
    color: 'from-purple-900/60 to-purple-950',
    borde: 'border-purple-500/30',
    emoji: '👑',
    nombre: 'Millionaire',
    premio: 'Hasta $1,000,000',
    probabilidad: '1 en 3.25',
    descripcion: 'Un millon de dolares. El sueno americano en un ticket de $50.',
    comoJugar: 'Ticket premium con 5 juegos independientes. Cada juego puede ganar por separado.',
    premios: [
      { premio: '$1,000,000', probabilidad: '1 en 3,000,000' },
      { premio: '$100,000',   probabilidad: '1 en 400,000' },
      { premio: '$10,000',    probabilidad: '1 en 50,000' },
      { premio: '$5,000',     probabilidad: '1 en 10,000' },
      { premio: '$1,000',     probabilidad: '1 en 2,000' },
      { premio: '$500',       probabilidad: '1 en 400' },
      { premio: '$50',        probabilidad: '1 en 25' },
    ],
    href: 'https://www.txlottery.org/export/sites/lottery/Games/Scratch_Offs/',
  },
  {
    precio: '$100',
    color: 'from-yellow-800/40 to-yellow-950',
    borde: 'border-yellow-400/40',
    emoji: '🏆',
    nombre: 'Ultimate Gold',
    premio: 'Hasta $5,000,000',
    probabilidad: '1 en 2.99',
    descripcion: 'El rey de los raspaditos. Cinco millones de dolares y las mejores probabilidades.',
    comoJugar: 'El ticket definitivo. 10 juegos en uno. Multiples simbolos multiplicadores.',
    premios: [
      { premio: '$5,000,000', probabilidad: '1 en 10,000,000' },
      { premio: '$1,000,000', probabilidad: '1 en 1,500,000' },
      { premio: '$100,000',   probabilidad: '1 en 200,000' },
      { premio: '$10,000',    probabilidad: '1 en 25,000' },
      { premio: '$5,000',     probabilidad: '1 en 5,000' },
      { premio: '$1,000',     probabilidad: '1 en 1,000' },
      { premio: '$100',       probabilidad: '1 en 50' },
    ],
    href: 'https://www.txlottery.org/export/sites/lottery/Games/Scratch_Offs/',
  },
];

export default function RaspaditosPage() {
  const [seleccionado, setSeleccionado] = useState(null);

  return (
    <div className="fade-in max-w-6xl mx-auto px-4 md:px-8 py-10">

      <div className="text-center mb-12">
        <div className="ornament mb-3 text-gold/60">◆ ◆ ◆</div>
        <h1 className="font-display text-5xl text-gold-light font-black">Raspaditos Super Loteria</h1>
        <p className="text-cream/60 mt-3 text-lg">Tickets disponibles en Texas · Premios · Probabilidades · Como jugar</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {RASPADITOS.map((r) => (
          <div
            key={r.precio}
            onClick={() => setSeleccionado(seleccionado?.precio === r.precio ? null : r)}
            className={`rounded-xl p-5 bg-gradient-to-br ${r.color} border ${r.borde} cursor-pointer transition hover:scale-105 ${seleccionado?.precio === r.precio ? 'ring-2 ring-gold scale-105' : ''}`}
          >
            <div className="text-3xl mb-2">{r.emoji}</div>
            <div className="font-display text-2xl text-white font-black">{r.precio}</div>
            <div className="text-white/80 text-sm font-bold mt-1">{r.nombre}</div>
            <div className="text-white/50 text-xs mt-2">{r.premio}</div>
            <div className="text-white/40 text-xs mt-1">Prob: {r.probabilidad}</div>
            <div className="mt-3 text-xs text-white/60 border-t border-white/10 pt-2">
              {seleccionado?.precio === r.precio ? 'Cerrar' : 'Ver detalles'}
            </div>
          </div>
        ))}
      </div>

      {seleccionado && (
        <div className="mt-8 card p-8 bg-gradient-to-br from-gold/10 to-ink border-gold/30">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{seleccionado.emoji}</span>
                <div>
                  <div className="font-display text-3xl text-gold-light font-black">{seleccionado.nombre}</div>
                  <div className="text-cream/60 text-sm">{seleccionado.precio} · {seleccionado.premio}</div>
                </div>
              </div>
              <p className="text-cream/80 leading-relaxed">{seleccionado.descripcion}</p>
              <div className="mt-5 p-4 rounded-lg bg-cream/5 border border-cream/10">
                <div className="text-gold-light font-bold text-sm mb-2">Como jugar</div>
                <p className="text-cream/70 text-sm leading-relaxed">{seleccionado.comoJugar}</p>
              </div>
              <div className="mt-4 flex gap-3">
                
                  href={seleccionado.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition text-sm"
                >
                  Comprar en txlottery.org
                </a>
                <button
                  onClick={() => setSeleccionado(null)}
                  className="px-5 py-2.5 rounded-md border border-cream/20 text-cream/70 hover:bg-cream/5 transition text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-gold-light font-bold text-sm mb-3">Tabla de premios</div>
              <div className="space-y-2">
                {seleccionado.premios.map((p, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-cream/10">
                    <span className="text-cream font-bold">{p.premio}</span>
                    <span className="text-cream/50 text-xs">{p.probabilidad}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-cream/5 border border-cream/10">
                <div className="text-xs text-cream/50">
                  Probabilidad general: <strong className="text-cream/70">{seleccionado.probabilidad}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        <p className="text-cream/40 text-xs">
          Informacion de referencia actualizada desde txlottery.org. Solo para mayores de 18 anos.
        </p>
        <Link href="/dashboard" className="inline-block mt-4 text-gold-light/60 hover:text-gold-light text-sm underline transition">
          Volver al dashboard
        </Link>
      </div>

    </div>
  );
}
