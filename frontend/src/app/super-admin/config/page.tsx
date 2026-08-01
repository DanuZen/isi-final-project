"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  ToggleLeft, ToggleRight, Save, ArrowRight, ShieldCheck, Check, Cpu, Lock, FileCheck, HardDrive, RefreshCw
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
  const [ssoEnforced, setSsoEnforced] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);

  const [maxKuota, setMaxKuota] = useState("8");
  const [tahunAkademik, setTahunAkademik] = useState("2025/2026 Genap");
  const [similarityThreshold, setSimilarityThreshold] = useState("30");
  const [minSks, setMinSks] = useState("110");
  const [minIpk, setMinIpk] = useState("2.00");
  const [maxFileSize, setMaxFileSize] = useState("25");

  const [backupFreq] = useState("Harian (Setiap Pukul 00:00 WIB)");

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [backupProgress, setBackupProgress] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRunBackup = () => {
    setBackupProgress(true);
    setTimeout(() => {
      setBackupProgress(false);
      alert("Pencadangan database sipeta_db (248 MB) berhasil dibuat dan tersimpan aman di Cloud Storage UPI YPTK!");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <Header className="shell-header shrink-0" userName="Irvan Syahputra, S.T." userNim="SA-001" userRole="Super Admin" prodiName="Sistem Utama SIPETA" />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-5 shell-body pb-16">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <Settings className="w-3.5 h-3.5 text-white" /> Konfigurasi Global Sistem
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Pengaturan Parameter &amp; Syarat Akademik TA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pengaturan mode pemeliharaan, syarat kelayakan SKS &amp; IPK aktivasi TA, kuota bimbingan dosen, serta ambang kemiripan repositori.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>{savedSuccess ? "Tersimpan!" : "Simpan Konfigurasi"}</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* Main Settings Panel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Left Column (2/3): Academic, Repository, & Security Cards */}
              <div className="lg:col-span-2 space-y-5">
                
                {/* 1. Academic Rules Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Aturan &amp; Syarat Akademik Aktivasi TA</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-display">Tahun Akademik Aktif</label>
                      <input
                        type="text"
                        value={tahunAkademik}
                        onChange={(e) => setTahunAkademik(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-display"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-display">Maksimal Kuota Bimbingan per Dosen</label>
                      <input
                        type="number"
                        value={maxKuota}
                        onChange={(e) => setMaxKuota(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-display">Batas Minimal Lulus SKS (Aktivasi)</label>
                      <input
                        type="number"
                        value={minSks}
                        onChange={(e) => setMinSks(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-display">Batas Minimal IPK (Aktivasi)</label>
                      <input
                        type="text"
                        value={minIpk}
                        onChange={(e) => setMinIpk(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Repository & Plagiarism Rules Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <FileCheck className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Pengaturan Repositori &amp; Similarity Checker</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-display">Batas Maksimal Plagiarisme / Similarity (%)</label>
                      <input
                        type="number"
                        value={similarityThreshold}
                        onChange={(e) => setSimilarityThreshold(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-display">Maksimal Ukuran Berkas Upload (MB)</label>
                      <input
                        type="number"
                        value={maxFileSize}
                        onChange={(e) => setMaxFileSize(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#C62828] transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Automated Backup & Security Toggles Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                      <HardDrive className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Backup Database &amp; Keamanan Server</h2>
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 flex-wrap sm:flex-nowrap">
                      <div>
                        <p className="text-xs font-bold text-slate-800 font-display">Jadwal Backup Otomatis Database</p>
                        <p className="text-[11px] text-slate-500 font-medium">{backupFreq}</p>
                      </div>
                      <button
                        onClick={handleRunBackup}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 shrink-0 font-display cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 text-white ${backupProgress ? "animate-spin" : ""}`} />
                        <span>{backupProgress ? "Proses..." : "Backup Sekarang"}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <p className="text-xs font-bold text-slate-800 font-display">Mode Maintenance Sistem</p>
                        <p className="text-[11px] text-slate-500 font-medium">Kunci akses publik aplikasi hanya untuk Super Admin</p>
                      </div>
                      <button onClick={() => setMaintenance(!maintenance)} className="cursor-pointer">
                        {maintenance ? <ToggleRight className="w-8 h-8 text-[#C62828]" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <p className="text-xs font-bold text-slate-800 font-display">Otentikasi SSO Terenkripsi</p>
                        <p className="text-[11px] text-slate-500 font-medium">Wajibkan SSO login universitas untuk seluruh role</p>
                      </div>
                      <button onClick={() => setSsoEnforced(!ssoEnforced)} className="cursor-pointer">
                        {ssoEnforced ? <ToggleRight className="w-8 h-8 text-emerald-600" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <p className="text-xs font-bold text-slate-800 font-display">Notifikasi Email Otomatis</p>
                        <p className="text-[11px] text-slate-500 font-medium">Kirim email otomatis saat terjadi perubahan status TA / SK</p>
                      </div>
                      <button onClick={() => setEmailNotif(!emailNotif)} className="cursor-pointer">
                        {emailNotif ? <ToggleRight className="w-8 h-8 text-emerald-600" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (1/3): Summary & Status Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  
                  {/* Status Server Box */}
                  <div className="pb-3 border-b border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
                        <Cpu className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h3 className="text-sm font-black text-slate-900 font-display">Server Infrastructure</h3>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium space-y-1">
                      <div className="flex items-center justify-between font-bold text-rose-800">
                        <span>Status Server:</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online (99.98%)</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span>Database Latency:</span>
                        <span className="font-mono font-bold">12 ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Summary */}
                  <div className="space-y-3 text-xs">
                    <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest font-display block">Parameter Operasional Aktif:</span>
                    
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
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
                        <span className="text-slate-500 font-medium">Plagiarisme Max:</span>
                        <strong className="text-slate-900 font-mono">{similarityThreshold}%</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Max Upload:</span>
                        <strong className="text-slate-900 font-mono">{maxFileSize} MB</strong>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs font-display">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Otoritas Super Admin</span>
                      </div>
                      <p className="text-[10.5px] text-slate-300 leading-relaxed font-medium">
                        Seluruh perubahan parameter akan berdampak langsung pada validasi sistem secara realtime.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={handleSave}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs font-display cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-white" />
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
