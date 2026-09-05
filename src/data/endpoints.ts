export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Endpoint {
  id: string;
  method: Method;
  path: string;
  deskripsi: string;
  auth: "Publik" | "Token" | "Admin";
  grup: string;
  request?: string;
  response?: string;
}

export const endpoints: Endpoint[] = [
  { id: "e1", method: "POST", path: "/api/v1/auth/masuk", deskripsi: "Autentikasi pengguna dan menerbitkan token.", auth: "Publik", grup: "Autentikasi", request: "{ email, kataSandi }", response: "{ token, pengguna }" },
  { id: "e2", method: "POST", path: "/api/v1/auth/daftar", deskripsi: "Registrasi pengguna baru.", auth: "Publik", grup: "Autentikasi" },
  { id: "e3", method: "GET", path: "/api/v1/pengguna/saya", deskripsi: "Profil pengguna aktif.", auth: "Token", grup: "Pengguna" },
  { id: "e4", method: "GET", path: "/api/v1/produk", deskripsi: "Daftar produk terpaginasi.", auth: "Publik", grup: "Katalog" },
  { id: "e5", method: "POST", path: "/api/v1/produk", deskripsi: "Tambah produk baru.", auth: "Admin", grup: "Katalog" },
  { id: "e6", method: "PATCH", path: "/api/v1/produk/:id", deskripsi: "Perbarui produk.", auth: "Admin", grup: "Katalog" },
  { id: "e7", method: "DELETE", path: "/api/v1/produk/:id", deskripsi: "Hapus produk.", auth: "Admin", grup: "Katalog" },
  { id: "e8", method: "POST", path: "/api/v1/pesanan", deskripsi: "Buat pesanan baru.", auth: "Token", grup: "Pesanan" },
  { id: "e9", method: "GET", path: "/api/v1/pesanan/:id", deskripsi: "Detail pesanan.", auth: "Token", grup: "Pesanan" },
  { id: "e10", method: "POST", path: "/api/v1/pembayaran", deskripsi: "Proses pembayaran pesanan.", auth: "Token", grup: "Pembayaran" },
  { id: "e11", method: "GET", path: "/api/v1/laporan/penjualan", deskripsi: "Laporan penjualan periodik.", auth: "Admin", grup: "Laporan" },
];

export const methodColor: Record<Method, string> = {
  GET: "text-info",
  POST: "text-success",
  PUT: "text-warning",
  PATCH: "text-warning",
  DELETE: "text-destructive",
};
