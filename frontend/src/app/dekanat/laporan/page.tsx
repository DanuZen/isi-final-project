"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  Download, FileText, ArrowRight, Search, Filter, ShieldCheck, CheckCircle2, Building2,
  ChevronDown, Check, ArrowLeft
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Komparasi Prodi",    href: "/dekanat/prodi",       icon: <Building2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

interface LaporanItem {
  id: string;
  nama: string;
  kategori: "Kelulusan" | "Kinerja Dosen" | "Evaluasi Studi";
  periode: string;
  tgl: string;
  ukuran: string;
  deskripsi: string;
  ringkasan: string[];
}

const LAPORAN_LIST: LaporanItem[] = [
  {
    id: "LAP-2026-01",
    nama: "Laporan Rekapitulasi Kelulusan TA Genap 2025/2026",
    kategori: "Kelulusan",
    periode: "Semester Genap 2025/2026",
    tgl: "28 Jul 2026",
    ukuran: "3.4 MB",
    deskripsi: "Rekapitulasi resmi tingkat kelulusan, rata-rata IPK kelulusan, serta persentase masa studi mahasiswa TA Fakultas Ilmu Komputer.",
    ringkasan: [
      "Total Lulusan Periode Ini: 89 Mahasiswa",
      "Rata-rata IPK Kelulusan: 3.58 (Cumlaude)",
      "Persentase Tepat Waktu (≤ 8 sem): 82.4%"
    ]
  },
  {
    id: "LAP-2026-02",
    nama: "Laporan Beban Kinerja Bimbingan Dosen FIK 2025/2026",
    kategori: "Kinerja Dosen",
    periode: "Semester Genap 2025/2026",
    tgl: "25 Jul 2026",
    ukuran: "1.9 MB",
    deskripsi: "Laporan distribusional beban bimbingan dosen pembimbing 1 & 2 serta rasio kelulusan per dosen pembimbing.",
    ringkasan: [
      "Total Dosen Pembimbing Aktif: 42 Dosen",
      "Rata-Rata Bimbingan: 6.2 Mahasiswa/Dosen",
      "Dosen Terproduktif: Dr. Sarjon Defit (12 Lulusan)"
    ]
  },
  {
    id: "LAP-2025-04",
    nama: "Laporan Evaluasi Rata-Rata Masalah Studi Mahasiswa 2025",
    kategori: "Evaluasi Studi",
    periode: "Tahun Akademik 2024/2025",
    tgl: "15 Des 2025",
    ukuran: "4.1 MB",
    deskripsi: "Evaluasi hambatan utama mahasiswa TA (revisi berulang, kendala biaya, kelengkapan berkas bebas fakultas).",
    ringkasan: [
      "Faktor Utama Kendala: Verifikasi Berkas Manual",
      "Solusi Strategis: SK Dekan Digital Online",
      "Prospek Efisiensi: Mempercepat Studi 1.2 Bulan"
    ]
  },
];

