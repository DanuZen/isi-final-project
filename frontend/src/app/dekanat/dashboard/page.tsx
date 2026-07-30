"use client";

import React from "react";
import { RoleLayout } from "@/components/layout/role-layout";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  TrendingUp, TrendingDown, Users, Award,
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

const STATS = [
  { label: "Total Mahasiswa TA",    value: "248", sub: "Semester 2025/2026",      color: "#b45309", bg: "#fffbeb", trend: "+12%"  },
  { label: "Selesai Tahun Ini",     value: "89",  sub: "s.d. Juli 2026",          color: "#059669", bg: "#ecfdf5", trend: "+8%"   },
  { label: "Rata-rata Durasi Studi",value: "1.8", sub: "Semester (≈ 10 bulan)",   color: "#1d4ed8", bg: "#eff6ff", trend: "-0.2"  },
  { label: "Tingkat Kelulusan",     value: "94%", sub: "Semester ini",            color: "#C62828", bg: "#fef2f2", trend: "+2%"   },
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

// SVG Donut chart data
const BIDANG = [
  { label: "Rekayasa Perangkat Lunak", pct: 42, color: "#C62828" },
  { label: "Kecerdasan Buatan",         pct: 31, color: "#2563EB" },
  { label: "Jaringan & Keamanan",       pct: 27, color: "#1d4ed8" },
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
  return (
    <RoleLayout
      navItems={NAV}
      userName="Prof. Dr. H. Zulherman, M.T."
      userCode="NIP: 196508201990031001"
      userRole="Dekan FIK"
      userUnit="FIK — UPI YPTK Padang"
      accentColor="#b45309"
    >
      {/* Welcome Banner */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-600 text-white">
              <Award className="w-3.5 h-3.5" /> Pimpinan / Dekanat FIK
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
              Dashboard Eksekutif — FIK UPI YPTK
            </h1>
            <p className="text-xs text-neutral-400 max-w-2xl">
              Ringkasan performa Tugas Akhir Fakultas Ilmu Komputer semester 2025/2026 Genap.
              Tingkat kelulusan bulan ini: <strong className="text-emerald-400">94%</strong>.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition-all active:scale-95 shrink-0">
            <FileDown className="w-4 h-4" /> Unduh Laporan PDF
          </button>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-2">
            <p className="text-[11px] font-semibold text-slate-500">{s.label}</p>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-slate-400">{s.sub}</p>
              <span className={`text-[9.5px] font-bold flex items-center gap-0.5 ${s.trend.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}>
                {s.trend.startsWith("+") ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                {s.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Rekap Kelulusan table (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">Rekapitulasi Kelulusan per Angkatan</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Angkatan", "Total TA", "Lulus", "Tingkat Lulus", "Rata-rata IPK", "Rata-rata Durasi"].map((h) => (
                      <th key={h} className="px-5 py-2.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REKAPITULASI.map((row) => {
                    const pct = row.total > 0 ? Math.round((row.lulus / row.total) * 100) : 0;
                    return (
                      <tr key={row.angkatan} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-black text-slate-900">{row.angkatan}</td>
                        <td className="px-5 py-3 font-semibold text-slate-700">{row.total}</td>
                        <td className="px-5 py-3 font-semibold text-emerald-700">{row.lulus > 0 ? row.lulus : "—"}</td>
                        <td className="px-5 py-3">
                          {row.lulus > 0 ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 rounded-full bg-slate-100 max-w-[80px]">
                                <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="font-bold text-emerald-700 text-[10.5px]">{pct}%</span>
                            </div>
                          ) : (
                            <span className="text-slate-400">Dalam proses</span>
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
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Donut chart bidang */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                <BarChart2 className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">Distribusi Bidang Kajian</h2>
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

          {/* Sidang bulan ini */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                <CalendarDays className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">Sidang Bulan Ini</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {SIDANG_BULAN.map((s) => (
                <div key={s.nama} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 text-center shrink-0">
                    <p className="text-[9px] text-slate-400 uppercase font-bold">{s.tgl.split(" ")[1]}</p>
                    <p className="text-[16px] font-black text-amber-600 leading-tight">{s.tgl.split(" ")[0]}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 truncate">{s.nama}</p>
                    <p className="text-[10px] text-slate-500 truncate">{s.judul}</p>
                    <p className="text-[9.5px] text-slate-400">{s.waktu} WIB · {s.ruang}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
