import { NextResponse } from "next/server";

function presence(name: string) {
  const value = process.env[name];

  return {
    name,
    present: Boolean(value),
    length: value?.length ?? 0,
  };
}

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    variables: [
      presence("NEXT_PUBLIC_SUPABASE_URL"),
      presence("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
      presence("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
      presence("SUPABASE_SECRET_KEY"),
      presence("SUPABASE_SERVICE_ROLE_KEY"),
      presence("NEXT_PUBLIC_SITE_URL"),
    ],
  });
}
