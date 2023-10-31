import { LoginPage } from '@/components/login/login-page';
import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Home() {
  return <LoginPage />;
}
