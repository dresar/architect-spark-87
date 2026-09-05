import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Check, ChevronRight, ChevronLeft, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/projects/$id/interview")({ component: InterviewPage });

const pertanyaan = [
  { q: "Siapa target pengguna utama aplikasi ini?", saran: "Pemilik UMKM di kota-kota Tier 2 dan Tier 3 yang butuh manajemen operasional sederhana." },
  { q: "Masalah utama apa yang aplikasi ini selesaikan?", saran: "Proses pencatatan transaksi manual yang memakan waktu dan rawan human error." },
  { q: "Apa 3 fitur inti yang wajib ada di MVP?", saran: "Katalog produk, kasir POS, laporan penjualan harian." },
  { q: "Bagaimana model bisnis / monetisasi aplikasi?", saran: "Freemium: 30 hari uji coba, kemudian langganan bulanan per outlet." },
  { q: "Apakah ada regulasi/kepatuhan yang harus dipenuhi?", saran: "Perlindungan data pribadi (UU PDP) dan e-Faktur pajak." },
];

function InterviewPage() {
  const [idx, setIdx] = useState(0);
  const [jawaban, setJawaban] = useState<string[]>(() => pertanyaan.map(() => ""));
  const progress = Math.round(((idx + 1) / pertanyaan.length) * 100);

  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"><Sparkles className="h-3.5 w-3.5 text-primary" /> AI Interview</div>
          <div className="text-xs tabular-nums text-muted-foreground">Pertanyaan {idx + 1} dari {pertanyaan.length}</div>
        </div>
        <Progress value={progress} className="h-1" />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Sparkles className="h-4 w-4" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">AI menanyakan</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">{pertanyaan[idx].q}</h2>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <label className="text-xs font-medium text-muted-foreground">Jawaban kamu</label>
          <Textarea rows={5} value={jawaban[idx]} onChange={(e) => { const n = [...jawaban]; n[idx] = e.target.value; setJawaban(n); }} placeholder="Tulis jawaban di sini, atau pakai saran di bawah." className="bg-background" />
        </div>

        <div className="mt-4 rounded-lg border border-dashed border-border bg-background/50 p-4">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"><Wand2 className="h-3.5 w-3.5 text-primary" /> Saran AI</div>
          <p className="mt-2 text-sm text-foreground">{pertanyaan[idx].saran}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => { const n = [...jawaban]; n[idx] = pertanyaan[idx].saran; setJawaban(n); }}>Pakai saran ini</Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}><ChevronLeft className="mr-1 h-4 w-4" /> Sebelumnya</Button>
        <div className="hidden gap-1 md:flex">
          {pertanyaan.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={cn("h-1.5 w-6 rounded-full transition-colors", i === idx ? "bg-primary" : jawaban[i] ? "bg-success/70" : "bg-border")} />
          ))}
        </div>
        {idx < pertanyaan.length - 1 ? (
          <Button onClick={() => setIdx(idx + 1)} className="bg-primary text-primary-foreground hover:opacity-95">Berikutnya <ChevronRight className="ml-1 h-4 w-4" /></Button>
        ) : (
          <Button className="gap-2 bg-primary text-primary-foreground hover:opacity-95"><Check className="h-4 w-4" /> Selesai</Button>
        )}
      </div>
    </div>
  );
}
