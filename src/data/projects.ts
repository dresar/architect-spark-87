import { formatDistanceToNow } from "date-fns";
import { id as idLocale } from "date-fns/locale";

export type ProjectStatus = "draft" | "aktif" | "review" | "selesai" | "arsip";
export type Platform = "Web" | "Android" | "iOS" | "Desktop" | "PWA";

export interface Project {
  id: string;
  nama: string;
  deskripsi: string;
  platform: Platform;
  frontend: string;
  backend: string;
  database: string;
  aiTarget: string;
  status: ProjectStatus;
  progress: number;
  favorit: boolean;
  arsip: boolean;
  diubah: string; // ISO
  dibuat: string;
  warna: string;
  kolaborator: number;
}

export const projects: Project[] = [
  {
    id: "prj-001",
    nama: "Nusantara Marketplace",
    deskripsi: "Marketplace multi-vendor dengan sistem escrow dan kurir terintegrasi.",
    platform: "Web",
    frontend: "React",
    backend: "Node.js",
    database: "PostgreSQL",
    aiTarget: "Cursor",
    status: "aktif",
    progress: 68,
    favorit: true,
    arsip: false,
    diubah: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    dibuat: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    warna: "oklch(0.74 0.17 55)",
    kolaborator: 4,
  },
  {
    id: "prj-002",
    nama: "Klinik Sehat ERP",
    deskripsi: "Sistem manajemen klinik: rekam medis, apotek, keuangan, laporan.",
    platform: "Web",
    frontend: "Next.js",
    backend: "NestJS",
    database: "PostgreSQL",
    aiTarget: "Claude Code",
    status: "review",
    progress: 84,
    favorit: true,
    arsip: false,
    diubah: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    dibuat: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    warna: "oklch(0.72 0.14 235)",
    kolaborator: 6,
  },
  {
    id: "prj-003",
    nama: "Kopi Kita POS",
    deskripsi: "Aplikasi kasir untuk kedai kopi dengan sinkronisasi offline dan cetak struk.",
    platform: "PWA",
    frontend: "React",
    backend: "Supabase",
    database: "PostgreSQL",
    aiTarget: "Gemini",
    status: "aktif",
    progress: 42,
    favorit: false,
    arsip: false,
    diubah: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    dibuat: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    warna: "oklch(0.72 0.16 155)",
    kolaborator: 2,
  },
  {
    id: "prj-004",
    nama: "SekolahKu LMS",
    deskripsi: "Learning management system dengan kelas virtual, kuis, dan rapor otomatis.",
    platform: "Web",
    frontend: "React",
    backend: "Django",
    database: "PostgreSQL",
    aiTarget: "Trae AI",
    status: "draft",
    progress: 18,
    favorit: false,
    arsip: false,
    diubah: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    dibuat: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    warna: "oklch(0.82 0.16 85)",
    kolaborator: 3,
  },
  {
    id: "prj-005",
    nama: "Tani Cerdas",
    deskripsi: "Platform pertanian pintar dengan monitoring IoT dan analitik hasil panen.",
    platform: "Android",
    frontend: "Flutter",
    backend: "Go",
    database: "TimescaleDB",
    aiTarget: "Codex",
    status: "selesai",
    progress: 100,
    favorit: false,
    arsip: false,
    diubah: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    dibuat: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    warna: "oklch(0.65 0.22 320)",
    kolaborator: 5,
  },
  {
    id: "prj-006",
    nama: "Rumah Sakit Sentosa",
    deskripsi: "Sistem informasi rumah sakit terintegrasi BPJS dan farmasi.",
    platform: "Web",
    frontend: "Next.js",
    backend: "Laravel",
    database: "PostgreSQL",
    aiTarget: "Antigravity",
    status: "aktif",
    progress: 55,
    favorit: false,
    arsip: false,
    diubah: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    dibuat: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    warna: "oklch(0.68 0.19 40)",
    kolaborator: 7,
  },
  {
    id: "prj-007",
    nama: "AI Notulen",
    deskripsi: "Aplikasi pencatat rapat otomatis dengan transkripsi dan ringkasan AI.",
    platform: "Desktop",
    frontend: "Electron",
    backend: "Node.js",
    database: "SQLite",
    aiTarget: "Windsurf",
    status: "review",
    progress: 76,
    favorit: true,
    arsip: false,
    diubah: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    dibuat: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    warna: "oklch(0.72 0.14 235)",
    kolaborator: 3,
  },
  {
    id: "prj-008",
    nama: "PortalKu (arsip)",
    deskripsi: "Portal berita hyperlocal — sekarang di-arsipkan setelah pivot.",
    platform: "Web",
    frontend: "Astro",
    backend: "-",
    database: "-",
    aiTarget: "Gemini",
    status: "arsip",
    progress: 100,
    favorit: false,
    arsip: true,
    diubah: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    dibuat: new Date(Date.now() - 1000 * 60 * 60 * 24 * 80).toISOString(),
    warna: "oklch(0.5 0.02 60)",
    kolaborator: 1,
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  draft: "Draft",
  aktif: "Aktif",
  review: "Review",
  selesai: "Selesai",
  arsip: "Diarsipkan",
};

export function formatRelatif(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: idLocale });
  } catch {
    return iso;
  }
}
