"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  CheckCircle2, Search, ArrowRight
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
  { nim: "20101152630177", nama: "Gunawan Pratama", prodi: "Teknik Informatika", tglPengajuan: "28 Jul 2026", bebasPustaka: true, bebasLab: false, bebasSPP: true, status: "Pending" },
  { nim: "20101152630099", nama: "Mega Rahayu", prodi: "Sistem Informasi", tglPengajuan: "28 Jul 2026", bebasPustaka: true, bebasLab: true, bebasSPP: true, status: "Pending" },
  { nim: "20101152630044", nama: "Hendri Kusuma", prodi: "Teknik Informatika", tglPengajuan: "27 Jul 2026", bebasPustaka: true, bebasLab: true, bebasSPP: true, status: "Pending" },
];

export default function AdminFakultasBebasPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [list, setList] = useState<BebasItem[]>(INITIAL_BEBAS);
  const [search, setSearch] = useState("");

  const handleVerify = (nim: string) => {
    setList((prev) =>
      prev.map((item) => (item.nim === nim ? { ...item, status: "Lulus Verifikasi" } : item))
    );
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
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Dashboard Admin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main Card Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Shield className="w-4 h-4" />
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
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-[12px] bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all"
                  />
                </div>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
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
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{row.tglPengajuan}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.bebasPustaka ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                            {row.bebasPustaka ? "✓ Lunas" : "✗ Belum"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.bebasLab ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                            {row.bebasLab ? "✓ Clear" : "✗ Pinjaman"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.bebasSPP ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                            {row.bebasSPP ? "✓ Lunas" : "✗ Tunggakan"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {row.status === "Lulus Verifikasi" ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              ✓ Terverifikasi
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              Menunggu Verifikasi
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {row.status === "Pending" ? (
                            <button
                              onClick={() => handleVerify(row.nim)}
                              disabled={!row.bebasPustaka || !row.bebasLab || !row.bebasSPP}
                              className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                                row.bebasPustaka && row.bebasLab && row.bebasSPP
                                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs active:scale-95"
                                  : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Verifikasi Surat
                            </button>
                          ) : (
                            <button className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200">
                              Cetak Surat Bebas
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
    </div>
  );
}
