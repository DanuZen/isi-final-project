"use client";

import React, { useState } from "react";
import { RoleLayout } from "@/components/layout/role-layout";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  CheckCircle2, XCircle, Clock, AlertTriangle, Search,
  ShieldCheck, Activity, UserCog, ToggleLeft, ToggleRight,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" /> },
  { label: "Konfigurasi",     href: "/super-admin/config",      icon: <Settings className="w-4 h-4" /> },
  { label: "Master Data",     href: "/super-admin/master",      icon: <Database className="w-4 h-4" /> },
];

const STATS = [
  { label: "Total User",           value: "412",  sub: "Seluruh akun aktif",    color: "#1d4ed8", bg: "#eff6ff" },
  { label: "Login Hari Ini",       value: "87",   sub: "s.d. 13:43 WIB",        color: "#059669", bg: "#ecfdf5" },
  { label: "Error Log 24 Jam",     value: "3",    sub: "Perlu ditinjau",         color: "#C62828", bg: "#fef2f2" },
  { label: "User Nonaktif",        value: "14",   sub: "Akun suspended",         color: "#475569", bg: "#f8fafc" },
];

const ROLE_DIST = [
  { role: "Mahasiswa",        count: 356, color: "#059669" },
  { role: "Dosen Pembimbing", count: 38,  color: "#C62828" },
  { role: "Dosen Penguji",    count: 22,  color: "#2563EB" },
  { role: "Admin Prodi",      count: 4,   color: "#1d4ed8" },
  { role: "Admin Fakultas",   count: 2,   color: "#4338ca" },
  { role: "Pimpinan",         count: 3,   color: "#b45309" },
  { role: "Super Admin",      count: 2,   color: "#475569" },
];

type UserStatus = "Aktif" | "Nonaktif" | "Suspended";

const USERS: Array<{
  id: string; nama: string; role: string; unit: string; lastLogin: string; status: UserStatus;
}> = [
  { id: "20101152630045", nama: "Danu Zen",             role: "Mahasiswa",        unit: "Teknik Informatika", lastLogin: "Hari ini 10:23",   status: "Aktif" },
  { id: "1012345678",     nama: "Dr. Hendra Saputra",   role: "Dosen Pembimbing", unit: "FIK",                lastLogin: "Hari ini 09:15",   status: "Aktif" },
  { id: "1023456789",     nama: "Dr. Ahmad Fauzi",      role: "Dosen Penguji",    unit: "FIK",                lastLogin: "Kemarin 16:40",    status: "Aktif" },
  { id: "ADMINP001",      nama: "Dr. Ratna Dewi",       role: "Admin Prodi",      unit: "Teknik Informatika", lastLogin: "Hari ini 08:45",   status: "Aktif" },
  { id: "20101152630189", nama: "Hendro Wibowo",        role: "Mahasiswa",        unit: "Sistem Informasi",   lastLogin: "5 hari lalu",      status: "Nonaktif" },
  { id: "20101152630211", nama: "Putri Handayani",      role: "Mahasiswa",        unit: "Teknik Informatika", lastLogin: "2 hari lalu",      status: "Aktif" },
  { id: "ADMF001",        nama: "Dra. Yanti Susanti",   role: "Admin Fakultas",   unit: "FIK",                lastLogin: "Hari ini 11:02",   status: "Aktif" },
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
  success: { color: "#059669", bg: "#ecfdf5", icon: CheckCircle2 },
  error:   { color: "#C62828", bg: "#fef2f2", icon: XCircle },
  warning: { color: "#b45309", bg: "#fffbeb", icon: AlertTriangle },
  info:    { color: "#1d4ed8", bg: "#eff6ff", icon: Activity },
};

const STATUS_USER: Record<UserStatus, { color: string; bg: string }> = {
  "Aktif":     { color: "#059669", bg: "#ecfdf5" },
  "Nonaktif":  { color: "#475569", bg: "#f8fafc" },
  "Suspended": { color: "#C62828", bg: "#fef2f2" },
};

