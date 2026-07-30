"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Edit3,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function DetailAkunPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fields = [
    { label: "Nama Lengkap", value: "Danu Zen", icon: <User className="w-4 h-4" /> },
    { label: "Email Akademik", value: "danuzen@student.upiyptk.ac.id", icon: <Mail className="w-4 h-4" /> },
    { label: "No. Telepon", value: "+62 812-3456-7890", icon: <Phone className="w-4 h-4" /> },
    { label: "Alamat", value: "Padang, Sumatera Barat", icon: <MapPin className="w-4 h-4" /> },
    { label: "Tanggal Bergabung", value: "1 September 2020", icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" />

          <main className="flex-1 p-6 space-y-5 overflow-y-auto overflow-x-hidden scrollbar-none shell-body">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C62828] to-[#8B0000] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md select-none">
                    DZ
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Akun Aktif
                      </span>
                    </div>
                    <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                      Detail Akun
                    </h1>
                    <p className="text-xs text-neutral-400 font-medium">
                      Informasi akun dan data diri mahasiswa UPI YPTK Padang
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 shadow-md transition-all active:scale-95 shrink-0 cursor-pointer">
                  <Edit3 className="w-4 h-4 text-slate-700" />
                  <span>Edit Profil</span>
                </button>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main Content: 2 column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left: Info Fields */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C62828] text-white flex items-center justify-center shadow-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 font-display">Informasi Pribadi</h3>
                </div>
                <ul className="divide-y divide-slate-100">
                  {fields.map((f) => (
                    <li key={f.label} className="flex items-center justify-between px-5 py-3.5 gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[#C62828] shrink-0">{f.icon}</span>
                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{f.label}</p>
                          <p className="text-xs font-semibold text-slate-800 mt-0.5 truncate">{f.value}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Keamanan */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {/* Password Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#C62828] text-white flex items-center justify-center shadow-xs">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 font-display">Keamanan</h3>
                  </div>
                  <div className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Kata Sandi</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Terakhir diubah 3 bulan lalu</p>
                      </div>
                    </div>
                    <button className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors active:scale-95">
                      Ubah
                    </button>
                  </div>
                </div>

                {/* Account Status Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#C62828] text-white flex items-center justify-center shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 font-display">Status Akun</h3>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Status Registrasi</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-bold shadow-xs">
                        <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Akses Portal TA</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-bold shadow-xs">
                        <CheckCircle2 className="w-3 h-3" /> Aktif
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Autentikasi 2 Langkah</span>
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold border border-slate-200">
                        Nonaktif
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
