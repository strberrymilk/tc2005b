import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdminConfig } from "./config";

export function createAdminClient() {
  const { supabaseKey, supabaseUrl } = getSupabaseAdminConfig();

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
