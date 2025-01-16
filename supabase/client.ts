import { createBrowserClient } from '@supabase/ssr';

import { supabaseAnonKey, supabaseUrl } from '@/config';

export const createClient = () => {
    return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}