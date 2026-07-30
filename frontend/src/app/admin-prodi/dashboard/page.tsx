"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  CheckCircle2, Clock, XCircle, Search, Filter,
  FileText, AlertCircle, Building2, ShieldCheck, ArrowRight,
  UserCheck, Sparkles, FileCheck, Check, Eye, Trash2,
  ChevronDown, ChevronUp
} from "lucide-react";

const NAV = [
  { label: "Dashboard",          href: "/admin-prodi/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa",href: "/admin-prodi/mahasiswa",   icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",      href: "/admin-prodi/aktivasi",    icon: <UserPlus className="w-4 h-4" /> },
  { label: "Jadwal Seminar",     href: "/admin-prodi/jadwal",      icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori Judul",   href: "/admin-prodi/repositori",  icon: <BookOpen className="w-4 h-4" /> },
];

const STATS = [
  { label: "Mahasiswa TA Aktif",    value: "124", sub: "Semester Genap 2026", color: "#C62828", bgIcon: "bg-[#C62828]", icon: Users },
  { label: "Aktivasi Pending",      value: "7",   sub: "Clearing SKS & IPK",   color: "#D97706", bgIcon: "bg-amber-500", icon: UserPlus },
  { label: "Proposal Masuk",        value: "11",  sub: "Menunggu Verifikasi",  color: "#C62828", bgIcon: "bg-rose-700",   icon: FileText },
  { label: "Ujian Terjadwal",       value: "18",  sub: "Seminar & Sidang",     color: "#059669", bgIcon: "bg-emerald-600",icon: CalendarDays },
];

const PROPOSAL_MASUK = [
  {
    id: "PROP-01",
    nim: "20101152630045",
    nama: "Danu Zen",
    prodi: "Teknik Informatika",
    judul: "Sistem Informasi Manajemen Perjalanan & Evaluasi Tugas Akhir (SIPETA) Berbasis Web",
    bidang: "Software Engineering & Web Architecture",
    similarity: "8%",
    usulanPembimbing1: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
    usulanPembimbing2: "Rina Oktaviani, M.Kom.",
    tgl: "30 Jul 2026",
    status: "Pending Verifikasi"
  },
  {
    id: "PROP-02",
    nim: "20101152630112",
    nama: "Nadia Rahma",
    prodi: "Teknik Informatika",
    judul: "Penerapan Deep Learning Convolutional Neural Network Untuk Klasifikasi Citra Medis",
    bidang: "Artificial Intelligence & Machine Learning",
    similarity: "12%",
    usulanPembimbing1: "Ir. H. Sumijan, M.Sc.",
    usulanPembimbing2: "Sari Indah, M.T.",
    tgl: "29 Jul 2026",
    status: "Pending Verifikasi"
  },
  {
    id: "PROP-03",
    nim: "20101152630099",
    nama: "Taufik Hidayat",
    prodi: "Teknik Informatika",
    judul: "Pengembangan Chatbot Pelayanan Akademik Kampus Berbasis Natural Language Processing",
    bidang: "Artificial Intelligence & Machine Learning",
    similarity: "14%",
    usulanPembimbing1: "Dr. Gunadi Widi, M.Kom.",
    usulanPembimbing2: "Iwan, M.Kom.",
    tgl: "28 Jul 2026",
    status: "Pending Verifikasi"
  },
];

export default function AdminProdiDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [proposalList, setProposalList] = useState(PROPOSAL_MASUK);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Accordion Expand State: Default expand the first item
  const [expandedPropId, setExpandedPropId] = useState<string | null>("PROP-01");

  const handleApproveProposal = (id: string, nama: string) => {
    setProposalList((prev) => prev.filter((p) => p.id !== id));
    setToastMessage(`Proposal & Usulan Pembimbing atas nama ${nama} berhasil DISETUJUI!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleExpandProposal = (id: string) => {
    setExpandedPropId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Unified Standard Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Unified Standard Header */}
          <Header
            className="shell-header shrink-0"
            userName="Hafizah, S.Kom., M.Kom."
            userNim="NIP: 198504122010122001"
            userRole="Admin Prodi"
            prodiName="Teknik Informatika"
          />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">
            
            {/* ── Welcome Banner Command Center ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs">
                      <Building2 className="w-3.5 h-3.5 text-white" /> Portal Utama Program Studi Teknik Informatika
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Dashboard Admin Program Studi
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Selamat datang kembali, Ibu Hafizah. Terdapat <strong className="text-[#C62828] font-bold">{proposalList.length} proposal judul</strong> baru yang memerlukan verifikasi dan persetujuan hari ini.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/admin-prodi/aktivasi"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <UserPlus className="w-4 h-4 text-white" />
                    <span>Aktivasi Akun Clearing</span>
                  </Link>
                  <Link
                    href="/admin-prodi/jadwal"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 font-display"
                  >
                    <CalendarDays className="w-4 h-4 text-white" />
                    <span>Jadwal Ujian</span>
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* ── 4 Executive Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center justify-between space-x-3 hover:shadow-md transition-all">
                    <div className="space-y-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-500 font-display leading-tight">{s.label}</p>
                      <p className="text-2xl sm:text-3xl font-black font-display" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[10px] text-slate-400 font-semibold truncate">{s.sub}</p>
                    </div>
                    <div className={`w-11 h-11 rounded-xl ${s.bgIcon} text-white flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                      <IconComp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Main Operations Card Container (Verifikasi Proposal Judul) ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-0 flex-1">
              
              {/* Clean Focused Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/80 flex-wrap gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Verifikasi Proposal Judul &amp; Usulan Pembimbing</h2>
                    <p className="text-[10px] text-slate-400 font-medium">{proposalList.length} Proposal Menunggu Persetujuan</p>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-400 font-semibold">
                  Tahun Akademik 2026/2027 — UPI YPTK
                </span>
              </div>

              {/* Proposals List Body (Scrolls Internally inside the card container with generous bottom margin) */}
              <div className="p-5 flex-1 overflow-y-auto scrollbar-none">
                <div className="space-y-3 pb-12">
                  {proposalList.length === 0 ? (
                    <div className="p-12 text-center space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                      <p className="text-sm font-bold text-slate-800 font-display">Seluruh proposal judul telah selesai diverifikasi!</p>
                      <p className="text-xs text-slate-500 font-medium">Tidak ada antrean proposal baru yang memerlukan persetujuan.</p>
                    </div>
                  ) : (
                    proposalList.map((p) => {
                      const isExpanded = expandedPropId === p.id;
                      return (
                        <div
                          key={p.id}
                          className={`rounded-2xl border transition-all overflow-hidden ${
                            isExpanded
                              ? "bg-white border-[#C62828] shadow-md"
                              : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                          }`}
                        >
                          {/* COMPACT SUMMARY HEADER (ALWAYS VISIBLE & CLICKABLE TO TOGGLE) */}
                          <div
                            onClick={() => toggleExpandProposal(p.id)}
                            className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors select-none"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span className="px-2.5 py-1 rounded-full text-[10.5px] font-black bg-[#C62828] text-white font-display shrink-0 shadow-2xs">
                                {p.id}
                              </span>
                              
                              <div className="min-w-0 flex-1 space-y-0.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display truncate">
                                    {p.nama}
                                  </h3>
                                  <span className="text-[11px] font-mono text-slate-400 shrink-0">({p.nim})</span>
                                </div>
                                <p className="text-xs font-semibold text-slate-600 truncate">
                                  &ldquo;{p.judul}&rdquo;
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-2xs font-display">
                                Kemiripan: {p.similarity} (Tersedia)
                              </span>
                              <span className="text-[11px] font-medium text-slate-400 font-mono hidden md:inline">{p.tgl}</span>
                              
                              <button className={`p-1.5 rounded-xl border transition-all ${
                                isExpanded
                                  ? "bg-rose-50 border-rose-200 text-[#C62828]"
                                  : "bg-slate-50 border-slate-200 text-slate-500"
                              }`}>
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          {/* EXPANDED DETAILS BODY (REVEALED WHEN EXPANDED) */}
                          {isExpanded && (
                            <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                              
                              {/* Full Title & Bidang Kajian */}
                              <div className="space-y-1.5 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Judul Lengkap Proposal:</span>
                                <p className="text-xs sm:text-sm font-black text-slate-900 leading-relaxed font-display">
                                  &ldquo;{p.judul}&rdquo;
                                </p>
                                <div className="pt-2 flex items-center justify-between gap-2 flex-wrap text-xs">
                                  <span className="text-[11px] font-semibold text-slate-600">
                                    Bidang Kajian: <strong className="text-slate-900 font-bold">{p.bidang}</strong>
                                  </span>
                                  <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-display">
                                    Uji Kemiripan: {p.similarity}
                                  </span>
                                </div>
                              </div>

                              {/* Usulan Pembimbing Box with Left Red Signature Accent */}
                              <div className="p-4 rounded-xl bg-white border border-slate-200 border-l-4 border-l-[#C62828] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs shadow-2xs">
                                <div>
                                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Usulan Pembimbing I:</span>
                                  <span className="font-bold text-slate-900 mt-0.5 block">{p.usulanPembimbing1}</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Usulan Pembimbing II:</span>
                                  <span className="font-bold text-slate-900 mt-0.5 block">{p.usulanPembimbing2}</span>
                                </div>
                              </div>

                              {/* Action Bar */}
                              <div className="flex items-center justify-between gap-3 pt-2 flex-wrap">
                                <button
                                  onClick={() => toggleExpandProposal(p.id)}
                                  className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 cursor-pointer font-display"
                                >
                                  <ChevronUp className="w-3.5 h-3.5" /> Tutup Detail
                                </button>

                                <button
                                  onClick={() => handleApproveProposal(p.id, p.nama)}
                                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-2 shadow-xs cursor-pointer font-display active:scale-95"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                  <span>Setujui Proposal &amp; Usulan Pembimbing</span>
                                </button>
                              </div>

                            </div>
                          )}

                        </div>
                      );
                    })
                  )}
                  {/* Generous bottom spacer to prevent scrollbar clipping */}
                  <div className="h-6" />
                </div>
              </div>

            </div>

          </main>
        </div>
      </div>

      {/* Floating Toast Popup Notification (Non-layout-shifting) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
              <CheckCircle2 className="w-4.5 h-4.5 text-white" />
            </div>
            <p className="text-xs font-bold font-display leading-tight">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white cursor-pointer p-1">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
