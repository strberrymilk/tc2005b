import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getSiteUrl(origin)}/auth/callback?next=/cuenta`,
      },
    });

    if (error || !data.url) {
      return NextResponse.redirect(
        new URL("/ingresar?error=google", request.url),
      );
    }

    return NextResponse.redirect(data.url);
  } catch {
    return NextResponse.redirect(
      new URL("/ingresar?error=supabase-config", request.url),
    );
  }
}
