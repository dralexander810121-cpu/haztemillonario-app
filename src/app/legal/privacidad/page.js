export const metadata = {
  title: 'Política de Privacidad — Hazte Millonario',
  description: 'Cómo tratamos sus datos personales en Hazte Millonario.',
};

export default function PrivacidadPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-10 fade-in">
      <h1 className="font-display text-4xl text-gold-light font-bold">Política de Privacidad</h1>
      <p className="text-cream/50 text-sm mt-2">Última actualización: abril de 2026</p>

      <h2 className="font-display text-2xl text-cream mt-8">1. Qué datos recolectamos</h2>
      <ul className="text-cream/80 mt-3 leading-relaxed list-disc pl-6 space-y-2">
        <li>
          <strong className="text-cream">Datos de cuenta:</strong> nombre, correo electrónico,
          ciudad, estado, idioma de preferencia.
        </li>
        <li>
          <strong className="text-cream">Datos de pago:</strong> procesados íntegramente por
          Stripe. No almacenamos números de tarjetas en nuestros servidores.
        </li>
        <li>
          <strong className="text-cream">Datos de uso:</strong> páginas visitadas, combinaciones
          generadas, sueños interpretados, adivinanzas vistas. Se usan para mejorar la Plataforma
          y ofrecer funciones personalizadas.
        </li>
        <li>
          <strong className="text-cream">Datos técnicos:</strong> IP anonimizada (hashed), tipo
          de navegador, sistema operativo, para fines de analítica y seguridad.
        </li>
      </ul>

      <h2 className="font-display text-2xl text-cream mt-8">2. Para qué los usamos</h2>
      <ul className="text-cream/80 mt-3 leading-relaxed list-disc pl-6 space-y-2">
        <li>Operar la Plataforma y mantener su cuenta activa.</li>
        <li>Procesar suscripciones y pagos a través de Stripe.</li>
        <li>Enviar correos sobre su cuenta, alertas de jackpots (si los activa) o novedades importantes.</li>
        <li>Mejorar la Plataforma y detectar fraude o abusos.</li>
        <li>Cumplir con obligaciones legales aplicables.</li>
      </ul>

      <h2 className="font-display text-2xl text-cream mt-8">3. Con quién los compartimos</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        No vendemos sus datos. Los compartimos únicamente con:
      </p>
      <ul className="text-cream/80 mt-3 leading-relaxed list-disc pl-6 space-y-2">
        <li><strong className="text-cream">Supabase</strong> (base de datos y autenticación).</li>
        <li><strong className="text-cream">Vercel</strong> (hosting del sitio).</li>
        <li><strong className="text-cream">Stripe</strong> (procesamiento de pagos).</li>
        <li><strong className="text-cream">Resend / Postmark</strong> (correos transaccionales).</li>
        <li>Autoridades competentes cuando así lo exija la ley.</li>
      </ul>

      <h2 className="font-display text-2xl text-cream mt-8">4. Sus derechos</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Usted puede en cualquier momento:
      </p>
      <ul className="text-cream/80 mt-3 leading-relaxed list-disc pl-6 space-y-2">
        <li>Acceder a los datos que tenemos sobre usted.</li>
        <li>Corregir información desactualizada.</li>
        <li>Borrar su cuenta y sus datos asociados.</li>
        <li>Exportar sus datos en formato legible.</li>
        <li>Revocar el consentimiento para recibir correos.</li>
      </ul>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Para ejercer cualquiera de estos derechos, escríbanos a{' '}
        <a href="mailto:privacidad@haztemillonario.com" className="text-gold-light">
          privacidad@haztemillonario.com
        </a>.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">5. Cookies</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Usamos cookies estrictamente necesarias para mantener la sesión iniciada y cookies de
        analítica anónima. No usamos cookies de publicidad de terceros.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">6. Menores de edad</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Esta Plataforma está dirigida a mayores de 18 años. No recolectamos a sabiendas datos de
        menores. Si detectamos una cuenta de menor, la cerramos inmediatamente.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">7. Retención</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Conservamos sus datos mientras mantenga la cuenta activa. Tras la eliminación de la cuenta,
        borramos sus datos personales en un plazo de 30 días, salvo obligación legal de retención
        más larga (por ejemplo, registros fiscales).
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">8. Cambios</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Si actualizamos esta política, se lo notificaremos por correo o mediante aviso destacado
        en la Plataforma al menos 15 días antes de que entre en vigor.
      </p>
    </article>
  );
}
