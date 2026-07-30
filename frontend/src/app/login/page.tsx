"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GraduationCap, UserCheck, ShieldCheck, Building2,
  LayoutDashboard, Users, Lock, LogIn, User, Eye, EyeOff,
  ArrowRight, CheckCircle2, School, FileText, BookOpen,
  FileCheck, Award, Sparkles, HelpCircle, X, Check
} from "lucide-react";

/* ─────────────────────────── DATA ROLES ─────────────────────────── */

const QUICK_ROLES = [
  { id: "mahasiswa",        label: "Mahasiswa",        path: "/",                         icon: GraduationCap, bg: "bg-emerald-600", text: "text-white" },
  { id: "dosen_pembimbing", label: "Pembimbing",       path: "/dosen/dashboard",          icon: UserCheck,     bg: "bg-[#C62828]",  text: "text-white" },
  { id: "dosen_penguji",    label: "Penguji",          path: "/penguji/dashboard",        icon: ShieldCheck,   bg: "bg-[#C62828]",  text: "text-white" },
  { id: "admin_prodi",      label: "Admin Prodi",      path: "/admin-prodi/dashboard",    icon: Building2,     bg: "bg-blue-600",   text: "text-white" },
  { id: "admin_fakultas",   label: "Admin Fakultas",   path: "/admin-fakultas/dashboard", icon: School,        bg: "bg-indigo-600", text: "text-white" },
  { id: "pimpinan",         label: "Dekanat",          path: "/dekanat/dashboard",        icon: LayoutDashboard, bg: "bg-[#F59E0B]", text: "text-slate-950" },
  { id: "super_admin",      label: "Super Admin",      path: "/super-admin/dashboard",    icon: Users,         bg: "bg-slate-900",  text: "text-white" },
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
  const [activeRoleTab, setActiveRoleTab] = useState<"mahasiswa" | "dosen" | "admin">("mahasiswa");
  const [username, setUsername]           = useState("20101152630045");
  const [password, setPassword]           = useState("••••••••");
  const [showPassword, setShowPassword]   = useState(false);
  const [loading, setLoading]             = useState(false);
  const [targetPath, setTargetPath]       = useState("/");
  const [showFaqModal, setShowFaqModal]   = useState(false);

  const handleTabSwitch = (tab: "mahasiswa" | "dosen" | "admin") => {
    setActiveRoleTab(tab);
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
    <div className="min-h-screen bg-[#EAEFF5] flex items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* ── Floating Centered Split Card Container (Inspired by Reference Image) ── */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] border border-slate-200/80">

        {/* ════════════════════════════════════════════════════════════
            LEFT COLUMN (6/12): Clean Form Panel (Exact Reference Style)
           ════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 p-8 sm:p-10 xl:p-12 flex flex-col justify-between bg-white">
          
          {/* Top Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative shrink-0">
                <Image src="/upiyptk_emblem.webp" alt="Emblem UPI YPTK" fill className="object-contain" />
              </div>
              <div>
                <p className="font-black text-xl tracking-wider text-slate-900 leading-none font-display">SIPETA</p>
                <p className="text-[8px] font-bold text-[#C62828] tracking-widest uppercase mt-0.5 font-display">UPI YPTK PADANG</p>
              </div>
            </div>

            <button
              onClick={() => setShowFaqModal(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              title="Bantuan & FAQ"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content Body */}
          <div className="my-auto space-y-6 py-6">
            
            {/* Title & Subtitle */}
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                Selamat Datang
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Pilih peran Anda dan masukkan kredensial akun SIPETA.
              </p>
            </div>

            {/* ── Segmented Role Switcher Pill (Matching Reference Sign In / Signup Pill) ── */}
            <div className="p-1.5 bg-slate-100 rounded-2xl grid grid-cols-3 gap-1 shadow-inner">
              <button
                type="button"
                onClick={() => handleTabSwitch("mahasiswa")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer font-display ${
                  activeRoleTab === "mahasiswa"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${activeRoleTab === "mahasiswa" ? "text-emerald-600" : ""}`} />
                <span>Mahasiswa</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabSwitch("dosen")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer font-display ${
                  activeRoleTab === "dosen"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <UserCheck className={`w-4 h-4 ${activeRoleTab === "dosen" ? "text-[#C62828]" : ""}`} />
                <span>Dosen</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabSwitch("admin")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer font-display ${
                  activeRoleTab === "admin"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Building2 className={`w-4 h-4 ${activeRoleTab === "admin" ? "text-blue-600" : ""}`} />
                <span>Admin</span>
              </button>
            </div>

            {/* ── Login Form Inputs (Reference Style Box with Left Icon & Right Check Circle) ── */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Username Input Box */}
              <div className="relative flex items-center bg-white border-2 border-slate-200 focus-within:border-[#C62828] focus-within:ring-2 focus-within:ring-[#C62828]/10 rounded-2xl px-4 py-2.5 transition-all shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mr-3">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    {activeRoleTab === "mahasiswa" ? "NIM Mahasiswa" : activeRoleTab === "dosen" ? "NIDN Dosen" : "NIP / Username"}
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Masukkan kredensial..."
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none font-mono"
                  />
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
              </div>

              {/* Password Input Box */}
              <div className="relative flex items-center bg-white border-2 border-slate-200 focus-within:border-[#C62828] focus-within:ring-2 focus-within:ring-[#C62828]/10 rounded-2xl px-4 py-2.5 transition-all shadow-2xs">
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
                  className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer ml-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Submit Button (Reference Pill Style) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#C62828] hover:bg-[#a81f1f] text-white font-bold text-xs transition-all active:scale-[0.98] shadow-md shadow-red-950/20 flex items-center justify-center gap-2 cursor-pointer font-display disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Mengotentikasi...
                  </>
                ) : (
                  <>
                    <span>Lanjutkan ke Portal SIPETA</span>
                    <ArrowRight className="w-4 h-4 text-white ml-1" />
                  </>
                )}
              </button>
            </form>

            {/* ── Direct Role Access Shortcut Icons (Reference "Or Continue With" Section) ── */}
            <div className="space-y-3 pt-2">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                  Pintasan Akses Role (Dev Quick Access)
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                {QUICK_ROLES.map((r) => {
                  const RoleIcon = r.icon;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => router.push(r.path)}
                      title={`Masuk ke ${r.label}`}
                      className={`w-9 h-9 rounded-xl ${r.bg} ${r.text} flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer`}
                    >
                      <RoleIcon className="w-4 h-4 text-current" />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <p className="text-center text-[10.5px] text-slate-400 font-medium leading-relaxed">
            Sistem Informasi Terintegrasi Skripsi &amp; Tugas Akhir <br />
            © 2026 Universitas Putra Indonesia YPTK Padang
          </p>

        </div>

        {/* ════════════════════════════════════════════════════════════
            RIGHT COLUMN (6/12): 3D Visual & Academic Art Showcase
           ════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-[#0B0F19] via-[#1A0C14] to-[#C62828]/90 relative flex-col justify-between p-10 xl:p-12 overflow-hidden text-white">
          
          {/* Subtle Ambient Vertical Light Streams (Reference Rain Light Stream Aesthetic) */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,#ffffff_0%,transparent_70%)]" />
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:3rem_100%]" />

          {/* Full-bleed Photo Backdrop overlay */}
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="/upi.jpeg"
              alt="Gedung UPI YPTK Padang"
              fill
              className="object-cover object-center scale-105"
              priority
            />
          </div>

          {/* Header Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white backdrop-blur-md border border-white/15 font-display">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" /> Portal Perjalanan Tugas Akhir
            </span>
          </div>

          {/* Centered Graphic Card Showcase */}
          <div className="relative z-10 my-auto text-center space-y-6 py-8">
            <div className="w-32 h-32 mx-auto relative drop-shadow-[0_20px_50px_rgba(198,40,40,0.6)] animate-bounce-slow">
              <Image src="/upiyptk_emblem.webp" alt="3D Emblem UPI YPTK" fill className="object-contain" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl xl:text-3xl font-black font-display tracking-tight text-white leading-tight">
                Digitalisasi Tugas Akhir Terintegrasi
              </h2>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Kelola usulan judul, log bimbingan, penjadwalan ujian seminar &amp; sidang skripsi secara transparan bagi seluruh Civitas Akademika UPI YPTK Padang.
              </p>
            </div>
          </div>

          {/* Bottom Card Summary Footnote */}
          <div className="relative z-10 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-between text-xs font-medium">
            <span>SIPETA UPI YPTK Padang</span>
            <span className="text-emerald-400 font-bold font-mono">Status: Active Operational</span>
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

    </div>
  );
}
