import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  FolderKanban,
  Wand2,
  ListChecks,
  Zap,
  ArrowUpRight,
  Star,
  MessageSquare,
  Workflow,
  Wand,
} from "lucide-react";
import { projects, formatRelatif } from "@/data/projects";
import { aktivitas } from "@/data/activities";
import { templates } from "@/data/templates";
import { providers } from "@/data/providers";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — AI Software Architect" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const aktif = projects.filter((p) => !p.arsip && p.status !== "selesai");
  const favorit = projects.filter((p) => p.favorit && !p.arsip);
  const lanjutkan = aktif[0];

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      <PageHeader
        eyebrow="Selamat datang kembali"
        judul="Halo, Raka"
        deskripsi="Lanjutkan perancangan aplikasi kamu atau mulai project baru dari template."
        aksi={
          <>
            <Button variant="outline" asChild>
              <Link to="/projects">Semua Project</Link>
            </Button>
            <Button asChild className="gap-2 bg-primary text-primary-foreground hover:opacity-95">
              <Link to="/projects/baru"><Plus className="h-4 w-4" /> Project Baru</Link>
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Project Aktif" value={aktif.length} icon={FolderKanban} delta={{ arah: "naik", nilai: "+2" }} hint="dari bulan lalu" />
        <StatCard label="Prompt Digenerate" value={"1.284"} icon={Wand2} delta={{ arah: "naik", nilai: "+18%" }} />
        <StatCard label="Task Selesai" value={"312"} icon={ListChecks} delta={{ arah: "naik", nilai: "+24" }} hint="7 hari terakhir" />
        <StatCard label="Request AI" value={"17.168"} icon={Zap} delta={{ arah: "turun", nilai: "-4%" }} hint="rata-rata harian" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Left column */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* Continue project */}
          {lanjutkan && (
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
                style={{ background: `radial-gradient(closest-side, ${lanjutkan.warna} 0%, transparent 70%)` }}
              />
              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Lanjutkan project
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{lanjutkan.nama}</h2>
                  <p className="max-w-xl text-sm text-muted-foreground">{lanjutkan.deskripsi}</p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted-foreground">
                    <span>{lanjutkan.platform} • {lanjutkan.frontend}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>Diperbarui {formatRelatif(lanjutkan.diubah)}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <StatusBadge status={lanjutkan.status} />
                  </div>
                  <div className="mt-3 max-w-md space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Progress</span><span className="tabular-nums text-foreground">{lanjutkan.progress}%</span>
                    </div>
                    <Progress value={lanjutkan.progress} className="h-1.5" />
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="outline" asChild>
                    <Link to="/projects/$id/canvas" params={{ id: lanjutkan.id }}><Workflow className="mr-2 h-4 w-4" /> Canvas</Link>
                  </Button>
                  <Button asChild className="bg-primary text-primary-foreground hover:opacity-95">
                    <Link to="/projects/$id/overview" params={{ id: lanjutkan.id }}>Buka <ArrowUpRight className="ml-1.5 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Recent projects */}
          <div className="rounded-2xl border border-border bg-surface">
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">Project Terbaru</h3>
                <p className="text-xs text-muted-foreground">Diurutkan berdasarkan aktivitas terakhir.</p>
              </div>
              <Button variant="ghost" size="sm" asChild><Link to="/projects">Lihat semua</Link></Button>
            </div>
            <Separator />
            <ul className="divide-y divide-border">
              {aktif.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link
                    to="/projects/$id/overview"
                    params={{ id: p.id }}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 transition-colors hover:bg-accent/40"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-surface-2" style={{ boxShadow: `inset 0 0 0 1px ${p.warna}22` }}>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.warna }} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-foreground">{p.nama}</span>
                        {p.favorit && <Star className="h-3.5 w-3.5 fill-primary text-primary" />}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">{p.platform} • {p.frontend} • {p.aiTarget}</div>
                    </div>
                    <div className="hidden items-center gap-4 sm:flex">
                      <div className="w-24">
                        <Progress value={p.progress} className="h-1" />
                      </div>
                      <StatusBadge status={p.status} />
                      <span className="w-24 text-right text-[11px] text-muted-foreground">{formatRelatif(p.diubah)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* AI provider status */}
          <div className="rounded-2xl border border-border bg-surface">
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">Status AI Provider</h3>
                <p className="text-xs text-muted-foreground">Rotation: prioritas + fallback.</p>
              </div>
              <Button variant="ghost" size="sm" asChild><Link to="/settings/ai">Atur</Link></Button>
            </div>
            <Separator />
            <div className="divide-y divide-border">
              {providers.map((p) => (
                <div key={p.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${p.health === "sehat" ? "bg-success" : "bg-warning"}`} />
                      <span className="text-sm font-medium text-foreground">{p.nama}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">prioritas {p.prioritas}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {p.avgResponseMs}ms · {p.totalRequest.toLocaleString("id-ID")} req · {p.totalError} error
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-muted-foreground">Kuota</div>
                    <div className="text-xs font-medium tabular-nums text-foreground">
                      {Math.round((1 - (p.quota - p.totalRequest * 4) / p.quota) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-2xl border border-border bg-surface">
            <div className="px-5 py-4">
              <h3 className="text-sm font-medium text-foreground">Aktivitas Terakhir</h3>
              <p className="text-xs text-muted-foreground">Perubahan terbaru pada project kamu.</p>
            </div>
            <Separator />
            <ol className="relative px-5 py-4">
              <div className="absolute left-[26px] top-4 bottom-4 w-px bg-border" />
              {aktivitas.map((a) => (
                <li key={a.id} className="relative flex gap-3 py-2.5">
                  <span className="relative z-10 mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-border bg-surface">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-snug text-foreground">
                      <span className="font-medium">{a.aktor}</span> {a.aksi}{" "}
                      <span className="text-foreground">{a.target}</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground">{formatRelatif(a.waktu)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Shortcuts */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-sm font-medium text-foreground">Aksi Cepat</h3>
            <p className="text-xs text-muted-foreground">Fitur yang sering kamu pakai.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <ShortcutTile to="/projects/baru" icon={Plus} label="Project Baru" />
              <ShortcutTile to="/templates" icon={Wand} label="Buka Template" />
              <ShortcutTile to="/projects" icon={FolderKanban} label="Daftar Project" />
              <ShortcutTile to="/settings/ai" icon={Zap} label="Konfigurasi AI" />
            </div>
          </div>

          {/* Favorites */}
          <div className="rounded-2xl border border-border bg-surface">
            <div className="px-5 py-4">
              <h3 className="text-sm font-medium text-foreground">Favorit</h3>
              <p className="text-xs text-muted-foreground">Project & template yang kamu tandai.</p>
            </div>
            <Separator />
            <div className="grid gap-2 p-3">
              {favorit.slice(0, 3).map((p) => (
                <Link key={p.id} to="/projects/$id/overview" params={{ id: p.id }} className="flex items-center gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-border hover:bg-accent/40">
                  <span className="grid h-8 w-8 place-items-center rounded-md border border-border bg-surface-2"><Star className="h-3.5 w-3.5 text-primary" /></span>
                  <div className="min-w-0 flex-1"><div className="truncate text-[13px] font-medium text-foreground">{p.nama}</div><div className="truncate text-[11px] text-muted-foreground">Project</div></div>
                </Link>
              ))}
              {templates.filter((t) => t.favorit).slice(0, 2).map((t) => (
                <Link key={t.id} to="/templates" className="flex items-center gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-border hover:bg-accent/40">
                  <span className="grid h-8 w-8 place-items-center rounded-md border border-border bg-surface-2"><Wand className="h-3.5 w-3.5 text-primary" /></span>
                  <div className="min-w-0 flex-1"><div className="truncate text-[13px] font-medium text-foreground">{t.nama}</div><div className="truncate text-[11px] text-muted-foreground">Template</div></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortcutTile({ to, icon: Icon, label }: { to: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Link
      to={to as any}
      className="group flex items-center gap-2.5 rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      <span className="grid h-7 w-7 place-items-center rounded-md bg-surface text-primary"><Icon className="h-3.5 w-3.5" /></span>
      <span className="truncate">{label}</span>
    </Link>
  );
}
