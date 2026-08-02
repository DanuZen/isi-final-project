"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Shield, Archive,
  Search, Download, File, ArrowRight, Tag, Filter, Building2,
  Plus, ChevronDown, Check, X, ArrowLeft, CheckCircle2, XCircle
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin-fakultas/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Penerbitan SK",   href: "/admin-fakultas/sk",         icon: <FileText className="w-4 h-4" /> },
  { label: "Bebas Fakultas",  href: "/admin-fakultas/bebas",      icon: <Shield className="w-4 h-4" /> },
  { label: "Arsip Dokumen",   href: "/admin-fakultas/arsip",      icon: <Archive className="w-4 h-4" /> },
];

interface ArsipItem {
  id: string;
  namaDokumen: string;
  kategori: string;
  tahun: string;
  ukuran: string;
  tglUpload: string;
  deskripsi: string;
}

const ARSIP_DATA: ArsipItem[] = [
  { id: "DOC-2026-001", namaDokumen: "SK Dekan Pembimbing TA Semester Genap 2025/2026.pdf", kategori: "SK Dekan", tahun: "2026", ukuran: "2.4 MB", tglUpload: "15 Jan 2026", deskripsi: "Surat Keputusan Dekan FIK mengenai penetapan Dosen Pembimbing I dan II Skripsi mahasiswa semester genap 2025/2026." },
  { id: "DOC-2026-002", namaDokumen: "SK Dekan Penguji Seminar & Sidang TA FIK 2025/2026.pdf", kategori: "SK Dekan", tahun: "2026", ukuran: "3.1 MB", tglUpload: "20 Jan 2026", deskripsi: "Surat Penugasan Tim Majelis Penguji Seminar Proposal dan Ujian Sidang Skripsi Fakultas Ilmu Komputer." },
  { id: "DOC-2025-099", namaDokumen: "Rekapitulasi Kelulusan Yudisium FIK Periode I 2025.pdf", kategori: "Yudisium", tahun: "2025", ukuran: "1.8 MB", tglUpload: "10 Des 2025", deskripsi: "Laporan rekapitulasi data mahasiswa lulusan Yudisium FIK Periode I Tahun Ajaran 2025/2026." },
  { id: "DOC-2025-088", namaDokumen: "Pedoman Tata Tulis Tugas Akhir FIK UPI YPTK v2.1.pdf", kategori: "Pedoman TA", tahun: "2025", ukuran: "4.5 MB", tglUpload: "01 Sep 2025", deskripsi: "Panduan format penulisan skripsi, tata cara pengutipan, dan templat resmi Tugas Akhir FIK UPI YPTK." },
];

