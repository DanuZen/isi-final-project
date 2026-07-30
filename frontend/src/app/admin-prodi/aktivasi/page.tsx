"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  CheckCircle2, Search, UserCheck, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",           href: "/admin-prodi/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa", href: "/admin-prodi/mahasiswa",  icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",       href: "/admin-prodi/aktivasi",   icon: <UserPlus className="w-4 h-4" /> },
  { label: "Jadwal Seminar",      href: "/admin-prodi/jadwal",     icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori",          href: "/admin-prodi/repositori", icon: <BookOpen className="w-4 h-4" /> },
];

interface AktivasiItem {
  nim: string;
  nama: string;
  prodi: string;
  clearingDate: string;
  petugasClearing: string;
  ipk: number;
  sks: number;
  status: "Pending" | "Aktif";
}

const PENDING_LIST: AktivasiItem[] = [
  { nim: "20101152630201", nama: "Teguh Santoso", prodi: "Teknik Informatika", clearingDate: "30 Jul 2026", petugasClearing: "Budianto, S.Kom.", ipk: 3.72, sks: 144, status: "Pending" },
  { nim: "20101152630215", nama: "Dewi Ratnasari", prodi: "Sistem Informasi", clearingDate: "30 Jul 2026", petugasClearing: "Budianto, S.Kom.", ipk: 3.61, sks: 146, status: "Pending" },
  { nim: "20101152630198", nama: "Eko Wijayanto", prodi: "Teknik Informatika", clearingDate: "29 Jul 2026", petugasClearing: "Siti Aminah, A.Md.", ipk: 3.50, sks: 144, status: "Pending" },
  { nim: "20101152630222", nama: "Rina Melati", prodi: "Sistem Informasi", clearingDate: "29 Jul 2026", petugasClearing: "Siti Aminah, A.Md.", ipk: 3.68, sks: 145, status: "Pending" },
  { nim: "20101152630230", nama: "Fauzan Azhim", prodi: "Teknik Informatika", clearingDate: "28 Jul 2026", petugasClearing: "Budianto, S.Kom.", ipk: 3.55, sks: 144, status: "Pending" },
  { nim: "20101152630241", nama: "Nadia Utami", prodi: "Teknik Informatika", clearingDate: "28 Jul 2026", petugasClearing: "Budianto, S.Kom.", ipk: 3.80, sks: 148, status: "Pending" },
  { nim: "20101152630255", nama: "Hendra Wijaya", prodi: "Sistem Informasi", clearingDate: "27 Jul 2026", petugasClearing: "Siti Aminah, A.Md.", ipk: 3.48, sks: 144, status: "Pending" },
];

export default function AdminProdiAktivasiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [list, setList] = useState<AktivasiItem[]>(PENDING_LIST);
  const [search, setSearch] = useState("");
  const [activatedSuccess, setActivatedSuccess] = useState<string | null>(null);

  const handleActivate = (nim: string) => {
    setList((prev) =>
      prev.map((item) => (item.nim === nim ? { ...item, status: "Aktif" } : item))
    );
    const mhs = list.find((i) => i.nim === nim);
    setActivatedSuccess(`Akun SIPETA ${mhs?.nama} (${nim}) telah berhasil diaktifkan! Password default dikirim via WhatsApp/Email.`);
    setTimeout(() => setActivatedSuccess(null), 5000);
  };

  const filtered = list.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.includes(search)
  );

  const pendingCount = list.filter((i) => i.status === "Pending").length;

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Hafizah, S.Kom., M.Kom." userNim="NIP: 198504122010122001" userRole="Admin Prodi" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-600 text-white shadow-xs">
                      <UserPlus className="w-3.5 h-3.5" /> Antrean Aktivasi Account Clearing
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Verifikasi Clearing &amp; Aktivasi Akun Mahasiswa
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Mahasiswa yang telah lulus verifikasi clearing akademik luring di kampus siap diaktifkan hak aksesnya ke SIPETA.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-prodi/mahasiswa"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Daftar Mahasiswa TA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {activatedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{activatedSuccess}</span>
              </div>
            )}

            {/* Main Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Antrean Clearing Luring</h2>
                    <p className="text-[10px] text-slate-400 font-medium">{pendingCount} Mahasiswa Menunggu Aktivasi</p>
                  </div>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari NIM atau Nama..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-[12px] bg-slate-50 focus:outline-none focus:border-[#C62828] w-52 transition-all"
                  />
                </div>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {["NIM", "Nama Mahasiswa", "Prodi", "Clearing Luring", "Petugas Clearing", "IPK / SKS", "Status", "Aksi"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((row) => (
                      <tr key={row.nim} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-[10.5px] text-slate-500">{row.nim}</td>
                        <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap font-display">{row.nama}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.prodi}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.clearingDate}</td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{row.petugasClearing}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-bold text-slate-700">{row.ipk} / {row.sks} SKS</td>
                        <td className="px-4 py-3">
                          {row.status === "Aktif" ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-2xs">
                              Aktif
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-2xs">
                              Belum Aktif
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {row.status === "Pending" ? (
                            <button
                              onClick={() => handleActivate(row.nim)}
                              className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 active:scale-95 shadow-xs"
                            >
                              <UserPlus className="w-3.5 h-3.5" /> Aktifkan Akun
                            </button>
                          ) : (
                            <button
                              disabled
                              className="px-3 py-1.5 rounded-xl text-[10.5px] font-bold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Terverifikasi
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
