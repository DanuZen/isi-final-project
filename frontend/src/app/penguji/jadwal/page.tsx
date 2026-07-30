"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, CalendarDays, Star, FileEdit,
  Clock, MapPin, CheckCircle2, Search, Filter, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",        href: "/penguji/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Jadwal Pengujian", href: "/penguji/jadwal",     icon: <CalendarDays className="w-4 h-4" />, badge: "3" },
  { label: "Input Nilai",      href: "/penguji/nilai",      icon: <Star className="w-4 h-4" /> },
  { label: "Lembar Revisi",    href: "/penguji/revisi",     icon: <FileEdit className="w-4 h-4" />, badge: "2" },
];

const JADWAL = [
  { nim: "20101152630045", nama: "Danu Zen",          judul: "Sistem Informasi Manajemen Gudang Berbasis Web",         tanggal: "1 Agt 2026",  tglNum: "1",  hari: "Kam", ruang: "Ruang 302", waktu: "09:00", jenis: "Seminar",  status: "Menunggu",    nilai: null },
  { nim: "20101152630089", nama: "Rafi Andika",        judul: "Implementasi Machine Learning untuk Deteksi Spam",       tanggal: "3 Agt 2026",  tglNum: "3",  hari: "Sab", ruang: "Aula FIK",  waktu: "10:00", jenis: "Sidang",   status: "Menunggu",    nilai: null },
  { nim: "20101152630101", nama: "Siti Rahayu",        judul: "Optimisasi Algoritma Routing Jaringan Komputer",         tanggal: "5 Agt 2026",  tglNum: "5",  hari: "Sel", ruang: "Ruang 302", waktu: "13:00", jenis: "Seminar",  status: "Menunggu",    nilai: null },
  { nim: "20101152630022", nama: "Budi Prasetyo",      judul: "Pengembangan Aplikasi Mobile Absensi Mahasiswa",         tanggal: "8 Agt 2026",  tglNum: "8",  hari: "Jum", ruang: "Aula FIK",  waktu: "14:00", jenis: "Sidang",   status: "Menunggu",    nilai: null },
  { nim: "20101152630067", nama: "Anisa Permatasari",  judul: "Klasifikasi Citra Daun Menggunakan Convolutional NN",    tanggal: "10 Agt 2026", tglNum: "10", hari: "Sen", ruang: "Ruang 302", waktu: "09:00", jenis: "Seminar",  status: "Nilai Masuk", nilai: 82 },
  { nim: "20101152630133", nama: "Fajar Nugroho",      judul: "Analisis Sentimen Review Produk Marketplace Online",     tanggal: "12 Agt 2026", tglNum: "12", hari: "Rab", ruang: "Aula FIK",  waktu: "10:00", jenis: "Sidang",   status: "Selesai",     nilai: 88 },
];

const JENIS_CFG: Record<string, { color: string; bg: string }> = {
  "Seminar": { color: "#7c3aed", bg: "#f5f3ff" },
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
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Dosen Penguji" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ahmad Fauzi, M.T." userNim="NIDN: 1012345678" userRole="Dosen Penguji" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-violet-600 text-white shadow-xs">
                      <CalendarDays className="w-3.5 h-3.5" /> Majelis Penguji Aktif
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Jadwal Pengujian Seminar &amp; Ujian Sidang
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Daftar seluruh jadwal pengujian seminar proposal dan sidang skripsi tempat Anda bertindak sebagai Majelis Dosen Penguji.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/penguji/nilai"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Input Nilai Sekarang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Tabel Pengujian Terdaftar</h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text" placeholder="Cari nama atau NIM..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-[12px] bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all w-44"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                  {["Semua", "Seminar", "Sidang", "Menunggu", "Nilai Masuk"].map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all"
                      style={filter === f ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {["Tanggal", "Mahasiswa", "Judul TA", "Ruang & Waktu", "Jenis", "Status", "Nilai", "Aksi"].map((h) => (
                        <th key={h} className="px-5 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((row) => {
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
                            <p className="text-slate-600 line-clamp-2 leading-relaxed text-[11.5px]">"{row.judul}"</p>
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
                    })}
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
