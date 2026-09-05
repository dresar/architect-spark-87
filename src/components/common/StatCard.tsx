import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: { arah: "naik" | "turun"; nilai: string };
  icon?: LucideIcon;
  hint?: string;
  className?: string;
}

export function StatCard({ label, value, delta, icon: Icon, hint, className }: StatCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border/80", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <div className="text-xs font-medium text-muted-foreground">{label}</div>
          <div className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">{value}</div>
          {(delta || hint) && (
            <div className="flex items-center gap-2 pt-1 text-xs">
              {delta && (
                <span className={cn("inline-flex items-center gap-1 font-medium", delta.arah === "naik" ? "text-success" : "text-destructive")}>
                  {delta.arah === "naik" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {delta.nilai}
                </span>
              )}
              {hint && <span className="text-muted-foreground">{hint}</span>}
            </div>
          )}
        </div>
        {Icon && (
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
