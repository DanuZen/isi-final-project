"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  CheckCircle2, XCircle, Clock, AlertTriangle, Search,
  ShieldCheck, Activity, UserCog, KeyRound, ShieldAlert, Check, ArrowLeft
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
  { label: "Login Hari Ini",       value: "87",   sub: "Sesi Aktif Realtime",   color: "#059669", bgIcon: "bg-emerald-600", icon: CheckCircle2 },
  { label: "Error Log 24 Jam",     value: "3",    sub: "Perlu Ditinjau",        color: "#C62828", bgIcon: "bg-[#C62828]",  icon: AlertTriangle },
  { label: "User Nonaktif",        value: "14",   sub: "Akun Suspended",        color: "#475569", bgIcon: "bg-slate-700",  icon: Clock },
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

export default function SuperAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("20101152630045");
  const [activeMobileTab, setActiveMobileTab] = useState<"table" | "detail">("table");

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
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          items={NAV}
          userName="Irvan Syahputra, S.T."
          userNim="SA-001"
          roleName="Super Admin"
          prodiName="Sistem Utama SIPETA"
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Unified Standard Header */}
          <Header
            className="shell-header shrink-0"
            userName="Irvan Syahputra, S.T."
            userNim="SA-001"
            userRole="Super Admin"
            prodiName="Sistem Utama SIPETA"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3 md:p-4 flex items-center justify-between space-x-2 md:space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-0.5 md:space-y-1 min-w-0 flex-1">
                      <p className="text-[10px] md:text-[11px] font-bold text-slate-500 font-display leading-tight truncate">{s.label}</p>
                      <div className="flex items-baseline space-x-1.5 md:space-x-2">
                        <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900">{s.value}</span>
                        <span className="text-[9.5px] md:text-[10px] text-slate-400 font-semibold truncate">{s.sub}</span>
                      </div>
                    </div>
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                      <IconComp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Mobile Section Navigation Pills (Equal 50% Width) ── */}
            <div className="bg-slate-100/90 border border-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1 shrink-0 lg:hidden font-display">
              <button
                onClick={() => setActiveMobileTab("table")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeMobileTab === "table"
                    ? "bg-white text-[#C62828] shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900 font-medium"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Tabel User ({filtered.length})</span>
              </button>
              <button
                onClick={() => setActiveMobileTab("detail")}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeMobileTab === "detail"
                    ? "bg-white text-[#C62828] shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900 font-medium"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Detail User ({selected.nama})</span>
              </button>
            </div>

            {/* Grid Layout with Live Side Detail Panel Card */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex-col min-w-0 ${
                activeMobileTab === "table" ? "flex" : "hidden lg:flex"
              }`}>
                {/* Integrated Table Card Header + Controls */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-white">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Tabel Manajemen User Sistem</h2>
                      <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Pengguna Terdaftar</p>
                    </div>
                  </div>

                  {/* 1-Row Controls: Search Input */}
                  <div className="relative flex-1 sm:w-64 max-w-xs min-w-0">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Cari user ID, nama, role..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-7 pr-2 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all w-full font-display"
                    />
                  </div>
                </div>

                {/* Table with Touch-Pan-X Smooth Container */}
                <div className="overflow-y-auto flex-1 scrollbar-none flex flex-col min-h-0">
                  <div className="overflow-x-auto w-full touch-pan-x flex-1 min-w-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[850px] border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                        <tr>
                          {["NIM / NIDN / User ID", "Nama Pengguna", "Hak Akses (Role)", "Unit Kerja / Prodi", "Login Terakhir", "Status"].map((h) => (
                            <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filtered.map((u) => {
                          const isSelected = selected?.id === u.id;
                          return (
                            <tr
                              key={u.id}
                              onClick={() => {
                                setSelectedId(u.id);
                                setActiveMobileTab("detail");
                              }}
                              className={`transition-all cursor-pointer select-none ${
                                isSelected
                                  ? "bg-slate-100 font-bold"
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
              </div>

              {/* Side Detail Panel (Strict 350px Width Lock on Desktop) */}
              {selected && (
                <div className={`w-full lg:w-[350px] lg:min-w-[350px] lg:max-w-[350px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150 ${
                  activeMobileTab === "detail" ? "flex flex-1" : "hidden lg:flex"
                }`}>
                  <div className="space-y-4 overflow-y-auto scrollbar-none min-w-0">
                    
                    <div className="pb-3 border-b border-slate-100 space-y-2 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        {/* Mobile Back Button */}
                        <button
                          onClick={() => setActiveMobileTab("table")}
                          className="lg:hidden p-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                        >
                          <ArrowLeft className="w-3.5 h-3.5 text-[#C62828]" />
                          <span>Kembali</span>
                        </button>

                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#C62828] text-white font-display shadow-2xs">
                          {selected.role}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold ml-auto">{selected.id}</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 font-display break-words">{selected.nama}</h3>
                      <p className="text-xs text-slate-500 font-medium truncate">{selected.email}</p>
                    </div>

                    <div className="space-y-3 text-xs min-w-0">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Informasi Akun:</span>
                        <div className="space-y-1 text-slate-700">
                          <p><strong className="text-slate-900">Unit / Prodi:</strong> {selected.unit}</p>
                          <p><strong className="text-slate-900">Login Terakhir:</strong> {selected.lastLogin}</p>
                          {selected.sks && <p><strong className="text-slate-900">Total SKS:</strong> {selected.sks} SKS</p>}
                          {selected.ipk && <p><strong className="text-slate-900">IPK Kumulatif:</strong> {selected.ipk.toFixed(2)}</p>}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-semibold space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>Status Autentikasi Ok</span>
                        </div>
                        <p className="text-[10.5px] text-emerald-700 font-medium leading-normal">Akun terverifikasi dengan enkripsi SSO Universitas.</p>
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
