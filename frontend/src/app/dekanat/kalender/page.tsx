"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  MapPin, Clock, Calendar as CalendarIcon, ArrowRight, Search, Filter, UserCheck, Building2,
  ChevronDown, Check, ArrowLeft
} from "lucide-react";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

interface SidangItem {
  id: string;
  tgl: string;
  waktu: string;
  mhs: string;
  nim: string;
  prodi: string;
  jenis: "Ujian Sidang" | "Seminar Proposal";
  ruang: string;
  ketua: string;
  penguji2: string;
  judul: string;
}

import { storeJadwal } from "@/lib/sipeta-store";

export default function DekanatKalenderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [activeMobileTab, setActiveMobileTab] = useState<"table" | "detail">("table");

  const [sidangList, setSidangList] = useState<SidangItem[]>([]);

  const syncData = React.useCallback(() => {
    const list = storeJadwal.getAll().map((j) => ({
      id: j.id,
      tgl: j.tglNum ? `${j.tglNum} Agt 2026` : "Terjadwal",
      waktu: j.waktu || "09:00 WIB",
      mhs: j.studentNama,
      nim: j.studentNim,
      prodi: j.prodi,
      jenis: (j.jenis === "Seminar" ? "Seminar Proposal" : "Ujian Sidang") as SidangItem["jenis"],
      ruang: j.ruang || "Aula FIK Lt. 2",
      ketua: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
      penguji2: "Dr. Jasmir, S.Kom., M.Kom.",
      judul: j.judul,
    }));
    setSidangList(list);
    if (list.length > 0 && !selectedId) {
      setSelectedId(list[0].id);
    }
  }, [selectedId]);

  React.useEffect(() => {
    syncData();
    window.addEventListener("storage_sipeta", syncData);
    return () => window.removeEventListener("storage_sipeta", syncData);
  }, [syncData]);

  const filtered = sidangList.filter((item) => {
    const matchSearch =
      item.mhs.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.includes(search) ||
      item.ketua.toLowerCase().includes(search.toLowerCase());
    const matchJenis = filterJenis === "Semua" || item.jenis === filterJenis;
    return matchSearch && matchJenis;
  });

  const selected = sidangList.find((item) => item.id === selectedId) || filtered[0] || sidangList[0];

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          items={NAV}
          userName="Prof. Dr. H. Zulherman, M.T."
          userNim="NIP: 196508201990031001"
          roleName="Dekan FIK"
          prodiName="Fakultas Ilmu Komputer"
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header
            className="shell-header shrink-0"
            userName="Prof. Dr. H. Zulherman, M.T."
            userNim="NIP: 196508201990031001"
            userRole="Dekan FIK"
            prodiName="Fakultas Ilmu Komputer"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <CalendarDays className="w-3.5 h-3.5 text-white" /> Monitoring Sesi Ujian Fakultas
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Agenda &amp; Jadwal Sidang Fakultas (FIK)
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pemantauan eksekutif pimpinan terhadap kelancaran jadwal pelaksanaan seminar proposal &amp; ujian sidang skripsi mahasiswa.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Dashboard Dekan</span>
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
                      <CalendarDays className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Agenda Jadwal Sidang Dekanat</h2>
                      <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Sesi Terdaftar</p>
                    </div>
                  </div>

                  {/* 1-Row Controls: Search Input + Animated Dropdown Filter */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-52 min-w-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Cari mhs, NIM, penguji..."
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
                            {["Semua", "Ujian Sidang", "Seminar Proposal"].map((j) => (
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
                  </div>
                </div>

                {/* Table with Touch-Pan-X Smooth Container */}
                <div className="overflow-y-auto flex-1 scrollbar-none flex flex-col min-h-0">
                  <div className="overflow-x-auto w-full touch-pan-x flex-1 min-w-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[850px] border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                        <tr>
                          {["Tanggal & Waktu", "Mahasiswa", "Prodi", "Jenis Ujian", "Ketua Penguji", "Ruangan"].map((h) => (
                            <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filtered.map((row) => {
                          const isSelected = selected?.id === row.id;
                          return (
                            <tr
                              key={row.id}
                              onClick={() => {
                                setSelectedId(row.id);
                                setActiveMobileTab("detail");
                              }}
                              className={`transition-all cursor-pointer select-none ${
                                isSelected
                                  ? "bg-slate-100 font-bold"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className="font-bold text-slate-900 font-display block">{row.tgl}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{row.waktu}</span>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className="font-bold text-slate-900 font-display block">{row.mhs}</span>
                                <span className="text-[10px] text-slate-400 font-mono">NIM: {row.nim}</span>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-600 font-medium">{row.prodi}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#C62828] text-white font-display shadow-2xs">
                                  {row.jenis}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 font-medium">{row.ketua}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap font-bold text-[#C62828] font-display">{row.ruang}</td>
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
                        <span className="text-[10px] font-mono text-slate-400 font-semibold ml-auto">{selected.id}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 font-display mt-1 leading-snug break-words">&ldquo;{selected.judul}&rdquo;</h3>
                    </div>

                    <div className="space-y-3 text-xs min-w-0">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Mahasiswa Peserta</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-display break-words">{selected.mhs} <span className="text-slate-400 text-[10.5px] font-mono">({selected.nim})</span></p>
                        <p className="text-[10.5px] text-slate-500 font-medium">{selected.prodi}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Jadwal &amp; Tempat:</span>
                        <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                          <CalendarIcon className="w-3.5 h-3.5 text-[#C62828] shrink-0" />
                          <span>{selected.tgl} ({selected.waktu})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#C62828] font-bold">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{selected.ruang}</span>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display mb-1">Tim Majelis Penguji</p>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-[11px] min-w-0">
                          <p className="font-bold text-slate-900 break-words">1. {selected.ketua} <span className="text-slate-400 font-normal">(Ketua Penguji)</span></p>
                          <p className="font-semibold text-slate-800 break-words">2. {selected.penguji2} <span className="text-slate-400 font-normal">(Penguji Anggota)</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 flex items-center justify-center gap-2 font-display">
                      <UserCheck className="w-3.5 h-3.5 text-slate-400" /> Mode Pemantauan Dekanat (Read-Only)
                    </span>
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
