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
  { label: "Seminar Proposal",        count: 42, color: "#7C3AED", pct: 17, desc: "Presentasi kelayakan riset" },
  { label: "Ujian Sidang Skripsi",    count: 35, color: "#C62828", pct: 14, desc: "Ujian komprehensif 4 Penguji" },
  { label: "Lulus & Terverifikasi",  count: 28, color: "#059669", pct: 11, desc: "Bebas Fakultas & wisuda" },
];

const PRODI_PERFORMANCE = [
  { prodi: "Teknik Informatika", total: 124, ipk: 3.60, tepatWaktu: "85%", status: "Unggul (A)" },
  { prodi: "Sistem Informasi",   total: 88,  ipk: 3.52, tepatWaktu: "80%", status: "Sangat Baik (B+)" },
  { prodi: "Sistem Komputer",    total: 36,  ipk: 3.48, tepatWaktu: "78%", status: "Sangat Baik (B+)" },
];

const TOP_DOSEN = [
  { nama: "Dr. Sarjon Defit, S.Kom., M.Sc.", bimbingan: 12, prodi: "Teknik Informatika" },
  { nama: "Prof. Budi Santoso, Ph.D.",        bimbingan: 10, prodi: "Sistem Informasi" },
  { nama: "Dr. Ahmad Fauzi, M.T.",            bimbingan: 9,  prodi: "Teknik Informatika" },
];

export default function DekanatStatistikPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <Header className="shell-header shrink-0" userName="Prof. Dr. H. Zulherman, M.T." userNim="NIP: 196508201990031001" userRole="Dekan FIK" prodiName="Fakultas Ilmu Komputer" />

          {/* Natural Scrolling Main Container */}
          <main className="flex-1 p-5 md:p-6 space-y-5 shell-body pb-16">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <BarChart2 className="w-3.5 h-3.5 text-white" /> Analitik Eksekutif Fakultas
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Statistik &amp; Analisis Kinerja Tugas Akhir
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Metrik komprehensif perkembangan studi, rata-rata IPK kelulusan, tingkat kelulusan tepat waktu, dan produktivitas bimbingan FIK.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/laporan"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <FileDown className="w-4 h-4 text-white" />
                    <span>Unduh Analisis Laporan PDF</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* 4 Top Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {METRICS.map((m) => {
                const IconComp = m.icon;
                return (
                  <div key={m.label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-500 font-display leading-tight">{m.label}</p>
                      <p className="text-2xl sm:text-3xl font-black font-display" style={{ color: m.color }}>{m.value}</p>
                      <p className="text-[10px] text-slate-400 font-semibold truncate">{m.sub}</p>
                    </div>
                    <div className={`w-11 h-11 rounded-xl ${m.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                      <IconComp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Content Grid (Natural Scroll Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Left Column (2/3): Stage Progress & Prodi Comparison Table */}
              <div className="lg:col-span-2 space-y-5">
                
                {/* 1. Stage Progress Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <BarChart2 className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Distribusi Mahasiswa Menurut Tahap TA</h2>
                    </div>
                    <span className="text-[10.5px] font-bold px-3 py-1 rounded-full bg-rose-50 text-[#C62828] border border-rose-200 font-display">
                      Total: 248 Mahasiswa
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {TAHAP_TA.map((item) => (
                      <div key={item.label} className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                            <span className="font-bold text-slate-900 font-display text-xs sm:text-sm">{item.label}</span>
                            <span className="text-[10.5px] text-slate-400 font-medium hidden sm:inline">— {item.desc}</span>
                          </div>
                          <span className="font-bold font-mono text-slate-900 text-xs">{item.count} Mhs <span className="text-[10.5px] font-sans text-slate-500">({item.pct}%)</span></span>
                        </div>
                        <div className="w-full bg-slate-200/60 h-2.5 rounded-full overflow-hidden">
                          <div className="h-2.5 rounded-full transition-all duration-500" style={{ width: `${item.pct}%`, background: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Program Studi Performance Comparison Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Komparasi Performa per Program Studi</h2>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          {["Program Studi", "Total Mahasiswa TA", "Rata-Rata IPK", "Kelulusan Tepat Waktu", "Akreditasi / Predikat"].map((h) => (
                            <th key={h} className="px-6 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {PRODI_PERFORMANCE.map((p) => (
                          <tr key={p.prodi} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-900 font-display text-sm">{p.prodi}</td>
                            <td className="px-6 py-4 font-bold text-slate-700 font-mono text-xs">{p.total} Mhs</td>
                            <td className="px-6 py-4 font-bold text-emerald-700 font-mono text-xs">{p.ipk.toFixed(2)}</td>
                            <td className="px-6 py-4 font-bold text-slate-800 font-mono text-xs">{p.tepatWaktu}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 rounded-full text-[10.5px] font-bold bg-rose-50 text-[#C62828] border border-rose-200 font-display">
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Right Column (1/3): Side Detail & Top Supervisors Panel */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between p-6 space-y-5">
                <div className="space-y-4">
                  
                  {/* KPI Target Header */}
                  <div className="pb-3 border-b border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                        <Target className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h3 className="text-sm font-black text-slate-900 font-display">Target KPI Yudisium FIK</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      Pencapaian kelulusan tepat waktu FIK mencapai <strong className="text-emerald-700 font-bold">92% dari target universitas</strong>.
                    </p>
                  </div>

                  {/* Top Supervisor List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider font-display">Pembimbing Terproduktif:</span>
                      <span className="text-[10px] font-bold text-[#C62828] font-display">Top 3 FIK</span>
                    </div>

                    <div className="space-y-2.5">
                      {TOP_DOSEN.map((d, idx) => (
                        <div key={d.nama} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-6 h-6 rounded-full bg-[#C62828] text-white text-[11px] font-bold flex items-center justify-center shrink-0 font-display shadow-2xs">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 text-xs truncate font-display">{d.nama}</p>
                              <p className="text-[10px] text-slate-400 truncate font-medium">{d.prodi}</p>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white whitespace-nowrap font-display shadow-2xs">
                            {d.bimbingan} Lulus
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Executive Insights Box */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs font-display">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Rekomendasi Dekanat:</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      Pertahankan tren kelulusan tepat waktu &gt;80% dengan percepatan SK Dekan digital dan penjaminan mutu bimbingan.
                    </p>
                  </div>

                </div>

                <div className="pt-4 border-t border-slate-100">
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
