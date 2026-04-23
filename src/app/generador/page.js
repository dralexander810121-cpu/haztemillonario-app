import { createClient } from '@/lib/supabase-server';
import GeneradorClient from './GeneradorClient';

export const metadata = {
  title: 'Generador de combinaciones — Hazte Millonario',
  description:
    'Genera combinaciones de lotería a partir de tus sueños, fechas importantes o modo poco jugado.',
};

export const revalidate = 3600;

export default async function GeneradorPage() {
  const supabase = createClient();
  const { data: juegos } = await supabase
    .from('juegos')
    .select('id, nombre, numeros_principales, rango_principal, numeros_extra, rango_extra')
    .eq('activo', true)
    .order('orden', { ascending: true });
  const { data: charada } = await supabase
    .from('charada')
    .select('numero, titulo, palabras_clave')
    .order('numero', { ascending: true });

  return <GeneradorClient juegos={juegos || []} charada={charada || []} />;
}
