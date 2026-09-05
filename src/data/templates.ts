export interface Template {
  id: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  tag: string[];
  populer?: boolean;
  favorit?: boolean;
}

export const templates: Template[] = [
  { id: "tpl-marketplace", nama: "Marketplace", kategori: "Bisnis", deskripsi: "Platform multi-vendor dengan katalog, keranjang, dan pembayaran.", tag: ["e-commerce", "vendor"], populer: true, favorit: true },
  { id: "tpl-erp", nama: "ERP", kategori: "Bisnis", deskripsi: "Sistem enterprise: inventori, keuangan, HR, pengadaan.", tag: ["enterprise", "operasi"], populer: true },
  { id: "tpl-crm", nama: "CRM", kategori: "Bisnis", deskripsi: "Manajemen relasi pelanggan dengan pipeline dan otomatisasi.", tag: ["sales", "otomasi"] },
  { id: "tpl-landing", nama: "Landing Page", kategori: "Marketing", deskripsi: "Halaman konversi tinggi dengan hero, fitur, dan pricing.", tag: ["marketing"] },
  { id: "tpl-ai-chat", nama: "AI Chat", kategori: "AI", deskripsi: "Antarmuka chatbot dengan streaming dan riwayat percakapan.", tag: ["ai", "chat"], favorit: true },
  { id: "tpl-company", nama: "Company Profile", kategori: "Marketing", deskripsi: "Website profil perusahaan modern dan responsif.", tag: ["korporat"] },
  { id: "tpl-dashboard", nama: "Dashboard", kategori: "Data", deskripsi: "Analitik dengan grafik, filter, dan laporan.", tag: ["analitik"], populer: true },
  { id: "tpl-pos", nama: "POS", kategori: "Bisnis", deskripsi: "Kasir dengan katalog produk, cetak struk, dan sinkronisasi.", tag: ["retail"] },
  { id: "tpl-ecommerce", nama: "E-Commerce", kategori: "Bisnis", deskripsi: "Toko online single-vendor lengkap dengan pembayaran.", tag: ["retail"] },
  { id: "tpl-sekolah", nama: "Sekolah / LMS", kategori: "Pendidikan", deskripsi: "Manajemen kelas, kuis, rapor, dan komunikasi guru–siswa.", tag: ["pendidikan"] },
  { id: "tpl-hospital", nama: "Rumah Sakit", kategori: "Kesehatan", deskripsi: "SIM RS: rekam medis, apotek, jadwal dokter, BPJS.", tag: ["kesehatan"] },
  { id: "tpl-property", nama: "Properti", kategori: "Bisnis", deskripsi: "Portal properti dengan pencarian peta dan galeri.", tag: ["real estate"] },
];
