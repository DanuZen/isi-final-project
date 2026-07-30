"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GraduationCap, UserCheck, ShieldCheck, Building2,
  LayoutDashboard, Users, Lock, LogIn, User, Eye, EyeOff,
  ArrowRight, CheckCircle2, ChevronDown, School,
  FileText, BookOpen, FileCheck, Award, Zap,
} from "lucide-react";

/* ─────────────────────────── DATA ─────────────────────────── */

const ROLES = [
  { id: "mahasiswa",        label: "Mahasiswa",        desc: "Portal Tugas Akhir",    path: "/",                         icon: GraduationCap,   accent: "#059669", accentBg: "#ecfdf5", accentLight: "#a7f3d0" },
  { id: "dosen_pembimbing", label: "Dosen Pembimbing", desc: "Bimbingan & ACC",        path: "/dosen/dashboard",          icon: UserCheck,       accent: "#C62828", accentBg: "#fef2f2", accentLight: "#fecaca" },
  { id: "dosen_penguji",    label: "Dosen Penguji",    desc: "Penilaian & Sidang",     path: "/penguji/dashboard",        icon: ShieldCheck,     accent: "#C62828", accentBg: "#fef2f2", accentLight: "#fca5a5" },
  { id: "admin_prodi",      label: "Admin Prodi",      desc: "Kelola & Verifikasi",    path: "/admin-prodi/dashboard",    icon: Building2,       accent: "#1d4ed8", accentBg: "#eff6ff", accentLight: "#bfdbfe" },
  { id: "admin_fakultas",   label: "Admin Fakultas",   desc: "SK & Bebas Fakultas",    path: "/admin-fakultas/dashboard", icon: School,          accent: "#4338ca", accentBg: "#eef2ff", accentLight: "#c7d2fe" },
  { id: "pimpinan",         label: "Pimpinan",         desc: "Laporan Eksekutif",      path: "/dekanat/dashboard",        icon: LayoutDashboard, accent: "#b45309", accentBg: "#fffbeb", accentLight: "#fde68a" },
  { id: "super_admin",      label: "Super Admin",      desc: "Konfigurasi Sistem",     path: "/super-admin/dashboard",    icon: Users,           accent: "#475569", accentBg: "#f8fafc", accentLight: "#cbd5e1" },
];

const TA_STEPS = [
  { icon: FileText,  label: "Usulan Judul",     sub: "Proposal & Similarity Check",  color: "#C62828" },
  { icon: BookOpen,  label: "Bimbingan TA",     sub: "Min. 5 Sesi Log Bimbingan",    color: "#F59E0B" },
  { icon: FileCheck, label: "Seminar Proposal", sub: "Jadwal, ACC & Revisi",         color: "#3b82f6" },
  { icon: Award,     label: "Ujian Sidang",     sub: "Sidang Skripsi & Hardcover",   color: "#059669" },
];

