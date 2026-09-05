import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/data/projects";
import { statusLabel } from "@/data/projects";

const styleMap: Record<ProjectStatus, string> = {
  draft: "bg-muted text-muted-foreground border-border",
  aktif: "bg-primary/12 text-primary border-primary/25",
  review: "bg-warning/12 text-warning border-warning/25",
  selesai: "bg-success/12 text-success border-success/25",
  arsip: "bg-muted text-muted-foreground border-border opacity-70",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium", styleMap[status], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", status === "aktif" && "bg-primary", status === "review" && "bg-warning", status === "selesai" && "bg-success", (status === "draft" || status === "arsip") && "bg-muted-foreground")} />
      {statusLabel[status]}
    </span>
  );
}
