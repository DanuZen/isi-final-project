"use client";

import React, { useState } from "react";
import { Sidebar, DOSEN_NAV_ITEMS } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  BookOpen, CheckCircle2, Clock, AlertCircle, MessageSquare,
  FileText, Search, Filter, Eye, ArrowRight, X, Send, Award,
  Sparkles, Check
} from "lucide-react";

type TahapKey = "Usulan" | "Bimbingan" | "Seminar" | "Sidang" | "Selesai";

interface MahasiswaItem {
  nim: string;
  nama: string;
  prodi: string;
  judul: string;
  bidang: string;
  tahap: TahapKey;
  sesi: number;
  minSesi: number;
  lastLog: string;
  status: string;
  pembimbing2: string;
  logHistory: Array<{ id: number; tgl: string; topik: string; status: string }>;
}

const MAHASISWA: Array<MahasiswaItem> = [
  {
    nim: "20101152630045",
    nama: "Danu Zen",
    prodi: "Teknik Informatika",
    judul: "Rancang Bangun Sistem Informasi Perjalanan & Evaluasi Tugas Akhir (SIPETA) Berbasis Web di UPI YPTK Padang",
    bidang: "Rekayasa Perangkat Lunak",
    tahap: "Bimbingan",
    sesi: 4,
    minSesi: 5,
    lastLog: "Kemarin 14:30",
    status: "On Track",
    pembimbing2: "Rina Oktaviani, M.Kom.",
    logHistory: [
      { id: 4, tgl: "29 Jul 2026", topik: "Revisi Draf Bab 4 Implementasi System & Fit-Viewport Design", status: "Perlu Revisi Kecil" },
      { id: 3, tgl: "20 Jul 2026", topik: "Peninjauan Draf Bab 3 Metodologi Penelitian & ERD Database", status: "ACC Pembimbing" },
      { id: 2, tgl: "10 Jul 2026", topik: "Konsultasi Bab 2 Landasan Teori & Kajian Pustaka", status: "ACC Pembimbing" },
      { id: 1, tgl: "01 Jul 2026", topik: "Pengajuan Draf Bab 1 Latar Belakang & Perumusan Masalah", status: "ACC Pembimbing" },
    ],
  },
  {
    nim: "20101152630089",
    nama: "Rafi Andika",
    prodi: "Teknik Informatika",
    judul: "Implementasi Machine Learning untuk Deteksi Spam Email Menggunakan Algoritma Naive Bayes",
    bidang: "Artificial Intelligence",
    tahap: "Seminar",
    sesi: 7,
    minSesi: 5,
    lastLog: "3 hari lalu",
    status: "On Track",
    pembimbing2: "Sari Indah, M.T.",
    logHistory: [
      { id: 7, tgl: "26 Jul 2026", topik: "Persiapan Slide Presentasi Seminar Proposal & Lembar ACC", status: "ACC Pembimbing" },
      { id: 6, tgl: "18 Jul 2026", topik: "Pengujian Akurasi Model & Confusion Matrix", status: "ACC Pembimbing" },
      { id: 5, tgl: "05 Jul 2026", topik: "Preprocessing Dataset & Extraction Feature", status: "ACC Pembimbing" },
    ],
  },
  {
    nim: "20101152630101",
    nama: "Siti Rahayu",
    prodi: "Sistem Informasi",
    judul: "Optimisasi Algoritma Routing Jaringan Komputer Menggunakan Dijkstra",
    bidang: "Computer Network & Security",
    tahap: "Bimbingan",
    sesi: 2,
    minSesi: 5,
    lastLog: "1 minggu lalu",
    status: "Perlu Perhatian",
    pembimbing2: "Iwan Setiawan, M.Kom.",
    logHistory: [
      { id: 2, tgl: "21 Jul 2026", topik: "Revisi Rumusan Masalah & Pembatasan Masalah Bab 1", status: "Perlu Perhatian" },
      { id: 1, tgl: "12 Jul 2026", topik: "Konsultasi Ide Judul & Latar Belakang Penelitian", status: "ACC Pembimbing" },
    ],
  },
  {
    nim: "20101152630022",
    nama: "Budi Prasetyo",
    prodi: "Teknik Informatika",
    judul: "Pengembangan Aplikasi Mobile Absensi Mahasiswa Berbasis Geolocation dan Face Recognition",
    bidang: "Mobile Programming & AI",
    tahap: "Sidang",
    sesi: 8,
    minSesi: 5,
    lastLog: "Kemarin 09:00",
    status: "On Track",
    pembimbing2: "Rina Oktaviani, M.Kom.",
    logHistory: [
      { id: 8, tgl: "28 Jul 2026", topik: "Final Check Naskah Skripsi & Persiapan Ujian Sidang", status: "ACC Pembimbing" },
      { id: 7, tgl: "15 Jul 2026", topik: "Revisi Pasca Sempro & Pembahasan Bab 5 Kesimpulan", status: "ACC Pembimbing" },
    ],
  },
  {
    nim: "20101152630067",
    nama: "Anisa Permatasari",
    prodi: "Teknik Informatika",
    judul: "Klasifikasi Citra Daun Menggunakan Convolutional Neural Network (CNN)",
    bidang: "Artificial Intelligence",
    tahap: "Bimbingan",
    sesi: 3,
    minSesi: 5,
    lastLog: "4 hari lalu",
    status: "On Track",
    pembimbing2: "Sari Indah, M.T.",
    logHistory: [
      { id: 3, tgl: "25 Jul 2026", topik: "Perancangan Arsitektur CNN Convolutional Layers", status: "ACC Pembimbing" },
      { id: 2, tgl: "14 Jul 2026", topik: "Kajian Pustaka Citra Daun & Dataset Augmentation", status: "ACC Pembimbing" },
    ],
  },
  {
    nim: "20101152630133",
    nama: "Fajar Nugroho",
    prodi: "Sistem Informasi",
    judul: "Analisis Sentimen Review Produk Marketplace Online Menggunakan Sentiment VADER",
    bidang: "Data Science",
    tahap: "Selesai",
    sesi: 9,
    minSesi: 5,
    lastLog: "2 minggu lalu",
    status: "Lulus",
    pembimbing2: "Iwan Setiawan, M.Kom.",
    logHistory: [
      { id: 9, tgl: "10 Jul 2026", topik: "Verifikasi Lembar Bebas Revisi Ujian Sidang", status: "Lulus / ACC Final" },
    ],
  },
];

