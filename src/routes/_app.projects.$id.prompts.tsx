import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { prompts } from "@/data/prompts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, GitCompare, Split, Eye, Wand2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/projects/$id/prompts")({ component: PromptsPage });

function PromptsPage() {
  const [active, setActive] = useState(prompts[0].id);
  const current = prompts.find((p) => p.id === active)!;
  const [konten, setKonten] = useState(current.konten);
  const [compare, setCompare] = useState(false);
  const [copied, setCopied] = useState(false);

  function pilih(id: string) {
    setActive(id);
    setKonten(prompts.find((p) => p.id === id)!.konten);
  }

  function copyPrompt() {
    navigator.clipboard?.writeText(konten);
    setCopied(true);
    toast.success("Prompt disalin ke clipboard");
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-6 md:px-6 md:py-8">
      {/* Tabs */}
      <div className="-mx-4 overflow-x-auto px-4 md:-mx-6 md:px-6">
        <div className="flex min-w-max items-center gap-1 rounded-lg border border-border bg-surface p-1">
          {prompts.map((p) => (
            <button key={p.id} onClick={() => pilih(p.id)} className={cn("whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors", active === p.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground")}>{p.target}</button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface p-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/15 text-primary"><Wand2 className="h-4 w-4" /></span>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-foreground">{current.judul}</div>
            <div className="text-[11px] text-muted-foreground">{konten.length.toLocaleString("id-ID")} karakter · ~{current.tokens} token</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Button variant="outline" size="sm" onClick={copyPrompt} className="gap-1.5">{copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />} Salin</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> Regenerate</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Split className="h-3.5 w-3.5" /> Split</Button>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setCompare((v) => !v)}><GitCompare className="h-3.5 w-3.5" /> Compare</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Eye className="h-3.5 w-3.5" /> Preview</Button>
        </div>
      </div>

      <div className={cn("grid gap-3", compare && "md:grid-cols-2")}>
        <Textarea value={konten} onChange={(e) => setKonten(e.target.value)} className="min-h-[520px] resize-none border-border bg-surface/60 font-mono text-[12.5px] leading-relaxed" />
        {compare && (
          <div className="min-h-[520px] overflow-auto rounded-md border border-dashed border-border bg-background/60 p-3 font-mono text-[12.5px] leading-relaxed text-muted-foreground">{current.konten}</div>
        )}
      </div>
    </div>
  );
}
