"use client";

import React, { useState } from "react";
import {
  Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { PageBanner, bannerPrimaryBtn, bannerSecondaryBtn } from "@/components/layout/page-banner";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Settings,
  Database,
  Search,
  Plus,
  KeyRound,
  ShieldAlert,
  Check,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  ArrowLeft,
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
  { id: "20101152630045", nama: "Danu Zen", email: "danuzen@mbois.id", role: "Mahasiswa", unit: "Teknik Informatika", lastLogin: "Hari ini 10:23", status: "Aktif", registeredDate: "12 Sep 2022" },
  { id: "1012345678", nama: "Dr. Hendra Saputra, M.T.", email: "hendra@mbois.id", role: "Dosen Pembimbing", unit: "Fakultas Ilmu Komputer", lastLogin: "Hari ini 09:15", status: "Aktif", registeredDate: "05 Mar 2018" },
  { id: "1023456789", nama: "Dr. Ahmad Fauzi, M.T.", email: "ahmadfauzi@mbois.id", role: "Dosen Penguji", unit: "Fakultas Ilmu Komputer", lastLogin: "Kemarin 16:40", status: "Aktif", registeredDate: "10 Jan 2019" },
  { id: "ADMINP001", nama: "Dr. Ratna Dewi, M.Kom.", email: "ratnadewi@mbois.id", role: "Admin Prodi", unit: "Teknik Informatika", lastLogin: "Hari ini 08:45", status: "Aktif", registeredDate: "14 Agu 2020" },
  { id: "ADMF001", nama: "Dra. Yanti Susanti", email: "yanti@mbois.id", role: "Admin Fakultas", unit: "Fakultas Ilmu Komputer", lastLogin: "Hari ini 11:02", status: "Aktif", registeredDate: "01 Feb 2021" },
  { id: "DEKAN001", nama: "Prof. Dr. H. Zulherman, M.T.", email: "zulherman@mbois.id", role: "Pimpinan", unit: "Fakultas Ilmu Komputer", lastLogin: "2 hari lalu", status: "Aktif", registeredDate: "15 Mei 2017" },
  { id: "20101152630189", nama: "Hendro Wibowo", email: "hendro@mbois.id", role: "Mahasiswa", unit: "Sistem Informasi", lastLogin: "5 hari lalu", status: "Nonaktif", registeredDate: "20 Sep 2023" },
];

