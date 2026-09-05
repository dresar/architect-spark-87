import { createFileRoute } from "@tanstack/react-router";
import { Database, Key, Link as LinkIcon } from "lucide-react";

export const Route = createFileRoute("/_app/projects/$id/database")({ component: DbPage });

interface Column { nama: string; tipe: string; nullable?: boolean; pk?: boolean; fk?: string }
interface Table { nama: string; icon?: boolean; kolom: Column[]; x: number; y: number; }

const tabel: Table[] = [
  { nama: "pengguna", x: 40, y: 40, kolom: [
    { nama: "id", tipe: "uuid", pk: true },
    { nama: "email", tipe: "text" },
    { nama: "nama", tipe: "text" },
    { nama: "peran", tipe: "enum" },
    { nama: "dibuat_pada", tipe: "timestamp" },
  ] },
  { nama: "produk", x: 400, y: 40, kolom: [
    { nama: "id", tipe: "uuid", pk: true },
    { nama: "nama", tipe: "text" },
    { nama: "harga", tipe: "numeric" },
    { nama: "stok", tipe: "int" },
    { nama: "vendor_id", tipe: "uuid", fk: "pengguna.id" },
  ] },
  { nama: "pesanan", x: 40, y: 300, kolom: [
    { nama: "id", tipe: "uuid", pk: true },
    { nama: "pembeli_id", tipe: "uuid", fk: "pengguna.id" },
    { nama: "total", tipe: "numeric" },
    { nama: "status", tipe: "enum" },
    { nama: "dibuat_pada", tipe: "timestamp" },
  ] },
  { nama: "pesanan_item", x: 400, y: 300, kolom: [
    { nama: "id", tipe: "uuid", pk: true },
    { nama: "pesanan_id", tipe: "uuid", fk: "pesanan.id" },
    { nama: "produk_id", tipe: "uuid", fk: "produk.id" },
    { nama: "kuantitas", tipe: "int" },
    { nama: "harga_saat_itu", tipe: "numeric" },
  ] },
];

function DbPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-6 md:px-6 md:py-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">Skema Database</div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Entity Relationship Diagram</h2>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Database className="h-3.5 w-3.5 text-primary" /> PostgreSQL 16 · 4 tabel · 20 kolom
        </div>
      </div>

      <div className="relative min-h-[560px] overflow-x-auto rounded-2xl border border-border bg-surface p-2">
        <div className="relative min-w-[860px]" style={{ height: 560 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(oklch(0.28 0.008 60) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          {tabel.map((t) => (
            <div key={t.nama} className="absolute w-[300px] overflow-hidden rounded-lg border border-border bg-background shadow-[var(--shadow-md)]" style={{ left: t.x, top: t.y }}>
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3 py-2">
                <Database className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">{t.nama}</span>
                <span className="ml-auto text-[10.5px] text-muted-foreground">{t.kolom.length} kolom</span>
              </div>
              <ul className="divide-y divide-border">
                {t.kolom.map((c) => (
                  <li key={c.nama} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-1.5 text-[12px]">
                    {c.pk ? <Key className="h-3 w-3 text-primary" /> : c.fk ? <LinkIcon className="h-3 w-3 text-info" /> : <span className="h-3 w-3" />}
                    <span className="truncate font-medium text-foreground">{c.nama}</span>
                    <span className="text-[10.5px] text-muted-foreground">{c.tipe}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
