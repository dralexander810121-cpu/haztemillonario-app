import { createClient } from '@/lib/supabase-server';
import CharadaClient from './CharadaClient';

export const revalidate = 3600;

export const metadata = {
  title: 'La Charada Cubana — Hazte Millonario',
  description:
    'Los 100 números de la Charada Cubana con su significado tradicional. Busca por nombre, sinónimo o número.',
};

export default async function CharadaPage() {
  const supabase = createClient();
  const { data: charada } = await supabase
    .from('charada')
    .select('numero, titulo, palabras_clave, significado_corto, significado_sueno, categoria, imagen_emoji, es_popular')
    .order('numero', { ascending: true });

  return <CharadaClient items={charada || []} />;
}