export default function SuperAdminUsersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users] = useState<UserItem[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("20101152630045");
  const [showMobileDetail, setShowMobileDetail] = useState(false);

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
          <Header
            className="shell-header shrink-0"
            userName="Irvan Syahputra, S.T."
            userNim="SA-001"
            userRole="Super Admin"
            prodiName="PT MBOIS - Final Project"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0 md:pt-0">

            {/* ── Welcome Banner ── */}
            <PageBanner
              title="Kelola Akun Pengguna & RBAC Sistem"
              description="Manajemen kredensial akun mahasiswa, dosen, admin prodi, staf fakultas, dan pengaturan hak akses role-based."
              stats={[
                { icon: UserCheck, value: "7 Role Aktif", label: "RBAC Hierarchy" },
                { icon: Users, value: "1,240 Akun", label: "Terdaftar Resmi" },
                { icon: ShieldCheck, value: "Single Sign-On", label: "SIAK Auth" },
              ]}
              actions={
                <Link
                  href="/super-admin/dashboard"
                  className={bannerPrimaryBtn}
                >
                  <span>Ke Dashboard Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              }
            />

            {/* Grid Layout with Live Side Detail Panel Card */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* Table Container */}
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 min-h-0 flex-col min-w-0 ${
                showMobileDetail ? "hidden lg:flex" : "flex"
              }`}>
                {/* Integrated Table Card Header + Controls */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-white">
                  <div className="flex items-center justify-between sm:justify-start gap-2.5 shrink-0 w-full sm:w-auto">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm text-slate-900 font-display">Seluruh Akun Terdaftar</h2>
                        <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Pengguna Sistem</p>
                      </div>
                    </div>

                    {/* Mobile Only Action Button */}
                    <button
                      onClick={() => alert("Membuka form pembuatan akun user baru...")}
                      className="sm:hidden px-3 py-1.5 rounded-xl text-xs font-bold bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all active:scale-95 shadow-2xs font-display flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah</span>
                    </button>
                  </div>

                  {/* 1-Row Controls: Search Input */}
                  <div className="relative flex-1 sm:w-64 max-w-xs min-w-0">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Cari ID, nama, role..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-7 pr-2 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#2563eb] transition-all w-full font-display"
                    />
                  </div>
                </div>

                {/* Table with Touch-Pan-X Smooth Container */}
                <div className="overflow-y-auto flex-1 scrollbar-none flex flex-col min-h-0">
                  <div className="overflow-x-auto w-full touch-pan-x flex-1 min-w-0 scrollbar-thin">
                    <table className="w-full text-xs min-w-[850px] border-collapse">
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
                              onClick={() => {
                                setSelectedId(row.id);
                                setShowMobileDetail(true);
                              }}
                              className={`transition-all cursor-pointer select-none ${
                                isSelected
                                  ? "bg-slate-100 font-bold"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <td className="px-4 py-3.5 font-mono text-[10.5px] font-bold text-slate-900 whitespace-nowrap">{row.id}</td>
                              <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap font-display">{row.nama}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-[#2563eb] text-white font-display shadow-2xs">
                                  {row.role}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 font-medium">{row.unit}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 text-[11px] font-medium">{row.lastLogin}</td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold text-white shadow-2xs font-display ${
                                  row.status === "Aktif" ? "bg-emerald-600" : "bg-slate-500"
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
              </div>

              {/* Side Detail Panel (Strict 350px Width Lock on Desktop) */}
              {selected && (
                <div className={`w-full lg:w-[350px] lg:min-w-[350px] lg:max-w-[350px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-col justify-between p-5 space-y-4 animate-in fade-in duration-150 ${
                  showMobileDetail ? "flex flex-1" : "hidden lg:flex"
                }`}>
                  <div className="space-y-4 overflow-y-auto scrollbar-none min-w-0">
                    
                    <div className="pb-3 border-b border-slate-100 space-y-2 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        {/* Mobile Back Button (Matching Reference Pill ← Kembali) */}
                        <button
                          onClick={() => setShowMobileDetail(false)}
                          className="lg:hidden px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                        >
                          <ArrowLeft className="w-3.5 h-3.5 text-[#2563eb]" />
                          <span>Kembali</span>
                        </button>

                        {/* Role Pill Badge on Right */}
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#2563eb] text-white font-display shadow-2xs ml-auto">
                          {selected.role}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 font-display break-words">{selected.nama}</h3>
                      <p className="text-xs text-slate-500 font-medium truncate">{selected.email}</p>
                    </div>

                    <div className="space-y-3 text-xs min-w-0">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Informasi Registrasi:</span>
                        <div className="space-y-1 text-slate-700">
                          <p><strong className="text-slate-900">User ID / NIM:</strong> {selected.id}</p>
                          <p><strong className="text-slate-900">Unit / Fakultas:</strong> {selected.unit}</p>
                          <p><strong className="text-slate-900">Tanggal Terdaftar:</strong> {selected.registeredDate}</p>
                          <p><strong className="text-slate-900">Login Terakhir:</strong> {selected.lastLogin}</p>
                        </div>
                      </div>

                      {selected.role.includes("Dosen") && (
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">Hak Penugasan Dosen:</span>
                          <div className="space-y-2 pt-1">
                            <label className="flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer">
                              <span className="flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-[#2563eb]" /> Dosen Pembimbing</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563eb] cursor-pointer" />
                            </label>
                            <label className="flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer">
                              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Dosen Penguji</span>
                              <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 cursor-pointer" />
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Solid Emerald Auth Card */}
                      <div className="p-3.5 rounded-xl bg-emerald-600 text-white shadow-xs text-[11px] font-semibold space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Check className="w-4 h-4 text-white shrink-0" />
                          <span>Status Otorisasi Lengkap</span>
                        </div>
                        <p className="text-[10.5px] text-white/90 font-medium leading-normal">Akun aktif dan terenkripsi dalam direktori SSO universitas.</p>
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
                      className="w-full py-2 rounded-xl text-xs font-bold bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all flex items-center justify-center gap-2 active:scale-95 font-display cursor-pointer"
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
