import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  FolderKanban,
  LayoutTemplate,
  Settings,
  Plus,
  Cpu,
} from "lucide-react";
import { projects } from "@/data/projects";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  function go(to: string, params?: Record<string, string>) {
    onOpenChange(false);
    setTimeout(() => navigate({ to: to as any, params: params as any }), 0);
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Ketik untuk mencari halaman, project, atau aksi…" value={q} onValueChange={setQ} />
      <CommandList>
        <CommandEmpty>Tidak ada hasil.</CommandEmpty>
        <CommandGroup heading="Navigasi">
          <CommandItem onSelect={() => go("/dashboard")}><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</CommandItem>
          <CommandItem onSelect={() => go("/projects")}><FolderKanban className="mr-2 h-4 w-4" /> Daftar Project</CommandItem>
          <CommandItem onSelect={() => go("/templates")}><LayoutTemplate className="mr-2 h-4 w-4" /> Template</CommandItem>
          <CommandItem onSelect={() => go("/settings")}><Settings className="mr-2 h-4 w-4" /> Pengaturan</CommandItem>
          <CommandItem onSelect={() => go("/settings/ai")}><Cpu className="mr-2 h-4 w-4" /> Pengaturan AI</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Aksi">
          <CommandItem onSelect={() => go("/projects/baru")}><Plus className="mr-2 h-4 w-4" /> Buat project baru</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Project">
          {projects.filter((p) => !p.arsip).slice(0, 6).map((p) => (
            <CommandItem key={p.id} onSelect={() => go("/projects/$id/overview", { id: p.id })}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: p.warna }} />
              {p.nama}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
