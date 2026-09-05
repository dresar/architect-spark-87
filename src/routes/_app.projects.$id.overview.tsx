import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { projects, formatRelatif } from "@/data/projects";
import { StatCard } from "@/components/common/StatCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ListChecks, FileText, Radio, Wand2, ArrowUpRight, MessageSquare } from "lucide-react";
import { tasks } from "@/data/tasks";
import { endpoints } from "@/data/endpoints";
import { prompts } from "@/data/prompts";
import { aktivitas } from "@/data/activities";

export const Route = createFileRoute("/_app/projects/$id/overview")({
  component: OverviewPage,
});

function OverviewPage() {
  const { id } = useParams({ from: "/_app/projects/$id/overview" });
  const p = projects.find((x) => x.id === id)!;
  const taskSelesai = tasks.filter((t) => t.status === "selesai").length;

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Progress" value={`${p.progress}%`} icon={ListChecks} />
        <StatCard label="Task Selesai" value={`${taskSelesai}/${tasks.length}`} icon={ListChecks} />
        <StatCard label="Endpoint API" value={endpoints.length} icon={Radio} />
        <StatCard label="Prompt" value={prompts.length} icon={Wand2} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-medium text-foreground">Deskripsi</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.deskripsi}</p>
            <div className="mt-5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground"><span>Progress keseluruhan</span><span className="tabular-nums text-foreground">{p.progress}%</span></div>
              <Progress value={p.progress} className="h-1.5" />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <ActionCard to="/projects/$id/interview" id={id} icon={MessageSquare} judul="Lanjutkan Interview" deskripsi="12 dari 18 pertanyaan terjawab." />
            <ActionCard to="/projects/$id/prd" id={id} icon={FileText} judul="Buka PRD" deskripsi="9 tab, 2 perlu review." />
            <ActionCard to="/projects/$id/tasks" id={id} icon={ListChecks} judul="Task Manager" deskripsi="4 task aktif hari ini." />
            <ActionCard to="/projects/$id/prompts" id={id} icon={Wand2} judul="Prompt Studio" deskripsi="Master prompt telah digenerate." />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface">
          <div className="px-5 py-4"><h3 className="text-sm font-medium">Aktivitas</h3></div>
          <ol className="relative px-5 pb-5">
            <div className="absolute left-[26px] top-1 bottom-4 w-px bg-border" />
            {aktivitas.slice(0, 6).map((a) => (
              <li key={a.id} className="relative flex gap-3 py-2.5">
                <span className="relative z-10 mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-border bg-surface"><span className="h-1.5 w-1.5 rounded-full bg-primary" /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-snug text-foreground"><span className="font-medium">{a.aktor}</span> {a.aksi} <span>{a.target}</span></p>
                  <p className="text-[11px] text-muted-foreground">{formatRelatif(a.waktu)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ to, id, icon: Icon, judul, deskripsi }: { to: string; id: string; icon: React.ComponentType<{ className?: string }>; judul: string; deskripsi: string }) {
  return (
    <Link to={to as any} params={{ id } as any} className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/40 hover:bg-primary/5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-surface-2 text-primary"><Icon className="h-4 w-4" /></span>
        <div className="min-w-0"><div className="truncate text-sm font-medium text-foreground">{judul}</div><div className="truncate text-xs text-muted-foreground">{deskripsi}</div></div>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
    </Link>
  );
}