const STATS = [
  { value: "1.200+", label: "Mahasiswa Aktif" },
  { value: "180+",   label: "Dosen Pembimbing" },
  { value: "4 Tahap", label: "Alur Terstruktur" },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername]         = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [mounted, setMounted]           = useState(false);
  const [showQuickLogin, setShowQuickLogin] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Default → mahasiswa dashboard
    setTimeout(() => router.push("/"), 800);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ══════════ LEFT PANEL — UPI PHOTO ══════════ */}
      <div className="hidden lg:flex w-[46%] xl:w-[44%] relative flex-col overflow-hidden">

        {/* Full-bleed photo */}
        <div className="absolute inset-0">
          <Image src="/upi.jpeg" alt="Gedung UPI YPTK Padang" fill className="object-cover object-center" priority />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.15) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black/75 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-black/95 via-black/65 to-transparent" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 45% at 5% 100%, rgba(198,40,40,0.22), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-10 xl:px-14 py-10">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative shrink-0" style={{ filter: "drop-shadow(0 0 14px rgba(198,40,40,0.6))" }}>
              <Image src="/upiyptk_emblem.webp" alt="UPI YPTK" fill className="object-contain" />
            </div>
            <div>
              <p className="font-black text-[21px] tracking-[0.2em] text-white leading-none" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>SIPETA</p>
              <p className="text-[8px] font-extrabold tracking-[0.28em] uppercase mt-0.5 leading-none" style={{ color: "#F59E0B" }}>UPI YPTK PADANG</p>
            </div>
          </div>

          <div className="flex-1" />

          {/* Bottom content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h1
                className="font-black leading-[1.05] text-white"
                style={{ fontSize: "46px", textShadow: "0 4px 20px rgba(0,0,0,0.7)" }}
              >
                Perjalanan<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #FF6B6B 0%, #EF4444 40%, #F59E0B 100%)" }}
                >
                  Tugas Akhir
                </span>
              </h1>
              <p className="text-[13px] leading-relaxed max-w-[300px]" style={{ color: "rgba(255,255,255,0.72)", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
                Platform resmi <span className="text-white font-semibold">UPI YPTK Padang</span> untuk mengelola dan memantau alur Tugas Akhir secara digital.
              </p>
            </div>

            {/* 4-Stage TA */}
            <div className="space-y-2.5">
              <p className="text-[9.5px] font-bold tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>Alur 4 Tahap Tugas Akhir</p>
              <div className="grid grid-cols-2 gap-2">
                {TA_STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${step.color}33`, border: `1px solid ${step.color}55` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: step.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10.5px] font-bold text-white leading-none truncate">{step.label}</p>
                        <p className="text-[9px] mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{step.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[19px] font-black text-white leading-none" style={{ fontFamily: "'IBM Plex Mono', monospace", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{value}</p>
                  <p className="text-[9.5px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
                </div>
              ))}
            </div>

            <p className="text-[9.5px]" style={{ color: "rgba(255,255,255,0.2)" }}>© 2026 Universitas Putra Indonesia YPTK Padang</p>
          </div>
        </div>
      </div>

      {/* ══════════ RIGHT PANEL — LIGHT FORM ══════════ */}
      <div className="flex-1 flex flex-col bg-[#F4F6F9] relative overflow-hidden">

        {/* BG decoration */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 85% 8%, rgba(198,40,40,0.07) 0%, transparent 45%), radial-gradient(circle at 15% 92%, rgba(245,158,11,0.06) 0%, transparent 45%)",
        }} />
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }} />

        {/* Mobile header */}
        <div className="lg:hidden relative z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 relative"><Image src="/upiyptk_emblem.webp" alt="UPI YPTK" fill className="object-contain" /></div>
            <div>
              <p className="font-black text-sm text-slate-900 tracking-widest leading-none">SIPETA</p>
              <p className="text-[8px] font-bold tracking-widest uppercase mt-0.5" style={{ color: "#C62828" }}>UPI YPTK PADANG</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full bg-white">Multi-Role</span>
        </div>

        {/* Centered form */}
        <div className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-10 overflow-y-auto">
          <div
            className="w-full max-w-[430px]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >

            {/* ── White card ── */}
            <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>

              {/* Accent top bar */}
              <div className="h-1.5" style={{ background: "linear-gradient(90deg, #C62828 0%, #EF4444 50%, #F59E0B 100%)" }} />

              <div className="px-8 pt-7 pb-8 space-y-6">

                {/* Heading */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C62828, #991B1B)" }}>
                      <LogIn className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Portal Akademik</p>
                      <h2 className="text-xl font-black text-slate-900 leading-tight">
                        Masuk ke{" "}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #C62828, #EF4444)" }}>
                          SIPETA
                        </span>
                      </h2>
                    </div>
                  </div>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed">
                    Masukkan kredensial akun SIPETA Anda untuk mengakses sistem.
                  </p>
                </div>

                {/* ── Form ── */}
                <form onSubmit={handleLogin} className="space-y-5">

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-[9.5px] font-semibold text-slate-400 uppercase tracking-wider">Kredensial</span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  {/* Username */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      NIM / NIDN / Username
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="Masukkan NIM atau NIDN Anda"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl text-[13px] text-slate-800 placeholder-slate-300 border-2 border-slate-100 bg-slate-50 focus:outline-none transition-all"
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#C62828";
                          e.currentTarget.style.background  = "white";
                          e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(198,40,40,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#f1f5f9";
                          e.currentTarget.style.background  = "#f8fafc";
                          e.currentTarget.style.boxShadow   = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kata Sandi</label>
                      <button type="button" className="text-[11px] font-semibold text-[#C62828] hover:opacity-75 transition-opacity">
                        Lupa sandi?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="Masukkan kata sandi"
                        className="w-full pl-10 pr-11 py-3.5 rounded-xl text-[13px] text-slate-800 placeholder-slate-300 border-2 border-slate-100 bg-slate-50 focus:outline-none transition-all"
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#C62828";
                          e.currentTarget.style.background  = "white";
                          e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(198,40,40,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#f1f5f9";
                          e.currentTarget.style.background  = "#f8fafc";
                          e.currentTarget.style.boxShadow   = "none";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-4 rounded-xl text-white font-bold text-[14px] overflow-hidden group active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    style={{
                      background: "linear-gradient(135deg, #C62828 0%, #991B1B 100%)",
                      boxShadow: "0 6px 20px rgba(198,40,40,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <div className="absolute top-0 left-8 right-8 h-px bg-white/30 rounded-full" />
                    <span className="relative z-10 flex items-center justify-center gap-2.5">
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          Masuk ke SIPETA
                          <ArrowRight className="w-4 h-4 ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* ── DEV ONLY: Login Cepat ── */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setShowQuickLogin((v) => !v)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 hover:bg-amber-100 transition-all group"
                  >
                    <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-[11.5px] font-bold text-amber-700 flex-1 text-left">Login Cepat</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">DEV ONLY</span>
                    <ChevronDown
                      className="w-3.5 h-3.5 text-amber-500 shrink-0"
                      style={{ transform: showQuickLogin ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                    />
                  </button>

                  <div style={{
                    maxHeight: showQuickLogin ? "600px" : "0px",
                    opacity: showQuickLogin ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease, opacity 0.25s ease",
                  }}>
                    <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-200 space-y-3">
                      <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                        ⚡ Shortcut navigasi tanpa login — untuk mempermudah development. Akan dihapus saat production.
                      </p>

                      {/* Top 3 */}
                      <div className="grid grid-cols-3 gap-2">
                        {ROLES.slice(0, 3).map((role) => {
                          const Icon = role.icon;
                          return (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() => router.push(role.path)}
                              className="p-3 rounded-xl border-2 text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                              style={{ background: role.accentBg, borderColor: role.accentLight }}
                            >
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: role.accent }}>
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <p className="text-[10.5px] font-black leading-tight" style={{ color: role.accent }}>{role.label}</p>
                              <p className="text-[8.5px] text-slate-400 mt-0.5">{role.desc}</p>
                            </button>
                          );
                        })}
                      </div>

                      {/* Bottom 4 */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {ROLES.slice(3).map((role) => {
                          const Icon = role.icon;
                          return (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() => router.push(role.path)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 transition-all hover:shadow-sm active:scale-95"
                              style={{ background: role.accentBg, borderColor: role.accentLight }}
                            >
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: role.accent }}>
                                <Icon className="w-3.5 h-3.5 text-white" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10.5px] font-bold leading-tight truncate" style={{ color: role.accent }}>{role.label}</p>
                                <p className="text-[8.5px] text-slate-400 truncate">{role.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info note */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  <p className="text-[11.5px] text-slate-500 leading-relaxed">
                    Akun SIPETA diberikan oleh{" "}
                    <span className="text-slate-700 font-semibold">Admin Prodi</span>{" "}
                    setelah verifikasi <span className="text-slate-700 font-semibold">clearing nilai akademik</span> di kampus.
                  </p>
                </div>

              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[10.5px] text-slate-400 mt-5">
              © 2026 Universitas Putra Indonesia YPTK Padang &mdash; FIK SIPETA v1.3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
