import { createFileRoute } from "@tanstack/react-router";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_app/settings/bahasa")({ component: BahasaPage });

function BahasaPage() {
  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="border-b border-border px-6 py-5"><h2 className="text-base font-medium text-foreground">Bahasa</h2><p className="text-xs text-muted-foreground">Pilih bahasa antarmuka aplikasi.</p></div>
      <div className="p-6">
        <RadioGroup defaultValue="id" className="grid gap-2">
          {[
            { v: "id", label: "Bahasa Indonesia", sub: "Default" },
            { v: "en", label: "English", sub: "Coming soon" },
            { v: "jw", label: "Basa Jawa", sub: "Coming soon" },
          ].map((o) => (
            <label key={o.v} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors hover:border-primary/40">
              <RadioGroupItem value={o.v} />
              <div className="flex-1"><Label className="text-sm">{o.label}</Label><div className="text-[11px] text-muted-foreground">{o.sub}</div></div>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
