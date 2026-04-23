// src/app/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Hazte Millonario — Lotería de Texas, Charada Cubana y Raspaditos',
  description: 'Resultados en tiempo real, Charada Cubana, raspaditos y análisis histórico. Regístrate y prueba todo gratis por 1 hora.',
};

const REDES = [
  { nombre: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61564686726811', bg: 'bg-blue-600 hover:bg-blue-500', emoji: '📘' },
  { nombre: 'Instagram', href: 'https://www.instagram.com/haztemillonario2026/',          bg: 'bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90', emoji: '📸' },
  { nombre: 'TikTok',    href: 'https://www.tiktok.com/@haztemillonario2026',              bg: 'bg-zinc-900 hover:bg-zinc-800 border border-white/20', emoji: '🎵' },
  { nombre: 'YouTube',   href: 'https://www.youtube.com/@haztemillonario-k7p',             bg: 'bg-red-600 hover:bg-red-500', emoji: '▶️' },
];

const RECOMPENSAS = [
  { accion: 'Compartir la app',     dias: '+1 día',  emoji: '📲', desc: 'Comparte con tus amigos en cualquier red' },
  { accion: 'Valorar con ⭐⭐⭐⭐⭐', dias: '+1 día',  emoji: '⭐', desc: 'Deja tu opinión honesta sobre la app' },
  { accion: 'Seguir en Facebook',   dias: '+1 día',  emoji: '📘', desc: 'Números ganadores todos los días' },
  { accion: 'Seguir en Instagram',  dias: '+1 día',  emoji: '📸', desc: 'Contenido exclusivo diario' },
  { accion: 'Seguir en TikTok',     dias: '+1 día',  emoji: '🎵', desc: 'Videos de charada y resultados' },
  { accion: 'Seguir en YouTube',    dias: '+1 día',  emoji: '▶️', desc: 'Análisis y tutoriales completos' },
  { accion: 'Invitar un amigo',     dias: '+1 día',  emoji: '🤝', desc: 'Tu amigo se registra con tu enlace' },
];

const CIUDADES = [
  { nombre: 'Houston',     desc: 'La ciudad de los grandes jackpots',   img: 'https://images.unsplash.com/photo-1572205096924-35c2e2bfda38?w=600&q=80' },
  { nombre: 'Dallas',      desc: 'Donde los sueños se hacen realidad',  img: 'https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&q=80' },
  { nombre: 'Austin',      desc: 'Capital del entretenimiento texano',  img: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=600&q=80' },
  { nombre: 'San Antonio', desc: 'Tradición y suerte en cada jugada',   img: 'https://images.unsplash.com/photo-1583172332547-c769395f05db?w=600&q=80' },
];

const RASPADITOS = [
  { precio: '$1',   color: 'from-blue-900/60 to-blue-950',     borde: 'border-blue-500/30',   emoji: '🎟️', nombre: 'Lucky Lines',   premio: 'Hasta $500' },
  { precio: '$2',   color: 'from-green-900/60 to-green-950',   borde: 'border-green-500/30',  emoji: '🍀', nombre: 'Gold Rush',     premio: 'Hasta $2,500' },
  { precio: '$5',   color: 'from-yellow-900/60 to-yellow-950', borde: 'border-yellow-500/30', emoji: '⭐', nombre: 'Texas Riches',  premio: 'Hasta $50,000' },
  { precio: '$10',  color: 'from-orange-900/60 to-orange-950', borde: 'border-orange-500/30', emoji: '🔥', nombre: 'Mega Cash',     premio: 'Hasta $100,000' },
  { precio: '$20',  color: 'from-red-900/60 to-red-950',       borde: 'border-red-500/30',    emoji: '💎', nombre: 'Diamond 7s',   premio: 'Hasta $500,000' },
  { precio: '$50',  color: 'from-purple-900/60 to-purple-950', borde: 'border-purple-500/30', emoji: '👑', nombre: 'Millionaire',  premio: 'Hasta $1,000,000' },
  { precio: '$100', color: 'from-yellow-800/40 to-yellow-950', borde: 'border-yellow-400/40', emoji: '🏆', nombre: 'Ultimate Gold',premio: 'Hasta $5,000,000' },
];

const LOTERIAS = [
  { nombre: 'Powerball',      emoji: '🔴', sorteo: 'Lun · Miér · Sáb', href: '/resultados?juego=powerball' },
  { nombre: 'Mega Millions',  emoji: '💛', sorteo: 'Mar · Vier',        href: '/resultados?juego=megamillions' },
  { nombre: 'Lotto Texas',    emoji: '⭐', sorteo: 'Miér · Sáb',        href: '/resultados?juego=lotto' },
  { nombre: 'Texas Two Step', emoji: '🤠', sorteo: 'Lun · Jue',         href: '/resultados?juego=twostep' },
  { nombre: 'Pick 3',         emoji: '🎯', sorteo: 'Todos los días',     href: '/resultados?juego=pick3' },
  { nombre: 'Daily 4',        emoji: '🎰', sorteo: 'Todos los días',     href: '/resultados?juego=daily4' },
];

export default function HomePage() {
  return (
    <div className="fade-in">

      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=1600&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="ornament mb-4 text-gold/80 text-lg tracking-widest">◆ ◆ ◆</div>
          <h1 className="font-display text-6xl md:text-8xl text-gold-light font-black leading-none drop-shadow-2xl">
            Hazte<br />Millonario
          </h1>
          <p className="text-cream/80 text-xl md:text-2xl mt-6 font-light">Lotería de Texas · Charada Cubana · Raspaditos</p>
          <p className="text-cream/60 text-base mt-3 max-w-xl mx-auto">Resultados en tiempo real, análisis histórico, interpretador de sueños y la Charada Cubana completa.</p>
          <div className="inline-block mt-6 px-5 py-2 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-sm font-bold animate-pulse">
            🎁 Regístrate gratis · 1 hora ilimitada · Gana hasta 7 días más
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/registro" className="px-8 py-4 rounded-md bg-gold text-ink font-black text-lg hover:bg-gold-light transition shadow-lg">Empezar ahora — Es gratis</Link>
            <Link href="/resultados" className="px-8 py-4 rounded-md border-2 border-cream/30 text-cream font-bold text-lg hover:bg-cream/10 transition">Ver resultados de hoy</Link>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {REDES.map((r) => (
              <a key={r.nombre} href={r.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition ${r.bg}`}>
                <span>{r.emoji}</span> {r.nombre}
              </a>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40 text-sm animate-bounce">↓ Explorar</div>
      </section>

      <section className="bg-gradient-to-r from-gold/20 via-wine/20 to-gold/20 border-y border-gold/20 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-gold-light font-bold">🎁 1 Hora gratis + hasta 7 días más sin pagar</h2>
            <p className="text-cream/70 mt-2 text-sm md:text-base">Al registrarte tienes <strong className="text-cream">60 minutos de acceso total.</strong> Luego gana <strong className="text-cream">1 día extra</strong> por cada acción — comparte, valora, sigue nuestras redes o invita un amigo.</p>
          </div>
          <Link href="/registro" className="flex-shrink-0 px-6 py-3 rounded-md bg-gold text-ink font-black hover:bg-gold-light transition whitespace-nowrap">Crear cuenta gratis →</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl text-cream font-bold">Gana 7 días Premium gratis</h2>
          <p className="text-cream/60 mt-2">Cada acción te da 1 día extra. Completa las 7 y tienes una semana entera sin pagar</p>
        </div>
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex justify-between text-xs text-cream/50 mb-2">
            <span>0 días</span>
            <span className="text-gold-light font-bold">🎯 Meta: 7 días gratis</span>
            <span>7 días</span>
          </div>
          <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-gradient-to-r from-gold to-gold-light rounded-full" />
          </div>
          <div className="flex justify-between mt-3">
            {[1,2,3,4,5,6,7].map((n) => (
              <div key={n} className="w-6 h-6 rounded-full border-2 border-cream/20 bg-ink flex items-center justify-center text-xs text-cream/40">{n}</div>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RECOMPENSAS.map((r, i) => (
            <div key={r.accion} className="card p-5 text-center hover:border-gold/40 transition relative">
              <div className="absolute top-3 right-3 text-xs text-cream/30 font-mono">#{i + 1}</div>
              <div className="text-3xl mb-2">{r.emoji}</div>
              <div className="text-gold-light font-black text-xl font-display">{r.dias}</div>
              <div className="text-cream font-bold text-sm mt-1">{r.accion}</div>
              <div className="text-cream/50 text-xs mt-1 leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <div className="inline-block card px-6 py-3 bg-gold/10 border-gold/30">
            <span className="text-gold-light font-bold">🏆 1 hora al registrarte + 7 días = <span className="text-white">casi 2 semanas gratis</span></span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {RASPADITOS.map((r) => (
            <div key={r.precio} className={`rounded-xl p-5 bg-gradient-to-br ${r.color} border ${r.borde} hover:scale-105 transition cursor-pointer`}>
              <div className="text-3xl mb-2">{r.emoji}</div>
              <div className="font-display text-2xl text-white font-black">{r.precio}</div>
              <div className="text-white/80 text-sm font-bold mt-1">{r.nombre}</div>
              <div className="text-white/50 text-xs mt-2">{r.premio}</div>
              <div className="mt-3 text-xs text-white/60 border-t border-white/10 pt-2">Ver tickets →</div>
            </div>
          ))}
        </div>
        <p className="text-center text-cream/40 text-xs mt-6">* Información actualizada desde txlottery.org</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-10">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl text-cream font-bold">Texas te está esperando</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CIUDADES.map((c) => (
            <div key={c.nombre} className="relative rounded-xl overflow-hidden group h-48">
              <img src={c.img} alt={c.nombre} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-display text-xl text-white font-bold">{c.nombre}</div>
                <div className="text-cream/70 text-xs mt-0.5">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="relative rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=1200&q=80" alt="Charada Cubana" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 md:px-14">
            <div className="max-w-lg">
              <div className="ornament mb-3 text-gold/80">◆ ◆ ◆</div>
              <h2 className="font-display text-4xl md:text-5xl text-gold-light font-black leading-tight">La Charada Cubana</h2>
              <p className="text-cream/70 mt-3 leading-relaxed">La tradición más antigua del juego cubano. Más de 100 figuras, interpretador de sueños y generador.</p>
              <div className="flex flex-wrap gap-3 mt-5">
                <Link href="/charada" className="px-5 py-2.5 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition text-sm">Consultar Charada</Link>
                <Link href="/sonar" className="px-5 py-2.5 rounded-md border border-gold/40 text-gold-light hover:bg-gold/10 transition text-sm">Interpretar sueño</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-10">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl text-cream font-bold">Todo en un solo lugar</h2>
          <p className="text-cream/60 mt-2">Acceso completo gratis durante tu primera hora</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { titulo: 'Generador',   desc: 'Combinaciones aleatorias y por frecuencia histórica', emoji: '🎲', href: '/generador' },
            { titulo: 'Análisis',    desc: 'Números fríos, calientes, patrones y estadísticas',   emoji: '📊', href: '/analisis' },
            { titulo: 'Adivinanzas',desc: 'Cultura y tradición cubana en cada pregunta',          emoji: '🧩', href: '/adivinanzas' },
            { titulo: 'Soñar',       desc: 'Interpreta tus sueños y encuentra tu número',         emoji: '🌙', href: '/sonar' },
          ].map((h) => (
            <Link key={h.titulo} href={h.href} className="card p-6 hover:border-gold/40 transition group text-center">
              <div className="text-4xl mb-3">{h.emoji}</div>
              <div className="font-display text-xl text-cream font-bold group-hover:text-gold-light transition">{h.titulo}</div>
              <div className="text-cream/50 text-xs mt-2 leading-relaxed">{h.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-8">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-3xl text-cream font-bold">Síguenos y gana días gratis</h2>
          <p className="text-cream/60 mt-2">Números ganadores, charada y contenido exclusivo todos los días</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REDES.map((r) => (
            <a key={r.nombre} href={r.href} target="_blank" rel="noopener noreferrer"
              className={`flex flex-col items-center gap-3 p-6 rounded-xl text-white font-bold transition ${r.bg}`}>
              <span className="text-4xl">{r.emoji}</span>
              <span>{r.nombre}</span>
              <span className="text-xs opacity-70 font-normal">+1 día gratis al seguir</span>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="card p-10 md:p-14 bg-gradient-to-br from-gold/10 to-wine/10 border-gold/30 glow text-center">
          <div className="ornament mb-4 text-lg">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl md:text-5xl text-gold-light font-black">Hazte Premium</h2>
          <p className="text-cream/70 mt-4 text-lg leading-relaxed max-w-2xl mx-auto">Sin anuncios · Charada completa · Análisis histórico · Generadores avanzados · Alertas de jackpots · Contenido exclusivo del Dr. Figueredo</p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/registro" className="px-8 py-4 rounded-md bg-gold text-ink font-black text-lg hover:bg-gold-light transition">Empieza gratis — 1 hora ilimitada</Link>
            <Link href="/premium" className="px-8 py-4 rounded-md border-2 border-gold/40 text-gold-light font-bold text-lg hover:bg-gold/10 transition">Ver planes desde $4.99/mes</Link>
          </div>
          <p className="text-cream/40 text-xs mt-6">Sin tarjeta de crédito para empezar · Cancela cuando quieras</p>
        </div>
      </section>

    </div>
  );
}
