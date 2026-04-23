export const metadata = {
  title: 'Términos y Condiciones — Hazte Millonario',
  description: 'Términos y condiciones de uso de la plataforma Hazte Millonario.',
};

export default function TerminosPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-10 fade-in prose prose-invert">
      <h1 className="font-display text-4xl text-gold-light font-bold">Términos y Condiciones</h1>
      <p className="text-cream/50 text-sm mt-2">Última actualización: abril de 2026</p>

      <h2 className="font-display text-2xl text-cream mt-8">1. Naturaleza de la plataforma</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Hazte Millonario ("la Plataforma", "nosotros") es una plataforma digital de contenido
        cultural y de entretenimiento centrada en la Charada Cubana, la interpretación tradicional
        de sueños, adivinanzas populares, y el análisis histórico de las loterías de Texas. El
        nombre "Hazte Millonario" es un nombre comercial aspiracional y cultural; <strong>no
        constituye una promesa de resultados económicos ni una garantía de ganancia en ningún
        juego de azar</strong>.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">2. Naturaleza de la lotería</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Los sorteos de la Texas Lottery y cualquier otra lotería son eventos estadísticamente
        independientes. Ningún análisis histórico, sistema de combinaciones, interpretación de
        sueños o herramienta de esta Plataforma puede predecir, pronosticar ni influir en el
        resultado de un sorteo futuro. El uso de nuestras herramientas no aumenta la probabilidad
        matemática de ganar.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">3. Mayoría de edad</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        La Plataforma está dirigida a personas mayores de 18 años. Para comprar boletos reales de
        la Texas Lottery es requisito legal tener 18 años o más. La Plataforma no vende boletos de
        lotería ni facilita su compra.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">4. Suscripciones</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Los planes Premium y Premium Plus se facturan mensualmente o anualmente. Usted puede
        cancelar la suscripción en cualquier momento desde la sección "Mi cuenta". La cancelación
        detiene renovaciones futuras; no genera reembolso automático del período ya facturado,
        salvo los siete días de prueba inicial.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">5. Uso permitido</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Usted se compromete a no utilizar la Plataforma para cometer fraude, lavado de dinero,
        actividades ilegales, extraer masivamente datos con fines comerciales, ni realizar
        ingeniería inversa del código. El contenido editorial y visual es propiedad de Hazte
        Millonario o sus licenciantes.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">6. Limitación de responsabilidad</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        En la máxima medida permitida por la ley, Hazte Millonario no será responsable por
        pérdidas económicas, daños morales o daños indirectos derivados del uso de la Plataforma
        o de decisiones que el usuario tome en base a la información aquí presentada. El usuario
        es el único responsable de su juego, sus finanzas y sus decisiones.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">7. Juego responsable</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Si el juego afecta su vida, su familia o sus finanzas, llame a la línea de ayuda
        1-800-GAMBLER (1-800-426-2537) o visite ncpgambling.org. En Texas: Texas Council on Problem
        Gambling, 1-800-742-0443.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">8. Cambios en los Términos</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Podemos actualizar estos Términos ocasionalmente. Las versiones previas se archivan y
        están disponibles bajo pedido. El uso continuado de la Plataforma después de la
        actualización implica aceptación de los nuevos Términos.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">9. Jurisdicción</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Estos Términos se rigen por las leyes del Estado de Texas, Estados Unidos. Cualquier
        disputa será resuelta en los tribunales del condado de Harris, Texas.
      </p>

      <h2 className="font-display text-2xl text-cream mt-8">10. Contacto</h2>
      <p className="text-cream/80 mt-3 leading-relaxed">
        Para preguntas sobre estos Términos, escríbanos a:{' '}
        <a href="mailto:hola@haztemillonario.com" className="text-gold-light">
          hola@haztemillonario.com
        </a>
      </p>
    </article>
  );
}
