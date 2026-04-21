import type { ChartDatum } from "@/lib/admin-dashboard";

type AdminBarChartProps = {
  description: string;
  emptyMessage?: string;
  items: ChartDatum[];
  title: string;
  tone?: "accent" | "primary" | "secondary";
};

const toneClasses: Record<NonNullable<AdminBarChartProps["tone"]>, string> = {
  accent: "bg-accent",
  primary: "bg-primary",
  secondary: "bg-secondary",
};

export default function AdminBarChart({
  description,
  emptyMessage = "Todavia no hay datos suficientes para esta grafica.",
  items,
  title,
  tone = "primary",
}: AdminBarChartProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 0);

  return (
    <article className="rounded-md border border-base-300 bg-base-200 p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-base-content/70">{description}</p>

      {items.length > 0 ? (
        <div className="mt-6 space-y-4">
          {items.map((item) => {
            const width = maxValue > 0 ? Math.max((item.value / maxValue) * 100, 12) : 0;

            return (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-bold text-base-content">{item.label}</span>
                  <span className="font-mono text-base-content/70">{item.value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-base-300">
                  <div
                    className={`h-full rounded-full ${toneClasses[tone]}`}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-6 rounded-md border border-dashed border-base-300 bg-base-100 px-4 py-5 text-sm text-base-content/65">
          {emptyMessage}
        </p>
      )}
    </article>
  );
}
