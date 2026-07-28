"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import {
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  FileText,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
} from "lucide-react";

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

const SAMPLE_DATA: JudulItem[] = [
  {
    no: 1,
    nim: "20101152630012",
    namaMahasiswa: "Adam Surya",
    judulTA: "Rancang Bangun Sistem Informasi Perjalanan & Evaluasi Tugas Akhir (SIPETA) Berbasis Web di UPI YPTK Padang",
    bidangKajian: "Rekayasa Perangkat Lunak",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
    status: "Disetujui",
    tahun: "2026",
  },
  {
    no: 2,
    nim: "20101152630015",
    namaMahasiswa: "Afdal Riandy",
    judulTA: "Penerapan Algoritma Convolutional Neural Network (CNN) untuk Klasifikasi Penyakit Daun Sawit",
    bidangKajian: "Kecerdasan Buatan",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Dr. Yanto, S.Kom., M.Kom.",
    status: "Selesai",
    tahun: "2025",
  },
  {
    no: 3,
    nim: "20101152630018",
    namaMahasiswa: "Afiq Izaan Salman",
    judulTA: "Pengembangan System Monitoring Infrastruktur Jaringan Kampus Berbasis SNMP dan Telegram Bot Gateway",
    bidangKajian: "Jaringan Komputer",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Dr. Jasmir, S.Kom., M.Kom.",
    status: "Disetujui",
    tahun: "2026",
  },
  {
    no: 4,
    nim: "20101152630022",
    namaMahasiswa: "Aisyah Marbun",
    judulTA: "Implementasi Framework Laravel dan ReactJS pada Sistem Manajemen Presensi Asisten Laboratorium Komputer",
    bidangKajian: "Rekayasa Perangkat Lunak",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Dr. Ir. Muhammad Adri, S.Pd., M.T.",
    status: "Selesai",
    tahun: "2025",
  },
  {
    no: 5,
    nim: "20101152630025",
    namaMahasiswa: "Alfajar Yusuffa",
    judulTA: "Analisis Sentimen Opini Publik terhadap Layanan Akademik Menggunakan Naive Bayes Classifier",
    bidangKajian: "Kecerdasan Buatan",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Dr. Syukhri, S.T., M.CIO.",
    status: "Selesai",
    tahun: "2025",
  },
  {
    no: 6,
    nim: "20101152630030",
    namaMahasiswa: "Alifia Athiqa Erlin",
    judulTA: "Rancang Bangun Application Programming Interface (API) Gateway Berbasis Microservices untuk Sistem Akademik",
    bidangKajian: "Rekayasa Perangkat Lunak",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Dr. Geovanne Farell, S.Pd., M.Pd.T.",
    status: "Disetujui",
    tahun: "2026",
  },
  {
    no: 7,
    nim: "20101152630034",
    namaMahasiswa: "Amalia Sagita S Rangkuti",
    judulTA: "Pengembangan Game Edukasi Interaktif Algoritma Pemrograman Berbasis Android pada FIK UPI YPTK",
    bidangKajian: "Kecerdasan Buatan",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Vera Irma Delianti, M.Pd.T.",
    status: "Selesai",
    tahun: "2025",
  },
  {
    no: 8,
    nim: "20101152630040",
    namaMahasiswa: "Amirah Ulfah Sakinah",
    judulTA: "Rancang Bangun Marketplace Kuliner Lokal Berbasis Web Geographic Information System (GIS) Kota Padang",
    bidangKajian: "Rekayasa Perangkat Lunak",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Dr. Syukhri, S.T., M.CIO.",
    status: "Disetujui",
    tahun: "2026",
  },
  {
    no: 9,
    nim: "20101152630045",
    namaMahasiswa: "Ananda Boersasi Dalfa",
    judulTA: "Rancang Bangun Sistem Keamanan Jaringan Menggunakan Intrusion Prevention System (IPS) Snort",
    bidangKajian: "Jaringan Komputer",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Winda Agustiarmi, S.Pd., M.Pd.T.",
    status: "Selesai",
    tahun: "2025",
  },
  {
    no: 10,
    nim: "20101152630050",
    namaMahasiswa: "Anisa Risma",
    judulTA: "Pengembangan Sistem Informasi Manajemen Operasional Laboratorium Komputer FIK UPI YPTK Padang",
    bidangKajian: "Rekayasa Perangkat Lunak",
    jenisTA: "Tugas Akhir Skripsi",
    pembimbing: "Hadi Kurnia Saputra, S.Pd., M.Kom.",
    status: "Disetujui",
    tahun: "2026",
  },
];

