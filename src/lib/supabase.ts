import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Debug log to ensure variables are loaded (will show in browser console)
if (typeof window !== 'undefined') {
  if (!supabaseUrl) {
    console.error('Supabase URL is missing! Please restart your Next.js dev server.');
  }
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');
