import type { ChartDatum } from "@/lib/admin-dashboard";

type AdminGenderComparisonProps = {
  description: string;
  emptyMessage?: string;
  items: ChartDatum[];
  title: string;
  total: number;
};

const palette = [
  {
    pill: "bg-primary/15 text-primary ring-primary/20",
    solid: "bg-primary",
    soft: "bg-primary/12",
  },
  {
    pill: "bg-secondary/35 text-base-content ring-secondary/30",
    solid: "bg-secondary",
    soft: "bg-secondary/18",
  },
  {
    pill: "bg-accent/15 text-accent ring-accent/20",
    solid: "bg-accent",
    soft: "bg-accent/12",
  },
  {
    pill: "bg-success/15 text-success ring-success/20",
    solid: "bg-success",
    soft: "bg-success/12",
  },
  {
    pill: "bg-warning/20 text-warning ring-warning/20",
    solid: "bg-warning",
    soft: "bg-warning/12",
  },
];

function formatPercent(value: number, total: number) {
  if (total === 0) {
    return "0%";
  }

  return `${Math.round((value / total) * 100)}%`;
}

export default function AdminGenderComparison({
  description,
  emptyMessage = "Todavia no hay suficientes solicitudes pendientes para comparar genero.",
  items,
  title,
  total,
}: AdminGenderComparisonProps) {
  return (
    <article className="rounded-md border border-base-300 bg-base-200 p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-base-content/70">{description}</p>

      {items.length > 0 ? (
        <>
          <div className="mt-6 rounded-3xl border border-base-300 bg-base-100 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-normal text-base-content/50">
                  Universo comparado
                </p>
                <p className="mt-2 text-4xl font-bold">{total}</p>
                <p className="mt-2 text-sm text-base-content/65">Solicitudes pendientes</p>
              </div>

              <div className="max-w-xs text-right text-sm leading-6 text-base-content/65">
                La barra muestra de un vistazo el peso relativo de cada grupo.
              </div>
            </div>

            <div className="mt-5 flex h-5 overflow-hidden rounded-full bg-base-300">
              {items.map((item, index) => {
                const width = total > 0 ? Math.max((item.value / total) * 100, 8) : 0;

                return (
                  <div
                    aria-label={`${item.label}: ${formatPercent(item.value, total)}`}
                    className={palette[index % palette.length].solid}
                    key={item.label}
                    style={{ width: `${width}%` }}
                    title={`${item.label}: ${item.value}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {items.map((item, index) => {
              const tones = palette[index % palette.length];
              const percent = formatPercent(item.value, total);

              return (
                <div
                  className={`rounded-2xl border border-base-300 ${tones.soft} p-4`}
                  key={item.label}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-normal text-base-content/55">
                        Genero
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-base-content">{item.label}</h3>
                    </div>

                    <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${tones.pill}`}>
                      {percent}
                    </span>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <p className="text-4xl font-bold text-base-content">{item.value}</p>
                    <p className="text-sm text-base-content/65">solicitudes</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="mt-6 rounded-md border border-dashed border-base-300 bg-base-100 px-4 py-5 text-sm text-base-content/65">
          {emptyMessage}
        </p>
      )}
    </article>
  );
}
