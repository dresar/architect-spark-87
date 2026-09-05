import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { formatRelatif } from "@/data/projects";
import { RotateCcw, GitCompare, GitBranch, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/projects/$id/history")({ component: HistoryPage });

const versi = [
  { v: "v0.9.3", waktu: new Date(Date.now() - 60000 * 30).toISOString(), oleh: "Kamu", perubahan: "Update PRD bagian security & requirement non-fungsional.", jenis: "PRD" },
  { v: "v0.9.2", waktu: new Date(Date.now() - 60000 * 60 * 3).toISOString(), oleh: "AI Assistant", perubahan: "Generate ulang master prompt untuk Cursor & Claude.", jenis: "Prompt" },
  { v: "v0.9.1", waktu: new Date(Date.now() - 60000 * 60 * 8).toISOString(), oleh: "Kamu", perubahan: "Tambah 3 endpoint pembayaran dan skema respons.", jenis: "API" },
  { v: "v0.9.0", waktu: new Date(Date.now() - 60000 * 60 * 24).toISOString(), oleh: "Kamu", perubahan: "Selesai wizard project baru.", jenis: "Meta" },
  { v: "v0.8.5", waktu: new Date(Date.now() - 60000 * 60 * 40).toISOString(), oleh: "AI Assistant", perubahan: "Rekomendasi ulang skema database.", jenis: "Database" },
  { v: "v0.8.0", waktu: new Date(Date.now() - 60000 * 60 * 60).toISOString(), oleh: "Kamu", perubahan: "Rancangan awal canvas workflow.", jenis: "Canvas" },
];

function HistoryPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-4 px-4 py-6 md:px-6 md:py-8">
      <div>
        <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Riwayat Perubahan</div>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Versi & Aktivitas</h2>
      </div>
      <div className="rounded-xl border border-border bg-surface">
        <ol className="relative divide-y divide-border">
          {versi.map((v) => (
            <li key={v.v} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4">
              <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-surface-2 text-primary">
                {v.oleh === "AI Assistant" ? <Sparkles className="h-4 w-4" /> : <GitBranch className="h-4 w-4" />}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[12.5px] font-medium text-foreground">{v.v}</span>
                  <span className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{v.jenis}</span>
                </div>
                <p className="mt-0.5 text-[13px] text-foreground">{v.perubahan}</p>
                <p className="text-[11px] text-muted-foreground">{v.oleh} · {formatRelatif(v.waktu)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <Button variant="outline" size="sm" className="gap-1.5"><GitCompare className="h-3.5 w-3.5" /> Compare</Button>
                <Button variant="ghost" size="sm" className="gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Restore</Button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
