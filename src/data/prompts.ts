export interface PromptItem {
  id: string;
  target: string; // Master, Cursor, Trae, Claude, Gemini, Antigravity, Codex, Windsurf, OpenAI Agent
  judul: string;
  konten: string;
  tokens: number;
  diperbarui: string;
}

const masterKonten = `# Master Prompt — Nusantara Marketplace

Kamu adalah senior full-stack engineer. Bangun aplikasi Marketplace multi-vendor
dengan arsitektur bersih (clean architecture) dan kode idiomatis.

## Stack
- Frontend: React + TypeScript + Tailwind
- Backend: Node.js + Fastify
- Database: PostgreSQL + Prisma
- Autentikasi: JWT + refresh token
- Pembayaran: gateway lokal (Midtrans / Xendit)

## Modul
1. Autentikasi & profil
2. Katalog produk & kategori
3. Keranjang & checkout
4. Pesanan & pengiriman
5. Pembayaran & escrow
6. Ulasan & rating
7. Panel vendor
8. Panel admin

## Prinsip
- SOLID, dependency injection eksplisit
- Validasi input dengan Zod
- Test unit untuk domain logic
- Logging terstruktur (pino)
- Semua UI berbahasa Indonesia

Mulai dari skema database, lalu domain layer, lalu API, lalu UI.`;

export const prompts: PromptItem[] = [
  { id: "pm-master", target: "Master", judul: "Master Prompt", konten: masterKonten, tokens: 512, diperbarui: new Date(Date.now() - 60000 * 30).toISOString() },
  { id: "pm-cursor", target: "Cursor", judul: "Prompt Cursor", konten: "// Cursor rules\n// Ikuti master prompt.\n// Prioritaskan iterasi kecil, test-first.\n\n@codebase gunakan pola repository di src/domain/*", tokens: 320, diperbarui: new Date(Date.now() - 60000 * 32).toISOString() },
  { id: "pm-trae", target: "Trae AI", judul: "Prompt Trae AI", konten: "Trae, mulai dari modul autentikasi. Buat entity, use-case, dan test.", tokens: 210, diperbarui: new Date(Date.now() - 60000 * 40).toISOString() },
  { id: "pm-claude", target: "Claude Code", judul: "Prompt Claude Code", konten: "Kamu adalah reviewer arsitektur. Sebelum menulis kode, verifikasi rencana modul dengan bertanya.", tokens: 260, diperbarui: new Date(Date.now() - 60000 * 50).toISOString() },
  { id: "pm-gemini", target: "Gemini", judul: "Prompt Gemini", konten: "Gunakan model Gemini 2.5 Pro untuk perencanaan, Flash untuk eksekusi.", tokens: 180, diperbarui: new Date(Date.now() - 60000 * 60).toISOString() },
  { id: "pm-antigravity", target: "Antigravity", judul: "Prompt Antigravity", konten: "Fokus pada agentic workflow: plan → act → verify.", tokens: 190, diperbarui: new Date(Date.now() - 60000 * 65).toISOString() },
  { id: "pm-codex", target: "Codex", judul: "Prompt Codex", konten: "Codex, jalankan test setiap kali file domain berubah.", tokens: 150, diperbarui: new Date(Date.now() - 60000 * 70).toISOString() },
  { id: "pm-windsurf", target: "Windsurf", judul: "Prompt Windsurf", konten: "Cascade: refactor dengan bertahap dan jaga API publik stabil.", tokens: 170, diperbarui: new Date(Date.now() - 60000 * 80).toISOString() },
  { id: "pm-openai", target: "OpenAI Agent", judul: "Prompt OpenAI Agent", konten: "Agent memanggil tools: db.query, api.call, files.write. Selalu validasi hasil.", tokens: 200, diperbarui: new Date(Date.now() - 60000 * 90).toISOString() },
];
