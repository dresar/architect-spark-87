import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk — AI Software Architect" },
      { name: "description", content: "Masuk ke studio perancangan aplikasi berbasis AI." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 400);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--primary) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--info) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-foreground">AI Software Architect</h1>
            <p className="mt-1 text-sm text-muted-foreground">Studio perencanaan aplikasi berbasis AI</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-surface/80 p-6 shadow-[var(--shadow-elevated)] backdrop-blur">
          <div className="space-y-1.5">
            <h2 className="text-base font-medium text-foreground">Masuk ke akun</h2>
            <p className="text-xs text-muted-foreground">Antarmuka demo — gunakan data apapun untuk masuk.</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input id="email" type="email" placeholder="nama@perusahaan.co.id" defaultValue="raka@architect.id" className="h-10 bg-background" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs">Kata Sandi</Label>
                <button type="button" className="text-[11px] text-muted-foreground transition-colors hover:text-foreground">Lupa kata sandi?</button>
              </div>
              <Input id="password" type="password" placeholder="••••••••" defaultValue="demo-password" className="h-10 bg-background" />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="mt-6 h-10 w-full gap-2 bg-primary text-primary-foreground hover:opacity-95">
            {loading ? "Memuat…" : "Masuk"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>

          <div className="my-5 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] text-muted-foreground">atau</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid gap-2">
            <Button variant="outline" type="button" className="h-10 gap-2 border-border bg-background hover:bg-accent">
              <Github className="h-4 w-4" /> Masuk dengan GitHub
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Belum punya akun? <button className="font-medium text-foreground transition-colors hover:text-primary">Buat akun</button>
        </p>
      </div>
    </div>
  );
}
