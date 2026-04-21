import { NextResponse } from "next/server";
import { isConfiguredAdminEmail } from "@/lib/auth/profile";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteUrl } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type SignupBody = {
  age?: number;
  city?: string;
  email?: string;
  firstNames?: string;
  gender?: string;
  lastNames?: string;
  motivation?: string;
  password?: string;
  schoolAddress?: string;
};

const requiredFields: Array<keyof SignupBody> = [
  "firstNames",
  "lastNames",
  "email",
  "password",
  "age",
  "gender",
  "city",
  "schoolAddress",
  "motivation",
];

function isMissing(value: unknown) {
  return value === undefined || value === null || value === "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupBody;
    const assignedRole = isConfiguredAdminEmail(body.email) ? "admin" : "user";
    const missingField = requiredFields.find((field) => isMissing(body[field]));

    if (missingField) {
      return NextResponse.json(
        { message: "Completa todos los campos para crear la cuenta." },
        { status: 400 },
      );
    }

    if (!body.email || !body.password || body.password.length < 8) {
      return NextResponse.json(
        { message: "La contrasena debe tener al menos 8 caracteres." },
        { status: 400 },
      );
    }

    if (!body.age || body.age < 16) {
      return NextResponse.json(
        { message: "La edad debe ser de al menos 16 anos." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const origin = new URL(request.url).origin;
    const { data, error } = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
      options: {
        emailRedirectTo: `${getSiteUrl(origin)}/auth/confirm`,
        data: {
          age: body.age,
          city: body.city,
          first_names: body.firstNames,
          gender: body.gender,
          last_names: body.lastNames,
          school_address: body.schoolAddress,
        },
      },
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const admin = createAdminClient();
    const userId = data.user?.id ?? null;

    if (userId) {
      const { error: profileError } = await admin.from("profiles").upsert({
        age: body.age,
        city: body.city,
        email: body.email,
        first_names: body.firstNames,
        gender: body.gender,
        id: userId,
        last_names: body.lastNames,
        role: assignedRole,
      });

      if (profileError) {
        return NextResponse.json(
          { message: profileError.message },
          { status: 500 },
        );
      }
    }

    if (assignedRole !== "admin") {
      const { error: requestError } = await admin.from("school_requests").insert({
        age: body.age,
        city: body.city,
        email: body.email,
        first_names: body.firstNames,
        gender: body.gender,
        last_names: body.lastNames,
        motivation: body.motivation,
        school_address: body.schoolAddress,
        user_id: userId,
      });

      if (requestError) {
        return NextResponse.json(
          { message: requestError.message },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      message:
        assignedRole === "admin"
          ? "Cuenta admin creada. Revisa tu correo para confirmar el acceso."
          : "Cuenta creada. Revisa tu correo para confirmar el acceso y dar seguimiento a la solicitud.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "No se pudo crear la cuenta.",
      },
      { status: 500 },
    );
  }
}
