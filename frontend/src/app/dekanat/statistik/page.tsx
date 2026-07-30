"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  TrendingUp, BookOpen, Award, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

export default function DekanatStatistikPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Dekan FIK" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Prof. Dr. H. Zulherman, M.T." userNim="NIP: 196508201990031001" userRole="Dekan FIK" prodiName="FIK UPI YPTK" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-600 text-white shadow-xs">
                      <BarChart2 className="w-3.5 h-3.5" /> Analitik Studi Executive
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Statistik &amp; Analisis Kinerja Tugas Akhir
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Metrik komprehensif perkembangan studi, rata-rata IPK kelulusan, tingkat kelulusan tepat waktu, dan publikasi jurnal.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/laporan"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Laporan Eksekutif PDF</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 font-display">Rata-Rata IPK Kelulusan</p>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-3xl font-black text-slate-900 font-display">3.58 <span className="text-xs text-emerald-600 font-bold">(+0.04)</span></p>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "89.5%" }} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 font-display">Tepat Waktu (≤ 8 Sem)</p>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-3xl font-black text-slate-900 font-display">82.4% <span className="text-xs text-emerald-600 font-bold">(+3.1%)</span></p>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "82.4%" }} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 font-display">Publikasi Jurnal / Prosiding</p>
                  <BookOpen className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-3xl font-black text-slate-900 font-display">45 Artikel</p>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>

            {/* Progress Bar Tahap */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex-1 min-h-0">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Distribusi Mahasiswa Menurut Tahap TA</h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Usulan Judul", count: 45, color: "#b45309", pct: 18 },
                  { label: "Proses Bimbingan", count: 98, color: "#1d4ed8", pct: 40 },
                  { label: "Seminar Proposal", count: 42, color: "#2563EB", pct: 17 },
                  { label: "Ujian Sidang", count: 35, color: "#C62828", pct: 14 },
                  { label: "Lulus / Selesai", count: 28, color: "#059669", pct: 11 },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 font-display">{item.label}</span>
                      <span className="font-bold text-slate-900">{item.count} Mahasiswa ({item.pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="h-2.5 rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
