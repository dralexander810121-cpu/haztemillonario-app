// src/app/premium/exito/page.js
// Página que ve el usuario después de completar el pago en Stripe

import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata = {
  title: '¡Bienvenido a Premium! — Hazte Millonario',
  description: 'Tu suscripción ha sido activada con éxito.',
};

export default function ExitoPage() {
  return (
    <div className="fade-in max-w-2xl mx-auto px-4 md:px-8 py-16 text-center">
      <div className="inline-flex w-20 h-20 rounded-full bg-gold/20 items-center justify-center mb-6 glow">
        <Check className="text-gold-light" size={40} strokeWidth={3} />
      </div>

      <div className="ornament mb-4">◆ ◆ ◆</div>

      <h1 className="font-display text-4xl md:text-5xl text-gold-light font-bold">
        ¡Bienvenido a Premium!
      </h1>

      <p className="text-cream/70 text-lg mt-4 leading-relaxed">
        Tu suscripción se ha activado con éxito. Ahora tienes acceso completo
        a todas las funciones Premium de Hazte Millonario.
      </p>

      <div className="ornament mt-6">◆ ◆ ◆</div>

      <div className="card p-6 mt-10 text-left">
        <h2 className="font-display text-xl text-cream font-bold mb-4">
          Ahora puedes
        </h2>
        <ul className="space-y-2">
          {[
            'Acceder a la charada completa sin límite',
            'Usar el interpretador de sueños ilimitado',
            'Ver el panel analítico con todas las estadísticas',
            'Usar todos los generadores de combinaciones',
            'Navegar sin anuncios',
          ].map((li, i) => (
            <li key={i} className="flex items-start gap-2 text-cream/80 text-sm">
              <Check size={15} className="text-gold-light mt-1 flex-shrink-0" />
              <span>{li}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <Link
          href="/"
          className="px-6 py-3 rounded-md bg-gold text-ink font-bold hover:bg-gold-light transition"
        >
          Explorar la app
        </Link>
        <Link
          href="/cuenta"
          className="px-6 py-3 rounded-md border border-gold/40 text-gold-light font-medium hover:bg-gold/10 transition"
        >
          Ver mi cuenta
        </Link>
      </div>

      <p className="text-xs text-cream/40 mt-10 italic">
        Recuerda: tu primer cobro se hace después de 7 días de prueba gratis.
        Puedes cancelar en cualquier momento desde "Mi cuenta".
      </p>
    </div>
  );
}
