"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  Search, Filter, FileText, Tag, ArrowRight, Download
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

import { storeProposal, storeJadwal } from "@/lib/sipeta-store";

const REPO_DEFAULT: RepoItem[] = [
  {
    id: "TA-2026-001",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web",
    penulis: "Danu Zen",
    nim: "20101152630045",
    tahun: "2026",
    bidang: "Rekayasa Perangkat Lunak",
    pembimbing: "Dr. Sarjon Defit",
    abstrak: "Penelitian ini mengimplementasikan sistem informasi berbasis web untuk tata kelola pergudangan dan inventaris secara real-time dengan efisiensi tracking barang hingga 94%."
  },
  {
    id: "TA-2026-002",
    judul: "Implementasi ML untuk Deteksi Spam Email",
    penulis: "Rafi Andika",
    nim: "20101152630089",
    tahun: "2026",
    bidang: "Kecerdasan Buatan",
    pembimbing: "Dr. Sarjon Defit",
    abstrak: "Aplikasi klasifikasi email masukan menggunakan algoritma Naive Bayes dan SVM untuk memfilter spam berbahaya dengan akurasi 98.2%."
  },
  {
    id: "TA-2026-003",
    judul: "Optimisasi Algoritma Routing Jaringan Komputer",
    penulis: "Siti Rahayu",
    nim: "20101152630101",
    tahun: "2026",
    bidang: "Jaringan & Keamanan",
    pembimbing: "Prof. Budi Santoso, Ph.D",
    abstrak: "Studi perbandingan performa routing dinamis OSPF dan BGP pada jaringan skala luas dengan simulasi GNS3."
  }
];

export default function AdminProdiRepositoriPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterBidang, setFilterBidang] = useState("Semua");
  const [selectedId, setSelectedId] = useState<string>("TA-2026-001");
  const [activeMobileTab, setActiveMobileTab] = useState<"table" | "detail">("table");

  const [repoList, setRepoList] = useState<RepoItem[]>(REPO_DEFAULT);

  const syncRepo = React.useCallback(() => {
    const prop = storeProposal.get();
    if (prop) {
      const liveItem: RepoItem = {
        id: "TA-2026-001",
        judul: prop.judul,
        penulis: "Danu Zen",
        nim: "20101152630045",
        tahun: "2026",
        bidang: prop.bidangKajian || "Rekayasa Perangkat Lunak",
        pembimbing: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
        abstrak: prop.abstrak || "Abstrak penelitian tugas akhir.",
      };
      setRepoList([liveItem, ...REPO_DEFAULT.filter(r => r.id !== "TA-2026-001")]);
    }
  }, []);

  React.useEffect(() => {
    syncRepo();
    window.addEventListener("storage_sipeta", syncRepo);
    return () => window.removeEventListener("storage_sipeta", syncRepo);
  }, [syncRepo]);

  const filtered = repoList.filter((r) => {
    const matchSearch =
      r.judul.toLowerCase().includes(search.toLowerCase()) ||
      r.penulis.toLowerCase().includes(search.toLowerCase()) ||
      r.nim.includes(search);
    const matchBidang = filterBidang === "Semua" || r.bidang === filterBidang;
    return matchSearch && matchBidang;
  });

  const selected = repoList.find((r) => r.id === selectedId) || filtered[0];

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Hafizah, S.Kom., M.Kom." userNim="NIP: 198504122010122001" userRole="Admin Prodi" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

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
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Control & Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Tabel Repositori Terpublikasi ({filtered.length})</h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari judul, penulis, NIM..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all font-display"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
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

            {/* Grid layout with Detail Side Panel */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              {/* Table Container (Flex-1) */}
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex-col min-w-0 ${
                activeMobileTab === "table" ? "flex" : "hidden lg:flex"
              }`}>
                <div className="overflow-y-auto flex-1 scrollbar-none flex flex-col">
                  <div className="overflow-x-auto w-full touch-pan-x flex-1 min-w-0">
                    <table className={`w-full text-xs min-w-[700px] border-collapse ${filtered.length === 0 ? "h-full" : ""}`}>
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                        <tr>
                          {["Kode / Tahun", "Judul Skripsi Alumni", "Bidang Kajian", "Penulis (Alumni)", "Dosen Pembimbing"].map((h) => (
                            <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className={`divide-y divide-slate-100 ${filtered.length === 0 ? "h-full" : ""}`}>
                        {filtered.length > 0 ? (
                          filtered.map((repo) => {
                            const isSelected = selected?.id === repo.id;
                            return (
                              <tr
                                key={repo.id}
                                onClick={() => {
                                  setSelectedId(repo.id);
                                  setActiveMobileTab("detail");
                                }}
                                className={`transition-all cursor-pointer select-none ${
                                  isSelected
                                    ? "bg-slate-100 font-bold"
                                    : "hover:bg-slate-50/60"
                                }`}
                              >
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                  <span className="font-mono text-[10.5px] font-bold text-slate-900">{repo.id}</span>
                                  <p className="text-[10px] text-slate-400 font-medium">{repo.tahun}</p>
                                </td>
                                <td className="px-4 py-3.5 max-w-xs">
                                  <p className="text-slate-800 font-bold truncate text-[11.5px] font-display">&ldquo;{repo.judul}&rdquo;</p>
                                </td>
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 font-display">{repo.bidang}</span>
                                </td>
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                  <span className="font-bold text-slate-900 font-display">{repo.penulis}</span>{" "}
                                  <span className="text-[10.5px] font-mono text-slate-400">({repo.nim})</span>
                                </td>
                                <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 font-medium">
                                  {repo.pembimbing}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="h-full">
                            <td colSpan={5} className="py-12 px-4 text-center align-middle h-full text-slate-500">
                              <EmptyState
                                icon={BookOpen}
                                title="Belum Ada Naskah Final di Repositori"
                                description="Naskah Tugas Akhir mahasiswa yang telah disahkan akan otomatis terarsip di sini."
                              />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Side Detail Panel (Strict 350px Width Lock on Desktop) */}
              {selected && (
                <div className={`w-full lg:w-[350px] lg:min-w-[350px] lg:max-w-[350px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150 ${
                  activeMobileTab === "detail" ? "flex flex-1" : "hidden lg:flex"
                }`}>
                  <div className="space-y-4 overflow-y-auto scrollbar-none min-w-0">
                    <div className="pb-3 border-b border-slate-100 space-y-2 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => setActiveMobileTab("table")}
                          className="lg:hidden p-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                        >
                          <span>← Kembali</span>
                        </button>

                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-display">
                          {selected.bidang}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold shrink-0 ml-auto">{selected.tahun}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#C62828] uppercase tracking-widest font-display block pt-1">{selected.id}</span>
                        <h3 className="text-sm font-black text-slate-900 font-display leading-snug break-words mt-0.5">&ldquo;{selected.judul}&rdquo;</h3>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs min-w-0">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Penulis / Alumni</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-display break-words">{selected.penulis} <span className="text-slate-400 text-[10.5px] font-mono">({selected.nim})</span></p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Dosen Pembimbing</p>
                        <p className="font-semibold text-slate-800 mt-0.5 break-words">{selected.pembimbing}</p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display mb-1">Abstrak Penelitian</p>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-[11.5px] text-slate-700 leading-relaxed font-medium max-h-48 overflow-y-auto scrollbar-none break-words">
                          {selected.abstrak}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => alert(`Mengunduh berkas Naskah PDF Skripsi ${selected.id}...`)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-white" /> Unduh Naskah PDF Skripsi
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
