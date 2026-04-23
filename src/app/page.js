// src/app/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Hazte Millonario — Lotería, Tradición y Análisis',
  description: 'Resultados de lotería de Texas en tiempo real, Charada Cubana, interpretador de sueños y análisis histórico.',
};

export default function HomePage() {
  return (
    <div className="fade-in">

      {/* HERO */}
      <section className="relative text-center px-4 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="ornament mb-4 text-gold/60">◆ ◆ ◆</div>
        <h1 className="font-display text-5xl md:text-7xl text-gold-light font-black leading-tight">
          Hazte Millonario
        </h1>
        <p className="text-cream/70 text-lg md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed">
          Resultados de lotería de Texas en tiempo real, la Charada Cubana completa,
          interpretador de sueños y análisis histórico de números.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link
            href="/resultados"
            className="px-6 py-3 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition text-sm"
          >
            Ver resultados de hoy
          </Link>
          <Link
            href="/registro"
            className="px-6 py-3 rounded-md border border-gold/40 text-gold-light font-medium hover:bg-gold/10 transition text-sm"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      {/* LOTERIAS */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="text-center mb-8">
          <div className="ornament mb-2 text-sm">◆ ◆ ◆</div>
          <h2 className="font-display text-3xl text-cream font-bold">Loterías de Texas</h2>
          <p className="text-cream/60 text-sm mt-2">Últimos resultados oficiales</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { nombre: 'Powerball', emoji: '🔴', color: 'from-red-900/30 to-ink', href: '/resultados?juego=powerball' },
            { nombre: 'Mega Millions', emoji: '💛', color: 'from-yellow-900/30 to-ink', href: '/resultados?juego=megamillions' },
            { nombre: 'Lotto Texas', emoji: '⭐', color: 'from-gold/20 to-ink', href: '/resultados?juego=lotto' },
            { nombre: 'Texas Two Step', emoji: '🤠', color: 'from-blue-900/30 to-ink', href: '/resultados?juego=twostep' },
            { nombre: 'Pick 3', emoji: '🎯', color: 'from-green-900/30 to-ink', href: '/resultados?juego=pick3' },
            { nombre: 'Daily 4', emoji: '🎰', color: 'from-purple-900/30 to-ink', href: '/resultados?juego=daily4' },
          ].map((juego) => (
            <Link
              key={juego.nombre}
              href={juego.href}
              className={`card p-5 bg-gradient-to-br ${juego.color} hover:border-gold/40 transition group`}
            >
              <div className="text-2xl mb-2">{juego.emoji}</div>
              <div className="font-display text-lg text-cream font-bold group-hover:text-gold-light transition">
                {juego.nombre}
              </div>
              <div className="text-cream/50 text-xs mt-1">Ver últimos resultados →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CHARADA */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="card p-8 md:p-10 bg-gradient-to-br from-wine/20 to-ink relative overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl opacity-10">🀄</div>
          <div className="ornament mb-3 text-sm">◆ ◆ ◆</div>
          <h2 className="font-display text-3xl md:text-4xl text-gold-light font-bold">
            La Charada Cubana
          </h2>
          <p className="text-cream/70 mt-3 max-w-xl leading-relaxed">
            La tradición más antigua de la cultura lúdica cubana. Busca cualquier animal,
            persona u objeto y encuentra su número de la suerte.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/charada"
              className="px-5 py-2.5 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition text-sm"
            >
              Consultar la Charada
            </Link>
            <Link
              href="/sonar"
              className="px-5 py-2.5 rounded-md border border-gold/40 text-gold-light hover:bg-gold/10 transition text-sm"
            >
              Interpretar un sueño
            </Link>
          </div>
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="text-center mb-8">
          <div className="ornament mb-2 text-sm">◆ ◆ ◆</div>
          <h2 className="font-display text-3xl text-cream font-bold">Herramientas</h2>
          <p className="text-cream/60 text-sm mt-2">Todo lo que necesitas para jugar con inteligencia</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { titulo: 'Generador', desc: 'Combinaciones aleatorias y estratégicas', emoji: '🎲', href: '/generador' },
            { titulo: 'Análisis', desc: 'Números fríos, calientes e histórico', emoji: '📊', href: '/analisis' },
            { titulo: 'Adivinanzas', desc: 'Tradición y cultura en cada pregunta', emoji: '🧩', href: '/adivinanzas' },
            { titulo: 'Sonar', desc: 'Interpreta tus sueños con la charada', emoji: '🌙', href: '/sonar' },
          ].map((h) => (
            <Link
              key={h.titulo}
              href={h.href}
              className="card p-5 hover:border-gold/40 transition group text-center"
            >
              <div className="text-3xl mb-3">{h.emoji}</div>
              <div className="font-display text-lg text-cream font-bold group-hover:text-gold-light transition">
                {h.titulo}
              </div>
              <div className="text-cream/50 text-xs mt-1 leading-relaxed">{h.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA PREMIUM */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14 text-center">
        <div className="card p-10 bg-gradient-to-br from-gold/10 to-wine/10 border-gold/30 glow">
          <div className="ornament mb-4">◆ ◆ ◆</div>
          <h2 className="font-display text-3xl md:text-4xl text-gold-light font-bold">
            Hazte Premium
          </h2>
          <p className="text-cream/70 mt-3 leading-relaxed">
            Sin anuncios, charada completa sin límite, análisis histórico, generadores avanzados
            y contenido exclusivo del Dr. Figueredo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link
              href="/premium"
              className="px-6 py-3 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition"
            >
              Ver planes desde $4.99/mes
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
