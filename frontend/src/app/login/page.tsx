"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GraduationCap, UserCheck, ShieldCheck, Building2,
  LayoutDashboard, Users, Lock, LogIn, User, Eye, EyeOff,
  ArrowRight, CheckCircle2, School, FileText, BookOpen,
  FileCheck, Award, Sparkles, ChevronRight
} from "lucide-react";

/* ─────────────────────────── DATA ROLES ─────────────────────────── */

const QUICK_ROLES = [
  { id: "mahasiswa",        label: "Mahasiswa",        desc: "Portal Skripsi",        path: "/",                         icon: GraduationCap, bg: "bg-emerald-600", text: "text-white" },
  { id: "dosen_pembimbing", label: "Dosen Pembimbing", desc: "Bimbingan & ACC",     path: "/dosen/dashboard",          icon: UserCheck,     bg: "bg-[#C62828]",  text: "text-white" },
  { id: "dosen_penguji",    label: "Dosen Penguji",    desc: "Penilaian & Sidang",  path: "/penguji/dashboard",        icon: ShieldCheck,   bg: "bg-[#C62828]",  text: "text-white" },
  { id: "admin_prodi",      label: "Admin Prodi",      desc: "Verifikasi & Jadwal", path: "/admin-prodi/dashboard",    icon: Building2,     bg: "bg-blue-600",   text: "text-white" },
  { id: "admin_fakultas",   label: "Admin Fakultas",   desc: "SK & Bebas Fakultas", path: "/admin-fakultas/dashboard", icon: School,        bg: "bg-indigo-600", text: "text-white" },
  { id: "pimpinan",         label: "Pimpinan / Dekan", desc: "Laporan Eksekutif",   path: "/dekanat/dashboard",        icon: LayoutDashboard, bg: "bg-[#F59E0B]", text: "text-slate-950" },
  { id: "super_admin",      label: "Super Admin",      desc: "Audit & Konfigurasi", path: "/super-admin/dashboard",    icon: Users,         bg: "bg-slate-900",  text: "text-white" },
];

