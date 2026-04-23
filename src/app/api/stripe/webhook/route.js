// src/app/api/stripe/webhook/route.js
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

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
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.supabase_user_id ||
                       session.subscription_data?.metadata?.supabase_user_id;

        if (!userId) {
          console.error('No se encontró supabase_user_id en checkout.session.completed');
          break;
        }

        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        await actualizarSuscripcionUsuario(supabase, userId, subscription);
        break;
      }

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

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.supabase_user_id;

        if (!userId) break;

        await supabase
          .from('perfiles')
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

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (!subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const userId = subscription.metadata?.supabase_user_id;

        if (!userId) break;

        await supabase.from('suscripciones_historial').insert({
          usuario_id: userId,
          evento: 'payment_failed',
          stripe_event_id: event.id,
        });
        break;
      }

      default:
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

async function actualizarSuscripcionUsuario(supabase, userId, subscription) {
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
    .from('perfiles')
    .select('plan')
    .eq('id', userId)
    .single();

  await supabase
    .from('perfiles')
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

  await supabase.from('suscripciones_historial').insert({
    usuario_id: userId,
    plan_anterior: perfilAnterior?.plan || null,
    plan_nuevo: estaActiva ? plan : 'free',
    evento: subscription.status === 'trialing' ? 'trial_start' : 'activate',
    stripe_event_id: subscription.id,
  });
}
