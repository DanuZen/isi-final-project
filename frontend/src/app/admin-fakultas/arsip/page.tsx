"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  Search, Download, File, ArrowRight, Tag, Filter, Building2
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Bebas Fakultas",  href: "/admin-fakultas/bebas",      icon: <Shield className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

interface ArsipItem {
  id: string;
  namaDokumen: string;
  kategori: string;
  tahun: string;
  ukuran: string;
  tglUpload: string;
  deskripsi: string;
}

const ARSIP_DATA: ArsipItem[] = [
  { id: "DOC-2026-001", namaDokumen: "SK Dekan Pembimbing TA Semester Genap 2025/2026.pdf", kategori: "SK Dekan", tahun: "2026", ukuran: "2.4 MB", tglUpload: "15 Jan 2026", deskripsi: "Surat Keputusan Dekan FIK mengenai penetapan Dosen Pembimbing I dan II Skripsi mahasiswa semester genap 2025/2026." },
  { id: "DOC-2026-002", namaDokumen: "SK Dekan Penguji Seminar & Sidang TA FIK 2025/2026.pdf", kategori: "SK Dekan", tahun: "2026", ukuran: "3.1 MB", tglUpload: "20 Jan 2026", deskripsi: "Surat Penugasan Tim Majelis Penguji Seminar Proposal dan Ujian Sidang Skripsi Fakultas Ilmu Komputer." },
  { id: "DOC-2025-099", namaDokumen: "Rekapitulasi Kelulusan Yudisium FIK Periode I 2025.pdf", kategori: "Yudisium", tahun: "2025", ukuran: "1.8 MB", tglUpload: "10 Des 2025", deskripsi: "Laporan rekapitulasi data mahasiswa lulusan Yudisium FIK Periode I Tahun Ajaran 2025/2026." },
  { id: "DOC-2025-088", namaDokumen: "Pedoman Tata Tulis Tugas Akhir FIK UPI YPTK v2.1.pdf", kategori: "Pedoman TA", tahun: "2025", ukuran: "4.5 MB", tglUpload: "01 Sep 2025", deskripsi: "Panduan format penulisan skripsi, tata cara pengutipan, dan templat resmi Tugas Akhir FIK UPI YPTK." },
];

export default function AdminFakultasArsipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");
  
  // Default select 1st archive item
  const [selectedId, setSelectedId] = useState<string>("DOC-2026-001");

  const filtered = ARSIP_DATA.filter((item) => {
    const matchSearch =
      item.namaDokumen.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchKategori = filterKategori === "Semua" || item.kategori === filterKategori;
    return matchSearch && matchKategori;
  });

  const selected = ARSIP_DATA.find((item) => item.id === selectedId) || filtered[0] || ARSIP_DATA[0];

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dra. Yanti Susanti, M.Pd." userNim="NIP: 197605102001122001" userRole="Admin Fakultas" prodiName="Fakultas Ilmu Komputer" />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <Archive className="w-3.5 h-3.5 text-white" /> Repository Digital Fakultas
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Arsip Dokumen &amp; Berita Acara Fakultas
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Penyimpanan resmi berkas SK Dekan, Berita Acara Yudisium, dan Dokumen Pedoman Tata Tulis Tugas Akhir.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-fakultas/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Dashboard Admin</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                  <Archive className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Tabel Arsip Dokumen ({filtered.length})</h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari nama arsip dokumen..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all font-display"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                  <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                  {["Semua", "SK Dekan", "Yudisium", "Pedoman TA"].map((k) => (
                    <button
                      key={k}
                      onClick={() => setFilterKategori(k)}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all font-display cursor-pointer"
                      style={filterKategori === k ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid layout with Detail Side Panel */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col min-w-0 overflow-x-auto">
                <div className="overflow-y-auto flex-1 scrollbar-none pb-12">
                  <table className="w-full text-xs min-w-[600px] lg:min-w-0">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["Kode Arsip", "Nama Dokumen Resmi", "Kategori", "Tahun", "Ukuran", "Tgl Unggah"].map((h) => (
                          <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((doc) => {
                        const isSelected = selected?.id === doc.id;
                        return (
                          <tr
                            key={doc.id}
                            onClick={() => setSelectedId(doc.id)}
                            className={`transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-rose-50/70 border-l-4 border-l-[#C62828]"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-4 py-3.5 font-mono text-[10.5px] font-bold text-[#C62828] whitespace-nowrap">{doc.id}</td>
                            <td className="px-4 py-3.5 max-w-sm space-y-0.5">
                              <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-display leading-snug">
                                {doc.namaDokumen}
                              </h3>
                              <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">{doc.deskripsi}</p>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1 font-display">
                                <Tag className="w-2.5 h-2.5" /> {doc.kategori}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-slate-600 font-mono font-semibold">{doc.tahun}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-mono text-[10.5px]">{doc.ukuran}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-slate-400 font-mono">{doc.tglUpload}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side Detail Panel Card */}
              {selected && (
                <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-4 overflow-y-auto scrollbar-none">
                    <div className="pb-3 border-b border-slate-100 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-rose-50 text-rose-700 border border-rose-200 font-display">
                          {selected.kategori}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{selected.tahun}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#C62828] font-mono block pt-1">{selected.id}</span>
                      <h3 className="text-sm font-black text-slate-900 font-display leading-snug">{selected.namaDokumen}</h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Ukuran Berkas &amp; Tgl Upload</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-mono">{selected.ukuran} · <span className="text-slate-500 font-normal">{selected.tglUpload}</span></p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Penerbit Dokumen:</span>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#C62828] shrink-0" />
                          <span className="font-bold text-slate-800 text-[11px] font-display">Fakultas Ilmu Komputer</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">Universitas Putra Indonesia YPTK Padang</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display mb-1">Keterangan / Deskripsi Arsip</p>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11.5px] text-slate-700 leading-relaxed font-medium">
                          {selected.deskripsi}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => alert(`Mengunduh berkas arsip resmi ${selected.namaDokumen}...`)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-white" />
                      <span>Unduh Berkas Arsip PDF</span>
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
