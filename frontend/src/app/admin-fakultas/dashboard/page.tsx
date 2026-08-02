"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Archive,
  CheckCircle2, Clock, Download,
  ArrowRight, XCircle, Search, Building2,
  FileCheck, ShieldCheck, Activity, Award, UserCheck, ChevronRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

const STATS = [
  { label: "SK Pending Terbit",       value: "9",  sub: "Menunggu Tanda Tangan Dekan", color: "#D97706", bgIcon: "bg-amber-500", icon: Clock },
  { label: "SK Diterbitkan",          value: "34", sub: "Bulan Agustus 2026",            color: "#059669", bgIcon: "bg-emerald-600",icon: CheckCircle2 },
  { label: "Dokumen Terarsip",        value: "48", sub: "Terverifikasi di Repositori",    color: "#C62828", bgIcon: "bg-[#C62828]",  icon: Archive },
  { label: "Prodi Terlayani",         value: "5",  sub: "Fakultas Ilmu Komputer",       color: "#3B82F6", bgIcon: "bg-blue-600",   icon: Building2 },
];

interface ProdiSummary {
  kode: string;
  nama: string;
  skDiterbitkan: number;
  skPending: number;
  totalMhs: number;
  rate: number;
}

const PRODI_SUMMARY: ProdiSummary[] = [
  { kode: "IF",  nama: "Teknik Informatika",      skDiterbitkan: 14, skPending: 3, totalMhs: 356, rate: 82 },
  { kode: "SI",  nama: "Sistem Informasi",        skDiterbitkan: 10, skPending: 2, totalMhs: 280, rate: 83 },
  { kode: "SK",  nama: "Sistem Komputer",         skDiterbitkan: 5,  skPending: 2, totalMhs: 142, rate: 71 },
  { kode: "RPL", nama: "Rekayasa Perangkat Lunak", skDiterbitkan: 3,  skPending: 1, totalMhs: 110, rate: 75 },
  { kode: "MI",  nama: "Manajemen Informatika",   skDiterbitkan: 2,  skPending: 1, totalMhs: 95,  rate: 67 },
];

const RECENT_LOGS = [
  { id: "1", time: "10 menit lalu", title: "Penerbitan SK-2026-0081", desc: "SK Pembimbing I Dr. Hendra Saputra (Danu Zen) telah diterbitkan.", type: "success" },
  { id: "2", time: "1 jam lalu", title: "Pengarsipan Berita Acara", desc: "Berita Acara Sidang Skripsi Prodi Teknik Informatika diunggah.", type: "info" },
  { id: "3", time: "3 jam lalu", title: "Penyimpanan Draft SK", desc: "Draft SK-2026-0082 Pembimbing II disimpan oleh Admin Fakultas.", type: "warning" },
  { id: "4", time: "Kemarin 16:30", title: "Pengesahan Tanda Tangan Dekan", desc: "Prof. Dr. H. Zulherman menandatangani 5 SK Dekan secara digital.", type: "success" },
];

