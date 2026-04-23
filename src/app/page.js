// src/app/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Hazte Millonario — Lotería de Texas, Charada Cubana y Raspaditos',
  description: 'Resultados en tiempo real, Charada Cubana, raspaditos de la Super Lotería y análisis histórico. Regístrate y prueba todo gratis por 1 hora.',
};

const CIUDADES = [
  { nombre: 'Houston', desc: 'La ciudad de los grandes jackpots', img: 'https://images.unsplash.com/photo-1572205096924-35c2e2bfda38?w=600&q=80' },
  { nombre: 'Dallas', desc: 'Donde los sueños se hacen realidad', img: 'https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&q=80' },
  { nombre: 'Austin', desc: 'Capital del entretenimiento texano', img: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=600&q=80' },
  { nombre: 'San Antonio', desc: 'Tradición y suerte en cada jugada', img: 'https://images.unsplash.com/photo-1583172332547-c769395f05db?w=600&q=80' },
];

const RASPADITOS = [
  { precio: '$1', color: 'from-blue-900/60 to-blue-950', borde: 'border-blue-500/30', emoji: '🎟️', nombre: 'Lucky Lines', premio: 'Hasta $500' },
  { precio: '$2', color: 'from-green-900/60 to-green-950', borde: 'border-green-500/30', emoji: '🍀', nombre: 'Gold Rush', premio: 'Hasta $2,500' },
  { precio: '$5', color: 'from-yellow-900/60 to-yellow-950', borde: 'border-yellow-500/30', emoji: '⭐', nombre: 'Texas Riches', premio: 'Hasta $50,000' },
  { precio: '$10', color: 'from-orange-900/60 to-orange-950', borde: 'border-orange-500/30', emoji: '🔥', nombre: 'Mega Cash', premio: 'Hasta $100,000' },
  { precio: '$20', color: 'from-red-900/60 to-red-950', borde: 'border-red-500/30', emoji: '💎', nombre: 'Diamond 7s', premio: 'Hasta $500,000' },
  { precio: '$50', color: 'from-purple-900/60 to-purple-950', borde: 'border-purple-500/30', emoji: '👑', nombre: 'Millionaire', premio: 'Hasta $1,000,000' },
  { precio: '$100', color: 'from-gold/20 to-yellow-950', borde: 'border-gold/40', emoji: '🏆', nombre: 'Ultimate Gold', premio: 'Hasta $5,000,000' },
];

const LOTERIAS = [
  { nombre: 'Powerball', emoji: '🔴', sorteo: 'Lun · Miér · Sáb', href: '/resultados?juego=powerball' },
  { nombre: 'Mega Millions', emoji: '💛', sorteo: 'Mar · Vier', href: '/resultados?juego=megamillions' },
  { nombre: 'Lotto Texas', emoji: '⭐', sorteo: 'Miér · Sáb', href: '/resultados?juego=lotto' },
  { nombre: 'Texas Two Step', emoji: '🤠', sorteo: 'Lun · Jue', href: '/resultados?juego=twostep' },
  { nombre: 'Pick 3', emoji: '🎯', sorteo: 'Todos los días', href: '/resultados?juego=pick3' },
  { nombre: 'Daily 4', emoji: '🎰', sorteo: 'Todos los días', href: '/resultados?juego=daily4' },
];

export default function HomePage() {
  return (
    <div className="fade-in">
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=1600&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="ornament mb-4 text-gold/80 text-lg tracking-widest">◆ ◆ ◆</div>
          <h1 className="font-display text-6xl md:text-8xl text-gold-light font-black leading-none drop-shadow-2xl">Hazte<br />Millonario</h1>
          <p className="text-cream/80 text-xl md:text-2xl mt-6 leading-relaxed font-light">Lotería de Texas · Charada Cubana · Raspaditos</p>
          <p className="text-cream/60 text-base mt-3 max-w-xl mx-auto">Resultados en tiempo real, análisis histórico, interpretador de sueños y la Charada Cubana completa.</p>
          <div className="inline-block mt-6 px-5 py-2 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-sm font-bold animate-pulse">🎁 Regístrate y accede a TODO gratis por 1 hora</div>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/registro" className="px-8 py-4 rounded-md bg-gold text-ink font-black text-lg hover:bg-gold-light transition shadow-lg">Empezar ahora — Es gratis</Link>
            <Link href="/resultados" className="px-8 py-4 rounded-md border-2 border-cream/30 text-cream font-bold text-lg hover:bg-cream/10 transition">Ver resultados de hoy</Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40 text-sm animate-bounce">↓ Explorar</div>
      </section>

      <section className="bg-gradient-to-r from-gold/20 via-wine/20 to-gold/20 border-y border-gold/20 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-gold-light font-bold">🎁 1 Hora de Acceso Total — Completamente Gratis</h2>
            <p className="text-cream/70 mt-2 text-sm md:text-base">Al registrarte tienes <strong className="text-cream">60 minutos</strong> para explorar <strong className="text-cream">todas las funciones Premium</strong> sin pagar nada.</p>
          </div>
          <Link href="/registro" className="flex-shrink-0 px-6 py-3 rounded-md bg-gold text-ink font-black hover:bg-gold-light transition whitespace-nowrap">Crear cuenta gratis →</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl text-cream font-bold">Loterías de Texas</h2>
          <p className="text-cream/60 mt-2">Resultados oficiales actualizados en tiempo real</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOTERIAS.map((l) => (
            <Link key={l.nombre} href={l.href} className="card p-6 hover:border-gold/40 transition group flex items-center gap-4">
              <span className="text-4xl">{l.emoji}</span>
              <div>
                <div className="font-display text-xl text-cream font-bold group-hover:text-gold-light transition">{l.nombre}</div>
                <div className="text-cream/50 text-xs mt-0.5">{l.sorteo}</div>
                <div className="text-gold-light/70 text-xs mt-1">Ver resultados →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-10">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl text-cream font-bold">Raspaditos Super Lotería</h2>
          <p className="text-cream/60 mt-2">Tickets disponibles · Premios que quedan · Cómo jugar</p>
        </div>
        <div c
