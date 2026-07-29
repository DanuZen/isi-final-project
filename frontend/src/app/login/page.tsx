"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck, UserCheck, GraduationCap, Lock, LogIn,
  Building2, User, Eye, EyeOff, Award, Users,
  LayoutDashboard, FileText, BookOpen, FileCheck,
  ArrowRight, CheckCircle2,
} from "lucide-react";

const ROLES = [
  { id: "mahasiswa",        label: "Mahasiswa",         desc: "Portal Tugas Akhir",     path: "/",                      icon: GraduationCap },
  { id: "dosen_pembimbing", label: "Dosen Pembimbing",  desc: "Bimbingan & ACC",        path: "/dosen/dashboard",       icon: UserCheck     },
  { id: "dosen_penguji",    label: "Dosen Penguji",     desc: "Penilaian & Sidang",     path: "/penguji/dashboard",     icon: ShieldCheck   },
  { id: "admin_prodi",      label: "Admin Prodi",       desc: "Kelola & Verifikasi",    path: "/admin-prodi/dashboard", icon: Building2     },
  { id: "pimpinan",         label: "Pimpinan",          desc: "Laporan Eksekutif",      path: "/dekanat/dashboard",     icon: LayoutDashboard },
  { id: "super_admin",      label: "Super Admin",       desc: "Konfigurasi Sistem",     path: "/super-admin/dashboard", icon: Users         },
];

