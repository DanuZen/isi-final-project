"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  CheckCircle2, XCircle, Clock, ArrowRight,
  ShieldCheck, AlertCircle
} from "lucide-react";

const DOSEN_NAV = [
  { label: "Dashboard Dosen",    href: "/dosen/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Mahasiswa Bimbingan",href: "/dosen/bimbingan",  icon: <Users className="w-4 h-4" />, badge: "6 Act" },
  { label: "Permohonan Masuk",   href: "/dosen/pengajuan",  icon: <UserCheck className="w-4 h-4" />, badge: "2 Baru" },
  { label: "Jadwal & Sidang",    href: "/dosen/kalender",   icon: <CalendarDays className="w-4 h-4" /> },
];

const PENGAJUAN = [
  {
    nim: "20101152630201", nama: "Teguh Santoso",    prodi: "Teknik Informatika",
    judul: "Sistem Monitoring Energi Listrik Berbasis IoT dan Dashboard Web",
    bidang: "IoT & Embedded Systems", ipk: 3.72, sks: 144, tgl: "30 Jul 2026",
    pembimbing2: "Rina Oktaviani, M.Kom.", status: "Pending",
    alasan: "Tertarik dengan penelitian Bapak di bidang sistem monitoring dan IoT.",
  },
  {
    nim: "20101152630215", nama: "Dewi Ratnasari",   prodi: "Sistem Informasi",
    judul: "Pengembangan Sistem Informasi Manajemen Apotek Berbasis Web",
    bidang: "Rekayasa Perangkat Lunak", ipk: 3.61, sks: 146, tgl: "28 Jul 2026",
    pembimbing2: "Sari Indah, M.T.", status: "Pending",
    alasan: "Ingin dibimbing oleh pakar di bidang sistem informasi manajemen.",
  },
];

const RIWAYAT = [
  {
    nim: "20101152630178", nama: "Wulandari Putri",  judul: "Deteksi Anomali Jaringan dengan ML",
    tgl: "15 Jul 2026", aksi: "Diterima",
  },
  {
    nim: "20101152630055", nama: "Rahmat Hidayat",   judul: "Aplikasi E-Commerce UMKM Padang",
    tgl: "10 Jul 2026", aksi: "Ditolak",
  },
];

export default function DosenPengajuanPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-600 text-white shadow-xs">
                      <UserCheck className="w-3.5 h-3.5" /> 2 Permohonan Pembimbing Menunggu Tinjauan
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Permohonan Pembimbing Masuk
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Tinjau kualifikasi IPK, SKS, rincian judul proposal, serta alasan mahasiswa memilih Anda sebagai Dosen Pembimbing.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dosen/bimbingan"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Lihat Mahasiswa Bimbingan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Pending List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 font-display">Permohonan Menunggu Keputusan</h2>
                <span className="px-3 py-1 rounded-full text-[10.5px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  {PENGAJUAN.length} Permohonan Baru
                </span>
              </div>

              {PENGAJUAN.map((p) => (
                <div key={p.nim} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="h-1 bg-[#F59E0B]" />
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C62828] to-[#991B1B] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {p.nama.split(" ").map(w => w[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 font-display">{p.nama}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{p.nim} · {p.prodi}</p>
                        </div>
                      </div>

                      <div className="flex gap-4 text-center">
                        <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                          <p className="text-base font-black text-[#C62828] leading-none">{p.ipk}</p>
                          <p className="text-[9px] text-slate-400 font-bold mt-0.5">IPK</p>
                        </div>
                        <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                          <p className="text-base font-black text-emerald-600 leading-none">{p.sks}</p>
                          <p className="text-[9px] text-slate-400 font-bold mt-0.5">SKS</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-display">Topik Penelitian</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-100">{p.bidang}</span>
                      </div>
                      <p className="text-[12.5px] font-bold text-slate-800 leading-snug">"{p.judul}"</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Calon Pembimbing II</p>
                        <p className="text-xs font-bold text-slate-700">{p.pembimbing2}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Tanggal Pengajuan</p>
                        <p className="text-xs font-bold text-slate-700">{p.tgl}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedId(expandedId === p.nim ? null : p.nim)}
                      className="text-xs font-bold text-[#C62828] hover:underline transition-all"
                    >
                      {expandedId === p.nim ? "Tutup" : "Lihat"} pesan/alasan pengajuan mahasiswa ▾
                    </button>
                    {expandedId === p.nim && (
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                        <p className="text-xs text-amber-900 italic font-medium leading-relaxed">"{p.alasan}"</p>
                      </div>
                    )}

                    <div className="flex gap-2.5 pt-2 border-t border-slate-100">
                      <button className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xs">
                        <CheckCircle2 className="w-4 h-4" /> Terima sebagai Mahasiswa Bimbingan
                      </button>
                      <button className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4" /> Tolak
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Riwayat */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">Riwayat Keputusan</h2>
              <div className="divide-y divide-slate-100">
                {RIWAYAT.map((r) => (
                  <div key={r.nim} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${r.aksi === "Diterima" ? "bg-emerald-100" : "bg-red-50"}`}>
                      {r.aksi === "Diterima"
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        : <XCircle className="w-4 h-4 text-red-500" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800">{r.nama} <span className="font-mono text-slate-400 text-[10px]">({r.nim})</span></p>
                      <p className="text-[11px] text-slate-500 truncate">"{r.judul}"</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${r.aksi === "Diterima" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                        {r.aksi}
                      </span>
                      <p className="text-[9.5px] text-slate-400 mt-0.5">{r.tgl}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
