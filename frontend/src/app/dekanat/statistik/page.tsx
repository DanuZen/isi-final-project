"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  TrendingUp, BookOpen, Award, ArrowRight, Sparkles, Building2, Target
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Komparasi Prodi",    href: "/dekanat/prodi",       icon: <Building2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

const METRICS = [
  { label: "Rata-Rata IPK Kelulusan", value: "3.58", sub: "+0.04 vs Semester Lalu", color: "#D97706", bgIcon: "bg-amber-500", icon: Award },
  { label: "Tepat Waktu (≤ 8 Sem)",   value: "82.4%",sub: "+3.1% Kenaikan Efisiensi",color: "#059669", bgIcon: "bg-emerald-600",icon: TrendingUp },
  { label: "Publikasi Jurnal / Scopus",value:"45 Artikel",sub: "Karya Mahasiswa & Dosen",color: "#2563EB", bgIcon: "bg-blue-600", icon: BookOpen },
  { label: "Predikat Cumlaude",        value: "64 Mhs",  sub: "72% Lulusan Cumlaude",  color: "#C62828", bgIcon: "bg-[#C62828]",  icon: Sparkles },
];

const TAHAP_TA = [
  { label: "Usulan Judul & Topik",    count: 45, color: "#D97706", pct: 18, desc: "Review komisi etik & prodi" },
  { label: "Proses Bimbingan SK",     count: 98, color: "#2563EB", pct: 40, desc: "Penyusunan Bab 1 s.d. 5" },
  { label: "Seminar Proposal",        count: 42, color: "#0D9488", pct: 17, desc: "Presentasi kelayakan riset" },
  { label: "Ujian Sidang Skripsi",    count: 35, color: "#C62828", pct: 14, desc: "Ujian komprehensif 4 Penguji" },
  { label: "Lulus & Terverifikasi",  count: 28, color: "#059669", pct: 11, desc: "Bebas Fakultas & wisuda" },
];

const TOP_DOSEN = [
  { nama: "Dr. Sarjon Defit, S.Kom., M.Sc.", bimbingan: 12, prodi: "Teknik Informatika" },
  { nama: "Prof. Budi Santoso, Ph.D.",        bimbingan: 10, prodi: "Sistem Informasi" },
  { nama: "Dr. Ahmad Fauzi, M.T.",            bimbingan: 9,  prodi: "Teknik Informatika" },
];

