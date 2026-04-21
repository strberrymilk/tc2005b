import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseClientConfig } from "./config";

export async function createClient() {
  const cookieStore = await cookies();
  const { supabaseKey, supabaseUrl } = getSupabaseClientConfig();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot set cookies; middleware refreshes them.
        }
      },
    },
  });
}
