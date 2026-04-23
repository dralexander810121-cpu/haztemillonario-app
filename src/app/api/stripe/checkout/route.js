// src/app/api/stripe/checkout/route.js
// Endpoint: POST /api/stripe/checkout
//
// Flujo:
// 1. El usuario hace clic en "Hacerme Premium" en la app.
// 2. El frontend envía aquí el planId elegido.
// 3. Creamos una sesión de Checkout en Stripe.
// 4. Devolvemos la URL de Stripe al frontend.
// 5. El frontend redirige al usuario a esa URL.

import { NextResponse } from 'next/server';
import { stripe, PLANES } from '@/lib/stripe';
import { createClient } from '@/lib/supabase-server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { planId } = body;

    // Validar que el plan existe
    const plan = PLANES[planId];
    if (!plan || !plan.priceId) {
      return NextResponse.json(
        { error: 'Plan no válido' },
        { status: 400 }
      );
    }

    // Obtener el usuario actual desde Supabase
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Debes iniciar sesión primero' },
        { status: 401 }
      );
    }

    // Verificar si el usuario ya es stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email, nombre')
      .eq('id', user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    // Si no tiene customer en Stripe, lo creamos
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: profile?.nombre || undefined,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      customerId = customer.id;

      // Guardamos el customer_id en Supabase para futuras compras
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }

    // Crear la sesión de Checkout
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://haztemillonario.com';
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7, // 7 días de prueba gratis
        metadata: {
          supabase_user_id: user.id,
          plan: plan.plan,
          planId: planId,
        },
      },
      success_url: `${appUrl}/premium/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/premium?cancelado=1`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      locale: 'es',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creando Checkout Session:', error);
    return NextResponse.json(
      { error: error.message || 'Error del servidor' },
      { status: 500 }
    );
  }
}
