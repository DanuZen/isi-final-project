"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CheckCircle2,
  Clock,
  UserCheck,
  CalendarDays,
  FileCheck,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  XCircle,
} from "lucide-react";

// Dosen Nav Items
const DOSEN_NAV_ITEMS = [
  {
    label: "Dashboard Dosen",
    href: "/dosen/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Mahasiswa Bimbingan",
    href: "/dosen/bimbingan",
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: "Permohonan Masuk",
    href: "/dosen/pengajuan",
    icon: <UserCheck className="w-4 h-4" />,
  },
  {
    label: "Jadwal & Sidang",
    href: "/dosen/kalender",
    icon: <CalendarDays className="w-4 h-4" />,
  },
];

// Mock Data Dosen
const DOSEN = {
  nama: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
  nidn: "1012057301",
  jabatan: "Lektor Kepala / Dosen Pembimbing Utama",
  prodi: "Teknik Informatika - FIK UPI YPTK",
  kuotaTerisi: 6,
  kuotaMaks: 8,
};

// Mock Mahasiswa Bimbingan Aktif
const MAHASISWA_LIST = [
  {
    id: "M01",
    nim: "20101152630045",
    nama: "Danu Zen",
    judul: "Rancang Bangun Sistem Informasi Perjalanan & Evaluasi Tugas Akhir (SIPETA) Berbasis Web di UPI YPTK Padang",
    sesi: "5 / 5 Sesi",
    tahap: "Siap ACC Seminar",
    statusAcc: false,
    perluAcc: true,
  },
  {
    id: "M02",
    nim: "20101152630012",
    nama: "Ahmad Fauzi",
    judul: "Sistem Informasi Rekomendasi Pemilihan Bidang Kajian Menggunakan Algoritma C4.5",
    sesi: "3 / 5 Sesi",
    tahap: "Bimbingan Aktif",
    statusAcc: false,
    perluAcc: false,
  },
  {
    id: "M03",
    nim: "20101152630089",
    nama: "Siska Putri",
    judul: "Analisis Sentimen Opini Publik Pada Media Sosial Terhadap Layanan Akademik Kampus",
    sesi: "5 / 5 Sesi",
    tahap: "Siap ACC Seminar",
    statusAcc: true,
    perluAcc: false,
  },
  {
    id: "M04",
    nim: "20101152630104",
    nama: "Rian Hidayat",
    judul: "Implementasi Computer Vision Untuk Deteksi Kendaraan Di Area Parkir Kampus",
    sesi: "2 / 5 Sesi",
    tahap: "Bimbingan Aktif",
    statusAcc: false,
    perluAcc: false,
  },
];

// Mock Permohonan Dosen Pembimbing Masuk
const REQUESTS = [
  {
    id: "REQ01",
    nim: "20101152630155",
    nama: "Budi Santoso",
    peranUsulan: "Pembimbing I (Utama)",
    judul: "Deteksi Dini Penyakit Tanaman Padi Berbasis CNN Menggunakan Framework PyTorch",
    tgl: "Kemarin, 14:30 WIB",
  },
  {
    id: "REQ02",
    nim: "20101152630188",
    nama: "Nadia Rahma",
    peranUsulan: "Pembimbing II (Pendamping)",
    judul: "Rancang Bangun Virtual Tour Kampus 3D Berbasis WebGL dan Three.js",
    tgl: "Hari ini, 09:15 WIB",
  },
];

