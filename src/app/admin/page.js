'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

const ADMIN_EMAIL = 'dralexander810121@gmail.com';

export default function AdminPage() {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [numero, setNumero] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [ultimos, setUltimos] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/');
        return;
      }
      setAutorizado(true);

      const { data: sorteos } = await supabase
        .from('sorteos')
        .select('fecha, numeros')
        .eq('juego_id', 'miami')
        .order('fecha', { ascending: false })
        .limit(10);
      setUltimos(sorteos || []);

      const { count: totalUsuarios } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: totalPremium } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('es_premium', true);

      const { count: totalJugadas } = await supabase
        .from('bolita_jugadas')
        .select('*', { count: 'exact', head: true });

      const { data: bonosData } = await supabase
        .from('bonos_transacciones')
        .select('cantidad')
        .eq('tipo', 'compra_bonos');

      const totalBonos = bonosData?.reduce((sum, t) => sum + t.cantidad, 0) || 0;

      setStats({ totalUsuarios, totalPremium, totalJugadas, totalBonos });
      setCargando(false);
    };
    cargar();
  }, [router]);

  const guardarNumero = async () => {
    const num = parseInt(numero);
    if (!num || num < 1 || num > 100) {
      setMensaje('El numero debe ser del 1 al 100');
      return;
    }
    setGuardando(true);
    try {
      const supabase = createClient();

      const { error } = await supabase.from('sorteos').upsert({
        juego_id: 'miami',
        fecha,
        numeros: [num],
        hora_sorteo: '20:00:00',
      }, { onConflict: 'juego_id,fecha' });

      if (error) throw error;

      // Verificar jugadas ganadoras de ese dia
      const { data: jugadas } = await supabase
        .from('bolita_jugadas')
        .select('*')
        .eq('numero', num)
        .is('resultado', null);

      if (jugadas && jugadas.length > 0) {
        for (const jugada of jugadas) {
          await supabase.from('bolita_jugadas').update({
            resultado: num,
            gano: true,
            bonos_ganados: 200,
          }).eq('id', jugada.id);

          const { data: perfil } = await supabase
            .from('profiles')
            .select('bonos')
            .eq('id', jugada.usuario_id)
            .single();

          if (perfil) {
            await supabase.from('profiles').update({
              bonos: (perfil.bonos || 0) + 200,
            }).eq('id', jugada.usuario_id);

            await supabase.from('bonos_transacciones').insert({
              usuario_id: jugada.usuario_id,
              tipo: 'ganancia_bolita',
              cantidad: 200,
              descripcion: `Ganaste la bolita! Numero ${num}`,
            });
          }
        }
        setMensaje(`Numero ${num} guardado. ${jugadas.length} ganadores premiados con 200 bonos cada uno!`);
      } else {
        setMensaje(`Numero ${num} guardado para el ${fecha}. No hubo ganadores hoy.`);
      }

      const { data: sorteos } = await supabase
        .from('sorteos')
        .select('fecha, numeros')
        .eq('juego_id', 'miami')
        .order('fecha', { ascending: false })
        .limit(10);
      setUltimos(sorteos || []);
      setNumero('');
    } catch (err) {
      setMensaje('Error: ' + err.message);
    }
    setGuardando(false);
    setTimeout(() => setMensaje(''), 5000);
  };

  if (cargando) return <div className="min-h-screen flex items-center justify-center text-cream/60">Cargando...</div>;
  if (!autorizado) return null;

  return (
    <div className="fade-in max-w-4xl mx-auto px-4 md:px-8 py-10">
      <div className="text-center mb-10">
        <div className="ornament mb-3 text-gold/60">◆ ◆ ◆</div>
        <h1 className="font-display text-4xl text-gold-light font-black">Panel de Admin</h1>
        <p className="text-cream/60 mt-2">Solo para el Dr. Alexander Figueredo</p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Usuarios totales', valor: stats.totalUsuarios, emoji: '👥' },
            { label: 'Usuarios Premium', valor: stats.totalPremium, emoji: '👑' },
            { label: 'Jugadas de bolita', valor: stats.totalJugadas, emoji: '🎰' },
            { label: 'Bonos vendidos', valor: stats.totalBonos, emoji: '🎟️' },
          ].map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <div className="text-3xl mb-2">{s.emoji}</div>
              <div className="font-display text-3xl text-gold-light font-black">{s.valor || 0}</div>
              <div className="text-cream/50 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="card p-8 mb-8">
        <h2 className="font-display text-2xl text-gold-light font-bold mb-6">Numero de la Bolita Miami de hoy</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-cream/60 text-sm mb-2">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-ink-lighter/60 border border-cream/20 text-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex-1">
            <label className="block text-cream/60 text-sm mb-2">Numero ganador (1-100)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-ink-lighter/60 border border-cream/20 text-cream focus:outline-none focus:border-gold text-2xl font-black"
              placeholder="Ej: 47"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={guardarNumero}
              disabled={guardando || !numero}
              className="w-full sm:w-auto px-8 py-3 bg-gold text-ink rounded-lg font-black text-lg hover:bg-gold-light transition disabled:opacity-50"
            >
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>

        {mensaje && (
          <div className={`mt-4 p-4 rounded-lg font-bold ${mensaje.includes('Error') ? 'bg-red-900/20 text-red-400 border border-red-500/30' : 'bg-green-900/20 text-green-400 border border-green-500/30'}`}>
            {mensaje}
          </div>
        )}
      </div>

      <div className="card p-8">
        <h2 className="font-display text-2xl text-gold-light font-bold mb-6">Ultimos numeros de Miami</h2>
        {ultimos.length === 0 ? (
          <p className="text-cream/50">No hay numeros registrados todavia</p>
        ) : (
          <div className="space-y-3">
            {ultimos.map((s) => (
              <div key={s.fecha} className="flex items-center justify-between py-3 border-b border-cream/10">
                <span className="text-cream/60">{new Date(s.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="font-display text-3xl text-gold-light font-black">{s.numeros?.[0]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
