import { LifeBuoy, AlertCircle, Phone } from 'lucide-react';

export const metadata = {
  title: 'Juego Responsable — Hazte Millonario',
  description:
    'Información, señales de alerta y líneas de ayuda para practicar un juego responsable.',
};

export default function JuegoResponsablePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-10 fade-in">
      <div className="flex items-center gap-3 mb-2">
        <LifeBuoy className="text-gold-light" size={32} />
        <h1 className="font-display text-4xl text-gold-light font-bold">Juego Responsable</h1>
      </div>
      <p className="text-cream/70 max-w-2xl mt-2">
        La lotería es entretenimiento, no un plan financiero. Si lo que empezó como diversión
        empieza a causarle problemas, hay ayuda real y confidencial disponible.
      </p>

      <div className="card p-6 mt-8 border-wine">
        <div className="flex items-center gap-2 mb-3">
          <Phone className="text-gold-light" size={20} />
          <h2 className="font-display text-xl text-cream font-bold">Líneas de ayuda 24/7</h2>
        </div>
        <ul className="text-cream/80 space-y-3">
          <li>
            <strong className="text-cream">Nacional (EE. UU.):</strong>{' '}
            <a href="tel:18004262537" className="text-gold-light">1-800-GAMBLER</a> (1-800-426-2537)
          </li>
          <li>
            <strong className="text-cream">Texas:</strong>{' '}
            <a href="tel:18007420443" className="text-gold-light">1-800-742-0443</a>{' '}
            (Texas Council on Problem Gambling)
          </li>
          <li>
            <strong className="text-cream">En línea:</strong>{' '}
            <a
              href="https://www.ncpgambling.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-light underline"
            >
              ncpgambling.org
            </a>
          </li>
          <li>
            <strong className="text-cream">Jugadores Anónimos:</strong>{' '}
            <a
              href="https://www.gamblersanonymous.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-light underline"
            >
              gamblersanonymous.org
            </a>
          </li>
        </ul>
      </div>

      <h2 className="font-display text-2xl text-cream mt-10">Señales de alerta</h2>
      <p className="text-cream/70 mt-3">
        Si reconoce varias de estas señales en usted o un ser querido, es momento de buscar ayuda.
        No hace falta esperar a que todo se caiga.
      </p>
      <ul className="text-cream/80 mt-4 space-y-2 list-disc pl-6">
        <li>Pensar en el juego con una frecuencia que interfiere con el trabajo o la familia.</li>
        <li>Jugar cantidades cada vez mayores para sentir la misma emoción.</li>
        <li>Intentar "recuperar" lo perdido jugando más.</li>
        <li>Mentir a familiares o amigos sobre cuánto se juega.</li>
        <li>Pedir prestado, vender cosas, o dejar de pagar cuentas para jugar.</li>
        <li>Sentir ansiedad, irritabilidad o culpa cuando no se puede jugar.</li>
        <li>Perder trabajos, amistades u oportunidades por el juego.</li>
      </ul>

      <h2 className="font-display text-2xl text-cream mt-10">Reglas simples que ayudan</h2>
      <ul className="text-cream/80 mt-4 space-y-3 list-disc pl-6">
        <li>
          <strong className="text-cream">Ponga un presupuesto mensual.</strong> No supere nunca esa
          cifra, aunque gane o pierda.
        </li>
        <li>
          <strong className="text-cream">Nunca use dinero de rentas, comida o medicamentos.</strong>
        </li>
        <li>
          <strong className="text-cream">No pida prestado para jugar.</strong> La deuda es la
          trampa principal.
        </li>
        <li>
          <strong className="text-cream">Tome descansos.</strong> Si lleva varios días seguidos
          jugando, pare una semana.
        </li>
        <li>
          <strong className="text-cream">Hable con alguien de confianza</strong> si siente que el
          juego le controla más de lo que quisiera.
        </li>
      </ul>

      <h2 className="font-display text-2xl text-cream mt-10">
        Nuestro compromiso
      </h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Hazte Millonario es una plataforma de <strong className="text-cream">cultura y
        entretenimiento</strong>. No vendemos boletos de lotería, no procesamos apuestas, y no
        prometemos resultados. Mostramos tradición, interpretación de sueños, análisis histórico
        y cultura popular porque creemos que vale la pena preservarla. Pero la lotería de verdad
        es un juego de azar pensado para divertir; si deja de ser diversión, deje de jugar.
      </p>

      <div className="card p-6 mt-10 flex gap-4 items-start border-gold/40">
        <AlertCircle className="text-gold-light flex-shrink-0 mt-1" size={24} />
        <p className="text-cream/80 leading-relaxed text-sm">
          Si está leyendo esto porque alguien cercano tiene un problema con el juego: sepa que la
          ayuda existe, que la familia puede llamar a las mismas líneas (1-800-GAMBLER ofrece
          apoyo para familiares), y que el primer paso es hablarlo sin juzgar.
        </p>
      </div>
    </article>
  );
}
