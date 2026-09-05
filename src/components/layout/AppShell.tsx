import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandPalette } from "./CommandPalette";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar desktop */}
      <div className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border md:block">
        <Sidebar />
      </div>

      {/* Sidebar mobile via Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 border-r border-sidebar-border bg-sidebar p-0">
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenSidebar={() => setMobileOpen(true)} onOpenCommand={() => setCmdOpen(true)} />
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  );
}
