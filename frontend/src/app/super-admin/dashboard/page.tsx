"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  CheckCircle2, XCircle, Clock, AlertTriangle, Search,
  ShieldCheck, Activity, UserCog, KeyRound, ShieldAlert, Check
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" /> },
  { label: "Konfigurasi",     href: "/super-admin/config",      icon: <Settings className="w-4 h-4" /> },
  { label: "Master Data",     href: "/super-admin/master",      icon: <Database className="w-4 h-4" /> },
];

const STATS = [
  { label: "Total User Aktif",      value: "412",  sub: "Seluruh Akun Aktif",    color: "#D97706", bgIcon: "bg-amber-500", icon: Users },
  { label: "Login Hari Ini",       value: "87",   sub: "Sesi Aktif Realtime",   color: "#D97706", bgIcon: "bg-amber-500", icon: CheckCircle2 },
  { label: "Error Log 24 Jam",     value: "3",    sub: "Perlu Ditinjau",        color: "#D97706", bgIcon: "bg-amber-500", icon: AlertTriangle },
  { label: "User Nonaktif",        value: "14",   sub: "Akun Suspended",        color: "#D97706", bgIcon: "bg-amber-500", icon: Clock },
];

const ROLE_DIST = [
  { role: "Mahasiswa",        count: 356, color: "#059669" },
  { role: "Dosen Pembimbing", count: 38,  color: "#C62828" },
  { role: "Dosen Penguji",    count: 22,  color: "#2563EB" },
  { role: "Admin Prodi",      count: 4,   color: "#0F172A" },
  { role: "Admin Fakultas",   count: 2,   color: "#475569" },
  { role: "Pimpinan",         count: 3,   color: "#b45309" },
  { role: "Super Admin",      count: 2,   color: "#1e293b" },
];

type UserStatus = "Aktif" | "Nonaktif" | "Suspended";

interface UserItem {
  id: string;
  nama: string;
  email: string;
  role: string;
  unit: string;
  lastLogin: string;
  status: UserStatus;
  sks?: number;
  ipk?: number;
}

const USERS: UserItem[] = [
  { id: "20101152630045", nama: "Danu Zen", email: "danuzen@upiyptk.ac.id", role: "Mahasiswa", unit: "Teknik Informatika", lastLogin: "Hari ini 10:23", status: "Aktif", sks: 138, ipk: 3.65 },
  { id: "1012345678", nama: "Dr. Hendra Saputra, M.T.", email: "hendra@upiyptk.ac.id", role: "Dosen Pembimbing", unit: "Fakultas Ilmu Komputer", lastLogin: "Hari ini 09:15", status: "Aktif" },
  { id: "1023456789", nama: "Dr. Ahmad Fauzi, M.T.", email: "ahmadfauzi@upiyptk.ac.id", role: "Dosen Penguji", unit: "Fakultas Ilmu Komputer", lastLogin: "Kemarin 16:40", status: "Aktif" },
  { id: "ADMINP001", nama: "Dr. Ratna Dewi, M.Kom.", email: "ratnadewi@upiyptk.ac.id", role: "Admin Prodi", unit: "Teknik Informatika", lastLogin: "Hari ini 08:45", status: "Aktif" },
  { id: "20101152630189", nama: "Hendro Wibowo", email: "hendro@upiyptk.ac.id", role: "Mahasiswa", unit: "Sistem Informasi", lastLogin: "5 hari lalu", status: "Nonaktif", sks: 110, ipk: 2.85 },
  { id: "20101152630211", nama: "Putri Handayani", email: "putri@upiyptk.ac.id", role: "Mahasiswa", unit: "Teknik Informatika", lastLogin: "2 hari lalu", status: "Aktif", sks: 140, ipk: 3.80 },
  { id: "ADMF001", nama: "Dra. Yanti Susanti", email: "yanti@upiyptk.ac.id", role: "Admin Fakultas", unit: "Fakultas Ilmu Komputer", lastLogin: "Hari ini 11:02", status: "Aktif" },
];

