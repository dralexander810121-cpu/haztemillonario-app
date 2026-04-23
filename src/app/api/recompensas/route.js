import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const RECOMPENSAS_VALIDAS = [
  'compartir',
  'valorar',
  'facebook',
  'instagram',
  'tiktok',
  'youtube',
  'referido',
];

export async function POST(request) {
  try {
    const { userId, accion } = await request.json();

    if (!userId || !accion) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    if (!RECOMPENSAS_VALIDAS.includes(accion)) {
      return NextResponse.json({ error: 'Accion no valida' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: perfil } = await supabase
      .from('profiles')
      .select('recompensas_completadas, premium_hasta, es_premium, plan')
      .eq('id', userId)
      .single();

    if (!perfil) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const recompensas = perfil.recompensas_completadas || [];

    if (recompensas.includes(accion)) {
      return NextResponse.json({ mensaje: 'Ya completaste esta accion', yaCompletada: true });
    }

    const nuevasRecompensas = [...recompensas, accion];

    const ahora = new Date();
    const baseDate = perfil.premium_hasta && new Date(perfil.premium_hasta) > ahora
      ? new Date(perfil.premium_hasta)
      : ahora;

    baseDate.setDate(baseDate.getDate() + 1);

    await supabase
      .from('profiles')
      .update({
        recompensas_completadas: nuevasRecompensas,
        premium_hasta: baseDate.toISOString(),
        es_premium: true,
        plan: perfil.plan === 'free' ? 'premium' : perfil.plan,
      })
      .eq('id', userId);

    return NextResponse.json({
      mensaje: 'Recompensa acreditada',
      diasGanados: 1,
      totalRecompensas: nuevasRecompensas.length,
      premiumHasta: baseDate.toISOString(),
    });

  } catch (error) {
    console.error('Error en recompensas:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
