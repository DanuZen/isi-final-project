/**
 * API Client Helper Layer — SIPETA PT MBOIS
 * File ini menyediakan helper fetcher terstruktur untuk menghubungkan Frontend UI
 * dengan Backend API Server (Next.js Route Handlers / Express / NestJS).
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// ── Generic Fetcher Wrapper ──
async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return {
      success: false,
      statusCode: 500,
      error: {
        code: "NETWORK_ERROR",
        message: err.message || "Gagal menghubungkan ke server API PT MBOIS",
      },
    };
  }
}

// ── 1. Auth Service Stubs ──
export const authService = {
  login: async (credentials: { nim: string; password: string }) =>
    fetcher("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  logout: async () => fetcher("/auth/logout", { method: "POST" }),
  getMe: async () => fetcher("/auth/me"),
};

// ── 2. Mahasiswa Service Stubs ──
export const mahasiswaService = {
  submitProposal: async (payload: { judul: string; abstrak: string; bidangKajian: string }) =>
    fetcher("/proposal/submit", { method: "POST", body: JSON.stringify(payload) }),
  requestPembimbing: async (payload: { pembimbing1Id: string; pembimbing2Id: string; alasan: string }) =>
    fetcher("/pembimbing/request", { method: "POST", body: JSON.stringify(payload) }),
  getBimbinganLogs: async () => fetcher("/bimbingan/logs"),
  addBimbinganLog: async (payload: { catatan: string; fileAttachment?: string }) =>
    fetcher("/bimbingan/logs", { method: "POST", body: JSON.stringify(payload) }),
  getSeminarStatus: async () => fetcher("/seminar/status"),
  uploadRevisiSempro: async (payload: { fileUrl: string }) =>
    fetcher("/seminar/revisi", { method: "POST", body: JSON.stringify(payload) }),
  getSidangStatus: async () => fetcher("/sidang/status"),
};

// ── 3. Dosen & Penguji Service Stubs ──
export const dosenService = {
  getPengajuanList: async () => fetcher("/dosen/pengajuan"),
  respondPengajuan: async (payload: { pengajuanId: string; status: "ACC" | "REJECT"; catatan?: string }) =>
    fetcher("/dosen/pengajuan/respond", { method: "POST", body: JSON.stringify(payload) }),
  giveBimbinganFeedback: async (payload: { logId: string; feedback: string; status: string }) =>
    fetcher("/dosen/bimbingan/feedback", { method: "POST", body: JSON.stringify(payload) }),
  giveAccSempro: async (studentNim: string) =>
    fetcher("/dosen/acc-sempro", { method: "POST", body: JSON.stringify({ studentNim }) }),
  getPengujiJadwal: async () => fetcher("/penguji/jadwal"),
  submitNilaiUjian: async (payload: { jadwalId: string; nilai: number; catatan: string }) =>
    fetcher("/penguji/nilai", { method: "POST", body: JSON.stringify(payload) }),
  verifyRevisi: async (payload: { revisiId: string; status: "VERIFIED" }) =>
    fetcher("/penguji/revisi/verify", { method: "POST", body: JSON.stringify(payload) }),
};

// ── 4. Admin Prodi Service Stubs ──
export const adminProdiService = {
  activateMahasiswa: async (payload: { studentNim: string; sks: number; ipk: number }) =>
    fetcher("/admin-prodi/aktivasi", { method: "POST", body: JSON.stringify(payload) }),
  assignPembimbing: async (payload: { studentNim: string; dosen1Id: string; dosen2Id: string }) =>
    fetcher("/admin-prodi/pembimbing/assign", { method: "POST", body: JSON.stringify(payload) }),
  createJadwalUjian: async (payload: { studentNim: string; jenis: "Seminar" | "Sidang"; tanggal: string; ruangan: string; pengujiIds: string[] }) =>
    fetcher("/admin-prodi/jadwal/create", { method: "POST", body: JSON.stringify(payload) }),
};

// ── 5. Admin Fakultas & Dekanat Service Stubs ──
export const adminFakultasService = {
  generateSkDekan: async (payload: { studentNim: string; jenisSk: string }) =>
    fetcher("/admin-fakultas/sk/generate", { method: "POST", body: JSON.stringify(payload) }),
  verifyBebasFakultas: async (payload: { studentNim: string; perpus: boolean; lab: boolean; spp: boolean }) =>
    fetcher("/admin-fakultas/bebas/verify", { method: "POST", body: JSON.stringify(payload) }),
  getDekanatDashboard: async () => fetcher("/dekanat/dashboard"),
};