const AUDIT_LOG = [
  { time: "13:41 WIB", user: "Dr. Ratna Dewi",   action: "Aktivasi akun mahasiswa", target: "20101152630201 — Teguh Santoso", type: "success" },
  { time: "13:22 WIB", user: "Danu Zen",          action: "Login berhasil",          target: "/login → /",                    type: "info"    },
  { time: "12:55 WIB", user: "Unknown",           action: "Login gagal (3×)",        target: "IP: 103.x.x.x",                 type: "error"   },
  { time: "11:30 WIB", user: "Dr. Hendra",        action: "ACC Seminar Proposal",    target: "Danu Zen — Judul TA #045",      type: "success" },
  { time: "10:10 WIB", user: "Super Admin",       action: "Reset password",          target: "20101152630189 — Hendro W.",    type: "warning" },
  { time: "09:00 WIB", user: "Sistem",            action: "Backup database",         target: "sipeta_db — 245 MB",            type: "info"    },
];

const LOG_COLOR = {
  success: { bg: "bg-emerald-600", text: "text-emerald-700", icon: CheckCircle2 },
  error:   { bg: "bg-[#C62828]", text: "text-rose-700", icon: XCircle },
  warning: { bg: "bg-amber-600", text: "text-amber-700", icon: AlertTriangle },
  info:    { bg: "bg-slate-900", text: "text-slate-700", icon: Activity },
};

export default function SuperAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("20101152630045");

  const filtered = USERS.filter(
    (u) =>
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.id.includes(search) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const selected = USERS.find((u) => u.id === selectedId) || filtered[0] || USERS[0];

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Unified Standard Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Unified Standard Header */}
          <Header
            className="shell-header shrink-0"
            userName="Irvan Syahputra, S.T."
            userNim="SA-001"
            userRole="Super Admin"
            prodiName="Sistem Utama SIPETA"
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">
            
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" /> Super Admin Control Center
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Panel Kontrol Utama Sistem SIPETA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Status sistem: <strong className="text-emerald-400 font-bold">Online Normal</strong>. Terdapat <strong className="text-[#C62828] font-bold">3 log insiden 24 jam terakhir</strong> yang perlu penanganan.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/super-admin/users"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <UserCog className="w-4 h-4 text-white" />
                    <span>Manajemen User</span>
                  </Link>
                  <Link
                    href="/super-admin/audit"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 font-display"
                  >
                    <ClipboardList className="w-4 h-4 text-white" />
                    <span>Audit Log</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── 4 Executive Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center justify-between space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-500 font-display leading-tight">{s.label}</p>
                      <p className="text-2xl sm:text-3xl font-black font-display" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[10px] text-slate-400 font-semibold truncate">{s.sub}</p>
                    </div>
                    <div className={`w-11 h-11 rounded-xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                      <IconComp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Grid Content Section (Compact List + Live Side Panel) ── */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* User List Table (Flex-1) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex flex-col min-w-0 overflow-x-auto">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">Tabel Manajemen User Sistem</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Klik baris untuk melihat detail hak akses &amp; aksi cepat</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 scrollbar-none pb-8">
                  <table className="w-full text-xs min-w-[600px] lg:min-w-0">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                      <tr>
                        {["NIM / NIDN / User ID", "Nama Pengguna", "Hak Akses (Role)", "Unit Kerja / Prodi", "Login Terakhir", "Status"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {USERS.map((u) => {
                        const isSelected = selected?.id === u.id;
                        return (
                          <tr
                            key={u.id}
                            onClick={() => setSelectedId(u.id)}
                            className={`transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-rose-50/70 border-l-4 border-l-[#C62828]"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-4 py-3.5 whitespace-nowrap font-mono text-[11px] font-bold text-slate-900">{u.id}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap font-display">{u.nama}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C62828] text-white shadow-2xs font-display">
                                {u.role}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-slate-600 font-medium">{u.unit}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-slate-400 font-mono">{u.lastLogin}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs font-display ${u.status === "Aktif" ? "bg-emerald-600" : "bg-slate-500"}`}>
                                {u.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side Detail Panel Card (Live Updates Based on Selected User) */}
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
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Informasi Akun:</span>
                        <div className="space-y-1 text-slate-700">
                          <p><strong className="text-slate-900">Unit / Prodi:</strong> {selected.unit}</p>
                          <p><strong className="text-slate-900">Login Terakhir:</strong> {selected.lastLogin}</p>
                          {selected.sks && <p><strong className="text-slate-900">Total SKS:</strong> {selected.sks} SKS</p>}
                          {selected.ipk && <p><strong className="text-slate-900">IPK Kumulatif:</strong> {selected.ipk.toFixed(2)}</p>}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-semibold space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Status Autentikasi Ok</span>
                        </div>
                        <p className="text-[10.5px] text-emerald-700 font-medium">Akun terverifikasi dengan enkripsi SSO Universitas.</p>
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
