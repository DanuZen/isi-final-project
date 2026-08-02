"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Archive,
  CheckCircle2, Clock, Download,
  ArrowRight, XCircle, Search, Building2,
  FileCheck, ShieldCheck, Activity, Award, UserCheck, ChevronRight,
  TrendingUp, PieChart, BarChart3, Layers
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

const STATS = [
  { label: "SK Pending Terbit",       value: "9",  sub: "Menunggu Ttd Dekan",         color: "#D97706", bgIcon: "bg-amber-500", icon: Clock },
  { label: "SK Diterbitkan",          value: "34", sub: "Bulan Agustus 2026",          color: "#059669", bgIcon: "bg-emerald-600",icon: CheckCircle2 },
  { label: "Dokumen Terarsip",        value: "48", sub: "Terverifikasi Repositori",    color: "#C62828", bgIcon: "bg-[#C62828]",  icon: Archive },
  { label: "Prodi FIK",               value: "5",  sub: "Program Studi Aktif",        color: "#3B82F6", bgIcon: "bg-blue-600",   icon: Building2 },
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
  { id: "1", time: "10m lalu", title: "SK-2026-0081 Diterbitkan", desc: "SK Pembimbing I Dr. Hendra Saputra (Danu Zen) telah sah.", type: "success" },
  { id: "2", time: "1j lalu", title: "Berita Acara Diunggah", desc: "Berita Acara Ujian Sidang Skripsi Teknik Informatika terarsip.", type: "info" },
  { id: "3", time: "3j lalu", title: "Draft SK-2026-0082 Disimpan", desc: "Draft SK Pembimbing II berhasil tersimpan sebagai konsep.", type: "warning" },
  { id: "4", time: "Kemarin", title: "Pengesahan Tanda Tangan Dekan", desc: "Prof. Dr. H. Zulherman menyetujui 5 SK Dekan FIK.", type: "success" },
];

