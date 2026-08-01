"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  Search, Plus, KeyRound, ShieldAlert, Check, ShieldCheck, UserCheck, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" /> },
  { label: "Konfigurasi",     href: "/super-admin/config",      icon: <Settings className="w-4 h-4" /> },
  { label: "Master Data",     href: "/super-admin/master",      icon: <Database className="w-4 h-4" /> },
];

interface UserItem {
  id: string;
  nama: string;
  email: string;
  role: string;
  unit: string;
  lastLogin: string;
  status: "Aktif" | "Nonaktif" | "Suspended";
  registeredDate: string;
}

const INITIAL_USERS: UserItem[] = [
  { id: "20101152630045", nama: "Danu Zen", email: "danuzen@upiyptk.ac.id", role: "Mahasiswa", unit: "Teknik Informatika", lastLogin: "Hari ini 10:23", status: "Aktif", registeredDate: "12 Sep 2022" },
  { id: "1012345678", nama: "Dr. Hendra Saputra, M.T.", email: "hendra@upiyptk.ac.id", role: "Dosen Pembimbing", unit: "Fakultas Ilmu Komputer", lastLogin: "Hari ini 09:15", status: "Aktif", registeredDate: "05 Mar 2018" },
  { id: "1023456789", nama: "Dr. Ahmad Fauzi, M.T.", email: "ahmadfauzi@upiyptk.ac.id", role: "Dosen Penguji", unit: "Fakultas Ilmu Komputer", lastLogin: "Kemarin 16:40", status: "Aktif", registeredDate: "10 Jan 2019" },
  { id: "ADMINP001", nama: "Dr. Ratna Dewi, M.Kom.", email: "ratnadewi@upiyptk.ac.id", role: "Admin Prodi", unit: "Teknik Informatika", lastLogin: "Hari ini 08:45", status: "Aktif", registeredDate: "14 Agu 2020" },
  { id: "ADMF001", nama: "Dra. Yanti Susanti", email: "yanti@upiyptk.ac.id", role: "Admin Fakultas", unit: "Fakultas Ilmu Komputer", lastLogin: "Hari ini 11:02", status: "Aktif", registeredDate: "01 Feb 2021" },
  { id: "DEKAN001", nama: "Prof. Dr. H. Zulherman, M.T.", email: "zulherman@upiyptk.ac.id", role: "Pimpinan", unit: "Fakultas Ilmu Komputer", lastLogin: "2 hari lalu", status: "Aktif", registeredDate: "15 Mei 2017" },
  { id: "20101152630189", nama: "Hendro Wibowo", email: "hendro@upiyptk.ac.id", role: "Mahasiswa", unit: "Sistem Informasi", lastLogin: "5 hari lalu", status: "Nonaktif", registeredDate: "20 Sep 2023" },
];

export default function SuperAdminUsersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users] = useState<UserItem[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("20101152630045");

  const filtered = users.filter(
    (u) =>
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.id.includes(search) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const selected = users.find((u) => u.id === selectedId) || filtered[0] || users[0];

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Irvan Syahputra, S.T." userNim="SA-001" userRole="Super Admin" prodiName="Sistem Utama SIPETA" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <Users className="w-3.5 h-3.5 text-white" /> Manajemen User &amp; Otorisasi
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Pengelolaan Akun Pengguna Sistem SIPETA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Kelola pendaftaran akun baru, reset kata sandi, pengaturan perizinan role, serta penguncian akses pengguna secara terpusat.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <button
                    onClick={() => alert("Membuka form pembuatan akun user baru...")}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-white" />
                    <span>Tambah User Baru</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Seluruh Akun Terdaftar ({filtered.length})</h2>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari ID, nama, role..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] w-56 transition-all font-display"
                />
              </div>
            </div>

            {/* Grid Layout with Live Side Detail Panel Card */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col min-w-0 overflow-x-auto">
                <div className="overflow-y-auto flex-1 scrollbar-none pb-12">
                  <table className="w-full text-xs min-w-[600px] lg:min-w-0">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["ID / NIM / NIDN", "Nama Pengguna", "Hak Akses / Role", "Unit Kerja", "Login Terakhir", "Status Akun"].map((h) => (
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
                            <td className="px-4 py-3.5 font-mono text-[10.5px] font-bold text-slate-900 whitespace-nowrap">{row.id}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap font-display">{row.nama}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#C62828] text-white font-display shadow-2xs">
                                {row.role}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 font-medium">{row.unit}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 text-[11px] font-medium">{row.lastLogin}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold ${
                                row.status === "Aktif" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                              }`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Live Side Detail Panel Card */}
              {selected && (
                <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-4 overflow-y-auto scrollbar-none">
                    
                    <div className="pb-3 border-b border-slate-100 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#C62828] text-white font-display shadow-2xs">
                          {selected.role}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{selected.id}</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 font-display">{selected.nama}</h3>
                      <p className="text-xs text-slate-500 font-medium">{selected.email}</p>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Informasi Registrasi:</span>
                        <div className="space-y-1 text-slate-700">
                          <p><strong className="text-slate-900">Unit / Fakultas:</strong> {selected.unit}</p>
                          <p><strong className="text-slate-900">Tanggal Terdaftar:</strong> {selected.registeredDate}</p>
                          <p><strong className="text-slate-900">Login Terakhir:</strong> {selected.lastLogin}</p>
                        </div>
                      </div>

                      {selected.role.includes("Dosen") && (
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Hak Penugasan Dosen (Admin Control):</span>
                          <div className="space-y-2 pt-1">
                            <label className="flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer">
                              <span className="flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-[#C62828]" /> Akses Dosen Pembimbing</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#C62828] cursor-pointer" />
                            </label>
                            <label className="flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer">
                              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Akses Dosen Penguji</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 cursor-pointer" />
                            </label>
                          </div>
                        </div>
                      )}

                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-semibold space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Status Otorisasi Lengkap</span>
                        </div>
                        <p className="text-[10.5px] text-emerald-700 font-medium">Akun aktif dan terenkripsi dalam direktori SSO universitas.</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <button
                      onClick={() => alert(`Mengirimkan tautan reset password untuk ${selected.nama}...`)}
                      className="w-full py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-2 active:scale-95 font-display cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-white" />
                      <span>Reset Password Akun</span>
                    </button>
                    
                    <button
                      onClick={() => alert(`Mengubah status penangguhan akun ${selected.nama}...`)}
                      className="w-full py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 font-display cursor-pointer"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-white" />
                      <span>Suspend / Nonaktifkan Akun</span>
                    </button>
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