const TA_STEPS = [
  { icon: FileText,  title: "1. Usulan Judul",   desc: "Pengajuan & Cek Kemiripan" },
  { icon: BookOpen,  title: "2. Bimbingan TA",   desc: "Min. 5 Sesi Log Digital" },
  { icon: FileCheck, title: "3. Sempro",         desc: "Seminar & Berita Acara" },
  { icon: Award,     title: "4. Sidang Skripsi", desc: "Ujian Final & Hardcover" },
];

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab]       = useState<"mahasiswa" | "dosen" | "admin">("mahasiswa");
  const [username, setUsername]         = useState("20101152630045");
  const [password, setPassword]         = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [targetPath, setTargetPath]     = useState("/");

  // Switch role tabs & auto-fill demo credentials
  const handleTabSwitch = (tab: "mahasiswa" | "dosen" | "admin") => {
    setActiveTab(tab);
    if (tab === "mahasiswa") {
      setUsername("20101152630045");
      setPassword("••••••••");
      setTargetPath("/");
    } else if (tab === "dosen") {
      setUsername("1012057301");
      setPassword("••••••••");
      setTargetPath("/dosen/dashboard");
    } else {
      setUsername("198504122010122001");
      setPassword("••••••••");
      setTargetPath("/admin-prodi/dashboard");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(targetPath);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F5F5F7] overflow-x-hidden font-sans">

      {/* ════════════════════════════════════════════════════════════
          LEFT PANEL — Official UPI YPTK Photo Banner (50% Width)
         ════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-10 xl:p-14 overflow-hidden bg-[#0B0F19]">
        
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/upi.jpeg"
            alt="Gedung UPI YPTK Padang"
            fill
            className="object-cover object-center scale-105"
            priority
          />
        </div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]/40" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0B0F19] to-transparent z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/90 to-transparent z-0" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,rgba(198,40,40,0.18),transparent_60%)]" />

        {/* Top Branding Section */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 relative shrink-0 drop-shadow-md">
              <Image src="/upiyptk_emblem.webp" alt="Emblem UPI YPTK" fill className="object-contain" />
            </div>
            <div>
              <p className="font-black text-2xl tracking-widest text-white leading-none font-display">SIPETA</p>
              <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#F59E0B] mt-1 font-display">
                UNIVERSITAS PUTRA INDONESIA YPTK PADANG
              </p>
            </div>
          </div>

          <span className="px-3.5 py-1 rounded-full text-[10.5px] font-bold bg-[#C62828] text-white shadow-xs font-display">
            Fakultas Ilmu Komputer
          </span>
        </div>

        {/* Middle Hero Text Section */}
        <div className="relative z-10 my-auto py-8 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-white backdrop-blur-md border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" /> Portal Perjalanan &amp; Evaluasi Tugas Akhir
            </span>

            <h1 className="text-3xl xl:text-4xl font-black text-white leading-tight font-display tracking-tight">
              Sistem Informasi Terintegrasi Skripsi &amp; Tugas Akhir
            </h1>

            <p className="text-sm text-slate-300 max-w-lg leading-relaxed font-medium">
              Platform resmi digitalisasi bimbingan, pengajuan judul, penjadwalan ujian seminar/sidang, serta penerbitan SK kelulusan bagi Civitas Akademika UPI YPTK Padang.
            </p>
          </div>

          {/* 4 Tahap Process Chips */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {TA_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.title} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#C62828]/20 border border-[#C62828]/40 text-white flex items-center justify-center shrink-0">
                    <StepIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white font-display">{step.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Trust Footer */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-slate-400 text-xs font-medium">
          <p>© 2026 Universitas Putra Indonesia YPTK Padang</p>
          <span className="text-[11px] text-emerald-400 font-bold font-mono">v1.4 Status: Operational</span>
        </div>

      </div>

      {/* ════════════════════════════════════════════════════════════
          RIGHT PANEL — Executive Authentic Login Form (50% Width)
         ════════════════════════════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 xl:p-14 overflow-y-auto">
        
        {/* Mobile Header (Shown on Small Screens) */}
        <div className="lg:hidden flex items-center justify-between pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 relative shrink-0">
              <Image src="/upiyptk_emblem.webp" alt="Emblem UPI YPTK" fill className="object-contain" />
            </div>
            <div>
              <p className="font-black text-lg tracking-wider text-slate-900 leading-none font-display">SIPETA</p>
              <p className="text-[8px] font-bold text-[#C62828] uppercase font-display">UPI YPTK PADANG</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C62828] text-white">FIK</span>
        </div>

        <div className="max-w-md w-full mx-auto my-auto space-y-7 py-6">

          {/* Form Header Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C62828]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#C62828] font-display">Portal Autentikasi Akademik</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              Selamat Datang di SIPETA
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Silakan pilih kategori peran dan masukkan NIM/NIDN Anda untuk masuk.
            </p>
          </div>

          {/* ── Category Role Switcher Tabs ── */}
          <div className="p-1 bg-slate-200/70 rounded-2xl grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => handleTabSwitch("mahasiswa")}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer font-display ${
                activeTab === "mahasiswa"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Mahasiswa</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch("dosen")}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer font-display ${
                activeTab === "dosen"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="w-4 h-4 text-[#C62828]" />
              <span>Dosen</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch("admin")}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer font-display ${
                activeTab === "admin"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Staf / Admin</span>
            </button>
          </div>

          {/* ── Login Form Card ── */}
          <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider font-display">
                {activeTab === "mahasiswa" ? "NIM Mahasiswa" : activeTab === "dosen" ? "NIDN Dosen" : "NIP / Username Admin"}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Masukkan nomor identitas..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-xs text-slate-900 font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#C62828] focus:bg-white transition-all shadow-2xs font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider font-display">Kata Sandi</label>
                <button type="button" className="text-[11px] font-bold text-[#C62828] hover:underline cursor-pointer font-display">
                  Lupa sandi?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-xs text-slate-900 font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#C62828] focus:bg-white transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#C62828] hover:bg-[#a81f1f] text-white font-bold text-xs transition-all active:scale-[0.98] shadow-md shadow-red-950/20 flex items-center justify-center gap-2 cursor-pointer font-display disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Mengotentikasi Sesi...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-white" />
                  Masuk ke Portal SIPETA
                  <ArrowRight className="w-4 h-4 text-white ml-1" />
                </>
              )}
            </button>
          </form>

          {/* ── Quick Direct Portal Links Grid (Clear & Professional) ── */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest font-display">Akses Pintas Portal (Dev Direct Access)</span>
              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-mono">7 Portal Role</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {QUICK_ROLES.map((r) => {
                const RoleIcon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => router.push(r.path)}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#C62828] hover:shadow-xs transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${r.bg} ${r.text} flex items-center justify-center shrink-0 shadow-2xs font-bold`}>
                        <RoleIcon className="w-3.5 h-3.5 text-current" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold text-slate-900 font-display truncate group-hover:text-[#C62828] transition-colors">{r.label}</p>
                        <p className="text-[9px] text-slate-400 font-medium truncate">{r.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-start gap-2.5 text-slate-600 text-[11px] font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              Akun SIPETA diterbitkan secara resmi oleh <strong>Admin Prodi FIK</strong> setelah verifikasi clearing SKS &amp; IPK di kampus.
            </p>
          </div>

        </div>

        {/* Page Footer */}
        <div className="text-center pt-6 border-t border-slate-200/80 text-[11px] text-slate-400 font-medium">
          SIPETA v1.4 — Fakultas Ilmu Komputer UPI YPTK Padang
        </div>

      </div>

    </div>
  );
}
