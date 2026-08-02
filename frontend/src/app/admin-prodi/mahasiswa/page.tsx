"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  Search, Filter, Download, FileText, ArrowRight, ArrowLeft, ChevronDown, Check,
  CheckCircle2, Plus, X, XCircle
} from "lucide-react";

const NAV = [
  { label: "Dashboard",           href: "/admin-prodi/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa", href: "/admin-prodi/mahasiswa",  icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",       href: "/admin-prodi/aktivasi",   icon: <UserPlus className="w-4 h-4" /> },
  { label: "Jadwal Seminar",      href: "/admin-prodi/jadwal",     icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori",          href: "/admin-prodi/repositori", icon: <BookOpen className="w-4 h-4" /> },
];

type TahapKey = "Usulan" | "Bimbingan" | "Seminar" | "Sidang" | "Selesai";

interface MahasiswaItem {
  nim: string; nama: string; judul: string; tahap: TahapKey;
  pembimbing1: string; pembimbing2: string; ipk: number; sks: number;
  tglDaftar: string; status: string;
}

const INITIAL_MAHASISWA: MahasiswaItem[] = [
  { nim: "20101152630045", nama: "Danu Zen",         judul: "Sistem Informasi Manajemen Gudang Berbasis Web",           tahap: "Bimbingan", pembimbing1: "Dr. Sarjon Defit",  pembimbing2: "Rina Oktaviani",  ipk: 3.65, sks: 144, tglDaftar: "10 Jan 2026", status: "Aktif" },
  { nim: "20101152630089", nama: "Rafi Andika",       judul: "Implementasi ML untuk Deteksi Spam Email",                 tahap: "Seminar",   pembimbing1: "Dr. Sarjon Defit",  pembimbing2: "Sari Indah",      ipk: 3.78, sks: 147, tglDaftar: "5 Jan 2026",  status: "Aktif" },
  { nim: "20101152630101", nama: "Siti Rahayu",       judul: "Optimisasi Routing Jaringan Komputer",                     tahap: "Bimbingan", pembimbing1: "Prof. Budi, Ph.D",  pembimbing2: "Iwan, M.Kom.",    ipk: 3.55, sks: 145, tglDaftar: "12 Jan 2026", status: "Aktif" },
  { nim: "20101152630022", nama: "Budi Prasetyo",     judul: "Aplikasi Mobile Absensi Mahasiswa",                        tahap: "Sidang",    pembimbing1: "Dr. Sarjon Defit",  pembimbing2: "Rina Oktaviani",  ipk: 3.82, sks: 148, tglDaftar: "3 Jan 2026",  status: "Aktif" },
  { nim: "20101152630067", nama: "Anisa Permatasari", judul: "Klasifikasi Citra Daun dengan CNN",                        tahap: "Bimbingan", pembimbing1: "Dr. Ahmad Fauzi",  pembimbing2: "Sari Indah",      ipk: 3.71, sks: 144, tglDaftar: "15 Jan 2026", status: "Aktif" },
  { nim: "20101152630133", nama: "Fajar Nugroho",     judul: "Analisis Sentimen Review Produk Marketplace",              tahap: "Selesai",   pembimbing1: "Prof. Budi, Ph.D",  pembimbing2: "Iwan, M.Kom.",    ipk: 3.58, sks: 146, tglDaftar: "8 Jan 2026",  status: "Lulus" },
  { nim: "20101152630178", nama: "Wulandari Putri",   judul: "Deteksi Anomali Jaringan dengan Machine Learning",         tahap: "Usulan",    pembimbing1: "Belum Ditetapkan", pembimbing2: "Belum Ditetapkan", ipk: 3.62, sks: 143, tglDaftar: "20 Jan 2026", status: "Aktif" },
  { nim: "20101152630201", nama: "Teguh Santoso",     judul: "Sistem Monitoring Energi Listrik Berbasis IoT",            tahap: "Usulan",    pembimbing1: "Belum Ditetapkan", pembimbing2: "Belum Ditetapkan", ipk: 3.72, sks: 144, tglDaftar: "22 Jan 2026", status: "Aktif" },
];

const TAHAP_CFG: Record<TahapKey, { color: string; bg: string }> = {
  "Usulan":   { color: "#ffffff", bg: "bg-amber-600" },
  "Bimbingan":{ color: "#ffffff", bg: "bg-emerald-600" },
  "Seminar":  { color: "#ffffff", bg: "bg-amber-600" },
  "Sidang":   { color: "#ffffff", bg: "bg-[#C62828]" },
  "Selesai":  { color: "#ffffff", bg: "bg-emerald-700" },
};

export default function AdminProdiMahasiswaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mahasiswaList, setMahasiswaList] = useState<MahasiswaItem[]>(INITIAL_MAHASISWA);
  const [search, setSearch] = useState("");
  const [filterTahap, setFilterTahap] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"table" | "detail">("table");
  
  // Default selected 1st student
  const [selectedNim, setSelectedNim] = useState<string>("20101152630045");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formNim, setFormNim] = useState("");
  const [formNama, setFormNama] = useState("");
  const [formJudul, setFormJudul] = useState("");
  const [formIpk, setFormIpk] = useState("3.65");
  const [formSks, setFormSks] = useState("144");

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNim || !formNama) return;

    const newItem: MahasiswaItem = {
      nim: formNim,
      nama: formNama,
      judul: formJudul || "Belum Mengajukan Judul",
      tahap: "Usulan",
      pembimbing1: "Belum Ditetapkan",
      pembimbing2: "Belum Ditetapkan",
      ipk: parseFloat(formIpk) || 3.5,
      sks: parseInt(formSks) || 144,
      tglDaftar: "Hari ini",
      status: "Aktif",
    };

    setMahasiswaList([newItem, ...mahasiswaList]);
    setSelectedNim(formNim); // Select newly created student
    setShowAddModal(false);
    setToastMessage(`Data mahasiswa ${formNama} (${formNim}) berhasil di-inputkan!`);

    // Reset Form
    setFormNim("");
    setFormNama("");
    setFormJudul("");
    setTimeout(() => setToastMessage(null), 5000);
  };

  const filtered = mahasiswaList.filter((m) => {
    const ms = m.nama.toLowerCase().includes(search.toLowerCase()) || m.nim.includes(search) || m.judul.toLowerCase().includes(search.toLowerCase());
    const mt = filterTahap === "Semua" || m.tahap === filterTahap;
    return ms && mt;
  });

  const selected = mahasiswaList.find((m) => m.nim === selectedNim) || filtered[0] || INITIAL_MAHASISWA[0];

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Hafizah, S.Kom., M.Kom." userNim="NIP: 198504122010122001" userRole="Admin Prodi" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <Users className="w-3.5 h-3.5 text-white" /> Database Mahasiswa TA Prodi TI
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Selamat Datang
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Database &amp; manajemen data mahasiswa Tugas Akhir prodi. Input data clearing, pantau alur pendaftaran, hingga kelulusan.
                  </p>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Control Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Tabel Mahasiswa Active ({filtered.length})</h2>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
                <div className="relative flex-1 min-w-0">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input type="text" placeholder="Cari..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className="pl-7 pr-2 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all w-full font-display"
                  />
                </div>

                {/* Dropdown Filter */}
                <div className="relative shrink-0 font-display">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 transition-all cursor-pointer whitespace-nowrap font-display shadow-2xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-[#C62828] shrink-0" />
                      <span>{filterTahap}</span>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>

                  {isFilterOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                      <div className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 min-w-[140px] space-y-0.5 font-display animate-in fade-in zoom-in-95 duration-150">
                        {["Semua", "Usulan", "Bimbingan", "Seminar", "Sidang", "Selesai"].map((f) => (
                          <button
                            key={f}
                            onClick={() => {
                              setFilterTahap(f);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              filterTahap === f ? "bg-[#C62828] text-white" : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span>{f}</span>
                            {filterTahap === f && <Check className="w-3.5 h-3.5 text-white" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  title="Input Mahasiswa TA Baru"
                  className="p-2.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all cursor-pointer font-display shadow-xs shrink-0 active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-white shrink-0" />
                  <span className="hidden sm:inline">Input</span>
                </button>
              </div>
            </div>

            {/* Grid layout with Detail Side Panel */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all flex-1 min-h-0 flex-col min-w-0 ${
                activeMobileTab === "table" ? "flex" : "hidden lg:flex"
              }`}>
                <div className="overflow-y-auto overflow-x-auto flex-1 scrollbar-none pb-10">
                  <table className="w-full text-xs min-w-[750px]">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["NIM", "Nama Mahasiswa", "Judul TA", "Pembimbing I", "Tahap", "IPK"].map((h) => (
                          <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((row) => {
                        const tc = TAHAP_CFG[row.tahap];
                        const isSelected = selected?.nim === row.nim;
                        return (
                          <tr
                            key={row.nim}
                            onClick={() => {
                              setSelectedNim(row.nim);
                              setActiveMobileTab("detail");
                            }}
                            className={`transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-slate-100 font-bold"
                                : "hover:bg-slate-50/60"
                            }`}
                          >
                            <td className="px-4 py-3.5 font-mono text-[10.5px] text-slate-500">{row.nim}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-4 py-3.5 max-w-[220px]">
                              <p className="text-slate-600 truncate text-[11.5px] font-medium">&ldquo;{row.judul}&rdquo;</p>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 font-medium">{row.pembimbing1}</td>
                            <td className="px-4 py-3.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs font-display ${tc.bg}`}>{row.tahap}</span>
                            </td>
                            <td className="px-4 py-3.5 font-black text-slate-900 font-display">{row.ipk}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Always Visible Detail Panel (Updates Live Based on Selected Row) */}
              {selected && (
                <div className={`w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150 ${
                  activeMobileTab === "detail" ? "flex flex-1" : "hidden lg:flex"
                }`}>
                  <div className="space-y-4 overflow-y-auto scrollbar-none">
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveMobileTab("table")}
                        className="lg:hidden p-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 text-[#C62828]" />
                        <span>Kembali</span>
                      </button>

                      <div className="hidden lg:block min-w-0">
                        <span className="text-[10px] font-bold text-[#C62828] uppercase tracking-widest font-display">Detail Mahasiswa</span>
                        <h3 className="text-base font-black text-slate-900 font-display mt-0.5 truncate">{selected.nama}</h3>
                      </div>

                      <span className="text-[10px] sm:text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 shrink-0 ml-auto">
                        {selected.nim}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Judul Penelitian</p>
                        <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-snug">&ldquo;{selected.judul}&rdquo;</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                          <p className="text-xl font-black text-[#C62828] font-display">{selected.ipk}</p>
                          <p className="text-[9px] text-slate-400 font-bold font-display">IPK Terakhir</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                          <p className="text-xl font-black text-emerald-600 font-display">{selected.sks}</p>
                          <p className="text-[9px] text-slate-400 font-bold font-display">Total SKS</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Pembimbing I</p>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">{selected.pembimbing1}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Pembimbing II</p>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">{selected.pembimbing2}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Tanggal Pengajuan</p>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5 font-mono">{selected.tglDaftar}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer">
                      <FileText className="w-3.5 h-3.5 text-white" /> Berkas Lengkap
                    </button>
                    <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-display cursor-pointer">
                      Ubah Dosen Pembimbing
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* MODAL INPUT MAHASISWA BARU */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display text-white">Input Mahasiswa TA Baru</h3>
                  <p className="text-[10.5px] text-slate-400 font-medium">Validasi &amp; Input Mandiri oleh Admin Prodi</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 font-display">NIM (Nomor Induk Mahasiswa) <span className="text-[#C62828]">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 20101152630310"
                  value={formNim}
                  onChange={(e) => setFormNim(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 font-display">Nama Lengkap Mahasiswa <span className="text-[#C62828]">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Rizky"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 font-display">Judul Usulan Penelitian (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Sistem Informasi Monitoring Kinerja Dosen..."
                  value={formJudul}
                  onChange={(e) => setFormJudul(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">IPK Terakhir</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formIpk}
                    onChange={(e) => setFormIpk(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Total SKS Lulus</label>
                  <input
                    type="number"
                    value={formSks}
                    onChange={(e) => setFormSks(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-display cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 shadow-xs font-display cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Simpan Data Mahasiswa</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
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
