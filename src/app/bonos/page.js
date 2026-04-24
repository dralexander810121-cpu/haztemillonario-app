'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';

const PAQUETES = [
  { cantidad: 10,  bonos: 100,  precio: '$10',  color: 'from-blue-900/60 to-blue-950',     borde: 'border-blue-500/30',   emoji: '🎟️', popular: false },
  { cantidad: 25,  bonos: 275,  precio: '$25',  color: 'from-green-900/60 to-green-950',   borde: 'border-green-500/30',  emoji: '🍀', popular: false },
  { cantidad: 50,  bonos: 600,  precio: '$50',  color: 'from-gold/20 to-yellow-950',       borde: 'border-gold/40',       emoji: '⭐', popular: true },
  { cantidad: 100, bonos: 1300, precio: '$100', color: 'from-purple-900/60 to-purple-950', borde: 'border-purple-500/30', emoji: '👑', popular: false },
];

const CHARADA = {
  1: 'Caballo', 2: 'Mariposa', 3: 'Marinero', 4: 'Gato', 5: 'Monja',
  6: 'Jicotea', 7: 'Caracol', 8: 'Muerto', 9: 'Elefante', 10: 'Pescado',
  11: 'Gallo', 12: 'Ramera', 13: 'Pavo', 14: 'Tigre', 15: 'Perro',
  16: 'Toro', 17: 'Luna', 18: 'Pescado chico', 19: 'Cocodrilo', 20: 'Gata',
  21: 'Sierpe', 22: 'Sapo', 23: 'Vapor', 24: 'Paloma', 25: 'Piedra fina',
  26: 'Avispa', 27: 'Bibijagua', 28: 'Chivo', 29: 'Rata', 30: 'Camaron',
  31: 'Venado', 32: 'Cochino', 33: 'Araña', 34: 'Mono', 35: 'Aura tinosa',
  36: 'Jicotea chica', 37: 'Gallina', 38: 'Jutia', 39: 'Caiman', 40: 'Mulo',
  41: 'Lizard', 42: 'Pato', 43: 'Soldado', 44: 'Aguila', 45: 'Cangrejo',
  46: 'Burro', 47: 'Puerco', 48: 'Cucaracha', 49: 'Borracho', 50: 'Policia',
  51: 'Tiburon', 52: 'Carnero', 53: 'Trampa', 54: 'Alacran', 55: 'Lombriz',
  56: 'Muerto parado', 57: 'Joven', 58: 'Vieja', 59: 'Canguro', 60: 'Sol',
  61: 'Ranita', 62: 'Tomate', 63: 'Jorobado', 64: 'Mujer en cama', 65: 'Cazador',
  66: 'Tigre chico', 67: 'Pulpo', 68: 'Conejo', 69: 'Tren', 70: 'Osito',
  71: 'Torero', 72: 'Anguila', 73: 'Teatro', 74: 'Palma', 75: 'Piña',
  76: 'Abejon', 77: 'Catibias', 78: 'Guanajo', 79: 'Pez espada', 80: 'Estaca',
  81: 'Medico', 82: 'Funeral', 83: 'Tuna', 84: 'Bicicleta', 85: 'Jardinero',
  86: 'Leon', 87: 'Aura', 88: 'Espejo', 89: 'Televisor', 90: 'Elefante viejo',
  91: 'Tranvia', 92: 'Dinero', 93: 'Revolucion', 94: 'Avion', 95: 'Flores',
  96: 'Roca', 97: 'Perico', 98: 'Borracho viejo', 99: 'Inodoro', 100: 'Toilette',
};

