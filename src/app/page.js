// src/app/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Hazte Millonario — Lotería de Texas, Charada Cubana y Raspaditos',
  description: 'El único lugar donde la tradición cubana se encuentra con la lotería de Texas. Regístrate gratis y accede a todo por 1 hora.',
};

const PREVIEWS = [
  { emoji: '🎰', titulo: 'Loterías de Texas en vivo', desc: 'Powerball, Mega Millions, Lotto Texas y más — resultados al instante' },
  { emoji: '🀄', titulo: 'Charada Cubana completa', desc: 'Los 100 números con sus figuras, significados y combinaciones' },
  { emoji: '🎟️', titulo: 'Raspaditos Super Lotería', desc: 'Tickets desde $1 hasta $100 — premios, cómo jugar y los que quedan' },
  { emoji: '🌙', titulo: 'Interpretador de sueños', desc: 'Soñaste algo? Encuentra tu número de la suerte con la charada' },
  { emoji: '📊', titulo: 'Análisis histórico', desc: 'Números fríos, calientes, rachas y patrones de todos los sorteos' },
  { emoji: '🎲', titulo: 'Generador de combinaciones', desc: 'Genera jugadas aleatorias o basadas en frecuencias históricas' },
  { emoji: '🧩', titulo: 'Adivinanzas cubanas', desc: 'Cultura, tradición y diversión con las adivinanzas de la isla' },
  { emoji: '🎁', titulo: '7 días gratis para ganar', desc: 'Comparte, valora y sigue nuestras redes para extender tu acceso' },
];

