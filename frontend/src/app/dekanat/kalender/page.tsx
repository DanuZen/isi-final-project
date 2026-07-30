"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  MapPin, Clock, Calendar as CalendarIcon, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

const KALENDER_SIDANG = [
  { tgl: "1 Agt 2026", waktu: "09:00 WIB", mhs: "Rafi Andika", prodi: "Teknik Informatika", jenis: "Ujian Sidang", ruang: "Aula FIK Lt. 2", ketua: "Dr. Ahmad Fauzi, M.T." },
  { tgl: "3 Agt 2026", waktu: "10:00 WIB", mhs: "Siti Rahayu", prodi: "Teknik Informatika", jenis: "Seminar Proposal", ruang: "Ruang 302", ketua: "Prof. Budi Santoso, Ph.D" },
  { tgl: "5 Agt 2026", waktu: "13:00 WIB", mhs: "Budi Prasetyo", prodi: "Sistem Informasi", jenis: "Ujian Sidang", ruang: "Aula FIK Lt. 2", ketua: "Dr. Sarjon Defit" },
  { tgl: "8 Agt 2026", waktu: "09:00 WIB", mhs: "Anisa Permatasari", prodi: "Teknik Informatika", jenis: "Seminar Proposal", ruang: "Ruang 302", ketua: "Dr. Ahmad Fauzi, M.T." },
  { tgl: "10 Agt 2026", waktu: "14:00 WIB", mhs: "Teguh Santoso", prodi: "Teknik Informatika", jenis: "Ujian Sidang", ruang: "Aula FIK Lt. 2", ketua: "Dr. Hendra Saputra, M.T." },
];

export default function DekanatKalenderPage() {
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
                      <CalendarDays className="w-3.5 h-3.5 text-white" /> Kalender Sidang Read-Only
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Agenda &amp; Jadwal Sidang Fakultas
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pemantauan eksekutif pimpinan terhadap kelancaran jadwal pelaksanaan seminar &amp; ujian sidang skripsi di lingkungan FIK.
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

            {/* Main List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-sm text-slate-900 font-display">Jadwal Sidang &amp; Seminar (Agustus 2026)</h2>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Read-Only Executive Mode
                </span>
              </div>

              <div className="divide-y divide-slate-100 overflow-y-auto flex-1 scrollbar-none">
                {KALENDER_SIDANG.map((item, idx) => (
                  <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.jenis === "Ujian Sidang" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-blue-50 text-blue-700 border border-blue-200"}`}>
                          {item.jenis}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{item.prodi}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 font-display">{item.mhs}</h3>
                      <p className="text-xs text-slate-500">Ketua Penguji: <strong>{item.ketua}</strong></p>
                    </div>

                    <div className="flex flex-col md:items-end gap-1 shrink-0 text-xs text-slate-700 font-bold">
                      <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-[#C62828]" /> {item.tgl}</span>
                      <span className="flex items-center gap-1 text-slate-500 font-medium"><Clock className="w-3.5 h-3.5" /> {item.waktu}</span>
                      <span className="flex items-center gap-1 text-rose-600"><MapPin className="w-3.5 h-3.5" /> {item.ruang}</span>
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
