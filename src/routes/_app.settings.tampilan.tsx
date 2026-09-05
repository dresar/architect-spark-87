import { createFileRoute } from "@tanstack/react-router";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_app/settings/tampilan")({ component: TampilanPage });

const aksen = [
  { nama: "Oranye", warna: "oklch(0.74 0.17 55)", aktif: true },
  { nama: "Biru", warna: "oklch(0.72 0.14 235)" },
  { nama: "Hijau", warna: "oklch(0.72 0.16 155)" },
  { nama: "Ungu", warna: "oklch(0.65 0.22 320)" },
  { nama: "Kuning", warna: "oklch(0.82 0.16 85)" },
];

function TampilanPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-6 py-5"><h2 className="text-base font-medium text-foreground">Tema</h2><p className="text-xs text-muted-foreground">Aplikasi dioptimalkan untuk dark mode.</p></div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["Gelap", "Terang", "Otomatis"].map((t, i) => (
              <button key={t} className={cn("rounded-lg border p-4 text-left transition-colors", i === 0 ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40")}>
                <div className="mb-3 h-16 rounded-md border border-border" style={{ background: i === 0 ? "linear-gradient(135deg, oklch(0.19 0.007 60), oklch(0.16 0.006 60))" : i === 1 ? "linear-gradient(135deg, #f5f5f5, #ffffff)" : "linear-gradient(135deg, #333, #f5f5f5)" }} />
                <div className="text-sm font-medium">{t}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-6 py-5"><h2 className="text-base font-medium text-foreground">Warna Aksen</h2><p className="text-xs text-muted-foreground">Digunakan untuk tombol utama dan highlight.</p></div>
        <div className="grid grid-cols-3 gap-3 p-6 sm:grid-cols-5">
          {aksen.map((a) => (
            <button key={a.nama} className={cn("group flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors", a.aktif ? "border-primary" : "border-border hover:border-primary/40")}>
              <div className="relative h-10 w-10 rounded-full" style={{ backgroundColor: a.warna }}>
                {a.aktif && <span className="absolute inset-0 grid place-items-center text-primary-foreground"><Check className="h-4 w-4" /></span>}
              </div>
              <span className="text-[11px] font-medium">{a.nama}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between"><Label>Densitas Padat</Label><Switch /></div>
        <p className="mt-1 text-xs text-muted-foreground">Kompres spacing komponen untuk layar besar.</p>
      </div>
    </div>
  );
}
