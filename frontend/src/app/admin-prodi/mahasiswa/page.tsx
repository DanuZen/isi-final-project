"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  Search, Filter, Eye, Download, FileText, ArrowRight,
  CheckCircle2
} from "lucide-react";

const NAV = [
  { label: "Dashboard",           href: "/admin-prodi/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa", href: "/admin-prodi/mahasiswa",  icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",       href: "/admin-prodi/aktivasi",   icon: <UserPlus className="w-4 h-4" /> },
  { label: "Jadwal Seminar",      href: "/admin-prodi/jadwal",     icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori",          href: "/admin-prodi/repositori", icon: <BookOpen className="w-4 h-4" /> },
];

type TahapKey = "Usulan" | "Bimbingan" | "Seminar" | "Sidang" | "Selesai";

const MAHASISWA: Array<{
  nim: string; nama: string; judul: string; tahap: TahapKey;
  pembimbing1: string; pembimbing2: string; ipk: number; sks: number;
  tglDaftar: string; status: string;
}> = [
  { nim: "20101152630045", nama: "Danu Zen",         judul: "Sistem Informasi Manajemen Gudang Berbasis Web",           tahap: "Bimbingan", pembimbing1: "Dr. Sarjon Defit",  pembimbing2: "Rina Oktaviani",  ipk: 3.65, sks: 144, tglDaftar: "10 Jan 2026", status: "Aktif" },
  { nim: "20101152630089", nama: "Rafi Andika",       judul: "Implementasi ML untuk Deteksi Spam Email",                 tahap: "Seminar",   pembimbing1: "Dr. Sarjon Defit",  pembimbing2: "Sari Indah",      ipk: 3.78, sks: 147, tglDaftar: "5 Jan 2026",  status: "Aktif" },
  { nim: "20101152630101", nama: "Siti Rahayu",       judul: "Optimisasi Routing Jaringan Komputer",                     tahap: "Bimbingan", pembimbing1: "Prof. Budi, Ph.D",  pembimbing2: "Iwan, M.Kom.",    ipk: 3.55, sks: 145, tglDaftar: "12 Jan 2026", status: "Aktif" },
  { nim: "20101152630022", nama: "Budi Prasetyo",     judul: "Aplikasi Mobile Absensi Mahasiswa",                        tahap: "Sidang",    pembimbing1: "Dr. Sarjon Defit",  pembimbing2: "Rina Oktaviani",  ipk: 3.82, sks: 148, tglDaftar: "3 Jan 2026",  status: "Aktif" },
  { nim: "20101152630067", nama: "Anisa Permatasari", judul: "Klasifikasi Citra Daun dengan CNN",                        tahap: "Bimbingan", pembimbing1: "Dr. Ahmad Fauzi",  pembimbing2: "Sari Indah",      ipk: 3.71, sks: 144, tglDaftar: "15 Jan 2026", status: "Aktif" },
  { nim: "20101152630133", nama: "Fajar Nugroho",     judul: "Analisis Sentimen Review Produk Marketplace",              tahap: "Selesai",   pembimbing1: "Prof. Budi, Ph.D",  pembimbing2: "Iwan, M.Kom.",    ipk: 3.58, sks: 146, tglDaftar: "8 Jan 2026",  status: "Lulus" },
  { nim: "20101152630178", nama: "Wulandari Putri",   judul: "Deteksi Anomali Jaringan dengan Machine Learning",         tahap: "Usulan",    pembimbing1: "Belum Ditetapkan", pembimbing2: "Belum Ditetapkan", ipk: 3.62, sks: 143, tglDaftar: "20 Jan 2026", status: "Aktif" },
  { nim: "20101152630201", nama: "Teguh Santoso",     judul: "Sistem Monitoring Energi Listrik Berbasis IoT",            tahap: "Usulan",    pembimbing1: "Belum Ditetapkan", pembimbing2: "Belum Ditetapkan", ipk: 3.72, sks: 144, tglDaftar: "22 Jan 2026", status: "Aktif" },
];

const TAHAP_CFG: Record<TahapKey, { color: string; bg: string }> = {
  "Usulan":   { color: "#b45309", bg: "#fffbeb" },
  "Bimbingan":{ color: "#1d4ed8", bg: "#eff6ff" },
  "Seminar":  { color: "#7c3aed", bg: "#f5f3ff" },
  "Sidang":   { color: "#C62828", bg: "#fef2f2" },
  "Selesai":  { color: "#059669", bg: "#ecfdf5" },
};

export default function AdminProdiMahasiswaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTahap, setFilterTahap] = useState("Semua");
  const [selectedNim, setSelectedNim] = useState<string | null>(null);

  const filtered = MAHASISWA.filter((m) => {
    const ms = m.nama.toLowerCase().includes(search.toLowerCase()) || m.nim.includes(search) || m.judul.toLowerCase().includes(search.toLowerCase());
    const mt = filterTahap === "Semua" || m.tahap === filterTahap;
    return ms && mt;
  });

  const selected = MAHASISWA.find((m) => m.nim === selectedNim);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Admin Prodi FIK" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ratna Dewi, M.Pd." userNim="NIDN: 1098765432" userRole="Admin Prodi FIK" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-xs">
                      <Users className="w-3.5 h-3.5" /> Database Mahasiswa TA Prodi TI
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Manajemen Data Mahasiswa Tugas Akhir
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pantau alur pendaftaran, penetapan dosen pembimbing I &amp; II, progress bab, hingga kelulusan mahasiswa.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-prodi/aktivasi"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Aktivasi Akun Mahasiswa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Control Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Tabel Mahasiswa Active</h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input type="text" placeholder="Cari NIM, nama, judul..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-[12px] bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all w-48"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                  <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                  {["Semua", "Usulan", "Bimbingan", "Seminar", "Sidang", "Selesai"].map((f) => (
                    <button key={f} onClick={() => setFilterTahap(f)}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all"
                      style={filterTahap === f ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              </div>
            </div>

            {/* Grid layout with optional Side Panel */}
            <div className="flex gap-4 items-stretch flex-1 min-h-0">
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all flex-1 min-h-0 flex flex-col`}>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        {["NIM", "Nama Mahasiswa", "Judul TA", "Pembimbing I", "Tahap", "IPK", "Aksi"].map((h) => (
                          <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((row) => {
                        const tc = TAHAP_CFG[row.tahap];
                        const isSelected = selectedNim === row.nim;
                        return (
                          <tr key={row.nim} className={`hover:bg-slate-50 transition-colors cursor-pointer ${isSelected ? "bg-rose-50/40" : ""}`}
                            onClick={() => setSelectedNim(isSelected ? null : row.nim)}>
                            <td className="px-4 py-3 font-mono text-[10px] text-slate-500">{row.nim}</td>
                            <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-4 py-3 max-w-[200px]"><p className="text-slate-600 truncate text-[11.5px]">"{row.judul}"</p></td>
                            <td className="px-4 py-3 whitespace-nowrap text-slate-600 font-medium">{row.pembimbing1}</td>
                            <td className="px-4 py-3">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: tc.bg, color: tc.color }}>{row.tahap}</span>
                            </td>
                            <td className="px-4 py-3 font-black text-slate-800 font-display">{row.ipk}</td>
                            <td className="px-4 py-3">
                              <button className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center hover:bg-[#B71C1C] transition-all shadow-xs">
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detail Panel */}
              {selected && (
                <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between p-5 space-y-4">
                  <div className="space-y-4 overflow-y-auto scrollbar-none">
                    <div className="pb-3 border-b border-slate-100">
                      <span className="text-[10px] font-bold text-[#C62828] uppercase tracking-widest font-display">Detail Mahasiswa</span>
                      <h3 className="text-base font-black text-slate-900 font-display mt-0.5">{selected.nama}</h3>
                      <p className="text-xs font-mono text-slate-400">{selected.nim}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Judul Penelitian</p>
                        <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-snug">"{selected.judul}"</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                          <p className="text-xl font-black text-[#C62828] font-display">{selected.ipk}</p>
                          <p className="text-[9px] text-slate-400 font-bold">IPK Terakhir</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                          <p className="text-xl font-black text-emerald-600 font-display">{selected.sks}</p>
                          <p className="text-[9px] text-slate-400 font-bold">Total SKS</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Pembimbing I</p>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">{selected.pembimbing1}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Pembimbing II</p>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">{selected.pembimbing2}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tanggal Pengajuan</p>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">{selected.tglDaftar}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs">
                      <FileText className="w-3.5 h-3.5" /> Berkas Lengkap
                    </button>
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
                      Ubah Dosen Pembimbing
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
