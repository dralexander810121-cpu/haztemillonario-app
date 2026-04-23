// src/lib/supabase-server.js
// Cliente de Supabase para usar en código del servidor:
// - Server Components
// - API routes
// - Server Actions
//
// Maneja cookies para que el usuario pueda estar autenticado
// desde el servidor.

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Este método puede fallar en Server Components. Es normal.
          }
        },
      },
    }
  );
}
