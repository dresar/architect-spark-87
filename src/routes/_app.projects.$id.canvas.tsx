import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize, Grid3x3, Plus, Layers, Database, Radio, Users, Wand2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/_app/projects/$id/canvas")({ component: CanvasPage });

interface Node { id: string; label: string; type: string; x: number; y: number; icon: React.ComponentType<{ className?: string }>; warna: string }
interface Edge { from: string; to: string }

const nodes: Node[] = [
  { id: "auth", label: "Autentikasi", type: "Modul", x: 60, y: 200, icon: Users, warna: "oklch(0.72 0.14 235)" },
  { id: "catalog", label: "Katalog Produk", type: "Modul", x: 340, y: 90, icon: Layers, warna: "oklch(0.74 0.17 55)" },
  { id: "cart", label: "Keranjang", type: "Modul", x: 620, y: 90, icon: Layers, warna: "oklch(0.74 0.17 55)" },
  { id: "order", label: "Pesanan", type: "Modul", x: 900, y: 200, icon: Layers, warna: "oklch(0.74 0.17 55)" },
  { id: "payment", label: "Pembayaran", type: "Modul", x: 900, y: 400, icon: Wand2, warna: "oklch(0.82 0.16 85)" },
  { id: "db", label: "PostgreSQL", type: "Database", x: 340, y: 460, icon: Database, warna: "oklch(0.72 0.16 155)" },
  { id: "api", label: "REST API", type: "Layanan", x: 620, y: 340, icon: Radio, warna: "oklch(0.65 0.22 320)" },
];

const edges: Edge[] = [
  { from: "auth", to: "catalog" },
  { from: "catalog", to: "cart" },
  { from: "cart", to: "order" },
  { from: "order", to: "payment" },
  { from: "api", to: "db" },
  { from: "catalog", to: "api" },
  { from: "order", to: "api" },
];

function CanvasPage() {
  return (
    <div className="flex h-[calc(100vh-56px-101px)] w-full min-w-0">
      {/* Palette */}
      <aside className="hidden w-56 shrink-0 border-r border-border bg-surface p-3 lg:block">
        <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Palet Node</div>
        <ScrollArea className="mt-2 h-full">
          <div className="flex flex-col gap-1.5">
            {[
              { label: "Modul", icon: Layers },
              { label: "Halaman", icon: Grid3x3 },
              { label: "Database", icon: Database },
              { label: "API Endpoint", icon: Radio },
              { label: "Aktor", icon: Users },
              { label: "Fungsi AI", icon: Wand2 },
            ].map(({ label, icon: Icon }) => (
              <button key={label} className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-2 text-left text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5">
                <Icon className="h-3.5 w-3.5 text-primary" />{label}
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Canvas */}
      <div className="relative flex-1 min-w-0 overflow-hidden bg-background">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(oklch(0.28 0.008 60) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
          {edges.map((e, i) => {
            const a = nodes.find((n) => n.id === e.from)!;
            const b = nodes.find((n) => n.id === e.to)!;
            const midX = (a.x + b.x) / 2;
            return (
              <path key={i} d={`M ${a.x + 100} ${a.y + 30} C ${midX} ${a.y + 30}, ${midX} ${b.y + 30}, ${b.x} ${b.y + 30}`} stroke="oklch(0.4 0.02 60)" strokeWidth="1.5" fill="none" />
            );
          })}
          {nodes.map((n) => {
            const Icon = n.icon;
            return (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <rect width="200" height="64" rx="10" fill="oklch(0.19 0.007 60)" stroke={n.warna} strokeOpacity="0.5" strokeWidth="1" />
                <rect x="0" y="0" width="4" height="64" rx="1" fill={n.warna} />
                <foreignObject x="14" y="12" width="180" height="42">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-9 w-9 place-items-center rounded-md" style={{ backgroundColor: `${n.warna}22`, color: n.warna }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-medium text-foreground">{n.label}</div>
                      <div className="text-[10.5px] text-muted-foreground">{n.type}</div>
                    </div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Toolbar */}
        <div className="absolute right-4 top-4 flex flex-col gap-1 rounded-lg border border-border bg-surface/90 p-1 backdrop-blur">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ZoomIn className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><ZoomOut className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Maximize className="h-4 w-4" /></Button>
        </div>

        <div className="absolute bottom-4 left-4 h-32 w-48 overflow-hidden rounded-lg border border-border bg-surface/80 p-2 backdrop-blur">
          <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Mini Map</div>
          <div className="relative mt-1 h-[92px] w-full rounded border border-border bg-background">
            {nodes.map((n) => (<span key={n.id} className="absolute h-1.5 w-3 rounded-sm" style={{ left: `${(n.x / 1200) * 100}%`, top: `${(n.y / 600) * 100}%`, backgroundColor: n.warna }} />))}
          </div>
        </div>

        <Button className="absolute bottom-4 right-4 gap-1.5 bg-primary text-primary-foreground shadow-[var(--shadow-elevated)] hover:opacity-95">
          <Plus className="h-4 w-4" /> Tambah Node
        </Button>
      </div>
    </div>
  );
}
