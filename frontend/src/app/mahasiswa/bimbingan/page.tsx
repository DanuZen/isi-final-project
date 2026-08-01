"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  BookOpen,
  PlusCircle,
  FileEdit,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  X,
  FileText,
  Download,
  UserCheck,
} from "lucide-react";

export default function BimbinganPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showPerubahanJudulModal, setShowPerubahanJudulModal] = useState(false);

  const [newLogCatatan, setNewLogCatatan] = useState("");
  const [newLogFile, setNewLogFile] = useState<string | null>(null);

  const [judulLama] = useState(
    "Rancang Bangun Sistem Informasi Perjalanan & Evaluasi Tugas Akhir (SIPETA) Berbasis Web di UPI YPTK Padang"
  );
  const [judulBaru, setJudulBaru] = useState("");
  const [activeMobileTab, setActiveMobileTab] = useState<"thread" | "syarat">("thread");
  const [alasanPerubahan, setAlasanPerubahan] = useState("");
  const [perubahanSubmitted, setPerubahanSubmitted] = useState(false);

  const [logList, setLogList] = useState<{
    id: number;
    tanggal: string;
    mahasiswaNama: string;
    catatanMahasiswa: string;
    fileAttachment: string;
    dosenNama: string;
    catatanDosen: string;
    statusFeedback: string;
  }[]>([]); // Kosong — belum ada sesi bimbingan

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogCatatan.trim()) return;

    const newEntry = {
      id: logList.length + 1,
      tanggal: "Hari ini, " + new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      mahasiswaNama: "Danu Zen",
      catatanMahasiswa: newLogCatatan,
      fileAttachment: newLogFile || "Naskah_Progress_Terbaru.pdf",
      dosenNama: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc. (Pembimbing I)",
      catatanDosen: "Menunggu Peninjauan Dosen Pembimbing...",
      statusFeedback: "Menunggu Review",
    };

    setLogList([newEntry, ...logList]);
    setNewLogCatatan("");
    setNewLogFile(null);
    setShowLogModal(false);
  };

  const handlePerubahanJudulSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judulBaru.trim() || !alasanPerubahan.trim()) return;
    setPerubahanSubmitted(true);
    setShowPerubahanJudulModal(false);
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-5 overflow-hidden shell-body flex flex-col min-h-0">
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                {/* Left: greeting + status */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs font-display">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Pembimbing Terverifikasi
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Bimbingan &amp; Konsultasi TA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Catatan histori komunikasi bimbingan rutin, draf progres naskah Bab, serta pengajuan perubahan judul Tugas Akhir.
                  </p>
                </div>

                {/* Right: quick action buttons */}
                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <button
                    onClick={() => setShowLogModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white border border-red-500/30 shadow-md shadow-red-950/40 transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Catat Sesi Bimbingan</span>
                  </button>
                  <button
                    onClick={() => setShowPerubahanJudulModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#ffd01d] hover:bg-[#d97706] text-slate-950 border border-amber-400/40 shadow-md shadow-amber-950/20 transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
                  >
                    <FileEdit className="w-4 h-4 text-slate-950" />
                    <span>Ajukan Perubahan Judul</span>
                  </button>
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Perubahan Judul Status Card (If Submitted) */}
            {perubahanSubmitted && (
              <div className="bg-[#FFF8E1] rounded-xl border border-[#FFC107]/60 p-4 shadow-xs flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#B78103] shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-[#1A1A1A]">
                      Pengajuan Perubahan Judul Sedang Dalam Proses Approval
                    </p>
                    <p className="text-[#616161] font-medium">
                      <strong>Judul Baru:</strong> &quot;{judulBaru}&quot;
                    </p>
                    <p className="text-[11px] text-[#616161]">
                      <strong>Alasan:</strong> {alasanPerubahan}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-[#FFC107] text-[#1A1A1A] rounded-full shrink-0">
                  Menunggu Approval Dosen &amp; Prodi
                </span>
              </div>
            )}

            {/* ── Sleek Mobile Segmented Control Tab Switcher (<1024px) ── */}
            <div className="lg:hidden flex p-1 bg-slate-200/80 rounded-xl shrink-0 gap-1 font-display border border-slate-300/60 shadow-2xs overflow-x-auto scrollbar-none whitespace-nowrap">
              <button
                onClick={() => setActiveMobileTab("thread")}
                className={`flex-1 min-w-[130px] py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                  activeMobileTab === "thread"
                    ? "bg-white text-[#C62828] shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Thread Bimbingan</span>
              </button>

              <button
                onClick={() => setActiveMobileTab("syarat")}
                className={`flex-1 min-w-[130px] py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                  activeMobileTab === "syarat"
                    ? "bg-white text-[#C62828] shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Syarat ACC Sempro</span>
              </button>
            </div>

            {/* Main Content Layout: Log Thread & ACC Requirements (Flush Bottom Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0 lg:overflow-hidden">
              {/* Left Column (8/12): Interactive Log Thread */}
              <div className={`lg:col-span-8 flex-col justify-between space-y-4 h-auto lg:h-full min-h-0 overflow-visible lg:overflow-hidden ${activeMobileTab === "thread" ? "flex" : "hidden lg:flex"}`}>
                <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex-1 flex flex-col justify-between min-h-0 overflow-visible lg:overflow-hidden">
                  <div className="flex flex-col h-full min-h-0 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 gap-2 shrink-0">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 font-display">
                          Riwayat Thread Sesi Bimbingan
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs font-display">
                          {logList.length} / 5 Sesi Recorded
                        </span>

                        {logList.length > 0 && (
                          <button
                            onClick={() => setShowLogModal(true)}
                            className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#C62828] text-white hover:bg-[#a81f1f] transition-all cursor-pointer font-display shrink-0"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Tambah</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Thread Messages List (Internally Scrollable) */}
                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none pr-1 space-y-4">
                      {logList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-3">
                          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C62828] shadow-xs">
                            <MessageSquare className="w-7 h-7 text-[#C62828]" />
                          </div>
                          <div className="space-y-1 max-w-sm">
                            <h4 className="font-bold text-sm text-slate-900 font-display">Belum Ada Catatan Bimbingan</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                              Anda belum memiliki histori sesi bimbingan. Klik tombol <strong className="text-[#C62828]">&ldquo;Catat Sesi Bimbingan&rdquo;</strong> di atas untuk mencatat konsultasi dengan Dosen Pembimbing.
                            </p>
                          </div>
                          <button
                            onClick={() => setShowLogModal(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#a81f1f] transition-all active:scale-95 shadow-xs font-display cursor-pointer mt-1"
                          >
                            <PlusCircle className="w-4 h-4" />
                            <span>Catat Sesi Bimbingan Pertama</span>
                          </button>
                        </div>
                      ) : (
                        logList.map((log) => (
                          <div
                            key={log.id}
                            className="p-4.5 rounded-2xl border border-slate-200/90 bg-slate-50/70 space-y-3.5 shadow-xs"
                          >
                            {/* Log Header */}
                            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 text-xs">
                              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white shadow-xs font-display">
                                Sesi Bimbingan #{log.id}
                              </span>
                              <span className="text-[11px] font-medium text-slate-500">
                                {log.tanggal}
                              </span>
                            </div>

                            {/* Student Message Bubble */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-xs">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-[#C62828] border border-rose-200">
                                  {log.mahasiswaNama} (Mahasiswa)
                                </span>
                                {log.fileAttachment && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition-colors shadow-xs">
                                    <Paperclip className="w-3.5 h-3.5 text-[#C62828]" />
                                    <span>{log.fileAttachment}</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-800 leading-relaxed font-medium pl-3 border-l-2 border-l-[#C62828]">
                                &ldquo;{log.catatanMahasiswa}&rdquo;
                              </p>
                            </div>

                            {/* Lecturer Response Bubble */}
                            <div className="bg-white p-4 rounded-xl border border-amber-200 border-l-4 border-l-[#ffd01d] space-y-2 ml-3 shadow-xs">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                                  {log.dosenNama}
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white shadow-xs ${
                                    log.statusFeedback === "Disetujui Pembimbing"
                                      ? "bg-emerald-600"
                                      : log.statusFeedback === "Menunggu Review"
                                      ? "bg-[#ffd01d]"
                                      : "bg-[#D97706]"
                                  }`}
                                >
                                  {log.statusFeedback}
                                </span>
                              </div>
                              <p className="text-xs text-slate-800 leading-relaxed font-medium pl-3 border-l-2 border-l-[#ffd01d]">
                                &ldquo;{log.catatanDosen}&rdquo;
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (4/12): Requirements Checklist & Info */}
              <div className={`lg:col-span-4 flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden ${activeMobileTab === "syarat" ? "flex" : "hidden lg:flex"}`}>
                {/* Card 1: Syarat Pengajuan ACC Seminar (shrink-0) */}
                {/* Card 1: Syarat Pengajuan ACC Seminar */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 shrink-0">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Syarat Pengajuan ACC Seminar
                      </h3>
                    </div>
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D97706] text-white shadow-xs font-display">
                      Progress 2/3
                    </span>
                  </div>

                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800">Clearing SKS &amp; IPK Akademik</p>
                        <p className="text-[10px] text-slate-500 font-medium">Terpenuhi (144 SKS • IPK 3.65)</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800">Minimal 5 Sesi Bimbingan Rutin</p>
                        <p className="text-[10px] text-emerald-600 font-bold">Terpenuhi (5 / 5 Sesi Recorded)</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-2 text-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800">ACC Klik Dosen Pembimbing</p>
                        <p className="text-[10px] text-amber-600 font-bold">Menunggu Verifikasi Pembimbing I</p>
                      </div>
                    </li>
                  </ul>

                  <Link
                    href="/mahasiswa/seminar"
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all text-center block shadow-xs active:scale-95"
                  >
                    Lihat Status &amp; Jadwal Seminar
                  </Link>
                </div>

                {/* Card 2: Dosen Pembimbing & Jam Konsultasi (shrink-0) */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2.5 shrink-0">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Dosen Pembimbing &amp; Kontak Bimbingan
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-0.5">
                      <span className="px-2.5 py-0.5 text-[9px] font-extrabold bg-[#C62828] text-white rounded-full">
                        Pembimbing Utama (I)
                      </span>
                      <p className="font-bold text-slate-900 mt-1 truncate">
                        Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono-data">
                        Selasa &amp; Kamis (10:00 - 12:00)
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-0.5">
                      <span className="px-2.5 py-0.5 text-[9px] font-extrabold bg-[#D97706] text-white rounded-full">
                        Pembimbing Pendamping (II)
                      </span>
                      <p className="font-bold text-slate-900 mt-1 truncate">
                        Dr. Jasmir, S.Kom., M.Kom.
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono-data">
                        Rabu &amp; Jumat (13:00 - 15:00)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Template & Panduan (Stretches to match bottom baseline) */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2.5 flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
                  <div>
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Panduan &amp; Template Naskah TA
                      </h3>
                    </div>

                    <ul className="space-y-2 text-xs mt-2.5">
                      <li className="p-2 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/60 flex items-center justify-between transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-[#C62828] shrink-0" />
                          <span className="font-semibold text-slate-800 text-[11px] truncate">Panduan Skripsi UPI YPTK.pdf</span>
                        </div>
                        <Download className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </li>
                      <li className="p-2 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/60 flex items-center justify-between transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-[#C62828] shrink-0" />
                          <span className="font-semibold text-slate-800 text-[11px] truncate">Template_Skripsi_UPI.docx</span>
                        </div>
                        <Download className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal Catat Log Bimbingan */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E0E0E0] max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3">
              <h3 className="font-bold text-base text-[#1A1A1A] font-display">
                Catat Sesi Bimbingan Baru
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="p-1 rounded text-[#616161] hover:bg-[#FAFAFA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#212121] mb-1">
                  Catatan Kemajuan / Pertanyaan Bimbingan:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Jelaskan progres naskah Bab yang telah diperbarui atau bagian yang membutuhkan konsultasi..."
                  value={newLogCatatan}
                  onChange={(e) => setNewLogCatatan(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:bg-white focus:border-[#C62828] transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Unggah Draft Naskah (PDF):
                </label>
                <input
                  type="file"
                  onChange={(e) => setNewLogFile(e.target.files?.[0]?.name || "Naskah_Draft_Progress.pdf")}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#C62828] file:text-white hover:file:bg-[#B71C1C] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C62828] text-white hover:bg-[#B71C1C] font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" /> Kirim Log Bimbingan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Pengajuan Perubahan Judul */}
      {showPerubahanJudulModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-display">
                Formulir Pengajuan Perubahan Judul TA
              </h3>
              <button
                onClick={() => setShowPerubahanJudulModal(false)}
                className="p-1 rounded text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePerubahanJudulSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Judul Skripsi Saat Ini (Lama):
                </label>
                <p className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium leading-relaxed">
                  &quot;{judulLama}&quot;
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Usulan Judul Baru:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan usulan perubahan judul baru..."
                  value={judulBaru}
                  onChange={(e) => setJudulBaru(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:bg-white focus:border-[#C62828] transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Alasan Perubahan Judul:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan alasan revisi/penyesuaian arah penelitian dari dosen pembimbing..."
                  value={alasanPerubahan}
                  onChange={(e) => setAlasanPerubahan(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:bg-white focus:border-[#C62828] transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPerubahanJudulModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C62828] text-white hover:bg-[#B71C1C] font-bold shadow-xs"
                >
                  Kirim Pengajuan Perubahan Judul
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
