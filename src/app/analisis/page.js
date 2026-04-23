import { createClient } from '@/lib/supabase-server';
import AnalisisClient from './AnalisisClient';

export const metadata = {
  title: 'Panel analítico — Hazte Millonario',
  description:
    'Análisis histórico de frecuencias de las loterías de Texas. Herramienta cultural y de entretenimiento.',
};

export const revalidate = 3600;

export default async function AnalisisPage() {
  const supabase = createClient();

  // Cuenta total de sorteos
  const { count: totalSorteos } = await supabase
    .from('sorteos')
    .select('*', { count: 'exact', head: true });

  // Sorteos de Lotto Texas para calcular frecuencias
  const { data: sorteosRecientes } = await supabase
    .from('sorteos')
    .select('numeros')
    .eq('juego_id', 'lotto-tx')
    .order('fecha', { ascending: false })
    .limit(500);

  // Calcular frecuencias
  const freqMap = {};
  for (let n = 1; n <= 54; n++) freqMap[n] = 0;
  (sorteosRecientes || []).forEach((s) => {
    (s.numeros || []).forEach((n) => {
      if (freqMap[n] !== undefined) freqMap[n]++;
    });
  });
  const frecuencias = Object.entries(freqMap).map(([num, veces]) => ({
    num: parseInt(num),
    veces,
  }));

  return (
    <AnalisisClient
      totalSorteos={totalSorteos || 0}
      frecuencias={frecuencias}
      sorteosAnalizados={sorteosRecientes?.length || 0}
    />
  );
}
