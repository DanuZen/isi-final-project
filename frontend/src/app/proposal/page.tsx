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
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
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
                  Pengajuan Usulan Judul &amp; Cek Kemiripan (Similarity)
                </h2>
                <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                  Formulir usulan judul tugas akhir, verifikasi tingkat kemiripan judul, serta penetapan Dosen Pembimbing Utama &amp; Pendamping.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  href="/bimbingan"
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-1.5"
                >
                  Buka Log Bimbingan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Grid Layout: Form Proposal & Similarity Checker */}
          {/* Grid Layout: Form Proposal & Similarity Checker (Flush Bottom Aligned) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Column (2 Cols): Form Usulan Judul */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 flex-1">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Formulir Usulan Judul Skripsi / TA
                    </h3>
                  </div>
                  <span className="text-xs font-mono-data text-slate-500 font-medium">
                    Status: Disetujui (28 Maret 2026)
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Judul Tugas Akhir / Skripsi:
                    </label>
                    <input
                      type="text"
                      value={judulInput}
                      onChange={(e) => setJudulInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-900 focus:outline-none focus:bg-white focus:border-[#C62828] font-bold text-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Bidang Kajian / Domain Penelitian:
                    </label>
                    <select
                      value={bidangKajian}
                      onChange={(e) => setBidangKajian(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-900 focus:outline-none focus:bg-white focus:border-[#C62828] text-xs font-medium transition-all"
                    >
                      <option value="Software Engineering & Web Architecture">
                        Rekayasa Perangkat Lunak &amp; Arsitektur Web
                      </option>
                      <option value="Artificial Intelligence & Data Mining">
                        Kecerdasan Buatan &amp; Data Mining
                      </option>
                      <option value="Computer Network & Cybersecurity">
                        Jaringan Komputer &amp; Keamanan Siber
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Abstrak Singkat / Ringkasan Penelitian:
                    </label>
                    <textarea
                      rows={3}
                      value={abstrakInput}
                      onChange={(e) => setAbstrakInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-900 focus:outline-none focus:bg-white focus:border-[#C62828] text-xs leading-relaxed transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Berkas Draft Proposal (PDF):
                    </label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span className="font-mono-data text-xs text-slate-800 font-semibold">
                          Draft_Proposal_DanuZen_V1.pdf (2.4 MB)
                        </span>
                      </div>
                      <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" /> Ganti Berkas
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dosen Pembimbing Assignment Grid */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                  Dosen Pembimbing yang Ditetapkan Prodi
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 space-y-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-50 text-[#C62828] rounded-full">
                      Pembimbing Utama (I)
                    </span>
                    <p className="text-xs font-bold text-slate-900 mt-1">
                      Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.
                    </p>
                    <p className="text-[11px] font-mono-data text-slate-500">
                      NIDN: 1012057301 • Bidang: Software Engineering
                    </p>
                    <p className="text-[11px] text-emerald-600 font-bold pt-1">
                      ✓ Konfirmasi Kuota Terisi (6/8)
                    </p>
                  </div>

                  <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 space-y-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 rounded-full">
                      Pembimbing Pendamping (II)
                    </span>
                    <p className="text-xs font-bold text-slate-900 mt-1">
                      Dr. Jasmir, S.Kom., M.Kom.
                    </p>
                    <p className="text-[11px] font-mono-data text-slate-500">
                      NIDN: 1024088002 • Bidang: Web Architecture
                    </p>
                    <p className="text-[11px] text-emerald-600 font-bold pt-1">
                      ✓ Konfirmasi Kuota Terisi (5/8)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (1 Col): Similarity Checker Widget & Review Log */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
              {/* Similarity Widget */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C62828]" />
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Cek Kemiripan Judul (Similarity)
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/60 text-center space-y-2">
                  <p className="text-xs text-slate-500 font-medium">Skor Kemiripan dengan Judul Existing:</p>
                  <p className="text-3xl font-black font-mono-data text-emerald-600">
                    {isChecking ? "..." : `${similarityScore}%`}
                  </p>
                  <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                    Aman / Unik (&lt; 25%)
                  </span>
                </div>

                <button
                  onClick={handleCheckSimilarity}
                  disabled={isChecking}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  {isChecking ? "Memeriksa Database..." : "Uji Ulang Kemiripan Judul"}
                </button>
              </div>

              {/* Review History */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <History className="w-4 h-4 text-slate-500" />
                  <h3 className="font-bold text-sm text-slate-900 font-display">
                    Catatan Review Admin Prodi
                  </h3>
                </div>

                <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200/80 space-y-1 text-xs">
                  <p className="font-bold text-emerald-800">Approval Prodi (28 Mar 2026)</p>
                  <p className="text-slate-800 text-[11px] leading-relaxed font-medium">
                    &quot;Judul relevan dengan bidang kajian Teknik Informatika dan skor kemiripan sangat rendah (12%). Usulan disetujui &amp; dosen pembimbing resmi ditetapkan.&quot;
                  </p>
                </div>
              </div>

              {/* Card 3: Kriteria Usulan Judul (Stretches to match bottom baseline) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                    Kriteria Ketentuan Judul TA
                  </h3>

                  <ul className="space-y-2 text-xs text-slate-600 font-medium mt-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Relevan dengan kurikulum Prodi TI FIK UPI YPTK</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Batas kemiripan judul (similarity) maksimal 25%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Memuat minimal 5 jurnal referensi terindeks SINTA/IEEE</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
