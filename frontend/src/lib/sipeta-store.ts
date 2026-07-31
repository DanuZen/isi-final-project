/**
 * SIPETA LocalStorage State Engine
 * Menghubungkan transaksi antar-portal 7 role secara realtime lokal di browser.
 */

export interface StoredProposal {
  judul: string;
  abstrak: string;
  bidangKajian: string;
  similarityScore: number;
  submittedAt: string;
}

export interface StoredPembimbingRequest {
  id: string;
  studentNim: string;
  studentNama: string;
  prodi: string;
  judul: string;
  bidang: string;
  dosenId: string;
  dosenNama: string;
  status: "MENUNGGU" | "DITERIMA" | "DITOLAK";
  tgl: string;
  alasan: string;
}

export interface StoredBimbinganLog {
  id: string;
  tanggal: string;
  studentNim: string;
  studentNama: string;
  catatanMahasiswa: string;
  fileAttachment: string;
  dosenNama: string;
  catatanDosen: string;
  statusFeedback: "Menunggu Review" | "Disetujui Pembimbing" | "Perlu Perbaikan";
}

export interface StoredJadwalUjian {
  id: string;
  studentNim: string;
  studentNama: string;
  prodi: string;
  judul: string;
  tanggal: string;
  tglNum: string;
  hari: string;
  ruang: string;
  waktu: string;
  jenis: "Seminar" | "Sidang";
  status: "Menunggu" | "Nilai Masuk" | "Selesai";
  nilai: number | null;
}

const STORAGE_KEYS = {
  PROPOSAL: "sipeta_store_proposal",
  PEMBIMBING_REQ: "sipeta_store_pembimbing_requests",
  BIMBINGAN_LOGS: "sipeta_store_bimbingan_logs",
  JADWAL_UJIAN: "sipeta_store_jadwal_ujian",
};

// ── Helper Safe Get/Set ──
function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage_sipeta"));
  } catch (err) {
    console.error("Storage error:", err);
  }
}

// ── Proposal Engine ──
export const storeProposal = {
  get: (): StoredProposal | null => getItem<StoredProposal | null>(STORAGE_KEYS.PROPOSAL, null),
  save: (data: StoredProposal) => setItem(STORAGE_KEYS.PROPOSAL, data),
};

// ── Pembimbing Request Engine ──
export const storePembimbing = {
  getAll: (): StoredPembimbingRequest[] => getItem<StoredPembimbingRequest[]>(STORAGE_KEYS.PEMBIMBING_REQ, []),
  saveRequest: (req: Omit<StoredPembimbingRequest, "id" | "status" | "tgl">) => {
    const list = storePembimbing.getAll();
    const newReq: StoredPembimbingRequest = {
      ...req,
      id: "REQ-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
      status: "MENUNGGU",
      tgl: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    };
    setItem(STORAGE_KEYS.PEMBIMBING_REQ, [newReq, ...list]);
    return newReq;
  },
  updateStatus: (id: string, status: "DITERIMA" | "DITOLAK") => {
    const list = storePembimbing.getAll().map((item) =>
      item.id === id ? { ...item, status } : item
    );
    setItem(STORAGE_KEYS.PEMBIMBING_REQ, list);
  },
};

// ── Bimbingan Logs Engine ──
export const storeBimbingan = {
  getAll: (): StoredBimbinganLog[] => getItem<StoredBimbinganLog[]>(STORAGE_KEYS.BIMBINGAN_LOGS, []),
  addLog: (log: Omit<StoredBimbinganLog, "id" | "tanggal" | "statusFeedback">) => {
    const list = storeBimbingan.getAll();
    const newLog: StoredBimbinganLog = {
      ...log,
      id: "LOG-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
      tanggal: "Hari ini, " + new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      statusFeedback: "Menunggu Review",
    };
    setItem(STORAGE_KEYS.BIMBINGAN_LOGS, [newLog, ...list]);
    return newLog;
  },
  updateFeedback: (id: string, catatanDosen: string, statusFeedback: "Disetujui Pembimbing" | "Perlu Perbaikan") => {
    const list = storeBimbingan.getAll().map((item) =>
      item.id === id ? { ...item, catatanDosen, statusFeedback } : item
    );
    setItem(STORAGE_KEYS.BIMBINGAN_LOGS, list);
  },
};

// ── Jadwal Ujian Engine ──
export const storeJadwal = {
  getAll: (): StoredJadwalUjian[] => getItem<StoredJadwalUjian[]>(STORAGE_KEYS.JADWAL_UJIAN, []),
  addJadwal: (jadwal: Omit<StoredJadwalUjian, "id" | "status" | "nilai">) => {
    const list = storeJadwal.getAll();
    const newJadwal: StoredJadwalUjian = {
      ...jadwal,
      id: "JDW-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
      status: "Menunggu",
      nilai: null,
    };
    setItem(STORAGE_KEYS.JADWAL_UJIAN, [newJadwal, ...list]);
    return newJadwal;
  },
  updateNilai: (id: string, nilai: number) => {
    const list = storeJadwal.getAll().map((item) =>
      item.id === id ? { ...item, nilai, status: "Selesai" as const } : item
    );
    setItem(STORAGE_KEYS.JADWAL_UJIAN, list);
  },
};
