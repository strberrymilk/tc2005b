export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export function getSupabasePublishableKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY
  );
}

export function getSupabaseSecretKey() {
  return process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export function getAdminEmails() {
  const rawEmails =
    process.env.NUCLEO_ADMIN_EMAILS ??
    process.env.ADMIN_EMAILS ??
    process.env.NUCLEO_ADMIN_EMAIL ??
    process.env.ADMIN_EMAIL ??
    "";

  return rawEmails
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getSiteUrl(origin?: string) {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    origin ??
    "http://localhost:3000";

  const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSupabaseClientConfig() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabasePublishableKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return { supabaseKey, supabaseUrl };
}

export function getSupabaseAdminConfig() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseSecretKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.");
  }

  return { supabaseKey, supabaseUrl };
}
