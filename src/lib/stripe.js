// src/lib/stripe.js
// Cliente de Stripe para el servidor. Se usa en las API routes.
// Nunca importar este archivo desde componentes del cliente.

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️  STRIPE_SECRET_KEY no está configurada');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
  typescript: false,
  appInfo: {
    name: 'HazteMillonario',
    version: '1.0.0',
  },
});

// Mapa de los 4 planes con sus Price IDs
// Estos IDs se pasan desde variables de entorno para poder cambiarlos
// sin tocar el código.
export const PLANES = {
  premium_mensual: {
    nombre: 'Premium Mensual',
    plan: 'premium',
    priceId: process.env.STRIPE_PRICE_PREMIUM_MENSUAL,
    intervalo: 'month',
    monto: 4.99,
  },
  premium_anual: {
    nombre: 'Premium Anual',
    plan: 'premium',
    priceId: process.env.STRIPE_PRICE_PREMIUM_ANUAL,
    intervalo: 'year',
    monto: 39.99,
  },
  premium_plus_mensual: {
    nombre: 'Premium Plus Mensual',
    plan: 'premium_plus',
    priceId: process.env.STRIPE_PRICE_PREMIUM_PLUS_MENSUAL,
    intervalo: 'month',
    monto: 9.99,
  },
  premium_plus_anual: {
    nombre: 'Premium Plus Anual',
    plan: 'premium_plus',
    priceId: process.env.STRIPE_PRICE_PREMIUM_PLUS_ANUAL,
    intervalo: 'year',
    monto: 79.99,
  },
};
