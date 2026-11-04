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
  { id: "mahasiswa",      label: "Mahasiswa / User", path: "/mahasiswa/dashboard",   icon: GraduationCap, bg: "bg-blue-600",    text: "text-white" },
  { id: "dosen",          label: "Instruktur / Mentor",   path: "/dosen/dashboard",       icon: UserCheck,     bg: "bg-blue-600",    text: "text-white" },
  { id: "admin_prodi",    label: "Admin Divisi",      path: "/admin-prodi/dashboard", icon: Building2,     bg: "bg-blue-600",     text: "text-white" },
  { id: "admin_fakultas", label: "Admin Program",     path: "/admin-fakultas/dashboard", icon: School,     bg: "bg-blue-600",  text: "text-white" },
  { id: "pimpinan",       label: "Manajemen",         path: "/dekanat/dashboard",     icon: LayoutDashboard, bg: "bg-blue-600",  text: "text-white" },
  { id: "super_admin",    label: "Super Admin",       path: "/super-admin/dashboard", icon: Users,         bg: "bg-blue-600",   text: "text-white" },
];

const FAQ_ITEMS = [
  {
    q: "Bagaimana cara mendapatkan akun PT MBOIS - Final Project?",
    a: "Akun Final Project diterbitkan secara resmi oleh Administrator Divisi setelah pendaftaran program pembelajaran dikonfirmasi."
  },
  {
    q: "Bagaimana jika saya lupa kata sandi?",
    a: "Silakan hubungi tim Administrator atau IT Support PT MBOIS dengan menyertakan Nomor Identitas / Email terdaftar untuk reset kata sandi."
  },
  {
    q: "Siapa saja yang dapat mengakses platform ini?",
    a: "Platform ini dapat diakses oleh seluruh Peserta, Mentor/Instruktur, Reviewer, serta Manajemen PT MBOIS."
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
    msg: "Memuat PT MBOIS - Final Project...",
    sub: "Platform Pembelajaran & Manajemen Terintegrasi",
  });

  const triggerPortalTransition = (targetPath: string, roleLabel: string) => {
    localStorage.setItem("mbois_logged_in", "true");
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
      roleName = "Instruktur / Pembimbing";
    } else if (val.startsWith("19") || val.includes("admin") || val.includes("prodi")) {
      path = "/admin-prodi/dashboard";
      roleName = "Admin Divisi";
    } else if (val.includes("fakultas")) {
      path = "/admin-fakultas/dashboard";
      roleName = "Admin Program";
    } else if (val.includes("dekan") || val.includes("pimpinan")) {
      path = "/dekanat/dashboard";
      roleName = "Manajemen";
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
        <div className="flex items-center justify-between animate-fade-in-up delay-100">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-11 h-11 relative shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image src="/mbois_blue.png" alt="Logo PT MBOIS" fill className="object-contain" priority />
            </div>
            <div>
              <p className="font-black text-2xl tracking-wider text-slate-900 leading-none font-display group-hover:text-blue-600 transition-colors">PT MBOIS</p>
              <p className="text-[8.5px] font-bold text-blue-600 tracking-widest uppercase mt-0.5 font-display">FINAL PROJECT</p>
            </div>
          </div>

          <button
            onClick={() => setShowFaqModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-blue-50"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Bantuan</span>
          </button>
        </div>

        {/* Form Content Body */}
        <div className="max-w-md w-full mx-auto my-auto space-y-5 lg:space-y-6 py-4 lg:py-8">
          
          {/* Title & Subtitle */}
          <div className="space-y-1.5 text-center animate-fade-in-up delay-200">
            <p className="text-[11px] font-bold text-blue-600 tracking-widest uppercase font-display">
              PT MBOIS • FINAL PROJECT
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Masuk dengan akun Anda untuk melanjutkan
            </p>
          </div>

          {/* ── Login Form Inputs with Notched Floating Labels & Rich Micro-Animations ── */}
          <form onSubmit={handleLogin} className="space-y-5 pt-3">
            
            {/* Username Input Box */}
            <div className="group relative flex items-center bg-white border border-slate-300/90 hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:shadow-[0_8px_24px_-4px_rgba(37,99,235,0.18)] focus-within:-translate-y-0.5 rounded-xl px-3.5 py-3 transition-all duration-300 ease-out shadow-2xs">
              
              {/* Notched Outline Floating Label (Memotong Garis Tepi Atas) */}
              <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[10px] sm:text-[10.5px] font-bold text-slate-500 uppercase tracking-wider font-display group-focus-within:text-blue-600 group-focus-within:font-extrabold transition-all duration-200 z-10 leading-none select-none pointer-events-none">
                NIM / NIP / Username / Email
              </label>

              {/* Animated Icon Container with Spring Pop */}
              <div className="relative w-9 h-9 rounded-lg bg-blue-50/90 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 mr-3 transition-all duration-300 ease-out group-focus-within:bg-blue-600 group-focus-within:text-white group-focus-within:border-blue-600 group-focus-within:scale-105 group-focus-within:shadow-md group-focus-within:shadow-blue-600/30">
                <User className="w-4 h-4 transition-all duration-300 group-focus-within:animate-icon-pop" />
              </div>

              {/* Input */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Masukkan Username atau ID Akun..."
                className="w-full text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-300 bg-transparent focus:outline-none"
              />

              {/* Bouncy Spring Pop-In Indicator */}
              {username.trim() && (
                <div className="relative w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 ml-2 animate-pop-in shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Bottom Expanding Laser Accent Line */}
              <div className="absolute -bottom-[1px] left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out origin-center pointer-events-none" />
            </div>

            {/* Password Input Box */}
            <div className="group relative flex items-center bg-white border border-slate-300/90 hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:shadow-[0_8px_24px_-4px_rgba(37,99,235,0.18)] focus-within:-translate-y-0.5 rounded-xl px-3.5 py-3 transition-all duration-300 ease-out shadow-2xs">
              
              {/* Notched Outline Floating Label (Memotong Garis Tepi Atas) */}
              <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[10px] sm:text-[10.5px] font-bold text-slate-500 uppercase tracking-wider font-display group-focus-within:text-blue-600 group-focus-within:font-extrabold transition-all duration-200 z-10 leading-none select-none pointer-events-none">
                Kata Sandi
              </label>

              {/* Animated Icon Container with Spring Pop */}
              <div className="relative w-9 h-9 rounded-lg bg-blue-50/90 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 mr-3 transition-all duration-300 ease-out group-focus-within:bg-blue-600 group-focus-within:text-white group-focus-within:border-blue-600 group-focus-within:scale-105 group-focus-within:shadow-md group-focus-within:shadow-blue-600/30">
                <Lock className="w-4 h-4 transition-all duration-300 group-focus-within:animate-icon-pop" />
              </div>

              {/* Input */}
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan kata sandi..."
                className="w-full text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-300 bg-transparent focus:outline-none tracking-wider"
              />

              {/* Animated Password Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:scale-110 active:scale-90 hover:rotate-6 transition-all duration-200 ml-1 cursor-pointer shrink-0"
                title={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              {/* Bottom Expanding Laser Accent Line */}
              <div className="absolute -bottom-[1px] left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out origin-center pointer-events-none" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 flex items-center justify-center gap-2 cursor-pointer font-display disabled:opacity-60 overflow-hidden mt-2"
            >
              {/* Subtle Button Shine Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Mengotentikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Final Project</span>
                  <ArrowRight className="w-4 h-4 text-white ml-0.5 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* ── Direct Role Access Shortcut Icons ── */}
          <div className="space-y-3 pt-2 animate-fade-in-up delay-600">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                Pintasan Akses Role (Quick Access)
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
                    className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xs hover:shadow-md hover:shadow-blue-500/25 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-200 cursor-pointer"
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
          PT MBOIS — Final Project Platform <br />
          © 2026 PT MBOIS. All rights reserved.
        </p>

      </div>

      {/* ════════════════════════════════════════════════════════════
          RIGHT COLUMN (50% Width): 100% Full-Screen Visual & Hero Showcase
         ════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex w-1/2 min-h-screen bg-gradient-to-br from-[#061026] via-[#0d2757] to-[#1d4ed8] relative flex-col justify-center p-12 xl:p-16 text-white overflow-hidden">
        
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.6)_0%,transparent_75%)] animate-pulse-glow" />

        {/* Subtle Geometric Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Centered Graphic Card Showcase */}
        <div className="relative z-10 my-auto text-center space-y-6 py-12 max-w-lg mx-auto">
          {/* Floating Emblem Container */}
          <div className="w-36 h-36 mx-auto relative drop-shadow-[0_25px_50px_rgba(29,78,216,0.7)] animate-float-slow animate-fade-in-scale delay-200">
            <Image src="/mbois_white.png" alt="Logo PT MBOIS" fill className="object-contain" priority />
          </div>

          <div className="space-y-3 animate-fade-in-up delay-400">
            <h2 className="text-3xl xl:text-4xl font-black font-display tracking-tight text-white leading-tight">
              PT MBOIS — Final Project
            </h2>
            <p className="text-sm text-blue-100/90 font-medium leading-relaxed">
              Platform Digital Pembelajaran, Kolaborasi Bimbingan &amp; Evaluasi Tugas Terintegrasi untuk memaksimalkan potensi dan efektivitas kerja tim.
            </p>
          </div>
        </div>

      </div>

      {/* ── FAQ Modal ── */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95">
            <div className="p-5 bg-[#0f172a] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display text-white">Pusat Bantuan — PT MBOIS</h3>
                  <p className="text-[10px] text-blue-300">Final Project Platform Support</p>
                </div>
              </div>
              <button
                onClick={() => setShowFaqModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900 font-display flex items-start gap-2">
                    <span className="text-blue-600 font-bold">Q:</span> {item.q}
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
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all cursor-pointer font-display"
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
