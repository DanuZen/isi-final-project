"use client";

import React, { useState } from "react";
import { Sidebar, DOSEN_NAV_ITEMS } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, CalendarDays, Star, FileEdit,
  CheckCircle2, Clock, Send, AlertCircle, ArrowRight, ShieldCheck, Award,
  Sparkles, X, Search, Filter, FileText, Download, Eye
} from "lucide-react";

interface RevisiItem {
  nim: string;
  nama: string;
  prodi: string;
  judul: string;
  jenis: "Seminar" | "Sidang";
  tglUjian: string;
  deadline: string;
  catatan: string;
  status: "Menunggu Review" | "Belum Diserahkan" | "ACC";
  revisiMasuk: string | null;
  filePdf: string | null;
}

const REVISI_LIST: RevisiItem[] = [
  {
    nim: "20101152630067", nama: "Anisa Permatasari", prodi: "Teknik Informatika",
    judul: "Klasifikasi Citra Daun Menggunakan Convolutional Neural Network (CNN)",
    jenis: "Seminar", tglUjian: "10 Agt 2026", deadline: "17 Agt 2026",
    catatan: "1. Dataset training perlu diperbesar minimal 500 sampel per kelas.\n2. Sertakan confusion matrix untuk setiap kelas pada Bab IV.\n3. Jelaskan alasan pemilihan arsitektur CNN yang digunakan.",
    status: "Menunggu Review",
    revisiMasuk: "Diserahkan 12 Agt 2026",
    filePdf: "Naskah_Revisi_Final_Anisa_Permatasari.pdf",
  },
  {
    nim: "20101152630045", nama: "Danu Zen", prodi: "Teknik Informatika",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web Berbasis Real-Time Data",
    jenis: "Seminar", tglUjian: "1 Agt 2026", deadline: "8 Agt 2026",
    catatan: "1. Perbaiki diagram use case pada Bab III — hubungan antara aktor Gudang dan sistem belum tepat.\n2. Tambahkan penjelasan lebih detail pada algoritma FIFO.",
    status: "Belum Diserahkan",
    revisiMasuk: null,
    filePdf: null,
  },
  {
    nim: "20101152630133", nama: "Fajar Nugroho", prodi: "Sistem Informasi",
    judul: "Analisis Sentimen Review Produk Marketplace Online Menggunakan Naive Bayes",
    jenis: "Sidang", tglUjian: "12 Agt 2026", deadline: "19 Agt 2026",
    catatan: "1. Perbaiki tata tulis pustaka sesuai standar IEEE.\n2. Lampirkan hasil uji fungsionalitas blackbox di lampiran Naskah.",
    status: "ACC",
    revisiMasuk: "Diserahkan 14 Agt 2026",
    filePdf: "Naskah_Revisi_ACC_Fajar_Nugroho.pdf",
  },
];