export default function DekanatStatistikPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          items={NAV}
          userName="Prof. Dr. H. Zulherman, M.T."
          userNim="NIP: 196508201990031001"
          roleName="Dekan FIK"
          prodiName="Fakultas Ilmu Komputer"
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header
            className="shell-header shrink-0"
            userName="Prof. Dr. H. Zulherman, M.T."
            userNim="NIP: 196508201990031001"
            userRole="Dekan FIK"
            prodiName="Fakultas Ilmu Komputer"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <main className="flex-1 px-3 py-3 md:p-5 pt-16 md:pt-5 space-y-3 md:space-y-4 overflow-y-auto lg:overflow-hidden shell-body flex flex-col min-h-0 justify-between">
            
            {/* ── 1. Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 md:gap-5 p-4 md:p-6 relative">
                <div className="space-y-1 md:space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5 md:mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <BarChart2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" /> Eksekutif Statistik FIK Active
                    </span>
                  </div>
                  <h1 className="text-lg md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Statistik &amp; Analisis Kinerja Tugas Akhir
                  </h1>
                  <p className="text-[11px] md:text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Metrik komprehensif perkembangan studi, rata-rata IPK kelulusan, tingkat kelulusan tepat waktu, dan produktivitas bimbingan FIK.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/laporan"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-white" />
                    <span>Unduh Analisis Laporan PDF</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── 2. 4 Top Overview Cards (2 Cols on Mobile) ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4 shrink-0">
              {METRICS.map((m) => {
                const IconComp = m.icon;
                return (
                  <div key={m.label} className="bg-white p-3 md:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between space-x-2 md:space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-0.5 md:space-y-1 min-w-0 flex-1">
                      <p className="text-[10px] md:text-[11px] font-bold text-slate-500 font-display leading-tight truncate">{m.label}</p>
                      <p className="text-xl sm:text-3xl font-black font-display tracking-tight" style={{ color: m.color }}>{m.value}</p>
                      <p className="text-[9.5px] md:text-[10px] text-slate-400 font-semibold truncate">{m.sub}</p>
                    </div>
                    <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl ${m.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                      <IconComp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── 3. Split 2-Column Grid (Fit To Layout 7/12 & 5/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1 min-h-0 items-stretch">
              
              {/* Left Column (7/12): Stage Progress Card */}
              <div className="lg:col-span-7 bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-xs flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <BarChart2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Distribusi Mahasiswa Menurut Tahap TA</h2>
                      <p className="text-[10px] text-slate-400 font-medium truncate">Persentase &amp; Progres Pengerjaan Tugas Akhir Mahasiswa FIK</p>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-bold px-3 py-1 rounded-full bg-[#C62828] text-white font-display shadow-xs shrink-0">
                    Total: 248 Mahasiswa
                  </span>
                </div>

                <div className="space-y-3.5 pt-3.5 pb-2 overflow-y-auto flex-1 scrollbar-thin">
                  {TAHAP_TA.map((item) => (
                    <div key={item.label} className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                          <span className="font-bold text-slate-900 font-display text-xs truncate">{item.label}</span>
                          <span className="text-[10.5px] text-slate-400 font-medium hidden sm:inline truncate">— {item.desc}</span>
                        </div>
                        <span className="font-bold font-mono text-slate-900 text-xs shrink-0 ml-2">{item.count} Mhs <span className="text-[10.5px] font-sans text-slate-500">({item.pct}%)</span></span>
                      </div>
                      <div className="w-full bg-slate-200/60 h-2.5 rounded-full overflow-hidden">
                        <div className="h-2.5 rounded-full transition-all duration-500" style={{ width: `${item.pct}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}

                  {/* Stage Insights Summary Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200/70 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-blue-950 font-display">Tahap Paling Aktif</span>
                      <span className="font-extrabold font-mono text-blue-700">Proses Bimbingan (40%)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-950 font-display">Tingkat Kelulusan</span>
                      <span className="font-extrabold font-mono text-emerald-700">11% (28 Mhs)</span>
                    </div>
                  </div>
                </div>

                {/* Footer Link to Komparasi Prodi */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
                  <span className="text-[11px] text-slate-500 font-medium">Lihat evaluasi perbandingan antar prodi?</span>
                  <Link
                    href="/dekanat/prodi"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C62828] hover:underline font-display"
                  >
                    <span>Komparasi Performa Prodi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column (5/12): KPI & Top Supervisor Card */}
              <div className="lg:col-span-5 bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-xs flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                <div className="space-y-3.5 overflow-y-auto scrollbar-thin">
                  
                  {/* KPI Target Header */}
                  <div className="pb-3 border-b border-slate-100 space-y-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs md:text-sm font-bold text-slate-900 font-display truncate">Target KPI Yudisium FIK</h3>
                        <p className="text-[10px] text-slate-400 font-medium truncate">Pencapaian &amp; Performa Dosen Pembimbing</p>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/80">
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        Pencapaian kelulusan tepat waktu FIK mencapai <strong className="text-[#C62828] font-bold">92% dari target universitas</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Top Supervisor List */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700 font-display flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#C62828]" />
                        <span>Dosen Pembimbing Terproduktif</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#C62828] border border-rose-200 font-display">Top 3 FIK</span>
                    </div>

                    <div className="space-y-2">
                      {TOP_DOSEN.map((d, idx) => (
                        <div key={d.nama} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-[#C62828] text-white text-[10px] font-bold flex items-center justify-center shrink-0 font-display shadow-2xs">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 text-xs truncate font-display">{d.nama}</p>
                              <p className="text-[9.5px] text-slate-400 truncate font-medium">{d.prodi}</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-600 text-white whitespace-nowrap font-display shadow-2xs shrink-0">
                            {d.bimbingan} Lulus
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Executive Insights Box */}
                  <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1 shadow-sm">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs font-display">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Rekomendasi Dekanat:</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                      Pertahankan tren kelulusan tepat waktu &gt;80% dengan percepatan SK Dekan digital dan penjaminan mutu bimbingan.
                    </p>
                  </div>

                </div>

                <div className="pt-3 border-t border-slate-100 shrink-0 mt-2">
                  <button
                    onClick={() => alert("Mengunduh berkas Laporan Analitik Eksekutif Fakultas PDF...")}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-white" />
                    <span>Unduh Laporan Analitik PDF</span>
                  </button>
                </div>
              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
