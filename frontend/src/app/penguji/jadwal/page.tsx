"use client";

import React, { useState } from "react";
import { Sidebar, DOSEN_NAV_ITEMS } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, CalendarDays, Star, FileEdit,
  Clock, MapPin, CheckCircle2, Search, Filter, ArrowRight, ShieldCheck, Award
} from "lucide-react";

const JADWAL: Array<{
  nim: string;
  nama: string;
  judul: string;
  tanggal: string;
  tglNum: string;
  hari: string;
  ruang: string;
  waktu: string;
  jenis: string;
  status: string;
  nilai: number | null;
}> = [];

const JENIS_CFG: Record<string, { color: string; bg: string }> = {
  "Seminar": { color: "#2563EB", bg: "#eff6ff" },
  "Sidang":  { color: "#C62828", bg: "#fef2f2" },
};
const STATUS_CFG: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  "Menunggu":    { color: "#b45309", bg: "#fffbeb", icon: Clock },
  "Nilai Masuk": { color: "#059669", bg: "#ecfdf5", icon: CheckCircle2 },
  "Selesai":     { color: "#475569", bg: "#f8fafc", icon: CheckCircle2 },
};

export default function PengujiJadwalPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = JADWAL.filter((j) => {
    const matchSearch = j.nama.toLowerCase().includes(search.toLowerCase()) || j.nim.includes(search);
    const matchFilter = filter === "Semua" || j.jenis === filter || j.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV_ITEMS} roleName="Dosen" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ahmad Fauzi, M.T." userNim="NIDN: 1012345678" userRole="Dosen Penguji" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#C62828] text-white">
                      PENUGASAN PENGUJI
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono font-semibold">T.A. 2026/2027</span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display tracking-wide">
                    Jadwal Ujian &amp; Penilaian
                  </h1>
                  <p className="text-xs text-neutral-400 font-medium">
                    Daftar mahasiswa yang ditugaskan kepada Anda untuk diuji pada Seminar Proposal &amp; Ujian Sidang Skripsi.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-center">
                    <p className="text-lg font-black text-[#ffd01d] font-display">{JADWAL.filter(j=>j.status==="Menunggu").length}</p>
                    <p className="text-[10px] text-neutral-400 font-medium">Perlu Dinilai</p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-center">
                    <p className="text-lg font-black text-emerald-400 font-display">{JADWAL.filter(j=>j.status==="Selesai").length}</p>
                    <p className="text-[10px] text-neutral-400 font-medium">Selesai</p>
                  </div>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── Table Card ── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Filter bar */}
              <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                  {["Semua", "Seminar", "Sidang", "Menunggu", "Selesai"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap font-display ${
                        filter === tab
                          ? "bg-[#C62828] text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari mahasiswa / NIM..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#C62828] focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-y-auto overflow-x-auto scrollbar-none">
                <table className="w-full text-left text-xs border-collapse">
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
                  <tbody className="divide-y divide-slate-100">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-5 py-12 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <Clock className="w-8 h-8 text-slate-300" />
                            <p className="text-xs font-bold text-slate-700 font-display">Belum Ada Jadwal Pengujian</p>
                            <p className="text-[11px] text-slate-400">Jadwal pengujian seminar &amp; sidang skripsi akan muncul setelah ditetapkan oleh Admin Prodi.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((row) => {
                        const jCfg = JENIS_CFG[row.jenis] ?? JENIS_CFG["Seminar"];
                        const sCfg = STATUS_CFG[row.status] ?? STATUS_CFG["Menunggu"];
                        const SIcon = sCfg.icon;
                        return (
                          <tr key={row.nim} className="hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-4">
                              <div className="text-center bg-slate-50 py-1.5 px-2 rounded-xl border border-slate-100 min-w-[54px]">
                                <p className="text-[9px] font-bold text-slate-400 uppercase">{row.hari}</p>
                                <p className="text-xl font-black leading-none my-0.5 font-display" style={{ color: jCfg.color }}>{row.tglNum}</p>
                                <p className="text-[9px] text-slate-400">Agt</p>
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
                              <p className="flex items-center gap-1 text-slate-500 mt-0.5 font-medium"><Clock className="w-3.5 h-3.5 text-slate-300" />{row.waktu} WIB</p>
                            </td>
                            <td className="px-5 py-4">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: jCfg.bg, color: jCfg.color }}>{row.jenis}</span>
                            </td>
                            <td className="px-5 py-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: sCfg.bg, color: sCfg.color }}>
                                <SIcon className="w-2.5 h-2.5" /> {row.status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              {row.nilai !== null
                                ? <span className="text-sm font-black font-display" style={{ color: row.nilai >= 80 ? "#059669" : "#b45309" }}>{row.nilai}</span>
                                : <span className="text-slate-300 text-xs">—</span>
                              }
                            </td>
                            <td className="px-5 py-4">
                              <Link href="/penguji/nilai"
                                className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all inline-block active:scale-95 shadow-xs"
                                style={row.status === "Menunggu" ? { background: "#C62828", color: "white" } : { background: "#f1f5f9", color: "#64748b" }}
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
