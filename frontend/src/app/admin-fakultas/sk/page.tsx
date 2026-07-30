"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  Download, CheckCircle2, Clock, Search, Filter, ArrowRight
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

  const handleGenerate = (noSk: string) => {
    setList((prev) =>
      prev.map((item) => (item.noSk === noSk ? { ...item, status: "Diterbitkan" } : item))
    );
  };

  const filtered = list.filter((item) => {
    const matchSearch =
      item.noSk.toLowerCase().includes(search.toLowerCase()) ||
      item.dosen.toLowerCase().includes(search.toLowerCase()) ||
      item.mahasiswa.toLowerCase().includes(search.toLowerCase());
    const matchJenis = filterJenis === "Semua" || item.jenis === filterJenis;
    return matchSearch && matchJenis;
  });

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
                      <FileText className="w-3.5 h-3.5" /> Generasi SK Dekan Resmi
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
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Dashboard Dekanat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Tabel SK Dekan</h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari No SK, Dosen, Mahasiswa..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                  <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                  {["Semua", "SK Pembimbing", "SK Penguji"].map((j) => (
                    <button
                      key={j}
                      onClick={() => setFilterJenis(j)}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all"
                      style={filterJenis === j ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                    >
                      {j}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {["No. SK Dekan", "Jenis SK", "Dosen Terlampir", "NIDN", "Mahasiswa TA", "NIM", "Tgl Pengajuan", "Status", "Aksi / Unduh"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((row) => (
                      <tr key={row.noSk} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-indigo-900">{row.noSk}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {row.jenis}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap font-display">{row.dosen}</td>
                        <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{row.nidn}</td>
                        <td className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">{row.mahasiswa}</td>
                        <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{row.nim}</td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{row.tglPengajuan}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {row.status === "Diterbitkan" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> Diterbitkan
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {row.status === "Pending" ? (
                            <button
                              onClick={() => handleGenerate(row.noSk)}
                              className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1 shadow-xs active:scale-95"
                            >
                              Generate &amp; Terbitkan
                            </button>
                          ) : (
                            <button className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1 border border-slate-200">
                              <Download className="w-3.5 h-3.5 text-[#C62828]" /> Download PDF
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