export default function ListJudulPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBidang, setSelectedBidang] = useState("Semua");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredData = SAMPLE_DATA.filter((item) => {
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
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Body */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Dark Hero Header Banner */}
          <div className="bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] rounded-2xl border border-[#333333] p-6 text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#C62828] text-white flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Repositori Resmi FIK
                  </span>
                  <span className="text-xs font-mono-data text-[#A0A0A0]">
                    111 Total Judul Terdaftar
                  </span>
                </div>
                <h2 className="text-2xl font-black font-display text-white tracking-wide">
                  Daftar &amp; Referensi Judul Tugas Akhir 📚
                </h2>
                <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed font-medium">
                  Database judul Skripsi / Tugas Akhir mahasiswa Fakultas Ilmu Komputer UPI YPTK Padang. Gunakan pencarian untuk memeriksa kemiripan ide atau mencari referensi topik penelitian.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" /> Uji Kemiripan Judul
                </button>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
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
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold">
                <Filter className="w-3.5 h-3.5 text-[#C62828]" />
                <span>Bidang:</span>
              </div>
              <select
                value={selectedBidang}
                onChange={(e) => setSelectedBidang(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 text-xs font-bold focus:outline-none focus:border-[#C62828] transition-all"
              >
                <option value="Semua">Semua Bidang Kajian</option>
                <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
                <option value="Kecerdasan Buatan">Kecerdasan Buatan</option>
                <option value="Jaringan Komputer">Jaringan Komputer</option>
              </select>

              <div className="flex items-center gap-1.5 text-slate-500 font-bold ml-2">
                <span>Tampilkan:</span>
              </div>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 text-xs font-bold focus:outline-none focus:border-[#C62828] transition-all"
              >
                <option value={10}>10 data</option>
                <option value={25}>25 data</option>
                <option value={50}>50 data</option>
              </select>
            </div>
          </div>

          {/* Main Grid: Data Table & Sidebar Info (Flush Bottom Aligned) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Column (2 Cols): Data Table */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex-1 flex flex-col justify-between">
                <div>
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C62828]" />
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Daftar Judul Tugas Akhir Mahasiswa FIK
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-rose-50 text-[#C62828] rounded-full border border-rose-200">
                      {filteredData.length} Judul Ditemukan
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider font-display border-b border-slate-200/80">
                        <tr>
                          <th className="py-3 px-3.5 w-10 text-center">No</th>
                          <th className="py-3 px-3.5 w-44">Nama Mahasiswa</th>
                          <th className="py-3 px-3.5">Judul Tugas Akhir / Skripsi</th>
                          <th className="py-3 px-3.5 w-36">Jenis TA</th>
                          <th className="py-3 px-3.5 w-44">Dosen Pembimbing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        {filteredData.map((item) => (
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
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                  {item.bidangKajian}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-600">
                                  ✓ Status: {item.status} ({item.tahun})
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3.5 font-semibold text-slate-700">
                              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                {item.jenisTA}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 font-medium text-slate-700">
                              <div className="flex items-center gap-1 text-slate-800 font-bold">
                                <UserCheck className="w-3.5 h-3.5 text-[#C62828] shrink-0" />
                                <span className="text-[11px]">{item.pembimbing}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
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

            {/* Right Column (1 Col): Statistics & Search Tips */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
              {/* Card 1: Distribusi Domain Penelitian */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C62828]" />
                  Distribusi Domain Penelitian
                </h3>

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
                  <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                    Ketentuan Mengajukan Judul
                  </h3>

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
  );
}
