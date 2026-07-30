"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  CheckCircle2, Search, ArrowRight, X, ShieldCheck, CreditCard, Laptop, BookOpen, XCircle, Eye
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Bebas Fakultas",  href: "/admin-fakultas/bebas",      icon: <Shield className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

interface BebasItem {
  nim: string;
  nama: string;
  prodi: string;
  tglPengajuan: string;
  bebasPustaka: boolean;
  bebasLab: boolean;
  bebasSPP: boolean;
  status: "Pending" | "Lulus Verifikasi";
}

const INITIAL_BEBAS: BebasItem[] = [
  { nim: "20101152630133", nama: "Fajar Nugroho", prodi: "Teknik Informatika", tglPengajuan: "29 Jul 2026", bebasPustaka: true, bebasLab: true, bebasSPP: true, status: "Pending" },
  { nim: "20101152630156", nama: "Laila Safitri", prodi: "Sistem Informasi", tglPengajuan: "29 Jul 2026", bebasPustaka: true, bebasLab: true, bebasSPP: true, status: "Pending" },
  { nim: "20101152630177", nama: "Gunawan Pratama", prodi: "Teknik Informatika", tglPengajuan: "28 Jul 2026", bebasPustaka: true, bebasLab: true, bebasSPP: true, status: "Pending" },
  { nim: "20101152630099", nama: "Mega Rahayu", prodi: "Sistem Informasi", tglPengajuan: "28 Jul 2026", bebasPustaka: true, bebasLab: true, bebasSPP: true, status: "Pending" },
  { nim: "20101152630044", nama: "Hendri Kusuma", prodi: "Teknik Informatika", tglPengajuan: "27 Jul 2026", bebasPustaka: true, bebasLab: true, bebasSPP: true, status: "Pending" },
];

export default function AdminFakultasBebasPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [list, setList] = useState<BebasItem[]>(INITIAL_BEBAS);
  const [search, setSearch] = useState("");
  const [selectedBebas, setSelectedBebas] = useState<BebasItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleVerify = (nim: string, nama: string) => {
    setList((prev) =>
      prev.map((item) => (item.nim === nim ? { ...item, status: "Lulus Verifikasi" } : item))
    );
    setSelectedBebas(null);
    setToastMessage(`Surat Keterangan Bebas Fakultas (SKBF) atas nama ${nama} BERHASIL DITERBITKAN!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const filtered = list.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.includes(search)
  );

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dra. Yanti Susanti, M.Pd." userNim="NIP: 197605102001122001" userRole="Admin Fakultas" prodiName="Fakultas Ilmu Komputer" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <Shield className="w-3.5 h-3.5 text-white" /> Verifikasi Prasyarat Bebas Fakultas
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Surat Keterangan Bebas Fakultas (SKBF)
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Verifikasi kelengkapan bebas pustaka perpus, bebas laboratorium, serta pelunasan SPP mahasiswa calon peserta yudisium.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-fakultas/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Dashboard Admin</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main Card Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Pengajuan Bebas Fakultas</h2>
                    <p className="text-[10px] text-slate-400 font-medium">Total: {filtered.length} Pengajuan</p>
                  </div>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari NIM atau Nama..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-[12px] bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all font-display"
                  />
                </div>
              </div>

              <div className="overflow-y-auto flex-1 scrollbar-none pb-12">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                    <tr>
                      {["NIM", "Nama Mahasiswa", "Prodi", "Tgl Pengajuan", "Bebas Pustaka", "Bebas Lab", "Bebas SPP", "Status Verifikasi", "Aksi"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((row) => (
                      <tr key={row.nim} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-[10.5px] text-slate-500">{row.nim}</td>
                        <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap font-display">{row.nama}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.prodi}</td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono">{row.tglPengajuan}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.bebasPustaka ? "bg-emerald-600 text-white" : "bg-red-600 text-white"} font-display shadow-2xs`}>
                            {row.bebasPustaka ? "✓ Lunas" : "✗ Belum"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.bebasLab ? "bg-emerald-600 text-white" : "bg-red-600 text-white"} font-display shadow-2xs`}>
                            {row.bebasLab ? "✓ Clear" : "✗ Pinjaman"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.bebasSPP ? "bg-emerald-600 text-white" : "bg-red-600 text-white"} font-display shadow-2xs`}>
                            {row.bebasSPP ? "✓ Lunas" : "✗ Tunggakan"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs font-display ${row.status === "Lulus Verifikasi" ? "bg-emerald-600" : "bg-amber-600"}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {row.status === "Pending" ? (
                            <button
                              onClick={() => setSelectedBebas(row)}
                              className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 shadow-xs font-display cursor-pointer active:scale-95"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-white" /> Verifikasi &amp; Detail Syarat
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedBebas(row)}
                              className="px-3 py-1.5 rounded-xl text-[10.5px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1 cursor-pointer font-display"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-600" /> Lihat Detail
                            </button>
                          )}
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

      {/* MODAL CHECKLIST DETAIL VERIFIKASI SYARAT BEBAS FAKULTAS */}
      {selectedBebas && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display text-white">Detail Verifikasi Syarat Bebas Fakultas</h3>
                  <p className="text-[10.5px] text-slate-400 font-medium">Validasi Kelayakan Wisuda / Yudisium FIK</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBebas(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">Mahasiswa Pemohon:</p>
                <h2 className="text-base font-black text-slate-900 font-display mt-0.5">{selectedBebas.nama}</h2>
                <p className="text-xs font-mono text-slate-500">{selectedBebas.nim} — {selectedBebas.prodi}</p>
              </div>

              <div className="space-y-2.5">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide font-display">Status Verifikasi 3 Syarat Fakultas:</p>
                
                {/* 1. Perpustakaan */}
                <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 font-display">Bebas Perpustakaan FIK</h4>
                      <p className="text-[10.5px] text-emerald-800 font-medium">Tidak ada pinjaman buku &amp; denda terlambat</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white font-display shrink-0">
                    Lunas &amp; Bebas ✅
                  </span>
                </div>

                {/* 2. Laboratorium Komputer */}
                <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                      <Laptop className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 font-display">Bebas Laboratorium Komputer</h4>
                      <p className="text-[10.5px] text-emerald-800 font-medium">Inventaris &amp; modul praktikum dikembalikan lengkap</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white font-display shrink-0">
                    Lunas &amp; Bebas ✅
                  </span>
                </div>

                {/* 3. Keuangan & SPP */}
                <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 font-display">Bebas SPP / Keuangan</h4>
                      <p className="text-[10.5px] text-emerald-800 font-medium">Pembayaran UKT/SPP Lunas s/d Semester 8</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white font-display shrink-0">
                    Lunas &amp; Bebas ✅
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Catatan Validasi Petugas:</span>
                <p className="font-semibold text-slate-800 mt-0.5 leading-snug">Seluruh persyaratan administrasi perpustakaan, laboratorium, dan keuangan telah tervalidasi 100% bebas tunggakan.</p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedBebas(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-display cursor-pointer"
                >
                  Batal
                </button>
                {selectedBebas.status === "Pending" ? (
                  <button
                    onClick={() => handleVerify(selectedBebas.nim, selectedBebas.nama)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs font-display cursor-pointer active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Setujui &amp; Terbitkan Surat Bebas Fakultas</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedBebas(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 shadow-xs font-display cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Sudah Terverifikasi</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Popup Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
              <CheckCircle2 className="w-4.5 h-4.5 text-white" />
            </div>
            <p className="text-xs font-bold font-display leading-tight">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white cursor-pointer p-1">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
