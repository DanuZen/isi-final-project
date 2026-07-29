"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import {
  CalendarDays,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Filter,
  Download,
  X,
  Sparkles,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  tgl: number; // day of month in Aug 2026
  waktu: string;
  kategori: "BIMBINGAN" | "SEMPRO" | "SIDANG" | "DEADLINE";
  judul: string;
  mahasiswa: string;
  nim: string;
  pembimbing: string;
  ruangan: string;
  prodi: string;
  status: string;
}

const EVENTS_DATA: CalendarEvent[] = [
  {
    id: "evt-1",
    tgl: 3,
    waktu: "09:00 - 10:30 WIB",
    kategori: "BIMBINGAN",
    judul: "Sesi Bimbingan Bab 1 - 3 (RPL)",
    mahasiswa: "Danu Zen",
    nim: "20101152630045",
    pembimbing: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
    ruangan: "Ruang Dosen 402",
    prodi: "Teknik Informatika",
    status: "Disetujui Dosen",
  },
  {
    id: "evt-2",
    tgl: 7,
    waktu: "13:30 - 15:00 WIB",
    kategori: "BIMBINGAN",
    judul: "Sesi Bimbingan Bab 4 Progress System",
    mahasiswa: "Ahmad Fauzi",
    nim: "20101152630012",
    pembimbing: "Dr. Jasmir, S.Kom., M.Kom.",
    ruangan: "Lab Software Engineering",
    prodi: "Teknik Informatika",
    status: "Disetujui Dosen",
  },
  {
    id: "evt-3",
    tgl: 12,
    waktu: "08:30 - 10:00 WIB",
    kategori: "SEMPRO",
    judul: "Seminar Proposal: Sistem Rekomendasi Beasiswa AI",
    mahasiswa: "Rina Kartika",
    nim: "20101152630088",
    pembimbing: "Prof. Dr. Julius Santony, S.Kom., M.Kom.",
    ruangan: "Ruang Seminar 302 FIK",
    prodi: "Teknik Informatika",
    status: "Terjadwal",
  },
  {
    id: "evt-4",
    tgl: 15,
    waktu: "10:00 - 11:30 WIB",
    kategori: "BIMBINGAN",
    judul: "Sesi Review Naskah Draf Akhir Skripsi",
    mahasiswa: "Budi Santoso",
    nim: "20101152630099",
    pembimbing: "Dr. Yuhandri, S.Kom., M.Kom.",
    ruangan: "Ruang Dosen 405",
    prodi: "Sistem Informasi",
    status: "Disetujui Dosen",
  },
  {
    id: "evt-5",
    tgl: 18,
    waktu: "09:00 - 11:00 WIB",
    kategori: "SIDANG",
    judul: "Ujian Sidang Skripsi: Algoritma Fuzzy Logic pada IoT",
    mahasiswa: "Danu Zen",
    nim: "20101152630045",
    pembimbing: "Dr. Eng. H. Sarjon Defit & Dr. Jasmir",
    ruangan: "Aula Utama FIK Lantai 3",
    prodi: "Teknik Informatika",
    status: "ACC Sidang Final",
  },
  {
    id: "evt-6",
    tgl: 21,
    waktu: "14:00 - 15:30 WIB",
    kategori: "BIMBINGAN",
    judul: "Sesi Bimbingan Pembuatan Pengajuan Pembimbing",
    mahasiswa: "Siti Rahma",
    nim: "20101152630102",
    pembimbing: "Dr. Yanto, S.Kom., M.Kom.",
    ruangan: "Ruang Dosen 301",
    prodi: "Sistem Komputer",
    status: "Disetujui Dosen",
  },
  {
    id: "evt-7",
    tgl: 25,
    waktu: "09:00 - 10:30 WIB",
    kategori: "SEMPRO",
    judul: "Seminar Proposal: Klasifikasi Citra Medis CNN",
    mahasiswa: "Nanda Pratama",
    nim: "20101152630114",
    pembimbing: "Dr. Yuhandri, S.Kom., M.Kom.",
    ruangan: "Ruang Seminar 303 FIK",
    prodi: "Teknik Informatika",
    status: "Terjadwal",
  },
  {
    id: "evt-8",
    tgl: 28,
    waktu: "13:00 - 14:30 WIB",
    kategori: "BIMBINGAN",
    judul: "Sesi Bimbingan Revisi Seminar Proposal",
    mahasiswa: "Danu Zen",
    nim: "20101152630045",
    pembimbing: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
    ruangan: "Ruang Dosen 402",
    prodi: "Teknik Informatika",
    status: "Bimbingan Aktif",
  },
  {
    id: "evt-9",
    tgl: 31,
    waktu: "23:59 WIB",
    kategori: "DEADLINE",
    judul: "Batas Akhir Upload Naskah Hardcover YUDISIUM",
    mahasiswa: "Seluruh Mahasiswa FIK",
    nim: "Angkatan 2022/2023",
    pembimbing: "Sekretariat Dekanat FIK",
    ruangan: "SIPETA System Online Portal",
    prodi: "Fakultas Ilmu Komputer",
    status: "Batas Akhir Akademik",
  },
];

