import { createFileRoute } from "@tanstack/react-router";
import { providers, apiKeys } from "@/data/providers";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatRelatif } from "@/data/projects";
import { Plus, MoreHorizontal, Cpu, Zap, AlertCircle, CheckCircle2, Activity } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings/ai")({ component: AiSettingsPage });

function AiSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Providers */}
      <div className="grid gap-4 md:grid-cols-2">
        {providers.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/12 text-primary"><Cpu className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2"><h3 className="text-base font-medium text-foreground">{p.nama}</h3>{p.health === "sehat" ? <Badge variant="outline" className="border-success/30 bg-success/10 text-[10px] text-success"><CheckCircle2 className="mr-1 h-2.5 w-2.5" /> Sehat</Badge> : <Badge variant="outline" className="border-warning/30 bg-warning/10 text-[10px] text-warning"><AlertCircle className="mr-1 h-2.5 w-2.5" /> Peringatan</Badge>}</div>
                  <div className="text-[11px] text-muted-foreground">Prioritas {p.prioritas} · Strategy {p.strategy}</div>
                </div>
              </div>
              <Switch defaultChecked={p.aktif} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric label="Total Request" value={p.totalRequest.toLocaleString("id-ID")} />
              <Metric label="Total Error" value={p.totalError.toLocaleString("id-ID")} accent={p.totalError > 20 ? "danger" : undefined} />
              <Metric label="Avg Response" value={`${p.avgResponseMs} ms`} />
              <Metric label="Latency" value={`${p.latencyMs} ms`} />
            </div>

            <div className="mt-5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground"><span>Kuota terpakai</span><span className="tabular-nums text-foreground">{Math.round((p.totalRequest / p.quota) * 100)}%</span></div>
              <Progress value={(p.totalRequest / p.quota) * 100} className="h-1" />
              <div className="flex justify-between text-[10.5px] text-muted-foreground"><span>{p.totalRequest.toLocaleString("id-ID")} dari {p.quota.toLocaleString("id-ID")}</span><span>{p.limit} req/menit</span></div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Field label="Timeout (ms)"><Input defaultValue={p.timeoutMs} className="bg-background" /></Field>
              <Field label="Retry"><Input defaultValue={p.retry} className="bg-background" /></Field>
              <Field label="Cooldown (ms)"><Input defaultValue={p.cooldownMs} className="bg-background" /></Field>
              <Field label="Fallback">
                <Select defaultValue={p.nama === "Gemini" ? "Groq" : "Gemini"}>
                  <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Gemini">Gemini</SelectItem><SelectItem value="Groq">Groq</SelectItem><SelectItem value="none">Tidak ada</SelectItem></SelectContent>
                </Select>
              </Field>
            </div>
          </div>
        ))}
      </div>

      {/* Rotation */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <div><h3 className="text-base font-medium text-foreground">Strategi Rotation</h3><p className="text-xs text-muted-foreground">Atur cara aplikasi memilih provider saat menghasilkan output AI.</p></div>
          <Activity className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {[
            { v: "prioritas", label: "Prioritas", desc: "Provider utama dulu, fallback saat gagal.", aktif: true },
            { v: "round-robin", label: "Round Robin", desc: "Bergiliran seimbang antar provider." },
            { v: "load-balance", label: "Load Balance", desc: "Pilih provider paling ringan." },
            { v: "fallback", label: "Fallback", desc: "Hanya pakai fallback saat error." },
          ].map((o) => (
            <button key={o.v} className={cn("rounded-lg border p-4 text-left transition-colors", o.aktif ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40")}>
              <div className="text-sm font-medium text-foreground">{o.label}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{o.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="rounded-xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div><h3 className="text-base font-medium text-foreground">Manajemen API Key</h3><p className="text-xs text-muted-foreground">Kelola API Key untuk setiap provider dan atur prioritasnya.</p></div>
          <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:opacity-95"><Plus className="h-4 w-4" /> Tambah API Key</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Nama</th>
                <th className="px-5 py-3 font-medium">Provider</th>
                <th className="px-5 py-3 font-medium">Key</th>
                <th className="px-5 py-3 font-medium">Prioritas</th>
                <th className="px-5 py-3 font-medium">Kuota</th>
                <th className="px-5 py-3 font-medium">Statistik</th>
                <th className="px-5 py-3 font-medium">Aktif</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {apiKeys.map((k) => (
                <tr key={k.id} className="transition-colors hover:bg-accent/40">
                  <td className="px-5 py-3"><div className="font-medium text-foreground">{k.nama}</div><div className="text-[10.5px] text-muted-foreground">Dipakai {formatRelatif(k.terakhirDipakai)}</div></td>
                  <td className="px-5 py-3"><Badge variant="outline">{k.provider}</Badge></td>
                  <td className="px-5 py-3"><code className="font-mono text-[11.5px] text-muted-foreground">{k.key}</code></td>
                  <td className="px-5 py-3 text-xs">{k.prioritas}</td>
                  <td className="px-5 py-3"><div className="flex items-center gap-2"><Progress value={(k.quotaTerpakai / k.quotaTotal) * 100} className="h-1 w-20" /><span className="text-[10.5px] tabular-nums text-muted-foreground">{Math.round((k.quotaTerpakai / k.quotaTotal) * 100)}%</span></div></td>
                  <td className="px-5 py-3 text-[11px] text-muted-foreground">{k.totalRequest.toLocaleString("id-ID")} req · {k.totalError} error</td>
                  <td className="px-5 py-3"><Switch defaultChecked={k.aktif} /></td>
                  <td className="px-5 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Naikkan Prioritas</DropdownMenuItem>
                        <DropdownMenuItem>Turunkan Prioritas</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">Hapus</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: "danger" }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="text-[10.5px] text-muted-foreground">{label}</div>
      <div className={cn("mt-1 text-sm font-semibold tabular-nums", accent === "danger" ? "text-destructive" : "text-foreground")}>{value}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div className="space-y-1.5"><Label className="text-[11px] text-muted-foreground">{label}</Label>{children}</div>);
}