export default function SuperAdminDashboard() {
  const [search, setSearch] = useState("");
  const [maintenance, setMaintenance] = useState(false);

  const filtered = USERS.filter(
    (u) =>
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.id.includes(search) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RoleLayout
      navItems={NAV}
      userName="Irvan Syahputra, S.T."
      userCode="SA-001"
      userRole="Super Admin"
      userUnit="FIK — UPI YPTK Padang"
      accentColor="#475569"
    >
      {/* Welcome Banner */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-600 text-white">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Sistem
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
              Panel Kontrol Sistem SIPETA
            </h1>
            <p className="text-xs text-neutral-400 max-w-2xl">
              Status sistem: <strong className="text-emerald-400">Online Normal</strong>. Terdapat{" "}
              <strong className="text-rose-400">3 error log</strong> baru yang perlu ditinjau.
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0 flex-wrap">
            <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-600 text-white hover:bg-slate-700 transition-all active:scale-95">
              <UserCog className="w-4 h-4" /> Manajemen User
            </button>
            <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95">
              <ClipboardList className="w-4 h-4" /> Audit Log
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-slate-500">{s.label}</p>
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            </div>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* User table (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-600 text-white flex items-center justify-center shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">Manajemen User</h2>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari nama, ID, role..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-[12px] text-slate-700 bg-slate-50 focus:outline-none focus:border-slate-400 w-44 transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["ID", "Nama", "Role", "Unit", "Login Terakhir", "Status", "Aksi"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((u) => {
                    const sc = STATUS_USER[u.status];
                    return (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-[10px] text-slate-500">{u.id}</td>
                        <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">{u.nama}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">{u.role}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{u.unit}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-slate-500">{u.lastLogin}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: sc.bg, color: sc.color }}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <button className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-600 text-white hover:bg-slate-700 transition-all">Edit</button>
                            <button className="px-2 py-1 rounded-lg text-[10px] font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-all">Non-aktif</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Role Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-slate-600 text-white flex items-center justify-center shadow-xs">
                <Activity className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">Distribusi Role</h2>
            </div>
            <div className="space-y-2.5">
              {ROLE_DIST.map((r) => {
                const pct = Math.round((r.count / 427) * 100);
                return (
                  <div key={r.role} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold text-slate-700">{r.role}</p>
                      <span className="text-[10.5px] font-black" style={{ color: r.color }}>{r.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: r.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-slate-600 text-white flex items-center justify-center shadow-xs">
                <ClipboardList className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">Audit Log Terbaru</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {AUDIT_LOG.map((log, i) => {
                const cfg = LOG_COLOR[log.type as keyof typeof LOG_COLOR];
                const Icon = cfg.icon;
                return (
                  <div key={i} className="flex items-start gap-3 px-4 py-3">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: cfg.bg }}>
                      <Icon className="w-3 h-3" style={{ color: cfg.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10.5px] font-bold text-slate-800 leading-tight">{log.action}</p>
                      <p className="text-[9.5px] text-slate-500 truncate">{log.user} — {log.target}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">{log.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Konfigurasi Sistem */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-slate-600 text-white flex items-center justify-center shadow-xs">
                <Settings className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">Konfigurasi Sistem</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">Mode Maintenance</p>
                  <p className="text-[10px] text-slate-500">Nonaktifkan akses seluruh user</p>
                </div>
                <button
                  onClick={() => setMaintenance(!maintenance)}
                  className="transition-all"
                >
                  {maintenance
                    ? <ToggleRight className="w-8 h-8 text-red-500" />
                    : <ToggleLeft className="w-8 h-8 text-slate-300" />
                  }
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">Kuota Bimbingan Dosen</p>
                  <p className="text-[10px] text-slate-500">Batas mahasiswa per dosen</p>
                </div>
                <span className="text-sm font-black text-slate-700">8</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">Tahun Akademik Aktif</p>
                  <p className="text-[10px] text-slate-500">Semester yang sedang berjalan</p>
                </div>
                <span className="text-xs font-black text-slate-700">2025/2026 Genap</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
