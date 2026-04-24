'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';

const REDES = [
  { nombre: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61564686726811', bg: 'bg-blue-600 hover:bg-blue-500', emoji: '📘', accion: 'facebook' },
  { nombre: 'Instagram', href: 'https://www.instagram.com/haztemillonario2026/',          bg: 'bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90', emoji: '📸', accion: 'instagram' },
  { nombre: 'TikTok',    href: 'https://www.tiktok.com/@haztemillonario2026',              bg: 'bg-zinc-900 hover:bg-zinc-800 border border-white/20', emoji: '🎵', accion: 'tiktok' },
  { nombre: 'YouTube',   href: 'https://www.youtube.com/@haztemillonario-k7p',             bg: 'bg-red-600 hover:bg-red-500', emoji: '▶️', accion: 'youtube' },
];

const LOTERIAS = [
  { nombre: 'Powerball',      emoji: '🔴', sorteo: 'Lun Mier Sab', href: '/resultados?juego=powerball' },
  { nombre: 'Mega Millions',  emoji: '💛', sorteo: 'Mar Vier',      href: '/resultados?juego=megamillions' },
  { nombre: 'Lotto Texas',    emoji: '⭐', sorteo: 'Mier Sab',      href: '/resultados?juego=lotto' },
  { nombre: 'Texas Two Step', emoji: '🤠', sorteo: 'Lun Jue',       href: '/resultados?juego=twostep' },
  { nombre: 'Pick 3',         emoji: '🎯', sorteo: 'Todos los dias',href: '/resultados?juego=pick3' },
  { nombre: 'Daily 4',        emoji: '🎰', sorteo: 'Todos los dias',href: '/resultados?juego=daily4' },
];

const RASPADITOS = [
  { precio: '$1',   color: 'from-blue-900/60 to-blue-950',     borde: 'border-blue-500/30',   emoji: '🎟️', nombre: 'Lucky Lines',   premio: 'Hasta $500' },
  { precio: '$2',   color: 'from-green-900/60 to-green-950',   borde: 'border-green-500/30',  emoji: '🍀', nombre: 'Gold Rush',     premio: 'Hasta $2,500' },
  { precio: '$5',   color: 'from-yellow-900/60 to-yellow-950', borde: 'border-yellow-500/30', emoji: '⭐', nombre: 'Texas Riches',  premio: 'Hasta $50,000' },
  { precio: '$10',  color: 'from-orange-900/60 to-orange-950', borde: 'border-orange-500/30', emoji: '🔥', nombre: 'Mega Cash',     premio: 'Hasta $100,000' },
  { precio: '$20',  color: 'from-red-900/60 to-red-950',       borde: 'border-red-500/30',    emoji: '💎', nombre: 'Diamond 7s',   premio: 'Hasta $500,000' },
  { precio: '$50',  color: 'from-purple-900/60 to-purple-950', borde: 'border-purple-500/30', emoji: '👑', nombre: 'Millionaire',  premio: 'Hasta $1,000,000' },
  { precio: '$100', color: 'from-yellow-800/40 to-yellow-950', borde: 'border-yellow-400/40', emoji: '🏆', nombre: 'Ultimate Gold',premio: 'Hasta $5,000,000' },
];

const CIUDADES = [
  { nombre: 'Houston',     desc: 'La ciudad de los grandes jackpots',  img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { nombre: 'Dallas',      desc: 'Donde los suenos se hacen realidad', img: 'https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&q=80' },
  { nombre: 'Austin',      desc: 'Capital del entretenimiento texano', img: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=600&q=80' },
  { nombre: 'San Antonio', desc: 'Tradicion y suerte en cada jugada',  img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const [recompensas, setRecompensas] = useState([]);
  const [estrellas, setEstrellas] = useState(0);
  const [mensajeRecompensa, setMensajeRecompensa] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/'); return; }
      setUserId(user.id);
      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setPerfil(prof);
      setRecompensas(prof?.recompensas_completadas || []);
      setCargando(false);
      if (prof?.trial_started_at) {
        const restante = 3600000 - (Date.now() - new Date(prof.trial_started_at).getTime());
        if (restante > 0) setTiempoRestante(restante);
      }
    };
    cargar();
  }, [router]);

  useEffect(() => {
    if (!tiempoRestante) return;
    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => prev <= 1000 ? 0 : prev - 1000);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  const formatTiempo = (ms) => {
    if (!ms || ms <= 0) return null;
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const acreditarRecompensa = async (accion) => {
    if (recompensas.includes(accion)) {
      setMensajeRecompensa('Ya completaste esta accion anteriormente');
      setTimeout(() => setMensajeRecompensa(''), 3000);
      return;
    }
    try {
      const resp = await fetch('/api/recompensas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, accion }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setRecompensas((prev) => [...prev, accion]);
        setMensajeRecompensa('Ganaste 1 dia Premium gratis!');
        setTimeout(() => setMensajeRecompensa(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const compartir = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Hazte Millonario',
        text: 'La mejor app de loteria cubana y de Texas. Registrate gratis!',
        url: 'https://haztemillonario.com',
      });
    } else {
      window.open('https://wa.me/?text=Registrate%20gratis%20en%20haztemillonario.com', '_blank');
    }
    acreditarRecompensa('compartir');
  };

  const abrirRed = (red) => {
    window.open(red.href, '_blank');
    setTimeout(() => acreditarRecompensa(red.accion), 2000);
  };

  if (cargando) return <div className="min-h-screen flex items-center justify-center text-cream/60 text-lg">Cargando...</div>;

  const nombre = perfil?.nombre || 'amigo';
  const plan = perfil?.plan || 'free';
  const esPremium = perfil?.es_premium || false;
  const esAdmin = perfil?.email === 'dralexander810121@gmail.com';
  const tiempo = formatTiempo(tiempoRestante);
  return (
    <div className="fade-in">

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=1600&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 to-ink" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="ornament mb-2 text-gold/60 text-sm">◆ ◆ ◆</div>
              <h1 className="font-display text-4xl md:text-5xl text-gold-light font-black">Bienvenido, {nombre}!</h1>
              <p className="text-cream/60 mt-2">Plan: <span className={`font-bold ${esPremium ? 'text-gold-light' : 'text-cream/80'}`}>{plan === 'free' ? 'Gratis' : plan === 'premium' ? 'Premium' : 'Premium Plus'}</span></p>
              {perfil?.bonos > 0 && (
                <p className="text-cream/60 mt-1">Bonos: <span className="text-gold-light font-bold">{perfil.bonos}</span></p>
              )}
            </div>
            {tiempo && (
              <div className="card px-6 py-4 bg-gold/10 border-gold/40 text-center">
                <div className="text-cream/60 text-xs mb-1">Tiempo gratis restante</div>
                <div className="font-display text-4xl text-gold-light font-black">{tiempo}</div>
                <div className="text-cream/50 text-xs mt-1">minutos de acceso total</div>
              </div>
            )}
            {!tiempo && !esPremium && (
              <div className="card px-6 py-4 bg-wine/20 border-wine/40 text-center">
                <div className="text-cream/60 text-xs mb-2">Tu hora gratis termino</div>
                <Link href="/premium" className="inline-block px-4 py-2 bg-gold text-ink rounded-md font-bold text-sm hover:bg-gold-light transition">Hazte Premium</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {mensajeRecompensa && (
        <div className="fixed top-6 right-6 z-50 bg-gold text-ink px-6 py-3 rounded-xl font-bold shadow-2xl animate-bounce">
          {mensajeRecompensa}
        </div>
      )}

      {!esPremium && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          <div className="card p-6 bg-gradient-to-r from-gold/10 to-wine/10 border-gold/30">
            <h2 className="font-display text-2xl text-gold-light font-bold mb-1">Gana 7 dias Premium gratis</h2>
            <p className="text-cream/60 text-sm mb-5">Cada accion te da 1 dia. Completa las 7 y tienes una semana entera.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div onClick={compartir} className={`card p-3 text-center transition cursor-pointer ${recompensas.includes('compartir') ? 'border-gold/60 bg-gold/10' : 'hover:border-gold/40'}`}>
                <div className="text-2xl mb-1">📲</div>
                <div className="text-gold-light font-black text-sm">+1 dia</div>
                <div className="text-cream/60 text-xs mt-0.5">Compartir</div>
                {recompensas.includes('compartir') && <div className="text-green-400 text-xs mt-1">✓ Listo</div>}
              </div>
              <div onClick={() => { if (estrellas === 5 && !recompensas.includes('valorar')) { acreditarRecompensa('valorar'); } }} className={`card p-3 text-center transition cursor-pointer ${recompensas.includes('valorar') ? 'border-gold/60 bg-gold/10' : 'hover:border-gold/40'}`}>
                <div className="flex justify-center gap-0.5 mb-1">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} onClick={(e) => { e.stopPropagation(); setEstrellas(s); }} className={`text-lg cursor-pointer ${s <= estrellas ? 'text-gold-light' : 'text-cream/20'}`}>★</span>
                  ))}
                </div>
                <div className="text-gold-light font-black text-sm">+1 dia</div>
                <div className="text-cream/60 text-xs mt-0.5">Valorar</div>
                {recompensas.includes('valorar') && <div className="text-green-400 text-xs mt-1">✓ Listo</div>}
                {estrellas === 5 && !recompensas.includes('valorar') && <div className="text-gold-light text-xs mt-1">Toca para confirmar</div>}
              </div>
              {REDES.map((r) => (
                <div key={r.accion} onClick={() => abrirRed(r)} className={`card p-3 text-center transition cursor-pointer ${recompensas.includes(r.accion) ? 'border-gold/60 bg-gold/10' : 'hover:border-gold/40'}`}>
                  <div className="text-2xl mb-1">{r.emoji}</div>
                  <div className="text-gold-light font-black text-sm">+1 dia</div>
                  <div className="text-cream/60 text-xs mt-0.5">{r.nombre}</div>
                  {recompensas.includes(r.accion) && <div className="text-green-400 text-xs mt-1">✓ Listo</div>}
                </div>
              ))}
              <div onClick={() => { const link = `https://haztemillonario.com/registro?ref=${userId}`; navigator.clipboard.writeText(link); setMensajeRecompensa('Link copiado! Comparte con tu amigo'); setTimeout(() => setMensajeRecompensa(''), 3000); }} className="card p-3 text-center hover:border-gold/40 transition cursor-pointer">
                <div className="text-2xl mb-1">🤝</div>
                <div className="text-gold-light font-black text-sm">+1 dia</div>
                <div className="text-cream/60 text-xs mt-0.5">Invitar amigo</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 bg-cream/10 rounded-full flex-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-500" style={{ width: `${(recompensas.length / 7) * 100}%` }} />
              </div>
              <span className="text-cream/60 text-xs">{recompensas.length}/7</span>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="text-center mb-8">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl text-cream font-bold">Loterias de Texas</h2>
          <p className="text-cream/60 mt-2">Resultados oficiales en tiempo real</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOTERIAS.map((l) => (
            <Link key={l.nombre} href={l.href} className="card p-6 hover:border-gold/40 transition group flex items-center gap-4">
              <span className="text-4xl">{l.emoji}</span>
              <div>
                <div className="font-display text-xl text-cream font-bold group-hover:text-gold-light transition">{l.nombre}</div>
                <div className="text-cream/50 text-xs mt-0.5">{l.sorteo}</div>
                <div className="text-gold-light/70 text-xs mt-1">Ver resultados</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="text-center mb-8">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl text-cream font-bold">Raspaditos Super Loteria</h2>
          <p className="text-cream/60 mt-2">Tickets disponibles · Premios · Como jugar</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {RASPADITOS.map((r) => (
            <Link key={r.precio} href="/raspaditos" className={`rounded-xl p-5 bg-gradient-to-br ${r.color} border ${r.borde} hover:scale-105 transition`}>
              <div className="text-3xl mb-2">{r.emoji}</div>
              <div className="font-display text-2xl text-white font-black">{r.precio}</div>
              <div className="text-white/80 text-sm font-bold mt-1">{r.nombre}</div>
              <div className="text-white/50 text-xs mt-2">{r.premio}</div>
              <div className="mt-3 text-xs text-white/60 border-t border-white/10 pt-2">Ver tickets</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="text-center mb-8">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl text-cream font-bold">Tus herramientas</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { titulo: 'Charada',     desc: 'La charada cubana completa',   emoji: '🀄', href: '/charada' },
            { titulo: 'Sonar',       desc: 'Interpreta tus suenos',        emoji: '🌙', href: '/sonar' },
            { titulo: 'Generador',   desc: 'Crea combinaciones ganadoras', emoji: '🎲', href: '/generador' },
            { titulo: 'Analisis',    desc: 'Estadisticas historicas',       emoji: '📊', href: '/analisis' },
            { titulo: 'Adivinanzas', desc: 'Cultura cubana en juego',       emoji: '🧩', href: '/adivinanzas' },
            { titulo: 'Resultados',  desc: 'Todos los sorteos',             emoji: '🎯', href: '/resultados' },
            { titulo: 'Bolita',      desc: 'Juega la bolita cubana',        emoji: '🎰', href: '/bonos' },
            { titulo: 'Mi cuenta',   desc: 'Perfil y suscripcion',          emoji: '👤', href: '/cuenta' },
            ...(esAdmin ? [{ titulo: 'Admin', desc: 'Panel de administracion', emoji: '⚙️', href: '/admin' }] : []),
          ].map((h) => (
            <Link key={h.titulo} href={h.href} className="card p-6 hover:border-gold/40 transition group text-center">
              <div className="text-4xl mb-3">{h.emoji}</div>
              <div className="font-display text-xl text-cream font-bold group-hover:text-gold-light transition">{h.titulo}</div>
              <div className="text-cream/50 text-xs mt-2">{h.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="text-center mb-8">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-4xl text-cream font-bold">Texas te esta esperando</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CIUDADES.map((c) => (
            <div key={c.nombre} className="relative rounded-xl overflow-hidden group h-48">
              <img src={c.img} alt={c.nombre} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-display text-xl text-white font-bold">{c.nombre}</div>
                <div className="text-cream/70 text-xs mt-0.5">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-8">
          <div className="ornament mb-2 text-gold/60">◆ ◆ ◆</div>
          <h2 className="font-display text-3xl text-cream font-bold">Siguenos y gana dias gratis</h2>
          <p className="text-cream/60 mt-2">Numeros ganadores y charada todos los dias</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REDES.map((r) => (
            <button key={r.nombre} onClick={() => abrirRed(r)} className={`flex flex-col items-center gap-3 p-6 rounded-xl text-white font-bold transition ${r.bg} ${recompensas.includes(r.accion) ? 'opacity-70' : ''}`}>
              <span className="text-4xl">{r.emoji}</span>
              <span>{r.nombre}</span>
              <span className="text-xs opacity-70 font-normal">{recompensas.includes(r.accion) ? 'Dia acreditado' : '+1 dia gratis al seguir'}</span>
            </button>
          ))}
        </div>
      </section>

      {!esPremium && (
        <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <div className="card p-10 bg-gradient-to-br from-gold/10 to-wine/10 border-gold/30 glow text-center">
            <div className="ornament mb-4">◆ ◆ ◆</div>
            <h2 className="font-display text-4xl text-gold-light font-black">Hazte Premium</h2>
            <p className="text-cream/70 mt-3 leading-relaxed max-w-xl mx-auto">Sin anuncios · Acceso total ilimitado · Analisis completo · Contenido exclusivo del Dr. Figueredo</p>
            <Link href="/premium" className="inline-block mt-6 px-8 py-4 rounded-md bg-gold text-ink font-black text-lg hover:bg-gold-light transition">Ver planes desde $4.99/mes</Link>
          </div>
        </section>
      )}

    </div>
  );
}
