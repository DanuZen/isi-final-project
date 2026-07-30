"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  Plus, Edit2, ArrowRight, Search, Building2, MapPin, Award, CheckCircle2
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
  { kode: "IF", nama: "Teknik Informatika", jenjang: "S1", kaprodi: "Dr. Ratna Dewi, M.Kom.", nipKaprodi: "197804122005012003", totalMhs: 356, totalDosen: 22, akreditasi: "Unggul (A)", ruangUtama: "Aula FIK Lt. 2 & Ruang 302" },
  { kode: "SI", nama: "Sistem Informasi", jenjang: "S1", kaprodi: "Dr. Suparman, M.Kom.", nipKaprodi: "198109152008031002", totalMhs: 280, totalDosen: 16, akreditasi: "Sangat Baik (B+)", ruangUtama: "Ruang Seminar 304" },
  { kode: "SK", nama: "Sistem Komputer", jenjang: "S1", kaprodi: "Ir. Doni Hendra, M.T.", nipKaprodi: "197506202002121001", totalMhs: 142, totalDosen: 10, akreditasi: "Sangat Baik (B+)", ruangUtama: "Laboratorium Komputer 2" },
];

export default function SuperAdminMasterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedKode, setSelectedKode] = useState<string>("IF");

  const filtered = PRODI_LIST.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.kode.toLowerCase().includes(search.toLowerCase()) ||
      p.kaprodi.toLowerCase().includes(search.toLowerCase())
  );

  const selected = PRODI_LIST.find((p) => p.kode === selectedKode) || filtered[0] || PRODI_LIST[0];

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Irvan Syahputra, S.T." userNim="SA-001" userRole="Super Admin" prodiName="Sistem Utama SIPETA" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

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

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <button
                    onClick={() => alert("Membuka modal penambahan Program Studi baru...")}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-white" />
                    <span>Tambah Program Studi</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Program Studi Terdaftar ({filtered.length})</h2>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari prodi, kode, kaprodi..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] w-56 transition-all font-display"
                />
              </div>
            </div>

            {/* Grid Layout with Live Side Detail Panel Card */}
            <div className="flex gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col">
                <div className="overflow-y-auto flex-1 scrollbar-none pb-12">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["Kode", "Nama Program Studi", "Jenjang", "Ketua Prodi (Ka. Prodi)", "Status Akreditas", "Jumlah Mahasiswa TA"].map((h) => (
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
                            onClick={() => setSelectedKode(p.kode)}
                            className={`transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-rose-50/70 border-l-4 border-l-[#C62828]"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-4 py-3.5 font-mono font-bold text-slate-900">{p.kode}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-900 font-display whitespace-nowrap">{p.nama}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-600">{p.jenjang}</td>
                            <td className="px-4 py-3.5 text-slate-700 font-medium whitespace-nowrap">{p.kaprodi}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-[#C62828] border border-rose-200 font-display">
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

              {/* Live Side Detail Panel Card */}
              {selected && (
                <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-4 overflow-y-auto scrollbar-none">
                    
                    <div className="pb-3 border-b border-slate-100 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#C62828] text-white font-display shadow-2xs">
                          {selected.jenjang}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">KODE: {selected.kode}</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 font-display">{selected.nama}</h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Ketua Program Studi</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-display">{selected.kaprodi}</p>
                        <p className="text-[10.5px] text-slate-400 font-mono">NIP: {selected.nipKaprodi}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Statistik Master:</span>
                        <div className="space-y-1 text-slate-700">
                          <p><strong className="text-slate-900">Total Mahasiswa TA:</strong> {selected.totalMhs} Mhs</p>
                          <p><strong className="text-slate-900">Total Dosen Pembimbing:</strong> {selected.totalDosen} Dosen</p>
                          <p><strong className="text-slate-900">Akreditasi BAN-PT:</strong> {selected.akreditasi}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px] font-display">
                          <MapPin className="w-3.5 h-3.5 text-[#C62828]" />
                          <span>Ruang Sidang Utama</span>
                        </div>
                        <p className="text-[10.5px] text-slate-600 font-medium">{selected.ruangUtama}</p>
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
