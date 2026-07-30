"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  Search, Filter, FileText, Tag, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",           href: "/admin-prodi/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa", href: "/admin-prodi/mahasiswa",  icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",       href: "/admin-prodi/aktivasi",   icon: <UserPlus className="w-4 h-4" />, badge: "7" },
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

  const filtered = REPO_DATA.filter((r) => {
    const matchSearch =
      r.judul.toLowerCase().includes(search.toLowerCase()) ||
      r.penulis.toLowerCase().includes(search.toLowerCase()) ||
      r.nim.includes(search);
    const matchBidang = filterBidang === "Semua" || r.bidang === filterBidang;
    return matchSearch && matchBidang;
  });

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Admin Prodi FIK" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ratna Dewi, M.Pd." userNim="NIDN: 1098765432" userRole="Admin Prodi FIK" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-xs">
                      <BookOpen className="w-3.5 h-3.5" /> Database Repositori Judul Alumni
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Arsip &amp; Repositori Judul Skripsi TA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Database referensi penelitian, skripsi, dan karya ilmiah mahasiswa Program Studi Teknik Informatika yang telah lulus &amp; terpublikasi.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-prodi/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Dashboard Admin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Filter Repositori</h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari judul, penulis, NIM..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                  <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                  {["Semua", "Rekayasa Perangkat Lunak", "Kecerdasan Buatan", "Jaringan & Keamanan"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setFilterBidang(b)}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all"
                      style={filterBidang === b ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid Repo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
              {filtered.map((repo) => (
                <div key={repo.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" /> {repo.bidang}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">{repo.tahun}</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 leading-snug font-display">"{repo.judul}"</h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-medium">{repo.abstrak}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800 font-display">{repo.penulis} <span className="text-slate-400 text-[10px] font-mono">({repo.nim})</span></p>
                      <p className="text-[10px] text-slate-400 font-medium">Pembimbing: {repo.pembimbing}</p>
                    </div>
                    <button className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1 active:scale-95 shadow-xs">
                      <FileText className="w-3.5 h-3.5" /> Detail Naskah
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
