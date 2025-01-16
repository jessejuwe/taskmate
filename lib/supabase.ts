import { createClient } from "@supabase/supabase-js";

import { supabaseAnonKey, supabaseUrl } from "@/config";
import { Database } from "@/types/database.types";

// Check if the required environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials are not set. Please click "Connect to Supabase" to set up your database.'
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;
