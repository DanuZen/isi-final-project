"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  CheckCircle2, Search, ArrowRight, X, ShieldCheck, CreditCard, Laptop, BookOpen, XCircle, AlertCircle
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
  
  // Default select 1st student item
  const [selectedNim, setSelectedNim] = useState<string>("20101152630133");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleVerify = (nim: string, nama: string) => {
    setList((prev) =>
      prev.map((item) => (item.nim === nim ? { ...item, status: "Lulus Verifikasi" } : item))
    );
    setToastMessage(`Surat Keterangan Bebas Fakultas (SKBF) atas nama ${nama} BERHASIL DITERBITKAN!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const filtered = list.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.includes(search)
  );

  const selected = list.find((item) => item.nim === selectedNim) || filtered[0] || list[0];
  const isEligible = selected?.bebasPustaka && selected?.bebasLab && selected?.bebasSPP;

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
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
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Pengajuan Bebas Fakultas ({filtered.length})</h2>
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

            {/* Grid layout with Detail Side Panel */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col min-w-0 overflow-x-auto">
                <div className="overflow-y-auto flex-1 scrollbar-none pb-12">
                  <table className="w-full text-xs min-w-[700px] lg:min-w-0">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["NIM", "Nama Mahasiswa", "Prodi", "Tgl Pengajuan", "Bebas Pustaka", "Bebas Lab", "Bebas SPP", "Status Verifikasi"].map((h) => (
                          <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((row) => {
                        const isSelected = selected?.nim === row.nim;
                        return (
                          <tr
                            key={row.nim}
                            onClick={() => setSelectedNim(row.nim)}
                            className={`transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-rose-50/70 border-l-4 border-l-[#C62828]"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-4 py-3.5 font-mono text-[10.5px] text-slate-500 font-semibold">{row.nim}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-800 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{row.prodi}</td>
                            <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap font-mono">{row.tglPengajuan}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.bebasPustaka ? "bg-emerald-600 text-white" : "bg-red-600 text-white"} font-display shadow-2xs`}>
                                {row.bebasPustaka ? "✓ Lunas" : "✗ Belum"}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.bebasLab ? "bg-emerald-600 text-white" : "bg-red-600 text-white"} font-display shadow-2xs`}>
                                {row.bebasLab ? "✓ Clear" : "✗ Pinjaman"}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.bebasSPP ? "bg-emerald-600 text-white" : "bg-red-600 text-white"} font-display shadow-2xs`}>
                                {row.bebasSPP ? "✓ Lunas" : "✗ Tunggakan"}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs font-display ${row.status === "Lulus Verifikasi" ? "bg-emerald-600" : "bg-amber-600"}`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side Detail Panel Card (Assessment Checklist) */}
              {selected && (
                <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-4 overflow-y-auto scrollbar-none">
                    <div className="pb-3 border-b border-slate-100 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold text-white font-display shadow-2xs ${selected.status === "Lulus Verifikasi" ? "bg-emerald-600" : "bg-amber-600"}`}>
                          {selected.status}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{selected.tglPengajuan}</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 font-display mt-1">{selected.nama}</h3>
                      <p className="text-[11px] font-mono text-slate-500">{selected.nim} — {selected.prodi}</p>
                    </div>

                    <div className="space-y-3 text-xs">
                      <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider font-display block">Penilaian 3 Prasyarat Kelayakan:</span>

                      {/* 1. Perpustakaan */}
                      <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${selected.bebasPustaka ? "bg-emerald-50/70 border-emerald-200" : "bg-red-50/70 border-red-200"}`}>
                        <div className="flex items-center gap-2">
                          <BookOpen className={`w-4 h-4 shrink-0 ${selected.bebasPustaka ? "text-emerald-700" : "text-red-600"}`} />
                          <div>
                            <p className="font-bold text-slate-900 text-[11.5px] font-display">Bebas Perpustakaan</p>
                            <p className="text-[10px] text-slate-500 font-medium">{selected.bebasPustaka ? "Bebas pinjaman & denda" : "Ada tunggakan buku"}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold text-white ${selected.bebasPustaka ? "bg-emerald-600" : "bg-red-600"}`}>
                          {selected.bebasPustaka ? "Lunas ✅" : "Tunggakan ❌"}
                        </span>
                      </div>

                      {/* 2. Lab Komputer */}
                      <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${selected.bebasLab ? "bg-emerald-50/70 border-emerald-200" : "bg-red-50/70 border-red-200"}`}>
                        <div className="flex items-center gap-2">
                          <Laptop className={`w-4 h-4 shrink-0 ${selected.bebasLab ? "text-emerald-700" : "text-red-600"}`} />
                          <div>
                            <p className="font-bold text-slate-900 text-[11.5px] font-display">Bebas Lab Komputer</p>
                            <p className="text-[10px] text-slate-500 font-medium">{selected.bebasLab ? "Alat & modul dikembalikan" : "Inventaris belum kembali"}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold text-white ${selected.bebasLab ? "bg-emerald-600" : "bg-red-600"}`}>
                          {selected.bebasLab ? "Clear ✅" : "Pinjaman ❌"}
                        </span>
                      </div>

                      {/* 3. Keuangan & SPP */}
                      <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${selected.bebasSPP ? "bg-emerald-50/70 border-emerald-200" : "bg-red-50/70 border-red-200"}`}>
                        <div className="flex items-center gap-2">
                          <CreditCard className={`w-4 h-4 shrink-0 ${selected.bebasSPP ? "text-emerald-700" : "text-red-600"}`} />
                          <div>
                            <p className="font-bold text-slate-900 text-[11.5px] font-display">Bebas SPP / Keuangan</p>
                            <p className="text-[10px] text-slate-500 font-medium">{selected.bebasSPP ? "UKT/SPP Lunas s/d Sem 8" : "Tunggakan SPP belum lunas"}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold text-white ${selected.bebasSPP ? "bg-emerald-600" : "bg-red-600"}`}>
                          {selected.bebasSPP ? "Lunas ✅" : "Tunggakan ❌"}
                        </span>
                      </div>

                      {/* Summary Assessment Verdict Box */}
                      <div className={`p-3.5 rounded-2xl border text-xs space-y-1 ${isEligible ? "bg-emerald-500/10 border-emerald-300 text-emerald-900" : "bg-red-500/10 border-red-300 text-red-900"}`}>
                        <div className="flex items-center gap-1.5 font-bold font-display text-[11px]">
                          {isEligible ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                          <span>Kesimpulan Evaluasi Kelayakan:</span>
                        </div>
                        <p className="text-[10.5px] font-semibold leading-relaxed">
                          {isEligible
                            ? "Mahasiswa LAYAK diverifikasi. Seluruh 3 prasyarat (Pustaka, Lab, SPP) telah 100% dipenuhi."
                            : "Mahasiswa BELUM LAYAK diverifikasi karena masih ada tunggakan berkas/keuangan."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    {selected.status === "Pending" ? (
                      <button
                        disabled={!isEligible}
                        onClick={() => handleVerify(selected.nim, selected.nama)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display ${
                          isEligible
                            ? "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                            : "bg-slate-300 cursor-not-allowed opacity-70"
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 text-white" />
                        <span>Setujui &amp; Terbitkan SKBF</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Mengunduh berkas Surat Keterangan Bebas Fakultas (SKBF) ${selected.nama}...`)}
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Unduh Surat Bebas Fakultas PDF</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

          </main>
        </div>
      </div>

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
