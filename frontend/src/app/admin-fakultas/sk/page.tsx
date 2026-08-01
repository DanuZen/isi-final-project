"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  Download, CheckCircle2, Clock, Search, Filter, ArrowRight, XCircle, FileCheck, Building2
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Bebas Fakultas",  href: "/admin-fakultas/bebas",      icon: <Shield className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

interface SkItem {
  noSk: string;
  jenis: "SK Pembimbing" | "SK Penguji";
  dosen: string;
  nidn: string;
  mahasiswa: string;
  nim: string;
  tglPengajuan: string;
  status: "Pending" | "Diterbitkan";
}

const SK_DATA: SkItem[] = [
  { noSk: "SK-2026-0081", jenis: "SK Pembimbing", dosen: "Dr. Hendra Saputra, M.T.", nidn: "1012345678", mahasiswa: "Danu Zen", nim: "20101152630045", tglPengajuan: "29 Jul 2026", status: "Pending" },
  { noSk: "SK-2026-0082", jenis: "SK Pembimbing", dosen: "Rina Oktaviani, M.Kom.", nidn: "1087654321", mahasiswa: "Danu Zen", nim: "20101152630045", tglPengajuan: "29 Jul 2026", status: "Pending" },
  { noSk: "SK-2026-0079", jenis: "SK Penguji", dosen: "Dr. Ahmad Fauzi, M.T.", nidn: "1023456789", mahasiswa: "Rafi Andika", nim: "20101152630089", tglPengajuan: "28 Jul 2026", status: "Pending" },
  { noSk: "SK-2026-0077", jenis: "SK Pembimbing", dosen: "Dr. Ahmad Fauzi, M.T.", nidn: "1023456789", mahasiswa: "Siti Rahayu", nim: "20101152630101", tglPengajuan: "25 Jul 2026", status: "Diterbitkan" },
  { noSk: "SK-2026-0078", jenis: "SK Pembimbing", dosen: "Sari Indah, M.T.", nidn: "1011223344", mahasiswa: "Siti Rahayu", nim: "20101152630101", tglPengajuan: "25 Jul 2026", status: "Diterbitkan" },
];

export default function AdminFakultasSkPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [list, setList] = useState<SkItem[]>(SK_DATA);
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");

  // Default select 1st item
  const [selectedNoSk, setSelectedNoSk] = useState<string>("SK-2026-0081");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGenerate = (noSk: string, dosen: string, mhs: string) => {
    setList((prev) =>
      prev.map((item) => (item.noSk === noSk ? { ...item, status: "Diterbitkan" } : item))
    );
    setToastMessage(`SK Dekan ${noSk} untuk ${dosen} (${mhs}) BERHASIL DITERBITKAN!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const filtered = list.filter((item) => {
    const matchSearch =
      item.noSk.toLowerCase().includes(search.toLowerCase()) ||
      item.dosen.toLowerCase().includes(search.toLowerCase()) ||
      item.mahasiswa.toLowerCase().includes(search.toLowerCase());
    const matchJenis = filterJenis === "Semua" || item.jenis === filterJenis;
    return matchSearch && matchJenis;
  });

  const selected = list.find((item) => item.noSk === selectedNoSk) || filtered[0] || list[0];

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
                      <FileText className="w-3.5 h-3.5 text-white" /> Generasi SK Dekan Resmi
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Penerbitan Surat Keputusan (SK) Dekan FIK
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Proses verifikasi dan penerbitan SK Pembimbing &amp; Penguji Tugas Akhir secara digital dengan ttd Dekan Fakultas Ilmu Komputer.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-fakultas/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Dashboard Dekanat</span>
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
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Tabel SK Dekan ({filtered.length})</h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari No SK, Dosen, Mahasiswa..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all font-display"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                  <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                  {["Semua", "SK Pembimbing", "SK Penguji"].map((j) => (
                    <button
                      key={j}
                      onClick={() => setFilterJenis(j)}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all font-display cursor-pointer"
                      style={filterJenis === j ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                    >
                      {j}
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
                  <table className="w-full text-xs min-w-[700px] lg:min-w-0">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["No. SK Dekan", "Jenis SK", "Dosen Terlampir", "NIDN", "Mahasiswa TA", "NIM", "Tgl Pengajuan", "Status"].map((h) => (
                          <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((row) => {
                        const isSelected = selected?.noSk === row.noSk;
                        return (
                          <tr
                            key={row.noSk}
                            onClick={() => setSelectedNoSk(row.noSk)}
                            className={`transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-rose-50/70 border-l-4 border-l-[#C62828]"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-4 py-3.5 font-mono font-bold text-[#C62828] whitespace-nowrap">{row.noSk}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C62828] text-white shadow-2xs font-display">
                                {row.jenis}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap font-display">{row.dosen}</td>
                            <td className="px-4 py-3.5 font-mono text-[10.5px] text-slate-400">{row.nidn}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-800 whitespace-nowrap font-display">{row.mahasiswa}</td>
                            <td className="px-4 py-3.5 font-mono text-[10.5px] text-slate-400">{row.nim}</td>
                            <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap font-mono">{row.tglPengajuan}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              {row.status === "Diterbitkan" ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-2xs font-display">
                                  <CheckCircle2 className="w-3 h-3 text-white" /> Diterbitkan
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-2xs font-display">
                                  Drafting SK
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side Detail Panel Card (Updates Live Based on Selected Row) */}
              {selected && (
                <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-4 overflow-y-auto scrollbar-none">
                    <div className="pb-3 border-b border-slate-100 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#C62828] text-white font-display shadow-2xs">
                          {selected.jenis}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{selected.tglPengajuan}</span>
                      </div>
                      <span className="text-xs font-mono font-black text-[#C62828] block pt-1">{selected.noSk}</span>
                      <h3 className="text-sm font-black text-slate-900 font-display">Dokumen Surat Keputusan Dekan</h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Dosen Terlampir</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-display">{selected.dosen}</p>
                        <p className="text-[10px] font-mono text-slate-400">NIDN: {selected.nidn}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Mahasiswa Tugas Akhir</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-display">{selected.mahasiswa}</p>
                        <p className="text-[10px] font-mono text-slate-400">NIM: {selected.nim}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Legalitas Penandatangan:</span>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#C62828] shrink-0" />
                          <span className="font-bold text-slate-800 text-[11px] font-display">Dr. H. Jasmir, M.Kom.</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">Dekan Fakultas Ilmu Komputer UPI YPTK</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display mb-1">Status Legalitas SK</p>
                        {selected.status === "Diterbitkan" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white font-display shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Resmi Diterbitkan &amp; Sah
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white font-display shadow-2xs">
                            <Clock className="w-3.5 h-3.5 text-white" /> Menunggu Generasi TTD Dekan
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {selected.status === "Pending" ? (
                      <button
                        onClick={() => handleGenerate(selected.noSk, selected.dosen, selected.mahasiswa)}
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                      >
                        <FileCheck className="w-4 h-4 text-white" />
                        <span>Generate &amp; Terbitkan SK Dekan</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Mengunduh berkas PDF ${selected.noSk}...`)}
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-white" />
                        <span>Unduh Dokumen SK Dekan PDF</span>
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
