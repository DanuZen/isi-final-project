"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  BookOpen, CheckCircle2, Clock, AlertCircle, MessageSquare,
  FileText, Search, Filter, Eye, ArrowRight
} from "lucide-react";

const DOSEN_NAV = [
  { label: "Dashboard Dosen",    href: "/dosen/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Mahasiswa Bimbingan",href: "/dosen/bimbingan",  icon: <Users className="w-4 h-4" /> },
  { label: "Permohonan Masuk",   href: "/dosen/pengajuan",  icon: <UserCheck className="w-4 h-4" /> },
  { label: "Jadwal & Sidang",    href: "/dosen/kalender",   icon: <CalendarDays className="w-4 h-4" /> },
];

type TahapKey = "Usulan" | "Bimbingan" | "Seminar" | "Sidang" | "Selesai";

const MAHASISWA: Array<{
  nim: string; nama: string; judul: string; tahap: TahapKey;
  sesi: number; minSesi: number; lastLog: string; status: string;
}> = [
  { nim: "20101152630045", nama: "Danu Zen",           judul: "Sistem Informasi Manajemen Gudang Berbasis Web",           tahap: "Bimbingan", sesi: 4, minSesi: 5, lastLog: "Kemarin 14:30",   status: "On Track" },
  { nim: "20101152630089", nama: "Rafi Andika",         judul: "Implementasi ML untuk Deteksi Spam Email",                 tahap: "Seminar",   sesi: 7, minSesi: 5, lastLog: "3 hari lalu",    status: "On Track" },
  { nim: "20101152630101", nama: "Siti Rahayu",         judul: "Optimisasi Algoritma Routing Jaringan Komputer",           tahap: "Bimbingan", sesi: 2, minSesi: 5, lastLog: "1 minggu lalu",  status: "Perlu Perhatian" },
  { nim: "20101152630022", nama: "Budi Prasetyo",       judul: "Pengembangan Aplikasi Mobile Absensi Mahasiswa",           tahap: "Sidang",    sesi: 8, minSesi: 5, lastLog: "Kemarin 09:00",   status: "On Track" },
  { nim: "20101152630067", nama: "Anisa Permatasari",   judul: "Klasifikasi Citra Daun Menggunakan CNN",                   tahap: "Bimbingan", sesi: 3, minSesi: 5, lastLog: "4 hari lalu",    status: "On Track" },
  { nim: "20101152630133", nama: "Fajar Nugroho",       judul: "Analisis Sentimen Review Produk Marketplace Online",       tahap: "Selesai",   sesi: 9, minSesi: 5, lastLog: "2 minggu lalu",  status: "Lulus" },
];

const TAHAP_COLOR: Record<TahapKey, { color: string; bg: string }> = {
  "Usulan":   { color: "#b45309", bg: "#fffbeb" },
  "Bimbingan":{ color: "#1d4ed8", bg: "#eff6ff" },
  "Seminar":  { color: "#7c3aed", bg: "#f5f3ff" },
  "Sidang":   { color: "#C62828", bg: "#fef2f2" },
  "Selesai":  { color: "#059669", bg: "#ecfdf5" },
};

const STATUS_COLOR: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  "On Track":        { color: "#059669", bg: "#ecfdf5", icon: CheckCircle2 },
  "Perlu Perhatian": { color: "#b45309", bg: "#fffbeb", icon: AlertCircle },
  "Lulus":           { color: "#475569", bg: "#f8fafc", icon: CheckCircle2 },
};

export default function DosenBimbinganPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTahap, setFilterTahap] = useState<string>("Semua");

  const filtered = MAHASISWA.filter((m) => {
    const matchSearch = m.nama.toLowerCase().includes(search.toLowerCase()) || m.nim.includes(search);
    const matchTahap  = filterTahap === "Semua" || m.tahap === filterTahap;
    return matchSearch && matchTahap;
  });

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV} roleName="Dosen Pembimbing" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Sarjon Defit" userNim="NIDN: 1012057301" userRole="Dosen Pembimbing" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">
            
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Portal Mahasiswa Bimbingan Active
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Monitoring Mahasiswa Bimbingan TA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pantau progres bab skripsi, verifikasi log konsultasi rutin, dan berikan persetujuan (ACC) Seminar & Ujian Sidang.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dosen/pengajuan"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white border border-red-500/30 shadow-md shadow-red-950/40 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Permohonan Masuk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Mahasiswa Bimbingan</h2>
                  <p className="text-[10px] text-slate-400 font-medium">Total: {filtered.length} Mahasiswa</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari nama atau NIM..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-[12px] bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all w-48"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                  <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                  {["Semua", "Bimbingan", "Seminar", "Sidang", "Selesai"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilterTahap(t)}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all"
                      style={filterTahap === t ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 min-h-0">
              {filtered.map((mhs) => {
                const tahapCfg = TAHAP_COLOR[mhs.tahap];
                const statusCfg = STATUS_COLOR[mhs.status] ?? STATUS_COLOR["On Track"];
                const StatusIcon = statusCfg.icon;
                const sesiPct = Math.min((mhs.sesi / mhs.minSesi) * 100, 100);

                return (
                  <div key={mhs.nim} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="h-1" style={{ background: tahapCfg.color }} />
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">

                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-black text-slate-900 font-display">{mhs.nama}</p>
                            <p className="text-[10.5px] font-mono text-slate-400 mt-0.5">{mhs.nim}</p>
                          </div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0" style={{ background: statusCfg.bg, color: statusCfg.color }}>
                            <StatusIcon className="w-2.5 h-2.5" /> {mhs.status}
                          </span>
                        </div>

                        <p className="text-[11.5px] text-slate-600 leading-relaxed line-clamp-2">"{mhs.judul}"</p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: tahapCfg.bg, color: tahapCfg.color }}>
                              Tahap: {mhs.tahap}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">{mhs.sesi}/{mhs.minSesi} sesi</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-100">
                            <div className="h-1.5 rounded-full transition-all" style={{ width: `${sesiPct}%`, background: sesiPct >= 100 ? "#059669" : "#C62828" }} />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <p className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-slate-300" /> Log: {mhs.lastLog}
                          </p>
                          <div className="flex gap-1.5">
                            <button className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all">
                              <Eye className="w-3.5 h-3.5 text-slate-600" />
                            </button>
                            <button className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all">
                              <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                            </button>
                            {mhs.tahap !== "Selesai" && (
                              <button className="px-3 h-8 rounded-xl text-[11px] font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1 active:scale-95 shadow-xs">
                                <FileText className="w-3 h-3" /> ACC
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