export default function AdminFakultasDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          items={NAV}
          userName="Dra. Yanti Susanti, M.Pd."
          userNim="NIP: 197605102001122001"
          roleName="Admin Fakultas"
          prodiName="Fakultas Ilmu Komputer"
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          <Header
            className="shell-header shrink-0"
            userName="Dra. Yanti Susanti, M.Pd."
            userNim="NIP: 197605102001122001"
            userRole="Admin Fakultas"
            prodiName="Fakultas Ilmu Komputer"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-y-auto scrollbar-none shell-body flex flex-col min-h-0">
            
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <FileText className="w-3.5 h-3.5 text-white" /> Executive Summary Portal Fakultas Ilmu Komputer
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Dashboard Administrasi Fakultas
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Selamat datang, Ibu Yanti. Terdapat <strong className="text-[#C62828] font-bold">9 SK Dekan</strong> menunggu penerbitan dari total <strong className="text-white font-bold">5 Program Studi</strong> di Fakultas Ilmu Komputer.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-fakultas/sk"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <FileText className="w-4 h-4 text-white" />
                    <span>Kelola SK Dekan</span>
                  </Link>
                  <Link
                    href="/admin-fakultas/arsip"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 font-display"
                  >
                    <Archive className="w-4 h-4 text-white" />
                    <span>Arsip Dokumen</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center justify-between space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display truncate">{s.label}</p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl md:text-2xl font-black font-display tracking-tight text-slate-900">{s.value}</span>
                        <span className="text-[10px] text-slate-500 font-medium truncate hidden sm:inline">{s.sub}</span>
                      </div>
                    </div>
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-2xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                      <IconComp className="w-4.5 h-4.5 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2-Column Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start flex-1 min-h-0">
              
              {/* Left Column (2/3 Width): Rekap Prodi & Status Repositori */}
              <div className="lg:col-span-2 space-y-4 min-w-0">
                
                {/* 1. Rekapitulasi Penerbitan SK per Program Studi Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-w-0">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm text-slate-900 font-display">Rekapitulasi Administrasi Per Program Studi</h2>
                        <p className="text-[10px] text-slate-400 font-medium">Progress Penerbitan SK Dekan Seluruh Prodi FIK</p>
                      </div>
                    </div>

                    <Link
                      href="/admin-fakultas/sk"
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all font-display flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs active:scale-95 whitespace-nowrap"
                    >
                      <span>Semua SK</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </Link>
                  </div>

                  {/* Touch Swiping Table Wrapper */}
                  <div className="overflow-x-auto overflow-y-auto w-full touch-pan-x flex-1 min-h-0 min-w-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[750px] border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                        <tr>
                          {["Kode", "Program Studi", "SK Diterbitkan", "SK Pending", "Mahasiswa TA", "Rasio Selesai"].map((h) => (
                            <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {PRODI_SUMMARY.map((row) => (
                          <tr key={row.kode} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3.5 font-mono text-[10.5px] font-bold text-slate-900 whitespace-nowrap">{row.kode}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 font-display">
                                {row.skDiterbitkan} SK Resmi
                              </span>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 font-display">
                                {row.skPending} SK Pending
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-mono text-[10.5px] text-slate-700 font-semibold">{row.totalMhs} Mhs</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                                  <div className="bg-[#C62828] h-full rounded-full transition-all duration-500" style={{ width: `${row.rate}%` }} />
                                </div>
                                <span className="font-bold text-[11px] text-slate-800 font-mono">{row.rate}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Summary Card: Repositori Dokumen Digital Fakultas */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <Archive className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 font-display">Ringkasan Repositori Dokumen Resmi</h3>
                        <p className="text-[10px] text-slate-400 font-medium">Arsip Digital Fakultas Terverifikasi</p>
                      </div>
                    </div>

                    <Link
                      href="/admin-fakultas/arsip"
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all font-display flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs active:scale-95"
                    >
                      <span>Lihat Arsip</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1">
                      <p className="text-[10px] font-bold text-rose-800 uppercase tracking-wide font-display">SK Dekan Resmi</p>
                      <p className="text-xl font-black text-slate-900 font-display">34 Berkas</p>
                      <p className="text-[10.5px] text-slate-500 font-medium">Tersimpan di Cloud FIK</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide font-display">Berita Acara Sidang</p>
                      <p className="text-xl font-black text-slate-900 font-display">10 Berkas</p>
                      <p className="text-[10.5px] text-slate-500 font-medium">Status Lengkap Lulus</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
                      <p className="text-[10px] font-bold text-blue-800 uppercase tracking-wide font-display">Transkrip Final TA</p>
                      <p className="text-xl font-black text-slate-900 font-display">4 Berkas</p>
                      <p className="text-[10.5px] text-slate-500 font-medium">Terenkripsi Digital</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (1/3 Width): Recent Log & Dekan E-Signature Status */}
              <div className="space-y-4 min-w-0">
                
                {/* Side Panel 1: Activity Log Stream */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">Aktivitas Administrasi Terkini</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Audit Trail Realtime Fakultas</p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {RECENT_LOGS.map((log) => (
                      <div key={log.id} className="flex gap-3 text-xs min-w-0">
                        <div className="w-2 h-2 rounded-full bg-[#C62828] mt-1.5 shrink-0" />
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-bold text-slate-900 font-display truncate text-[11.5px]">{log.title}</h4>
                            <span className="text-[9.5px] text-slate-400 font-mono shrink-0">{log.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{log.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side Panel 2: E-Signature Integrity Card */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400 font-display uppercase tracking-wider">Status Integrasi Dekan</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white font-display">Tanda Tangan Digital Aktif</h4>
                    <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                      Sistem terhubung secara otomatis ke portal pengesahan Dekan FIK (Prof. Dr. H. Zulherman).
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Versi Enkripsi:</span>
                    <span className="font-mono font-bold text-white">SHA-256 Validated</span>
                  </div>
                </div>

              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
