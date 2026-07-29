"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ViewportFitGrid } from "@/components/ViewportFitGrid";
import Link from "next/link";
import {
  UserCheck,
  CheckCircle2,
  Search,
  ArrowRight,
  Users,
  ShieldCheck,
  Clock,
  Send,
  XCircle,
} from "lucide-react";

interface Dosen {
  id: string;
  nama: string;
  nidn: string;
  jabatan: string;
  bidang: string;
  tags: string[];
  kuotaUtama: number; // e.g. 6 out of 8
  kuotaUtamaMax: number;
  kuotaPendamping: number; // e.g. 5 out of 8
  kuotaPendampingMax: number;
  isAvailable: boolean;
}

const DOSEN_LIST: Dosen[] = [
  {
    id: "dos-1",
    nama: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
    nidn: "1012057301",
    jabatan: "Guru Besar / Lektor Kepala",
    bidang: "Software Engineering & Web Architecture",
    tags: ["RPL", "Web Architecture", "System Design"],
    kuotaUtama: 6,
    kuotaUtamaMax: 8,
    kuotaPendamping: 4,
    kuotaPendampingMax: 8,
    isAvailable: true,
  },
  {
    id: "dos-2",
    nama: "Dr. Jasmir, S.Kom., M.Kom.",
    nidn: "1024088002",
    jabatan: "Lektor Kepala",
    bidang: "Software Engineering & Cloud Computing",
    tags: ["RPL", "Cloud Native", "Microservices"],
    kuotaUtama: 5,
    kuotaUtamaMax: 8,
    kuotaPendamping: 5,
    kuotaPendampingMax: 8,
    isAvailable: true,
  },
  {
    id: "dos-3",
    nama: "Dr. Yuhandri, S.Kom., M.Kom.",
    nidn: "1015097501",
    jabatan: "Guru Besar",
    bidang: "Artificial Intelligence & Data Mining",
    tags: ["AI", "Machine Learning", "Data Mining"],
    kuotaUtama: 8,
    kuotaUtamaMax: 8,
    kuotaPendamping: 6,
    kuotaPendampingMax: 8,
    isAvailable: false, // Kuota Utama Penuh
  },
  {
    id: "dos-4",
    nama: "Prof. Dr. Julius Santony, S.Kom., M.Kom.",
    nidn: "1005047201",
    jabatan: "Guru Besar",
    bidang: "Artificial Intelligence & Fuzzy Logic",
    tags: ["Fuzzy Systems", "Decision Support", "AI"],
    kuotaUtama: 7,
    kuotaUtamaMax: 8,
    kuotaPendamping: 3,
    kuotaPendampingMax: 8,
    isAvailable: true,
  },
  {
    id: "dos-5",
    nama: "Dr. Yanto, S.Kom., M.Kom.",
    nidn: "1018038202",
    jabatan: "Lektor",
    bidang: "Computer Network & Cybersecurity",
    tags: ["Jaringan", "Cybersecurity", "IoT"],
    kuotaUtama: 4,
    kuotaUtamaMax: 8,
    kuotaPendamping: 5,
    kuotaPendampingMax: 8,
    isAvailable: true,
  },
  {
    id: "dos-6",
    nama: "Mutiana Pratiwi, S.Kom., M.Kom.",
    nidn: "1002118901",
    jabatan: "Asisten Ahli",
    bidang: "Information Systems & UI/UX Design",
    tags: ["UI/UX", "Sistem Informasi", "Mobile App"],
    kuotaUtama: 3,
    kuotaUtamaMax: 8,
    kuotaPendamping: 2,
    kuotaPendampingMax: 8,
    isAvailable: true,
  },
];

