export const metadata = {
  title: 'Politica de Privacidad — Hazte Millonario',
};

export default function PrivacidadPage() {
  return (
    <div className="fade-in max-w-3xl mx-auto px-4 md:px-8 py-12">
      <div className="text-center mb-8">
        <div className="ornament mb-2">◆ ◆ ◆</div>
        <h1 className="font-display text-3xl text-gold-light font-bold">Politica de Privacidad</h1>
        <p className="text-cream/60 text-sm mt-2">Ultima actualizacion: Abril 2026</p>
      </div>
      <div className="card p-8 space-y-6 text-cream/80 leading-relaxed">
        <div>
          <h2 className="font-display text-xl text-gold-light font-bold mb-3">1. Informacion que recopilamos</h2>
          <p>Hazte Millonario recopila la siguiente informacion cuando usas nuestra app:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-cream/70">
            <li>Nombre y correo electronico al registrarte</li>
            <li>Informacion de pago procesada de forma segura por Stripe</li>
            <li>Datos de uso de la app (paginas visitadas, funciones usadas)</li>
            <li>Historial de jugadas de bolita y transacciones de bonos</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl text-gold-light font-bold mb-3">2. Como usamos tu informacion</h2>
          <ul className="list-disc ml-6 space-y-1 text-cream/70">
            <li>Para proveer y mejorar nuestros servicios</li>
            <li>Para procesar pagos y suscripciones</li>
            <li>Para enviarte actualizaciones sobre resultados de loteria</li>
            <li>Para administrar tu cuenta y bonos</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl text-gold-light font-bold mb-3">3. Compartir informacion</h2>
          <p>No vendemos tu informacion personal a terceros. Compartimos datos solo con:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-cream/70">
            <li>Stripe para procesar pagos</li>
            <li>Supabase para almacenar datos de forma segura</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl text-gold-light font-bold mb-3">4. Seguridad</h2>
          <p>Usamos encriptacion SSL y almacenamiento seguro para proteger tu informacion. Los pagos son procesados por Stripe con certificacion PCI DSS.</p>
        </div>
        <div>
          <h2 className="font-display text-xl text-gold-light font-bold mb-3">5. Tus derechos</h2>
          <p>Puedes solicitar la eliminacion de tu cuenta y datos en cualquier momento escribiendo a: <strong className="text-gold-light">haztemillonario2026@gmail.com</strong></p>
        </div>
        <div>
          <h2 className="font-display text-xl text-gold-light font-bold mb-3">6. Menores de edad</h2>
          <p>Esta app es solo para mayores de 18 anos. No recopilamos intencionalmente informacion de menores de edad.</p>
        </div>
        <div>
          <h2 className="font-display text-xl text-gold-light font-bold mb-3">7. Contacto</h2>
          <p>Para preguntas sobre esta politica contactanos en: <strong className="text-gold-light">haztemillonario2026@gmail.com</strong></p>
        </div>
      </div>
    </div>
  );
}
