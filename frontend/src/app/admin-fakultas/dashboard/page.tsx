"use client";

import React from "react";
import { RoleLayout } from "@/components/layout/role-layout";
import {
  LayoutDashboard, FileText, Shield, Archive,
  CheckCircle2, Clock, Download, Eye, AlertCircle,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" />, badge: "9" },
  { label: "Bebas Fakultas",  href: "/admin-fakultas/bebas",      icon: <Shield className="w-4 h-4" />,   badge: "5" },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

const STATS = [
  { label: "SK Pending Terbit",       value: "9",  sub: "Menunggu ditandatangani", color: "#4338ca", bg: "#eef2ff" },
  { label: "SK Diterbitkan",          value: "34", sub: "Bulan Agustus 2026",       color: "#059669", bg: "#ecfdf5" },
  { label: "Bebas Fakultas Pending",  value: "5",  sub: "Verifikasi diperlukan",    color: "#b45309", bg: "#fffbeb" },
];

type SkStatus = "Pending" | "Siap Terbit" | "Diterbitkan";

const SK_LIST: Array<{
  no: string; jenis: string; nama: string; nidn: string; untuk: string; tgl: string; status: SkStatus;
}> = [
  { no: "SK-2026-0081", jenis: "Pembimbing I",  nama: "Dr. Hendra Saputra, M.T.",   nidn: "1012345678", untuk: "Danu Zen (20101152630045)",       tgl: "29 Jul 2026", status: "Pending" },
  { no: "SK-2026-0082", jenis: "Pembimbing II", nama: "Rina Oktaviani, M.Kom.",      nidn: "1087654321", untuk: "Danu Zen (20101152630045)",       tgl: "29 Jul 2026", status: "Pending" },
  { no: "SK-2026-0079", jenis: "Penguji I",     nama: "Dr. Ahmad Fauzi, M.T.",       nidn: "1023456789", untuk: "Rafi Andika (20101152630089)",    tgl: "28 Jul 2026", status: "Siap Terbit" },
  { no: "SK-2026-0080", jenis: "Penguji II",    nama: "Prof. Budi Santoso, Ph.D",    nidn: "1034567890", untuk: "Rafi Andika (20101152630089)",    tgl: "28 Jul 2026", status: "Siap Terbit" },
  { no: "SK-2026-0077", jenis: "Pembimbing I",  nama: "Dr. Ahmad Fauzi, M.T.",       nidn: "1023456789", untuk: "Siti Rahayu (20101152630101)",    tgl: "25 Jul 2026", status: "Diterbitkan" },
  { no: "SK-2026-0078", jenis: "Pembimbing II", nama: "Sari Indah, M.T.",            nidn: "1011223344", untuk: "Siti Rahayu (20101152630101)",    tgl: "25 Jul 2026", status: "Diterbitkan" },
];

const STATUS_SK: Record<SkStatus, { color: string; bg: string; icon: React.ElementType }> = {
  "Pending":     { color: "#b45309", bg: "#fffbeb", icon: Clock },
  "Siap Terbit": { color: "#4338ca", bg: "#eef2ff", icon: AlertCircle },
  "Diterbitkan": { color: "#059669", bg: "#ecfdf5", icon: CheckCircle2 },
};

const BEBAS = [
  { nim: "20101152630133", nama: "Fajar Nugroho",    prodi: "Teknik Informatika", status: "Menunggu Verifikasi" },
  { nim: "20101152630156", nama: "Laila Safitri",    prodi: "Sistem Informasi",   status: "Menunggu Verifikasi" },
  { nim: "20101152630177", nama: "Gunawan Pratama",  prodi: "Teknik Informatika", status: "Menunggu Verifikasi" },
  { nim: "20101152630099", nama: "Mega Rahayu",      prodi: "Sistem Informasi",   status: "Menunggu Verifikasi" },
  { nim: "20101152630044", nama: "Hendri Kusuma",    prodi: "Teknik Informatika", status: "Menunggu Verifikasi" },
];

export default function AdminFakultasDashboard() {
  return (
    <RoleLayout
      navItems={NAV}
      userName="Dra. Yanti Susanti, M.Pd."
      userCode="NIP: 197605102001122001"
      userRole="Admin Fakultas FIK"
      userUnit="FIK — UPI YPTK Padang"
      accentColor="#4338ca"
    >
      {/* Welcome Banner */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-600 text-white">
              <Shield className="w-3.5 h-3.5" /> Admin Fakultas FIK
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
              Selamat Datang, Ibu Yanti
            </h1>
            <p className="text-xs text-neutral-400 max-w-2xl">
              Terdapat <strong className="text-amber-400">9 SK</strong> menunggu penerbitan dan{" "}
              <strong className="text-indigo-400">5 mahasiswa</strong> perlu verifikasi bebas fakultas.
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0 flex-wrap">
            <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all active:scale-95">
              <FileText className="w-4 h-4" /> Terbitkan SK
            </button>
            <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95">
              <Shield className="w-4 h-4" /> Bebas Fakultas
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11.5px] font-semibold text-slate-500">{s.label}</p>
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            </div>
            <p className="text-4xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Tabel SK (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">Daftar SK Dekan</h2>
            <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Agustus 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["No. SK", "Jenis", "Nama Dosen", "Untuk Mahasiswa", "Tanggal", "Status", "Aksi"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SK_LIST.map((row) => {
                  const cfg = STATUS_SK[row.status];
                  const Icon = cfg.icon;
                  return (
                    <tr key={row.no} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-[10px] text-slate-500 whitespace-nowrap">{row.no}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">{row.jenis}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">{row.nama}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.untuk}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">{row.tgl}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: cfg.bg, color: cfg.color }}>
                          <Icon className="w-2.5 h-2.5" /> {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {row.status !== "Diterbitkan" ? (
                          <button className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all">
                            Generate SK
                          </button>
                        ) : (
                          <button className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all flex items-center gap-1">
                            <Download className="w-3 h-3" /> PDF
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bebas Fakultas panel (1/3) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">Bebas Fakultas</h2>
            <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700">5 Pending</span>
          </div>

          <div className="divide-y divide-slate-100">
            {BEBAS.map((mhs) => (
              <div key={mhs.nim} className="px-4 py-3.5 space-y-2">
                <div>
                  <p className="text-xs font-bold text-slate-800">{mhs.nama}</p>
                  <p className="text-[10px] text-slate-500">{mhs.nim} · {mhs.prodi}</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-50 text-amber-700">
                  <Clock className="w-2.5 h-2.5" /> {mhs.status}
                </span>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 rounded-lg text-[10.5px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verifikasi
                  </button>
                  <button className="w-9 py-1.5 rounded-lg text-[10.5px] font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all flex items-center justify-center">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
