"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  CheckCircle2, Clock, Download, Eye, AlertCircle,
  Building2, ArrowRight, X, ShieldCheck, CreditCard, Laptop, BookOpen, XCircle
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Bebas Fakultas",  href: "/admin-fakultas/bebas",      icon: <Shield className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

const STATS = [
  { label: "SK Pending Terbit",       value: "9",  sub: "Menunggu Penandatanganan Dekan", color: "#D97706", bgIcon: "bg-amber-500", icon: Clock },
  { label: "SK Diterbitkan",          value: "34", sub: "Bulan Agustus 2026",            color: "#059669", bgIcon: "bg-emerald-600",icon: CheckCircle2 },
  { label: "Bebas Fakultas Pending",  value: "5",  sub: "Verifikasi Diperlukan",          color: "#C62828", bgIcon: "bg-[#C62828]",  icon: Shield },
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

interface BebasItem {
  nim: string;
  nama: string;
  prodi: string;
  status: string;
  pustaka: boolean;
  lab: boolean;
  spp: boolean;
  alasan: string;
}

const INITIAL_BEBAS: BebasItem[] = [
  { nim: "20101152630133", nama: "Fajar Nugroho",   prodi: "Teknik Informatika", status: "Menunggu Verifikasi", pustaka: true, lab: true, spp: true, alasan: "Bebas pinjaman buku perpustakaan, bebas denda lab komputer, dan SPP Lunas s/d Semester 8." },
  { nim: "20101152630156", nama: "Laila Safitri",   prodi: "Sistem Informasi",   status: "Menunggu Verifikasi", pustaka: true, lab: true, spp: true, alasan: "Bebas pustaka terverifikasi, alat praktikum lengkap dikembalikan, Lunas SPP." },
  { nim: "20101152630177", nama: "Gunawan Pratama", prodi: "Teknik Informatika", status: "Menunggu Verifikasi", pustaka: true, lab: true, spp: true, alasan: "Bebas pinjaman pustaka & inventaris laboratorium, UKT Lunas 100%." },
  { nim: "20101152630099", nama: "Mega Rahayu",     prodi: "Sistem Informasi",   status: "Menunggu Verifikasi", pustaka: true, lab: true, spp: true, alasan: "Seluruh berkas administrasi dan bebas tunggakan divalidasi lengkap." },
  { nim: "20101152630044", nama: "Hendri Kusuma",   prodi: "Teknik Informatika", status: "Menunggu Verifikasi", pustaka: true, lab: true, spp: true, alasan: "Persyaratan administrasi kelulusan & keuangan terverifikasi bebas." },
];

export default function AdminFakultasDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bebasList, setBebasList] = useState<BebasItem[]>(INITIAL_BEBAS);
  const [selectedBebas, setSelectedBebas] = useState<BebasItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApproveBebas = (nim: string, nama: string) => {
    setBebasList((prev) => prev.filter((b) => b.nim !== nim));
    setSelectedBebas(null);
    setToastMessage(`Surat Bebas Fakultas atas nama ${nama} (${nim}) BERHASIL DITERBITKAN!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Unified Standard Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Unified Standard Header */}
          <Header
            className="shell-header shrink-0"
            userName="Dra. Yanti Susanti, M.Pd."
            userNim="NIP: 197605102001122001"
            userRole="Admin Fakultas"
            prodiName="Fakultas Ilmu Komputer"
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">
            
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <Shield className="w-3.5 h-3.5 text-white" /> Portal Administrasi Fakultas Ilmu Komputer
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Dashboard Admin Fakultas
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Selamat datang, Ibu Yanti. Terdapat <strong className="text-[#C62828] font-bold">9 SK Dekan</strong> menunggu penerbitan dan <strong className="text-amber-400 font-bold">{bebasList.length} berkas mahasiswa</strong> menunggu bebas fakultas.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-fakultas/sk"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <FileText className="w-4 h-4 text-white" />
                    <span>Penerbitan SK Dekan</span>
                  </Link>
                  <Link
                    href="/admin-fakultas/bebas"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 font-display"
                  >
                    <Shield className="w-4 h-4 text-white" />
                    <span>Bebas Fakultas</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── 3 Executive Stat Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center justify-between space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-500 font-display leading-tight">{s.label}</p>
                      <p className="text-2xl sm:text-3xl font-black font-display" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[10px] text-slate-400 font-semibold truncate">{s.sub}</p>
                    </div>
                    <div className={`w-11 h-11 rounded-xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                      <IconComp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Grid Content Section ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-hidden">
              
              {/* Tabel SK Dekan (2/3) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Daftar SK Dekan Terbaru</h2>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-display">
                    Agustus 2026
                  </span>
                </div>

                <div className="overflow-y-auto flex-1 scrollbar-none pb-10">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["No. SK", "Jenis", "Nama Dosen", "Untuk Mahasiswa", "Tanggal", "Status", "Aksi"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {SK_LIST.map((row) => {
                        const statusCfg = STATUS_SK_SOLID[row.status];
                        return (
                          <tr key={row.no} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-mono text-[10px] text-slate-500 whitespace-nowrap">{row.no}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 font-display">{row.jenis}</span>
                            </td>
                            <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.untuk}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-slate-400 font-mono">{row.tgl}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs font-display ${statusCfg.bg}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {row.status !== "Diterbitkan" ? (
                                <button className="px-3 py-1.5 rounded-xl text-[10.5px] font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white transition-all shadow-xs cursor-pointer font-display active:scale-95">
                                  Generate SK
                                </button>
                              ) : (
                                <button className="px-3 py-1.5 rounded-xl text-[10.5px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1 cursor-pointer font-display">
                                  <Download className="w-3 h-3" /> PDF
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

              {/* Bebas Fakultas Panel (1/3) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Bebas Fakultas</h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-2xs font-display">
                    {bebasList.length} Pending
                  </span>
                </div>

                <div className="divide-y divide-slate-100 overflow-y-auto flex-1 scrollbar-none pb-10">
                  {bebasList.length === 0 ? (
                    <div className="p-8 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                      <p className="text-xs font-bold text-slate-800 font-display">Seluruh permohonan Bebas Fakultas selesai diverifikasi!</p>
                    </div>
                  ) : (
                    bebasList.map((mhs) => (
                      <div key={mhs.nim} className="p-4 space-y-2.5 hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="text-xs font-bold text-slate-900 font-display">{mhs.nama}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{mhs.nim} · {mhs.prodi}</p>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => setSelectedBebas(mhs)}
                            className="flex-1 py-2 rounded-xl text-[10.5px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer font-display active:scale-95"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-white" /> Verifikasi &amp; Detail Syarat
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </main>
        </div>
      </div>

      {/* MODAL CHECKLIST DETAIL VERIFIKASI SYARAT BEBAS FAKULTAS */}
      {selectedBebas && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
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

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Student Header Info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">Mahasiswa Pemohon:</p>
                <h2 className="text-base font-black text-slate-900 font-display mt-0.5">{selectedBebas.nama}</h2>
                <p className="text-xs font-mono text-slate-500">{selectedBebas.nim} — {selectedBebas.prodi}</p>
              </div>

              {/* 3 Verification Assessment Cards */}
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
                      <p className="text-[10.5px] text-emerald-800 font-medium">Tidak ada pinjaman buku &amp; tunggakan denda</p>
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
                      <p className="text-[10.5px] text-emerald-800 font-medium">Seluruh inventaris &amp; praktikum terverifikasi</p>
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

              {/* Verified Note */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Catatan Validasi Petugas:</span>
                <p className="font-semibold text-slate-800 mt-0.5 leading-snug">{selectedBebas.alasan}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedBebas(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-display cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleApproveBebas(selectedBebas.nim, selectedBebas.nama)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs font-display cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Setujui &amp; Terbitkan Surat Bebas Fakultas</span>
                </button>
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
