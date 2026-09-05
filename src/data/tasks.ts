export type TaskStatus = "todo" | "progress" | "review" | "selesai";
export type Prioritas = "rendah" | "sedang" | "tinggi" | "kritis";

export interface Task {
  id: string;
  judul: string;
  deskripsi: string;
  status: TaskStatus;
  prioritas: Prioritas;
  label: string[];
  progress: number;
  jatuhTempo: string; // ISO
  checklist: { id: string; teks: string; selesai: boolean }[];
  pemilik: string;
}

export const tasks: Task[] = [
  { id: "t-01", judul: "Rancang skema database pesanan", deskripsi: "Buat tabel orders, order_items, dan payments beserta relasinya.", status: "todo", prioritas: "tinggi", label: ["database", "arsitektur"], progress: 0, jatuhTempo: new Date(Date.now() + 86400000 * 3).toISOString(), checklist: [{ id: "c1", teks: "Diagram ERD", selesai: false }, { id: "c2", teks: "Migrasi awal", selesai: false }], pemilik: "Kamu" },
  { id: "t-02", judul: "Definisikan endpoint autentikasi", deskripsi: "Sign up, sign in, refresh token, dan reset password.", status: "todo", prioritas: "kritis", label: ["api", "security"], progress: 0, jatuhTempo: new Date(Date.now() + 86400000 * 2).toISOString(), checklist: [{ id: "c1", teks: "Spesifikasi request/response", selesai: false }], pemilik: "Kamu" },
  { id: "t-03", judul: "Setup design system", deskripsi: "Token warna, tipografi, spacing, dan komponen dasar.", status: "progress", prioritas: "tinggi", label: ["ui", "frontend"], progress: 60, jatuhTempo: new Date(Date.now() + 86400000 * 1).toISOString(), checklist: [{ id: "c1", teks: "Token warna", selesai: true }, { id: "c2", teks: "Komponen tombol", selesai: true }, { id: "c3", teks: "Komponen form", selesai: false }], pemilik: "Kamu" },
  { id: "t-04", judul: "Wireframe halaman dashboard", deskripsi: "Layout Swiss-grid untuk dashboard utama.", status: "progress", prioritas: "sedang", label: ["ui", "ux"], progress: 35, jatuhTempo: new Date(Date.now() + 86400000 * 4).toISOString(), checklist: [{ id: "c1", teks: "Sketsa layout", selesai: true }], pemilik: "Kamu" },
  { id: "t-05", judul: "Review PRD modul pembayaran", deskripsi: "Validasi requirement modul pembayaran dan escrow.", status: "review", prioritas: "tinggi", label: ["prd"], progress: 90, jatuhTempo: new Date(Date.now() + 86400000 * 1).toISOString(), checklist: [{ id: "c1", teks: "User story", selesai: true }, { id: "c2", teks: "Business rule", selesai: true }], pemilik: "Kamu" },
  { id: "t-06", judul: "Generate master prompt v1", deskripsi: "Prompt gabungan untuk Cursor & Claude Code.", status: "selesai", prioritas: "sedang", label: ["prompt", "ai"], progress: 100, jatuhTempo: new Date(Date.now() - 86400000 * 1).toISOString(), checklist: [{ id: "c1", teks: "Draft awal", selesai: true }, { id: "c2", teks: "Review", selesai: true }], pemilik: "Kamu" },
  { id: "t-07", judul: "Struktur folder clean architecture", deskripsi: "Domain, application, infrastructure, presentation.", status: "selesai", prioritas: "sedang", label: ["arsitektur"], progress: 100, jatuhTempo: new Date(Date.now() - 86400000 * 2).toISOString(), checklist: [], pemilik: "Kamu" },
];
