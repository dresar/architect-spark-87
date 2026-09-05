# 🏗️ AI Software Architect - Studio Perencanaan Sistem & Aplikasi

![Dashboard Overview](asset/Macbook-Air-localhost.webp)

**AI Software Architect** adalah platform studio perencanaan software modern berbasis AI yang dirancang untuk merancang, mengarsitekturi, dan menyiapkan dokumen teknis aplikasi secara otomatis dan terstruktur. Platform ini membantu software architect, lead developer, dan product owner mentransformasikan ide bisnis menjadi cetak biru teknis lengkap (PRD, Arsitektur, ERD Database, Spesifikasi API, hingga Prompt Generator untuk AI Coding Assistant).

---

## 📸 Dokumentasi & Modul Utama

Untuk panduan dan dokumentasi terperinci mengenai setiap modul utama, silakan merujuk pada 5 dokumen spesifikasi berikut:

1. 📊 **[Dokumentasi Dashboard & Manajemen Project](DOCUMENTATION_DASHBOARD.md)**
   - Gambaran umum statistik sistem, rotasi AI Provider (Gemini & Groq), pengelolaan daftar project, serta pemilihan template aplikasi siap pakai.
2. 🔄 **[Dokumentasi Canvas Workflow & Visualisasi Arsitektur](DOCUMENTATION_CANVAS.md)**
   - Panduan diagram node interaktif Canvas Workflow, penyusunan dependensi layer (Presentation, Application, Domain, Infrastructure), dan ERD Database.
3. 📄 **[Dokumentasi PRD & Spesifikasi Sistem](DOCUMENTATION_PRD.md)**
   - Manajemen Product Requirement Document (PRD) otomatis mulai dari *Overview*, *Requirement*, *User Story*, *Business Rules*, hingga *Features*.
4. 🔌 **[Dokumentasi API Spec & Endpoint Generator](DOCUMENTATION_API_SPEC.md)**
   - Pengelolaan katalog REST API endpoint, skema otentikasi, visibilitas (Public/Token/Admin), dan pengelompokan grup fitur.
5. 🤖 **[Dokumentasi Prompt Studio & AI Export](DOCUMENTATION_PROMPT_STUDIO.md)**
   - Penjana *Master Prompt* otomatis yang disesuaikan untuk berbagai AI Coding Assistant (Cursor, Trae AI, Claude Code, Gemini, Antigravity, Windsurf, dll.).

---

## 🌟 Fitur Unggulan

- **AI Provider Failover & Rotation**: Mengelola kuota dan latensi AI secara dinamis dengan dukungan multi-provider (misal: Gemini sebagai Prioritas 1, Groq sebagai Siaga/Fallback).
- **Interactive Canvas Workflow**: Merancang modul, endpoint, actor, dan aliran data menggunakan canvas berbasis node yang intuitif.
- **Auto-generated Database ERD**: Menghasilkan skema tabel, tipe data, dan relasi antar tabel (PostgreSQL/MySQL/MongoDB) secara otomatis.
- **Complete Architecture Layering**: Membantu membagi struktur kode mengikuti standar Clean Architecture / DDD (Domain-Driven Design).
- **Tailored AI Code Prompts**: Mengubah seluruh hasil perencanaan project menjadi instruksi Master Prompt siap pakai untuk AI Coding Tools.

---

## 🖼️ Tangkapan Layar Aplikasi

### 1. Dashboard Utama & Status AI Provider
![Dashboard Overview](asset/Macbook-Air-localhost.webp)

### 2. Manajemen Project
![Project List](asset/Macbook-Air-localhost%20(1).webp)

### 3. Pustaka Template Aplikasi Siap Pakai
![Template Library](asset/Macbook-Air-localhost%20(2).webp)

### 4. Overview Project & Ringkasan Progres
![Project Overview](asset/Macbook-Air-localhost%20(3).webp)

---

## 🚀 Panduan Memulai (Quick Start)

### Prasyarat
- Node.js versi 18.x atau lebih baru
- Package manager: `npm` atau `bun`

### Instalasi & Menjalankan Aplikasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/dresar/architect-spark-87.git
   cd architect-spark-87
   ```

2. **Install dependensi:**
   ```bash
   npm install
   # atau menggunakan bun
   bun install
   ```

3. **Jalankan server pengembangan (Dev Server):**
   ```bash
   npm run dev
   # atau menggunakan bun
   bun dev
   ```

4. **Buka aplikasi:**
   Akses `http://localhost:5173` atau port yang tampil di terminal Anda.

---

## 🛠️ Stack Teknologi

- **Frontend**: React, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, Shadcn UI / Radix UI, Lucide Icons
- **State & Canvas**: TanStack Query / React Flow (Canvas Diagramming)
- **AI Engine Integration**: Google Gemini API, Groq API

---

## 📝 Lisensi & Kontribusi

Proyek ini dikembangkan untuk mempermudah alur kerja pengembangan perangkat lunak modern. Segala bentuk masukan, *issue*, dan *pull request* sangat disambut hangat.

© 2026 AI Software Architect Studio.
