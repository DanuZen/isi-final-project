"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  BarChart2,
  Hash,
} from "lucide-react";

export default function ProfilAkademikPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats = [
    {
      label: "Total SKS",
      value: "144",
      sub: "dari 144 SKS",
      icon: <Hash className="w-4 h-4" />,
      iconBg: "bg-[#C62828] text-white",
    },
    {
      label: "IPK",
      value: "3.65",
      sub: "Sangat Memuaskan",
      icon: <BarChart2 className="w-4 h-4" />,
      iconBg: "bg-[#C62828] text-white",
    },
    {
      label: "Semester",
      value: "12",
      sub: "Semester Aktif",
      icon: <Clock className="w-4 h-4" />,
      iconBg: "bg-[#C62828] text-white",
    },
    {
      label: "Status",
      value: "Aktif",
      sub: "Terdaftar TA",
      icon: <CheckCircle2 className="w-4 h-4" />,
      iconBg: "bg-emerald-600 text-white",
    },
  ];

  const akademikInfo = [
    { label: "NIM", value: "20101152630045" },
    { label: "Program Studi", value: "Teknik Informatika" },
    { label: "Jenjang", value: "Strata 1 (S1)" },
    { label: "Fakultas", value: "Ilmu Komputer" },
    { label: "Perguruan Tinggi", value: "UPI YPTK Padang" },
    { label: "Angkatan", value: "2020" },
    { label: "Dosen Wali", value: "Dr. Sarjon Defit, S.Kom., M.Sc." },
    { label: "Status Tugas Akhir", value: "Bimbingan Aktif" },
  ];

  const taSteps = [
    { label: "Pengajuan Proposal", done: true },
    { label: "Pilih Pembimbing", done: true },
    { label: "Bimbingan TA", done: false, active: true },
    { label: "Seminar Proposal", done: false },
    { label: "Sidang Skripsi", done: false },
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
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mahasiswa Aktif
                      </span>
                    </div>
                    <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                      Danu Zen
                    </h1>
                    <p className="text-xs text-neutral-400 font-medium">
                      20101152630045 · Teknik Informatika · UPI YPTK Padang
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-2">
                  <div className={`w-8 h-8 rounded-xl ${s.iconBg} flex items-center justify-center shadow-xs`}>
                    {s.icon}
                  </div>
                  <p className="text-lg font-black text-slate-900 font-display leading-none">{s.value}</p>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{s.label}</p>
                    <p className="text-[10px] text-slate-400">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Info + TA Progress (2 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left: Data Akademik */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C62828] text-white flex items-center justify-center shadow-xs">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 font-display">Data Akademik</h3>
                </div>
                <ul className="divide-y divide-slate-100">
                  {akademikInfo.map((item) => (
                    <li key={item.label} className="flex items-center justify-between px-5 py-3 gap-4">
                      <span className="text-xs text-slate-500 shrink-0 w-40">{item.label}</span>
                      <span className="text-xs font-semibold text-slate-800 text-right truncate">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: TA Progress */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C62828] text-white flex items-center justify-center shadow-xs">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 font-display">Progres Tugas Akhir</h3>
                </div>
                <div className="px-5 py-4">
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                    {taSteps.map((step) => (
                      <div key={step.label} className="flex items-center gap-3 relative">
                        <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${
                          step.done
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : step.active
                            ? "bg-[#C62828] border-[#C62828] text-white"
                            : "bg-white border-slate-300"
                        }`}>
                          {step.done && <CheckCircle2 className="w-3 h-3" />}
                          {step.active && <Clock className="w-3 h-3" />}
                        </div>
                        <span className={`text-xs ${step.done ? "text-slate-400 line-through" : step.active ? "font-bold text-slate-800" : "text-slate-500"}`}>
                          {step.label}
                        </span>
                        {step.active && (
                          <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-[#C62828]/10 text-[#C62828] border border-[#C62828]/20 rounded-full whitespace-nowrap">
                            Aktif
                          </span>
                        )}
                      </div>
                    ))}
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
