"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  Download, FileText, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

const LAPORAN_LIST = [
  { id: "LAP-2026-01", nama: "Laporan Rekapitulasi Kelulusan TA Semester Genap 2025/2026.pdf", periode: "Semester Genap 2025/2026", tgl: "28 Jul 2026", ukuran: "3.4 MB" },
  { id: "LAP-2026-02", nama: "Laporan Beban Kinerja Bimbingan Dosen FIK 2025/2026.pdf", periode: "Semester Genap 2025/2026", tgl: "25 Jul 2026", ukuran: "1.9 MB" },
  { id: "LAP-2025-04", nama: "Laporan Evaluasi Rata-Rata Masalah Studi Mahasiswa TA 2025.pdf", periode: "Tahun Akademik 2024/2025", tgl: "15 Des 2025", ukuran: "4.1 MB" },
];

export default function DekanatLaporanPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Prof. Dr. H. Zulherman, M.T." userNim="NIP: 196508201990031001" userRole="Dekan FIK" prodiName="Fakultas Ilmu Komputer" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <FileDown className="w-3.5 h-3.5 text-white" /> Unduh Dokumen Eksekutif
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Laporan Eksekutif &amp; Rekapitulasi Yudisium
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pusat unduhan laporan PDF berkala kelulusan mahasiswa, rekapitulasi nilai, serta evaluasi beban bimbingan dosen.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Dashboard Dekan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Grid Laporan */}
            <div className="grid grid-cols-1 gap-3 flex-1 min-h-0">
              {LAPORAN_LIST.map((lap) => (
                <div key={lap.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-sm font-black text-slate-900 font-display truncate" title={lap.nama}>{lap.nama}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold text-[10px]">{lap.periode}</span>
                        <span>{lap.ukuran}</span>
                        <span>• Dibuat pada {lap.tgl}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-2 shrink-0 shadow-xs active:scale-95">
                    <Download className="w-4 h-4" /> Unduh Laporan PDF
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
