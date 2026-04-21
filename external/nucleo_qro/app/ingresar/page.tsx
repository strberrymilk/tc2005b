"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Mode = "login" | "signup";

type SignupForm = {
  firstNames: string;
  lastNames: string;
  email: string;
  password: string;
  age: string;
  gender: string;
  city: string;
  schoolAddress: string;
  motivation: string;
};

const initialSignupForm: SignupForm = {
  firstNames: "",
  lastNames: "",
  email: "",
  password: "",
  age: "",
  gender: "",
  city: "",
  schoolAddress: "",
  motivation: "",
};

export default function IngresarPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupForm, setSignupForm] = useState<SignupForm>(initialSignupForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const reason = params.get("reason");

    if (error === "google") {
      setMessage("No se pudo iniciar sesión con Google. Inténtalo de nuevo.");
    }

    if (error === "callback" || error === "confirm") {
      if (reason === "missing-code") {
        setMessage(
          "El callback de Google llegó sin código. Revisa las Redirect URLs en Supabase.",
        );
        return;
      }

      if (reason === "missing-token-hash-or-type") {
        setMessage(
          "El correo de confirmación no trae token_hash y type=email. Revisa el template Confirm signup en Supabase.",
        );
        return;
      }

      if (reason) {
        setMessage(`El enlace de autenticación no pudo validarse: ${reason}`);
        return;
      }

      setMessage("El enlace de autenticación no pudo validarse.");
    }

    if (error === "supabase-config") {
      setMessage("Faltan variables de entorno de Supabase para autenticar.");
    }
  }, []);

  const updateSignupField = (field: keyof SignupForm, value: string) => {
    setSignupForm((current) => ({ ...current, [field]: value }));
  };

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    setMessage(result.message ?? "Listo.");

    if (response.ok && result.redirectTo) {
      window.location.href = result.redirectTo;
      return;
    }

    setIsSubmitting(false);
  };

  const submitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...signupForm,
        age: Number(signupForm.age),
      }),
    });

    const result = await response.json();
    setMessage(result.message ?? "Solicitud enviada.");
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-base-100 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <section className="pt-4 lg:pt-16">
          <Link className="link link-hover text-sm font-bold text-primary" href="/">
            Volver a Núcleo
          </Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-normal text-primary">
            Acceso comunitario
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-bold leading-tight text-base-content sm:text-5xl">
            Entra a tu cuenta o solicita abrir una escuela.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-base-content/75">
            Usa tu correo y contraseña, entra con Google o crea una cuenta para
            iniciar una solicitud de escuela Núcleo en tu comunidad.
          </p>
        </section>

        <section className="rounded-md border border-base-300 bg-base-200 p-5 sm:p-8">
          <div className="mb-8 grid grid-cols-[1fr_auto_1fr] items-center rounded-md border border-base-300 bg-base-100 p-1">
            <button
              className={`rounded-md px-4 py-3 text-sm font-bold transition ${
                mode === "login" ? "bg-primary text-primary-content" : "text-base-content"
              }`}
              type="button"
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
            >
              Ingresar
            </button>
            <span className="mx-1 h-8 w-px bg-base-300" aria-hidden="true" />
            <button
              className={`rounded-md px-4 py-3 text-sm font-bold transition ${
                mode === "signup" ? "bg-primary text-primary-content" : "text-base-content"
              }`}
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage("");
              }}
            >
              Crear cuenta
            </button>
          </div>

          {mode === "login" ? (
            <form className="flex flex-col gap-5" onSubmit={submitLogin}>
              <div>
                <h2 className="text-2xl font-bold">Ingresar</h2>
                <p className="mt-2 text-sm text-base-content/70">
                  Accede con tu correo o continúa con Google.
                </p>
              </div>

              <label className="flex flex-col gap-2">
                <span className="label-text font-semibold">Correo</span>
                <input
                  className="input input-bordered w-full rounded-md"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="label-text font-semibold">Contraseña</span>
                <input
                  className="input input-bordered w-full rounded-md"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>

              <button
                className="btn btn-primary mt-1 w-full rounded-md shadow-none"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Ingresando..." : "Ingresar"}
              </button>

              <div className="divider">o</div>

              <a className="btn btn-outline w-full rounded-md shadow-none" href="/api/auth/google">
                Continuar con Google
              </a>

              <p className="text-center text-sm">
                ¿No tienes cuenta?{" "}
                <button
                  className="link link-primary font-bold"
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setMessage("");
                  }}
                >
                  Crear una
                </button>
              </p>
            </form>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={submitSignup}>
              <div>
                <h2 className="text-2xl font-bold">Crear cuenta</h2>
                <p className="mt-2 text-sm text-base-content/70">
                  Cuéntanos quién eres y dónde quieres llevar una escuela Núcleo.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="label-text font-semibold">Nombres</span>
                  <input
                    className="input input-bordered w-full rounded-md"
                    value={signupForm.firstNames}
                    onChange={(event) => updateSignupField("firstNames", event.target.value)}
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="label-text font-semibold">Apellidos</span>
                  <input
                    className="input input-bordered w-full rounded-md"
                    value={signupForm.lastNames}
                    onChange={(event) => updateSignupField("lastNames", event.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="label-text font-semibold">Correo</span>
                  <input
                    className="input input-bordered w-full rounded-md"
                    type="email"
                    autoComplete="email"
                    value={signupForm.email}
                    onChange={(event) => updateSignupField("email", event.target.value)}
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="label-text font-semibold">Contraseña</span>
                  <input
                    className="input input-bordered w-full rounded-md"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={signupForm.password}
                    onChange={(event) => updateSignupField("password", event.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="label-text font-semibold">Edad</span>
                  <input
                    className="input input-bordered w-full rounded-md"
                    type="number"
                    min="16"
                    value={signupForm.age}
                    onChange={(event) => updateSignupField("age", event.target.value)}
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="label-text font-semibold">Género</span>
                  <select
                    className="select select-bordered w-full rounded-md"
                    value={signupForm.gender}
                    onChange={(event) => updateSignupField("gender", event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="mujer">Mujer</option>
                    <option value="hombre">Hombre</option>
                    <option value="no_binario">No binario</option>
                    <option value="prefiero_no_decir">Prefiero no decir</option>
                    <option value="otro">Otro</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                  <span className="label-text font-semibold">Municipio / ciudad</span>
                  <input
                    className="input input-bordered w-full rounded-md"
                    value={signupForm.city}
                    onChange={(event) => updateSignupField("city", event.target.value)}
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="label-text font-semibold">
                    Dirección donde se quiere llevar a cabo la escuela
                  </span>
                  <input
                    className="input input-bordered w-full rounded-md"
                    value={signupForm.schoolAddress}
                    onChange={(event) => updateSignupField("schoolAddress", event.target.value)}
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="label-text font-semibold">
                    ¿Por qué quieres abrir una escuela?
                  </span>
                  <textarea
                    className="textarea textarea-bordered min-h-32 w-full rounded-md"
                    value={signupForm.motivation}
                    onChange={(event) => updateSignupField("motivation", event.target.value)}
                    required
                  />
                </label>
              </div>

              <button
                className="btn btn-primary mt-2 w-full rounded-md shadow-none"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Crear cuenta"}
              </button>

              <p className="text-center text-sm">
                ¿Ya tienes cuenta?{" "}
                <button
                  className="link link-primary font-bold"
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setMessage("");
                  }}
                >
                  Ingresar
                </button>
              </p>
            </form>
          )}

          {message && (
            <div className="alert alert-info mt-6 rounded-md">
              <span>{message}</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
