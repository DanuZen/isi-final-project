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
} from "lucide-react";

export default function UjianSidangPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"SEMPRO" | "SIDANG">("SIDANG");

  const [naskahFinalFile, setNaskahFinalFile] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [revisiSemproFile, setRevisiSemproFile] = useState<string | null>(null);
  const [isSemproUploaded, setIsSemproUploaded] = useState(false);

  const handleUploadNaskah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naskahFinalFile) return;
    setIsUploaded(true);
  };

  const handleUploadSemproRevisi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisiSemproFile) return;
    setIsSemproUploaded(true);
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
                      <CheckCircle2 className="w-3.5 h-3.5" /> ACC Ujian Akademik Disetujui
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Jadwal &amp; Ujian Akademik Tugas Akhir
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pusat informasi alokasi ujian Seminar Proposal (Sempro) dan Ujian Sidang Akhir Skripsi mahasiswa UPI YPTK Padang.
                  </p>
                </div>

                {/* Tab Controls */}
                <div className="flex items-center gap-1.5 bg-[#141414] p-1.5 rounded-xl border border-neutral-700 shrink-0">
                  <button
                    onClick={() => setActiveTab("SEMPRO")}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "SEMPRO"
                        ? "bg-[#C62828] text-white shadow-xs"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" /> 1. Seminar Proposal
                  </button>
                  <button
                    onClick={() => setActiveTab("SIDANG")}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "SIDANG"
                        ? "bg-[#C62828] text-white shadow-xs"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" /> 2. Ujian Sidang Skripsi
                  </button>
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Grid Layout: Schedule & Upload (Flush Bottom Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0 overflow-hidden">
              {/* Left Column (8/12): Schedule Details & Board of Examiners */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                          {activeTab === "SEMPRO" ? (
                            <Calendar className="w-4 h-4" />
                          ) : (
                            <GraduationCap className="w-4 h-4" />
                          )}
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 font-display">
                          {activeTab === "SEMPRO"
                            ? "Jadwal Pelaksanaan Seminar Proposal Skripsi (Sempro)"
                            : "Jadwal Pelaksanaan Ujian Sidang Skripsi (Final)"}
                        </h3>
                      </div>
                      <span className="px-3 py-1 text-xs font-bold bg-emerald-600 text-white shadow-xs rounded-full">
                        Terjadwal Resmi
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-[#C62828]" />
                          <span className="font-bold uppercase tracking-wider text-[10px]">Hari &amp; Tanggal</span>
                        </div>
                        <p className="font-bold text-slate-900">
                          {activeTab === "SEMPRO" ? "Kamis, 20 Agustus 2026" : "Kamis, 25 September 2026"}
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#C62828]" />
                          <span className="font-bold uppercase tracking-wider text-[10px]">Waktu Ujian</span>
                        </div>
                        <p className="font-bold text-slate-900">
                          {activeTab === "SEMPRO" ? "09:00 - 10:30 WIB" : "13:00 - 14:30 WIB"}
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-[#C62828]" />
                          <span className="font-bold uppercase tracking-wider text-[10px]">Ruangan Ujian</span>
                        </div>
                        <p className="font-bold text-slate-900">
                          {activeTab === "SEMPRO" ? "Ruang 302" : "Aula Utama FIK UPI YPTK"}
                        </p>
                      </div>
                    </div>

                    {/* Examiners List */}
                    <div className="space-y-3 pt-5">
                      <h4 className="font-bold text-xs text-slate-900 font-display flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#C62828]" />{" "}
                        {activeTab === "SEMPRO"
                          ? "Susunan Dewan Penguji Seminar Proposal:"
                          : "Majelis Dewan Penguji Sidang Skripsi:"}
                      </h4>

                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-display border-b border-slate-200">
                            <tr>
                              <th className="py-3 px-4 font-bold">Jabatan Majelis</th>
                              <th className="py-3 px-4 font-bold">Nama Dosen Penguji</th>
                              <th className="py-3 px-4 font-bold">Status Konfirmasi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-800">
                            <tr>
                              <td className="py-3 px-4 font-bold text-[#C62828]">Ketua Penguji Ujian</td>
                              <td className="py-3 px-4 font-medium">
                                {activeTab === "SEMPRO"
                                  ? "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc."
                                  : "Prof. Dr. Agus Defit, S.Kom., M.Kom."}
                              </td>
                              <td className="py-3 px-4 text-[#2F8F5B] font-bold">✓ Konfirmasi Hadir</td>
                            </tr>
                            <tr>
                              <td className="py-2.5 px-3 font-bold text-amber-700">Penguji Utama (I)</td>
                              <td className="py-2.5 px-3 font-medium">
                                {activeTab === "SEMPRO"
                                  ? "Dr. Yanto, S.Kom., M.Kom."
                                  : "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc."}
                              </td>
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

              {/* Right Column (4/12): Upload Form & Rules */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden">
                {/* Card 1: Upload Form */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        {activeTab === "SEMPRO"
                          ? "Upload Draft Proposal Skripsi (PDF)"
                          : "Upload Naskah Skripsi Final (Lengkap)"}
                      </h3>
                    </div>
                  </div>

                  {activeTab === "SEMPRO" ? (
                    isSemproUploaded ? (
                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Berkas Draft Proposal Berhasil Diunggah!
                        </div>
                        <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                          Naskah proposal diterima oleh Dewan Penguji Seminar Proposal.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleUploadSemproRevisi} className="space-y-3.5 text-xs">
                        <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                          Unggah draf proposal skripsi (Bab 1 s/d Bab 3) dalam format PDF untuk Dewan Penguji Sempro.
                        </p>

                        <input
                          type="file"
                          required
                          onChange={(e) => setRevisiSemproFile(e.target.files?.[0]?.name || "Draft_Proposal_Skripsi.pdf")}
                          className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C62828] file:text-white hover:file:bg-[#B71C1C] cursor-pointer"
                        />

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
                        >
                          <Upload className="w-4 h-4" /> Unggah Draft Proposal
                        </button>
                      </form>
                    )
                  ) : isUploaded ? (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Naskah Skripsi Final Berhasil Diunggah!
                      </div>
                      <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                        Naskah komprehensif Bab 1 s/d Bab 5 beserta lampiran kode program telah diterima oleh Majelis Penguji Sidang.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleUploadNaskah} className="space-y-3.5 text-xs">
                      <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                        Unggah berkas Naskah Skripsi Final (Bab 1 s/d Bab 5 + Lampiran Kode) dalam format PDF untuk Dewan Penguji.
                      </p>

                      <input
                        type="file"
                        required
                        onChange={(e) => setNaskahFinalFile(e.target.files?.[0]?.name || "Naskah_Skripsi_Final_DanuZen.pdf")}
                        className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C62828] file:text-white hover:file:bg-[#B71C1C] cursor-pointer"
                      />

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
                      >
                        <Upload className="w-4 h-4" /> Unggah Naskah Skripsi Final
                      </button>
                    </form>
                  )}
                </div>

                {/* Card 2: Rules & Guidelines */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        {activeTab === "SEMPRO" ? "Tata Tertib Presentasi Sempro" : "Prasyarat Ujian Sidang Skripsi"}
                      </h3>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-600 font-medium mt-3">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0" />
                        <span>Memakai kemeja putih &amp; Jas Almamater UPI YPTK</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0" />
                        <span>Hadir 15 menit sebelum alokasi waktu ujian</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0" />
                        <span>Membawa draf naskah 3 rangkap untuk penguji</span>
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
