import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings/shortcut")({ component: ShortcutPage });

const shortcuts = [
  { grup: "Navigasi", items: [
    { aksi: "Buka Command Palette", keys: ["⌘", "K"] },
    { aksi: "Buka Dashboard", keys: ["G", "D"] },
    { aksi: "Buka Daftar Project", keys: ["G", "P"] },
    { aksi: "Buka Pengaturan", keys: ["G", "S"] },
  ] },
  { grup: "Aksi", items: [
    { aksi: "Project Baru", keys: ["⌘", "N"] },
    { aksi: "Simpan", keys: ["⌘", "S"] },
    { aksi: "Cari Global", keys: ["/"] },
  ] },
  { grup: "Editor", items: [
    { aksi: "Salin Prompt", keys: ["⌘", "Shift", "C"] },
    { aksi: "Regenerate Prompt", keys: ["⌘", "R"] },
  ] },
];

function ShortcutPage() {
  return (
    <div className="flex flex-col gap-4">
      {shortcuts.map((g) => (
        <div key={g.grup} className="rounded-xl border border-border bg-surface">
          <div className="border-b border-border px-6 py-4"><h3 className="text-sm font-medium text-foreground">{g.grup}</h3></div>
          <ul className="divide-y divide-border">
            {g.items.map((s) => (
              <li key={s.aksi} className="flex items-center justify-between px-6 py-3">
                <span className="text-sm text-foreground">{s.aksi}</span>
                <div className="flex items-center gap-1">
                  {s.keys.map((k) => <kbd key={k} className="min-w-[24px] rounded border border-border bg-background px-1.5 py-0.5 text-center font-mono text-[11px] text-muted-foreground">{k}</kbd>)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
