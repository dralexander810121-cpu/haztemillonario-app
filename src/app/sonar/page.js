import { createClient } from '@/lib/supabase-server';
import SonarClient from './SonarClient';

export const metadata = {
  title: 'Interpreta tus sueños — Hazte Millonario',
  description:
    'Cuéntanos tu sueño y te diremos los números de la charada cubana asociados según la tradición.',
};

export const revalidate = 3600;

export default async function SonarPage() {
  const supabase = createClient();
  const { data: charada } = await supabase
    .from('charada')
    .select('numero, titulo, palabras_clave, significado_sueno, imagen_emoji')
    .order('numero', { ascending: true });

  return <SonarClient charada={charada || []} />;
}