export default function DekanatLaporanPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterKat, setFilterKat] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("LAP-2026-01");
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const filtered = LAPORAN_LIST.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchKat = filterKat === "Semua" || item.kategori === filterKat;
    return matchSearch && matchKat;
  });

  const selected = LAPORAN_LIST.find((item) => item.id === selectedId) || filtered[0] || LAPORAN_LIST[0];

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          items={NAV}
          userName="Prof. Dr. H. Zulherman, M.T."
          userNim="NIP: 196508201990031001"
          roleName="Dekan FIK"
          prodiName="Fakultas Ilmu Komputer"
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header
            className="shell-header shrink-0"
            userName="Prof. Dr. H. Zulherman, M.T."
            userNim="NIP: 196508201990031001"
            userRole="Dekan FIK"
            prodiName="Fakultas Ilmu Komputer"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <FileDown className="w-3.5 h-3.5 text-white" /> Unduh Dokumen Eksekutif
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Laporan Eksekutif &amp; Rekapitulasi Yudisium
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pusat unduhan laporan PDF berkala kelulusan mahasiswa, rekapitulasi nilai, serta evaluasi beban bimbingan dosen FIK.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Dashboard Dekan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Grid Layout with Live Side Detail Panel Card */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex-col min-w-0 ${
                showMobileDetail ? "hidden lg:flex" : "flex"
              }`}>
                {/* Integrated Table Card Header + Controls */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-white">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Arsip Laporan Eksekutif</h2>
                      <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Dokumen Tersedia</p>
                    </div>
                  </div>

                  {/* 1-Row Controls: Search Input + Animated Dropdown Filter */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-52 min-w-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Cari laporan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-7 pr-2 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all w-full font-display"
                      />
                    </div>

                    {/* Custom Animated Dropdown Filter */}
                    <div className="relative shrink-0 font-display">
                      <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[90px] sm:max-w-[120px]">{filterKat}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${isFilterOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isFilterOpen && (
                        <>
                          <div className="fixed inset-0 z-20" onClick={() => setIsFilterOpen(false)} />
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                            {["Semua", "Kelulusan", "Kinerja Dosen", "Evaluasi Studi"].map((k) => (
                              <button
                                key={k}
                                onClick={() => {
                                  setFilterKat(k);
                                  setIsFilterOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                  filterKat === k ? "bg-[#C62828] text-white" : "text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span>{k}</span>
                                {filterKat === k && <Check className="w-3.5 h-3.5 text-white" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Table with Touch-Pan-X Smooth Container */}
                <div className="overflow-y-auto flex-1 scrollbar-none flex flex-col min-h-0">
                  <div className="overflow-x-auto w-full touch-pan-x flex-1 min-w-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[850px] border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                        <tr>
                          {["Kode", "Judul Laporan Eksekutif", "Kategori Laporan", "Periode Akademik", "Ukuran PDF", "Tgl Terbit"].map((h) => (
                            <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filtered.map((row) => {
                          const isSelected = selected?.id === row.id;
                          return (
                            <tr
                              key={row.id}
                              onClick={() => {
                                setSelectedId(row.id);
                                setShowMobileDetail(true);
                              }}
                              className={`transition-all cursor-pointer select-none ${
                                isSelected
                                  ? "bg-slate-100 font-bold"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <td className="px-4 py-3.5 font-mono text-[10.5px] font-bold text-slate-900 whitespace-nowrap">{row.id}</td>
                              <td className="px-4 py-3.5 font-bold text-slate-900 font-display">{row.nama}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#C62828] text-white font-display shadow-2xs">
                                  {row.kategori}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 font-medium">{row.periode}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-mono text-[11px] font-semibold">{row.ukuran}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 text-[11px] font-medium">{row.tgl}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Side Detail Panel (Strict 350px Width Lock on Desktop) */}
              {selected && (
                <div className={`w-full lg:w-[350px] lg:min-w-[350px] lg:max-w-[350px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150 ${
                  showMobileDetail ? "flex flex-1" : "hidden lg:flex"
                }`}>
                  <div className="space-y-4 overflow-y-auto scrollbar-none min-w-0">
                    
                    {/* Header (Matching Reference Design) */}
                    <div className="pb-3 border-b border-slate-100 space-y-2 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        {/* Mobile Back Button (Matching Reference Pill ← Kembali) */}
                        <button
                          onClick={() => setShowMobileDetail(false)}
                          className="lg:hidden px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                        >
                          <ArrowLeft className="w-3.5 h-3.5 text-[#C62828]" />
                          <span>Kembali</span>
                        </button>

                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-[#C62828] text-white font-display shadow-2xs">
                          {selected.kategori}
                        </span>
                        <span className="font-mono text-xs font-black text-slate-600 bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-full shrink-0 shadow-2xs ml-auto">
                          {selected.id}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 font-display leading-snug break-words">{selected.nama}</h3>
                    </div>

                    <div className="space-y-3 text-xs min-w-0">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display mb-1">Deskripsi Dokumen</p>
                        <p className="text-slate-600 leading-relaxed font-medium">{selected.deskripsi}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Ringkasan Analitik PDF:</span>
                        <div className="space-y-1.5">
                          {selected.ringkasan.map((r, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-800 font-semibold leading-tight">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="break-words">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Solid Amber Authorization Card */}
                      <div className="p-3.5 rounded-xl bg-amber-500 text-white shadow-xs text-[11px] font-semibold space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 font-bold">
                          <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                          <span>Otorisasi Akses Dekanat</span>
                        </div>
                        <p className="text-[10.5px] text-white/90 font-medium leading-normal">Dokumen ini disahkan oleh Dekan FIK Prof. Dr. H. Zulherman, M.T. &amp; berstempel resmi digital.</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => alert(`Mengunduh berkas ${selected.nama}.pdf (${selected.ukuran})...`)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-white" />
                      <span>Unduh Dokumen PDF Resmi</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
