import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, ArrowLeft, Sparkles, Globe, Smartphone, Monitor, Apple, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/projects/baru")({
  head: () => ({ meta: [{ title: "Project Baru — AI Software Architect" }] }),
  component: WizardPage,
});

const steps = ["Info Dasar", "Platform", "Teknologi", "Target AI", "Ringkasan"] as const;

function WizardPage() {
  const [step, setStep] = useState(0);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [platform, setPlatform] = useState("Web");
  const [frontend, setFrontend] = useState("React");
  const [backend, setBackend] = useState("Node.js");
  const [database, setDatabase] = useState("PostgreSQL");
  const [ai, setAi] = useState("Cursor");
  const [bahasaPrompt, setBahasaPrompt] = useState("Indonesia");
  const navigate = useNavigate();

  function next() { setStep((s) => Math.min(s + 1, steps.length - 1)); }
  function prev() { setStep((s) => Math.max(s - 1, 0)); }
  function finish() {
    toast.success("Project berhasil dibuat", { description: "Kamu akan diarahkan ke AI Interview." });
    setTimeout(() => navigate({ to: "/projects/$id/interview", params: { id: "prj-001" } }), 500);
  }

  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <PageHeader
        eyebrow="Project baru"
        judul="Mari rancang aplikasi kamu"
        deskripsi="Ikuti langkah singkat berikut. Semua bisa diubah nanti."
        aksi={<Button variant="ghost" asChild><Link to="/projects"><ArrowLeft className="mr-1.5 h-4 w-4" /> Batal</Link></Button>}
      />

      {/* Stepper */}
      <ol className="flex items-center justify-between gap-2 overflow-x-auto rounded-xl border border-border bg-surface p-3 text-xs">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 min-w-max items-center gap-2">
            <span
              className={cn(
                "grid h-6 w-6 place-items-center rounded-full border text-[11px] font-medium",
                i < step && "border-primary bg-primary text-primary-foreground",
                i === step && "border-primary text-primary",
                i > step && "border-border text-muted-foreground",
              )}
            >
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            <span className={cn("whitespace-nowrap font-medium", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
            {i < steps.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />}
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-border bg-surface p-6">
        {step === 0 && (
          <div className="space-y-5">
            <StepHeader judul="Info Dasar" deskripsi="Beri nama dan deskripsi singkat project." />
            <div className="space-y-1.5">
              <Label htmlFor="nama">Nama Project</Label>
              <Input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="contoh: Nusantara Marketplace" className="bg-background" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="deskripsi">Deskripsi Singkat</Label>
              <Textarea id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows={4} placeholder="Ceritakan singkat aplikasi apa yang ingin kamu bangun." className="bg-background" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <StepHeader judul="Pilih Platform" deskripsi="Platform utama yang akan kamu bangun. Kamu bisa menambah platform lain nanti." />
            <RadioGroup value={platform} onValueChange={setPlatform} className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {[
                { v: "Web", i: Globe },
                { v: "Android", i: Smartphone },
                { v: "iOS", i: Apple },
                { v: "Desktop", i: Monitor },
                { v: "PWA", i: LayoutGrid },
              ].map(({ v, i: Icon }) => (
                <label key={v} className={cn("flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40", platform === v && "border-primary bg-primary/5")}>
                  <RadioGroupItem value={v} className="sr-only" />
                  <Icon className={cn("h-5 w-5", platform === v ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-xs font-medium">{v}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <StepHeader judul="Teknologi" deskripsi="Pilih stack yang ingin dipakai. Rekomendasi otomatis mengikuti pilihan platform." />
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Frontend"><Select value={frontend} onValueChange={setFrontend}><SelectTrigger className="bg-background"><SelectValue /></SelectTrigger><SelectContent>{["React","Next.js","Vue","Nuxt","Flutter","Electron","Astro"].map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select></Field>
              <Field label="Backend"><Select value={backend} onValueChange={setBackend}><SelectTrigger className="bg-background"><SelectValue /></SelectTrigger><SelectContent>{["Node.js","NestJS","Go","Django","Laravel","Supabase","-"].map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select></Field>
              <Field label="Database"><Select value={database} onValueChange={setDatabase}><SelectTrigger className="bg-background"><SelectValue /></SelectTrigger><SelectContent>{["PostgreSQL","MySQL","MongoDB","SQLite","TimescaleDB","Firestore"].map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select></Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <StepHeader judul="Target AI Coding" deskripsi="Pilih AI coding tujuan dan bahasa prompt." />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Target AI">
                <Select value={ai} onValueChange={setAi}><SelectTrigger className="bg-background"><SelectValue /></SelectTrigger><SelectContent>{["Cursor","Trae AI","Claude Code","Gemini","Antigravity","Codex","Windsurf","OpenAI Agent"].map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select>
              </Field>
              <Field label="Bahasa Prompt">
                <Select value={bahasaPrompt} onValueChange={setBahasaPrompt}><SelectTrigger className="bg-background"><SelectValue /></SelectTrigger><SelectContent>{["Indonesia","English"].map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select>
              </Field>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <StepHeader judul="Ringkasan" deskripsi="Periksa kembali sebelum membuat project." />
            <div className="grid gap-3 rounded-lg border border-border bg-background p-4 text-sm">
              <SummaryRow k="Nama" v={nama || "—"} />
              <SummaryRow k="Deskripsi" v={deskripsi || "—"} />
              <SummaryRow k="Platform" v={platform} />
              <SummaryRow k="Frontend" v={frontend} />
              <SummaryRow k="Backend" v={backend} />
              <SummaryRow k="Database" v={database} />
              <SummaryRow k="Target AI" v={ai} />
              <SummaryRow k="Bahasa Prompt" v={bahasaPrompt} />
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="text-xs text-muted-foreground">Setelah kamu selesai, AI akan memandu kamu melalui wawancara singkat untuk memperjelas kebutuhan aplikasi.</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={prev} disabled={step === 0}><ArrowLeft className="mr-1.5 h-4 w-4" /> Kembali</Button>
        {step < steps.length - 1 ? (
          <Button onClick={next} className="bg-primary text-primary-foreground hover:opacity-95">Lanjut <ChevronRight className="ml-1 h-4 w-4" /></Button>
        ) : (
          <Button onClick={finish} className="bg-primary text-primary-foreground hover:opacity-95">Buat Project</Button>
        )}
      </div>
    </div>
  );
}

function StepHeader({ judul, deskripsi }: { judul: string; deskripsi: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-base font-semibold text-foreground">{judul}</h2>
      <p className="text-xs text-muted-foreground">{deskripsi}</p>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div className="space-y-1.5"><Label className="text-xs">{label}</Label>{children}</div>);
}
function SummaryRow({ k, v }: { k: string; v: string }) {
  return (<div className="grid grid-cols-[140px_1fr] gap-3"><div className="text-xs text-muted-foreground">{k}</div><div className="text-sm text-foreground">{v}</div></div>);
}
