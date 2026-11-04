"use client";

import React, { useState } from "react";
import { Sidebar, DOSEN_NAV_ITEMS } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";
import {
  LayoutDashboard, CalendarDays, Star, FileEdit,
  Clock, MapPin, CheckCircle2, Search, Filter, ArrowRight, ShieldCheck, Award, ChevronDown, Check
} from "lucide-react";

const DEFAULT_JADWAL = [
  {
    nim: "20101152630045",
    nama: "Danu Zen",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web Berbasis Real-Time Data",
    tanggal: "Kamis, 6 Agt 2026",
    tglNum: "6",
    hari: "Kamis",
    ruang: "Ruang 302 FIK",
    waktu: "09:00 - 10:30 WIB",
    jenis: "Seminar",
    status: "Menunggu",
    nilai: null,
  },
  {
    nim: "20101152630089",
    nama: "Rafi Andika",
    judul: "Implementasi Machine Learning untuk Deteksi Spam Email Menggunakan Naive Bayes",
    tanggal: "Jumat, 7 Agt 2026",
    tglNum: "7",
    hari: "Jumat",
    ruang: "Aula FIK YPTK",
    waktu: "10:30 - 12:00 WIB",
    jenis: "Sidang",
    status: "Menunggu",
    nilai: null,
  },
  {
    nim: "20101152630101",
    nama: "Siti Rahayu",
    judul: "Optimisasi Algoritma Routing Jaringan Komputer Menggunakan Dijkstra",
    tanggal: "Senin, 10 Agt 2026",
    tglNum: "10",
    hari: "Senin",
    ruang: "Ruang Dosen FIK",
    waktu: "13:00 - 14:30 WIB",
    jenis: "Seminar",
    status: "Nilai Masuk",
    nilai: 85,
  },
  {
    nim: "20101152630022",
    nama: "Budi Prasetyo",
    judul: "Pengembangan Aplikasi Mobile Absensi Mahasiswa Berbasis Geolocation",
    tanggal: "Rabu, 12 Agt 2026",
    tglNum: "12",
    hari: "Rabu",
    ruang: "Aula FIK YPTK",
    waktu: "08:30 - 10:00 WIB",
    jenis: "Sidang",
    status: "Selesai",
    nilai: 88,
  },
];

const JENIS_CFG: Record<string, { bg: string }> = {
  "Seminar": { bg: "bg-blue-600 text-white" },
  "Sidang":  { bg: "bg-[#2563eb] text-white" },
};
const STATUS_CFG: Record<string, { bg: string; icon: React.ElementType }> = {
  "Menunggu":    { bg: "bg-[#38bdf8] text-slate-950 font-black", icon: Clock },
  "Nilai Masuk": { bg: "bg-emerald-600 text-white font-bold",   icon: CheckCircle2 },
  "Selesai":     { bg: "bg-emerald-600 text-white font-bold",   icon: CheckCircle2 },
};

