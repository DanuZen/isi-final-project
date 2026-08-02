"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  Building2, Award, TrendingUp, Users, CheckCircle2, Clock,
  ArrowRight, ArrowLeft, Filter, Search, ShieldCheck, ChevronDown, Check
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Komparasi Prodi",    href: "/dekanat/prodi",       icon: <Building2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

interface ProdiDetail {
  kode: string;
  nama: string;
  kaprodi: string;
  totalMhs: number;
  lulusTahunIni: number;
  ipk: number;
  tepatWaktu: string;
  durasi: string;
  akreditasi: string;
  statusColor: string;
}

const PRODI_LIST: ProdiDetail[] = [
  { kode: "IF",  nama: "Teknik Informatika",      kaprodi: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.", totalMhs: 124, lulusTahunIni: 40, ipk: 3.60, tepatWaktu: "85%", durasi: "1.6 sem", akreditasi: "Unggul (A)",       statusColor: "bg-emerald-600" },
  { kode: "SI",  nama: "Sistem Informasi",        kaprodi: "Dr. Jasmir, S.Kom., M.Kom.",            totalMhs: 88,  lulusTahunIni: 28, ipk: 3.52, tepatWaktu: "80%", durasi: "1.8 sem", akreditasi: "Sangat Baik (B+)", statusColor: "bg-blue-600" },
  { kode: "SK",  nama: "Sistem Komputer",         kaprodi: "Dr. Ahmad Fauzi, M.T.",                 totalMhs: 36,  lulusTahunIni: 12, ipk: 3.48, tepatWaktu: "78%", durasi: "1.9 sem", akreditasi: "Sangat Baik (B+)", statusColor: "bg-blue-600" },
  { kode: "RPL", nama: "Rekayasa Perangkat Lunak", kaprodi: "Dr. Hendra Saputra, M.T.",              totalMhs: 30,  lulusTahunIni: 6,  ipk: 3.55, tepatWaktu: "82%", durasi: "1.7 sem", akreditasi: "Sangat Baik (B+)", statusColor: "bg-blue-600" },
  { kode: "MI",  nama: "Manajemen Informatika",   kaprodi: "Dra. Yanti Susanti, M.Pd.",            totalMhs: 20,  lulusTahunIni: 3,  ipk: 3.45, tepatWaktu: "75%", durasi: "2.0 sem", akreditasi: "Baik (B)",          statusColor: "bg-amber-600" },
];

const METRICS = [
  { label: "Total Program Studi",   value: "5 Prodi", sub: "Fakultas Ilmu Komputer", color: "#C62828", bgIcon: "bg-[#C62828]", icon: Building2 },
  { label: "Prodi IPK Tertinggi",  value: "3.60",    sub: "Teknik Informatika",      color: "#059669", bgIcon: "bg-emerald-600",icon: Award },
  { label: "Rata-Rata IPK Fakultas",value: "3.53",    sub: "+0.05 vs Tahun Lalu",     color: "#2563EB", bgIcon: "bg-blue-600",   icon: TrendingUp },
  { label: "Status Akreditasi",     value: "100%",    sub: "Terakreditasi BAN-PT",    color: "#D97706", bgIcon: "bg-amber-500",  icon: ShieldCheck },
];

export default function DekanatProdiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedKode, setSelectedKode] = useState<string>("IF");
  const [activeMobileTab, setActiveMobileTab] = useState<"table" | "detail">("table");

  const filteredProdi = PRODI_LIST.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.kode.toLowerCase().includes(search.toLowerCase()) ||
      p.kaprodi.toLowerCase().includes(search.toLowerCase())
  );

  const selected = PRODI_LIST.find((p) => p.kode === selectedKode) || PRODI_LIST[0];

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
                      <Building2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" /> Evaluasi Komparasi Program Studi FIK
                    </span>
                  </div>
                  <h1 className="text-lg md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Komparasi Performa Program Studi FIK
                  </h1>
                  <p className="text-[11px] md:text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Analisis komparatif tingkat kelulusan, rata-rata IPK, efisiensi masa studi, serta status akreditasi seluruh Program Studi di Fakultas Ilmu Komputer.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <span>Kembali ke Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── Mobile Tab Navigation Pill Bar (Tabel vs Detail Prodi) ── */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 shrink-0 lg:hidden touch-pan-x">
              <button
                onClick={() => setActiveMobileTab("table")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-display flex items-center justify-center gap-1.5 transition-all ${
                  activeMobileTab === "table"
                    ? "bg-[#C62828] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Tabel Komparasi</span>
              </button>
              <button
                onClick={() => setActiveMobileTab("detail")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-display flex items-center justify-center gap-1.5 transition-all ${
                  activeMobileTab === "detail"
                    ? "bg-[#C62828] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Detail {selected.kode}</span>
              </button>
            </div>

            {/* ── 2. Overview Metric Cards (2 Cols on Mobile) ── */}
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

            {/* ── 3. Main Split View: Table (Left 7/12) + Selected Detail Card (Right 5/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1 min-h-0 items-stretch">
              
              {/* Left Column (7/12 Width): Comprehensive Comparison Table */}
              <div className={`lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col justify-between ${
                activeMobileTab === "table" ? "block" : "hidden lg:flex"
              }`}>
                <div className="p-3 md:p-3.5 border-b border-slate-100 flex items-center justify-between gap-2.5 shrink-0 bg-white">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Komparasi Performa per Program Studi</h2>
                      <p className="text-[10px] text-slate-400 font-medium truncate">Evaluasi Perbandingan IPK, Masa Studi &amp; Akreditasi Prodi</p>
                    </div>
                  </div>

                  <div className="relative min-w-[140px] md:min-w-[180px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari prodi..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:border-[#C62828] focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto overflow-y-auto w-full touch-pan-x flex-1 min-h-0 scrollbar-thin">
                  <table className="w-full text-xs min-w-[700px] border-collapse">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["Kode", "Program Studi", "Total Mhs TA", "Lulus Tahun Ini", "Rata-Rata IPK", "Tepat Waktu", "Akreditasi"].map((h) => (
                          <th key={h} className="px-3.5 py-2.5 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProdi.map((p) => (
                        <tr
                          key={p.kode}
                          onClick={() => {
                            setSelectedKode(p.kode);
                            if (typeof window !== "undefined" && window.innerWidth < 1024) {
                              setActiveMobileTab("detail");
                            }
                          }}
                          className={`cursor-pointer transition-colors ${
                            selected.kode === p.kode ? "bg-rose-50/60 font-bold" : "hover:bg-slate-50"
                          }`}
                        >
                          <td className="px-3.5 py-3 font-mono font-black text-slate-900">{p.kode}</td>
                          <td className="px-3.5 py-3 font-bold text-slate-900 font-display">{p.nama}</td>
                          <td className="px-3.5 py-3 font-bold text-slate-700 font-mono">{p.totalMhs} Mhs</td>
                          <td className="px-3.5 py-3 font-bold text-emerald-700 font-mono">{p.lulusTahunIni} Mhs</td>
                          <td className="px-3.5 py-3 font-bold text-emerald-700 font-mono">{p.ipk.toFixed(2)}</td>
                          <td className="px-3.5 py-3 font-bold text-slate-800 font-mono">{p.tepatWaktu}</td>
                          <td className="px-3.5 py-3 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                              {p.akreditasi}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column (5/12 Width): Selected Prodi Detail Panel */}
              <div className={`lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 min-h-0 flex flex-col justify-between overflow-hidden ${
                activeMobileTab === "detail" ? "block" : "hidden lg:flex"
              }`}>
                <div className="p-3 md:p-3.5 border-b border-slate-100 flex items-center justify-between gap-2.5 shrink-0 bg-white">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setActiveMobileTab("table")}
                    className="lg:hidden p-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C62828]" />
                    <span>Tabel</span>
                  </button>

                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Detail Performa {selected.kode}</h3>
                      <p className="text-[10px] text-slate-400 font-medium truncate">{selected.nama}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto flex-1 space-y-3.5 scrollbar-thin">
                  
                  {/* Selected Header Card */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                        {selected.akreditasi}
                      </span>
                      <span className="font-mono text-xs font-black text-slate-400">{selected.kode}</span>
                    </div>

                    <div>
                      <h4 className="text-base md:text-lg font-black text-slate-900 font-display leading-tight">{selected.nama}</h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">Ketua Program Studi: <strong className="text-slate-800 font-bold">{selected.kaprodi}</strong></p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 text-[10.5px]">
                      <div className="p-3 rounded-xl bg-[#C62828] text-white shadow-xs space-y-0.5">
                        <span className="text-[9px] text-white/80 font-bold uppercase font-display">Total Mahasiswa TA</span>
                        <p className="font-extrabold text-white font-mono text-base">{selected.totalMhs} Mhs</p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-600 text-white shadow-xs space-y-0.5">
                        <span className="text-[9px] text-white/80 font-bold uppercase font-display">Rata-Rata IPK</span>
                        <p className="font-extrabold text-white font-mono text-base">{selected.ipk.toFixed(2)}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-600 text-white shadow-xs space-y-0.5">
                        <span className="text-[9px] text-white/80 font-bold uppercase font-display">Tepat Waktu (≤ 8 Sem)</span>
                        <p className="font-extrabold text-white font-mono text-base">{selected.tepatWaktu}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-500 text-white shadow-xs space-y-0.5">
                        <span className="text-[9px] text-white/80 font-bold uppercase font-display">Masa Studi Rata-Rata</span>
                        <p className="font-extrabold text-white font-mono text-base">{selected.durasi}</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                    <h5 className="font-bold text-slate-900 font-display flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#C62828]" />
                      <span>Rekomendasi Dekanat untuk {selected.nama}</span>
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      Performa akademik prodi {selected.nama} menunjukkan tren sangat positif dengan tingkat kelulusan tepat waktu {selected.tepatWaktu} dan rata-rata IPK {selected.ipk.toFixed(2)}.
                    </p>
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
