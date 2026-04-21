import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseClientConfig } from "./config";

export function createClient() {
  const { supabaseKey, supabaseUrl } = getSupabaseClientConfig();

  return createBrowserClient(supabaseUrl, supabaseKey);
}
