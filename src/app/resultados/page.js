import { createClient } from '@/lib/supabase-server';
import ResultadosClient from './ResultadosClient';

export const metadata = {
  title: 'Resultados de la Texas Lottery — Hazte Millonario',
  description:
    'Resultados oficiales de Powerball, Mega Millions, Lotto Texas, Texas Two Step, Cash Five, Pick 3, Daily 4 y All or Nothing. Actualizados diariamente.',
};

export const revalidate = 300; // 5 min

export default async function ResultadosPage() {
  const supabase = createClient();

  const { data: juegos } = await supabase
    .from('juegos')
    .select('*')
    .eq('activo', true)
    .order('orden', { ascending: true });

  // Últimos 5 sorteos de cada juego
  const sorteos = {};
  for (const j of juegos || []) {
    const { data } = await supabase
      .from('sorteos')
      .select('fecha, hora_sorteo, numeros, numero_extra, multiplier')
      .eq('juego_id', j.id)
      .order('fecha', { ascending: false })
      .order('hora_sorteo', { ascending: false })
      .limit(10);
    sorteos[j.id] = data || [];
  }

  return <ResultadosClient juegos={juegos || []} sorteos={sorteos} />;
}
