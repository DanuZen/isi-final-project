"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GraduationCap, UserCheck, ShieldCheck, Building2,
  LayoutDashboard, Users, Lock, LogIn, User, Eye, EyeOff,
  ArrowRight, CheckCircle2, School, FileText, BookOpen,
  FileCheck, Award, Sparkles, HelpCircle, X
} from "lucide-react";

import { SplashScreen } from "@/components/ui/splash-screen";

/* ─────────────────────────── DATA ROLES ─────────────────────────── */

const QUICK_ROLES = [
  { id: "mahasiswa",      label: "Mahasiswa",      path: "/mahasiswa/dashboard",   icon: GraduationCap, bg: "bg-emerald-600", text: "text-white" },
  { id: "dosen",          label: "Portal Dosen",   path: "/dosen/dashboard",       icon: UserCheck,     bg: "bg-[#C62828]",  text: "text-white" },
  { id: "admin_prodi",    label: "Admin Prodi",    path: "/admin-prodi/dashboard", icon: Building2,     bg: "bg-blue-600",   text: "text-white" },
  { id: "admin_fakultas", label: "Admin Fakultas", path: "/admin-fakultas/dashboard", icon: School,     bg: "bg-indigo-600", text: "text-white" },
  { id: "pimpinan",       label: "Dekanat",        path: "/dekanat/dashboard",     icon: LayoutDashboard, bg: "bg-[#ffd01d]", text: "text-slate-950" },
  { id: "super_admin",    label: "Super Admin",    path: "/super-admin/dashboard", icon: Users,         bg: "bg-slate-900",  text: "text-white" },
];

