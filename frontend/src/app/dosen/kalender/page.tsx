"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  Clock, MapPin, CheckCircle2, FileText, ArrowRight,
  Sparkles, X, Filter
} from "lucide-react";

const DOSEN_NAV = [
  { label: "Dashboard Dosen",    href: "/dosen/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Mahasiswa Bimbingan",href: "/dosen/bimbingan",  icon: <Users className="w-4 h-4" /> },
  { label: "Permohonan Masuk",   href: "/dosen/pengajuan",  icon: <UserCheck className="w-4 h-4" /> },
  { label: "Jadwal & Sidang",    href: "/dosen/kalender",   icon: <CalendarDays className="w-4 h-4" /> },
];

interface EventItem {
  id: number;
  tgl: string;
  tglNum: string;
  bulan: string;
  jenis: "Seminar" | "Sidang" | "Bimbingan";
  nama: string;
  waktu: string;
  ruang: string;
  role: string;
  judul: string;
}

const EVENTS: Array<EventItem> = [
  {
    id: 1, tgl: "Kam", tglNum: "1",  bulan: "Agt",
    jenis: "Seminar", nama: "Danu Zen",    waktu: "09:00",  ruang: "Ruang 302",   role: "Pembimbing I",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web",
  },
  {
    id: 2, tgl: "Sab", tglNum: "3",  bulan: "Agt",
    jenis: "Sidang",  nama: "Rafi Andika", waktu: "10:00",  ruang: "Aula FIK",    role: "Pembimbing I",
    judul: "Implementasi ML untuk Deteksi Spam Email",
  },
  {
    id: 3, tgl: "Sel", tglNum: "5",  bulan: "Agt",
    jenis: "Bimbingan",nama: "Siti Rahayu",waktu: "13:00",  ruang: "Ruang Dosen", role: "Pembimbing I",
    judul: "Optimisasi Routing Jaringan Komputer",
  },
  {
    id: 4, tgl: "Jum", tglNum: "8",  bulan: "Agt",
    jenis: "Sidang",  nama: "Budi Prasetyo",waktu: "14:00", ruang: "Aula FIK",    role: "Pembimbing I",
    judul: "Pengembangan Aplikasi Mobile Absensi Mahasiswa",
  },
  {
    id: 5, tgl: "Sen", tglNum: "12", bulan: "Agt",
    jenis: "Seminar", nama: "Anisa Permatasari",waktu: "09:00",ruang:"Ruang 302", role: "Pembimbing II",
    judul: "Klasifikasi Citra Daun Menggunakan CNN",
  },
];

const JENIS_SOLID: Record<string, { bg: string; text: string; dateBg: string }> = {
  "Seminar":   { bg: "bg-violet-600", text: "text-white", dateBg: "bg-violet-700" },
  "Sidang":    { bg: "bg-[#C62828]",  text: "text-white", dateBg: "bg-red-800" },
  "Bimbingan": { bg: "bg-blue-600",   text: "text-white", dateBg: "bg-blue-700" },
};

export default function DosenKalenderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filterJenis, setFilterJenis] = useState<string>("Semua");
  const [attendedMap, setAttendedMap] = useState<Record<number, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredEvents = EVENTS.filter((ev) => filterJenis === "Semua" || ev.jenis === filterJenis);

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
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV} roleName="Dosen Pembimbing" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Sarjon Defit" userNim="NIDN: 1012057301" userRole="Dosen Pembimbing" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0 relative">

            {/* Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
                <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs">
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white border border-red-500/30 shadow-md shadow-red-950/40 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Kembali ke Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Legend & Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-4 flex-wrap shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs mr-1">
                  <CalendarDays className="w-4 h-4 text-white" />
                </div>
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
              </div>

              <span className="text-xs font-bold text-white bg-[#C62828] px-3.5 py-1.5 rounded-full shadow-2xs font-display">
                Agustus 2026
              </span>
            </div>

            {/* Timeline Events */}
            <div className="space-y-3 flex-1 min-h-0 overflow-y-auto scrollbar-none">
              {filteredEvents.map((ev) => {
                const solidCfg = JENIS_SOLID[ev.jenis] ?? JENIS_SOLID["Bimbingan"];
                const isAttended = attendedMap[ev.id];

                return (
                  <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row">
                      {/* Date Badge Box */}
                      <div className={`flex flex-col items-center justify-center px-5 py-4 shrink-0 border-b sm:border-b-0 sm:border-r border-slate-100 min-w-[95px] ${solidCfg.bg} text-white`}>
                        <p className="text-[10px] font-black uppercase tracking-wider text-white/80 font-display">{ev.tgl}</p>
                        <p className="text-3xl font-black leading-none my-0.5 font-display text-white">{ev.tglNum}</p>
                        <p className="text-[10px] font-bold text-white/70 font-display">{ev.bulan}</p>
                      </div>

                      {/* Info Content */}
                      <div className="flex-1 p-5 space-y-2">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs font-display ${solidCfg.bg} text-white`}>
                              {ev.jenis}
                            </span>
                            <span className="text-[10px] font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded-full shadow-2xs font-mono">
                              {ev.role}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1 font-bold text-slate-700">
                              <Clock className="w-3.5 h-3.5 text-[#C62828]" /> {ev.waktu} WIB
                            </span>
                            <span className="flex items-center gap-1 font-bold text-slate-700">
                              <MapPin className="w-3.5 h-3.5 text-[#C62828]" /> {ev.ruang}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-sm font-black text-slate-900 font-display">{ev.nama}</h3>
                        <p className="text-xs text-slate-600 font-medium line-clamp-1">&ldquo;{ev.judul}&rdquo;</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 px-5 py-4 border-t sm:border-t-0 sm:border-l border-slate-100 shrink-0 bg-slate-50/50">
                        {ev.jenis !== "Bimbingan" && (
                          <button
                            onClick={() => showToast(`Membuka Berita Acara ${ev.jenis} ${ev.nama}...`)}
                            className="px-3 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer font-display active:scale-95"
                          >
                            <FileText className="w-3.5 h-3.5 text-white" /> Berita Acara
                          </button>
                        )}

                        <button
                          onClick={() => handleToggleAttendance(ev.id, ev.nama, ev.jenis)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-display active:scale-95 shadow-2xs ${
                            isAttended
                              ? "bg-emerald-600 text-white border border-emerald-700"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isAttended ? "text-white" : "text-emerald-600"}`} />
                          {isAttended ? "Hadir (Verified)" : "Konfirmasi Hadir"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
