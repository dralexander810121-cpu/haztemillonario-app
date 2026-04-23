import { createClient } from '@/lib/supabase-server';
import AdivinanzasClient from './AdivinanzasClient';

export const metadata = {
  title: 'Adivinanzas cubanas — Hazte Millonario',
  description:
    'Adivinanzas tradicionales del pueblo cubano con su respuesta y los números de la charada asociados.',
};

export const revalidate = 3600;

export default async function AdivinanzasPage() {
  const supabase = createClient();
  const { data: adivinanzas } = await supabase
    .from('adivinanzas')
    .select('*')
    .order('id', { ascending: true });

  return <AdivinanzasClient items={adivinanzas || []} />;
}
