"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown, Building2,
  TrendingUp, TrendingDown, Users, Award, FileText, CheckCircle2, Clock
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Komparasi Prodi",    href: "/dekanat/prodi",       icon: <Building2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

const STATS = [
  { label: "Total Mahasiswa TA",    value: "248", sub: "Semester 2025/2026",      color: "#2563eb", bgIcon: "bg-[#2563eb]",   trend: "+12%", icon: Users },
  { label: "Selesai Tahun Ini",     value: "89",  sub: "s.d. Juli 2026",          color: "#059669", bgIcon: "bg-emerald-600", trend: "+8%",  icon: CheckCircle2 },
  { label: "Rata-rata Durasi Studi",value: "1.8", sub: "Semester (≈ 10 bulan)",   color: "#2563EB", bgIcon: "bg-blue-600",    trend: "-0.2", icon: Clock },
  { label: "Tingkat Kelulusan",     value: "94%", sub: "Semester ini",            color: "#D97706", bgIcon: "bg-amber-500",   trend: "+2%",  icon: Award },
];

const REKAPITULASI = [
  { angkatan: "2019", total: 42, lulus: 40, ipkRata: 3.48, durRata: "1.6 sem" },
  { angkatan: "2020", total: 55, lulus: 51, ipkRata: 3.52, durRata: "1.8 sem" },
  { angkatan: "2021", total: 63, lulus: 58, ipkRata: 3.61, durRata: "1.9 sem" },
  { angkatan: "2022", total: 58, lulus: 48, ipkRata: 3.55, durRata: "2.0 sem" },
  { angkatan: "2023", total: 61, lulus: 30, ipkRata: 3.59, durRata: "—"       },
  { angkatan: "2024", total: 48, lulus: 0,  ipkRata: 0,    durRata: "—"       },
];

const SIDANG_BULAN = [
  { tgl: "1 Agt", nama: "Rafi Andika",       judul: "Implementasi ML untuk Deteksi Spam",          ruang: "Aula FIK",  waktu: "09:00" },
  { tgl: "3 Agt", nama: "Siti Rahayu",       judul: "Optimisasi Routing Jaringan Komputer",        ruang: "Aula FIK",  waktu: "10:00" },
  { tgl: "5 Agt", nama: "Budi Prasetyo",     judul: "Aplikasi Mobile Absensi Mahasiswa",           ruang: "Aula FIK",  waktu: "13:00" },
  { tgl: "8 Agt", nama: "Anisa Permatasari", judul: "Klasifikasi Citra Daun dengan CNN",           ruang: "Ruang 302", waktu: "09:00" },
  { tgl: "10 Agt",nama: "Teguh Santoso",     judul: "Sistem Monitoring Energi Listrik IoT",        ruang: "Aula FIK",  waktu: "14:00" },
];

const BIDANG = [
  { label: "Rekayasa Perangkat Lunak", pct: 42, color: "#2563eb" },
  { label: "Kecerdasan Buatan",         pct: 31, color: "#059669" },
  { label: "Jaringan & Keamanan",       pct: 27, color: "#2563EB" },
];

