import { createFileRoute } from "@tanstack/react-router";
import { Folder, FolderOpen, FileCode, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/projects/$id/architecture")({ component: ArchPage });

interface Node { name: string; children?: Node[]; file?: boolean }

const tree: Node = {
  name: "src",
  children: [
    { name: "domain", children: [
      { name: "entities", children: [{ name: "User.ts", file: true }, { name: "Product.ts", file: true }, { name: "Order.ts", file: true }] },
      { name: "value-objects", children: [{ name: "Money.ts", file: true }, { name: "Email.ts", file: true }] },
      { name: "repositories", children: [{ name: "UserRepository.ts", file: true }] },
    ] },
    { name: "application", children: [
      { name: "use-cases", children: [{ name: "CreateOrder.ts", file: true }, { name: "SignIn.ts", file: true }] },
      { name: "services", children: [{ name: "PaymentService.ts", file: true }] },
    ] },
    { name: "infrastructure", children: [
      { name: "db", children: [{ name: "prisma.ts", file: true }] },
      { name: "http", children: [{ name: "server.ts", file: true }] },
    ] },
    { name: "presentation", children: [
      { name: "components", children: [{ name: "Button.tsx", file: true }] },
      { name: "pages", children: [{ name: "Home.tsx", file: true }] },
    ] },
  ],
};

const layers = [
  { nama: "Presentation", warna: "oklch(0.74 0.17 55)", modul: 12, deskripsi: "Halaman, komponen UI, hooks presentasional." },
  { nama: "Application", warna: "oklch(0.72 0.14 235)", modul: 8, deskripsi: "Use case, orkestrasi domain, service aplikasi." },
  { nama: "Domain", warna: "oklch(0.72 0.16 155)", modul: 14, deskripsi: "Entity, value object, business rule murni." },
  { nama: "Infrastructure", warna: "oklch(0.82 0.16 85)", modul: 9, deskripsi: "Database, HTTP, integrasi eksternal." },
];

function ArchPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 py-6 md:px-6 md:py-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="rounded-xl border border-border bg-surface p-3 lg:sticky lg:top-[152px] lg:self-start">
        <div className="mb-2 px-1 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Struktur Folder</div>
        <TreeItem node={tree} depth={0} defaultOpen />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Layer</div>
          <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
            {layers.map((l) => (
              <div key={l.nama} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.warna }} />
                    <span className="text-sm font-medium">{l.nama}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{l.modul} modul</span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{l.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Dependency Diagram</div>
          <div className="mt-4 flex flex-col items-stretch gap-3">
            {layers.map((l, i) => (
              <div key={l.nama} className="flex items-center gap-3">
                <div className="w-24 text-right text-xs text-muted-foreground">{l.nama}</div>
                <div className="h-8 flex-1 rounded-md border border-border bg-background" style={{ backgroundImage: `linear-gradient(90deg, ${l.warna}22, transparent)` }}>
                  <div className="grid h-full place-items-center text-[11px] font-medium text-foreground">↓ bergantung pada layer di bawahnya</div>
                </div>
                <div className="w-8 text-center text-xs text-muted-foreground">{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeItem({ node, depth, defaultOpen }: { node: Node; depth: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  if (node.file) {
    return (
      <div className="flex items-center gap-1.5 rounded px-1.5 py-1 text-[13px] text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground" style={{ paddingLeft: 8 + depth * 14 }}>
        <FileCode className="h-3.5 w-3.5 text-muted-foreground/70" /> {node.name}
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left text-[13px] font-medium text-foreground transition-colors hover:bg-accent/40" style={{ paddingLeft: 4 + depth * 14 }}>
        <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-90")} />
        {open ? <FolderOpen className="h-3.5 w-3.5 text-primary" /> : <Folder className="h-3.5 w-3.5 text-muted-foreground" />}
        {node.name}
      </button>
      {open && node.children?.map((c, i) => <TreeItem key={i} node={c} depth={depth + 1} defaultOpen={depth < 1} />)}
    </div>
  );
}
