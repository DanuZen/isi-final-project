"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  TrendingUp, TrendingDown, Users, Award, FileText, CheckCircle2, Clock
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

const STATS = [
  { label: "Total Mahasiswa TA",    value: "248", sub: "Semester 2025/2026",      color: "#D97706", bgIcon: "bg-amber-500",   trend: "+12%", icon: Users },
  { label: "Selesai Tahun Ini",     value: "89",  sub: "s.d. Juli 2026",          color: "#D97706", bgIcon: "bg-amber-500",   trend: "+8%",  icon: CheckCircle2 },
  { label: "Rata-rata Durasi Studi",value: "1.8", sub: "Semester (≈ 10 bulan)",   color: "#D97706", bgIcon: "bg-amber-500",   trend: "-0.2", icon: Clock },
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
  { label: "Rekayasa Perangkat Lunak", pct: 42, color: "#C62828" },
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
    <svg viewBox="0 0 140 140" className="w-32 h-32">
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

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Unified Standard Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Unified Standard Header */}
          <Header
            className="shell-header shrink-0"
            userName="Prof. Dr. H. Zulherman, M.T."
            userNim="NIP: 196508201990031001"
            userRole="Dekan FIK"
            prodiName="Fakultas Ilmu Komputer"
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">
            
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <Award className="w-3.5 h-3.5 text-white" /> Pimpinan / Dekanat FIK
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Dashboard Eksekutif — FIK UPI YPTK
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Ringkasan performa Tugas Akhir Fakultas Ilmu Komputer semester 2025/2026 Genap. Tingkat kelulusan bulan ini: <strong className="text-emerald-400 font-bold">94%</strong>.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display cursor-pointer">
                    <FileDown className="w-4 h-4 text-white" />
                    <span>Unduh Laporan PDF</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── 4 Stat Cards (SOLID ICON BOX WITH WHITE ICON) ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center justify-between space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-500 font-display leading-tight">{s.label}</p>
                      <p className="text-2xl sm:text-3xl font-black font-display" style={{ color: s.color }}>{s.value}</p>
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[10px] text-slate-400 font-semibold truncate">{s.sub}</p>
                        <span className={`text-[9.5px] font-bold flex items-center gap-0.5 ${s.trend.startsWith("+") ? "text-emerald-600" : "text-[#C62828]"}`}>
                          {s.trend.startsWith("+") ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                          {s.trend}
                        </span>
                      </div>
                    </div>
                    {/* SOLID COLOR ICON BOX WITH WHITE ICON */}
                    <div className={`w-11 h-11 rounded-xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                      <IconComp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Grid Content Section (Fit to Viewport Layout) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-hidden">
              
              {/* Rekap Kelulusan Table (2/3) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100 shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="font-bold text-sm text-slate-900 font-display">Rekapitulasi Kelulusan per Angkatan</h2>
                </div>

                <div className="overflow-y-auto flex-1 scrollbar-none pb-10">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["Angkatan", "Total TA", "Lulus", "Tingkat Lulus", "Rata-rata IPK", "Rata-rata Durasi"].map((h) => (
                          <th key={h} className="px-5 py-3 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {REKAPITULASI.map((row) => {
                        const pct = row.total > 0 ? Math.round((row.lulus / row.total) * 100) : 0;
                        return (
                          <tr key={row.angkatan} className="hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-3 font-black text-slate-900 font-display">{row.angkatan}</td>
                            <td className="px-5 py-3 font-semibold text-slate-700">{row.total}</td>
                            <td className="px-5 py-3 font-bold text-emerald-700">{row.lulus > 0 ? row.lulus : "—"}</td>
                            <td className="px-5 py-3">
                              {row.lulus > 0 ? (
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 max-w-[80px]">
                                    <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                                  </div>
                                  <span className="font-bold text-emerald-700 text-[10.5px]">{pct}%</span>
                                </div>
                              ) : (
                                <span className="text-slate-400 font-medium">Dalam proses</span>
                              )}
                            </td>
                            <td className="px-5 py-3 font-semibold text-slate-700">{row.ipkRata > 0 ? row.ipkRata.toFixed(2) : "—"}</td>
                            <td className="px-5 py-3 text-slate-600">{row.durRata}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column (1/3) */}
              <div className="space-y-4 flex flex-col min-h-0">
                
                {/* Donut Chart */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 shrink-0 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <BarChart2 className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Distribusi Bidang Kajian</h2>
                  </div>
                  <div className="flex items-center gap-5">
                    <DonutChart />
                    <div className="space-y-2.5 flex-1">
                      {BIDANG.map((b) => (
                        <div key={b.label} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-[10.5px] font-semibold text-slate-700 leading-tight">{b.label}</p>
                            <span className="text-[10.5px] font-black" style={{ color: b.color }}>{b.pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-100">
                            <div className="h-1.5 rounded-full transition-all" style={{ width: `${b.pct}%`, background: b.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidang Bulan Ini */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-0 flex-1">
                  <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100 shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <CalendarDays className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Sidang Bulan Ini</h2>
                  </div>
                  <div className="divide-y divide-slate-100 overflow-y-auto flex-1 scrollbar-none pb-10">
                    {SIDANG_BULAN.map((s) => (
                      <div key={s.nama} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                        <div className="w-10 text-center shrink-0">
                          <p className="text-[9px] text-slate-400 uppercase font-bold">{s.tgl.split(" ")[1]}</p>
                          <p className="text-[16px] font-black text-[#C62828] leading-tight font-display">{s.tgl.split(" ")[0]}</p>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate font-display">{s.nama}</p>
                          <p className="text-[10px] text-slate-500 truncate font-medium">&ldquo;{s.judul}&rdquo;</p>
                          <p className="text-[9.5px] text-slate-400 font-mono">{s.waktu} WIB · {s.ruang}</p>
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
