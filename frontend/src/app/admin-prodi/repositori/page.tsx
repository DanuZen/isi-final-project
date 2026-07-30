"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  Search, Filter, FileText, Tag, ArrowRight, Eye, ChevronRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",           href: "/admin-prodi/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa", href: "/admin-prodi/mahasiswa",  icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",       href: "/admin-prodi/aktivasi",   icon: <UserPlus className="w-4 h-4" /> },
  { label: "Jadwal Seminar",      href: "/admin-prodi/jadwal",     icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori",          href: "/admin-prodi/repositori", icon: <BookOpen className="w-4 h-4" /> },
];

interface RepoItem {
  id: string;
  judul: string;
  penulis: string;
  nim: string;
  tahun: string;
  bidang: string;
  pembimbing: string;
  abstrak: string;
}

const REPO_DATA: RepoItem[] = [
  {
    id: "TA-2025-001",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web Menggunakan Metode FIFO",
    penulis: "Danu Zen", nim: "20101152630045", tahun: "2026",
    bidang: "Rekayasa Perangkat Lunak", pembimbing: "Dr. Sarjon Defit",
    abstrak: "Penelitian ini mengimplementasikan sistem manajemen inventaris gudang berbasis web dengan prinsip pencatatan FIFO untuk meningkatkan efisiensi stok barang."
  },
  {
    id: "TA-2025-002",
    judul: "Implementasi Machine Learning untuk Deteksi Spam Email Menggunakan Naive Bayes",
    penulis: "Rafi Andika", nim: "20101152630089", tahun: "2026",
    bidang: "Kecerdasan Buatan", pembimbing: "Dr. Sarjon Defit",
    abstrak: "Pengaplikasian algoritma Naive Bayes classifier dalam mengklasifikasikan email spam dengan tingkat akurasi hingga 94.2%."
  },
  {
    id: "TA-2025-003",
    judul: "Optimisasi Algoritma Routing Jaringan Komputer Menggunakan Dijkstra Modified",
    penulis: "Siti Rahayu", nim: "20101152630101", tahun: "2026",
    bidang: "Jaringan & Keamanan", pembimbing: "Prof. Budi Santoso, Ph.D",
    abstrak: "Studi modifikasi algoritma Dijkstra untuk menentukan rute terpendek dengan latency minimal pada infrastruktur jaringan enterprise."
  },
  {
    id: "TA-2025-004",
    judul: "Analisis Sentimen Review Produk Marketplace Online Menggunakan Algoritma BERT",
    penulis: "Fajar Nugroho", nim: "20101152630133", tahun: "2025",
    bidang: "Kecerdasan Buatan", pembimbing: "Prof. Budi Santoso, Ph.D",
    abstrak: "Analisis Opini publik terhadap produk e-commerce berbasis pemrosesan bahasa alami transformer."
  },
];

export default function AdminProdiRepositoriPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterBidang, setFilterBidang] = useState("Semua");
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);

  const filtered = REPO_DATA.filter((r) => {
    const matchSearch =
      r.judul.toLowerCase().includes(search.toLowerCase()) ||
      r.penulis.toLowerCase().includes(search.toLowerCase()) ||
      r.nim.includes(search);
    const matchBidang = filterBidang === "Semua" || r.bidang === filterBidang;
    return matchSearch && matchBidang;
  });

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Hafizah, S.Kom., M.Kom." userNim="NIP: 198504122010122001" userRole="Admin Prodi" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <BookOpen className="w-3.5 h-3.5 text-white" /> Database Repositori Judul Alumni
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Arsip &amp; Repositori Judul Skripsi TA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Database referensi penelitian, skripsi, dan karya ilmiah mahasiswa Program Studi Teknik Informatika yang telah lulus &amp; terpublikasi.
                  </p>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main Content Card Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              
              {/* Header & Filter Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 flex-wrap gap-3 shrink-0 bg-slate-50/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Repositori Judul Terpublikasi</h2>
                    <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Judul Terdaftar</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap ml-auto">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Cari judul, penulis, NIM..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#C62828] w-52 transition-all font-display"
                    />
                  </div>
                  <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl">
                    <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                    {["Semua", "Rekayasa Perangkat Lunak", "Kecerdasan Buatan", "Jaringan & Keamanan"].map((b) => (
                      <button
                        key={b}
                        onClick={() => setFilterBidang(b)}
                        className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all font-display cursor-pointer"
                        style={filterBidang === b ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table List Layout */}
              <div className="overflow-y-auto flex-1 scrollbar-none pb-12">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                    <tr>
                      {["Kode / Tahun", "Judul Skripsi Alumni", "Bidang Kajian", "Penulis (Alumni)", "Dosen Pembimbing", "Aksi"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((repo) => (
                      <tr key={repo.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-[10.5px] text-slate-500 whitespace-nowrap">
                          <span className="font-bold text-slate-700 block">{repo.id}</span>
                          <span className="text-[10px] text-slate-400">{repo.tahun}</span>
                        </td>
                        <td className="px-4 py-3.5 max-w-md space-y-0.5">
                          <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-display leading-snug">
                            &ldquo;{repo.judul}&rdquo;
                          </h3>
                          <p className="text-[11px] text-slate-500 line-clamp-1 font-medium leading-relaxed">{repo.abstrak}</p>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1 font-display">
                            <Tag className="w-2.5 h-2.5" /> {repo.bidang}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="font-bold text-slate-900 block font-display">{repo.penulis}</span>
                          <span className="text-[10.5px] font-mono text-slate-400">({repo.nim})</span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 font-medium">
                          {repo.pembimbing}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedRepo(repo)}
                            className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 active:scale-95 shadow-xs font-display cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-white" />
                            <span>Detail Naskah</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </main>
        </div>
      </div>

      {/* DETAIL NASKAH MODAL POPUP */}
      {selectedRepo && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display text-white">Detail Naskah Repositori</h3>
                  <p className="text-[10.5px] text-slate-400 font-medium">{selectedRepo.id} — Tahun {selectedRepo.tahun}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRepo(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto scrollbar-none">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1 font-display">
                  <Tag className="w-2.5 h-2.5" /> {selectedRepo.bidang}
                </span>
                <h2 className="text-base font-black text-slate-900 font-display leading-snug pt-1">
                  &ldquo;{selectedRepo.judul}&rdquo;
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Penulis / Alumni:</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedRepo.penulis} ({selectedRepo.nim})</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Dosen Pembimbing:</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedRepo.pembimbing}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-widest font-display">Abstrak Penelitian:</span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-100 font-medium">
                  {selectedRepo.abstrak}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedRepo(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all font-display cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => alert(`Mengunduh berkas Naskah PDF Skripsi ${selectedRepo.id}...`)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 shadow-xs font-display cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-white" /> Unduh Naskah PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
