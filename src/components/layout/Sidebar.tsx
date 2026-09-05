import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  LayoutTemplate,
  Settings,
  Sparkles,
  Workflow,
  FileText,
  Layers,
  Database,
  Radio,
  Wand2,
  ListChecks,
  History,
  Download,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  params?: Record<string, string>;
}

const utama: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Project", to: "/projects", icon: FolderKanban },
  { label: "Template", to: "/templates", icon: LayoutTemplate },
];

const sistem: NavItem[] = [{ label: "Pengaturan", to: "/settings", icon: Settings }];

const projectNav = (id: string): NavItem[] => [
  { label: "Overview", to: "/projects/$id/overview", icon: LayoutDashboard, params: { id } },
  { label: "AI Interview", to: "/projects/$id/interview", icon: MessageSquare, params: { id } },
  { label: "Canvas Workflow", to: "/projects/$id/canvas", icon: Workflow, params: { id } },
  { label: "PRD Workspace", to: "/projects/$id/prd", icon: FileText, params: { id } },
  { label: "Arsitektur", to: "/projects/$id/architecture", icon: Layers, params: { id } },
  { label: "Database", to: "/projects/$id/database", icon: Database, params: { id } },
  { label: "API", to: "/projects/$id/api", icon: Radio, params: { id } },
  { label: "Prompt Studio", to: "/projects/$id/prompts", icon: Wand2, params: { id } },
  { label: "Task Manager", to: "/projects/$id/tasks", icon: ListChecks, params: { id } },
  { label: "History", to: "/projects/$id/history", icon: History, params: { id } },
  { label: "Ekspor", to: "/projects/$id/export", icon: Download, params: { id } },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const match = pathname.match(/^\/projects\/([^/]+)/);
  const activeProjectId = match?.[1];
  const activeProject = activeProjectId ? projects.find((p) => p.id === activeProjectId) : null;

  return (
    <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold tracking-tight">AI Software Architect</div>
          <div className="truncate text-[10.5px] text-muted-foreground">Studio perencanaan</div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-6 px-3 py-4">
          <NavGroup label="Utama" items={utama} pathname={pathname} onNavigate={onNavigate} />

          {activeProject && (
            <div>
              <div className="mb-2 flex items-center justify-between px-2">
                <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Project Aktif</div>
              </div>
              <div className="mb-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: activeProject.warna }} />
                  <div className="min-w-0">
                    <div className="truncate text-[12.5px] font-medium">{activeProject.nama}</div>
                    <div className="truncate text-[10.5px] text-muted-foreground">{activeProject.platform} • {activeProject.frontend}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                {projectNav(activeProject.id).map((item) => (
                  <NavLink key={item.label} item={item} pathname={pathname} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          )}

          <NavGroup label="Sistem" items={sistem} pathname={pathname} onNavigate={onNavigate} />
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-md border border-sidebar-border bg-sidebar-accent/40 p-3">
          <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Gemini aktif · Groq siaga
          </div>
          <div className="mt-1 text-[10.5px] text-muted-foreground">Rotation: prioritas</div>
        </div>
      </div>
    </aside>
  );
}

function NavGroup({ label, items, pathname, onNavigate }: { label: string; items: NavItem[]; pathname: string; onNavigate?: () => void }) {
  return (
    <div>
      <div className="mb-2 px-2 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <NavLink key={item.label} item={item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function NavLink({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate?: () => void }) {
  const Icon = item.icon;
  const isActive =
    item.params
      ? pathname === item.to.replace("$id", item.params.id!)
      : pathname === item.to || pathname.startsWith(item.to + "/");

  return (
    <Link
      to={item.to as any}
      params={item.params as any}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
