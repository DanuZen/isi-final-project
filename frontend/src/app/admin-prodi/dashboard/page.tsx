"use client";

import React, { useState } from "react";
import { RoleLayout } from "@/components/layout/role-layout";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  CheckCircle2, Clock, XCircle, Search, Filter,
  FileText, AlertCircle,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",          href: "/admin-prodi/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa",href: "/admin-prodi/mahasiswa",   icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",      href: "/admin-prodi/aktivasi",    icon: <UserPlus className="w-4 h-4" />, badge: "7" },
  { label: "Jadwal Seminar",     href: "/admin-prodi/jadwal",      icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori Judul",   href: "/admin-prodi/repositori",  icon: <BookOpen className="w-4 h-4" /> },
];

const STATS = [
  { label: "Mahasiswa TA Aktif",    value: "124", sub: "Semester ini",         color: "#1d4ed8", bg: "#eff6ff" },
  { label: "Menunggu Aktivasi",     value: "7",   sub: "Setelah clearing",     color: "#b45309", bg: "#fffbeb" },
  { label: "Sidang Bulan Ini",      value: "18",  sub: "Terjadwal Agustus",    color: "#C62828", bg: "#fef2f2" },
  { label: "Proposal Pending",      value: "11",  sub: "Belum diverifikasi",   color: "#7c3aed", bg: "#f5f3ff" },
];

const MAHASISWA = [
  { nim: "20101152630045", nama: "Danu Zen",          judul: "Sistem Informasi Manajemen Gudang",          pembimbing1: "Dr. Hendra, M.T.", pembimbing2: "Rina, M.Kom.",    tahap: "Bimbingan",  status: "Aktif" },
  { nim: "20101152630089", nama: "Rafi Andika",        judul: "Implementasi ML untuk Deteksi Spam",         pembimbing1: "Dr. Ahmad, M.T.", pembimbing2: "Sari, M.T.",      tahap: "Seminar",    status: "Aktif" },
  { nim: "20101152630101", nama: "Siti Rahayu",        judul: "Optimisasi Routing Jaringan Komputer",       pembimbing1: "Prof. Budi, Ph.D",pembimbing2: "Iwan, M.Kom.",    tahap: "Sidang",     status: "Aktif" },
  { nim: "20101152630022", nama: "Budi Prasetyo",      judul: "Aplikasi Mobile Absensi Mahasiswa",          pembimbing1: "Dr. Hendra, M.T.", pembimbing2: "Rina, M.Kom.",   tahap: "Usulan",     status: "Aktif" },
  { nim: "20101152630067", nama: "Anisa Permatasari",  judul: "Klasifikasi Citra Daun dengan CNN",          pembimbing1: "Dr. Ahmad, M.T.", pembimbing2: "Sari, M.T.",      tahap: "Bimbingan",  status: "Aktif" },
  { nim: "20101152630133", nama: "Fajar Nugroho",      judul: "Analisis Sentimen Review Produk Marketplace",pembimbing1: "Prof. Budi, Ph.D",pembimbing2: "Iwan, M.Kom.",    tahap: "Selesai",    status: "Lulus" },
];

const PERMOHONAN = [
  { nim: "20101152630201", nama: "Teguh Santoso",   dosen1: "Dr. Hendra, M.T.", dosen2: "Rina, M.Kom.",   tgl: "29 Jul 2026" },
  { nim: "20101152630215", nama: "Dewi Ratnasari",  dosen1: "Dr. Ahmad, M.T.", dosen2: "Sari, M.T.",      tgl: "28 Jul 2026" },
  { nim: "20101152630198", nama: "Eko Wijayanto",   dosen1: "Prof. Budi, Ph.D",dosen2: "Iwan, M.Kom.",    tgl: "27 Jul 2026" },
];

const TAHAP_COLOR: Record<string, { color: string; bg: string }> = {
  "Usulan":   { color: "#b45309", bg: "#fffbeb" },
  "Bimbingan":{ color: "#1d4ed8", bg: "#eff6ff" },
  "Seminar":  { color: "#7c3aed", bg: "#f5f3ff" },
  "Sidang":   { color: "#C62828", bg: "#fef2f2" },
  "Selesai":  { color: "#059669", bg: "#ecfdf5" },
};

export default function AdminProdiDashboard() {
  const [search, setSearch] = useState("");

  const filtered = MAHASISWA.filter(
    (m) =>
      m.nama.toLowerCase().includes(search.toLowerCase()) ||
      m.nim.includes(search) ||
      m.judul.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RoleLayout
      navItems={NAV}
      userName="Dr. Ratna Dewi, M.Pd."
      userCode="NIDN: 1098765432"
      userRole="Admin Prodi FIK"
      userUnit="FIK — Teknik Informatika"
      accentColor="#1d4ed8"
    >
      {/* Welcome Banner */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white">
              <Users className="w-3.5 h-3.5" /> Admin Prodi FIK
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
              Selamat Datang, Dr. Ratna Dewi
            </h1>
            <p className="text-xs text-neutral-400 max-w-2xl">
              Terdapat <strong className="text-amber-400">7 mahasiswa</strong> menunggu aktivasi akun dan{" "}
              <strong className="text-violet-400">11 proposal</strong> perlu diverifikasi.
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0 flex-wrap">
            <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all active:scale-95">
              <UserPlus className="w-4 h-4" /> Aktivasi Akun
            </button>
            <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95">
              <CalendarDays className="w-4 h-4" /> Atur Jadwal
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-slate-500 leading-tight">{s.label}</p>
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            </div>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Tabel Mahasiswa TA (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">Mahasiswa TA Aktif</h2>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari NIM, nama, judul..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-[12px] text-slate-700 bg-slate-50 focus:outline-none focus:border-blue-400 w-48 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["NIM", "Nama", "Pembimbing I", "Tahap", "Status", "Aksi"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((row) => {
                  const tc = TAHAP_COLOR[row.tahap] ?? TAHAP_COLOR["Usulan"];
                  return (
                    <tr key={row.nim} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-[10.5px] text-slate-500">{row.nim}</td>
                      <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">{row.nama}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pembimbing1}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: tc.bg, color: tc.color }}>
                          {row.tahap}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.status === "Lulus" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all">
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel kanan (1/3) */}
        <div className="space-y-4">

          {/* Permohonan Pembimbing */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">Permohonan Pembimbing</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {PERMOHONAN.map((p) => (
                <div key={p.nim} className="px-4 py-3.5 space-y-2">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{p.nama}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{p.nim}</p>
                  </div>
                  <p className="text-[10.5px] text-slate-600">
                    <span className="font-semibold">Pemb. I:</span> {p.dosen1}<br />
                    <span className="font-semibold">Pemb. II:</span> {p.dosen2}
                  </p>
                  <p className="text-[9.5px] text-slate-400">{p.tgl}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 rounded-lg text-[10.5px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Setuju
                    </button>
                    <button className="flex-1 py-1.5 rounded-lg text-[10.5px] font-bold bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-1">
                      <XCircle className="w-3 h-3" /> Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aktivasi Akun */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <UserPlus className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">Aktivasi Akun</h2>
              <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700">7 Pending</span>
            </div>
            <div className="px-5 py-4 space-y-3">
              <p className="text-[11.5px] text-slate-500 leading-relaxed">
                Mahasiswa berikut telah menyelesaikan <strong className="text-slate-700">clearing nilai luring</strong> dan siap diaktifkan akunnya.
              </p>
              <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2">
                <UserPlus className="w-3.5 h-3.5" /> Kelola Aktivasi Akun (7)
              </button>
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
