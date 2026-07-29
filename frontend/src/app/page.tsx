"use client";

import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TaStepper } from "@/components/ui/ta-stepper";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  UserCheck,
  PlusCircle,
  FileEdit,
  CalendarDays,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top Header */}
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} className="shell-header shrink-0" />

          {/* Page Body */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto overflow-x-hidden scrollbar-none shell-body">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] rounded-2xl border border-[#333333] p-6 text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#2F8F5B] text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Akun Terverifikasi Akademik
                  </span>
                  <span className="text-xs font-mono-data text-[#A0A0A0]">
                    SKS: 144 / 144 • IPK: 3.65
                  </span>
                </div>
                <h2 className="text-2xl font-black font-display text-white tracking-wide">
                  Selamat Datang, Danu Zen 👋
                </h2>
                <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                  Progres Tugas Akhir Anda saat ini berada pada tahap{" "}
                  <strong className="text-[#F59E0B]">Bimbingan Aktif</strong> dengan Dosen Pembimbing Utama &amp; Pendamping.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  href="/bimbingan"
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-2 active:scale-95"
                >
                  <PlusCircle className="w-4 h-4" /> Catat Log Bimbingan
                </Link>
                <Link
                  href="/bimbingan"
                  className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#2A2A2A] border border-[#444444] text-white hover:bg-[#333333] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <FileEdit className="w-4 h-4 text-[#A0A0A0]" /> Ajukan Perubahan Judul
                </Link>
              </div>
            </div>
          </div>

          {/* Stepper Perjalanan TA (Signature Component) */}
          <TaStepper />

          {/* Grid Layout: Active Title Card & Quick Stats (Flush Bottom Aligned) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Column (2 Cols): Active Judul TA & Log Thread */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              {/* Active Judul Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#C62828]/10 text-[#C62828] flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Judul Tugas Akhir Disetujui
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Status: Disetujui Prodi
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-slate-900 leading-snug font-display">
                    &quot;Rancang Bangun Sistem Informasi Perjalanan &amp; Evaluasi Tugas Akhir (SIPETA) Berbasis Web di UPI YPTK Padang&quot;
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                    <strong className="text-slate-800">Abstrak Singkat:</strong> Penelitian ini bertujuan untuk mengoptimalkan proses pemantauan tugas akhir mahasiswa secara visual, terintegrasi notifikasi WhatsApp, serta meningkatkan transparansi alur bimbingan hingga yudisium.
                  </p>
                </div>

                {/* Metadata & Pembimbing Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 space-y-1">
                    <p className="text-[10px] font-bold text-[#C62828] uppercase tracking-wider font-display">
                      Pembimbing Utama (I)
                    </p>
                    <p className="text-xs font-bold text-slate-900">
                      Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.
                    </p>
                    <p className="text-[11px] font-mono-data text-slate-500 font-medium">
                      NIDN: 1012057301 • Kuota Terisi: 6/8
                    </p>
                  </div>

                  <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 space-y-1">
                    <p className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider font-display">
                      Pembimbing Pendamping (II)
                    </p>
                    <p className="text-xs font-bold text-slate-900">
                      Dr. Jasmir, S.Kom., M.Kom.
                    </p>
                    <p className="text-[11px] font-mono-data text-slate-500 font-medium">
                      NIDN: 1024088002 • Kuota Terisi: 5/8
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Link Card to Kalender TA */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C62828] flex items-center justify-center font-bold shrink-0">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-display">
                      Kalender TA &amp; Sidang Skripsi Interaktif
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Lihat jadwal lengkap Bimbingan Rutin, Seminar Proposal, dan Ujian Sidang Skripsi FIK.
                    </p>
                  </div>
                </div>

                <Link
                  href="/kalender"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-[#C62828] transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  Buka Kalender TA <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column (1 Col): Status Cards & Info Requirements */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
              {/* Syarat ACC Seminar Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                  Syarat Kelayakan ACC Seminar
                </h3>

                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Clearing SKS &amp; IPK</p>
                      <p className="text-[11px] text-slate-500 font-medium">Terpenuhi (144 SKS • IPK 3.65)</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Minimal 5 Sesi Bimbingan</p>
                      <p className="text-[11px] text-emerald-600 font-bold">Terpenuhi (5 / 5 Sesi Recorded)</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs opacity-75">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Persetujuan (ACC) Pembimbing</p>
                      <p className="text-[11px] text-amber-600 font-bold">Menunggu Klik ACC Dosen</p>
                    </div>
                  </li>
                </ul>

                <button
                  disabled
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed text-center"
                >
                  Ajukan ACC Seminar (Terkunci)
                </button>
              </div>

              {/* Quick Info Contact Card (Stretches to match bottom baseline) */}
              <div className="bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] text-white rounded-2xl p-5 shadow-lg space-y-3 border-t-4 border-t-[#F59E0B] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#F59E0B]" />
                    <h4 className="font-bold text-sm font-display text-white">
                      Admin Prodi Teknik Informatika
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2 font-medium">
                    Perlu bantuan seputar kuota dosen atau jadwal ruang sidang? Silakan hubungi Sekretariat Prodi Informatika UPI YPTK.
                  </p>
                </div>
                <div className="pt-2 text-xs font-mono-data text-[#F59E0B] font-bold border-t border-white/10 flex items-center justify-between">
                  <span>WA Center Prodi:</span>
                  <span>+62 812-6789-0101</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}