export default function PengujiRevisiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedNim, setSelectedNim] = useState<string>("20101152630067");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [catatanBaru, setCatatanBaru] = useState<Record<string, string>>({});
  const [approved, setApproved] = useState<Record<string, boolean>>({
    "20101152630133": true,
  });
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedR = REVISI_LIST.find((r) => r.nim === selectedNim) || REVISI_LIST[0];

  const filteredList = REVISI_LIST.filter((r) => {
    const matchSearch = r.nama.toLowerCase().includes(search.toLowerCase()) || r.nim.includes(search);
    const matchFilter = filterStatus === "Semua" || r.status === filterStatus || (filterStatus === "ACC" && approved[r.nim]);
    return matchSearch && matchFilter;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAccRevisi = (nim: string, nama: string) => {
    setApproved((prev) => ({ ...prev, [nim]: true }));
    showToast(`Naskah revisi ${nama} berhasil DI-ACC dan disetujui!`);
  };

  const handleSendNote = (nim: string, nama: string) => {
    if (!catatanBaru[nim]?.trim()) return;
    showToast(`Catatan tambahan untuk ${nama} berhasil DIKIRIM!`);
    setCatatanBaru((prev) => ({ ...prev, [nim]: "" }));
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV_ITEMS} roleName="Dosen" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ahmad Fauzi, M.T." userNim="NIDN: 1012345678" userRole="Dosen Penguji" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0 relative">

            {/* Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
                <Sparkles className="w-4 h-4 text-[#ffd01d] shrink-0" />
                <p className="text-xs font-bold font-display">{toastMessage}</p>
                <button onClick={() => setToastMessage(null)} className="ml-2 text-neutral-400 hover:text-white cursor-pointer">
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
                      <FileEdit className="w-3.5 h-3.5 text-white" /> Monitoring Lembar Revisi Active
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Catatan Revisi &amp; Verifikasi Perbaikan Naskah
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Verifikasi dokumen naskah perbaikan mahasiswa pasca seminar proposal atau ujian sidang skripsi.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/penguji/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Dashboard Penguji</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── Split 2-Column Layout (5/12 & 7/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
              
              {/* ── LEFT COLUMN (5/12): Student Revision List Card Container ── */}
              <div className="lg:col-span-5 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden">
                {/* Header + Search + Filter */}
                <div className="p-4 border-b border-slate-100 space-y-3 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <FileEdit className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Mahasiswa Revisi</h2>
                        <p className="text-[10px] text-slate-400 font-medium">Klik mahasiswa untuk verifikasi perbaikan</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text" placeholder="Cari nama / NIM..."
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-[11px] bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-medium"
                      />
                    </div>
                    <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl shrink-0">
                      {["Semua", "Menunggu Review", "Belum Diserahkan"].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilterStatus(f)}
                          className="px-2 py-0.5 rounded-lg text-[9.5px] font-bold transition-all cursor-pointer font-display"
                          style={filterStatus === f ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                        >
                          {f === "Menunggu Review" ? "Review" : f === "Belum Diserahkan" ? "Pending" : f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scrollable Revision List */}
                <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2.5">
                  {filteredList.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 space-y-2">
                      <FileEdit className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="text-xs font-bold text-slate-700 font-display">Tidak ada berkas revisi ditemukan</p>
                    </div>
                  ) : (
                    filteredList.map((r) => {
                      const isSelected = selectedR && selectedR.nim === r.nim;
                      const isApproved = approved[r.nim];

                      return (
                        <div
                          key={r.nim}
                          onClick={() => setSelectedNim(r.nim)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                            isSelected
                              ? "bg-rose-50/40 border-[#C62828] shadow-xs ring-1 ring-[#C62828]/20"
                              : "bg-slate-50/50 border-slate-200/80 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C62828] to-[#991B1B] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs font-display">
                                {r.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-black text-slate-900 font-display truncate">{r.nama}</p>
                                <p className="text-[10px] text-slate-500 font-mono font-medium">{r.nim}</p>
                              </div>
                            </div>

                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold shadow-2xs font-display text-white shrink-0 ${
                              isApproved
                                ? "bg-emerald-600"
                                : r.status === "Menunggu Review"
                                ? "bg-blue-600"
                                : "bg-[#ffd01d] text-slate-950"
                            }`}>
                              {isApproved ? "ACC / Selesai" : r.status}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-600 font-medium truncate">&ldquo;{r.judul}&rdquo;</p>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px]">
                            <span className="text-slate-400 font-medium">Deadline: <strong className="text-red-600 font-bold">{r.deadline}</strong></span>
                            {r.revisiMasuk && <span className="font-bold text-emerald-600 font-display">{r.revisiMasuk}</span>}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* ── RIGHT COLUMN (7/12): Revision Verification Panel Card Container ── */}
              <div className="lg:col-span-7 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden">
                {/* Card Header Detail */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <FileEdit className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Detail Revisi &amp; Verifikasi Naskah</h2>
                      <p className="text-[10px] text-slate-400 font-medium">Tinjau naskah perbaikan dan berikan keputusan ACC</p>
                    </div>
                  </div>

                  {selectedR && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-white font-mono shadow-2xs">
                      {selectedR.nim}
                    </span>
                  )}
                </div>

                {/* Content Area Detail */}
                {selectedR ? (
                  <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-4">
                    {/* Student Info Box */}
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-rose-50/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold shadow-2xs font-display text-white ${
                          selectedR.jenis === "Sidang" ? "bg-[#C62828]" : "bg-blue-600"
                        }`}>
                          {selectedR.jenis} Tugas Akhir
                        </span>
                        <span className="text-xs font-bold text-slate-700 font-display">Tgl Ujian: {selectedR.tglUjian}</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 font-display leading-tight">{selectedR.nama}</h3>
                      <p className="text-xs text-slate-500 font-medium">{selectedR.prodi} · NIM: <span className="font-mono">{selectedR.nim}</span></p>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed font-display pt-1 border-t border-slate-200/60">
                        &ldquo;{selectedR.judul}&rdquo;
                      </p>
                    </div>

                    {/* Catatan Revisi Penguji Box */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Poin Catatan Revisi Penguji</span>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs text-slate-800 font-medium leading-relaxed">
                        {selectedR.catatan.split("\n").map((line, idx) => (
                          <p key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#C62828] font-bold">•</span> {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Status Naskah PDF Upload Box */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Berkas Naskah Revisi Terunggah</span>
                      
                      {selectedR.filePdf ? (
                        <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between gap-3 flex-wrap shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900 font-display">{selectedR.filePdf}</p>
                              <p className="text-[10.5px] text-blue-700 font-medium">{selectedR.revisiMasuk}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => setShowPdfModal(true)}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer font-display active:scale-95"
                          >
                            <Eye className="w-3.5 h-3.5 text-white" /> Pratinjau PDF
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-900 font-medium">
                          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                          <p>Mahasiswa belum mengunggah naskah perbaikan revisi. Batas waktu revisi: <strong>{selectedR.deadline}</strong></p>
                        </div>
                      )}
                    </div>

                    {/* Tambah Catatan Tambahan Box */}
                    {!approved[selectedR.nim] && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Tambah Catatan Revisi Tambahan</span>
                        <div className="flex gap-2">
                          <textarea
                            rows={2}
                            placeholder="Ketik catatan perbaikan tambahan untuk mahasiswa jika ada..."
                            value={catatanBaru[selectedR.nim] ?? ""}
                            onChange={(e) => setCatatanBaru((prev) => ({ ...prev, [selectedR.nim]: e.target.value }))}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 font-medium resize-none focus:outline-none focus:border-[#C62828] focus:bg-white transition-all shadow-2xs"
                          />
                          <button
                            onClick={() => handleSendNote(selectedR.nim, selectedR.nama)}
                            className="px-4 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-xs shrink-0 font-display cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5 text-white" /> Kirim
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
                    <FileEdit className="w-8 h-8 text-slate-300" />
                    <p className="text-xs font-bold text-slate-700 font-display">Pilih mahasiswa untuk melihat detail revisi</p>
                  </div>
                )}

                {/* Bottom Action Panel */}
                {selectedR && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/80 shrink-0 space-y-2">
                    {approved[selectedR.nim] ? (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-600 text-white shadow-2xs font-display">
                        <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                        <p className="text-xs font-bold text-white">Naskah Revisi Mahasiswa Telah DI-ACC &amp; Disetujui Sepenuhnya!</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => handleAccRevisi(selectedR.nim, selectedR.nama)}
                          disabled={!selectedR.filePdf}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 font-display active:scale-95 shadow-xs ${
                            selectedR.filePdf
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                              : "bg-slate-200 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-white" /> ACC Revisi Naskah
                        </button>

                        <button
                          onClick={() => showToast(`Permintaan perbaikan ulang dikirim ke ${selectedR.nama}`)}
                          className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-[#C62828] transition-all flex items-center justify-center gap-2 font-display active:scale-95 shadow-2xs cursor-pointer"
                        >
                          <X className="w-4 h-4" /> Minta Perbaikan Ulang
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>

            {/* ── PDF Preview Modal Mockup ── */}
            {showPdfModal && selectedR && selectedR.filePdf && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col h-[85vh] animate-in fade-in zoom-in-95">
                  {/* Modal Header */}
                  <div className="p-4 bg-[#1A1A1A] text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm font-display text-white">{selectedR.filePdf}</h3>
                        <p className="text-[10px] text-neutral-400 font-mono">Pratinjau Dokumen Naskah Revisi — {selectedR.nama} ({selectedR.nim})</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPdfModal(false)}
                      className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Toolbar */}
                  <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
                    <span className="text-slate-600 font-bold font-display">Halaman 1 dari 45 (Naskah Perbaikan Final)</span>
                    <button
                      onClick={() => {
                        showToast(`Mengunduh berkas ${selectedR.filePdf}...`);
                        setShowPdfModal(false);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#C62828] hover:bg-[#a81f1f] text-white font-bold text-[11px] flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Naskah PDF
                    </button>
                  </div>

                  {/* Document Sheet Mockup */}
                  <div className="flex-1 overflow-y-auto p-6 bg-slate-200/80 flex justify-center">
                    <div className="bg-white rounded-lg shadow-md border border-slate-300 p-8 w-full max-w-xl space-y-6 text-slate-900 font-serif">
                      <div className="text-center space-y-2 pb-4 border-b-2 border-slate-900">
                        <h2 className="text-sm font-black uppercase tracking-wider font-sans text-slate-900">
                          {selectedR.judul}
                        </h2>
                        <p className="text-xs font-bold font-sans text-[#C62828]">
                          NASKAH HASIL REVISI {selectedR.jenis.toUpperCase()} TUGAS AKHIR
                        </p>
                        <p className="text-[11px] font-mono text-slate-600 font-sans">
                          Oleh: {selectedR.nama} ({selectedR.nim})
                        </p>
                      </div>

                      <div className="space-y-3 text-xs leading-relaxed text-slate-800 font-sans">
                        <p className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">MATRIKS PERBAIKAN REVISI PENGUJI:</p>
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 font-mono text-[11px]">
                          <p><strong>Catatan 1:</strong> Perluasan dataset training menjadi 500 sampel per kelas.</p>
                          <p className="text-emerald-700 font-bold">➔ Tanggapan Penulis: Dataset telah ditambahkan pada Bab IV Halaman 42.</p>
                          <p className="pt-1 border-t border-slate-200"><strong>Catatan 2:</strong> Tambahkan Confusion Matrix pada Bab IV.</p>
                          <p className="text-emerald-700 font-bold">➔ Tanggapan Penulis: Tabel Confusion Matrix telah dilampirkan di Halaman 48.</p>
                        </div>
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
