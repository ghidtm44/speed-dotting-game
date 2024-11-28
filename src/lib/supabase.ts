import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from './constants';

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('Missing VITE_SUPABASE_KEY environment variable');
}

export const supabase = createClient(SUPABASE_CONFIG.URL, supabaseKey, {
  auth: {
    persistSession: false
  }
});