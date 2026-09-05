export interface Provider {
  id: string;
  nama: string;
  aktif: boolean;
  prioritas: number;
  strategy: "round-robin" | "fallback" | "prioritas" | "load-balance";
  timeoutMs: number;
  retry: number;
  cooldownMs: number;
  totalRequest: number;
  totalError: number;
  avgResponseMs: number;
  quota: number;
  limit: number;
  latencyMs: number;
  health: "sehat" | "peringatan" | "gangguan";
}

export const providers: Provider[] = [
  {
    id: "p-gemini",
    nama: "Gemini",
    aktif: true,
    prioritas: 1,
    strategy: "prioritas",
    timeoutMs: 30000,
    retry: 3,
    cooldownMs: 5000,
    totalRequest: 12847,
    totalError: 24,
    avgResponseMs: 842,
    quota: 100000,
    limit: 60,
    latencyMs: 812,
    health: "sehat",
  },
  {
    id: "p-groq",
    nama: "Groq",
    aktif: true,
    prioritas: 2,
    strategy: "fallback",
    timeoutMs: 20000,
    retry: 2,
    cooldownMs: 3000,
    totalRequest: 4321,
    totalError: 12,
    avgResponseMs: 312,
    quota: 50000,
    limit: 90,
    latencyMs: 298,
    health: "sehat",
  },
];

export interface ApiKey {
  id: string;
  provider: "Gemini" | "Groq";
  nama: string;
  key: string; // masked
  aktif: boolean;
  prioritas: number;
  totalRequest: number;
  totalError: number;
  quotaTerpakai: number;
  quotaTotal: number;
  dibuat: string;
  terakhirDipakai: string;
}

export const apiKeys: ApiKey[] = [
  { id: "k1", provider: "Gemini", nama: "Gemini Utama", key: "AIza••••••••••••••••••••7f2a", aktif: true, prioritas: 1, totalRequest: 8420, totalError: 8, quotaTerpakai: 68000, quotaTotal: 100000, dibuat: new Date(Date.now() - 86400000 * 30).toISOString(), terakhirDipakai: new Date(Date.now() - 60000 * 3).toISOString() },
  { id: "k2", provider: "Gemini", nama: "Gemini Cadangan", key: "AIza••••••••••••••••••••b91d", aktif: true, prioritas: 2, totalRequest: 4427, totalError: 16, quotaTerpakai: 32000, quotaTotal: 100000, dibuat: new Date(Date.now() - 86400000 * 14).toISOString(), terakhirDipakai: new Date(Date.now() - 60000 * 45).toISOString() },
  { id: "k3", provider: "Groq", nama: "Groq Utama", key: "gsk_••••••••••••••••••••••••4c8e", aktif: true, prioritas: 1, totalRequest: 3120, totalError: 5, quotaTerpakai: 22000, quotaTotal: 50000, dibuat: new Date(Date.now() - 86400000 * 20).toISOString(), terakhirDipakai: new Date(Date.now() - 60000 * 8).toISOString() },
  { id: "k4", provider: "Groq", nama: "Groq Eksperimen", key: "gsk_••••••••••••••••••••••••a12f", aktif: false, prioritas: 3, totalRequest: 1201, totalError: 7, quotaTerpakai: 8000, quotaTotal: 50000, dibuat: new Date(Date.now() - 86400000 * 7).toISOString(), terakhirDipakai: new Date(Date.now() - 86400000 * 2).toISOString() },
];
