import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { templates } from "@/data/templates";
import { Search, Star, Sparkles, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/templates")({
  head: () => ({ meta: [{ title: "Template — AI Software Architect" }] }),
  component: TemplatesPage,
});

function TemplatesPage() {
  const [q, setQ] = useState("");
  const [kategori, setKategori] = useState<string>("semua");
  const kategoriList = useMemo(() => ["semua", ...Array.from(new Set(templates.map((t) => t.kategori)))], []);
  const filtered = templates.filter((t) => (kategori === "semua" || t.kategori === kategori) && (t.nama.toLowerCase().includes(q.toLowerCase()) || t.deskripsi.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <PageHeader judul="Template" deskripsi="Mulai project lebih cepat dari template siap pakai untuk berbagai jenis aplikasi." eyebrow="Pustaka" />

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari template…" className="h-9 bg-background pl-9" />
        </div>
        <div className="flex flex-wrap gap-1">
          {kategoriList.map((k) => (
            <button key={k} onClick={() => setKategori(k)} className={cn("rounded-md border border-border px-2.5 py-1 text-[12px] font-medium capitalize transition-colors", kategori === k ? "border-primary/40 bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground")}>
              {k === "semua" ? "Semua" : k}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <div key={t.id} className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40">
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface-2 text-primary"><LayoutTemplate className="h-5 w-5" /></div>
              <div className="flex items-center gap-1.5">
                {t.populer && <Badge variant="outline" className="border-primary/30 bg-primary/10 text-[10px] text-primary"><Sparkles className="mr-1 h-2.5 w-2.5" /> Populer</Badge>}
                {t.favorit && <Star className="h-3.5 w-3.5 fill-primary text-primary" />}
              </div>
            </div>
            <h3 className="mt-4 text-sm font-medium text-foreground">{t.nama}</h3>
            <div className="text-[11px] text-muted-foreground">{t.kategori}</div>
            <p className="mt-2 line-clamp-3 flex-1 text-xs text-muted-foreground">{t.deskripsi}</p>
            <div className="mt-3 flex flex-wrap gap-1">{t.tag.map((tag) => <Badge key={tag} variant="outline" className="border-border text-[10px] text-muted-foreground">{tag}</Badge>)}</div>
            <Button size="sm" className="mt-4 gap-1.5 bg-primary text-primary-foreground hover:opacity-95">Gunakan Template</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
