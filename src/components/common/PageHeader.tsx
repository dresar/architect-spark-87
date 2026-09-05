import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  judul: string;
  deskripsi?: ReactNode;
  aksi?: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
}

export function PageHeader({ judul, deskripsi, aksi, eyebrow, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="min-w-0 space-y-1.5">
        {eyebrow && <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{eyebrow}</div>}
        <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground md:text-[26px]">{judul}</h1>
        {deskripsi && <p className="max-w-2xl text-sm text-muted-foreground">{deskripsi}</p>}
      </div>
      {aksi && <div className="flex shrink-0 flex-wrap items-center gap-2">{aksi}</div>}
    </div>
  );
}