export default function BonosPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [comprando, setComprando] = useState(null);
  const [numeroSeleccionado, setNumeroSeleccionado] = useState('');
  const [jugando, setJugando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [tab, setTab] = useState('bolita');

  useEffect(() => {
    const cargar = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/'); return; }
      setUserId(user.id);
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setPerfil(prof);
      const { data: hist } = await supabase
        .from('bolita_jugadas')
        .select('*')
        .eq('usuario_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      setHistorial(hist || []);
      setCargando(false);
    };
    cargar();
  }, [router]);

  const comprarBonos = async (paquete) => {
    setComprando(paquete.cantidad);
    try {
      const resp = await fetch('/api/bonos/comprar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, cantidad: paquete.cantidad }),
      });
      const data = await resp.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error || 'Error al procesar');
    } catch (err) {
      alert('Error al conectar con el servidor');
    }
    setComprando(null);
  };

  const jugarBolita = async () => {
    const num = parseInt(numeroSeleccionado);
    if (!num || num < 1 || num > 100) { alert('Elige un numero del 1 al 100'); return; }
    if ((perfil?.bonos || 0) < 10) { alert('Necesitas al menos 10 bonos para jugar'); return; }
    setJugando(true);
    setResultado(null);
    try {
      const resp = await fetch('/api/bolita/jugar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, numero: num }),
      });
      const data = await resp.json();
      setResultado(data);
      setPerfil((prev) => ({ ...prev, bonos: data.bonosActuales }));
      const supabase = createClient();
      const { data: hist } = await supabase
        .from('bolita_jugadas')
        .select('*')
        .eq('usuario_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);
      setHistorial(hist || []);
    } catch (err) {
      alert('Error al jugar');
    }
    setJugando(false);
  };

  if (cargando) return <div className="min-h-screen flex items-center justify-center text-cream/60">Cargando...</div>;

  return (
    <div className="fade-in max-w-6xl mx-auto px-4 md:px-8 py-10">

      <div className="text-center mb-10">
        <div className="ornament mb-3 text-gold/60">◆ ◆ ◆</div>
        <h1 className="font-display text-5xl text-gold-light font-black">Bonos y Bolita Cubana</h1>
        <p className="text-cream/60 mt-3 text-lg">Compra bonos, juega la bolita y gana mas bonos</p>
        <div className="inline-block mt-4 px-6 py-3 rounded-xl bg-gold/20 border border-gold/40">
          <span className="text-gold-light font-black text-2xl">{perfil?.bonos || 0}</span>
          <span className="text-cream/60 text-sm ml-2">bonos disponibles</span>
        </div>
      </div>

      <div className="flex gap-2 justify-center mb-8">
        {['bolita', 'comprar', 'canjear', 'historial'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition capitalize ${tab === t ? 'bg-gold text-ink' : 'bg-cream/10 text-cream/70 hover:bg-cream/20'}`}
          >
            {t === 'bolita' ? 'Jugar Bolita' : t === 'comprar' ? 'Comprar Bonos' : t === 'canjear' ? 'Canjear Bonos' : 'Historial'}
          </button>
        ))}
      </div>

      {tab === 'bolita' && (
        <div className="max-w-2xl mx-auto">
          <div className="card p-8">
            <h2 className="font-display text-3xl text-gold-light font-black mb-2">La Bolita Cubana</h2>
            <p className="text-cream/60 text-sm mb-6">
              Elige un numero del 1 al 100. Cuesta <strong className="text-gold-light">10 bonos</strong>.
              Si sale el numero fijo en la loteria de Miami, ganas <strong className="text-gold-light">200 bonos</strong>.
            </p>

            <div className="grid grid-cols-10 gap-1.5 mb-6">
              {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setNumeroSeleccionado(n.toString())}
                  className={`aspect-square rounded-lg text-xs font-bold transition ${
                    parseInt(numeroSeleccionado) === n
                      ? 'bg-gold text-ink scale-110'
                      : 'bg-cream/10 text-cream/70 hover:bg-cream/20'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {numeroSeleccionado && (
              <div className="text-center mb-4">
                <span className="text-cream/60 text-sm">Numero elegido: </span>
                <span className="text-gold-light font-black text-xl">{numeroSeleccionado}</span>
                <span className="text-cream/50 text-sm ml-2">— {CHARADA[parseInt(numeroSeleccionado)]}</span>
              </div>
            )}

            <button
              onClick={jugarBolita}
              disabled={jugando || !numeroSeleccionado}
              className="w-full py-4 bg-gold text-ink rounded-xl font-black text-lg hover:bg-gold-light transition disabled:opacity-50"
            >
              {jugando ? 'Jugando...' : `Jugar 10 bonos al numero ${numeroSeleccionado || '?'}`}
            </button>

            {resultado && (
              <div className={`mt-6 p-6 rounded-xl text-center ${resultado.gano ? 'bg-green-900/30 border-2 border-green-500' : 'bg-red-900/20 border border-red-500/30'}`}>
                {resultado.gano ? (
                  <>
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="font-display text-3xl text-green-400 font-black">GANASTE!</div>
                    <div className="text-cream/80 mt-2">El numero fue <strong>{resultado.numeroGanador}</strong> — {CHARADA[resultado.numeroGanador]}</div>
                    <div className="text-green-400 font-bold mt-2">+{resultado.bonosGanados} bonos</div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-2">😔</div>
                    <div className="font-display text-2xl text-cream font-black">Esta vez no fue</div>
                    <div className="text-cream/60 mt-2">Jugaste el <strong>{resultado.numeroJugado}</strong>, salio el <strong>{resultado.numeroGanador}</strong> — {CHARADA[resultado.numeroGanador]}</div>
                    <div className="text-red-400 font-bold mt-2">-10 bonos</div>
                  </>
                )}
                <div className="text-cream/50 text-sm mt-3">Bonos actuales: {resultado.bonosActuales}</div>
              </div>
            )}
          </div>

          <div className="mt-6 card p-5 bg-gold/5 border-gold/20">
            <h3 className="font-display text-lg text-gold-light font-bold mb-2">Como funciona</h3>
            <ul className="text-cream/60 text-sm space-y-1">
              <li>• Cada jugada cuesta <strong className="text-cream">10 bonos</strong></li>
              <li>• El numero ganador se basa en la <strong className="text-cream">loteria de Miami</strong></li>
              <li>• Si aciertas el numero exacto ganas <strong className="text-cream">200 bonos</strong></li>
              <li>• Los bonos se pueden canjear por dias Premium y descuentos</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'comprar' && (
        <div>
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl text-cream font-bold">Comprar Bonos</h2>
            <p className="text-cream/60 mt-2">Mas bonos compras, mas recibes</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAQUETES.map((p) => (
              <div key={p.cantidad} className={`relative rounded-xl p-6 bg-gradient-to-br ${p.color} border ${p.borde} ${p.popular ? 'ring-2 ring-gold' : ''}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink text-xs font-black px-3 py-1 rounded-full">
                    MAS POPULAR
                  </div>
                )}
                <div className="text-3xl mb-2">{p.emoji}</div>
                <div className="font-display text-3xl text-white font-black">{p.precio}</div>
                <div className="text-white/80 font-bold mt-1">{p.bonos} bonos</div>
                <div className="text-white/50 text-xs mt-1">${(p.cantidad / p.bonos).toFixed(2)} por bono</div>
                <button
                  onClick={() => comprarBonos(p)}
                  disabled={comprando === p.cantidad}
                  className="w-full mt-4 py-2.5 bg-white text-ink rounded-lg font-bold hover:bg-cream transition disabled:opacity-50 text-sm"
                >
                  {comprando === p.cantidad ? 'Procesando...' : `Comprar ${p.bonos} bonos`}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-cream/40 text-xs mt-6">
            Pagos seguros con Stripe. Los bonos no tienen valor monetario y se usan solo dentro de la app.
          </p>
        </div>
      )}

      {tab === 'canjear' && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl text-cream font-bold">Canjear Bonos</h2>
            <p className="text-cream/60 mt-2">Tienes <strong className="text-gold-light">{perfil?.bonos || 0} bonos</strong></p>
          </div>
          <div className="space-y-4">
            {[
              { titulo: '1 dia Premium gratis', costo: 100, emoji: '🎁', desc: 'Extiende tu acceso Premium por 1 dia' },
              { titulo: '7 dias Premium gratis', costo: 600, emoji: '👑', desc: 'Una semana completa de acceso Premium' },
              { titulo: '1 mes Premium gratis', costo: 2000, emoji: '🏆', desc: 'Un mes completo sin pagar' },
              { titulo: 'Descuento 50% en Premium', costo: 500, emoji: '💎', desc: 'Obtén un codigo de descuento del 50%' },
            ].map((item) => (
              <div key={item.titulo} className="card p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <div className="text-cream font-bold">{item.titulo}</div>
                    <div className="text-cream/50 text-xs mt-0.5">{item.desc}</div>
                  </div>
                </div>
                <button
                  disabled={(perfil?.bonos || 0) < item.costo}
                  className="px-4 py-2 rounded-lg bg-gold text-ink font-bold text-sm hover:bg-gold-light transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap ml-4"
                >
                  {item.costo} bonos
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'historial' && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl text-cream font-bold">Historial de jugadas</h2>
          </div>
          {historial.length === 0 ? (
            <div className="text-center text-cream/50 py-10">No has jugado todavia</div>
          ) : (
            <div className="space-y-3">
              {historial.map((j) => (
                <div key={j.id} className={`card p-4 flex items-center justify-between ${j.gano ? 'border-green-500/30 bg-green-900/10' : ''}`}>
                  <div>
                    <div className="text-cream font-bold">
                      Jugaste el {j.numero} — {CHARADA[j.numero]}
                    </div>
                    <div className="text-cream/50 text-xs mt-0.5">
                      Salio el {j.resultado} — {CHARADA[j.resultado]}
                    </div>
                    <div className="text-cream/40 text-xs mt-0.5">
                      {new Date(j.created_at).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                  <div className={`font-black text-lg ${j.gano ? 'text-green-400' : 'text-red-400'}`}>
                    {j.gano ? `+${j.bonos_ganados}` : '-10'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/dashboard" className="text-gold-light/60 hover:text-gold-light text-sm underline transition">
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