export default function AdminFakultasArsipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [list, setList] = useState<ArsipItem[]>(ARSIP_DATA);
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"table" | "detail">("table");

  // Default select 1st archive item
  const [selectedId, setSelectedId] = useState<string>("DOC-2026-001");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formNama, setFormNama] = useState("");
  const [formKategori, setFormKategori] = useState("SK Dekan");
  const [formTahun, setFormTahun] = useState("2026");
  const [formDeskripsi, setFormDeskripsi] = useState("");

  const handleUploadArsip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama.trim()) return;

    const newId = `DOC-2026-00${list.length + 3}`;
    const newItem: ArsipItem = {
      id: newId,
      namaDokumen: formNama.endsWith(".pdf") ? formNama : `${formNama}.pdf`,
      kategori: formKategori,
      tahun: formTahun || "2026",
      ukuran: "2.1 MB",
      tglUpload: "2 Agu 2026",
      deskripsi: formDeskripsi || "Dokumen resmi terarsip di sistem repositori fakultas.",
    };

    setList([newItem, ...list]);
    setSelectedId(newId);
    setShowUploadModal(false);
    setFormNama("");
    setFormDeskripsi("");
    setToastMessage(`Dokumen ${newItem.namaDokumen} BERHASIL DIUNGGAH KE ARSIP!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const filtered = list.filter((item) => {
    const matchSearch =
      item.namaDokumen.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchKategori = filterKategori === "Semua" || item.kategori === filterKategori;
    return matchSearch && matchKategori;
  });

  const selected = list.find((item) => item.id === selectedId) || filtered[0] || list[0];

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
                      <Archive className="w-3.5 h-3.5 text-white" /> Repository Digital Fakultas
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Arsip Dokumen &amp; Berita Acara Fakultas
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Penyimpanan resmi berkas SK Dekan, Berita Acara Yudisium, dan Dokumen Pedoman Tata Tulis Tugas Akhir.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
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
                      <Archive className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Tabel Arsip Dokumen</h2>
                      <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Berkas Dokumen Resmi</p>
                    </div>
                  </div>

                  {/* 1-Row Controls: Search Input + Animated Dropdown Filter + Red + Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-48 min-w-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Cari nama arsip dokumen..."
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
                        <span className="truncate max-w-[90px] sm:max-w-[120px]">{filterKategori}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${isFilterOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isFilterOpen && (
                        <>
                          <div className="fixed inset-0 z-20" onClick={() => setIsFilterOpen(false)} />
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                            {["Semua", "SK Dekan", "Yudisium", "Pedoman TA", "Nota Dinas"].map((k) => (
                              <button
                                key={k}
                                onClick={() => {
                                  setFilterKategori(k);
                                  setIsFilterOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                  filterKategori === k ? "bg-[#C62828] text-white" : "text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span>{k}</span>
                                {filterKategori === k && <Check className="w-3.5 h-3.5 text-white" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* + Unggah Arsip Button */}
                    <button
                      onClick={() => setShowUploadModal(true)}
                      title="Unggah Dokumen Arsip Baru"
                      className="px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all cursor-pointer font-display shadow-xs shrink-0 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4 text-white shrink-0" />
                      <span>Unggah</span>
                    </button>
                  </div>
                </div>

                {/* Table with Touch-Pan-X Smooth Container */}
                <div className="overflow-y-auto flex-1 scrollbar-none flex flex-col min-h-0">
                  <div className="overflow-x-auto w-full touch-pan-x flex-1 min-w-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[850px] border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                        <tr>
                          {["Kode Arsip", "Nama Dokumen Resmi", "Kategori", "Tahun", "Ukuran", "Tgl Unggah"].map((h) => (
                            <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filtered.map((doc) => {
                          const isSelected = selected?.id === doc.id;
                          return (
                            <tr
                              key={doc.id}
                              onClick={() => {
                                setSelectedId(doc.id);
                                setActiveMobileTab("detail");
                              }}
                              className={`transition-all cursor-pointer select-none ${
                                isSelected
                                  ? "bg-slate-100 font-bold"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <td className="px-4 py-3.5 font-mono text-[10.5px] font-bold text-[#C62828] whitespace-nowrap">{doc.id}</td>
                              <td className="px-4 py-3.5 max-w-sm space-y-0.5">
                                <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-display leading-snug">
                                  {doc.namaDokumen}
                                </h3>
                                <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">{doc.deskripsi}</p>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1 font-display">
                                  <Tag className="w-2.5 h-2.5" /> {doc.kategori}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-600 font-mono font-semibold">{doc.tahun}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-mono text-[10.5px]">{doc.ukuran}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-400 font-mono">{doc.tglUpload}</td>
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

                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-rose-50 text-rose-700 border border-rose-200 font-display">
                          {selected.kategori}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold ml-auto">{selected.tahun}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#C62828] font-mono block pt-1">{selected.id}</span>
                      <h3 className="text-sm font-black text-slate-900 font-display leading-snug break-words">{selected.namaDokumen}</h3>
                    </div>

                    <div className="space-y-3 text-xs min-w-0">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Ukuran Berkas &amp; Tgl Upload</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-mono">{selected.ukuran} · <span className="text-slate-500 font-normal">{selected.tglUpload}</span></p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Penerbit Dokumen:</span>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#C62828] shrink-0" />
                          <span className="font-bold text-slate-800 text-[11px] font-display">Fakultas Ilmu Komputer</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">Universitas Putra Indonesia YPTK Padang</p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display mb-1">Keterangan / Deskripsi Arsip</p>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11.5px] text-slate-700 leading-relaxed font-medium break-words">
                          {selected.deskripsi}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => alert(`Mengunduh berkas arsip resmi ${selected.namaDokumen}...`)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-white" />
                      <span>Unduh Berkas Arsip PDF</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </main>
        </div>
      </div>

      {/* MODAL UNGGAH DOKUMEN ARSIP BARU */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-display">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
                  <Archive className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display text-white">Unggah Dokumen Arsip Baru</h3>
                  <p className="text-[10.5px] text-slate-400 font-medium">Tambahkan berkas resmi ke repositori fakultas</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Modal Body */}
            <form onSubmit={handleUploadArsip} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Nama Dokumen Resmi (PDF)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Berita Acara Yudisium FIK Periode II 2026.pdf"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#C62828]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Kategori Dokumen</label>
                  <select
                    value={formKategori}
                    onChange={(e) => setFormKategori(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#C62828] font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="SK Dekan">SK Dekan</option>
                    <option value="Yudisium">Yudisium</option>
                    <option value="Pedoman TA">Pedoman TA</option>
                    <option value="Nota Dinas">Nota Dinas</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Tahun Terbit</label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={formTahun}
                    onChange={(e) => setFormTahun(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Keterangan / Deskripsi Arsip</label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan ringkasan singkat perihal dokumen arsip..."
                  value={formDeskripsi}
                  onChange={(e) => setFormDeskripsi(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#C62828]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Unggah Arsip Now</span>
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
