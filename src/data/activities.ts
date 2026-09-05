export interface Aktivitas {
  id: string;
  aktor: string;
  aksi: string;
  target: string;
  waktu: string; // ISO
  jenis: "buat" | "ubah" | "hapus" | "generate" | "komentar" | "ekspor";
}

export const aktivitas: Aktivitas[] = [
  {
    id: "act-1",
    aktor: "Kamu",
    aksi: "membuat master prompt untuk",
    target: "Nusantara Marketplace",
    waktu: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    jenis: "generate",
  },
  {
    id: "act-2",
    aktor: "Kamu",
    aksi: "memperbarui PRD",
    target: "Klinik Sehat ERP",
    waktu: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    jenis: "ubah",
  },
  {
    id: "act-3",
    aktor: "AI Interview",
    aksi: "menghasilkan 12 pertanyaan untuk",
    target: "Kopi Kita POS",
    waktu: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    jenis: "generate",
  },
  {
    id: "act-4",
    aktor: "Kamu",
    aksi: "mengekspor dokumen ke PDF",
    target: "AI Notulen",
    waktu: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    jenis: "ekspor",
  },
  {
    id: "act-5",
    aktor: "Kamu",
    aksi: "menambahkan node database ke",
    target: "Rumah Sakit Sentosa",
    waktu: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    jenis: "ubah",
  },
  {
    id: "act-6",
    aktor: "Kamu",
    aksi: "membuat project baru",
    target: "SekolahKu LMS",
    waktu: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    jenis: "buat",
  },
];