const MONTHLY_TREND = [
  { week: "Minggu 1", total: 8, height: "40%" },
  { week: "Minggu 2", total: 12, height: "65%" },
  { week: "Minggu 3", total: 18, height: "90%" },
  { week: "Minggu 4", total: 10, height: "55%" },
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

          <main className="flex-1 p-3 md:p-5 space-y-3 md:space-y-4 overflow-hidden shell-body flex flex-col min-h-0 justify-between">
            
            {/* ── 1. Welcome Banner (Compact) ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-5 relative">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10.5px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <FileText className="w-3.5 h-3.5 text-white" /> Executive Summary Portal Fakultas Ilmu Komputer
                    </span>
                  </div>
                  <h1 className="text-lg md:text-xl font-black font-display text-white tracking-wide leading-tight">
                    Dashboard Administrasi &amp; Analitik Fakultas
                  </h1>
                  <p className="text-[11.5px] text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Selamat datang, Ibu Yanti. Terdapat <strong className="text-[#C62828] font-bold">9 SK Dekan</strong> menunggu penerbitan dari total <strong className="text-white font-bold">5 Program Studi</strong> FIK.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2 shrink-0">
                  <Link
                    href="/admin-fakultas/sk"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <FileText className="w-3.5 h-3.5 text-white" />
                    <span>Kelola SK Dekan</span>
                  </Link>
                  <Link
                    href="/admin-fakultas/arsip"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 font-display"
                  >
                    <Archive className="w-3.5 h-3.5 text-white" />
                    <span>Arsip Dokumen</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── 2. KPI Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3.5 flex items-center justify-between space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 font-display truncate">{s.label}</p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-black font-display tracking-tight text-slate-900">{s.value}</span>
                        <span className="text-[10px] text-slate-500 font-medium truncate hidden sm:inline">{s.sub}</span>
                      </div>
                    </div>
                    <div className={`w-9 h-9 rounded-2xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                      <IconComp className="w-4.5 h-4.5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── 3. Main Content (FIT TO LAYOUT: flex-1 min-h-0) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 flex-1 min-h-0 items-stretch">
              
              {/* Left Column (2/3 Width): Rekap Table + Charts */}
              <div className="lg:col-span-2 flex flex-col justify-between space-y-3.5 min-h-0 flex-1">
                
                {/* 3A. Card Rekapitulasi SK & Bar Chart Per Prodi */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col justify-between">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm text-slate-900 font-display">Grafik &amp; Rekapitulasi SK per Prodi</h2>
                        <p className="text-[10px] text-slate-400 font-medium">Perbandingan Status Penerbitan SK di Fakultas</p>
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

                  {/* Table with Integrated Horizontal Bar Visuals */}
                  <div className="overflow-x-auto overflow-y-auto w-full touch-pan-x flex-1 min-h-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[700px] border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                        <tr>
                          {["Kode", "Program Studi", "SK Terbit", "SK Pending", "Grafik Rasio"].map((h) => (
                            <th key={h} className="px-3.5 py-2.5 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {PRODI_SUMMARY.map((row) => (
                          <tr key={row.kode} className="hover:bg-slate-50 transition-colors">
                            <td className="px-3.5 py-2.5 font-mono text-[10.5px] font-bold text-slate-900 whitespace-nowrap">{row.kode}</td>
                            <td className="px-3.5 py-2.5 font-bold text-slate-900 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-3.5 py-2.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-100 text-emerald-800 font-display">
                                {row.skDiterbitkan} SK
                              </span>
                            </td>
                            <td className="px-3.5 py-2.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-100 text-amber-800 font-display">
                                {row.skPending} SK
                              </span>
                            </td>
                            <td className="px-3.5 py-2.5 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-32 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                  <div className="bg-[#C62828] h-full rounded-full transition-all duration-500" style={{ width: `${row.rate}%` }} />
                                </div>
                                <span className="font-bold text-[10.5px] text-slate-800 font-mono">{row.rate}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3B. Card Grafik Trend Penerbitan Bulan Ini & Repositori */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between shrink-0 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                        <TrendingUp className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-slate-900 font-display">Trend Penerbitan SK Bulan Agustus 2026</h3>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-100 text-emerald-800 font-display">
                      +18% Bulan Ini
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end pt-1">
                    {MONTHLY_TREND.map((item) => (
                      <div key={item.week} className="flex flex-col items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-bold text-[#C62828] font-mono">{item.total} SK</span>
                        <div className="w-full bg-slate-200 h-14 rounded-lg flex items-end overflow-hidden">
                          <div className="w-full bg-[#C62828] rounded-t-lg transition-all duration-500" style={{ height: item.height }} />
                        </div>
                        <span className="text-[9.5px] font-bold text-slate-500 font-display">{item.week}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (1/3 Width): Pie Analytics Chart & Activity Stream */}
              <div className="flex flex-col justify-between space-y-3.5 min-h-0 flex-1">
                
                {/* 3C. Donut/Pie Analytics Widget */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3 shrink-0">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                      <PieChart className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h3 className="font-bold text-xs text-slate-900 font-display">Komposisi Jenis SK Dekan</h3>
                  </div>

                  {/* Donut Chart Visual Representation */}
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-[#C62828]" strokeDasharray="60, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-blue-600" strokeDasharray="25, 100" strokeDashoffset="-60" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <span className="absolute font-black text-xs text-slate-900 font-mono">43 SK</span>
                    </div>

                    <div className="space-y-1.5 text-[11px] flex-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-[#C62828]" /> SK Pembimbing
                        </span>
                        <strong className="font-mono text-slate-900">60%</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-blue-600" /> SK Penguji
                        </span>
                        <strong className="font-mono text-slate-900">25%</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-slate-300" /> Draft SK
                        </span>
                        <strong className="font-mono text-slate-900">15%</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3D. Activity Log Stream (FIT TO LAYOUT: flex-1 min-h-0) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3 flex-1 min-h-0 flex flex-col justify-between">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                      <Activity className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-slate-900 font-display">Aktivitas Terkini</h3>
                      <p className="text-[9.5px] text-slate-400 font-medium">Audit Trail Realtime</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 overflow-y-auto flex-1 scrollbar-none pr-1">
                    {RECENT_LOGS.map((log) => (
                      <div key={log.id} className="flex gap-2.5 text-xs min-w-0 border-b border-slate-50 pb-2 last:border-none">
                        <div className="w-2 h-2 rounded-full bg-[#C62828] mt-1.5 shrink-0" />
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-bold text-slate-900 font-display truncate text-[11px]">{log.title}</h4>
                            <span className="text-[9px] text-slate-400 font-mono shrink-0">{log.time}</span>
                          </div>
                          <p className="text-[10.5px] text-slate-600 font-medium leading-tight line-clamp-2">{log.desc}</p>
                        </div>
                      </div>
                    ))}
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
