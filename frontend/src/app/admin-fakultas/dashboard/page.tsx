"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  CheckCircle2, Clock, Download, Eye, AlertCircle,
  Building2, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Bebas Fakultas",  href: "/admin-fakultas/bebas",      icon: <Shield className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

const STATS = [
  { label: "SK Pending Terbit",       value: "9",  sub: "Menunggu Penandatanganan Dekan", color: "#F59E0B", bgIcon: "bg-[#F59E0B]", icon: Clock },
  { label: "SK Diterbitkan",          value: "34", sub: "Bulan Agustus 2026",            color: "#059669", bgIcon: "bg-emerald-600",icon: CheckCircle2 },
  { label: "Bebas Fakultas Pending",  value: "5",  sub: "Verifikasi Diperlukan",          color: "#C62828", bgIcon: "bg-[#C62828]",  icon: Shield },
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

const STATUS_SK_SOLID: Record<SkStatus, { bg: string }> = {
  "Pending":     { bg: "bg-amber-600" },
  "Siap Terbit": { bg: "bg-[#C62828]" },
  "Diterbitkan": { bg: "bg-emerald-600" },
};

const BEBAS = [
  { nim: "20101152630133", nama: "Fajar Nugroho",    prodi: "Teknik Informatika", status: "Menunggu Verifikasi" },
  { nim: "20101152630156", nama: "Laila Safitri",    prodi: "Sistem Informasi",   status: "Menunggu Verifikasi" },
  { nim: "20101152630177", nama: "Gunawan Pratama",  prodi: "Teknik Informatika", status: "Menunggu Verifikasi" },
  { nim: "20101152630099", nama: "Mega Rahayu",      prodi: "Sistem Informasi",   status: "Menunggu Verifikasi" },
  { nim: "20101152630044", nama: "Hendri Kusuma",    prodi: "Teknik Informatika", status: "Menunggu Verifikasi" },
];

export default function AdminFakultasDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Unified Standard Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Unified Standard Header */}
          <Header
            className="shell-header shrink-0"
            userName="Dra. Yanti Susanti, M.Pd."
            userNim="NIP: 197605102001122001"
            userRole="Admin Fakultas"
            prodiName="Fakultas Ilmu Komputer"
          />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">
            
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <Shield className="w-3.5 h-3.5 text-white" /> Portal Administrasi Fakultas Ilmu Komputer
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Dashboard Admin Fakultas
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Selamat datang, Ibu Yanti. Terdapat <strong className="text-[#C62828] font-bold">9 SK Dekan</strong> menunggu penerbitan dan <strong className="text-amber-400 font-bold">5 berkas mahasiswa</strong> menunggu bebas fakultas.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-fakultas/sk"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <FileText className="w-4 h-4 text-white" />
                    <span>Penerbitan SK Dekan</span>
                  </Link>
                  <Link
                    href="/admin-fakultas/bebas"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 font-display"
                  >
                    <Shield className="w-4 h-4 text-white" />
                    <span>Bebas Fakultas</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* ── 3 Executive Stat Cards (SOLID ICON BOX WITH WHITE ICON) ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center justify-between space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-500 font-display leading-tight">{s.label}</p>
                      <p className="text-2xl sm:text-3xl font-black font-display" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[10px] text-slate-400 font-semibold truncate">{s.sub}</p>
                    </div>
                    {/* SOLID COLOR ICON BOX WITH WHITE ICON */}
                    <div className={`w-11 h-11 rounded-xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                      <IconComp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Grid Content Section ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-hidden">
              
              {/* Tabel SK Dekan (2/3) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Daftar SK Dekan Terbaru</h2>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-display">
                    Agustus 2026
                  </span>
                </div>

                <div className="overflow-y-auto flex-1 scrollbar-none pb-10">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["No. SK", "Jenis", "Nama Dosen", "Untuk Mahasiswa", "Tanggal", "Status", "Aksi"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {SK_LIST.map((row) => {
                        const statusCfg = STATUS_SK_SOLID[row.status];
                        return (
                          <tr key={row.no} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-mono text-[10px] text-slate-500 whitespace-nowrap">{row.no}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 font-display">{row.jenis}</span>
                            </td>
                            <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.untuk}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-slate-400 font-mono">{row.tgl}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs font-display ${statusCfg.bg}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {row.status !== "Diterbitkan" ? (
                                <button className="px-3 py-1.5 rounded-xl text-[10.5px] font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white transition-all shadow-xs cursor-pointer font-display active:scale-95">
                                  Generate SK
                                </button>
                              ) : (
                                <button className="px-3 py-1.5 rounded-xl text-[10.5px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1 cursor-pointer font-display">
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

              {/* Bebas Fakultas Panel (1/3) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Bebas Fakultas</h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-2xs font-display">
                    5 Pending
                  </span>
                </div>

                <div className="divide-y divide-slate-100 overflow-y-auto flex-1 scrollbar-none pb-10">
                  {BEBAS.map((mhs) => (
                    <div key={mhs.nim} className="p-4 space-y-2 hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-xs font-bold text-slate-900 font-display">{mhs.nama}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{mhs.nim} · {mhs.prodi}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-600 text-white shadow-2xs font-display">
                        <Clock className="w-2.5 h-2.5 text-white" /> {mhs.status}
                      </span>
                      <div className="flex gap-2 pt-1">
                        <button className="flex-1 py-1.5 rounded-xl text-[10.5px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer font-display active:scale-95">
                          <CheckCircle2 className="w-3 h-3 text-white" /> Verifikasi
                        </button>
                        <button className="w-9 py-1.5 rounded-xl text-[10.5px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center justify-center cursor-pointer">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
