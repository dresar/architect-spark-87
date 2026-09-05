import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FileText, FileJson, FileArchive, Copy, FileDown, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/projects/$id/export")({ component: ExportPage });

const opsi = [
  { id: "md", nama: "Markdown", deskripsi: "Semua dokumen PRD dan prompt dalam satu file .md.", icon: FileText, ext: ".md", warna: "oklch(0.74 0.17 55)" },
  { id: "pdf", nama: "PDF", deskripsi: "Dokumentasi lengkap yang siap dibagikan.", icon: FileDown, ext: ".pdf", warna: "oklch(0.65 0.22 25)" },
  { id: "json", nama: "JSON", deskripsi: "Struktur data lengkap untuk integrasi.", icon: FileJson, ext: ".json", warna: "oklch(0.72 0.14 235)" },
  { id: "zip", nama: "ZIP", deskripsi: "Bundel semua file (Markdown, JSON, aset).", icon: FileArchive, ext: ".zip", warna: "oklch(0.82 0.16 85)" },
  { id: "clip", nama: "Salin Master Prompt", deskripsi: "Copy master prompt langsung ke clipboard.", icon: Copy, ext: "", warna: "oklch(0.72 0.16 155)" },
];

function ExportPage() {
  const [done, setDone] = useState<string | null>(null);
  function pilih(id: string, nama: string) {
    setDone(id);
    toast.success(`${nama} berhasil disiapkan`, { description: "Kamu akan menerima file dalam beberapa detik." });
    setTimeout(() => setDone(null), 2000);
  }
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <div>
        <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Ekspor</div>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Pilih format ekspor</h2>
        <p className="mt-1 text-sm text-muted-foreground">Kamu bisa membagikan seluruh hasil rancangan project ini ke tim maupun ke AI coding.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {opsi.map((o) => {
          const Icon = o.icon;
          const active = done === o.id;
          return (
            <div key={o.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md" style={{ backgroundColor: `${o.warna}22`, color: o.warna }}><Icon className="h-5 w-5" /></div>
                {o.ext && <span className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground">{o.ext}</span>}
              </div>
              <h3 className="mt-3 text-sm font-medium text-foreground">{o.nama}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{o.deskripsi}</p>
              <Button onClick={() => pilih(o.id, o.nama)} className="mt-4 w-full gap-1.5 bg-primary text-primary-foreground hover:opacity-95">
                {active ? <><Check className="h-4 w-4" /> Selesai</> : "Ekspor"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
