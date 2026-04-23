// src/app/api/stripe/webhook/route.js
// Endpoint: POST /api/stripe/webhook
//
// Stripe envía eventos aquí cada vez que pasa algo importante:
// - Usuario completó el pago inicial
// - Se renovó una suscripción
// - Se canceló una suscripción
// - El pago falló
//
// Este endpoint verifica la firma del webhook (seguridad),
// procesa el evento y actualiza Supabase en consecuencia.

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Cliente de Supabase con service_role (bypass RLS)
// Usamos esta clave especial porque el webhook no tiene sesión de usuario
// y necesita actualizar tablas con políticas RLS.
const getSupabaseAdmin = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
};

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No hay firma' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: `Firma inválida: ${error.message}` }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  try {
    switch (event.type) {
      // Usuario completó el checkout inicial con éxito
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.supabase_user_id ||
                       session.subscription_data?.metadata?.supabase_user_id;

        if (!userId) {
          console.error('No se encontró supabase_user_id en checkout.session.completed');
          break;
        }

        // Obtenemos la suscripción completa para conocer los detalles
        const subscription = await stripe.subscriptions.retrieve(session.subscription);

        await actualizarSuscripcionUsuario(supabase, userId, subscription);
        break;
      }

      // Suscripción creada, actualizada, o en cambio de estado
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.supabase_user_id;

        if (!userId) {
          console.warn(`Sin supabase_user_id en subscription ${subscription.id}`);
          break;
        }

        await actualizarSuscripcionUsuario(supabase, userId, subscription);
        break;
      }

      // Suscripción cancelada
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.supabase_user_id;

        if (!userId) break;

        await supabase
          .from('profiles')
          .update({
            es_premium: false,
            plan: 'free',
            stripe_subscription_id: null,
            premium_hasta: new Date(subscription.canceled_at * 1000).toISOString(),
          })
          .eq('id', userId);

        await supabase.from('suscripciones_historial').insert({
          usuario_id: userId,
          plan_anterior: subscription.metadata?.plan || null,
          plan_nuevo: 'free',
          evento: 'cancel',
          stripe_event_id: event.id,
        });
        break;
      }

      // Un pago de renovación falló
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (!subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const userId = subscription.metadata?.supabase_user_id;

        if (!userId) break;

        // Marcamos el pago como fallido, pero NO degradamos al usuario todavía.
        // Stripe reintentará automáticamente los próximos días.
        await supabase.from('suscripciones_historial').insert({
          usuario_id: userId,
          evento: 'payment_failed',
          stripe_event_id: event.id,
        });
        break;
      }

      default:
        // Evento no manejado, lo ignoramos
        console.log(`Evento no manejado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error procesando webhook:', error);
    return NextResponse.json(
      { error: 'Error procesando evento' },
      { status: 500 }
    );
  }
}

// Función auxiliar: actualiza el perfil del usuario con los datos de la suscripción
async function actualizarSuscripcionUsuario(supabase, userId, subscription) {
  // Determinamos el plan (premium vs premium_plus) según el precio
  const priceId = subscription.items.data[0]?.price?.id;
  let plan = 'free';
  if (priceId === process.env.STRIPE_PRICE_PREMIUM_MENSUAL ||
      priceId === process.env.STRIPE_PRICE_PREMIUM_ANUAL) {
    plan = 'premium';
  } else if (priceId === process.env.STRIPE_PRICE_PREMIUM_PLUS_MENSUAL ||
             priceId === process.env.STRIPE_PRICE_PREMIUM_PLUS_ANUAL) {
    plan = 'premium_plus';
  }

  const estaActiva = ['active', 'trialing'].includes(subscription.status);

  const { data: perfilAnterior } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', userId)
    .single();

  await supabase
    .from('profiles')
    .update({
      es_premium: estaActiva,
      plan: estaActiva ? plan : 'free',
      stripe_subscription_id: subscription.id,
      premium_desde: new Date(subscription.start_date * 1000).toISOString(),
      premium_hasta: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
    })
    .eq('id', userId);

  // Guardar en el historial para auditoría
  await supabase.from('suscripciones_historial').insert({
    usuario_id: userId,
    plan_anterior: perfilAnterior?.plan || null,
    plan_nuevo: estaActiva ? plan : 'free',
    evento: subscription.status === 'trialing' ? 'trial_start' : 'activate',
    stripe_event_id: subscription.id,
  });
}