function DonutChart() {
  const r = 56; const cx = 70; const cy = 70;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const slices = BIDANG.map((b) => {
    const len = (b.pct / 100) * circ;
    const s = { ...b, dashOffset: circ - len, startOffset: offset };
    offset += len;
    return s;
  });
  return (
    <svg viewBox="0 0 140 140" className="w-28 h-28 sm:w-32 sm:h-32 shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth="20" />
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth="20"
          strokeDasharray={`${(s.pct / 100) * circ} ${circ}`}
          strokeDashoffset={circ - s.startOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" className="font-black" fontSize="18" fontWeight="900" fill="#0f172a">248</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#94a3b8">Mahasiswa</text>
    </svg>
  );
}

export default function DekanatDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileTab, setMobileTab] = useState<"rekap" | "bidang" | "sidang">("rekap");

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Unified Standard Sidebar */}
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
          
          {/* Unified Standard Header */}
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
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-[11px] font-bold bg-[#2563eb] text-white font-display shadow-xs">
                      <Award className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" /> Pimpinan / Dekanat FIK
                    </span>
                  </div>
                  <h1 className="text-lg md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Dashboard Eksekutif — FIK PT MBOIS
                  </h1>
                  <p className="text-[11px] md:text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Ringkasan performa Tugas Akhir Fakultas Ilmu Komputer semester 2025/2026 Genap. Tingkat kelulusan bulan ini: <strong className="text-emerald-400 font-bold">94%</strong>.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/laporan"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-white" />
                    <span>Laporan Eksekutif</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#2563eb]" />
            </div>

            {/* ── 2. 4 Stat Cards (Statistik TA Design System - 2 Cols on Mobile) ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white p-3 md:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between space-x-2 md:space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-0.5 md:space-y-1 min-w-0 flex-1">
                      <p className="text-[10px] md:text-[11px] font-bold text-slate-500 font-display leading-tight truncate">{s.label}</p>
                      <p className="text-xl sm:text-3xl font-black font-display tracking-tight" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[9.5px] md:text-[10px] text-slate-400 font-semibold truncate">{s.sub}</p>
                    </div>
                    <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                      <IconComp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Mobile Section Navigation Pills (Equal Width Segmented Control) ── */}
            <div className="bg-slate-100/90 border border-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1 shrink-0 lg:hidden font-display">
              {[
                { id: "rekap", label: "Rekap Angkatan", icon: Users },
                { id: "bidang", label: "Bidang Kajian", icon: BarChart2 },
                { id: "sidang", label: "Jadwal Sidang", icon: CalendarDays },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = mobileTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setMobileTab(tab.id as any)}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold font-display whitespace-nowrap transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                      isActive
                        ? "bg-white text-[#2563eb] shadow-xs font-extrabold"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isActive ? "text-[#2563eb]" : "text-slate-500"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ── 3. Grid Content Section ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 flex-1 min-h-0 items-stretch">
              
              {/* Rekap Kelulusan Table (2/3 Width on Desktop) */}
              <div className={`lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col justify-between ${
                mobileTab === "rekap" ? "block" : "hidden lg:flex"
              }`}>
                <div className="flex items-center gap-2.5 p-3 md:p-3.5 border-b border-slate-100 shrink-0 bg-white">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                    <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Rekapitulasi Kelulusan per Angkatan</h2>
                    <p className="text-[9.5px] md:text-[10px] text-slate-400 font-medium truncate">Evaluasi Rata-rata IPK &amp; Durasi Studi</p>
                  </div>
                </div>

                <div className="overflow-x-auto overflow-y-auto w-full touch-pan-x flex-1 min-h-0 scrollbar-thin">
                  <table className="w-full text-xs min-w-[650px] md:min-w-[750px] border-collapse">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["Angkatan", "Total TA", "Lulus", "Tingkat Lulus", "Rata-rata IPK", "Rata-rata Durasi"].map((h) => (
                          <th key={h} className="px-3.5 py-2.5 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {REKAPITULASI.map((row) => {
                        const pct = row.total > 0 ? Math.round((row.lulus / row.total) * 100) : 0;
                        return (
                          <tr key={row.angkatan} className="hover:bg-slate-50 transition-colors">
                            <td className="px-3.5 py-2.5 font-black text-slate-900 font-display whitespace-nowrap">{row.angkatan}</td>
                            <td className="px-3.5 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{row.total}</td>
                            <td className="px-3.5 py-2.5 font-bold text-emerald-700 whitespace-nowrap">{row.lulus > 0 ? row.lulus : "—"}</td>
                            <td className="px-3.5 py-2.5 whitespace-nowrap">
                              {row.lulus > 0 ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-20 md:w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                                  </div>
                                  <span className="font-bold text-emerald-700 text-[10.5px] font-mono">{pct}%</span>
                                </div>
                              ) : (
                                <span className="text-slate-400 font-medium text-[10px]">Dalam proses</span>
                              )}
                            </td>
                            <td className="px-3.5 py-2.5 font-semibold text-slate-700 whitespace-nowrap font-mono">{row.ipkRata > 0 ? row.ipkRata.toFixed(2) : "—"}</td>
                            <td className="px-3.5 py-2.5 text-slate-600 font-mono whitespace-nowrap">{row.durRata}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column (1/3 Width on Desktop): Donut Chart & Sidang Bulan Ini */}
              <div className="flex flex-col justify-between space-y-3.5 min-h-0 flex-1">
                
                {/* Donut Chart Widget */}
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-3.5 md:p-4 space-y-3 shrink-0 ${
                  mobileTab === "bidang" ? "block" : "hidden lg:block"
                }`}>
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <BarChart2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-bold text-xs text-slate-900 font-display truncate">Distribusi Bidang Kajian</h2>
                      <p className="text-[9.5px] text-slate-400 font-medium truncate">Persentase Topik Penelitian Mahasiswa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-2">
                    <DonutChart />
                    <div className="space-y-2 flex-1 min-w-0">
                      {BIDANG.map((b) => (
                        <div key={b.label} className="space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-[10px] md:text-[10.5px] font-semibold text-slate-700 truncate">{b.label}</p>
                            <span className="text-[10px] md:text-[10.5px] font-black font-mono shrink-0" style={{ color: b.color }}>{b.pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${b.pct}%`, background: b.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidang Bulan Ini Stream */}
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col justify-between ${
                  mobileTab === "sidang" ? "block" : "hidden lg:flex"
                }`}>
                  <div className="flex items-center gap-2 p-3 md:p-3.5 border-b border-slate-100 shrink-0 bg-white">
                    <div className="w-7 h-7 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <CalendarDays className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-bold text-xs text-slate-900 font-display truncate">Sidang Bulan Ini</h2>
                      <p className="text-[9.5px] text-slate-400 font-medium truncate">Jadwal Ujian Sidang Terjadwal</p>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100 overflow-y-auto flex-1 scrollbar-none max-h-60 lg:max-h-none">
                    {SIDANG_BULAN.map((s) => (
                      <div key={s.nama} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-50 transition-colors">
                        <div className="w-9 text-center shrink-0">
                          <p className="text-[8.5px] text-slate-400 uppercase font-bold">{s.tgl.split(" ")[1]}</p>
                          <p className="text-sm md:text-base font-black text-[#2563eb] leading-tight font-display">{s.tgl.split(" ")[0]}</p>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate font-display">{s.nama}</p>
                          <p className="text-[10px] text-slate-500 truncate font-medium">&ldquo;{s.judul}&rdquo;</p>
                          <p className="text-[9px] text-slate-400 font-mono">{s.waktu} WIB · {s.ruang}</p>
                        </div>
                      </div>
                    ))}
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