export default function PengajuanPembimbingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBidangFilter, setSelectedBidangFilter] = useState("ALL");

  // State for Selection
  const [selectedPembimbing1, setSelectedPembimbing1] = useState<Dosen | null>(
    DOSEN_LIST[0]
  );
  const [selectedPembimbing2, setSelectedPembimbing2] = useState<Dosen | null>(
    DOSEN_LIST[1]
  );
  const [catatanAlasan, setCatatanAlasan] = useState(
    "Pengajuan sesuai dengan keselarasan topik skripsi 'SIPETA Web Platform' di bidang Software Engineering."
  );

  const [, setSubmissionStatus] = useState<
    "APPROVED" | "PENDING" | "SUBMITTED"
  >("APPROVED");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter logic
  const filteredDosen = DOSEN_LIST.filter((dosen) => {
    const matchesSearch =
      dosen.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dosen.nidn.includes(searchQuery) ||
      dosen.bidang.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBidang =
      selectedBidangFilter === "ALL" ||
      (selectedBidangFilter === "RPL" && dosen.bidang.includes("Software")) ||
      (selectedBidangFilter === "AI" && dosen.bidang.includes("Artificial")) ||
      (selectedBidangFilter === "JARINGAN" && dosen.bidang.includes("Network"));

    return matchesSearch && matchesBidang;
  });

  const handleSelectPembimbing1 = (dosen: Dosen) => {
    if (selectedPembimbing2?.id === dosen.id) {
      setSelectedPembimbing2(null);
    }
    setSelectedPembimbing1(dosen);
  };

  const handleSelectPembimbing2 = (dosen: Dosen) => {
    if (selectedPembimbing1?.id === dosen.id) {
      setSelectedPembimbing1(null);
    }
    setSelectedPembimbing2(dosen);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPembimbing1 || !selectedPembimbing2) {
      alert("Harap pilih Dosen Pembimbing I dan Dosen Pembimbing II!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus("SUBMITTED");
      alert("Pengajuan Dosen Pembimbing berhasil dikirim ke Admin Prodi!");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} className="shell-header shrink-0" />

          <main className="flex-1 p-6 space-y-6 overflow-y-auto overflow-x-hidden scrollbar-none shell-body">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] rounded-2xl border border-[#333333] p-6 text-white shadow-md relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#2F8F5B] text-white flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Pembimbing Disetujui Prodi
                    </span>
                    <span className="text-xs font-mono-data text-[#A0A0A0]">
                      Ref ID: PB-2026-0814
                    </span>
                  </div>
                  <h2 className="text-2xl font-black font-display text-white tracking-wide">
                    Pengajuan &amp; Usulan Dosen Pembimbing TA
                  </h2>
                  <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                    Mahasiswa memilih dan mengajukan calon Dosen Pembimbing Utama (Pembimbing I) dan Pendamping (Pembimbing II) sesuai bidang keahlian topik Tugas Akhir.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Link
                    href="/bimbingan"
                    className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-1.5"
                  >
                    Lanjut ke Bimbingan TA <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Main 2-Column Grid (Flush Bottom Baseline Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Left Column (2 Cols): Dosen Selector & Directory */}
              <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
                {/* Directory Search & Filter */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 font-display">
                          Katalog Dosen FIK UPI YPTK
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Pilih Dosen berdasarkan ketersediaan kuota &amp; bidang keahlian
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                      <button
                        onClick={() => setSelectedBidangFilter("ALL")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          selectedBidangFilter === "ALL"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Semua
                      </button>
                      <button
                        onClick={() => setSelectedBidangFilter("RPL")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          selectedBidangFilter === "RPL"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        RPL
                      </button>
                      <button
                        onClick={() => setSelectedBidangFilter("AI")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          selectedBidangFilter === "AI"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        AI &amp; Data
                      </button>
                      <button
                        onClick={() => setSelectedBidangFilter("JARINGAN")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          selectedBidangFilter === "JARINGAN"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Jaringan
                      </button>
                    </div>
                  </div>

                  {/* Search Bar Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Cari Dosen berdasarkan Nama, NIDN, atau Bidang Keahlian..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-900 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#C62828] transition-all"
                    />
                  </div>

                  {/* ViewportFitGrid for Dosen Cards */}
                  <ViewportFitGrid minCardWidth={240} gap={16}>
                    {filteredDosen.map((dosen) => {
                      const isSelected1 = selectedPembimbing1?.id === dosen.id;
                      const isSelected2 = selectedPembimbing2?.id === dosen.id;

                      return (
                        <div
                          key={dosen.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                            isSelected1
                              ? "bg-rose-50/50 border-[#C62828] shadow-sm"
                              : isSelected2
                              ? "bg-amber-50/50 border-[#F59E0B] shadow-sm"
                              : "bg-slate-50/60 border-slate-200/80 hover:border-slate-300 hover:bg-white"
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                  {dosen.jabatan}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900 font-display leading-snug">
                                  {dosen.nama}
                                </h4>
                                <p className="text-[11px] font-mono-data text-slate-500">
                                  NIDN: {dosen.nidn}
                                </p>
                              </div>
                              {isSelected1 && (
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#C62828] text-white rounded-full shrink-0 shadow-sm">
                                  Pembimbing I
                                </span>
                              )}
                              {isSelected2 && (
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F59E0B] text-white rounded-full shrink-0 shadow-sm">
                                  Pembimbing II
                                </span>
                              )}
                            </div>

                            {/* Bidang & Tags */}
                            <div className="flex flex-wrap gap-1">
                              {dosen.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-[10px] font-semibold bg-white border border-slate-200 text-slate-600 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* Quota Progress Bar */}
                            <div className="p-2 bg-white/80 rounded-xl border border-slate-200/60 space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-slate-600">
                                <span>Kuota Bimbingan Utama:</span>
                                <span
                                  className={
                                    dosen.kuotaUtama >= dosen.kuotaUtamaMax
                                      ? "text-rose-600 font-extrabold"
                                      : "text-emerald-600"
                                  }
                                >
                                  {dosen.kuotaUtama} / {dosen.kuotaUtamaMax}{" "}
                                  {dosen.kuotaUtama >= dosen.kuotaUtamaMax
                                    ? "(Penuh)"
                                    : "(Tersedia)"}
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    dosen.kuotaUtama >= dosen.kuotaUtamaMax
                                      ? "bg-rose-500"
                                      : "bg-emerald-500"
                                  }`}
                                  style={{
                                    width: `${
                                      (dosen.kuotaUtama / dosen.kuotaUtamaMax) *
                                      100
                                    }%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                            <button
                              type="button"
                              disabled={!dosen.isAvailable && !isSelected1}
                              onClick={() => handleSelectPembimbing1(dosen)}
                              className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                                isSelected1
                                  ? "bg-[#C62828] text-white shadow-sm"
                                  : dosen.isAvailable
                                  ? "bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-[#C62828] hover:border-rose-200"
                                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
                              }`}
                            >
                              {isSelected1 ? "✓ Terpilih (I)" : "+ Pilih (I)"}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSelectPembimbing2(dosen)}
                              className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                                isSelected2
                                  ? "bg-[#F59E0B] text-white shadow-sm"
                                  : "bg-white border border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-[#F59E0B] hover:border-amber-200"
                              }`}
                            >
                              {isSelected2 ? "✓ Terpilih (II)" : "+ Pilih (II)"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </ViewportFitGrid>
                </div>

                {/* Bottom Info Banner */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-display">
                        Ketentuan Penetapan Dosen Pembimbing
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Penetapan akhir dilakukan oleh Admin Prodi FIK berdasarkan keselarasan topik &amp; pemerataan kuota bimbingan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (1 Col): Form Pengajuan & Status Review */}
              <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
                {/* Form Pengajuan Card */}
                <form
                  onSubmit={handleSubmitForm}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#C62828]" />
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Form Usulan Pembimbing
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Disetujui Prodi
                    </span>
                  </div>

                  {/* Selected Pembimbing I */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Dosen Pembimbing I (Utama):
                    </label>
                    {selectedPembimbing1 ? (
                      <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {selectedPembimbing1.nama}
                          </p>
                          <p className="text-[10px] font-mono-data text-slate-500">
                            NIDN: {selectedPembimbing1.nidn}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedPembimbing1(null)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400 font-medium">
                        Belum memilih Pembimbing I
                      </div>
                    )}
                  </div>

                  {/* Selected Pembimbing II */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Dosen Pembimbing II (Pendamping):
                    </label>
                    {selectedPembimbing2 ? (
                      <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {selectedPembimbing2.nama}
                          </p>
                          <p className="text-[10px] font-mono-data text-slate-500">
                            NIDN: {selectedPembimbing2.nidn}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedPembimbing2(null)}
                          className="text-slate-400 hover:text-amber-600 p-1"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400 font-medium">
                        Belum memilih Pembimbing II
                      </div>
                    )}
                  </div>

                  {/* Catatan Alasan Selection */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Alasan / Catatan Keselarasan Topik:
                    </label>
                    <textarea
                      rows={3}
                      value={catatanAlasan}
                      onChange={(e) => setCatatanAlasan(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-[#C62828] transition-all leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? "Mengirim Pengajuan..." : "Kirim Pengajuan Pembimbing"}
                  </button>
                </form>

                {/* Status Verification Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Alur Verification &amp; Approval
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">
                          1. Pengajuan oleh Mahasiswa
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Disubmit pada 27 Maret 2026
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">
                          2. Konfirmasi Dosen Pembimbing
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Disetujui oleh Sarjon Defit &amp; Jasmir
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">
                          3. SK Penetapan Admin Prodi
                        </p>
                        <p className="text-[11px] text-slate-500">
                          SK No: SK-TA/FIK/2026/0412
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Requirements Info (Flush bottom fill) */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                      Layanan Helpdesk Prodi FIK
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                      Jika kuota pembimbing pilihan Anda penuh atau ingin memohon penyesuaian khusus, silakan hubungi Sekprodi FIK UPI YPTK Padang.
                    </p>
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
