"use client";

import React, { useState } from "react";
import { Sidebar, DOSEN_NAV_ITEMS } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  Clock, MapPin, CheckCircle2, FileText, ArrowRight,
  Sparkles, X, Filter, BookOpen, Check
} from "lucide-react";

interface EventItem {
  id: number;
  hari: string;
  tglNum: string;
  bulan: string;
  jenis: "Seminar" | "Sidang" | "Bimbingan";
  nama: string;
  nim: string;
  prodi: string;
  waktu: string;
  ruang: string;
  role: string;
  judul: string;
}

import { storeJadwal, storeBimbingan } from "@/lib/sipeta-store";

const EVENTS: Array<EventItem> = [];

const JENIS_SOLID: Record<string, { bg: string; text: string }> = {
  "Seminar":   { bg: "bg-blue-600",   text: "text-white" },
  "Sidang":    { bg: "bg-[#C62828]",  text: "text-white" },
  "Bimbingan": { bg: "bg-[#D97706]",  text: "text-white" },
};

export default function DosenKalenderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filterJenis, setFilterJenis] = useState<string>("Semua");
  const [selectedEventId, setSelectedEventId] = useState<number>(0);
  const [showBeritaAcaraModal, setShowBeritaAcaraModal] = useState(false);
  const [attendedMap, setAttendedMap] = useState<Record<number, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [eventsList, setEventsList] = useState<EventItem[]>([]);

  const syncEvents = React.useCallback(() => {
    const jadwal = storeJadwal.getAll().map((j, idx) => ({
      id: idx + 1,
      hari: j.hari || "Kamis",
      tglNum: j.tglNum || `${idx + 1}`,
      bulan: "Agustus 2026",
      jenis: j.jenis,
      nama: j.studentNama,
      nim: j.studentNim,
      prodi: j.prodi,
      waktu: j.waktu || "09:00 - 10:30 WIB",
      ruang: j.ruang || "Aula FIK UPI YPTK",
      role: "Dosen Penguji / Pembimbing",
      judul: j.judul,
    }));

    const bimbingan = storeBimbingan.getAll().map((b, idx) => ({
      id: idx + 100,
      hari: "Senin",
      tglNum: `${(idx + 1) * 3}`,
      bulan: "Agustus 2026",
      jenis: "Bimbingan" as const,
      nama: b.studentNama,
      nim: b.studentNim,
      prodi: "Teknik Informatika",
      waktu: "10:00 - 11:00 WIB",
      ruang: "Ruang Dosen FIK",
      role: "Pembimbing I",
      judul: b.catatanMahasiswa,
    }));

    const all = [...jadwal, ...bimbingan];
    setEventsList(all);
    if (all.length > 0 && selectedEventId === 0) {
      setSelectedEventId(all[0].id);
    }
  }, [selectedEventId]);

  React.useEffect(() => {
    syncEvents();
    window.addEventListener("storage_sipeta", syncEvents);
    return () => window.removeEventListener("storage_sipeta", syncEvents);
  }, [syncEvents]);

  const filteredEvents = eventsList.filter((ev) => filterJenis === "Semua" || ev.jenis === filterJenis);
  const selectedEv = eventsList.find((e) => e.id === selectedEventId) || filteredEvents[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleAttendance = (id: number, nama: string, jenis: string) => {
    const nextState = !attendedMap[id];
    setAttendedMap((prev) => ({ ...prev, [id]: nextState }));
    if (nextState) {
      showToast(`Kehadiran Anda pada ${jenis} ${nama} berhasil DIKONFIRMASI!`);
    } else {
      showToast(`Konfirmasi kehadiran ${nama} dibatalkan.`);
    }
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV_ITEMS} roleName="Dosen" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Sarjon Defit" userNim="NIDN: 1012057301" userRole="Dosen Pembimbing" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0 relative">

            {/* Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
                <Sparkles className="w-4 h-4 text-[#ffd01d] shrink-0" />
                <p className="text-xs font-bold font-display">{toastMessage}</p>
                <button onClick={() => setToastMessage(null)} className="ml-2 text-neutral-400 hover:text-white cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <CalendarDays className="w-3.5 h-3.5 text-white" /> Agenda Akademik Dosen Active
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Jadwal Seminar, Ujian Sidang &amp; Sesi Bimbingan
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Kalender terintegrasi seluruh agenda akademik bimbingan dan pengujian Anda pada bulan ini.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dosen/dashboard"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white border border-red-500/30 shadow-md shadow-red-950/40 transition-all active:scale-95 cursor-pointer font-display"
                  >
                    <span>Kembali ke Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── Split 2-Column Card Layout (7/12 & 5/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
              
              {/* ── LEFT COLUMN (7/12): Main Agenda Card Container ── */}
              <div className="lg:col-span-7 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden">
                {/* Card Header + Filters */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <CalendarDays className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Agenda Bimbingan &amp; Sidang</h2>
                      <p className="text-[10px] text-slate-400 font-medium">Klik agenda untuk melihat detail lokasi &amp; berita acara</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap ml-auto">
                    <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                      <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                      {["Semua", "Seminar", "Sidang", "Bimbingan"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setFilterJenis(t)}
                          className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer font-display"
                          style={filterJenis === t ? { background: "#C62828", color: "white" } : { color: "#64748b" }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10.5px] font-bold text-white bg-[#C62828] px-2.5 py-1 rounded-xl shadow-2xs font-display">
                      Agustus 2026
                    </span>
                  </div>
                </div>

                {/* Scrollable Agenda List Container */}
                <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2.5">
                  {filteredEvents.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 space-y-2">
                      <CalendarDays className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="text-xs font-bold text-slate-700 font-display">Tidak ada agenda ditemukan</p>
                    </div>
                  ) : (
                    filteredEvents.map((ev) => {
                      const solidCfg = JENIS_SOLID[ev.jenis] ?? JENIS_SOLID["Bimbingan"];
                      const isSelected = selectedEv && selectedEv.id === ev.id;
                      const isAttended = attendedMap[ev.id];

                      return (
                        <div
                          key={ev.id}
                          onClick={() => setSelectedEventId(ev.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                            isSelected
                              ? "bg-rose-50/40 border-[#C62828] shadow-xs ring-1 ring-[#C62828]/20"
                              : "bg-slate-50/50 border-slate-200/80 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            {/* Sleek Minimal Date Info */}
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="flex flex-col shrink-0 min-w-[75px]">
                                <span className="text-xs font-black text-slate-900 font-display leading-tight">
                                  {ev.hari.slice(0, 3)}, {ev.tglNum} Agt
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono font-medium">
                                  {ev.waktu.split(" - ")[0]} WIB
                                </span>
                              </div>

                              <div className="space-y-0.5 min-w-0 flex-1 border-l border-slate-200/80 pl-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold shadow-2xs font-display ${solidCfg.bg} text-white`}>
                                    {ev.jenis}
                                  </span>
                                  <span className="text-[9.5px] font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded-full shadow-2xs font-mono">
                                    {ev.role}
                                  </span>
                                </div>
                                <h3 className="text-xs font-black text-slate-900 font-display truncate">{ev.nama}</h3>
                                <p className="text-[11px] text-slate-600 font-medium truncate">&ldquo;{ev.judul}&rdquo;</p>
                              </div>
                            </div>

                            {/* Location & Quick Action */}
                            <div className="flex items-center gap-2 shrink-0 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleAttendance(ev.id, ev.nama, ev.jenis);
                                }}
                                className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs font-display ${
                                  isAttended
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                <CheckCircle2 className={`w-3.5 h-3.5 ${isAttended ? "text-white" : "text-emerald-600"}`} />
                                {isAttended ? "Hadir" : "Absen"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* ── RIGHT COLUMN (5/12): Detail Agenda Card Panel ── */}
              <div className="lg:col-span-5 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden">
                {/* Card Header Detail */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Detail Agenda &amp; Pengujian</h2>
                      <p className="text-[10px] text-slate-400 font-medium">Informasi pelaksanaan &amp; berita acara</p>
                    </div>
                  </div>

                  {selectedEv && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold shadow-2xs font-display ${JENIS_SOLID[selectedEv.jenis]?.bg} text-white`}>
                      {selectedEv.jenis}
                    </span>
                  )}
                </div>

                {/* Content Area Detail */}
                {selectedEv ? (
                  <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-4">
                    {/* Event Time & Venue Box */}
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Waktu &amp; Lokasi</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-slate-900 text-white font-mono shadow-2xs">
                          {selectedEv.role}
                        </span>
                      </div>

                      <h3 className="text-sm font-black text-slate-900 font-display">
                        {selectedEv.hari}, {selectedEv.tglNum} {selectedEv.bulan}
                      </h3>

                      <div className="pt-2 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-700 font-medium">
                        <p className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#C62828]" /> <strong>Waktu:</strong> {selectedEv.waktu} WIB
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#C62828]" /> <strong>Lokasi:</strong> {selectedEv.ruang}
                        </p>
                      </div>
                    </div>

                    {/* Student & Thesis Info Box */}
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2.5 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Mahasiswa Teruji</span>
                      <div>
                        <h3 className="text-base font-black text-slate-900 font-display leading-tight">{selectedEv.nama}</h3>
                        <p className="text-xs text-slate-500 font-medium">{selectedEv.prodi} · NIM: <span className="font-mono">{selectedEv.nim}</span></p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Judul Tugas Akhir</span>
                        <p className="text-xs font-bold text-slate-800 leading-relaxed font-display">
                          &ldquo;{selectedEv.judul}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
                    <CalendarDays className="w-8 h-8 text-slate-300" />
                    <p className="text-xs font-bold text-slate-700 font-display">Pilih agenda untuk melihat detail</p>
                  </div>
                )}

                {/* Bottom Action Panel */}
                {selectedEv && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/80 shrink-0 space-y-2">
                    <div className="flex items-center gap-2.5">
                      {selectedEv.jenis !== "Bimbingan" && (
                        <button
                          onClick={() => setShowBeritaAcaraModal(true)}
                          className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer font-display active:scale-95"
                        >
                          <FileText className="w-4 h-4 text-white" /> Berita Acara
                        </button>
                      )}

                      <button
                        onClick={() => handleToggleAttendance(selectedEv.id, selectedEv.nama, selectedEv.jenis)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer font-display active:scale-95 shadow-2xs ${
                          attendedMap[selectedEv.id]
                            ? "bg-emerald-600 text-white"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${attendedMap[selectedEv.id] ? "text-white" : "text-emerald-600"}`} />
                        {attendedMap[selectedEv.id] ? "Kehadiran Dikirim" : "Konfirmasi Hadir"}
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* ── Official Berita Acara Modal ── */}
            {showBeritaAcaraModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[85vh] animate-in fade-in zoom-in-95">
                  {/* Modal Header */}
                  <div className="p-4 bg-[#1A1A1A] text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm font-display text-white">Dokumen Berita Acara {selectedEv.jenis}</h3>
                        <p className="text-[10px] text-neutral-400 font-mono">Form_BA_{selectedEv.jenis}_{selectedEv.nim}.pdf</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowBeritaAcaraModal(false)}
                      className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Toolbar */}
                  <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
                    <span className="text-slate-600 font-bold font-display">Status Dokumen: Resmi Terverifikasi</span>
                    <button
                      onClick={() => {
                        showToast(`Mengunduh Berita Acara ${selectedEv.jenis} ${selectedEv.nama}...`);
                        setShowBeritaAcaraModal(false);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#C62828] hover:bg-[#a81f1f] text-white font-bold text-[11px] flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" /> Cetak / Download PDF
                    </button>
                  </div>

                  {/* Official Document Sheet Mockup */}
                  <div className="flex-1 overflow-y-auto p-6 bg-slate-200/80 flex justify-center">
                    <div className="bg-white rounded-lg shadow-md border border-slate-300 p-8 w-full max-w-lg space-y-5 text-slate-900 font-serif">
                      <div className="text-center space-y-1 pb-3 border-b-2 border-slate-900">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600 font-sans">
                          UNIVERSITAS PUTRA INDONESIA YPTK PADANG
                        </p>
                        <h2 className="text-xs font-black uppercase tracking-wider font-sans text-slate-900">
                          FAKULTAS ILMU KOMPUTER — PRODI {selectedEv.prodi.toUpperCase()}
                        </h2>
                        <p className="text-[11px] font-bold font-sans pt-1 text-[#C62828]">
                          BERITA ACARA {selectedEv.jenis.toUpperCase()} TUGAS AKHIR
                        </p>
                      </div>

                      <div className="space-y-2 text-xs font-sans">
                        <p className="leading-relaxed">
                          Pada hari ini <strong>{selectedEv.hari}</strong>, tanggal <strong>{selectedEv.tglNum} {selectedEv.bulan}</strong>, telah dilaksanakan ujian/seminar tugas akhir secara resmi bagi mahasiswa:
                        </p>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1 font-mono text-[11px]">
                          <p><strong>Nama:</strong> {selectedEv.nama}</p>
                          <p><strong>NIM:</strong> {selectedEv.nim}</p>
                          <p><strong>Prodi:</strong> {selectedEv.prodi}</p>
                          <p><strong>Judul:</strong> &ldquo;{selectedEv.judul}&rdquo;</p>
                        </div>

                        <div className="pt-2 space-y-1">
                          <p><strong>Peran Penguji:</strong> {selectedEv.role}</p>
                          <p><strong>Waktu &amp; Ruang:</strong> {selectedEv.waktu} WIB ({selectedEv.ruang})</p>
                          <p><strong>Keputusan Hasil Ujian:</strong> <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">LULUS DENGAN REVISI KECIL</span></p>
                        </div>
                      </div>

                      <div className="pt-6 flex justify-between items-end font-sans text-xs">
                        <div className="text-center space-y-8">
                          <p className="text-[10px] text-slate-500">Mengetahui, Ketua Prodi</p>
                          <p className="font-bold underline">Dr. Sarjon Defit, S.Kom., M.Sc.</p>
                        </div>
                        <div className="text-center space-y-8">
                          <p className="text-[10px] text-slate-500">Dosen Pembimbing / Penguji</p>
                          <p className="font-bold underline">Dr. Sarjon Defit, S.Kom., M.Sc.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