const TAHAP_COLOR: Record<TahapKey, { color: string; bg: string }> = {
  "Usulan":   { color: "#b45309", bg: "#fffbeb" },
  "Bimbingan":{ color: "#1d4ed8", bg: "#eff6ff" },
  "Seminar":  { color: "#2563EB", bg: "#eff6ff" },
  "Sidang":   { color: "#C62828", bg: "#fef2f2" },
  "Selesai":  { color: "#059669", bg: "#ecfdf5" },
};

const STATUS_COLOR: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  "On Track":        { color: "#059669", bg: "#ecfdf5", icon: CheckCircle2 },
  "Perlu Perhatian": { color: "#b45309", bg: "#fffbeb", icon: AlertCircle },
  "Lulus":           { color: "#475569", bg: "#f8fafc", icon: CheckCircle2 },
};

export default function DosenBimbinganPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTahap, setFilterTahap] = useState<string>("Semua");
  const [selectedNim, setSelectedNim] = useState<string>("20101152630045");
  const [accGrantedMap, setAccGrantedMap] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Chat Modal State
  const [showChatModal, setShowChatModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: "mahasiswa", text: "Selamat siang Pak, draf Bab 4 sudah saya unggah untuk ditinjau.", time: "14:25 WIB" },
    { sender: "dosen", text: "Baik, sedang saya baca. Pastikan pengujian performa sistem disertai tabel grafik.", time: "14:28 WIB" },
  ]);

  const filtered = MAHASISWA.filter((m) => {
    const matchSearch = m.nama.toLowerCase().includes(search.toLowerCase()) || m.nim.includes(search);
    const matchTahap  = filterTahap === "Semua" || m.tahap === filterTahap;
    return matchSearch && matchTahap;
  });

  const selectedMhs = MAHASISWA.find((m) => m.nim === selectedNim) || MAHASISWA[0];

  const handleToggleAcc = (nim: string, nama: string) => {
    const nextState = !accGrantedMap[nim];
    setAccGrantedMap((prev) => ({ ...prev, [nim]: nextState }));
    
    if (nextState) {
      showToast(`Persetujuan (ACC) Seminar/Sidang berhasil diberikan kepada ${nama}!`);
    } else {
      showToast(`Status ACC ${nama} dibatalkan.`);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "dosen",
        text: chatInput,
        time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      },
    ]);
    setChatInput("");
    showToast("Pesan catatan bimbingan berhasil terkirim!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV_ITEMS} roleName="Dosen" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Sarjon Defit" userNim="NIDN: 1012057301" userRole="Dosen Pembimbing" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0 relative">
            
            {/* Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
                <Sparkles className="w-4 h-4 text-[#ffd01d] shrink-0" />
                <p className="text-xs font-bold font-display">{toastMessage}</p>
                <button onClick={() => setToastMessage(null)} className="ml-2 text-neutral-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Portal Mahasiswa Bimbingan Active
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Monitoring Mahasiswa Bimbingan TA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pantau progres bab skripsi, verifikasi log konsultasi rutin, dan berikan persetujuan (ACC) Seminar &amp; Ujian Sidang.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dosen/pengajuan"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white border border-red-500/30 shadow-md shadow-red-950/40 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Permohonan Masuk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── Split Layout (7/12 & 5/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
              
              {/* ── LEFT COLUMN (7/12): List Mahasiswa Bimbingan Card ── */}
              <div className="lg:col-span-7 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden">
                {/* Header Card + Search & Filter */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Mahasiswa Bimbingan</h2>
                      <p className="text-[10px] text-slate-400 font-medium">Total: {filtered.length} Mahasiswa Listed</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap ml-auto">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Cari nama atau NIM..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-[11px] bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all w-36 sm:w-44 font-medium"
                      />
                    </div>
                    <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                      <Filter className="w-3 h-3 text-slate-400 ml-1" />
                      {["Semua", "Bimbingan", "Seminar", "Sidang"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setFilterTahap(t)}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                          style={filterTahap === t ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scrollable List Items */}
                <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2.5">
                  {filtered.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 space-y-2">
                      <Users className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="text-xs font-bold text-slate-600">Tidak ada mahasiswa bimbingan ditemukan</p>
                    </div>
                  ) : (
                    filtered.map((mhs) => {
                      const isSelected = selectedNim === mhs.nim;
                      const isAccGranted = accGrantedMap[mhs.nim] || mhs.tahap === "Selesai";
                      const tahapCfg = TAHAP_COLOR[mhs.tahap];
                      const statusCfg = STATUS_COLOR[mhs.status] ?? STATUS_COLOR["On Track"];
                      const StatusIcon = statusCfg.icon;
                      const sesiPct = Math.min((mhs.sesi / mhs.minSesi) * 100, 100);

                      return (
                        <div
                          key={mhs.nim}
                          onClick={() => setSelectedNim(mhs.nim)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                            isSelected
                              ? "bg-rose-50/40 border-[#C62828] shadow-xs ring-1 ring-[#C62828]/20"
                              : "bg-slate-50/50 border-slate-200/80 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            {/* Left Info */}
                            <div className="flex items-start gap-2.5 min-w-0 flex-1">
                              <div
                                className="w-9 h-9 rounded-xl text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5"
                                style={{ background: tahapCfg.color }}
                              >
                                {mhs.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                              </div>

                              <div className="space-y-0.5 min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-black text-xs text-slate-900 font-display">{mhs.nama}</span>
                                  <span className="text-[10px] font-mono text-slate-400">({mhs.nim})</span>
                                  <span
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                                    style={{ background: statusCfg.bg, color: statusCfg.color }}
                                  >
                                    <StatusIcon className="w-2.5 h-2.5" /> {mhs.status}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-600 font-medium truncate">
                                  &ldquo;{mhs.judul}&rdquo;
                                </p>
                              </div>
                            </div>

                            {/* Right Progress & Buttons */}
                            <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                              <div className="w-28 space-y-1">
                                <div className="flex items-center justify-between text-[9px]">
                                  <span
                                    className="px-1.5 py-0.5 rounded-full font-bold"
                                    style={{ background: tahapCfg.bg, color: tahapCfg.color }}
                                  >
                                    {mhs.tahap}
                                  </span>
                                  <span className="font-bold text-slate-500">{mhs.sesi}/{mhs.minSesi}</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-slate-200/80 overflow-hidden">
                                  <div
                                    className="h-1.5 rounded-full transition-all"
                                    style={{
                                      width: `${sesiPct}%`,
                                      background: sesiPct >= 100 ? "#059669" : "#C62828",
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => {
                                    setSelectedNim(mhs.nim);
                                    setShowPdfModal(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
                                  title="Pratinjau Draf PDF Skripsi"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedNim(mhs.nim);
                                    setShowChatModal(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
                                  title="Catat Log / Chat"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                                {mhs.tahap !== "Selesai" && (
                                  <button
                                    onClick={() => handleToggleAcc(mhs.nim, mhs.nama)}
                                    className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer shadow-xs ${
                                      isAccGranted
                                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                        : "bg-[#C62828] hover:bg-[#a81f1f] text-white border border-red-500/30"
                                    }`}
                                  >
                                    {isAccGranted ? (
                                      <>
                                        <Check className="w-3 h-3" /> ACC Done
                                      </>
                                    ) : (
                                      <>
                                        <FileText className="w-3 h-3" /> ACC
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* ── RIGHT COLUMN (5/12): Detail Panel Card ── */}
              <div className="lg:col-span-5 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden">
                {/* Header Card Detail */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Detail &amp; Progres Mahasiswa</h2>
                      <p className="text-[10px] text-slate-400 font-medium">Informasi lengkap &amp; histori log</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 font-mono">
                    {selectedMhs.nim}
                  </span>
                </div>

                {/* Content Area Detail */}
                <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-4">
                  {/* Student Profile Header Box */}
                  <div className="p-4 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-rose-50/20 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-2xl text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md"
                          style={{ background: TAHAP_COLOR[selectedMhs.tahap].color }}
                        >
                          {selectedMhs.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-900 font-display leading-tight">
                            {selectedMhs.nama}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">{selectedMhs.prodi}</p>
                          <p className="text-[10.5px] font-mono text-slate-400 font-medium">NIM: {selectedMhs.nim}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                          style={{
                            background: STATUS_COLOR[selectedMhs.status]?.bg,
                            color: STATUS_COLOR[selectedMhs.status]?.color,
                          }}
                        >
                          {selectedMhs.status}
                        </span>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                          style={{
                            background: TAHAP_COLOR[selectedMhs.tahap].bg,
                            color: TAHAP_COLOR[selectedMhs.tahap].color,
                          }}
                        >
                          Tahap: {selectedMhs.tahap}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Topik Skripsi Detail Box */}
                  <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Judul Tugas Akhir</span>
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {selectedMhs.bidang}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 leading-relaxed font-display">
                      &ldquo;{selectedMhs.judul}&rdquo;
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500">
                      <span>Pembimbing II: <strong className="text-slate-800">{selectedMhs.pembimbing2}</strong></span>
                      <span className="font-bold text-emerald-600">Sesi: {selectedMhs.sesi}/{selectedMhs.minSesi}</span>
                    </div>
                  </div>

                  {/* Sesi Tracker & Log History List */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-800 font-display flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C62828]" /> Histori Bimbingan Terakhir
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400">
                        {selectedMhs.logHistory.length} Catatan
                      </span>
                    </div>

                    <div className="space-y-2">
                      {selectedMhs.logHistory.map((log) => (
                        <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                          <div className="flex items-center justify-between text-[10.5px]">
                            <span className="font-bold text-slate-900 font-display">Sesi #{log.id} · {log.tgl}</span>
                            <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {log.status}
                            </span>
                          </div>
                          <p className="text-[11.5px] text-slate-600 leading-snug">{log.topik}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Fixed Action Panel */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/80 shrink-0 space-y-2">
                  <div className="flex items-center gap-2">
                    {selectedMhs.tahap !== "Selesai" && (
                      <button
                        onClick={() => handleToggleAcc(selectedMhs.nim, selectedMhs.nama)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 ${
                          accGrantedMap[selectedMhs.nim]
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-[#C62828] hover:bg-[#a81f1f] text-white border border-red-500/30"
                        }`}
                      >
                        {accGrantedMap[selectedMhs.nim] ? (
                          <>
                            <Check className="w-4 h-4" /> Persetujuan (ACC) Berhasil Diberikan
                          </>
                        ) : (
                          <>
                            <Award className="w-4 h-4" /> Beri Persetujuan (ACC) Seminar/Sidang
                          </>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => setShowChatModal(true)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#ffd01d] hover:bg-[#d97706] text-slate-950 border border-amber-400/40 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-950" /> Catat Log
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Consultation Chat Modal ── */}
            {showChatModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95">
                  {/* Modal Header */}
                  <div className="p-4 bg-[#1A1A1A] text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white font-bold text-xs flex items-center justify-center">
                        {selectedMhs.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm font-display text-white">{selectedMhs.nama}</h3>
                        <p className="text-[10px] text-neutral-400">NIM: {selectedMhs.nim} · {selectedMhs.prodi}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowChatModal(false)}
                      className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.sender === "dosen" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === "dosen"
                              ? "bg-[#C62828] text-white rounded-br-none"
                              : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9.5px] text-slate-400 mt-1 px-1 font-medium">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input Form */}
                  <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Tulis catatan atau instruksi revisi..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#C62828] bg-slate-50"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#C62828] hover:bg-[#a81f1f] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Kirim
                    </button>
                  </form>
                </div>
              </div>
            )}
            {/* ── PDF Draft Preview Modal ── */}
            {showPdfModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[80vh] animate-in fade-in zoom-in-95">
                  {/* Modal Header */}
                  <div className="p-4 bg-[#1A1A1A] text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm font-display text-white">Pratinjau Draf Naskah Skripsi</h3>
                        <p className="text-[10px] text-neutral-400 font-mono">Draf_Skripsi_{selectedMhs.nim}.pdf · {selectedMhs.nama}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPdfModal(false)}
                      className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Document Toolbar */}
                  <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <span>Halaman 1 / 48</span>
                      <span className="text-slate-300">|</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Status Draf: {selectedMhs.tahap}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        showToast(`Mengunduh Draf_Skripsi_${selectedMhs.nim}.pdf ...`);
                        setShowPdfModal(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#C62828] hover:bg-[#a81f1f] text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" /> Unduh PDF
                    </button>
                  </div>

                  {/* PDF Document Body Mockup */}
                  <div className="flex-1 overflow-y-auto p-6 bg-slate-200/80 flex justify-center">
                    <div className="bg-white rounded-lg shadow-md border border-slate-300 p-8 w-full max-w-lg space-y-6 text-slate-800 font-serif">
                      <div className="text-center space-y-2 pb-4 border-b border-slate-200">
                        <p className="text-xs uppercase font-bold tracking-widest text-slate-500 font-sans">
                          UNIVERSITAS PUTRA INDONESIA YPTK PADANG
                        </p>
                        <h2 className="text-sm font-bold uppercase leading-snug font-sans">
                          {selectedMhs.judul}
                        </h2>
                        <p className="text-[11px] font-sans text-slate-600 pt-2">
                          Oleh: <strong>{selectedMhs.nama}</strong> ({selectedMhs.nim})
                        </p>
                      </div>

                      <div className="space-y-3 text-xs leading-relaxed text-justify">
                        <p className="font-bold font-sans text-slate-900">ABSTRAK</p>
                        <p>
                          Penelitian ini bertujuan untuk merancang dan mengimplementasikan sistem informasi yang efisien berbasis web di lingkungan Fakultas Ilmu Komputer UPI YPTK Padang. Metodologi yang digunakan meliputi analisis kebutuhan, perancangan database ERD, implementasi arsitektur modular, dan pengujian blackbox.
                        </p>
                        <p>
                          Hasil pengujian menunjukkan bahwa sistem mampu meningkatkan efisiensi proses pemantauan tugas akhir hingga 85% dibandingkan proses manual sebelumnya.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
