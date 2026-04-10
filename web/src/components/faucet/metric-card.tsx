import type { ReactNode } from "react";

type MetricCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  glow?: "purple" | "blue" | "emerald";
};

export function MetricCard({
  label,
  value,
  icon,
  glow = "purple",
}: MetricCardProps) {
  const glowClass =
    glow === "blue"
      ? "shadow-[0_0_0_1px_rgba(96,165,250,0.15),0_12px_30px_rgba(37,99,235,0.12)]"
      : glow === "emerald"
        ? "shadow-[0_0_0_1px_rgba(52,211,153,0.12),0_12px_30px_rgba(16,185,129,0.10)]"
        : "shadow-[0_0_0_1px_rgba(168,85,247,0.16),0_12px_30px_rgba(124,58,237,0.14)]";

  return (
    <div
      className={`rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md ${glowClass}`}
    >
      <div className="mb-4 flex items-center gap-3 text-white/70">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white">
          {icon}
        </div>
        <p className="text-sm font-semibold tracking-wide">{label}</p>
      </div>

      <p className="text-lg font-extrabold tracking-tight text-white md:text-xl">
        {value}
      </p>
    </div>
  );
}
