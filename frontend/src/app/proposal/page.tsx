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
} from "lucide-react";

export default function ProposalJudulPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [judulInput, setJudulInput] = useState(
    "Rancang Bangun Sistem Informasi Perjalanan & Evaluasi Tugas Akhir (SIPETA) Berbasis Web di UPI YPTK Padang"
  );
  const [abstrakInput, setAbstrakInput] = useState(
    "Penelitian ini bertujuan untuk mengoptimalkan proses pemantauan tugas akhir mahasiswa secara visual, terintegrasi notifikasi WhatsApp, serta meningkatkan transparansi alur bimbingan hingga yudisium."
  );
  const [bidangKajian, setBidangKajian] = useState("Software Engineering & Web Architecture");

  const [similarityScore, setSimilarityScore] = useState<number | null>(12);
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
                      <CheckCircle2 className="w-3.5 h-3.5" /> Proposal Judul Disetujui Prodi
                    </span>
                    <span className="text-xs font-mono-data text-[#A0A0A0]">
                      Ref ID: PRPS-2026-0312
                    </span>
                  </div>
                  <h2 className="text-2xl font-black font-display text-white tracking-wide">
                    Formulir Pengajuan &amp; Uji Kemiripan Judul TA
                  </h2>
                  <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                    Pengajuan usulan topik Tugas Akhir / Skripsi mahasiswa FIK UPI YPTK. Sistem otomatis mengecek similarity score terhadap repositori naskah alumni.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Link
                    href="/pembimbing"
                    className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-1.5"
                  >
                    Lanjut ke Usulan Pembimbing <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Main 2-Column Layout (Flush Bottom Baseline Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Left Column (2 Cols): Form Pengajuan Judul */}
              <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
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

                    <form className="space-y-4 mt-4 text-xs">
                      {/* Judul TA */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">
                          Usulan Judul Skripsi / Tugas Akhir:
                        </label>
                        <textarea
                          rows={2}
                          value={judulInput}
                          onChange={(e) => setJudulInput(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-900 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#C62828] transition-all leading-relaxed"
                        />
                      </div>

                      {/* Bidang Kajian */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">
                          Bidang Kajian Keahlian:
                        </label>
                        <select
                          value={bidangKajian}
                          onChange={(e) => setBidangKajian(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-900 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#C62828] transition-all"
                        >
                          <option value="Software Engineering & Web Architecture">
                            Software Engineering &amp; Web Architecture (RPL)
                          </option>
                          <option value="Artificial Intelligence & Machine Learning">
                            Artificial Intelligence &amp; Machine Learning
                          </option>
                          <option value="Computer Network & Cybersecurity">
                            Computer Network &amp; Cybersecurity
                          </option>
                        </select>
                      </div>

                      {/* Draf Abstrak */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">
                          Ringkasan Draf Abstrak &amp; Metodologi:
                        </label>
                        <textarea
                          rows={4}
                          value={abstrakInput}
                          onChange={(e) => setAbstrakInput(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-900 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#C62828] transition-all leading-relaxed"
                        />
                      </div>

                      {/* Unggah Outline Proposal */}
                      <div className="space-y-1 pt-1">
                        <label className="block font-bold text-slate-700">
                          Unggah File Outline Proposal (PDF):
                        </label>
                        <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-[#C62828]" />
                            <span className="text-xs text-slate-600 font-semibold">
                              Outline_Proposal_SIPETA_DanuZen.pdf
                            </span>
                          </div>
                          <span className="text-[10px] font-mono-data text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                            Terunggah (1.2 MB)
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column (1 Col): Similarity Checker Card & Approval Status */}
              <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
                {/* Similarity Checker Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Pemeriksaan Kemiripan AI
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Ambang Max 25%
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 text-center space-y-2">
                    <p className="text-xs font-bold text-slate-600">
                      Skor Kemiripan Judul (Similarity Score):
                    </p>
                    <div className="text-3xl font-black font-display text-[#2F8F5B]">
                      {isChecking ? "Menguji..." : `${similarityScore}%`}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {similarityScore && similarityScore <= 25
                        ? "✓ Aman (Kemiripan di bawah ambang batas 25%)"
                        : "Perlu Penyesuaian"}
                    </p>
                  </div>

                  <button
                    onClick={handleCheckSimilarity}
                    disabled={isChecking}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Search className="w-3.5 h-3.5 text-[#F59E0B]" />
                    {isChecking ? "Memproses database..." : "Uji Ulang Kemiripan Judul"}
                  </button>
                </div>

                {/* Status Approval Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C62828]" />
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Status Verifikasi Kaprodi FIK
                      </h3>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-emerald-800">
                      <span>Status: APPROVED</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                      Proposal disetujui oleh Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc. pada 24 Maret 2026.
                    </p>
                  </div>
                </div>

                {/* Card 3: Requirements Info (Flush bottom fill) */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                      Panduan Penulisan Judul
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                      Judul harus mencerminkan masalah penelitian, metode yang digunakan, serta objek studi kasus yang spesifik pada FIK UPI YPTK Padang.
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
