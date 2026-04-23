import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Hazte Millonario — Lotería, Tradición y Análisis',
  description:
    'El hogar digital de la Charada Cubana. Resultados de la lotería de Texas en tiempo real, interpretador de sueños, adivinanzas y análisis histórico.',
  keywords: [
    'charada cubana', 'loteria texas', 'powerball', 'mega millions',
    'lotto texas', 'charada', 'sueños', 'adivinanzas', 'cuba'
  ],
  openGraph: {
    title: 'Hazte Millonario',
    description: 'Lotería, Tradición y Análisis. El hogar digital de la Charada Cubana.',
    url: 'https://haztemillonario.com',
    siteName: 'Hazte Millonario',
    locale: 'es_US',
    type: 'website',
  },
  metadataBase: new URL('https://haztemillonario.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-body min-h-screen bg-ink text-cream antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
