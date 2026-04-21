import type { ChartDatum } from "@/lib/admin-dashboard";

type AdminWordCloudProps = {
  description: string;
  emptyMessage?: string;
  items: ChartDatum[];
  title: string;
};

const cloudStyles = [
  {
    accent: "text-primary",
    bg: "bg-primary/10",
    ring: "ring-primary/15",
    rotate: "-rotate-2",
  },
  {
    accent: "text-accent",
    bg: "bg-accent/12",
    ring: "ring-accent/15",
    rotate: "rotate-2",
  },
  {
    accent: "text-base-content",
    bg: "bg-secondary/30",
    ring: "ring-secondary/20",
    rotate: "-rotate-1",
  },
  {
    accent: "text-success",
    bg: "bg-success/12",
    ring: "ring-success/15",
    rotate: "rotate-1",
  },
  {
    accent: "text-warning",
    bg: "bg-warning/15",
    ring: "ring-warning/15",
    rotate: "-rotate-3",
  },
];

function getWordScale(value: number, maxValue: number) {
  if (maxValue <= 0) {
    return 1;
  }

  const ratio = value / maxValue;

  if (ratio >= 0.9) {
    return 2.6;
  }

  if (ratio >= 0.7) {
    return 2.2;
  }

  if (ratio >= 0.5) {
    return 1.8;
  }

  if (ratio >= 0.3) {
    return 1.45;
  }

  return 1.15;
}

export default function AdminWordCloud({
  description,
  emptyMessage = "Aun no hay suficientes textos para construir esta nube.",
  items,
  title,
}: AdminWordCloudProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 0);

  return (
    <article className="rounded-md border border-base-300 bg-base-200 p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-base-content/70">{description}</p>

      {items.length > 0 ? (
        <>
          <div className="mt-6 overflow-hidden rounded-[2rem] border border-base-300 bg-[radial-gradient(circle_at_top,_rgba(255,223,55,0.22),_transparent_35%),linear-gradient(135deg,rgba(4,135,210,0.08),rgba(255,255,255,0.82))] px-5 py-7">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-5">
              {items.map((item, index) => {
                const style = cloudStyles[index % cloudStyles.length];
                const fontSize = `${getWordScale(item.value, maxValue)}rem`;

                return (
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold ring-1 backdrop-blur-sm transition ${style.bg} ${style.accent} ${style.ring} ${style.rotate}`}
                    key={item.label}
                    style={{ fontSize }}
                    title={`${item.label}: ${item.value}`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono opacity-70">{item.value}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-sm text-base-content/60">
            Las palabras mas repetidas aparecen mas grandes para que resalten a simple vista.
          </p>
        </>
      ) : (
        <p className="mt-6 rounded-md border border-dashed border-base-300 bg-base-100 px-4 py-5 text-sm text-base-content/65">
          {emptyMessage}
        </p>
      )}
    </article>
  );
}
