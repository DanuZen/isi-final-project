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
import { CustomDropdown } from "@/components/ui/custom-dropdown";

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

import { storePembimbing } from "@/lib/sipeta-store";
import { useToast } from "@/components/ui/toast";

export default function PengajuanPembimbingPage() {
  const { showToast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBidangFilter, setSelectedBidangFilter] = useState("ALL");

  // State for Selection
  const [selectedPembimbing1, setSelectedPembimbing1] = useState<Dosen | null>(null);
  const [selectedPembimbing2, setSelectedPembimbing2] = useState<Dosen | null>(null);
  const [catatanAlasan, setCatatanAlasan] = useState("");

  const [, setSubmissionStatus] = useState<
    "APPROVED" | "PENDING" | "SUBMITTED"
  >("PENDING");
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

  // State for Modal Form Usulan
  const [showFormModal, setShowFormModal] = useState(false);

  const handleSelectPembimbing1 = (dosen: Dosen) => {
    if (selectedPembimbing2?.id === dosen.id) {
      setSelectedPembimbing2(null);
    }
    setSelectedPembimbing1(dosen);
    setShowFormModal(true);
  };

  const handleSelectPembimbing2 = (dosen: Dosen) => {
    if (selectedPembimbing1?.id === dosen.id) {
      setSelectedPembimbing1(null);
    }
    setSelectedPembimbing2(dosen);
    setShowFormModal(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPembimbing1 || !selectedPembimbing2) {
      showToast("Pilihan Belum Lengkap", "Harap pilih Dosen Pembimbing I dan Dosen Pembimbing II!", "warning");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      storePembimbing.saveRequest({
        studentNim: "20101152630045",
        studentNama: "Danu Zen",
        prodi: "Teknik Informatika",
        judul: "Sistem Informasi Perjalanan & Evaluasi Tugas Akhir (SIPETA) Berbasis Web di UPI YPTK Padang",
        bidang: "Software Engineering (RPL)",
        dosenId: selectedPembimbing1.id,
        dosenNama: selectedPembimbing1.nama,
        alasan: catatanAlasan || "Mengajukan bimbingan tugas akhir skripsi",
      });
      setIsSubmitting(false);
      setSubmissionStatus("SUBMITTED");
      setShowFormModal(false);
      showToast("Permohonan Berhasil Dikirim!", "Permohonan Dosen Pembimbing I & II telah tersimpan dan terhubung ke portal Dosen.", "success");
    }, 800);
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                {/* Left: greeting + status */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Pembimbing Disetujui Prodi
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Pengajuan &amp; Usulan Dosen Pembimbing TA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Mahasiswa memilih dan mengajukan calon Dosen Pembimbing Utama (Pembimbing I) dan Pendamping (Pembimbing II) dari katalog dosen UPI YPTK Padang.
                  </p>
                </div>

                {/* Right: quick action button */}
                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <button
                    onClick={() => setShowFormModal(true)}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Form Usulan Pembimbing</span>
                  </button>
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main 12-Column Grid (Flush Bottom Baseline Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
              {/* Left Column (8/12): Dosen Directory Table List */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden">
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden">
                  {/* Table Header Controls */}
                  <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 font-display">
                          Katalog Dosen UPI YPTK
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Pilih Dosen untuk membuka Form Usulan Pembimbing TA
                        </p>
                      </div>
                    </div>

                    <CustomDropdown
                      value={selectedBidangFilter}
                      onChange={(val) => setSelectedBidangFilter(val)}
                      options={[
                        { id: "ALL", label: "Semua Bidang Keahlian", badge: "ALL" },
                        { id: "RPL", label: "Software Engineering (RPL)", badge: "RPL" },
                        { id: "AI", label: "Artificial Intelligence (AI)", badge: "AI" },
                        { id: "JARINGAN", label: "Computer Network & Security", badge: "JARINGAN" },
                      ]}
                      placeholder="Filter Bidang..."
                      className="w-56"
                    />
                  </div>

                  {/* Search Bar Input */}
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50 shrink-0">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Cari Dosen berdasarkan Nama, NIDN, atau Bidang Keahlian..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#C62828] transition-all"
                      />
                    </div>
                  </div>

                  {/* Scrollable Dosen List Table */}
                  <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto scrollbar-none">
                    <table className="w-full text-left text-xs min-w-[600px] lg:min-w-0">
                      <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider font-display border-b border-slate-200/80 sticky top-0 z-10">
                        <tr>
                          <th className="py-3 px-3.5 w-10 text-center">No</th>
                          <th className="py-3 px-3.5">Nama Dosen &amp; NIDN</th>
                          <th className="py-3 px-3.5">Jabatan &amp; Keahlian</th>
                          <th className="py-3 px-3.5 w-40">Kuota Bimbingan</th>
                          <th className="py-3 px-3.5 w-48 text-center">Pilih Usulan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        {filteredDosen.map((dosen, idx) => {
                          const isSelected1 = selectedPembimbing1?.id === dosen.id;
                          const isSelected2 = selectedPembimbing2?.id === dosen.id;

                          return (
                            <tr key={dosen.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3.5 px-3.5 text-center font-mono-data font-bold text-slate-500">
                                {idx + 1}
                              </td>
                              <td className="py-3.5 px-3.5 font-bold text-slate-900">
                                <p className="font-bold text-slate-900 leading-snug">{dosen.nama}</p>
                                <p className="text-[10px] font-mono-data text-slate-500">NIDN: {dosen.nidn}</p>
                              </td>
                              <td className="py-3.5 px-3.5">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                                  {dosen.jabatan}
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {dosen.tags.map((tag) => (
                                    <span key={tag} className="px-2 py-0.5 text-[9px] font-semibold bg-slate-100 border border-slate-200 text-slate-700 rounded-md">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="py-3.5 px-3.5">
                                <div className="space-y-1">
                                  <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-slate-600">Utama:</span>
                                    <span className={dosen.kuotaUtama >= dosen.kuotaUtamaMax ? "text-rose-600 font-extrabold" : "text-emerald-600 font-extrabold"}>
                                      {dosen.kuotaUtama}/{dosen.kuotaUtamaMax} {dosen.kuotaUtama >= dosen.kuotaUtamaMax ? "(Penuh)" : "(Tersedia)"}
                                    </span>
                                  </div>
                                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${dosen.kuotaUtama >= dosen.kuotaUtamaMax ? "bg-rose-500" : "bg-emerald-500"}`}
                                      style={{ width: `${(dosen.kuotaUtama / dosen.kuotaUtamaMax) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-3.5 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  {isSelected1 ? (
                                    <span className="py-1.5 px-3 rounded-xl text-[11px] font-bold bg-[#C62828] text-white shadow-xs inline-flex items-center gap-1">
                                      ✓ Pembimbing I
                                    </span>
                                  ) : isSelected2 ? (
                                    <span className="py-1.5 px-3 rounded-xl text-[11px] font-bold bg-[#D97706] text-white shadow-xs inline-flex items-center gap-1">
                                      ✓ Pembimbing II
                                    </span>
                                  ) : (
                                    <>
                                      <button
                                        type="button"
                                        disabled={!dosen.isAvailable}
                                        onClick={() => handleSelectPembimbing1(dosen)}
                                        className={`py-1.5 px-2.5 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 ${
                                          dosen.isAvailable
                                            ? "bg-slate-100 text-slate-700 hover:bg-[#C62828] hover:text-white active:scale-95"
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        }`}
                                      >
                                        + Pilih I
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => handleSelectPembimbing2(dosen)}
                                        className="py-1.5 px-2.5 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 bg-slate-100 text-slate-700 hover:bg-[#D97706] hover:text-white active:scale-95"
                                      >
                                        + Pilih II
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column (4/12): Ringkasan Status & Form Modal Trigger */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden">
                {/* Status Summary Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5 shrink-0">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Usulan Pembimbing TA
                      </h3>
                    </div>
                    <span className="px-3 py-1 text-[10px] font-bold bg-emerald-600 text-white rounded-full shadow-xs">
                      Disetujui Prodi
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#C62828] text-white rounded-full">
                        Pembimbing Utama (I)
                      </span>
                      <p className="font-bold text-slate-900 mt-1 truncate">
                        {selectedPembimbing1 ? selectedPembimbing1.nama : "Belum Dipilih"}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono-data">
                        NIDN: {selectedPembimbing1 ? selectedPembimbing1.nidn : "-"}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#D97706] text-white rounded-full">
                        Pembimbing Pendamping (II)
                      </span>
                      <p className="font-bold text-slate-900 mt-1 truncate">
                        {selectedPembimbing2 ? selectedPembimbing2.nama : "Belum Dipilih"}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono-data">
                        NIDN: {selectedPembimbing2 ? selectedPembimbing2.nidn : "-"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFormModal(true)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all text-center block shadow-sm shadow-[#C62828]/20"
                  >
                    Buka Form Usulan Pembimbing
                  </button>
                </div>

                {/* Status Verification Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Clock className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Alur Verification &amp; Approval
                      </h3>
                    </div>

                    {/* Vertical Timeline Steps */}
                    <div className="relative pl-6 space-y-3.5 text-xs before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-500">
                      {/* Step 1 */}
                      <div className="relative group">
                        <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs shrink-0 z-10">
                          ✓
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all space-y-0.5">
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-slate-900 font-display">1. Pengajuan Mahasiswa</p>
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                              Selesai
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">Disubmit pada 27 Maret 2026</p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative group">
                        <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs shrink-0 z-10">
                          ✓
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all space-y-0.5">
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-slate-900 font-display">2. Konfirmasi Pembimbing</p>
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                              Disetujui
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">Disetujui oleh Dr. Sarjon Defit &amp; Dr. Jasmir</p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative group">
                        <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs shrink-0 z-10">
                          ✓
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all space-y-0.5">
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-slate-900 font-display">3. SK Penetapan Prodi</p>
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                              SK Terbit
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">SK No: SK-TA/2026/0412</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal Form Usulan Pembimbing */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-display">
                    Form Usulan Dosen Pembimbing TA
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Konfirmasi usulan dosen pembimbing Tugas Akhir
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFormModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              {/* Selected Pembimbing I */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Dosen Pembimbing I (Utama):
                </label>
                {selectedPembimbing1 ? (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
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
                    Belum memilih Pembimbing I (Pilih dari Tabel Katalog Dosen)
                  </div>
                )}
              </div>

              {/* Selected Pembimbing II */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Dosen Pembimbing II (Pendamping):
                </label>
                {selectedPembimbing2 ? (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
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
                    Belum memilih Pembimbing II (Pilih dari Tabel Katalog Dosen)
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

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? "Mengirim Pengajuan..." : "Kirim Pengajuan Pembimbing"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
