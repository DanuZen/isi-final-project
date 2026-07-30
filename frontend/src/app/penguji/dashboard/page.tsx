"use client";

import React from "react";
import { RoleLayout } from "@/components/layout/role-layout";
import {
  LayoutDashboard, CalendarDays, Star, FileEdit,
  CheckCircle2, Clock, AlertCircle, TrendingUp,
} from "lucide-react";

/* ── Nav ── */
const NAV = [
  { label: "Dashboard",        href: "/penguji/dashboard",        icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Jadwal Pengujian", href: "/penguji/jadwal",           icon: <CalendarDays className="w-4 h-4" />,   badge: "3" },
  { label: "Input Nilai",      href: "/penguji/nilai",            icon: <Star className="w-4 h-4" /> },
  { label: "Lembar Revisi",    href: "/penguji/revisi",           icon: <FileEdit className="w-4 h-4" />,       badge: "2" },
];

/* ── Mock Data ── */
const STATS = [
  { label: "Jadwal Seminar",       value: "5",  sub: "Aktif bulan ini",    color: "#7c3aed", bg: "#f5f3ff" },
  { label: "Ujian Sidang Aktif",   value: "3",  sub: "Terjadwal",          color: "#C62828", bg: "#fef2f2" },
  { label: "Lembar Revisi",        value: "8",  sub: "Pending diserahkan", color: "#b45309", bg: "#fffbeb" },
  { label: "Mahasiswa Dinilai",    value: "14", sub: "Total semester ini", color: "#059669", bg: "#ecfdf5" },
];

const JADWAL = [
  { nim: "20101152630045", nama: "Danu Zen",          judul: "Sistem Informasi Manajemen Gudang Berbasis Web",       tanggal: "1 Agt 2026",  ruang: "Ruang 302", jenis: "Seminar",  status: "Menunggu" },
  { nim: "20101152630089", nama: "Rafi Andika",        judul: "Implementasi Machine Learning untuk Deteksi Spam",     tanggal: "3 Agt 2026",  ruang: "Aula FIK",  jenis: "Sidang",   status: "Menunggu" },
  { nim: "20101152630101", nama: "Siti Rahayu",        judul: "Optimisasi Algoritma Routing Jaringan Komputer",       tanggal: "5 Agt 2026",  ruang: "Ruang 302", jenis: "Seminar",  status: "Menunggu" },
  { nim: "20101152630022", nama: "Budi Prasetyo",      judul: "Pengembangan Aplikasi Mobile Absensi Mahasiswa",       tanggal: "8 Agt 2026",  ruang: "Aula FIK",  jenis: "Sidang",   status: "Menunggu" },
  { nim: "20101152630067", nama: "Anisa Permatasari",  judul: "Klasifikasi Citra Daun Menggunakan CNN",               tanggal: "10 Agt 2026", ruang: "Ruang 302", jenis: "Seminar",  status: "Nilai Masuk" },
];

const STATUS_CONFIG = {
  "Menunggu":    { color: "#b45309", bg: "#fffbeb", icon: Clock },
  "Nilai Masuk": { color: "#059669", bg: "#ecfdf5", icon: CheckCircle2 },
  "Revisi":      { color: "#C62828", bg: "#fef2f2", icon: AlertCircle },
};

export default function PengujiDashboard() {
  return (
    <RoleLayout
      navItems={NAV}
      userName="Dr. Ahmad Fauzi, M.T."
      userCode="NIDN: 1012345678"
      userRole="Dosen Penguji"
      userUnit="FIK — Teknik Informatika"
      accentColor="#7c3aed"
    >
      {/* Welcome Banner */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-violet-600 text-white">
              <Star className="w-3.5 h-3.5" /> Dosen Penguji Aktif
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide leading-tight">
              Selamat Datang, Dr. Ahmad Fauzi
            </h1>
            <p className="text-xs text-neutral-400 max-w-2xl">
              Anda memiliki <strong className="text-violet-400">5 jadwal seminar</strong> dan{" "}
              <strong className="text-rose-400">3 jadwal sidang</strong> aktif bulan ini. Harap segera input nilai setelah pengujian selesai.
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0 flex-wrap">
            <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 transition-all active:scale-95">
              <CalendarDays className="w-4 h-4" /> Lihat Jadwal
            </button>
            <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95">
              <Star className="w-4 h-4" /> Input Nilai
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-violet-600 via-purple-400 to-violet-600" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-slate-500">{s.label}</p>
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            </div>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Jadwal Pengujian Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-xs">
              <CalendarDays className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">Jadwal Pengujian Aktif</h2>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
            Agustus 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["NIM", "Nama Mahasiswa", "Judul TA", "Tanggal", "Ruang", "Jenis", "Status", "Aksi"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {JADWAL.map((row) => {
                const cfg = STATUS_CONFIG[row.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG["Menunggu"];
                const Icon = cfg.icon;
                return (
                  <tr key={row.nim} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-[10.5px] text-slate-500">{row.nim}</td>
                    <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">{row.nama}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate" title={row.judul}>{row.judul}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-700 font-medium">{row.tanggal}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-600">{row.ruang}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.jenis === "Sidang" ? "bg-rose-50 text-rose-700" : "bg-blue-50 text-blue-700"}`}>
                        {row.jenis}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: cfg.bg, color: cfg.color }}>
                        <Icon className="w-2.5 h-2.5" /> {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-violet-600 text-white hover:bg-violet-700 transition-all">
                        Input Nilai
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rekap nilai mini */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 shrink-0">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-xs">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-sm text-slate-900">Rekap Nilai Semester Ini</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Rata-rata Nilai Seminar", value: "78.4", color: "#7c3aed" },
            { label: "Rata-rata Nilai Sidang",  value: "82.1", color: "#059669" },
            { label: "Belum Dinilai",           value: "6",    color: "#b45309" },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-center">
              <p className="text-2xl font-black" style={{ color: item.color }}>{item.value}</p>
              <p className="text-[10.5px] text-slate-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </RoleLayout>
  );
}
