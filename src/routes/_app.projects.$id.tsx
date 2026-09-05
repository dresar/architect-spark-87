import { createFileRoute, Outlet, Link, useParams, useRouterState, redirect, notFound } from "@tanstack/react-router";
import { projects, formatRelatif } from "@/data/projects";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, MoreHorizontal, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/projects/$id")({
  beforeLoad: ({ params, location }) => {
    if (!projects.find((p) => p.id === params.id)) throw notFound();
    if (location.pathname === `/projects/${params.id}` || location.pathname === `/projects/${params.id}/`) {
      throw redirect({ to: "/projects/$id/overview", params: { id: params.id } });
    }
  },
  component: ProjectLayout,
});

const tabs = [
  { to: "/projects/$id/overview", label: "Overview" },
  { to: "/projects/$id/interview", label: "Interview" },
  { to: "/projects/$id/canvas", label: "Canvas" },
  { to: "/projects/$id/prd", label: "PRD" },
  { to: "/projects/$id/architecture", label: "Arsitektur" },
  { to: "/projects/$id/database", label: "Database" },
  { to: "/projects/$id/api", label: "API" },
  { to: "/projects/$id/prompts", label: "Prompts" },
  { to: "/projects/$id/tasks", label: "Tasks" },
  { to: "/projects/$id/history", label: "History" },
  { to: "/projects/$id/export", label: "Ekspor" },
] as const;

function ProjectLayout() {
  const { id } = useParams({ from: "/_app/projects/$id" });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const project = projects.find((p) => p.id === id)!;

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col">
      <div className="border-b border-border bg-surface/60">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-5 md:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8 shrink-0"><Link to="/projects"><ArrowLeft className="h-4 w-4" /></Link></Button>
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: project.warna }} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-lg font-semibold tracking-tight text-foreground md:text-xl">{project.nama}</h1>
                  {project.favorit && <Star className="h-4 w-4 shrink-0 fill-primary text-primary" />}
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {project.platform} • {project.frontend} • {project.backend} • {project.database} • {project.aiTarget}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">Diubah {formatRelatif(project.diubah)}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5"><Share2 className="h-3.5 w-3.5" /> Bagikan</Button>
              <Button variant="ghost" size="icon" className="h-9 w-9"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 md:-mx-6 md:px-6">
            <nav className="flex min-w-max items-center gap-1">
              {tabs.map((t) => {
                const href = t.to.replace("$id", id);
                const active = pathname === href;
                return (
                  <Link
                    key={t.to}
                    to={t.to}
                    params={{ id }}
                    className={cn("relative rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
                  >
                    {t.label}
                    {active && <span className="absolute inset-x-2 -bottom-[13px] h-[2px] rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