const TA_STEPS = [
  { icon: FileText,    label: "Usulan Judul",      sub: "Proposal & Similarity" },
  { icon: BookOpen,    label: "Bimbingan TA",       sub: "Log Sesi & Draft"     },
  { icon: FileCheck,   label: "Seminar Proposal",   sub: "Jadwal & ACC"         },
  { icon: Award,       label: "Ujian Sidang",       sub: "Sidang Skripsi Final" },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("mahasiswa");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const target = ROLES.find((r) => r.id === selectedRole);
    setTimeout(() => { if (target) router.push(target.path); }, 700);
  };

  const active = ROLES.find((r) => r.id === selectedRole)!;

  return (
    <div className="min-h-screen flex bg-[#0C0C0C] text-white selection:bg-[#C62828] selection:text-white font-sans">

      {/* ══════════ LEFT PANEL ══════════ */}
      <div className="hidden lg:flex w-[46%] xl:w-[44%] relative flex-col overflow-hidden">

        {/* Layered background */}
        <div className="absolute inset-0 bg-[#0F0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(198,40,40,0.22),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(245,158,11,0.07),transparent)]" />

        {/* Subtle dot grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Vertical glow line */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C62828]/30 to-transparent" />

        {/* Inner content */}
        <div className="relative z-10 flex flex-col h-full px-10 xl:px-14 py-10">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative shrink-0 drop-shadow-lg">
              <Image src="/upiyptk_emblem.webp" alt="UPI YPTK" fill className="object-contain" />
            </div>
            <div>
              <p className="font-black text-[22px] tracking-widest font-display text-white leading-none">SIPETA</p>
              <p className="text-[9px] font-extrabold text-[#F59E0B] tracking-[0.2em] uppercase mt-0.5 leading-none">UPI YPTK PADANG</p>
            </div>
          </div>

          {/* Main hero */}
          <div className="flex-1 flex flex-col justify-center py-10 space-y-8">

            {/* Title block */}
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-neutral-500 tracking-[0.18em] uppercase">Sistem Informasi Terpadu</p>
                <h1 className="text-4xl xl:text-[42px] font-black font-display leading-[1.1] text-white">
                  Perjalanan<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] via-[#C62828] to-[#F59E0B]">
                    Tugas Akhir
                  </span>
                </h1>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-[280px]">
                Platform resmi seluruh mahasiswa <span className="text-neutral-400 font-semibold">UPI YPTK Padang</span> untuk mengelola dan memantau alur TA secara digital.
              </p>
            </div>

            {/* 4-Stage TA Flow */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Alur 4 Tahap Tugas Akhir</p>
              <div className="space-y-2">
                {TA_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const done = i < 1;
                  return (
                    <div key={step.label} className="flex items-center gap-3 group">
                      {/* connector */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          done ? "bg-emerald-600/20 border border-emerald-600/40" :
                          i === 1 ? "bg-[#C62828]/20 border border-[#C62828]/40" :
                          "bg-neutral-800 border border-neutral-700"
                        }`}>
                          {done
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            : <Icon className={`w-4 h-4 ${i === 1 ? "text-[#C62828]" : "text-neutral-600"}`} />
                          }
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <div>
                          <p className={`text-xs font-bold leading-none ${done ? "text-emerald-500" : i === 1 ? "text-white" : "text-neutral-500"}`}>
                            {step.label}
                          </p>
                          <p className="text-[10px] text-neutral-600 mt-0.5">{step.sub}</p>
                        </div>
                        {i === 1 && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C62828]/20 text-[#FF6B6B] border border-[#C62828]/30">
                            Aktif
                          </span>
                        )}
                        {done && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-600/30">
                            Selesai
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-5 pt-2 border-t border-neutral-800/80">
              {[["1.200+","Mahasiswa Aktif"],["180+","Dosen Pembimbing"],["4 Tahap","Terstruktur"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-lg font-black text-white font-display leading-none">{v}</p>
                  <p className="text-[10px] text-neutral-600 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-[10px] text-neutral-700">© 2026 Universitas Putra Indonesia YPTK Padang</p>
        </div>
      </div>

      {/* ══════════ RIGHT PANEL ══════════ */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 relative"><Image src="/upiyptk_emblem.webp" alt="UPI YPTK" fill className="object-contain" /></div>
            <div>
              <p className="font-black text-sm font-display leading-none">SIPETA</p>
              <p className="text-[8px] text-[#F59E0B] font-bold tracking-widest uppercase mt-0.5">UPI YPTK PADANG</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-neutral-500 border border-neutral-800 px-2.5 py-1 rounded-full">
            Multi-Role Portal
          </span>
        </div>

        {/* Centered form */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-[420px] space-y-8">

            {/* Heading */}
            <div>
              <h2 className="text-2xl font-black font-display text-white tracking-tight">Masuk ke SIPETA</h2>
              <p className="text-xs text-neutral-500 mt-1">Pilih peran akun lalu masukkan kredensial Anda</p>
            </div>

            {/* Role selector — pill tabs style for main roles, list for admin */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Masuk sebagai</p>

              {/* Top 3 primary roles — larger cards */}
              <div className="grid grid-cols-3 gap-2">
                {ROLES.slice(0, 3).map((role) => {
                  const Icon = role.icon;
                  const sel = selectedRole === role.id;
                  return (
                    <button key={role.id} type="button" onClick={() => setSelectedRole(role.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden ${
                        sel ? "bg-[#C62828] border-[#C62828] shadow-lg shadow-[#C62828]/20" : "bg-[#141414] border-neutral-800 hover:border-neutral-700"
                      }`}>
                      {sel && <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />}
                      <div className="relative z-10 space-y-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${sel ? "bg-white/20" : "bg-neutral-800"}`}>
                          <Icon className={`w-4 h-4 ${sel ? "text-white" : "text-[#F59E0B]"}`} />
                        </div>
                        <div>
                          <p className={`text-[11px] font-black font-display leading-tight ${sel ? "text-white" : "text-neutral-300"}`}>{role.label}</p>
                          <p className={`text-[9px] mt-0.5 ${sel ? "text-white/60" : "text-neutral-600"}`}>{role.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom 3 secondary roles — compact horizontal list */}
              <div className="grid grid-cols-3 gap-2">
                {ROLES.slice(3).map((role) => {
                  const Icon = role.icon;
                  const sel = selectedRole === role.id;
                  return (
                    <button key={role.id} type="button" onClick={() => setSelectedRole(role.id)}
                      className={`px-3 py-2.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 ${
                        sel ? "bg-[#C62828] border-[#C62828] shadow-md shadow-[#C62828]/20" : "bg-[#141414] border-neutral-800 hover:border-neutral-700"
                      }`}>
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${sel ? "text-white" : "text-[#F59E0B]"}`} />
                      <p className={`text-[10px] font-bold leading-tight ${sel ? "text-white" : "text-neutral-400"}`}>{role.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">NIM / NIDN / Username</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                    required autoComplete="username"
                    placeholder="Masukkan NIM atau NIDN Anda"
                    className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-[#C62828]/70 focus:bg-[#181818] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Kata Sandi</label>
                  <button type="button" className="text-[11px] text-neutral-600 hover:text-[#C62828] font-semibold transition-colors">
                    Lupa sandi?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                    required autoComplete="current-password"
                    placeholder="Masukkan kata sandi"
                    className="w-full pl-10 pr-11 py-3 bg-[#141414] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-[#C62828]/70 focus:bg-[#181818] transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-700 hover:text-neutral-400 transition-colors p-0.5">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#C62828]/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden mt-2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Masuk sebagai <span className="font-black">{active.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-60 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Info note */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Akun SIPETA diberikan oleh <span className="text-neutral-500 font-semibold">Admin Prodi</span> setelah verifikasi clearing nilai akademik secara langsung di kampus.
              </p>
            </div>

          </div>
        </div>

        <p className="py-4 text-center text-[10px] text-neutral-800 border-t border-neutral-900/80">
          © 2026 Universitas Putra Indonesia YPTK Padang
        </p>
      </div>
    </div>
  );
}
