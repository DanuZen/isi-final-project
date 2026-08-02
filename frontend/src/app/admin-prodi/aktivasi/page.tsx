"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  CheckCircle2, Search, UserCheck, ArrowRight, XCircle, Plus, X, User
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

  // Form Input Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formNim, setFormNim] = useState("");
  const [formNama, setFormNama] = useState("");
  const [formProdi, setFormProdi] = useState("Teknik Informatika");
  const [formIpk, setFormIpk] = useState("3.65");
  const [formSks, setFormSks] = useState("144");
  const [formPetugas, setFormPetugas] = useState("Hafizah, S.Kom., M.Kom.");
  const [autoActivate, setAutoActivate] = useState(true);

  const handleActivate = (nim: string) => {
    setList((prev) =>
      prev.map((item) => (item.nim === nim ? { ...item, status: "Aktif" } : item))
    );
    const mhs = list.find((i) => i.nim === nim);
    setActivatedSuccess(`Akun SIPETA ${mhs?.nama} (${nim}) telah berhasil DIAKTIFKAN!`);
    setTimeout(() => setActivatedSuccess(null), 5000);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNim || !formNama) return;

    const newItem: AktivasiItem = {
      nim: formNim,
      nama: formNama,
      prodi: formProdi,
      clearingDate: "Hari Ini",
      petugasClearing: formPetugas,
      ipk: parseFloat(formIpk) || 3.5,
      sks: parseInt(formSks) || 144,
      status: autoActivate ? "Aktif" : "Pending",
    };

    setList([newItem, ...list]);
    setShowAddModal(false);
    setActivatedSuccess(
      `Mahasiswa ${formNama} (${formNim}) berhasil DI-INPUT oleh Admin Prodi dan ${autoActivate ? "DIAKTIFKAN" : "masuk antrean clearing"}!`
    );

    // Reset Form
    setFormNim("");
    setFormNama("");
    setTimeout(() => setActivatedSuccess(null), 5000);
  };

  const filtered = list.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.includes(search)
  );

  const pendingCount = list.filter((i) => i.status === "Pending").length;

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Hafizah, S.Kom., M.Kom." userNim="NIP: 198504122010122001" userRole="Admin Prodi" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <UserPlus className="w-3.5 h-3.5 text-white" /> Input &amp; Aktivasi Mahasiswa Clearing
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Input &amp; Verifikasi Clearing Mahasiswa
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Admin Prodi dapat menginputkan langsung data mahasiswa yang telah divalidasi clearing luringnya untuk langsung diaktifkan di portal SIPETA.
                  </p>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Main Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                    <UserCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Antrean Clearing &amp; Mahasiswa Aktif</h2>
                    <p className="text-[10px] text-slate-400 font-medium">{pendingCount} Mahasiswa Menunggu Aktivasi</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap ml-auto">
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
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer font-display"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" /> Input Mahasiswa
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto flex-1 scrollbar-none pb-10">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                    <tr>
                      {["NIM", "Nama Mahasiswa", "Prodi", "Clearing Luring", "Petugas Verifikasi", "IPK / SKS", "Status", "Aksi"].map((h) => (
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
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap font-mono">{row.clearingDate}</td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-semibold">{row.petugasClearing}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-bold text-slate-700">{row.ipk} / {row.sks} SKS</td>
                        <td className="px-4 py-3">
                          {row.status === "Aktif" ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-2xs font-display">
                              Aktif
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-2xs font-display">
                              Belum Aktif
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {row.status === "Pending" ? (
                            <button
                              onClick={() => handleActivate(row.nim)}
                              className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 active:scale-95 shadow-xs cursor-pointer font-display"
                            >
                              <UserPlus className="w-3.5 h-3.5" /> Aktifkan Akun
                            </button>
                          ) : (
                            <button
                              disabled
                              className="px-3 py-1.5 rounded-xl text-[10.5px] font-bold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed flex items-center gap-1 font-display"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Terverifikasi
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

      {/* MODAL INPUT MAHASISWA BARU BY ADMIN PRODI */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display text-white">Input Mahasiswa Clearing Baru</h3>
                  <p className="text-[10.5px] text-slate-400 font-medium">Form Input Mandiri oleh Admin Prodi</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleCreateStudent} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 font-display">NIM (Nomor Induk Mahasiswa) <span className="text-[#C62828]">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 20101152630299"
                  value={formNim}
                  onChange={(e) => setFormNim(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 font-display">Nama Lengkap Mahasiswa <span className="text-[#C62828]">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Gunawan"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Program Studi</label>
                  <select
                    value={formProdi}
                    onChange={(e) => setFormProdi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                  >
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Sistem Komputer">Sistem Komputer</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Petugas Verifikasi</label>
                  <input
                    type="text"
                    value={formPetugas}
                    onChange={(e) => setFormPetugas(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">IPK Terakhir</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formIpk}
                    onChange={(e) => setFormIpk(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Total SKS Lulus</label>
                  <input
                    type="number"
                    value={formSks}
                    onChange={(e) => setFormSks(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono transition-all"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-amber-900 font-display">Langsung Aktifkan Akun SIPETA?</p>
                  <p className="text-[10px] text-amber-700 font-medium">Password default otomatis dikirim ke akun mahasiswa</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoActivate}
                  onChange={(e) => setAutoActivate(e.target.checked)}
                  className="w-4 h-4 accent-[#C62828] cursor-pointer"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-display cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 shadow-xs font-display cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Simpan &amp; Input Mahasiswa</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Popup Notification (Non-layout-shifting) */}
      {activatedSuccess && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
              <CheckCircle2 className="w-4.5 h-4.5 text-white" />
            </div>
            <p className="text-xs font-bold font-display leading-tight">{activatedSuccess}</p>
          </div>
          <button onClick={() => setActivatedSuccess(null)} className="text-slate-400 hover:text-white cursor-pointer p-1">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
