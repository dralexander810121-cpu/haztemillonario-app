import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 mt-16 relative grain">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center font-display font-black text-ink">HM</div>
            <div className="font-display font-bold text-cream">Hazte Millonario</div>
          </div>
          <p className="text-cream/60 text-sm">Tradición, cultura y análisis para la comunidad latina.</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-cream/50 mb-3">Producto</div>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href="/resultados" className="hover:text-gold-light">Resultados</Link></li>
            <li><Link href="/charada" className="hover:text-gold-light">Charada</Link></li>
            <li><Link href="/sonar" className="hover:text-gold-light">Soñar</Link></li>
            <li><Link href="/premium" className="hover:text-gold-light">Premium</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-cream/50 mb-3">Legal</div>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href="/legal/terminos" className="hover:text-gold-light">Términos</Link></li>
            <li><Link href="/legal/privacidad" className="hover:text-gold-light">Privacidad</Link></li>
            <li><Link href="/legal/juego-responsable" className="hover:text-gold-light">Juego responsable</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-cream/50 mb-3">Aviso</div>
          <p className="text-xs text-cream/50 leading-relaxed">
            Plataforma cultural y de entretenimiento. Los sorteos son eventos independientes;
            ningún análisis puede predecir resultados.
            Si el juego afecta su vida, llame a 1-800-GAMBLER.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/5 py-4 text-center text-xs text-cream/40">
        © 2026 Hazte Millonario · Fundado por Dr. Alexander Figueredo Izaguirre
      </div>
    </footer>
  );
}
