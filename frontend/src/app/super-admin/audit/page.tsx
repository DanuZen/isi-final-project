"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  Search, ArrowRight, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Activity, Terminal
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" /> },
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
  userAgent: string;
}

const AUDIT_DATA: AuditItem[] = [
  { id: "LOG-1092", time: "13:41:05 WIB", user: "Dr. Ratna Dewi", role: "Admin Prodi", action: "Aktivasi Akun Mahasiswa", target: "20101152630201 (Teguh Santoso)", ip: "192.168.1.45", type: "success", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0" },
  { id: "LOG-1091", time: "13:22:12 WIB", user: "Danu Zen", role: "Mahasiswa", action: "Login Berhasil (SSO)", target: "Session Started (/)", ip: "180.252.12.8", type: "info", userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X)" },
  { id: "LOG-1090", time: "12:55:40 WIB", user: "Unknown", role: "Visitor", action: "Login Gagal (Password Salah 3x)", target: "Account: 20101152630999", ip: "103.111.42.10", type: "error", userAgent: "Python-urllib/3.10" },
  { id: "LOG-1089", time: "11:30:19 WIB", user: "Dr. Sarjon Defit", role: "Dosen Pembimbing", action: "ACC Seminar Proposal", target: "Danu Zen (20101152630045)", ip: "192.168.1.12", type: "success", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5)" },
  { id: "LOG-1088", time: "10:10:02 WIB", user: "Super Admin", role: "Super Admin", action: "Reset Password User", target: "20101152630189 (Hendro Wibowo)", ip: "127.0.0.1", type: "warning", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/126.0" },
];

export default function SuperAdminAuditPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("LOG-1092");

  const filtered = AUDIT_DATA.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase())
  );

  const selected = AUDIT_DATA.find((l) => l.id === selectedId) || filtered[0] || AUDIT_DATA[0];

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Irvan Syahputra, S.T." userNim="SA-001" userRole="Super Admin" prodiName="Sistem Utama SIPETA" />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <ClipboardList className="w-3.5 h-3.5 text-white" /> Audit Log &amp; Security Audit
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Catatan Jejak Aktivitas &amp; Log Sistem
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Catatan realtime seluruh aksi pengguna, autentikasi login, IP Address, serta audit trail keamanan aplikasi SIPETA.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/super-admin/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Dashboard System</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 flex-wrap shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                  <ClipboardList className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-slate-900 font-display">Log Aktivitas Sistem ({filtered.length})</h2>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari user, aksi, IP..."
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
                        {["Log ID", "Waktu", "Pengguna / User", "Role", "Aktivitas / Event", "Target Objek", "IP Address"].map((h) => (
                          <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((log) => {
                        const isSelected = selected?.id === log.id;
                        return (
                          <tr
                            key={log.id}
                            onClick={() => setSelectedId(log.id)}
                            className={`transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-rose-50/70 border-l-4 border-l-[#C62828]"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-4 py-3.5 font-mono text-[10.5px] font-bold text-slate-900">{log.id}</td>
                            <td className="px-4 py-3.5 text-slate-500 font-medium whitespace-nowrap font-mono text-[11px]">{log.time}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap font-display">{log.user}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C62828] text-white shadow-2xs font-display">
                                {log.role}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-semibold text-slate-800 whitespace-nowrap">{log.action}</td>
                            <td className="px-4 py-3.5 text-slate-600 max-w-[200px] truncate font-medium">{log.target}</td>
                            <td className="px-4 py-3.5 font-mono text-[10.5px] text-slate-400 font-semibold">{log.ip}</td>
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
                      <h3 className="text-sm font-black text-slate-900 font-display">{selected.action}</h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-display">Aktor Pengguna</p>
                        <p className="font-bold text-slate-900 mt-0.5 font-display">{selected.user}</p>
                        <p className="text-[10.5px] text-slate-400 font-mono">IP: {selected.ip}</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Detail Objek Target:</span>
                        <p className="text-slate-800 font-semibold leading-relaxed text-[11.5px]">{selected.target}</p>
                        <p className="text-[10px] font-mono text-slate-400 truncate pt-1 border-t border-slate-200">{selected.userAgent}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-amber-400 text-[11px] font-display">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Audit Trail Integrity</span>
                        </div>
                        <p className="text-[10px] text-slate-300 font-medium">Log terenkripsi dengan hash HMAC SHA-256 &amp; tidak dapat dimanipulasi.</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 flex items-center justify-center gap-2 font-display">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Log Terverifikasi Aman
                    </span>
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
