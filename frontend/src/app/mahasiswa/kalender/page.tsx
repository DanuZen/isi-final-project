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
  Building2,
  GraduationCap,
} from "lucide-react";
import { UPI_YPTK_FAKULTAS, PROGRAM_PASCASARJANA } from "@/constants/upiyptk";
import { CustomDropdown } from "@/components/ui/custom-dropdown";

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

import { storeJadwal, storeBimbingan } from "@/lib/sipeta-store";

const INITIAL_EVENTS: CalendarEvent[] = [];

export default function KalenderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter States
  const [viewMode, setViewMode] = useState<"BULAN" | "MINGGU" | "HARI">("BULAN");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedFakultas, setSelectedFakultas] = useState<string>("FILKOM");
  const [selectedProdi, setSelectedProdi] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const [eventsList, setEventsList] = useState<CalendarEvent[]>([]);

  const syncEvents = React.useCallback(() => {
    const jadwal = storeJadwal.getAll().map((j, idx) => ({
      id: "jdw-" + j.id,
      tgl: 15 + (idx * 3),
      waktu: j.waktu || "09:00 - 10:30 WIB",
      kategori: (j.jenis === "Seminar" ? "SEMPRO" : "SIDANG") as CalendarEvent["kategori"],
      judul: `${j.jenis === "Seminar" ? "Seminar Proposal" : "Ujian Sidang Skripsi"}: ${j.judul}`,
      mahasiswa: j.studentNama,
      nim: j.studentNim,
      pembimbing: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
      ruangan: j.ruang || "Aula FIK UPI YPTK",
      prodi: j.prodi,
      status: j.status,
    }));

    const bimbingan = storeBimbingan.getAll().map((b, idx) => ({
      id: "bmb-" + b.id,
      tgl: 5 + (idx * 4),
      waktu: "10:00 - 11:30 WIB",
      kategori: "BIMBINGAN" as const,
      judul: `Bimbingan TA: ${b.catatanMahasiswa}`,
      mahasiswa: b.studentNama,
      nim: b.studentNim,
      pembimbing: b.dosenNama,
      ruangan: "Ruang Dosen FIK",
      prodi: "Teknik Informatika",
      status: b.statusFeedback,
    }));

    setEventsList([...jadwal, ...bimbingan]);
  }, []);

  React.useEffect(() => {
    syncEvents();
    window.addEventListener("storage_sipeta", syncEvents);
    return () => window.removeEventListener("storage_sipeta", syncEvents);
  }, [syncEvents]);

  // Month state (Fixed to August 2026 for demo)
  const currentMonthName = "Agustus 2026";

  // Filter events
  const filteredEvents = eventsList.filter((evt) => {
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
        return "bg-[#D97706] text-white border-[#D97706] hover:bg-[#B45309]";
      case "SEMPRO":
        return "bg-[#1D4ED8] text-white border-[#1D4ED8] hover:bg-[#1E40AF]";
      case "SIDANG":
        return "bg-[#15803D] text-white border-[#15803D] hover:bg-[#166534]";
      case "DEADLINE":
        return "bg-[#C62828] text-white border-[#C62828] hover:bg-[#B71C1C]";
      default:
        return "bg-slate-700 text-white border-slate-700";
    }
  };

  const getCategoryDotColor = (kategori: CalendarEvent["kategori"]) => {
    switch (kategori) {
      case "BIMBINGAN":
        return "bg-[#D97706]";
      case "SEMPRO":
        return "bg-[#1D4ED8]";
      case "SIDANG":
        return "bg-[#15803D]";
      case "DEADLINE":
        return "bg-[#C62828]";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                {/* Left: greeting + status */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs">
                      <CalendarDays className="w-3.5 h-3.5" /> Kalender Akademik Universitas
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Kalender Interaktif TA &amp; Sidang Skripsi
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Jadwal alokasi bimbingan rutin, seminar proposal, ujian sidang skripsi, dan batas akhir akademik mahasiswa UPI YPTK Padang.
                  </p>
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Controls Bar & Filter Legend */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
              {/* Month Nav Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button className="p-1 rounded-lg text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-xs font-black font-display text-slate-900">
                    {currentMonthName}
                  </span>
                  <button className="p-1 rounded-lg text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button className="px-3 py-1 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all">
                  Hari Ini
                </button>
              </div>

              {/* Kategori Filters Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <button
                  onClick={() => setActiveCategory("ALL")}
                  className={`px-3.5 py-1.5 rounded-full border transition-all ${
                    activeCategory === "ALL"
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs font-extrabold"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900 font-bold"
                  }`}
                >
                  Semua ({eventsList.length})
                </button>

                <button
                  onClick={() => setActiveCategory("BIMBINGAN")}
                  className={`px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
                    activeCategory === "BIMBINGAN"
                      ? "bg-[#D97706] text-white border-[#D97706] shadow-xs font-extrabold"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900 font-bold"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${activeCategory === "BIMBINGAN" ? "bg-white" : "bg-[#D97706]"}`} />
                  Bimbingan ({eventsList.filter((e) => e.kategori === "BIMBINGAN").length})
                </button>

                <button
                  onClick={() => setActiveCategory("SEMPRO")}
                  className={`px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
                    activeCategory === "SEMPRO"
                      ? "bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-xs font-extrabold"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900 font-bold"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${activeCategory === "SEMPRO" ? "bg-white" : "bg-[#1D4ED8]"}`} />
                  Seminar ({eventsList.filter((e) => e.kategori === "SEMPRO").length})
                </button>

                <button
                  onClick={() => setActiveCategory("SIDANG")}
                  className={`px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
                    activeCategory === "SIDANG"
                      ? "bg-[#15803D] text-white border-[#15803D] shadow-xs font-extrabold"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900 font-bold"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${activeCategory === "SIDANG" ? "bg-white" : "bg-[#15803D]"}`} />
                  Sidang ({eventsList.filter((e) => e.kategori === "SIDANG").length})
                </button>

                <button
                  onClick={() => setActiveCategory("DEADLINE")}
                  className={`px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
                    activeCategory === "DEADLINE"
                      ? "bg-[#C62828] text-white border-[#C62828] shadow-xs font-extrabold"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900 font-bold"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${activeCategory === "DEADLINE" ? "bg-white" : "bg-[#C62828]"}`} />
                  Deadline (1)
                </button>
              </div>
            </div>

            {/* Main 12-Column Grid (Fit to Viewport, Flush Bottom Alignment) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0 overflow-hidden">
              {/* Left 8 Columns: Interactive Calendar View */}
              <div className="lg:col-span-8 flex flex-col h-full min-h-0 overflow-hidden">
                {viewMode === "BULAN" && (
                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden">
                    {/* Days Header */}
                    <div className="grid grid-cols-7 gap-1.5 text-center pb-2 border-b border-slate-100 text-xs font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
                      <div>Minggu</div>
                      <div>Senin</div>
                      <div>Selasa</div>
                      <div>Rabu</div>
                      <div>Kamis</div>
                      <div>Jumat</div>
                      <div>Sabtu</div>
                    </div>

                    {/* Days Matrix (6 Rows x 7 Columns - Stretches 100% height) */}
                    <div className="grid grid-cols-7 grid-rows-6 gap-1.5 flex-1 min-h-0 mt-2">
                      {/* Empty Offset cells before Aug 1 */}
                      {Array.from({ length: startDayOffset }).map((_, idx) => (
                        <div
                          key={`empty-${idx}`}
                          className="p-1.5 bg-slate-50/40 rounded-lg border border-slate-100 opacity-40 min-h-0 h-full"
                        />
                      ))}

                      {/* August Days 1..31 */}
                      {Array.from({ length: daysInMonth }).map((_, idx) => {
                        const dayNum = idx + 1;
                        const dayEvents = getEventsForDay(dayNum);
                        const isToday = dayNum === 28;

                        return (
                          <div
                            key={`day-${dayNum}`}
                            className={`p-1.5 rounded-lg border transition-all flex flex-col justify-between min-h-0 h-full overflow-hidden ${
                              isToday
                                ? "bg-rose-50/40 border-[#C62828] shadow-xs"
                                : "bg-white border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            {/* Top Date Header */}
                            <div className="flex items-center justify-between shrink-0">
                              <span
                                className={`text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center font-display ${
                                  isToday
                                    ? "bg-[#C62828] text-white shadow-xs"
                                    : "text-slate-700"
                                }`}
                              >
                                {dayNum}
                              </span>
                              {dayEvents.length > 0 && (
                                <span className="text-[9px] font-bold text-slate-400">
                                  {dayEvents.length}
                                </span>
                              )}
                            </div>

                            {/* Event Chips List */}
                            <div className="space-y-0.5 mt-0.5 flex-1 min-h-0 overflow-y-auto scrollbar-none">
                              {dayEvents.map((evt) => (
                                <button
                                  key={evt.id}
                                  onClick={() => setSelectedEvent(evt)}
                                  className={`w-full text-left px-1.5 py-0.5 rounded border text-[9px] font-bold transition-all truncate block ${getCategoryBadgeClass(
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
                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Tampilan Agenda List ({viewMode})
                      </h3>
                      <span className="text-xs font-bold text-[#C62828]">
                        {filteredEvents.length} Acara Terdaftar
                      </span>
                    </div>

                    <div className="space-y-2.5 flex-1 min-h-0 overflow-y-auto scrollbar-thin pr-1 mt-3">
                      {filteredEvents.map((evt) => (
                        <div
                          key={evt.id}
                          onClick={() => setSelectedEvent(evt)}
                          className="p-3.5 rounded-xl border border-slate-200 hover:border-[#C62828] bg-slate-50/50 hover:bg-white transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-black text-white ${
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
              </div>

              {/* Right Column (4/12): Agenda Terdekat & Filter Prodi */}
              <div className="lg:col-span-4 flex flex-col h-full min-h-0 space-y-4">
                {/* Card 1: Filter Fakultas & Program Studi */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 shrink-0">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Filter className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Filter Fakultas &amp; Program Studi
                    </h3>
                  </div>

                  {/* Dropdown Pilihan Fakultas */}
                  <CustomDropdown
                    label="Fakultas (UPI YPTK Padang):"
                    value={selectedFakultas}
                    onChange={(val) => {
                      setSelectedFakultas(val);
                      setSelectedProdi("ALL");
                    }}
                    options={[
                      { id: "ALL", label: "Semua Fakultas UPI YPTK", badge: "ALL" },
                      ...UPI_YPTK_FAKULTAS.map((fak) => ({
                        id: fak.id,
                        label: `${fak.nama} (${fak.singkatan})`,
                        badge: fak.singkatan,
                      })),
                      { id: "PASCASARJANA", label: "Program Pascasarjana (S2 & S3)", badge: "PASCASARJANA" },
                    ]}
                  />

                  {/* Dropdown Program Studi (Dinamis Sesuai Fakultas) */}
                  <CustomDropdown
                    label="Program Studi:"
                    value={selectedProdi}
                    onChange={(val) => setSelectedProdi(val)}
                    placeholder="Pilih Program Studi..."
                    options={[
                      {
                        id: "ALL",
                        label: `Semua Prodi ${selectedFakultas !== "ALL" ? selectedFakultas : "UPI YPTK"}`,
                        badge: "ALL",
                      },
                      ...(selectedFakultas === "ALL"
                        ? UPI_YPTK_FAKULTAS.flatMap((f) => f.prodiList)
                        : selectedFakultas === "PASCASARJANA"
                        ? [
                            ...PROGRAM_PASCASARJANA.magister.map((m) => ({ ...m, jenjang: "S2" })),
                            ...PROGRAM_PASCASARJANA.doktor.map((d) => ({ ...d, jenjang: "S3" })),
                          ]
                        : UPI_YPTK_FAKULTAS.find((f) => f.id === selectedFakultas)?.prodiList || []
                      ).map((p) => ({
                        id: p.nama,
                        label: p.nama,
                        badge: p.jenjang,
                      })),
                    ]}
                  />
                </div>

                {/* Card 2: Agenda Terdekat (Flex Stretch) */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <CalendarDays className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Agenda Terdekat
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      Minggu Ini
                    </span>
                  </div>

                  <div className="space-y-2 flex-1 min-h-0 overflow-y-auto scrollbar-thin pr-1 mt-2.5">
                    {eventsList.length > 0 ? (
                      eventsList.slice(0, 4).map((evt) => (
                        <div
                          key={`upcoming-${evt.id}`}
                          onClick={() => setSelectedEvent(evt)}
                          className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 transition-all cursor-pointer space-y-1"
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
                            {evt.ruangan} • {evt.waktu}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center space-y-2 my-auto">
                        <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="text-xs font-bold text-slate-700">Belum Ada Agenda Terdekat</p>
                        <p className="text-[10px] text-slate-400 font-medium">Jadwal seminar, sidang, atau bimbingan baru akan tampil di sini.</p>
                      </div>
                    )}
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
