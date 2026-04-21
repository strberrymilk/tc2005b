import { NextResponse } from "next/server";
import { getHomePathForRole, syncConfiguredAdminRole } from "@/lib/auth/profile";
import { createClient } from "@/lib/supabase/server";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Correo y contrasena son obligatorios." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    let redirectTo = "/cuenta";

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      const role = await syncConfiguredAdminRole({
        currentRole: profile?.role,
        email: data.user.email,
        userId: data.user.id,
      });

      redirectTo = getHomePathForRole(role);
    }

    return NextResponse.json({
      message: "Inicio de sesion exitoso.",
      redirectTo,
      user: data.user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "No se pudo iniciar sesion.",
      },
      { status: 500 },
    );
  }
}
