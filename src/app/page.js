import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import Ball from '@/components/Ball';
import { BookOpen, Moon, HelpCircle, ChevronRight } from 'lucide-react';

export const revalidate = 1800; // regenera cada 30 min

export default async function HomePage() {
  const supabase = createClient();

  // Traer próximos juegos destacados
  const { data: juegos } = await supabase
    .from('juegos')
    .select('*')
    .eq('activo', true)
    .order('orden', { ascending: true })
    .limit(4);

  // Último sorteo de cada uno de los juegos destacados
  const ultimosSorteos = {};
  if (juegos) {
    for (const j of juegos) {
      const { data: s } = await supabase
        .from('sorteos')
        .select('fecha, numeros, numero_extra')
        .eq('juego_id', j.id)
        .order('fecha', { ascending: false })
        .limit(1)
        .single();
      if (s) ultimosSorteos[j.id] = s;
    }
  }

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0 bg-gradient-to-br from-wine/30 via-ink to-ink" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-wine/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <div className="ornament mb-6">◆  ◆  ◆</div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-cream leading-tight tracking-tight">
            Donde la <em className="text-gold-light italic font-light">tradición</em><br />
            se cruza con los <em className="text-gold italic font-light">números</em>
          </h1>
          <p className="font-body text-lg md:text-xl text-cream/70 mt-6 max-w-2xl mx-auto leading-relaxed">
            El hogar digital de la Charada Cubana. Resultados de Texas, interpretación de sueños,
            adivinanzas y análisis histórico. Tradición, cultura y números en un solo lugar.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/resultados"
              className="px-6 py-3 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition glow"
            >
              Ver resultados de hoy
            </Link>
            <Link
              href="/premium"
              className="px-6 py-3 rounded-md border border-gold/40 text-gold-light font-medium hover:bg-gold/10 transition"
            >
              Hacerme Premium
            </Link>
          </div>
          <div className="ornament mt-12">◆  ◆  ◆</div>
        </div>
      </section>

      {/* Resultados destacados */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="font-display text-3xl text-cream font-bold">Últimos sorteos</h2>
            <p className="text-cream/60 text-sm mt-1">Datos oficiales de la Texas Lottery</p>
          </div>
          <Link
            href="/resultados"
            className="text-gold-light text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(juegos || []).map((j) => {
            const s = ultimosSorteos[j.id];
            return (
              <div key={j.id} className="card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: j.color_hex }}
                  />
                  <span className="text-xs uppercase tracking-wider text-cream/60">
                    {j.dias_sorteo}
                  </span>
                </div>
                <div className="font-display text-xl text-cream font-bold">{j.nombre}</div>
                {s ? (
                  <>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {s.numeros.map((n, i) => (
                        <Ball key={i} n={n} size="xs" />
                      ))}
                      {s.numero_extra != null && (
                        <>
                          <span className="text-cream/40 self-center">+</span>
                          <Ball n={s.numero_extra} variant="red" size="xs" />
                        </>
                      )}
                    </div>
                    <div className="text-xs text-cream/50 mt-3">
                      Sorteo del {new Date(s.fecha).toLocaleDateString('es-US')}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-cream/50 mt-4">
                    Sin datos aún — pronto
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Módulos destacados */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              href: '/charada',
              icon: BookOpen,
              t: 'Charada Cubana',
              d: 'Los 100 números con su significado tradicional. Busca por palabra y encuentra tu número.',
            },
            {
              href: '/sonar',
              icon: Moon,
              t: 'Interpreta tus sueños',
              d: 'Cuéntanos qué soñaste. Te diremos los números asociados según la tradición.',
            },
            {
              href: '/adivinanzas',
              icon: HelpCircle,
              t: 'Adivinanzas del pueblo',
              d: 'Adivinanzas tradicionales con su respuesta y sus números de la charada.',
            },
          ].map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="card p-6 transition group"
            >
              <m.icon className="text-gold-light mb-4 group-hover:scale-110 transition" size={28} />
              <div className="font-display text-xl text-cream font-bold">{m.t}</div>
              <p className="text-cream/60 text-sm mt-2 leading-relaxed">{m.d}</p>
              <div className="flex items-center gap-1 text-gold-light text-xs mt-4 group-hover:gap-2 transition-all">
                Explorar <ChevronRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Manifiesto */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 text-center">
        <div className="ornament mb-6">◇ ◇ ◇</div>
        <p className="font-display italic text-2xl md:text-3xl text-cream/80 leading-relaxed">
          "La charada no predice el futuro.{' '}
          <span className="text-gold-light">Guarda la memoria</span> de un pueblo que aprendió
          a encontrarle sentido a los números, a los sueños y a la esperanza."
        </p>
        <div className="ornament mt-6">◇ ◇ ◇</div>
      </section>
    </div>
  );
}
