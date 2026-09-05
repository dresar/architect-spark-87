import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { endpoints, methodColor, type Endpoint } from "@/data/endpoints";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Search, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/projects/$id/api")({ component: ApiPage });

function ApiPage() {
  const [q, setQ] = useState("");
  const [grup, setGrup] = useState("semua");
  const [selected, setSelected] = useState<Endpoint | null>(null);

  const grupList = ["semua", ...Array.from(new Set(endpoints.map((e) => e.grup)))];
  const filtered = endpoints.filter((e) => (grup === "semua" || e.grup === grup) && (e.path.toLowerCase().includes(q.toLowerCase()) || e.deskripsi.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari endpoint atau path…" className="h-9 bg-background pl-9" />
        </div>
        <Select value={grup} onValueChange={setGrup}>
          <SelectTrigger className="h-9 w-full md:w-[180px] bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>{grupList.map((g) => <SelectItem key={g} value={g}>{g === "semua" ? "Semua Grup" : g}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="w-24 px-4 py-3 font-medium">Method</th>
                <th className="px-4 py-3 font-medium">Path</th>
                <th className="px-4 py-3 font-medium">Deskripsi</th>
                <th className="w-24 px-4 py-3 font-medium">Auth</th>
                <th className="w-32 px-4 py-3 font-medium">Grup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((e) => (
                <tr key={e.id} onClick={() => setSelected(e)} className="cursor-pointer transition-colors hover:bg-accent/40">
                  <td className="px-4 py-3"><span className={cn("font-mono text-[11px] font-semibold", methodColor[e.method])}>{e.method}</span></td>
                  <td className="px-4 py-3"><span className="font-mono text-[12.5px] text-foreground">{e.path}</span></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground"><span className="line-clamp-1">{e.deskripsi}</span></td>
                  <td className="px-4 py-3"><Badge variant="outline" className="text-[10.5px]">{e.auth}</Badge></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{e.grup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2"><Radio className="h-4 w-4 text-primary" /> {selected.grup}</SheetTitle>
                <SheetDescription>Detail endpoint dan skema request/response.</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5 px-4">
                <div className="flex items-center gap-2">
                  <span className={cn("font-mono text-xs font-semibold", methodColor[selected.method])}>{selected.method}</span>
                  <span className="font-mono text-sm text-foreground">{selected.path}</span>
                </div>
                <p className="text-sm text-muted-foreground">{selected.deskripsi}</p>
                <div className="space-y-2"><div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Request</div><pre className="rounded-md border border-border bg-background p-3 font-mono text-xs text-foreground">{selected.request ?? "// tidak ada body"}</pre></div>
                <div className="space-y-2"><div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Response</div><pre className="rounded-md border border-border bg-background p-3 font-mono text-xs text-foreground">{selected.response ?? "// respons standar"}</pre></div>
                <div className="space-y-2"><div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Autentikasi</div><Badge variant="outline">{selected.auth}</Badge></div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
