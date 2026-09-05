import { createFileRoute } from "@tanstack/react-router";
import { tasks, type Task, type TaskStatus, type Prioritas } from "@/data/tasks";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Calendar, CheckSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/projects/$id/tasks")({ component: TasksPage });

const kolom: { id: TaskStatus; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "progress", label: "Sedang Dikerjakan" },
  { id: "review", label: "Review" },
  { id: "selesai", label: "Selesai" },
];

const priColor: Record<Prioritas, string> = {
  rendah: "bg-muted text-muted-foreground border-border",
  sedang: "bg-info/15 text-info border-info/30",
  tinggi: "bg-warning/15 text-warning border-warning/30",
  kritis: "bg-destructive/15 text-destructive border-destructive/30",
};

function TasksPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-6 md:px-6 md:py-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Task Manager</div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Kanban</h2>
        </div>
        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:opacity-95"><Plus className="h-4 w-4" /> Task Baru</Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kolom.map((k) => {
          const items = tasks.filter((t) => t.status === k.id);
          return (
            <div key={k.id} className="flex min-h-[400px] flex-col rounded-xl border border-border bg-surface p-2">
              <div className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center gap-2">
                  <span className={cn("h-1.5 w-1.5 rounded-full", k.id === "todo" && "bg-muted-foreground", k.id === "progress" && "bg-info", k.id === "review" && "bg-warning", k.id === "selesai" && "bg-success")} />
                  <span className="text-sm font-medium">{k.label}</span>
                  <span className="text-[10.5px] text-muted-foreground">{items.length}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="h-3.5 w-3.5" /></Button>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-1">
                {items.map((t) => <TaskCard key={t.id} t={t} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({ t }: { t: Task }) {
  const done = t.checklist.filter((c) => c.selesai).length;
  return (
    <div className="cursor-grab rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-2">
        <span className={cn("inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium capitalize", priColor[t.prioritas])}>{t.prioritas}</span>
        <span className="text-[10.5px] text-muted-foreground">{t.id.toUpperCase()}</span>
      </div>
      <h4 className="mt-2 text-[13px] font-medium leading-snug text-foreground">{t.judul}</h4>
      <p className="mt-1 line-clamp-2 text-[11.5px] text-muted-foreground">{t.deskripsi}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {t.label.map((l) => <Badge key={l} variant="outline" className="border-border text-[10px] text-muted-foreground">{l}</Badge>)}
      </div>
      {t.checklist.length > 0 && (
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[10.5px] text-muted-foreground"><span className="flex items-center gap-1"><CheckSquare className="h-3 w-3" /> {done}/{t.checklist.length}</span><span className="tabular-nums">{t.progress}%</span></div>
          <Progress value={t.progress} className="h-1" />
        </div>
      )}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[10.5px] text-muted-foreground">
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {format(new Date(t.jatuhTempo), "d MMM", { locale: idLocale })}</span>
        <span>{t.pemilik}</span>
      </div>
    </div>
  );
}
