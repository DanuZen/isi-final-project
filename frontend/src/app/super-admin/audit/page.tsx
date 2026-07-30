"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  Search, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" />, badge: "12" },
  { label: "Konfigurasi",     href: "/super-admin/config",      icon: <Settings className="w-4 h-4" /> },
  { label: "Master Data",     href: "/super-admin/master",      icon: <Database className="w-4 h-4" /> },
];

interface AuditItem {
  id: string;
  time: string;
  user: string;
  role: string;
  action: string;
  target: string;
  ip: string;
  type: "success" | "warning" | "error" | "info";
}

const AUDIT_DATA: AuditItem[] = [
  { id: "LOG-1092", time: "13:41:05 WIB", user: "Dr. Ratna Dewi", role: "Admin Prodi", action: "Aktivasi akun mahasiswa", target: "20101152630201 (Teguh Santoso)", ip: "192.168.1.45", type: "success" },
  { id: "LOG-1091", time: "13:22:12 WIB", user: "Danu Zen", role: "Mahasiswa", action: "Login berhasil", target: "Session Started (/)", ip: "180.252.12.8", type: "info" },
  { id: "LOG-1090", time: "12:55:40 WIB", user: "Unknown", role: "Visitor", action: "Login gagal (Password Salah 3x)", target: "Account: 20101152630999", ip: "103.111.42.10", type: "error" },
  { id: "LOG-1089", time: "11:30:19 WIB", user: "Dr. Sarjon Defit", role: "Dosen Pembimbing", action: "ACC Seminar Proposal", target: "Danu Zen (20101152630045)", ip: "192.168.1.12", type: "success" },
  { id: "LOG-1088", time: "10:10:02 WIB", user: "Super Admin", role: "Super Admin", action: "Reset password user", target: "20101152630189 (Hendro Wibowo)", ip: "127.0.0.1", type: "warning" },
];

export default function SuperAdminAuditPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  const filtered = AUDIT_DATA.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase())
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
                      <ClipboardList className="w-3.5 h-3.5" /> Audit Log &amp; Security Audit
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Catatan Jejak Aktivitas &amp; Log Sistem
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Catatan realtime seluruh aksi pengguna, autentikasi login, IP Address, serta audit trail keamanan aplikasi.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/super-admin/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Dashboard System</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-sm text-slate-900 font-display">Aktivitas Sistem Terbaru</h2>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari user, aksi, objek..."
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
                      {["Log ID", "Waktu", "Pengguna / User", "Role", "Aktivitas / Event", "Target / Detail", "IP Address"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{log.id}</td>
                        <td className="px-4 py-3 text-slate-600 font-medium whitespace-nowrap">{log.time}</td>
                        <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap font-display">{log.user}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700 text-[10px] border border-slate-200">{log.role}</span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{log.action}</td>
                        <td className="px-4 py-3 text-slate-600 max-w-[220px] truncate">{log.target}</td>
                        <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{log.ip}</td>
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
