"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  Download, CheckCircle2, Clock, Search, Filter, ArrowRight, XCircle, FileCheck, Building2,
  Plus, ChevronDown, Check, X, ArrowLeft
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"table" | "detail">("table");

  // Default select 1st item
  const [selectedNoSk, setSelectedNoSk] = useState<string>("SK-2026-0081");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formJenis, setFormJenis] = useState<"SK Pembimbing" | "SK Penguji">("SK Pembimbing");
  const [formDosen, setFormDosen] = useState("");
  const [formNidn, setFormNidn] = useState("");
  const [formMahasiswa, setFormMahasiswa] = useState("");
  const [formNim, setFormNim] = useState("");

  const handleGenerate = (noSk: string, dosen: string, mhs: string) => {
    setList((prev) =>
      prev.map((item) => (item.noSk === noSk ? { ...item, status: "Diterbitkan" } : item))
    );
    setToastMessage(`SK Dekan ${noSk} untuk ${dosen} (${mhs}) BERHASIL DITERBITKAN!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleAddSk = (e: React.FormEvent, statusTarget: "Pending" | "Diterbitkan" = "Diterbitkan") => {
    e.preventDefault();
    if (!formDosen.trim() || !formMahasiswa.trim()) return;

    const newNoSk = `SK-2026-00${list.length + 83}`;
    const newItem: SkItem = {
      noSk: newNoSk,
      jenis: formJenis,
      dosen: formDosen,
      nidn: formNidn || "1098765432",
      mahasiswa: formMahasiswa,
      nim: formNim || "20101152630099",
      tglPengajuan: "2 Agu 2026",
      status: statusTarget,
    };

    setList([newItem, ...list]);
    setSelectedNoSk(newNoSk);
    setShowAddModal(false);
    setFormDosen("");
    setFormNidn("");
    setFormMahasiswa("");
    setFormNim("");
    setToastMessage(
      statusTarget === "Diterbitkan"
        ? `SK Dekan ${newNoSk} atas nama ${formDosen} BERHASIL DITERBITKAN!`
        : `Draft SK ${newNoSk} BERHASIL DISIMPAN SEBAGAI DRAFT!`
    );
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

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

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

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
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

            {/* Grid layout with Detail Side Panel */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex-col min-w-0 ${
                activeMobileTab === "table" ? "flex" : "hidden lg:flex"
              }`}>
                {/* Integrated Table Card Header + Controls */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-white">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Tabel SK Dekan</h2>
                      <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Berkas SK Terdaftar</p>
                    </div>
                  </div>

                  {/* 1-Row Controls: Search Input + Animated Dropdown Filter + Red + Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-48 min-w-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Cari No SK, Dosen, Mahasiswa..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-7 pr-2 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all w-full font-display"
                      />
                    </div>

                    {/* Custom Animated Dropdown Filter */}
                    <div className="relative shrink-0 font-display">
                      <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[90px] sm:max-w-[120px]">{filterJenis}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${isFilterOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isFilterOpen && (
                        <>
                          <div className="fixed inset-0 z-20" onClick={() => setIsFilterOpen(false)} />
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                            {["Semua", "SK Pembimbing", "SK Penguji"].map((j) => (
                              <button
                                key={j}
                                onClick={() => {
                                  setFilterJenis(j);
                                  setIsFilterOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                  filterJenis === j ? "bg-[#C62828] text-white" : "text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span>{j}</span>
                                {filterJenis === j && <Check className="w-3.5 h-3.5 text-white" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* + Buat Draft SK Button */}
                    <button
                      onClick={() => setShowAddModal(true)}
                      title="Input Draft SK Baru"
                      className="px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all cursor-pointer font-display shadow-xs shrink-0 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4 text-white shrink-0" />
                      <span>Draft SK</span>
                    </button>
                  </div>
                </div>

                {/* Table with Touch-Pan-X Smooth Container */}
                <div className="overflow-y-auto flex-1 scrollbar-none flex flex-col min-h-0">
                  <div className="overflow-x-auto w-full touch-pan-x flex-1 min-w-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[850px] border-collapse">
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
                              onClick={() => {
                                setSelectedNoSk(row.noSk);
                                setActiveMobileTab("detail");
                              }}
                              className={`transition-all cursor-pointer select-none ${
                                isSelected
                                  ? "bg-slate-100 font-bold"
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
              </div>

              {/* Side Detail Panel (Strict 350px Width Lock on Desktop) */}
              {selected && (
                <div className={`w-full lg:w-[350px] lg:min-w-[350px] lg:max-w-[350px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150 ${
                  activeMobileTab === "detail" ? "flex flex-1" : "hidden lg:flex"
                }`}>
                  <div className="space-y-4 overflow-y-auto scrollbar-none min-w-0">
                    <div className="pb-3 border-b border-slate-100 space-y-2 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        {/* Mobile Back Button */}
                        <button
                          onClick={() => setActiveMobileTab("table")}
                          className="lg:hidden p-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                        >
                          <ArrowLeft className="w-3.5 h-3.5 text-[#C62828]" />
                          <span>Kembali</span>
                        </button>

                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#C62828] text-white font-display shadow-2xs">
                          {selected.jenis}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold ml-auto">{selected.tglPengajuan}</span>
                      </div>
                      <span className="text-xs font-mono font-black text-[#C62828] block pt-1">{selected.noSk}</span>
                      <h3 className="text-sm font-black text-slate-900 font-display leading-snug">Dokumen Surat Keputusan Dekan</h3>
                    </div>

                    <div className="space-y-3 text-xs min-w-0">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Dosen Terlampir</p>
                          <p className="font-bold text-slate-900 mt-0.5 font-display break-words">{selected.dosen}</p>
                          <p className="text-[10px] font-mono text-slate-500">NIDN: {selected.nidn}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-200/60 min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Mahasiswa Tugas Akhir</p>
                          <p className="font-bold text-slate-900 mt-0.5 font-display break-words">{selected.mahasiswa}</p>
                          <p className="text-[10px] font-mono text-slate-500">NIM: {selected.nim}</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 min-w-0">
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

      {/* MODAL INPUT DRAFT SK DEKAN BARU */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-display">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display text-white">Input Draft SK Dekan Baru</h3>
                  <p className="text-[10.5px] text-slate-400 font-medium">Buat usulan SK Pembimbing atau Penguji</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Modal Body */}
            <form onSubmit={handleAddSk} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Jenis SK Dekan</label>
                <select
                  value={formJenis}
                  onChange={(e) => setFormJenis(e.target.value as "SK Pembimbing" | "SK Penguji")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#C62828] font-bold text-slate-800 cursor-pointer"
                >
                  <option value="SK Pembimbing">SK Pembimbing Tugas Akhir</option>
                  <option value="SK Penguji">SK Penguji Seminar/Sidang</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Nama Dosen Terlampir</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dr. Sarjon Defit"
                    value={formDosen}
                    onChange={(e) => setFormDosen(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#C62828]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">NIDN Dosen</label>
                  <input
                    type="text"
                    placeholder="Contoh: 1098765432"
                    value={formNidn}
                    onChange={(e) => setFormNidn(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Nama Mahasiswa TA</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Danu Zen"
                    value={formMahasiswa}
                    onChange={(e) => setFormMahasiswa(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#C62828]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">NIM Mahasiswa</label>
                  <input
                    type="text"
                    placeholder="Contoh: 20101152630045"
                    value={formNim}
                    onChange={(e) => setFormNim(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2.5 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer font-display"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={(e) => handleAddSk(e, "Pending")}
                  className="px-4 py-2.5 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all cursor-pointer font-display shadow-xs active:scale-95 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-white" />
                  <span>Simpan Draft</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5 font-display"
                >
                  <Check className="w-4 h-4 text-white" />
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Popup Notification */}
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
