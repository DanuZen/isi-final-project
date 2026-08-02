"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  Plus, Edit2, ArrowRight, Search, Building2, MapPin, Award, CheckCircle2, ArrowLeft
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" /> },
  { label: "Konfigurasi",     href: "/super-admin/config",      icon: <Settings className="w-4 h-4" /> },
  { label: "Master Data",     href: "/super-admin/master",      icon: <Database className="w-4 h-4" /> },
];

interface MasterProdi {
  kode: string;
  nama: string;
  jenjang: string;
  kaprodi: string;
  nipKaprodi: string;
  totalMhs: number;
  totalDosen: number;
  akreditasi: string;
  ruangUtama: string;
}

const PRODI_LIST: MasterProdi[] = [
  // FILKOM
  { kode: "IF", nama: "Teknik Informatika (FILKOM)", jenjang: "S1", kaprodi: "Dr. Ratna Dewi, M.Kom.", nipKaprodi: "197804122005012003", totalMhs: 356, totalDosen: 22, akreditasi: "Unggul (A)", ruangUtama: "Aula FILKOM Lt. 2 & Ruang 302" },
  { kode: "SI", nama: "Sistem Informasi (FILKOM)", jenjang: "S1", kaprodi: "Dr. Suparman, M.Kom.", nipKaprodi: "198109152008031002", totalMhs: 280, totalDosen: 16, akreditasi: "Sangat Baik (B+)", ruangUtama: "Ruang Seminar 304" },
  { kode: "SK", nama: "Sistem Komputer (FILKOM)", jenjang: "S1", kaprodi: "Ir. Doni Hendra, M.T.", nipKaprodi: "197506202002121001", totalMhs: 142, totalDosen: 10, akreditasi: "Sangat Baik (B+)", ruangUtama: "Laboratorium Komputer 2" },
  { kode: "RPL", nama: "Rekayasa Perangkat Lunak (FILKOM)", jenjang: "S1", kaprodi: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.", nipKaprodi: "1012057301", totalMhs: 110, totalDosen: 8, akreditasi: "Baik Sekali (B)", ruangUtama: "Lab Software Engineering" },
  { kode: "MI", nama: "Manajemen Informatika (FILKOM)", jenjang: "D3", kaprodi: "Drs. Yanti Susanti, M.Kom.", nipKaprodi: "198302112009022005", totalMhs: 95, totalDosen: 6, akreditasi: "Baik (B)", ruangUtama: "Lab Aplikasi Web" },
  // FEB
  { kode: "MNJ", nama: "Manajemen (FEB)", jenjang: "S1", kaprodi: "Dr. Hj. Yulihasri, S.E., M.M.", nipKaprodi: "197203181998022001", totalMhs: 420, totalDosen: 25, akreditasi: "Unggul (A)", ruangUtama: "Gedung FEB Lt. 3" },
  { kode: "AKT", nama: "Akuntansi (FEB)", jenjang: "S1", kaprodi: "Dr. Melalgritas, S.E., M.Si., Ak.", nipKaprodi: "197608142003121002", totalMhs: 310, totalDosen: 18, akreditasi: "Unggul (A)", ruangUtama: "Lab Auditing & SIA FEB" },
  // FT
  { kode: "TSP", nama: "Teknik Sipil (FT)", jenjang: "S1", kaprodi: "Ir. Ahmad Fauzi, M.T.", nipKaprodi: "197411052001121003", totalMhs: 210, totalDosen: 14, akreditasi: "Sangat Baik (B+)", ruangUtama: "Lab Bahan & Keairan FT" },
  { kode: "TIND", nama: "Teknik Industri (FT)", jenjang: "S1", kaprodi: "Dr. Riko Saputra, M.T.", nipKaprodi: "198005122006041001", totalMhs: 180, totalDosen: 12, akreditasi: "Baik (B)", ruangUtama: "Lab Ergonomi FT" },
  { kode: "TEL", nama: "Teknik Elektro (FT)", jenjang: "S1", kaprodi: "Ir. Hendra Saputra, M.T.", nipKaprodi: "197709252004011002", totalMhs: 165, totalDosen: 11, akreditasi: "Baik (B)", ruangUtama: "Lab Mechatronics FT" },
  // FPsi
  { kode: "PSI", nama: "Psikologi (FPsi)", jenjang: "S1", kaprodi: "Dr. Nida Ul Hasanah, S.Psi., M.Psi.", nipKaprodi: "198412012010012008", totalMhs: 250, totalDosen: 15, akreditasi: "Sangat Baik (B+)", ruangUtama: "Ruang Konseling & Lab Psikodiagnostik" },
  // FDKV
  { kode: "DKV", nama: "Desain Komunikasi Visual (FDKV)", jenjang: "S1", kaprodi: "Rian Hidayat, S.Ds., M.Sn.", nipKaprodi: "198807192015041003", totalMhs: 190, totalDosen: 13, akreditasi: "Sangat Baik (B+)", ruangUtama: "Studio Desain & Animasi FDKV" },
  // FKIP
  { kode: "PTI", nama: "Pendidikan Teknik Informatika (FKIP)", jenjang: "S1", kaprodi: "Dr. Rahmadini, M.Pd.", nipKaprodi: "198206142008012004", totalMhs: 175, totalDosen: 12, akreditasi: "Baik Sekali (B)", ruangUtama: "Lab Media Pembelajaran FKIP" },
  { kode: "BK", nama: "Bimbingan dan Konseling (FKIP)", jenjang: "S1", kaprodi: "Dra. Elfi Rahmi, M.Pd.", nipKaprodi: "197304081999032002", totalMhs: 140, totalDosen: 9, akreditasi: "Baik (B)", ruangUtama: "Laboratorium Konseling FKIP" },
];

export default function SuperAdminMasterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedKode, setSelectedKode] = useState<string>("IF");
  const [activeMobileTab, setActiveMobileTab] = useState<"table" | "detail">("table");

  const filtered = PRODI_LIST.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.kode.toLowerCase().includes(search.toLowerCase()) ||
      p.kaprodi.toLowerCase().includes(search.toLowerCase())
  );

  const selected = PRODI_LIST.find((p) => p.kode === selectedKode) || filtered[0] || PRODI_LIST[0];

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          items={NAV}
          userName="Irvan Syahputra, S.T."
          userNim="SA-001"
          roleName="Super Admin"
          prodiName="Sistem Utama SIPETA"
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header
            className="shell-header shrink-0"
            userName="Irvan Syahputra, S.T."
            userNim="SA-001"
            userRole="Super Admin"
            prodiName="Sistem Utama SIPETA"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <Database className="w-3.5 h-3.5 text-white" /> Database Master Reference
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Master Data Akademik &amp; Program Studi
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pengelolaan data induk Program Studi, Fakultas, Jenjang Pendidikan, Ketua Prodi (Ka. Prodi), serta referensi ruang sidang.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <button
                    onClick={() => alert("Membuka modal penambahan Program Studi baru...")}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-white" />
                    <span>Tambah Program Studi</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Grid Layout with Live Side Detail Panel Card */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex-col min-w-0 ${
                activeMobileTab === "table" ? "flex" : "hidden lg:flex"
              }`}>
                {/* Integrated Table Card Header + Controls */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-white">
                  <div className="flex items-center justify-between sm:justify-start gap-2.5 shrink-0 w-full sm:w-auto">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm text-slate-900 font-display">Master Data Program Studi</h2>
                        <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Prodi Terdaftar</p>
                      </div>
                    </div>

                    {/* Mobile Only Action Button */}
                    <button
                      onClick={() => alert("Membuka modal penambahan Program Studi baru...")}
                      className="sm:hidden px-3 py-1.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-2xs font-display flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah</span>
                    </button>
                  </div>

                  {/* 1-Row Controls: Search Input */}
                  <div className="relative flex-1 sm:w-64 max-w-xs min-w-0">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Cari prodi, kode, kaprodi..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-7 pr-2 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all w-full font-display"
                    />
                  </div>
                </div>

                {/* Table with Touch-Pan-X Smooth Container */}
                <div className="overflow-y-auto flex-1 scrollbar-none flex flex-col min-h-0">
                  <div className="overflow-x-auto w-full touch-pan-x flex-1 min-w-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[850px] border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                        <tr>
                          {["Kode", "Nama Program Studi", "Jenjang", "Ketua Prodi (Ka. Prodi)", "Status Akreditasi", "Jumlah Mahasiswa TA"].map((h) => (
                            <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filtered.map((p) => {
                          const isSelected = selected?.kode === p.kode;
                          return (
                            <tr
                              key={p.kode}
                              onClick={() => {
                                setSelectedKode(p.kode);
                                setActiveMobileTab("detail");
                              }}
                              className={`transition-all cursor-pointer select-none ${
                                isSelected
                                  ? "bg-slate-100 font-bold"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <td className="px-4 py-3.5 font-mono font-bold text-slate-900">{p.kode}</td>
                              <td className="px-4 py-3.5 font-bold text-slate-900 font-display whitespace-nowrap">{p.nama}</td>
                              <td className="px-4 py-3.5 font-bold text-slate-600">{p.jenjang}</td>
                              <td className="px-4 py-3.5 text-slate-700 font-medium whitespace-nowrap">{p.kaprodi}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C62828] text-white shadow-2xs font-display">
                                  {p.akreditasi}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 font-bold text-slate-800 font-mono whitespace-nowrap">{p.totalMhs} Mahasiswa</td>
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
                          {selected.jenjang}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold ml-auto">KODE: {selected.kode}</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 font-display break-words">{selected.nama}</h3>
                    </div>

                    <div className="space-y-3 text-xs min-w-0">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Ketua Program Studi</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-display break-words">{selected.kaprodi}</p>
                        <p className="text-[10.5px] text-slate-400 font-mono">NIP: {selected.nipKaprodi}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Statistik Master:</span>
                        <div className="space-y-1 text-slate-700">
                          <p><strong className="text-slate-900">Total Mahasiswa TA:</strong> {selected.totalMhs} Mhs</p>
                          <p><strong className="text-slate-900">Total Dosen Pembimbing:</strong> {selected.totalDosen} Dosen</p>
                          <p><strong className="text-slate-900">Akreditasi BAN-PT:</strong> {selected.akreditasi}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px] font-display">
                          <MapPin className="w-3.5 h-3.5 text-[#C62828] shrink-0" />
                          <span>Ruang Sidang Utama</span>
                        </div>
                        <p className="text-[10.5px] text-slate-600 font-medium leading-normal">{selected.ruangUtama}</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <button
                      onClick={() => alert(`Membuka modal edit data prodi ${selected.nama}...`)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-white" />
                      <span>Edit Master Data Prodi</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
