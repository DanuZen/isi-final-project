"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, CalendarDays, Star, FileEdit,
  CheckCircle2, Clock, Send, AlertCircle, ArrowRight, ShieldCheck, Award,
  Sparkles, X
} from "lucide-react";

const NAV = [
  { label: "Dashboard Penguji", href: "/penguji/dashboard", icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Jadwal Pengujian",  href: "/penguji/jadwal",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Input Nilai",       href: "/penguji/nilai",     icon: <Award className="w-4 h-4" /> },
  { label: "Lembar Revisi",     href: "/penguji/revisi",    icon: <FileEdit className="w-4 h-4" /> },
];

const REVISI_LIST = [
  {
    nim: "20101152630045", nama: "Danu Zen",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web Berbasis Real-Time Data",
    jenis: "Seminar", tglUjian: "1 Agt 2026", deadline: "8 Agt 2026",
    catatan: "Perbaiki diagram use case pada Bab III — hubungan antara aktor Gudang dan sistem belum tepat. Tambahkan penjelasan lebih detail pada algoritma FIFO.",
    status: "Belum Diserahkan",
    revisiMasuk: null,
  },
  {
    nim: "20101152630067", nama: "Anisa Permatasari",
    judul: "Klasifikasi Citra Daun Menggunakan Convolutional Neural Network (CNN)",
    jenis: "Seminar", tglUjian: "10 Agt 2026", deadline: "17 Agt 2026",
    catatan: "Dataset training perlu diperbesar. Sertakan confusion matrix untuk setiap kelas dan jelaskan alasan pemilihan arsitektur CNN yang digunakan.",
    status: "Menunggu Review",
    revisiMasuk: "Diserahkan 12 Agt 2026",
  },
];

export default function PengujiRevisiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [catatanBaru, setCatatanBaru] = useState<Record<string, string>>({});
  const [approved, setApproved] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Dosen Penguji" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ahmad Fauzi, M.T." userNim="NIDN: 1012345678" userRole="Dosen Penguji" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0 relative">

            {/* Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
                <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
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
                      <FileEdit className="w-3.5 h-3.5 text-white" /> Monitoring Lembar Revisi Ujian Active
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Catatan Revisi &amp; Verifikasi Perbaikan
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pantau tenggat waktu perbaikan naskah mahasiswa pasca seminar/sidang serta verifikasi dokumen naskah revisi terbaru.
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
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Cards List Container */}
            <div className="space-y-4 flex-1 min-h-0 overflow-y-auto scrollbar-none">
              {REVISI_LIST.map((r) => {
                const isApproved = approved[r.nim];
                return (
                  <div key={r.nim} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="h-1" style={{ background: r.status === "Belum Diserahkan" ? "#b45309" : "#2563EB" }} />
                    <div className="p-5 space-y-4">

                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <h3 className="text-base font-black text-slate-900 font-display">{r.nama}</h3>
                          <p className="text-xs font-mono text-slate-400 mt-0.5">{r.nim}</p>
                          <p className="text-xs text-slate-600 font-medium mt-1">&ldquo;{r.judul}&rdquo;</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10.5px] font-bold font-display shadow-2xs ${r.status === "Belum Diserahkan" ? "bg-[#F59E0B] text-slate-950" : "bg-blue-600 text-white"}`}>
                            {r.status === "Belum Diserahkan" ? <Clock className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                            {r.status}
                          </span>
                          <p className="text-[10px] text-slate-500 font-medium">Batas Revisi: <strong className="text-red-600 font-bold">{r.deadline}</strong></p>
                          {r.revisiMasuk && <p className="text-[10px] text-emerald-600 font-bold font-display">{r.revisiMasuk}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Catatan Catatan Revisi Penguji</p>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <p className="text-xs text-slate-800 font-medium leading-relaxed">{r.catatan}</p>
                        </div>
                      </div>

                      {r.revisiMasuk && !isApproved && (
                        <div className="space-y-2.5 pt-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Status Upload Revisi Mahasiswa</p>
                          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3 flex-wrap">
                            <p className="text-xs text-blue-900 font-bold font-display">Mahasiswa telah mengunggah naskah revisi final.</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAccRevisi(r.nim, r.nama)}
                                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 active:scale-95 shadow-2xs font-display cursor-pointer"
                              >
                                <CheckCircle2 className="w-4 h-4 text-white" /> ACC Revisi
                              </button>
                              <button
                                onClick={() => showToast(`Permintaan perbaikan ulang dikirim ke ${r.nama}`)}
                                className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 font-display cursor-pointer"
                              >
                                Minta Perbaikan Lagi
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {isApproved && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-600 text-white shadow-2xs font-display">
                          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                          <p className="text-xs font-bold text-white">Revisi telah disetujui sepenuhnya oleh Majelis Penguji.</p>
                        </div>
                      )}

                      {!isApproved && (
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Tambah Catatan Tambahan</p>
                          <div className="flex gap-2">
                            <textarea
                              rows={2}
                              placeholder="Ketik catatan revisi tambahan jika ada..."
                              value={catatanBaru[r.nim] ?? ""}
                              onChange={(e) => setCatatanBaru((prev) => ({ ...prev, [r.nim]: e.target.value }))}
                              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 font-medium resize-none focus:outline-none focus:border-[#C62828] focus:bg-white transition-all shadow-2xs"
                            />
                            <button
                              onClick={() => handleSendNote(r.nim, r.nama)}
                              className="px-4 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-xs shrink-0 font-display cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5 text-white" /> Kirim
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
