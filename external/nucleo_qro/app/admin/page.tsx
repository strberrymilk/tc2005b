import Link from "next/link";
import { redirect } from "next/navigation";
import { updateSchoolRequestStatus } from "@/app/admin/actions";
import AdminBarChart from "@/components/admin/AdminBarChart";
import AdminGenderComparison from "@/components/admin/AdminGenderComparison";
import AdminWordCloud from "@/components/admin/AdminWordCloud";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  buildDashboardMetrics,
  formatRoleLabel,
  type SchoolRequestRecord,
} from "@/lib/admin-dashboard";
import { getCurrentUserProfileContext } from "@/lib/auth/profile";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function formatApplicantName(request: SchoolRequestRecord) {
  return `${request.first_names} ${request.last_names}`.trim();
}

function formatGender(gender: string) {
  const normalized = gender.replaceAll("_", " ");

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export default async function AdminPage() {
  const { profile, role, user } = await getCurrentUserProfileContext();

  if (!user) {
    redirect("/ingresar");
  }

  if (role !== "admin") {
    redirect("/cuenta");
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("school_requests")
    .select(
      "id,first_names,last_names,email,age,gender,city,school_address,motivation,status,created_at,reviewed_at",
    )
    .order("created_at", { ascending: false });

  const requests = (data ?? []) as SchoolRequestRecord[];
  const pendingRequests = requests.filter((request) => request.status === "pending");
  const metrics = buildDashboardMetrics(requests);
  const displayName =
    [profile?.first_names, profile?.last_names].filter(Boolean).join(" ") ||
    user.email ||
    "Admin";

  return (
    <main className="min-h-screen bg-base-100 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 rounded-md border border-base-300 bg-base-200 p-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link className="link link-hover text-sm font-bold text-primary" href="/">
              Volver a Nucleo
            </Link>
            <p className="mt-5 text-sm font-bold uppercase tracking-normal text-primary">
              Panel admin
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">Dashboard de solicitudes</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-base-content/75">
              Revisa el volumen de solicitudes, enfocate en las pendientes y detecta
              patrones de interes antes de dar seguimiento.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-primary/12 px-4 py-2 font-semibold text-primary">
                {displayName}
              </span>
              <span className="rounded-full bg-base-100 px-4 py-2 font-semibold text-base-content/70">
                {formatRoleLabel(role)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-outline rounded-md shadow-none" href="/">
              Ir al inicio
            </Link>
            <form action="/auth/signout" method="post">
              <button className="btn btn-primary rounded-md shadow-none" type="submit">
                Cerrar sesion
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-md border border-base-300 bg-base-200 p-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-base-content/60">
              Total
            </p>
            <p className="mt-3 text-4xl font-bold">{metrics.totalRequests}</p>
            <p className="mt-2 text-sm text-base-content/70">Solicitudes registradas</p>
          </article>

          <article className="rounded-md border border-warning/30 bg-warning/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-warning">
              Pendientes
            </p>
            <p className="mt-3 text-4xl font-bold text-base-content">{metrics.totalPending}</p>
            <p className="mt-2 text-sm text-base-content/70">Esperando revision</p>
          </article>

          <article className="rounded-md border border-info/30 bg-info/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-info">
              Ultimos 7 dias
            </p>
            <p className="mt-3 text-4xl font-bold text-base-content">{metrics.recentPendingCount}</p>
            <p className="mt-2 text-sm text-base-content/70">Pendientes recientes</p>
          </article>

          <article className="rounded-md border border-success/30 bg-success/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-success">
              Ciudades activas
            </p>
            <p className="mt-3 text-4xl font-bold text-base-content">{metrics.totalActiveCities}</p>
            <p className="mt-2 text-sm text-base-content/70">Con solicitudes pendientes</p>
          </article>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <AdminBarChart
            title="Estado general de solicitudes"
            description="Panorama rapido para ver cuantas solicitudes siguen pendientes y cuantas ya pasaron por revision."
            items={metrics.totalStatuses}
            tone="primary"
          />

          <AdminBarChart
            title="Pendientes por ciudad"
            description="Las ciudades con mayor numero de solicitudes aun sin atender."
            items={metrics.pendingByCity}
            tone="secondary"
          />

          <AdminGenderComparison
            title="Pendientes por genero"
            description="Comparacion directa por genero, con porcentajes y peso relativo dentro del total pendiente."
            items={metrics.pendingByGender}
            total={metrics.pendingGenderTotal}
          />

          <AdminBarChart
            title="Rangos de edad pendientes"
            description="Como se reparten por edad las personas que todavia esperan respuesta."
            items={metrics.ageBuckets}
            tone="primary"
          />

          <div className="xl:col-span-2">
            <AdminWordCloud
              title="Palabras mas frecuentes en los motivos"
              description={`Nube de palabras construida con ${metrics.sourceLabel}.`}
              items={metrics.topMotivationWords}
              emptyMessage="Aun no hay suficientes textos para construir esta grafica."
            />
          </div>
        </div>

        <section className="mt-8 rounded-md border border-base-300 bg-base-200 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Solicitudes pendientes</h2>
              <p className="mt-2 text-sm leading-6 text-base-content/70">
                Estas solicitudes siguen abiertas. Puedes ponerlas en revision o
                cerrarlas directamente desde aqui.
              </p>
            </div>

            <div className="rounded-md bg-base-100 px-4 py-3 text-sm font-semibold text-base-content/70">
              Revisadas: {metrics.totalReviewed}
            </div>
          </div>

          {pendingRequests.length > 0 ? (
            <div className="mt-6 space-y-5">
              {pendingRequests.map((request) => (
                <article
                  className="rounded-md border border-base-300 bg-base-100 p-5"
                  key={request.id}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold">{formatApplicantName(request)}</h3>
                        <StatusBadge status={request.status} />
                      </div>
                      <p className="mt-2 text-sm text-base-content/65">
                        {request.email} · {request.city} · {formatDate(request.created_at)}
                      </p>
                    </div>

                    <div className="rounded-md bg-base-200 px-4 py-3 text-sm text-base-content/70">
                      Edad: {request.age ?? "N/D"} · Genero: {formatGender(request.gender)}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-normal text-base-content/55">
                        Direccion propuesta
                      </p>
                      <p className="mt-2 leading-7 text-base-content/85">{request.school_address}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-normal text-base-content/55">
                        Motivo
                      </p>
                      <p className="mt-2 whitespace-pre-line leading-7 text-base-content/85">
                        {request.motivation}
                      </p>
                    </div>
                  </div>

                  <form action={updateSchoolRequestStatus} className="mt-5 flex flex-wrap gap-2">
                    <input name="requestId" type="hidden" value={request.id} />
                    <button
                      className="btn btn-info btn-sm rounded-md shadow-none"
                      name="status"
                      type="submit"
                      value="reviewing"
                    >
                      Marcar en revision
                    </button>
                    <button
                      className="btn btn-success btn-sm rounded-md shadow-none"
                      name="status"
                      type="submit"
                      value="approved"
                    >
                      Aprobar
                    </button>
                    <button
                      className="btn btn-error btn-sm rounded-md shadow-none"
                      name="status"
                      type="submit"
                      value="rejected"
                    >
                      Rechazar
                    </button>
                  </form>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-md border border-dashed border-base-300 bg-base-100 px-5 py-8 text-base-content/70">
              No hay solicitudes pendientes por ahora.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
