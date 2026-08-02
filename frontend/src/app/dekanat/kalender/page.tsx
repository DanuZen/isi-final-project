"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, BarChart2, CalendarDays, FileDown,
  MapPin, Clock, ArrowRight, ArrowLeft, Filter, Check, ChevronDown,
  Building2, Users, FileText, UserCheck, Sparkles, X, ShieldCheck
} from "lucide-react";
import { storeJadwal } from "@/lib/sipeta-store";

const NAV = [
  { label: "Dashboard Eksekutif",href: "/dekanat/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Statistik TA",       href: "/dekanat/statistik",   icon: <BarChart2 className="w-4 h-4" /> },
  { label: "Komparasi Prodi",    href: "/dekanat/prodi",       icon: <Building2 className="w-4 h-4" /> },
  { label: "Kalender Sidang",    href: "/dekanat/kalender",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Laporan Eksekutif",  href: "/dekanat/laporan",     icon: <FileDown className="w-4 h-4" /> },
];

interface SidangEvent {
  id: string;
  tglNum: number;
  hari: string;
  bulan: string;
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

const JENIS_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  "Ujian Sidang font-bold":     { bg: "bg-[#C62828]", text: "text-white", border: "border-red-600" },
  "Ujian Sidang":            { bg: "bg-[#C62828]", text: "text-white", border: "border-red-600" },
  "Seminar Proposal":        { bg: "bg-blue-600",  text: "text-white", border: "border-blue-600" },
};

export default function DekanatKalenderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filterJenis, setFilterJenis] = useState<string>("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState<boolean>(false);
  const [selectedDayNum, setSelectedDayNum] = useState<number>(5);
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  const [sidangList, setSidangList] = useState<SidangEvent[]>([]);

  const syncData = React.useCallback(() => {
    const list = storeJadwal.getAll().map((j, idx) => ({
      id: j.id || `sidang-${idx + 1}`,
      tglNum: j.tglNum ? parseInt(j.tglNum) : (idx % 28) + 1,
      hari: j.hari || "Kamis",
      bulan: "Agustus 2026",
      waktu: j.waktu || "09:00 - 10:30 WIB",
      mhs: j.studentNama,
      nim: j.studentNim,
      prodi: j.prodi,
      jenis: (j.jenis === "Seminar" ? "Seminar Proposal" : "Ujian Sidang") as SidangEvent["jenis"],
      ruang: j.ruang || "Aula FIK Lt. 2",
      ketua: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
      penguji2: "Dr. Jasmir, S.Kom., M.Kom.",
      judul: j.judul,
    }));

    // Seed mock items if store is empty
    if (list.length === 0) {
      const mockList: SidangEvent[] = [
        { id: "1", tglNum: 1,  hari: "Sabtu",  bulan: "Agustus 2026", waktu: "09:00 WIB", mhs: "Rafi Andika",       nim: "20101152630012", prodi: "Teknik Informatika",      jenis: "Ujian Sidang",     ruang: "Aula FIK Lt. 2", ketua: "Dr. Eng. Sarjon Defit", penguji2: "Dr. Jasmir", judul: "Implementasi ML untuk Deteksi Spam" },
        { id: "2", tglNum: 3,  hari: "Senin",  bulan: "Agustus 2026", waktu: "10:00 WIB", mhs: "Siti Rahayu",       nim: "20101152630045", prodi: "Sistem Informasi",        jenis: "Seminar Proposal", ruang: "Ruang 302",      ketua: "Prof. Dr. H. Zulherman", penguji2: "Dr. Hendra Saputra", judul: "Optimisasi Routing Jaringan Komputer" },
        { id: "3", tglNum: 5,  hari: "Rabu",   bulan: "Agustus 2026", waktu: "13:00 WIB", mhs: "Budi Prasetyo",     nim: "20101152630089", prodi: "Teknik Informatika",      jenis: "Ujian Sidang",     ruang: "Aula FIK Lt. 2", ketua: "Dr. Eng. Sarjon Defit", penguji2: "Dr. Ahmad Fauzi", judul: "Aplikasi Mobile Absensi Mahasiswa" },
        { id: "4", tglNum: 8,  hari: "Sabtu",  bulan: "Agustus 2026", waktu: "09:00 WIB", mhs: "Anisa Permatasari", nim: "20101152630104", prodi: "Sistem Komputer",         jenis: "Seminar Proposal", ruang: "Ruang 301",      ketua: "Dr. Jasmir", penguji2: "Dr. Hendra Saputra", judul: "Klasifikasi Citra Daun dengan CNN" },
        { id: "5", tglNum: 10, hari: "Senin",  bulan: "Agustus 2026", waktu: "14:00 WIB", mhs: "Teguh Santoso",     nim: "20101152630122", prodi: "Rekayasa Perangkat Lunak", jenis: "Ujian Sidang",     ruang: "Aula FIK Lt. 2", ketua: "Prof. Dr. H. Zulherman", penguji2: "Dr. Ahmad Fauzi", judul: "Sistem Monitoring Energi Listrik IoT" },
        { id: "6", tglNum: 15, hari: "Sabtu",  bulan: "Agustus 2026", waktu: "09:00 WIB", mhs: "Danu Zen",          nim: "20101152630045", prodi: "Teknik Informatika",      jenis: "Ujian Sidang",     ruang: "Aula FIK Lt. 2", ketua: "Dr. Eng. Sarjon Defit", penguji2: "Dr. Hendra Saputra", judul: "Pengembangan Sistem Informasi Tugas Akhir (SIPETA)" },
      ];
      setSidangList(mockList);
      if (!selectedEventId) setSelectedEventId(mockList[2].id);
    } else {
      setSidangList(list);
      if (!selectedEventId && list.length > 0) setSelectedEventId(list[0].id);
    }
  }, [selectedEventId]);

  React.useEffect(() => {
    syncData();
    window.addEventListener("storage_sipeta", syncData);
    return () => window.removeEventListener("storage_sipeta", syncData);
  }, [syncData]);

  const filteredEvents = sidangList.filter((ev) => filterJenis === "Semua" || ev.jenis === filterJenis);
  const dayEvents = filteredEvents.filter((ev) => ev.tglNum === selectedDayNum);
  const selectedEv = sidangList.find((e) => e.id === selectedEventId) || dayEvents[0] || filteredEvents[0];

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

          <main className="flex-1 px-3 py-3 md:p-5 pt-16 md:pt-5 space-y-3 md:space-y-4 overflow-y-auto lg:overflow-hidden shell-body flex flex-col min-h-0 justify-between">
            
            {/* ── 1. Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 md:gap-5 p-4 md:p-6 relative">
                <div className="space-y-1 md:space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5 md:mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <CalendarDays className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" /> Agenda Akademik Dekanat FIK
                    </span>
                  </div>
                  <h1 className="text-lg md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Kalender Sidang &amp; Seminar FIK UPI YPTK
                  </h1>
                  <p className="text-[11px] md:text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Jadwal terintegrasi pelaksanaan Ujian Sidang Skripsi dan Seminar Proposal seluruh Program Studi di Fakultas Ilmu Komputer.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dekanat/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <span>Kembali ke Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── 2. Split 2-Column Card Layout (7/12 & 5/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1 min-h-0 items-stretch">
              
              {/* ── LEFT COLUMN (7/12): Month Calendar Grid ── */}
              <div className={`lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 min-h-0 flex flex-col justify-between overflow-hidden ${
                showMobileDetail ? "hidden lg:flex" : "flex"
              }`}>
                {/* Header + Dropdown Filter */}
                <div className="p-3 md:p-3.5 border-b border-slate-100 flex items-center justify-between gap-2.5 shrink-0 bg-white">
                  <div className="flex items-center gap-2 md:gap-2.5 min-w-0 flex-1">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <CalendarDays className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Kalender Agustus 2026</h2>
                      <p className="text-[9.5px] md:text-[10px] text-slate-400 font-medium truncate">Klik tanggal untuk melihat jadwal sidang</p>
                    </div>
                  </div>

                  {/* Animated Dropdown Filter */}
                  <div className="relative font-display shrink-0">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
                    >
                      <Filter className="w-3.5 h-3.5 text-[#C62828]" />
                      <span className="text-[11px] md:text-xs">{filterJenis}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {isFilterOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                        <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 min-w-[150px] space-y-0.5 font-display animate-in fade-in zoom-in-95">
                          {["Semua", "Ujian Sidang", "Seminar Proposal"].map((f) => (
                            <button
                              key={f}
                              onClick={() => {
                                setFilterJenis(f);
                                setIsFilterOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                filterJenis === f ? "bg-[#C62828] text-white" : "text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <span>{f}</span>
                              {filterJenis === f && <Check className="w-3.5 h-3.5 text-white" />}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Calendar Days Table Grid */}
                <div className="p-3 md:p-4 overflow-y-auto flex-1 min-h-0 flex flex-col justify-between">
                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 text-center border-b border-slate-100 pb-2 mb-2">
                    {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d, i) => (
                      <span
                        key={d}
                        className={`text-[10px] md:text-[11px] font-extrabold uppercase font-display ${
                          i === 0 ? "text-[#C62828]" : "text-slate-500"
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* 31 Date Cells (August 2026 Starts on Saturday = offset 6) */}
                  <div className="grid grid-cols-7 gap-1 md:gap-1.5 flex-1 min-h-[280px]">
                    {/* Empty Offset Cells */}
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div
                        key={`offset-${idx}`}
                        className="p-1.5 rounded-xl bg-slate-50/40 border border-slate-100/50 text-slate-300 text-[10px] font-mono min-h-[44px] select-none"
                      >
                        <span className="opacity-40">{26 + idx}</span>
                      </div>
                    ))}

                    {/* August 1 to August 31 */}
                    {Array.from({ length: 31 }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const eventsOnDay = filteredEvents.filter((ev) => ev.tglNum === dayNum);
                      const isSelected = selectedDayNum === dayNum;

                      return (
                        <button
                          key={`day-${dayNum}`}
                          onClick={() => {
                            setSelectedDayNum(dayNum);
                            if (eventsOnDay.length > 0) {
                              setSelectedEventId(eventsOnDay[0].id);
                            }
                          }}
                          className={`p-1.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer relative min-h-[46px] md:min-h-[52px] ${
                            isSelected
                              ? "bg-rose-100/90 border-[#C62828] ring-2 ring-[#C62828]/30 shadow-2xs font-extrabold"
                              : eventsOnDay.length > 0
                              ? "bg-rose-50/50 border-rose-200 text-slate-900 hover:bg-rose-100/60"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className={`text-[10.5px] md:text-xs font-black font-mono ${isSelected ? "text-[#C62828]" : "text-slate-800"}`}>
                            {dayNum}
                          </span>

                          {/* Event Indicators */}
                          <div className="space-y-0.5 mt-1">
                            {eventsOnDay.slice(0, 2).map((ev) => (
                              <div
                                key={ev.id}
                                className={`text-[8.5px] md:text-[9px] font-extrabold px-1 py-0.5 rounded-md truncate font-display ${
                                  ev.jenis === "Ujian Sidang"
                                    ? "bg-[#C62828] text-white"
                                    : "bg-blue-600 text-white"
                                }`}
                              >
                                {ev.mhs.split(" ")[0]}
                              </div>
                            ))}
                            {eventsOnDay.length > 2 && (
                              <p className="text-[8px] font-bold text-slate-500 font-mono text-right">+ {eventsOnDay.length - 2}</p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* ── Selected Day Agenda Quick List (Below Calendar Grid) ── */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C62828]" />
                        <h3 className="font-bold text-xs text-slate-900 font-display">
                          Agenda Tanggal {selectedDayNum} Agustus 2026
                        </h3>
                      </div>
                      <span className="text-[10.5px] font-bold text-slate-500 font-mono">
                        {dayEvents.length} Acara
                      </span>
                    </div>

                    {dayEvents.length === 0 ? (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center text-slate-400 text-xs font-medium">
                        Tidak ada jadwal sidang / seminar pada tanggal ini.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-thin">
                        {dayEvents.map((ev) => {
                          const isEvSelected = selectedEv?.id === ev.id;
                          return (
                            <div
                              key={ev.id}
                              onClick={() => {
                                setSelectedEventId(ev.id);
                                setShowMobileDetail(true);
                              }}
                              className={`p-3 rounded-xl border text-xs transition-all cursor-pointer space-y-1.5 ${
                                isEvSelected
                                  ? "bg-rose-50/90 border-[#C62828] shadow-2xs"
                                  : "bg-slate-50/80 border-slate-200/80 hover:bg-slate-100/80"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-extrabold text-white font-display ${
                                  ev.jenis === "Ujian Sidang" ? "bg-[#C62828]" : "bg-blue-600"
                                }`}>
                                  {ev.jenis}
                                </span>
                                <span className="text-[10px] font-bold font-mono text-slate-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  {ev.waktu}
                                </span>
                              </div>

                              <div className="space-y-0.5">
                                <p className="font-extrabold text-slate-900 font-display">{ev.mhs} ({ev.nim})</p>
                                <p className="text-[10.5px] text-slate-500 font-medium truncate">Prodi {ev.prodi} — <span className="font-semibold text-slate-700">{ev.ruang}</span></p>
                              </div>

                              <p className="text-[10.5px] text-slate-600 italic font-medium line-clamp-1">"{ev.judul}"</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN (5/12): Event Detail Panel ── */}
              <div className={`lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 min-h-0 flex flex-col justify-between overflow-hidden ${
                showMobileDetail ? "flex" : "hidden lg:flex"
              }`}>
                {/* Header (Matching Reference Design) */}
                <div className="p-3.5 md:p-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
                  {/* Mobile Back Button (Matching Reference Pill ← Kembali) */}
                  <button
                    onClick={() => setShowMobileDetail(false)}
                    className="lg:hidden px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C62828]" />
                    <span>Kembali</span>
                  </button>

                  {/* Desktop Title Header */}
                  <div className="hidden lg:flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Detail Agenda Sidang</h3>
                      <p className="text-[9.5px] md:text-[10px] text-slate-400 font-medium truncate">Tanggal {selectedDayNum} Agustus 2026</p>
                    </div>
                  </div>

                  {/* Type Badge on Right (Solid Pill Badge) */}
                  <span className={`text-[10.5px] font-extrabold text-white px-3 py-1 rounded-full shrink-0 shadow-2xs font-display ${
                    selectedEv?.jenis === "Ujian Sidang" ? "bg-[#C62828]" : "bg-blue-600"
                  }`}>
                    {selectedEv?.jenis || "Ujian Sidang"}
                  </span>
                </div>

                {/* Day Events Selector List + Detailed Preview Card */}
                <div className="p-3.5 md:p-4 overflow-y-auto flex-1 space-y-3 scrollbar-thin">
                  {selectedEv ? (
                    <div className="space-y-3">
                      {/* Main Detail Card (Clean Light Theme) */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative overflow-hidden">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10.5px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/80">
                            NIM: {selectedEv.nim}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Status Terjadwal
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base md:text-lg font-black text-slate-900 font-display leading-tight">{selectedEv.mhs}</h4>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">Program Studi <strong className="text-slate-800 font-bold">{selectedEv.prodi}</strong></p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <p className="text-[9.5px] uppercase font-bold text-slate-400 font-display">Judul Skripsi / TA</p>
                          <p className="text-xs text-slate-800 font-bold leading-relaxed italic">&ldquo;{selectedEv.judul}&rdquo;</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10.5px]">
                          <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-0.5 col-span-2 sm:col-span-1">
                            <span className="text-[9px] text-blue-700 font-bold flex items-center gap-1">
                              <CalendarDays className="w-3 h-3 text-blue-600" /> Tanggal
                            </span>
                            <p className="font-extrabold text-slate-900 font-display truncate">{selectedEv.hari}, {selectedEv.tglNum} Agt 2026</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-0.5">
                            <span className="text-[9px] text-amber-700 font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" /> Waktu
                            </span>
                            <p className="font-extrabold text-slate-900 font-mono">{selectedEv.waktu}</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/70 space-y-0.5">
                            <span className="text-[9px] text-rose-700 font-bold flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-rose-600" /> Lokasi
                            </span>
                            <p className="font-extrabold text-slate-900 truncate">{selectedEv.ruang}</p>
                          </div>
                        </div>
                      </div>

                      {/* Board of Examiners Card */}
                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                          <UserCheck className="w-4 h-4 text-[#C62828]" />
                          <h5 className="font-bold text-xs text-slate-900 font-display">Susunan Majelis Penguji</h5>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 font-display">Ketua Penguji</span>
                            <span className="font-bold text-slate-900 text-[11px] truncate">{selectedEv.ketua}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 font-display">Anggota Penguji</span>
                            <span className="font-bold text-slate-900 text-[11px] truncate">{selectedEv.penguji2}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                      <CalendarDays className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-xs font-bold text-slate-600 font-display">Tidak Ada Agenda pada Tanggal Ini</p>
                      <p className="text-[10.5px] text-slate-400 font-medium max-w-xs mx-auto">Pilih tanggal bertanda merah/biru pada kalender untuk melihat detail jadwal.</p>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
