import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/_app/settings/profil")({ component: ProfilPage });

function ProfilPage() {
  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-base font-medium text-foreground">Profil</h2>
        <p className="text-xs text-muted-foreground">Info dasar akun kamu.</p>
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-20 w-20 border border-border"><AvatarFallback className="bg-surface-2 text-xl font-medium">RA</AvatarFallback></Avatar>
          <Button variant="outline" size="sm">Ganti Foto</Button>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5"><Label htmlFor="nama" className="text-xs">Nama Lengkap</Label><Input id="nama" defaultValue="Raka Arsyad" className="bg-background" /></div>
            <div className="space-y-1.5"><Label htmlFor="jabatan" className="text-xs">Jabatan</Label><Input id="jabatan" defaultValue="Senior Product Designer" className="bg-background" /></div>
            <div className="space-y-1.5"><Label htmlFor="email" className="text-xs">Email</Label><Input id="email" defaultValue="raka@architect.id" className="bg-background" /></div>
            <div className="space-y-1.5"><Label htmlFor="telp" className="text-xs">Nomor Telepon</Label><Input id="telp" defaultValue="+62 812 3456 7890" className="bg-background" /></div>
          </div>
          <div className="space-y-1.5"><Label htmlFor="bio" className="text-xs">Bio</Label><Textarea id="bio" rows={3} defaultValue="Merancang aplikasi enterprise dengan AI sebagai mitra kerja." className="bg-background" /></div>
          <div className="flex justify-end gap-2"><Button variant="outline">Batal</Button><Button className="bg-primary text-primary-foreground hover:opacity-95">Simpan</Button></div>
        </div>
      </div>
    </div>
  );
}