export default function DosenDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mahasiswaData, setMahasiswaData] = useState(MAHASISWA_LIST);
  const [requestsData, setRequestsData] = useState(REQUESTS);

  const handleGrantAcc = (id: string) => {
    setMahasiswaData((prev) =>
      prev.map((m) => (m.id === id ? { ...m, statusAcc: true, perluAcc: false, tahap: "Telah ACC Seminar" } : m))
    );
  };

  const handleApproveRequest = (id: string) => {
    setRequestsData((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar tailored for Dosen */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          items={DOSEN_NAV_ITEMS}
          roleName="PORTAL DOSEN"
        />

        {/* Content Container */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header
            userName={DOSEN.nama}
            userRole="Dosen Pembimbing"
            className="shell-header shrink-0"
          />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 p-5 md:p-6 text-white shadow-xs shrink-0 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#C62828] text-white border border-rose-600">
                      NIDN: {DOSEN.nidn}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">
                      {DOSEN.prodi}
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display tracking-tight text-white">
                    Selamat Datang, {DOSEN.nama}
                  </h1>
                  <p className="text-xs text-neutral-300">
                    Anda memiliki <strong className="text-[#F59E0B]">{DOSEN.kuotaTerisi} dari {DOSEN.kuotaMaks} Mahasiswa Bimbingan Aktif</strong>. 
                    Terdapat permohonan bimbingan baru yang membutuhkan konfirmasi Anda.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="p-3 bg-neutral-800/80 rounded-xl border border-neutral-700 text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase font-display">Kuota Bimbingan</p>
                    <p className="text-lg font-black text-[#F59E0B] font-display">{DOSEN.kuotaTerisi} / {DOSEN.kuotaMaks}</p>
                  </div>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828] absolute bottom-0 left-0 right-0" />
            </div>

            {/* ── Quick Stats Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-display">Total Bimbingan</p>
                  <p className="text-lg font-black text-slate-900 font-display">{DOSEN.kuotaTerisi} Mahasiswa</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-display">Menunggu ACC Seminar</p>
                  <p className="text-lg font-black text-slate-900 font-display">
                    {mahasiswaData.filter((m) => m.perluAcc).length} Mahasiswa
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-display">Permohonan Baru</p>
                  <p className="text-lg font-black text-slate-900 font-display">{requestsData.length} Usulan</p>
                </div>
              </div>
            </div>

            {/* ── Main Layout: 12 Columns ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
              {/* Left Column (8/12): Daftar Mahasiswa Bimbingan */}
              <div className="lg:col-span-8 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">
                      Daftar Mahasiswa Bimbingan Aktif
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {mahasiswaData.length} Mahasiswa Listed
                  </span>
                </div>

                {/* Table List */}
                <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-3">
                  {mahasiswaData.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 font-display">{m.nama}</span>
                            <span className="text-[10px] font-mono-data text-slate-500 font-medium">({m.nim})</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                            &ldquo;{m.judul}&rdquo;
                          </p>
                        </div>
                        <span
                          className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            m.statusAcc
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : m.perluAcc
                              ? "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {m.tahap}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                        <span className="text-[11px] font-bold text-slate-500">
                          Sesi Recorded: <strong className="text-slate-900">{m.sesi}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          {m.perluAcc && !m.statusAcc && (
                            <button
                              onClick={() => handleGrantAcc(m.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#C62828] text-white hover:bg-[#B71C1C] font-bold text-xs transition-all shadow-xs flex items-center gap-1 active:scale-95"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Beri ACC Seminar
                            </button>
                          )}
                          <Link
                            href="/bimbingan"
                            className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 font-bold text-xs transition-colors flex items-center gap-1"
                          >
                            Review Log <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (4/12): Permohonan Dosen Pembimbing Masuk */}
              <div className="lg:col-span-4 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">
                      Permohonan Masuk
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {requestsData.length} Permohonan
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-3">
                  {requestsData.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 space-y-2">
                      <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
                      <p className="text-xs font-bold text-slate-700">Semua Permohonan Selesai</p>
                      <p className="text-[11px]">Tidak ada usulan dosen pembimbing baru yang pending.</p>
                    </div>
                  ) : (
                    requestsData.map((req) => (
                      <div
                        key={req.id}
                        className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/30 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 font-display">{req.nama}</span>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            {req.peranUsulan}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                          &ldquo;{req.judul}&rdquo;
                        </p>
                        <p className="text-[10px] text-slate-400">{req.tgl}</p>

                        <div className="flex items-center gap-2 pt-2 border-t border-amber-200/60">
                          <button
                            onClick={() => handleApproveRequest(req.id)}
                            className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Setujui
                          </button>
                          <button
                            onClick={() => handleApproveRequest(req.id)}
                            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Tolak
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
