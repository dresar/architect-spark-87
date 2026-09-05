import { createFileRoute, Outlet, Link, useRouterState, redirect } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { cn } from "@/lib/utils";
import { User, Palette, Languages, Keyboard, Bell, Cpu } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Pengaturan — AI Software Architect" }] }),
  beforeLoad: ({ location }) => {
    if (location.pathname === "/settings" || location.pathname === "/settings/") {
      throw redirect({ to: "/settings/profil" });
    }
  },
  component: SettingsLayout,
});

const items = [
  { to: "/settings/profil", label: "Profil", icon: User },
  { to: "/settings/tampilan", label: "Tampilan", icon: Palette },
  { to: "/settings/bahasa", label: "Bahasa", icon: Languages },
  { to: "/settings/shortcut", label: "Shortcut Keyboard", icon: Keyboard },
  { to: "/settings/notifikasi", label: "Notifikasi", icon: Bell },
  { to: "/settings/ai", label: "Pengaturan AI", icon: Cpu },
] as const;

function SettingsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <PageHeader judul="Pengaturan" deskripsi="Sesuaikan preferensi, tampilan, dan integrasi AI." />
      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="rounded-xl border border-border bg-surface p-2 lg:sticky lg:top-[80px] lg:self-start">
          <nav className="flex flex-col gap-0.5">
            {items.map((i) => {
              const active = pathname.startsWith(i.to);
              const Icon = i.icon;
              return (
                <Link key={i.to} to={i.to} className={cn("flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors", active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground")}>
                  <Icon className={cn("h-4 w-4", active && "text-primary")} /> {i.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0"><Outlet /></main>
      </div>
    </div>
  );
}
