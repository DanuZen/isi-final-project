"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileCheck,
  Upload,
  ArrowRight,
  Download,
  Award,
} from "lucide-react";

export default function UjianSidangPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [naskahFinalFile, setNaskahFinalFile] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUploadNaskah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naskahFinalFile) return;
    setIsUploaded(true);
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
                    <CheckCircle2 className="w-3.5 h-3.5" /> ACC Ujian Sidang Skripsi Disetujui
                  </span>
                  <span className="text-xs font-mono-data text-[#A0A0A0]">
                    Ref ID: SDG-2026-1104
                  </span>
                </div>
                <h2 className="text-2xl font-black font-display text-white tracking-wide">
                  Jadwal &amp; Ujian Sidang Akhir Skripsi
                </h2>
                <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                  Informasi alokasi ujian sidang akhir skripsi, majelis penguji, dan unggah berkas naskah komprehensif final.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#2A2A2A] border border-[#444444] text-white hover:bg-[#333333] transition-all flex items-center gap-1.5 shadow-xs">
                  <Download className="w-4 h-4 text-[#A0A0A0]" /> Kartu Ujian Sidang (PDF)
                </button>
                <Link
                  href="/yudisium"
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-1.5"
                >
                  Lihat Status Tamat <ArrowRight className="w-4 h-4" />
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
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Jadwal Pelaksanaan Ujian Sidang Skripsi
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
                      <p className="font-bold text-slate-900">Kamis, 25 September 2026</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-[#C62828]" />
                        <span className="font-bold uppercase tracking-wider text-[10px]">Waktu Sidang</span>
                      </div>
                      <p className="font-bold text-slate-900">13:00 - 14:30 WIB</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-[#C62828]" />
                        <span className="font-bold uppercase tracking-wider text-[10px]">Ruangan Ujian</span>
                      </div>
                      <p className="font-bold text-slate-900">Aula Utama FIK UPI YPTK</p>
                    </div>
                  </div>

                  {/* Examiners List */}
                  <div className="space-y-3 pt-4">
                    <h4 className="font-bold text-xs text-slate-900 font-display flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#C62828]" /> Majelis Dewan Penguji Sidang Skripsi:
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-display border-b border-slate-200/60">
                          <tr>
                            <th className="py-2.5 px-3 font-bold">Jabatan Majelis</th>
                            <th className="py-2.5 px-3 font-bold">Nama Dosen Penguji</th>
                            <th className="py-2.5 px-3 font-bold">Status Konfirmasi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                          <tr>
                            <td className="py-2.5 px-3 font-bold text-[#C62828]">Ketua Majelis Ujian</td>
                            <td className="py-2.5 px-3 font-medium">Prof. Dr. Agus Defit, S.Kom., M.Kom.</td>
                            <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Konfirmasi Hadir</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-bold text-amber-700">Penguji Utama (I)</td>
                            <td className="py-2.5 px-3 font-medium">Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.</td>
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

            {/* Right Column (1 Col): Upload Final Thesis PDF & Certificate Clearance */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
              {/* Card 1: Upload Final Thesis */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#C62828]" />
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Upload Naskah Skripsi Final (Lengkap)
                    </h3>
                  </div>
                </div>

                {isUploaded ? (
                  <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200/80 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Naskah Skripsi Final Berhasil Diunggah!
                    </div>
                    <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                      Naskah komprehensif Bab 1 s/d Bab 5 beserta lampiran kode program telah diterima oleh Majelis Penguji Sidang.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleUploadNaskah} className="space-y-3 text-xs">
                    <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                      Unggah berkas Naskah Skripsi Final (Bab 1 s/d Bab 5 + Lampiran) dalam format PDF untuk disebarkan ke Dewan Penguji.
                    </p>

                    <input
                      type="file"
                      required
                      onChange={(e) => setNaskahFinalFile(e.target.files?.[0]?.name || "Naskah_Skripsi_Final_DanuZen.pdf")}
                      className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C62828] file:text-white hover:file:bg-[#990000] cursor-pointer"
                    />

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#C62828]/20"
                    >
                      <Upload className="w-4 h-4" /> Unggah Naskah Skripsi Final
                    </button>
                  </form>
                )}
              </div>

              {/* Card 2: Kelengkapan Bebas Lab & Repositori (Stretches to match bottom baseline) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                    Prasyarat Pengesahan &amp; Wisuda
                  </h3>

                  <ul className="space-y-2 text-xs text-slate-600 font-medium mt-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Upload CD Repositori Source Code &amp; Jurnal FIK</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Surat Keterangan Bebas Pinjam Laboratorium Komputer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Penyerahan Jilid Hardcover Skripsi (3 Eksemplar)</span>
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
