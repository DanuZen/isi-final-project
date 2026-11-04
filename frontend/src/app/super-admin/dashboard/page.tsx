"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  CheckCircle2, AlertTriangle, Search, ShieldCheck, UserCog,
  ArrowRight, HardDrive, RefreshCw, Activity, Lock, ArrowLeft, Terminal, Check
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" /> },
  { label: "Konfigurasi",     href: "/super-admin/config",      icon: <Settings className="w-4 h-4" /> },
  { label: "Master Data",     href: "/super-admin/master",      icon: <Database className="w-4 h-4" /> },
];

const STATS = [
  { label: "Total User Sistem",    value: "412",    sub: "Akun Mahasiswa & Dosen",  bgIcon: "bg-amber-500",   icon: Users },
  { label: "Master Program Studi", value: "14",     sub: "Prodi Reference Aktif",    bgIcon: "bg-blue-600",    icon: Database },
  { label: "Audit Log 24 Jam",     value: "1,092",  sub: "Log Keamanan & Sesi",     bgIcon: "bg-[#2563eb]",   icon: ClipboardList },
  { label: "Status Server & DB",   value: "99.9%",  sub: "Core Final Project Online",       bgIcon: "bg-emerald-600", icon: CheckCircle2 },
];

interface AuditLogSummary {
  id: string;
  time: string;
  user: string;
  role: string;
  action: string;
  target: string;
  ip: string;
  status: "success" | "info" | "warning" | "error";
  userAgent: string;
}

const RECENT_LOGS: AuditLogSummary[] = [
  { id: "LOG-1092", time: "13:41:05 WIB", user: "Dr. Ratna Dewi", role: "Admin Prodi", action: "Aktivasi Akun Mahasiswa", target: "20101152630201 (Teguh Santoso)", ip: "192.168.1.45", status: "success", userAgent: "Chrome 126.0 / Windows" },
  { id: "LOG-1091", time: "13:22:12 WIB", user: "Danu Zen", role: "Mahasiswa", action: "Login Berhasil (SSO)", target: "Session Started (/)", ip: "180.252.12.8", status: "info", userAgent: "Mobile Safari / iOS 17.5" },
  { id: "LOG-1090", time: "12:55:40 WIB", user: "Unknown Visitor", role: "Visitor", action: "Login Gagal (Password Salah 3x)", target: "Account: 20101152630999", ip: "103.111.42.10", status: "error", userAgent: "Python-urllib/3.10" },
  { id: "LOG-1089", time: "11:30:19 WIB", user: "Dr. Sarjon Defit", role: "Dosen Pembimbing", action: "ACC Seminar Proposal", target: "Danu Zen (20101152630045)", ip: "192.168.1.12", status: "success", userAgent: "Safari 17.4 / MacOS" },
  { id: "LOG-1088", time: "10:10:02 WIB", user: "Super Admin", role: "Super Admin", action: "Reset Password User", target: "20101152630189 (Hendro Wibowo)", ip: "127.0.0.1", status: "warning", userAgent: "Edge 126.0 / Windows" },
];

const USER_ROLES_RECAP = [
  { role: "Mahasiswa", count: 310, percent: "75%", color: "bg-[#2563eb]" },
  { role: "Dosen Pembimbing & Penguji", count: 84, percent: "20%", color: "bg-blue-600" },
  { role: "Admin Prodi & Fakultas", count: 12, percent: "3%", color: "bg-amber-500" },
  { role: "Dekanat & Super Admin", count: 6, percent: "2%", color: "bg-emerald-600" },
];

