"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  ToggleLeft, ToggleRight, Save, ArrowRight, ShieldCheck, Check, Cpu, Lock
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" /> },
  { label: "Konfigurasi",     href: "/super-admin/config",      icon: <Settings className="w-4 h-4" /> },
  { label: "Master Data",     href: "/super-admin/master",      icon: <Database className="w-4 h-4" /> },
];

export default function SuperAdminConfigPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [maxKuota, setMaxKuota] = useState("8");
  const [tahunAkademik, setTahunAkademik] = useState("2025/2026 Genap");
  const [similarityThreshold, setSimilarityThreshold] = useState("30");
  const [minSks, setMinSks] = useState("110");
  const [minIpk, setMinIpk] = useState("2.00");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Irvan Syahputra, S.T." userNim="SA-001" userRole="Super Admin" prodiName="Sistem Utama SIPETA" />

          <main className="flex-1 p-4 md:p-5 space-y-3 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 md:p-4 relative">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <Settings className="w-3 h-3 text-white" /> Konfigurasi Global Sistem
                    </span>
                  </div>
                  <h1 className="text-base md:text-lg font-black font-display text-white tracking-wide leading-tight">
                    Pengaturan Parameter &amp; Syarat Akademik TA
                  </h1>
                  <p className="text-[11px] text-neutral-400 leading-snug max-w-2xl font-medium">
                    Pengaturan mode pemeliharaan, syarat kelayakan SKS &amp; IPK aktivasi TA, kuota bimbingan dosen, serta ambang kemiripan judul.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-white" />
                    <span>{savedSuccess ? "Tersimpan!" : "Simpan Konfigurasi"}</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main Settings Panel (Strict 100% Viewport Fit Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0 overflow-hidden">
              
              {/* Left Column (2/3): Academic Rules & Limits */}
              <div className="lg:col-span-2 flex flex-col justify-between gap-3 min-h-0 overflow-hidden">
                
                {/* 1. Academic Rules Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3.5 space-y-2.5 flex-1 min-h-0 flex flex-col justify-between">
                  <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100 shrink-0">
                    <div className="w-6 h-6 rounded-lg bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <Settings className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h2 className="font-bold text-xs sm:text-sm text-slate-900 font-display">Syarat Kelayakan Aktivasi &amp; Batas Kuota TA</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-slate-700 font-display">Tahun Akademik Aktif</label>
                      <input
                        type="text"
                        value={tahunAkademik}
                        onChange={(e) => setTahunAkademik(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-display"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-slate-700 font-display">Maksimal Kuota Bimbingan per Dosen</label>
                      <input
                        type="number"
                        value={maxKuota}
                        onChange={(e) => setMaxKuota(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-slate-700 font-display">Batas Minimal Lulus SKS (Syarat Aktivasi)</label>
                      <input
                        type="number"
                        value={minSks}
                        onChange={(e) => setMinSks(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-slate-700 font-display">Batas Minimal IPK (Syarat Aktivasi)</label>
                      <input
                        type="text"
                        value={minIpk}
                        onChange={(e) => setMinIpk(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 pt-1.5 border-t border-slate-100 shrink-0">
                    <label className="text-[10.5px] font-bold text-slate-700 font-display">Batas Maksimal Kemiripan Judul (Similarity Check %)</label>
                    <input
                      type="number"
                      value={similarityThreshold}
                      onChange={(e) => setSimilarityThreshold(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-mono"
                    />
                    <p className="text-[9.5px] text-slate-400 font-medium">Judul dengan kemiripan di atas {similarityThreshold}% akan otomatis ditolak oleh repositori sistem.</p>
                  </div>
                </div>

                {/* 2. Security & System Maintenance Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3 space-y-2 shrink-0">
                  <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                    <div className="w-6 h-6 rounded-lg bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <Lock className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h2 className="font-bold text-xs sm:text-sm text-slate-900 font-display">Keamanan &amp; Pemeliharaan Server</h2>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-bold text-slate-800 font-display">Mode Maintenance Sistem</p>
                      <p className="text-[10px] text-slate-500 font-medium">Hanya Super Admin yang dapat mengakses sistem saat mode ini aktif.</p>
                    </div>
                    <button onClick={() => setMaintenance(!maintenance)} className="cursor-pointer">
                      {maintenance ? <ToggleRight className="w-7 h-7 text-[#C62828]" /> : <ToggleLeft className="w-7 h-7 text-slate-300" />}
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column (1/3): Summary & Status Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3.5 flex flex-col justify-between min-h-0 h-full overflow-hidden">
                <div className="space-y-2.5 overflow-hidden flex-1 flex flex-col">
                  <div className="pb-1.5 border-b border-slate-100 space-y-0.5 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                        <Cpu className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h3 className="text-xs font-black text-slate-900 font-display">Status Parameter Aktif</h3>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight font-medium">
                      Ringkasan parameter operasional sistem SIPETA yang sedang berlaku.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs flex-1 flex flex-col justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10.5px]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Tahun Akademik:</span>
                        <strong className="text-slate-900 font-display">{tahunAkademik}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Syarat Minimal:</span>
                        <strong className="text-slate-900 font-mono">{minSks} SKS / IPK {minIpk}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Batas Kuota:</span>
                        <strong className="text-slate-900 font-mono">{maxKuota} Mhs / Dosen</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Similarity Threshold:</span>
                        <strong className="text-slate-900 font-mono">{similarityThreshold}% Max</strong>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[10px] font-semibold space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Konfigurasi Terverifikasi Valid</span>
                      </div>
                      <p className="text-[9.5px] text-emerald-700 font-medium">Aturan akademik telah disinkronkan dengan database universitas.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 shrink-0">
                  <button
                    onClick={handleSave}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-white" />
                    <span>{savedSuccess ? "Berhasil Disimpan!" : "Simpan Semua Pengaturan"}</span>
                  </button>
                </div>
              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
