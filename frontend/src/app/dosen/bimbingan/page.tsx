"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, DOSEN_NAV_ITEMS } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  BookOpen, CheckCircle2, Clock, AlertCircle, MessageSquare,
  FileText, Search, Filter, Eye, ArrowRight, ArrowLeft, X, Send, Award,
  Sparkles, Check, ChevronDown, Download
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
  "Usulan":   { color: "#ffffff", bg: "#b45309" },
  "Bimbingan":{ color: "#ffffff", bg: "#C62828" },
  "Seminar":  { color: "#0f172a", bg: "#ffd01d" },
  "Sidang":   { color: "#ffffff", bg: "#B71C1C" },
  "Selesai":  { color: "#ffffff", bg: "#1e293b" },
};

const STATUS_COLOR: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  "On Track":        { color: "#ffffff", bg: "#C62828", icon: CheckCircle2 },
  "Perlu Perhatian": { color: "#0f172a", bg: "#ffd01d", icon: AlertCircle },
  "Lulus":           { color: "#ffffff", bg: "#1e293b", icon: CheckCircle2 },
};

export default function DosenBimbinganPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMobileTab, setActiveMobileTab] = useState<"daftar" | "detail">("daftar");
  const [search, setSearch] = useState("");
  const [filterTahap, setFilterTahap] = useState<string>("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  // Lock shell & body background scrolling when modal is active
  useEffect(() => {
    if (showPdfModal || showChatModal) {
      const containers = document.querySelectorAll(".shell-body, .viewport-shell, main");
      containers.forEach((el) => {
        (el as HTMLElement).style.overflow = "hidden";
        (el as HTMLElement).style.touchAction = "none";
      });
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        containers.forEach((el) => {
          (el as HTMLElement).style.overflow = "";
          (el as HTMLElement).style.touchAction = "";
        });
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
      };
    }
  }, [showPdfModal, showChatModal]);

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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <UserCheck className="w-3.5 h-3.5" /> Mahasiswa Bimbingan Active
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
              <div className={`lg:col-span-7 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden ${
                activeMobileTab === "daftar" ? "flex" : "hidden lg:flex"
              }`}>
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

                  <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
                    {/* Search Input Box */}
                    <div className="relative flex-1 sm:w-44">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Cari nama / NIM..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] focus:bg-white transition-all font-medium"
                      />
                    </div>

                    {/* Custom Premium Dropdown Filter */}
                    <div className="relative shrink-0">
                      <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 hover:bg-white font-bold text-slate-700 hover:text-slate-900 focus:outline-none focus:border-[#C62828] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs font-display"
                      >
                        <Filter className="w-3 h-3 text-[#C62828]" />
                        <span>{filterTahap === "Semua" ? "Semua Tahap" : filterTahap}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isFilterOpen ? "rotate-180 text-[#C62828]" : ""}`} />
                      </button>

                      {isFilterOpen && (
                        <>
                          {/* Invisible backdrop for click-outside close */}
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setIsFilterOpen(false)}
                          />

                          {/* Floating Animated Dropdown Menu */}
                          <div className="absolute right-0 top-full mt-1.5 w-40 bg-white rounded-xl border border-slate-200/90 shadow-xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                            {[
                              { label: "Semua Tahap", val: "Semua" },
                              { label: "Bimbingan", val: "Bimbingan" },
                              { label: "Seminar", val: "Seminar" },
                              { label: "Sidang", val: "Sidang" },
                            ].map((opt) => {
                              const isSelected = filterTahap === opt.val;
                              return (
                                <button
                                  key={opt.val}
                                  onClick={() => {
                                    setFilterTahap(opt.val);
                                    setIsFilterOpen(false);
                                  }}
                                  className={`w-full text-left px-3.5 py-2 text-xs font-bold font-display flex items-center justify-between transition-colors cursor-pointer ${
                                    isSelected
                                      ? "bg-rose-50 text-[#C62828]"
                                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                  }`}
                                >
                                  <span>{opt.label}</span>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C62828]" />}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
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
                          onClick={() => {
                            setSelectedNim(mhs.nim);
                            setActiveMobileTab("detail");
                          }}
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
                                    className="px-2 py-0.5 rounded-full font-extrabold shadow-2xs font-display"
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
                                      background: sesiPct >= 100 ? "#ffd01d" : "#C62828",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Desktop Quick Action Buttons */}
                              <div className="hidden lg:flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
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
                                    className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-extrabold transition-all flex items-center gap-1 active:scale-95 cursor-pointer shadow-xs font-display ${
                                      isAccGranted
                                        ? "bg-[#ffd01d] hover:bg-[#d97706] text-slate-950"
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

                              {/* Mobile Navigation Indicator Arrow */}
                              <div className="lg:hidden flex items-center shrink-0 text-slate-400 pl-1">
                                <ArrowRight className="w-4 h-4 text-slate-400" />
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
              <div className={`lg:col-span-5 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden ${
                activeMobileTab === "detail" ? "flex" : "hidden lg:flex"
              }`}>
                {/* Header Card Detail */}
                <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Mobile Back Button */}
                    <button
                      onClick={() => setActiveMobileTab("daftar")}
                      className="lg:hidden p-1.5 px-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                      title="Kembali ke Daftar Mahasiswa"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#C62828]" />
                      <span>Kembali</span>
                    </button>

                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-xs sm:text-sm text-slate-900 font-display truncate">Detail Mahasiswa</h2>
                      <p className="text-[10px] text-slate-400 font-medium truncate hidden sm:block">Informasi lengkap &amp; histori log</p>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 shrink-0">
                    {selectedMhs.nim}
                  </span>
                </div>

                {/* Content Area Detail */}
                <div className="flex-1 overflow-y-auto scrollbar-none p-4 sm:p-5 space-y-4">
                  {/* Student Profile Header Box */}
                  <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-rose-50/20 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-md font-display"
                          style={{ background: TAHAP_COLOR[selectedMhs.tahap].bg }}
                        >
                          {selectedMhs.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-black text-slate-900 font-display leading-tight truncate">
                            {selectedMhs.nama}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium truncate">{selectedMhs.prodi}</p>
                          <p className="text-[10.5px] font-mono text-slate-400 font-medium">NIM: {selectedMhs.nim}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-extrabold font-display shadow-2xs"
                          style={{
                            background: STATUS_COLOR[selectedMhs.status]?.bg,
                            color: STATUS_COLOR[selectedMhs.status]?.color,
                          }}
                        >
                          {selectedMhs.status}
                        </span>
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-extrabold font-display shadow-2xs"
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
                      <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-[#ffd01d] text-slate-950 shadow-2xs font-display">
                        {selectedMhs.bidang}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 leading-relaxed font-display">
                      &ldquo;{selectedMhs.judul}&rdquo;
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500">
                      <span>Pembimbing II: <strong className="text-slate-800">{selectedMhs.pembimbing2}</strong></span>
                      <span className="font-black text-[#C62828]">Sesi: {selectedMhs.sesi}/{selectedMhs.minSesi}</span>
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
                            <span
                              className={`text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs font-display ${
                                log.status.includes("ACC") || log.status.includes("Lulus")
                                  ? "bg-[#ffd01d] text-slate-950"
                                  : "bg-[#C62828] text-white"
                              }`}
                            >
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
                            ? "bg-[#ffd01d] hover:bg-[#d97706] text-slate-950 font-extrabold"
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
              <div
                className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 touch-none"
                onClick={() => setShowPdfModal(false)}
              >
                <div
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[85vh] max-h-[700px] animate-in fade-in zoom-in-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="p-3.5 sm:p-4 bg-[#1A1A1A] text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm font-display text-white truncate">Pratinjau Draf Naskah Skripsi</h3>
                        <p className="text-[10px] text-neutral-400 font-mono truncate">Draf_Skripsi_{selectedMhs.nim}.pdf · {selectedMhs.nama}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPdfModal(false)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Document Toolbar */}
                  <div className="px-3 sm:px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-1.5 sm:gap-2 text-xs shrink-0 whitespace-nowrap overflow-x-auto scrollbar-none">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600 font-medium text-[10.5px] sm:text-xs shrink-0">
                      <span className="font-bold text-slate-700">Hal 1/48</span>
                      <span className="text-slate-300">|</span>
                      <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-[#C62828] text-white font-extrabold text-[9.5px] sm:text-[10.5px] font-display shadow-2xs">
                        Status Draf: {selectedMhs.tahap}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        showToast(`Mengunduh Draf_Skripsi_${selectedMhs.nim}.pdf ...`);
                        setShowPdfModal(false);
                      }}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#C62828] hover:bg-[#a81f1f] text-white font-bold text-[10px] sm:text-[11px] flex items-center gap-1 sm:gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
                    >
                      <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span>Unduh PDF</span>
                    </button>
                  </div>

                  {/* PDF Document Body Mockup */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-200/80 flex justify-center scrollbar-thin">
                    <div className="bg-white rounded-xl shadow-lg border border-slate-300/90 p-5 sm:p-8 w-full max-w-lg space-y-4 sm:space-y-6 text-slate-800 font-serif my-auto">
                      <div className="text-center space-y-2 pb-4 border-b border-slate-200">
                        <p className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-slate-500 font-sans">
                          UNIVERSITAS PUTRA INDONESIA YPTK PADANG
                        </p>
                        <h2 className="text-xs sm:text-sm font-bold uppercase leading-relaxed font-sans text-slate-900">
                          {selectedMhs.judul}
                        </h2>
                        <p className="text-[11px] font-sans text-slate-600 pt-1">
                          Oleh: <strong className="text-slate-900">{selectedMhs.nama}</strong> ({selectedMhs.nim})
                        </p>
                      </div>

                      <div className="space-y-2.5 text-[11px] sm:text-xs leading-relaxed text-justify">
                        <p className="font-bold font-sans text-slate-900 text-xs">ABSTRAK</p>
                        <p className="text-slate-700">
                          Penelitian ini bertujuan untuk merancang dan mengimplementasikan sistem informasi yang efisien berbasis web di lingkungan Fakultas Ilmu Komputer UPI YPTK Padang. Metodologi yang digunakan meliputi analisis kebutuhan, perancangan database ERD, implementasi arsitektur modular, dan pengujian blackbox.
                        </p>
                        <p className="text-slate-700">
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
