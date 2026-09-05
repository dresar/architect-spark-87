import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: LucideIcon;
  judul: string;
  deskripsi?: string;
  aksi?: ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, judul, deskripsi, aksi, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 px-6 py-14 text-center", className)}>
      {Icon && (
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3 className="text-base font-medium text-foreground">{judul}</h3>
      {deskripsi && <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{deskripsi}</p>}
      {aksi && <div className="mt-5">{aksi}</div>}
    </div>
  );
}
