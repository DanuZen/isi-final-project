"use client";

import React, { useState } from "react";
import { Sidebar, DOSEN_NAV_ITEMS } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, CalendarDays, Star, FileEdit,
  CheckCircle2, Clock, AlertCircle, TrendingUp, ShieldCheck, Award,
  Users, ArrowRight
} from "lucide-react";

/* ── Nav Dosen Penguji ── */
const NAV = [
  { label: "Dashboard Penguji", href: "/penguji/dashboard",        icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Jadwal Pengujian", href: "/penguji/jadwal",           icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Input Nilai",      href: "/penguji/nilai",            icon: <Award className="w-4 h-4" /> },
  { label: "Lembar Revisi",    href: "/penguji/revisi",           icon: <FileEdit className="w-4 h-4" /> },
];

/* ── Mock Data ── */
const STATS = [
  { label: "Jadwal Seminar",       value: "5 Mahasiswa", sub: "Aktif bulan ini",    icon: CalendarDays, bg: "bg-blue-600", text: "text-white" },
  { label: "Ujian Sidang Aktif",   value: "3 Mahasiswa", sub: "Terjadwal",          icon: Award,        bg: "bg-[#C62828]",  text: "text-white" },
  { label: "Lembar Revisi",        value: "8 Berkas",    sub: "Pending diserahkan", icon: FileEdit,     bg: "bg-[#F59E0B]",  text: "text-slate-950" },
  { label: "Mahasiswa Dinilai",    value: "14 Selesai",  sub: "Total semester ini", icon: CheckCircle2, bg: "bg-emerald-600", text: "text-white" },
];

const JADWAL = [
  { nim: "20101152630045", nama: "Danu Zen",          judul: "Sistem Informasi Manajemen Gudang Berbasis Web",       tanggal: "1 Agt 2026",  ruang: "Ruang 302", jenis: "Seminar",  status: "Menunggu" },
  { nim: "20101152630089", nama: "Rafi Andika",        judul: "Implementasi Machine Learning untuk Deteksi Spam",     tanggal: "3 Agt 2026",  ruang: "Aula FIK",  jenis: "Sidang",   status: "Menunggu" },
  { nim: "20101152630101", nama: "Siti Rahayu",        judul: "Optimisasi Algoritma Routing Jaringan Komputer",       tanggal: "5 Agt 2026",  ruang: "Ruang 302", jenis: "Seminar",  status: "Menunggu" },
  { nim: "20101152630022", nama: "Budi Prasetyo",      judul: "Pengembangan Aplikasi Mobile Absensi Mahasiswa",       tanggal: "8 Agt 2026",  ruang: "Aula FIK",  jenis: "Sidang",   status: "Menunggu" },
  { nim: "20101152630067", nama: "Anisa Permatasari",  judul: "Klasifikasi Citra Daun Menggunakan CNN",               tanggal: "10 Agt 2026", ruang: "Ruang 302", jenis: "Seminar",  status: "Nilai Masuk" },
];

const STATUS_CONFIG = {
  "Menunggu":    { bg: "bg-[#F59E0B] text-slate-950", icon: Clock },
  "Nilai Masuk": { bg: "bg-emerald-600 text-white",   icon: CheckCircle2 },
  "Revisi":      { bg: "bg-[#C62828] text-white",     icon: AlertCircle },
};

export default function PengujiDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV_ITEMS} roleName="Dosen" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ahmad Fauzi, M.T." userNim="NIDN: 1012345678" userRole="Dosen Penguji" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* Welcome Banner */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                    <Star className="w-3.5 h-3.5 text-white" /> Dosen Penguji Aktif
                  </span>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Selamat Datang, Dr. Ahmad Fauzi
                  </h1>
                  <p className="text-xs text-neutral-400 max-w-2xl font-medium">
                    Anda memiliki <strong className="text-blue-400 font-bold">5 jadwal seminar</strong> dan{" "}
                    <strong className="text-rose-400 font-bold">3 jadwal sidang</strong> aktif bulan ini. Harap segera input nilai setelah pengujian selesai.
                  </p>
                </div>
                <div className="flex gap-2.5 shrink-0 flex-wrap">
                  <Link
                    href="/penguji/jadwal"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white shadow-xs transition-all active:scale-95 cursor-pointer font-display"
                  >
                    <CalendarDays className="w-4 h-4 text-white" /> Lihat Jadwal
                  </Link>
                  <Link
                    href="/penguji/nilai"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 cursor-pointer font-display"
                  >
                    <Award className="w-4 h-4 text-white" /> Input Nilai
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComponent = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.text} flex items-center justify-center font-bold shrink-0 shadow-xs`}>
                      <IconComponent className="w-5 h-5 text-current" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-display">{s.label}</p>
                      <p className="text-lg font-black text-slate-900 font-display">{s.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Jadwal Pengujian Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shadow-xs font-bold">
                    <CalendarDays className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="font-bold text-sm text-slate-900 font-display">Jadwal Pengujian Aktif</h2>
                </div>
                <span className="text-[10.5px] font-bold px-3 py-1 rounded-full bg-[#C62828] text-white shadow-2xs font-display">
                  Agustus 2026
                </span>
              </div>

              <div className="overflow-x-auto flex-1 scrollbar-none">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 sticky top-0">
                      {["NIM", "Nama Mahasiswa", "Judul TA", "Tanggal", "Ruang", "Jenis", "Status", "Aksi"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {JADWAL.map((row) => {
                      const cfg = STATUS_CONFIG[row.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG["Menunggu"];
                      const Icon = cfg.icon;
                      return (
                        <tr key={row.nim} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-mono text-[10.5px] text-slate-500 font-medium">{row.nim}</td>
                          <td className="px-4 py-3 font-bold text-slate-900 whitespace-nowrap font-display">{row.nama}</td>
                          <td className="px-4 py-3 text-slate-600 font-medium max-w-[240px] truncate" title={row.judul}>&ldquo;{row.judul}&rdquo;</td>
                          <td className="px-4 py-3 whitespace-nowrap text-slate-700 font-bold">{row.tanggal}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-slate-600 font-medium">{row.ruang}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold shadow-2xs font-display text-white ${
                              row.jenis === "Sidang" ? "bg-[#C62828]" : "bg-blue-600"
                            }`}>
                              {row.jenis}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold shadow-2xs font-display ${cfg.bg}`}>
                              <Icon className="w-3 h-3" /> {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Link
                              href="/penguji/nilai"
                              className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white transition-all shadow-xs inline-flex items-center gap-1 font-display active:scale-95"
                            >
                              Input Nilai <ArrowRight className="w-3 h-3 text-white" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rekap nilai mini */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 shrink-0 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shadow-xs font-bold">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Rekap Nilai Semester Ini</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Rata-rata Nilai Seminar", value: "78.4", bg: "bg-blue-600", text: "text-white" },
                  { label: "Rata-rata Nilai Sidang",  value: "82.1", bg: "bg-emerald-600", text: "text-white" },
                  { label: "Belum Dinilai",           value: "6 Mahasiswa", bg: "bg-[#F59E0B]", text: "text-slate-950" },
                ].map((item) => (
                  <div key={item.label} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wide font-display">{item.label}</p>
                      <p className="text-xl font-black text-slate-900 font-display mt-0.5">{item.value}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-2xs ${item.bg} ${item.text} font-display`}>
                      Statistik
                    </span>
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