export default function KalenderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter States
  const [viewMode, setViewMode] = useState<"BULAN" | "MINGGU" | "HARI">("BULAN");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedProdi, setSelectedProdi] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Month state (Fixed to August 2026 for demo)
  const currentMonthName = "Agustus 2026";

  // Filter events
  const filteredEvents = EVENTS_DATA.filter((evt) => {
    const matchCategory =
      activeCategory === "ALL" || evt.kategori === activeCategory;
    const matchProdi =
      selectedProdi === "ALL" ||
      evt.prodi.toLowerCase().includes(selectedProdi.toLowerCase());
    return matchCategory && matchProdi;
  });

  // Calendar Grid Setup for August 2026 (Aug 1 2026 starts on Saturday = index 6)
  const daysInMonth = 31;
  const startDayOffset = 6; // Saturday

  const getEventsForDay = (dayNum: number) => {
    return filteredEvents.filter((evt) => evt.tgl === dayNum);
  };

  const getCategoryBadgeClass = (kategori: CalendarEvent["kategori"]) => {
    switch (kategori) {
      case "BIMBINGAN":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
      case "SEMPRO":
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
      case "SIDANG":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
      case "DEADLINE":
        return "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getCategoryDotColor = (kategori: CalendarEvent["kategori"]) => {
    switch (kategori) {
      case "BIMBINGAN":
        return "bg-[#F59E0B]";
      case "SEMPRO":
        return "bg-[#2563EB]";
      case "SIDANG":
        return "bg-[#10B981]";
      case "DEADLINE":
        return "bg-[#C62828]";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} className="shell-header shrink-0" />

          <main className="flex-1 p-6 space-y-6 overflow-y-auto overflow-x-hidden scrollbar-none shell-body">
            {/* Top Banner Hero */}
            <div className="bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] rounded-2xl border border-[#333333] p-6 text-white shadow-md relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#C62828] text-white flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" /> Kalender Akademik FIK
                    </span>
                    <span className="text-xs font-mono-data text-[#F59E0B] font-bold">
                      Agustus 2026 • 9 Agenda Terdaftar
                    </span>
                  </div>
                  <h2 className="text-2xl font-black font-display text-white tracking-wide">
                    Kalender Interaktif TA &amp; Sidang Skripsi
                  </h2>
                  <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                    Jadwal terpadu sesi Bimbingan Rutin, Seminar Proposal, Ujian Sidang Skripsi, dan Tenggat Waktu Akademik Fakultas Ilmu Komputer UPI YPTK Padang.
                  </p>
                </div>

                {/* View Switchers */}
                <div className="flex items-center gap-1 bg-[#141414] p-1.5 rounded-xl border border-[#333333] shrink-0">
                  <button
                    onClick={() => setViewMode("BULAN")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === "BULAN"
                        ? "bg-[#C62828] text-white shadow-sm"
                        : "text-[#A0A0A0] hover:text-white"
                    }`}
                  >
                    Bulan
                  </button>
                  <button
                    onClick={() => setViewMode("MINGGU")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === "MINGGU"
                        ? "bg-[#C62828] text-white shadow-sm"
                        : "text-[#A0A0A0] hover:text-white"
                    }`}
                  >
                    Minggu
                  </button>
                  <button
                    onClick={() => setViewMode("HARI")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === "HARI"
                        ? "bg-[#C62828] text-white shadow-sm"
                        : "text-[#A0A0A0] hover:text-white"
                    }`}
                  >
                    Hari
                  </button>
                </div>
              </div>
            </div>

            {/* Controls Bar & Filter Legend */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Month Nav Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button className="p-1.5 rounded-lg text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-xs font-black font-display text-slate-900">
                    {currentMonthName}
                  </span>
                  <button className="p-1.5 rounded-lg text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all">
                  Hari Ini
                </button>
              </div>

              {/* Kategori Filters Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <button
                  onClick={() => setActiveCategory("ALL")}
                  className={`px-3 py-1.5 rounded-xl border transition-all ${
                    activeCategory === "ALL"
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Semua ({EVENTS_DATA.length})
                </button>

                <button
                  onClick={() => setActiveCategory("BIMBINGAN")}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                    activeCategory === "BIMBINGAN"
                      ? "bg-[#F59E0B] text-white border-[#F59E0B] shadow-sm"
                      : "bg-amber-50/80 text-amber-800 border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] bg-white" />
                  Bimbingan (5)
                </button>

                <button
                  onClick={() => setActiveCategory("SEMPRO")}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                    activeCategory === "SEMPRO"
                      ? "bg-[#2563EB] text-white border-[#2563EB] shadow-sm"
                      : "bg-blue-50/80 text-blue-800 border-blue-200 hover:bg-blue-100"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  Seminar Proposal (2)
                </button>

                <button
                  onClick={() => setActiveCategory("SIDANG")}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                    activeCategory === "SIDANG"
                      ? "bg-[#10B981] text-white border-[#10B981] shadow-sm"
                      : "bg-emerald-50/80 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  Ujian Sidang (1)
                </button>

                <button
                  onClick={() => setActiveCategory("DEADLINE")}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                    activeCategory === "DEADLINE"
                      ? "bg-[#C62828] text-white border-[#C62828] shadow-sm"
                      : "bg-rose-50/80 text-rose-800 border-rose-200 hover:bg-rose-100"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#C62828]" />
                  Deadline (1)
                </button>
              </div>
            </div>

            {/* Main 2-Column Grid (Flush Bottom Alignment) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
              {/* Left 3 Columns: Interactive Calendar View */}
              <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
                {viewMode === "BULAN" && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    {/* Days Header */}
                    <div className="grid grid-cols-7 gap-2 text-center pb-2 border-b border-slate-100 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      <div>Minggu</div>
                      <div>Senin</div>
                      <div>Selasa</div>
                      <div>Rabu</div>
                      <div>Kamis</div>
                      <div>Jumat</div>
                      <div>Sabtu</div>
                    </div>

                    {/* Days Matrix (5 Rows x 7 Columns) */}
                    <div className="grid grid-cols-7 gap-2">
                      {/* Empty Offset cells before Aug 1 */}
                      {Array.from({ length: startDayOffset }).map((_, idx) => (
                        <div
                          key={`empty-${idx}`}
                          className="min-h-[75px] md:min-h-[82px] p-2 bg-slate-50/40 rounded-xl border border-slate-100 opacity-40"
                        />
                      ))}

                      {/* August Days 1..31 */}
                      {Array.from({ length: daysInMonth }).map((_, idx) => {
                        const dayNum = idx + 1;
                        const dayEvents = getEventsForDay(dayNum);
                        const isToday = dayNum === 28; // Current active day demo

                        return (
                          <div
                            key={`day-${dayNum}`}
                            className={`min-h-[75px] md:min-h-[82px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                              isToday
                                ? "bg-rose-50/30 border-[#C62828] shadow-sm"
                                : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm"
                            }`}
                          >
                            {/* Top Date Header */}
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center font-display ${
                                  isToday
                                    ? "bg-[#C62828] text-white shadow-sm"
                                    : "text-slate-700"
                                }`}
                              >
                                {dayNum}
                              </span>
                              {dayEvents.length > 0 && (
                                <span className="text-[10px] font-bold text-slate-400">
                                  {dayEvents.length} Agenda
                                </span>
                              )}
                            </div>

                            {/* Event Chips List */}
                            <div className="space-y-1 mt-1 overflow-y-auto max-h-[50px] scrollbar-none pr-0.5">
                              {dayEvents.map((evt) => (
                                <button
                                  key={evt.id}
                                  onClick={() => setSelectedEvent(evt)}
                                  className={`w-full text-left p-1.5 rounded-lg border text-[10px] font-bold transition-all truncate block ${getCategoryBadgeClass(
                                    evt.kategori
                                  )}`}
                                >
                                  <div className="flex items-center gap-1">
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${getCategoryDotColor(
                                        evt.kategori
                                      )}`}
                                    />
                                    <span className="truncate">{evt.judul}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* View Mode: MINGGU & HARI Fallback View */}
                {viewMode !== "BULAN" && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Tampilan Agenda List ({viewMode})
                      </h3>
                      <span className="text-xs font-bold text-[#C62828]">
                        {filteredEvents.length} Acara Terdaftar
                      </span>
                    </div>

                    <div className="space-y-3">
                      {filteredEvents.map((evt) => (
                        <div
                          key={evt.id}
                          onClick={() => setSelectedEvent(evt)}
                          className="p-4 rounded-xl border border-slate-200 hover:border-[#C62828] bg-slate-50/50 hover:bg-white transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-black text-white ${
                                evt.kategori === "BIMBINGAN"
                                  ? "bg-[#F59E0B]"
                                  : evt.kategori === "SEMPRO"
                                  ? "bg-[#2563EB]"
                                  : evt.kategori === "SIDANG"
                                  ? "bg-[#10B981]"
                                  : "bg-[#C62828]"
                              }`}
                            >
                              {evt.tgl} Ags
                            </div>
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                {evt.kategori} • {evt.prodi}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 font-display">
                                {evt.judul}
                              </h4>
                              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                {evt.mahasiswa} ({evt.nim}) • Pembimbing: {evt.pembimbing}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-xs font-bold text-slate-600 shrink-0">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{evt.waktu}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{evt.ruangan}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Info Banner */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#C62828] flex items-center justify-center font-bold shrink-0">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-display">
                        Sinkronisasi Kalender Otomatis
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Setiap perubahan jadwal sidang atau seminar yang disetujui Admin Prodi otomatis ter-update di kalender ini.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (1 Column): Agenda Terdekat & Filter Prodi */}
              <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
                {/* Card 1: Filter Prodi */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Filter className="w-4 h-4 text-[#C62828]" />
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Filter Program Studi
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs font-bold">
                    {[
                      { id: "ALL", label: "Semua Prodi FIK" },
                      { id: "Teknik Informatika", label: "Teknik Informatika" },
                      { id: "Sistem Informasi", label: "Sistem Informasi" },
                      { id: "Sistem Komputer", label: "Sistem Komputer" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProdi(p.id)}
                        className={`w-full px-3 py-2 rounded-xl text-left transition-all ${
                          selectedProdi === p.id
                            ? "bg-rose-50 text-[#C62828] border border-rose-200"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card 2: Agenda Terdekat List */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Agenda Terdekat
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      Minggu Ini
                    </span>
                  </div>

                  <div className="space-y-3">
                    {EVENTS_DATA.slice(0, 4).map((evt) => (
                      <div
                        key={`upcoming-${evt.id}`}
                        onClick={() => setSelectedEvent(evt)}
                        className="p-3 bg-slate-50/80 hover:bg-white rounded-xl border border-slate-200/80 transition-all cursor-pointer space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span
                            className={`px-2 py-0.5 rounded-full ${getCategoryBadgeClass(
                              evt.kategori
                            )}`}
                          >
                            {evt.kategori}
                          </span>
                          <span className="text-slate-500 font-mono-data">
                            {evt.tgl} Ags 2026
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 font-display truncate">
                          {evt.judul}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          📍 {evt.ruangan} • {evt.waktu}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3: Helpdesk & Tata Tertib Ruang Sidang (Stretches to match bottom baseline) */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                      Tata Tertib Ruang Sidang FIK
                    </h3>
                    <ul className="text-[11px] text-slate-600 mt-2 space-y-1.5 font-medium leading-relaxed">
                      <li>• Berpakaian rapi (Kemeja Putih &amp; Jas Almamater).</li>
                      <li>• Hadir 15 menit sebelum jadwal di lokasi ruangan.</li>
                      <li>• Membawa draf naskah cetak &amp; slide presentasi.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Event Details Modal Drawer */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${getCategoryBadgeClass(
                    selectedEvent.kategori
                  )}`}
                >
                  {selectedEvent.kategori}
                </span>
                <h3 className="text-base font-bold text-slate-900 font-display mt-1">
                  {selectedEvent.judul}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <CalendarIcon className="w-4 h-4 text-[#C62828]" />
                <span>Tanggal: {selectedEvent.tgl} Agustus 2026</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Clock className="w-4 h-4 text-[#F59E0B]" />
                <span>Waktu: {selectedEvent.waktu}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <MapPin className="w-4 h-4 text-[#10B981]" />
                <span>Ruangan: {selectedEvent.ruangan}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700 font-semibold">
                <User className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p>Mahasiswa: {selectedEvent.mahasiswa} ({selectedEvent.nim})</p>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Pembimbing: {selectedEvent.pembimbing}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => {
                  alert("Jadwal berhasil diekspor ke format Google Calendar / .ics!");
                  setSelectedEvent(null);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Ekspor ke Kalender (.ics)
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
