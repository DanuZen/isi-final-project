"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  MapPin, Clock, Calendar as CalendarIcon, ArrowRight, Search, Filter, UserCheck, Building2
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

const KALENDER_SIDANG: SidangItem[] = [];

export default function DekanatKalenderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [selectedId, setSelectedId] = useState<string>("");

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

  const selected = sidangList.find((item) => item.id === selectedId) || filtered[0];

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Prof. Dr. H. Zulherman, M.T." userNim="NIP: 196508201990031001" userRole="Dekan FIK" prodiName="Fakultas Ilmu Komputer" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

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

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Dashboard Dekan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                  <CalendarDays className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Jadwal Sidang &amp; Seminar ({filtered.length})</h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap ml-auto">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari mahasiswa, NIM, penguji..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all font-display"
                  />
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                  <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                  {["Semua", "Ujian Sidang", "Seminar Proposal"].map((j) => (
                    <button
                      key={j}
                      onClick={() => setFilterJenis(j)}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all font-display cursor-pointer"
                      style={filterJenis === j ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                    >
                      {j}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid layout with Detail Side Panel */}
            <div className="flex gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col">
                <div className="overflow-y-auto flex-1 scrollbar-none pb-12">
                  <table className="w-full text-xs">
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
                            onClick={() => setSelectedId(row.id)}
                            className={`transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-rose-50/70 border-l-4 border-l-[#C62828]"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="font-bold text-slate-900 block font-display">{row.tgl}</span>
                              <span className="text-[10px] text-slate-400 font-mono font-semibold">{row.waktu}</span>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="font-bold text-slate-900 block font-display">{row.mhs}</span>
                              <span className="text-[10.5px] font-mono text-slate-400">({row.nim})</span>
                            </td>
                            <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap font-medium">{row.prodi}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C62828] text-white shadow-2xs font-display">
                                {row.jenis}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-slate-800 font-semibold whitespace-nowrap">{row.ketua}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap font-bold text-[#C62828] font-display">{row.ruang}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side Detail Panel Card (Updates Live Based on Selected Row) */}
              {selected && (
                <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-4 overflow-y-auto scrollbar-none">
                    <div className="pb-3 border-b border-slate-100 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#C62828] text-white font-display shadow-2xs">
                          {selected.jenis}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{selected.id}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 font-display mt-1">&ldquo;{selected.judul}&rdquo;</h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Mahasiswa Peserta</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-display">{selected.mhs} <span className="text-slate-400 text-[10.5px] font-mono">({selected.nim})</span></p>
                        <p className="text-[10.5px] text-slate-500 font-medium">{selected.prodi}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Jadwal &amp; Tempat:</span>
                        <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                          <CalendarIcon className="w-3.5 h-3.5 text-[#C62828]" />
                          <span>{selected.tgl} ({selected.waktu})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#C62828] font-bold">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{selected.ruang}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display mb-1">Tim Majelis Penguji</p>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-[11px]">
                          <p className="font-bold text-slate-900">1. {selected.ketua} <span className="text-slate-400 font-normal">(Ketua Penguji)</span></p>
                          <p className="font-semibold text-slate-800">2. {selected.penguji2} <span className="text-slate-400 font-normal">(Penguji Anggota)</span></p>
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
