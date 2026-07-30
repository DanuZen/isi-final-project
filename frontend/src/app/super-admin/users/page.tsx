"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  Search, Plus, Lock, Edit3, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" />, badge: "12" },
  { label: "Konfigurasi",     href: "/super-admin/config",      icon: <Settings className="w-4 h-4" /> },
  { label: "Master Data",     href: "/super-admin/master",      icon: <Database className="w-4 h-4" /> },
];

interface UserItem {
  id: string;
  nama: string;
  role: string;
  unit: string;
  lastLogin: string;
  status: "Aktif" | "Nonaktif" | "Suspended";
}

const INITIAL_USERS: UserItem[] = [
  { id: "20101152630045", nama: "Danu Zen", role: "Mahasiswa", unit: "Teknik Informatika", lastLogin: "Hari ini 10:23", status: "Aktif" },
  { id: "1012345678", nama: "Dr. Hendra Saputra", role: "Dosen Pembimbing", unit: "FIK", lastLogin: "Hari ini 09:15", status: "Aktif" },
  { id: "1023456789", nama: "Dr. Ahmad Fauzi", role: "Dosen Penguji", unit: "FIK", lastLogin: "Kemarin 16:40", status: "Aktif" },
  { id: "ADMINP001", nama: "Dr. Ratna Dewi", role: "Admin Prodi", unit: "Teknik Informatika", lastLogin: "Hari ini 08:45", status: "Aktif" },
  { id: "ADMF001", nama: "Dra. Yanti Susanti", role: "Admin Fakultas", unit: "FIK", lastLogin: "Hari ini 11:02", status: "Aktif" },
  { id: "DEKAN001", nama: "Prof. Dr. H. Zulherman", role: "Pimpinan", unit: "FIK", lastLogin: "2 hari lalu", status: "Aktif" },
  { id: "20101152630189", nama: "Hendro Wibowo", role: "Mahasiswa", unit: "Sistem Informasi", lastLogin: "5 hari lalu", status: "Nonaktif" },
];

export default function SuperAdminUsersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users] = useState<UserItem[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.id.includes(search) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Super Admin" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Irvan Syahputra, S.T." userNim="SA-001" userRole="Super Admin" prodiName="FIK UPI YPTK" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-600 text-white shadow-xs">
                      <Users className="w-3.5 h-3.5" /> Manajemen User &amp; Otorisasi
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Pengelolaan Akun Pengguna Sistem SIPETA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Kelola pendaftaran akun baru, reset kata sandi, pengaturan perizinan role, serta penguncian akses pengguna.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs">
                    <Plus className="w-4 h-4" />
                    <span>Tambah User Baru</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-sm text-slate-900 font-display">Seluruh Akun Terdaftar ({users.length})</h2>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari ID, nama, role..."
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
                      {["ID / NIM / NIDN", "Nama Pengguna", "Hak Akses / Role", "Unit Kerja", "Login Terakhir", "Status", "Aksi Kelola"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-[10.5px] font-semibold text-slate-600">{u.id}</td>
                        <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap font-display">{u.nama}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-medium">{u.unit}</td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{u.lastLogin}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.status === "Aktif" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500 border border-slate-200"}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <button className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1">
                              <Edit3 className="w-3 h-3 text-slate-500" /> Edit
                            </button>
                            <button className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all flex items-center gap-1">
                              <Lock className="w-3 h-3 text-rose-600" /> Reset Password
                            </button>
                          </div>
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