const FAQ_ITEMS = [
  {
    q: "Bagaimana cara mendapatkan akun SIPETA?",
    a: "Akun SIPETA diterbitkan secara resmi oleh Admin Program Studi setelah mahasiswa menyelesaikan proses clearing SKS & IPK di sekretariat prodi."
  },
  {
    q: "Bagaimana jika saya lupa kata sandi?",
    a: "Silakan hubungi Admin Prodi kampus Anda dengan menunjukkan Kartu Tanda Mahasiswa (KTM) atau NIDN resmi untuk reset kata sandi."
  },
  {
    q: "Siapa yang dapat mengakses SIPETA?",
    a: "SIPETA dapat diakses oleh seluruh Mahasiswa, Dosen Pembimbing, Dosen Penguji, Admin Prodi, Admin Fakultas, serta Dekanat UPI YPTK Padang."
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername]         = useState("20101152630045");
  const [password, setPassword]         = useState("••••••••");
  const [showPassword, setShowPassword]   = useState(false);
  const [loading, setLoading]             = useState(false);
  const [showFaqModal, setShowFaqModal]   = useState(false);

  // Splash Screen State
  const [splash, setSplash] = useState<{ active: boolean; msg: string; sub: string; targetPath?: string }>({
    active: true,
    msg: "Memuat SIPETA...",
    sub: "Universitas Putra Indonesia YPTK Padang",
  });

  const triggerPortalTransition = (targetPath: string, roleLabel: string) => {
    localStorage.setItem("sipeta_logged_in", "true");
    setSplash({
      active: true,
      msg: `Mengarahkan ke Portal ${roleLabel}...`,
      sub: "Menyiapkan antarmuka & hak akses akun",
      targetPath,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let path = "/mahasiswa/dashboard";
    let roleName = "Mahasiswa";
    const val = username.trim().toLowerCase();
    if (val.startsWith("10") || val.includes("dosen") || val.includes("fauzi")) {
      path = "/dosen/dashboard";
      roleName = "Dosen Pembimbing";
    } else if (val.startsWith("19") || val.includes("admin") || val.includes("prodi")) {
      path = "/admin-prodi/dashboard";
      roleName = "Admin Prodi";
    } else if (val.includes("fakultas")) {
      path = "/admin-fakultas/dashboard";
      roleName = "Admin Fakultas";
    } else if (val.includes("dekan") || val.includes("pimpinan")) {
      path = "/dekanat/dashboard";
      roleName = "Dekanat";
    } else if (val.includes("super")) {
      path = "/super-admin/dashboard";
      roleName = "Super Admin";
    }

    setTimeout(() => {
      triggerPortalTransition(path, roleName);
    }, 400);
  };

  return (
    <div className="h-dvh lg:min-h-screen lg:h-auto w-full flex flex-col lg:flex-row bg-white overflow-hidden lg:overflow-x-hidden font-sans">
      
      {/* ════════════════════════════════════════════════════════════
          LEFT COLUMN (50% Width): 100% Full-Screen Clean Form Panel
         ════════════════════════════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 h-full lg:min-h-screen lg:h-auto p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-between bg-white z-10 overflow-y-auto lg:overflow-visible">
        
        {/* Top Brand Header */}
        <div className="flex items-center justify-center lg:justify-between animate-fade-in-up delay-100">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-11 h-11 relative shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image src="/upiyptk_emblem.webp" alt="Emblem UPI YPTK" fill className="object-contain" />
            </div>
            <div>
              <p className="font-black text-2xl tracking-wider text-slate-900 leading-none font-display group-hover:text-[#C62828] transition-colors">SIPETA</p>
              <p className="text-[8.5px] font-bold text-[#C62828] tracking-widest uppercase mt-0.5 font-display">UPI YPTK PADANG</p>
            </div>
          </div>
        </div>

        {/* Form Content Body */}
        <div className="max-w-md w-full mx-auto my-auto space-y-5 lg:space-y-6 py-4 lg:py-8">
          
          {/* Title & Subtitle */}
          <div className="space-y-2 text-center animate-fade-in-up delay-200">
            <p className="text-[10.5px] font-bold text-[#C62828] uppercase tracking-widest font-display mb-1">
              Platform Resmi Tugas Akhir
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
              Masukkan kredensial akun SIPETA Anda untuk mengakses portal.
            </p>
          </div>

          {/* ── Login Form Inputs ── */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username Input Box */}
            <div className="relative flex items-center bg-white border-2 border-slate-200 focus-within:border-[#C62828] focus-within:ring-4 focus-within:ring-[#C62828]/10 rounded-2xl px-4 py-3 transition-all duration-300 transform focus-within:-translate-y-0.5 shadow-2xs animate-fade-in-up delay-300">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mr-3 transition-colors group-focus-within:bg-rose-50 group-focus-within:text-[#C62828]">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-widest font-display">
                  NIM / NIDN / NIP / Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Masukkan NIM, NIDN, atau Username..."
                  className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none font-mono"
                />
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
            </div>

            {/* Password Input Box */}
            <div className="relative flex items-center bg-white border-2 border-slate-200 focus-within:border-[#C62828] focus-within:ring-4 focus-within:ring-[#C62828]/10 rounded-2xl px-4 py-3 transition-all duration-300 transform focus-within:-translate-y-0.5 shadow-2xs animate-fade-in-up delay-400">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mr-3">
                <Lock className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-widest font-display">Kata Sandi</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan kata sandi..."
                  className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer ml-1 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full py-4 px-6 rounded-2xl bg-[#C62828] hover:bg-[#a81f1f] text-white font-bold text-xs transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-red-950/20 hover:shadow-lg hover:shadow-[#C62828]/30 flex items-center justify-center gap-2 cursor-pointer font-display disabled:opacity-60 animate-fade-in-up delay-500"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Mengotentikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk</span>
                  <ArrowRight className="w-4 h-4 text-white ml-1 transition-transform duration-300 group-hover:translate-x-1.5" />
                </>
              )}
            </button>
          </form>

          {/* ── Direct Role Access Shortcut Icons ── */}
          <div className="space-y-3 pt-2 animate-fade-in-up delay-600">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                Pintasan Akses Role (Dev Quick Access)
              </span>
            </div>

            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              {QUICK_ROLES.map((r) => {
                const RoleIcon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => triggerPortalTransition(r.path, r.label)}
                    title={`Masuk ke ${r.label}`}
                    className={`w-10 h-10 rounded-xl ${r.bg} ${r.text} flex items-center justify-center shadow-xs hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-200 cursor-pointer`}
                  >
                    <RoleIcon className="w-4.5 h-4.5 text-current" />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400 font-medium leading-relaxed animate-fade-in-up delay-600">
          Sistem Informasi Terintegrasi Skripsi &amp; Tugas Akhir <br />
          © 2026 Universitas Putra Indonesia YPTK Padang
        </p>

      </div>

      {/* ════════════════════════════════════════════════════════════
          RIGHT COLUMN (50% Width): 100% Full-Screen Visual & Hero Showcase
         ════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex w-1/2 min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#1A0C14] to-[#C62828]/90 relative flex-col justify-center p-12 xl:p-16 text-white overflow-hidden">
        
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(198,40,40,0.45)_0%,transparent_75%)] animate-pulse-glow" />

        {/* Full-bleed Photo Backdrop overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/upi.jpeg"
            alt="Gedung UPI YPTK Padang"
            fill
            className="object-cover object-center scale-105"
            priority
          />
        </div>

        {/* Centered Graphic Card Showcase */}
        <div className="relative z-10 my-auto text-center space-y-6 py-12 max-w-lg mx-auto">
          {/* Floating Emblem Container */}
          <div className="w-36 h-36 mx-auto relative drop-shadow-[0_25px_50px_rgba(198,40,40,0.65)] animate-float-slow animate-fade-in-scale delay-200">
            <Image src="/upiyptk_emblem.webp" alt="3D Emblem UPI YPTK" fill className="object-contain" />
          </div>

          <div className="space-y-3 animate-fade-in-up delay-400">
            <h2 className="text-3xl xl:text-4xl font-black font-display tracking-tight text-white leading-tight">
              Digitalisasi Tugas Akhir Terintegrasi
            </h2>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              Kelola usulan judul, log bimbingan, penjadwalan ujian seminar &amp; sidang skripsi secara transparan bagi seluruh Civitas Akademika UPI YPTK Padang.
            </p>
          </div>
        </div>

      </div>

      {/* ── FAQ Modal ── */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95">
            <div className="p-5 bg-[#1A1A1A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display text-white">Pusat Bantuan &amp; FAQ SIPETA</h3>
                  <p className="text-[10px] text-neutral-400">Universitas Putra Indonesia YPTK Padang</p>
                </div>
              </div>
              <button
                onClick={() => setShowFaqModal(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900 font-display flex items-start gap-2">
                    <span className="text-[#C62828] font-bold">Q:</span> {item.q}
                  </p>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed pl-5">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowFaqModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer font-display"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Splash Screen Component ── */}
      <SplashScreen
        isVisible={splash.active}
        message={splash.msg}
        subMessage={splash.sub}
        duration={1300}
        onFinish={() => {
          if (splash.targetPath) {
            router.push(splash.targetPath);
          }
        }}
      />

    </div>
  );
}
