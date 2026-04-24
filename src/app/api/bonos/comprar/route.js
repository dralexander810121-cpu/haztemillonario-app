import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { stripe } from '@/lib/stripe';

const supabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(request) {
  try {
    const { userId, cantidad } = await request.json();
    if (!userId || !cantidad) return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });

    const PAQUETES = {
      10:  { bonos: 100,  precio: 1000 },
      25:  { bonos: 275,  precio: 2500 },
      50:  { bonos: 600,  precio: 5000 },
      100: { bonos: 1300, precio: 10000 },
    };

    const paquete = PAQUETES[cantidad];
    if (!paquete) return NextResponse.json({ error: 'Paquete no valido' }, { status: 400 });

    const supabase = supabaseAdmin();
    const { data: perfil } = await supabase.from('profiles').select('email, nombre, stripe_customer_id').eq('id', userId).single();
    if (!perfil) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const session = await stripe.checkout.sessions.create({
      customer_email: perfil.email,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: paquete.precio,
          product_data: {
            name: `${paquete.bonos} Bonos Hazte Millonario`,
            description: `Paquete de ${paquete.bonos} bonos para jugar en Hazte Millonario`,
          },
        },
        quantity: 1,
      }],
      metadata: { userId, bonos: paquete.bonos, tipo: 'compra_bonos' },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/bonos/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/bonos`,
      locale: 'es',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
