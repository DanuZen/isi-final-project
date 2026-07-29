"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Upload,
  Sparkles,
  UserCheck,
  Search,
  History,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  BookOpen,
} from "lucide-react";
import { CustomDropdown } from "@/components/ui/custom-dropdown";

export default function ProposalJudulPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [judulInput, setJudulInput] = useState("");
  const [abstrakInput, setAbstrakInput] = useState("");
  const [bidangKajian, setBidangKajian] = useState("Software Engineering & Web Architecture");

  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckSimilarity = () => {
    setIsChecking(true);
    setTimeout(() => {
      setSimilarityScore(Math.floor(Math.random() * 15) + 5); // 5% - 20%
      setIsChecking(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" />

          <main className="flex-1 p-5 md:p-6 space-y-5 overflow-hidden shell-body flex flex-col min-h-0">
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                {/* Left: greeting + status */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Proposal Judul Disetujui Prodi
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Formulir Pengajuan &amp; Uji Duplikasi Judul TA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pengajuan usulan topik Tugas Akhir / Skripsi mahasiswa UPI YPTK Padang. Sistem otomatis mengecek ketersediaan judul terhadap repositori naskah alumni.
                  </p>
                </div>

                {/* Right: quick action button */}
                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/pembimbing"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Lanjut ke Usulan Pembimbing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main 12-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0 overflow-hidden">
              {/* Left Column (8/12): Form Pengajuan Judul */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
                  <div className="space-y-4 overflow-y-auto scrollbar-none pr-1">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                          <FileText className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 font-display">
                          Formulir Rincian Judul &amp; Abstrak Penelitian
                        </h3>
                      </div>
                      <span className="text-xs font-mono-data text-slate-500 font-medium">
                        Semester Genap 2025/2026
                      </span>
                    </div>

                    <form className="space-y-4 text-xs">
                      {/* Judul TA */}
                      <div className="space-y-1.5">
                        <label className="block font-bold text-slate-800">
                          Usulan Judul Skripsi / Tugas Akhir:
                        </label>
                        <textarea
                          rows={2}
                          value={judulInput}
                          onChange={(e) => setJudulInput(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#C62828] transition-all leading-relaxed"
                        />
                      </div>

                      {/* Bidang Kajian */}
                      <CustomDropdown
                        label="Bidang Kajian Keahlian:"
                        value={bidangKajian}
                        onChange={(val) => setBidangKajian(val)}
                        options={[
                          {
                            id: "Software Engineering & Web Architecture",
                            label: "Software Engineering & Web Architecture (RPL)",
                            badge: "RPL",
                          },
                          {
                            id: "Artificial Intelligence & Machine Learning",
                            label: "Artificial Intelligence & Machine Learning (AI)",
                            badge: "AI",
                          },
                          {
                            id: "Computer Network & Cybersecurity",
                            label: "Computer Network & Cybersecurity (Jaringan)",
                            badge: "JARINGAN",
                          },
                        ]}
                      />

                      {/* Draf Abstrak */}
                      <div className="space-y-1.5">
                        <label className="block font-bold text-slate-800">
                          Ringkasan Draf Abstrak &amp; Metodologi:
                        </label>
                        <textarea
                          rows={4}
                          value={abstrakInput}
                          onChange={(e) => setAbstrakInput(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#C62828] transition-all leading-relaxed"
                        />
                      </div>

                      {/* Unggah Outline Proposal */}
                      <div className="space-y-1.5 pt-1">
                        <label className="block font-bold text-slate-800">
                          Unggah File Outline Proposal (PDF):
                        </label>
                        <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Upload className="w-4 h-4 text-[#C62828]" />
                            <span className="text-xs text-slate-700 font-semibold">
                              Outline_Proposal_SIPETA_DanuZen.pdf
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-white bg-emerald-600 px-3 py-1 rounded-md shadow-xs">
                            Terunggah (1.2 MB)
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column (4/12): Similarity Checker & Verification Status */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden">
                {/* Title Availability & Duplication Check Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Search className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Cek Duplikasi &amp; Ketersediaan Judul
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                    <p className="text-xs font-bold text-slate-600">
                      Status Ketersediaan Judul:
                    </p>

                    {isChecking ? (
                      <div className="py-2 text-xs font-bold text-slate-500 animate-pulse">
                        Mengecek 111+ Judul di Database Repositori...
                      </div>
                    ) : (
                      <>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                          <CheckCircle2 className="w-4 h-4" /> Judul Belum Digunakan (Tersedia)
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium pt-1">
                          0 Judul Identik Ditemukan di Repositori TA UPI YPTK Padang.
                        </p>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleCheckSimilarity}
                    disabled={isChecking}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-[#C62828] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
                  >
                    <Search className="w-3.5 h-3.5 text-[#F59E0B]" />
                    {isChecking ? "Mengecek Database..." : "Cek Ulang Duplikasi Judul"}
                  </button>
                </div>

                {/* Status Approval Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Status Verifikasi Kaprodi
                      </h3>
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-emerald-800">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#2F8F5B] text-white">
                        Status: APPROVED
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#2F8F5B]" />
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium leading-relaxed mt-1">
                      Proposal disetujui oleh Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc. pada 24 Maret 2026.
                    </p>
                  </div>
                </div>

                {/* Card 3: Requirements Info (Flush bottom fill) */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Panduan Penulisan Judul
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 mt-2.5 font-medium leading-relaxed">
                      Judul harus mencerminkan masalah penelitian, metode yang digunakan, serta objek studi kasus yang spesifik pada universitas UPI YPTK Padang.
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
