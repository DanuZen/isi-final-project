"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import {
  Search,
  BookOpen,
  Filter,
  FileText,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
  CheckCircle2,
  PieChart,
} from "lucide-react";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { storeProposal } from "@/lib/sipeta-store";

interface JudulItem {
  no: number;
  nim: string;
  namaMahasiswa: string;
  judulTA: string;
  bidangKajian: string;
  jenisTA: string;
  pembimbing: string;
  status: "Disetujui" | "Selesai" | "Review";
  tahun: string;
}

const SAMPLE_DATA: JudulItem[] = [];

export default function ListJudulPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBidang, setSelectedBidang] = useState("Semua");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [, setCurrentPage] = useState(1);

  const [judulList, setJudulList] = useState<JudulItem[]>([]);

  const syncJudul = React.useCallback(() => {
    const prop = storeProposal.get();
    const stored: JudulItem[] = prop ? [{
      no: 1,
      nim: "20101152630045",
      namaMahasiswa: "Danu Zen",
      judulTA: prop.judul,
      bidangKajian: prop.bidangKajian,
      jenisTA: "Tugas Akhir Skripsi",
      pembimbing: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
      status: "Disetujui",
      tahun: "2026",
    }] : [];
    setJudulList(stored);
  }, []);

  React.useEffect(() => {
    syncJudul();
    window.addEventListener("storage_sipeta", syncJudul);
    return () => window.removeEventListener("storage_sipeta", syncJudul);
  }, [syncJudul]);

  // Filter Logic
  const filteredData = judulList.filter((item) => {
    const matchesSearch =
      item.judulTA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaMahasiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pembimbing.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nim.includes(searchTerm);

    const matchesBidang =
      selectedBidang === "Semua" || item.bidangKajian === selectedBidang;

    return matchesSearch && matchesBidang;
  });

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top Header */}
          <Header className="shell-header shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Page Body */}
          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                {/* Left: greeting + status */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#C62828] text-white shadow-xs font-display">
                      <BookOpen className="w-3.5 h-3.5" /> Repositori Resmi UPI YPTK
                    </span>
                  </div>
                  <h1 className="text-base sm:text-lg md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Daftar &amp; Referensi Judul Tugas Akhir
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Database repositori naskah Skripsi / Tugas Akhir seluruh mahasiswa Universitas UPI YPTK Padang. Gunakan pencarian untuk mengecek ketersediaan judul atau mencari referensi topik.
                  </p>
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>


            {/* Search & Filter Controls Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
              {/* Search Input */}
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari judul, nama mahasiswa, NIM, atau dosen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/80 text-xs font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-[#C62828] transition-all"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex items-center gap-2 text-xs z-20 w-full md:w-auto">
                <CustomDropdown
                  value={selectedBidang}
                  onChange={(val) => setSelectedBidang(val)}
                  options={[
                    { id: "Semua", label: "Semua Bidang Kajian", badge: "ALL" },
                    { id: "Rekayasa Perangkat Lunak", label: "Rekayasa Perangkat Lunak (RPL)" },
                    { id: "Kecerdasan Buatan", label: "Kecerdasan Buatan (AI/Data)" },
                    { id: "Jaringan Komputer", label: "Jaringan Komputer" },
                  ]}
                  placeholder="Pilih Bidang..."
                  className="flex-1 min-w-0 md:w-56"
                />

                <CustomDropdown
                  value={String(entriesPerPage)}
                  onChange={(val) => setEntriesPerPage(Number(val))}
                  options={[
                    { id: "10", label: "10 data / hal" },
                    { id: "25", label: "25 data / hal" },
                    { id: "50", label: "50 data / hal" },
                  ]}
                  placeholder="Jumlah..."
                  className="w-32 md:w-36 shrink-0"
                />
              </div>
            </div>

            {/* Main Grid: Data Table & Sidebar Info (Flush Bottom Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0 overflow-hidden">
              {/* Left Column (8/12): Data Table */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden">
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
                  <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                          <FileText className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 font-display">
                          Daftar Judul Tugas Akhir Mahasiswa UPI YPTK
                        </h3>
                      </div>
                      <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#C62828] text-white shadow-xs font-display">
                        {filteredData.length} Judul Ditemukan
                      </span>
                    </div>

                    {/* ── Table Container Always Present ── */}
                    <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto scrollbar-none relative">
                      <table className="w-full text-left text-xs min-w-[650px]">
                        <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider font-display border-b border-slate-200/80 sticky top-0 z-10">
                          <tr>
                            <th className="py-3 px-3.5 w-12 text-center whitespace-nowrap">No</th>
                            <th className="py-3 px-3.5 w-44 whitespace-nowrap">Nama Mahasiswa</th>
                            <th className="py-3 px-3.5 min-w-[260px] whitespace-nowrap">Judul Tugas Akhir / Skripsi</th>
                            <th className="py-3 px-3.5 w-36 whitespace-nowrap">Jenis TA</th>
                            <th className="py-3 px-3.5 w-44 whitespace-nowrap">Dosen Pembimbing</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                          {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                              <tr key={item.no} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-3 px-3.5 text-center font-mono-data font-bold text-slate-500">
                                  {item.no}
                                </td>
                                <td className="py-3 px-3.5 font-bold text-slate-900">
                                  <p className="font-bold text-slate-900">{item.namaMahasiswa}</p>
                                  <p className="text-[10px] font-mono-data text-slate-500 font-medium">NIM: {item.nim}</p>
                                </td>
                                <td className="py-3 px-3.5">
                                  <p className="font-bold text-slate-900 leading-snug">
                                    {item.judulTA}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                                      {item.bidangKajian}
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-600">
                                      ✓ Status: {item.status} ({item.tahun})
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-3.5 font-semibold text-slate-700 whitespace-nowrap">
                                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-slate-800 text-white shadow-xs font-display">
                                    {item.jenisTA}
                                  </span>
                                </td>
                                <td className="py-3 px-3.5 font-medium text-slate-700">
                                  <span className="text-[11px] font-bold text-slate-800">{item.pembimbing}</span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="py-24 text-center">
                                <div className="sticky left-0 right-0 w-[calc(100vw-3.5rem)] md:w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center space-y-3 font-display">
                                  <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-[#C62828] flex items-center justify-center shadow-xs">
                                    <BookOpen className="w-7 h-7" />
                                  </div>
                                  <p className="font-extrabold text-sm text-slate-900">Belum Ada Judul Terdaftar di Repositori</p>
                                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    Usulan judul baru yang dikirimkan mahasiswa akan langsung tersimpan secara otomatis di sini.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Footer */}
                  <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
                    <p className="text-slate-500 font-medium">
                      Menampilkan <strong className="text-slate-800">1 - {filteredData.length}</strong> dari <strong className="text-slate-800">111</strong> total data
                    </p>

                    <div className="flex items-center gap-1 font-bold">
                      <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 flex items-center gap-1 text-[11px]">
                        <ChevronLeft className="w-3.5 h-3.5" /> Sebelumnya
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#C62828] to-[#990000] text-white flex items-center justify-center text-[11px] shadow-xs">
                        1
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center text-[11px]">
                        2
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center text-[11px]">
                        3
                      </button>
                      <span className="px-1 text-slate-400">...</span>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center text-[11px]">
                        12
                      </button>
                      <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1 text-[11px]">
                        Selanjutnya <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (4/12): Statistics & Search Tips */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden">
                {/* Card 1: Distribusi Domain Penelitian */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <PieChart className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Distribusi Domain Penelitian
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-bold text-slate-800 mb-1">
                        <span>Rekayasa Perangkat Lunak (RPL)</span>
                        <span className="text-[#C62828]">52% (58 Judul)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-[#C62828] h-2 rounded-full w-[52%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-800 mb-1">
                        <span>Kecerdasan Buatan (AI/Data)</span>
                        <span className="text-amber-600">31% (34 Judul)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full w-[31%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-800 mb-1">
                        <span>Jaringan &amp; Keamanan Siber</span>
                        <span className="text-emerald-600">17% (19 Judul)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full w-[17%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Panduan Pengajuan Judul Baru (Stretches to match bottom baseline) */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Ketentuan Mengajukan Judul
                      </h3>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 font-medium mt-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Pastikan topik belum pernah diteliti sebelumnya</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Skor similarity maksimal 25% pada sistem SIPETA</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Memuat kontribusi metode/objek penelitian baru</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-3.5 h-3.5 text-[#C62828]" /> Unduh Pedoman Judul Skripsi.pdf
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
