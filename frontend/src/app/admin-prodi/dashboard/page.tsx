"use client";

import React, { useState } from "react";
import { RoleLayout } from "@/components/layout/role-layout";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  CheckCircle2, Clock, XCircle, Search, Filter,
  FileText, AlertCircle, Building2, ShieldCheck, ArrowRight,
  UserCheck, Sparkles, FileCheck, Check, Eye, Trash2
} from "lucide-react";

const NAV = [
  { label: "Dashboard",          href: "/admin-prodi/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa",href: "/admin-prodi/mahasiswa",   icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",      href: "/admin-prodi/aktivasi",    icon: <UserPlus className="w-4 h-4" /> },
  { label: "Jadwal Seminar",     href: "/admin-prodi/jadwal",      icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori Judul",   href: "/admin-prodi/repositori",  icon: <BookOpen className="w-4 h-4" /> },
];

const STATS = [
  { label: "Mahasiswa TA Aktif",    value: "124", sub: "Semester Genap 2026", color: "#2563EB", icon: Users },
  { label: "Aktivasi Pending",      value: "7",   sub: "Clearing SKS & IPK",   color: "#F59E0B", icon: UserPlus },
  { label: "Proposal Masuk",        value: "11",  sub: "Menunggu Verifikasi",  color: "#C62828", icon: FileText },
  { label: "Ujian Terjadwal",       value: "18",  sub: "Seminar & Sidang",     color: "#059669", icon: CalendarDays },
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

const ANTREAN_AKTIVASI = [
  { nim: "20101152630201", nama: "Teguh Santoso", ipk: 3.72, sks: 144, clearingDate: "30 Jul 2026", petugas: "Budianto, S.Kom." },
  { nim: "20101152630215", nama: "Dewi Ratnasari", ipk: 3.61, sks: 146, clearingDate: "30 Jul 2026", petugas: "Budianto, S.Kom." },
  { nim: "20101152630198", nama: "Eko Wijayanto",  ipk: 3.50, sks: 144, clearingDate: "29 Jul 2026", petugas: "Siti Aminah, A.Md." },
];

export default function AdminProdiDashboard() {
  const [activeTab, setActiveTab] = useState<"proposal" | "aktivasi" | "mahasiswa">("proposal");
  const [proposalList, setProposalList] = useState(PROPOSAL_MASUK);
  const [aktivasiList, setAktivasiList] = useState(ANTREAN_AKTIVASI);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApproveProposal = (id: string, nama: string) => {
    setProposalList((prev) => prev.filter((p) => p.id !== id));
    setToastMessage(`Proposal & Usulan Pembimbing atas nama ${nama} berhasil DISETUJUI!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleActivateAccount = (nim: string, nama: string) => {
    setAktivasiList((prev) => prev.filter((a) => a.nim !== nim));
    setToastMessage(`Akun SIPETA mahasiswa ${nama} (${nim}) telah BERHASIL DIAKTIFKAN!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <RoleLayout
      navItems={NAV}
      userName="Hafizah, S.Kom., M.Kom."
      userCode="NIP: 198504122010122001"
      userRole="Admin Prodi"
      userUnit="Fakultas Ilmu Komputer"
      accentColor="#2563EB"
    >
      {/* ── Welcome Banner Command Center ── */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white font-display shadow-xs">
                <Building2 className="w-3.5 h-3.5 text-white" /> Portal Utama Program Studi Teknik Informatika
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
              Dashboard Admin Program Studi
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
              Selamat datang kembali, Ibu Hafizah. Terdapat <strong className="text-blue-400 font-bold">{proposalList.length} proposal judul</strong> dan <strong className="text-amber-400 font-bold">{aktivasiList.length} akun clearing</strong> perlu penanganan hari ini.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link
              href="/admin-prodi/aktivasi"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
            >
              <UserPlus className="w-4 h-4 text-white" />
              <span>Kelola Aktivasi Akun ({aktivasiList.length})</span>
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
        <div className="h-0.5 bg-gradient-to-r from-[#2563EB] via-[#F59E0B] to-[#C62828]" />
      </div>

      {/* Toast Alert Notice */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between gap-3 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-700">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

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
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs" style={{ background: s.color + "15", color: s.color }}>
                <IconComp className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main Operations Split Card Container ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-0 flex-1">
        
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/80 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("proposal")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer font-display ${
                activeTab === "proposal"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Verifikasi Proposal Judul ({proposalList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("aktivasi")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer font-display ${
                activeTab === "aktivasi"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Aktivasi Clearing Akun ({aktivasiList.length})</span>
            </button>
          </div>

          <span className="text-xs font-mono text-slate-400 font-semibold">
            Tahun Akademik 2026/2027 — UPI YPTK
          </span>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 flex-1 overflow-y-auto scrollbar-none space-y-4">
          
          {/* TAB 1: VERIFIKASI PROPOSAL JUDUL */}
          {activeTab === "proposal" && (
            <div className="space-y-4">
              {proposalList.length === 0 ? (
                <div className="p-12 text-center space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="text-sm font-bold text-slate-800 font-display">Seluruh proposal judul telah selesai diverifikasi!</p>
                  <p className="text-xs text-slate-500 font-medium">Tidak ada antrean proposal baru yang memerlukan persetujuan.</p>
                </div>
              ) : (
                proposalList.map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all space-y-3.5 shadow-2xs">
                    
                    {/* Header info row */}
                    <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white font-display">
                          {p.id}
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 font-display">{p.nama}</h3>
                        <span className="text-xs font-mono text-slate-400">({p.nim})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-2xs font-display">
                          Kemiripan: {p.similarity} (Tersedia)
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">{p.tgl}</span>
                      </div>
                    </div>

                    {/* Title & Metadata */}
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-slate-900 leading-snug font-display">
                        &ldquo;{p.judul}&rdquo;
                      </p>
                      <p className="text-[11px] font-semibold text-slate-500">
                        Bidang Kajian: <strong className="text-slate-800">{p.bidang}</strong>
                      </p>
                    </div>

                    {/* Pembimbing assignment proposal */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Usulan Pembimbing I:</span>
                        <span className="font-bold text-slate-800 mt-0.5 block">{p.usulanPembimbing1}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Usulan Pembimbing II:</span>
                        <span className="font-bold text-slate-800 mt-0.5 block">{p.usulanPembimbing2}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end gap-2.5 pt-1">
                      <button
                        onClick={() => handleApproveProposal(p.id, p.nama)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer font-display active:scale-95"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        <span>Setujui Proposal &amp; Pembimbing</span>
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: AKTIVASI CLEARING AKUN */}
          {activeTab === "aktivasi" && (
            <div className="space-y-3">
              {aktivasiList.length === 0 ? (
                <div className="p-12 text-center space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="text-sm font-bold text-slate-800 font-display">Semua antrean clearing akun mahasiswa telah diaktifkan!</p>
                </div>
              ) : (
                aktivasiList.map((a) => (
                  <div key={a.nim} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-4 flex-wrap hover:bg-white transition-all shadow-2xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 font-display">{a.nama}</span>
                        <span className="text-xs font-mono text-slate-400">({a.nim})</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        Clearing SKS: <strong className="text-emerald-600 font-bold">{a.sks} SKS</strong> · IPK: <strong className="text-blue-600 font-bold">{a.ipk}</strong> · Petugas: {a.petugas} ({a.clearingDate})
                      </p>
                    </div>

                    <button
                      onClick={() => handleActivateAccount(a.nim, a.nama)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer font-display active:scale-95"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-white" />
                      <span>Aktifkan Akun SIPETA</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </RoleLayout>
  );
}