export default function SuperAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLogId, setSelectedLogId] = useState<string>("LOG-1092");
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const filteredLogs = RECENT_LOGS.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLog = RECENT_LOGS.find((l) => l.id === selectedLogId) || filteredLogs[0] || RECENT_LOGS[0];

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
          prodiName="PT MBOIS - Final Project"
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Unified Standard Header */}
          <Header
            className="shell-header shrink-0"
            userName="Irvan Syahputra, S.T."
            userNim="SA-001"
            userRole="Super Admin"
            prodiName="PT MBOIS - Final Project"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-y-auto lg:overflow-hidden shell-body flex flex-col min-h-0 justify-between">
            
            {/* ── 1. Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#2563eb] text-white font-display shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" /> Executive Summary Control Center
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Rekapitulasi Utama PT MBOIS - Final Project PT MBOIS
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Rangkuman performa sistem, rekapitulasi data pengguna, catatan jejak audit log, serta status kesehatan server &amp; database terpusat.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/super-admin/users"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <UserCog className="w-4 h-4 text-white" />
                    <span>Manajemen User</span>
                  </Link>
                  <Link
                    href="/super-admin/config"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 font-display"
                  >
                    <Settings className="w-4 h-4 text-white" />
                    <span>Konfigurasi System</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#2563eb]" />
            </div>

            {/* ── 2. Executive Stat Cards (4 Cards) ── */}
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

            {/* ── 3. Split 2-Column Executive Summary Section (7/12 & 5/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 items-stretch">
              
              {/* ── LEFT COLUMN (7/12): Audit Log Realtime Summary Table ── */}
              <div className={`lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 min-h-0 flex flex-col justify-between overflow-hidden ${
                showMobileDetail ? "hidden lg:flex" : "flex"
              }`}>
                {/* Header + Search */}
                <div className="p-3.5 md:p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-white">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <ClipboardList className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Ringkasan Audit Log Terbaru</h2>
                      <p className="text-[9.5px] md:text-[10px] text-slate-400 font-medium truncate">Rekap jejak aktivitas seluruh pengguna</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-48 min-w-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Cari log..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-7 pr-2 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#2563eb] transition-all w-full font-display"
                      />
                    </div>
                    <Link
                      href="/super-admin/audit"
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all shrink-0 font-display flex items-center gap-1 cursor-pointer"
                    >
                      <span>Detail Audit</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                  </div>
                </div>

                {/* Log Table Container */}
                <div className="overflow-y-auto flex-1 scrollbar-thin p-3.5 md:p-4 space-y-2">
                  {filteredLogs.map((log) => {
                    const isSelected = selectedLog?.id === log.id;
                    return (
                      <div
                        key={log.id}
                        onClick={() => {
                          setSelectedLogId(log.id);
                          setShowMobileDetail(true);
                        }}
                        className={`p-3 rounded-xl border text-xs transition-all cursor-pointer space-y-1.5 ${
                          isSelected
                            ? "bg-blue-50/90 border-[#2563eb] shadow-2xs"
                            : "bg-slate-50/80 border-slate-200/80 hover:bg-slate-100/80"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded-md border border-slate-200">
                              {log.id}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 font-medium">{log.time}</span>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold text-white font-display ${
                            log.role === "Super Admin" ? "bg-slate-900" : "bg-[#2563eb]"
                          }`}>
                            {log.role}
                          </span>
                        </div>

                        <div>
                          <p className="font-extrabold text-slate-900 font-display">{log.action}</p>
                          <p className="text-[10.5px] text-slate-500 font-medium truncate">Aktor: <strong className="text-slate-800">{log.user}</strong> · Target: {log.target}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Table Footer Link */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                  <span className="text-[10.5px] text-slate-500 font-medium">Menampilkan 5 log aktivitas terkini</span>
                  <Link
                    href="/super-admin/audit"
                    className="text-[11px] font-extrabold text-[#2563eb] hover:underline font-display flex items-center gap-1"
                  >
                    <span>Lihat Seluruh Log Keamanan</span>
                    <ArrowRight className="w-3 h-3 text-[#2563eb]" />
                  </Link>
                </div>
              </div>

              {/* ── RIGHT COLUMN (5/12): System Health & Master Recap ── */}
              <div className={`lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 min-h-0 flex flex-col justify-between overflow-hidden ${
                showMobileDetail ? "flex" : "hidden lg:flex"
              }`}>
                {/* Header */}
                <div className="p-3.5 md:p-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
                  {/* Mobile Back Button (Matching Reference Pill ← Kembali) */}
                  <button
                    onClick={() => setShowMobileDetail(false)}
                    className="lg:hidden px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>Kembali</span>
                  </button>

                  <div className="hidden lg:flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs md:text-sm text-slate-900 font-display truncate">Status Rekapitulasi System</h3>
                      <p className="text-[9.5px] md:text-[10px] text-slate-400 font-medium truncate">Ringkasan role &amp; konfigurasi server</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#2563eb] text-white font-display shadow-2xs ml-auto">
                    {selectedLog ? selectedLog.role : "Super Admin"}
                  </span>
                </div>

                {/* Right Column Body */}
                <div className="p-3.5 md:p-4 overflow-y-auto flex-1 space-y-3.5 scrollbar-thin">
                  
                  {/* 1. Selected Log Quick Preview Card */}
                  {selectedLog && (
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 relative overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10.5px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/80">
                          {selectedLog.id}
                        </span>
                        <span className="text-[10px] text-white font-extrabold bg-emerald-600 px-2.5 py-0.5 rounded-full shadow-2xs font-display">
                          {selectedLog.status.toUpperCase()}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-black text-slate-900 font-display leading-snug">{selectedLog.action}</h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">Pengguna: <strong className="text-slate-800 font-bold">{selectedLog.user}</strong> ({selectedLog.role})</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-[11px]">
                        <p className="text-[9.5px] uppercase font-bold text-slate-400 font-display">Target Objek &amp; Sesi</p>
                        <p className="text-slate-800 font-bold leading-normal">{selectedLog.target}</p>
                        <p className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200/80">{selectedLog.userAgent} · IP: {selectedLog.ip}</p>
                      </div>
                    </div>
                  )}

                  {/* 2. User Roles Distribution Recap */}
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#2563eb]" />
                        <h5 className="font-bold text-xs text-slate-900 font-display">Distribusi Akun per Role</h5>
                      </div>
                      <Link href="/super-admin/users" className="text-[10.5px] font-bold text-[#2563eb] hover:underline font-display">
                        Kelola →
                      </Link>
                    </div>

                    <div className="space-y-2 text-xs">
                      {USER_ROLES_RECAP.map((r) => (
                        <div key={r.role} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-slate-700 font-display">{r.role}</span>
                            <span className="font-bold text-slate-900 font-mono">{r.count} User ({r.percent})</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full ${r.color} rounded-full`} style={{ width: r.percent }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                  <Link
                    href="/super-admin/config"
                    className="w-full py-2 rounded-xl text-xs font-bold bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all flex items-center justify-center gap-2 active:scale-95 font-display cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-white" />
                    <span>Buka Konfigurasi Master System</span>
                  </Link>
                </div>
              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
