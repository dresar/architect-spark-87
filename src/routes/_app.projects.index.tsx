import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects, formatRelatif } from "@/data/projects";
import { Plus, Search, LayoutGrid, List, Star, MoreHorizontal, Archive, Copy, Trash2, FolderKanban } from "lucide-react";

export const Route = createFileRoute("/_app/projects/")({
  head: () => ({ meta: [{ title: "Project — AI Software Architect" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [platform, setPlatform] = useState<string>("semua");
  const [status, setStatus] = useState<string>("semua");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<string>("terbaru");

  const filtered = useMemo(() => {
    let list = projects.slice();
    if (q) list = list.filter((p) => p.nama.toLowerCase().includes(q.toLowerCase()) || p.deskripsi.toLowerCase().includes(q.toLowerCase()));
    if (platform !== "semua") list = list.filter((p) => p.platform === platform);
    if (status !== "semua") list = list.filter((p) => p.status === status);
    list.sort((a, b) => {
      if (sort === "terbaru") return +new Date(b.diubah) - +new Date(a.diubah);
      if (sort === "terlama") return +new Date(a.diubah) - +new Date(b.diubah);
      if (sort === "nama") return a.nama.localeCompare(b.nama);
      if (sort === "progress") return b.progress - a.progress;
      return 0;
    });
    return list;
  }, [q, platform, status, sort]);

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <PageHeader
        judul="Project"
        deskripsi="Kelola seluruh project perancangan kamu. Cari, filter, favoritkan, atau arsipkan."
        aksi={
          <Button asChild className="gap-2 bg-primary text-primary-foreground hover:opacity-95">
            <Link to="/projects/baru"><Plus className="h-4 w-4" /> Project Baru</Link>
          </Button>
        }
      />

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari project…" className="h-9 border-border bg-background pl-9" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="h-9 w-[140px] bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Platform</SelectItem>
              <SelectItem value="Web">Web</SelectItem>
              <SelectItem value="Android">Android</SelectItem>
              <SelectItem value="iOS">iOS</SelectItem>
              <SelectItem value="Desktop">Desktop</SelectItem>
              <SelectItem value="PWA">PWA</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 w-[140px] bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="aktif">Aktif</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="selesai">Selesai</SelectItem>
              <SelectItem value="arsip">Diarsipkan</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-9 w-[140px] bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="terbaru">Terbaru</SelectItem>
              <SelectItem value="terlama">Terlama</SelectItem>
              <SelectItem value="nama">Nama A–Z</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList className="h-9 bg-background">
              <TabsTrigger value="grid" className="gap-1.5"><LayoutGrid className="h-3.5 w-3.5" /> Grid</TabsTrigger>
              <TabsTrigger value="list" className="gap-1.5"><List className="h-3.5 w-3.5" /> List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FolderKanban} judul="Tidak ada project" deskripsi="Coba ubah filter atau buat project baru." aksi={<Button asChild><Link to="/projects/baru">Project Baru</Link></Button>} />
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <div key={p.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border/80">
              <div
                aria-hidden
                className="h-24 w-full"
                style={{ background: `linear-gradient(135deg, ${p.warna}44, transparent)` }}
              />
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.warna }} />
                      <Link to="/projects/$id/overview" params={{ id: p.id }} className="truncate text-[14px] font-medium text-foreground transition-colors hover:text-primary">{p.nama}</Link>
                      {p.favorit && <Star className="h-3.5 w-3.5 shrink-0 fill-primary text-primary" />}
                    </div>
                    <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{p.platform} • {p.frontend}</div>
                  </div>
                  <ProjectMenu />
                </div>
                <p className="line-clamp-2 flex-1 text-xs text-muted-foreground">{p.deskripsi}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground"><span>Progress</span><span className="tabular-nums text-foreground">{p.progress}%</span></div>
                  <Progress value={p.progress} className="h-1" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <StatusBadge status={p.status} />
                  <span className="text-[10.5px] text-muted-foreground">{formatRelatif(p.diubah)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Platform</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Progress</th>
                  <th className="px-4 py-3 font-medium">Diubah</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-accent/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: p.warna }} />
                        <Link to="/projects/$id/overview" params={{ id: p.id }} className="truncate font-medium text-foreground hover:text-primary">{p.nama}</Link>
                        {p.favorit && <Star className="h-3 w-3 fill-primary text-primary" />}
                      </div>
                      <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{p.deskripsi}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p.platform}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><Progress value={p.progress} className="h-1 w-24" /><span className="w-8 text-right text-[11px] tabular-nums text-muted-foreground">{p.progress}%</span></div></td>
                    <td className="px-4 py-3 text-[11px] text-muted-foreground">{formatRelatif(p.diubah)}</td>
                    <td className="px-4 py-3"><ProjectMenu /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem><Star className="mr-2 h-4 w-4" /> Tandai Favorit</DropdownMenuItem>
        <DropdownMenuItem><Copy className="mr-2 h-4 w-4" /> Duplikasi</DropdownMenuItem>
        <DropdownMenuItem><Archive className="mr-2 h-4 w-4" /> Arsipkan</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Hapus</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
