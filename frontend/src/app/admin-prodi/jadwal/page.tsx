"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  Plus, MapPin, Clock, User, ArrowRight, Search, Calendar as CalendarIcon
} from "lucide-react";

const NAV = [
  { label: "Dashboard",           href: "/admin-prodi/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa", href: "/admin-prodi/mahasiswa",  icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",       href: "/admin-prodi/aktivasi",   icon: <UserPlus className="w-4 h-4" /> },
  { label: "Jadwal Seminar",      href: "/admin-prodi/jadwal",     icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori",          href: "/admin-prodi/repositori", icon: <BookOpen className="w-4 h-4" /> },
];

interface JadwalItem {
  id: string;
  nim: string;
  nama: string;
  judul: string;
  jenis: "Seminar Proposal" | "Ujian Sidang";
  tanggal: string;
  jam: string;
  ruangan: string;
  penguji1: string;
  penguji2: string;
  pembimbing: string;
  status: "Terjadwal" | "Selesai";
}

const INITIAL_JADWAL: JadwalItem[] = [
  {
    id: "JDW-01", nim: "20101152630045", nama: "Danu Zen",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web",
    jenis: "Seminar Proposal", tanggal: "1 Agt 2026", jam: "09:00 - 10:30 WIB",
    ruangan: "Ruang 302", penguji1: "Dr. Ahmad Fauzi, M.T.", penguji2: "Prof. Budi Santoso, Ph.D",
    pembimbing: "Dr. Sarjon Defit", status: "Terjadwal"
  },
  {
    id: "JDW-02", nim: "20101152630089", nama: "Rafi Andika",
    judul: "Implementasi ML untuk Deteksi Spam Email",
    jenis: "Ujian Sidang", tanggal: "3 Agt 2026", jam: "10:00 - 11:30 WIB",
    ruangan: "Aula FIK Lt. 2", penguji1: "Dr. Ahmad Fauzi, M.T.", penguji2: "Sari Indah, M.T.",
    pembimbing: "Dr. Sarjon Defit", status: "Terjadwal"
  },
  {
    id: "JDW-03", nim: "20101152630101", nama: "Siti Rahayu",
    judul: "Optimisasi Algoritma Routing Jaringan Komputer",
    jenis: "Seminar Proposal", tanggal: "5 Agt 2026", jam: "13:00 - 14:30 WIB",
    ruangan: "Ruang 302", penguji1: "Dr. Hendra Saputra, M.T.", penguji2: "Iwan, M.Kom.",
    pembimbing: "Prof. Budi Santoso, Ph.D", status: "Terjadwal"
  },
];

export default function AdminProdiJadwalPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [jadwalList] = useState<JadwalItem[]>(INITIAL_JADWAL);
  const [search, setSearch] = useState("");

  const filtered = jadwalList.filter(
    (j) =>
      j.nama.toLowerCase().includes(search.toLowerCase()) ||
      j.nim.includes(search) ||
      j.judul.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Hafizah, S.Kom., M.Kom." userNim="NIP: 198504122010122001" userRole="Admin Prodi" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <CalendarDays className="w-3.5 h-3.5 text-white" /> Penjadwalan Majelis Penguji FIK
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Penjadwalan Seminar Proposal &amp; Ujian Sidang
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Atur jadwal waktu, ruangan seminar/sidang, serta penugasan Majelis Dosen Penguji I &amp; II untuk seluruh mahasiswa prodi.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display cursor-pointer">
                    <Plus className="w-4 h-4 text-white" />
                    <span>Buat Jadwal Baru</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                    <CalendarDays className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Jadwal Terdaftar (Agustus 2026)</h2>
                    <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Sesi Terjadwal</p>
                  </div>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari Mahasiswa / Judul..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-[12px] bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-100 overflow-y-auto flex-1 scrollbar-none pb-10">
                {filtered.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs font-display ${item.jenis === "Ujian Sidang" ? "bg-[#C62828]" : "bg-amber-600"}`}>
                          {item.jenis}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{item.id}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 font-display">{item.nama} <span className="font-mono text-xs text-slate-400">({item.nim})</span></h3>
                      <p className="text-xs text-slate-600 font-medium">"{item.judul}"</p>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-400" /> Pembimbing: <strong>{item.pembimbing}</strong></span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-400" /> Penguji I: <strong>{item.penguji1}</strong></span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-400" /> Penguji II: <strong>{item.penguji2}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                      <div className="flex items-center gap-3 text-xs text-slate-700 font-bold">
                        <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-[#C62828]" /> {item.tanggal}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {item.jam}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-600 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" /> {item.ruangan}
                      </div>
                      <button className="mt-1 px-3.5 py-1.5 rounded-xl text-[11px] font-bold border border-slate-200 hover:border-[#C62828] hover:text-[#C62828] transition-all bg-white shadow-xs">
                        Edit Jadwal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
