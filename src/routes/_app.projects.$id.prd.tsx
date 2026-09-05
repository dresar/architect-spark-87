import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { FileText, CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/_app/projects/$id/prd")({ component: PrdPage });

const tabs = [
  { id: "overview", label: "Overview", terisi: true, konten: "# Overview\n\nAplikasi marketplace multi-vendor yang menghubungkan penjual UMKM dengan pembeli di seluruh Indonesia. Fokus pada pengalaman mobile-first dan integrasi kurir lokal." },
  { id: "requirement", label: "Requirement", terisi: true, konten: "## Requirement Fungsional\n\n1. Registrasi & autentikasi (email, Google, nomor HP).\n2. Manajemen katalog produk.\n3. Keranjang belanja & checkout.\n4. Pembayaran gateway lokal.\n5. Pengiriman terintegrasi kurir.\n\n## Non-Fungsional\n\n- Availability 99.9%\n- Response time < 300ms\n- Data terenkripsi at-rest & in-transit" },
  { id: "user-story", label: "User Story", terisi: true, konten: "## Sebagai pembeli\n- Saya ingin mencari produk agar bisa membandingkan harga.\n- Saya ingin melacak status pesanan agar tahu kapan sampai.\n\n## Sebagai penjual\n- Saya ingin mengelola stok agar tidak overselling." },
  { id: "business-rule", label: "Business Rule", terisi: false, konten: "" },
  { id: "feature", label: "Feature", terisi: true, konten: "## Fitur\n- Katalog\n- Keranjang\n- Checkout\n- Escrow\n- Ulasan" },
  { id: "flow", label: "Flow", terisi: false, konten: "" },
  { id: "security", label: "Security", terisi: true, konten: "- OWASP Top 10\n- Rate limiting\n- JWT + refresh token\n- Enkripsi data pribadi\n- 2FA opsional" },
  { id: "testing", label: "Testing", terisi: false, konten: "" },
  { id: "architecture", label: "Architecture", terisi: true, konten: "Clean architecture: domain, application, infrastructure, presentation." },
  { id: "deployment", label: "Deployment", terisi: false, konten: "" },
  { id: "catatan", label: "Catatan", terisi: false, konten: "" },
];

function PrdPage() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;
  const [konten, setKonten] = useState(current.konten);

  function handleSelect(id: string) {
    setActive(id);
    setKonten(tabs.find((t) => t.id === id)!.konten);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-56px-101px)] w-full max-w-[1400px] flex-col md:flex-row">
      <aside className="w-full shrink-0 border-b border-border bg-surface md:w-60 md:border-b-0 md:border-r">
        <ScrollArea className="max-h-52 md:h-full">
          <div className="p-3">
            <div className="mb-2 flex items-center gap-1.5 px-2 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground"><FileText className="h-3 w-3" /> Bagian PRD</div>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => handleSelect(t.id)} className={cn("flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors", active === t.id ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground")}>
                {t.terisi ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />}
                <span className="flex-1 truncate">{t.label}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <main className="flex-1 min-w-0 overflow-hidden">
        <div className="mx-auto flex h-full max-w-3xl flex-col gap-3 px-4 py-6 md:px-6 md:py-8">
          <div>
            <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">PRD</div>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{current.label}</h2>
          </div>
          <Textarea value={konten} onChange={(e) => setKonten(e.target.value)} placeholder="Tulis konten bagian ini dalam format Markdown…" className="flex-1 resize-none border-border bg-surface/60 font-mono text-[13px] leading-relaxed" />
        </div>
      </main>
    </div>
  );
}
