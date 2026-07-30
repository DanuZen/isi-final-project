"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  Search, Download, File, ArrowRight
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
}

const ARSIP_DATA: ArsipItem[] = [
  { id: "DOC-2026-001", namaDokumen: "SK Dekan Pembimbing TA Semester Genap 2025/2026.pdf", kategori: "SK Dekan", tahun: "2026", ukuran: "2.4 MB", tglUpload: "15 Jan 2026" },
  { id: "DOC-2026-002", namaDokumen: "SK Dekan Penguji Seminar & Sidang TA FIK 2025/2026.pdf", kategori: "SK Dekan", tahun: "2026", ukuran: "3.1 MB", tglUpload: "20 Jan 2026" },
  { id: "DOC-2025-099", namaDokumen: "Rekapitulasi Kelulusan Yudisium FIK Periode I 2025.pdf", kategori: "Yudisium", tahun: "2025", ukuran: "1.8 MB", tglUpload: "10 Des 2025" },
  { id: "DOC-2025-088", namaDokumen: "Pedoman Tata Tulis Tugas Akhir FIK UPI YPTK v2.1.pdf", kategori: "Pedoman TA", tahun: "2025", ukuran: "4.5 MB", tglUpload: "01 Sep 2025" },
];

export default function AdminFakultasArsipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  const filtered = ARSIP_DATA.filter(
    (item) =>
      item.namaDokumen.toLowerCase().includes(search.toLowerCase()) ||
      item.kategori.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Admin Fakultas FIK" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dra. Yanti Susanti, M.Pd." userNim="NIP: 197605102001122001" userRole="Admin Fakultas FIK" prodiName="FIK UPI YPTK" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-600 text-white shadow-xs">
                      <Archive className="w-3.5 h-3.5" /> Repository Digital Fakultas
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Arsip Dokumen &amp; Berita Acara Fakultas
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Penyimpanan resmi berkas SK Dekan, Berita Acara Yudisium, dan Dokumen Pedoman Tata Tulis Tugas Akhir.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-fakultas/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Dashboard Admin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Archive className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Pencarian Dokumen Arsip</h2>
              </div>

              <div className="relative flex-1 max-w-md ml-auto">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari nama arsip dokumen..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all"
                />
              </div>
            </div>

            {/* Grid Arsip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
              {filtered.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex items-center justify-between gap-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                      <File className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 truncate font-display" title={doc.namaDokumen}>{doc.namaDokumen}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-bold text-slate-600">{doc.kategori}</span>
                        <span>{doc.ukuran}</span>
                        <span>• {doc.tglUpload}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all shrink-0 flex items-center gap-1.5 shadow-xs active:scale-95">
                    <Download className="w-3.5 h-3.5" /> Unduh
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
