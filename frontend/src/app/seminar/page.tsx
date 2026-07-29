"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  FileCheck,
  Upload,
  ArrowRight,
  Download,
} from "lucide-react";

export default function SeminarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [revisiFile, setRevisiFile] = useState<string | null>(null);
  const [revisiSubmitted, setRevisiSubmitted] = useState(false);

  const handleUploadRevisi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisiFile) return;
    setRevisiSubmitted(true);
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
                      <CheckCircle2 className="w-3.5 h-3.5" /> ACC Seminar Proposal Disetujui
                    </span>
                    <span className="text-xs font-mono-data text-[#A0A0A0]">
                      Ref ID: SM-2026-0914
                    </span>
                  </div>
                  <h2 className="text-2xl font-black font-display text-white tracking-wide">
                    Jadwal &amp; Pelaksanaan Seminar Proposal Skripsi
                  </h2>
                  <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                    Informasi alokasi waktu seminar proposal, lokasi ruangan, dewan penguji, dan unggah revisi naskah pasca-seminar.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#2A2A2A] border border-[#444444] text-white hover:bg-[#333333] transition-all flex items-center gap-1.5 shadow-xs">
                    <Download className="w-4 h-4 text-[#A0A0A0]" /> Berita Acara Seminar (PDF)
                  </button>
                  <Link
                    href="/sidang"
                    className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-1.5"
                  >
                    Lanjut ke Sidang <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Grid Layout: Schedule & Revision Form (Flush Bottom Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Left Column (2 Cols): Schedule Details & Board of Examiners */}
              <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 font-display">
                          Detail Pelaksanaan Seminar Proposal
                        </h3>
                      </div>
                      <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                        Terjadwal Resmi
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mt-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-[#C62828]" />
                          <span className="font-bold uppercase tracking-wider text-[10px]">Hari &amp; Tanggal</span>
                        </div>
                        <p className="font-bold text-slate-900">Kamis, 20 Agustus 2026</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#C62828]" />
                          <span className="font-bold uppercase tracking-wider text-[10px]">Waktu Pelaksanaan</span>
                        </div>
                        <p className="font-bold text-slate-900">09:00 - 10:30 WIB</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-[#C62828]" />
                          <span className="font-bold uppercase tracking-wider text-[10px]">Ruangan Seminar</span>
                        </div>
                        <p className="font-bold text-slate-900">Gedung FIK - Ruang 302</p>
                      </div>
                    </div>

                    {/* Examiners Table */}
                    <div className="space-y-3 pt-4">
                      <h4 className="font-bold text-xs text-slate-900 font-display flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#C62828]" /> Susunan Dewan Penguji Seminar:
                      </h4>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-display border-b border-slate-200/60">
                            <tr>
                              <th className="py-2.5 px-3 font-bold">Jabatan Penguji</th>
                              <th className="py-2.5 px-3 font-bold">Nama Dosen Penguji</th>
                              <th className="py-2.5 px-3 font-bold">Status Hadir</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-800">
                            <tr>
                              <td className="py-2.5 px-3 font-bold text-[#C62828]">Ketua Penguji</td>
                              <td className="py-2.5 px-3 font-medium">Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.</td>
                              <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Konfirmasi Hadir</td>
                            </tr>
                            <tr>
                              <td className="py-2.5 px-3 font-bold text-amber-700">Penguji Utama (I)</td>
                              <td className="py-2.5 px-3 font-medium">Dr. Yanto, S.Kom., M.Kom.</td>
                              <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Konfirmasi Hadir</td>
                            </tr>
                            <tr>
                              <td className="py-2.5 px-3 font-bold text-slate-600">Penguji Pendamping (II)</td>
                              <td className="py-2.5 px-3 font-medium">Dr. Jasmir, S.Kom., M.Kom.</td>
                              <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Konfirmasi Hadir</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (1 Col): Post-Seminar Revision Upload */}
              <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
                {/* Card 1: Upload Revisi */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#C62828]" />
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Upload Revisi Pasca-Seminar
                      </h3>
                    </div>
                  </div>

                  {revisiSubmitted ? (
                    <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200/80 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Berkas Revisi Berhasil Diunggah!
                      </div>
                      <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                        Berkas naskah revisi proposal telah diterima oleh Ketua Penguji &amp; Sekretariat Prodi. Anda diizinkan melanjutkan ke persiapan Sidang Skripsi.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleUploadRevisi} className="space-y-3 text-xs">
                      <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                        Unggah lembar perbaikan revisi yang telah ditandatangani oleh Dosen Penguji (maksimal 14 hari kerja setelah seminar).
                      </p>

                      <input
                        type="file"
                        required
                        onChange={(e) => setRevisiFile(e.target.files?.[0]?.name || "Naskah_Revisi_Sempro.pdf")}
                        className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C62828] file:text-white hover:file:bg-[#990000] cursor-pointer"
                      />

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#C62828]/20"
                      >
                        <Upload className="w-4 h-4" /> Unggah Lembar Revisi Final
                      </button>
                    </form>
                  )}
                </div>

                {/* Card 2: Tata Tertib Seminar (Stretches to match bottom baseline) */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                      Tata Tertib Presentasi Seminar
                    </h3>

                    <ul className="space-y-2 text-xs text-slate-600 font-medium mt-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Memakai kemeja putih &amp; Jas Almamater UPI YPTK</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Hadir 15 menit sebelum alokasi waktu ujian</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Membawa draf proposal 3 rangkap untuk penguji</span>
                      </li>
                    </ul>
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
