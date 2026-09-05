import { useRouterState, Link } from "@tanstack/react-router";
import { Menu, Search, Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Project",
  templates: "Template",
  settings: "Pengaturan",
  overview: "Overview",
  interview: "AI Interview",
  canvas: "Canvas Workflow",
  prd: "PRD",
  architecture: "Arsitektur",
  database: "Database",
  api: "API",
  prompts: "Prompt Studio",
  tasks: "Task Manager",
  history: "History",
  export: "Ekspor",
  baru: "Baru",
  profil: "Profil",
  tampilan: "Tampilan",
  bahasa: "Bahasa",
  shortcut: "Shortcut",
  notifikasi: "Notifikasi",
  ai: "Pengaturan AI",
};

export function Topbar({ onOpenSidebar, onOpenCommand }: { onOpenSidebar: () => void; onOpenCommand: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur-md md:px-5">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpenSidebar} aria-label="Buka menu">
        <Menu className="h-5 w-5" />
      </Button>

      <nav aria-label="Breadcrumb" className="hidden min-w-0 flex-1 items-center gap-1.5 text-sm md:flex">
        {segments.map((seg, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          const label = labelMap[seg] ?? seg;
          return (
            <Fragment key={href}>
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />}
              {isLast ? (
                <span className="truncate font-medium text-foreground">{label}</span>
              ) : (
                <Link to={href as any} className="truncate text-muted-foreground transition-colors hover:text-foreground">
                  {label}
                </Link>
              )}
            </Fragment>
          );
        })}
      </nav>

      <div className="flex-1 md:hidden" />

      <button
        onClick={onOpenCommand}
        className={cn(
          "hidden items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground md:inline-flex md:w-72",
        )}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">Cari halaman, project, aksi…</span>
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
      </button>

      <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpenCommand} aria-label="Cari">
        <Search className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" aria-label="Notifikasi" className="relative">
        <Bell className="h-4.5 w-4.5" />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
      </Button>

      <Avatar className="h-8 w-8 border border-border">
        <AvatarFallback className="bg-surface-2 text-[11px] font-medium">RA</AvatarFallback>
      </Avatar>
    </header>
  );
}