export default function LandingPage() {
  return (
    <div className="fade-in min-h-screen">

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1800&q=90')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/75 to-ink" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl opacity-20 animate-bounce" style={{animationDelay:'0s'}}>💰</div>
          <div className="absolute top-40 right-20 text-3xl opacity-20 animate-bounce" style={{animationDelay:'0.5s'}}>🎰</div>
          <div className="absolute bottom-40 left-20 text-3xl opacity-20 animate-bounce" style={{animationDelay:'1s'}}>⭐</div>
          <div className="absolute bottom-60 right-10 text-4xl opacity-20 animate-bounce" style={{animationDelay:'1.5s'}}>🏆</div>
          <div className="absolute top-60 left-1/4 text-2xl opacity-10 animate-bounce" style={{animationDelay:'0.8s'}}>🍀</div>
          <div className="absolute top-32 right-1/3 text-2xl opacity-10 animate-bounce" style={{animationDelay:'1.2s'}}>💎</div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/50 text-gold-light text-sm font-bold mb-6 animate-pulse">
            🔥 +10,000 jugadores en Texas confían en nosotros
          </div>
          <h1 className="font-display text-7xl md:text-9xl text-gold-light font-black leading-none drop-shadow-2xl">
            Hazte<br /><span className="text-white">Millonario</span>
          </h1>
          <p className="text-cream/90 text-xl md:text-2xl mt-6 font-light max-w-2xl mx-auto leading-relaxed">
            La única plataforma que une la <strong className="text-gold-light">tradición cubana</strong> con la <strong className="text-gold-light">lotería de Texas</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm">
            {['✅ Gratis para empezar', '✅ 1 hora de acceso total', '✅ Sin tarjeta de crédito', '✅ Cancela cuando quieras'].map((b) => (
              <span key={b} className="px-3 py-1 rounded-full bg-cream/10 text-cream/80 border border-cream/20">{b}</span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/registro" className="px-10 py-5 rounded-xl bg-gold text-ink font-black text-xl hover:bg-gold-light transition shadow-2xl hover:scale-105">
              🎁 Crear cuenta gratis
            </Link>
            <Link href="/login" className="px-10 py-5 rounded-xl border-2 border-cream/40 text-cream font-bold text-xl hover:bg-cream/10 transition">
              Iniciar sesión →
            </Link>
          </div>
          <p className="text-cream/40 text-xs mt-4">Al registrarte tienes <strong className="text-cream/60">1 hora ilimitada</strong> gratis. Sin compromisos.</p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40 text-sm animate-bounce">↓ Ver qué hay adentro</div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <div className="ornament mb-3 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl md:text-5xl text-gold-light font-black">¿Qué encontrarás adentro?</h2>
          <p className="text-cream/60 mt-3 text-lg">Todo lo que necesitas para jugar con inteligencia y tradición</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PREVIEWS.map((p) => (
            <div key={p.titulo} className="card p-6 hover:border-gold/40 transition group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="text-4xl mb-3">{p.emoji}</div>
              <h3 className="font-display text-lg text-cream font-bold group-hover:text-gold-light transition leading-tight">{p.titulo}</h3>
              <p className="text-cream/50 text-xs mt-2 leading-relaxed">{p.desc}</p>
              <div className="mt-4 text-gold-light/60 text-xs font-bold">🔒 Solo para miembros</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=1200&q=80')" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
          <div className="relative z-10 p-10 md:p-14">
            <div className="ornament mb-3 text-gold/80">◆ ◆ ◆</div>
            <h2 className="font-display text-4xl md:text-5xl text-gold-light font-black leading-tight max-w-xl">
              Gana hasta 7 días<br />Premium completamente gratis
            </h2>
            <p className="text-cream/70 mt-4 max-w-lg leading-relaxed">
              Comparte la app, valora con 5 estrellas, sigue nuestras redes o invita un amigo. Cada acción te da <strong className="text-gold-light">1 día extra.</strong>
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['📲 Compartir', '⭐ Valorar', '📘 Facebook', '📸 Instagram', '🎵 TikTok', '▶️ YouTube', '🤝 Invitar'].map((a) => (
                <span key={a} className="px-3 py-1.5 rounded-full bg-gold/20 border border-gold/30 text-gold-light text-sm font-medium">{a} = +1 día</span>
              ))}
            </div>
            <Link href="/registro" className="inline-block mt-8 px-8 py-4 rounded-xl bg-gold text-ink font-black text-lg hover:bg-gold-light transition">
              Empezar ahora — Es gratis
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-3xl text-cream font-bold">Lo que dicen nuestros usuarios</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { nombre: 'María G.', ciudad: 'Houston, TX', texto: 'La charada cubana me trae recuerdos de mi país. ¡Y los resultados de la lotería siempre al día!', estrellas: 5 },
            { nombre: 'Roberto M.', ciudad: 'Dallas, TX', texto: 'El análisis de números fríos y calientes me ha ayudado a elegir mejor mis jugadas. Excelente app.', estrellas: 5 },
            { nombre: 'Carmen L.', ciudad: 'Austin, TX', texto: 'Nunca pensé que encontraría la charada y la lotería de Texas en el mismo lugar. ¡Increíble!', estrellas: 5 },
          ].map((t) => (
            <div key={t.nombre} className="card p-6">
              <div className="flex mb-3">{[...Array(t.estrellas)].map((_, i) => <span key={i} className="text-gold-light">⭐</span>)}</div>
              <p className="text-cream/70 text-sm leading-relaxed italic">"{t.texto}"</p>
              <div className="mt-4 border-t border-cream/10 pt-3">
                <div className="text-cream font-bold text-sm">{t.nombre}</div>
                <div className="text-cream/40 text-xs">{t.ciudad}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-16 text-center">
        <div className="card p-12 bg-gradient-to-br from-gold/10 to-wine/10 border-gold/30 glow">
          <div className="ornament mb-4 text-lg">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl md:text-5xl text-gold-light font-black">¿Listo para<br />hacerte millonario?</h2>
          <p className="text-cream/70 mt-4 text-lg">Únete gratis. 1 hora de acceso total. Sin tarjeta de crédito.</p>
          <Link href="/registro" className="inline-block mt-8 px-12 py-5 rounded-xl bg-gold text-ink font-black text-xl hover:bg-gold-light transition hover:scale-105 shadow-2xl">
            🎁 Crear mi cuenta gratis
          </Link>
          <p className="text-cream/30 text-xs mt-4">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-gold-light/60 hover:text-gold-light underline">Inicia sesión aquí</Link>
          </p>
        </div>
      </section>

    </div>
  );
}
