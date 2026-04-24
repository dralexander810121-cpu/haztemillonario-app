import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const JUEGOS_TX = [
  { id: 'powerball',   url: 'https://www.txlottery.org/export/sites/lottery/Games/Powerball/Winning_Numbers/powerball.csv' },
  { id: 'mega',        url: 'https://www.txlottery.org/export/sites/lottery/Games/Mega_Millions/Winning_Numbers/megamillions.csv' },
  { id: 'lotto-tx',    url: 'https://www.txlottery.org/export/sites/lottery/Games/Lotto_Texas/Winning_Numbers/lotto.csv' },
  { id: 'two-step',    url: 'https://www.txlottery.org/export/sites/lottery/Games/Texas_Two_Step/Winning_Numbers/twostep.csv' },
  { id: 'pick3-day',   url: 'https://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/pick3.csv' },
  { id: 'daily4-day',  url: 'https://www.txlottery.org/export/sites/lottery/Games/Daily_4/Winning_Numbers/daily4.csv' },
];

async function obtenerUltimosSorteos(url) {
  try {
    const resp = await fetch(url, { next: { revalidate: 0 } });
    const texto = await resp.text();
    const lineas = texto.trim().split('\n').slice(1, 6);
    return lineas.map((linea) => {
      const cols = linea.split(',');
      return {
        fecha: cols[0]?.trim(),
        numeros: cols.slice(1, 6).map(n => parseInt(n?.trim())).filter(n => !isNaN(n)),
        numero_extra: parseInt(cols[6]?.trim()) || null,
        multiplier: cols[7]?.trim() || null,
      };
    }).filter(s => s.fecha && s.numeros.length > 0);
  } catch (err) {
    console.error('Error obteniendo sorteos:', err);
    return [];
  }
}

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const supabase = supabaseAdmin();
  const resultados = [];

  for (const juego of JUEGOS_TX) {
    const sorteos = await obtenerUltimosSorteos(juego.url);
    for (const sorteo of sorteos) {
      const { error } = await supabase.from('sorteos').upsert({
        juego_id: juego.id,
        fecha: sorteo.fecha,
        numeros: sorteo.numeros,
        numero_extra: sorteo.numero_extra,
        multiplier: sorteo.multiplier,
      }, { onConflict: 'juego_id,fecha' });

      if (!error) resultados.push(`${juego.id} - ${sorteo.fecha}`);
    }
  }

  return NextResponse.json({
    mensaje: `Actualizados ${resultados.length} sorteos`,
    sorteos: resultados,
    timestamp: new Date().toISOString(),
  });
}