export default function PengujiJadwalPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filter, setFilter] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [jadwalList] = useState(DEFAULT_JADWAL);

  const perluDinilaiCount = jadwalList.filter((j) => j.status === "Menunggu" || j.status === "Nilai Masuk").length;
  const selesaiCount = jadwalList.filter((j) => j.status === "Selesai").length;

  const filtered = jadwalList.filter((j) => {
    const matchSearch = j.nama.toLowerCase().includes(search.toLowerCase()) || j.nim.includes(search);
    const matchFilter = filter === "Semua" || j.jenis === filter || j.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV_ITEMS} roleName="Dosen" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ahmad Fauzi, M.T." userNim="NIDN: 1012345678" userRole="Dosen Penguji" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="p-5 md:p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#2563eb] text-white font-display">
                      PENUGASAN PENGUJI
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono font-semibold">T.A. 2026/2027</span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display tracking-wide leading-tight">
                    Jadwal Ujian &amp; Penilaian
                  </h1>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-2xl">
                    Daftar mahasiswa yang ditugaskan kepada Anda untuk diuji pada Seminar Proposal &amp; Ujian Sidang Skripsi.
                  </p>
                </div>
                {/* Combined Solid Stat Pill Container */}
                <div className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-[#262626] border border-neutral-800 shadow-sm shrink-0 font-display">
                  {/* Stat 1: Perlu Dinilai (Solid Gold Pill) */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#38bdf8] text-slate-950 font-black shadow-2xs">
                    <Clock className="w-4 h-4 text-slate-950 shrink-0 stroke-[2.5]" />
                    <span className="text-sm font-black text-slate-950 leading-none">{perluDinilaiCount}</span>
                    <span className="text-[10px] font-black text-slate-950 uppercase tracking-wider">Perlu Dinilai</span>
                  </div>

                  {/* Stat 2: Selesai (Solid Emerald Pill) */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                    <span className="text-sm font-black text-white leading-none">{selesaiCount}</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">Selesai</span>
                  </div>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#2563eb]" />
            </div>

            {/* ── Table Card ── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Filter & Search Bar (Aligned 1-Row) */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-2.5 shrink-0">
                {/* Search Box */}
                <div className="relative flex-1 min-w-0">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari mahasiswa / NIM..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563eb] focus:bg-white transition-all font-semibold"
                  />
                </div>

                {/* Dropdown Filter */}
                <div className="relative shrink-0 font-display">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center justify-between gap-2.5 px-4 py-2 min-w-[125px] rounded-xl border border-slate-200 text-xs bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 transition-all cursor-pointer whitespace-nowrap font-display shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-3.5 h-3.5 text-[#2563eb]" />
                      <span>{filter}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isFilterOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                      <div className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 min-w-[140px] space-y-0.5 font-display animate-in fade-in zoom-in-95 duration-150">
                        {["Semua", "Seminar", "Sidang", "Menunggu", "Selesai"].map((f) => (
                          <button
                            key={f}
                            onClick={() => {
                              setFilter(f);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              filter === f ? "bg-[#2563eb] text-white" : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span>{f}</span>
                            {filter === f && <Check className="w-3.5 h-3.5 text-white" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Table Body (Swipeable on Mobile) */}
              <div className="flex-1 overflow-y-auto overflow-x-auto scrollbar-none flex flex-col">
                <table className={`w-full text-left text-xs border-collapse min-w-[750px] ${filtered.length === 0 ? "h-full" : ""}`}>
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase text-[10px] font-display tracking-wider">
                      <th className="px-5 py-3">Tanggal</th>
                      <th className="px-5 py-3">Mahasiswa</th>
                      <th className="px-5 py-3">Judul Skripsi</th>
                      <th className="px-5 py-3">Ruang / Waktu</th>
                      <th className="px-5 py-3">Jenis</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Nilai</th>
                      <th className="px-5 py-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-slate-100 ${filtered.length === 0 ? "h-full" : ""}`}>
                    {filtered.length === 0 ? (
                      <tr className="h-full">
                        <td colSpan={8} className="px-5 py-12 text-center text-slate-400 align-middle h-full">
                          <EmptyState
                            icon={Clock}
                            title="Belum Ada Jadwal Pengujian"
                            description="Jadwal pengujian seminar & sidang skripsi akan muncul setelah ditetapkan oleh Admin Prodi."
                          />
                        </td>
                      </tr>
                    ) : (
                      filtered.map((row) => {
                        const jCfg = JENIS_CFG[row.jenis] ?? JENIS_CFG["Seminar"];
                        const sCfg = STATUS_CFG[row.status] ?? STATUS_CFG["Menunggu"];
                        const SIcon = sCfg.icon;
                        return (
                          <tr key={row.nim} className="hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="w-14 rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden text-center shrink-0 font-display">
                                <div className="bg-[#2563eb] text-white py-1 px-1 text-[9.5px] font-black uppercase tracking-wider leading-none">
                                  {row.hari.slice(0, 3)}
                                </div>
                                <div className="py-1.5 px-1 bg-gradient-to-b from-white to-slate-50">
                                  <p className="text-lg font-black text-slate-900 leading-tight">{row.tglNum}</p>
                                  <p className="text-[9.5px] font-bold text-slate-400 font-mono uppercase leading-none">Agt</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <p className="font-bold text-slate-800 whitespace-nowrap font-display">{row.nama}</p>
                              <p className="text-[10px] font-mono text-slate-400">{row.nim}</p>
                            </td>
                            <td className="px-5 py-4 max-w-[220px]">
                              <p className="text-slate-600 line-clamp-2 leading-relaxed text-[11.5px]">&quot;{row.judul}&quot;</p>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <p className="flex items-center gap-1 font-semibold text-slate-700"><MapPin className="w-3.5 h-3.5 text-slate-400" />{row.ruang}</p>
                              <p className="flex items-center gap-1 text-slate-500 mt-0.5 font-medium"><Clock className="w-3.5 h-3.5 text-slate-300" />{row.waktu}</p>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-2xs font-display ${jCfg.bg}`}>
                                {row.jenis}
                              </span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-2xs font-display ${sCfg.bg}`}>
                                <SIcon className="w-3 h-3 stroke-[2.5]" /> {row.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              {row.nilai !== null
                                ? <span className="text-sm font-black font-display text-emerald-600">{row.nilai}</span>
                                : <span className="text-slate-300 text-xs">—</span>
                              }
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <Link href="/penguji/nilai"
                                className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all inline-block active:scale-95 shadow-xs font-display"
                                style={row.status === "Menunggu" ? { background: "#2563eb", color: "white" } : { background: "#f1f5f9", color: "#64748b" }}
                              >
                                {row.status === "Menunggu" ? "Input Nilai" : "Lihat Nilai"}
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
