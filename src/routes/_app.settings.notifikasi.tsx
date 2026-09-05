import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_app/settings/notifikasi")({ component: NotifikasiPage });

const item = [
  { g: "Project", i: [
    { l: "Perubahan pada project favorit", d: "Kirim notifikasi saat kolaborator memperbarui project.", on: true },
    { l: "AI selesai memproses", d: "Beritahu ketika AI selesai generate prompt atau dokumen.", on: true },
    { l: "Task jatuh tempo", d: "Ingatkan task yang mendekati tenggat.", on: false },
  ] },
  { g: "Sistem", i: [
    { l: "Pembaruan produk", d: "Fitur baru dan rilis penting.", on: true },
    { l: "Peringatan AI Provider", d: "Notif ketika provider mengalami gangguan.", on: true },
    { l: "Ringkasan mingguan", d: "Kirim email ringkasan aktivitas kamu.", on: false },
  ] },
];

function NotifikasiPage() {
  return (
    <div className="flex flex-col gap-4">
      {item.map((g) => (
        <div key={g.g} className="rounded-xl border border-border bg-surface">
          <div className="border-b border-border px-6 py-4"><h3 className="text-sm font-medium text-foreground">{g.g}</h3></div>
          <ul className="divide-y divide-border">
            {g.i.map((it) => (
              <li key={it.l} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0"><Label className="text-sm">{it.l}</Label><p className="text-xs text-muted-foreground">{it.d}</p></div>
                <Switch defaultChecked={it.on} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
