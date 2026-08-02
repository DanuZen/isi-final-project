"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Archive,
  CheckCircle2, Clock, Download,
  ArrowRight, XCircle, Search
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

const STATS = [
  { label: "SK Pending Terbit",       value: "9",  sub: "Menunggu Penandatanganan Dekan", color: "#D97706", bgIcon: "bg-amber-500", icon: Clock },
  { label: "SK Diterbitkan",          value: "34", sub: "Bulan Agustus 2026",            color: "#059669", bgIcon: "bg-emerald-600",icon: CheckCircle2 },
  { label: "Arsip Dokumen Resmi",     value: "4",  sub: "Terarsip di Repositori",          color: "#C62828", bgIcon: "bg-[#C62828]",  icon: Archive },
];

type SkStatus = "Pending" | "Siap Terbit" | "Diterbitkan";

const SK_LIST: Array<{
  no: string; jenis: string; nama: string; nidn: string; untuk: string; tgl: string; status: SkStatus;
}> = [
  { no: "SK-2026-0081", jenis: "Pembimbing I",  nama: "Dr. Hendra Saputra, M.T.",   nidn: "1012345678", untuk: "Danu Zen (20101152630045)",       tgl: "29 Jul 2026", status: "Pending" },
  { no: "SK-2026-0082", jenis: "Pembimbing II", nama: "Rina Oktaviani, M.Kom.",      nidn: "1087654321", untuk: "Danu Zen (20101152630045)",       tgl: "29 Jul 2026", status: "Pending" },
  { no: "SK-2026-0079", jenis: "Penguji I",     nama: "Dr. Ahmad Fauzi, M.T.",       nidn: "1023456789", untuk: "Rafi Andika (20101152630089)",    tgl: "28 Jul 2026", status: "Siap Terbit" },
  { no: "SK-2026-0080", jenis: "Penguji II",    nama: "Prof. Budi Santoso, Ph.D",    nidn: "1034567890", untuk: "Rafi Andika (20101152630089)",    tgl: "28 Jul 2026", status: "Siap Terbit" },
  { no: "SK-2026-0077", jenis: "Pembimbing I",  nama: "Dr. Ahmad Fauzi, M.T.",       nidn: "1023456789", untuk: "Siti Rahayu (20101152630101)",    tgl: "25 Jul 2026", status: "Diterbitkan" },
  { no: "SK-2026-0078", jenis: "Pembimbing II", nama: "Sari Indah, M.T.",            nidn: "1011223344", untuk: "Siti Rahayu (20101152630101)",    tgl: "25 Jul 2026", status: "Diterbitkan" },
];

const STATUS_SK_SOLID: Record<SkStatus, { bg: string }> = {
  "Pending":     { bg: "bg-amber-600" },
  "Siap Terbit": { bg: "bg-[#C62828]" },
  "Diterbitkan": { bg: "bg-emerald-600" },
};

export default function AdminFakultasDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [skData, setSkData] = useState(SK_LIST);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGenerateSk = (no: string, nama: string) => {
    setSkData((prev) =>
      prev.map((item) => (item.no === no ? { ...item, status: "Diterbitkan" } : item))
    );
    setToastMessage(`SK Dekan ${no} atas nama ${nama} BERHASIL DITERBITKAN!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          <Header
            className="shell-header shrink-0"
            userName="Dra. Yanti Susanti, M.Pd."
            userNim="NIP: 197605102001122001"
            userRole="Admin Fakultas"
            prodiName="Fakultas Ilmu Komputer"
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">
            
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <FileText className="w-3.5 h-3.5 text-white" /> Portal Administrasi Fakultas Ilmu Komputer
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Dashboard Admin Fakultas
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Selamat datang, Ibu Yanti. Terdapat <strong className="text-[#C62828] font-bold">9 SK Dekan</strong> menunggu penerbitan dan <strong className="text-emerald-400 font-bold">4 berkas dokumen resmi</strong> terarsip di repositori digital.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-fakultas/sk"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <FileText className="w-4 h-4 text-white" />
                    <span>Penerbitan SK Dekan</span>
                  </Link>
                  <Link
                    href="/admin-fakultas/arsip"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 font-display"
                  >
                    <Archive className="w-4 h-4 text-white" />
                    <span>Arsip Dokumen</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center justify-between space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display truncate">{s.label}</p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-black font-display tracking-tight text-slate-900">{s.value}</span>
                        <span className="text-[10.5px] text-slate-500 font-medium truncate">{s.sub}</span>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-2xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                      <IconComp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col min-w-0">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Tabel SK Dekan Terbaru</h2>
                    <p className="text-[10px] text-slate-400 font-medium">Usulan Penetapan SK Pembimbing &amp; Penguji</p>
                  </div>
                </div>

                <Link
                  href="/admin-fakultas/sk"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#C62828] bg-rose-50 hover:bg-rose-100 transition-colors font-display flex items-center gap-1 cursor-pointer"
                >
                  <span>Lihat Semua SK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="overflow-y-auto flex-1 scrollbar-none flex flex-col min-h-0">
                <div className="overflow-x-auto w-full touch-pan-x flex-1 min-w-0 scrollbar-thin">
                  <table className="w-full text-xs min-w-[850px] border-collapse">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["No SK", "Jenis SK", "Nama Dosen", "NIDN", "Peruntukan Mahasiswa", "Tgl Pengajuan", "Status", "Aksi"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {skData.map((row) => {
                        const st = STATUS_SK_SOLID[row.status];
                        return (
                          <tr key={row.no} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3.5 font-mono text-[10.5px] font-bold text-[#C62828] whitespace-nowrap">{row.no}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C62828] text-white shadow-2xs font-display">
                                {row.jenis}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-bold text-slate-800 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-4 py-3.5 font-mono text-[10.5px] text-slate-500">{row.nidn}</td>
                            <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap font-medium">{row.untuk}</td>
                            <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap font-mono">{row.tgl}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs font-display ${st.bg}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              {row.status !== "Diterbitkan" ? (
                                <button
                                  onClick={() => handleGenerateSk(row.no, row.nama)}
                                  className="px-3 py-1.5 rounded-xl text-[10.5px] font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1 shadow-2xs cursor-pointer font-display active:scale-95"
                                >
                                  <FileText className="w-3 h-3 text-white" />
                                  Terbitkan SK
                                </button>
                              ) : (
                                <button
                                  onClick={() => alert(`Mengunduh dokumen PDF ${row.no}...`)}
                                  className="px-3 py-1.5 rounded-xl text-[10.5px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1 cursor-pointer font-display"
                                >
                                  <Download className="w-3 h-3" /> Unduh PDF
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 font-display">
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
