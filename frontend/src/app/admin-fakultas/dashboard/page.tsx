"use client";

import React, { useState } from "react";
import {
  Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { PageBanner,
  bannerPrimaryBtn,
  bannerSecondaryBtn } from "@/components/layout/page-banner";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Archive,
  CheckCircle2,
  Clock,
  Download,
  ArrowRight,
  XCircle,
  Search,
  Building2,
  FileCheck,
  ShieldCheck,
  Activity,
  Award,
  UserCheck,
  ChevronRight,
  TrendingUp,
  PieChart,
  BarChart3,
  Layers,
  Users,
  BookOpen,
  GraduationCap,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

const STATS = [
  { label: "SK Pending",              value: "9",  sub: "Menunggu Ttd Dekan",         color: "#D97706", bgIcon: "bg-amber-500", icon: Clock },
  { label: "SK Diterbitkan",          value: "34", sub: "Bulan Agustus 2026",          color: "#059669", bgIcon: "bg-emerald-600",icon: CheckCircle2 },
  { label: "Dokumen Terarsip",        value: "48", sub: "Terverifikasi Repositori",    color: "#2563eb", bgIcon: "bg-[#2563eb]",  icon: Archive },
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

export default function AdminFakultasDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileTab, setMobileTab] = useState<"rekap" | "repositori" | "komposisi" | "aktivitas">("rekap");

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

          <main className="flex-1 px-3 py-3 md:p-5 pt-16 space-y-3 md:space-y-4 overflow-y-auto lg:overflow-hidden shell-body flex flex-col min-h-0 justify-between md:pt-0">
            
            {/* ── 1. Welcome Banner (Standard Page Banner) ── */}
            <PageBanner
              title="Dashboard Fakultas Ilmu Komputer"
              description="Monitoring terintegrasi progres Tugas Akhir seluruh program studi di lingkungan Fakultas Ilmu Komputer PT MBOIS."
              stats={[
                { icon: Users, value: "480+ Mhs", label: "Peserta TA FIK" },
                { icon: BookOpen, value: "3 Prodi", label: "TI, SI, RPL" },
                { icon: GraduationCap, value: "94.2% Lulus", label: "Tepat Waktu" },
              ]}
              actions={
                <>
                  <Link
                    href="/admin-fakultas/sk"
                    className={bannerPrimaryBtn}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Penerbitan SK</span>
                  </Link>
                  <Link
                    href="/admin-fakultas/arsip"
                    className={bannerSecondaryBtn}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bebas Tanggungan</span>
                  </Link>
                </>
              }
            />

            {/* ── 2. KPI Stat Cards (Mobile Optimized Grid) ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3 md:p-3.5 flex items-center justify-between space-x-2 md:space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="text-[9px] md:text-[9.5px] font-bold uppercase tracking-wider text-slate-400 font-display truncate">{s.label}</p>
                      <div className="flex items-baseline space-x-1.5 md:space-x-2">
                        <span className="text-lg md:text-xl font-black font-display tracking-tight text-slate-900">{s.value}</span>
                        <span className="text-[9.5px] md:text-[10px] text-slate-500 font-medium truncate hidden sm:inline">{s.sub}</span>
                      </div>
                    </div>
                    <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl md:rounded-2xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                      <IconComp className="w-4 h-4 md:w-4.5 md:h-4.5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Mobile Section Navigation Pills (Swipeable Segmented Control, No 'Semua') ── */}
            <div className="bg-slate-100/90 border border-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1 overflow-x-auto touch-pan-x scrollbar-none shrink-0 lg:hidden">
              {[
                { id: "rekap", label: "Rekap Prodi", icon: BarChart3 },
                { id: "repositori", label: "Arsip Repositori", icon: Archive },
                { id: "komposisi", label: "Komposisi SK", icon: PieChart },
                { id: "aktivitas", label: "Aktivitas", icon: Activity },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = mobileTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setMobileTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold font-display whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 ${
                      isActive
                        ? "bg-white text-[#2563eb] shadow-xs"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isActive ? "text-[#2563eb]" : "text-slate-500"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ── 3. Main Content Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 flex-1 min-h-0 items-stretch">
              
              {/* Left Column (2/3 Width on Desktop): Rekap Table + Rich Repository Cards */}
              <div className="lg:col-span-2 flex flex-col justify-between space-y-3.5 min-h-0 flex-1">
                
                {/* 3A. Card Rekapitulasi SK & Bar Chart Per Prodi */}
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col justify-between ${
                  mobileTab === "rekap" ? "block" : "hidden lg:flex"
                }`}>
                  <div className="p-3 md:p-3.5 border-b border-slate-100 flex items-center justify-between gap-2.5 shrink-0 bg-white">
                    <div className="flex items-center gap-2 md:gap-2.5 min-w-0 flex-1">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Grafik &amp; Rekapitulasi SK per Prodi</h2>
                        <p className="text-[9.5px] md:text-[10px] text-slate-400 font-medium truncate">Perbandingan Status Penerbitan SK di Fakultas</p>
                      </div>
                    </div>

                    <Link
                      href="/admin-fakultas/sk"
                      className="px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-xl text-[11px] md:text-xs font-bold bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all font-display flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs active:scale-95 whitespace-nowrap"
                    >
                      <span>Semua SK</span>
                      <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                    </Link>
                  </div>

                  {/* Touch Swiping Table Wrapper */}
                  <div className="overflow-x-auto overflow-y-auto w-full touch-pan-x flex-1 min-h-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[650px] md:min-w-[700px] border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                        <tr>
                          {["Kode", "Program Studi", "SK Terbit", "SK Pending", "Grafik Rasio"].map((h) => (
                            <th key={h} className="px-3 md:px-3.5 py-2.5 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {PRODI_SUMMARY.map((row) => (
                          <tr key={row.kode} className="hover:bg-slate-50 transition-colors">
                            <td className="px-3 md:px-3.5 py-2.5 font-mono text-[10.5px] font-bold text-slate-900 whitespace-nowrap">{row.kode}</td>
                            <td className="px-3 md:px-3.5 py-2.5 font-bold text-slate-900 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-3 md:px-3.5 py-2.5 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-100 text-emerald-800 font-display">
                                {row.skDiterbitkan} SK
                              </span>
                            </td>
                            <td className="px-3 md:px-3.5 py-2.5 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-100 text-amber-800 font-display">
                                {row.skPending} SK
                              </span>
                            </td>
                            <td className="px-3 md:px-3.5 py-2.5 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-24 md:w-32 bg-slate-100 h-2 md:h-2.5 rounded-full overflow-hidden">
                                  <div className="bg-[#2563eb] h-full rounded-full transition-all duration-500" style={{ width: `${row.rate}%` }} />
                                </div>
                                <span className="font-bold text-[10px] md:text-[10.5px] text-slate-800 font-mono">{row.rate}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3B. Card Ringkasan Repositori Dokumen Terkini (Rich Preview Cards) */}
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-3.5 md:p-5 flex flex-col space-y-3 md:space-y-3.5 shrink-0 ${
                  mobileTab === "repositori" ? "block" : "hidden lg:flex"
                }`}>
                  <div className="flex items-center justify-between pb-2.5 md:pb-3 border-b border-slate-100 shrink-0 gap-2 min-w-0">
                    <div className="flex items-center gap-2 md:gap-2.5 min-w-0 flex-1">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                        <Archive className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Ringkasan Dokumen Repositori</h3>
                        <p className="text-[9.5px] md:text-[10px] text-slate-400 font-medium truncate">Berkas Arsip Resmi Terverifikasi</p>
                      </div>
                    </div>

                    <Link
                      href="/admin-fakultas/arsip"
                      className="px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-xl text-[11px] md:text-xs font-bold bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all font-display flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs active:scale-95 whitespace-nowrap"
                    >
                      <span>Lihat Arsip</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3">
                    {/* Card 1: SK Dekan Resmi */}
                    <div className="p-3.5 md:p-4 rounded-2xl bg-[#2563eb] text-white space-y-2.5 md:space-y-3 shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-white" />
                          <span className="text-[10px] md:text-[10.5px] font-extrabold text-rose-100 uppercase tracking-wider font-display truncate">SK Dekan Resmi</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[8.5px] md:text-[9px] font-bold bg-white/20 text-white font-mono">PDF</span>
                      </div>

                      <div className="space-y-0.5">
                        <p className="text-xl md:text-2xl font-black text-white font-display">34 <span className="text-xs font-normal text-rose-100 font-sans">Berkas</span></p>
                        <p className="text-[10px] md:text-[10.5px] text-rose-100 font-medium truncate">Terverifikasi Cloud FIK</p>
                      </div>

                      <div className="p-2 md:p-2.5 rounded-xl bg-black/20 border border-white/10 space-y-0.5 text-[10px] md:text-[10.5px]">
                        <div className="flex items-center justify-between text-white font-medium">
                          <span className="font-mono text-[9.5px] text-rose-200">SK-2026-0081</span>
                          <span className="text-[9px] text-rose-200">29 Jul</span>
                        </div>
                        <p className="text-white font-bold truncate text-[10.5px]">Dr. Hendra Saputra</p>
                      </div>
                    </div>

                    {/* Card 2: Berita Acara Sidang */}
                    <div className="p-3.5 md:p-4 rounded-2xl bg-emerald-700 text-white space-y-2.5 md:space-y-3 shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-white" />
                          <span className="text-[10px] md:text-[10.5px] font-extrabold text-emerald-100 uppercase tracking-wider font-display truncate">Berita Acara Sidang</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[8.5px] md:text-[9px] font-bold bg-white/20 text-white font-mono">DOC</span>
                      </div>

                      <div className="space-y-0.5">
                        <p className="text-xl md:text-2xl font-black text-white font-display">10 <span className="text-xs font-normal text-emerald-100 font-sans">Berkas</span></p>
                        <p className="text-[10px] md:text-[10.5px] text-emerald-100 font-medium truncate">Status Lengkap Lulus</p>
                      </div>

                      <div className="p-2 md:p-2.5 rounded-xl bg-black/20 border border-white/10 space-y-0.5 text-[10px] md:text-[10.5px]">
                        <div className="flex items-center justify-between text-white font-medium">
                          <span className="font-mono text-[9.5px] text-emerald-200">BA-IF-2026</span>
                          <span className="text-[9px] text-emerald-200">28 Jul</span>
                        </div>
                        <p className="text-white font-bold truncate text-[10.5px]">Ujian Sidang Skripsi IF</p>
                      </div>
                    </div>

                    {/* Card 3: Transkrip Final TA */}
                    <div className="p-3.5 md:p-4 rounded-2xl bg-slate-900 text-white space-y-2.5 md:space-y-3 shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-white" />
                          <span className="text-[10px] md:text-[10.5px] font-extrabold text-slate-300 uppercase tracking-wider font-display truncate">Transkrip Final TA</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[8.5px] md:text-[9px] font-bold bg-white/20 text-white font-mono">SSO</span>
                      </div>

                      <div className="space-y-0.5">
                        <p className="text-xl md:text-2xl font-black text-white font-display">4 <span className="text-xs font-normal text-slate-300 font-sans">Berkas</span></p>
                        <p className="text-[10px] md:text-[10.5px] text-slate-300 font-medium truncate">Terenkripsi Digital</p>
                      </div>

                      <div className="p-2 md:p-2.5 rounded-xl bg-white/10 border border-white/10 space-y-0.5 text-[10px] md:text-[10.5px]">
                        <div className="flex items-center justify-between text-white font-medium">
                          <span className="font-mono text-[9.5px] text-slate-400">TRK-2026-004</span>
                          <span className="text-[9px] text-slate-400">25 Jul</span>
                        </div>
                        <p className="text-white font-bold truncate text-[10.5px]">Transkrip Siti Rahayu</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (1/3 Width on Desktop): Donut Chart & Activity Stream */}
              <div className="flex flex-col justify-between space-y-3.5 min-h-0 flex-1">
                
                {/* 3C. Donut/Pie Analytics Widget */}
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-3.5 md:p-4 space-y-3 shrink-0 ${
                  mobileTab === "komposisi" ? "block" : "hidden lg:block"
                }`}>
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                      <PieChart className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-xs text-slate-900 font-display truncate">Komposisi Jenis SK Dekan</h3>
                      <p className="text-[9.5px] text-slate-400 font-medium truncate">Distribusi Peran Pembimbing &amp; Penguji</p>
                    </div>
                  </div>

                  {/* Donut Chart Visual Representation (Centered Chart on Top, Legend Below) */}
                  <div className="flex flex-col items-center justify-center gap-3 p-3.5 md:p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center my-0.5 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-200" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-[#2563eb]" strokeDasharray="60, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-blue-600" strokeDasharray="25, 100" strokeDashoffset="-60" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute text-center">
                        <p className="font-black text-lg md:text-xl text-slate-900 font-mono leading-none">43</p>
                        <p className="text-[9px] md:text-[9.5px] font-bold text-slate-400 font-display uppercase tracking-widest mt-0.5">Total SK</p>
                      </div>
                    </div>

                    <div className="w-full space-y-2 text-xs pt-2 border-t border-slate-200/70">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-bold text-slate-700 text-[11px] md:text-xs">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" /> SK Pembimbing
                        </span>
                        <strong className="font-mono text-slate-900 font-extrabold text-[11px] md:text-xs">60% <span className="text-[9.5px] md:text-[10.5px] text-slate-400 font-medium">(26 SK)</span></strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-bold text-slate-700 text-[11px] md:text-xs">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> SK Penguji
                        </span>
                        <strong className="font-mono text-slate-900 font-extrabold text-[11px] md:text-xs">25% <span className="text-[9.5px] md:text-[10.5px] text-slate-400 font-medium">(11 SK)</span></strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-bold text-slate-700 text-[11px] md:text-xs">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Draft SK Concept
                        </span>
                        <strong className="font-mono text-slate-900 font-extrabold text-[11px] md:text-xs">15% <span className="text-[9.5px] md:text-[10.5px] text-slate-400 font-medium">(6 SK)</span></strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3D. Activity Log Stream */}
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-3.5 md:p-4 space-y-3 flex-1 min-h-0 flex flex-col justify-between ${
                  mobileTab === "aktivitas" ? "block" : "hidden lg:flex"
                }`}>
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 shrink-0">
                    <div className="w-7 h-7 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                      <Activity className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-xs text-slate-900 font-display truncate">Aktivitas Terkini</h3>
                      <p className="text-[9.5px] text-slate-400 font-medium truncate">Audit Trail Realtime</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 overflow-y-auto flex-1 scrollbar-none pr-1 max-h-56 lg:max-h-none">
                    {RECENT_LOGS.map((log) => (
                      <div key={log.id} className="flex gap-2.5 text-xs min-w-0 border-b border-slate-50 pb-2 last:border-none">
                        <div className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 shrink-0" />
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
