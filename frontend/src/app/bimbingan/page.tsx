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
  ArrowRight,
  FileText,
  Download,
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
  const [alasanPerubahan, setAlasanPerubahan] = useState("");
  const [perubahanSubmitted, setPerubahanSubmitted] = useState(false);

  const [logList, setLogList] = useState([
    {
      id: 5,
      tanggal: "24 Juli 2026, 14:30 WIB",
      mahasiswaNama: "Danu Zen",
      catatanMahasiswa:
        "Pak, saya telah memperbarui Diagram Sequence dan ERD pada Bab 3 sesuai dengan masukkan pada sesi sebelumnya. Mohon ketersediaan Bapak untuk memeriksa kembali.",
      fileAttachment: "Naskah_Bab3_V2.pdf",
      dosenNama: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc. (Pembimbing I)",
      catatanDosen:
        "Diagram sequence Bab 3 sudah rapi dan sesuai alur. Silakan lanjutkan pengerjaan Bab 4 (Implementasi & Pengujian). Persiapkan draf kasar untuk persiapan ACC Seminar.",
      statusFeedback: "Disetujui Pembimbing",
    },
    {
      id: 4,
      tanggal: "15 Juli 2026, 10:15 WIB",
      mahasiswaNama: "Danu Zen",
      catatanMahasiswa:
        "Draft Bab 3 (Analisis & Perancangan Sistem). Memuat perancangan mockup UI/UX dan alur State Machine Tugas Akhir.",
      fileAttachment: "Naskah_Bab3_Draft1.pdf",
      dosenNama: "Dr. Jasmir, S.Kom., M.Kom. (Pembimbing II)",
      catatanDosen:
        "Mockup UI sudah bagus. Tambahkan penjelasan mengenai penanganan notifikasi WhatsApp gateway di Bab 3.2.",
      statusFeedback: "Revisi Ringan",
    },
  ]);

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
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] rounded-2xl border border-[#333333] p-6 text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#F59E0B] text-[#1A1A1A] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Bimbingan Aktif (5 dari 8 Sesi Terpenuhi)
                  </span>
                  <span className="text-xs font-mono-data text-[#A0A0A0]">
                    Pembimbing: Dr. Eng. H. Sarjon Defit &amp; Dr. Jasmir
                  </span>
                </div>
                <h2 className="text-2xl font-black font-display text-white tracking-wide">
                  Log Bimbingan Skripsi &amp; Pengajuan Perubahan Judul
                </h2>
                <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                  Catat progres konsultasi rutin, ungga berkas draft naskah, dan ajukan perubahan judul jika diperlukan.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setShowLogModal(true)}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> Catat Sesi Bimbingan
                </button>
                <button
                  onClick={() => setShowPerubahanJudulModal(true)}
                  className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#2A2A2A] border border-[#444444] text-white hover:bg-[#333333] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <FileEdit className="w-4 h-4 text-[#A0A0A0]" /> Ajukan Perubahan Judul
                </button>
              </div>
            </div>
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

          {/* Main Content Layout: Log Thread & ACC Requirements (Flush Bottom Aligned) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Column (2 Cols): Interactive Log Thread */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Riwayat Thread Sesi Bimbingan ({logList.length} Sesi Recorded)
                      </h3>
                    </div>
                    <span className="text-xs font-mono-data text-slate-500 font-medium">
                      Minimal 5 Sesi Terpenuhi
                    </span>
                  </div>

                  {/* Thread Messages List */}
                  <div className="space-y-6 mt-4">
                    {logList.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 rounded-xl border border-slate-200/60 bg-slate-50/60 space-y-3"
                      >
                        {/* Log Header */}
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 text-xs">
                          <span className="font-bold text-slate-900 font-display">
                            Sesi Bimbingan #{log.id}
                          </span>
                          <span className="text-[11px] font-mono-data text-slate-500">
                            {log.tanggal}
                          </span>
                        </div>

                        {/* Student Message Bubble */}
                        <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-200/60 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[#C62828]">
                              {log.mahasiswaNama} (Mahasiswa)
                            </p>
                            {log.fileAttachment && (
                              <span className="text-[10px] font-mono-data bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-800 flex items-center gap-1 font-semibold">
                                <Paperclip className="w-3 h-3 text-[#C62828]" /> {log.fileAttachment}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">
                            &quot;{log.catatanMahasiswa}&quot;
                          </p>
                        </div>

                        {/* Lecturer Response Bubble */}
                        <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/80 border-l-4 border-l-amber-500 space-y-1.5 ml-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-amber-900">
                              {log.dosenNama}
                            </p>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                log.statusFeedback === "Disetujui Pembimbing"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : log.statusFeedback === "Menunggu Review"
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : "bg-orange-100 text-orange-800 border border-orange-300"
                              }`}
                            >
                              {log.statusFeedback}
                            </span>
                          </div>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">
                            &quot;{log.catatanDosen}&quot;
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (1 Col): Requirements Checklist, Lecturer Info & Template Downloads */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
              {/* Card 1: Syarat Pengajuan ACC Seminar */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2.5 flex items-center justify-between">
                  <span>Syarat Pengajuan ACC Seminar</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Progress 2/3
                  </span>
                </h3>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Clearing SKS &amp; IPK Akademik</p>
                      <p className="text-[11px] text-slate-500 font-medium">Terpenuhi (144 SKS • IPK 3.65)</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Minimal 5 Sesi Bimbingan Rutin</p>
                      <p className="text-[11px] text-emerald-600 font-bold">Terpenuhi (5 / 5 Sesi Recorded)</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">ACC Klik Dosen Pembimbing</p>
                      <p className="text-[11px] text-amber-600 font-bold">Menunggu Verifikasi Pembimbing I</p>
                    </div>
                  </li>
                </ul>

                <Link
                  href="/seminar"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all text-center block shadow-md shadow-[#C62828]/20"
                >
                  Lihat Status &amp; Jadwal Seminar
                </Link>
              </div>

              {/* Card 2: Dosen Pembimbing & Jam Konsultasi */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                  Dosen Pembimbing &amp; Kontak Bimbingan
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-50 text-[#C62828] rounded-full">
                      Pembimbing Utama (I)
                    </span>
                    <p className="font-bold text-slate-900 mt-1">
                      Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono-data">
                      Jadwal Tatap Muka: Selasa &amp; Kamis (10:00 - 12:00)
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 rounded-full">
                      Pembimbing Pendamping (II)
                    </span>
                    <p className="font-bold text-slate-900 mt-1">
                      Dr. Jasmir, S.Kom., M.Kom.
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono-data">
                      Jadwal Tatap Muka: Rabu &amp; Jumat (13:00 - 15:00)
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Template & Panduan Penulisan Skripsi (Stretches to match bottom baseline) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                    Panduan &amp; Template Naskah TA
                  </h3>

                  <ul className="space-y-2 text-xs mt-3">
                    <li className="p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/60 flex items-center justify-between transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#C62828]" />
                        <span className="font-semibold text-slate-800">Panduan Penulisan Skripsi FIK.pdf</span>
                      </div>
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                    </li>
                    <li className="p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/60 flex items-center justify-between transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#C62828]" />
                        <span className="font-semibold text-slate-800">Template Microsoft Word SKRIPSI_UPI.docx</span>
                      </div>
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
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
                  className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] text-[#212121] focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#212121] mb-1">
                  Unggah Draft Naskah (PDF):
                </label>
                <input
                  type="file"
                  onChange={(e) => setNewLogFile(e.target.files?.[0]?.name || "Naskah_Draft_Progress.pdf")}
                  className="w-full text-xs text-[#616161] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#FF5722] file:text-white hover:file:bg-[#D32F2F]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E0E0E0]">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#E0E0E0] text-[#212121] hover:bg-[#FAFAFA] font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FF5722] text-white hover:bg-[#D32F2F] font-semibold flex items-center gap-1.5"
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
          <div className="bg-white rounded-xl border border-[#E0E0E0] max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3">
              <h3 className="font-bold text-base text-[#1A1A1A] font-display">
                Formulir Pengajuan Perubahan Judul TA
              </h3>
              <button
                onClick={() => setShowPerubahanJudulModal(false)}
                className="p-1 rounded text-[#616161] hover:bg-[#FAFAFA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePerubahanJudulSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#616161] mb-1">
                  Judul Skripsi Saat Ini (Lama):
                </label>
                <p className="p-2.5 bg-[#FAFAFA] rounded-lg border border-[#E0E0E0] text-[#616161] font-medium leading-relaxed">
                  &quot;{judulLama}&quot;
                </p>
              </div>

              <div>
                <label className="block font-semibold text-[#212121] mb-1">
                  Usulan Judul Baru:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan usulan perubahan judul baru..."
                  value={judulBaru}
                  onChange={(e) => setJudulBaru(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] text-[#212121] focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#212121] mb-1">
                  Alasan Perubahan Judul:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan alasan revisi/penyesuaian arah penelitian dari dosen pembimbing..."
                  value={alasanPerubahan}
                  onChange={(e) => setAlasanPerubahan(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] text-[#212121] focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E0E0E0]">
                <button
                  type="button"
                  onClick={() => setShowPerubahanJudulModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#E0E0E0] text-[#212121] hover:bg-[#FAFAFA] font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FF5722] text-white hover:bg-[#D32F2F] font-semibold"
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
