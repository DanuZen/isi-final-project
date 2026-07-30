"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  Clock, MapPin, CheckCircle2, FileText, ArrowRight
} from "lucide-react";

const DOSEN_NAV = [
  { label: "Dashboard Dosen",    href: "/dosen/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Mahasiswa Bimbingan",href: "/dosen/bimbingan",  icon: <Users className="w-4 h-4" />, badge: "6 Act" },
  { label: "Permohonan Masuk",   href: "/dosen/pengajuan",  icon: <UserCheck className="w-4 h-4" />, badge: "2 Baru" },
  { label: "Jadwal & Sidang",    href: "/dosen/kalender",   icon: <CalendarDays className="w-4 h-4" /> },
];

const EVENTS = [
  {
    id: 1, tgl: "Kam", tglNum: "1",  bulan: "Agt",
    jenis: "Seminar", nama: "Danu Zen",    waktu: "09:00",  ruang: "Ruang 302",   role: "Pembimbing I",  warna: "#7c3aed",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web",
  },
  {
    id: 2, tgl: "Sab", tglNum: "3",  bulan: "Agt",
    jenis: "Sidang",  nama: "Rafi Andika", waktu: "10:00",  ruang: "Aula FIK",    role: "Pembimbing I",  warna: "#C62828",
    judul: "Implementasi ML untuk Deteksi Spam Email",
  },
  {
    id: 3, tgl: "Sel", tglNum: "5",  bulan: "Agt",
    jenis: "Bimbingan",nama: "Siti Rahayu",waktu: "13:00",  ruang: "Ruang Dosen", role: "Pembimbing I",  warna: "#1d4ed8",
    judul: "Optimisasi Routing Jaringan Komputer",
  },
  {
    id: 4, tgl: "Jum", tglNum: "8",  bulan: "Agt",
    jenis: "Sidang",  nama: "Budi Prasetyo",waktu: "14:00", ruang: "Aula FIK",    role: "Pembimbing I",  warna: "#C62828",
    judul: "Pengembangan Aplikasi Mobile Absensi Mahasiswa",
  },
  {
    id: 5, tgl: "Sen", tglNum: "12", bulan: "Agt",
    jenis: "Seminar", nama: "Anisa Permatasari",waktu: "09:00",ruang:"Ruang 302", role: "Pembimbing II", warna: "#7c3aed",
    judul: "Klasifikasi Citra Daun Menggunakan CNN",
  },
];

const JENIS_COLOR: Record<string, { color: string; bg: string }> = {
  "Seminar":   { color: "#7c3aed", bg: "#f5f3ff" },
  "Sidang":    { color: "#C62828", bg: "#fef2f2" },
  "Bimbingan": { color: "#1d4ed8", bg: "#eff6ff" },
};

export default function DosenKalenderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV} roleName="Dosen Pembimbing" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Sarjon Defit" userNim="NIDN: 1012057301" userRole="Dosen Pembimbing" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-violet-600 text-white shadow-xs">
                      <CalendarDays className="w-3.5 h-3.5" /> Agenda Akademik Dosen
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
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Kembali ke Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Legend & Stats Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-4 flex-wrap shrink-0">
              <div className="flex items-center gap-4 flex-wrap">
                {Object.entries(JENIS_COLOR).map(([label, cfg]) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: cfg.color }} />
                    <span className="text-xs font-bold text-slate-700">{label}</span>
                  </div>
                ))}
              </div>

              <span className="text-xs font-bold text-[#C62828] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                Agustus 2026
              </span>
            </div>

            {/* Timeline Events */}
            <div className="space-y-3 flex-1 min-h-0">
              {EVENTS.map((ev) => {
                const cfg = JENIS_COLOR[ev.jenis] ?? JENIS_COLOR["Bimbingan"];
                return (
                  <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex flex-col items-center justify-center px-5 py-4 shrink-0 border-b sm:border-b-0 sm:border-r border-slate-100 min-w-[90px]" style={{ background: cfg.bg }}>
                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>{ev.tgl}</p>
                        <p className="text-3xl font-black leading-none my-0.5 font-display" style={{ color: cfg.color }}>{ev.tglNum}</p>
                        <p className="text-[10px] font-semibold text-slate-400">{ev.bulan}</p>
                      </div>

                      <div className="flex-1 p-5 space-y-2">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: cfg.bg, color: cfg.color }}>{ev.jenis}</span>
                            <span className="text-[10px] font-semibold text-slate-500 border border-slate-200 px-2.5 py-0.5 rounded-full bg-slate-50">{ev.role}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {ev.waktu} WIB</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.ruang}</span>
                          </div>
                        </div>
                        <h3 className="text-sm font-black text-slate-900 font-display">{ev.nama}</h3>
                        <p className="text-xs text-slate-500 line-clamp-1">"{ev.judul}"</p>
                      </div>

                      <div className="flex items-center gap-2 px-5 py-4 border-t sm:border-t-0 sm:border-l border-slate-100 shrink-0 bg-slate-50/50">
                        {ev.jenis !== "Bimbingan" && (
                          <button className="px-3 py-2 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 shadow-xs">
                            <FileText className="w-3.5 h-3.5" /> Berita Acara
                          </button>
                        )}
                        <button className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hadir
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
