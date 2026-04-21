import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminEmails } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type AppRole = "admin" | "user";

export type ProfileRecord = {
  city: string | null;
  email: string | null;
  first_names: string | null;
  id: string;
  last_names: string | null;
  role: AppRole | null;
};

function normalizeEmail(email?: string | null) {
  return email?.trim().toLowerCase() ?? "";
}

export function normalizeAppRole(role?: string | null): AppRole {
  return role === "admin" ? "admin" : "user";
}

export function getHomePathForRole(role?: string | null) {
  return normalizeAppRole(role) === "admin" ? "/admin" : "/cuenta";
}

export function isConfiguredAdminEmail(email?: string | null) {
  const normalizedEmail = normalizeEmail(email);

  return normalizedEmail.length > 0 && getAdminEmails().includes(normalizedEmail);
}

export async function syncConfiguredAdminRole({
  currentRole,
  email,
  userId,
}: {
  currentRole?: string | null;
  email?: string | null;
  userId: string;
}) {
  const resolvedRole = normalizeAppRole(currentRole);

  if (resolvedRole === "admin" || !isConfiguredAdminEmail(email)) {
    return resolvedRole;
  }

  const admin = createAdminClient();
  await admin.from("profiles").upsert({
    email: email ?? null,
    id: userId,
    role: "admin",
  });

  return "admin" as const;
}

export async function getCurrentUserProfileContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      profile: null,
      role: null,
      supabase,
      user: null,
    };
  }

  const { data } = await supabase
    .from("profiles")
    .select("id,first_names,last_names,email,city,role")
    .eq("id", user.id)
    .maybeSingle();

  const profile = (data ?? null) as ProfileRecord | null;
  const role = await syncConfiguredAdminRole({
    currentRole: profile?.role,
    email: user.email ?? profile?.email,
    userId: user.id,
  });

  return {
    profile:
      profile ??
      ({
        city: null,
        email: user.email ?? null,
        first_names: null,
        id: user.id,
        last_names: null,
        role,
      } satisfies ProfileRecord),
    role,
    supabase,
    user,
  };
}
